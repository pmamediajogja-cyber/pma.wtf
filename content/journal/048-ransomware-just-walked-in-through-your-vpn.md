---
id: "048"
date: "11 OCT 2026"
tag: "CYBERSECURITY / RANSOMWARE"
category: "CYBERSECURITY"
title: "Ransomware Just Walked In Through Your VPN"
excerpt: "Qilin and Settra ransomware groups are exploiting a Palo Alto GlobalProtect authentication bypass to forge VPN sessions without credentials — and their traffic looks exactly like normal remote work, reported Cyber Security News."
source: "Cyber Security News"
url: "https://cybersecuritynews.com/palo-alto-globalprotect-flaw-vpn-access/"
tags: ["CVE-2026-0257", "GlobalProtect", "Palo Alto Networks", "ransomware", "Qilin", "VPN", "authentication bypass"]
hashtags: ["#CVE20260257", "#GlobalProtect", "#Ransomware", "#Qilin", "#VPN", "#Cybersecurity"]
---

Operasi ransomware Qilin dan Settra sedang aktif mengeksploitasi CVE-2026-0257, celah authentication bypass di Palo Alto Networks PAN-OS GlobalProtect dan Prisma Access — menurut threat update ReliaQuest pada 11 Oktober 2026, dilaporkan Cyber Security News. Penyerang memalsukan authentication override cookie yang tidak divalidasi integritasnya, lalu mendapatkan sesi VPN penuh tanpa satu pun kredensial yang valid. Dari sudut pandang jaringan, penyusup itu tampak persis seperti karyawan yang sedang remote working. Palo Alto pertama kali mengungkap celah ini pada 13 Mei 2026 dengan skor CVSS 7.8 (High); tidak semua deployment terdampak — hanya yang mengaktifkan auth override cookie dengan konfigurasi sertifikat tertentu, mencakup rilis PAN-OS 12.1, 11.2, 11.1, 10.2 dan Prisma Access 11.2/10.2.

Kenapa ini penting: VPN adalah pintu depan yang paling dipercaya perusahaan, dan celah ini menyerang justru kepercayaan itu. Begitu masuk, jejak yang diamati ReliaQuest sudah familiar — Cobalt Strike, BloodHound, SharpHound — alias rangkaian klasik pencurian kredensial, gerakan lateral, lalu deploy ransomware sebelum tim keamanan sadar penyusupnya ada. Satu detail yang sering dilewatkan: patching saja tidak mengusir sesi ilegal yang sudah terbentuk sebelum perbaikan. ReliaQuest menyarankan terminate semua sesi GlobalProtect aktif setelah patch, dan menyelidiki koneksi mencurigakan (misalnya device dengan hostname "kali") — bukan sebagai bukti kompromi, tapi sebagai petunjuk awal investigasi.

Pandangan PMA: serangan ini membalik logika dasar banyak tim SOC — bahwa koneksi VPN yang sukses berarti penggunanya sah. Ketika pintu depannya sendiri yang bocor, seluruh deteksi di dalamnya harus dipertanyakan ulang. Pelajaran praktisnya tiga: pertama, cookie yang berfungsi sebagai bearer token tanpa integrity check adalah pola berbahaya di mana pun kamu menemukannya — jangan hanya menunggu vendor menambalnya. Kedua, audit fitur convenience: auth override cookie cuma berguna di skenario tertentu, kalau tidak dipakai, matikan saja. Ketiga, setiap kali patching celah yang sudah dieksploitasi di alam bebas, selalu berasumsi penyerang sudah masuk duluan — kill semua session, cek maintenance release persisnya (bukan cuma versi mayor), baru tidur tenang.
