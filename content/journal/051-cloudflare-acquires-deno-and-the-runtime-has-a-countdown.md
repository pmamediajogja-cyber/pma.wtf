---
id: "051"
date: "13 OCT 2026"
tag: "BUILD / TECH / RUNTIME"
category: "BUILD / TECH"
title: "Cloudflare Acquires Deno — and the Runtime Has a Countdown"
excerpt: "Cloudflare is buying the company behind the Deno JavaScript runtime to make its Workers programming model portable and self-hostable — while Deno's own runtime gets a one-year maintenance clock before development ends."
source: "TechCrunch"
url: "https://techcrunch.com/2026/10/10/cloudflare-acquires-deno-to-improve-its-workers-programming-model/"
tags: ["Cloudflare", "Deno", "Ryan Dahl", "Cloudflare Workers", "JavaScript runtime", "workerd", "celld"]
hashtags: ["#Cloudflare", "#Deno", "#CloudflareWorkers", "#JavaScript", "#BuildTech"]
---

Cloudflare mengumumkan Jumat lalu (9 Oktober 2026) bahwa mereka mengakuisisi Deno, startup di balik runtime JavaScript/TypeScript yang didirikan Bert Belder dan Ryan Dahl — nama yang dikenal sebagai pencipta Node.js — dilaporkan TechCrunch pada 10 Oktober 2026. Nilai kesepakatan tidak diungkap; Deno sebelumnya menggalang total $26 juta, termasuk putaran Seri A yang dipimpin Sequoia. Tapi kunci kesepakatannya bukan runtime-nya, melainkan celld — implementasi open source dari model pemrograman Workers yang diluncurkan Deno pada Agustus 2026, yang menurut principal engineer Cloudflare Workers Kenton Varda membuat timnya "delighted". Cloudflare berencana menggabungkan celld dengan workerd, runtime open source Workers miliknya sendiri, dan seluruh tim Deno — termasuk Dahl dan Belder — ikut pindah.

Kenapa ini penting: akuisisi ini soal portabilitas, bukan soal feature war. Workers selama bertahun-tahun dituduh sengaja dibuat berbeda dari platform cloud lain untuk mengunci pengguna; Varda membalasnya frontal — open source dan memberi orang pintu keluar adalah "good business". Deno sendiri mengumumkan jam transisi yang tegas: runtime Deno hanya dirawat satu tahun lagi lewat rilis bulanan sebelum pengembangan resmi dihentikan (tetap open source), Deno Deploy beroperasi enam bulan lalu ditutup dengan dukungan migrasi ke Workers untuk pelanggan berbayar, sementara JSR — package registry-nya — terus berjalan dengan infrastruktur pindah ke Cloudflare. Dahl dan Belder akan memimpin penggabungan celld–workerd dengan misi yang ditulis Dahl sendiri: menjadikan "model pemrograman Workers cara mainstream membangun server".

Pandangan PMA: Cloudflare tidak membeli Deno untuk mendapatkan runtime; mereka membeli tim dan bukti portabilitas (celld) untuk mematahkan argumen lock-in yang selama bertahun-tahun membayangi Workers. Ketika kritik terbesarmu adalah "platformmu mengunci", respons termurah sekaligus paling meyakinkan adalah mengakuisisi pembuat pintu keluarnya. Pelajaran praktisnya dua: pertama, kalau produksimu berdiri di atas runtime open source yang dirawat satu perusahaan, hitung mundur dimulai sejak akuisisi diumumkan — rencanakan migrasi selagi rilis perawatan masih berjalan, bukan saat lampunya padam. Kedua, perhatikan polanya: runtime yang menang bukan yang fiturnya paling lengkap, tapi yang paling gampang dijalankan di mana saja. Tulis kode yang portable sejak hari pertama, dan akuisisi siapa pun tidak bisa menyanderamu.
