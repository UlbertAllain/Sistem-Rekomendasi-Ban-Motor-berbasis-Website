# Sistem Rekomendasi Ban Motor

Aplikasi web untuk membantu memilih ban motor berdasarkan kecocokan kendaraan dan kriteria pengguna. Repository memisahkan data kendaraan/ban, logika rekomendasi, dan endpoint API.

## Ruang lingkup

- Halaman rekomendasi di `/recommend` dan penjelasan metode di `/cara-kerja`.
- Data motor dan ban melalui endpoint `/api/motorcycles`, `/api/tires`, dan `/api/recommend`.
- Implementasi utilitas similarity, feature vector, dan scoring di `lib/utils/`.
- Service rekomendasi CBF serta kode eksperimen Weighted Scoring Model (WSM); sebagian implementasi lama tersimpan sebagai komentar dan tidak boleh dianggap sebagai jalur aktif.

## Stack

Next.js 16, React 19, TypeScript, Firebase client SDK, dan Firebase Admin SDK.

## Jalankan secara lokal

```bash
npm ci
npm run dev
```

Buka `http://localhost:3000/recommend`. Pengoperasian fitur data memerlukan konfigurasi Firebase yang sesuai dengan file pada `lib/firebase/`. Simpan credential admin hanya di server/environment.

## Struktur inti

```text
app/                      Halaman dan API routes
lib/services/             Data motor, ban, dan rekomendasi
lib/utils/                Feature vector, scoring, similarity
lib/types/                Kontrak data
lib/firebase/             Konfigurasi Firebase client/admin
```

## Validasi

```bash
npm run lint
npm run build
```

**Batasan:** Rekomendasi software tidak menggantikan pemeriksaan ukuran ban yang disetujui pabrikan, spesifikasi kendaraan, maupun kondisi nyata ban. Verifikasi data katalog sebelum menyajikannya sebagai rekomendasi penggunaan di jalan.
