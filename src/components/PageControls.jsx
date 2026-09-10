import { useEffect, useState } from "react";

export default function PageControls({ showBack = false }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = "/";
  };

  return (
    <div className="page-controls" aria-label="Page navigation">
      {showBack && (
        <button type="button" className="page-control page-control-back" onClick={goBack} aria-label="Back">
          <span>←</span>
          <small>BACK</small>
        </button>
      )}
      <button
        type="button"
        className={showTop ? "page-control page-control-top visible" : "page-control page-control-top"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        title="Back to top"
      >
        <span>↑</span>
        <small>TOP</small>
      </button>
    </div>
  );
}
