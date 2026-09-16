import { useEffect, useMemo, useState } from "react";
import { createInvoice, deleteInvoice, getInvoice, listClients, listInvoices, listMatters, updateInvoice } from "../lib/notaryApi";
import "./invoiceGenerator.css";

const ajbDefaults = [
  { description: "AKTA JUAL BELI", amount: "", distribution: "kosong" },
  { description: "BALIK NAMA", amount: "", distribution: "kosong" },
  { description: "PNBP", amount: "", distribution: "kosong" },
  { description: "CEK SERTIFIKAT", amount: "", distribution: "kosong" },
  { description: "ADMINISTRASI DAN MATERAI", amount: "", distribution: "kosong" },
];

const umumDefaults = [{ description: "", amount: "", distribution: "kosong" }];

const blankForm = () => ({
  id: null,
  invoice_number: "AUTO-GENERATE",
  service_mode: "AJB",
  invoice_date: new Date().toISOString().slice(0, 10),
  client_id: "",
  matter_id: "",
  property_reference: "",
  area_m2: "",
  seller_name: "",
  buyer_name: "",
  real_transaction_amount: "",
  tax_base_amount: "",
  npoptkp_amount: "60000000",
  burden_mode: true,
  items: ajbDefaults.map((item) => ({ ...item })),
});

function money(value) {
  const raw = String(value ?? "").replace(/[^0-9]/g, "");
  return raw ? Number(raw) : 0;
}
function formatMoney(value) {
  return value ? new Intl.NumberFormat("id-ID").format(Math.round(value)) : "";
}
function formatDate(value) {
  if (!value) return "........................";
  const [y, m, d] = value.split("-");
  return y && m && d ? `${d}/${m}/${y}` : value;
}
function shortName(name) {
  const upper = String(name || "").toUpperCase();
  return ({ "AKTA JUAL BELI": "AJB", "BALIK NAMA": "BN", "CEK SERTIFIKAT": "Cek", "ADMINISTRASI DAN MATERAI": "Admin" })[upper] || upper;
}

export default function InvoiceGenerator() {
  const [form, setForm] = useState(blankForm);
  const [history, setHistory] = useState([]);
  const [clients, setClients] = useState([]);
  const [matters, setMatters] = useState([]);
  const [view, setView] = useState("editor");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadHistory = async () => {
    const result = await listInvoices();
    setHistory(result.data || []);
  };

  useEffect(() => {
    Promise.all([loadHistory(), listClients(), listMatters()])
      .then(([, clientResult, matterResult]) => {
        setClients(clientResult.data || []);
        setMatters(matterResult.data || []);
      })
      .catch((error) => setMessage(error.message || "Data invoice gagal dimuat."))
      .finally(() => setLoading(false));
  }, []);

  const isAjb = form.service_mode === "AJB";
  const selectedClient = useMemo(() => clients.find((client) => String(client.id) === String(form.client_id)), [clients, form.client_id]);
  const clientMatters = useMemo(() => {
    if (!form.client_id) return matters;
    return matters.filter((matter) => String(matter.client_id) === String(form.client_id));
  }, [matters, form.client_id]);
  const selectedMatter = useMemo(() => matters.find((matter) => String(matter.id) === String(form.matter_id)), [matters, form.matter_id]);
  const parsedItems = useMemo(() => form.items.map((item) => ({ ...item, numericAmount: money(item.amount) })), [form.items]);
  const totalCosts = parsedItems.reduce((sum, item) => sum + item.numericAmount, 0);
  const pph = isAjb ? money(form.tax_base_amount) * 0.025 : 0;
  const bphtb = isAjb ? Math.max(0, money(form.tax_base_amount) - money(form.npoptkp_amount)) * 0.05 : 0;
  const sellerCosts = form.burden_mode && isAjb
    ? pph + parsedItems.reduce((sum, item) => sum + (item.distribution === "penjual" ? item.numericAmount : item.distribution === "bagi2" ? item.numericAmount / 2 : 0), 0)
    : 0;
  const buyerCosts = form.burden_mode && isAjb
    ? bphtb + parsedItems.reduce((sum, item) => sum + (item.distribution === "pembeli" ? item.numericAmount : item.distribution === "bagi2" ? item.numericAmount / 2 : 0), 0)
    : 0;

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const setMoneyField = (key, value) => setField(key, value.replace(/[^0-9]/g, ""));
  const setItem = (index, key, value) => setForm((prev) => ({ ...prev, items: prev.items.map((item, i) => i === index ? { ...item, [key]: value } : item) }));

  const changeClient = (clientId) => setForm((prev) => ({ ...prev, client_id: clientId, matter_id: "" }));
  const changeMode = (mode) => setForm((prev) => ({ ...prev, service_mode: mode, items: mode === "AJB" ? ajbDefaults.map((item) => ({ ...item })) : umumDefaults.map((item) => ({ ...item })), burden_mode: mode === "AJB" }));
  const addItem = () => setForm((prev) => ({ ...prev, items: [...prev.items, { description: "", amount: "", distribution: "kosong" }] }));
  const removeItem = (index) => setForm((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));

  const save = async () => {
    setSaving(true); setMessage("");
    try {
      const payload = {
        id: form.id,
        invoice_number: form.invoice_number,
        service_mode: form.service_mode,
        invoice_date: form.invoice_date,
        client_id: form.client_id === "" ? null : Number(form.client_id),
        matter_id: form.matter_id === "" ? null : Number(form.matter_id),
        property_reference: form.property_reference.trim(),
        area_m2: form.area_m2 === "" ? null : Number(form.area_m2),
        seller_name: form.seller_name.trim(),
        buyer_name: form.buyer_name.trim(),
        real_transaction_amount: money(form.real_transaction_amount),
        tax_base_amount: money(form.tax_base_amount),
        npoptkp_amount: money(form.npoptkp_amount),
        burden_mode: form.burden_mode,
        items: form.items.map((item) => ({ description: item.description.trim(), amount: money(item.amount), distribution: item.distribution })),
      };
      const result = form.id ? await updateInvoice(payload) : await createInvoice(payload);
      setForm((prev) => ({ ...prev, id: result.id, invoice_number: result.invoice_number || prev.invoice_number }));
      await loadHistory();
      setMessage(`Invoice tersimpan: ${result.invoice_number || form.invoice_number}`);
    } catch (error) {
      setMessage(error.message || "Invoice gagal disimpan.");
    } finally { setSaving(false); }
  };

  const openInvoice = async (id) => {
    setMessage("");
    try {
      const result = await getInvoice(id);
      const data = result.data;
      setForm({
        ...blankForm(), ...data,
        client_id: data.client_id ?? "",
        matter_id: data.matter_id ?? "",
        area_m2: data.area_m2 ?? "",
        real_transaction_amount: data.real_transaction_amount || "",
        tax_base_amount: data.tax_base_amount || "",
        npoptkp_amount: data.npoptkp_amount || "",
        items: (data.items || []).map((item) => ({ ...item, amount: item.amount || "" })),
      });
      setView("editor");
    } catch (error) { setMessage(error.message || "Invoice gagal dibuka."); }
  };

  const removeInvoice = async (id) => {
    if (!window.confirm("Hapus invoice ini dari register?")) return;
    try { await deleteInvoice(id); if (form.id === id) setForm(blankForm()); await loadHistory(); setMessage("Invoice dihapus."); }
    catch (error) { setMessage(error.message || "Invoice gagal dihapus."); }
  };

  if (loading) return <main className="site-shell"><section className="invoice-page"><div className="invoice-panel"><strong>Memuat generator invoice...</strong></div></section></main>;

  return <main className="site-shell"><section className="invoice-page">
    <div className="invoice-heading"><div><span className="panel-kicker">PMA LEGAL OPS / UTILITY</span><h1>Generator Invoice</h1><p>Perhitungan biaya AJB, distribusi beban, dan pajak dalam workspace tenant kantor.</p></div><div className="invoice-heading-actions"><button className="invoice-btn ghost" onClick={() => setForm(blankForm())}>＋ Baru</button><button className="invoice-btn" onClick={() => setView(view === "history" ? "editor" : "history")}>{view === "history" ? "Kembali ke Editor" : "Riwayat Invoice"}</button></div></div>
    {message && <div className="invoice-message">{message}</div>}
    {view === "history" ? <section className="invoice-panel"><div className="invoice-section-head"><div><span className="panel-kicker">REGISTER</span><h2>Riwayat Invoice</h2></div><span>{history.length} transaksi</span></div>{history.length === 0 ? <p className="invoice-empty">Belum ada invoice.</p> : <div className="invoice-history">{history.map((item) => <article key={item.id} className="invoice-history-row"><div><strong>{item.invoice_number}</strong><span>{item.seller_name || "Tanpa pihak"}{item.buyer_name ? ` × ${item.buyer_name}` : ""}</span>{(item.client_name || item.matter_code || item.matter_title) && <small>{item.client_name || "Klien"}{item.matter_code ? ` · ${item.matter_code}` : item.matter_title ? ` · ${item.matter_title}` : ""}</small>}</div><div><span>{item.service_mode}</span><span>{item.invoice_date || "-"}</span></div><div><button className="invoice-btn small" onClick={() => openInvoice(item.id)}>Buka</button><button className="invoice-btn danger small" onClick={() => removeInvoice(item.id)}>Hapus</button></div></article>)}</div>}</section> : <div className="invoice-workspace">
      <section className="invoice-panel invoice-form">
        <div className="invoice-section-head"><div><span className="panel-kicker">EDITOR / INPUT</span><h2>Data Invoice</h2></div>{form.id && <span className="saved-pill">ID {form.id}</span>}</div>
        <label>Mode layanan<select value={form.service_mode} onChange={(e) => changeMode(e.target.value)}><option value="AJB">A. Jual Beli / Hibah · Pajak</option><option value="UMUM">B. Layanan Umum · Tanpa Pajak</option></select></label>
        <div className="invoice-grid"><label>Klien<select value={form.client_id} onChange={(e) => changeClient(e.target.value)}><option value="">Pilih klien...</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.name || client.client_name || `Klien #${client.id}`}</option>)}</select></label><label>Perkara / Berkas<select value={form.matter_id} onChange={(e) => setField("matter_id", e.target.value)} disabled={clientMatters.length === 0}><option value="">{form.client_id ? "Pilih perkara..." : "Pilih klien dulu..."}</option>{clientMatters.map((matter) => <option key={matter.id} value={matter.id}>{matter.matter_code || matter.matter_number || matter.code || `#${matter.id}`} · {matter.title || matter.service_type || "Perkara"}</option>)}</select></label></div>
        {selectedClient && <div className="invoice-message">Klien terhubung: <strong>{selectedClient.name || selectedClient.client_name}</strong>{selectedMatter ? ` · Perkara ${selectedMatter.matter_code || selectedMatter.matter_number || selectedMatter.code || selectedMatter.id}` : ""}</div>}
        <div className="invoice-grid"><label>No. Invoice<input value={form.invoice_number} onChange={(e) => setField("invoice_number", e.target.value)} maxLength={100} /></label><label>Tanggal<input type="date" value={form.invoice_date || ""} onChange={(e) => setField("invoice_date", e.target.value)} /></label></div>
        <div className="invoice-grid"><label>{isAjb ? "Nomor / Keterangan SHM" : "Keterangan Objek / Layanan"}<input value={form.property_reference} onChange={(e) => setField("property_reference", e.target.value)} maxLength={255} /></label><label>Luas (M²)<input inputMode="decimal" value={form.area_m2} onChange={(e) => setField("area_m2", e.target.value.replace(/[^0-9.]/g, ""))} /></label></div>
        <div className="invoice-grid"><label>{isAjb ? "Nama Penjual / Pemberi" : "Klien Utama / Instansi"}<input value={form.seller_name} onChange={(e) => setField("seller_name", e.target.value)} maxLength={255} /></label><label>{isAjb ? "Nama Pembeli / Penerima" : "Klien Tambahan"}<input value={form.buyer_name} onChange={(e) => setField("buyer_name", e.target.value)} maxLength={255} /></label></div>
        {isAjb && <><div className="invoice-section-title">Nilai Transaksi & Dasar Pajak</div><div className="invoice-grid"><label>Transaksi Riil (Rp)<input inputMode="numeric" value={formatMoney(money(form.real_transaction_amount))} onChange={(e) => setMoneyField("real_transaction_amount", e.target.value)} /></label><label>Dasar Pajak / Estimasi (Rp)<input inputMode="numeric" value={formatMoney(money(form.tax_base_amount))} onChange={(e) => setMoneyField("tax_base_amount", e.target.value)} /></label></div><label>NPOPTKP Pembeli (Rp)<input inputMode="numeric" value={formatMoney(money(form.npoptkp_amount))} onChange={(e) => setMoneyField("npoptkp_amount", e.target.value)} /></label><label className="burden-toggle"><input type="checkbox" checked={form.burden_mode} onChange={(e) => setField("burden_mode", e.target.checked)} /> Tampilkan distribusi beban penjual / pembeli</label></>}
        <div className="invoice-section-title"><span>Rincian Biaya</span><button className="invoice-btn small" type="button" onClick={addItem}>＋ Tambah Biaya</button></div>
        <div className="cost-editor">{form.items.map((item, index) => <div className="cost-editor-row" key={`${index}-${item.description}`}><input placeholder="Rincian biaya..." value={item.description} onChange={(e) => setItem(index, "description", e.target.value)} maxLength={500} /><input inputMode="numeric" placeholder="0" value={formatMoney(money(item.amount))} onChange={(e) => setItem(index, "amount", e.target.value.replace(/[^0-9]/g, ""))} />{isAjb && <select value={item.distribution} onChange={(e) => setItem(index, "distribution", e.target.value)}><option value="kosong">Polosan</option><option value="bagi2">Dibagi 2</option><option value="pembeli">Pembeli</option><option value="penjual">Penjual</option></select>}<button className="icon-danger" type="button" onClick={() => removeItem(index)}>×</button></div>)}</div>
        <button className="invoice-btn primary save-invoice" onClick={save} disabled={saving}>{saving ? "Menyimpan..." : "Simpan Invoice"}</button>
      </section>
      <section className="invoice-preview-wrap"><div className="preview-actions"><span>PREVIEW A4</span><button className="invoice-btn" onClick={() => window.print()}>Cetak / Save PDF</button></div><article className="invoice-paper" id="invoice-paper"><header className="paper-letterhead"><strong>NOTARIS - PEJABAT PEMBUAT AKTA TANAH</strong><b>NOTARY &amp; PPAT OFFICE</b><span>Dokumen Invoice · PMA Legal Ops</span></header><div className="paper-title">INVOICE</div><div className="paper-number">NO. {form.invoice_number || "........................"}</div><div className="paper-highlight">Tanggal: {formatDate(form.invoice_date)}</div><p className="paper-line"><b>{isAjb ? "PROSES PERALIHAN HAK" : "RINCIAN BIAYA PROSES"}</b></p>{selectedClient && <p className="paper-line">Klien: {String(selectedClient.name || selectedClient.client_name || "").toUpperCase()}</p>}{selectedMatter && <p className="paper-line">Perkara: {(selectedMatter.matter_code || selectedMatter.matter_number || selectedMatter.code || selectedMatter.id)}{selectedMatter.title ? ` · ${selectedMatter.title}` : selectedMatter.service_type ? ` · ${selectedMatter.service_type}` : ""}</p>}<p className="paper-line">Objek: {form.property_reference || "................................................"}{form.area_m2 ? ` · LUAS ${form.area_m2} M²` : ""}</p><p className="paper-line">Pihak: {(form.seller_name || "........................").toUpperCase()}{form.buyer_name ? ` × ${form.buyer_name.toUpperCase()}` : ""}</p>{isAjb && <div className="paper-tax"><div><span>Transaksi Riil</span><b>Rp {formatMoney(money(form.real_transaction_amount)) || "0"}</b></div><div><span>Dasar Pajak</span><b>Rp {formatMoney(money(form.tax_base_amount)) || "0"}</b></div><div><span>PPh 2,5%</span><b>Rp {formatMoney(pph) || "0"}</b></div><div><span>BPHTB 5%</span><b>Rp {formatMoney(bphtb) || "0"}</b></div></div>}<table className="paper-table"><thead><tr><th>Rincian</th><th>Jumlah</th>{isAjb && <th>Beban</th>}</tr></thead><tbody>{parsedItems.map((item, index) => <tr key={index}><td>{item.description || "—"}</td><td>Rp {formatMoney(item.numericAmount) || "0"}</td>{isAjb && <td>{item.distribution === "bagi2" ? "½ + ½" : item.distribution === "pembeli" ? "Pembeli" : item.distribution === "penjual" ? "Penjual" : "—"}</td>}</tr>)}</tbody><tfoot><tr><td>Total Biaya</td><td>Rp {formatMoney(totalCosts) || "0"}</td>{isAjb && <td> </td>}</tr></tfoot></table>{form.burden_mode && isAjb && <div className="paper-summary"><div><b>BEBAN PENJUAL</b><span>Rp {formatMoney(sellerCosts) || "0"}</span><small>PPh + biaya yang dialokasikan penjual</small></div><div><b>BEBAN PEMBELI</b><span>Rp {formatMoney(buyerCosts) || "0"}</span><small>BPHTB + biaya yang dialokasikan pembeli</small></div></div>}<footer className="paper-footer"><p>Invoice ini merupakan rincian biaya layanan dan bukan bukti pembayaran pajak negara.</p><div className="paper-sign">PMA LEGAL OPS<br /><br /><strong>________________________</strong></div></footer></article></section>
    </div>}
  </section></main>;
}
