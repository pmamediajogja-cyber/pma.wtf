import { useEffect } from "react";
import journalMedia from "../data/journalMedia";
import journalTags from "../data/journalTags";

const englishLegacyIds = new Set(["010", "011", "012", "013", "014", "015", "016", "017", "018"]);
const SITE_URL = "https://pma.wtf";

function buildIndonesianReview(article) {
  if (englishLegacyIds.has(article.id)) {
    const isCyber = article.category === "CYBERSECURITY";
    const isAi = article.category === "AI & TECHNOLOGY";

    return [
      `Artikel "${article.title}" dari ${article.source} menarik karena memperlihatkan bagaimana sebuah perkembangan teknologi atau budaya dapat mempunyai dampak yang lebih besar ketika masuk ke penggunaan sehari-hari. Sumber tersebut menjadi titik awal untuk melihat persoalan ini bukan hanya sebagai berita, tetapi sebagai perubahan yang perlu dipahami dari sisi praktik.`,
      isCyber
        ? "Dari sudut pandang keamanan, hal terpenting adalah memahami bahwa risiko jarang berdiri sendiri. Satu celah, konfigurasi yang keliru, atau kebiasaan pengguna dapat menjadi bagian dari rangkaian kejadian yang lebih panjang. Karena itu, pertahanan yang baik perlu melihat konteks, memantau perubahan, dan menyiapkan respons sebelum masalah berkembang menjadi insiden besar."
        : isAi
          ? "Dari sudut pandang teknologi, perkembangan seperti ini menunjukkan bahwa kemampuan sistem bukan satu-satunya ukuran keberhasilan. Akses, batasan, data, lingkungan eksekusi, dan cara manusia mengawasi sistem sama pentingnya. Teknologi yang semakin kuat membutuhkan desain yang semakin jelas mengenai apa yang boleh dan tidak boleh dilakukan."
          : "Dari sudut pandang streetwear, perkembangan seperti ini menunjukkan bahwa tren yang kuat biasanya tidak muncul hanya dari satu logo atau satu bentuk visual. Ada hubungan antara siluet, material, referensi budaya, fungsi, dan cara sebuah produk dibawa ke komunitas. Ketika elemen-elemen tersebut saling mendukung, identitas produk terasa lebih kuat.",
      isCyber
        ? "Pelajaran praktisnya adalah jangan menunggu sebuah ancaman terlihat sempurna sebelum bertindak. Inventaris aset, pembaruan perangkat lunak, pengaturan hak akses, pencatatan aktivitas, segmentasi jaringan, dan edukasi pengguna memang terlihat sederhana, tetapi kombinasi kontrol tersebut dapat memperkecil ruang gerak masalah. Keamanan yang matang justru sering dibangun dari kebiasaan yang konsisten."
        : isAi
          ? "Pelajaran praktisnya adalah memperlakukan kemampuan baru sebagai sesuatu yang perlu diuji secara bertahap. Sebelum sebuah sistem diberi akses lebih luas, perlu ada pengujian skenario gagal, batas hak akses, pencatatan aktivitas, dan mekanisme penghentian. Dengan begitu, peningkatan kemampuan tidak otomatis berarti peningkatan risiko tanpa kendali."
          : "Pelajaran praktisnya adalah melihat desain sebagai satu sistem, bukan kumpulan elemen yang berdiri sendiri. Grafik, ukuran, posisi, bahan, warna, siluet, dan konteks pemakaian harus saling menguatkan. Pendekatan ini membuat sebuah produk terasa lebih disengaja dan tidak sekadar mengikuti tren yang sedang ramai.",
      `Dalam konteks PMA, hal yang paling menarik dari "${article.title}" adalah ruang untuk menerjemahkan informasi menjadi keputusan desain atau teknologi yang lebih konkret. Berita memberi kita konteks, tetapi nilai tambah muncul ketika kita bertanya: apa yang berubah, siapa yang terdampak, dan apa yang sebaiknya dilakukan setelah mengetahui perubahan tersebut.`,
      isCyber
        ? "Kesimpulan PMA: keamanan bukan satu fitur yang dipasang lalu selesai. Ia adalah proses berulang yang membutuhkan pemantauan, pembaruan, pengujian, dan disiplin operasional. Semakin penting sebuah sistem bagi bisnis, semakin kecil ruang yang boleh diberikan kepada asumsi bahwa semuanya akan selalu berjalan normal."
        : isAi
          ? "Kesimpulan PMA: semakin kuat sebuah sistem AI, semakin penting pula lingkungan pengaman di sekelilingnya. Kemampuan yang tinggi perlu diimbangi batas akses, pengawasan, pengujian, dan tanggung jawab yang jelas. Bukan hanya modelnya yang harus pintar, tetapi sistem di sekelilingnya juga harus dirancang dengan matang."
          : "Kesimpulan PMA: streetwear yang kuat tidak selalu membutuhkan desain yang paling ramai. Yang lebih penting adalah memiliki alasan yang jelas di balik setiap keputusan visual. Ketika cerita, garment, grafik, dan budaya bertemu dengan proporsi yang tepat, produk dapat terasa relevan tanpa kehilangan identitasnya."
    ];
  }

  const base = Array.isArray(article.review) ? [...article.review] : [];
  const isStreetwear = article.category === "STREETWEAR & CULTURE";
  const isAi = article.category === "AI & TECHNOLOGY";

  while (base.length < 5) {
    const index = base.length;
    if (index === 3) {
      base.push(
        isStreetwear
          ? `Kalau dibawa ke konteks desain, "${article.title}" mengingatkan bahwa sebuah produk tidak cukup hanya terlihat menarik di layar. Siluet, material, ukuran grafik, penempatan artwork, dan cara produk dipakai harus dibaca sebagai satu kesatuan. Keputusan kecil pada garment dapat mengubah seluruh karakter visual ketika produk benar-benar dikenakan.`
          : isAi
            ? `Kalau dibawa ke konteks teknologi, "${article.title}" memperlihatkan pentingnya membangun batas yang jelas antara kemampuan sistem dan tindakan yang boleh dilakukan. Semakin besar akses sebuah teknologi, semakin penting pula pencatatan aktivitas, pengujian skenario gagal, pembatasan hak akses, dan mekanisme penghentian ketika perilaku sistem mulai keluar dari tujuan awal.`
            : `Kalau dibawa ke konteks operasional, "${article.title}" menunjukkan bahwa masalah teknologi perlu diterjemahkan menjadi tindakan yang bisa dilakukan. Inventaris aset, pengaturan akses, pemantauan, pembaruan, dan prosedur respons sering kali lebih menentukan daripada sekadar mengetahui bahwa sebuah risiko memang ada.`
      );
    } else {
      base.push(
        `Pandangan tambahan PMA terhadap "${article.title}": informasi seperti ini akan lebih berguna ketika tidak berhenti sebagai konsumsi berita. Kita perlu melihat dampaknya terhadap cara bekerja, cara merancang produk, cara mengelola risiko, dan cara mengambil keputusan. Dari sana, sebuah berita dapat berubah menjadi bahan evaluasi yang benar-benar bisa dipakai.`
      );
    }
  }

  return base;
}

function parseArticleDate(date) {
  const months = { JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06", JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12" };
  const match = String(date || "").match(/^(\d{2})\s+([A-Z]{3})\s+(\d{4})$/);
  if (!match || !months[match[2]]) return undefined;
  return `${match[3]}-${months[match[2]]}-${match[1]}`;
}

function upsertMeta(attribute, key, content) {
  let node = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attribute, key);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

export default function JournalArticle({ article, onBack }) {
  const media = article ? journalMedia[article.id] : null;
  const seo = article ? (journalTags[article.id] || { tags: [], hashtags: [] }) : { tags: [], hashtags: [] };
  const fallback = "/journal/001.svg";
  const image = media?.image || fallback;
  const canonicalUrl = article ? `${SITE_URL}/journal/${article.id}` : SITE_URL;
  const publishedDate = article ? parseArticleDate(article.date) : undefined;
  const review = article ? buildIndonesianReview(article) : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!article) return undefined;

    const description = article.excerpt || `PMA Journal review: ${article.title}`;
    document.title = `${article.title} — PMA Journal`;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", "index,follow,max-image-preview:large");
    upsertMeta("property", "og:title", `${article.title} — PMA Journal`);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "article");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:site_name", "PMA.WTF");
    upsertMeta("property", "og:image", media?.image || `${SITE_URL}${fallback}`);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", `${article.title} — PMA Journal`);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", media?.image || `${SITE_URL}${fallback}`);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let structuredData = document.head.querySelector("#pma-journal-jsonld");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "pma-journal-jsonld";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }

    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description,
      image: [media?.image || `${SITE_URL}${fallback}`],
      ...(publishedDate ? { datePublished: publishedDate, dateModified: publishedDate } : {}),
      author: { "@type": "Organization", name: "PMA Media Yogyakarta", url: `${SITE_URL}/profile` },
      publisher: { "@type": "Organization", name: "PMA Media Yogyakarta", url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
      articleSection: article.category,
      keywords: seo.tags.join(", ")
    });

    return () => {
      const node = document.head.querySelector("#pma-journal-jsonld");
      if (node) node.remove();
    };
  }, [article?.id, article?.title, article?.excerpt, article?.category, article?.date, canonicalUrl, media?.image, publishedDate, seo.tags]);

  if (!article) return null;

  return (
    <main className="journal-article-page">
      <button className="journal-back" onClick={onBack}>← BACK TO JOURNAL</button>

      <div className="journal-article-shell">
        <div className="journal-article-meta">
          <span>{article.id} / {article.tag}</span>
          <span>{article.date}</span>
        </div>

        <div className="journal-article-hero">
          <img
            src={image}
            alt={`${article.title} — ${media?.credit || "PMA editorial image"}`}
            onError={(event) => {
              if (event.currentTarget.src.endsWith(fallback)) return;
              event.currentTarget.src = fallback;
            }}
          />
          <span className="journal-article-hero-label">REAL SOURCE IMAGE / {media?.credit || "PMA EDITORIAL"}</span>
        </div>

        <h1>{article.title}</h1>
        <p className="journal-article-excerpt">{article.excerpt}</p>

        <div className="journal-article-tags" aria-label="Topik dan hashtag artikel">
          <div className="journal-tags-label">TOPICS / SEO TAGS</div>
          <div className="journal-tags-list">
            {seo.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="journal-hashtags-label">HASHTAGS</div>
          <div className="journal-hashtags-list">
            {seo.hashtags.map((hashtag) => <span key={hashtag}>{hashtag}</span>)}
          </div>
        </div>

        <div className="journal-article-grid">
          <article>
            <div className="journal-review-label">PMA REVIEW / OUR TAKE</div>
            {review.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </article>

          <aside className="journal-source-card">
            <div className="source-label">ORIGINAL SOURCE</div>
            <strong>{article.source}</strong>
            <a href={article.url} target="_blank" rel="noreferrer">READ SOURCE ↗</a>
            <div className="source-note">PMA editorial content is an independent review and interpretation of the linked source.</div>
          </aside>
        </div>
      </div>
    </main>
  );
}
