---
id: "132"
date: "26 NOV 2026"
tag: "AI & TECHNOLOGY / AGENTIC SECURITY"
category: "AI & TECHNOLOGY"
title: "OpenAI and Cisco Open-Source Shirudo to Shield Linux"
excerpt: "OpenAI and Cisco have open-sourced Shirudo, a Linux runtime that lets AI agents write and deploy temporary eBPF shields against live exploits — no reboot, no waiting for the vendor patch."
source: "The Hacker News"
url: "https://thehackernews.com/2026/11/openai-and-cisco-unveil-ai-assisted.html"
tags: ["Shirudo", "OpenAI", "Cisco", "eBPF", "AI agents", "Linux security", "self-defending infrastructure"]
hashtags: ["#Shirudo", "#OpenAI", "#Cisco", "#eBPF", "#AIAgents", "#Linux"]
---

OpenAI dan Cisco merilis Shirudo — dari bahasa Jepang yang berarti "perisai" — sebuah runtime Linux open-source yang membiarkan agen AI membela sistem yang sedang berjalan tanpa downtime. Idenya sederhana tapi tajam: begitu ada celah yang diketahui, agen menulis "shield" kecil berupa kontrol eBPF yang memblokir jalur serangan itu, sementara patch resmi vendor masih dibuat dan diuji. Shield diuji dulu apakah benar-benar menahan exploit dan apakah layanan tetap jalan normal; baru setelah operator menyetujuinya, shield aktif — tanpa restart, tanpa menghentikan layanan. Shirudo dibangun di atas fondasi Tetragon, platform keamanan eBPF dari Isovalent yang diakuisisi Cisco pada 2024, tapi dirancang ulang supaya yang mengemudikannya adalah agen, bukan manusia lewat konsol. Dalam uji coba, shield yang dibuat Codex berhasil memblokir upaya exploit Java4Shell terhadap Elasticsearch yang sedang berjalan, tanpa restart sama sekali.

Kenapa ini penting: celah antara celah diumumkan dan patch terpasang adalah jendela yang paling rawan — dan jendela itu makin sempit ke arah yang salah. Model AI kini makin jago menemukan dan mengeksploitasi celah, bahkan kadang sebelum celahnya diumumkan ke publik, sementara patch untuk software yang dipakai luas masih butuh berhari-hari sampai berbulan-bulan untuk sampai ke mayoritas sistem. Shirudo tidak berpura-pura menggantikan patch; ia mengisi kekosongan itu dengan mitigasi sementara yang spesifik, ditandatangani secara kriptografis, didistribusikan sebagai paket .bee lewat registry OCI, dan diverifikasi lewat TPM sebelum dimuat — jadi node yang sudah dikompromikan pun tidak bisa memuat shield palsu. Begitu patch asli mendarat, shield-nya pensiun.

Pandangan PMA: ini arah yang benar, tapi dengan satu syarat yang tidak boleh dilonggarkan — manusia tetap memegang kunci. Shirudo memang dirancang begitu: shield hanya naik ke mode blokir aktif kalau bukti menunjukkan ia aman, dan operator yang menyetujui. Yang menarik di sini bukan sekadar teknologinya, melainkan pengakuan jujurnya: pertahanan tidak bisa lagi menunggu ritme rilis vendor sementara serangan sudah berjalan dengan kecepatan mesin. Buat yang mengelola server Linux, ini saat yang tepat untuk mulai kenal eBPF lebih dalam — bukan karena Shirudo langsung wajib dipakai besok, tapi karena pola "mitigasi sementara yang terverifikasi" akan jadi standar baru di pertahanan infrastruktur. Dan satu hal yang patut dicatat: proyek ini open-source di bawah lisensi BSD 2-Clause, jadi komunitas bisa mengaudit, menguji, dan memperbaiki — persis seperti yang seharusnya dilakukan untuk alat yang akan duduk di dalam kernel.
