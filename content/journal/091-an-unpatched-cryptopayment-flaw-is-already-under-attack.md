---
id: "091"
date: "03 NOV 2026"
tag: "CYBERSECURITY / VULNERABILITY"
category: "CYBERSECURITY"
title: "An Unpatched CryptoPayment Flaw Is Already Under Attack"
excerpt: "Attackers are already probing a maximum-severity flaw in the CryptoPayment Gateway WordPress plugin — a bug with no fix yet that can expose stored wallet credentials in cleartext."
source: "The Hacker News"
url: "https://thehackernews.com/2026/11/attackers-target-unpatched.html"
tags: ["CryptoPayment Gateway", "WordPress", "CVE-2026-81648", "wallet credentials", "Defused Cyber", "vulnerability"]
hashtags: ["#Cybersecurity", "#WordPress", "#Vulnerability", "#Crypto", "#CVE"]
---

Penyerang sudah mulai mengincar celah keamanan berkategori maksimum di plugin WordPress CryptoPayment Gateway, menurut temuan Defused Cyber yang dilaporkan The Hacker News pada 3 November 2026. Celah yang dilacak sebagai CVE-2026-81648 ini mendapat skor CVSS 10.0 karena tidak adanya pemeriksaan otorisasi pada salah satu endpoint AJAX plugin tersebut — penyerang tanpa login bisa memanggil operasi administratif, menghapus file sembarangan di server, menimpa konfigurasi payment gateway, dan mengambil kredensial dompet yang tersimpan dalam bentuk cleartext. Versi yang terdampak, 1.2.1 sampai 1.2.2, adalah versi terbaru plugin itu, dan sampai laporan ini terbit belum ada perbaikan sama sekali.

Yang membuat kasus ini makin gelap adalah pluginnya sendiri sudah tidak bisa diunduh lagi: sejak 28 Agustus 2026, CryptoPayment Gateway ditutup dari WordPress Plugin Directory karena alasan keamanan yang tidak dirinci. Namun penutupan itu tidak menghapus instalasi yang sudah terpasang — plugin ini tercatat sudah diunduh 1.845 kali, termasuk 20 unduhan dalam tujuh hari terakhir, dan tidak jelas berapa situs yang masih menjalankannya. Defused Cyber menyebut serangan yang mereka rekam berasal dari infrastruktur yang memasarkan diri sebagai layanan hosting VPS anonim tanpa KYC, pola yang lazim untuk kampanye pemindaian massal yang menunggu satu situs lalai.

Pandangan PMA: celah tanpa patch adalah ujian paling jujur buat disiplin keamanan — bukan soal seberapa cepat kamu menambal, tapi seberapa cepat kamu berani mencabut sesuatu yang sudah tidak bisa diperbaiki. Kalau plugin pembayaranmu sudah ditutup dari direktori resmi dan tidak ada perbaikan, jangan menunggu pengumuman lanjutan sambil berharap tidak jadi target; copot pluginnya, putar semua kunci dompet, dan audit perubahan mencurigakan di server. Prinsipnya sederhana dan berlaku untuk semua situs, bukan cuma toko kripto: komponen yang tidak lagi dirawat adalah liabilitas, bukan fitur — dan liabilitas yang memegang uang pelanggan tidak boleh dibiarkan hidup hanya karena dulu sempat berfungsi.
