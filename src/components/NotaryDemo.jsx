import { useMemo, useState } from "react";

const menu = [
  ["Dashboard", "dashboard"],
  ["Monitor Status Berkas", "monitor"],
  ["Berkas VIP", "vip"],
  ["Tanda Terima Berkas", "receipt"],
  ["Surat Kuasa", "kuasa"],
  ["Generator Invoice", "invoice"],
  ["Parser KTP AI", "ai"],
  ["Koreksi Draf Akta", "akta"],
  ["E-Meterai & TTD", "meterai"],
  ["Kompres Dokumen", "compress"],
  ["Laporan Patok", "patok"],
  ["Koordinat BPN", "bpn"],
];

const cases = [
  { id: "A02", client: "PT Arunika Properti", service: "Akta Jual Beli (AJB)", stage: "Berkas Masuk & Pendaftaran", days: 6, status: "Proses" },
  { id: "Y02", client: "Rizky Pratama", service: "Akta Jual Beli (AJB)", stage: "Proses Pajak (Validasi/NTPD)", days: 12, status: "Menunggu" },
  { id: "Y06", client: "CV Sembada", service: "Balik Nama Sertifikat", stage: "Proses Pajak (Validasi/NTPD)", days: 15, status: "Kritis" },
  { id: "B11", client: "Siti Rahma", service: "Pengecekan Sertifikat", stage: "Pengecekan BPN", days: 4, status: "Proses" },
];

const locations = [
  ["MAGUWOHARJO", 4], ["SARIHARJO", 2], ["SUKOHARJO", 2], ["TRIHARJO", 2], ["CATURTUNGGAL", 1],
];

function Icon({ name }) {
  const glyphs = {
    dashboard: "▦", monitor: "▤", vip: "★", receipt: "🤝", kuasa: "✎", invoice: "▣", ai: "▤", akta: "Aᵇ", meterai: "✒", compress: "▧", patok: "⌁", bpn: "⌖",
  };
  return <span className="notary-icon" aria-hidden="true">{glyphs[name] || "•"}</span>;
}

export default function NotaryDemo() {
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => cases.filter((item) => `${item.id} ${item.client} ${item.service}`.toLowerCase().includes(search.toLowerCase())), [search]);
  const activeLabel = menu.find(([label, id]) => id === active)?.[0] || "Dashboard";

  return (
    <main className="notary-demo">
      <header className="notary-topbar">
        <div className="notary-brand"><span className="notary-brand-mark">⚖</span><strong>KANTOR NOTARIS</strong><small>PMA LEGAL OPS</small></div>
        <div className="notary-top-actions"><button aria-label="Kalender">▦</button><button aria-label="Mode gelap">◐</button><span className="server-pill"><i /> Server Intranet Aktif</span><span className="staff-name">Staf Notaris</span><button className="profile-button" aria-label="Profil">●</button></div>
      </header>

      <div className="notary-layout">
        <aside className="notary-sidebar">
          <div className="notary-office"><div className="notary-office-logo">⚖</div><strong>KANTOR NOTARIS</strong><small>Yogyakarta · Indonesia</small></div>
          <nav>
            {menu.map(([label, id], index) => (
              <div key={id} className={index === 1 || index === 8 ? "nav-group" : ""}>
                {index === 1 && <span className="nav-heading">MODUL OPERASIONAL</span>}
                {index === 8 && <span className="nav-heading">MODUL UTILITAS</span>}
                <button className={active === id ? "active" : ""} onClick={() => setActive(id)}><Icon name={id} /><span>{label}</span>{id === "monitor" && <em>25</em>}</button>
              </div>
            ))}
          </nav>
          <div className="notary-sidebar-foot">Sistem Intranet v2.0 · Demo</div>
        </aside>

        <section className="notary-content">
          <div className="notary-pagebar"><h1>{activeLabel}</h1><div className="notary-page-actions"><button>↻ <span>Refresh Data</span></button><button className="primary-action">◔ <span>Tampilkan Grafik</span></button></div></div>

          {active === "dashboard" ? <>
            <div className="notary-welcome"><h2>Selamat Siang, Tim Staf Notaris!</h2><p>›&nbsp; Seluruh data klien tersimpan aman dan terenkripsi di server kantor.</p><p>🗓️ Selasa, 15-09-2026 — Hari yang cerah untuk menyelesaikan backlog dokumen klien. Mari selesaikan! 🚀</p></div>
            <div className="notary-stats">
              <div><span className="stat-icon blue">▣</span><div><small>BERKAS AKTIF (WIP)</small><strong>25</strong></div></div>
              <div><span className="stat-icon yellow">◔</span><div><small>WASPADA (&gt; 7 HARI)</small><strong>0</strong></div></div>
              <div><span className="stat-icon red">▲</span><div><small>KRITIS (&gt; 14 HARI)</small><strong>25</strong></div></div>
            </div>

            <div className="notary-dashboard-grid">
              <section className="notary-panel"><div className="panel-title"><h2>📍 Sebaran Lokasi Objek</h2></div>{locations.map(([name, count]) => <div className="location-row" key={name}><span>📍 {name}</span><b>{count} Berkas</b></div>)}</section>
              <section className="notary-panel ai-panel"><div className="panel-title"><h2>🧠 Asisten Analitik AI</h2></div><div className="ai-box"><p>Kantor saat ini sedang menangani <strong>25 berkas aktif.</strong></p><p className="alert-text">⚠ Terdeteksi <strong>25 berkas</strong> dalam status stagnan/kritis. Mohon jadikan prioritas utama hari ini:</p><ul>{cases.slice(0, 3).map((item) => <li key={item.id}>Berkas <strong>{item.id}</strong> ({item.service}) tertahan &gt; {item.days} hari di tahap: <em>{item.stage}</em></li>)}<li>...dan 22 berkas lainnya.</li></ul></div></section>
            </div>

            <div className="notary-bottom-cards"><button onClick={() => setActive("monitor")}><span>▤</span><strong>Monitor Status Berkas</strong><small>Lihat seluruh pekerjaan aktif</small><b>→</b></button><button onClick={() => setActive("vip")}><span>★</span><strong>Berkas VIP</strong><small>Prioritas dan perhatian khusus</small><b>→</b></button><button onClick={() => setActive("receipt")}><span>🤝</span><strong>Tanda Terima Berkas</strong><small>Kelola serah-terima dokumen</small><b>→</b></button></div>
          </> : <section className="notary-panel module-page"><span className="module-kicker">MODUL / {active.toUpperCase()}</span><h2>{activeLabel}</h2><p>Modul ini siap menjadi workflow operasional kantor: input data, checklist, status, dokumen, deadline, dan riwayat aktivitas. Untuk tahap berikutnya kita sambungkan ke backend nyata tanpa mengubah pola penggunaan yang sederhana.</p><div className="module-grid"><div><Icon name={active} /><strong>Data terstruktur</strong><small>Record dan status pekerjaan tersimpan rapi.</small></div><div><Icon name="monitor" /><strong>Monitoring</strong><small>Prioritas, deadline, dan pekerjaan tertahan.</small></div><div><Icon name="dokumen" /><strong>Dokumen</strong><small>Checklist dan arsip sesuai perkara.</small></div></div></section>}
        </section>
      </div>
    </main>
  );
}
