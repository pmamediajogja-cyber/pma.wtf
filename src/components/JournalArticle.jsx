import { useEffect } from "react";

export default function JournalArticle({ article, onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [article?.id]);

  if (!article) return null;

  const illustration = `/journal/${article.id}.svg`;

  return (
    <main className="journal-article-page">
      <button className="journal-back" onClick={onBack}>← BACK TO JOURNAL</button>

      <div className="journal-article-shell">
        <div className="journal-article-meta">
          <span>{article.id} / {article.tag}</span>
          <span>{article.date}</span>
        </div>

        <div className="journal-article-hero">
          <img src={illustration} alt={`${article.title} — PMA editorial illustration`} />
          <span className="journal-article-hero-label">PMA ORIGINAL / EDITORIAL ILLUSTRATION</span>
        </div>

        <h1>{article.title}</h1>

        <p className="journal-article-excerpt">{article.excerpt}</p>

        <div className="journal-article-grid">
          <article>
            <div className="journal-review-label">PMA REVIEW / OUR TAKE</div>
            {article.review.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>

          <aside className="journal-source-card">
            <div className="source-label">ORIGINAL SOURCE</div>
            <strong>{article.source}</strong>
            <a href={article.url} target="_blank" rel="noreferrer">READ SOURCE ↗</a>
            <div className="source-note">
              PMA editorial content is an independent review and interpretation of the linked source.
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
