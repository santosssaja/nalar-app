# 🌟 Nalar — Platform Pembelajaran STEM Interaktif & Inklusif

> **Tema**: *"Pendidikan Berkualitas: menyediakan pendidikan yang inklusif, merata, dan berkualitas."*

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0_Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0_Passing-729B1B?logo=vitest)](https://vitest.dev/)

---

## 📖 Tentang Nalar

**Nalar** adalah platform web edukasi Sains, Teknologi, Rekayasa, dan Matematika (STEM) interaktif yang dirancang sebagai alternatif terbuka dan gratis setara *Brilliant*. Nalar mengubah konsep-konsep matematika yang abstrak dan rumit menjadi pemahaman intuitif melalui manipulasi visual kanvas 60 FPS, didukung fitur aksesibilitas kelas satu untuk penyandang disabilitas (*low vision*, tunarungu, asistensi audio), serta tutor AI hemat kuota token.

---

## ✨ Fitur Unggulan

### 1. 🚀 Zero-Friction Onboarding (Akses Instan)
- **Tanpa Wajib Registrasi di Awal**: Pengguna langsung dapat belajar, memanipulasi simulasi, dan menyelesaikan tantangan tanpa rintangan formulir pendaftaran.
- **Penyimpanan Lokal Mandiri**: Seluruh kemajuan belajar, XP, perolehan lencana (*badges*), dan preferensi tampilan tersimpan otomatis di `localStorage`.

### 2. 🎨 Kanvas Visual Interaktif & Reaktif
- **Manipulasi Parameter Langsung**: Tarik vektor di kanvas atau putar jam modulo, angka rumus matematika KaTeX bereaksi sinkron seketika (*real-time*).
- **Teknologi Grafis Teruji**: Memanfaatkan **Mafs** (visualisasi kartesius ala 3Blue1Brown) dan **SVG dinamis** berperforma tinggi.
- **Pemisahan Rumus Murni (*Pure Math Engine*)**: Logika kalkulasi matematika diisolasi ke modul independen (`src/lib/math-engine/`) yang teruji dengan pengujian unit otomatis.

### 3. ♿ Aksesibilitas Terpadu (A11y-First)
- **3 Mode Tema Adaptif**: Mode Gelap (*Dark*), Mode Terang (*Light*), dan Kontras Tinggi (*High Contrast*) dengan transisi mulus bebas kedipan (*Anti-FOUC script*).
- **Asistensi Audio (Web Speech API)**: Narasi materi suara otomatis (*Text-to-Speech*) menggunakan suara bahasa Indonesia alami tanpa dependensi pustaka luar.
- **Ramah Teman Tuli (*Visual Subtitles*)**: Takarir langsung (*live subtitles*) visual yang menampilkan teks narasi saat audio aktif.
- **Skala Ukuran Huruf Dinamis**: Pilihan ukuran teks (Normal, Besar, Ekstra Besar).
- **Navigasi Keyboard Penuh**: Dilengkapi dialog pintasan (`?` atau tombol di navbar) untuk navigasi cepat via keyboard (`Tab`, `Space`, `Panah`, dll.).

### 4. 🤖 AI Tutor Cerdas & Hemat Token (*On-Demand*)
- **Event-Driven**: AI tutor hanya dipanggil saat pengguna meminta bantuan petunjuk (*hints*) atau bertanya secara kontekstual.
- **Petunjuk 3 Tingkat**: Mulai dari petunjuk konseptual, petunjuk rumus, hingga jawaban terperinci.
- **Local Mock Service**: Tersedia pengujian lokal tanpa biaya token maupun kunci API pihak ketiga.

---

## 📚 Katalog Modul yang Tersedia

| Level | Topik | URL Halaman | Teknologi Kanvas | Konsep Kunci |
| :---: | :--- | :--- | :--- | :--- |
| **Level 1** | **Aritmetika Jam (Modulo Clock)** | `/topics/arithmetic-modular-clock` | SVG Dinamis | Aritmetika modular, siklus periodik, sisa bagi, pola fraktal kardioid & koprima. |
| **Level 3** | **Determinan Matriks 2D** | `/topics/linear-algebra-determinant-2d` | Mafs 2D Visualizer | Transformasi ruang vektor $\hat{i}$ & $\hat{j}$, orientasi bidang, luas paralelogram, determinan negatif. |

---

## 📂 Struktur Repositori

```text
nalar/
├── src/                          # Frontend Next.js (App Router)
│   ├── app/                      # Rute halaman (layout, page, topics)
│   ├── components/
│   │   ├── accessibility/        # Bar aksesibilitas, modal keyboard, subtitles
│   │   ├── ai/                   # Drawer AI Tutor on-demand
│   │   ├── katex/                # Komponen render KaTeX reaktif
│   │   └── ui/                   # Komponen kartu, badge, tombol
│   ├── context/                  # AccessibilityContext & GamificationContext
│   ├── lib/
│   │   ├── audio/                # Modul Web Speech API
│   │   ├── math-engine/          # Fungsi matematika murni + Unit tests
│   │   └── storage.ts            # SSR-safe useLocalStorage hook
│   ├── modules/                  # Modul STEM mandiri (konten, kanvas, tantangan)
│   │   └── math/
│   │       ├── arithmetic-modular-clock/
│   │       └── linear-algebra-determinant-2d/
│   └── types/                    # Definisi antarmuka TypeScript
├── backend/                      # Backend Scaffold FastAPI (Python)
│   ├── app/
│   │   ├── api/v1/endpoints/     # Endpoint health, ai-tutor (hint & chat)
│   │   ├── core/config.py        # Konfigurasi CORS & environment
│   │   ├── schemas/              # Skema Pydantic
│   │   └── services/             # Local Mock AI Tutor & LLM provider
│   ├── requirements.txt
│   └── run.py
├── docs/                         # Dokumentasi Arsitektur, Ide, & Roadmap
│   ├── README.md                 # Indeks dokumentasi
│   ├── idea.md                   # Visi produk & perincian fitur
│   ├── architecture-math.md      # Panduan teknis & standar kanvas matematika
│   └── roadmap-math.md           # Peta kurikulum matematika dari Level 1 - 5
└── AGENTS.md                     # Aturan baku & standar kode untuk AI pair programming
```

---

## 🚀 Panduan Memulai Cepat

### Prasyarat Sistem
- **Node.js**: v20+ atau lebih baru
- **Package Manager**: `pnpm` (disarankan) atau `npm`
- **Python**: v3.10+ (untuk backend scaffold FastAPI)

---

### 1. Menjalankan Frontend (Next.js)

1. Buka terminal di direktori utama `nalar`:
   ```bash
   pnpm install
   # atau: npm install
   ```

2. Jalankan server pengembang:
   ```bash
   pnpm dev
   # atau: npm run dev
   ```

3. Buka peramban di [http://localhost:3000](http://localhost:3000).

---

### 2. Menjalankan Backend (FastAPI)

1. Buka terminal di direktori `backend/`:
   ```bash
   cd backend
   ```

2. Aktifkan virtual environment Python:
   - **Windows (PowerShell)**:
     ```powershell
     .\.venv\Scripts\Activate.ps1
     ```
   - **Linux / macOS**:
     ```bash
     source .venv/bin/activate
     ```

3. Instal dependensi:
   ```bash
   pip install -r requirements.txt
   ```

4. Jalankan server backend:
   ```bash
   python run.py
   ```

5. Server backend aktif di `http://127.0.0.1:8000`.
   - Dokumentasi interaktif Swagger UI: [http://127.0.0.1:8000/api/v1/docs](http://127.0.0.1:8000/api/v1/docs)

---

## 🧪 Pengujian & Verifikasi Kualitas

Seluruh kode divalidasi dengan standar kualitas tinggi sebelum diuji:

```bash
# Menjalankan unit tests matematika (Vitest)
pnpm test

# Pemeriksaan kepatuhan tipe data TypeScript (Strict mode)
pnpm typecheck

# Linting kode sumber
pnpm lint

# Uji build produksi
pnpm build
```

---

## 📜 Lisensi & Kontribusi

Proyek ini dibangun untuk tujuan edukasi terbuka dengan misi menyediakan pembelajaran sains dan matematika yang inklusif dan merata bagi semua kalangan.
