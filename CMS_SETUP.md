# CMS Setup — nulis artikel dari browser/HP 📝

Artikel journal sekarang hidup di `content/journal/*.md` dan bisa ditulis
lewat dashboard web di **https://pma.wtf/admin** (Decap CMS).

Alurnya: tulis di dashboard → pencet **Publish** → otomatis commit ke repo
→ GitHub Actions build + deploy → artikel tayang ~1–2 menit kemudian.

Yang perlu disiapin sekali aja (sekitar 10 menit):

## 1. Bikin GitHub OAuth App

1. Buka https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**
2. Isi:
   - Application name: `PMA.WTF CMS`
   - Homepage URL: `https://pma.wtf`
   - Authorization callback URL: `https://<worker-kamu>.workers.dev/callback`
     (URL worker dari langkah 2 — kalau belum ada, isi dulu sembarang,
     nanti balik ke sini buat update)
3. **Register application**, lalu **Generate a new client secret**
4. Catat **Client ID** dan **Client Secret**-nya

## 2. Deploy OAuth proxy ke Cloudflare (gratis)

1. Buka https://dash.cloudflare.com → **Workers & Pages** → **Create Worker**
2. Deploy, lalu **Edit code** → hapus isi default → paste seluruh isi file
   `decap-oauth-worker.js` dari repo ini → **Save and deploy**
3. Buka **Settings → Variables → Add secret**:
   - `GITHUB_CLIENT_ID` = Client ID dari langkah 1
   - `GITHUB_CLIENT_SECRET` = Client Secret dari langkah 1
4. Catat URL worker-nya, mis. `https://pma-cms-auth.kamu.workers.dev`
5. Kalau tadi callback URL-nya masih sembarang, balik ke OAuth App
   (langkah 1) dan update jadi `https://<worker-kamu>.workers.dev/callback`

## 3. Sambungkan config CMS

1. Edit `public/admin/config.yml` → ganti `base_url` dengan URL worker kamu
2. Commit + push (atau edit langsung di github.com)
3. Tunggu deploy selesai

## 4. Tes

1. Buka **https://pma.wtf/admin**
2. Klik **Login with GitHub** → popup GitHub → **Authorize**
3. Masuk ke **Journal** → **New Article** → isi → **Publish**
4. Cek https://pma.wtf/journal ~1–2 menit kemudian 🎉

## Catatan

- **ID artikel**: selalu pakai nomor 3 digit berikutnya yang belum dipakai
  (mis. kalau terakhir 037, artikel baru = 038). ID ini juga jadi URL:
  `pma.wtf/journal/038`.
- **Cover image** opsional — kalau kosong, artwork generatif yang dipakai
  (sama kayak sekarang).
- Dashboard `/admin` diset `noindex` jadi nggak muncul di Google.
- Sitemap (`sitemap.xml`) dan halaman statis per artikel dibuat otomatis
  tiap build — nggak perlu diurus manual lagi.
- Kalau login gagal: cek Client ID/Secret di worker bener, dan callback URL
  di OAuth App persis `<worker>/callback`.
