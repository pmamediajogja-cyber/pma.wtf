import { useMemo, useState } from "react";

const menu = [
  ["Dashboard", "dashboard"],
  ["Clients", "clients"],
  ["Akta & Perjanjian", "akta"],
  ["PPAT / Pertanahan", "ppat"],
  ["Dokumen", "dokumen"],
  ["Jadwal", "jadwal"],
];

const cases = [
  { id: "AKT-0261", client: "PT Arunika Properti", service: "Akta Jual Beli", status: "PROSES", date: "15 SEP 2026" },
  { id: "PPAT-0184", client: "Rizky Pratama", service: "Balik Nama Sertifikat", status: "MENUNGGU", date: "16 SEP 2026" },
  { id: "AKT-0258", client: "CV Sembada", service: "Perjanjian Kerja Sama", status: "SELESAI", date: "14 SEP 2026" },
  { id: "PPAT-0179", client: "Siti Rahma", service: "Pengecekan Sertifikat", status: "PROSES", date: "13 SEP 2026" },
];

const documents = [
  ["KTP / Identitas", "12 / 14", "93%"],
  ["Sertifikat Tanah", "08 / 10", "80%"],
  ["Pajak & BPHTB", "06 / 08", "75%"],
];

function Icon({ name }) {
  const paths = {
    dashboard: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    clients: "M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-1a2.5 2.5 0 1 0 0-5M3 20c.4-3.4 2.1-5 5-5s4.6 1.6 5 5M14 15c2.7-.1 4.4 1.5 5 5",
    akta: "M6 3h9l4 4v14H6zM15 3v5h5M9 12h6M9 16h6",
    ppat: "M4 20V9l8-5 8 5v11M8 20v-6h8v6M2 20h20",
    dokumen: "M7 4h10v16H7zM9 8h6M9 12h6M9 16h4",
    jadwal: "M5 3v3M19 3v3M4 8h16M5 5h14v15H5zM8 12h2M14 12h2M8 16h2",
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export default function NotaryDemo() {
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");
  const filteredCases = useMemo(() => cases.filter((item) => `${item.id} ${item.client} ${item.service}`.toLowerCase().includes(search.toLowerCase())), [search]);
  const activeLabel = menu.find((item) => item[1] === active)?.[0] || "Dashboard";

  return (
    <main className="notary-demo">
      <header className="notary-topbar">
        <a href="/" className="notary-brand"><span>PMA</span><b>LEGAL OPS</b></a>
        <div className="notary-demo-badge">PRODUCT DEMO / NOTARY & PPAT</div>
        <a href="/" className="notary-exit">EXIT DEMO ↗</a>
      </header>

      <div className="notary-layout">
        <aside className="notary-sidebar">
          <div className="notary-office"><span>DEMO OFFICE</span><strong>NOTARIS & PPAT</strong><small>YOGYAKARTA · ID</small></div>
          <nav>{menu.map(([label, id]) => <button key={id} className={active === id ? "active" : ""} onClick={() => setActive(id)}><Icon name={id} /><span>{label}</span>{id === "dokumen" && <em>24</em>}</button>)}</nav>
          <div className="notary-sidebar-foot"><span>ENVIRONMENT</span><strong>DEMO / LOCAL DATA</strong><small>No real client data</small></div>
        </aside>

        <section className="notary-content">
          <div className="notary-heading">
            <div><span>WORKSPACE / 01</span><h1>{activeLabel}</h1><p>Operations dashboard for a modern Notary & PPAT office.</p></div>
            <div className="notary-user"><i>IF</i><div><strong>Imam Falahi</strong><small>Administrator</small></div></div>
          </div>

          {active === "dashboard" && <>
            <div className="notary-stats">
              <div><span>ACTIVE CASES</span><strong>18</strong><small>+4 this month</small></div>
              <div><span>DOCUMENTS</span><strong>126</strong><small>12 need review</small></div>
              <div><span>UPCOMING</span><strong>07</strong><small>next 7 days</small></div>
              <div><span>COMPLETED</span><strong>42</strong><small>this quarter</small></div>
            </div>
            <div className="notary-grid-main">
              <section className="notary-panel notary-cases">
                <div className="notary-panel-head"><div><span>CASE PIPELINE</span><h2>Recent matters</h2></div><button onClick={() => setActive("clients")}>VIEW ALL ↗</button></div>
                <div className="notary-search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search client, matter, or ID..." /></div>
                <div className="notary-table"><div className="notary-table-head"><span>REFERENCE</span><span>CLIENT</span><span>SERVICE</span><span>STATUS</span><span>DATE</span></div>{filteredCases.map((item) => <div className="notary-table-row" key={item.id}><strong>{item.id}</strong><span>{item.client}</span><span>{item.service}</span><b className={`status-${item.status.toLowerCase()}`}>{item.status}</b><time>{item.date}</time></div>)}</div>
              </section>
              <section className="notary-panel notary-today">
                <div className="notary-panel-head"><div><span>TODAY</span><h2>Office flow</h2></div><span className="live-dot">● LIVE</span></div>
                <div className="notary-timeline"><div><time>09:00</time><span className="timeline-dot" /><section><strong>Pengecekan berkas</strong><small>Rizky Pratama · PPAT-0184</small></section></div><div><time>11:30</time><span className="timeline-dot" /><section><strong>Penandatanganan akta</strong><small>PT Arunika Properti · AKT-0261</small></section></div><div><time>14:00</time><span className="timeline-dot" /><section><strong>Verifikasi dokumen</strong><small>CV Sembada · AKT-0258</small></section></div></div>
              </section>
            </div>
            <div className="notary-bottom-grid">
              <section className="notary-panel"><div className="notary-panel-head"><div><span>DOCUMENT CONTROL</span><h2>Completeness</h2></div><button onClick={() => setActive("dokumen")}>OPEN ↗</button></div>{documents.map(([label, count, percent]) => <div className="notary-progress" key={label}><div><span>{label}</span><strong>{count}</strong></div><div><i style={{ width: percent }} /></div></div>)}</section>
              <section className="notary-panel notary-quick"><span>QUICK ACTION</span><h2>Create a new matter.</h2><p>Start a client file, define the service, assign documents, and track its progress from intake to completion.</p><div><button onClick={() => setActive("clients")}>+ NEW CLIENT</button><button onClick={() => setActive("akta")}>+ NEW MATTER</button></div></section>
            </div>
          </>}

          {active !== "dashboard" && <section className="notary-panel notary-module-placeholder"><span>MODULE / {active.toUpperCase()}</span><h2>{activeLabel}</h2><p>This demo module is connected to the workspace navigation. The next product layer can turn this into the full workflow: intake → checklist → drafting → signing → reporting → archive.</p><div className="notary-module-cards"><div><Icon name={active} /><strong>Workflow ready</strong><small>Structured records and status tracking</small></div><div><Icon name="dokumen" /><strong>Document control</strong><small>Checklist, versioning and review states</small></div><div><Icon name="jadwal" /><strong>Activity timeline</strong><small>Appointments, deadlines and follow-ups</small></div></div></section>}
        </section>
      </div>
    </main>
  );
}
