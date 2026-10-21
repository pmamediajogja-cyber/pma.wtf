---
id: "069"
date: "21 OCT 2026"
tag: "BUILD / TECH / OPEN SOURCE"
category: "BUILD / TECH"
title: "Google Frees TorchTPU to Loosen Nvidia's PyTorch Grip"
excerpt: "Google has open-sourced TorchTPU, letting existing PyTorch apps run on its TPUs with a simple configuration change — one day after Amazon did the same for Trainium with TorchNeuron."
source: "TechCrunch"
url: "https://techcrunch.com/2026/10/20/google-has-joined-amazon-in-attacking-nvidias-stronghold-with-ai-app-developers/"
tags: ["TorchTPU", "Google", "PyTorch", "Nvidia", "TPU", "open source", "AI infrastructure"]
hashtags: ["#BuildTech", "#OpenSource", "#PyTorch", "#Google", "#Nvidia"]
---

Google resmi meng-open-source-kan TorchTPU, versi PyTorch buatannya untuk chip Tensor Processing Unit (TPU) miliknya sendiri. Pengumuman pada Selasa, 20 Oktober 2026 ini datang hanya sehari setelah Amazon merilis TorchNeuron, versi PyTorch untuk chip Trainium-nya — dua raksasa cloud yang tiba-tiba bergerak berbarengan untuk satu target yang sama: dominasi Nvidia di dunia pengembangan AI. TorchTPU memungkinkan aplikasi PyTorch yang sudah ada untuk berjalan di TPU, dan pindah ke Google Cloud, hanya lewat perubahan konfigurasi sederhana tanpa menulis ulang aplikasi.

Ini penting karena PyTorch bukan sekadar framework populer — menurut TechCrunch, toolkit ini dipakai oleh sekitar 85% aplikasi AI. PyTorch awalnya dikembangkan Meta pada 2016, saat GPU Nvidia sudah menjadi standar riset AI, sehingga banyak fiturnya dibangun khusus untuk Nvidia; sejak 2022 proyek ini dikelola Linux Foundation. Google mencoba memutus ketergantungan itu dari sisi praktis: bekerja langsung dengan Meta, Hugging Face, Inferact (pembuat vLLM), dan RadixArk (pembuat SGLang) agar TorchTPU bekerja baik dengan tool-tool yang sudah dipakai developer, plus meluncurkan TPU agent suite untuk membantu migrasi dan memperbaiki error, serta memperbarui LiteRT agar aplikasi PyTorch berjalan lebih baik di ponsel, laptop, dan perangkat embedded. Amazon bahkan melangkah lebih jauh dengan mengajukan kode ke proyek PyTorch utama untuk melepaskan berbagai fiturnya dari ketergantungan chip Nvidia.

Pandangan PMA: perang chip AI ternyata tidak dimenangkan di pabrik semikonduktor saja, tapi di lapisan yang paling membosankan sekaligus paling menentukan: kompatibilitas. Selama pindah chip berarti menulis ulang kode, developer akan tetap di Nvidia bukan karena cinta, tapi karena malas menanggung biaya migrasi — dan Google serta Amazon paham betul itu. Pelajaran praktisnya untuk tim kecil: jangan mengunci stack-mu ke satu vendor hanya karena "saat ini paling mudah"; setiap abstraksi yang membuat kodemu portabel — konfigurasi, bukan rewrite — adalah asuransi yang baru terasa nilainya saat vendor itu menaikkan harga atau antreannya memanjang. TorchTPU belum tentu membuat semua orang meninggalkan Nvidia besok, tapi ia membuat pertanyaan "pindah ke mana?" akhirnya punya jawaban yang murah untuk dicoba.
