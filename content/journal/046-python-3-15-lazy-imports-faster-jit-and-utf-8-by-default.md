---
id: "046"
date: "10 OCT 2026"
tag: "BUILD / TECH / LANGUAGE RELEASE"
category: "BUILD / TECH"
title: "Python 3.15: Lazy Imports, a Faster JIT, and UTF-8 by Default"
excerpt: "Python 3.15.0 landed on October 9, 2026 with explicit lazy imports via PEP 810, a measurably faster experimental JIT, UTF-8 as the default encoding, and new built-ins frozendict and sentinel."
source: "Linuxiac"
url: "https://linuxiac.com/python-3-15-released-with-faster-jit-lazy-imports-and-utf-8-by-default/"
tags: ["Python 3.15", "lazy imports", "PEP 810", "JIT compiler", "UTF-8", "frozendict", "free threading"]
hashtags: ["#Python", "#Python315", "#LazyImports", "#JIT", "#Programming"]
---

Python 3.15.0 resmi dirilis pada 9 Oktober 2026 — rilis tahunan bahasa ini datang seminggu lebih lambat dari jadwal karena tim menambahkan release candidate ketiga yang mengejutkan untuk membereskan bug lazy-import di menit-menit terakhir, dilaporkan Linuxiac. Fitur utamanya adalah PEP 810: explicit lazy imports. Cukup tulis `lazy import json`, dan modul baru dimuat saat pertama kali benar-benar dipakai, bukan saat baris import dieksekusi. Untuk CLI, test runner, dan serverless function yang rantai import-nya panjang tapi jarang dipakai penuh, angka yang disebut PEP-nya menjanjikan pemangkasan waktu startup 50–70% di beberapa workload nyata — opt-in, jadi perilaku `import` biasa tidak berubah.

Di bawah kap, interpreter eksperimental JIT-nya dapat peningkatan terukur: 7–8% lebih cepat (geometric mean) di Linux x86-64 dan 11–12% di macOS AArch64 dibanding interpreter standar. Dua tipe bawaan baru juga hadir: `frozendict`, dictionary yang tidak bisa diubah setelah dibuat, dan `sentinel`, mekanisme standar untuk nilai penanda unik yang selama ini dibuat manual dengan `object()`. Lalu PEP 686 menjadikan UTF-8 sebagai encoding default di semua OS — kabar baik untuk portabilitas, kabar hati-hati untuk kode Windows yang diam-diam mengandalkan locale encoding. Plus paket `profiling` baru berisi Tachyon, sampling profiler yang bisa attach ke proses yang sudah berjalan tanpa restart.

Pandangan PMA: 3.15 adalah rilis yang menghargai para pembangun, bukan penonton. Tidak ada sintaks viral di sini — hanya rasa sakit lama yang akhirnya diangkat ke level bahasa: startup lambat, dict yang tidak bisa di-hash, sentinel palsu, roulette encoding, dan profiling yang buta. Rilis seperti ini jarang trending, tapi nilainya nyata di biaya server dan waktu tunggu developer. Pelajaran praktisnya satu: jangan buru-buru upgrade production hari ini — test dulu di CI, grepping `open()` yang mengandalkan encoding sistem, dan pastikan dependency besar sudah menerbitkan wheel 3.15. Bahasa yang matang itu seperti Python sekarang: tidak perlu berubah total untuk membuat pekerjaanmu terasa lebih cepat.
