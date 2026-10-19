---
id: "064"
date: "19 OCT 2026"
tag: "BUILD / DEVTOOLS"
category: "BUILD / TECH"
title: "IntelliJ's Java Brain Is Now Loose in VS Code and Cursor"
excerpt: "JetBrains has shipped 1.0 of 'Java and Kotlin by IntelliJ IDEA' — an LSP-powered extension that brings its full Java and Kotlin language intelligence into VS Code and Cursor, built with the Cursor team, with agentic and terminal-based workflows coming next."
source: "The JetBrains Blog"
url: "https://blog.jetbrains.com/idea/2026/10/intellij-idea-s-java-and-kotlin-for-cursor-and-vs-code-hits-1-0/"
tags: ["JetBrains", "IntelliJ IDEA", "VS Code", "Cursor", "Java", "Kotlin", "Language Server Protocol"]
hashtags: ["#JetBrains", "#IntelliJ", "#VSCode", "#Cursor", "#Java", "#BuildTech"]
---

JetBrains baru saja merilis 1.0 dari "Java and Kotlin by IntelliJ IDEA" — extension berbasis Language Server Protocol (LSP) yang membawa kecerdasan bahasa Java dan Kotlin milik IntelliJ IDEA ke VS Code dan Cursor. Rilis stabil ini datang sekitar sepuluh minggu setelah preview dibuka, dan kali ini JetBrains tidak jalan sendiri: tim Cursor ikut berkolaborasi langsung, menguji extension-nya hingga pengalaman Java dan Kotlin di Cursor terasa "first-class". Isi 1.0-nya cukup penuh — smart code completion, navigation, code analysis, refactoring, dukungan proyek Maven/Gradle/Bazel, performa yang tetap cepat untuk monorepo besar, JUnit test runner, sampai debugging dengan emulated breakpoints dan async stack traces. Di Cursor ada dukungan khusus untuk Agents window, yang bahkan bisa memakai instance Language Server-nya sendiri untuk analisis berbasis inspeksi IntelliJ.

Alasan yang diberikan JetBrains soal "kenapa sekarang" patut diperhatikan: pengembangan agentic mengubah cara software dibangun. Ketika agent yang mengerjakan sebagian besar implementasi, developer manusia hanya butuh seperangkat fitur yang fokus — navigasi ke deklarasi, find references, completion, rename — dan itulah persis yang dirancang LSP untuk dilakukan: implementasikan sekali, pakai di editor mana pun. Yang lebih jauh lagi, agent bisa memanggil LSP secara langsung — lebih cepat, lebih deterministik, dan yang paling menggoda, menghabiskan lebih sedikit token. Tapi ada harga yang ikut berubah: masa preview gratis sudah berakhir. Setelah trial 30 hari, extension ini butuh langganan IntelliJ IDEA Ultimate, dan lisensinya untuk saat ini eksplisit hanya untuk manusia — model lisensi untuk penggunaan murni agentic baru akan diumumkan menyusul. JetBrains juga minta pengguna menonaktifkan extension Java dari Red Hat dan Oracle karena fitur analisisnya tumpang tindih.

Pandangan PMA: ini adalah pengakuan paling jujur dari pembuat IDE terbesar di dunia — editor kini bisa digantikan, yang tidak tergantikan adalah mesin bahasanya. JetBrains berhenti menjual jendela dan mulai menjual kecerdasan di baliknya, dan itu langkah yang tepat untuk era agent: perang selanjutnya bukan soal editor mana yang kamu buka, melainkan mesin pemahaman kode mana yang agent-mu panggil. Kalau kamu Java/Kotlin developer yang sudah nyaman di VS Code atau Cursor, trade-off-nya jelas — IntelliJ-grade refactoring dan analisis versus langganan Ultimate per bulan. Tapi ada satu hal yang patut dicatat sebelum buru-buru: JetBrains belum membuka lisensi untuk pemakaian agentic murni. Mereka sedang menyiapkan harga untuk masa depan di mana yang "mengetik" bukan lagi manusia, tapi agent yang menelepon LSP mereka langsung. Tunggu pengumuman itu — di situlah harga sebenarnya dari era agentic coding akan diumumkan.
