import NotaryDemo from "./NotaryDemo";

const tools = [
  ["Monitor Status Berkas", "Register digital, SLA, dan progres perkara.", "/notary/"],
  ["Tanda Terima Berkas", "Checklist serah-terima dokumen klien.", "/notary/receipt"],
  ["Generator Surat Kuasa", "Template surat kuasa untuk kebutuhan kantor.", "/notary/power-of-attorney"],
  ["Generator Invoice", "Invoice AJB/umum dengan relasi klien dan perkara.", "/notary/invoice"],
  ["Pengguna & Staff", "Role, akses, dan pengelolaan pengguna kantor.", "/notary/users"],
  ["Parser KTP AI", "Ekstraksi data KTP — integrasi berikutnya.", "#"],
  ["Koreksi Draf Akta", "Pemeriksaan format dokumen — integrasi berikutnya.", "#"],
  ["E-Meterai & TTD PDF", "Alat PDF — integrasi berikutnya.", "#"],
  ["Kompresor PDF", "Optimasi ukuran dokumen — integrasi berikutnya.", "#"],
  ["Laporan Patok BPN", "Generator laporan foto patok — integrasi berikutnya.", "#"],
  ["Koordinat TM-3 BPN", "Konversi koordinat — integrasi berikutnya.", "#"],
  ["Batch GPS Camera", "Pemrosesan foto patok — integrasi berikutnya.", "#"],
  ["Pencarian KBLI", "Referensi KBLI/OSS — integrasi berikutnya.", "#"],
];

export default function NotaryHome() {
  return (
    <div>
      <section style={{ padding: "28px 28px 22px", background: "linear-gradient(135deg,#0b1020,#141a2d 55%,#0b1020)", color: "#fff", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: ".16em", opacity: .6 }}>PMA LEGAL OPS / NOTARY & PPAT</div>
          <h2 style={{ margin: "8px 0 6px", fontSize: "clamp(24px,4vw,38px)" }}>Legal Operations Toolbox</h2>
          <p style={{ margin: 0, maxWidth: 720, opacity: .72, lineHeight: 1.6 }}>Satu pintu untuk modul kantor. Modul yang sudah terhubung memakai route canonical; alat lama yang belum dimigrasikan ditandai jelas agar tidak memberi kesan palsu bahwa backend-nya sudah aktif.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12, marginTop: 22 }}>
            {tools.map(([name, desc, href]) => {
              const active = href !== "#";
              return <a key={name} href={href} onClick={(e) => { if (!active) e.preventDefault(); }} style={{ textDecoration: "none", color: "inherit", border: "1px solid rgba(255,255,255,.11)", borderRadius: 14, padding: 16, background: active ? "rgba(255,255,255,.075)" : "rgba(255,255,255,.035)", opacity: active ? 1 : .62, transition: "transform .18s ease,background .18s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}><strong>{name}</strong><span style={{ fontSize: 12 }}>{active ? "↗" : "SOON"}</span></div>
                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.5, opacity: .68 }}>{desc}</div>
              </a>;
            })}
          </div>
        </div>
      </section>
      <NotaryDemo />
    </div>
  );
}
