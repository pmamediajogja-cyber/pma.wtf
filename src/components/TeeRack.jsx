import designs from "../data/designs";

export default function TeeRack() {
  const tees = designs.filter((d) => d.id.startsWith("TGB-"));

  return (
    <section className="tee-rack" aria-label="Tee rack — concept store">
      <div className="section-wrap tee-rack-inner">
        <div className="tee-rack-head">
          <div>
            <span className="tee-rack-eyebrow">TUGELANBOTO_ / CONCEPT STORE</span>
            <h2>ON THE RACK</h2>
          </div>
          <p>Streetwear graphics, hung and ready to claim. One buyer only per design — DM to purchase.</p>
        </div>
        <div className="tee-rack-grid">
          {tees.map((tee) => (
            <a className="tee-rack-card" href={`/design/${tee.id}`} key={tee.id} aria-label={`${tee.title} — open detail`}>
              <div className="tee-rack-media">
                <img src={tee.artwork || tee.image} alt={tee.title} loading="lazy" />
                {tee.status === "SOLD" ? (
                  <span className="tee-rack-sold">SOLD</span>
                ) : (
                  <span className="tee-rack-badge">PREMIUM</span>
                )}
              </div>
              <div className="tee-rack-foot">
                <div>
                  <span>{tee.id}</span>
                  <h3>{tee.title}</h3>
                </div>
                <strong>${tee.price}</strong>
              </div>
            </a>
          ))}
        </div>
        <div className="tee-rack-cta">
          <a className="button button-primary" href="/thework/">Shop all designs <span>↗</span></a>
        </div>
      </div>
    </section>
  );
}
