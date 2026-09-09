export default function DesignCard({ design }) {
  const label = design.type === 'FREE' ? 'FREE DOWNLOAD' : '$' + design.price

  return (
    <article className="design-card">
      <a className="design-card-media" href={'/design/' + design.id} aria-label={'Open ' + design.title}>
        <div className="design-card-placeholder">
          <span>{design.id}</span>
          <small>ARTWORK PREVIEW</small>
        </div>
        <span className="design-card-badge">{design.type}</span>
      </a>
      <div className="design-card-info">
        <div>
          <span className="design-card-category">{design.category}</span>
          <h3>{design.title}</h3>
        </div>
        <strong>{label}</strong>
      </div>
      <p>{design.description}</p>
      <a href={'/design/' + design.id} className="design-card-link">
        {design.type === 'FREE' ? 'VIEW FREE DESIGN' : 'VIEW PREMIUM PRODUCT'} ↗
      </a>
    </article>
  )
}
