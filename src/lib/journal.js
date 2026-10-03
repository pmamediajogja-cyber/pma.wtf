// Journal article loader — CMS edition.
//
// Articles now live as Markdown files in /content/journal/*.md (one file per
// article), editable through Decap CMS at /admin. Each file has frontmatter:
//
//   ---
//   id: "001"
//   date: "09 SEP 2026"
//   tag: "CYBERSECURITY / AI"
//   category: "CYBERSECURITY"
//   title: "..."
//   excerpt: "..."
//   source: "..."
//   url: "https://..."
//   tags: ["a", "b"]
//   hashtags: ["#a", "#b"]
//   ---
//   Paragraph one.
//
//   Paragraph two.
//
// Body paragraphs (separated by blank lines) become the `review` array, so the
// shape matches what the old src/data/journal*.js files provided and every
// consumer (JournalHub, JournalArticle, HomepageJournal, JournalSEO) keeps
// working unchanged.

const modules = import.meta.glob("/content/journal/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseScalar(raw) {
  const v = String(raw ?? "").trim();
  if (v === "") return "";
  try {
    // Handles "quoted", 'quoted', ["inline", "lists"], numbers, booleans.
    return JSON.parse(v);
  } catch {
    if (
      (v.startsWith('"') && v.endsWith('"') && v.length >= 2) ||
      (v.startsWith("'") && v.endsWith("'") && v.length >= 2)
    ) {
      return v.slice(1, -1);
    }
    return v;
  }
}

// Small YAML-subset parser: handles `key: value` (JSON or plain scalars),
// block lists (`key:` followed by indented `- item` lines, as written by
// Decap CMS), and literal/folded blocks (`|` / `>`).
function parseFrontmatter(src) {
  const data = {};
  const lines = String(src || "").split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      i++;
      continue;
    }
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) {
      i++;
      continue;
    }
    const key = m[1];
    const rest = m[2].trim();
    if (rest === "" || rest === "|" || rest === ">" || rest === "|-" || rest === ">-") {
      const items = [];
      const literal = [];
      const folded = rest.startsWith(">");
      i++;
      while (i < lines.length && /^\s+/.test(lines[i]) && lines[i].trim() !== "") {
        const t = lines[i].trim();
        if (t.startsWith("- ")) items.push(parseScalar(t.slice(2)));
        else literal.push(lines[i].replace(/^ {1,2}/, ""));
        i++;
      }
      if (items.length && !literal.length) data[key] = items;
      else if (literal.length && !items.length)
        data[key] = folded ? literal.join(" ") : literal.join("\n");
      else data[key] = items.length ? items : "";
      continue;
    }
    data[key] = parseScalar(rest);
    i++;
  }
  return data;
}

function parseMarkdown(raw) {
  const text = String(raw || "");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: text };
  return { data: parseFrontmatter(match[1]), body: match[2] || "" };
}

function toArticle({ data, body }) {
  const review = String(body || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  // Guard against unquoted numeric ids in frontmatter (e.g. `id: 38`).
  let id = String(data.id || "");
  if (/^\d+$/.test(id)) id = id.padStart(3, "0");
  return {
    id,
    date: String(data.date || ""),
    tag: String(data.tag || ""),
    category: String(data.category || ""),
    title: String(data.title || ""),
    excerpt: String(data.excerpt || ""),
    source: String(data.source || ""),
    url: String(data.url || ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    hashtags: Array.isArray(data.hashtags) ? data.hashtags.map(String) : [],
    review,
  };
}

let cache = null;

export function loadJournalArticles() {
  if (!cache) {
    cache = Object.values(modules)
      .map((raw) => toArticle(parseMarkdown(raw)))
      .filter((a) => a.id)
      .sort((a, b) =>
        a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: "base" })
      );
  }
  return cache;
}

// Backwards-compatible default export (same merge the app used before:
// journal + more + original + tech, now all from Markdown, sorted by id).
const journalArticles = loadJournalArticles();
export default journalArticles;
