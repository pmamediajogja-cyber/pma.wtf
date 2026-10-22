---
id: "071"
date: "22 OCT 2026"
tag: "CYBERSECURITY / VULNERABILITY"
category: "CYBERSECURITY"
title: "PHP2Shell Puts Three-Quarters of the Web on Emergency Patch Duty"
excerpt: "PHP has shipped emergency patches for two critical unauthenticated remote code execution flaws, collectively dubbed PHP2Shell, that can be triggered before any application code runs — and governments took sites offline rather than wait."
source: "BleepingComputer"
url: "https://www.bleepingcomputer.com/news/security/php-ships-emergency-patches-for-critical-php2shell-flaws/"
tags: ["PHP2Shell", "PHP", "remote code execution", "vulnerability", "WordPress", "patching", "web security"]
hashtags: ["#Cybersecurity", "#PHP2Shell", "#Vulnerability", "#PatchNow", "#WebSecurity"]
---

Tim keamanan PHP merilis patch darurat pada 21 Oktober 2026 untuk dua celah remote code execution (RCE) kritis tanpa autentikasi, CVE-2026-109618 dan CVE-2026-109619, yang secara kolektif dijuluki PHP2Shell. Keduanya menyerang semua instalasi PHP yang melayani permintaan web — termasuk PHP-FPM, Apache dengan mod_php, php-cgi, FrankenPHP, dan LiteSpeed — dan berakar pada masalah yang sama: PHP bisa meninggalkan memori dalam keadaan rusak ketika sebuah permintaan berakhir secara abnormal, lalu kondisi itu dieksploitasi untuk menjalankan kode dari jarak jauh. Tim PHP menyebut risiko tertinggi ada pada mod_php, di mana serangan yang sudah terbukti bisa dipicu oleh permintaan tanpa login sebelum satu baris pun kode aplikasi berjalan.

Skalanya yang membuat cerita ini luar biasa: PHP menggerakkan sekitar 75 hingga 80 persen situs web, termasuk WordPress, Joomla, dan Drupal, dengan lebih dari 5,1 juta host PHP yang terekspos online menurut estimasi VirusTotal. Versi yang harus dipasang adalah 8.5.12, 8.4.27, 8.3.36, atau 8.2.35, sementara PHP 8.1 dan yang lebih lama sudah tidak lagi menerima pembaruan resmi — hanya tersedia backport sumber minimal atau perbaikan dari vendor LTS. Sebelum patch dirilis, Cloudflare mengaku sudah melihat serangan awal yang menargetkan kedua celah ini, dan Pusat Keamanan Siber Nasional Inggris (NCSC) mendesak organisasi untuk segera memperbarui atau mematikan situsnya sampai bisa di-patch; sejumlah pemerintah Eropa bahkan benar-benar mematikan situs publiknya sebagai tindakan pencegahan.

Pandangan PMA: ini bukan lagi urusan "nanti kalau sempat update". Ketika celahnya ada di bahasa pemrograman itu sendiri — bukan di plugin, bukan di tema, bukan di kode yang kamu tulis — tidak ada trik konfigurasi yang bisa menyelamatkanmu sepenuhnya; tim PHP sendiri bilang mitigasi sementara tidak sepenuhnya memblokir serangan. Jadi cek versi PHP-mu hari ini juga, tanyakan ke hosting-mu apakah runtime-nya sudah di-patch (bukan cuma aplikasi CMS-nya), dan kalau masih mentok di PHP 8.1 ke bawah, anggap itu utang teknis yang jatuh tempo sekarang — migrasi, atau terima bahwa servermu sedang menunggu giliran.
