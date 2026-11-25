---
id: "131"
date: "25 NOV 2026"
tag: "CYBERSECURITY / VULNERABILITY"
category: "CYBERSECURITY"
title: "A Decade-Old Bug Let Attackers Run Commands on Hex.pm"
excerpt: "An attacker exploited CVE-2026-129514, a CVSS 10.0 deserialization flaw in hex.pm that sat unnoticed since 2016, to run commands on six of the Elixir package registry's web servers — and Hex can't rule out that account data was read."
source: "Hex Blog"
url: "https://hex.pm/blog/security-incident-on-hexpm"
tags: ["Hex.pm", "CVE-2026-129514", "Elixir", "Erlang", "deserialization", "RCE", "package registry"]
hashtags: ["#Hexpm", "#CVE2026129514", "#Elixir", "#Cybersecurity", "#RCE"]
---

Pada 23 November 2026, penyerang mengeksploitasi celah di hex.pm — registry paket untuk Elixir, Erlang, dan Gleam — dan menjalankan perintah di enam server web-nya. Celahnya, CVE-2026-129514 dengan skor CVSS 10.0, ada di cara hex.pm membaca body request berformat Erlang term: decoder-nya menolak fungsi dan atom baru, tapi membiarkan map dengan kunci `__struct__` lolos, sehingga penyerang bisa mengirim struct Elixir palsu yang kemudian dirangkai lewat pelaporan error (inspect), Ecto, dan DBConnection sampai menjadi eksekusi perintah sistem operasi. Yang paling mengkhawatirkan: celah itu sudah ada sejak 23 Februari 2016, ketika sebuah pengecekan keamanan dihapus dari decoder — lebih dari sepuluh tahun tanpa ketahuan. Penyerang mengirim 69 request antara pukul 18:16–18:29 UTC; Hex memblokir lewat firewall dan men-deploy build yang sudah diperbaiki dalam waktu sekitar 20 menit.

Kenapa ini penting: hex.pm adalah tulang punggung distribusi paket ekosistem Elixir — lebih dari 27.000 paket dengan 16 miliar unduhan. Hex tidak menemukan bukti paket dimodifikasi atau database diubah, tapi karena pembacaan database tidak tercatat di log, mereka tidak bisa memastikan penyerang tidak membaca data akun: alamat email, hash password (bcrypt), hash API key, secret 2FA, sesi, dan audit log. Semua kredensial infrastruktur sudah dirotasi dan semua pengguna dikeluarkan dari sesi, tapi kunci penanda registry (registry signing key) belum bisa dirotasi karena sistemnya belum mendukung — Hex meminta pengguna untuk sementara hanya mengambil paket dari repo.hex.pm dan tidak mempercayai mirror pihak ketiga. Investigasi yang sama juga menemukan celah sejenis di Ash, db_connection, dan flop — ketiganya sudah diperbaiki pada 24 November.

Pandangan PMA: yang paling menakutkan dari insiden ini bukan umur celahnya, tapi betapa biasanya rantai serangannya — decoder yang "cukup aman", logger error yang meng-inspect apa saja, dan hook log yang menjalankan tuple begitu saja. Setiap lapisan percaya pada lapisan sebelumnya, jadi tidak ada satu pun yang menahan serangan. Pelajaran praktisnya ada dua: pertama, kalau kamu punya akun hex.pm, ganti password dan reset 2FA sekarang juga, lalu login ulang client dengan `mix hex.user auth`; kedua, kalau kamu menjalankan layanan Elixir apa pun yang men-decode Erlang term dari client, cari `binary_to_term` di codebase-mu — opsi `[:safe]` tidak memblokir struct. Dan satu hal yang patut dicontoh dari Hex: laporannya jujur soal apa yang bisa dan tidak bisa mereka verifikasi, lengkap dengan timeline per menit — transparansi seperti ini yang membuat pengguna tetap percaya meski insidennya seburuk ini.
