// ==UserScript==
// @name         AHU Autofill
// @namespace    local.ahu-fidusia-autofill
// @version      2.3.2
// @updateURL   https://raw.githubusercontent.com/pmamediajogja-cyber/pma.wtf/rebuild-v2/userscripts/ahu-autofill.user.js
// @downloadURL https://raw.githubusercontent.com/pmamediajogja-cyber/pma.wtf/rebuild-v2/userscripts/ahu-autofill.user.js
// @description  AHU Autofill: animasi ketik per huruf + auto-scroll sampai rangka/mesin (tombol "cek data" disorot, tetap manual); update otomatis via GitHub. Penerus final32; final31 adalah versi STABIL. Tanpa submit/pembayaran otomatis.
// @match        https://ahu.go.id/*
// @match        https://*.ahu.go.id/*
// @match        http://ahu.go.id/*
// @match        http://*.ahu.go.id/*
// @grant        none
// @require      https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js
// @run-at       document-idle
// ==/UserScript==

// REVISI 2026-11-13 (rename + auto-update, perintah user "gas setup, ubah dulu penamaannya"):
// - Nama dipendekkan: file "ahu-autofill.user.js", @name "AHU Autofill"
//   (dulu: ahu_fidusia_excel_autofill_v2.3.1-final32.user.js / "AHU Fidusia
//   Excel Autofill (Review Before Submit) v2.3.1-final32").
// - Auto-update via GitHub: @updateURL + @downloadURL menunjuk ke raw file di
//   repo pma.wtf (branch rebuild-v2, userscripts/ahu-autofill.user.js);
//   @version naik ke 2.3.2 supaya Tampermonkey mendeteksi update.
// - Logika TIDAK berubah dari final32 (penerus final32); final31 tetap STABIL.

// REVISI 2026-11-13 (final32, perintah user "gas final 32"):
// - Animasi ketik: input teks biasa diketik per huruf seperti orang mengetik
//   (default Cepat 10 ms/huruf; opsi Normal 25 ms/huruf di panel), supaya user
//   bisa melihat data masuk dan langsung ngeh kalau ada nilai yang aneh.
//   Radio/checkbox/SELECT tetap instan (tidak bisa diketik). Bila checkbox
//   "Animasi ketik" dimatikan, pengisian kembali instan seperti final31.
// - Auto-scroll: layar mengikuti pengisian (scroll halus ke field yang sedang
//   diisi, hanya bila field itu di luar layar); di akhir pengisian, layar
//   berhenti di area rangka/mesin dan tombol "cek data" disorot (outline
//   oranye + pulse) supaya user langsung menemukannya. Tombol TIDAK PERNAH
//   diklik otomatis; submit/Simpan/bayar tetap manual.
// - Panel: tambah checkbox "Animasi ketik" (default ON) + pilih kecepatan.
// - final31 dinyatakan STABIL (versi stabil) — final32 adalah versi baru.
// - Logika data final31 TIDAK berubah: batch + loncat terkunci di batch,
//   penjaminan_obyek dihitung dari jaminan_fidusia[] (kategori 1-10),
//   penjaminan dari pokok_dasar, npwp_pemberi = NIK, gender dari NIK,
//   pickRadio utamakan yang terlihat, #agree auto-tick, terbilang via blur
//   di akhir fillRecord, cascade wilayah tidak berubah.

// REVISI 2026-11-13 (final32, laporan user "loncat-loncat + delay"):
// - Urutan pengisian: loop utama kini mengisi dari ATAS ke BAWAH mengikuti
//   urutan visual form (posisi vertikal kontrol), bukan urutan kolom Excel.
//   Header diurutkan berdasarkan posisi kontrolnya di form; header tanpa
//   kontrol terlihat ditaruh terakhir. Cascade wilayah, blok sub-jenis,
//   Bagian E (objek), dan terbilang di akhir TIDAK berubah urutannya.
//
// REVISI 2026-11-13 (final32, laporan user "dropdown juga harus urut + terlihat"):
// - Dropdown wilayah (provinsi/kab/kecamatan/kelurahan) kini diisi di posisi
//   visualnya (bagian alamat) dari dalam loop utama, bukan setelah loop
//   selesai — jadi layar tidak lompat balik ke atas. Tiap dropdown wilayah
//   di-scroll ke layar dulu (scrollToField di setCascadingSelect) supaya
//   prosesnya terlihat. Urutan parent -> child dan semua jeda AJAX cascade
//   TIDAK berubah.
// - Dropdown kategori objek Bagian E (Obyek Berserial Nomor, Kendaraan Roda
//   Dua) juga di-scroll ke layar sebelum dipilih, supaya terlihat.
//   Jeda 1100/1200 ms setelah memilih kategori TIDAK berubah (menunggu
//   field dinamis AHU terbentuk).
// - Radio juga ikut auto-scroll: radio di loop utama (jenis_penggunaan,
//   sub_tipe_pemberi, dll) dan radio sub-jenis otomatis (Usaha Mikro) di-scroll
//   ke layar dulu sebelum diklik, supaya semua jenis field — teks, dropdown,
//   dan pilihan — terisi berurutan dari atas ke bawah dan terlihat di layar.
//   Pengisian tetap FINISH di "cek data" (highlightCekData di akhir fillRecord).

// REVISI 2026-11-13 (final32, laporan user "masih loncat, layar tidak satu-per-satu dari atas"):
// - scrollToField kini MENUNGGU scroll smooth benar-benar selesai: setelah
//   scrollIntoView, script mem-poll isInViewport tiap 50 ms (maks ~1000 ms)
//   sebelum field diisi. Jadi layar berhenti dulu di tiap field, baru field
//   itu diisi, baru pindah ke field berikutnya — satu per satu dari atas ke
//   bawah, tanpa mengejar animasi scroll yang belum selesai.
// - Cabang tanggal (tgl_akta, tgl_perjanjian, tgl_jangka_waktu,
//   tgl_jangka_waktu_akhir) juga di-scroll ke layar dulu sebelum diisi
//   (sebelumnya tidak ada scroll di cabang ini).

// ATURAN USER-KONFIRMASI 2026-11-01 (jangan diubah tanpa perintah user):
// - NPWP pemberi = NIK (untuk orang pribadi, NPWP 16 digit = NIK).
// - No HP pemberi = nomor bisnis user (bukan HP debitur, karena HP debitur kosong di Excel).
// - #agree tetap dicentang otomatis oleh script; user tetap wajib Preview sebelum kirim.
// Perbedaan vs v2.3.1 asli: HP diperbaiki dari '0878' (terpotong) ke nomor lengkap,
// ambang kategori disamakan ke HTML form, dan provinsi diinferensi dari kab/kec.
// REVISI 2026-11-02 (final5):
// - Aturan nama ditegaskan ulang (sudah ada di final4, tidak berubah): nm_pemberi = nm_debitur -> nm_debitur TIDAK diisi/dikosongkan;
//   nm_pemberi != nm_debitur -> nm_debitur DIISI nama debitur.
// - cabang_penerima SELALU 'PT Federal International Finance Cabang Yogyakarta' (bukan lagi dari kolom Excel).
// - Nomor HP: BELUM diubah di final5, menunggu klarifikasi user (poin 3) - lihat pesan 2026-11-02.
// REVISI 2026-11-02 (final6):
// - Aturan nama DIPERKUAT (laporan user: debitur masih keisi saat nama sama): selain mengosongkan field di loop,
//   row.nm_debitur dikosongkan di awal fillRecord bila sama dengan nm_pemberi, dan field DOM dibersihkan ulang
//   setelah loop selesai (menutup celah field readOnly/hidden saat loop, dan script lama tanpa aturan ini).
//   Template MDB juga dibersihkan 2026-11-02: nm_debitur dikosongkan untuk 40 baris yang namanya sama,
//   dipertahankan hanya untuk 3 baris pihak ketiga (nama berbeda).
// - no_hp_pemberi TIDAK LAGI dipaksa ke nomor bisnis user: pakai kolom Excel no_hp_pemberi apa adanya.
//   Alasan (user 2026-11-02): HP pemberi sekarang sudah ada di PDF aplikasi pembayaran, jadi isi kolom itu
//   dari PDF tersebut; bila kolom kosong, field dibiarkan kosong dan dicatat manual, bukan diisi nomor bisnis.
// REVISI 2026-11-05 (final16, perintah user: Jenis Penggunaan otomatis dari Excel):
// - Masalah: final15 memaksa SEMUA baris jadi Konsumtif (row.jenis_penggunaan =
//   'Konsumtif' + blok pemaksa klik radio Konsumtif), padahal baris MODAL KERJA /
//   MODAL USAHA / INVESTASI harus Produktif. Kolom 39 Template (header ID
//   jenis_penggunaan) sudah diisi dari teks PPK: MODAL KERJA / MODAL USAHA /
//   INVESTASI -> 'Produktif', MULTIGUNA -> 'Konsumtif' (132/136 baris terisi,
//   4 baris kosong karena PPK-nya tidak ada / tidak terbaca).
// - Perbaikan: (1) pemaksaan Konsumtif DIHAPUS; teks Excel diterjemahkan ke value
//   radio AHU ("1" = Produktif, "2" = Konsumtif) supaya loop pengisian umum (yang
//   mencocokkan radio berdasarkan x.value) memilih radio yang benar. Header ID
//   jenis_penggunaan sudah dibaca otomatis dari baris header Excel, jadi tidak ada
//   pemetaan kolom baru. (2) Bila Excel kosong / nilainya tidak dikenal, radio
//   TIDAK diklik dan dicatat manual di panel. (3) Bila Produktif terpilih, sub-jenis
//   (Usaha Mikro/Kecil/Menengah/Lainnya) tetap MANUAL karena butuh data aset/omzet
//   (Mikro: aset <=50jt & omzet <=300jt; Kecil: aset 50-500jt & omzet 300jt-2,5M;
//   Menengah: aset 500jt-10M & omzet 2,5M-50M) yang tidak ada di berkas —
//   script TIDAK menebak sub-jenis. Fungsi final15 lainnya tidak berubah.
// REVISI 2026-11-08 (final31, audit 2026-11-08 — 6 temuan sedang sisanya, perintah user "gas in benerin 6 itu"):
// (1) batchIndices fail-open DIPERBAIKI: batchKey tidak ditemukan kini
//     kembalikan [] + reset batchKey (bukan semua record) supaya kunci batch
//     tidak batal diam-diam; dropdown diselaraskan ke "Semua record".
// (2) Regex deteksi header category DIPERBAIKI: backslash ganda \\[ jadi
//     \\[ (single) — fallback category kini hidup; template yang headernya
//     hanya kolom category tidak lagi salah petakan.
// (3) optionMatches akhiran DIPERBAIKI: arah berbahaya (nilai berakhiran opsi)
//     DIHAPUS — "SIDOMULYO" tidak lagi dicocokkan ke "MULYO". Hanya arah
//     opsi berakhiran nilai, min 4 huruf, opsi lebih panjang. Verifikasi akhir
//     wilayah di fillRecord ikut diperbaiki dengan aturan yang sama.
// (4) addressOnly DIPERBAIKI: "KOTA " tidak lagi memotong nama jalan —
//     KOTA BARU dan KOTA GEDE dikecualikan via negative lookahead.
// (5) Drag/grip DIPERBAIKI: beralih ke Pointer Events + setPointerCapture,
//     supaya lepas mouse di luar jendela tidak bikin panel nyangkut; tambah
//     pointercancel + touch-action:none di grip.
// (6) Tombol "Isi kontak" DIPERBAIKI: dinonaktifkan selama polling 120 detik
//     (klik ganda diabaikan), diaktifkan lagi saat selesai/timeout.
// REVISI 2026-11-08 (final30, audit 2026-11-08 — 4 perbaikan prioritas, perintah user "okr 4 dulu"):
// (1) Tombol minimize (−) DIPERBAIKI: CSS #ahuBody{display:grid} mengalahkan
//     aturan [hidden]{display:none} sehingga klik − cuma ganti label. Tambah
//     aturan #ahuBody[hidden]{display:none} supaya isi panel benar-benar hilang.
// (2) Re-import file .xlsx yang sama DIPERBAIKI: e.target.value dikosongkan di
//     finally, supaya pilih file yang sama (habis re-export) memicu change lagi.
// (3) Radio/checkbox DIBERSIHKAN antar record: clearPemberiFormForNext kini
//     uncheck semua radio/checkbox non-protected (gender, jenis penggunaan,
//     sub-jenis) supaya nilai record lama tidak bocor ke record baru yang
//     datanya kosong. Tanpa dispatch (tetap ringan). #agree + penerima +
//     notaris tetap dilindungi.
// (4) Sort batch DIPERBAIKI untuk Desember: REQ "NN/MM" kini diparse jadi
//     (bulan, nomor) dan diurutkan bulan desc lalu nomor desc — "01/12"
//     kini di atas "05/11", bukan terselip di bawah "02/11". Format tak
//     dikenal tetap fallback ke sort string desc.
// REVISI 2026-11-08 (final29, perintah user: tarik grip bikin semua tulisan + kotak ikut mengecil):
// - Grip ↘ di sudut kanan-bawah kini mengubah ZOOM panel (bukan lebar saja):
//   semua tulisan + kotak (input, tombol, select) ikut mengecil/membesar
//   sebanding dengan panel. Skala 0.6x–1.8x (lebar visual ~168–504px pada
//   base 280px), dibatasi selebar layar. Skala + posisi tersimpan di
//   localStorage (kunci baru v29; lebar tersimpan final28 dimigrasikan
//   otomatis ke skala). Geser via header tetap sama.
// REVISI 2026-11-08 (final28, perintah user: panel responsif — bisa dibesarkan/dikecilkan/dipindah, fluid, tanpa overlap & tanpa scroll):
// - Panel bisa DIGESER: tarik header (judul) untuk memindah panel ke mana saja;
//   posisi tersimpan di localStorage dan dipulihkan saat halaman dimuat ulang.
// - Panel bisa DIUBAH LEBARNYA: tarik grip '↘' di sudut kanan-bawah (min 240px,
//   maks selebar layar); lebar tersimpan di localStorage. Tinggi panel mengikuti
//   isi otomatis (auto) supaya TIDAK ADA scroll naik-turun; teks membungkus
//   (wrap) supaya TIDAK ADA scroll kanan-kiri. Tombol minimize tetap ada untuk
//   mengecilkan panel secara vertikal.
// - Fluid layout: tombol FEDERAL INTER diubah dari float ke flex (tidak overlap);
//   judul header terpotong rapi (ellipsis) bila panel sempit; ringkasan, info
//   file, progress, dan teks bantuan membungkus (overflow-wrap:anywhere);
//   padding bawah body ditambah supaya grip tidak menutupi teks.
// REVISI 2026-11-08 (final27, perintah user: batch terbaru paling atas di dropdown):
// - Urutan batch di dropdown dibalik: TERBARU dulu (05/11, 04/11, 03/11, 02/11,
//   01/11, 01/10). 'Semua record' tetap paling atas sebagai pilihan default.
//   '(Tanpa batch)' tetap paling bawah bila ada.
// REVISI 2026-11-08 (final26, koreksi dari user — Loncat HARUS terkunci di batch):
// - final25 DIBATALKAN perilakunya: Loncat TIDAK BOLEH pindah batch. Loncat
//   kini STRICT di dalam batch yang dipilih: ketik No. Akta hanya dicari di
//   batch itu; bila akta tidak ada di batch itu, loncat GAGAL (batch TIDAK
//   berubah, tidak pindah ke batch lain). Contoh: batch 05/11 (akta 104-127)
//   -> loncat 103 GAGAL, batch tetap 05/11. Untuk loncat bebas, pilih dulu
//   'Semua record' di dropdown batch (paling atas) — di situ Loncat mencari
//   ke semua record. No. Akta dobel antar bulan diselesaikan oleh batch:
//   batch 01/11 + loncat 5 = akta 5 bulan Nov; batch 01/12 + loncat 5 = akta 5
//   bulan Des.
// - #N = record ke-N di dalam batch yang dipilih (cth #5 = record ke-5 di
//   batch itu); bila 'Semua record' dipilih, #N = record ke-N global.
// REVISI 2026-11-08 (final25, perbaikan dari laporan user: Loncat terkunci di batch):
// - Loncat kini BEBAS dari batch yang dipilih: cari No. Akta di SEMUA record
//   (bila No. Akta dobel antar bulan, utamakan batch yang sedang dipilih),
//   lalu PINDAHKAN pilihan batch mengikuti record tujuan, supaya Next/Prev
//   tidak terkunci (bug final24: batch tidak ikut pindah -> pos -1 -> Prev &
//   Next sama-sama disabled). Pilihan 'Semua record' tetap ada di dropdown
//   batch (paling atas); bila record tujuan tanpa REQ, batch jadi 'Semua'.
// - Kolom REQ Oktober diisi '01/10' (43 baris susulan/tambahan), jadi tidak ada
//   lagi kelompok '(Tanpa batch)'.
// REVISI 2026-11-08 (final24, perintah user: pilih batch by REQ + kotak loncat, hapus dropdown jenis pemberi):
// - Dropdown Jenis Pemberi di panel DIHAPUS. Jenis pemberi (Perseorangan '2' /
//   Korporasi '1') diambil otomatis dari kolom tipe_pemberi Excel; bila kosong,
//   ditebak dari NIK (16 digit = Perseorangan) atau nama (PT/CV/UD/KOPERASI/
//   YAYASAN = Korporasi), default Perseorangan. Fungsi deriveTipePemberi().
// - Batch dari kolom request (REQ, misal 01/11..05/11): panel ada dropdown batch;
//   pilih batch -> loncat ke record pertama batch itu, Next/Prev mentok di
//   dalam batch. Kolom REQ Template sudah diisi 127 baris Nov (01/11: 1-40,
//   02/11: 41-80, 03/11: 81-93, 04/11: 94-103, 05/11: 104-127); 43 baris Okt
//   (susulan/tambahan) REQ kosong -> kelompok '(Tanpa batch)'.
// - Kotak Loncat: ketik No. Akta (cth 80) atau No. record -> langsung ke record
//   itu (Enter juga bisa). Cari akta diutamakan di batch yang sedang dipilih;
//   bila No. Akta dobel, ditampilkan yang pertama + dicatat di status.
// - Progress panel kini tampil posisi di dalam batch + nama batch + total.
// - Tema panel dark modern (final23) dan inferensi provinsi (final22) tidak berubah.
// REVISI 2026-11-08 (final23, perintah user: samakan tema panel dengan FIMS Downloader):
// - Tampilan panel diubah ke tema dark modern yang sama dengan FIMS Downloader
//   v2.8.7: latar #111827, kartu #0b1220, border #374151/#273449, aksen hijau
//   #059669/#10b981, font Inter, radius 18px/10px. Header kini ada chip ikon
//   hijau + judul + nomor versi (seperti FIMS). Tombol utama hijau, tombol
//   lain gelap. HANYA tampilan yang berubah — ID elemen, struktur, dan semua
//   logika pengisian (termasuk inferensi provinsi final22) TIDAK berubah.
// REVISI 2026-11-08 (final22, laporan Gendot: KTP luar DIY harus isi manual):
// - Penyebab: provinsi_pemberi kosong di SEMUA baris Template, script menginferensi
//   dari kab/kec — tapi daftar inferensi lama hanya kenal DIY (Bantul/Sleman/
//   Gunung Kidul/Yogyakarta + 3 kecamatan). KTP luar DIY gagal inferensi,
//   provinsi tetap kosong, cascade kab/kec/kel AHU tidak jalan (kabupaten baru
//   dimuat AJAX setelah provinsi dipilih) sehingga satu blok wilayah harus diisi
//   manual. Bonus: KULON PROGO (DIY) juga tidak ada di daftar lama.
// - Perbaikan: (1) peta kab -> provinsi umum (KAB_KE_PROVINSI + inferProvinsi(),
//   Pulau Jawa + Lampung) dipakai bila kolom provinsi kosong; (2) kolom provinsi
//   Template sudah diisi untuk 170 baris (166 DIY, 2 Jateng, 1 Banten, 1 Lampung)
//   sehingga inferensi hanya jadi pengaman untuk baris baru. Logika lain tidak berubah.
// REVISI 2026-11-05 (final21, bug final20: radio gender tidak terlihat terisi):
// - Penyebab: name "sub_tipe_pemberi" dipakai DUA kelompok radio di form AHU —
//   (a) gender perseorangan (Laki-laki/Perempuan, terlihat) dan (b) sub-tipe
//   korporasi (Bank / LKBB / Lainnya, di dalam div display:none, letaknya LEBIH
//   AWAL di DOM). group.find(value) selalu mengambil yang pertama = radio
//   korporasi yang tersembunyi, sehingga radio gender yang terlihat tetap kosong
//   (panel malah melaporkan "terisi" karena radio tersembunyi itu berhasil diklik).
// - Perbaikan: helper pickRadio() — pilih radio yang TERLIHAT di layar
//   (offsetWidth/offsetHeight/getClientRects), fallback ke seluruh grup bila
//   tidak ada yang terlihat. Dipakai di setValue() DAN di cabang radio loop
//   pengisian umum. Derivasi NIK final20 tidak berubah.
// REVISI 2026-11-05 (final20, perintah user: isi jenis kelamin dari NIK saja):
// - Menggantikan final19 (yang melewati sub_tipe_pemberi sepenuhnya): user memutuskan
//   jenis kelamin tetap diisi, tapi DITURUNKAN DARI NIK — bukan dari kolom
//   sub_tipe_pemberi Excel yang selama ini berisi default build "1". Aturan KTP:
//   digit 7-8 NIK = tanggal lahir; 01-31 = Laki-laki (value "1"), 41-71 = Perempuan
//   (value "2", +40). NIK kosong / bukan 16 digit / tanggal di luar rentang /
//   pemberi korporasi -> sub_tipe dikosongkan dan radio dibiarkan kosong (field
//   opsional, tidak berbintang) + dicatat di panel sebagai manual. Nilai kolom 41
//   di Template kini diabaikan — NIK adalah otoritasnya. Fungsi final19 lainnya
//   tidak berubah.
// REVISI 2026-11-05 (final19, perintah user: jenis kelamin pemberi sengaja TIDAK diisi):
// - Alasan: user dari awal sengaja mengosongkan jenis kelamin pemberi karena field
//   ini TIDAK berbintang (opsional) di form AHU. Nilai sub_tipe_pemberi di Template
//   (kolom 41) selama ini terisi default "1" dari build baris — bukan pilihan user —
//   sehingga autofill ikut mengklik Laki-laki bahkan untuk pemberi perempuan.
// - Perbaikan: header "sub_tipe_pemberi" dilewati loop pengisian umum (skip list),
//   jadi radio jenis kelamin di form TIDAK disentuh script sama sekali dan tetap
//   kosong seperti maunya user. Nilai kolom 41 di Template kini tidak berpengaruh
//   ke form (tetap tersimpan sebagai data saja). Fungsi final18 lainnya tidak berubah.
// REVISI 2026-11-05 (final18, perintah user: kalau ada aturannya, otomatis saja — jangan manual):
// - Prinsip user: selama ada aturannya, otomatiskan; verifikasi terjadi di Preview
//   karena script TIDAK PERNAH submit/pembayaran otomatis — user selalu meninjau
//   dulu sebelum submit manual. Jadi catatan "VERIFIKASI sebelum submit" di panel
//   final17 dihapus: panel hanya mencatat faktual "Sub-jenis otomatis Usaha Mikro
//   (aturan: nominal berkas <50jt)". Pilihan tetap tidak dikunci — user bisa klik
//   sub-jenis lain sebelum submit bila tidak sesuai. Fungsi final17 lainnya tidak berubah.
// REVISI 2026-11-05 (final17, perintah user: Produktif -> otomatis Usaha Mikro + tandai verifikasi):
// - Alasan: user mengecek nominal berkas — 30 baris Produktif semuanya di bawah Rp50jt
//   (pokok/jaminan maks ~Rp24,5jt, rata-rata ~Rp12,5jt; seluruh 136 baris maks ~Rp38jt).
//   Ambang AHU untuk Usaha Mikro adalah aset <=50jt & omzet <=300jt — itu ukuran usaha
//   peminjam, BUKAN besar pinjaman, dan data aset/omzet tidak ada di berkas. Jadi
//   pilihan Mikro di sini adalah ASUMSI dari nominal, bukan fakta terverifikasi.
// - Perbaikan: bila radio Produktif terpilih, script otomatis mengklik sub-jenis
//   Usaha Mikro (name="sub_jenis_penggunaan", value="2", id sub_jenis_penggunaan2)
//   dan mencatat di panel: "Sub-jenis otomatis Usaha Mikro (ASUMSI aset <=50jt &
//   omzet <=300jt) — VERIFIKASI sebelum submit; klik sub-jenis lain bila tidak
//   sesuai." Script TIDAK mengunci pilihan — user tetap bisa klik sub-jenis lain
//   secara manual sebelum submit. Bila radio Mikro tidak ditemukan, panel mencatat
//   pilih sub-jenis manual. Fungsi final16 lainnya tidak berubah.
// REVISI 2026-11-03 (final15, laporan user: Next menghapus Kedudukan Notaris):
// - Penyebab: Kedudukan Notaris di AHU itu select name='tempat' id='tempat'
//   yang disabled (abu-abu, nilainya dimuat sekali saat halaman dibuka lewat
//   loadTable ke #kedudukanX). Proteksi clear final10-final14 hanya mengecek
//   kata 'kedudukan' di id/name, jadi 'tempat' lolos dan ikut di-reset ke
//   '--pilih--', padahal karena disabled, AHU tidak memuat ulang nilainya.
// - Perbaikan: clear sekarang (1) MELEWATI SEMUA field yang disabled
//   (input, textarea, maupun select), dan (2) secara eksplisit melindungi
//   select id/name persis 'tempat' (Kedudukan Notaris). Proteksi 'tempat'
//   dibuat persis, bukan mengandung, supaya 'tempat_obyek' (lokasi obyek,
//   bukan kedudukan) tetap dikosongkan seperti biasa. Fungsi lain tidak berubah.
// REVISI 2026-11-03 (final14, laporan user: tombol Next berat + nomor panel telat):
// - Penyebab berat: clearPemberiFormForNext final10-final13 mengirim event
//   input/change (plus jQuery trigger change kedua) untuk SEMUA input/select
//   di form, termasuk yang sudah kosong. Tiap change di select wilayah/kategori
//   memicu handler AHU (loadData AJAX, load_category) sehingga klik Next terasa
//   berat dan repaint panel tertunda; user mengira klik tidak masuk, klik lagi,
//   lalu nomor panel loncat 1 -> 3 (indeks sudah +2 sebelum repaint pertama).
// - Perbaikan: (1) clear jadi RINGAN: hanya field yang benar-benar terisi yang
//   dikosongkan, tanpa dispatch/change sama sekali untuk teks dan select
//   (nilai di form cukup di-reset diam-diam; pengisian record berikutnya
//   memakai logika dispatch-nya sendiri), kecuali datepicker yang memang
//   terisi tetap di-setDate(null) sekali. (2) Urutan handler dibalik: indeks
//   diubah DAN panel di-update DULU, baru form dikosongkan, jadi nomor panel
//   berubah seketika saat klik, tidak menunggu clear. (3) Tampilan tombol
//   dirombak sesuai permintaan user: Isi record paling besar di atas, di
//   bawahnya Isi kontak + Lebak Bulus agak besar, di bawahnya baris navigasi
//   dua tombol sejajar: '← Prev' (menggantikan Sebelumnya) dan 'Next →'
//   (menggantikan Record berikutnya), dengan gaya lebih modern. ID tombol
//   tidak berubah (ahuPrev/ahuNext/ahuFill/ahuFillRecipient) supaya handler
//   dan logika pengisian lain tidak berubah.
// REVISI 2026-11-03 (final13, pilihan user: ucapan DIGILIR, maks 3 kata):
// - Menggantikan final12 sebagai versi aktif. Fungsi lain = final12 persis.
//   Satu-satunya perubahan: completionChime tidak lagi selalu mengucapkan
//   'Selesai', tapi menggilir 6 kalimat pendek, masing-masing MAKS 3 kata,
//   secara berurutan lalu mengulang dari awal: Gas next bro! / Mantap lanjut
//   bro! / Tumbang satu lagi! / Kelar gas bro! / Lanjut jangan kendor! /
//   Selesai cuan bro! Penghitung giliran disimpan di variabel chimeIndex.
//   Soal beban (pertanyaan user): TIDAK memberatkan sama sekali. Daftar ini
//   cuma 6 string pendek di memori, memilih giliran berikutnya cuma tambah
//   1 angka, tidak ada unduhan, tidak ada file, tidak ada jaringan, dan
//   ucapan jalan async di browser, tidak menunggu dan tidak memperlambat
//   pengisian form. Satu-satunya 'efek' adalah suara 1-2 detik itu sendiri,
//   dan kalau Isi record diklik cepat, ucapan sebelumnya dibatalkan dulu
//   (cancel) supaya tidak menumpuk.
// REVISI 2026-11-03 (final12, pilihan user: suara ucapan 'Selesai'):
// - Menggantikan final11 sebagai versi aktif. Fungsi lain = final11 persis.
//   Satu-satunya perubahan: completionChime sekarang mengucapkan 'Selesai'
//   lewat speechSynthesis (bahasa id-ID, volume penuh), bukan nada musik.
//   Nada triangle final11 dipertahankan sebagai FALLBACK saja, hanya dipakai
//   kalau speechSynthesis tidak tersedia di browser ini, supaya sinyal selesai
//   tetap ada. Final11 dinonaktifkan, bukan dihapus, sebagai cadangan.
// VERSI TERKUNCI 2026-11-03 (final11, user: tetapkan jadi terbaik):
// - Final11 = final10 PERSIS secara fungsi. Satu-satunya perubahan adalah
//   sentuhan tampilan: (1) judul panel jadi 'AHU FIDUSIA AUTOFILL
//   V2.3.1-final15', dan (2) bunyi selesai lebih nyaring dengan nada beda
//   (lihat completionChime). JANGAN ubah fungsi lain dari versi ini tanpa
//   perintah user, karena user sudah mengunci versi ini sebagai terbaik.
//   Versi lama (final10 ke bawah) dinonaktifkan, bukan dihapus, sebagai cadangan.
// REVISI 2026-11-03 (final10, laporan user: Next record harus mengosongkan semua):
// - Masalah: clearPemberiFormForNext di final7-final9 hanya mengosongkan Nama
//   Pemberi, NIK, alamat, wilayah, RT/RW, kodepos, dan Nama Debitur. Akibatnya
//   setelah Next, NPWP, No. Telepon, Email, Nomor/Tanggal Akta, seluruh D
//   (nominal + perjanjian + jangka waktu), seluruh E (kategori, merk, tipe,
//   rangka, mesin, bukti, nilai obyek), dan seluruh F (nilai penjaminan +
//   kategori + terbilang) masih berisi data record sebelumnya.
// - Perbaikan: Next/Prev sekarang mengosongkan SEMUA field teks/textarea/select
//   di dalam #form_daftar, termasuk NPWP, telepon, email, no/tgl akta,
//   perjanjian, jangka waktu, nominal D/E/F, kategori, dan terbilang/format,
//   KECUALI yang dilindungi user: (1) B. Identitas Penerima Fidusia (field
//   apa pun yang mengandung 'penerima' tidak disentuh, datanya tetap),
//   (2) data notaris (nm_notaris, kedudukan, notaris pengganti - tidak disentuh,
//   sesuai kanon nm_notaris tidak pernah diubah script), (3) radio flag_hutang
//   (satuan/lebih dari 1, tidak diisi ulang oleh fillRecord, jadi dibiarkan),
//   (4) checkbox #agree, dan (5) input hidden/token form. Isi record berikutnya
//   tetap diisi ulang penuh saat 'Isi record' diklik, termasuk tipe pemberi
//   dari panel dan Jenis Penggunaan dari Excel (Produktif/Konsumtif, final16;
//   sub-jenis Produktif otomatis Usaha Mikro + catatan verifikasi, final18).
// REVISI 2026-11-03 (final9, koreksi user: SEMUA nominal punya terbilang):
// - Koreksi atas final8: final8 hanya memicu blur untuk D (#pokok_rp) dan F
//   (.pokok_rp_2). User mengoreksi bahwa di form live, E (Nilai Obyek, ~b)
//   juga punya terbilang dan harus diklik kotaknya supaya muncul.
//   HTML lama (Untitled-1.html) memang hanya punya 2 handler blur, tapi form
//   live terbukti punya terbilang untuk ketiganya, kemungkinan lewat handler
//   dinamis saat kategori obyek dimuat. Jadi final9 tidak lagi berasumsi E
//   tidak punya terbilang.
// - Perbaikan: blok terbilang di akhir fillRecord sekarang memicu blur untuk
//   KETIGA nominal: D (#pokok_rp), E (input category[][input][~b]), dan F
//   (.pokok_rp_2 yang terisi). Verifikasi D dan F lewat span terbilangnya;
//   untuk E, blur tetap dipicu dan span terbilang di sekitar inputnya dicek
//   kalau ada, tapi tidak dilaporkan gagal hanya karena span-nya tidak
//   ditemukan di DOM lama, karena pemicu blur-nya sendiri yang penting.
// REVISI 2026-11-03 (final8, laporan user: terbilang Rp tidak berubah otomatis):
// - Penyebab: terbilang AHU (#terbilang_rp_1) HANYA dibuat di handler blur #pokok_rp
//   di halaman AHU ($("#pokok_rp").blur(...) -> terbilang(val, "#terbilang_rp_1", "RUPIAH")
//   lewat POST app/terbilang_act.php). Autofill lama hanya dispatch input/change,
//   jadi blur tidak pernah terjadi: angka berubah, terbilang tetap milik record lama.
// - Perbaikan: di akhir fillRecord, script memicu blur pada #pokok_rp (dan
//   .pokok_rp_2 untuk hutang lebih dari 1), menunggu hasil POST terbilang, lalu
//   memverifikasi #terbilang_rp_1 berubah dan tidak kosong. Kalau tetap tidak
//   berubah, dilaporkan sebagai failure dengan instruksi manual (klik kotak Rp
//   lalu klik di luar kotak sekali). Ini memakai mekanisme AHU sendiri, bukan
//   menghitung terbilang di script.
// REVISI 2026-11-03 (final7, laporan user: alamat kadang tidak terbaca + kab reset + nama stale):
// - Normalisasi wilayah: spasi/titik/tanda hubung dan awalan KABUPATEN/KAB/KOTA/KECAMATAN/KEC/
//   KELURAHAN/KEL/DESA diabaikan saat mencocokkan opsi AHU, jadi 'BAMBANG LIPURO' di Excel
//   cocok dengan 'BAMBANGLIPURO' di AHU, dan 'BANTUL' cocok dengan 'KABUPATEN BANTUL'.
// - Perbaikan race AJAX: AHU mengosongkan lalu mengisi ulang dropdown anak SETELAH AJAX kembali
//   (loadDataById: empty() lalu append opsi). final6 menganggap anak 'siap' hanya karena
//   sudah ada opsi nyata, padahal itu bisa opsi basi dari record sebelumnya; kalau AJAX
//   provinsi/kab kembali belakangan, nilai yang sudah diisi ikut ter-reset (gejala user:
//   kecamatan BAMBANGLIPURO terisi, kabupaten BANTUL malah reset). final7 menunggu
//   daftar anak BENAR-BENAR berubah (snapshot opsi) atau indikator loading AHU muncul
//   lalu hilang, baru memilih anak, lalu memverifikasi ulang keempat wilayah di akhir
//   dan mengulang cascade sekali bila ada yang tidak cocok, bukan diam-diam lanjut.
// - Nama stale: tombol Next/Prev final6 hanya mengganti ringkasan panel, form AHU tetap
//   berisi data record sebelumnya sampai 'Isi record' diklik. final7 mengosongkan
//   field pemberi/debitur/wilayah di form saat Next/Prev diklik, dan di awal fillRecord
//   field nama dikosongkan dulu sebelum diisi ulang; setelah fillRecord, nilai
//   #pemberi diverifikasi sama dengan nm_pemberi record ini, kalau masih beda
//   dilaporkan sebagai failure, bukan dibiarkan lolos sebagai nama record lama.
(() => {
  'use strict';
  // Guard: run only on the Fidusia registration form found in the supplied HTML.
  if (!document.querySelector('#form_daftar')) return;
  if (document.querySelector('#ahuCsvAutofillPanel')) return;

  const state = { rows: [], headers: [], index: 0, fileName: '', pemberiType: '2', batches: [], batchKey: '' };
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const panel = document.createElement('section');
  panel.id = 'ahuCsvAutofillPanel';
  panel.innerHTML = `
    <div class="ahu-head">
      <div style="display:flex;align-items:center;gap:7px;min-width:0">
        <div style="width:23px;height:23px;flex:none;border-radius:7px;background:#064e3b;color:#6ee7b7;display:grid;place-items:center;font-size:12px">✓</div>
        <div style="min-width:0"><div class="ahu-title" style="font-size:12px;font-weight:700;letter-spacing:0">AHU Fidusia Autofill</div><div class="ahu-muted" style="font-size:9px;margin-top:1px">v2.3.1-final32</div></div>
      </div>
      <button type="button" id="ahuMin" title="Minimalkan">−</button>
    </div>
    <div id="ahuBody">
      <button type="button" id="ahuCopyFederal" title="Klik untuk menyalin teks"><span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">FEDERAL INTER</span><span style="font-size:11px;font-weight:500;flex:none">Klik untuk salin</span></button>
      <div id="ahuRecordSummary" class="ahu-note" aria-live="polite">Excel: belum dipilih</div>
      <label class="ahu-label">Batch (kolom REQ)
        <select id="ahuBatch" style="display:block;width:100%;margin:5px 0 0;padding:7px;border:1px solid #374151;border-radius:9px;background:#0b1220;color:#f9fafb">
          <option value="" selected>Semua record</option>
        </select>
      </label>
      <div style="display:flex;gap:6px">
        <input id="ahuJump" type="text" placeholder="Loncat di batch ini: No. Akta (80) / #record (#5)" style="flex:1;min-width:0;padding:7px 9px;border:1px solid #374151;border-radius:9px;background:#0b1220;color:#f9fafb;font-size:12px">
        <button type="button" id="ahuJumpBtn" style="flex:none;padding:7px 12px">Loncat</button>
      </div>
      <label class="ahu-label">Pilih file Excel (.xlsx) <input id="ahuCsvFile" type="file" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"></label>
      <div id="ahuFileInfo">Belum ada file.</div>
      <label style="display:flex;align-items:center;gap:7px;font-weight:600;color:#d1d5db;font-size:12px">
        <input type="checkbox" id="ahuAnimasi" checked style="accent-color:#10b981;width:15px;height:15px;flex:none"> Animasi ketik
        <select id="ahuAnimasiSpeed" title="Kecepatan ketik" style="margin-left:auto;flex:none;font-size:11px">
          <option value="cepat" selected>Cepat (10 ms)</option>
          <option value="normal">Normal (25 ms)</option>
        </select>
      </label>
      <div class="ahu-main-actions">
        <button type="button" id="ahuFill" disabled>Isi record</button>
        <button type="button" id="ahuFillRecipient" disabled>Isi kontak + Lebak Bulus</button>
      </div>
      <div class="ahu-nav-actions">
        <button type="button" id="ahuPrev" disabled>← Prev</button>
        <button type="button" id="ahuNext" disabled>Next →</button>
      </div>
      <div id="ahuProgress">Record 0 / 0</div>
      <div id="ahuStatus" role="status">Menunggu file Excel.</div>
      <details>
        <summary>Format Excel dan batasan</summary>
        <p>Panel bisa digeser (tarik header) dan diperbesar/diperkecil (tarik grip \u2198 di sudut kanan-bawah) — tulisan dan kotak ikut mengecil/membesar; posisi dan ukuran tersimpan otomatis.</p>
        <p>Header Excel dicocokkan dengan properti <code>name</code>/<code>id</code> DOM, misalnya <code>nm_pemberi</code>, <code>nik_npwp_pemberi</code>, <code>no_akta</code>, <code>tgl_akta</code>, <code>pokok_dasar</code>. Jenis pemberi (Perseorangan/Korporasi) diambil otomatis dari kolom <code>tipe_pemberi</code> di Excel; bila kosong, ditebak dari NIK (16 digit = Perseorangan) atau nama (PT/CV = Korporasi). Batch dipilih dari kolom <code>request</code> (REQ, misal 05/11); Next/Prev dan Kotak Loncat HANYA bergerak di dalam batch yang dipilih — Loncat tidak pernah pindah batch. Ketik No. Akta (misal 80) untuk loncat ke akta itu di batch ini; ketik #N (misal #5) untuk record ke-N di batch ini. Bila akta tidak ada di batch ini, Loncat gagal (batch tetap). Untuk loncat bebas ke semua record, pilih dulu 'Semua record' di dropdown batch. No. Akta dobel antar bulan diselesaikan oleh batch yang dipilih. Untuk radio/checkbox lain, isi nilai <code>value</code>. Untuk select, isi value option; bila tidak cocok, skrip mencoba mencocokkan teks option.</p>
        <p>Isi record mengisi form pemberi. Untuk penerima korporasi, buka modal “Tambah Data”, lalu klik “Isi modal penerima”. Script memilih Korporasi > Korporasi Indonesia > PT, mengetik nama PT FEDERAL INTERNATIONAL FINANCE, lalu menunggu pengguna memilih hasil resmi AHU secara manual. Setelah identitas resmi terisi dari AHU, script mengisi telepon/email dari CSV. Identitas badan hukum berasal dari AHU. Setelah identitas AHU terdeteksi, script mengisi telepon, email, kantor cabang SELALU 'PT Federal International Finance Cabang Yogyakarta', dan memilih Kelurahan LEBAK BULUS jika opsi tersedia. Script tidak menekan Simpan atau submit pengajuan/pembayaran. Dropdown bertingkat diberi jeda dan harus diverifikasi manual. Bagian F dapat diisi melalui header jaminan_fidusia[] dan penjaminan_obyek (kode kategori 1–10).</p>
      </details>
    </div>
    <div id="ahuResize" title="Tarik untuk memperbesar / memperkecil panel — tulisan ikut mengecil/membesar">\u2198</div>`;
  document.body.appendChild(panel);

  const css = document.createElement('style');
  css.textContent = `
    #ahuCsvAutofillPanel{color-scheme:dark;position:fixed;z-index:2147483647;left:16px;right:auto;bottom:16px;width:min(280px,calc(100vw - 32px));max-width:calc(100vw - 20px);max-height:none;overflow:visible;background:#111827;color:#f9fafb;border:1px solid #374151;border-radius:18px;box-shadow:0 18px 48px rgba(0,0,0,.38);font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:13px}
    #ahuCsvAutofillPanel *{box-sizing:border-box} #ahuCsvAutofillPanel *{min-width:0}
    #ahuCsvAutofillPanel .ahu-head{display:flex;justify-content:space-between;align-items:center;gap:10px;background:linear-gradient(135deg,#0b1220,#1f2937);color:#f9fafb;padding:8px 10px;border-bottom:1px solid #273449;position:sticky;top:0;z-index:2;cursor:grab;touch-action:none;user-select:none} #ahuCsvAutofillPanel .ahu-head .ahu-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    #ahuCsvAutofillPanel .ahu-head strong{font-size:13px}
    #ahuCsvAutofillPanel button{cursor:pointer;border:1px solid #374151;background:#1f2937;border-radius:10px;padding:5px 7px;color:#e5e7eb;font-size:12px;transition:background .18s,border-color .18s,transform .18s}
    #ahuCsvAutofillPanel button:hover:not(:disabled){filter:brightness(1.15)}
    #ahuCsvAutofillPanel button:active:not(:disabled){transform:scale(.985)}
    #ahuCsvAutofillPanel .ahu-head button{background:#273449;color:#d1d5db;border:1px solid #3b475b;padding:3px 8px}
    #ahuCsvAutofillPanel #ahuBody{padding:8px 8px 14px;display:grid;gap:7px} #ahuCsvAutofillPanel #ahuBody[hidden]{display:none}
    #ahuCsvAutofillPanel .ahu-muted{color:#9ca3af}
    #ahuCsvAutofillPanel #ahuCopyFederal{display:flex;justify-content:space-between;align-items:center;gap:8px;width:100%;text-align:left;font-size:15px;font-weight:800;letter-spacing:.4px;margin:0;padding:8px 10px;background:#172235;color:#d1d5db;border:1px solid #2d3b50;border-radius:10px}
    #ahuCsvAutofillPanel .ahu-note{background:#0b1220;border:1px solid #273449;padding:7px 8px;border-radius:10px;margin:0;overflow-wrap:anywhere;color:#f9fafb} #ahuCsvAutofillPanel #ahuRecordSummary strong{font-weight:800} #ahuCsvAutofillPanel #ahuRecordSummary div{margin:2px 0;overflow-wrap:anywhere}
    #ahuCsvAutofillPanel .ahu-label{display:block;font-weight:600;color:#d1d5db} #ahuCsvAutofillPanel input[type=file]{display:block;max-width:100%;width:100%;margin-top:5px;font-size:11px;color:#f9fafb;background:#0b1220}
    #ahuCsvAutofillPanel input::placeholder{color:#6b7280} #ahuCsvAutofillPanel input:focus{outline:2px solid #10b981;outline-offset:1px}
    #ahuCsvAutofillPanel select{max-width:100%;font-size:12px;padding:5px!important;color:#f9fafb;background:#0b1220;border:1px solid #374151;border-radius:9px}
    #ahuCsvAutofillPanel .ahu-main-actions{display:flex;flex-direction:column;gap:7px;margin:0} #ahuCsvAutofillPanel .ahu-main-actions #ahuFill{width:100%;padding:12px 10px;font-size:15px;font-weight:800;letter-spacing:.2px;color:#fff;background:#059669;border:1px solid #10b981;border-radius:10px;box-shadow:0 5px 14px rgba(5,150,105,.2)} #ahuCsvAutofillPanel .ahu-main-actions #ahuFill:hover:not(:disabled){filter:brightness(1.12)} #ahuCsvAutofillPanel .ahu-main-actions #ahuFillRecipient{width:100%;padding:10px;font-size:13.5px;font-weight:700;color:#e5e7eb;background:#1f2937;border:1px solid #374151;border-radius:10px}
    #ahuCsvAutofillPanel .ahu-nav-actions{display:flex;gap:8px;margin:0} #ahuCsvAutofillPanel .ahu-nav-actions button{flex:1;padding:9px 6px;font-size:13px;font-weight:700;color:#e5e7eb;background:#1f2937;border:1px solid #374151;border-radius:10px}
    #ahuCsvAutofillPanel button:disabled{opacity:.45;cursor:not-allowed}
    #ahuCsvAutofillPanel #ahuStatus{padding:7px 8px;background:#0b1220;border:1px solid #273449;border-radius:10px;overflow-wrap:anywhere;color:#d1d5db}
    #ahuCsvAutofillPanel #ahuProgress,#ahuCsvAutofillPanel #ahuFileInfo{margin-top:0;color:#9ca3af;font-size:11px;overflow-wrap:anywhere}
    #ahuCsvAutofillPanel details{margin-top:0} #ahuCsvAutofillPanel summary{cursor:pointer;font-weight:600;color:#d1d5db}
    #ahuCsvAutofillPanel details p{color:#d1d5db;overflow-wrap:anywhere} #ahuCsvAutofillPanel #ahuResize{position:absolute;right:3px;bottom:3px;width:14px;height:14px;cursor:nwse-resize;z-index:3;font-size:11px;line-height:14px;color:#6b7280;text-align:center;user-select:none;touch-action:none}
    #ahuCsvAutofillPanel code{overflow-wrap:anywhere;background:#0b1220;color:#a7f3d0;padding:1px 3px;border-radius:4px;border:1px solid #273449}
    /* final32: sorotan tombol "cek data" di form AHU (di luar panel) */
    .ahu-cekdata-highlight{outline:3px solid #f97316 !important;outline-offset:2px;border-radius:6px;animation:ahuCekDataPulse 1s ease-in-out infinite}
    @keyframes ahuCekDataPulse{0%,100%{box-shadow:0 0 0 0 rgba(249,115,22,.45)}50%{box-shadow:0 0 0 8px rgba(249,115,22,0)}}`;
  document.head.appendChild(css);

  const $ = sel => panel.querySelector(sel);

  // final29: panel responsif — geser (tarik header) + skala isi (grip ↘).
  // Grip mengubah ZOOM panel (bukan lebar): semua tulisan + kotak ikut
  // mengecil/membesar sebanding dengan panel. Lebar layout panel tetap
  // (base); tinggi mengikuti isi otomatis (auto) supaya tidak ada scroll.
  // Skala + posisi tersimpan di localStorage.
  const PANEL_RECT_KEY = 'pma_ahu_panel_rect_v29';
  const PANEL_RECT_KEY_OLD = 'pma_ahu_panel_rect_v28';
  const PANEL_BASE_W = 280; // lebar layout panel (px) sebelum zoom
  const PANEL_MIN_SCALE = 0.6;  // teks ~8px pada base 13px
  const PANEL_MAX_SCALE = 1.8;
  let panelScale = 1;
  // Lebar layout panel saat zoom=1 (ditangkap sebelum skala diterapkan).
  const panelBaseW = Math.max(200, panel.getBoundingClientRect().width || PANEL_BASE_W);
  const maxScaleByViewport = () => Math.max(PANEL_MIN_SCALE, (window.innerWidth - 20) / panelBaseW);
  const clampScale = s => Math.max(PANEL_MIN_SCALE, Math.min(s, Math.min(PANEL_MAX_SCALE, maxScaleByViewport())));
  const loadPanelRect = () => {
    try {
      let raw = localStorage.getItem(PANEL_RECT_KEY);
      if (raw) {
        const r = JSON.parse(raw);
        if (r && typeof r === 'object') return r;
      }
      // Migrasi dari final28: lebar tersimpan -> skala.
      raw = localStorage.getItem(PANEL_RECT_KEY_OLD);
      if (raw) {
        const r = JSON.parse(raw);
        if (r && typeof r === 'object') {
          const out = {};
          if (Number.isFinite(r.w)) out.scale = clampScale(r.w / PANEL_BASE_W);
          if (Number.isFinite(r.l) && Number.isFinite(r.t)) { out.l = r.l; out.t = r.t; }
          return out;
        }
      }
    } catch (e) { /* abaikan */ }
    return null;
  };
  const savePanelRect = () => {
    try {
      const r = panel.getBoundingClientRect();
      localStorage.setItem(PANEL_RECT_KEY, JSON.stringify({
        scale: panelScale,
        l: Math.round(r.left),
        t: Math.round(r.top)
      }));
    } catch (e) { /* penyimpanan posisi tidak wajib untuk autofill */ }
  };
  const applyScale = (s) => {
    panelScale = clampScale(s);
    panel.style.zoom = String(panelScale);
  };
  // Terapkan skala + posisi tersimpan (bila ada).
  const savedRect = loadPanelRect();
  if (savedRect) {
    if (Number.isFinite(savedRect.scale)) applyScale(savedRect.scale);
    if (Number.isFinite(savedRect.l) && Number.isFinite(savedRect.t)) {
      panel.style.left = Math.max(0, Math.min(savedRect.l, window.innerWidth - 100)) + 'px';
      panel.style.top = Math.max(0, Math.min(savedRect.t, window.innerHeight - 60)) + 'px';
      panel.style.bottom = 'auto';
    }
  }
  // Geser panel: tarik header (bukan tombol minimize).
  const headEl = panel.querySelector('.ahu-head');
  if (headEl) {
    headEl.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button')) return;
      e.preventDefault();
      const rect = panel.getBoundingClientRect();
      // Pindah ke koordinat left/top (dari bottom) supaya bisa digeser.
      panel.style.left = rect.left + 'px';
      panel.style.top = rect.top + 'px';
      panel.style.bottom = 'auto';
      panel.style.right = 'auto';
      const startX = e.clientX, startY = e.clientY;
      const startL = rect.left, startT = rect.top;
      headEl.style.cursor = 'grabbing';
      const onMove = (ev) => {
        const w = panel.getBoundingClientRect().width;
        const l = Math.max(0, Math.min(startL + (ev.clientX - startX), window.innerWidth - Math.min(w, 120)));
        const t = Math.max(0, Math.min(startT + (ev.clientY - startY), window.innerHeight - 40));
        panel.style.left = l + 'px';
        panel.style.top = t + 'px';
      };
      const onUp = () => {
        headEl.removeEventListener('pointermove', onMove);
        headEl.removeEventListener('pointerup', onUp);
        headEl.removeEventListener('pointercancel', onUp);
        headEl.style.cursor = '';
        savePanelRect();
      };
      // final31: pointer capture supaya drag tidak nyangkut bila mouse
      // dilepas di luar jendela (pointerup tetap sampai ke header).
      try { headEl.setPointerCapture(e.pointerId); } catch (_) {}
      headEl.addEventListener('pointermove', onMove);
      headEl.addEventListener('pointerup', onUp);
      headEl.addEventListener('pointercancel', onUp);
    });
  }
  // Skala isi: tarik grip ↘ di sudut kanan-bawah. Semua tulisan + kotak
  // ikut mengecil/membesar sebanding. Tinggi tetap auto (isi).
  const gripEl = panel.querySelector('#ahuResize');
  if (gripEl) {
    gripEl.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const startVisualW = panel.getBoundingClientRect().width;
      const minVisualW = panelBaseW * PANEL_MIN_SCALE;
      const maxVisualW = Math.min(panelBaseW * PANEL_MAX_SCALE, window.innerWidth - 20);
      const onMove = (ev) => {
        const w = Math.max(minVisualW, Math.min(startVisualW + (ev.clientX - startX), maxVisualW));
        applyScale(w / panelBaseW);
      };
      const onUp = () => {
        gripEl.removeEventListener('pointermove', onMove);
        gripEl.removeEventListener('pointerup', onUp);
        gripEl.removeEventListener('pointercancel', onUp);
        savePanelRect();
      };
      // final31: pointer capture supaya grip tidak nyangkut bila mouse
      // dilepas di luar jendela.
      try { gripEl.setPointerCapture(e.pointerId); } catch (_) {}
      gripEl.addEventListener('pointermove', onMove);
      gripEl.addEventListener('pointerup', onUp);
      gripEl.addEventListener('pointercancel', onUp);
    });
  }

  $('#ahuCopyFederal').addEventListener('click', async () => {
    const textToCopy = 'FEDERAL INTER';
    try {
      await navigator.clipboard.writeText(textToCopy);
      status('Teks FEDERAL INTER berhasil disalin.');
    } catch (_) {
      const helper = document.createElement('textarea');
      helper.value = textToCopy; helper.style.position = 'fixed'; helper.style.opacity = '0';
      document.body.appendChild(helper); helper.select();
      const ok = document.execCommand('copy'); helper.remove();
      status(ok ? 'Teks FEDERAL INTER berhasil disalin.' : 'Salin teks FEDERAL INTER secara manual.', !ok);
    }
  });
  const status = (msg, bad=false) => {
    $('#ahuStatus').textContent = msg;
    $('#ahuStatus').style.background = bad ? '#450a0a' : '#0b1220';
    $('#ahuStatus').style.color = bad ? '#fca5a5' : '#d1d5db';
  };
  const update = () => {
    // final24: navigasi dibatasi batch yang dipilih (batchIndices); progress
    // tampil posisi di dalam batch + nama batch + total record.
    const idxs = batchIndices();
    const pos = idxs.indexOf(state.index);
    const batchLabel = state.batchKey ? (state.batches.find(b => b.key === state.batchKey)?.label || state.batchKey) : '';
    $('#ahuProgress').textContent = state.rows.length
      ? `Record ${pos >= 0 ? pos + 1 : 1} / ${idxs.length}${batchLabel ? ` \u00b7 Batch ${batchLabel}` : ''} \u00b7 Total ${state.rows.length}`
      : 'Record 0 / 0';
    $('#ahuPrev').disabled = !state.rows.length || pos <= 0;
    $('#ahuFill').disabled = !state.rows.length;
    $('#ahuFillRecipient').disabled = !state.rows.length;
    $('#ahuNext').disabled = !state.rows.length || pos < 0 || pos >= idxs.length - 1;
    const summary = $('#ahuRecordSummary');
    if (summary) {
      summary.replaceChildren();
      const addLine = (label, value) => {
        const line = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = label + ': ';
        line.append(strong, document.createTextNode(String(value || '—')));
        summary.appendChild(line);
      };
      addLine('Excel', state.fileName || 'belum dipilih');
      const row = state.rows[state.index] || {};
      addLine('Batch (REQ)', row.request || '—');
      addLine('Jenis Pemberi', deriveTipePemberi(row) === '2' ? 'Perseorangan' : 'Korporasi');
      // Urutan ringkasan panel sesuai revisi user 2026-11-01.
      // Alamat Lengkap gabungan dan No. KTP/NIK dihapus dari ringkasan
      // (datanya tetap diisi ke form seperti biasa, hanya tampilannya diganti
      // wilayah terpisah). Nilai kosong tetap tampil '—'.
      addLine('Nama Pemberi', row.nm_pemberi || '—');
      addLine('Nama Debitur', row.nm_debitur || '—');
      addLine('Kabupaten', row.sel_kab_kota || row.kab_kota_pemberi || '—');
      addLine('Kecamatan', row.kecamatan_pemberi || '—');
      addLine('Kelurahan', row.kelurahan_pemberi || '—');
      const rtRw = [
        row.rt_pemberi ? `RT ${row.rt_pemberi}` : '',
        row.rw_pemberi ? `RW ${row.rw_pemberi}` : ''
      ].filter(v => String(v || '').trim()).join(' / ');
      addLine('RT/RW', rtRw || '—');
      addLine('No. Akta', row.no_akta || '—');
      addLine('Tgl. Akta', row.tgl_akta || '—');
      addLine('No. Perjanjian', row.no_perjanjian || '—');
      addLine('Harga Barang', row['category[0][input][~b]'] || '—');
      addLine('Pokok Pembiayaan', row.pokok_dasar || '—');
      addLine('Nilai Penjaminan', row['jaminan_fidusia[]'] || '—');
    }
  };

  function dispatch(el) {
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // final32 (perintah user 2026-11-13 "gas final 32"): animasi ketik + auto-scroll.
  // - typeInto: ketik per huruf seperti orang mengetik (default Cepat 10 ms/huruf).
  //   Event `input` dipicu per huruf (persis ketikan manual); `change` HANYA
  //   sekali di akhir (bukan per huruf) supaya handler AHU yang mendengarkan
  //   `change` tidak terpicu berkali-kali di tengah nilai. Bila animasi
  //   dimatikan di panel, isi instan seperti final31.
  // - scrollToField: geser layar (smooth) ke field yang sedang diisi, hanya
  //   bila field itu di luar layar — supaya pengisian tidak terasa pelan.
  // - highlightCekData: di akhir pengisian, scroll ke area rangka (noka) dan
  //   sorot tombol "cek data" supaya user langsung menemukannya. TIDAK PERNAH
  //   mengklik tombol itu; submit/Simpan/bayar tetap manual.
  const ANIM_MS_FAST = 10;
  const ANIM_MS_NORMAL = 25;
  function animEnabled() {
    const cb = panel.querySelector('#ahuAnimasi');
    return !cb || cb.checked; // default ON
  }
  function animMsPerChar() {
    const sel = panel.querySelector('#ahuAnimasiSpeed');
    if (!sel) return ANIM_MS_FAST;
    return sel.value === 'normal' ? ANIM_MS_NORMAL : ANIM_MS_FAST;
  }
  function isInViewport(el) {
    try {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top >= 0 && r.bottom <= vh;
    } catch (_) { return false; }
  }
  async function scrollToField(el) {
    try {
      if (!el || typeof el.scrollIntoView !== 'function') return;
      if (isInViewport(el)) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // final32 (perbaikan 2026-11-13): tunggu scroll smooth benar-benar
      // selesai (field masuk viewport) sebelum field diisi, supaya layar
      // berhenti di tiap field satu per satu, bukan mengejar animasi yang
      // belum selesai. Timeout ~1000 ms supaya scroll yang macet tidak
      // menggantung pengisian.
      const deadline = Date.now() + 1000;
      while (Date.now() < deadline) {
        await sleep(50);
        if (isInViewport(el)) return;
      }
    } catch (_) {}
  }
  async function typeInto(el, text) {
    const value = String(text ?? '');
    if (!animEnabled()) { el.value = value; dispatch(el); return true; }
    try { el.focus({ preventScroll: true }); } catch (_) { try { el.focus(); } catch (_) {} }
    el.value = '';
    const delay = animMsPerChar();
    for (const ch of value) {
      el.value += ch;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      if (delay > 0) await sleep(delay);
    }
    dispatch(el);
    return true;
  }
  function findCekDataButton() {
    const isCekData = el => {
      if (!el) return false;
      const t = String(el.value || el.textContent || '').trim().toLowerCase();
      return t.includes('cek data');
    };
    // 1) Cari di sekitar field rangka (noka) — container terdekat yang memuat tombol.
    const rangkaEls = [...document.querySelectorAll('input,textarea')].filter(el =>
      /^category\[\d+\]\[input\]\[22\]$/.test(el.name || ''));
    for (const r of rangkaEls) {
      let node = r;
      for (let d = 0; d < 6 && node; d++) {
        node = node.parentElement;
        if (!node) break;
        const btn = [...node.querySelectorAll('button,input[type="button"],input[type="submit"]')].find(isCekData);
        if (btn) return btn;
      }
    }
    // 2) Fallback: cari di seluruh form.
    const form = document.querySelector('#form_daftar') || document;
    return [...form.querySelectorAll('button,input[type="button"],input[type="submit"]')].find(isCekData) || null;
  }
  async function highlightCekData() {
    const rangkaEl = [...document.querySelectorAll('input,textarea')].find(el =>
      /^category\[\d+\]\[input\]\[22\]$/.test(el.name || ''));
    const target = rangkaEl || document.querySelector('[name*="rangka"], [id*="rangka"]');
    if (target) {
      await scrollToField(target);
      await sleep(200);
    }
    const btn = findCekDataButton();
    if (!btn) return; // tombol tidak ditemukan: cukup scroll ke rangka, berhenti.
    try { btn.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (_) {}
    btn.classList.add('ahu-cekdata-highlight');
    const clear = () => btn.classList.remove('ahu-cekdata-highlight');
    btn.addEventListener('click', clear, { once: true });
    setTimeout(clear, 8000);
  }

  function findControls(header) {
    // Compare the actual DOM properties instead of building CSS selectors from
    // names containing brackets. Some AHU controls live outside #form_daftar.
    const all = [...document.querySelectorAll('input,textarea,select')];
    let matches = all.filter(el => el.name === header || el.id === header);
    if (header === 'tgl_akta') {
      matches.push(...all.filter(el => el.name === 'tgl_akta' || el.id === 'd'));
    }
    // Bagian E: pilih kategori/jenis objek lebih dulu; load_category() membuat field dinamis.
    // Tunggu setelah dropdown berubah agar field Merk/Tipe/Rangka/Mesin/Bukti/Nilai tersedia.
    // Object fields are generated asynchronously by load_category(). The
    // first category index is runtime-generated (often 1, not Excel's 0), so
    // match the trailing control path, e.g. category[1][select][-1].
    const cat = header.match(/^category\[\d+\]\[(select|input)\]\[([^\]]+)\]$/);
    if (cat) {
      const [, kind, tail] = cat;
      matches.push(...all.filter(el => {
        if (el.tagName !== (kind === 'select' ? 'SELECT' : 'INPUT')) return false;
        const m = (el.name || '').match(/^category\[\d+\]\[(select|input)\]\[([^\]]+)\]$/);
        return !!m && m[1] === kind && m[2] === tail;
      }));
    }
    return [...new Set(matches)].filter(el => !el.disabled && !el.readOnly && el.type !== 'hidden');
  }

  // final21: beberapa name dipakai dua kelompok radio (gender perseorangan vs
  // sub-tipe korporasi tersembunyi) — pilih radio yang terlihat di layar.
  function pickRadio(group, value) {
    const visible = group.filter(x => !!(x.offsetWidth || x.offsetHeight || x.getClientRects().length));
    return (visible.length ? visible : group).find(x => x.value === value) || null;
  }
  async function setValue(el, raw) {
    const value = String(raw ?? '').trim();
    // final32: layar mengikuti pengisian — scroll ke field sebelum diisi.
    await scrollToField(el);
    if (el.type === 'radio') {
      const group = [...document.querySelectorAll(`input[type="radio"][name="${CSS.escape(el.name)}"]`)];
      const target = pickRadio(group, value); // final21: utamakan radio yang terlihat.
      if (!target) return false;
      target.checked = true; dispatch(target); target.click(); return true;
    }
    if (el.type === 'checkbox') {
      const wanted = ['1','true','yes','ya','checked','on'].includes(value.toLowerCase());
      el.checked = wanted; dispatch(el); return true;
    }
    if (el.tagName === 'SELECT') {
      let opt = [...el.options].find(o => o.value === value);
      if (!opt) opt = [...el.options].find(o => o.text.trim().toLowerCase() === value.toLowerCase());
      if (!opt) return value === '';
      el.value = opt.value; dispatch(el); return true;
    }
    // final32: input teks biasa diketik per huruf (animasi), bukan instan.
    await typeInto(el, value);
    return true;
  }

  // final7: normalisasi wilayah AHU vs Excel.
  // 'BAMBANG LIPURO' == 'BAMBANGLIPURO', 'BANTUL' == 'KABUPATEN BANTUL',
  // 'KEC. BAMBANGLIPURO' == 'BAMBANGLIPURO'. Spasi, titik, dan tanda hubung
  // diabaikan, awalan admin di depan dihapus sebelum dibandingkan.
  function normWilayah(raw) {
    let v = String(raw ?? '').trim().toUpperCase();
    v = v.replace(/^(KABUPATEN|KAB\.?|KOTA|KECAMATAN|KEC\.?|KELURAHAN|KEL\.?|DESA)\s+/, '');
    v = v.replace(/[^A-Z0-9]/g, '');
    return v;
  }

  // final22: peta kab/kota -> provinsi (nama resmi AHU) untuk inferensi provinsi
  // bila kolom provinsi_pemberi kosong di Excel. Urutan penting: DIY dulu, lalu
  // provinsi lain; pencocokan substring pada kab yang sudah dinormalisasi
  // (awalan KABUPATEN/KOTA dihapus, spasi/tanda baca diabaikan oleh normWilayah).
  const KAB_KE_PROVINSI = [
    // DIY (5 kab/kota)
    ['BANTUL', 'DAERAH ISTIMEWA YOGYAKARTA'],
    ['SLEMAN', 'DAERAH ISTIMEWA YOGYAKARTA'],
    ['GUNUNGKIDUL', 'DAERAH ISTIMEWA YOGYAKARTA'],
    ['KULONPROGO', 'DAERAH ISTIMEWA YOGYAKARTA'],
    ['YOGYAKARTA', 'DAERAH ISTIMEWA YOGYAKARTA'],
    // Jawa Tengah
    ['MAGELANG', 'JAWA TENGAH'], ['PATI', 'JAWA TENGAH'], ['SEMARANG', 'JAWA TENGAH'],
    ['SURAKARTA', 'JAWA TENGAH'], ['SOLO', 'JAWA TENGAH'], ['BOYOLALI', 'JAWA TENGAH'],
    ['KLATEN', 'JAWA TENGAH'], ['SUKOHARJO', 'JAWA TENGAH'], ['KARANGANYAR', 'JAWA TENGAH'],
    ['SRAGEN', 'JAWA TENGAH'], ['GROBOGAN', 'JAWA TENGAH'], ['BLORA', 'JAWA TENGAH'],
    ['REMBANG', 'JAWA TENGAH'], ['KUDUS', 'JAWA TENGAH'], ['JEPARA', 'JAWA TENGAH'],
    ['DEMAK', 'JAWA TENGAH'], ['KENDAL', 'JAWA TENGAH'], ['BATANG', 'JAWA TENGAH'],
    ['PEKALONGAN', 'JAWA TENGAH'], ['PEMALANG', 'JAWA TENGAH'], ['TEGAL', 'JAWA TENGAH'],
    ['BREBES', 'JAWA TENGAH'], ['CILACAP', 'JAWA TENGAH'], ['BANYUMAS', 'JAWA TENGAH'],
    ['PURBALINGGA', 'JAWA TENGAH'], ['BANJARNEGARA', 'JAWA TENGAH'], ['KEBUMEN', 'JAWA TENGAH'],
    ['PURWOREJO', 'JAWA TENGAH'], ['WONOSOBO', 'JAWA TENGAH'], ['TEMANGGUNG', 'JAWA TENGAH'],
    ['WONOGIRI', 'JAWA TENGAH'], ['SALATIGA', 'JAWA TENGAH'],
    // Jawa Timur
    ['SURABAYA', 'JAWA TIMUR'], ['MALANG', 'JAWA TIMUR'], ['KEDIRI', 'JAWA TIMUR'],
    ['MADIUN', 'JAWA TIMUR'], ['MOJOKERTO', 'JAWA TIMUR'], ['PASURUAN', 'JAWA TIMUR'],
    ['PROBOLINGGO', 'JAWA TIMUR'], ['JEMBER', 'JAWA TIMUR'], ['BANYUWANGI', 'JAWA TIMUR'],
    ['BLITAR', 'JAWA TIMUR'], ['TULUNGAGUNG', 'JAWA TIMUR'], ['TRENGGALEK', 'JAWA TIMUR'],
    ['PONOROGO', 'JAWA TIMUR'], ['NGAWI', 'JAWA TIMUR'], ['MAGETAN', 'JAWA TIMUR'],
    ['BONDOWOSO', 'JAWA TIMUR'], ['SITUBONDO', 'JAWA TIMUR'], ['LUMAJANG', 'JAWA TIMUR'],
    ['SIDOARJO', 'JAWA TIMUR'], ['GRESIK', 'JAWA TIMUR'], ['BANGKALAN', 'JAWA TIMUR'],
    ['SAMPANG', 'JAWA TIMUR'], ['PAMEKASAN', 'JAWA TIMUR'], ['SUMENEP', 'JAWA TIMUR'],
    ['TUBAN', 'JAWA TIMUR'], ['LAMONGAN', 'JAWA TIMUR'], ['BOJONEGORO', 'JAWA TIMUR'],
    ['NGANJUK', 'JAWA TIMUR'], ['JOMBANG', 'JAWA TIMUR'], ['BATU', 'JAWA TIMUR'],
    // Jawa Barat
    ['BANDUNG', 'JAWA BARAT'], ['BEKASI', 'JAWA BARAT'], ['BOGOR', 'JAWA BARAT'],
    ['DEPOK', 'JAWA BARAT'], ['CIMAHI', 'JAWA BARAT'], ['TASIKMALAYA', 'JAWA BARAT'],
    ['CIREBON', 'JAWA BARAT'], ['SUKABUMI', 'JAWA BARAT'], ['KARAWANG', 'JAWA BARAT'],
    ['PURWAKARTA', 'JAWA BARAT'], ['SUBANG', 'JAWA BARAT'], ['INDRAMAYU', 'JAWA BARAT'],
    ['KUNINGAN', 'JAWA BARAT'], ['MAJALENGKA', 'JAWA BARAT'], ['SUMEDANG', 'JAWA BARAT'],
    ['GARUT', 'JAWA BARAT'], ['CIANJUR', 'JAWA BARAT'], ['CIAMIS', 'JAWA BARAT'],
    ['BANJAR', 'JAWA BARAT'], ['PANGANDARAN', 'JAWA BARAT'],
    // Banten
    ['TANGERANGSELATAN', 'BANTEN'], ['TANGERANG', 'BANTEN'], ['SERANG', 'BANTEN'],
    ['CILEGON', 'BANTEN'], ['LEBAK', 'BANTEN'], ['PANDEGLANG', 'BANTEN'],
    // DKI Jakarta
    ['JAKARTA', 'DKI JAKARTA'],
    // Lampung
    ['LAMPUNGTIMUR', 'LAMPUNG'], ['LAMPUNGBARAT', 'LAMPUNG'], ['LAMPUNGSELATAN', 'LAMPUNG'],
    ['LAMPUNGTENGAH', 'LAMPUNG'], ['LAMPUNGUTARA', 'LAMPUNG'], ['BANDARLAMPUNG', 'LAMPUNG'],
    ['METRO', 'LAMPUNG'], ['PESAWARAN', 'LAMPUNG'], ['PRINGSEWU', 'LAMPUNG'],
    ['TULANGBAWANG', 'LAMPUNG'], ['MESUJI', 'LAMPUNG'], ['TANGGAMUS', 'LAMPUNG'],
    ['WAYKANAN', 'LAMPUNG'],
  ];
  function inferProvinsi(kabRaw, kecRaw) {
    const kab = normWilayah(kabRaw || '');
    if (kab) {
      for (const [key, prov] of KAB_KE_PROVINSI) {
        if (kab.includes(key)) return prov;
      }
    }
    // Fallback lama: kecamatan yang sudah pasti DIY.
    const kec = String(kecRaw || '').trim().toUpperCase();
    if (kec === 'SEWON' || kec === 'UMBULHARJO' || kec === 'BANGUNTAPAN') {
      return 'DAERAH ISTIMEWA YOGYAKARTA';
    }
    return '';
  }

  // final24: jenis pemberi diambil dari kolom tipe_pemberi Excel; bila kosong,
  // ditebak dari NIK/nama. Dropdown panel dihapus — tidak ada lagi pilihan manual.
  function deriveTipePemberi(row) {
    const t = String(row.tipe_pemberi || '').trim();
    if (t === '1' || t === '2') return t;
    const nik = String(row.nik_npwp_pemberi || '').trim();
    if (/^\d{16}$/.test(nik)) return '2'; // NIK 16 digit = perorangan
    const nama = String(row.nm_pemberi || '').trim().toUpperCase();
    if (/^(PT\.?|CV\.?|UD\.?|PD\.?|FA\.?|KOPERASI|YAYASAN|PERUM|BUMN|BUMD)\b/.test(nama)) return '1';
    return '2'; // default perorangan (mayoritas)
  }

  // final24: batch dari kolom request (REQ). state.batches = [{key, label, indices}].
  // key '' = Semua. indices = daftar indeks global record dalam batch itu.
  function batchIndices() {
    if (!state.batchKey) return state.rows.map((_, i) => i);
    const b = state.batches.find(x => x.key === state.batchKey);
    if (!b) {
      // final31: batch tidak ditemukan — JANGAN fail-open ke semua record
      // (kunci batch batal diam-diam). Kembalikan kosong + reset kunci.
      state.batchKey = '';
      const sel = $('#ahuBatch');
      if (sel) sel.value = '';
      return [];
    }
    return b.indices.slice();
  }
  function buildBatches() {
    const map = new Map();
    state.rows.forEach((r, i) => {
      const req = String(r.request || '').trim();
      const key = req || '';
      if (!map.has(key)) map.set(key, { key, label: req || '(Tanpa batch)', indices: [] });
      map.get(key).indices.push(i);
    });
    // final27: batch TERBARU dulu (05/11, 04/11, ...); '(Tanpa batch)' tetap akhir.
    // final30: REQ "NN/MM" diparse jadi (bulan, nomor) — sort bulan desc lalu
    // nomor desc, supaya "01/12" (Des) di atas "05/11" (Nov), bukan terselip.
    const parseReq = (k) => {
      const m = String(k || '').trim().match(/^(\d{1,2})\/(\d{1,2})$/);
      if (!m) return null;
      return { num: parseInt(m[1], 10), month: parseInt(m[2], 10) };
    };
    const keys = [...map.keys()].sort((a, b) => {
      if (!a) return 1;
      if (!b) return -1;
      const pa = parseReq(a), pb = parseReq(b);
      if (pa && pb) {
        if (pb.month !== pa.month) return pb.month - pa.month;
        return pb.num - pa.num;
      }
      return b.localeCompare(a);
    });
    state.batches = keys.map(k => map.get(k));
    state.batchKey = '';
  }
  function populateBatchSelect() {
    const sel = document.querySelector('#ahuBatch');
    if (!sel) return;
    sel.replaceChildren();
    const all = document.createElement('option');
    all.value = '';
    all.textContent = `Semua record (${state.rows.length})`;
    sel.appendChild(all);
    for (const b of state.batches) {
      const o = document.createElement('option');
      o.value = b.key;
      const aktas = b.indices.map(i => parseInt(String(state.rows[i]?.no_akta || '').trim(), 10)).filter(n => !isNaN(n));
      const range = aktas.length ? ` \u00b7 Akta ${Math.min(...aktas)}\u2013${Math.max(...aktas)}` : '';
      o.textContent = `${b.label} (${b.indices.length} record${range})`;
      sel.appendChild(o);
    }
    sel.value = state.batchKey || '';
  }

  function optionMatches(select, wanted) {
    const v = String(wanted ?? '').trim();
    if (!v) return null;
    const nv = normWilayah(v);
    if (!nv) return null;
    const opts = [...select.options];
    // 1) nilai atau teks persis (cara lama, dipertahankan).
    let hit = opts.find(o => String(o.value).trim().toLocaleLowerCase('id-ID') === v.toLocaleLowerCase('id-ID'))
      || opts.find(o => o.text.trim().toLocaleLowerCase('id-ID') === v.toLocaleLowerCase('id-ID'));
    if (hit) return hit;
    // 2) normalisasi: spasi/awalan diabaikan.
    hit = opts.find(o => normWilayah(o.text) === nv || normWilayah(o.value) === nv);
    if (hit) return hit;
    // 3) akhiran: 'KABUPATENBANTUL' berakhiran 'BANTUL'.
    // final31: HANYA arah ini (opsi berakhiran nilai Excel). Arah sebaliknya
    // (nilai berakhiran opsi) DIHAPUS — "SIDOMULYO" berakhiran "MULYO" bukan
    // berarti opsinya "MULYO" (desa beda). Minimal 4 huruf, opsi lebih panjang.
    hit = opts.find(o => {
      const nt = normWilayah(o.text);
      return nt && nv.length >= 4 && nt.length > nv.length && nt.endsWith(nv);
    });
    if (hit) return hit;
    // 4) khusus provinsi: semua varian YOGYAKARTA adalah DIY.
    if (nv.includes('YOGYAKARTA')) {
      hit = opts.find(o => normWilayah(o.text).includes('YOGYAKARTA'));
      if (hit) return hit;
    }
    return null;
  }

  async function waitForOption(select, wanted, timeout = 8000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const option = optionMatches(select, wanted);
      if (option) return option;
      await sleep(200);
    }
    return null;
  }

  // final7: tanda daftar opsi (nilai+teks) untuk mendeteksi refill AJAX AHU.
  function optionsSignature(select) {
    return [...(select.options || [])].map(o => `${o.value}~${o.text}`).join('|');
  }
  function loadingHidden() {
    const el = document.querySelector('.loading_fixed');
    if (!el) return true;
    const style = getComputedStyle(el);
    return style.display === 'none' || style.visibility === 'hidden';
  }

  async function setCascadingSelect(header, wanted, timeout = 12000) {
    const idByName = {
      // Pemberi fidusia
      provinsi_pemberi: 'sel_provinsi',
      kab_kota_pemberi: 'sel_kab_kota',
      kecamatan_pemberi: 'sel_kecamatan',
      kelurahan_pemberi: 'sel_kelurahan',
      // Penerima fidusia: AHU memakai ID dropdown berbeda dengan pemberi
      provinsi_penerima: 'sel_provinsi2',
      kab_kota_penerima: 'sel_kab_kota2',
      kecamatan_penerima: 'sel_kecamatan2',
      kelurahan_penerima: 'sel_kelurahan2',
      sel_provinsi2: 'sel_provinsi2',
      sel_kab_kota2: 'sel_kab_kota2',
      sel_kecamatan2: 'sel_kecamatan2',
      sel_kelurahan2: 'sel_kelurahan2'
    };
    // Prefer AHU's actual cascading select IDs. Name-based matching can find
    // hidden/dummy controls before the real select and leave the visible list blank.
    const select = (idByName[header] ? document.getElementById(idByName[header]) : null)
      || findControls(header).find(el => el.tagName === 'SELECT');
    if (!select) return { ok: false, reason: `${header}: dropdown AHU tidak ditemukan` };
    // final32: scroll dropdown ke layar dulu supaya user melihat proses
    // pengisian wilayah (bukan diam-diam di luar layar).
    await scrollToField(select);
    const option = await waitForOption(select, wanted, timeout);
    if (!option) return { ok: false, reason: `${header}: opsi “${wanted}” belum tersedia setelah menunggu ${Math.round(timeout/1000)} detik` };
    // final7: snapshot daftar anak SEBELUM parent diubah, supaya wait di bawah
    // bisa mendeteksi refill AJAX, bukan opsi basi.
    const cascadePre = {
      provinsi_pemberi: 'sel_kab_kota',
      kab_kota_pemberi: 'sel_kecamatan',
      kecamatan_pemberi: 'sel_kelurahan',
      provinsi_penerima: 'sel_kab_kota2',
      sel_provinsi2: 'sel_kab_kota2',
      kab_kota_penerima: 'sel_kecamatan2',
      sel_kab_kota2: 'sel_kecamatan2',
      kecamatan_penerima: 'sel_kelurahan2',
      sel_kecamatan2: 'sel_kelurahan2'
    };
    const preChild = cascadePre[header] ? document.getElementById(cascadePre[header]) : null;
    if (preChild) preChild._ahuSigBeforeParentChange = optionsSignature(preChild);
    const previousValue = String(select.value || '');
    select.value = option.value;
    // AHU's handlers are jQuery-based on some pages; trigger both native and jQuery
    // events when available so the official AJAX cascade runs.
    select.dispatchEvent(new Event('input', { bubbles: true }));
    select.dispatchEvent(new Event('change', { bubbles: true }));
    if (window.jQuery) window.jQuery(select).trigger('change');
    // Province -> kabupaten and kabupaten -> kecamatan are loaded via AJAX.
    // Wait for the dependent dropdown to refresh instead of accepting stale options.
    const cascade = {
      provinsi_pemberi: ['sel_kab_kota', 'kab_kota_pemberi'],
      kab_kota_pemberi: ['sel_kecamatan', 'kecamatan_pemberi'],
      kecamatan_pemberi: ['sel_kelurahan', 'kelurahan_pemberi'],
      provinsi_penerima: ['sel_kab_kota2', 'kab_kota_penerima'],
      sel_provinsi2: ['sel_kab_kota2', 'sel_kab_kota2'],
      kab_kota_penerima: ['sel_kecamatan2', 'kecamatan_penerima'],
      sel_kab_kota2: ['sel_kecamatan2', 'sel_kecamatan2'],
      kecamatan_penerima: ['sel_kelurahan2', 'kelurahan_penerima'],
      sel_kecamatan2: ['sel_kelurahan2', 'sel_kelurahan2']
    };
    const next = cascade[header];
    if (next) {
      const child = document.getElementById(next[0]);
      if (child) {
        // final7: JANGAN anggap anak siap hanya karena sudah ada opsi nyata.
        // Opsi itu bisa basi dari record sebelumnya (halaman AHU awal sudah
        // berisi kab BANTUL dan kec BAMBANGLIPURO untuk DIY). AHU mengosongkan
        // lalu mengisi ulang anak SETELAH AJAX kembali; kalau anak diisi
        // sebelum refill itu, nilai anak ikut ter-reset saat refill datang.
        // Jadi tunggu sampai (a) tanda opsi anak BERUBAH dari snapshot sebelum
        // parent diubah, atau (b) indikator loading AHU sempat muncul lalu
        // hilang, baru lanjut. Kalau daftar isinya memang sama persis, (b)
        // dan jeda settle di bawah yang menjamin refill sudah selesai.
        const beforeSig = child._ahuSigBeforeParentChange || optionsSignature(child);
        const start = Date.now();
        let refreshed = false;
        let sawLoading = false;
        while (Date.now() - start < 15000) {
          if (!loadingHidden()) sawLoading = true;
          const sigNow = optionsSignature(child);
          if (sigNow !== beforeSig) {
            // Tunggu refill selesai: loading hilang + jeda singkat.
            let settled = 0;
            while (settled < 1500 && !loadingHidden()) { await sleep(150); settled += 150; }
            await sleep(300);
            refreshed = true;
            break;
          }
          if (sawLoading && loadingHidden()) {
            await sleep(600);
            refreshed = true;
            break;
          }
          await sleep(250);
        }
        if (!refreshed) {
          // Fallback: loading tidak terlihat dan daftar tidak berubah dalam
          // 15 detik. Kemungkinan daftar memang sama (parent sama dengan
          // record sebelumnya). Lanjut hanya setelah jeda settle, dan
          // verifikasi akhir wilayah di fillRecord yang akan menangkap
          // kalau ternyata nilai ini tertimpa refill belakangan.
          await sleep(800);
        }
        // Simpan snapshot terbaru supaya pemanggilan berikutnya membandingkan
        // dengan daftar yang benar-benar baru, bukan daftar basi.
        child._ahuSigBeforeParentChange = optionsSignature(child);
      }
    }
    return { ok: true };
  }

  async function waitForOptions(select, minimum = 2, timeout = 12000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (select && select.options && select.options.length >= minimum) return true;
      await sleep(200);
    }
    return false;
  }

  let chimeIndex = 0;
  const funnyLines = ['Gas, next, bro!', 'Mantap, lanjut, bro!', 'Tumbang, satu, lagi!', 'Kelar, gas, bro!', 'Lanjut, jangan, kendor!', 'Selesai, cuan, bro!'];
  function completionChime() {
    // final13: suara ucapan DIGILIR, maks 3 kata per kalimat. Dibatalkan dulu
    // ucapan sebelumnya supaya tidak menumpuk kalau Isi record diklik cepat.
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const line = funnyLines[chimeIndex % funnyLines.length];
        chimeIndex++;
        const utter = new SpeechSynthesisUtterance(line);
        utter.lang = 'id-ID';
        utter.volume = 1;
        utter.rate = 1;
        utter.pitch = 1;
        window.speechSynthesis.speak(utter);
        return;
      }
    } catch (e) {
      console.info('[AHU Excel Autofill] Ucapan tidak tersedia, pakai nada fallback.', e);
    }
    // Fallback final11: 3 nada naik triangle, hanya kalau ucapan tidak ada.
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const playTone = (frequency, startAt, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, startAt);
        gain.gain.exponentialRampToValueAtTime(0.35, startAt + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startAt);
        osc.stop(startAt + duration + 0.02);
      };
      const start = ctx.currentTime + 0.03;
      playTone(659.25, start, 0.18);
      playTone(987.77, start + 0.20, 0.20);
      playTone(1318.51, start + 0.42, 0.30);
      setTimeout(() => ctx.close().catch(() => {}), 1100);
    } catch (e) {
      console.info('[AHU Excel Autofill] Bunyi selesai tidak tersedia di browser ini.', e);
    }
  }

  function addressOnly(raw) {
    let value = String(raw ?? '').trim();
    // Alamat field only: remove RT/RW and all administrative details after them.
    value = value.replace(/\s+(?:RT\.?\s*\d+|RW\.?\s*\d+).*$/i, '').trim();
    // If no RT/RW is present, still remove trailing administrative components.
    value = value.replace(/\s+(?:KEL(?:URAHAN)?\.?\s+|DESA\s+|KEC(?:AMATAN)?\.?\s+|KAB(?:UPATEN)?\.?\s+|KOTA\s+(?!BARU\b|GEDE\b)|PROV(?:INSI)?\.?\s+|\d{5}\s*$).*$/i, '').trim();
    return value;
  }

  function chooseByVisibleText(controls, pattern, wanted) {
    for (const el of controls) {
      const text = String(el.closest('label')?.textContent || el.parentElement?.parentElement?.textContent || '').replace(/\s+/g, ' ');
      if (!pattern.test(text) || el.disabled) continue;
      if (el.type === 'radio') {
        const group = [...document.querySelectorAll(`input[type="radio"][name="${CSS.escape(el.name)}"]`)];
        const target = group.find(r => {
          const label = document.querySelector(`label[for="${CSS.escape(r.id)}"]`)?.textContent || r.closest('label')?.textContent || r.parentElement?.textContent || '';
          return wanted.test(String(label).replace(/\s+/g, ' '));
        });
        if (target) { target.click(); dispatch(target); return true; }
      } else if (/Pembiayaan/i.test(wanted.source) && /^(INPUT|TEXTAREA)$/.test(el.tagName)) {
        el.value = 'Perjanjian Pembiayaan Konsumen'; dispatch(el); return true;
      }
    }
    return false;
  }

  async function fillRecord() {
    const row = state.rows[state.index];
    if (!row) return;
    // final7: kosongkan dulu nama di form, supaya kalau pengisian berikutnya
    // gagal di tengah jalan, form tidak menampilkan nama record sebelumnya
    // seolah-olah itu nama record ini.
    for (const el of document.querySelectorAll('[name="nm_pemberi"], #pemberi, [name="nm_debitur"], #nm_debitur')) {
      if (el.type === 'radio' || el.type === 'checkbox' || el.tagName === 'SELECT') continue;
      const wasReadonly = el.readOnly;
      if (wasReadonly) el.readOnly = false;
      el.value = '';
      dispatch(el);
      if (wasReadonly) el.readOnly = true;
    }
    // User-confirmed fixed business rules for each record.
    const nikPemberi = String(row.nik_npwp_pemberi || '').trim();
    if (nikPemberi) row.npwp_pemberi = nikPemberi;
    // final6 2026-11-02: NO HP PEMBERI TIDAK DIPAKSA LAGI. Pakai kolom Excel no_hp_pemberi apa adanya;
    // HP pemberi sekarang ada di PDF aplikasi pembayaran (user) - isi kolom Excel dari PDF itu.
    // Bila kolom kosong, field dibiarkan kosong dan dicatat manual di bawah, bukan diisi nomor bisnis.
    // final16 2026-11-05: Jenis Penggunaan TIDAK LAGI dipaksa Konsumtif.
    // Kolom Excel jenis_penggunaan sudah diisi dari PPK (MODAL KERJA / MODAL USAHA /
    // INVESTASI -> 'Produktif', MULTIGUNA -> 'Konsumtif'). Radio AHU memakai value
    // "1" = Produktif, "2" = Konsumtif, jadi terjemahkan teks Excel ke value radio
    // supaya loop pengisian umum (yang mencocokkan x.value) memilih radio yang benar.
    // Bila kosong / tidak dikenal, biarkan kosong: loop dilewati dan dicatat manual.
    const jenisPenggunaanRaw = String(row.jenis_penggunaan || '').trim().toLowerCase();
    if (jenisPenggunaanRaw === 'produktif') row.jenis_penggunaan = '1';
    else if (jenisPenggunaanRaw === 'konsumtif') row.jenis_penggunaan = '2';
    else if (jenisPenggunaanRaw === '1' || jenisPenggunaanRaw === '2') row.jenis_penggunaan = jenisPenggunaanRaw;
    else row.jenis_penggunaan = '';
    if (row.almt_pemberi) row.almt_pemberi = addressOnly(row.almt_pemberi);
    if (row.almt_penerima) row.almt_penerima = addressOnly(row.almt_penerima);
    // Mapping confirmed by user:
    // - category[0][input][~b] = Harga Produk/Jasa (Harga Barang) from contract Excel.
    // - jaminan_fidusia[] = Nilai Penjaminan from Surat Kuasa / contract Excel.
    // - penjaminan_obyek = category code 1-10 based on the AHU Nilai Penjaminan ranges.
    // Keep the nominal value sourced from Excel; derive only the category code.
    const parseAmountID = raw => {
      let s = String(raw ?? '').trim().replace(/rp\.?/ig, '').replace(/\s/g, '');
      if (!s) return NaN;
      if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, '').replace(',', '.');
      else if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) s = s.replace(/,/g, '');
      else s = s.replace(/[^\d,.-]/g, '').replace(',', '.');
      return Number(s);
    };
    const nilaiPenjaminan = String(row['jaminan_fidusia[]'] ?? row.nilai_penjaminan ?? '').trim();
    if (nilaiPenjaminan) {
      const amount = parseAmountID(nilaiPenjaminan);
      if (Number.isFinite(amount) && amount >= 0) {
        // AHU dropdown: upper bounds are inclusive; category 10 is > Rp1 triliun.
        const batasKategori = [
          25000000,
          50000000,
          100000000,
          250000000,
          500000000,
          1000000000,
          100000000000,
          500000000000,
          1000000000000
        ];
        const indexKategori = batasKategori.findIndex(batas => amount <= batas);
        row.penjaminan_obyek = String(indexKategori === -1 ? 10 : indexKategori + 1);
      }
    }
    // Legacy AHU "Isi Perjanjian" field continues to use Pokok Dasar.
    const pokokPenjaminan = String(row.pokok_dasar ?? '').trim();
    if (pokokPenjaminan) row.penjaminan = pokokPenjaminan;
    state.pemberiType = deriveTipePemberi(row); // final24: dari kolom tipe_pemberi / NIK / nama (dropdown panel dihapus).
    const form = document.querySelector('#form_daftar');
    if (!form) { status('Formulir utama #form_daftar tidak ditemukan.', true); return; }
    // Trigger the site's own change flow so the appropriate fields are shown.
    const typeRadio = form.querySelector(`input[type="radio"][name="tipe_pemberi"][value="${state.pemberiType}"]`);
    if (!typeRadio) {
      status('Radio jenis pemberi tidak ditemukan. Periksa halaman AHU.', true);
      return;
    }
    typeRadio.click();
    await sleep(350);
    // The page creates some dependent radio options only after frmPemberi runs.
    const foreignSelector = state.pemberiType === '2'
      ? form.querySelector('input[type="radio"].tipe_asing_pemberi_perseorangan_wni')
      : form.querySelector('input[type="radio"].tipe_asing_pemberi_korporasi_indonesia');
    if (foreignSelector && !foreignSelector.checked) {
      foreignSelector.click();
      await sleep(250);
    }
    // Do not clear the whole form: AHU uses dependent controls and radio changes.
    // Clearing after changing type can undo defaults and leave stale child dropdowns.
    const failures = [], filled = [], manual = [];
    if (!String(row.no_hp_pemberi || '').trim()) manual.push('no_hp_pemberi kosong di Excel - isi dari PDF aplikasi pembayaran sebelum submit (bukan nomor bisnis).');
    const regionHeaders = ['provinsi_pemberi', 'sel_kab_kota', 'kecamatan_pemberi', 'kelurahan_pemberi'];
    // ATURAN NAMA 2026-11-01, ditegaskan ulang 2026-11-02 (user): bandingkan nm_pemberi vs nm_debitur di Excel.
    // - Sama  -> nm_debitur TIDAK diisi autofill (field dikosongkan, karena AHU
    //   menganggap pemberi = debitur kalau field itu kosong).
    // - Berbeda -> nm_pemberi DAN nm_debitur sama-sama diisi (orang berbeda).
    // - nm_debitur kosong di Excel -> tidak ditebak dari kolom lain; kalau
    //   pemberi_kuasa berbeda dari pemberi, laporkan MANUAL saja.
    const normNama = v => String(v ?? '').trim().toUpperCase().replace(/\s+/g, ' ');
    const namaPemberiNorm = normNama(row.nm_pemberi);
    const namaDebiturNorm = normNama(row.nm_debitur);
    // final6: kosongkan di data juga, bukan hanya di DOM - supaya ringkasan panel dan script lama pun tidak mengisi debitur saat nama sama.
    if (namaDebiturNorm && namaPemberiNorm && namaDebiturNorm === namaPemberiNorm) {
      row.nm_debitur = '';
      console.info('[AHU Excel Autofill] Nama Debitur sama dengan Nama Pemberi - nm_debitur dikosongkan di data (final6).');
    }
    const namaKuasaNorm = normNama(row.pemberi_kuasa);
    // final20: jenis kelamin pemberi diturunkan dari NIK (lihat REVISI final20 di atas).
    const nikForGender = String(row.nik_npwp_pemberi || '').trim();
    let genderFromNik = '';
    if (/^\d{16}$/.test(nikForGender) && state.pemberiType !== '1') {
      const ddGender = parseInt(nikForGender.slice(6, 8), 10);
      if (ddGender >= 1 && ddGender <= 31) genderFromNik = '1';
      else if (ddGender >= 41 && ddGender <= 71) genderFromNik = '2';
    }
    row.sub_tipe_pemberi = genderFromNik;
    if (!genderFromNik) manual.push('Jenis kelamin tidak diisi otomatis: NIK pemberi kosong/tidak valid — pilih manual sebelum submit bila perlu.');
    // final32 fix 2026-11-13: isi dari ATAS ke BAWAH (urutan visual form).
    // state.headers mengikuti urutan kolom Excel yang tidak sama dengan urutan
    // form, sehingga animasi ketik + auto-scroll loncat-loncat dan terasa lambat.
    // Urutkan header berdasarkan posisi vertikal kontrolnya; header tanpa kontrol
    // terlihat ditaruh terakhir dengan urutan asli dipertahankan.
    const headerTop = header => {
      let top = Infinity;
      for (const el of findControls(header)) {
        // Abaikan kontrol tersembunyi (display:none memberi top 0).
        const visible = !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        if (!visible) continue;
        const y = el.getBoundingClientRect().top + window.scrollY;
        if (y < top) top = y;
      }
      return top;
    };
    const sortedHeaders = state.headers
      .map((header, idx) => ({ header, idx, top: headerTop(header) }))
      .sort((a, b) => (a.top - b.top) || (a.idx - b.idx))
      .map(x => x.header);
    // final32 fix 2026-11-13: cascade wilayah di posisi visualnya (bagian
    // alamat). Helper ini dipanggil dari loop utama saat loop mencapai
    // header wilayah pertama, supaya dropdown provinsi/kab/kec/kel terisi
    // berurutan dan terlihat di layar. Urutan parent -> child dan semua
    // jeda (setCascadingSelect + 1200 ms per level) TIDAK berubah.
    const firstNonEmpty = (...values) => {
      for (const value of values) {
        const text = String(value ?? '').trim();
        if (text) return text;
      }
      return '';
    };
    const regionPlan = [
      ['provinsi_pemberi', ['provinsi_pemberi']],
      ['kab_kota_pemberi', ['sel_kab_kota', 'kab_kota_pemberi']],
      ['kecamatan_pemberi', ['kecamatan_pemberi']],
      ['kelurahan_pemberi', ['kelurahan_pemberi']]
    ];
    let wilayahDone = false;
    const runWilayahCascade = async () => {
      // final22: provinsi_pemberi kosong di Excel -> inferensi dari kab/kec
      // lewat peta KAB_KE_PROVINSI (bukan lagi hanya DIY). Tanpa provinsi, cascade
      // kab/kota AHU tidak bisa jalan.
      if (!String(row.provinsi_pemberi || '').trim()) {
        row.provinsi_pemberi = inferProvinsi(row.sel_kab_kota || row.kab_kota_pemberi, row.kecamatan_pemberi);
        if (!row.provinsi_pemberi) {
          manual.push('Provinsi pemberi kosong di Excel dan tidak bisa diinferensi dari kab/kecamatan - pilih manual.');
        }
      }
      // Fill geographic selects one at a time, in parent -> child order.
      // Do NOT manually reset child selects at the end: AHU's own change handlers
      // refresh them asynchronously, and resetting after a successful selection
      // can leave the visible fields at '-- pilih --'.
      for (const [selectHeader, csvHeaders] of regionPlan) {
        const value = firstNonEmpty(...csvHeaders.map(header => row[header]));
        if (!value) continue;
        // Give AHU time to refresh each dependent list before selecting the next.
        const result = await setCascadingSelect(selectHeader, value, 20000);
        if (result.ok) {
          filled.push(selectHeader);
          await sleep(1200);
        } else {
          failures.push(result.reason);
          // Stop the chain on a parent failure; selecting children against stale
          // options can make the page reset them or reject Save.
          break;
        }
      }
    };
    for (const header of sortedHeaders) {
      // final32 fix 2026-11-13: isi dropdown wilayah di sini (posisi visual
      // bagian alamat), sekali saja, saat loop mencapai header wilayah pertama.
      if (!wilayahDone && (regionHeaders.includes(header) || header === 'kab_kota_pemberi')) {
        wilayahDone = true;
        await runWilayahCascade();
      }
      if (header === 'tipe_pemberi' || regionHeaders.includes(header) || header === 'kab_kota_pemberi') continue; // Panel/cascading controls handled separately.
      if (header === 'sub_tipe_pemberi' && !String(row.sub_tipe_pemberi || '').trim()) continue; // final20: NIK tidak valid -> radio dibiarkan kosong, dicatat manual di atas.
      if (header === 'jenis_penggunaan' && !String(row.jenis_penggunaan || '').trim()) continue; // final16: Excel kosong -> jangan laporkan failure, dicatat manual di blok verifikasi.
      const value = row[header] ?? '';
      if (header === 'nm_debitur') {
        if (namaDebiturNorm && namaPemberiNorm && namaDebiturNorm === namaPemberiNorm) {
          for (const el of findControls('nm_debitur')) {
            if (el.type === 'radio' || el.type === 'checkbox' || el.tagName === 'SELECT') continue;
            el.value = '';
            dispatch(el);
          }
          console.info('[AHU Excel Autofill] Nama Debitur sama dengan Nama Pemberi - nm_debitur tidak diisi (aturan 2026-11-01).');
          continue;
        }
        if (!namaDebiturNorm && namaKuasaNorm && namaPemberiNorm && namaKuasaNorm !== namaPemberiNorm) {
          manual.push('Nama Debitur kosong di Excel padahal pemberi berbeda dari pemberi kuasa - isi Nama Debitur manual sebelum submit (jangan ditebak autofill).');
          continue;
        }
      }
      // Email pemberi tidak wajib: abaikan nilai Excel dan kosongkan field jika tersedia.
      if (header === 'email_pemberi') {
        for (const el of findControls('email_pemberi')) {
          if (el.type === 'radio' || el.type === 'checkbox' || el.tagName === 'SELECT') continue;
          el.value = '';
          dispatch(el);
        }
        continue;
      }
      if (String(value).trim() === '') continue;

      // Bagian C/D: tanggal akta, tanggal perjanjian, dan jangka waktu.
      // Gunakan API datepicker AHU bila tersedia agar nilai internal ikut sinkron.
      const dateHeaders = ['tgl_akta', 'tgl_perjanjian', 'tgl_jangka_waktu', 'tgl_jangka_waktu_akhir'];
      if (dateHeaders.includes(header)) {
        const rawDate = String(value).trim();
        const dateEl = header === 'tgl_akta'
          ? (document.querySelector('#d[name="tgl_akta"]') || document.querySelector('#d'))
          : [...document.querySelectorAll('input')].find(el => el.name === header || el.id === header);
        const m = rawDate.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
        if (!dateEl) {
          failures.push(`${header}: field tanggal tidak ditemukan di DOM saat ini`);
        } else if (!m) {
          failures.push(`${header}: format "${rawDate}" tidak valid; gunakan DD-MM-YYYY`);
        } else {
          // final32: scroll ke field tanggal dulu supaya layar mengikuti (seperti field lain).
          await scrollToField(dateEl);
          const day = Number(m[1]), month = Number(m[2]), year = Number(m[3]);
          const dateObj = new Date(year, month - 1, day);
          const validDate = dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day;
          if (!validDate) {
            failures.push(`${header}: tanggal "${rawDate}" tidak valid`);
          } else {
            let dateSet = false;
            try {
              if (window.jQuery && window.jQuery.fn && window.jQuery.fn.datepicker &&
                  window.jQuery(dateEl).hasClass('hasDatepicker')) {
                window.jQuery(dateEl).datepicker('setDate', dateObj);
                window.jQuery(dateEl).trigger('change');
                dateSet = true;
              } else {
                const wasReadonly = dateEl.readOnly;
                dateEl.readOnly = false;
                dateEl.value = rawDate;
                dispatch(dateEl);
                dateEl.readOnly = wasReadonly;
                dateSet = dateEl.value.trim() === rawDate;
              }
            } catch (err) {
              console.warn(`[AHU Excel Autofill] Gagal mengisi ${header}:`, err);
            }
            if (dateSet && String(dateEl.value || '').trim()) {
              filled.push(header);
              console.info(`[AHU Excel Autofill] ${header} terisi:`, dateEl.value);
            } else {
              failures.push(`${header}: datepicker AHU tidak menerima tanggal otomatis; isi manual dari kalender`);
            }
          }
        }
        continue;
      }

      const controls = findControls(header);
      if (!controls.length) {
        if (header === 'tipe_penerima' || header.startsWith('category[') || /penerima|obyek|objek/i.test(header)) {
          manual.push(`${header}: kontrol dinamis/modal belum tersedia`);
        } else {
          failures.push(`${header}: field tidak ditemukan di DOM saat ini`);
        }
        continue;
      }
      let ok = false;
      for (const el of controls) {
        if (el.type === 'radio') {
          const group = [...document.querySelectorAll(`input[type="radio"][name="${CSS.escape(el.name)}"]`)];
          const target = pickRadio(group, String(value).trim()); // final21: utamakan radio yang terlihat.
          // final32: scroll ke radio dulu supaya layar mengikuti pilihan (jenis_penggunaan, sub_tipe_pemberi, dll).
          if (target) { await scrollToField(target); target.checked = true; dispatch(target); target.click(); ok = true; break; }
        } else {
          ok = await setValue(el, value);
          if (ok) break;
        }
      }
      if (ok) {
        filled.push(header);
        // Some fields trigger AJAX cascades. Wait briefly so dependent options can load.
        if (controls.some(el => el.tagName === 'SELECT')) await sleep(800);
      } else failures.push(`${header}: nilai "${value}" tidak cocok dengan opsi/field`);
    }
    // final6: bersihkan ulang field debitur bila nama sama (menutup celah field yang readOnly/hidden saat loop utama).
    if (namaDebiturNorm && namaPemberiNorm && namaDebiturNorm === namaPemberiNorm) {
      for (const el of document.querySelectorAll('[name="nm_debitur"], #nm_debitur')) {
        if (el.type === 'radio' || el.type === 'checkbox' || el.tagName === 'SELECT') continue;
        const wasReadonly = el.readOnly;
        if (wasReadonly) el.readOnly = false;
        el.value = '';
        dispatch(el);
        if (wasReadonly) el.readOnly = true;
      }
    }
    // final32 fix 2026-11-13: cascade wilayah sudah dijalankan dari dalam
    // loop utama (di posisi visual bagian alamat). Fallback ini hanya bila
    // tidak ada header wilayah di Excel sehingga loop tidak pernah memicunya.
    if (!wilayahDone) await runWilayahCascade();

    // final7: VERIFIKASI AKHIR WILAYAH (aturan AHU: provinsi -> kab -> kec -> kel
    // harus sesuai, dan nilai yang terpilih harus yang dari Excel, bukan sisa
    // refill AJAX belakangan). Kalau ada yang tidak cocok, ulangi cascade
    // sekali dari provinsi ke bawah, lalu verifikasi lagi. Kalau masih tidak
    // cocok, laporkan sebagai failure dengan nilai yang terpilih vs yang
    // diminta, supaya user tidak submit dengan wilayah salah tanpa sadar.
    const selectedWilayahText = (selectId) => {
      const sel = document.getElementById(selectId);
      if (!sel || !sel.options || sel.selectedIndex < 0) return '';
      return String(sel.options[sel.selectedIndex].text || '').trim();
    };
    const wilayahChecks = [
      ['provinsi_pemberi', 'sel_provinsi', row.provinsi_pemberi],
      ['kab_kota_pemberi', 'sel_kab_kota', firstNonEmpty(row.sel_kab_kota, row.kab_kota_pemberi)],
      ['kecamatan_pemberi', 'sel_kecamatan', row.kecamatan_pemberi],
      ['kelurahan_pemberi', 'sel_kelurahan', row.kelurahan_pemberi]
    ];
    const wilayahMismatch = () => wilayahChecks.filter(([label, selectId, wanted]) => {
      if (!String(wanted || '').trim()) return false;
      const selNorm = normWilayah(selectedWilayahText(selectId));
      const wantNorm = normWilayah(wanted);
      if (selNorm === wantNorm) return false;
      // final31: hanya arah "terpilih berakhiran yang diminta" (cth opsi
      // "KABUPATENBANTUL" vs minta "BANTUL"). Arah sebaliknya dihapus supaya
      // "SIDOMULYO" vs terpilih "MULYO" terdeteksi sebagai mismatch.
      if (wantNorm.length >= 4 && selNorm.length > wantNorm.length && selNorm.endsWith(wantNorm)) return false;
      return true;
    });
    await sleep(1000);
    let mismatch = wilayahMismatch();
    if (mismatch.length) {
      // Satu kali pengulangan cascade penuh, dari provinsi ke bawah.
      for (const [selectHeader, csvHeaders] of regionPlan) {
        const value = firstNonEmpty(...csvHeaders.map(header => row[header]));
        if (!value) continue;
        const result = await setCascadingSelect(selectHeader, value, 20000);
        if (!result.ok) { failures.push(result.reason); break; }
        await sleep(1200);
      }
      await sleep(1000);
      mismatch = wilayahMismatch();
    }
    for (const [label, selectId, wanted] of mismatch) {
      failures.push(`${label}: AHU terpilih “${selectedWilayahText(selectId) || '-- pilih --'}”, Excel minta “${wanted}” - wilayah belum tepat, isi manual sebelum submit`);
    }
    if (!mismatch.length) {
      for (const [label] of wilayahChecks) {
        if (!filled.includes(label)) filled.push(label);
      }
    }

    // final7: VERIFIKASI NAMA PEMBERI. Setelah semua pengisian, field #pemberi
    // harus sama dengan nm_pemberi record ini. Kalau masih nama lama, coba
    // sekali lagi dengan readonly dibuka sementara; kalau tetap beda, laporkan
    // failure, jangan diam-diam lanjut ke submit dengan nama orang lain.
    {
      const namaEl = document.querySelector('#pemberi') || document.querySelector('[name="nm_pemberi"]');
      const namaDom = String(namaEl?.value || '').trim();
      const namaWant = String(row.nm_pemberi || '').trim();
      if (namaWant && normNama(namaDom) !== normNama(namaWant)) {
        if (namaEl) {
          const wasReadonly = namaEl.readOnly;
          if (wasReadonly) namaEl.readOnly = false;
          namaEl.value = namaWant;
          dispatch(namaEl);
          namaEl.dispatchEvent(new Event('keyup', { bubbles: true }));
          if (wasReadonly) namaEl.readOnly = true;
        }
        await sleep(300);
        const namaDom2 = String((document.querySelector('#pemberi') || document.querySelector('[name="nm_pemberi"]'))?.value || '').trim();
        if (normNama(namaDom2) !== normNama(namaWant)) {
          failures.push(`nm_pemberi: field masih “${namaDom2 || '(kosong)'}”, Excel minta “${namaWant}” - isi nama pemberi manual sebelum submit, jangan pakai nama record sebelumnya`);
        }
      }
    }

    // final16: Jenis Penggunaan sudah diisi loop umum dari Excel (radio value "1" =
    // Produktif, "2" = Konsumtif). Blok ini verifikasi hasil + sub-jenis otomatis:
    // - Produktif terpilih -> final18 otomatis klik sub-jenis Usaha Mikro
    //   (name="sub_jenis_penggunaan", value="2") + catatan faktual di panel.
    //   Mikro adalah ASUMSI dari nominal berkas (<50jt), bukan fakta aset/omzet —
    //   verifikasi terjadi di Preview (script tidak pernah submit); user boleh
    //   klik sub-jenis lain sebelum submit bila tidak sesuai.
    // - Tidak ada radio terpilih (Excel kosong / header tidak ada) -> pilih manual.
    const jenisTerpilih = document.querySelector('input[type="radio"][name="jenis_penggunaan"]:checked');
    if (jenisTerpilih && jenisTerpilih.value === '1') {
      const mikroRadio = document.querySelector('input[type="radio"][name="sub_jenis_penggunaan"][value="2"]');
      if (mikroRadio) {
        // final32: scroll ke radio sub-jenis dulu supaya terlihat saat diklik otomatis.
        if (!mikroRadio.checked) { await scrollToField(mikroRadio); mikroRadio.click(); dispatch(mikroRadio); }
        manual.push('Jenis Penggunaan = Produktif — sub-jenis otomatis Usaha Mikro (aturan: nominal berkas <50jt).');
      } else {
        manual.push('Jenis Penggunaan = Produktif — radio Usaha Mikro tidak ditemukan; pilih sub-jenis manual (Usaha Mikro / Usaha Kecil / Usaha Menengah / Usaha Lainnya).');
      }
    } else if (!jenisTerpilih) {
      manual.push('Jenis Penggunaan kosong di Excel — pilih manual (Produktif/Konsumtif).');
    }

    // Nama/Jenis Perjanjian (revisi user 2026-11-01): universal untuk REFI dan NMC,
    // diisi dari script dengan nilai literal 'Perjanjian Pembiayaan Konsumen'
    // (bukan lagi 'Pembiayaan' saja, dan bukan dari Excel).
    let perjanjianSet = false;
    const textControls = [...form.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]),textarea,select')];
    for (const el of textControls) {
      const idName = `${el.id || ''} ${el.name || ''}`.toLocaleLowerCase('id-ID');
      const label = [...(el.labels || [])].map(l => l.textContent || '').join(' ');
      const context = `${label} ${el.parentElement?.textContent || ''} ${el.parentElement?.parentElement?.textContent || ''}`.replace(/\s+/g, ' ').slice(0, 300);
      if (!/nama\s*\/?\s*jenis\s*perjanjian|jenis\s*perjanjian|nama\s*perjanjian/i.test(`${idName} ${context}`)) continue;
      if (el.tagName === 'SELECT') {
        const opt = [...el.options].find(o => /perjanjian pembiayaan konsumen/i.test(String(o.textContent || '').trim()))
          || [...el.options].find(o => /pembiayaan/i.test(String(o.textContent || '').trim()));
        if (opt) { el.value = opt.value; dispatch(el); perjanjianSet = true; break; }
      } else { el.value = 'Perjanjian Pembiayaan Konsumen'; dispatch(el); perjanjianSet = true; break; }
    }
    if (!perjanjianSet) manual.push('Nama/Jenis Perjanjian: field Perjanjian Pembiayaan Konsumen tidak terdeteksi; isi manual.');

    // Bagian E berdasarkan HTML AHU yang diberikan pengguna:
    // select[-1]: 1 = Obyek Berserial Nomor; select[1]: 4 = Kendaraan Roda Dua.
    // load_category(this,0) membuat field dinamis, jadi pilih parent dulu dan tunggu.
    const categorySelects = [...form.querySelectorAll('select')].filter(el => /^category\[\d+\]\[select\]\[-1\]$/.test(el.name || ''));
    let categoryChosen = false;
    let activeCategoryIndex = '0';
    for (const sel of categorySelects) {
      const m = (sel.name || '').match(/^category\[(\d+)\]/);
      if (m) activeCategoryIndex = m[1];
      if ([...sel.options].some(o => o.value === '1' && /obyek berserial nomor/i.test(o.textContent || ''))) {
        // final32: scroll dropdown kategori ke layar supaya terlihat dipilih.
        await scrollToField(sel);
        sel.value = '1';
        dispatch(sel);
        categoryChosen = true;
        await sleep(1100);
        break;
      }
    }
    if (categoryChosen) {
      const subtypeSelects = [...form.querySelectorAll('select')].filter(el => {
        const m = (el.name || '').match(/^category\[(\d+)\]\[select\]\[1\]$/);
        return !!m && m[1] === activeCategoryIndex;
      });
      for (const sel of subtypeSelects) {
        if ([...sel.options].some(o => o.value === '4' && /kendaraan roda dua/i.test(o.textContent || ''))) {
          // final32: scroll dropdown sub-kategori ke layar supaya terlihat dipilih.
          await scrollToField(sel);
          sel.value = '4';
          dispatch(sel);
          await sleep(1200);
          break;
        }
      }
    }

    // Isi field E dari kolom Excel dengan mencocokkan akhiran indeks, karena AHU
    // bisa memakai indeks obyek yang berbeda dari workbook. Field yang penting:
    // 13 Merk, 14 Tipe, 22 No. Rangka, 23 No. Mesin, ~a Bukti Obyek, ~b Nilai Obyek.
    const objectTailAliases = {
      '13': ['category[0][input][13]'],
      '14': ['category[0][input][14]'],
      '22': ['category[0][input][22]'],
      '23': ['category[0][input][23]'],
      '~a': ['category[0][input][~a]'],
      '~b': ['category[0][input][~b]']
    };
    const tailValues = {};
    for (const [tail, aliases] of Object.entries(objectTailAliases)) {
      for (const header of aliases) {
        let v = String(row[header] ?? '').trim();
        // Nilai Obyek (~b) berasal dari Harga Produk/Jasa (Harga Barang) pada Excel Kontrak.
        // Hilangkan pemisah ribuan/format mata uang agar field numerik AHU menerima angka saja.
        if (tail === '~b' && v) {
          v = v.replace(/\s/g, '').replace(/^Rp\.?/i, '').replace(/[.,](?=\d{3}(?:\D|$))/g, '').replace(/[^\d.]/g, '');
          if (v && !Number.isFinite(Number(v))) v = '';
        }
        if (v) { tailValues[tail] = v; break; }
      }
    }
    // Bukti Obyek harus berasal dari Merk + model/tipe pemasaran pada Perjanjian Pembiayaan,
    // BUKAN kode tipe teknis dari Surat Kuasa (category input 14) dan bukan status BPKB.
    // Data Excel terbaru sudah menaruh uraian yang benar di category[0][input][~a].
    const existingBukti = String(tailValues['~a'] || '').trim();
    const modelFromAgreement = String(
      row.merk_model_ppk || row.model_kendaraan || row.bukti_obyek || row['Merk dan tipe perjanjian'] || ''
    ).trim();
    let buktiModel = /masih dalam proses/i.test(existingBukti) ? '' : existingBukti;
    if (!buktiModel && modelFromAgreement && !/masih dalam proses/i.test(modelFromAgreement)) {
      buktiModel = modelFromAgreement;
    }
    if (buktiModel) {
      tailValues['~a'] = /^1\s*unit\b/i.test(buktiModel) ? buktiModel : `1 Unit ${buktiModel}`;
    } else {
      // Jangan mengarang Bukti Obyek dari kode teknis; biarkan kosong dan tampilkan peringatan.
      delete tailValues['~a'];
    }
    const objectMissing = [];
    for (const [tail, value] of Object.entries(tailValues)) {
      if (!value) continue;
      const controls = [...form.querySelectorAll('input,textarea,select')].filter(el => {
        const m = (el.name || '').match(/^category\[(\d+)\]\[(input|select)\]\[([^\]]+)\]$/);
        return !!m && m[1] === activeCategoryIndex && m[3] === tail && !el.disabled && !el.readOnly;
      });
      if (!controls.length) { objectMissing.push(tail); continue; }
      const el = controls[0];
      if (el.tagName === 'SELECT') {
        if (!(await setValue(el, value))) objectMissing.push(tail);
      } else {
        // final32: field objek (termasuk rangka/mesin) juga diketik per huruf + layar mengikuti.
        await scrollToField(el);
        await typeInto(el, value);
      }
      if (!filled.includes(`category[${activeCategoryIndex}][input][${tail}]`)) filled.push(`category[${activeCategoryIndex}][input][${tail}]`);
    }
    if (!categoryChosen) manual.push('Bagian E: kategori Obyek Berserial Nomor tidak ditemukan; periksa dropdown kategori AHU.');
    if (objectMissing.length) manual.push('Bagian E belum lengkap. Field tidak ditemukan untuk indeks: ' + objectMissing.join(', ') + '.');
    if (!tailValues['~b']) manual.push('Bagian E: Nilai Obyek belum diisi karena category[0][input][~b] kosong. Isi dari Harga Produk/Jasa pada Excel Kontrak.');

    // final8: PICU TERBILANG OTOMATIS. Handler blur AHU adalah satu-satunya
    // pemicu terbilang (#pokok_rp -> #terbilang_rp_1, .pokok_rp_2 ->
    // .terbilang_rp_2 di baris yang sama). Tanpa blur, angka baru terisi tapi
    // terbilang tetap milik record sebelumnya, persis keluhan user.
    {
      const triggerBlur = async (el, terbilangEl) => {
        if (!el || !String(el.value || '').trim()) return;
        const before = String(terbilangEl?.textContent || '').trim();
        try {
          if (window.jQuery) window.jQuery(el).trigger('blur');
          else { el.focus(); el.blur(); }
        } catch (e) { try { el.focus(); el.blur(); } catch (_) {} }
        // Tunggu POST terbilang_act.php kembali (maks ~4 detik).
        for (let i = 0; i < 14; i++) {
          await sleep(300);
          const now = String(terbilangEl?.textContent || '').trim();
          if (now && now !== before) return true;
        }
        const now = String(terbilangEl?.textContent || '').trim();
        return Boolean(now);
      };
      const pokokEl = document.getElementById('pokok_rp');
      if (pokokEl && String(pokokEl.value || '').trim()) {
        const ok = await triggerBlur(pokokEl, document.getElementById('terbilang_rp_1'));
        if (ok) filled.push('terbilang_rp_1');
        else failures.push('terbilang Rp: tidak berubah setelah blur otomatis - klik kotak Rp lalu klik di luar kotak sekali sebelum submit, supaya terbilang record ini muncul');
      }
      for (const el2 of document.querySelectorAll('.pokok_rp_2')) {
        if (!String(el2.value || '').trim()) continue;
        const parent = el2.closest('.obyekbaru');
        const terb2 = parent ? parent.querySelector('.terbilang_rp_2') : document.querySelector('.terbilang_rp_2');
        const ok2 = await triggerBlur(el2, terb2);
        if (!ok2) failures.push('terbilang Rp (hutang lebih dari 1): tidak berubah setelah blur otomatis - klik kotak nominalnya lalu klik di luar kotak sekali sebelum submit');
      }
      // final9: E - Nilai Obyek (~b). Cari input category[][input][~b] yang
      // terisi, picu blur-nya juga, supaya terbilangnya muncul tanpa klik.
      // Span terbilang E dicari di sekitar input (form-group / parent terdekat)
      // dan juga di seluruh halaman dengan id/class mengandung 'terbilang'.
      const nilaiObyekInputs = [...document.querySelectorAll('input')].filter(el =>
        /^category\[\d+\]\[input\]\[~b\]$/.test(el.name || '') && String(el.value || '').trim());
      for (const elObyek of nilaiObyekInputs) {
        let terbObyek = null;
        let node = elObyek;
        for (let d = 0; d < 6 && node; d++) {
          terbObyek = node.querySelector ? node.querySelector('[id*="terbilang"], [class*="terbilang"]') : null;
          if (terbObyek && terbObyek !== elObyek) break;
          terbObyek = null;
          node = node.parentElement;
        }
        if (!terbObyek) terbObyek = document.querySelector('[id*="terbilang"]');
        const okObyek = await triggerBlur(elObyek, terbObyek);
        if (okObyek) filled.push('terbilang_nilai_obyek');
        // Sengaja tidak push failure kalau span E tidak ditemukan: di form live
        // terbilang E ada, dan blur sudah dipicu; verifikasi span-nya tidak
        // bisa diandalkan dari HTML lama. Kalau setelah tes live terbilang E
        // tetap tidak muncul, laporkan dari panel dan kirim screenshot-nya.
      }
    }

    // Update any dependent labels if the page's own handlers support it.
    const debtor = document.querySelector('#nm_debitur');
    if (debtor) debtor.dispatchEvent(new Event('keyup', { bubbles: true }));
    status(`Jenis pemberi: ${state.pemberiType === '2' ? 'Perseorangan' : 'Korporasi'}. Record ${state.index + 1}: terisi ${filled.length} kolom. ${failures.length ? 'Perlu diperiksa: ' + failures.join(' | ') : 'Field dasar terpetakan.'}${manual.length ? ' Perlu input manual/modal: ' + manual.join(' | ') : ''}`, failures.length > 0);
    if (failures.length) console.warn('[AHU Excel Autofill] Field yang perlu diperiksa:', failures);
    if (manual.length) console.info('[AHU Excel Autofill] Perlu diproses melalui UI dinamis/modal:', manual);
    console.info('[AHU Excel Autofill] Field terisi:', filled);
    // Automatically check the applicant declaration checkbox after autofill.
    // The user reviews the completed record before proceeding with any submission.
    const agreeCheckbox = document.querySelector('#agree[name="agree"]') || document.querySelector('#agree');
    let agreeMessage = '';
    if (agreeCheckbox && !agreeCheckbox.checked && !agreeCheckbox.disabled) {
      agreeCheckbox.checked = true;
      agreeCheckbox.dispatchEvent(new Event('input', { bubbles: true }));
      agreeCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
      agreeMessage = ' Pernyataan #agree otomatis dicentang; pastikan isi permohonan sudah diperiksa sebelum mengirim.';
    } else if (agreeCheckbox && agreeCheckbox.checked) {
      agreeMessage = ' Pernyataan #agree sudah dicentang.';
    } else {
      agreeMessage = ' Checkbox pernyataan #agree tidak ditemukan atau nonaktif.';
    }
    status(`Record ${state.index + 1} selesai diisi. Periksa data dan pilihan wilayah sebelum melanjutkan.${failures.length ? ' Ada field yang perlu diperiksa.' : ''}`, failures.length > 0);
    // final32: serah terima ke langkah manual "cek data" (rangka/mesin).
    // Scroll ke area rangka + sorot tombol "cek data". TIDAK PERNAH mengklik
    // tombol itu, dan TIDAK PERNAH submit/Simpan/bayar.
    try { await highlightCekData(); } catch (e) { console.info('[AHU Excel Autofill] highlight cek data dilewati:', e); }
    completionChime();
  }

  async function fillRecipientModal() {
    const btn = $('#ahuFillRecipient');
    // final31: polling sudah berjalan -> abaikan klik ganda.
    if (btn && btn.disabled) return;
    const row = state.rows[state.index];
    if (!row) return;
    const modal = document.querySelector('#modal-penerima-fidusia');
    if (!modal || (!modal.classList.contains('in') && !modal.classList.contains('show') && getComputedStyle(modal).display === 'none')) {
      status('Buka modal resmi “Tambah Data” penerima terlebih dahulu, lalu klik “Isi kontak + Lebak Bulus”.', true);
      return;
    }
    // final31: kunci tombol selama polling 120 detik.
    if (btn) btn.disabled = true;

    const get = key => String(row[key] ?? '').trim();
    const find = key => [...modal.querySelectorAll('input,textarea,select')].filter(el => el.name === key || el.id === key);
    const fire = el => {
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.dispatchEvent(new Event('keyup', { bubbles: true }));
    };
    const setField = (key, value) => {
      if (!value) return { ok: false, message: `${key}: nilai Excel kosong` };
      const el = find(key).find(x => x.type !== 'hidden');
      if (!el) return { ok: false, message: `${key}: field tidak ditemukan di modal` };
      if (el.disabled) return { ok: false, message: `${key}: field nonaktif` };
      const wasReadonly = el.readOnly;
      if (wasReadonly) el.readOnly = false;
      el.value = value;
      fire(el);
      if (wasReadonly) el.readOnly = true;
      return { ok: true };
    };
    const identityLoaded = () => {
      const val = key => {
        const el = find(key).find(x => x.type !== 'hidden');
        return el ? String(el.value || '').trim() : '';
      };
      return Boolean(val('nik_npwp_penerima') && val('sk_penerima') && val('almt_penerima'));
    };

    status('Menunggu identitas resmi AHU. Setelah terdeteksi, mengisi telepon, email, kantor cabang, dan memilih Kelurahan LEBAK BULUS. Tidak menekan Simpan.');
    const started = Date.now();
    while (Date.now() - started < 120000) {
      if (identityLoaded()) {
        const results = [
          setField('no_hp_penerima', '0217698899'),
          setField('email_penerima', 'fidusia@fifgroup.astra.co.id'),
          setField('cabang_penerima', 'PT Federal International Finance Cabang Yogyakarta')
        ];

        // Choose LEBAK BULUS only from the live AHU dropdown; never fabricate an option.
        let kelurahanResult = { ok: false, message: 'Dropdown Kelurahan belum ditemukan' };
        const kelurahan = find('sel_kelurahan2').find(el => el.tagName === 'SELECT')
          || [...modal.querySelectorAll('select')].find(el => /kelurahan/i.test(`${el.id} ${el.name}`));
        if (kelurahan) {
          const option = [...kelurahan.options].find(o =>
            String(o.textContent || '').trim().toLocaleUpperCase('id-ID') === 'LEBAK BULUS'
          );
          if (option && !kelurahan.disabled) {
            kelurahan.value = option.value;
            fire(kelurahan);
            kelurahanResult = { ok: true };
          } else {
            kelurahanResult = { ok: false, message: 'Opsi LEBAK BULUS belum tersedia. Pastikan Provinsi/Kabupaten/Kecamatan sudah dipilih dari AHU.' };
          }
        }
        results.push(kelurahanResult);

        const errors = results.filter(x => !x.ok).map(x => x.message);
        const done = results.filter(x => x.ok).length;
        const phone = find('no_hp_penerima').find(x => x.type !== 'hidden');
        const email = find('email_penerima').find(x => x.type !== 'hidden');
        const emailValid = Boolean(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email.value || '').trim()));
        if (!phone || !String(phone.value || '').trim()) errors.push('nomor telepon belum terisi');
        if (!emailValid) errors.push('email belum valid');

        status(`Selesai mengisi ${done}/4 tindakan. ${errors.length ? 'Perlu diperiksa: ' + [...new Set(errors)].join(' | ') : 'Telepon 0217698899, email fidusia@fifgroup.astra.co.id, kantor cabang, dan Kelurahan LEBAK BULUS sudah diproses.'} Periksa semua data lalu klik Simpan sendiri.`, errors.length > 0);
        console.info('[AHU Excel Autofill v2.1.15] Hasil pengisian kontak/wilayah:', results);
        if (btn) btn.disabled = false;
        return;
      }
      await sleep(400);
    }
    if (btn) btn.disabled = false;
    status('Identitas resmi AHU belum terdeteksi. Pilih hasil PT FEDERAL INTERNATIONAL FINANCE dari autocomplete, lalu klik tombol ini lagi.', true);
  }

  $('#ahuFillRecipient').addEventListener('click', fillRecipientModal);

  $('#ahuCsvFile').addEventListener('change', async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      if (!/\.xlsx$/i.test(file.name)) throw new Error('Pilih file Excel .xlsx sesuai template tetap.');
      if (typeof XLSX === 'undefined') throw new Error('Library pembaca Excel belum dimuat. Periksa koneksi lalu refresh halaman AHU.');
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array', cellDates: false });
      if (!workbook.SheetNames.length) throw new Error('Workbook Excel tidak memiliki sheet.');
      const sheetName = workbook.SheetNames.includes('DATA_FIDUSIA') ? 'DATA_FIDUSIA' : workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const parsed = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: '' });
      const cleanRows = parsed.filter(r => Array.isArray(r) && r.some(v => String(v ?? '').trim() !== ''));
      if (cleanRows.length < 2) throw new Error(`Sheet ${sheetName} harus berisi header dan minimal satu baris data.`);

      // Template AHU dapat memiliki 1, 2, atau 3 baris header:
      // judul kelompok, label kolom, lalu ID field teknis.
      // Prioritaskan baris yang berisi ID teknis karena itulah kunci pemetaan autofill.
      const technicalKeys = new Set([
        'nm_debitur', 'no_perjanjian', 'tgl_perjanjian', 'no_akta', 'tgl_akta',
        'tgl_jangka_waktu', 'tgl_jangka_waktu_akhir', 'nm_pemberi',
        'nik_npwp_pemberi', 'pokok_dasar', 'penjaminan'
      ]);
      let headerIndex = -1;
      let bestScore = 0;
      cleanRows.forEach((row, index) => {
        const values = row.map(v => String(v ?? '').trim());
        const score = values.filter(v => technicalKeys.has(v) || /^category\[0\]\[(?:input|select)\]\[.+\]$/.test(v)).length;
        if (score > bestScore) { bestScore = score; headerIndex = index; }
      });
      // Backward compatibility: template satu baris header atau dua baris header
      // tetap diterima. Jika tidak ditemukan ID teknis, gunakan baris nonkosong pertama.
      if (headerIndex < 0 || bestScore < 2) headerIndex = 0;

      state.headers = cleanRows[headerIndex].map(h => String(h ?? '').trim());
      const nonEmptyHeaders = state.headers.filter(Boolean);
      if (nonEmptyHeaders.length < 2) throw new Error('Baris header tidak dikenali. Gunakan template Excel resmi.');
      const duplicate = nonEmptyHeaders.filter((h, i) => nonEmptyHeaders.indexOf(h) !== i);
      if (duplicate.length) throw new Error(`Header duplikat: ${[...new Set(duplicate)].join(', ')}`);
      state.rows = cleanRows.slice(headerIndex + 1)
        .filter(cells => cells.some(v => String(v ?? '').trim() !== ''))
        .map(cells => Object.fromEntries(state.headers
          .map((h, i) => [h, String(cells[i] ?? '').trim()])
          .filter(([h]) => h)))
        // final24: buang baris nyasar (tanpa No. Akta DAN tanpa No. Perjanjian —
        // bukan record fidusia, mis. sisa edit yang hanya berisi satu kolom).
        .filter(row => String(row.no_akta || '').trim() !== '' || String(row.no_perjanjian || '').trim() !== '');
      state.index = 0; state.fileName = `${file.name} · sheet ${sheetName}`;
      buildBatches(); populateBatchSelect(); // final24: kelompokkan per REQ
      $('#ahuFileInfo').textContent = `${file.name} · sheet ${sheetName} · ${state.rows.length} record · ${state.headers.length} kolom · ${state.batches.length} batch`;
      status(`Excel dimuat dari sheet ${sheetName}. Klik “Isi record” untuk mengisi record pertama.`);
      update();
    } catch (err) {
      state.rows = []; state.headers = []; state.batches = []; state.batchKey = ''; populateBatchSelect(); update(); status(`Gagal membaca Excel: ${err.message}`, true);
    } finally {
      // final30: kosongkan input file supaya file yang sama bisa dipilih lagi
      // (re-export lalu re-import) — tanpa ini event change tidak terpicu.
      e.target.value = '';
    }
  });
  $('#ahuFill').addEventListener('click', fillRecord);
  // final7: Next/Prev mengosongkan form AHU dari data record sebelumnya,
  // supaya nama/wilayah lama tidak tertinggal dan dikira data record baru.
  // Form baru diisi ulang hanya saat 'Isi record' diklik (tidak ada submit
  // otomatis di langkah ini).
  const clearPemberiFormForNext = () => {
    // final14, RINGAN: reset nilai diam-diam, tanpa dispatch/change.
    // Alasan: dispatch change di select wilayah/kategori memicu handler AHU
    // (AJAX loadData, load_category) yang membuat Next terasa berat dan
    // repaint panel tertunda. Pengisian berikutnya memakai dispatch-nya
    // sendiri, jadi clear tidak perlu memicu handler AHU sama sekali.
    // Hanya field yang benar-benar terisi yang disentuh.
    const formEl = document.getElementById('form_daftar') || document;
    const isProtected = (el) => {
      // final15: field disabled (abu-abu) JANGAN PERNAH disentuh, termasuk
      // Kedudukan Notaris (select name='tempat' id='tempat', disabled).
      if (el.disabled) return true;
      if (el.id === 'tempat' || el.name === 'tempat') return true;
      const key = `${el.id || ''} ${el.name || ''}`.toLowerCase();
      return key.includes('penerima') || key.includes('notaris') || key.includes('kedudukan') ||
        key.includes('flag_hutang') || el.id === 'agree';
    };
    for (const el of formEl.querySelectorAll('input, textarea')) {
      if (isProtected(el)) continue;
      if (el.type === 'radio' || el.type === 'checkbox') {
        // final30: bersihkan radio/checkbox antar record supaya nilai record
        // lama (gender, jenis penggunaan, sub-jenis) tidak bocor ke record
        // baru yang datanya kosong. Tanpa dispatch (tetap ringan).
        if (el.checked) el.checked = false;
        continue;
      }
      if (['hidden', 'submit', 'button', 'file'].includes(el.type)) continue;
      if (!String(el.value || '').trim()) continue;
      const wasReadonly = el.readOnly;
      if (wasReadonly) el.readOnly = false;
      el.value = '';
      if (wasReadonly) el.readOnly = true;
      try {
        if (window.jQuery && window.jQuery(el).hasClass('hasDatepicker')) window.jQuery(el).datepicker('setDate', null);
      } catch (e) {}
    }
    for (const sel of formEl.querySelectorAll('select')) {
      if (isProtected(sel)) continue;
      if (sel.value === '' || sel.selectedIndex <= 0) continue;
      sel.value = '';
      sel.selectedIndex = 0;
    }
    for (const sp of formEl.querySelectorAll('[id*="terbilang"], [class*="terbilang"], #format_rp1, .format_rp2, #format, #format2, #RpText, #RpText2, .RpText2')) {
      try { sp.textContent = ''; } catch (e) {}
      try { if (sp.id === 'RpText' || sp.id === 'RpText2' || sp.classList.contains('RpText2')) sp.innerHTML = ''; } catch (e) {}
    }
  };
  // final14: nomor panel di-update DULU, baru form dikosongkan, supaya klik
  // langsung terlihat di panel dan tidak terasa 'tidak masuk' lalu diklik lagi.
  const goToRecord = (delta) => {
    // final24: Next/Prev hanya bergerak di dalam batch yang dipilih.
    const idxs = batchIndices();
    const pos = idxs.indexOf(state.index);
    const nextPos = (pos < 0 ? 0 : pos) + delta;
    if (nextPos < 0 || nextPos >= idxs.length) return;
    state.index = idxs[nextPos];
    update();
    status('Record dipilih, form dikosongkan (kecuali Penerima Fidusia dan data notaris). Klik “Isi record” untuk memuat record ini.');
    clearPemberiFormForNext();
  };
  // final26: kotak Loncat — TERKUNCI di batch yang dipilih (perintah user).
  // Ketik No. Akta (cth 80) -> cari HANYA di batch yang dipilih; bila tidak
  // ada di batch itu, loncat GAGAL dan batch TIDAK berubah (tidak pindah ke
  // batch lain). Ketik #N (cth #5) -> record ke-N di dalam batch yang dipilih.
  // Untuk loncat bebas, pilih dulu 'Semua record' di dropdown batch.
  const jumpToRecord = () => {
    const input = document.querySelector('#ahuJump');
    if (!input) return;
    const q = String(input.value || '').trim();
    if (!q) { status('Ketik No. Akta (cth 80) atau #No. record (cth #5) di kotak Loncat.', true); return; }
    const idxs = batchIndices();
    const batchLabel = state.batchKey ? (state.batches.find(b => b.key === state.batchKey)?.label || state.batchKey) : 'Semua';
    let target = -1;
    if (q.startsWith('#')) {
      // #N = record ke-N di dalam batch yang dipilih (1-based).
      const n = parseInt(q.slice(1), 10);
      if (!isNaN(n) && n >= 1 && n <= idxs.length) target = idxs[n - 1];
    } else {
      // No. Akta: cari HANYA di batch yang dipilih. Batch TIDAK pernah berubah.
      target = idxs.find(i => String(state.rows[i]?.no_akta || '').trim() === q);
      if (target === undefined) target = -1;
    }
    if (target === -1 || target === undefined || target === null) {
      // Bantu: akta itu ada di batch mana (bila ada), supaya user tahu harus
      // pilih batch apa — tapi batch TIDAK diubah otomatis.
      let where = '';
      if (!q.startsWith('#')) {
        const found = state.batches.find(b => b.indices.some(i => String(state.rows[i]?.no_akta || '').trim() === q));
        if (found) where = ` No. Akta ${q} ada di batch ${found.label} — pilih batch itu atau 'Semua record' dulu.`;
        else where = ` No. Akta ${q} tidak ada di Excel ini.`;
      }
      status(`Tidak ketemu${state.batchKey ? ` di batch ${batchLabel}` : ''}: ${q.startsWith('#') ? `record ${q}` : `No. Akta ${q}`}.${where}`, true);
      return;
    }
    state.index = target;
    update();
    const row = state.rows[target] || {};
    const pos = idxs.indexOf(target);
    status(`Loncat ke record ${pos + 1} / ${idxs.length} di batch ${batchLabel} (No. Akta ${row.no_akta || '—'}). Klik \u201cIsi record\u201d untuk memuat record ini.`);
    clearPemberiFormForNext();
  };
  $('#ahuPrev').addEventListener('click', () => goToRecord(-1));
  $('#ahuNext').addEventListener('click', () => goToRecord(1));
  // final24: ganti batch -> loncat ke record pertama batch itu.
  $('#ahuBatch').addEventListener('change', () => {
    const sel = document.querySelector('#ahuBatch');
    state.batchKey = sel ? sel.value : '';
    const idxs = batchIndices();
    if (!idxs.length) { update(); return; }
    state.index = idxs[0];
    update();
    const b = state.batches.find(x => x.key === state.batchKey);
    status(b ? `Batch ${b.label} dipilih (${b.indices.length} record). Record pertama batch ini sudah dipilih.` : `Semua record dipilih (${state.rows.length} record).`);
    clearPemberiFormForNext();
  });
  // final24: kotak Loncat (tombol + Enter).
  $('#ahuJumpBtn').addEventListener('click', jumpToRecord);
  $('#ahuJump').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); jumpToRecord(); } });

  $('#ahuMin').addEventListener('click', () => {
    const body = $('#ahuBody');
    body.hidden = !body.hidden;
    $('#ahuMin').textContent = body.hidden ? '+' : '−';
  });
  update();
})();
