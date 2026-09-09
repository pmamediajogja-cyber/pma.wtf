import { motion } from "framer-motion";

const studioInfo = {
  name: "PT PMA Media Yogyakarta",
  brand: "PMA.WTF",
  title: "DIGITAL CREATIVE & TECHNOLOGY STUDIO",
  location: "Yogyakarta, Indonesia",
};

const services = [
  {
    number: "01",
    title: "DIGITAL PRODUCTS",
    description:
      "Digital assets, templates, graphics, and practical digital products.",
  },
  {
    number: "02",
    title: "DESIGN & CREATIVE",
    description:
      "Graphic design, visual content, branding assets, photography, and creative production.",
  },
  {
    number: "03",
    title: "TECHNOLOGY",
    description:
      "Web development, technical support, digital systems, and practical technology solutions.",
  },
  {
    number: "04",
    title: "BUSINESS SUPPORT",
    description:
      "Digital support, operational systems, documentation, and technology-driven business solutions.",
  },
];

export default function Profile() {
  return (
    <main className="site-page profile-page">
      <section className="section-wrap profile-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-index">
            01 / PROFILE
          </span>

          <h1>
            DIGITAL
            <br />
            <em>CREATIVE HUB.</em>
          </h1>

          <p className="hero-lead">
            PMA.WTF is a digital creative hub operating under{" "}
            <strong>PT PMA Media Yogyakarta.</strong>
          </p>

          <p className="hero-lead">
            Bringing together digital products, design, technology,
            creative work, and professional services in one place.
          </p>
        </motion.div>
      </section>

      <section className="section-wrap section-block">
        <div className="section-heading">
          <div>
            <span className="section-index">
              02 / WHO WE ARE
            </span>

            <h2>ABOUT PMA</h2>
          </div>

          <p>
            A multidisciplinary digital studio focused on practical
            creative work, technology, and digital products.
          </p>
        </div>

        <div className="about-profile-grid">
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-index">STUDIO</span>

            <h3>{studioInfo.name}</h3>

            <p>
              PMA.WTF is the digital creative platform operating
              under PT PMA Media Yogyakarta.
            </p>

            <div className="profile-meta">
              <span>BRAND</span>
              <strong>{studioInfo.brand}</strong>

              <span>FOCUS</span>
              <strong>{studioInfo.title}</strong>

              <span>LOCATION</span>
              <strong>{studioInfo.location}</strong>
            </div>
          </motion.div>

          <motion.div
            className="glass-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-index">MISSION</span>

            <h3>BUILD DIGITAL WORK THAT MATTERS.</h3>

            <p>
              We combine creativity, technology, and practical
              problem-solving to build digital products, visual
              communication, websites, and professional support.
            </p>

            <p>
              From visual design to technology implementation,
              PMA.WTF connects different disciplines into one
              flexible creative ecosystem.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-wrap section-block">
        <div className="section-heading">
          <div>
            <span className="section-index">
              03 / CAPABILITIES
            </span>

            <h2>WHAT WE DO</h2>
          </div>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <div className="service-row" key={service.number}>
              <span>{service.number}</span>

              <div>
                <strong>{service.title}</strong>

                <p>{service.description}</p>
              </div>

              <b>↗</b>
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap section-block profile-cta">
        <span className="section-index">
          04 / PEOPLE BEHIND PMA
        </span>

        <h2>
          WANT TO KNOW
          <br />
          <em>WHO BUILDS IT?</em>
        </h2>

        <p>
          Explore the professional profile and CV behind
          PMA Media Yogyakarta.
        </p>

        <a
          className="button button-primary"
          href="/cv"
        >
          View CV <span>↗</span>
        </a>
      </section>
    </main>
  );
}