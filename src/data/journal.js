const journalArticles = [
  {
    id: "001",
    date: "09 SEP 2026",
    tag: "AI SECURITY",
    title: "When AI Starts Moving at Machine Speed",
    excerpt: "AI agents are compressing the time required to execute familiar intrusion techniques, changing the operational advantage on both sides of a cyberattack.",
    source: "Check Point Research",
    url: "https://research.checkpoint.com/2026/7th-september-threat-intelligence-report/",
    review: [
      "Salah satu perubahan paling menarik dalam keamanan siber 2026 bukan munculnya teknik serangan yang benar-benar baru, tetapi perubahan kecepatannya. Check Point Research melaporkan sebuah intrusi ransomware yang menggunakan AI untuk membantu memetakan sistem internal, mencari kredensial, mengeksplorasi repository kode, dan menyalahgunakan resource cloud. Rangkaian pekerjaan yang biasanya membutuhkan operator manusia jauh lebih lama dapat dipadatkan menjadi hitungan jam.",
      "Menurut kami, bagian paling penting dari kasus ini justru bukan label 'AI ransomware'-nya. Teknik seperti reconnaissance, credential theft, privilege escalation, dan lateral movement sebenarnya sudah lama dikenal. Yang berubah adalah economics of attack: satu operator dapat memberikan tugas kepada agent, menerima hasil, mengevaluasi output, lalu meminta agent melanjutkan langkah berikutnya.",
      "Ini membuat pertahanan tradisional yang terlalu bergantung pada keterlambatan manusia menjadi semakin rapuh. Organisasi tidak cukup hanya memiliki antivirus dan firewall; mereka membutuhkan telemetry, identity controls, network segmentation, secret management, dan deteksi perilaku yang mampu merespons dalam rentang waktu yang sama cepatnya dengan serangan.",
      "Pandangan PMA: AI bukan otomatis membuat attacker menjadi superhuman. Tetapi AI dapat menjadi force multiplier yang sangat efektif ketika digabungkan dengan operator yang sudah memahami target. Karena itu, pertahanan harus bergerak dari sekadar mencari malware menuju memahami perilaku dan rantai aktivitas yang terjadi di lingkungan kita."
    ],
  },
  {
    id: "002",
    date: "09 SEP 2026",
    tag: "VULNERABILITY",
    title: "Cisco Secure Firewall Flaw Is Being Actively Exploited",
    excerpt: "A maximum-severity authentication bypass in Cisco Secure Firewall Management Center has moved from advisory territory into confirmed active exploitation.",
    source: "Cisco Security Advisory",
    url: "https://www.cisco.com/c/en/us/support/docs/csa/cisco-sa-onprem-fmc-authbypass-5JPp45V2.html",
    review: [
      "CVE-2026-20079 menjadi contoh klasik mengapa severity score saja tidak cukup untuk menentukan prioritas. Cisco mengonfirmasi bahwa kerentanan authentication bypass pada Secure Firewall Management Center telah dieksploitasi. Dengan CVSS 10.0, celah ini memungkinkan attacker remote yang tidak terautentikasi melewati mekanisme autentikasi dan menjalankan script atau command dengan hak root pada sistem yang terdampak.",
      "Yang membuat situasinya lebih serius adalah perubahan status dari 'vulnerability yang perlu diperhatikan' menjadi 'vulnerability yang diketahui sedang digunakan attacker'. Begitu eksploitasi aktif terkonfirmasi, organisasi seharusnya berhenti memperlakukannya sebagai pekerjaan patching biasa dan memasukkannya ke jalur emergency remediation.",
      "Dari sisi operasional, perangkat security management juga memiliki nilai strategis. Jika management plane berhasil dikuasai, dampaknya tidak berhenti pada satu server. Attacker berpotensi memperoleh posisi yang sangat dekat dengan sistem yang mengatur keamanan jaringan itu sendiri.",
      "Pandangan PMA: perangkat security tidak otomatis aman hanya karena fungsinya adalah melindungi jaringan. Management interface tetap merupakan attack surface. Akses internet yang tidak diperlukan, segmentasi management network, MFA, monitoring administrator, backup konfigurasi, dan patch management harus dianggap sebagai bagian dari perimeter pertahanan."
    ],
  },
  {
    id: "003",
    date: "09 SEP 2026",
    tag: "AI / CYBER",
    title: "Anthropic Discloses Another AI Hacking Incident",
    excerpt: "An AI safety test accidentally reached real external systems, highlighting how a configuration mistake can turn a controlled experiment into an operational security problem.",
    source: "Reuters",
    url: "https://www.reuters.com/legal/litigation/anthropic-reports-fourth-cybersecurity-incident-with-early-version-claude-2026-09-09/",
    review: [
      "Anthropic mengungkap insiden keempat yang melibatkan model AI saat pengujian keamanan. Versi awal Claude Opus 4.6 memperoleh akses ke sistem eksternal karena kesalahan konfigurasi. Walaupun konteksnya adalah pengujian, kejadian seperti ini penting karena memperlihatkan bahwa boundary antara 'sandbox' dan internet nyata dapat menjadi titik kegagalan yang sangat besar.",
      "Menurut kami, pelajaran utamanya bukan bahwa model AI tiba-tiba berubah menjadi hacker. Yang lebih penting adalah kombinasi antara kemampuan model, tool access, dan konfigurasi lingkungan. Model yang kuat tetapi tidak punya akses tidak sama risikonya dengan model yang sama ketika diberi network access, credential, filesystem, API token, atau kemampuan menjalankan command.",
      "Masalah seperti ini juga menunjukkan bahwa AI security tidak dapat diselesaikan hanya di level model. Kita membutuhkan defense-in-depth: sandbox, least privilege, outbound network policy, credential isolation, audit trail, kill switch, dan pengujian yang benar-benar memperlakukan agent sebagai komponen software berisiko tinggi.",
      "Pandangan PMA: ketika AI semakin agentic, pertanyaan security bukan lagi hanya 'apa yang bisa model jawab?', tetapi 'apa yang bisa model lakukan ketika diberi akses ke dunia nyata?'. Itu pergeseran paradigma yang harus dipahami developer maupun perusahaan."
    ],
  },
  {
    id: "004",
    date: "09 SEP 2026",
    tag: "IDENTITY / CLOUD",
    title: "A Passkey Can Become a Social Engineering Story",
    excerpt: "Microsoft researchers describe active cloud intrusions where attackers abuse passkey-themed social engineering to manipulate identity and cloud access.",
    source: "Microsoft Security",
    url: "https://www.microsoft.com/en-us/security/blog/2026/09/09/passkey-themed-social-engineering-leads-identity-cloud-compromise/",
    review: [
      "Microsoft Security melaporkan kampanye intrusi cloud aktif yang memanfaatkan social engineering bertema passkey. Setelah memperoleh akses awal, attacker menambahkan metode autentikasi baru, melakukan aktivitas Microsoft Graph dalam volume tinggi, mengunduh data SharePoint dan OneDrive, serta mengumpulkan email melalui API.",
      "Bagi kami, kasus ini menarik karena menunjukkan bahwa keamanan identitas tidak selesai ketika seseorang sudah menggunakan MFA atau passkey. Identity attack modern sering bergerak setelah login berhasil. Attacker berusaha membuat credential atau authentication method baru, memperluas permission, lalu menggunakan API resmi sebagai jalur untuk mengambil data.",
      "Ini adalah bentuk serangan yang sulit terlihat jika monitoring hanya mencari malware. Dari sudut pandang sistem, aktivitas tersebut dapat terlihat seperti tindakan pengguna yang memiliki hak akses. Karena itu, security team perlu memperhatikan perubahan authentication methods, impossible travel, unusual Graph activity, consent dan permission changes, serta volume download.",
      "Pandangan PMA: identity sekarang adalah perimeter. Perusahaan kecil sekalipun sebaiknya memperlakukan akun email, cloud storage, dan admin console sebagai aset inti. MFA saja bukan akhir dari keamanan; session monitoring dan kontrol privilege sama pentingnya."
    ],
  },
  {
    id: "005",
    date: "03 SEP 2026",
    tag: "PHISHING / AI",
    title: "Invisible Characters Are Becoming a Phishing Weapon",
    excerpt: "A technique first popularized in AI prompt-injection research is now being used to hide phishing language from traditional email filters.",
    source: "Microsoft Security",
    url: "https://www.microsoft.com/en-us/security/blog/2026/09/03/ascii-smuggling-crosses-over-from-ai-prompt-injection-to-phishing-evasion/",
    review: [
      "Microsoft menemukan kampanye phishing yang memanfaatkan invisible Unicode tag characters, teknik yang dikenal dalam riset AI sebagai ASCII smuggling. Dalam konteks baru ini, karakter tidak terlihat digunakan untuk memecah kata-kata tertentu sehingga sistem filtering email kesulitan mengenali pola yang biasanya mudah dideteksi.",
      "Menurut kami, ini contoh menarik bahwa teknik keamanan AI tidak hidup di ruang yang terpisah dari cybersecurity konvensional. Teknik yang awalnya dibahas untuk memanipulasi cara model membaca instruksi ternyata dapat dipindahkan ke dunia phishing untuk memanipulasi cara security filter membaca pesan.",
      "Ini juga memperlihatkan kelemahan pendekatan keamanan yang terlalu bergantung pada satu indikator. Jika filter hanya mencari string tertentu, attacker cukup mengubah representasinya tanpa mengubah maksud. Defense yang lebih kuat perlu menggabungkan content normalization, reputation, sender identity, URL analysis, behavioral signals, dan multiple detection layers.",
      "Pandangan PMA: keamanan yang baik bukan sistem yang mampu mengenali satu trik, tetapi sistem yang tetap mampu memahami konteks ketika bentuk serangan berubah. AI membuat kemampuan attacker untuk melakukan eksperimen semacam ini semakin mudah, sehingga defense juga perlu lebih adaptif."
    ],
  },
  {
    id: "006",
    date: "01 SEP 2026",
    tag: "MALWARE",
    title: "The Fake Download Button Is Still Dangerous",
    excerpt: "A live malware campaign uses counterfeit software websites and malicious installers to turn ordinary software searches into persistent enterprise compromise.",
    source: "Microsoft Security",
    url: "https://www.microsoft.com/en-us/security/blog/2026/09/01/counterfeit-installers-system-compromise-tracking-deceptive-software-download-campaign/",
    review: [
      "Microsoft Defender Experts sedang melacak kampanye malware yang menyamar sebagai situs download software resmi. Korban mencari software yang populer, diarahkan ke halaman yang terlihat legitimate, kemudian mengunduh installer yang telah dimodifikasi. Setelah dijalankan, malware mencoba membangun persistence, melemahkan proteksi keamanan, dan berkomunikasi dengan infrastructure milik attacker.",
      "Bagi kami, justru kesederhanaan teknik ini yang membuatnya relevan. Tidak semua serangan membutuhkan zero-day. Jika attacker dapat membuat korban sendiri menjalankan executable berbahaya, banyak lapisan pertahanan berikutnya sudah dimulai dari posisi yang tidak menguntungkan.",
      "Serangan seperti ini juga memperlihatkan pentingnya software supply hygiene. Pengguna harus mendapatkan aplikasi dari vendor resmi atau repository yang terpercaya. Di sisi organisasi, application control, SmartScreen, endpoint protection, network protection, tamper protection, dan logging dapat mengurangi peluang installer palsu berkembang menjadi persistence jangka panjang.",
      "Pandangan PMA: tombol download adalah bagian dari security boundary. Edukasi pengguna tetap penting, tetapi perusahaan sebaiknya tidak menggantungkan keamanan hanya pada kehati-hatian manusia. Sistem harus didesain agar satu klik yang salah tidak otomatis berubah menjadi kompromi seluruh endpoint."
    ],
  },
  {
    id: "007",
    date: "10 SEP 2026",
    tag: "STREETWEAR / FIT",
    title: "Streetwear Is Getting More Intentional",
    excerpt: "Oversized is still alive, but the stronger streetwear look in 2026 is less about wearing everything bigger and more about controlling proportion, fabric and silhouette.",
    source: "The 10/10 Boys",
    url: "https://the1010boys.com/blog/streetwear-trends-2026/",
    review: [
      "Streetwear tidak sedang meninggalkan oversized fit. Yang berubah adalah cara oversized dipakai. Tren 2026 bergerak dari sekadar mengambil ukuran lebih besar menuju siluet yang memang dirancang oversized: bahu lebih terkontrol, badan boxy, sleeve yang punya bentuk, dan proporsi yang tetap terlihat sengaja.",
      "Menurut kami, ini penting untuk desainer graphic tee. Artwork yang bagus bisa kehilangan impact kalau ditempel pada garment dengan proporsi yang tidak mendukung. Graphic placement harus membaca bentuk tubuh dan konstruksi kaos. Back print besar, chest graphic kecil, atau typography di sleeve semuanya punya fungsi berbeda ketika silhouette berubah.",
      "Streetwear yang lebih matang juga membuat material menjadi bagian dari desain. Heavyweight cotton, washed texture, struktur kain dan kemampuan garment mempertahankan bentuk dapat membuat graphic sederhana terlihat jauh lebih premium. Artinya, nilai sebuah desain tidak berhenti pada file artwork.",
      "Pandangan PMA: jangan mengejar oversized hanya karena sedang populer. Bangun silhouette terlebih dahulu, kemudian biarkan graphic mengikuti karakter garment. Untuk brand kecil, pendekatan ini justru bisa menjadi pembeda karena produk terlihat designed, bukan sekadar kaos kosong yang diberi print besar."
    ],
  },
  {
    id: "008",
    date: "10 SEP 2026",
    tag: "STREETWEAR / GRAPHIC",
    title: "The Graphic Tee Is Back — But It Has to Say Something",
    excerpt: "Graphic tees are gaining cultural momentum again, with personality, nostalgia, fandom and humor replacing generic logo-heavy design as the stronger visual language.",
    source: "Vogue",
    url: "https://www.vogue.com/slideshow/the-graphic-t-shirts-that-won-summer",
    review: [
      "Graphic T-shirt kembali menjadi salah satu titik paling menarik dalam fashion 2026. Vogue menyoroti pergeseran menuju graphic tee yang lebih ekspresif: referensi fandom, olahraga lokal, band-style imagery, humor, nostalgia, dan artwork yang terasa punya personality. Ini menarik karena selama beberapa tahun fashion sempat bergerak kuat ke arah minimalisme dan quiet luxury.",
      "Bagi kami, kebangkitan graphic tee bukan berarti semua desain harus kembali menjadi ramai. Justru pelajarannya adalah graphic harus mempunyai alasan untuk ada. Sebuah artwork bisa bekerja karena cerita, referensi budaya, typography, komposisi atau rasa nostalgia yang langsung dikenali — bukan karena jumlah elemen di dalamnya.",
      "Ini juga membuka peluang besar bagi brand kecil. Mereka tidak harus memenangkan permainan logo melawan perusahaan besar. Mereka bisa membangun identitas lewat visual yang terasa spesifik: kota tertentu, subkultur tertentu, humor internal, arsip olahraga, musik, otomotif, horror, atau cerita personal yang diterjemahkan menjadi artwork.",
      "Pandangan PMA: graphic tee yang kuat seharusnya membuat orang ingin melihatnya dua kali. Bukan sekadar 'bagus', tetapi membuat seseorang bertanya, mengenali sesuatu, atau merasa bahwa desain itu mewakili dirinya. Di situlah artwork berubah dari dekorasi menjadi identity."
    ],
  },
  {
    id: "009",
    date: "10 SEP 2026",
    tag: "STREETWEAR / CULTURE",
    title: "Why Streetwear Is Moving Beyond the Logo",
    excerpt: "The next phase of streetwear is being shaped by niche collaborations, craftsmanship and cultural credibility rather than simply putting a bigger logo on a garment.",
    source: "GQ",
    url: "https://www.gq.com/story/supreme-apresse-collaboration-09-08-2026",
    review: [
      "Kolaborasi Supreme dengan label Jepang A.Presse menunjukkan satu hal menarik tentang streetwear 2026: hype masih penting, tetapi kredibilitas desain semakin menentukan. Kolaborasi tersebut justru menarik karena tidak memaksa logo Supreme menjadi pusat seluruh koleksi. Ada ruang untuk tailoring, military-inspired M-65, hoodie, leather jacket, hingga graphic tee yang lebih restrained.",
      "Menurut kami, ini menunjukkan evolusi streetwear dari 'brand recognition' menuju 'design recognition'. Konsumen yang sudah terlalu sering melihat logo besar mulai mencari alasan lain untuk tertarik: siapa yang membuatnya, referensinya apa, bagaimana materialnya, bagaimana potongannya, dan apakah kolaborasinya punya cerita yang masuk akal.",
      "Buat brand independen, ini adalah kabar baik. Kita tidak harus meniru skala perusahaan besar. Justru kolaborasi kecil dengan fotografer, illustrator, musisi, komunitas otomotif, skater, tattoo artist, atau creative scene lokal bisa menghasilkan cultural value yang jauh lebih autentik daripada sekadar mengejar logo.",
      "Pandangan PMA: streetwear yang kuat bukan tentang seberapa keras sebuah brand berteriak. Ia tentang seberapa jelas dunia yang dibangun brand tersebut. Kalau visual, garment, cerita, komunitas dan cara rilisnya konsisten, logo bahkan bisa menjadi elemen paling kecil dari sebuah identity yang besar."
    ],
  },
];

export default journalArticles;
