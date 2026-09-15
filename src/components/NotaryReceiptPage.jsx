import { useEffect, useState } from "react";
import DocumentReceipt from "./DocumentReceipt";
import { getAuth, getDocumentReceipt, listDocumentReceipts, listMatters } from "../lib/notaryApi";

export default function NotaryReceiptPage() {
  const [matters, setMatters] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [state, setState] = useState("loading");
  const [message, setMessage] = useState("");

  const load = async () => {
    const [matterResult, receiptResult] = await Promise.all([listMatters(), listDocumentReceipts()]);
    setMatters(matterResult.data || []);
    setReceipts(receiptResult.data || []);
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const auth = await getAuth();
        if (!auth.authenticated) {
          if (alive) { setState("login"); setMessage("Silakan login ke server SaaS terlebih dahulu."); }
          return;
        }
        await load();
        if (alive) setState("ready");
      } catch (error) {
        if (alive) { setState("error"); setMessage(error.message || "Data tanda terima gagal dimuat."); }
      }
    })();
    return () => { alive = false; };
  }, []);

  const handleSaved = async () => {
    try { await load(); setMessage("Tanda terima berhasil disimpan dan masuk ke riwayat."); }
    catch (error) { setMessage(error.message || "Riwayat gagal diperbarui."); }
  };

  const openHistoryPreview = async (id) => {
    setMessage("Memuat tanda terima...");
    try { const data = await getDocumentReceipt(id); setSelectedReceipt(data.data || data); setMessage(""); }
    catch (error) { setMessage(error.message || "Tanda terima gagal dimuat."); }
  };

  if (state === "loading") return <main className="site-shell"><section className="notary-receipt"><div className="notary-panel"><strong>Memuat perkara dan riwayat...</strong></div></section></main>;
  if (state !== "ready") return <main className="site-shell"><section className="notary-receipt"><div className="notary-panel"><span className="panel-kicker">PMA LEGAL OPS / TANDA TERIMA</span><h2>Tanda Terima Berkas</h2><p>{message}</p><a className="btn primary" href="/notary/">Kembali ke Notary Demo</a></div></section></main>;

  return <main className="site-shell"><section className="notary-receipt"><div className="receipt-intro"><span className="panel-kicker">PMA LEGAL OPS / UTILITY</span><h2>Tanda Terima Berkas</h2><p>Dokumen masuk dan keluar dicatat terhadap perkara tenant yang sedang aktif.</p></div><DocumentReceipt matters={matters} onSaved={handleSaved} /><section className="notary-panel receipt-history"><div className="panel-head"><div><span className="panel-kicker">REGISTER / HISTORY</span><h2>Riwayat Tanda Terima</h2></div><span>{receipts.length} transaksi</span></div>{message && <p className="receipt-message">{message}</p>}{receipts.length === 0 ? <p className="empty-state">Belum ada tanda terima tersimpan.</p> : <div className="receipt-history-list">{receipts.map(receipt => <button className="receipt-history-row receipt-history-button" type="button" key={receipt.id} onClick={() => openHistoryPreview(receipt.id)}><strong>TR-{String(receipt.id).padStart(5, "0")}</strong><span>{receipt.matter_code || `Perkara #${receipt.matter_id}`} · {receipt.title}</span><span>{receipt.direction === "incoming" ? "Masuk" : "Keluar"}</span><time>{receipt.receipt_date}</time><span>{receipt.counterparty_name}</span><b>Preview ↗</b></button>)}</div>}</section>{selectedReceipt && <div className="receipt-preview-backdrop" role="dialog" aria-modal="true"><div className="receipt-preview-actions"><button className="btn ghost" onClick={() => setSelectedReceipt(null)}>Tutup</button><button className="btn primary" onClick={() => window.print()}>Cetak / Simpan PDF</button></div><article className="receipt-paper"><header><span>PMA LEGAL OPS</span><strong>TANDA TERIMA BERKAS</strong><small>TR-{String(selectedReceipt.id).padStart(5, "0")}</small></header><div className="receipt-paper-meta"><div><b>Perkara</b><span>{selectedReceipt.matter_code || `#${selectedReceipt.matter_id}`} · {selectedReceipt.title}</span></div><div><b>Tanggal</b><span>{selectedReceipt.receipt_date}</span></div><div><b>Arah</b><span>{selectedReceipt.direction === "incoming" ? "Terima Masuk" : "Serah Keluar"}</span></div><div><b>Pihak</b><span>{selectedReceipt.counterparty_name}</span></div></div><h3>Daftar Dokumen</h3><ol>{(selectedReceipt.items || []).map(item => <li key={item.id}>{item.description}{Number(item.quantity) > 1 ? ` × ${item.quantity}` : ""}</li>)}</ol><div className="receipt-signatures"><div><span>Pihak yang menyerahkan</span><div></div><b>{selectedReceipt.counterparty_name}</b></div><div><span>Staff / Notaris penerima</span><div></div><b>{selectedReceipt.staff_name || "________________________"}</b></div></div><footer>Dokumen ini dibuat dari PMA Legal Ops dan tercatat pada register tenant.</footer></article></div>}</section></main>;
}
