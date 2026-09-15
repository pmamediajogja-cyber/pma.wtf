import { useMemo, useState } from "react";
import DesignCard from "./DesignCard";

export default function TheWorkHub({ designs = [] }) {
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
        <p>Original graphic work by PMA Media — available as free downloads and premium digital products.</p>
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
    </main>
  );
}
