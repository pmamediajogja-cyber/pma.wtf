import { useEffect } from "react";

const SITE_URL = "https://pma.wtf";

export default function JournalSEO({ article, allArticles = [], mode = "breadcrumb" }) {
  const related = article
    ? [
        ...allArticles.filter((item) => item.category === article.category && item.id !== article.id),
        ...allArticles.filter((item) => item.category !== article.category && item.id !== article.id)
      ].slice(0, 3)
    : [];

  useEffect(() => {
    if (!article || mode !== "related") return undefined;

    const scriptId = "pma-journal-breadcrumb-jsonld";
    let structuredData = document.head.querySelector(`#${scriptId}`);
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = scriptId;
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }

    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "PMA.WTF", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/#journal` },
        { "@type": "ListItem", position: 3, name: article.category },
        { "@type": "ListItem", position: 4, name: article.title, item: `${SITE_URL}/journal/${article.id}` }
      ]
    });

    const published = String(article.date || "").match(/^(\d{2})\s+([A-Z]{3})\s+(\d{4})$/);
    if (published) {
      const months = { JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06", JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12" };
      const isoDate = `${published[3]}-${months[published[2]]}-${published[1]}`;
      let publishedMeta = document.head.querySelector('meta[property="article:published_time"]');
      if (!publishedMeta) {
        publishedMeta = document.createElement("meta");
        publishedMeta.setAttribute("property", "article:published_time");
        document.head.appendChild(publishedMeta);
      }
      publishedMeta.setAttribute("content", isoDate);
    }

    return () => {
      const node = document.head.querySelector(`#${scriptId}`);
      if (node) node.remove();
    };
  }, [article?.id, article?.title, article?.category, article?.date, mode]);

  if (!article) return null;

  if (mode === "breadcrumb") {
    return (
      <div className="journal-seo-wrap">
        <nav className="journal-breadcrumb" aria-label="Breadcrumb">
          <a href="/">PMA.WTF</a>
          <span>/</span>
          <a href="/#journal">JOURNAL</a>
          <span>/</span>
          <span>{article.category}</span>
          <span>/</span>
          <strong>{article.title}</strong>
        </nav>
      </div>
    );
  }

  return related.length > 0 ? (
    <section className="journal-related section-wrap" aria-labelledby="journal-related-title">
      <div className="journal-related-heading">
        <div>
          <span className="section-index">05 / KEEP READING</span>
          <h2 id="journal-related-title">RELATED JOURNAL</h2>
        </div>
        <p>More PMA articles from the same editorial universe.</p>
      </div>
      <div className="journal-related-grid">
        {related.map((item) => (
          <a className="journal-related-card" href={`/journal/${item.id}`} key={item.id}>
            <span>{item.id} / {item.category}</span>
            <h3>{item.title}</h3>
            <p>{item.excerpt}</p>
            <strong>READ ARTICLE ↗</strong>
          </a>
        ))}
      </div>
    </section>
  ) : null;
}
