import { useState } from "react";

function ComicCard({ episode }) {
  const [slide, setSlide] = useState(0);

  return (
    <article className="design-card">
      <div className="design-card-media">
        <div className="design-card-image-wrap">
          <img
            src={episode.slides[slide]}
            alt={`${episode.title} — slide ${slide + 1}`}
            className="design-card-image"
            loading="lazy"
          />
        </div>
        <span className="design-card-badge">{episode.id}</span>
      </div>

      <div className="design-card-info">
        <div>
          <span className="design-card-category">{episode.date}</span>
          <h3>{episode.title}</h3>
        </div>
      </div>

      <p>{episode.premise}</p>

      <div className="comic-thumbs">
        {episode.slides.map((src, i) => (
          <button
            key={i}
            type="button"
            className={i === slide ? "comic-thumb active" : "comic-thumb"}
            onClick={() => setSlide(i)}
            aria-label={`Slide ${i + 1}`}
          >
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      <a
        href={episode.instagram}
        target="_blank"
        rel="noreferrer"
        className="design-card-link"
      >
        SEE IT ON INSTAGRAM ↗
      </a>
    </article>
  );
}

export default function ComicsHub({ episodes = [] }) {
  if (!episodes.length) return null;

  return (
    <>
      <div className="thework-hero" style={{ marginTop: 64 }}>
        <div>
          <span className="section-index">03 / COMICS</span>
          <h2>JUST BRO THINGS</h2>
        </div>
        <p>
          A comedy comic series from PMA Media — three slides per episode,
          fresh from @imam_falahi. Tap a thumbnail to read each slide.
        </p>
      </div>

      <div className="thework-toolbar">
        <span>
          GALLERY / {episodes.length.toString().padStart(2, "0")} EPISODES
        </span>
      </div>

      <div className="thework-grid">
        {episodes.map((episode) => (
          <ComicCard key={episode.id} episode={episode} />
        ))}
      </div>
    </>
  );
}
