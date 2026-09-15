import { useMemo, useState } from "react";
import { createDocumentReceipt } from "../lib/notaryApi";
import "./documentReceipt.css";

const defaultItems = [
  "Asli Alas Hak (Sertifikat / Letter C)",
  "Asli Salinan Akta Jual Beli (AJB)",
  "Asli Sertifikat Hak Tanggungan",
  "Asli Surat Roya / Fiat Roya",
  "Asli SPPT PBB",
  "Asli STTS PBB (Bukti Lunas)",
  "Fotocopy KTP & KK",
];

export default function DocumentReceipt({ matters = [], onSaved }) {
  const [direction, setDirection] = useState("incoming");
  const [matterId, setMatterId] = useState("");
  const [counterparty, setCounterparty] = useState("");
  const [receiptDate, setReceiptDate] = useState(new Date().toISOString().slice(0, 10));
  const [staffName, setStaffName] = useState("");
  const [selected, setSelected] = useState(() => new Set());
  const [custom, setCustom] = useState("");
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const allItems = useMemo(() => [...defaultItems, ...items], [items]);
  const toggle = name => setSelected(prev => {
    const next = new Set(prev);
    if (next.has(name)) next.delete(name); else next.add(name);
    return next;
  });
  const addCustom = () => {
    const value = custom.trim();
    if (!value || value.length > 500 || allItems.includes(value)) return;
    setItems(prev => [...prev, value]);
    setSelected(prev => new Set(prev).add(value));
    setCustom("");
  };
  const save = async e => {
    e.preventDefault();
    setMessage("");
    if (!matterId || !counterparty.trim() || selected.size === 0) {
      setMessage("Pilih perkara, isi pihak lain, dan pilih minimal satu dokumen.");
      return;
    }
    setSaving(true);
    try {
      const data = await createDocumentReceipt({
        matter_id: Number(matterId),
        direction,
        counterparty_name: counterparty.trim(),
        receipt_date: receiptDate,
        staff_name: staffName.trim(),
        items: [...selected].map(description => ({ description, quantity: 1 })),
      });
      setMessage(`Tersimpan. ID tanda terima: ${data.receipt_id}`);
      onSaved?.(data);
    } catch (error) {
      setMessage(error.message || "Tanda terima gagal disimpan.");
    } finally {
      setSaving(false);
    }
  };

  return <section className="notary-panel receipt-tool">
    <div className="panel-head"><div><span className="panel-kicker">UTILITY / TANDA TERIMA</span><h2>Generator Tanda Terima Berkas</h2></div><span className="receipt-badge">Tenant Scoped</span></div>
    <form onSubmit={save}>
      <div className="form-grid">
        <label>Arah dokumen<select value={direction} onChange={e => setDirection(e.target.value)}><option value="incoming">Terima Masuk · Klien → Kantor</option><option value="outgoing">Serah Keluar · Kantor → Pihak Luar</option></select></label>
        <label>Tanggal<input type="date" value={receiptDate} onChange={e => setReceiptDate(e.target.value)} /></label>
      </div>
      <div className="form-grid">
        <label>Perkara<select value={matterId} onChange={e => setMatterId(e.target.value)}><option value="">Pilih perkara...</option>{matters.map(m => <option key={m.id} value={m.id}>{m.id} · {m.client} · {m.service}</option>)}</select></label>
        <label>Nama pihak lain<input value={counterparty} onChange={e => setCounterparty(e.target.value)} placeholder="Nama klien / pihak penyerah" maxLength={200} /></label>
      </div>
      <label>Staff / Notaris<input value={staffName} onChange={e => setStaffName(e.target.value)} placeholder="Nama internal kantor" maxLength={200} /></label>
      <div className="receipt-docs"><strong>Dokumen yang diserahkan</strong>{allItems.map(name => <label className="receipt-check" key={name}><input type="checkbox" checked={selected.has(name)} onChange={() => toggle(name)} />{name}</label>)}</div>
      <div className="receipt-custom"><input value={custom} onChange={e => setCustom(e.target.value)} maxLength={500} placeholder="Tambah dokumen lain..." /><button type="button" className="btn ghost" onClick={addCustom}>+ Tambah</button></div>
      {message && <p className="receipt-message">{message}</p>}
      <button className="btn primary" disabled={saving}>{saving ? "Menyimpan..." : "Simpan Tanda Terima"}</button>
    </form>
  </section>;
}
