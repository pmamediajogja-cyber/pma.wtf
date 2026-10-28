---
id: "081"
date: "28 OCT 2026"
tag: "CYBERSECURITY / E-COMMERCE SKIMMER"
category: "CYBERSECURITY"
title: "Hackers Hijack Convertr Analytics Script to Steal Card Data"
excerpt: "A Brazilian Magecart gang hijacked a shared Plausible analytics tracker on e-commerce platform Convertr, turning a trusted script on checkout pages into a card skimmer that harvested numbers, CVVs, and taxpayer IDs — until Convertr pulled it and patched."
source: "BleepingComputer"
url: "https://www.bleepingcomputer.com/news/security/hackers-hijack-convertr-analytics-script-to-steal-payment-card-data/"
tags: ["Convertr", "Magecart", "card skimmer", "Plausible Analytics", "supply-chain attack", "e-commerce security", "Sansec"]
hashtags: ["#Cybersecurity", "#Magecart", "#CardSkimmer", "#Ecommerce", "#SupplyChain"]
---

Skrip analitik yang dipercaya puluhan toko online Brasil justru berubah menjadi pencuri kartu. Kelompok skimming yang diidentifikasi pada 24 Oktober 2026 itu menyusup ke server Convertr — platform e-commerce yang menangani penjualan senilai R$2 miliar (sekitar $370 juta) untuk puluhan brand fashion besar — dan memodifikasi file tracker Plausible, alternatif open source Google Analytics yang dikelola sendiri oleh Convertr. Karena tracker itu dimuat di halaman checkout semua merchant yang memakai platform tersebut, satu titik kompromi langsung menyebar ke seluruh toko. Menurut firma keamanan e-commerce Sansec, penyerang diduga masuk lewat CVE-2026-8467, celah eksekusi perintah tanpa autentikasi pada instalasi Plausible Community Edition Convertr yang sudah kedaluwarsa — meski jalur masuk ini belum terkonfirmasi.

Yang membuat serangan ini makin tajam adalah evolusinya yang cepat. Versi awal skimmer memakai pola generik untuk field pembayaran, tapi pada 26 Oktober penyerang mendorong versi yang lebih halus dan spesifik: menargetkan nama field API pembayaran Convertr sendiri. Skimmer itu dirancang mencuri nomor kartu, tanggal kedaluwarsa, kode CVV, nama pemegang kartu, hingga nomor identifikasi wajib pajak CPF — paket lengkap untuk penipuan kartu. Sansec menyarankan siapa pun yang membayar dengan kartu di toko Brasil yang alamat checkout-nya mengandung string 'checkout.convertr' sejak 24 Oktober untuk segera menghubungi bank dan memblokir kartunya. Dalam pembaruan terbaru, Convertr sudah menghapus skimmer dan meningkatkan Plausible ke versi yang sudah ditambal, serta memberi tahu merchant dan penyedia pembayaran yang terdampak — tapi Sansec memperingatkan cache browser bisa membuat skrip jahat tetap aktif hingga 24 jam setelah pembersihan, jadi pelanggan sebaiknya menghapus cache sebelum berbelanja lagi.

Pandangan PMA: serangan ini menang bukan karena tekniknya canggih, melainkan karena targetnya dipilih dengan malas yang cerdas — satu skrip bersama yang dipercaya semua toko, bukan satu toko yang harus dibobol satu per satu. Pelajaran praktisnya berlaku buat siapa pun yang mengelola situs, bukan cuma platform sebesar Convertr: audit skrip pihak ketiga yang dimuat di halaman checkout-mu, pin versinya, dan pantau perubahan file-nya, karena skrip analitik yang "cuma mencatat kunjungan" bisa berubah menjadi pencuri kartu tanpa mengubah tampilan situs sama sekali. Dan buat pembeli, ini pengingat paling sederhana yang sering diabaikan: kartu virtual sekali pakai untuk belanja online menghilangkan hampir seluruh nilai dari data yang dicuri skimmer seperti ini — nomor yang sudah kedaluwarsa tidak bisa dipakai lagi, seberapa pun lengkap data yang mereka curi.
