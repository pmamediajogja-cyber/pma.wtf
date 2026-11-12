---
id: "107"
date: "12 NOV 2026"
tag: "AI & TECHNOLOGY / AI HARDWARE"
category: "AI & TECHNOLOGY"
title: "Google Adds TPU 8tx and 8i Max for the Agentic Era"
excerpt: "Google expands its eighth-generation TPU lineup with TPU 8tx for confidential inference and TPU 8i Max for massive context windows — four new TPU systems in a single year, all built for the age of autonomous agents."
source: "Google"
url: "https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/tpu-8i-max-and-8tx/?ref=thehype.news"
tags: ["Google", "TPU", "TPU 8tx", "TPU 8i Max", "AI infrastructure", "agentic AI", "AMD EPYC"]
hashtags: ["#AI", "#Google", "#TPU", "#AIHardware", "#AgenticAI"]
---

Google mengumumkan dua sistem TPU generasi kedelapan baru pada 9 November 2026: TPU 8tx untuk inferensi rahasia dan TPU 8i Max untuk context window raksasa. Dengan tambahan ini, Google meluncurkan empat sistem TPU dalam satu tahun — pertama kalinya dalam sejarah perusahaan. Generasi kedelapan sendiri dimulai April lalu di Google Cloud Next dengan TPU 8t untuk training skala besar dan TPU 8i untuk reasoning real-time; dua sistem baru ini melengkapi portofolio itu untuk dua masalah yang muncul begitu agen otonom masuk production: data sensitif dan konteks jutaan token.

TPU 8tx dibangun di atas silikon yang sama dengan 8t, dipasangkan dengan host CPU AMD EPYC generasi kelima, dan menanam keamanan langsung di lapisan hardware — data dan bobot model tetap terlindungi dan terisolasi bahkan saat sedang aktif dipakai, bukan cuma saat disimpan atau dikirim. Dengan jaringan Boardfly yang sama seperti 8i, latensinya diklaim hingga 2x lebih rendah dari 8t dengan penalti performa hampir nol, dan satu sistem yang sama bisa dipakai untuk fine-tuning dengan data privat, distilasi model, sampai reinforcement learning tanpa memindahkan data sensitif antar klaster. TPU 8i Max menyerang sisi lain: dua chip 8i digabung dalam satu paket, menghasilkan 2x compute, 2x SRAM, dan 2x bandwidth HBM dibanding 8i, dalam footprint rak yang sama — dirancang untuk puluhan agen yang bekerja bersama di seluruh codebase atau video berjam-jam. Google juga membuka tumpukan softwarenya: TorchTPU open-source, TPU agent suite dalam preview, Agent Compute Engine, TPU Sync yang di-open-source, serta Cloud Pathways dan GKE dynamic slicing yang kini generally available. Yang belum ada: harga dan tanggal ketersediaan — laporan media menyebut keduanya baru tersedia tahun depan.

Pandangan PMA: yang menarik dari pengumuman ini bukan angka "2x"-nya, melainkan arahnya — Google berhenti menjual chip dan mulai menjual satu sistem untuk tiap tahap lifecycle agen: training, reasoning, rahasia, dan konteks besar. Buat yang membangun agen, itu tepat sasaran: data sensitif dan konteks jutaan token adalah dua masalah nyata di production, bukan angka benchmark. Tapi ingat, ini pengumuman, bukan produk yang bisa dibeli — tanpa harga, tanpa tanggal, tanpa benchmark independen — jadi jangan masukkan ke rencana kapasitas 2027. Pelajaran praktisnya: kalau workload-mu agen yang bekerja dengan data rahasia atau konteks besar, arsitektur yang memisahkan keamanan dan memori sejak awal jauh lebih penting daripada sekadar mengejar chip tercepat.
