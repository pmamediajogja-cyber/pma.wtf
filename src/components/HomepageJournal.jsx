import { useEffect, useMemo, useRef, useState } from "react";

const ICONS = {
  cyber: <><path d="M12 2 20 5v6c0 5.2-3.4 9.2-8 11-4.6-1.8-8-5.8-8-11V5l8-3Z"/><rect x="9" y="10" width="6" height="6" rx="1"/><path d="M10.5 10V8.5a1.5 1.5 0 0 1 3 0V10"/></>,
  ai: <><circle cx="12" cy="12" r="8"/><path d="M8 12h8M12 8v8M5 5l2 2M19 5l-2 2M5 19l2-2M19 19l-2-2"/></>,
  design: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 16 16 8M8 8h4M12 16h4"/></>,
  build: <><path d="m14.5 6.5 3-3 3 3-3 3"/><path d="m10 10 7.5-7.5M7 13l-4 4 4 4 4-4"/><path d="m13 7 4 4-4 4"/></>,
  street: <><path d="M8 4h8l2 4v12H6V8l2-4Z"/><path d="M8 4v5h8V4M9 14h6"/></>
};

function themeFor(article) {
  const text = `${article?.tag || ""} ${article?.title || ""} ${article?.category || ""}`.toLowerCase();
  if (text.includes("streetwear") || text.includes("fashion") || text.includes("graphic tee") || text.includes("palace") || text.includes("gramicci")) return "street";
  if (text.includes("design") || text.includes("typography") || text.includes("brand") || text.includes("graphic") || text.includes("print")) return "design";
  if (text.includes("build") || text.includes("web") || text.includes("network") || text.includes("automation") || text.includes("typescript") || text.includes("coding")) return "build";
  if (text.includes("ai") || text.includes("agent") || text.includes("claude") || text.includes("openai") || text.includes("muse")) return "ai";
  return "cyber";
}

function JournalIcon({ article }) {
  const theme = themeFor(article);
  return <span className={`homepage-journal-icon is-${theme}`} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{ICONS[theme]}</svg></span>;
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function HomepageJournal({ articles }) {
  const railRef = useRef(null);
  const [order, setOrder] = useState(() => shuffle(articles));
  const [paused, setPaused] = useState(false);
  const items = useMemo(() => order.slice(0, Math.min(12, order.length)), [order]);

  useEffect(() => {
    if (paused || items.length < 2) return undefined;
    const timer = window.setInterval(() => {
      const rail = railRef.current;
      if (!rail) return;
      const cards = rail.querySelectorAll(".homepage-journal-card");
      const width = cards[0]?.getBoundingClientRect().width || 250;
      const step = Math.round(width + 14);
      const direction = Math.random() > 0.18 ? 1 : -1;
      const distance = step * (Math.random() > 0.68 ? 2 : 1);
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      if (maxScroll <= 0) return;
      if (direction > 0 && rail.scrollLeft + distance >= maxScroll - 10) {
        rail.scrollTo({ left: 0, behavior: "smooth" });
        window.setTimeout(() => setOrder((current) => shuffle(current)), 500);
      } else if (direction < 0 && rail.scrollLeft - distance <= 0) {
        rail.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        rail.scrollBy({ left: direction * distance, behavior: "smooth" });
      }
    }, 2600 + Math.random() * 1700);
    return () => window.clearInterval(timer);
  }, [items.length, paused]);

  return <div className="homepage-journal-shell">
    <div className="homepage-journal-topline">
      <a className="homepage-journal-open" href="/journal/" aria-label="Open the PMA Journal"><span>VIEW ALL JOURNAL</span><b>↗</b></a>
      <span className="homepage-journal-motion">RANDOM MOTION / AUTO-SCROLL</span>
    </div>
    <div className="homepage-journal-rail-wrap">
      <button className="homepage-journal-arrow" type="button" aria-label="Previous journal cards" onClick={() => railRef.current?.scrollBy({ left: -320, behavior: "smooth" })}>←</button>
      <div className="homepage-journal-rail" ref={railRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {items.map((article) => <a className="homepage-journal-card" href="/journal/" key={article.id} aria-label={`Open PMA Journal — ${article.title}`}>
          <div className="homepage-journal-card-head"><JournalIcon article={article} /><span>{article.id} / {article.category}</span><time>{article.date}</time></div>
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <div className="homepage-journal-card-foot"><span>READ JOURNAL</span><b>↗</b></div>
        </a>)}
      </div>
      <button className="homepage-journal-arrow" type="button" aria-label="Next journal cards" onClick={() => railRef.current?.scrollBy({ left: 320, behavior: "smooth" })}>→</button>
    </div>
  </div>;
}
