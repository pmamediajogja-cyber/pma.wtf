---
id: "053"
date: "14 OCT 2026"
tag: "CYBERSECURITY / VULNERABILITY"
category: "CYBERSECURITY"
title: "A Regex Bug Just Gave Strangers a Remote Control for GitLab"
excerpt: "GitLab shipped emergency patches for CVE-2026-97229, a maximum-severity CVSS 10.0 integer overflow in its CI/CD regex compiler that could let an unauthenticated attacker run arbitrary code on the server, reported The Hacker News."
source: "The Hacker News"
url: "http://thehackernews.com/2026/10/gitlab-patches-cvss-100-flaw-that-could.html"
tags: ["CVE-2026-97229", "GitLab", "remote code execution", "integer overflow", "CI/CD security", "self-hosted", "patch management"]
hashtags: ["#GitLab", "#CVE202697229", "#Cybersecurity", "#RCE", "#Vulnerability"]
---

GitLab merilis patch darurat pada 12 Oktober 2026 untuk celah maksimum CVE-2026-97229 — sebuah integer overflow di compiler regular expression CI/CD miliknya yang diberi skor CVSS 10.0, alias skor tertinggi yang ada, dilaporkan The Hacker News pada 13 Oktober 2026. Melalui regular expression yang dirancang khusus di dalam konfigurasi CI/CD, penyerang tanpa akun sekalipun bisa mengeksekusi kode arbitrer di server GitLab. Patch tersedia di versi 19.4.2, 19.3.5, dan 19.2.8, mencakup instalasi self-managed GitLab CE dan EE; GitLab.com sudah ter-patch dan pelanggan Dedicated tidak perlu bertindak. Celah ini dilaporkan peneliti beralias "joaxcar" lewat program bug bounty HackerOne milik GitLab. Rilis yang sama juga menutup tiga celah high-severity: XSS CVE-2026-92883 (8.7), improper authorization CVE-2026-16301 (8.5), dan regex permisif CVE-2026-14814 (8.2) yang bisa meracuni cache file repositori.

Kenapa ini serius: artefak yang dibutuhkan penyerang adalah sesuatu yang memang didesain untuk diterima GitLab dari luar — sebuah regex di konfigurasi CI/CD. Riset Rapid7 bahkan sudah berhasil mereproduksi eksekusi kode arbitrer-nya dan menyarankan upgrade di luar jadwal patch normal. Memang ada satu syarat: penyerang harus bisa menanam konfigurasi berbahaya ke sebuah repositori terlebih dahulu, yang mudah dipenuhi kalau instans GitLab kamu mengizinkan pendaftaran publik. Belum ada eksploitasi in-the-wild yang terkonfirmasi, tapi rekam jejak GitLab memberi peringatan: celah CVSS 10.0 bulan lalu (CVE-2026-85706) langsung diprobe dalam hitungan jam setelah pengungkapan publik.

Pandangan PMA: kalau kamu menjalankan GitLab self-hosted, ini bukan celah "nanti di maintenance window" — ini celah "berhenti sejenak dan patch sekarang". Pelajaran praktisnya dua. Pertama, matikan pendaftaran publik atau batasi pembuatan proyek kalau tidak dibutuhkan — Rapid7 sudah menunjukkan bahwa rantai serangannya terputus kalau penyerang tidak bisa menanam konfigurasi. Kedua, perhatikan polanya: komponen yang terus-menerus diserang di GitLab adalah mesin regex CI/CD-nya, dan komponen itu justru pintu yang paling sering kita anggap "cuma parser teks". Kita mengunci SSH, firewall, dan VPN — tapi lupa bahwa file `.gitlab-ci.yml` milik orang lain bisa dieksekusi oleh server kita. Keamananmu hanya sekuat input yang paling kamu remehkan.
