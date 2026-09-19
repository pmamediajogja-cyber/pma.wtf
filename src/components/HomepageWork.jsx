import { useEffect, useMemo, useRef, useState } from "react";

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function HomepageWork({ designs = [] }) {
  const railRef = useRef(null);
  const timerRef = useRef(null);
  const [items, setItems] = useState(() => shuffle(designs));
  const [paused, setPaused] = useState(false);\n  const [isCompactDevice, setIsCompactDevice] = useState(false);

  const visibleItems = useMemo(() => items.slice(0, Math.min(items.length, 6)), [items]);

  useEffect(() => {
    setItems(shuffle(designs));
  }, [designs]);

  useEffect(() => {
    if (paused || isCompactDevice || visibleItems.length < 2) return undefined;

    timerRef.current = window.setInterval(() => {
      const rail = railRef.current;
      if (!rail) return;

      const cards = [...rail.querySelectorAll(".homepage-work-card")];
      if (cards.length < 2) return;

      const cardStep = cards[1].offsetLeft - cards[0].offsetLeft;
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      const direction = Math.random() > 0.18 ? 1 : -1;
      const distance = Math.random() > 0.72 ? 2 : 1;
      const next = rail.scrollLeft + direction * cardStep * distance;

      if (next >= maxScroll - 8) {
        setItems((current) => shuffle(current));
        rail.scrollTo({ left: 0, behavior: "smooth" });
      } else if (next <= 8) {
        rail.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        rail.scrollTo({ left: next, behavior: "smooth" });
      }
    }, 2800 + Math.floor(Math.random() * 1300));

    return () => window.clearInterval(timerRef.current);
  }, [paused, isCompactDevice, visibleItems.length]);

  const shift = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector(".homepage-work-card");
    const distance = card ? card.getBoundingClientRect().width + 14 : 300;
    rail.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <div className="homepage-work-shell" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="homepage-work-topline">
        <span className="homepage-work-motion">{isCompactDevice ? "SWIPE / MANUAL" : `AUTO SHIFT / ${paused ? "PAUSED" : "MOVING"}`}</span>
        <a className="homepage-work-open" href="/thework/" aria-label="Open The Work">
          VIEW ALL WORK <b>↗</b>
        </a>
      </div>

      <div className="homepage-work-rail-wrap">
        <button className="homepage-work-arrow" type="button" onClick={() => shift(-1)} aria-label="Previous work">←</button>
        <div ref={railRef} className="homepage-work-rail" aria-label="Featured work">
          {visibleItems.map((design) => (
            <a className="homepage-work-card" href="/thework/" key={design.id} aria-label={`Open The Work — ${design.title}`}>
              <div className="homepage-work-media">
                <img src={design.artwork || design.image} alt={design.title} loading="lazy" />
                {!design.type || design.type === "FREE" ? null : <span className="homepage-work-badge">PREMIUM</span>}
              </div>
              <div className="homepage-work-card-foot">
                <div>
                  <span>{design.category}</span>
                  <h3>{design.title}</h3>
                </div>
                <strong>{design.type === "FREE" ? "FREE" : `$${design.price}`}</strong>
              </div>
            </a>
          ))}
        </div>
        <button className="homepage-work-arrow" type="button" onClick={() => shift(1)} aria-label="Next work">→</button>
      </div>
    </div>
  );
}
