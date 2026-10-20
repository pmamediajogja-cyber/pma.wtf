---
id: "066"
date: "20 OCT 2026"
tag: "CYBERSECURITY / ZERO-DAY"
category: "CYBERSECURITY"
title: "China Robbed the Password Vault Itself: The BeyondTrust Zero-Day"
excerpt: "A Chinese state-backed group exploited a critical zero-day in BeyondTrust Remote Support for seven weeks before disclosure — and because it's a privileged-access tool, one breached appliance meant every system it managed."
source: "TechTimes"
url: "https://www.techtimes.com/articles/329204/20261019/china-hacked-beyondtrust-enterprise-vaults-zero-day-active-seven-weeks.htm"
tags: ["BeyondTrust", "zero-day", "CVE-2026-102764", "Armory Castle", "privileged access management", "China espionage", "Mandiant"]
hashtags: ["#Cybersecurity", "#ZeroDay", "#BeyondTrust", "#InfoSec", "#Ransomware"]
---

Grup spionase China yang dilacak Google dan Mandiant sebagai Armory Castle (dulu UNC5221 / Warp Panda) mengeksploitasi zero-day kritis CVE-2026-102764 di BeyondTrust Remote Support — tool Privileged Access Management (PAM) yang dirancang jadi master record akses privileged enterprise. Celahnya baru diungkap publik 15 Oktober 2026, tapi eksploitasi sudah berjalan sejak 29 Agustus: tujuh minggu senyap, melintasi credential vault, menanam persistence, dan membangun tunnel yang tak terlihat dari scan eksternal. Ironinya brutal: sekali attacker mendapat root di appliance PAM, ia tidak "hanya" membobol satu server — ia memegang kunci ke setiap sistem yang dikelola appliance itu.

Yang membuat kasus ini istimewa bukan sekadar skor CVSS 9.3-nya. Teknisnya presisi: dalam ~11 menit setelah weaponization, mereka menanam webshell PHP SAWFLY, naik ke root dengan trik SUID klasik (copy /bin/sh dengan nama palsu mirip daemon sistem), lalu memakai `bt-secrets` — CLI resmi milik BeyondTrust sendiri — untuk menyedot seluruh isi vault, sebelum menghapus log. Backdoor `zz-root-persist` yang mereka tanam bahkan survive reboot dan reset konfigurasi; saran resmi Mandiant: jangan coba dibersihkan, rebuild dari image bersih. Yang paling pahit: sensor monitoring BeyondTrust sendiri sempat mendeteksi eskalasi privilege secara real-time, tapi platform triage pihak ketiga menolak alert itu sebagai false positive — biaya tiga minggu akses tak terdeteksi. Armory Castle adalah spesialis edge-device zero-day (Citrix NetScaler, Ivanti), dan polanya konsisten: setelah disclosure publik, mereka beralih dari target selektif ke mass exploitation. Lebih dari 1.400 appliance self-hosted masih bisa dijangkau internet saat disclosure.

Pandangan PMA: ini bukan cerita "patch terlambat", ini cerita arsitektur yang salah paham. Banyak tim menaruh semua kunci kerajaan — password, API key, token — dalam satu brankas digital pihak ketiga, lalu berasumsi brankasnya kebal karena ia "tool keamanan". BeyondTrust membuktikan sebaliknya: tool keamanan yang dieksploitasi justru senjata terbaik attacker, karena ia dipercaya penuh dan selalu diberi akses terdalam. Kalau appliance-mu internet-facing dan belum di-patch, berhenti bertanya "apakah kami terdampak" — asumsikan iya, lalu rebuild. Untuk tim kecil, pelajarannya murah dan pahit: verifikasi monitoring-mu end-to-end. Alert yang bisa di-dismiss otomatis oleh platform lain tanpa sepengetahuanmu adalah alert yang sudah mati sebelum dibaca.
