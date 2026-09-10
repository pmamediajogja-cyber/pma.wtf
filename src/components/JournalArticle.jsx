import { useEffect } from "react";

export default function JournalArticle({ article, onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [article?.id]);

  if (!article) return null;

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "70px 32px 120px", position: "relative", zIndex: 2 }}>
      <button
        onClick={onBack}
        style={{ background: "none", border: 0, color: "#8d939c", font: '11px "DM Mono", monospace', cursor: "pointer", padding: 0, marginBottom: 70 }}
      >
        ← BACK TO JOURNAL
      </button>

      <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", color: "#64e8ff", font: '10px "DM Mono", monospace', letterSpacing: ".12em" }}>
          <span>{article.id} / {article.tag}</span>
          <span>{article.date}</span>
        </div>

        <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "clamp(3rem, 8vw, 7.5rem)", lineHeight: .9, letterSpacing: "-.07em", margin: "28px 0 30px", maxWidth: 900 }}>
          {article.title}
        </h1>

        <p style={{ maxWidth: 760, color: "#b8bdc5", fontSize: 18, lineHeight: 1.7, marginBottom: 55 }}>
          {article.excerpt}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 260px", gap: 55 }}>
          <article>
            <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 28 }}>
              <span style={{ color: "#64e8ff", font: '10px "DM Mono", monospace', letterSpacing: ".12em" }}>PMA REVIEW / OUR TAKE</span>
            </div>

            {article.review.map((paragraph, index) => (
              <p key={index} style={{ color: "#c4c8ce", fontSize: 16, lineHeight: 1.9, margin: "28px 0" }}>
                {paragraph}
              </p>
            ))}
          </article>

          <aside style={{ alignSelf: "start", position: "sticky", top: 30, border: "1px solid rgba(255,255,255,.1)", background: "rgba(16,18,22,.72)", padding: 22 }}>
            <div style={{ color: "#606771", font: '9px "DM Mono", monospace', letterSpacing: ".1em", marginBottom: 10 }}>ORIGINAL SOURCE</div>
            <strong style={{ display: "block", fontFamily: '"Space Grotesk", sans-serif', fontSize: 20, marginBottom: 22 }}>{article.source}</strong>
            <a href={article.url} target="_blank" rel="noreferrer" style={{ display: "inline-block", color: "#64e8ff", font: '10px "DM Mono", monospace', borderBottom: "1px solid rgba(100,232,255,.35)", paddingBottom: 5 }}>
              READ SOURCE ↗
            </a>
            <div style={{ color: "#606771", font: '9px "DM Mono", monospace', lineHeight: 1.7, marginTop: 25 }}>
              PMA editorial content is an independent review and interpretation of the linked source.
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
