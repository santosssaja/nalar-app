# 🎨 Nalar: Panduan Sistem Desain & Spesifikasi UI/UX

> **Filosofi Inti**: *"Menghidupkan Nalar melalui Visualisasi Interaktif, Elegan, dan Inklusif bagi Setiap Insan Belajar."*

Dokumen ini mendefinisikan standar identitas visual, arsitektur *Design Tokens*, sistem komponen antarmuka, pedoman aksesibilitas (A11y), serta pedoman interaksi untuk platform web **Nalar**.

---

## 1. Filosofi Desain & Identitas Brand

### A. Pilar Visual
1. **Intuitif & Eksploratif**: Menghindari tampilan statis membosankan. Konsep abstrak disajikan sebagai objek visual yang merespons sentuhan dan manipulasi pengguna secara *real-time* (60 FPS).
2. **Inklusif & Ramah Difabel (Accessibility-First)**: Aksesibilitas bukan sekadar fitur tambahan, melainkan pondasi arsitektur sejak awal (Dark Mode bawaan, Kontras Tinggi WCAG AAA, asistensi suara Web Speech API, dan navigasi papan ketik penuh).
3. **Ramah & Hangat (Human-Centric)**: Melalui maskot **Nai** (Panda Merah), platform menghadirkan suasana belajar yang mendukung tanpa rasa takut salah, mengadopsi psikologi belajar positif Duolingo & Brilliant.
4. **Modern & Premium**: Memadukan estetika *dark-mode native*, tipografi kurasi tinggi, *glassmorphism* lembut, palet warna harmonis per domain, dan mikro-animasi fluida.

---

## 2. Design Tokens & Palet Warna

Platform mengadopsi arsitektur token semantik dinamis pada Tailwind CSS v4 ([src/app/globals.css](../src/app/globals.css)), mendukung tiga mode tema global:

### A. Tema Warna Dasar

| Token Semantik | Dark Mode (Default) | Light Mode | High-Contrast (A11y) |
| :--- | :--- | :--- | :--- |
| `--theme-bg-app` | `#09090b` (Zinc 950) | `#f8fafc` (Slate 50) | `#000000` (Pure Black) |
| `--theme-bg-surface` | `#18181b` (Zinc 900) | `#ffffff` (Pure White) | `#121212` (Pitch Black) |
| `--theme-bg-muted` | `#27272a` (Zinc 800) | `#f1f5f9` (Slate 100) | `#1c1c1c` (Solid Dark) |
| `--theme-border` | `#3f3f46` (Zinc 700) | `#cbd5e1` (Slate 300) | `#facc15` (Vibrant Yellow) |
| `--theme-text-heading` | `#f4f4f5` (Zinc 100) | `#0f172a` (Slate 900) | `#ffffff` (Pure White) |
| `--theme-text-body` | `#d4d4d8` (Zinc 300) | `#334155` (Slate 700) | `#ffffff` (White 100%) |
| `--theme-accent` | `#6366f1` (Indigo 500) | `#4f46e5` (Indigo 600) | `#facc15` (Yellow 400) |

### B. Palet Identitas Warna per Domain Keilmuan

Setiap cabang STEM memiliki aksen warna distingtif untuk mempermudah identifikasi kognitif:

* **📐 Matematika**: `Indigo & Cyan` (`#6366f1` & `#06b6d4`) — melambangkan logika struktur, ketajaman presisi, dan pembuktian formal.
* **⚛️ Fisika**: `Amber & Orange` (`#f59e0b` & `#f97316`) — melambangkan energi, lintasan gerak, gaya dinamika, dan hukum alam.
* **🧪 Kimia**: `Emerald & Teal` (`#10b981` & `#14b8a6`) — melambangkan reaksi zat, ikatan molekul, dan transformasi materi.
* **🧬 Biologi**: `Rose & Pink` (`#f43f5e` & `#ec4899`) — melambangkan mekanisme kehidupan sel, genetika, dan ekosistem.
* **🧠 Soft Skills & Metakognisi**: `Violet & Purple` (`#8b5cf6` & `#a855f7`) — melambangkan kejernihan berpikir kritis, etika nalar, dan filosofi sains.

---

## 3. Tipografi & Rumus Matematika

1. **Huruf Utama (Interface & Narasi)**:
   * Menggunakan keluarga huruf sans-serif modern berdaya baca tinggi (*Plus Jakarta Sans* / *Inter*).
   * Hirarki: `h1` (28–36px, font-bold), `h2` (22–24px, font-semibold), `h3` (18–20px), body (14–16px, leading-relaxed).
2. **Huruf Monospace (Angka, Koordinat, Variabel)**:
   * Menggunakan *Fira Code* / *JetBrains Mono* untuk memastikan perataan angka dan pembacaan kode bersih.
3. **Render Rumus KaTeX**:
   * Seluruh notasi ilmiah dirender menggunakan KaTeX murni (*inline* `$formula$` dan *display block* `$$formula$$`).
   * Desain reaktif: angka di dalam rumus KaTeX terikat (*bound*) dengan nilai variabel kanvas secara sinkron.
4. **Skalabilitas Huruf Aksesibel**:
   * Pilihan ukuran teks langsung di UI: **Kecil (S)**, **Normal (M)**, **Besar (L)**, dan **Ekstra Besar (XL)** via `AccessibilityContext`.

---

## 4. Desain Karakter & Maskot: "Nai" (Panda Merah)

Maskot **Nai** adalah teman pemandu belajar yang hadir di setiap langkah interaksi, diimplementasikan sebagai komponen SVG vektor modular ([src/components/mascot/NaiMascot.tsx](../src/components/mascot/NaiMascot.tsx)):

* **11 Ekspresi Emosional**:
  1. `idle` — Senyum ramah santai di beranda dan navigasi.
  2. `explaining` — Menjelaskan materi pada langkah konsep awal.
  3. `thinking` — Mengajak berpikir mendalam pada tantangan logika.
  4. `celebrating` — Merayakan keberhasilan menyelesaikan level atau meraih lencana.
  5. `confused` — Reaksi empatik saat pengguna menjawab salah berulang kali.
  6. `encouraging` — Memberi dorongan motivasi saat membuka petunjuk (*Hint 1 & 2*).
  7. `sleepy` — Muncul saat pengguna tidak aktif dalam waktu lama.
  8. `excited` — Antusiasme saat membuka topik atau tantangan baru.
  9. `surprised` — Menyoroti fenomena paradoks atau kejutan matematika/sains.
  10. `listening` — Mode pembacaan audio narasi suara.
  11. `proud` — Merayakan pencapaian *Streak* harian atau naik jenjang (*Level Up*).
* **Nai Speech Bubble & Voice**:
  * Dilengkapi balon teks dinamis dan terhubung ke tombol suara Web Speech API beraksen ramah bahasa Indonesia.

---

## 5. Tata Letak (Layout Shell) & Pola Antarmuka

Platform menggunakan arsitektur antarmuka fleksibel tanpa gangguan (*zero gatekeeping*):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ TopBar: Logo Nalar | Gamifikasi (Streak 🔥, XP ⭐) | A11y Controls (Tema, Font, TTS)│
├───────────────┬─────────────────────────────────────────────────────────────┤
│ Compact Rail  │ Area Konten Utama (Dynamic Viewport):                       │
│ (72px) /      │                                                             │
│ Full Drawer   │ ┌──────────────────────────────┬──────────────────────────┐ │
│ Overlay:      │ │ Kanvas Grafis Interaktif 2D  │ Panel Kontrol Parameter  │ │
│ • Beranda     │ │ (Mafs / SVG Dinamis)         │ (Slider, Preset, Tombol) │ │
│ • Skill Tree  │ ├──────────────────────────────┴──────────────────────────┤ │
│ • Katalog     │ │ Formula Matematika KaTeX & Tantangan Logika             │ │
│ • XP & Rank   │ └─────────────────────────────────────────────────────────┘ │
└───────────────┴─────────────────────────────────────────────────────────────┘
```

1. **Shell Navigasi Adaptif**:
   * **Desktop**: *Icon-Rail* Kompak Permanen (72px) berkecepatan tinggi tanpa pergeseran tata letak (*zero-layout-shift*), memaksimalkan ruang horizontal untuk kanvas simulasi STEM. Dilengkapi *Drawer Overlay* (320px) dengan efek *backdrop-blur* yang dapat dibuka kapan saja melalui tombol menu untuk melihat rincian navigasi dan kartu progres gamifikasi tanpa menggeser kanvas.
   * **Mobile**: *Bottom navigation bar* jempol-sentuh (*thumb-friendly*) dengan target sentuh minimal 44 × 44 px serta menu *drawer* geser yang inklusif.
2. **Dual-Mode Pembelajaran**:
   * **Mode Jalur Penjelajahan Konsep (Stepping-Stones)**: Peta berundak 3 tier bintang dengan rute langkah terstruktur: *Explanation* → *Playground* → *Challenge* → *Validation*.
   * **Mode Sandbox Penuh**: Kanvas dua kolom untuk pengguna yang ingin langsung bereksperimen dengan seluruh parameter tanpa batasan alur level.
3. **Papan Keterampilan (Interactive Skill Tree)**:
   * Dibangun dengan `@xyflow/react`. Node topik divisualisasikan dengan gradien status (*Terkunci*, *Tersedia/Aktif*, *Tuntas*), garis prasyarat dinamis, serta filter domain dan jenjang umur (Explorer, Navigator, Scholar).

---

## 6. Standar Aksesibilitas (A11y) & Performa

Sesuai kontrak [AGENTS.md](../AGENTS.md):
- **Kontras Tinggi WCAG AAA**: Rasio kontras teks minimal 7:1 pada mode kontras tinggi dengan garis tepi pembatas tebal kuning `#facc15`.
- **Keyboard-Only Accessible**: Semua slider, tombol, dan node grafis dapat dioperasikan menggunakan `Tab`, `Arrow Left/Right/Up/Down`, `Space`, dan `Enter`.
- **Screen Reader (Web Speech API)**: Narasi teks dan pembacaan perubahan angka pada slider terintegrasi dengan speech synthesizer bawaan peramban tanpa latensi server.
- **Isolasi Render (Performance Guardrail)**: Perubahan posisi slider atau tarikan kursor pada kanvas hanya merender ulang kanvas target pada 60 FPS, tanpa memicu *re-render* seluruh pohon halaman induk.
