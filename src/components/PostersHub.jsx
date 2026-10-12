import { useState } from "react";

function PosterCard({ poster }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="design-card">
      <div className="design-card-media">
        <div className="design-card-image-wrap">
          <img
            src={poster.image}
            alt={poster.brand}
            className="design-card-image"
            loading="lazy"
          />
        </div>
        <span className="design-card-badge">POSTER CONCEPT</span>
      </div>

      <div className="design-card-info">
        <div>
          <span className="design-card-category">{poster.niche}</span>
          <h3>{poster.brand}</h3>
        </div>
        <strong>{poster.date}</strong>
      </div>

      <p className="poster-tagline">“{poster.tagline}”</p>

      <button
        type="button"
        className="design-card-link poster-signs-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {open ? "HIDE SIGNS" : "READ THE SIGNS"} {open ? "▾" : "▸"}
      </button>
      {open && <p className="poster-signs">{poster.signs}</p>}

      <a
        href={poster.instagram}
        target="_blank"
        rel="noreferrer"
        className="design-card-link"
      >
        SEE IT ON INSTAGRAM ↗
      </a>
    </article>
  );
}

export default function PostersHub({ posters = [] }) {
  return (
    <main className="thework-page section-wrap">
      <div className="thework-hero">
        <div>
          <span className="section-index">BRAND POSTERS</span>
          <h1>BRAND POSTERS</h1>
        </div>
        <p>
          Poster concepts for men&apos;s hobby brands — automotive, workshops,
          coffee, watches and more. Every visual element carries meaning; read
          the signs. New poster added automatically with each release.
        </p>
      </div>

      <div className="thework-toolbar">
        <span>
          GALLERY / {posters.length.toString().padStart(2, "0")} POSTERS
        </span>
      </div>

      <div className="thework-grid">
        {posters.map((poster) => (
          <PosterCard key={poster.id} poster={poster} />
        ))}
      </div>
    </main>
  );
}
