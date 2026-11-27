---
id: "135"
date: "27 NOV 2026"
tag: "AI & TECHNOLOGY / AGENT INFRASTRUCTURE"
category: "AI & TECHNOLOGY"
title: "MCP at Two: 700 Million Downloads and Agents That Work Alone"
excerpt: "Two years after launch, Anthropic's Model Context Protocol tops 700 million monthly SDK downloads, with Tasks and Elicitation now generally available, Skills over MCP in public beta, and file uploads coming soon — the plumbing of the agent era is getting a lot more independent."
source: "The Decoder"
url: "https://the-decoder.com/anthropic-tops-700-million-monthly-mcp-sdk-downloads-and-expands-the-protocol-for-more-autonomous-ai-agents/"
tags: ["Model Context Protocol", "MCP", "Anthropic", "Claude", "AI agents", "Tasks", "SDK"]
hashtags: ["#MCP", "#Anthropic", "#Claude", "#AIAgents", "#ModelContextProtocol"]
---

Anthropic merayakan dua tahun Model Context Protocol (MCP) dengan angka yang sulit diabaikan: SDK MCP kini diunduh lebih dari 700 juta kali per bulan — naik dari sekitar 90 juta pada November 2025 dan 400 juta pada Juli lalu — dan lebih dari 10.000 konektor MCP kini tersedia untuk Claude. Bersamaan dengan itu, Anthropic mengumumkan sejumlah fitur baru yang membuat agen AI bekerja lebih mandiri: Tasks dan Elicitation kini tersedia umum setelah diuji publik sejak Oktober, sementara Skills over MCP masuk beta publik dan dukungan upload file segera menyusul.

Tasks memungkinkan server MCP menjalankan pekerjaan panjang di latar belakang sementara Claude mengerjakan hal lain, lalu mengambil hasilnya begitu selesai; Elicitation membuat proses yang sedang berjalan bisa berhenti sejenak untuk menanyakan detail yang kurang kepada pengguna. Skills over MCP membiarkan server menyertakan panduan kerja — best practice, alur langkah demi langkah, instruksi khusus organisasi — yang dimuat hanya saat dibutuhkan dan ikut diperbarui bersama server. Di bawah kapnya ada fondasi teknis yang tak kalah penting: Tool Search menunda pemuatan deskripsi tool sampai dibutuhkan dan diklaim memangkas pemakaian konteks lebih dari 85 persen dalam setup multi-server, spesifikasi MCP kini stateless sehingga lebih mudah dijalankan di balik load balancer, dan Enterprise Managed Auth membiarkan admin menyetujui server sekali untuk seluruh karyawan.

Pandangan PMA: angka 700 juta itu mengesankan, tapi yang benar-benar penting adalah pergeseran perannya — MCP sudah bukan lagi proyek sampingan Anthropic, melainkan pipa standar era agen, sampai-sampai OpenAI pun mengadopsinya sejak Maret 2025. Fitur-fitur baru ini memindahkan bottleneck-nya: bukan lagi "bisakah model memanggil tool", melainkan "bisakah server dipercaya bekerja sendirian" — menjalankan tugas panjang tanpa ditunggu, bertanya sendiri saat ada yang kurang, dan membawa instruksinya sendiri. Buat yang membangun tool untuk Claude, standarnya baru saja naik: server-mu kini diharapkan mandiri, bukan sekadar daftar fungsi yang menunggu dipanggil. Dan dengan 700 juta unduhan per bulan, bertaruh melawan MCP sekarang justru jadi langkah yang paling berisiko.
