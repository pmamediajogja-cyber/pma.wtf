import { useEffect, useState } from 'react'
import DesignDetail from './components/DesignDetail'
import DesignCard from './components/DesignCard'
import { designs } from './data/designs'

const navItems = [['Designs','#designs'],['Services','#services'],['Journal','#journal'],['About','#about']]

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('ALL')
  const filteredDesigns = filter === 'ALL' ? designs : designs.filter(d => d.type === filter)

  return <>
    <header className="site-header"><a className="brand" href="#top" aria-label="PMA.WTF home"><span className="brand-mark">PMA</span><span className="brand-dot">.</span><span>WTF</span></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><span/><span/></button><nav className={menuOpen?'nav-links open':'nav-links'}>{navItems.map(([label,href])=><a key={label} href={href} onClick={()=>setMenuOpen(false)}>{label}</a>)}<a className="nav-cta" href="#contact">Work with me</a></nav></header>
    <main id="top">
      <section className="hero section-wrap"><div className="hero-copy reveal"><div className="eyebrow"><span className="status-dot"/> DIGITAL CREATIVE / YOGYAKARTA</div><h1>MAKE SOMETHING<br/><em>WORTH CLICKING.</em></h1><p className="hero-lead">Designs, digital products, creative work and ideas — built under <strong>PT PMA Media Yogyakarta.</strong></p><div className="hero-actions"><a className="button button-primary" href="#designs">Explore designs <span>↗</span></a><a className="button button-ghost" href="#about">Who is PMA?</a></div></div><div className="hero-meta reveal-delay"><div className="meta-line"><span>BASED IN</span><strong>YOGYAKARTA, ID</strong></div><div className="meta-line"><span>FOCUS</span><strong>DESIGN · DIGITAL · TECH</strong></div><div className="meta-line"><span>STATUS</span><strong className="online">OPEN FOR WORK</strong></div></div><div className="scroll-cue">SCROLL <span>↓</span></div></section>
      <section id="designs" className="section-wrap section-block"><div className="section-heading"><div><span className="section-index">01 / DESIGNS</span><h2>THE WORK</h2></div><p>Original graphic work, released as free downloads and premium digital products.</p></div>
        <div className="design-toolbar"><div className="filter-label">FILTER / {filteredDesigns.length.toString().padStart(2,'0')} ITEMS</div><div className="design-filters">{['ALL','FREE','PREMIUM'].map(option=><button key={option} className={filter===option?'filter-button active':'filter-button'} onClick={()=>setFilter(option)}>{option}</button>)}</div></div>
        <div className="design-grid">{filteredDesigns.map(d=><DesignCard key={d.id} design={d}/>)}</div><div className="section-note">THE LIBRARY WILL GROW / FREE + PREMIUM</div></section>
      <section id="services" className="section-wrap section-block split-section"><div><span className="section-index">02 / SERVICES</span><h2>BUILD IT.<br/><em>MAKE IT MATTER.</em></h2></div><div className="service-list">{['T-Shirt & Graphic Design','Brand & Social Media Visuals','Landing Pages & Websites','Digital Creative Support'].map((s,i)=><a href="#contact" className="service-row" key={s}><span>0{i+1}</span><strong>{s}</strong><b>↗</b></a>)}</div></section>
      <section id="journal" className="section-wrap section-block journal-section"><div className="section-heading"><div><span className="section-index">03 / JOURNAL</span><h2>JOURNAL</h2></div><p>Notes on design, technology, creative work and building things online.</p></div><div className="journal-placeholder"><span>COMING SOON / 001</span><h3>Ideas worth sharing.</h3><a href="#contact">Explore the journal ↗</a></div></section>
      <section id="about" className="section-wrap section-block about-section"><div className="about-label"><span className="section-index">04 / ABOUT</span><span>PMA MEDIA YOGYAKARTA</span></div><div className="about-copy"><h2>PERSONAL<br/><em>MEETS BUSINESS.</em></h2><p>PMA.WTF is the personal digital hub of Imam Falahi and a creative platform operating under <strong>PT PMA Media Yogyakarta</strong>.</p><p>The site brings together professional profile, portfolio, digital products, design work, services and editorial content in one place.</p><div className="about-links"><a href="#contact">Contact ↗</a><a href="#top">View profile ↗</a></div></div></section>
      <section id="contact" className="section-wrap contact-section"><span className="section-index">05 / CONTACT</span><h2>HAVE AN IDEA?<br/><em>LET'S BUILD IT.</em></h2><a className="contact-email" href="mailto:hello@pma.wtf">hello@pma.wtf ↗</a><div className="company-line">PT PMA MEDIA YOGYAKARTA · DIGITAL CREATIVE & TECHNOLOGY</div></section>
    </main>
  </>
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '')
  const match = path.match(/^\/design\/(.+)$/)
  const design = match ? designs.find(item => item.id === match[1]) : null
  useEffect(() => { document.title = design ? design.title + ' — PMA.WTF' : 'PMA.WTF — Digital Creative Hub' }, [design])
  return <div className="site-shell"><div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="grid-overlay"/>{match ? <DesignDetail design={design}/>:<Home/>}<footer className="site-footer"><span>© 2026 PMA MEDIA YOGYAKARTA</span><span>PMA.WTF / DIGITAL CREATIVE HUB</span></footer></div>
}
export default App
