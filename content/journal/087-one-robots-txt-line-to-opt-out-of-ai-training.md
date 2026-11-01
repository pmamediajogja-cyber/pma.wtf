---
id: "087"
date: "01 NOV 2026"
tag: "AI & TECHNOLOGY / TRAINING OPT-OUT"
category: "AI & TECHNOLOGY"
title: "One robots.txt Line to Opt Out of AI Training"
excerpt: "OpenAI, Google, Microsoft and Anthropic pledged a single shared robots.txt signal that lets a website opt out of AI training in one instruction — replacing a separate blocking rule for every crawler, though it will take months to take effect."
source: "TechXplore"
url: "https://techxplore.com/news/2026-10-ai-giants-publishers-block.html"
tags: ["AI training opt-out", "robots.txt", "OpenAI", "Google", "Microsoft", "Anthropic", "publishers"]
hashtags: ["#AI", "#AITraining", "#RobotsTxt", "#OpenAI", "#Google"]
---

OpenAI, Google, Microsoft, dan Anthropic berjanji memberi penerbit satu cara tunggal untuk mencegah konten mereka dipakai melatih model AI. Selama ini penerbit harus menulis perintah pemblokiran yang berbeda untuk setiap bot perayap; solusi baru ini memungkinkan satu instruksi standar di robots.txt yang dikenali dan dihormati oleh semua perusahaan AI yang mengadopsinya. Sinyal bersama itu dikenal sebagai token `__usage_ai-training`, yang berasal dari draf Internet Engineering Task Force tentang preferensi pelatihan — sebuah proposal yang masih dalam tahap awal, bukan standar resmi yang sudah disahkan.

Janji ini belum langsung berlaku. Anthropic menyebut pihaknya sudah mulai menggulirkannya, OpenAI mengatakan dukungannya akan hadir "dalam beberapa bulan ke depan", Microsoft akan mulai menerapkannya pada 1 Februari 2027, dan Google menargetkan sometime pada 2027. Ada batas penting yang perlu dipahami: pengaturan ini hanya berlaku untuk pelatihan model di masa depan, tidak mencegah bot merayapi situs, dan konten tetap boleh di-scrape secara default sampai penerbit mengubah pengaturannya. Microsoft dan Google juga mengingatkan bahwa menolak pelatihan bisa mengurangi kemungkinan konten penerbit muncul di aplikasi dan pengalaman AI. Meta menyatakan dukungannya terhadap upaya ini, tetapi belum berkomitmen menghormati token tersebut.

Pandangan PMA: ini kabar baik yang jangan dirayakan terlalu cepat — satu baris robots.txt memang memangkas pekerjaan penerbit, tetapi sampai semua perusahaan benar-benar menerapkannya, aturan lama per-perayap tetap harus dipertahankan. Buat pemilik situs kecil, langkah praktisnya sederhana: pasang sinyal baru ini sekarang supaya siap saat berlaku, jangan hapus aturan Google-Extended dan sejenisnya, dan sadari trade-off-nya — menolak pelatihan berarti juga mengurangi visibilitas di jawaban AI. Yang paling penting dari kesepakatan ini bukan teknologinya, melainkan presedennya: untuk pertama kali para raksasa AI sepakat memakai bahasa opt-out yang sama, dan itu memberi penerbit posisi tawar yang sebelumnya tidak mereka miliki.
