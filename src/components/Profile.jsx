import { motion } from 'framer-motion'

const capabilities = [
  {
    number: '01',
    title: 'DIGITAL PRODUCTS',
    text: 'Membangun dan mengembangkan produk digital, website, landing page, sistem sederhana, serta solusi digital yang disesuaikan dengan kebutuhan bisnis.',
    tags: ['Web', 'Landing Page', 'Digital System'],
  },
  {
    number: '02',
    title: 'CREATIVE & DESIGN',
    text: 'Mengembangkan identitas visual, desain grafis, konten media sosial, campaign visual, hingga digital artwork untuk kebutuhan brand dan pemasaran.',
    tags: ['Graphic Design', 'Branding', 'Content'],
  },
  {
    number: '03',
    title: 'IT & TECHNICAL SUPPORT',
    text: 'Menyediakan dukungan teknis untuk hardware, software, jaringan, sistem operasional, troubleshooting, serta kebutuhan IT harian bisnis.',
    tags: ['IT Support', 'Network', 'Troubleshooting'],
  },
  {
    number: '04',
    title: 'BUSINESS & OPERATIONS',
    text: 'Membantu bisnis menghubungkan teknologi, administrasi, data, dan operasional agar pekerjaan menjadi lebih terstruktur dan efisien.',
    tags: ['Operations', 'Data', 'Process'],
  },
  {
    number: '05',
    title: 'LEGAL & LICENSING',
    text: 'Memiliki pengalaman praktis dalam pendampingan legalitas dan perizinan usaha, termasuk OSS RBA, NPWP, SIMBG/PBG, serta administrasi pertanahan.',
    tags: ['OSS RBA', 'PBG', 'Compliance'],
  },
  {
    number: '06',
    title: 'DIGITAL CREATIVE SUPPORT',
    text: 'Menggabungkan kemampuan teknologi dan kreativitas untuk membantu bisnis menghasilkan aset digital yang tidak hanya terlihat baik tetapi juga memiliki fungsi.',
    tags: ['Creative Tech', 'Marketing', 'Production'],
  },
]

const strengths = [
  'Technology + Creative',
  'Business-oriented',
  'Practical execution',
  'Problem solving',
  'Cross-functional experience',
  'End-to-end support',
]

export default function Profile() {
  const goToCV = (event) => {
    event.preventDefault();

    window.history.pushState({}, "", "/cv");
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <main className="pma-profile">

      {/* =========================================
          HERO
      ========================================== */}
      <section className="profile-hero">
        <div className="profile-container">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="profile-eyebrow">
              PMA MEDIA / YOGYAKARTA
            </span>

            <h1>
              WE BUILD
              <br />
              <em>DIGITAL THINGS.</em>
            </h1>

            <p className="profile-intro">
              PT PMA Media Yogyakarta adalah creative and technology
              studio yang menggabungkan teknologi, desain, digital
              products, dan business support dalam satu ekosistem.
            </p>

            <div className="profile-actions">
              <a href="#capabilities" className="profile-button primary">
                WHAT WE DO <span>↓</span>
              </a>

              <a
                href="/cv"
                className="profile-button secondary"
                onClick={goToCV}
              >
                VIEW MY CV <span>↗</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="profile-hero-meta"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div>
              <span>ENTITY</span>
              <strong>PT PMA MEDIA YOGYAKARTA</strong>
            </div>

            <div>
              <span>BRAND</span>
              <strong>PMA.WTF</strong>
            </div>

            <div>
              <span>BASED IN</span>
              <strong>YOGYAKARTA, INDONESIA</strong>
            </div>

            <div>
              <span>FOCUS</span>
              <strong>DESIGN · DIGITAL · TECHNOLOGY</strong>
            </div>
          </motion.div>

        </div>
      </section>


      {/* =========================================
          ABOUT PMA
      ========================================== */}
      <section className="profile-section">

        <div className="profile-container">

          <div className="profile-section-label">
            <span>01 / ABOUT PMA</span>
            <small>WHO WE ARE</small>
          </div>

          <div className="profile-about-grid">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>
                MORE THAN
                <br />
                <em>A CREATIVE STUDIO.</em>
              </h2>
            </motion.div>

            <motion.div
              className="profile-about-copy"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p>
                PMA Media Yogyakarta dibangun sebagai ruang kerja
                yang mempertemukan <strong>technology, creativity,
                digital products, dan business operations.</strong>
              </p>

              <p>
                Kami tidak hanya membuat visual atau membangun
                website. Fokus kami adalah memahami kebutuhan,
                menemukan masalah, kemudian menerjemahkannya
                menjadi solusi yang dapat digunakan.
              </p>

              <p>
                Pendekatan ini membuat PMA dapat bekerja di antara
                dunia kreatif dan dunia teknis — dari sebuah ide,
                menjadi desain, kemudian menjadi produk atau sistem
                yang benar-benar berjalan.
              </p>
            </motion.div>

          </div>

        </div>

      </section>


      {/* =========================================
          CAPABILITIES
      ========================================== */}
      <section
        id="capabilities"
        className="profile-section profile-capabilities"
      >

        <div className="profile-container">

          <div className="profile-section-label">
            <span>02 / CAPABILITIES</span>
            <small>WHAT WE CAN DO</small>
          </div>

          <div className="capability-grid">

            {capabilities.map((item, index) => (

              <motion.article
                key={item.number}
                className="capability-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
              >

                <div className="capability-top">
                  <span>{item.number}</span>
                  <span>↗</span>
                </div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>

                <div className="capability-tags">
                  {item.tags.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

              </motion.article>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================
          WHY PMA
      ========================================== */}
      <section className="profile-section">

        <div className="profile-container">

          <div className="profile-section-label">
            <span>03 / WHY PMA</span>
            <small>OUR ADVANTAGE</small>
          </div>

          <div className="why-pma">

            <div>
              <h2>
                ONE TEAM.
                <br />
                <em>MULTIPLE DISCIPLINES.</em>
              </h2>

              <p>
                Keunggulan PMA bukan hanya pada satu keahlian.
                Kami bekerja di persimpangan beberapa bidang yang
                biasanya terpisah.
              </p>
            </div>

            <div className="strength-list">

              {strengths.map((strength, index) => (
                <div key={strength}>
                  <span>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <strong>{strength}</strong>

                  <span>↗</span>
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          APPROACH
      ========================================== */}
      <section className="profile-section approach-section">

        <div className="profile-container">

          <div className="profile-section-label">
            <span>04 / APPROACH</span>
            <small>HOW WE WORK</small>
          </div>

          <div className="approach-grid">

            <div>
              <span>01</span>
              <h3>UNDERSTAND</h3>
              <p>
                Memahami kebutuhan, masalah, target, dan konteks
                sebelum menentukan solusi.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>BUILD</h3>
              <p>
                Mengubah kebutuhan menjadi desain, sistem,
                produk, atau workflow yang konkret.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>IMPROVE</h3>
              <p>
                Mengevaluasi hasil dan melakukan perbaikan agar
                solusi dapat berkembang bersama kebutuhan bisnis.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================== */}
      <section className="profile-cta">

        <div className="profile-container">

          <span>05 / NEXT</span>

          <h2>
            WANT TO KNOW
            <br />
            <em>WHO'S BEHIND PMA?</em>
          </h2>

          <p>
            Lihat profil profesional dan pengalaman
            Imam Falahi sebagai bagian dari perjalanan
            PMA Media Yogyakarta.
          </p>

          <a
            href="/cv"
            className="profile-cv-button"
            onClick={goToCV}
          >
            VIEW IMAM'S CV <span>↗</span>
          </a>

        </div>

      </section>

    </main>
  )
}