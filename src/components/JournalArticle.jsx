import { useEffect } from "react";
import JournalArtwork from "./JournalArtwork";
import journalTags from "../data/journalTags";

const SITE_URL = "https://pma.wtf";

function parseArticleDate(date) {
  const months = { JAN:"01",FEB:"02",MAR:"03",APR:"04",MAY:"05",JUN:"06",JUL:"07",AUG:"08",SEP:"09",OCT:"10",NOV:"11",DEC:"12" };
  const m = String(date || "").match(/^(\d{2})\s+([A-Z]{3})\s+(\d{4})$/);
  return m && months[m[2]] ? `${m[3]}-${months[m[2]]}-${m[1]}` : undefined;
}

function buildIndonesianReview(article) {
  const base = Array.isArray(article.review) ? article.review.map((text) => String(text).trim()).filter(Boolean) : [];
  const category = String(article.category || "topik ini").toLowerCase();
  if (!base.length) {
    return [
      `Oke, kita mulai dari ceritanya. Artikel ini membahas ${String(article.title || "sebuah topik menarik").toLowerCase()}, dan menurut saya justru ada beberapa hal kecil di balik judulnya yang layak kita lihat lebih dekat.`,
      `Kalau dibaca sekilas, topik ini mungkin terasa seperti berita teknologi atau tren biasa. Tapi begitu dibawa ke dunia nyata, ceritanya jadi lebih menarik karena menyentuh cara kita bekerja, membuat keputusan, dan membangun sesuatu di ${category}.`,
      `Yang saya suka dari topik seperti ini adalah kita tidak harus langsung menjadi ahli untuk menangkap pelajarannya. Cukup lihat apa yang berubah, kenapa perubahan itu terjadi, lalu pikirkan apa dampaknya kalau kejadian yang sama masuk ke pekerjaan sehari-hari.`,
      `Kalau dibawa ke pekerjaan nyata, detail kecil seperti proses, akses, testing, komposisi, dan konsistensi justru sering menentukan hasil.`,
      `Jadi, jangan berhenti di beritanya saja. Coba lihat bagian yang bisa kita pakai sebagai bahan belajar atau sebagai ide untuk membuat sesuatu menjadi lebih baik.`,
      `Pandangan PMA Media: teknologi dan desain akan selalu terasa lebih menarik ketika kita membicarakannya bukan hanya sebagai tren, tetapi sebagai sesuatu yang benar-benar memengaruhi cara kita bekerja dan membuat keputusan.`
    ];
  }

  const conversationalIntro = `Mari kita ngobrol sebentar soal ini. ${base[0].charAt(0).toUpperCase()}${base[0].slice(1)}`;
  const contextualParagraph = `Kalau kita tarik sedikit dari berita utamanya, yang menurut saya menarik justru konteks di belakangnya. Ini bukan cuma soal ${String(article.title || "topik yang dibahas").toLowerCase()}, tetapi soal bagaimana perubahan seperti ini bisa terasa ketika benar-benar masuk ke pekerjaan, produk, atau keputusan sehari-hari.`;
  const practicalParagraph = `Di titik ini saya biasanya lebih suka bertanya sederhana: “terus, buat kita apa artinya?” Karena informasi yang bagus akan jauh lebih berguna kalau bisa diterjemahkan menjadi cara berpikir, kebiasaan kerja, atau eksperimen kecil yang bisa dicoba. Nggak harus langsung besar—yang penting kita tahu bagian mana yang layak dibawa pulang.`;

  const paragraphs = [conversationalIntro, ...base.slice(1)];
  const lastIndex = paragraphs.length - 1;
  const hasPmaView = paragraphs.some((text) => /pandangan pma/i.test(text));

  if (paragraphs.length < 5) paragraphs.splice(Math.max(1, lastIndex), 0, contextualParagraph, practicalParagraph);
  else paragraphs.splice(Math.max(1, paragraphs.length - 1), 0, contextualParagraph, practicalParagraph);

  if (!hasPmaView) {
    paragraphs.push(`Pandangan PMA Media: buat saya, inti dari pembahasan ini bukan sekadar siapa yang paling cepat mengikuti tren. Yang lebih penting adalah apakah kita bisa memahami perubahan, melihat risikonya, lalu mengubah insight itu menjadi keputusan dan karya yang lebih matang.`);
  } else {
    const pmaIndex = paragraphs.findIndex((text) => /pandangan pma/i.test(text));
    paragraphs[pmaIndex] = paragraphs[pmaIndex].replace(/^Pandangan PMA\s*:/i, "Pandangan PMA Media:");
  }

  return paragraphs;
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
