const journalTech = [
  {
    id: "037",
    date: "12 SEP 2026",
    tag: "CODING / TYPESCRIPT",
    category: "BUILD / TECH",
    title: "TypeScript 7 Is Changing the Speed of Large JavaScript Projects",
    excerpt: "TypeScript 7 brings a rewritten compiler architecture and much faster type-checking, while modern coding tools increasingly let developers work through agents instead of typing every change by hand.",
    source: "JetBrains",
    url: "https://blog.jetbrains.com/webstorm/2026/07/webstorm-2026-2/",
    review: [
      "Salah satu perubahan yang menarik di dunia web development 2026 adalah semakin seriusnya tooling terhadap masalah yang sudah lama dirasakan developer: project JavaScript dan TypeScript yang semakin besar membutuhkan waktu lebih lama untuk dianalisis. WebStorm 2026.2 sudah membawa dukungan TypeScript 7 dan compiler baru yang ditulis ulang untuk mempercepat type checking pada codebase besar. Menurut JetBrains, dukungan ini dapat digunakan tanpa harus melakukan migrasi penuh terhadap project yang sudah ada.",
      "Bagi developer, perubahan compiler mungkin terdengar jauh dari pekerjaan sehari-hari. Padahal setiap kali editor melakukan autocomplete, menemukan error, memeriksa tipe, atau memahami hubungan antar file, compiler dan language service sedang bekerja di belakang layar. Ketika proses tersebut menjadi lebih cepat, efeknya terasa pada hal kecil yang terjadi ratusan kali selama satu hari coding.",
      "Perubahan ini datang bersamaan dengan pergeseran yang lebih besar: coding tidak lagi hanya tentang menulis baris kode secara manual. IDE modern mulai mempunyai agent, model picker, kemampuan menjalankan tugas multi-langkah, dan workflow yang dapat mengubah beberapa file sekaligus. GitHub sendiri terus mengembangkan coding agent dan fitur agentic di berbagai lingkungan pengembangan. Artinya, kecepatan tooling sekarang bukan hanya tentang seberapa cepat manusia mengetik, tetapi juga seberapa cepat manusia dapat memahami, mengarahkan, memeriksa, dan menerima perubahan dari mesin.",
      "Menurut PMA, ini justru membuat fundamental coding menjadi lebih penting, bukan kurang penting. Ketika AI dapat menghasilkan perubahan dengan cepat, developer harus semakin mampu membaca struktur project, memahami dependency, mengetahui kapan sebuah abstraction masuk akal, dan menemukan bug ketika output agent terlihat benar tetapi ternyata salah. Kecepatan tanpa kemampuan review hanya membuat kesalahan menyebar lebih cepat.",
      "Untuk project seperti PMA.WTF, pelajarannya sederhana: gunakan tooling baru untuk mengurangi pekerjaan mekanis, tetapi tetap pertahankan manusia sebagai pengarah arsitektur. AI agent boleh membantu membuat component, merapikan CSS, atau mencari bug. Namun keputusan tentang routing, struktur konten, SEO, performa, dan pengalaman pengguna tetap harus mempunyai alasan yang jelas.",
      "Takeaway PMA: masa depan coding kemungkinan bukan manusia versus AI. Yang lebih masuk akal adalah manusia yang memahami sistem bekerja bersama tools yang mampu mengerjakan lebih banyak pekerjaan teknis. Semakin cepat mesin menulis kode, semakin penting kemampuan manusia untuk menentukan kode apa yang seharusnya ditulis."
    ]
  }
];

export default journalTech;
