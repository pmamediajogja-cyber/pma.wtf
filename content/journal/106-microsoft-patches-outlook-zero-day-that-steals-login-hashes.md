---
id: "106"

date: "11 NOV 2026"

tag: "CYBERSECURITY / VULNERABILITY"

category: "CYBERSECURITY"

title: "Microsoft Patches an Outlook Zero-Day That Steals Login Hashes"

excerpt: "Microsoft's November 2026 Patch Tuesday fixes a record 1,235 flaws — including an actively exploited Outlook spoofing bug, CVE-2026-124194, that leaks NTLMv2 hashes the moment a crafted message file is opened."

source: "BleepingComputer"

url: "https://www.bleepingcomputer.com/news/microsoft/microsoft-november-2026-patch-tuesday-fixes-1-235-flaws-outlook-zero-day/"

tags: ["Microsoft", "Patch Tuesday", "Outlook", "CVE-2026-124194", "NTLM", "zero-day"]

hashtags: ["#Cybersecurity", "#PatchTuesday", "#Microsoft", "#ZeroDay", "#Outlook"]

---

Microsoft merilis Patch Tuesday November 2026 dengan 1.235 celah yang ditambal — termasuk 66 yang berstatus kritis, 48 di antaranya memungkinkan eksekusi kode jarak jauh (RCE). Satu celah menonjol di atas semuanya: zero-day di Microsoft Outlook, CVE-2026-124194, yang sudah dieksploitasi secara aktif sebelum patch tersedia. Penyerang cukup mengirim file pesan yang direkayasa khusus dan meyakinkan korban membukanya di Outlook; begitu dibuka, Outlook diam-diam terhubung ke lokasi jaringan milik penyerang tanpa menampilkan peringatan konten eksternal seperti biasanya — dan dalam proses itu, hash otentikasi NTLMv2 milik korban ikut bocor.

Yang membuat celah ini berbahaya bukan skornya — CVSS-nya hanya 6.5, alias Moderate — melainkan apa yang bisa dilakukan dengan hash yang bocor itu. Hash NTLMv2 yang tertangkap bisa dipecahkan secara offline untuk mendapatkan kata sandi, atau langsung dipakai untuk menyamar sebagai korban dan masuk ke sistem perusahaan lain. CISA sudah memasukkan CVE-2026-124194 ke katalog Known Exploited Vulnerabilities (KEV) dan memberi tenggat patch 24 November 2026 untuk instansi federal. Produk yang terdampak meliputi Microsoft 365 Apps for Enterprise serta Office LTSC 2021 dan 2024. Sebagai konteks, rilis November ini menyusul Patch Tuesday Oktober yang memecahkan rekor dengan 1.411 celah — Microsoft kini memakai model AI untuk menemukan ribuan celah di produknya sendiri, dan volumenya terus naik.

Pandangan PMA: jangan tertipu skor Moderate — label "actively exploited" jauh lebih penting daripada angka CVSS. Kalau kamu masih memakai Outlook di kantor, patch November ini bukan tugas akhir pekan, melainkan tugas hari ini: satu file pesan yang dibuka satu karyawan sudah cukup untuk menyerahkan hash login ke penyerang. Dan ini pelajaran berulang soal peringatan keamanan: celah ini ada karena Outlook tidak menampilkan peringatan yang seharusnya muncul — jadi jangan pernah mengandalkan "nanti ada peringatan" sebagai garis pertahanan. Update Office-nya, aktifkan patch otomatis kalau belum, dan anggap setiap lampiran dari pengirim tak dikenal sebagai jebakan sampai terbukti sebaliknya.
