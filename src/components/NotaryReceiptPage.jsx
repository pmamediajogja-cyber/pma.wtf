import { useEffect, useState } from "react";
import DocumentReceipt from "./DocumentReceipt";
import { getAuth, listMatters } from "../lib/notaryApi";

export default function NotaryReceiptPage() {
  const [matters, setMatters] = useState([]);
  const [state, setState] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const auth = await getAuth();
        if (!auth.authenticated) {
          if (alive) { setState("login"); setMessage("Silakan login ke server SaaS terlebih dahulu."); }
          return;
        }
        const result = await listMatters();
        if (alive) { setMatters(result.data || []); setState("ready"); }
      } catch (error) {
        if (alive) { setState("error"); setMessage(error.message || "Data perkara gagal dimuat."); }
      }
    })();
    return () => { alive = false; };
  }, []);

  if (state === "loading") return <main className="site-shell"><section className="notary-receipt"><div className="notary-panel"><strong>Memuat perkara...</strong></div></section></main>;
  if (state !== "ready") return <main className="site-shell"><section className="notary-receipt"><div className="notary-panel"><span className="panel-kicker">PMA LEGAL OPS / TANDA TERIMA</span><h2>Tanda Terima Berkas</h2><p>{message}</p><a className="btn primary" href="/notary/">Kembali ke Notary Demo</a></div></section></main>;

  return <main className="site-shell"><section className="notary-receipt"><div className="receipt-intro"><span className="panel-kicker">PMA LEGAL OPS / UTILITY</span><h2>Tanda Terima Berkas</h2><p>Dokumen masuk dan keluar dicatat terhadap perkara tenant yang sedang aktif.</p></div><DocumentReceipt matters={matters} /></section></main>;
}
