import { useState } from "react";

function ComicCard({ episode }) {
  const [slide, setSlide] = useState(0);

  return (
    <article className="poster-card comic-card">
      <div className="poster-image comic-viewer">
        <img
          src={episode.slides[slide]}
          alt={`${episode.title} — slide ${slide + 1}`}
          loading="lazy"
        />
        <span className="poster-episode-badge">{episode.id}</span>
      </div>

      <div className="poster-body">
        <span className="poster-brand-line">{episode.date}</span>
        <h3>{episode.title}</h3>
        <p className="poster-niche">{episode.premise}</p>

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
      </div>
    </article>
  );
}

export default function ComicsHub({ episodes = [] }) {
  if (!episodes.length) return null;

  return (
    <section className="posters-hub">
      <div className="posters-header">
        <div>
          <span className="section-index">03 / COMICS</span>
          <h2 className="section-title">JUST BRO THINGS</h2>
        </div>
        <p className="posters-sub">
          A comedy comic series from PMA Media — three slides per episode,
          fresh from @imam_falahi. Tap the thumbnails to read each slide.
        </p>
      </div>

      <div className="posters-grid">
        {episodes.map((episode) => (
          <ComicCard key={episode.id} episode={episode} />
        ))}
      </div>
    </section>
  );
}
