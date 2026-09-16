export default function DesignCard({ design }) {
  const isFree = design.type === 'FREE'
  const originalSrc = design.artwork || design.image
  const imageSrc = import.meta.env.PROD
    ? originalSrc.replace(/\.(jpe?g)$/i, '.webp')
    : originalSrc

  const label = isFree
    ? 'FREE DOWNLOAD'
    : '$' + design.price

  return (
    <article className="design-card">

      {/* =========================
          ARTWORK PREVIEW
      ========================== */}
      <a
        className="design-card-media"
        href={'/design/' + design.id}
        aria-label={'Open ' + design.title}
      >
        <div className="design-card-image-wrap">

          <img
            src={imageSrc}
            alt={design.title}
            className="design-card-image"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 760px) 92vw, (max-width: 1100px) 44vw, 420px"
          />

          {/* WATERMARK PREMIUM */}
          {!isFree && (
            <div className="design-watermark">
              <span>PMA.WTF</span>
              <span>PREVIEW</span>
              <span>PMA.WTF</span>
              <span>PREVIEW</span>
              <span>PMA.WTF</span>
              <span>PREVIEW</span>
              <span>PMA.WTF</span>
              <span>PREVIEW</span>
            </div>
          )}

        </div>

        {/* TYPE BADGE */}
        <span className="design-card-badge">
          {design.type}
        </span>
      </a>

      {/* =========================
          INFO
      ========================== */}
      <div className="design-card-info">

        <div>
          <span className="design-card-category">
            {design.category}
          </span>

          <h3>{design.title}</h3>
        </div>

        <strong>{label}</strong>

      </div>

      {/* =========================
          DESCRIPTION
      ========================== */}
      <p>{design.description}</p>

      {/* =========================
          ACTION
      ========================== */}
      <a
        href={'/design/' + design.id}
        className="design-card-link"
      >
        {isFree
          ? 'VIEW FREE DESIGN'
          : 'VIEW PREMIUM PRODUCT'} ↗
      </a>

    </article>
  )
}