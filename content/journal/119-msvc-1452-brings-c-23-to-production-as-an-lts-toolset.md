---
id: "119"
date: "18 NOV 2026"
tag: "BUILD / TECH / COMPILER"
category: "BUILD / TECH"
title: "MSVC 14.52 Brings C++23 to Production as an LTS Toolset"
excerpt: "Microsoft ships MSVC Build Tools 14.52 as a long-term support release — C++23 is finally production-ready via /std:c++23, with a feature-complete Standard Library, APX targeting, and C++ Dynamic Debugging."
source: "Microsoft C++ Team Blog"
url: "https://devblogs.microsoft.com/cppblog/msvc-build-tools-version-14-52-now-generally-available/"
tags: ["MSVC", "C++23", "Visual Studio 2026", "compiler", "LTS", "Microsoft", "toolchain"]
hashtags: ["#MSVC", "#CPP23", "#VisualStudio", "#Compiler", "#BuildTools"]
---

Microsoft resmi merilis MSVC Build Tools 14.52 sebagai rilis long-term support (LTS) pada 16 November 2026, dan kabar terbesarnya sederhana: C++23 akhirnya siap dipakai di produksi lewat flag `/std:c++23`, dengan Standard Library yang kini lengkap secara fitur. Toolset ini hadir bersama Visual Studio 2026 versi 18.12 di kanal Stable dan 18.11 di kanal LTSC, keduanya dirilis 10 November lalu. Microsoft juga mencatat satu hal yang jarang terjadi — 14.52 sebetulnya tidak dijadwalkan menjadi LTS, tapi status itu ditambahkan agar tim C++ bisa naik versi dan tetap seirama dengan siklus Visual Studio.

Selain C++23, rilis ini membawa perbaikan code generation untuk x64 dan ARM64, dukungan produksi untuk Intel Advanced Performance Extensions (APX) di build x64, serta keandalan modul C++ yang jauh lebih baik — termasuk diagnostik dan umpan balik saat link. Di sisi library dan perkakas, ada algoritma Standard Library yang di-vectorize dengan SVE di ARM64, performa AddressSanitizer yang lebih baik, dan C++ Dynamic Debugging yang kini generally available sehingga build yang dioptimasi lebih mudah diperiksa. Satu catatan penting: dukungan `constexpr` untuk `<cmath>` dan `<cstdlib>` tidak ikut aktif hanya dengan `/std:c++23` — harus di-opt-in lewat `/Zc:cmath` — dan ejaan lama `/std:c++23preview` kini resmi deprecated.

Pandangan PMA: ini rilis yang paling berharga justru karena membosankan — LTS, bukan pamer fitur. Tim C++ yang selama ini menahan diri di mode preview akhirnya punya baseline yang didukung jangka panjang untuk menulis C++23 sungguhan, bukan sekadar mencoba. Tapi perhatikan dua jebakan kecilnya: `constexpr cmath` yang harus diaktifkan manual, dan fakta bahwa lifecycle MSVC dan Visual Studio itu terpisah — update IDE tidak otomatis berarti toolset ikut diperbarui. Kalau kamu masih di toolset lama, cek dulu konfigurasi CMake atau Platform Toolset-mu, lalu naik ke 14.52 dan nyalakan `/std:c++23` di satu proyek non-kritis dulu sebelum menyebar ke seluruh codebase. Compiler yang stabil itu bukan yang paling baru — yang paling baru dan tetap kamu pakai setahun kemudian.
