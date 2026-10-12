import { useMemo, useState } from "react";
import DesignCard from "./DesignCard";
import { PosterCard } from "./PostersHub";
import ComicsHub from "./ComicsHub";

export default function TheWorkHub({ designs = [], posters = [], comics = [] }) {
  const [filter, setFilter] = useState("ALL");
  const filtered = useMemo(
    () => (filter === "ALL" ? designs : designs.filter((design) => design.type === filter)),
    [designs, filter]
  );

  return (
    <main className="thework-page section-wrap">
      <div className="thework-hero">
        <div>
          <span className="section-index">01 / THE WORK</span>
          <h1>THE WORK</h1>
        </div>
        <p>Original graphic work by PMA Media — tee designs and brand poster concepts.</p>
      </div>

      <div className="thework-toolbar">
        <span>LIBRARY / {filtered.length.toString().padStart(2, "0")} ITEMS</span>
        <div>
          {["ALL", "FREE", "PREMIUM"].map((option) => (
            <button
              key={option}
              type="button"
              className={filter === option ? "filter-button active" : "filter-button"}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="thework-grid">
        {filtered.map((design) => <DesignCard key={design.id} design={design} />)}
      </div>

      {posters.length > 0 && (
        <>
          <div className="thework-hero" style={{ marginTop: 64 }}>
            <div>
              <span className="section-index">02 / BRAND POSTERS</span>
              <h2>BRAND POSTERS</h2>
            </div>
            <p>Poster concepts for men&apos;s hobby brands — automotive, workshops, coffee, watches and more. Every visual element carries meaning; read the signs. New poster added automatically with each release.</p>
          </div>

          <div className="thework-toolbar">
            <span>GALLERY / {posters.length.toString().padStart(2, "0")} POSTERS</span>
          </div>

          <div className="thework-grid">
            {posters.map((poster) => <PosterCard key={poster.id} poster={poster} />)}
          </div>
        </>
      )}

      {comics.length > 0 && <ComicsHub episodes={comics} />}
    </main>
  );
}
