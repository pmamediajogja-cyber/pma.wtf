---
id: "043"
date: "08 OCT 2026"
tag: "CYBERSECURITY / VULNERABILITY"
category: "CYBERSECURITY"
title: "Atlassian Data Center Flaw Reads Files Without Login"
excerpt: "Atlassian disclosed CVE-2026-21589, a critical CVSS 9.3 vulnerability letting unauthenticated attackers read files from self-hosted Jira, Confluence, Bitbucket and Bamboo Data Center instances."
source: "Help Net Security"
url: "https://www.helpnetsecurity.com/2026/10/06/atlassian-data-center-cve-2026-21589/"
tags: ["Atlassian", "CVE-2026-21589", "Jira", "Confluence", "Data Center vulnerability", "file access", "patch"]
hashtags: ["#Atlassian", "#CVE202621589", "#Cybersecurity", "#Jira", "#Confluence", "#PatchNow"]
---

Atlassian mengeluarkan advisory darurat pada 5 Oktober 2026 untuk CVE-2026-21589 — celah Arbitrary File Access dengan skor CVSS 9.3 yang menghantam seluruh portofolio self-hosted Data Center: Jira Software, Jira Service Management, Confluence, Bitbucket, Bamboo, Crowd, hingga Crucible dan Fisheye. Celah ini memungkinkan penyerang tanpa autentikasi membaca file tertentu di dalam web application root, cukup dengan mengetahui nama dan path file-nya — dilaporkan Help Net Security pada 6 Oktober 2026. Tidak perlu daftar, tidak perlu login; koneksi jaringan ke instance yang terekspos sudah cukup.

Risikonya tidak main-main. Di banyak deployment, web root menyimpan string koneksi database, kredensial LDAP bind, file konfigurasi aplikasi, bahkan token service account CI/CD. Satu file yang bocor bisa membuka pintu ke seluruh infrastruktur. Atlassian merilis versi patch untuk semua produk terdampak — dari Bitbucket 9.4.26 hingga Crowd 7.2.4 — dan menyarankan admin memutus akses internet instance sampai patching selesai. Sisi baiknya: Atlassian Cloud sudah dipatch otomatis, belum ada bukti eksploitasi aktif, dan penyerang tidak bisa melist isi direktori, hanya membaca file yang path-nya sudah diketahui.

Pandangan PMA: celah seperti ini adalah pengingat paling jujur bahwa self-hosted bukan berarti self-secured. Banyak tim menaruh Jira dan Confluence di internet tanpa sadar itu sekarang permukaan serangan — dan vulnerability-nya tidak perlu exploit canggih, cukup URL yang tepat. Kalau instance internalmu bisa diakses publik tanpa WAF atau VPN, pertanyaan hari ini bukan "sudah patch?", tapi "kenapa dari awal dihadapkan ke internet?" Patching adalah wajib, tapi mengurangi eksposur adalah pelajaran yang lebih murah.
