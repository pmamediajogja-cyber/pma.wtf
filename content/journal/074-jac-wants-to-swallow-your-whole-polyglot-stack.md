---
id: "074"
date: "24 OCT 2026"
tag: "BUILD / TECH / LANGUAGE"
category: "BUILD / TECH"
title: "Jac Wants to Swallow Your Whole Polyglot Stack"
excerpt: "University of Michigan professor Jason Mars has unveiled Jac, a Python-like language built for AI agents first — one that compiles to Python, JavaScript, and native code, borrows Rust-style memory safety, and treats data as a graph agents can walk instead of fetch."
source: "The Register"
url: "https://www.theregister.com/devops/2026/10/23/michigan-prof-creates-python-like-jac-language-for-ai-agents/5305110"
tags: ["Jac", "Jaseci", "AI agents", "programming language", "Python", "LangGraph", "graph computing"]
hashtags: ["#Build", "#Jac", "#AIAgents", "#Programming", "#Python"]
---

Profesor University of Michigan, Jason Mars, memperkenalkan Jac — bahasa pemrograman mirip Python yang dirancang bukan untuk programmer manusia, melainkan untuk agen AI — dalam talk di konferensi All Things Open di Raleigh, North Carolina, pekan ini. Bersama runtime-nya, Jaseci, Jac memposisikan agen sebagai entitas kelas satu: bahasa ini mengintegrasikan runtime dan toolchain TypeScript sekaligus Python, mengompilasi ke bytecode Python, JavaScript, dan kode native, serta bisa memakai library apa pun dari ekosistem PyPI dan npm. Lewat integrasi LLVM, Jac juga mengadopsi borrow checking dan ownership ala Rust, bisa mengimpor library C dan C++, dan punya "eject function" yang mengompilasi balik kode Jac ke TypeScript, Python, atau C demi kepatuhan korporat — satu pengecualian yang diakui Mars sendiri: kalau butuh Java, Jac bukan jawabannya.

Argumen Mars berangkat dari biaya tersembunyi dari tumpukan polyglot. Ia mengutip kasus pencipta Bun, Jarred Sumner, yang menghabiskan US$165.000 token Anthropic untuk mengonversi kode Zig ke Rust — bukan karena pekerjaannya rumit, kata Mars, melainkan karena semuanya harus diterjemahkan antar bahasa yang berpusat pada manusia. Jac menjawabnya dengan dua cara: pertama, menelan banyak bahasa ke dalam satu bahasa; kedua, menyatukan arsitektur data sebagai graf, bukan tabel database atau objek lepas. Data didefinisikan lewat node dan edge, lalu agen mengirim "walker" yang menelusuri graf dan memproses data di tempat — beberapa walker bisa berjalan paralel di jalur berbeda, tanpa agen harus membakar token untuk mengekstrak data dari database, blob, atau string JSON. Dalam uji banding di talk itu, agen yang memakai Jac membangun replika alat code review Greptile yang canggih dan multi-tahap dengan pemanggilan tool paralel, sementara LangGraph menghasilkan state machine linear yang kasar.

Pandangan PMA: jangan terjebak pada janji "satu bahasa untuk semua" — janji itu sudah dijual berkali-kali dan selalu kalah dari realita tim yang sudah berjalan. Nilai Jac yang sesungguhnya ada di diagnosanya, bukan di sintaksnya: biaya terbesar era agen bukan menulis kode, melainkan menerjemahkan konteks antar sistem. Kalau kamu membangun dengan agen hari ini, ukur dulu berapa banyak token dan waktu yang habis cuma untuk menjelaskan struktur datamu berulang-ulang — lalu perbaiki di sisi itu, entah dengan graf, skema yang lebih ketat, atau kontrak data yang jelas. Jac masih harus membuktikan diri di luar layanan-layanan kecil seperti GraphClaw, Skooch, dan Tobu, tapi arahnya benar: tool berikutnya harus dirancang untuk yang memakainya, dan yang memakainya sekarang adalah agen.
