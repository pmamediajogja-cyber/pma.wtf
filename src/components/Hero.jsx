import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Ambient cyan glow */}
      <div
        style={{
          position: 'absolute',
          left: '-12%',
          top: '20%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'rgba(0, 240, 255, 0.045)',
          filter: 'blur(140px)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient purple glow */}
      <div
        style={{
          position: 'absolute',
          right: '-12%',
          bottom: '5%',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'rgba(123, 47, 247, 0.055)',
          filter: 'blur(150px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main content */}
      <div
        className="container-custom"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
        }}
      >
        <div
          style={{
            maxWidth: 1050,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 11,
              letterSpacing: '0.18em',
              color: '#00f0ff',
              marginBottom: '2.5rem',
            }}
          >
            01 / PMA.WTF
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: 'easeOut',
            }}
            className="font-orbitron"
            style={{
              margin: 0,
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              lineHeight: 0.86,
              fontWeight: 700,
              letterSpacing: '-0.045em',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#f5f5f5',
              }}
            >
              DIGITAL
            </span>

            <span
              style={{
                display: 'block',
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(255,255,255,0.65)',
                textStroke: '1.5px rgba(255,255,255,0.65)',
              }}
            >
              CREATIVE HUB.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.35,
            }}
            style={{
              maxWidth: 850,
              marginTop: '2rem',
            }}
          >
            <p
              style={{
                margin: 0,
                color: '#9aa1ad',
                fontSize: 'clamp(15px, 1.6vw, 20px)',
                lineHeight: 1.75,
              }}
            >
              <strong style={{ color: '#d5d9df' }}>
                PMA.WTF
              </strong>{' '}
              is a digital creative hub operating under{' '}
              <strong style={{ color: '#d5d9df' }}>
                PT PMA Media Yogyakarta.
              </strong>
            </p>

            <p
              style={{
                margin: '0.35rem 0 0',
                color: '#777f8b',
                fontSize: 'clamp(14px, 1.4vw, 18px)',
                lineHeight: 1.75,
              }}
            >
              Bringing together digital products, design,
              technology, creative work, and professional
              services in one place.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.55,
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.8rem',
              marginTop: '2.5rem',
            }}
          >
            {/* Contact */}
            <a
              href="#contact"
              style={{
                color: '#00f0ff',
                textDecoration: 'none',
                fontFamily: "'Orbitron', monospace",
                fontSize: 12,
                letterSpacing: '0.05em',
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.65'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
            >
              Contact ↗
            </a>

            {/* View Profile */}
            <a
              href="#about"
              style={{
                color: '#00f0ff',
                textDecoration: 'none',
                fontFamily: "'Orbitron', monospace",
                fontSize: 12,
                letterSpacing: '0.05em',
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.65'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
            >
              View Profile ↗
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom metadata */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        style={{
          position: 'absolute',
          left: 'max(2rem, calc((100vw - 1200px) / 2))',
          bottom: '2rem',
          zIndex: 2,
          fontFamily: "'Orbitron', monospace",
          fontSize: 9,
          letterSpacing: '0.15em',
          color: '#4f5661',
        }}
      >
        PT PMA MEDIA YOGYAKARTA
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1.2,
        }}
        style={{
          position: 'absolute',
          right: '2rem',
          bottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          color: '#4f5661',
          fontFamily: "'Orbitron', monospace",
          fontSize: 9,
          letterSpacing: '0.12em',
        }}
      >
        <span>SCROLL</span>

        <span
          style={{
            display: 'block',
            width: 45,
            height: 1,
            background:
              'linear-gradient(90deg, #00f0ff, transparent)',
          }}
        />
      </motion.div>

      {/* Mobile adjustments */}
      <style>{`
        @media (max-width: 768px) {
          #hero {
            min-height: 100svh;
            padding-top: 80px;
          }

          #hero .container-custom {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }

          #hero h1 {
            font-size: clamp(3.2rem, 16vw, 6rem) !important;
            line-height: 0.9 !important;
          }

          #hero p {
            font-size: 14px !important;
          }

          #hero > div:last-of-type {
            display: none;
          }
        }

        @media (max-width: 480px) {
          #hero h1 {
            font-size: 3.15rem !important;
          }

          #hero .container-custom {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </section>
  )
}