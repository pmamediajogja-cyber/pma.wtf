---
id: "004"
date: "09 SEP 2026"
tag: "CYBERSECURITY / IDENTITY"
category: "CYBERSECURITY"
title: "A Passkey Can Become a Social Engineering Story"
excerpt: "Microsoft researchers describe active cloud intrusions where attackers abuse passkey-themed social engineering to manipulate identity and cloud access."
source: "Microsoft Security"
url: "https://www.microsoft.com/en-us/security/blog/2026/09/09/passkey-themed-social-engineering-leads-identity-cloud-compromise/"
tags: ["passkey security","identity security","social engineering","cloud security","MFA","Microsoft Security"]
hashtags: ["#Passkey","#IdentitySecurity","#SocialEngineering","#CloudSecurity","#MFA"]
---
Microsoft Security melaporkan kampanye intrusi cloud aktif yang memanfaatkan social engineering bertema passkey. Setelah memperoleh akses awal, attacker menambahkan metode autentikasi baru, melakukan aktivitas Microsoft Graph dalam volume tinggi, mengunduh data SharePoint dan OneDrive, serta mengumpulkan email melalui API.

Kasus ini menarik karena keamanan identitas tidak selesai ketika seseorang sudah menggunakan MFA atau passkey. Identity attack modern sering bergerak setelah login berhasil: attacker mencoba membuat authentication method baru, memperluas permission, lalu menggunakan API resmi sebagai jalur untuk mengambil data. Aktivitasnya bisa terlihat seperti tindakan pengguna yang sah.

Pandangan PMA: identity sekarang adalah perimeter. Perusahaan kecil sekalipun sebaiknya memperlakukan akun email, cloud storage dan admin console sebagai aset inti. MFA bukan akhir dari keamanan; session monitoring, privilege control dan deteksi perubahan authentication method sama pentingnya.
