---
id: "061"
date: "17 OCT 2026"
tag: "CYBERSECURITY / ZERO-DAY"
category: "CYBERSECURITY"
title: "Palo Alto's PAN-OS Zero-Day: Root Access Behind the Login"
excerpt: "Palo Alto Networks confirmed attackers are actively exploiting CVE-2026-0322, a code-injection flaw that gives authenticated attackers root code execution on PAN-OS firewalls — and CISA gave federal agencies until October 17 to mitigate."
source: "BleepingComputer"
url: "https://www.bleepingcomputer.com/news/security/palo-alto-networks-warns-of-pan-os-rce-flaw-exploited-in-attacks/"
tags: ["CVE-2026-0322", "PAN-OS", "Palo Alto Networks", "RCE", "firewall", "CISA KEV", "zero-day"]
hashtags: ["#PaloAlto", "#PANOS", "#CVE20260322", "#ZeroDay", "#Firewall"]
---

Palo Alto Networks merilis security advisory pada Rabu, 14 Oktober 2026, untuk CVE-2026-0322 — zero-day RCE di PAN-OS yang menurut perusahaan sudah dieksploitasi di alam liar. Celahnya adalah code injection (CWE-94) di management interface dengan skor CVSS 4.0 sebesar 8.6 dan urgency remediasi tertinggi: penyerang yang sudah terautentikasi dengan akses jaringan ke management interface bisa menjalankan kode arbitrer sebagai root. Yang terdampak adalah PA-Series dan VM-Series firewall plus Panorama di virtual system dan M-Series appliance — Cloud NGFW dan Prisma Access dinyatakan aman. Palo Alto memakai frasa "very limited exploitation" untuk menggambarkan serangan yang terlihat; penemunya adalah peneliti internal mereka sendiri, Suraj Siddharudh. Perusahaan juga mempublikasikan tiga alamat IP yang terlihat mengeksploitasi celah ini — 66.42.72[.]14, 208.83.239[.]114, dan 149.248.47[.]234 — agar defender bisa hunting di log mereka. Patch sudah tersedia untuk PAN-OS 10.2, 11.1, 11.2, 12.1, dan 12.2 (dengan 11.2.16 menyusul 15 Oktober), dan CISA langsung memasukkannya ke katalog Known Exploited Vulnerabilities dengan tenggat mitigasi 17 Oktober untuk instansi federal AS.

Yang bikin celah ini serius bukan skornya, melainkan lokasinya: ini firewall-nya sendiri. Root di perangkat yang menjaga perimeter berarti penyerang memegang kendali penuh atas penjaga gerbang — bisa mengintip, memanipulasi, atau membuka jalan ke jaringan internal. Syarat "authenticated" memang menahan kepanikan sedikit, tapi jangan terlalu tenang: kredensial admin yang bocor itu komoditas murah di pasar infostealer dan phishing, dan management interface yang terekspos ke internet adalah masalah berulang di PAN-OS — awal tahun ini CVE-2025-0108 juga diserang lewat jalur yang sama. Kabar buruknya: tidak ada workaround yang diketahui. Satu-satunya jalan adalah upgrade ke versi yang sudah diperbaiki; pelanggan Threat Prevention hanya dapat perlindungan signature yang terbatas — kata Palo Alto sendiri, pola serangan varian baru bisa lolos deteksi.

Pandangan PMA: firewall yang management interface-nya bisa dijangkau dari internet itu seperti brankas yang kuncinya digantung di pintunya. Exploit-nya butuh login admin? Itu bukan pengaman, itu cuma antrean — antrean yang bisa dibeli lewat credential dump seharga kopi. Pelajaran praktisnya berlaku jauh di luar PAN-OS: management plane tidak boleh menghadap internet, titik. Kalau kamu tidak bisa patch hari ini juga, minimal kunci akses management ke IP internal tepercaya atau lewat jump box, lalu audit log untuk tiga IP yang dipublikasikan Palo Alto. Dan ini bukan nasihat untuk enterprise saja — admin panel router, NAS, DVR CCTV, sampai wp-admin yang diekspos ke publik adalah pintu masuk termurah yang sama. Patch perangkat edge itu emergency change, bukan agenda maintenance bulanan.
