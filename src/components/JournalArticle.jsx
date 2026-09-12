import { useEffect } from "react";
import JournalArtwork from "./JournalArtwork";
import journalTags from "../data/journalTags";

const SITE_URL = "https://pma.wtf";

function parseArticleDate(date) {
  const months = { JAN:"01",FEB:"02",MAR:"03",APR:"04",MAY:"05",JUN:"06",JUL:"07",AUG:"08",SEP:"09",OCT:"10",NOV:"11",DEC:"12" };
  const m = String(date || "").match(/^(\d{2})\s+([A-Z]{3})\s+(\d{4})$/);
  return m && months[m[2]] ? `${m[3]}-${months[m[2]]}-${m[1]}` : undefined;
}

/*
 * Review rule:
 * - The article's own source review is the only editorial material used.
 * - No generic intro, context paragraph, or takeaway is injected across stories.
 * - Short source reviews are split at sentence boundaries so they can reach
 *   the minimum five-paragraph reading rhythm without inventing new facts.
 * - The original PMA perspective is always retained and normalized to
 *   "Pandangan PMA Media:".
 */
function buildIndonesianReview(article) {
  const base = Array.isArray(article.review)
    ? article.review.map((text) => String(text).trim()).filter(Boolean)
    : [];

  if (!base.length) return [];

  const normalized = base.map((text) =>
    text.replace(/^Pandangan PMA\s*:/i, "Pandangan PMA Media:")
  );

  if (normalized.length >= 5) return normalized;

  const pmaParagraphs = normalized.filter((text) => /pandangan pma media:/i.test(text));
  const sourceParagraphs = normalized.filter((text) => !/pandangan pma media:/i.test(text));

  const sentences = sourceParagraphs.flatMap((paragraph) =>
    paragraph.match(/[^.!?]+(?:[.!?]+|$)/g)?.map((sentence) => sentence.trim()).filter(Boolean) || [paragraph]
  );

  const targetSourceParagraphs = Math.max(1, 5 - pmaParagraphs.length);
  const groups = [];
  let cursor = 0;

  for (let groupIndex = 0; groupIndex < targetSourceParagraphs && cursor < sentences.length; groupIndex += 1) {
    const remainingSentences = sentences.length - cursor;
    const remainingGroups = targetSourceParagraphs - groupIndex;
    const take = Math.max(1, Math.ceil(remainingSentences / remainingGroups));
    groups.push(sentences.slice(cursor, cursor + take).join(" "));
    cursor += take;
  }

  if (cursor < sentences.length) {
    groups.push(sentences.slice(cursor).join(" "));
  }

  return [...groups, ...pmaParagraphs];
}

function upsertMeta(attribute, key, content) {
  let node = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!node) { node = document.createElement("meta"); node.setAttribute(attribute, key); document.head.appendChild(node); }
  node.setAttribute("content", content);
}

export default function JournalArticle({ article, onBack }) {
  const seo = article ? (journalTags[article.id] || { tags: [], hashtags: [] }) : { tags: [], hashtags: [] };
  const publishedDate = article ? parseArticleDate(article.date) : undefined;
  const canonicalUrl = article ? `${SITE_URL}/journal/${article.id}` : SITE_URL;
  const review = article ? buildIndonesianReview(article) : [];
  const isOriginal = article?.source === "PMA Original";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!article) return undefined;
    const description = article.excerpt || `PMA Journal review: ${article.title}`;
    document.title = `${article.title} — PMA Journal`;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", "index,follow,max-image-preview:large");
    upsertMeta("property", "og:title", `${article.title} — PMA Journal`);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "article");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:site_name", "PMA.WTF");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", `${article.title} — PMA Journal`);
    upsertMeta("name", "twitter:description", description);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;
    let structuredData = document.head.querySelector("#pma-journal-jsonld");
    if (!structuredData) { structuredData = document.createElement("script"); structuredData.id = "pma-journal-jsonld"; structuredData.type = "application/ld+json"; document.head.appendChild(structuredData); }
    structuredData.textContent = JSON.stringify({ "@context":"https://schema.org", "@type":"BlogPosting", headline:article.title, description, ...(publishedDate ? {datePublished:publishedDate,dateModified:publishedDate}:{}), author:{"@type":"Organization",name:"PMA Media Yogyakarta",url:`${SITE_URL}/profile`}, publisher:{"@type":"Organization",name:"PMA Media Yogyakarta",url:SITE_URL}, mainEntityOfPage:{"@type":"WebPage","@id":canonicalUrl}, articleSection:article.category, keywords:seo.tags.join(", ") });
    return () => { const node = document.head.querySelector("#pma-journal-jsonld"); if (node) node.remove(); };
  }, [article?.id, article?.title, article?.excerpt, article?.category, article?.date, canonicalUrl, publishedDate, seo.tags]);

  if (!article) return null;
  return <main className="journal-article-page">
    <button className="journal-back" onClick={onBack}>← BACK TO JOURNAL</button>
    <div className="journal-article-shell">
      <div className="journal-article-meta"><span>{article.id} / {article.tag}</span><span>{article.date}</span></div>
      <div className="journal-article-hero"><JournalArtwork article={article} /><span className="journal-article-hero-label">{isOriginal ? "PMA ORIGINAL / CONTEXT ART" : "PMA CONTEXT ART"}</span></div>
      <h1>{article.title}</h1>
      <p className="journal-article-excerpt">{article.excerpt}</p>
      <div className="journal-article-tags" aria-label="Topik dan hashtag artikel"><div className="journal-tags-label">TOPICS / SEO TAGS</div><div className="journal-tags-list">{seo.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="journal-hashtags-label">HASHTAGS</div><div className="journal-hashtags-list">{seo.hashtags.map((hashtag) => <span key={hashtag}>{hashtag}</span>)}</div></div>
      <div className="journal-article-grid"><article><div className="journal-review-label">PMA REVIEW / OUR TAKE</div>{review.map((paragraph,index)=><p key={index} className={/pandangan pma media:/i.test(paragraph) ? "journal-pma-view" : ""}>{paragraph}</p>)}</article><aside className="journal-source-card"><div className="source-label">{isOriginal ? "PMA ORIGINAL" : "ORIGINAL SOURCE"}</div><strong>{isOriginal ? "PMA Media Yogyakarta" : article.source}</strong>{!isOriginal && <a href={article.url} target="_blank" rel="noreferrer">READ SOURCE ↗</a>}<div className="source-note">{isOriginal ? "Original editorial content written and published by PMA Media Yogyakarta." : "PMA editorial content is an independent review and interpretation of the linked source."}</div></aside></div>
    </div>
  </main>;
}
