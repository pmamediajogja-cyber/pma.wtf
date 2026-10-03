// Post-build step for pma.wtf (runs via `npm run build` -> `postbuild`).
//
// 1. Creates static route entry points in dist/ so GitHub Pages serves real
//    pages (with proper 200s for SEO) instead of only the SPA fallback:
//      /journal, /journal/<id>, /profile, /cv, /thework, /notary
//    Article ids are read from content/journal/*.md, so new CMS articles
//    automatically get their route — no more hardcoded `seq 1 37`.
// 2. Copies dist/index.html -> dist/404.html (SPA fallback for the app router).
// 3. Generates dist/sitemap.xml from the journal Markdown files.

import { cpSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const journalDir = join(root, "content", "journal");
const SITE = "https://pma.wtf";

// --- tiny frontmatter reader (only needs id + date) ---
function readMeta(file) {
  const text = readFileSync(file, "utf8");
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const meta = {};
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const idx = line.indexOf(":");
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      try {
        const parsed = JSON.parse(val);
        if (typeof parsed === "string") val = parsed;
      } catch {
        val = val.replace(/^["']|["']$/g, "");
      }
      meta[key] = val;
    }
  }
  return meta;
}

const MONTHS = {
  JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
  JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12",
};
function toISODate(dateStr) {
  const m = String(dateStr || "").match(/^(\d{2})\s+([A-Z]{3})\s+(\d{4})$/);
  if (m && MONTHS[m[2]]) return `${m[3]}-${MONTHS[m[2]]}-${m[1]}`;
  return undefined;
}

// --- collect articles ---
const articles = readdirSync(journalDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => readMeta(join(journalDir, f)))
  .filter((a) => a.id)
  .map((a) => {
    let id = String(a.id);
    if (/^\d+$/.test(id)) id = id.padStart(3, "0");
    return { id, lastmod: toISODate(a.date) };
  })
  .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

// --- static route entry points ---
const indexHtml = join(dist, "index.html");
const staticRoutes = ["journal", "profile", "cv", "thework", "notary"];
for (const route of staticRoutes) {
  mkdirSync(join(dist, route), { recursive: true });
  cpSync(indexHtml, join(dist, route, "index.html"));
}
for (const a of articles) {
  const dir = join(dist, "journal", a.id);
  mkdirSync(dir, { recursive: true });
  cpSync(indexHtml, join(dir, "index.html"));
}

// --- SPA fallback ---
cpSync(indexHtml, join(dist, "404.html"));

// --- sitemap ---
const journalLastmod = articles
  .map((a) => a.lastmod)
  .filter(Boolean)
  .sort()
  .pop();
const urls = [
  `  <url><loc>${SITE}/</loc></url>`,
  `  <url><loc>${SITE}/profile</loc></url>`,
  `  <url><loc>${SITE}/cv</loc></url>`,
  `  <url><loc>${SITE}/journal</loc>${
    journalLastmod ? `<lastmod>${journalLastmod}</lastmod>` : ""
  }</url>`,
  ...articles.map(
    (a) =>
      `  <url><loc>${SITE}/journal/${a.id}</loc>${
        a.lastmod ? `<lastmod>${a.lastmod}</lastmod>` : ""
      }</url>`
  ),
];
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.join("\n") +
  `\n</urlset>\n`;
writeFileSync(join(dist, "sitemap.xml"), sitemap, "utf8");

console.log(
  `postbuild: ${articles.length} journal routes, sitemap.xml, 404.html written to dist/`
);
