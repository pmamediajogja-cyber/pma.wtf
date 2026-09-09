import { motion } from 'framer-motion'

const studioInfo = {
  name: 'PT PMA Media Yogyakarta',
  brand: 'PMA.WTF',
  title: 'DIGITAL CREATIVE & TECHNOLOGY STUDIO',
  location: 'Yogyakarta, Indonesia',
}

const profile = [
  'PMA.WTF is a digital creative hub operating under PT PMA Media Yogyakarta.',
  'The platform brings together digital products, design, technology, creative work, and professional services in one place.',
  'Our work focuses on practical digital solutions, visual communication, business support, and creative products built for real-world use.',
  'PMA.WTF connects technology, creativity, and business through projects, services, and digital products.',
]

const services = [
  {
    number: '01',
    title: 'DIGITAL PRODUCTS',
    description:
      'Digital assets, templates, graphics, and other products created for practical use.',
  },
  {
    number: '02',
    title: 'DESIGN & CREATIVE',
    description:
      'Graphic design, visual content, branding assets, photography, and creative production.',
  },
  {
    number: '03',
    title: 'TECHNOLOGY',
    description:
      'Web development, IT support, system implementation, and practical digital solutions.',
  },
  {
    number: '04',
    title: 'BUSINESS SUPPORT',
    description:
      'Digital operations, administration, business support, and technology-assisted workflows.',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="section-padding"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '-10%',
          width: 500,
          height: 500,
          background: 'rgba(0, 240, 255, 0.04)',
          borderRadius: '50%',
          filter: 'blur(140px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container-custom"
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginBottom: '4rem',
          }}
        >
          <div
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 11,
              letterSpacing: '0.18em',
              color: '#00f0ff',
              marginBottom: 14,
            }}
          >
            04 / ABOUT
          </div>

          <h2
            className="font-orbitron"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1,
              color: 'white',
              margin: 0,
            }}
          >
            DIGITAL{' '}
            <span className="text-gradient">
              CREATIVE HUB.
            </span>
          </h2>

          <p
            style={{
              color: '#8b929d',
              marginTop: 18,
              fontSize: 14,
              letterSpacing: '0.08em',
              maxWidth: 700,
              lineHeight: 1.8,
            }}
          >
            {studioInfo.title}
          </p>

          <div
            style={{
              width: 100,
              height: 2,
              marginTop: 25,
              background:
                'linear-gradient(90deg, #00f0ff, #7b2ff7, transparent)',
            }}
          />
        </motion.div>

        {/* STUDIO PROFILE + ABOUT */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'minmax(280px, 0.8fr) minmax(300px, 1.4fr)',
            gap: '2rem',
            marginBottom: '2rem',
          }}
        >
          {/* STUDIO CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card"
            style={{
              padding: '2rem',
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                border: '1px solid rgba(0,240,255,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                background:
                  'linear-gradient(135deg, rgba(0,240,255,0.08), rgba(123,47,247,0.08))',
                boxShadow: '0 0 35px rgba(0,240,255,0.08)',
              }}
            >
              <span
                className="font-orbitron"
                style={{
                  fontSize: 25,
                  fontWeight: 700,
                }}
              >
                <span className="text-gradient">
                  PMA
                </span>
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 10,
                color: '#00f0ff',
                letterSpacing: '0.15em',
                marginBottom: 8,
              }}
            >
              STUDIO
            </div>

            <h3
              style={{
                color: 'white',
                fontSize: 24,
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              PMA MEDIA
            </h3>

            <p
              style={{
                color: '#8b929d',
                fontSize: 13,
                lineHeight: 1.7,
                marginTop: 10,
              }}
            >
              {studioInfo.name}
            </p>

            <div
              style={{
                borderTop:
                  '1px solid rgba(255,255,255,0.08)',
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <div>
                <span
                  style={{
                    color: '#555d68',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                  }}
                >
                  BRAND
                </span>

                <div
                  style={{
                    color: '#d1d5db',
                    fontSize: 13,
                    marginTop: 4,
                  }}
                >
                  {studioInfo.brand}
                </div>
              </div>

              <div>
                <span
                  style={{
                    color: '#555d68',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                  }}
                >
                  LOCATION
                </span>

                <div
                  style={{
                    color: '#d1d5db',
                    fontSize: 13,
                    marginTop: 4,
                  }}
                >
                  {studioInfo.location}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    padding: '5px 10px',
                    border:
                      '1px solid rgba(0,240,255,0.25)',
                    color: '#00f0ff',
                    fontSize: 10,
                    letterSpacing: '0.08em',
                  }}
                >
                  DIGITAL
                </span>

                <span
                  style={{
                    padding: '5px 10px',
                    border:
                      '1px solid rgba(123,47,247,0.35)',
                    color: '#bf9cff',
                    fontSize: 10,
                    letterSpacing: '0.08em',
                  }}
                >
                  CREATIVE
                </span>

                <span
                  style={{
                    padding: '5px 10px',
                    border:
                      '1px solid rgba(255,255,255,0.12)',
                    color: '#aeb5c0',
                    fontSize: 10,
                    letterSpacing: '0.08em',
                  }}
                >
                  TECHNOLOGY
                </span>
              </div>
            </div>
          </motion.div>

          {/* ABOUT COPY */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card"
            style={{
              padding: '2rem',
            }}
          >
            <div
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 10,
                color: '#7b2ff7',
                letterSpacing: '0.15em',
                marginBottom: '1.5rem',
              }}
            >
              ABOUT PMA.WTF
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {profile.map((text, index) => (
                <p
                  key={index}
                  style={{
                    color: '#c7ccd4',
                    fontSize: 14,
                    lineHeight: 1.9,
                    margin: 0,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SERVICES */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card"
          style={{
            padding: '2rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 10,
              color: '#00f0ff',
              letterSpacing: '0.15em',
              marginBottom: '1.5rem',
            }}
          >
            SERVICES / 04
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            {services.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -4 }}
                style={{
                  padding: '1.4rem',
                  border:
                    '1px solid rgba(255,255,255,0.07)',
                  background:
                    'rgba(255,255,255,0.02)',
                }}
              >
                <div
                  style={{
                    color: '#00f0ff',
                    fontFamily: "'Orbitron', monospace",
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    marginBottom: 12,
                  }}
                >
                  {item.number}
                </div>

                <h4
                  style={{
                    color: 'white',
                    fontSize: 14,
                    margin: 0,
                    letterSpacing: '0.03em',
                  }}
                >
                  {item.title}
                </h4>

                <p
                  style={{
                    color: '#777f8b',
                    fontSize: 12,
                    lineHeight: 1.7,
                    marginTop: 10,
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FOOT NOTE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop: '2rem',
            padding: '1rem 0',
            color: '#777f8b',
            fontSize: 12,
            lineHeight: 1.7,
          }}
        >
          <span>
            {studioInfo.brand}
          </span>
          <span style={{ margin: '0 10px', color: '#343a43' }}>
            /
          </span>
          <span>
            {studioInfo.name}
          </span>
        </motion.div>
      </div>

      {/* MOBILE FIX */}
      <style>{`
        @media (max-width: 768px) {
          #about .container-custom > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }

          #about .glass-card {
            padding: 1.4rem !important;
          }

          #about .glass-card > div {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  )
}