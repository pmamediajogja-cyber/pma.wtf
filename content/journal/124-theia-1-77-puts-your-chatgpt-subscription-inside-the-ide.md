---
id: "124"
date: "21 NOV 2026"
tag: "BUILD / TECH / IDE RELEASE"
category: "BUILD / TECH"
title: "Theia 1.77 Puts Your ChatGPT Subscription Inside the IDE"
excerpt: "Eclipse Theia 1.77 lets you sign in with your ChatGPT subscription, adopts AGENTS.md as the single source of agent context, and adds a multi-diff editor — in a release of 120 merged pull requests."
source: "EclipseSource"
url: "https://eclipsesource.com/blogs/2026/11/19/eclipse-theia-1-77-release-news-and-noteworthy/"
tags: ["Eclipse Theia", "Theia 1.77", "Theia AI", "ChatGPT", "AGENTS.md", "IDE", "multi-diff editor"]
hashtags: ["#EclipseTheia", "#Theia", "#ChatGPT", "#IDE", "#BuildTech"]
---

Eclipse Theia 1.77 resmi diumumkan pada 19 November 2026, membawa 120 pull request yang digabung dalam satu rilis. Sorotan terbesarnya ada di Theia AI: setelah sebelumnya mendukung langganan GitHub Copilot, kini pengguna bisa sign in dengan akun ChatGPT dan memakai model yang termasuk dalam paket langganannya langsung di dalam IDE — berdampingan dengan model OpenAI yang dipakai lewat API key. Integrasinya masih berlabel eksperimental, tapi sign-in dilakukan lewat browser sehingga tetap bekerja saat Theia berjalan di backend remote, dan pencarian web OpenAI tersedia sebagai kemampuan opsional. Bersamaan dengan itu, Theia AI resmi beralih ke AGENTS.md sebagai sumber konteks proyek: agen Coder, Architect, dan lainnya kini membaca file yang sama dengan yang dipakai Codex, Copilot, dan Cursor, sehingga tidak perlu lagi memelihara salinan konteks terpisah khusus Theia.

Di sisi workbench, rilis ini membawa multi-diff editor yang menampilkan semua file yang berubah dalam satu commit di satu tab — termasuk file yang ditambah dan dihapus — dengan header yang bisa dilipat dan bagian yang tidak berubah disembunyikan. Jendela sekunder juga makin menyerupai jendela utama: tab bisa di-drag masuk-keluar antar jendela, dan layout-nya ikut tersimpan saat IDE dibuka lagi. Di balik layar, ada perubahan besar untuk para adopter: paket runtime Theia kini diterbitkan sebagai ES modules, compiler pindah ke TypeScript 6, stack desktop naik ke Electron 44, dan kompatibilitas VS Code API bergerak ke 1.144.0. Agen-agennya pun makin mandiri — pemanggilan tool paralel kini berlaku untuk semua provider, delegasi ke sub-agent bisa dibatalkan satu per satu, dan agen bisa mencari skill serta agen lain sendiri lewat tool baru.

Pandangan PMA: rilis ini menarik bukan karena satu fitur besar, melainkan karena arahnya jelas — Theia berhenti membangun dunia sendiri dan memilih ikut standar yang sudah menang. Mengadopsi AGENTS.md alih-alih mempertahankan template konteks proprietary adalah keputusan yang tepat dan dewasa: konteks proyek seharusnya milik proyek, bukan milik IDE. Begitu juga dengan login ChatGPT: alih-alih memaksa pengguna membeli akses model baru, Theia membiarkan langganan yang sudah dibayar bekerja di tempat kerja mereka. Satu catatan untuk adopter: migrasi ke ES modules adalah breaking change yang nyata — decorator metadata tidak lagi di-emit dan ada panduan migrasi khusus — jadi jangan asal upgrade kalau kamu membangun tool di atas platform Theia. Tapi untuk pengguna IDE-nya, 1.77 adalah upgrade yang langsung terasa: review commit jadi satu tab, jendela kedua akhirnya berguna, dan agenmu akhirnya membaca file yang sama dengan agen lain.
