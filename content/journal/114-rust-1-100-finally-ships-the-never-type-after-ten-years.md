---
id: "114"
date: "15 NOV 2026"
tag: "BUILD / TECH / LANGUAGE RELEASE"
category: "BUILD / TECH"
title: "Rust 1.100 Finally Ships the Never Type After Ten Years"
excerpt: "Rust 1.100.0 lands with the never type finally stable after a decade and five failed attempts, a core Allocator API, DropGuard, and Cargo dependency cooldowns that make supply-chain attacks harder to slip through."
source: "Rust Blog"
url: "https://blog.rust-lang.org/2026/11/12/Rust-1.100.0/"
tags: ["Rust 1.100", "Rust", "never type", "Cargo", "programming languages", "systems programming", "Allocator API"]
hashtags: ["#Rust", "#RustLang", "#Programming", "#Cargo", "#SystemsProgramming"]
---

Tim Rust merilis Rust 1.100.0 pada 12 November 2026, dan headline-nya adalah sesuatu yang sudah ditunggu satu dekade: never type akhirnya stabil. Setelah 10 tahun dan lima kali percobaan stabilisasi yang gagal, tipe `!` — tipe untuk komputasi yang tidak pernah menghasilkan nilai, seperti `return` atau `process::exit` — kini bisa ditulis di mana saja dalam kode, bukan cuma di posisi return. `Result<T, !>` yang dulu ditolak compiler kini valid, dan `Infallible` resmi menjadi alias dari `!`, sehingga semua API lama yang memakai `Infallible` langsung kompatibel. Rilis ini juga menstabilkan bagian inti Allocator API — trait `Allocator` yang memungkinkan library author mendefinisikan custom allocator untuk `Vec` dan `Box` — serta `DropGuard`, helper kecil yang menjalankan closure saat variabel keluar dari scope, lengkap dengan `dismiss` untuk pola rollback ala transaksi.

Cargo ikut mendapat tiga peningkatan yang langsung terasa di proyek sehari-hari. Yang paling menarik adalah min-publish-age, alias dependency cooldown: dengan `global-min-publish-age = "3 days"` di `.cargo/config.toml`, Cargo melewati versi crate yang baru terbit kurang dari tiga hari dan memberi tahu apa yang ditahan — pertahanan praktis melawan paket berbahaya yang biasanya ketahuan dalam hitungan jam atau hari setelah terbit. Cargo kini juga memperingatkan dependensi yang tidak terpakai lewat sistem lint baru di `[lints.cargo]`, dan mengurangi tabrakan cache antar konfigurasi build. Satu catatan penting: rilis ini mengubah never-type fallback dari `()` menjadi `!` di edisi sebelum 2024, yang bisa membuat compiler menandai lebih banyak kode sebagai unreachable — sebagian besar tidak terasa, tapi patut dicek saat upgrade.

Pandangan PMA: angka 1.100 memang terlihat seperti tonggak seremonial, tapi isinya justru rilis yang sangat praktis — tiga fitur yang masing-masing menyelesaikan rasa sakit nyata, bukan sekadar kosmetik. Yang paling patut ditiru adalah min-publish-age: daripada menunggu registry membersihkan paket jahat, Cargo memberi jeda agar komunitas sempat menemukannya dulu — pertahanan murah yang seharusnya sudah lama ada di semua package manager. Tapi jangan buta soal breaking change fallback `!` itu: jalankan `cargo update` dan build penuh di CI sebelum menaikkan versi di proyek produksi, karena peringatan unreachable code baru bisa muncul di tempat yang tidak diduga. Dan kalau kamu masih di edisi 2021, ini momen yang tepat untuk pindah ke edisi 2024 sekalian — menunda upgrade hanya menumpuk utang yang nanti dibayar dengan bunga berupa kejutan seperti ini.
