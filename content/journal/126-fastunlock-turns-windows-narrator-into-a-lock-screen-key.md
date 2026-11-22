---
id: "126"
date: "22 NOV 2026"
tag: "CYBERSECURITY / ZERO-DAY"
category: "CYBERSECURITY"
title: "FastUnlock Turns Windows Narrator Into a Lock Screen Key"
excerpt: "A new Windows zero-day called FastUnlock turns the built-in Narrator screen reader into a way past the lock screen of a fully patched, BitLocker-encrypted Windows 11 machine — with a keyboard and a USB stick, and no patch until December."
source: "TechSpot"
url: "https://www.techspot.com/news/114655-new-windows-zero-day-reportedly-gets-past-bitlocker.html"
tags: ["FastUnlock", "Windows 11", "Narrator", "BitLocker", "lock screen", "zero-day", "Abdelhamid Naceri"]
hashtags: ["#FastUnlock", "#Windows11", "#BitLocker", "#ZeroDay", "#Cybersecurity"]
---

Peneliti keamanan Abdelhamid Naceri — yang juga dikenal sebagai Chaotic Eclipse dan MSNightmare — mempublikasikan FastUnlock pada 19 November 2026: sebuah zero-day Windows 11 yang menyalahgunakan Narrator, screen reader bawaan Windows, untuk menjalankan kode dari lock screen sebelum ada pengguna yang login. Rantai serangannya dimulai dari layar "I forgot my PIN": menekan Win+U menyalakan Narrator, yang mendarat di sebuah jendela tersembunyi miliknya sendiri; dengan Caps Lock dan tombol panah, penyerang menavigasi jendela tak terlihat itu sampai ke pengaturan Narrator, lalu lewat AutoPlay dan sebuah USB stick mencapai File Explorer dan file pengguna. Naceri mengklaim hanya butuh lima menit untuk menembus mesin Windows 11 26H2 yang sudah terpasang patch November 2026 dan enkripsi BitLocker aktif — dan menurutnya teknik ini bekerja di setiap mesin yang ia coba.

Akar masalahnya ada di antarmuka Narrator yang didesain ulang tanpa dibatasi hanya untuk sesi yang sudah login. Narrator berjalan di bawah WsiAccount, akun yang menjalankan lock screen dan seharusnya terisolasi dari sistem — tapi justru memberi jalan eksekusi kode. Yang perlu diluruskan: FastUnlock tidak memecahkan enkripsi BitLocker. Pada setup TPM-only yang paling umum, drive sudah terbuka otomatis saat boot, jadi ketika lock screen muncul file memang sudah bisa dibaca; yang dijebol adalah asumsi bahwa lock screen tidak bisa menjadi pintu masuk. Batasannya juga nyata: butuh akses fisik ke mesin, butuh setidaknya satu akun yang terhubung ke akun Microsoft — perangkat yang hanya memakai akun lokal tidak terdampak — dan yang didapat penyerang adalah akun terbatas WsiAccount, bukan admin. Sampai sekarang belum ada CVE, advisory, maupun patch dari Microsoft; perusahaan keamanan ThreatLocker sudah mereproduksi teknik ini pada 19 November dan mengonfirmasi cara kerjanya. Mitigasi sementara yang disarankan: pasang BitLocker startup PIN, matikan atau hibernasi laptop alih-alih sekadar menguncinya, atau blokir Narrator lewat AppLocker.

Pandangan PMA: yang menakutkan dari FastUnlock bukan kecanggihannya — justru sebaliknya, ini serangan yang nyaris tanpa malware, tanpa pencurian kredensial, tanpa bug memory corruption, hanya fitur aksesibilitas yang lupa dikurung di konteks yang benar. Dan itu pelajaran yang lebih besar daripada satu patch: setiap hal yang bisa dijalankan dari lock screen adalah bagian dari permukaan serangan, bukan pengecualian. BitLocker tetap bekerja sebagai enkripsi, tapi enkripsi tidak ada gunanya kalau kuncinya sudah dimuat ke memori dan pintunya dibiarkan terbuka. Buat pengguna biasa, nasihatnya membosankan tapi benar: jangan tinggalkan laptop yang menyala dan terkunci di tempat yang tidak kamu kendalikan — dan kalau laptopmu menyimpan hal penting, startup PIN itu lima detik yang layak dibayar setiap boot.
