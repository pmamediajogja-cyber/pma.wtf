import { useEffect, useMemo, useState } from "react";
import journalMedia from "../data/journalMedia";
import "../journalHub.css";

const SITE_URL = "https://pma.wtf";

const groups = [
  { key: "ALL", label: "ALL JOURNAL", note: "The complete PMA editorial archive." },
  { key: "CYBERSECURITY", label: "CYBERSECURITY", note: "Threats, vulnerabilities, identity and defensive practice." },
  { key: "AI & TECHNOLOGY", label: "AI & TECHNOLOGY", note: "Agents, infrastructure, governance and what changes next." },
  { key: "DESIGN LAB", label: "DESIGN LAB", note: "Original thinking on graphic design, apparel, identity and visual decisions." },
  { key: "BUILD / TECH", label: "BUILD / TECH", note: "Web, IT, automation, systems and lessons from building real things." },
  { key: "STREETWEAR & CULTURE", label: "STREETWEAR & CULTURE", note: "Fits, graphics, drops and the culture around the garment." }
];

export default function JournalHub({ articles = [], onOpenArticle }) {
  const [active, setActive] = useState("ALL");

  const visibleArticles = useMemo(
    () => active === "ALL" ? articles : articles.filter((article) => article.category === active),
    [active, articles]
  );

  useEffect(() => {
    document.title = "Journal — PMA.WTF";
    const description = "PMA Journal — cybersecurity, AI, design, technical builds, streetwear culture and original editorial thinking from PMA Media Yogyakarta.";
    let meta = document.head.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE_URL}/journal`;

    let structuredData = document.head.querySelector("#pma-journal-hub-jsonld");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "pma-journal-hub-jsonld";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "PMA Journal",
      description,
      url: `${SITE_URL}/journal`,
      isPartOf: { "@type": "WebSite", name: "PMA.WTF", url: SITE_URL },
      about: groups.slice(1).map((group) => group.label),
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: articles.length,
        itemListElement: articles.map((article, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/journal/${article.id}`,
          name: article.title
        }))
      }
    });

    return () => {
      const node = document.head.querySelector("#pma-journal-hub-jsonld");
      if (node) node.remove();
    };
  }, [articles]);

  return (
    <main className="journal-hub-page">
      <section className="journal-hub-hero section-wrap">
        <div className="journal-hub-kicker">03 / JOURNAL ARCHIVE</div>
        <div className="journal-hub-hero-grid">
          <div>
            <h1>IDEAS WORTH<br /><em>READING.</em></h1>
            <p className="journal-hub-lead">A growing editorial archive about cybersecurity, AI, design, technical builds and streetwear culture — with PMA's own perspective on how ideas work in practice.</p>
          </div>
          <div className="journal-hub-stat">
            <span>ARCHIVE</span>
            <strong>{String(articles.length).padStart(2, "0")}</strong>
            <small>ARTICLES / 2026</small>
          </div>
        </div>
      </section>

      <section className="journal-hub-controls section-wrap" aria-label="Filter journal by category">
        <div className="journal-hub-filter-label">FILTER / {String(visibleArticles.length).padStart(2, "0")} RESULTS</div>
        <div className="journal-hub-filters">
          {groups.map((group) => (
            <button key={group.key} type="button" className={active === group.key ? "active" : ""} onClick={() => setActive(group.key)}>
              {group.label}
            </button>
          ))}
        </div>
      </section>

      <section className="journal-hub-list section-wrap">
        <div className="journal-hub-list-heading">
          <div>
            <span className="section-index">04 / {groups.find((group) => group.key === active)?.label}</span>
            <h2>{groups.find((group) => group.key === active)?.label}</h2>
          </div>
          <p>{groups.find((group) => group.key === active)?.note}</p>
        </div>

        <div className="journal-hub-grid">
          {visibleArticles.map((article, index) => {
            const media = journalMedia[article.id];
            const isOriginal = article.source === "PMA Original";
            return (
              <article className="journal-hub-card" key={article.id}>
                <button className="journal-hub-card-main" type="button" onClick={() => onOpenArticle(article.id)} aria-label={`Read ${article.title}`}>
                  <div className="journal-hub-card-image">
                    <img src={media?.image || "/journal/001.svg"} alt={media?.credit ? `${article.title} — ${media.credit}` : `${article.title} — PMA editorial image`} loading={index > 5 ? "lazy" : "eager"} onError={(event) => { if (!event.currentTarget.src.endsWith("/journal/001.svg")) event.currentTarget.src = "/journal/001.svg"; }} />
                    <span>{isOriginal ? "PMA ORIGINAL" : "SOURCE EDITORIAL"}</span>
                  </div>
                  <div className="journal-hub-card-meta"><span>{article.id} / {article.tag}</span><span>{article.date}</span></div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <strong>READ PMA REVIEW ↗</strong>
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="journal-hub-original section-wrap">
        <div>
          <span className="section-index">PMA / EDITORIAL SIGNAL</span>
          <h2>NOT JUST<br /><em>A NEWS FEED.</em></h2>
        </div>
        <p>Some entries begin with outside reporting. Others are written by PMA from first principles. The point is the same: turn information into something useful, readable and connected to real creative or technical work.</p>
      </section>
    </main>
  );
}
