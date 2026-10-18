---
id: "062"
date: "18 OCT 2026"
tag: "AI & TECHNOLOGY / RESEARCH"
category: "AI & TECHNOLOGY"
title: "Claude Cracked a 25-Year NSA Mystery in 30 Minutes"
excerpt: "Anthropic's Claude traced the unexplained seeds behind NIST's ECDSA curves to a 1990s C random-number generator fed with clock timestamps — ending 25 years of backdoor suspicion in under half an hour."
source: "The Decoder"
url: "https://the-decoder.com/anthropics-claude-cracks-a-25-year-old-nsa-cryptography-mystery-in-under-30-minutes/"
tags: ["Anthropic", "Claude", "NSA", "NIST", "ECDSA", "cryptography", "lrand48"]
hashtags: ["#Anthropic", "#Claude", "#NSA", "#Cryptography", "#AIResearch"]
---

Anthropic mengumumkan bahwa Claude baru saja memecahkan misteri kriptografi yang bikin para kriptografer garuk-garuk kepala selama 25 tahun — dalam waktu kurang dari 30 menit. Masalahnya: pada tahun 2000, NIST menstandardisasi kurva elliptic-curve ECDSA dengan seed yang disuplai NSA tanpa penjelasan asal-usulnya sama sekali. Seed itu adalah titik awal pembangkitan parameter kurva yang kini melindungi sebagian besar internet, dan ketiadaan penjelasan memicu kecurigaan bertahun-tahun bahwa NSA sengaja menyisipkan backdoor. Misterinya sampai menarik bounty $36.864 dan upaya detektif amatir — tidak ada yang berhasil menjawabnya. Almarhum pegawai NSA Jerry Solinas pernah berspekulasi seed itu adalah hash dari frasa humor internal ("beri Bob dan Jerry kenaikan gaji"), tapi tebakan itu ternyata salah.

Claude menemukan jawabannya bukan dari teori konspirasi, melainkan dari pola statistik yang membosankan: bit-bit teratas di beberapa seed secara sistematis selalu nol. Itu sidik jari khas lrand48 — generator bilangan acak sederhana dari pustaka C yang hanya mengeluarkan 31 bit. Dengan menguji Unix timestamp dari Mei 1997 hingga April 1998, Claude menunjukkan NSA menginisialisasi lrand48 dengan jam komputer waktu itu; seed kurva P-256 yang paling terkenal ternyata kandidat ke-1.842 dari generator tersebut. Yang membuat temuan ini kuat: jawabannya bisa direproduksi siapa pun, cukup menjalankan ulang generatornya. Menurut Anthropic, ini membuat skenario backdoor sengaja jauh lebih tidak masuk akal — meski ada ujung longgar yang belum terjawab, seperti kenapa kandidat lain dilewati, seed kurva biner B-163, dan asal base point beberapa kurva. Bounty-nya didonasikan ke Internet Security Research Group, nonprofit di balik Let's Encrypt.

Pandangan PMA: jangan terkecoh sama romantisme "misteri 25 tahun" — pelajaran sebenarnya adalah Claude menang bukan karena dia "pintar", tapi karena dia punya kebiasaan memeriksa hal membosankan yang manusia lewati: statistik dasar data. Pola "bit atas selalu nol" adalah jenis anomali yang selama ini jadi pintu masuk forensik paling murah — berlaku juga di log server-mu, di data transaksi yang mencurigakan, di parameter konfigurasi yang "katanya random". Kalau kamu builder, terapkan pola kerjanya: beri model tugas forensik terstruktur ("temukan generator di balik angka-angka ini") dan dia bisa jadi analis data lini pertama yang tidak pernah bosan menghitung. Dan satu pelajaran transparansi dari NSA: diam 25 tahun soal asal parameter publik itu yang menciptakan teori backdoor — jawaban yang bisa direproduksi siapa pun adalah penawarnya. Trust tidak dibangun dari otoritas, tapi dari verifiability.
