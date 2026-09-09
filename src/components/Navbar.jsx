import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'cv', label: 'CV' },
  { id: 'tools', label: 'Stack' },
  { id: 'portfolio', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollTo = (id) => {
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }

    setMobileOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? 'rgba(10, 10, 15, 0.88)'
          : 'transparent',
        backdropFilter: scrolled
          ? 'blur(20px)'
          : 'none',
        WebkitBackdropFilter: scrolled
          ? 'blur(20px)'
          : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(0, 240, 255, 0.1)'
          : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
    >
      <div
        className="container-custom"
        style={{
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* ================================
            LOGO
        ================================= */}
        <button
          onClick={() => scrollTo('hero')}
          aria-label="Go to homepage"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: 0,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background:
                'linear-gradient(135deg, #00f0ff, #7b2ff7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow:
                '0 0 20px rgba(0, 240, 255, 0.12)',
            }}
          >
            <span
              className="font-orbitron"
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.04em',
              }}
            >
              PMA
            </span>
          </div>

          {/* Brand */}
          <span
            className="font-orbitron"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#00f0ff',
              letterSpacing: '0.04em',
            }}
          >
            PMA
            <span style={{ color: '#7b2ff7' }}>
              .WTF
            </span>
          </span>
        </button>

        {/* ================================
            DESKTOP NAVIGATION
        ================================= */}
        <div
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: '8px 13px',
                border: 'none',
                borderRadius: 6,
                background: 'transparent',
                color: '#8f96a1',
                fontFamily: "'Orbitron', monospace",
                fontSize: 10,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition:
                  'color 0.25s ease, background 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#00f0ff'
                e.currentTarget.style.background =
                  'rgba(0, 240, 255, 0.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#8f96a1'
                e.currentTarget.style.background =
                  'transparent'
              }}
            >
              {link.label}
            </motion.button>
          ))}
        </div>

        {/* ================================
            MOBILE TOGGLE
        ================================= */}
        <button
          className="mobile-menu-button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          style={{
            display: 'none',
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            border: 'none',
            background: 'transparent',
            color: '#d1d5db',
            cursor: 'pointer',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            {mobileOpen ? (
              <>
                <path d="M6 6L18 18" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7H20" />
                <path d="M4 12H20" />
                <path d="M4 17H20" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* ================================
          MOBILE MENU
      ================================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{ duration: 0.25 }}
            style={{
              overflow: 'hidden',
              background:
                'rgba(10, 10, 15, 0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderTop:
                '1px solid rgba(0, 240, 255, 0.08)',
            }}
          >
            <div
              className="container-custom"
              style={{
                paddingTop: 12,
                paddingBottom: 16,
              }}
            >
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.04,
                  }}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '13px 8px',
                    textAlign: 'left',
                    border: 'none',
                    borderBottom:
                      '1px solid rgba(255,255,255,0.04)',
                    background: 'transparent',
                    color: '#9ca3af',
                    fontFamily:
                      "'Orbitron', monospace",
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      color: '#4f5661',
                      marginRight: 12,
                    }}
                  >
                    0{index + 1}
                  </span>

                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================================
          RESPONSIVE CSS
      ================================= */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }

          .mobile-menu-button {
            display: flex !important;
          }
        }

        @media (min-width: 901px) {
          .mobile-menu-button {
            display: none !important;
          }
        }
      `}</style>
    </motion.nav>
  )
}