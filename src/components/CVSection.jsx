import { motion } from 'framer-motion'

const cvFile = '/cv/CV_IMAM FALAHI_September 2026.pdf'
const photoFile = '/cv/pasfoto.jpeg'

const stats = [
  { value: '300+', label: 'DOKUMEN LEGAL / BULAN' },
  { value: '99%', label: 'TINGKAT AKURASI' },
  { value: '1500+', label: 'DOKUMEN FIDUSIA / BULAN' },
  { value: '3.82', label: 'IPK / CUM LAUDE' },
]

const experiences = [
  {
    number: '01',
    role: 'IT SUPPORT & ADMINISTRASI LEGAL',
    company: 'Notaris & PPAT Endri Purwani, S.H., M.Kn.',
    location: 'Sleman',
    period: '2020 — 2026',
    type: 'FULL-TIME',
    points: [
      'Bertanggung jawab penuh atas pemeliharaan dan stabilitas infrastruktur IT kantor (hardware, software, jaringan lokal) serta memperketat protokol keamanan enkripsi database lokal arsip legal klien.',
      'Mengelola siklus komprehensif legalitas pertanahan: dokumen peralihan hak, pemecahan sertifikat (pecah lahan), hingga izin perubahan status penggunaan tanah (pengeringan/IPPT).',
      'Mengelola operasional end-to-end registrasi jaminan Fidusia perbankan — dari pendaftaran awal, standardisasi draf akta, hingga pencetakan sertifikat — dengan volume 1500+ dokumen per bulan tanpa cacat hukum.',
    ],
  },
  {
    number: '02',
    role: 'KONSULTAN PERIZINAN & REGULASI',
    company: 'PT PMA Media Yogyakarta',
    location: 'Sleman',
    period: '2020 — SEKARANG',
    type: 'CONSULTANT',
    points: [
      'Menangani proses legalitas dan perizinan usaha melalui OSS RBA, NPWP, SIMBG/PBG, serta sistem administrasi pemerintah terkait.',
      'Mendampingi UMKM dan perusahaan dalam pendaftaran, perubahan, pemenuhan dokumen, dan monitoring status perizinan.',
      'Melakukan verifikasi data dan dokumen untuk memastikan kesesuaian informasi usaha dengan persyaratan administrasi dan regulasi.',
    ],
  },
  {
    number: '03',
    role: 'IT + HR OPS + AUTOMATION + MARKETING + CREATIVE',
    company: 'Omah Kopi Mrisen',
    location: 'Sleman',
    period: '2021 — 2026',
    type: 'OPERATIONS',
    points: [
      'Mengelola infrastruktur IT harian: optimalisasi sistem POS, arsitektur jaringan lokal (LAN/WLAN), dan pemeliharaan preventif hardware.',
      'Memimpin siklus rekrutmen end-to-end serta merancang sistem rekapitulasi absensi terotomatisasi (Google Sheets) sebagai landasan payroll bulanan.',
      'Meningkatkan visibilitas merek melalui produksi konten kreatif (fotografi sinematik, desain grafis) dan kampanye media sosial berbasis analisis data performa mingguan.',
    ],
  },
  {
    number: '04',
    role: 'DESAIN GRAFIS',
    company: 'PT. INDOKOM',
    location: 'Sleman',
    period: '2013 — 2014',
    type: 'FULL-TIME',
    points: [
      'Memproduksi aset visual beresolusi tinggi untuk branding produk korporat dan materi kampanye pemasaran digital multimedia di berbagai kanal distribusi perusahaan.',
    ],
  },
]

const skills = [
  { title: 'LEGAL & ADMINISTRASI', items: ['OSS RBA & SIMBG (PBG)', 'Registrasi Jaminan Fidusia', 'Administrasi & Regulasi Pertanahan', 'Pemetaan Lahan', 'Manajemen Data Perbankan & Kredit', 'NPWP Badan / Pribadi', 'Microsoft Office', 'Manajemen Dokumen Legal'] },
  { title: 'IT & INFRASTRUKTUR', items: ['IT Technical Support', 'Network Maintenance (LAN/WLAN)', 'Hardware Troubleshooting', 'UNIX / macOS / Windows / Linux', 'Keamanan & Manajemen Database', 'Web Development', 'Visual Studio Code', 'AutoCAD'] },
  { title: 'IOT & INOVASI KERJA', items: ['IoT Development (ESP32)', 'Sensor Integration'] },
  { title: 'DIGITAL & MEDIA KREATIF', items: ['Digital Marketing Strategy', 'Adobe Creative Suite', 'CorelDRAW', 'Canva', 'Fotografi Profesional', 'Video Editing (CapCut)'] },
]

const professionalTraits = [
  'Logical Data Analysis',
  'Hardware / Software Problem Solving',
  'Adaptabilitas Regulasi Hukum & Teknologi',
  'Akurasi Administrasi & Presisi Data Terstruktur',
]

export default function CVSection() {
  return (
    <main className="cv-page">
      <section className="cv-hero">
        <div className="cv-container">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="cv-eyebrow">PMA MEDIA / PROFESSIONAL PROFILE</span>
            <h1>IMAM<br /><em>FALAHI.</em></h1>
            <p className="cv-title">IT OPERATIONS · TECHNICAL SUPPORT<br />LEGAL &amp; BUSINESS COMPLIANCE</p>
            <div className="cv-contact-line">
              <span>SLEMAN, DI YOGYAKARTA</span>
              <span>087 888 780 999</span>
              <span>MOBHO@YMAIL.COM</span>
            </div>
            <div className="cv-contact-line">
              <a href="https://linkedin.com/in/tugelanboto" target="_blank" rel="noreferrer">LINKEDIN.COM/IN/TUGELANBOTO ↗</a>
              <a href="https://pma.wtf" target="_blank" rel="noreferrer">PMA.WTF ↗</a>
            </div>
          </motion.div>
          <div className="cv-hero-side">
            <div className="cv-photo-card" style={{ border: '1px solid rgba(100,232,255,.22)', padding: 8, background: 'rgba(16,18,22,.72)', maxWidth: 240 }}>
              <img src={photoFile} alt="Imam Falahi" className="cv-photo" style={{ width: '100%', aspectRatio: '4 / 5', display: 'block', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%)', transition: 'filter .4s ease' }} />
              <span style={{ display: 'block', padding: '9px 3px 3px', margin: 0, fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'var(--accent)', letterSpacing: '.1em' }}>PROFILE / 2026</span>
            </div>
            <div><span>EDUCATION</span><strong>S.Kom INFORMATIKA</strong></div>
            <div><span>GPA</span><strong>3.82 / CUM LAUDE</strong></div>
            <div><span>FOCUS</span><strong>IT OPS × LEGAL COMPLIANCE</strong></div>
          </div>
        </div>
      </section>

      <section className="cv-stats"><div className="cv-container"><div className="cv-stats-grid">{stats.map((s, i) => <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}><strong>{s.value}</strong><span>{s.label}</span></motion.div>)}</div></div></section>

      <section className="cv-section"><div className="cv-container"><div className="cv-section-label"><span>01 / SUMMARY</span></div><div className="cv-summary-grid"><h2>TECH ×<br /><em>COMPLIANCE.</em></h2><div><p>Lulusan Sarjana Informatika dari Universitas Siber Muhammadiyah dengan predikat <strong>Cum Laude</strong> yang memiliki spesialisasi ganda di bidang <strong>IT Operations</strong> dan <strong>Legal Compliance</strong>.</p><p>Memiliki rekam jejak yang solid dalam mengotomatisasi alur kerja administrasi, mengelola keamanan database, serta mengeksekusi operasional legal perizinan (OSS RBA, BPOM, SIMBG, NPWP) — dengan rata-rata <strong>300 dokumen legal per bulan</strong> pada tingkat akurasi <strong>99%</strong>.</p><p>Memiliki minat karir untuk berinovasi di persimpangan antara teknologi informasi dan kepatuhan hukum guna meningkatkan efisiensi operasional perusahaan.</p></div></div></div></section>

      <section className="cv-section"><div className="cv-container"><div className="cv-section-label"><span>02 / EXPERIENCE</span></div><div className="cv-experience-list">{experiences.map((experience, index) => <motion.article key={experience.number} className="cv-experience" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.06 }}><div className="cv-exp-number">{experience.number}</div><div className="cv-exp-main"><div className="cv-exp-heading"><div><span className="cv-exp-type">{experience.type}</span><h3>{experience.role}</h3><h4>{experience.company}</h4></div><div className="cv-exp-date"><span>{experience.period}</span><span>{experience.location}</span></div></div><ul className="cv-exp-points">{experience.points.map(point => <li key={point}>{point}</li>)}</ul></div></motion.article>)}</div></div></section>

      <section className="cv-section"><div className="cv-container"><div className="cv-section-label"><span>03 / EDUCATION</span></div><div className="cv-education"><div className="cv-education-year">2022 — 2026</div><div><span>UNIVERSITAS SIBER MUHAMMADIYAH</span><h2>SARJANA INFORMATIKA</h2><p>Konsentrasi Sistem Informasi &amp; Analisis Data.</p><div className="cv-education-meta"><strong>GPA 3.82</strong><strong>CUM LAUDE</strong><span>Tugas Akhir: Optimasi strategi bisnis dengan Association Rule Mining</span></div></div></div></div></section>

      <section className="cv-section"><div className="cv-container"><div className="cv-section-label"><span>04 / SKILLS</span></div><div className="cv-skills-grid">{skills.map(group => <div className="cv-skill-group" key={group.title}><h3>{group.title}</h3><div>{group.items.map(skill => <span key={skill}>{skill}</span>)}</div></div>)}</div></div></section>

      <section className="cv-section"><div className="cv-container"><div className="cv-section-label"><span>05 / PROFESSIONAL TRAITS</span></div><div className="cv-traits">{professionalTraits.map((trait, index) => <div key={trait}><span>{String(index + 1).padStart(2, '0')}</span><strong>{trait}</strong></div>)}</div></div></section>

      <section className="cv-download"><div className="cv-container"><span>06 / DOCUMENT</span><h2>NEED THE<br /><em>FULL CV?</em></h2><p>Download atau buka versi PDF CV terbaru Imam Falahi — September 2026.</p><div className="cv-download-actions"><a href={cvFile} target="_blank" rel="noreferrer" className="cv-button primary">OPEN PDF <span>↗</span></a><a href={cvFile} download className="cv-button secondary">DOWNLOAD CV <span>↓</span></a></div></div></section>
    </main>
  )
}
