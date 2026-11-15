---
id: "113"
date: "15 NOV 2026"
tag: "DESIGN LAB / 3D TRANSFORMS"
category: "DESIGN LAB"
title: "Figma Brings Native 3D Transforms to the Canvas"
excerpt: "Figma ships 3D transforms in open beta: rotate any layer on the X, Y, and Z axes, add depth and perspective, animate it in Figma Motion — and copy the matching CSS straight from Dev Mode."
source: "Teck Hustlers"
url: "https://teckhustlers.com/figma-3d-transforms/"
tags: ["Figma", "3D transforms", "design tools", "CSS", "Figma Motion", "Dev Mode", "product design"]
hashtags: ["#Figma", "#DesignTools", "#3DDesign", "#CSS", "#ProductDesign"]
---

Figma resmi membuka beta terbuka untuk 3D transforms pada 12 November 2026 — fitur yang sudah lama diminta pengguna dan sempat dipratinjau di Config 2026. 3D transform hadir sebagai efek baru di panel Effects, sejajar dengan drop shadow dan blur: pilih layer apa pun — vektor, gambar, frame, komponen, atau teks — lalu putar di sumbu X, Y, dan Z dengan handle langsung di canvas dan pratinjau live. Efek kedua, Perspective, dipasang di frame induk untuk memberi semua layer di dalamnya satu titik pandang yang sama, sementara Depth menggeser layer maju-mundur di sumbu Z. Semuanya non-destruktif: layer tetap bisa diedit, dan efeknya bisa disembunyikan atau dihapus kapan saja untuk kembali ke desain datar.

Yang membuat rilis ini lebih dari sekadar trik visual adalah rantai lengkapnya sampai ke kode. Layer 3D bisa dianimasikan dengan keyframe di Figma Motion — putaran kartu, perubahan depth, bahkan pergeseran perspektif di tengah animasi — dan Figma Motion sendiri baru saja mendapat update 10 November dengan physics-based springs dan pratinjau ekspor Lottie. Saat waktunya membangun, Dev Mode menyalin transformasi itu sebagai CSS standar: rotate, translateZ, perspective, dan transform-style. Coding agent yang terhubung lewat Figma MCP server pun bisa membaca dan membuat desain 3D, jadi eksplorasi di canvas tersambung langsung ke implementasi. Fitur ini tersedia untuk pengguna Full seat di semua paket, masih berstatus beta terbuka.

Pandangan PMA: ini Figma yang akhirnya berhenti berpura-pura bahwa desain datar cukup untuk web yang sudah lama bermain dengan kedalaman — dan mereka melakukannya dengan cara yang benar, yaitu menjaga hasil akhirnya tetap berupa CSS, bukan gambar mati. Mockup perangkat miring, kartu yang berputar, komposisi bertingkat: semua itu selama ini dikerjakan dengan plugin, trik skew, atau lempar ke Blender lalu impor balik sebagai gambar yang tidak bisa diedit. Sekarang trik itu ada di canvas, tetap bisa diedit, dan developer menerima kode yang bisa dipakai. Tapi ingat batasnya: ini bukan alat modeling 3D — tidak ada mesh, pencahayaan, atau model impor. Pakai untuk apa yang memang dikerjakan CSS di browser, bukan untuk menggantikan Blender. Dan karena masih beta, jangan jadikan satu-satunya andalan di file klien sampai perilakunya stabil — coba dulu di file playground, putar satu kartu, salin CSS-nya, dan lihat sendiri apakah handoff-nya sebersih janjinya.
