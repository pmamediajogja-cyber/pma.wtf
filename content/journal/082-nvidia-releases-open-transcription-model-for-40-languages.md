---
id: "082"
date: "29 OCT 2026"
tag: "AI & TECHNOLOGY / OPEN VOICE MODEL"
category: "AI & TECHNOLOGY"
title: "Nvidia Releases Open Transcription Model for 40 Languages"
excerpt: "Nvidia has released Nemotron 3.5 Transcribe, a free open-weight model that transcribes audio in up to 40 languages, separates up to eight speakers, and runs on a single chip — plus version 2 of its open Granary speech dataset."
source: "TechCrunch"
url: "https://techcrunch.com/2026/10/28/voice-ai-in-vogue-nvidia-releases-new-open-transcription-model/"
tags: ["Nvidia", "Nemotron 3.5 Transcribe", "speech transcription", "open-weight AI", "voice AI", "Granary", "NeMo Speech"]
hashtags: ["#Nvidia", "#Nemotron", "#VoiceAI", "#Transcription", "#OpenSource"]
---

Nvidia merilis Nemotron 3.5 Transcribe pada Rabu 28 Oktober 2026, model transkripsi gratis berbobot terbuka yang mengubah audio menjadi teks dalam hingga 40 bahasa. Bersamaan dengan itu, Nvidia merilis versi 2 Granary, dataset ucapan open source-nya. Menurut Nvidia, model ini bisa menerjemahkan 31 bahasa ke dan dari bahasa Inggris, menangani rekaman hingga satu jam, dan membedakan hingga delapan pembicara dalam satu rekaman — dengan klaim mengungguli rival di benchmark, termasuk Open ASR Leaderboard milik Hugging Face.

Sasaran model ini jelas: developer yang membangun aplikasi untuk rapat bisnis dan transkripsi medis, dua tempat AI suara sudah paling mapan di dunia kerja. Nvidia mengatakan developer bisa memakai model ini bersama dataset Granary yang diperbarui dan tool NeMo Speech untuk menyesuaikan aplikasi agar mengenali jargon industri di tiap bahasa. Ada satu batasan yang diakui terang-terangan: Transcribe bekerja untuk audio rekaman, bukan livestream. Sebagai gantinya, model 30 miliar parameter ini diklaim bisa berjalan di satu chip saja, dari kontroler robotika Jetson AGX Thor dan chip DGX Spark untuk laptop baru, hingga chip datacenter Blackwell — bergabung dengan lini model suara open-weight Nvidia, termasuk Parakeet yang hanya 1,1 miliar parameter. Rilis ini datang di tengah rentetan peluncuran AI suara, dari Voxtral 3 milik Mistral awal bulan ini, Realtime dari ElevenLabs, hingga Launa-Omni dari Salesforce.

Pandangan PMA: yang paling menarik dari rilis ini bukan angka 40 bahasanya, melainkan kombinasinya — model terbuka, dataset terbuka, dan bisa jalan di satu chip. Itu mengubah transkripsi dari layanan berlangganan yang datanya harus dikirim ke server orang lain menjadi komponen yang bisa dipasang sendiri di dalam produk, termasuk untuk rapat dan rekaman medis yang sensitif. Pelajaran praktisnya buat builder kecil: sebelum membayar API transkripsi per menit, uji dulu model open-weight seperti ini untuk kebutuhanmu, lalu ukur di audionamamu sendiri — aksen, jargon, dan audio berisik — karena klaim benchmark tidak pernah sama dengan rekaman rapatmu yang sebenarnya. Dan batasan "bukan livestream" justru penanda kejujuran yang bagus: alat yang tahu batasnya lebih bisa dipercaya daripada alat yang mengklaim bisa segalanya.
