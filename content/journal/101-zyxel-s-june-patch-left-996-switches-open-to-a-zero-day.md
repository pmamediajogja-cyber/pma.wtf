---
id: "101"
date: "08 NOV 2026"
tag: "CYBERSECURITY / VULNERABILITY"
category: "CYBERSECURITY"
title: "Zyxel's June Patch Left 996 Switches Open to a Zero-Day"
excerpt: "Zyxel's June firmware fix for the GS1900 switches never stopped the real exploit — a second, hidden flaw let attackers run commands as root on nearly 1,000 switches across 48 countries, and only the October Patch 3 closes it."
source: "eSecurity Planet"
url: "https://www.esecurityplanet.com/cybersecurity-threats/news-zyxel-gs1900-zero-day-cve-2026-107441/"
tags: ["Zyxel", "GS1900", "CVE-2026-107441", "zero-day", "network switches", "Binarly"]
hashtags: ["#Zyxel", "#ZeroDay", "#Cybersecurity", "#CVE", "#NetworkSecurity"]
---

Zyxel menerbitkan advisory keamanan pada 3 November 2026 untuk celah baru di switch seri GS1900, CVE-2026-107441 — sebuah out-of-bounds write di program CGI antarmuka web-management (dispatcher.cgi) yang memungkinkan penyerang tanpa login di jaringan lokal menjalankan perintah sistem operasi lewat HTTP request yang dibuat khusus. Zyxel memberi skor CVSS 8.8, sementara firma keamanan firmware Binarly yang menemukan celah ini menilainya 9.8 dan menyebut eksploitasi yang berhasil memberi akses root. Sepuluh model GS1900 terdampak, dan firmware Patch 3 (build .3C0 per model) yang dirilis 22 Oktober adalah satu-satunya perbaikan — semua build Patch 2 (.2C0) dan yang lebih lama tetap rentan.

Yang membuat kasus ini memalukan adalah ceritanya sudah berjalan berbulan-bulan sebelum advisory itu keluar. Pada 16 Juni, Zyxel menambal celah lain di perangkat yang sama, CVE-2026-7273, dan semua orang mengira serangan yang sedang berjalan menargetkan celah itu — GreyNoise bahkan mencatat kampanye aktor yang dilacak sebagai Kapibala membobol 996 switch di 48 negara sejak sekitar 17 Agustus, mencuri konfigurasi perangkat, hash kredensial root, dan informasi jaringan. Binarly kemudian menganalisis exploit yang beredar dan membuktikan exploit itu tetap bekerja di kesepuluh firmware yang sudah membawa tambalan Juni; tambalan itu menambahkan pengecekan jumlah parameter, tapi pengecekan tersebut berjalan terlambat — parameter berukuran besar sudah lebih dulu merusak counter sebelum validasi berjalan. Binarly melaporkan temuan itu ke Zyxel pada 29 September, Zyxel mengonfirmasi celah baru pada 11 Oktober, dan CISA sempat memasukkan CVE lama ke katalog Known Exploited Vulnerabilities pada 21 September — sementara CVE yang benar-benar dieksploitasi, sampai 4 November, belum masuk daftar itu.

Pandangan PMA: ini pelajaran klasik yang tidak pernah basi — tambalan yang sudah terpasang bukan bukti kamu aman, apalagi kalau tambalan itu menambal bug yang salah. Admin yang menutup tiket CVE-2026-7273 di bulan Juni dan merasa beres justru duduk di atas perangkat yang masih bisa dieksploitasi tanpa login sampai Oktober. Yang lebih pahit: dari 996 switch yang dibobol, 564 masih memakai password default pabrik — jadi penyerang tidak cuma memanfaatkan celah firmware, mereka juga dibantu kelalaian paling dasar. Kalau kamu masih menjalankan GS1900, jangan cuma cek "sudah update atau belum", cek nomor build-nya: harus .3C0, bukan .2C0. Dan kalau perangkat itu sempat terpapar selama Agustus sampai Oktober, anggap kredensialnya sudah bocor — ganti password, bandingkan konfigurasi dengan backup, dan jangan percaya status "patched" di spreadsheet tanpa memverifikasi versi firmware-nya langsung di perangkat.
