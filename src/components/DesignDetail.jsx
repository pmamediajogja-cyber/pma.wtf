import { Link } from 'react'

export default function DesignDetail({ design }) {
  if (!design) {
    return (
      <main className="detail-page section-wrap">
        <span className="section-index">404 / DESIGN</span>
        <h1>WORK NOT FOUND.</h1>
        <a className="button button-primary" href="/#designs">Back to designs ↗</a>
      </main>
    )
  }

  const isFree = design.type === 'FREE'

  return (
    <main className="detail-page section-wrap">
      <div className="detail-back"><a href="/#designs">← BACK TO DESIGNS</a></div>

      <div className="detail-layout">
        <div className="detail-preview">
          <div className="detail-art">
            <span>{design.id}</span>
            <small>ARTWORK PREVIEW</small>
          </div>
          <div className="detail-preview-note">PREVIEW / FINAL FILE AVAILABLE AFTER DOWNLOAD</div>
        </div>

        <div className="detail-copy">
          <div className="eyebrow"><span className="status-dot" /> {design.category} / {design.type}</div>
          <h1>{design.title}<br /><em>{isFree ? 'FREE.' : 'PREMIUM.'}</em></h1>
          <p className="detail-description">{design.description}</p>

          <div className="detail-price">
            <span>{isFree ? 'NO COST' : 'DIGITAL PRODUCT'}</span>
            <strong>{isFree ? 'FREE' : '$' + design.price}</strong>
          </div>

          <div className="detail-specs">
            <div><span>FORMAT</span><strong>PRINT-READY DIGITAL FILE</strong></div>
            <div><span>DELIVERY</span><strong>INSTANT DOWNLOAD</strong></div>
            <div><span>LICENSE</span><strong>{isFree ? 'SEE DOWNLOAD TERMS' : 'SEE PRODUCT TERMS'}</strong></div>
          </div>

          <a className="button button-primary detail-action" href="#contact">
            {isFree ? 'GET FREE DESIGN ↗' : 'BUY DESIGN ↗'}
          </a>

          <p className="detail-footnote">
            {isFree
              ? 'Free artwork will be connected to the real download file in the next store phase.'
              : 'Premium checkout will be connected after the product and payment system are finalized.'}
          </p>
        </div>
      </div>
    </main>
  )
}
