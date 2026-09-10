import { motion } from 'framer-motion'

const cvFile = '/cv/CV_IMAM FALAHI_September 2026.pdf'
const photoFile = '/cv/pasfoto.jpeg'

const experiences = [
  { number: '01', role: 'IT SUPPORT & ADMINISTRASI LEGAL', company: 'Notaris & PPAT Endri Purwani, S.H., M.Kn.', location: 'Sleman', period: '2020 — PRESENT', type: 'FULL-TIME', description: 'Mengelola infrastruktur IT kantor, hardware, software, jaringan lokal, troubleshooting, keamanan database, serta administrasi legal dan pertanahan.', highlights: ['IT Support & Infrastruktur Sistem', 'Administrasi PPAT & Pertanahan', 'Registrasi Jaminan Fidusia Perbankan', 'Pengelolaan dokumen legal bervolume tinggi'] },
  { number: '02', role: 'KONSULTAN PERIZINAN & REGULASI', company: 'PT PMA Media Yogyakarta', location: 'Sleman', period: '2020 — PRESENT', type: 'CONSULTANT', description: 'Menangani konsultasi dan eksekusi legalitas usaha secara end-to-end melalui sistem OSS RBA, NPWP, SIMBG/PBG, serta pendampingan kepatuhan regulasi.', highlights: ['OSS RBA', 'NPWP Badan / Pribadi', 'SIMBG / PBG', 'Pendampingan UMKM & Korporasi'] },
  { number: '03', role: 'IT & DIGITAL MARKETING SPECIALIST', company: 'Omah Kopi Mrisen', location: 'Sleman', period: '2021 — PRESENT', type: 'PART-TIME', description: 'Mengelola IT operasional, POS, jaringan, administrasi, HR operations, digital marketing, fotografi, desain grafis, serta kampanye media sosial.', highlights: ['POS & LAN/WLAN', 'HR Operations', 'Automated Attendance', 'Digital Marketing & Creative'] },
  { number: '04', role: 'DESAIN GRAFIS', company: 'PT. INDOKOM', location: 'Sleman', period: '2013 — 2014', type: 'FULL-TIME', description: 'Memproduksi aset visual untuk branding produk korporat serta kebutuhan kampanye pemasaran digital multimedia.', highlights: ['Corporate Branding', 'Graphic Design', 'Digital Campaign', 'Multimedia Production'] },
]
const skills = [
  { title: 'LEGAL & ADMINISTRATION', items: ['OSS RBA', 'SIMBG / PBG', 'Jaminan Fidusia', 'Administrasi Pertanahan', 'Pemetaan Lahan', 'NPWP', 'Microsoft Office', 'Document Management'] },
  { title: 'IT & INFRASTRUCTURE', items: ['IT Technical Support', 'LAN / WLAN', 'Hardware Troubleshooting', 'Windows', 'Linux', 'macOS / UNIX', 'Database Security', 'Web Development', 'Visual Studio Code', 'AutoCAD'] },
  { title: 'IOT & INNOVATION', items: ['ESP32', 'Microcontroller', 'Sensor Integration'] },
  { title: 'DIGITAL & CREATIVE', items: ['Digital Marketing', 'Adobe Creative Suite', 'CorelDRAW', 'Canva', 'Photography', 'Video Editing'] },
]
const professionalTraits = ['Logical Data Analysis', 'Hardware / Software Problem Solving', 'Adaptability', 'Regulatory Understanding', 'Administrative Accuracy', 'Structured Data Handling']

export default function CVSection() {
  return (
    <main className="cv-page">
      <section className="cv-hero">
        <div className="cv-container">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="cv-eyebrow">PMA MEDIA / PROFESSIONAL PROFILE</span>
            <h1>IMAM<br /><em>FALAHI.</em></h1>
            <p className="cv-title">INFORMATICS GRADUATE<br />TECHNICAL SUPPORT · BUSINESS & OPERATIONS</p>
            <div className="cv-contact-line"><span>SLEMAN, DI YOGYAKARTA</span><span>087 888 780 999</span><span>mobho@ymail.com</span></div>
          </motion.div>
          <div className="cv-hero-side">
            <div className="cv-photo-card" style={{ border: '1px solid rgba(100,232,255,.22)', padding: 8, background: 'rgba(16,18,22,.72)', maxWidth: 240 }}>
              <img src={photoFile} alt="Imam Falahi" className="cv-photo" style={{ width: '100%', aspectRatio: '4 / 5', display: 'block', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%)', transition: 'filter .4s ease' }} />
              <span style={{ display: 'block', padding: '9px 3px 3px', margin: 0, fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'var(--accent)', letterSpacing: '.1em' }}>PROFILE / 2026</span>
            </div>
            <div><span>EDUCATION</span><strong>S.Kom INFORMATICS</strong></div>
            <div><span>GPA</span><strong>3.82 / CUM LAUDE</strong></div>
            <div><span>PORTFOLIO</span><strong>PMA.WTF</strong></div>
          </div>
        </div>
      </section>

      <section className="cv-section"><div className="cv-container"><div className="cv-section-label"><span>01 / SUMMARY</span></div><div className="cv-summary-grid"><h2>TECHNICAL<br /><em>+ PRACTICAL.</em></h2><div><p>Lulusan Sarjana Informatika dari Universitas Siber Muhammadiyah dengan predikat Cum Laude dan pengalaman profesional lintas bidang dalam teknologi informasi, operasional, administrasi, serta layanan teknis.</p><p>Terbiasa berinteraksi dengan kebutuhan pengguna dan klien, memberikan dukungan teknis, menjelaskan proses dan solusi, serta mengelola pekerjaan secara terstruktur dan berorientasi pada hasil.</p><p>Memiliki kemampuan analisis, komunikasi, pemecahan masalah, dan adaptasi terhadap produk maupun sistem baru. Memiliki ketertarikan untuk berkembang pada bidang Product Specialist, khususnya dalam memahami produk teknis, memberikan solusi kepada pelanggan, serta mendukung pemasaran dan pengembangan bisnis.</p></div></div></div></section>
      <section className="cv-section"><div className="cv-container"><div className="cv-section-label"><span>02 / EXPERIENCE</span></div><div className="cv-experience-list">{experiences.map((experience, index) => <motion.article key={experience.number} className="cv-experience" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.06 }}><div className="cv-exp-number">{experience.number}</div><div className="cv-exp-main"><div className="cv-exp-heading"><div><span className="cv-exp-type">{experience.type}</span><h3>{experience.role}</h3><h4>{experience.company}</h4></div><div className="cv-exp-date"><span>{experience.period}</span><span>{experience.location}</span></div></div><p>{experience.description}</p><div className="cv-highlights">{experience.highlights.map(item => <span key={item}>{item}</span>)}</div></div></motion.article>)}</div></div></section>
      <section className="cv-section"><div className="cv-container"><div className="cv-section-label"><span>03 / EDUCATION</span></div><div className="cv-education"><div className="cv-education-year">2022 — 2026</div><div><span>UNIVERSITAS SIBER MUHAMMADIYAH</span><h2>SARJANA INFORMATIKA</h2><p>Konsentrasi Sistem Informasi & Analisis Data.</p><div className="cv-education-meta"><strong>GPA 3.82</strong><strong>CUM LAUDE</strong><span>Association Rule Mining</span></div></div></div></div></section>
      <section className="cv-section"><div className="cv-container"><div className="cv-section-label"><span>04 / SKILLS</span></div><div className="cv-skills-grid">{skills.map(group => <div className="cv-skill-group" key={group.title}><h3>{group.title}</h3><div>{group.items.map(skill => <span key={skill}>{skill}</span>)}</div></div>)}</div></div></section>
      <section className="cv-section"><div className="cv-container"><div className="cv-section-label"><span>05 / PROFESSIONAL TRAITS</span></div><div className="cv-traits">{professionalTraits.map((trait, index) => <div key={trait}><span>{String(index + 1).padStart(2, '0')}</span><strong>{trait}</strong></div>)}</div></div></section>
      <section className="cv-download"><div className="cv-container"><span>06 / DOCUMENT</span><h2>NEED THE<br /><em>FULL CV?</em></h2><p>Download atau buka versi PDF CV terbaru Imam Falahi — September 2026.</p><div className="cv-download-actions"><a href={cvFile} target="_blank" rel="noreferrer" className="cv-button primary">OPEN PDF <span>↗</span></a><a href={cvFile} download className="cv-button secondary">DOWNLOAD CV <span>↓</span></a></div></div></section>
    </main>
  )
}
