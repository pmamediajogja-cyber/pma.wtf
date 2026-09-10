import { useEffect } from "react";
import journalMedia from "../data/journalMedia";
import journalTags from "../data/journalTags";

const englishLegacyIds = new Set(["010", "011", "012", "013", "014", "015", "016", "017", "018"]);
const SITE_URL = "https://pma.wtf";

function humanizeParagraph(text) {
  return String(text || "")
    .replace(/^Pandangan PMA:\s*/i, "Kalau ditarik ke sudut pandang PMA, ")
    .replace(/^Kesimpulan PMA:\s*/i, "Kalau harus diringkas, ")
    .replace(/^Menurut kami,\s*/i, "Yang menurut kami menarik, ")
    .replace(/^Pelajaran praktisnya adalah\s*/i, "Kalau dibawa ke praktik, ")
    .replace(/^Hal terpenting adalah\s*/i, "Bagian yang paling penting justru ")
    .replace(/^Dengan demikian,\s*/i, "Jadi, ")
    .replace(/^Oleh karena itu,\s*/i, "Karena itu, ")
    .replace(/menunjukkan bahwa/g, "memperlihatkan bahwa")
    .replace(/dapat menjadi/g, "bisa menjadi")
    .replace(/dapat dilakukan/g, "bisa dilakukan")
    .replace(/perlu dilakukan/g, "sebaiknya dilakukan")
    .replace(/tidak hanya/g, "bukan cuma")
    .replace(/semakin penting/g, "makin penting");
}

function buildIndonesianReview(article) {
  const isCyber = article.category === "CYBERSECURITY";
  const isAi = article.category === "AI & TECHNOLOGY";
  const isStreetwear = article.category === "STREETWEAR & CULTURE";

  // Legacy English articles get a fresh PMA-style editorial instead of a stiff translation.
  if (englishLegacyIds.has(article.id)) {
    const opening = isCyber
      ? `Ada alasan kenapa "${article.title}" layak diperhatikan. Berita seperti ini memang gampang lewat di timeline, apalagi ketika setiap minggu ada saja update soal celah, malware, atau serangan baru. Tapi kalau diperhatikan sedikit lebih dekat, ada pola yang cukup jelas: cara kita bekerja dengan teknologi ikut mengubah cara risiko muncul.`
      : isAi
        ? `Yang bikin "${article.title}" menarik bukan sekadar teknologinya yang baru. Yang lebih menarik adalah apa yang terjadi ketika kemampuan tersebut mulai bertemu dengan data, akses, dan keputusan manusia. Di titik itu, AI berhenti menjadi sekadar fitur dan mulai menjadi bagian dari cara sebuah sistem bekerja.`
        : `Kalau melihat "${article.title}" sekilas, mungkin kesannya cuma soal tren fashion yang sedang bergerak. Padahal ada cerita yang lebih menarik di belakangnya: bagaimana siluet, material, referensi budaya, dan cara sebuah brand berbicara kepada komunitas ikut menentukan apakah sebuah produk terasa relevan atau cuma ikut ramai.`;

    const middleOne = isCyber
      ? "Masalahnya, serangan modern jarang datang dengan tulisan besar bertuliskan 'ini serangan'. Banyak yang terlihat seperti aktivitas biasa sampai kita melihat konteksnya. Karena itu, keamanan tidak cukup mengandalkan satu alarm atau satu software. Yang dibutuhkan adalah beberapa lapisan yang saling melengkapi dan orang yang benar-benar memperhatikan ketika ada sesuatu yang terasa tidak normal."
      : isAi
        ? "Di sinilah pembahasannya mulai menarik. Model yang hebat belum tentu menjadi produk yang aman. Akses jaringan, credential, filesystem, API, permission, dan cara manusia mengawasi sistem ikut menentukan seberapa jauh sebuah AI bisa bertindak. Kemampuan dan batasan harus dirancang sebagai satu paket."
        : "Buat desainer, bagian ini justru lebih menarik daripada sekadar menyebut tren. Sebuah garment punya bahasa sendiri. Fit, bahan, graphic placement, warna, dan detail kecil bisa membuat desain yang sama terasa sangat berbeda ketika benar-benar dipakai. Tren yang bagus biasanya memberi ruang untuk interpretasi, bukan memaksa semua orang meniru satu formula.";

    const middleTwo = isCyber
      ? "Kalau dibawa ke praktik, banyak langkahnya sebenarnya tidak spektakuler: update sistem, cek hak akses, pisahkan jaringan penting, pantau aktivitas admin, simpan log, dan siapkan respons kalau sesuatu benar-benar terjadi. Kedengarannya biasa. Justru karena biasa, bagian ini sering dilewatkan. Padahal pertahanan yang konsisten biasanya jauh lebih berguna daripada satu solusi ajaib."
      : isAi
        ? "Kalau teknologi seperti ini mau dipakai lebih luas, pendekatannya sebaiknya bertahap. Beri akses seperlunya, uji skenario yang salah, catat tindakan agent atau sistem, dan pastikan ada cara untuk menghentikannya. Kita tidak perlu membuat AI tidak berguna. Kita hanya perlu memastikan satu kesalahan tidak berubah menjadi masalah yang jauh lebih besar."
        : "Kalau diterapkan ke brand kecil, pelajarannya cukup jelas: jangan mengejar tren mentah-mentah. Ambil idenya, lalu terjemahkan dengan bahasa sendiri. Bisa lewat siluet, material, ilustrasi, typography, humor, atau referensi budaya yang memang dekat dengan identitas brand. Di situlah sebuah produk mulai terasa punya karakter.";

    const pmA = isCyber
      ? `Dari sisi PMA, "${article.title}" mengingatkan pada satu hal sederhana: security itu bukan pekerjaan sekali jadi. Sistem berubah, orang berubah, software berubah, dan cara attacker bekerja juga ikut berubah. Jadi yang perlu dibangun bukan rasa aman palsu, melainkan kebiasaan untuk terus mengecek apakah pertahanan kita masih masuk akal.`
      : isAi
        ? `Dari sisi PMA, bagian paling menarik dari "${article.title}" justru ada pada pertanyaan yang muncul setelah teknologinya bekerja. Siapa yang mengawasi? Apa yang boleh dilakukan? Apa yang terjadi kalau sistem salah? Pertanyaan seperti ini mungkin kurang seksi dibanding demo fitur baru, tetapi justru di sinilah kualitas sebuah produk sering ditentukan.`
        : `Dari sisi PMA, "${article.title}" menunjukkan bahwa identitas tidak harus dibangun dengan suara paling keras. Brand yang kuat biasanya tahu apa yang ingin diceritakan, siapa yang ingin diajak bicara, dan elemen mana yang cukup ditampilkan tanpa berlebihan. Detail kecil sering kali lebih tahan lama daripada sekadar mengejar hype.`;

    const closing = isCyber
      ? "Pada akhirnya, ancaman baru tidak selalu membutuhkan pertahanan yang benar-benar baru. Kadang yang dibutuhkan adalah disiplin untuk menjalankan hal-hal dasar dengan lebih serius. Teknologi boleh makin rumit, tetapi prinsipnya tetap sama: tahu apa yang kita punya, tahu siapa yang bisa mengaksesnya, dan tahu apa yang harus dilakukan ketika sesuatu mulai keluar jalur."
      : isAi
        ? "Jadi, semakin pintar teknologinya, semakin penting juga lingkungan di sekelilingnya. AI yang bagus memang menarik, tetapi AI yang bisa digunakan dengan aman jauh lebih berguna. Kemampuan boleh terus naik; batas, pengawasan, dan tanggung jawab juga harus ikut naik."
        : "Jadi, streetwear yang menarik bukan selalu yang paling ramai. Yang lebih penting adalah rasa bahwa setiap keputusan memang punya alasan. Ketika garment, graphic, cerita, dan budaya bertemu dengan proporsi yang tepat, produk bisa terlihat santai sekaligus punya pendirian.";

    return [opening, middleOne, middleTwo, pmA, closing];
  }

  const base = Array.isArray(article.review) ? article.review.map(humanizeParagraph) : [];

  // Give every article a more natural editorial opening without changing the source facts.
  if (base.length) {
    const lead = isCyber
      ? "Ada satu bagian dari berita ini yang menurut kami paling layak diperhatikan:"
      : isAi
        ? "Yang bikin topik ini menarik sebenarnya bukan cuma soal AI-nya:"
        : isStreetwear
          ? "Kalau dibaca lebih jauh, yang menarik dari cerita ini bukan cuma soal tren:"
          : "Ada satu hal yang cukup menarik dari cerita ini:";
    base[0] = `${lead} ${base[0].charAt(0).toLowerCase()}${base[0].slice(1)}`;
  }

  while (base.length < 5) {
    const index = base.length;
    if (index === 3) {
      base.push(
        isStreetwear
          ? `Kalau dibawa ke meja desain, "${article.title}" mengingatkan bahwa artwork tidak hidup sendirian. Ukuran print, posisi gambar, warna garment, bahan, dan bentuk tubuh semuanya ikut menentukan hasil akhirnya. Sesuatu yang terlihat biasa di artboard bisa berubah total ketika benar-benar dipakai.`
          : isAi
            ? `Kalau dibawa ke praktik teknologi, "${article.title}" memperlihatkan kenapa kemampuan baru sebaiknya datang bersama batas yang jelas. Akses secukupnya, log yang rapi, pengujian skenario gagal, dan tombol untuk menghentikan sistem terdengar sederhana, tapi justru hal-hal seperti ini yang membuat teknologi lebih siap dipakai di dunia nyata.`
            : `Kalau dibawa ke praktik, "${article.title}" menunjukkan bahwa informasi baru akan jauh lebih berguna ketika diterjemahkan menjadi tindakan. Kita bisa tahu sebuah risiko ada, tetapi pertanyaan berikutnya tetap penting: apa yang harus dicek, siapa yang bertanggung jawab, dan apa yang dilakukan kalau kondisi berubah?`
      );
    } else {
      base.push(
        `Buat PMA, bagian yang menarik dari "${article.title}" justru ada pada pertanyaan setelah beritanya selesai dibaca. Apa yang berubah? Apa dampaknya ke cara kita bekerja atau merancang sesuatu? Dan apakah ada kebiasaan lama yang ternyata sudah waktunya diperbaiki? Di situlah sebuah berita mulai punya nilai praktis.`
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
