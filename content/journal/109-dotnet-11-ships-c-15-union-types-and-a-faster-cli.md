---
id: "109"
date: "13 NOV 2026"
tag: "BUILD / TECH / FRAMEWORK RELEASE"
category: "BUILD / TECH"
title: ".NET 11 Ships C# 15 Union Types and a Faster CLI"
excerpt: "Microsoft releases .NET 11 at .NET Conf 2026 with C# 15 union types, a Native AOT CLI host, a warm MSBuild server, and CoreCLR as the default MAUI runtime — while .NET 8 and 9 reach end of support on the same day."
source: ".NET Blog"
url: "https://devblogs.microsoft.com/dotnet/announcing-dotnet-11/"
tags: [".NET 11", "C# 15", "Microsoft", "union types", "ASP.NET Core", ".NET MAUI", "developer tools"]
hashtags: ["#DotNet", "#CSharp", "#DotNet11", "#BuildTech", "#Microsoft"]
---

Microsoft merilis .NET 11 pada 10 November 2026 di pembuka .NET Conf 2026 — rilis Standard Term Support (STS) dengan dukungan dua tahun, sementara .NET 10 tetap menjadi opsi Long Term Support. Bintang utamanya adalah C# 15: union types memungkinkan sebuah nilai menjadi salah satu dari sekumpulan tipe kasus yang dideklarasikan, lengkap dengan exhaustiveness checking di switch expression — compiler yang memastikan semua kemungkinan sudah ditangani. C# 15 juga menambah closed hierarchies yang membatasi turunan hanya ke assembly yang mendeklarasikan, plus extension indexer dan labeled break/continue. Di hari yang sama, .NET 8 dan 9 mencapai akhir dukungan, jadi siapa pun yang masih di sana kini tanpa patch keamanan.

Di luar bahasa, rilis ini menyerang waktu tunggu developer sehari-hari. SDK kini memakai Native AOT CLI host secara default sehingga perintah seperti help dan version berjalan tanpa memulai managed CLI, dan MSBuild server tetap hangat antar pemanggilan sehingga build berulang tidak membayar biaya startup yang sama berkali-kali. ASP.NET Core membawa validasi asinkron — validator kini bisa menunggu lookup database atau panggilan remote — dan OpenAPI 3.2 sebagai default dokumen yang dihasilkan. .NET MAUI pindah ke CoreCLR sebagai runtime default, menyatukan fondasi runtime aplikasi mobile dan desktop dengan workload .NET lainnya. Library menambah kompresi Zstandard bawaan, API Process yang lebih lengkap, dan LINQ FullJoin. Untuk era agen, ada template MCP server bawaan (dotnet new mcpserver), Microsoft.Extensions.AI, dan Microsoft Agent Framework — meski Runtime Async dan komponen AI Blazor masih berstatus preview dan eksperimental.

Pandangan PMA: rilis ini menarik bukan karena satu fitur besar, melainkan karena ia merapikan dua hal yang paling sering menggerus hari kerja developer — waktu tunggu tooling dan ketidakpastian tipe. Union types adalah jawaban yang sudah lama diminta: daripada memaksa hasil operasi ke dalam object atau exception, kembalikan saja tipenya apa adanya dan biarkan compiler yang menjaga. Tapi ada dua catatan praktis. Pertama, kalau kamu masih di .NET 8 atau 9, ini bukan soal fitur baru — dukunganmu sudah habis, dan upgrade ke .NET 10 (LTS) atau 11 bukan lagi pilihan santai. Kedua, jangan buru-buru mengadopsi bagian yang masih preview: Runtime Async dan komponen AI Blazor memang menggoda, tapi keduanya belum stabil dan bisa berubah. Ambil yang sudah GA — union types, CLI yang lebih cepat, CoreCLR di MAUI — dan biarkan yang preview matang dulu di proyek sampingan.
