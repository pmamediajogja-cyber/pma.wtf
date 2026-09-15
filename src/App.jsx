import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import CVSection from './components/CVSection'
import Tools from './components/Tools'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NotaryDemo from './components/NotaryDemo'

function PortfolioApp() {
  return (
    <div className="bg-dark" style={{ minHeight: '100%', overflow: 'hidden', position: 'relative' }}>
      <div className="bg-cyber-grid" style={{ position: 'fixed', inset: 0, opacity: 0.3, pointerEvents: 'none' }} />
      <Navbar />
      <main><Hero /><About /><CVSection /><Tools /><Portfolio /><Contact /></main>
      <Footer />
    </div>
  )
}

function App() {
  const isNotaryDemo = window.location.pathname.replace(/\/$/, '') === '/demo/notaris'
  return isNotaryDemo ? <NotaryDemo /> : <PortfolioApp />
}

export default App
