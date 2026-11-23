---
id: "127"
date: "23 NOV 2026"
tag: "AI & TECHNOLOGY / OPEN WEIGHTS"
category: "AI & TECHNOLOGY"
title: "Inkling 2 Mini Puts a 26B Looped Model on Your Laptop"
excerpt: "Thinking Machines Lab's Inkling 2 Mini is a 26B open-weights looped transformer that runs on a MacBook, matches Qwen3.8 27B on the Intelligence Index with roughly five times fewer active parameters, and costs about six times less per task."
source: "Artificial Analysis"
url: "https://artificialanalysis.ai/articles/inkling-2-mini"
tags: ["Inkling 2 Mini", "Thinking Machines Lab", "open weights", "looped transformer", "Mixture of Experts", "Artificial Analysis", "local AI"]
hashtags: ["#Inkling2Mini", "#ThinkingMachines", "#OpenWeights", "#LocalAI", "#AITechnology"]
---

Thinking Machines Lab merilis Inkling 2 Mini pada 20 November 2026: sebuah model open-weights berlisensi Apache 2.0 yang cukup kecil untuk dijalankan di laptop. Model ini adalah Mixture-of-Experts dengan 26,4 miliar parameter total, tapi hanya 3,4 miliar parameter yang aktif per token — triknya ada di arsitektur looped transformer: 12 dari 24 layer tengahnya dijalankan tiga kali untuk setiap token, sehingga kapasitas komputasi bertambah tanpa menambah bobot. Checkpoint-nya sekitar 20GB, cukup untuk MacBook dengan memori 32GB ke atas atau satu unit NVIDIA DGX Spark, dengan build GGUF lewat Unsloth dan llama.cpp serta dukungan di vLLM, SGLang, Ollama, dan Transformers. Model ini menerima input teks dan gambar, dengan context window 1 juta token.

Yang membuat rilis ini layak diperhatikan adalah skornya, bukan sekadar ukurannya. Artificial Analysis menempatkan Inkling 2 Mini di skor 20 pada Intelligence Index — setara dengan Qwen3.8 27B dan Nanbeige4.3-33B, tapi dengan aktif parameter sekitar lima sampai enam kali lebih sedikit. Per tugas, model ini sekitar enam kali lebih murah dan empat kali lebih cepat dari Qwen3.8 27B: $0,59 dan 9 menit berbanding $3,53 dan 38,2 menit. Thinking Machines juga mengklaim Mini memimpin semua model open-weights di bawah 100 miliar parameter pada DeepSWE v1.1 (48,2%) dan Vals Index v2.2 (46,5%). Harganya memang ada: model ini memakai sekitar 38% lebih banyak output token daripada Qwen3.8 27B untuk skor yang sama — looping itu murah di parameter, tapi tetap menghabiskan token.

Pandangan PMA: Inkling 2 Mini adalah bukti bahwa perlombaan model terbuka sudah pindah arena — dari siapa yang punya parameter terbanyak ke siapa yang paling pintar memakai parameter yang ada. Looping layer tengah tiga kali adalah ide yang elegan karena menyerang masalah yang tepat: model kecil yang bekerja lokal tidak butuh hafalan lebih banyak, dia butuh berpikir lebih lama atas input yang sama. Dan angka yang paling penting di sini bukan skor benchmark-nya, melainkan $0,59 per tugas di mesin sendiri: ketika model sekelas ini bisa jalan di laptop dengan lisensi Apache 2.0, alasan untuk mengirim setiap prompt ke API berbayar makin tipis — terutama buat coding agent dan pekerjaan dokumen yang tidak butuh model terbesar di dunia, hanya model yang cukup bagus dan selalu ada di tanganmu.
