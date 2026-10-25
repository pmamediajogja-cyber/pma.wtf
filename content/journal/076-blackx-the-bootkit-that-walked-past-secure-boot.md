---
id: "076"
date: "25 OCT 2026"
tag: "CYBERSECURITY / BOOTKIT"
category: "CYBERSECURITY"
title: "BlackX: The Bootkit That Walked Past Secure Boot"
excerpt: "A new UEFI bootkit called BlackX exploited the old Baton Drop flaw to bypass Secure Boot in an espionage campaign against Central Asian diplomats — even on fully patched Windows systems, because the crucial revocation step was never triggered."
source: "BleepingComputer"
url: "https://www.bleepingcomputer.com/news/security/blackx-uefi-bootkit-exploits-baton-drop-flaw-to-bypass-secure-boot/"
tags: ["BlackX", "UEFI bootkit", "Secure Boot", "Baton Drop", "APT41", "Kaspersky"]
hashtags: ["#Cybersecurity", "#Bootkit", "#SecureBoot", "#APT41", "#Malware"]
---

Bootkit UEFI baru bernama BlackX dipakai dalam kampanye spionase awal 2026 yang menargetkan lembaga diplomatik di Asia Tengah — Tajikistan, Uzbekistan, dan Turkmenistan — dan diatribusikan dengan keyakinan menengah ke APT41, kelompok yang disponsori negara China. Menurut peneliti Kaspersky, BlackX mengeksploitasi celah lama Baton Drop (CVE-2022-21894) untuk melewati Secure Boot dan memuat driver jahat yang dirancang mengganggu produk keamanan Kaspersky dan Avast. Implementasinya disebut "remarkably similar" dengan BlackLotus, bootkit yang beredar sejak 2022 — bedanya, BlackX membawa kernel driver dan payload lanjutan yang berbeda, sehingga peneliti menduga ia dibangun dari hasil reverse-engineering BlackLotus atau dari source code-nya yang dibeli, bukan dari bocoran publik 2023 yang tidak lengkap.

Begitu masuk, BlackX menyuntikkan driver kernel Windows yang ditandatangani sertifikat yang sudah dicabut, lalu menonaktifkan proses keamanan, merusak callback registry, dan mengutak-atik Event Tracing for Windows agar aktivitasnya tak terpantau. Driver itu juga melindungi file bootkit dengan trik licik: setiap upaya membuka file tersebut malah meluncurkan Windows Calculator. Payload spionasenya mencakup RAT yang memakai Google Drive, OneDrive, atau Yandex.Disk sebagai command-and-control, plus loader terobfuskasi yang mengambil plugin DLL dari server eksternal. Yang paling mengkhawatirkan: semua korban BlackX memakai Windows yang sudah sepenuhnya di-patch — bootkit tetap lolos karena admin tidak pernah mengaktifkan revokasi Secure Boot tambahan secara manual.

Pandangan PMA: ini bukan cerita tentang patch yang telat, tapi tentang patch yang setengah jalan. Microsoft sudah menyediakan revokasi sertifikat "Windows Production PCA 2011" untuk menutup Baton Drop, tapi revokasi itu tidak terjadi otomatis — harus dipicu manual, dan hampir tidak ada admin yang melakukannya setelah update. Pelajarannya brutal tapi sederhana: daftar "sudah di-patch" tidak sama dengan "sudah aman" kalau ada langkah manual yang tertinggal di belakangnya. Buat tim kecil yang mengelola server atau laptop kantor sendiri, cek satu hal ini minggu ini: apakah revokasi Secure Boot di perangkatmu benar-benar sudah aktif, bukan cuma update-nya yang sudah terpasang.
