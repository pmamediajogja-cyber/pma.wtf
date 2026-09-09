export default function DesignCard({ design }) {
  const label = design.type === 'FREE' ? 'FREE DOWNLOAD' : '$' + design.price

  return (
    <article className="design-card">
      <div className="design-card-media">
        <div className="design-card-placeholder" aria-label={design.title + ' preview placeholder'}>
          <span>{design.id}</span>
          <small>ARTWORK PREVIEW</small>
        </div>
        <span className="design-card-badge">{design.type}</span>
      </div>
      <div className="design-card-info">
        <div>
          <span className="design-card-category">{design.category}</span>
          <h3>{design.title}</h3>
        </div>
        <strong>{label}</strong>
      </div>
      <p>{design.description}</p>
      <a href="#contact" className="design-card-link">{design.type === 'FREE' ? 'GET FREE DESIGN' : 'VIEW PRODUCT'} ↗</a>
    </article>
  )
}
