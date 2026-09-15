import { useEffect, useState } from "react";
import DocumentReceipt from "./DocumentReceipt";
import { getAuth, listDocumentReceipts, listMatters } from "../lib/notaryApi";

export default function NotaryReceiptPage() {
  const [matters, setMatters] = useState([]);
  const [receipts, setReceipts] = useState([]);
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
    try {
      await load();
      setMessage("Tanda terima berhasil disimpan dan masuk ke riwayat.");
    } catch (error) {
      setMessage(error.message || "Riwayat gagal diperbarui.");
    }
  };

  if (state === "loading") return <main className="site-shell"><section className="notary-receipt"><div className="notary-panel"><strong>Memuat perkara dan riwayat...</strong></div></section></main>;
  if (state !== "ready") return <main className="site-shell"><section className="notary-receipt"><div className="notary-panel"><span className="panel-kicker">PMA LEGAL OPS / TANDA TERIMA</span><h2>Tanda Terima Berkas</h2><p>{message}</p><a className="btn primary" href="/notary/">Kembali ke Notary Demo</a></div></section></main>;

  return <main className="site-shell"><section className="notary-receipt"><div className="receipt-intro"><span className="panel-kicker">PMA LEGAL OPS / UTILITY</span><h2>Tanda Terima Berkas</h2><p>Dokumen masuk dan keluar dicatat terhadap perkara tenant yang sedang aktif.</p></div><DocumentReceipt matters={matters} onSaved={handleSaved} /><section className="notary-panel receipt-history"><div className="panel-head"><div><span className="panel-kicker">REGISTER / HISTORY</span><h2>Riwayat Tanda Terima</h2></div><span>{receipts.length} transaksi</span></div>{message && <p className="receipt-message">{message}</p>}{receipts.length === 0 ? <p className="empty-state">Belum ada tanda terima tersimpan.</p> : <div className="receipt-history-list">{receipts.map(receipt => <article className="receipt-history-row" key={receipt.id}><strong>TR-{String(receipt.id).padStart(5, "0")}</strong><span>{receipt.matter_code || `Perkara #${receipt.matter_id}`} · {receipt.title}</span><span>{receipt.direction === "incoming" ? "Masuk" : "Keluar"}</span><time>{receipt.receipt_date}</time><span>{receipt.counterparty_name}</span></article>)}</div>}</section></section></main>;
}
