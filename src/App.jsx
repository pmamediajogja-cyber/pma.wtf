import { useEffect, useState } from 'react'

const navItems = [
  ['Designs', '#designs'],
  ['Services', '#services'],
  ['Journal', '#journal'],
  ['About', '#about'],
]

const pillars = [
  { number: '01', title: 'FREE DESIGNS', text: 'Useful downloads from the PMA design archive.', tag: 'FREE' },
  { number: '02', title: 'PREMIUM WORK', text: 'Print-ready artwork and digital products.', tag: 'SHOP' },
  { number: '03', title: 'SERVICES', text: 'Design, digital and creative work for clients.', tag: 'HIRE' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.title = 'PMA.WTF — Digital Creative Hub'
  }, [])

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-overlay" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="PMA.WTF home">
          <span className="brand-mark">PMA</span><span className="brand-dot">.</span><span>WTF</span>
        </a>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /> <span />
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Work with me</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy reveal">
            <div className="eyebrow"><span className="status-dot" /> DIGITAL CREATIVE / YOGYAKARTA</div>
            <h1>MAKE SOMETHING<br /><em>WORTH CLICKING.</em></h1>
            <p className="hero-lead">Designs, digital products, creative work and ideas — built under <strong>PMA Media Yogyakarta.</strong></p>
            <div className="hero-actions">
              <a className="button button-primary" href="#designs">Explore designs <span>↗</span></a>
              <a className="button button-ghost" href="#about">Who is PMA?</a>
            </div>
          </div>

          <div className="hero-meta reveal-delay">
            <div className="meta-line"><span>BASED IN</span><strong>YOGYAKARTA, ID</strong></div>
            <div className="meta-line"><span>FOCUS</span><strong>DESIGN · DIGITAL · TECH</strong></div>
            <div className="meta-line"><span>STATUS</span><strong className="online">OPEN FOR WORK</strong></div>
          </div>

          <div className="scroll-cue">SCROLL <span>↓</span></div>
        </section>

        <section id="designs" className="section-wrap section-block">
          <div className="section-heading">
            <div><span className="section-index">01 /</span><h2>THE WORK</h2></div>
            <p>A growing library of original designs — some free, some premium.</p>
          </div>
          <div className="pillar-grid">
            {pillars.map((item) => (
              <a className="pillar-card" href={item.tag === 'HIRE' ? '#services' : '#contact'} key={item.number}>
                <div className="card-top"><span>{item.number}</span><span className="card-tag">{item.tag}</span></div>
                <div className="card-art"><span>{item.number}</span></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="card-arrow">VIEW <b>↗</b></span>
              </a>
            ))}
          </div>
        </section>

        <section id="services" className="section-wrap section-block split-section">
          <div>
            <span className="section-index">02 / SERVICES</span>
            <h2>BUILD IT.<br /><em>MAKE IT MATTER.</em></h2>
          </div>
          <div className="service-list">
            {['T-Shirt & Graphic Design', 'Brand & Social Media Visuals', 'Landing Pages & Websites', 'Digital Creative Support'].map((service, index) => (
              <a href="#contact" className="service-row" key={service}>
                <span>0{index + 1}</span><strong>{service}</strong><b>↗</b>
              </a>
            ))}
          </div>
        </section>

        <section id="journal" className="section-wrap section-block journal-section">
          <div className="section-heading">
            <div><span className="section-index">03 /</span><h2>JOURNAL</h2></div>
            <p>Notes on design, technology, creative work and building things online.</p>
          </div>
          <div className="journal-placeholder">
            <span>COMING SOON / 001</span>
            <h3>Ideas worth sharing.</h3>
            <a href="#contact">Explore the journal ↗</a>
          </div>
        </section>

        <section id="about" className="section-wrap section-block about-section">
          <div className="about-label"><span className="section-index">04 / ABOUT</span><span>PMA MEDIA YOGYAKARTA</span></div>
          <div className="about-copy">
            <h2>PERSONAL<br /><em>MEETS BUSINESS.</em></h2>
            <p>PMA.WTF is the personal digital hub of Imam Falahi and a creative platform operating under <strong>PT PMA Media Yogyakarta</strong>.</p>
            <p>The site brings together professional profile, portfolio, digital products, design work, services and editorial content in one place.</p>
            <div className="about-links"><a href="#contact">Contact ↗</a><a href="#top">View profile ↗</a></div>
          </div>
        </section>

        <section id="contact" className="section-wrap contact-section">
          <span className="section-index">05 / CONTACT</span>
          <h2>HAVE AN IDEA?<br /><em>LET'S BUILD IT.</em></h2>
          <a className="contact-email" href="mailto:hello@pma.wtf">hello@pma.wtf ↗</a>
          <div className="company-line">PT PMA MEDIA YOGYAKARTA · DIGITAL CREATIVE & TECHNOLOGY</div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© 2026 PMA MEDIA YOGYAKARTA</span>
        <span>PMA.WTF / DIGITAL CREATIVE HUB</span>
      </footer>
    </div>
  )
}

export default App
