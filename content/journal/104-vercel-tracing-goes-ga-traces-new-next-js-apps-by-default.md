---
id: "104"
date: "10 NOV 2026"
tag: "BUILD / TECH / OBSERVABILITY"
category: "BUILD / TECH"
title: "Vercel Tracing Goes GA, Traces New Next.js Apps by Default"
excerpt: "Vercel Tracing is now generally available on all plans with a new Traces page, KQL search in the dashboard and CLI, longer retention — and new Next.js 16.5 projects get 100% request tracing turned on automatically."
source: "Vercel"
url: "https://vercel.com/changelog/vercel-tracing-is-now-generally-available"
tags: ["Vercel", "Vercel Tracing", "Next.js 16.5", "observability", "KQL", "serverless"]
hashtags: ["#Vercel", "#Nextjs", "#Observability", "#DevTools", "#BuildTech"]
---

Vercel mengumumkan Tracing kini generally available di semua paket — Hobby, Pro, dan Enterprise — lengkap dengan halaman Traces baru di dashboard yang menampilkan semua trace dan span dalam satu tempat, untuk satu proyek atau seluruh tim. Kamu bisa berpindah antara daftar Spans dan Traces, memfilter keduanya, dan mencari dengan Kibana Query Language (KQL), plus mode Live yang mengalirkan trace baru saat masuk. Query seperti `span.name:db* AND span.duration > 500` langsung mempersempit ke span database yang lambat, dan semua itu juga bisa dijalankan dari CLI: `vercel traces search --query 'span.duration > 2000'`, `vercel traces search --status error --since 1h`, sampai `vercel traces inspect <request-id>` untuk membedah satu request.

Perubahan yang paling besar justru bukan di dashboard, melainkan di default-nya. Mulai Next.js 16.5, proyek baru yang dibuat di Vercel dan punya setidaknya satu Node.js function langsung mendapat tracing setelah build pertama yang sukses — tanpa setup apa pun. Vercel menambahkan satu sampling rule yang merekam 100% request di semua environment dan menyuntikkan instrumentasi saat build, sehingga trace sudah berisi span framework Next.js sejak awal. Kalau tidak mau, opt-out-nya manual: hapus semua sampling rule di Settings → Tracing. Retensinya juga ikut naik — Hobby dari 1 jam jadi 3 hari, Pro dari 1 hari jadi 14 hari, Enterprise dari 3 hari jadi 14 hari — sementara harganya tidak berubah dari masa beta.

Pandangan PMA: observability yang menyala sendiri adalah default yang benar — kebanyakan bug lambat baru ketahuan setelah insidennya lewat, dan saat itu log sudah tidak cukup. Yang perlu diingat: tracing otomatis ini hanya berlaku untuk proyek baru; proyek lama tetap harus menambahkan sampling rule sendiri, jadi jangan mengira semua aplikasimu tiba-tiba terlacak. Dan 100% sampling itu bukan gratis secara konseptual — trace adalah data, jadi periksa apa yang terekam sebelum membiarkannya berjalan di production. Buat pengguna Hobby, retensi 3 hari akhirnya membuat tracing berguna untuk mengusut insiden kemarin, bukan cuma yang baru saja terjadi. Pakai KQL untuk satu pertanyaan spesifik — span apa yang paling lambat, error apa yang paling sering — dan jangan jadikan dashboard trace sebagai pengganti alert yang baik.
