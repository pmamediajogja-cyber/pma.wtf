import { useEffect, useRef, useState } from "react";
import DesignDetail from "./components/DesignDetail";
import Profile from "./components/Profile";
import CVSection from "./components/CVSection";
import DesignCard from "./components/DesignCard";
import PageControls from "./components/PageControls";
import AnimeEffects from "./components/AnimeEffects";
import AnimeHomeScroll from "./components/AnimeHomeScroll";
import JournalArticle from "./components/JournalArticle";
import JournalSEO from "./components/JournalSEO";
import JournalHub from "./components/JournalHub";
import JournalArtwork from "./components/JournalArtwork";
import "./journalSeo.css";
import designs from "./data/designs";
import journalArticles from "./data/journal";
import journalMore from "./data/journalMore";
import journalOriginal from "./data/journalOriginal";
import journalTech from "./data/journalTech";

const allJournalArticles = [...journalArticles, ...journalMore, ...journalOriginal, ...journalTech];
const navItems = [["Designs", "#designs"], ["Services", "#services"], ["Journal", "/journal"], ["About", "/profile"]];
const journalGroups = [
  { key: "CYBERSECURITY", label: "CYBERSECURITY", note: "Threats, vulnerabilities, identity and defensive practice." },
  { key: "AI & TECHNOLOGY", label: "AI & TECHNOLOGY", note: "Agents, infrastructure, governance and what changes next." },
  { key: "DESIGN LAB", label: "DESIGN LAB", note: "Original thinking on graphic design, apparel, identity and visual decisions." },
  { key: "BUILD / TECH", label: "BUILD / TECH", note: "Web, IT, automation, systems and lessons from building real things." },
  { key: "STREETWEAR & CULTURE", label: "STREETWEAR & CULTURE", note: "Fits, graphics, drops and the culture around the garment." },
];

function JournalCard({ article, goToJournal }) {
  const isOriginal = article.source === "PMA Original";
  const openReview = () => goToJournal(article.id);
  const handleKeyDown = (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openReview(); } };
  return <article className="journal-card" role="link" tabIndex={0} aria-label={`Buka review PMA: ${article.title}`} onClick={openReview} onKeyDown={handleKeyDown}>
    <div className="journal-card-visual"><JournalArtwork article={article} /><span className="journal-image-badge">{isOriginal ? "PMA ORIGINAL / CONTEXT ART" : "PMA CONTEXT ART"}</span></div>
    <div className="journal-card-meta"><span>{article.id} / {article.tag}</span><span>{article.date}</span></div><h3>{article.title}</h3><p>{article.excerpt}</p>
    <div className="journal-card-footer"><button type="button" onClick={(event) => { event.stopPropagation(); openReview(); }}>Read PMA review ↗</button><a href={article.url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>{isOriginal ? "PMA.WTF ↗" : "Source ↗"}</a></div>
  </article>;
}

function JournalRail({ articles, goToJournal }) {
  const railRef = useRef(null); const [paused, setPaused] = useState(false);
  const move = (direction) => { const rail = railRef.current; if (!rail) return; const amount = Math.min(520, Math.max(300, rail.clientWidth * 0.72)); rail.scrollBy({ left: direction * amount, behavior: "smooth" }); };
  useEffect(() => { if (paused || articles.length < 5) return undefined; const timer = window.setInterval(() => move(1), 5200); return () => window.clearInterval(timer); }, [paused, articles.length]);
  return <div className="journal-rail-wrap"><button className="journal-rail-button journal-rail-prev" type="button" onClick={() => move(-1)} aria-label="Previous journal articles">←</button><div className="journal-rail" ref={railRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>{articles.map((article) => <JournalCard key={article.id} article={article} goToJournal={goToJournal} />)}</div><button className="journal-rail-button journal-rail-next" type="button" onClick={() => move(1)} aria-label="Next journal articles">→</button></div>;
}

function Home({ goToJournal }) {
  const [menuOpen, setMenuOpen] = useState(false); const [filter, setFilter] = useState("ALL");
  const filteredDesigns = filter === "ALL" ? designs : designs.filter((d) => d.type === filter);
  return <><header className="site-header"><a className="brand" href="/" aria-label="PMA.WTF home"><span className="brand-mark">PMA</span><span className="brand-dot">.</span><span>WTF</span></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><span /><span /></button><nav className={menuOpen ? "nav-links open" : "nav-links"}>{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Work with me</a></nav></header><main id="top"><div className="home-light-wash" aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, background: ["radial-gradient(circle at 72% 16%, rgba(100,232,255,0.10), transparent 28%)", "radial-gradient(circle at 28% 34%, rgba(107,92,255,0.07), transparent 25%)", "linear-gradient(180deg, rgba(255,255,255,0.025), transparent 38%)"].join(","), mixBlendMode: "screen" }} /><section className="hero section-wrap"><div className="hero-scroll-square" aria-hidden="true" /><div className="hero-copy reveal"><div className="eyebrow"><span className="status-dot" />DIGITAL CREATIVE / YOGYAKARTA</div><h1>MAKE SOMETHING<br /><em>WORTH CLICKING.</em></h1><p className="hero-lead">Designs, digital products, creative work and ideas — built under <strong>PT PMA Media Yogyakarta.</strong></p><div className="hero-actions"><a className="button button-primary" href="#designs">Explore designs <span>↗</span></a><a className="button button-ghost" href="/profile">Who is PMA?</a></div></div><div className="hero-meta reveal-delay"><div className="meta-line"><span>BASED IN</span><strong>YOGYAKARTA, ID</strong></div><div className="meta-line"><span>FOCUS</span><strong>DESIGN · DIGITAL · TECH</strong></div><div className="meta-line"><span>STATUS</span><strong className="online">OPEN FOR WORK</strong></div></div><div className="scroll-cue">SCROLL <span>↓</span></div></section><section id="designs" className="section-wrap section-block"><div className="section-heading"><div><span className="section-index">01 / DESIGNS</span><h2>THE WORK</h2></div><p>Original graphic work, released as free downloads and premium digital products.</p></div><div className="design-toolbar"><div className="filter-label">FILTER / {filteredDesigns.length.toString().padStart(2, "0")} ITEMS</div><div className="design-filters">{["ALL", "FREE", "PREMIUM"].map((option) => <button key={option} className={filter === option ? "filter-button active" : "filter-button"} onClick={() => setFilter(option)}>{option}</button>)}</div></div><div className="design-grid">{filteredDesigns.map((d) => <DesignCard key={d.id} design={d} />)}</div><div className="section-note">THE LIBRARY WILL GROW / FREE + PREMIUM</div></section><section id="services" className="section-wrap section-block split-section"><div><span className="section-index">02 / SERVICES</span><h2>BUILD IT.<br /><em>MAKE IT MATTER.</em></h2></div><div className="service-list">{["T-Shirt & Graphic Design", "Brand & Social Media Visuals", "Landing Pages & Websites", "Digital Creative Support"].map((service, index) => <a href="#contact" className="service-row" key={service}><span>0{index + 1}</span><strong>{service}</strong><b>↗</b></a>)}</div></section><section id="journal" className="section-wrap section-block journal-section"><div className="section-heading"><div><span className="section-index">03 / JOURNAL</span><a className="journal-section-link" href="/journal" aria-label="Open PMA Journal"><h2>JOURNAL</h2></a></div><p>Cybersecurity, AI, design thinking, technical builds, streetwear culture and PMA's take on what they mean in practice.</p></div><div className="journal-groups">{journalGroups.map((group, groupIndex) => { const articles = allJournalArticles.filter((article) => article.category === group.key); return <section className="journal-group" key={group.key}><div className="journal-group-heading"><div><span className="journal-group-index">{String(groupIndex + 1).padStart(2, "0")} / {articles.length} ARTICLES</span><h3>{group.label}</h3></div><div className="journal-group-tools"><p>{group.note}</p><span className="journal-rail-hint">AUTO-SCROLL / HOVER TO PAUSE</span></div></div><JournalRail articles={articles} goToJournal={goToJournal} /></section>; })}</div><div className="section-note">PMA JOURNAL / EDITORIAL SIGNALS + PMA ORIGINALS</div></section><section id="contact" className="section-wrap contact-section"><span className="section-index">04 / CONTACT</span><h2>HAVE AN IDEA?<br /><em>LET'S BUILD IT.</em></h2><a className="contact-email" href="mailto:pma.media.jogja@gmail.com">pma.media.jogja@gmail.com ↗</a><div className="company-line">PT PMA MEDIA YOGYAKARTA · DIGITAL CREATIVE & TECHNOLOGY</div></section></main></>;
}

function App() {
  const normalizePath = (value) => value.replace(/\/+$/, "") || "/";
  const [path, setPath] = useState(normalizePath(window.location.pathname));
  useEffect(() => { const handlePopState = () => setPath(normalizePath(window.location.pathname)); window.addEventListener("popstate", handlePopState); return () => window.removeEventListener("popstate", handlePopState); }, []);
  useEffect(() => { let title = "PMA.WTF — Digital Creative Hub"; if (path === "/profile") title = "Profile — PMA.WTF"; if (path === "/cv") title = "CV — Imam Falahi"; if (path === "/journal") title = "Journal — PMA.WTF"; const journalMatch = path.match(/^\/journal\/(.+)$/); if (journalMatch) { const article = allJournalArticles.find((item) => item.id === journalMatch[1]); if (article) title = `${article.title} — PMA Journal`; } document.title = title; }, [path]);
  const designMatch = path.match(/^\/design\/(.+)$/); const design = designMatch ? designs.find((item) => item.id === designMatch[1]) : null; const journalMatch = path.match(/^\/journal\/(.+)$/); const journalArticle = journalMatch ? allJournalArticles.find((item) => item.id === journalMatch[1]) : null;
  const goTo = (target) => { window.history.pushState({}, "", target); setPath(normalizePath(target)); window.scrollTo({ top: 0, behavior: "instant" }); };
  if (designMatch) return <div className="site-shell"><div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="grid-overlay" /><AnimeEffects /><PageControls showBack /><DesignDetail design={design} /></div>;
  if (path === "/journal") return <div className="site-shell"><div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="grid-overlay" /><AnimeEffects /><PageControls showBack /><JournalHub articles={allJournalArticles} onOpenArticle={(id) => goTo(`/journal/${id}`)} /><footer className="site-footer"><span>© 2026 PMA MEDIA YOGYAKARTA</span><span>PMA.WTF / DIGITAL CREATIVE HUB</span></footer></div>;
  if (journalMatch) return <div className="site-shell"><div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="grid-overlay" /><AnimeEffects /><PageControls showBack /><JournalSEO article={journalArticle} allArticles={allJournalArticles} mode="breadcrumb" /><JournalArticle article={journalArticle} onBack={() => goTo("/")} /><JournalSEO article={journalArticle} allArticles={allJournalArticles} mode="related" /><footer className="site-footer"><span>© 2026 PMA MEDIA YOGYAKARTA</span><span>PMA.WTF / DIGITAL CREATIVE HUB</span></footer></div>;
  if (path === "/profile") return <div className="site-shell"><div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="grid-overlay" /><AnimeEffects /><PageControls showBack /><Profile /><footer className="site-footer"><span>© 2026 PMA MEDIA YOGYAKARTA</span><span>PMA.WTF / DIGITAL CREATIVE HUB</span></footer></div>;
  if (path === "/cv") return <div className="site-shell"><div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="grid-overlay" /><AnimeEffects /><PageControls showBack /><CVSection /><footer className="site-footer"><span>© 2026 PMA MEDIA YOGYAKARTA</span><span>PMA.WTF / DIGITAL CREATIVE HUB</span></footer></div>;
  return <div className="site-shell"><div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="grid-overlay" /><AnimeEffects /><AnimeHomeScroll /><PageControls /><Home goToJournal={(id) => goTo(`/journal/${id}`)} /><footer className="site-footer"><span>© 2026 PMA MEDIA YOGYAKARTA</span><span>PMA.WTF / DIGITAL CREATIVE HUB</span></footer></div>;
}

export default App;
