---
id: "129"
date: "24 NOV 2026"
tag: "BUILD / TECH / DATABASE"
category: "BUILD / TECH"
title: "Redis 8.12 Gives Every Set Member Its Own Expiry Date"
excerpt: "Redis 8.12 is generally available with compressed Roaring bitmaps in core, per-member expiration for sets, a BLESS command to protect hot keys from eviction, and a leaner B+ tree encoding for large sorted sets."
source: "Redis"
url: "https://github.com/redis/redis/releases/tag/8.12.0"
tags: ["Redis 8.12", "Redis", "in-memory database", "Roaring bitmaps", "set expiration", "BLESS", "ZMOVE"]
hashtags: ["#Redis", "#Redis812", "#Database", "#OpenSource", "#BuildTech"]
---

Redis merilis versi 8.12 sebagai General Availability pada 22 November 2026, dan ini bukan rilis tambal-sulam: daftar perubahannya panjang, dengan tiga headline yang langsung terasa di produksi. Pertama, compressed bitmaps — integrasi redis-roaring ke dalam core Redis — membuat bitmap jauh lebih hemat memori dan lebih cepat untuk operasi seperti BITCOUNT dan BITOP. Kedua, anggota set kini bisa punya masa kedaluwarsa sendiri lewat perintah baru SEXPIRE, SPEXPIRE, SEXPIREAT, dan SPEXPIREAT, lengkap dengan STTL dan SEXPIRETIME untuk mengecek sisa waktunya. Ketiga, perintah BLESS melindungi key tertentu dari eviction saat memori penuh, dan ZMOVE serta BZMOVE memindahkan anggota antar sorted set secara atomik. Di bawah kapnya, sorted set besar kini memakai encoding B+ tree yang memangkas pemakaian memori, plus kompresi SQ8 opsional untuk indeks vektor HNSW.

Kenapa ini penting: dua fitur pertama menutup celah yang sudah lama dirasakan pengguna Redis. Bitmap adalah cara paling murah untuk menyimpan flag per pengguna — siapa yang aktif hari ini, siapa yang sudah melihat sebuah fitur — tapi bitmap mentah membengkak begitu ID-nya renggang; Roaring menyimpan daerah yang jarang sebagai daftar pendek dan yang padat sebagai bitset, jadi memori turun drastis tanpa mengubah cara kerja perintahnya. Sementara itu, TTL per anggota set mengakhiri trik lama: selama ini kalau satu anggota set harus kedaluwarsa, pilihannya adalah memakai sorted set dengan skor waktu lalu membersihkannya sendiri, atau memecah set menjadi banyak key — dua-duanya rawan bug dan boros. BLESS juga menyelesaikan masalah klasik cache: key panas yang justru terbuang saat maxmemory tercapai. Semuanya opt-in dan bertahap — bitmap Roaring misalnya harus diaktifkan lewat konfigurasi bitmap-default-roaring — jadi upgrade tidak mengubah perilaku aplikasi yang sudah jalan.

Pandangan PMA: dari semua isi 8.12, SEXPIRE adalah perubahan yang paling "akhirnya" — Redis selama ini memperlakukan TTL sebagai properti key, padahal di dunia nyata yang kedaluwarsa itu anggota di dalamnya: sesi per perangkat, undangan per pengguna, item antrean per tugas. Fitur ini tidak glamor, tapi menghilangkan satu kelas bug housekeeping yang selama ini ditulis ulang di setiap codebase. Roaring bitmaps juga patut dicoba, tapi dengan catatan: bitmap terkompresi bukan obat untuk semua kasus — bitmap yang padat justru bisa lebih lambat, jadi ukur dulu dengan data sendiri sebelum menyalakannya secara global. Intinya: 8.12 adalah rilis yang membayar utang lama Redis dengan rapi — upgrade di staging, nyalakan fitur barunya satu per satu, dan biarkan yang paling membosankan, TTL per anggota, yang paling dulu masuk produksi.
