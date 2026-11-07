---
id: "099"
date: "07 NOV 2026"
tag: "BUILD / TECH / AGENT EDITOR"
category: "BUILD / TECH"
title: "VS Code 1.145 Makes Remote AI Agents Feel Local"
excerpt: "Visual Studio Code 1.145 brings remote agent previews and canvases into the editor, adds five-field cron schedules for local automations, and lets you dial down chat noise with three view modes."
source: "Neowin"
url: "https://www.neowin.net/news/visual-studio-code-1145-rolling-out-updates-to-streamline-agent-workflows/"
tags: ["Visual Studio Code", "VS Code 1.145", "AI agents", "remote agents", "cron", "Microsoft"]
hashtags: ["#VSCode", "#AI", "#DevTools", "#Microsoft", "#Agents"]
---

Microsoft merilis Visual Studio Code 1.145 pada Selasa 4 November 2026, dan fokus rilis mingguan kali ini jelas: membuat sesi agen AI yang berjalan di mesin remote terasa seperti sesi lokal. Dua fitur baru mengarah ke sana. Pertama, browser terintegrasi di jendela Agents kini bisa memuat halaman lewat remote agent host — jadi kalau agenmu menjalankan dev server di mesin lain, kamu bisa membuka dan memeriksa aplikasinya langsung dari dalam VS Code, lengkap dengan umpan balik atas perubahan yang dibuat agen. Kedua, canvas yang di-host di remote agent host kini juga bisa dipakai berkat dukungan koneksi remote agent host. Kedua fitur ini masih berstatus preview.

Rilis ini juga memperkuat automasi tugas agen. Kamu kini bisa memakai jadwal cron dengan ekspresi lima field saat preset bawaan kurang presisi — dialognya memvalidasi ekspresi dan menjelaskan jadwal yang dihasilkan — meski cron ini hanya berlaku untuk automasi lokal, bukan cloud. Automasi lokal juga bisa memakai custom agent dari workspace yang dipilih, dan automasi yang dinonaktifkan kini dikumpulkan di bagian Disabled automations yang terlipat, supaya riwayat dan automasi aktif tetap mudah dibaca. Terakhir, ada kontrol verbosity agen yang masih eksperimental: lewat menu More Actions di tampilan chat, kamu bisa memilih View Mode Conversation, Verbose, atau Compact. Mode Compact jadi default — tool call yang sedang berjalan tampil, lalu mengecil jadi baris ringkasan setelah selesai — sementara Verbose membiarkan semua langkah terbuka, dan Conversation mengelompokkan reasoning dan tool call di antara blok teks jawaban.

Pandangan PMA: arahnya sudah tidak bisa dibantah lagi — VS Code bukan lagi sekadar tempat mengetik kode, tapi pusat kendali untuk agen yang bekerja di mana-mana, dan 1.145 adalah langkah yang membuat jarak itu hilang dari pandangan. Yang paling praktis justru fitur paling membosankan di daftar ini: cron di dalam editor. Tugas berulang seperti mengecek build atau menjalankan test kini bisa dijadwalkan tanpa keluar dari jendela yang sama tempatmu menulis kode. Tapi ingat, fitur remote-nya masih preview — jangan langsung sandarkan workflow produksi padanya sebelum kamu coba di proyek kecil dan pastikan routing jaringannya beres. Dan kalau chat dengan agenmu sudah sepanjang novel, pindah ke Compact: editor yang rapi itu bukan soal estetika, tapi soal kamu masih bisa menemukan keputusan terakhir yang kamu buat.
