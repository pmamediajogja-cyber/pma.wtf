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
 * Reviews are written in the source data per article. Do not inject one
 * generic editorial template here: doing that makes unrelated stories sound
 * identical. The presentation layer only normalizes the PMA perspective label
 * so every article keeps its own voice, facts, source context and takeaways.
 */
function buildIndonesianReview(article) {
  const base = Array.isArray(article.review)
    ? article.review.map((text) => String(text).trim()).filter(Boolean)
    : [];

  if (!base.length) {
    return [
      `Kita mulai dari sumber utamanya: ${article.source || "PMA Media"} membahas “${article.title || "topik ini"}”. Saya tidak ingin berhenti di judulnya saja, karena bagian yang paling menarik justru ada pada konteks dan detail yang membuat cerita ini relevan.`,
      `Kalau dibawa ke situasi nyata, ada beberapa hal yang menurut saya layak diperhatikan. Bukan sekadar soal apa yang terjadi, tetapi kenapa hal itu terjadi dan apa yang bisa kita pelajari dari proses di baliknya.`,
      `Saya lebih suka membaca artikel seperti ini sebagai bahan ngobrol sekaligus bahan kerja: mana yang benar-benar penting, mana yang hanya noise, dan bagian mana yang bisa diterapkan pada proyek atau keputusan kita sendiri.`,
      `Pandangan PMA Media: berita atau laporan sumber ini paling berguna ketika kita tidak hanya ikut membicarakan trennya, tetapi mampu mengambil insight yang masuk akal lalu mengubahnya menjadi keputusan, eksperimen, atau karya yang lebih matang.`
    ];
  }

  return base.map((text) =>
    text.replace(/^Pandangan PMA\s*:/i, "Pandangan PMA Media:")
  );
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
