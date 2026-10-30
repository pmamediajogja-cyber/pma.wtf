---
id: "084"
date: "30 OCT 2026"
tag: "BUILD / TECH / MODEL ROUTING"
category: "BUILD / TECH"
title: "GitHub Copilot Fusion Lets You Stop Picking Models"
excerpt: "GitHub Copilot Fusion is generally available: instead of choosing a model for each coding task, you pick an effort level and let Copilot route and orchestrate models for you — with Fusion Max scoring within two points of Claude Code with Opus 5.5 Max at about half the cost."
source: "GitHub Changelog"
url: "https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion"
tags: ["GitHub Copilot Fusion", "model routing", "AI coding", "Project HydraFusion", "VS Code", "developer tools", "Copilot"]
hashtags: ["#BuildTech", "#GitHubCopilot", "#CopilotFusion", "#AICoding", "#DevTools"]
---

GitHub mengumumkan Copilot Fusion tersedia secara umum pada 28 Oktober 2026, dan idenya sederhana: berhenti memilih model untuk setiap tugas coding. Pengguna tidak lagi memilih satu model di model picker, melainkan memilih Copilot Fusion lalu menentukan level usaha — Standard untuk pekerjaan sehari-hari, High untuk tugas yang lebih menantang, dan Max untuk pekerjaan paling berat. Untuk setiap prompt, Fusion yang menentukan model apa yang dipakai dan bagaimana mereka bekerja sama, menggabungkan orkestrasi multi-model dari Project HydraFusion dengan pemilihan model otomatis Copilot.

Di balik layar, Fusion menjalankan tiga pola kerja. Single berarti satu model menyelesaikan tugas langsung. Cascade berarti model yang efisien membuat draf dulu, lalu penilai kualitas memutuskan apakah draf itu diterima atau perlu dieskalasi ke model yang lebih kuat. Critique berarti satu model membuat draf, model lain mengulasnya, lalu model pertama merevisi. Klaim benchmark-nya datang dari Artificial Analysis Coding Agent Index: Fusion Max mencetak 60 poin, hanya dua poin di bawah Claude Code dengan Opus 5.5 Max, dengan sekitar setengah biaya API rata-rata per tugas, setengah token, dan waktu 40 persen lebih cepat. Fusion tersedia di semua paket Copilot — VS Code, aplikasi Copilot, Copilot CLI, dan IDE JetBrains — dan pengguna ditagih per model yang dipakai dengan tarif standar, plus diskon 30 persen untuk sementara waktu bagi pengguna paket berbayar.

Pandangan PMA: yang paling berharga dari Fusion bukan skor benchmark-nya, melainkan pengakuan bahwa memilih model sudah menjadi pekerjaan tersendiri yang menguras waktu. Developer paling boros bukan yang memakai model termahal, melainkan yang lupa menurunkan model setelah tugas berat selesai — persis seperti yang diakui AT&T dalam pengumuman GitHub. Pelajaran praktisnya buat tim kecil: sebelum menambah anggaran AI coding, periksa dulu berapa banyak tagihanmu yang sebenarnya berasal dari kebiasaan, bukan kebutuhan. Dan satu catatan penting yang jangan dilewatkan: Fusion hanya memakai model yang diizinkan kebijakan organisasimu, jadi admin tetap memegang kendali — orkestrasi otomatis bukan berarti kontrol ikut otomatis hilang.
