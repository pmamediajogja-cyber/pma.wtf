import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiBell, FiCalendar, FiCheckCircle, FiChevronRight, FiClock, FiDollarSign, FiFileText, FiFolder, FiHome, FiLock, FiPlus, FiSearch, FiShield, FiUsers } from 'react-icons/fi'

const clients = [
  { name: 'Budi Santoso', type: 'AJB', status: 'Proses PPAT', updated: '10 menit lalu' },
  { name: 'PT Sinar Abadi', type: 'Pendirian PT', status: 'Draft Akta', updated: '32 menit lalu' },
  { name: 'Siti Rahma', type: 'SKMHT', status: 'Menunggu tanda tangan', updated: '1 jam lalu' },
  { name: 'Andi Pratama', type: 'Balik Nama', status: 'Dokumen lengkap', updated: '2 jam lalu' },
]

const activities = [
  ['Akta jual beli', 'Budi Santoso', 'Baru diperbarui', '10 menit lalu'],
  ['Invoice INV-2026-0912', 'PT Sinar Abadi', 'Pembayaran tercatat', '28 menit lalu'],
  ['Berkas balik nama', 'Andi Pratama', 'Dokumen lengkap', '2 jam lalu'],
]

function StatCard({ icon: Icon, label, value, note }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.iconBox}><Icon size={19} /></div>
      <div style={{ flex: 1 }}>
        <div style={styles.muted}>{label}</div>
        <div style={styles.statValue}>{value}</div>
        <div style={styles.note}>{note}</div>
      </div>
    </div>
  )
}

export default function NotaryDemo() {
  const [active, setActive] = useState('Dashboard')
  const [query, setQuery] = useState('')
  const [showNew, setShowNew] = useState(false)

  const filteredClients = useMemo(() => clients.filter(c =>
    `${c.name} ${c.type} ${c.status}`.toLowerCase().includes(query.toLowerCase())
  ), [query])

  const nav = [
    ['Dashboard', FiHome], ['Klien & Perkara', FiUsers], ['Akta & Dokumen', FiFileText],
    ['Pelacakan', FiClock], ['Agenda', FiCalendar], ['Invoice', FiDollarSign]
  ]

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <div style={styles.logo}>S</div>
          <div><strong>Sistem Notaris</strong><span>& PPAT</span></div>
        </div>
        <div style={styles.tenantCard}>
          <div style={styles.eyebrow}>DEMO KANTOR</div>
          <div style={{ fontWeight: 700 }}>Notaris & PPAT Maju</div>
          <div style={styles.small}>Tenant #DEMO-001</div>
        </div>
        <nav style={{ display: 'grid', gap: 6, marginTop: 22 }}>
          {nav.map(([label, Icon]) => (
            <button key={label} onClick={() => setActive(label)} style={{ ...styles.navItem, ...(active === label ? styles.navActive : {}) }}>
              <Icon size={17} /><span>{label}</span>{active === label && <FiChevronRight size={15} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: 20 }}>
          <div style={styles.secure}><FiShield size={15} /> Data tenant terisolasi</div>
          <button style={styles.back} onClick={() => { window.location.href = '/' }}><FiArrowLeft size={16} /> Kembali ke portfolio</button>
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <div style={styles.breadcrumb}>WORKSPACE / {active.toUpperCase()}</div>
            <h1 style={styles.title}>{active}</h1>
          </div>
          <div style={styles.headerActions}>
            <div style={styles.search}><FiSearch size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari klien, akta..." /></div>
            <button style={styles.circle}><FiBell size={17} /></button>
            <div style={styles.avatar}>IF</div>
          </div>
        </header>

        {active !== 'Dashboard' ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={styles.placeholder}>
            <div style={{ ...styles.iconBox, marginBottom: 18 }}><FiFolder size={22} /></div>
            <h2 style={{ margin: 0, fontSize: 22 }}>{active}</h2>
            <p style={{ color: '#8b95a7', maxWidth: 520, lineHeight: 1.7 }}>Modul ini tersedia dalam rancangan produk. Demo dashboard ini menggunakan data simulasi dan tidak terhubung ke data klien nyata.</p>
            <button style={styles.primary} onClick={() => setActive('Dashboard')}>Kembali ke Dashboard</button>
          </motion.div>
        ) : (
          <>
            <section style={styles.heroStrip}>
              <div><div style={styles.heroEyebrow}>MONDAY · 15 SEPTEMBER 2026</div><h2 style={{ margin: '5px 0 0', fontSize: 25 }}>Selamat datang, Notaris.</h2><p style={{ margin: '7px 0 0', color: '#a9b2c1' }}>Pantau pekerjaan kantor dalam satu workspace yang aman.</p></div>
              <button style={styles.primary} onClick={() => setShowNew(true)}><FiPlus /> Perkara Baru</button>
            </section>

            <section style={styles.stats}>
              <StatCard icon={FiUsers} label="Klien aktif" value="128" note="+8 bulan ini" />
              <StatCard icon={FiFileText} label="Akta berjalan" value="47" note="12 perlu perhatian" />
              <StatCard icon={FiClock} label="Agenda hari ini" value="6" note="2 dalam 1 jam" />
              <StatCard icon={FiDollarSign} label="Invoice outstanding" value="Rp 18,4 jt" note="14 invoice" />
            </section>

            <section style={styles.grid}>
              <div style={styles.panel}>
                <div style={styles.panelHead}><div><h3 style={styles.panelTitle}>Perkara terbaru</h3><p style={styles.panelSub}>Aktivitas klien yang perlu dipantau</p></div><button style={styles.textButton}>Lihat semua <FiChevronRight /></button></div>
                <div style={{ display: 'grid' }}>
                  {filteredClients.map((c, i) => <div key={c.name} style={styles.row}>
                    <div style={styles.clientIcon}>{c.name.split(' ').map(x => x[0]).slice(0,2).join('')}</div>
                    <div style={{ flex: 1 }}><div style={{ fontWeight: 650 }}>{c.name}</div><div style={styles.small}>{c.type} · {c.updated}</div></div>
                    <span style={styles.status}>{c.status}</span>
                    <FiChevronRight size={15} color="#687386" />
                  </div>)}
                </div>
              </div>

              <div style={styles.panel}>
                <div style={styles.panelHead}><div><h3 style={styles.panelTitle}>Aktivitas</h3><p style={styles.panelSub}>Jejak aktivitas terbaru</p></div></div>
                {activities.map(([a,b,c,d]) => <div key={a} style={styles.activity}><div style={styles.dot}><FiCheckCircle size={13} /></div><div><div style={{ fontWeight: 600 }}>{a}</div><div style={styles.small}>{b} · {c}</div><div style={styles.time}>{d}</div></div></div>)}
              </div>
            </section>

            <section style={styles.bottomGrid}>
              <div style={styles.panel}><div style={styles.panelHead}><div><h3 style={styles.panelTitle}>Agenda hari ini</h3><p style={styles.panelSub}>Senin, 15 September</p></div></div><div style={styles.timeline}><b>13:30</b><span>Penandatanganan AJB · Budi Santoso</span><b>15:00</b><span>Konsultasi PPAT · Siti Rahma</span><b>16:30</b><span>Review draft akta · PT Sinar Abadi</span></div></div>
              <div style={{ ...styles.panel, background: 'linear-gradient(135deg, rgba(0,240,255,.09), rgba(123,47,247,.08))' }}><FiLock size={20} /><h3 style={{ margin: '14px 0 6px' }}>Security by design</h3><p style={{ color: '#9aa4b4', lineHeight: 1.65, margin: 0 }}>Role-based access, tenant isolation, audit trail, secure session, CSRF protection dan kontrol akses dokumen.</p></div>
            </section>
          </>
        )}
      </main>

      {showNew && <div style={styles.modalBackdrop} onClick={() => setShowNew(false)}><div style={styles.modal} onClick={e => e.stopPropagation()}><div style={styles.panelHead}><div><h3 style={styles.panelTitle}>Buat perkara baru</h3><p style={styles.panelSub}>Demo UI — tidak menyimpan data.</p></div><button style={styles.close} onClick={() => setShowNew(false)}>×</button></div><label style={styles.label}>Nama klien<input style={styles.field} placeholder="Contoh: Budi Santoso" /></label><label style={styles.label}>Jenis layanan<select style={styles.field}><option>Akta Jual Beli</option><option>Balik Nama</option><option>Pendirian PT</option><option>SKMHT</option></select></label><button style={{ ...styles.primary, width: '100%', justifyContent: 'center' }} onClick={() => setShowNew(false)}>Simpan demo</button></div></div>}
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#070b12', color: '#e9eef7', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex' },
  sidebar: { width: 248, borderRight: '1px solid rgba(255,255,255,.08)', padding: 20, display: 'flex', flexDirection: 'column', background: 'rgba(5,8,14,.94)', boxSizing: 'border-box' },
  brand: { display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, letterSpacing: '.2px' },
  brand span: { display: 'block', color: '#8490a3', fontSize: 11 },
  logo: { width: 34, height: 34, borderRadius: 9, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#00f0ff,#7b2ff7)', color: '#061018', fontWeight: 900 },
  tenantCard: { marginTop: 24, padding: 14, borderRadius: 12, background: 'rgba(255,255,255,.035)', border: '1px solid rgba(255,255,255,.07)' },
  eyebrow: { color: '#00d9e8', fontSize: 9, letterSpacing: 1.5, fontWeight: 800, marginBottom: 7 },
  small: { color: '#778295', fontSize: 12, marginTop: 4 },
  navItem: { border: 0, background: 'transparent', color: '#8f9aad', padding: '10px 11px', borderRadius: 9, display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', cursor: 'pointer', fontSize: 13 },
  navActive: { color: '#eafcff', background: 'rgba(0,240,255,.08)', boxShadow: 'inset 2px 0 #00f0ff' },
  secure: { fontSize: 10, color: '#758095', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 },
  back: { border: 0, background: 'transparent', color: '#8792a5', display: 'flex', gap: 8, alignItems: 'center', padding: 0, cursor: 'pointer', fontSize: 11 },
  main: { flex: 1, minWidth: 0, padding: '28px clamp(20px, 4vw, 48px)', maxWidth: 1500, boxSizing: 'border-box', margin: '0 auto' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, marginBottom: 26 },
  breadcrumb: { color: '#586478', fontSize: 9, letterSpacing: 1.5, fontWeight: 800 },
  title: { fontSize: 26, margin: '6px 0 0', letterSpacing: -.5 },
  headerActions: { display: 'flex', alignItems: 'center', gap: 10 },
  search: { display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', width: 220, border: '1px solid rgba(255,255,255,.09)', borderRadius: 9, background: 'rgba(255,255,255,.035)', color: '#687386' },
  searchInput: {},
  circle: { width: 36, height: 36, borderRadius: 9, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.035)', color: '#8994a7', display: 'grid', placeItems: 'center' },
  avatar: { width: 34, height: 34, borderRadius: '50%', background: '#1a2433', display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 800, color: '#00e8f5' },
  heroStrip: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, padding: 24, borderRadius: 16, border: '1px solid rgba(0,240,255,.13)', background: 'linear-gradient(110deg,rgba(0,240,255,.07),rgba(123,47,247,.05))', marginBottom: 18 },
  heroEyebrow: { color: '#00d9e8', fontSize: 9, letterSpacing: 1.4, fontWeight: 800 },
  primary: { display: 'inline-flex', alignItems: 'center', gap: 8, border: 0, borderRadius: 9, padding: '10px 15px', background: 'linear-gradient(90deg,#00dce9,#7b2ff7)', color: '#fff', fontWeight: 750, cursor: 'pointer', fontSize: 12 },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 14, marginBottom: 18 },
  statCard: { display: 'flex', gap: 13, padding: 18, borderRadius: 13, border: '1px solid rgba(255,255,255,.07)', background: 'rgba(255,255,255,.028)' },
  iconBox: { width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(0,240,255,.08)', color: '#00e0ed', flexShrink: 0 },
  muted: { color: '#7b8799', fontSize: 10, textTransform: 'uppercase', letterSpacing: .8 },
  statValue: { fontSize: 20, fontWeight: 750, marginTop: 3 },
  note: { color: '#596678', fontSize: 10, marginTop: 3 },
  grid: { display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 18, marginBottom: 18 },
  bottomGrid: { display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 18 },
  panel: { border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, background: 'rgba(255,255,255,.025)', padding: 19 },
  panelHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  panelTitle: { margin: 0, fontSize: 14 },
  panelSub: { margin: '4px 0 0', color: '#687487', fontSize: 11 },
  textButton: { border: 0, background: 'transparent', color: '#00dce9', display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, cursor: 'pointer' },
  row: { display: 'flex', alignItems: 'center', gap: 11, padding: '13px 0', borderTop: '1px solid rgba(255,255,255,.055)' },
  clientIcon: { width: 31, height: 31, borderRadius: 8, display: 'grid', placeItems: 'center', background: '#121a27', color: '#9ca8ba', fontSize: 9, fontWeight: 800 },
  status: { padding: '5px 8px', borderRadius: 6, background: 'rgba(0,240,255,.055)', color: '#74dce4', fontSize: 9, whiteSpace: 'nowrap' },
  activity: { display: 'flex', gap: 11, padding: '12px 0', borderTop: '1px solid rgba(255,255,255,.055)' },
  dot: { color: '#00dce9', marginTop: 2 },
  time: { color: '#566275', fontSize: 9, marginTop: 5 },
  timeline: { display: 'grid', gridTemplateColumns: '55px 1fr', gap: 13, fontSize: 11, color: '#aeb7c5' },
  placeholder: { minHeight: 430, display: 'grid', placeItems: 'center', alignContent: 'center', textAlign: 'center', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, background: 'rgba(255,255,255,.025)', padding: 30 },
  modalBackdrop: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.72)', display: 'grid', placeItems: 'center', zIndex: 100 },
  modal: { width: 'min(440px, calc(100vw - 32px))', background: '#0d131d', border: '1px solid rgba(0,240,255,.18)', borderRadius: 16, padding: 22, boxSizing: 'border-box', boxShadow: '0 30px 80px rgba(0,0,0,.5)' },
  close: { border: 0, background: 'transparent', color: '#8b95a7', fontSize: 25, cursor: 'pointer' },
  label: { display: 'grid', gap: 7, color: '#8f9aac', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, margin: '15px 0' },
  field: { width: '100%', boxSizing: 'border-box', padding: '11px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,.09)', background: '#080d15', color: '#e8edf6', outline: 0 }
}
