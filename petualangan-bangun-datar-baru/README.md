# Petualangan Bangun Datar (React + TypeScript + Vite)

Game edukasi bangun datar untuk ponsel Android. 30 level, 5 pulau, soal acak, koleksi, prestasi.

## Menjalankan di Visual Studio Code
Perlu Node.js 18 atau lebih baru.
```
npm install
npm run dev
```
Buka alamat yang tampil (biasanya http://localhost:5173), lalu F12 dan mode perangkat seluler.

## Aset dosen
Aset dari dosen ada di `src/assets/ui/` (sudah dipotong transparan, teks angka bawaan dihapus agar bisa dinamis):
`profile_card`, `currency_bar`, `back_btn`, `title_banner`, `mission_card`, `collection_card`, `node_current/open/locked`, `nav_*`.
Latar peta: `src/assets/peta-bg.webp` (dari `00_map_screen_reference.png`).

## Struktur
```
├── index.html
├── vite.config.ts · tsconfig.json · package.json
├── capacitor.config.json        pembungkus Android (webDir = dist)
└── src/
    ├── main.tsx                 titik awal React
    ├── App.tsx                  pengatur layar dan alur permainan
    ├── types.ts                 tipe data (Screen, Question, Save, LevelResult)
    ├── store/GameContext.tsx    state pemain + simpan otomatis (localStorage)
    ├── data/
    │   ├── shapes.ts            12 bangun: gambar SVG, ciri, rumus
    │   ├── questions.ts         bank soal fakta + pembuat soal hitungan per pulau
    │   └── content.ts           pulau, tujuan level, tema, prestasi
    ├── lib/random.ts            fungsi acak
    ├── components/              Hero, Shape, TopBar, BottomNav
    ├── screens/                 Home, MapScreen, Collection, LevelDetail, Explore,
    │                            Quiz, Result, Achievements, Materials, Profile
    └── styles/index.css
```

## Membuat APK
Perlu Android Studio.
```
npm run android:add
npm run android:sync
npm run android:open
```
Lalu di Android Studio: **Build > Build APK(s)**.

## Menambah soal
Soal fakta: array `FQ` di `src/data/questions.ts`. Soal hitungan: tambah fungsi ke array `G` pada pulau yang diinginkan.

## Pulau 1 (Level 1–3)

- 5 pulau × 3 level = 15 level. Hanya Level 1–3 (Pulau 1) yang bisa dimainkan; Level 4–15 tampil terkunci ("segera hadir").
- Tahap 1: kumpulkan segitiga, persegi, lingkaran (kiri/kanan/lompat) → otomatis masuk soal setelah 3/3.
- Tahap 2: 5 soal tetap (`src/data/pulau1.ts`), 3 nyawa, 1 kali jawab per soal.
- Bintang: benar 1–2 = 1★, 3 = 2★, 4–5 = 3★. Level berikutnya terbuka hanya jika ≥ 2★.
- Progres disimpan di localStorage (kunci `pbd_react_v2`).
- `backup/peta-bg.original.webp` = gambar peta asli sebelum 12 node cadangan (level 7–30 lama) dihapus dari ilustrasi.
