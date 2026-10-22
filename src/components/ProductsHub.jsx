export default function ProductsHub() {
  return (
    <main>
      <section className="section-wrap section-block products-hub-section">
        <div className="section-heading">
          <div>
            <span className="section-index">PRODUCTS</span>
            <h2>PRODUCTS</h2>
          </div>
          <p>Digital systems built by PMA to solve real operational problems — not just look good.</p>
        </div>
        <div className="products-hub-grid">
          <a className="product-card" href="/products/notary/" aria-label="Open PMA Legal Ops Notary and PPAT demo">
            <div className="product-card-visual">
              <div className="product-card-orbit" />
              <div className="product-card-mark"><span>PMA</span><b>LEGAL<br />OPS</b></div>
              <span className="product-card-status">LIVE DEMO ↗</span>
            </div>
            <div className="product-card-info">
              <div>
                <span className="product-card-kicker">PRODUCT / 001</span>
                <h3>PMA LEGAL OPS</h3>
                <p>Notary &amp; PPAT Management System</p>
                <small>Client intake · Akta · PPAT · Documents · Scheduling · Case tracking</small>
              </div>
              <div className="product-card-arrow">↗</div>
            </div>
          </a>
          <a className="product-card products-hub-soon" href="/products/cektanahku/" aria-label="CekTanahKu — coming soon">
            <div className="product-card-visual">
              <div className="product-card-orbit" />
              <div className="product-card-mark"><span>CEK</span><b>TANAH<br />KU</b></div>
              <span className="product-card-status">SEGERA HADIR</span>
            </div>
            <div className="product-card-info">
              <div>
                <span className="product-card-kicker">PRODUCT / 002</span>
                <h3>CEKTANAHKU</h3>
                <p>Marketplace tanah berbasis peta + verifikasi SKPT</p>
                <small>Jual beli tanah · Peta · Cek SKPT terverifikasi</small>
              </div>
              <div className="product-card-arrow">↗</div>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}
