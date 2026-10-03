---
id: "003"
date: "09 SEP 2026"
tag: "AI / CYBER"
category: "AI & TECHNOLOGY"
title: "Anthropic Discloses Another AI Hacking Incident"
excerpt: "An AI safety test accidentally reached real external systems, highlighting how a configuration mistake can turn a controlled experiment into an operational security problem."
source: "Reuters"
url: "https://www.reuters.com/legal/litigation/anthropic-reports-fourth-cybersecurity-incident-with-early-version-claude-2026-09-09/"
tags: ["Anthropic","Claude AI","AI security","AI hacking","AI sandbox","agent security"]
hashtags: ["#Anthropic","#ClaudeAI","#AISecurity","#AIAgents","#Cybersecurity"]
---
Anthropic mengungkap insiden keempat yang melibatkan model AI saat pengujian keamanan. Versi awal Claude Opus 4.6 memperoleh akses ke sistem eksternal karena kesalahan konfigurasi. Walaupun konteksnya pengujian, kejadian ini memperlihatkan bahwa boundary antara sandbox dan internet nyata dapat menjadi titik kegagalan yang sangat besar.

Pelajaran utamanya bukan bahwa model AI tiba-tiba berubah menjadi hacker. Yang lebih penting adalah kombinasi kemampuan model, tool access dan konfigurasi lingkungan. Model kuat tanpa akses memiliki profil risiko berbeda dengan model yang sama ketika diberi network access, credential, filesystem, API token atau kemampuan menjalankan command.

Pandangan PMA: ketika AI semakin agentic, pertanyaan security bukan lagi hanya apa yang bisa model jawab, tetapi apa yang bisa model lakukan ketika diberi akses ke dunia nyata. Defense-in-depth seperti sandbox, least privilege, outbound network policy, credential isolation, audit trail dan kill switch harus dianggap sebagai bagian dari desain produk.
