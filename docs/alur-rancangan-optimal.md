# Alur Rancangan Optimal — Nalar STEM Platform

> Roadmap terstruktur dari masalah yang ada ke solusi yang terurut berdasarkan dependency.

---

## Prinsip Rancangan

1. **Fix foundation dulu** — refactor monolithic modules, fix security, sebelum tambah modul baru
2. **Build prerequisite dulu** — modul P0 harus ada sebelum P1 karena skill tree punya edges
3. **Enrich existing dulu** — perbaiki konten 15 modul yang ada sebelum tambah modul baru
4. **Pattern dulu, scale kemudian** — tetapkan pattern yang benar, lalu replicate

---

## FASE 0: Foundation Fix (Minggu 1-2)

> Tujuan: Pastikan codebase sehat, aman, dan konsisten sebelum tambah kode baru.
> **Status: ✅ SELESAI** (15 Sep 2026)

### 0A. Split Monolithic Modules ✅ SELESAI

**Target**: 4 modul monolitik (>900 baris) — melebihi target awal 2 modul.

| Modul | Sebelum | Sesudah | File yang Dihasilkan |
|---|---|---|---|
| `math-primes-coprime/module.ts` | 1142 baris | ~35 baris | `challenges.ts` + `Level1-6.ts` |
| `math-real-numbers-line/module.ts` | 969 baris | ~30 baris | `Level1-5.ts` |
| `arithmetic-modular-clock/module.ts` | 1140 baris | ~24 baris | `Level1-6.ts` |
| `math-euclid/module.ts` | 1134 baris | ~33 baris | `Level1-6.ts` |

**Pattern yang diterapkan**:
```
module.ts          ← import Level files, assemble TopicModule
challenges.ts      ← exported challenge configs (jika ada targetCondition inline)
Level1.ts          ← single Level object export
Level2.ts          ← single Level object export
...
engine.ts          ← pure math functions (SUDAH ADA)
Canvas.tsx         ← visualization (SUDAH ADA)
Controls.tsx       ← slider inputs (SUDAH ADA)
Challenge.tsx      ← challenge UI (SUDAH ADA)
InteractiveLesson.tsx ← orchestrator (SUDAH ADA)
index.ts           ← barrel exports (DIBUAT)
```

**Barrel exports** (`index.ts`) dibuat untuk:
- `math-primes-coprime`
- `math-real-numbers-line`
- `arithmetic-modular-clock`
- `math-euclid` (sudah ada)

**Verifikasi**: `pnpm typecheck` lolos, semua modul masih berfungsi.

### 0B. Fix Security Issues ✅ SELESAI

| Issue | File | Fix | Status |
|---|---|---|---|
| CORS `origin: "*"` | `backend/src/index.ts` | Whitelist via `CORS_ALLOWED_ORIGINS` env + localhost/vercel.dev fallback | ✅ |
| No input validation | `backend/src/routes/hints.ts` | Zod schema via `hintRequestSchema.safeParse()` | ✅ |
| No `topicSlug` sanitasi | `backend/src/routes/hints.ts` | Sanitasi via Zod `.min(1).max(100)` | ✅ |

### 0C. Wire xpReward dari Content ✅ SELESAI

Semua 4 `Challenge.tsx` yang sebelumnya hardcode `xpReward: 50` sekarang menggunakan `currentChallenge.xpReward || 50`:

| File | Line | Fix |
|---|---|---|
| `math-calculus-riemann/Challenge.tsx` | 50 | `currentChallenge.xpReward \|\| 50` |
| `math-euclid/Challenge.tsx` | 44 | `currentChallenge.xpReward \|\| 50` |
| `math-calculus-tangent/Challenge.tsx` | 44 | `currentChallenge.xpReward \|\| 50` |
| `math-trig-unit-circle/Challenge.tsx` | 43 | `currentChallenge.xpReward \|\| 50` |

### 0D. Reduce AccessibilityBar ✅ SELESAI

`AccessibilityBar.tsx` direduce dari 273 baris → 240 baris (di bawah batas 250 baris).

### 0E. Tambah Testing Infrastructure ✅ SELESAI (Bonus)

Tugas tambahan yang tidak ada di rencana awal:

- **React component tests**: `TopicModuleView.test.tsx`, `Dashboard.test.tsx`, `Challenge.test.tsx`
- **Axe-core accessibility tests**: `accessibility.test.tsx`
- **Test infrastructure**: `vitest.config.ts`, `src/test/setup.ts`, `src/test/test-utils.tsx`
- **Total tests**: 103 → 125 (+22 tests)

---

## FASE 1: Build Missing Prerequisites (Minggu 3-5)

> Tujuan: Lengkapi jalur belajar yang terputus di skill tree.

### 1A. Math — 4 Modul P0 (Sequential Build)

Dependency chain: `Aljabar Elementer → Fungsi & Grafik → Limit & Kekontinuan → (already exists: Kalkulus Diferensial)`

#### Modul 1: Aljabar Elementer
- **Slug**: `math-elementary-algebra`
- **Posisi di skill tree**: Node `math-elementary-algebra` (sudah didefinisikan)
- **Prerequisite**: `math-real-numbers-line` (sudah ada)
- **Unlock**: `math-functions-graphs`, `linear-algebra-determinant-2d`

**Struktur file**:
```
src/modules/math/math-elementary-algebra/
├── engine.ts          ← Persamaan linear, sistem persamaan, pertidaksamaan
├── content.ts         ← 3 levels × 3-4 challenges
├── Canvas.tsx         ← Timbangan logika interaktif, grafik garis
├── Controls.tsx       ← Input variabel, slider koefisien
├── Challenge.tsx      ← Challenge UI
├── InteractiveLesson.tsx
├── index.ts
└── example.mdx
```

**Content outline**:
- Level 1: Persamaan Linear (ax + b = c) — visualisasi timbangan
- Level 2: Sistem Persamaan 2 Variabel — irisan dua garis
- Level 3: Pertidaksamaan — region shading di grafik

#### Modul 2: Fungsi & Grafik
- **Slug**: `math-functions-graphs`
- **Prerequisite**: `math-elementary-algebra`
- **Unlock**: `math-limits-continuity`

**Content outline**:
- Level 1: Pemetaan Domain → Kodomain — mesin input/output visual
- Level 2: Transformasi Fungsi — translasi, dilatasi, refleksi
- Level 3: Jenis Fungsi — linear, kuadrat, eksponensial, logaritma

#### Modul 3: Limit & Kekontinuan
- **Slug**: `math-limits-continuity`
- **Prerequisite**: `math-functions-graphs`
- **Unlock**: `math-differential-calculus` (sudah ada)

**Content outline**:
- Level 1: Intuisi Limit — animasi x mendekati titik
- Level 2: Limit Tak Hingga — perilaku asymptotik
- Level 3: Kekontinuan — titik putus, removable discontinuity

### 1B. Science — 2 Modul P0 (Parallel Build)

#### Modul 4: Metode Ilmiah
- **Slug**: `sci-scientific-method`
- **Posisi**: Root node untuk semua Science tracks
- **Unlock**: `sci-units-measurements`, `sci-atomic-structure`, `sci-cells-organelles`

**Content outline**:
- Level 1: Siklus Ilmiah — observasi → hipotesis → eksperimen → kesimpulan
- Level 2: Variabel & Kontrol — independent, dependent, controlled
- Level 3: Desain Eksperimen — membuat eksperimen sederhana

#### Modul 5: Besaran & Satuan
- **Slug**: `sci-units-measurements`
- **Prerequisite**: `sci-scientific-method`
- **Unlock**: `sci-kinematics` (sudah ada: `physics-projectile-motion`)

**Content outline**:
- Level 1: Besaran Pokok SI — meter, kilogram, detik
- Level 2: Analisis Dimensi — dimensional analysis
- Level 3: Ketidakpastian Pengukuran — error propagation

### 1C. Math — 1 Modul Tambahan

#### Modul 6: Logika Proposisional
- **Slug**: `math-logic-prop`
- **Unlock**: `math-euclidean-geometry`

**Content outline**:
- Level 1: Tabel Kebenaran — operator AND, OR, NOT
- Level 2: Implikasi & Kontraposisi — if-then reasoning
- Level 3: Gerbang Logika — visualisasi circuit-style

---

## FASE 2: Enrich Existing Content (Minggu 6-8)

> Tujuan: Perbaiki kualitas konten 15 modul yang sudah ada.

### 2A. Tambah "Kenapa Ini Penting?" ke Setiap Level

Setiap modul existing perlu ditambahkan:
1. **Real-world hook** di awal level (provoke screen)
2. **Connection text** ke modul lain di reflect screen
3. **应用场景** di success message

**Template baru untuk setiap level**:
```typescript
{
  type: "provoke",
  provoke: {
    hookTitle: "Di mana kita melihat ini di dunia nyata?",
    hookText: "[Real-world application context]",
    // ...
  }
}
```

**Contoh enrichment**:

| Modul | Current Hook | Better Hook |
|---|---|---|
| Riemann Sum | "Bagaimana Mengukur Luas Lengkung?" | "Bagaimana GPS menghitung jarak tempuh? Setiap belokan adalah kurva — dan kurva itu diakumulasi dengan Riemann Sum." |
| Modular Clock | "Aritmetika Jam" | "Setiap kali kamu membuka website banking, transaksi kamu diamankan oleh aritmetika modular yang sama dengan jam dinding." |
| Electric Field | "Medan & Gaya Listrik" | "Layar sentuh iPhone kamu bekerja karena jari kamu mengubah medan listrik di setiap titik sentuh." |

### 2B. Rewrite Challenge Semua Modul

**Prinsip baru**: Challenge harus mengajak **pemahaman konseptual**, bukan trial-and-error.

**Pattern lama** (dangkal):
```
"Naikkan slider n hingga galat < 3%"
→ User geser slider, tebak angka, selesai
```

**Pattern baru** (konseptual):
```
Level 1: "Prediksi — jika n digandakan, galat berubah berapa kali?"
  → User harus reasoning tentang O(1/n) vs O(1/n²)
Level 2: "Buktikan — pilih metode yang paling efisien"
  → User harus compare midpoint vs left vs trapezoid
Level 3: "Terapkan — hitung luas lahan dengan data GPS"
  → Real-world application challenge
```

**Target per modul**: 3-5 challenges dengan progressive difficulty:
1. **Conceptual prediction** — tebak dulu, buktikan kemudian
2. **Exploration** — temukan pola sendiri
3. **Application** — apply ke situasi dunia nyata
4. **Edge case** — apa yang terjadi di batas-batas?
5. **Synthesis** — hubungkan dengan modul lain

### 2C. Tambah Variety Interaksi

| Interaksi | Modul yang Cocok | Implementasi |
|---|---|---|
| **Drag-and-drop** | Geometri, Algebra | Drag titik di koordinat |
| **Click-to-place** | Electric Field | Klik untuk letakkan muatan |
| **Drawing** | Trigonometry | Gambar kurva di unit circle |
| **Step-by-step** | Euclid | Masukkan langkah algoritma satu per satu |
| **Animation control** | Wave, Harmonic | Play/pause/step untuk observasi |

### 2D. Tambah Cross-Module Connections

Di setiap modul `content.ts`, tambahkan field `connections`:
```typescript
interface TopicLesson {
  // ... existing fields
  connections?: {
    prerequisites?: string[];  // slug modul yang harus diselesaikan dulu
    next?: string[];           // slug modul yang unlocked
    related?: string[];        // slug modul yang related tapi parallel
  };
}
```

---

## FASE 3: Complete MVP Math (Minggu 9-12)

> Tujuan: Lengkapi semua modul Math yang direncanakan di MVP.

### 3A. Math — 3 Modul Tambahan

#### Modul 7: Geometri Euclid
- **Slug**: `math-euclidean-geometry`
- **Prerequisite**: `math-logic-prop`
- **Unlock**: `math-trig-unit-circle` (sudah ada)

**Content outline**:
- Level 1: Aksioma & Postulat — visualisasi five postulates
- Level 2: Bukti Visual — Teorema Pythagoras dengan dissection
- Level 3: Konstruksi — kompas dan penggaris

#### Modul 8: Barisan & Deret
- **Slug**: `math-sequences-series`
- **Prerequisite**: `math-functions-graphs`

**Content outline**:
- Level 1: Barisan Aritmatika — pola lurus
- Level 2: Barisan Geometris — pertumbuhan eksponensial
- Level 3: Deret Tak Hingga — konvergensi, Riemann sum connection

#### Modul 9: Teori Himpunan & Relasi
- **Slug**: `math-set-theory`
- **Prerequisite**: `math-logic-prop`

**Content outline**:
- Level 1: Himpunan & Diagram Venn — visualisasi drag-and-drop
- Level 2: Operasi Himpunan — union, intersection, complement
- Level 3: Relasi & Fungsi — one-to-one, onto, bijection

### 3B. Science — 5 Modul Tambahan

| # | Modul | Slug | Prerequisite |
|---|---|---|---|
| 10 | Momentum & Tumbukan | `sci-momentum` | `sci-dynamics-newton` |
| 11 | Gerak Melingkar | `sci-circular-motion` | `sci-kinematics` |
| 12 | Struktur Atom | `sci-atomic-structure` | `sci-scientific-method` |
| 13 | Sel & Organel | `sci-cells-organelles` | `sci-scientific-method` |
| 14 | Optika Geometri | `sci-optics` | `sci-kinematics` |

---

## FASE 4: Complete MVP Science + Soft Skills (Minggu 13-16)

> Tujuan: Lengkapi semua modul MVP yang direncanakan.

### 4A. Science — 3 Modul Tambahan

| # | Modul | Slug |
|---|---|---|
| 15 | Ikatan Kimia | `sci-chemical-bonds` |
| 16 | Stoikiometri | `sci-stoichiometry` |
| 17 | DNA & Genetika | `sci-dna-genetics` |

### 4B. Soft Skills — 9 Modul (atau defer ke v1.1)

Soft skills modules punya pattern berbeda — tidak ada canvas/visualisasi. Mereka lebih ke interactive scenarios. Bisa didefer ke v1.1 jika timeline ketat.

---

## Timeline Summary

```
Minggu 1-2  │ FASE 0: Foundation Fix ✅ SELESAI
            │ ├── Split 4 monolithic modules (melebihi target 2 modul)
            │ ├── Fix CORS + input validation (Zod)
            │ ├── Wire xpReward di 4 Challenge.tsx
            │ ├── Reduce AccessibilityBar (273→240 baris)
            │ └── Tambah React component + a11y tests (+22 tests)
            │
Minggu 3-5  │ FASE 1: Build Missing Prerequisites
            │ ├── Math: Aljabar Elementer
            │ ├── Math: Fungsi & Grafik
            │ ├── Math: Limit & Kekontinuan
            │ ├── Math: Logika Proposisional
            │ ├── Science: Metode Ilmiah
            │ └── Science: Besaran & Satuan
            │
Minggu 6-8  │ FASE 2: Enrich Existing Content
            │ ├── Tambah real-world hooks ke 15 modul
            │ ├── Rewrite challenges (conceptual > trial-and-error)
            │ ├── Tambah variety interaksi
            │ └── Tambah cross-module connections
            │
Minggu 9-12 │ FASE 3: Complete MVP Math
            │ ├── Geometri Euclid
            │ ├── Barisan & Deret
            │ ├── Teori Himpunan & Relasi
            │ ├── Momentum & Tumbukan
            │ ├── Gerak Melingkar
            │ ├── Struktur Atom
            │ ├── Sel & Organel
            │ └── Optika Geometri
            │
Minggu 13-16│ FASE 4: Complete MVP Science + Soft Skills
            │ ├── Ikatan Kimia
            │ ├── Stoikiometri
            │ ├── DNA & Genetika
            │ └── 9 Soft Skills modules (opsional)
```

---

## Dependency Graph

```
                    ┌─────────────────────────────────────────────────────────┐
                    │                    MATH TRACKS                          │
                    │                                                         │
                    │  ┌──────────────┐                                      │
                    │  │ Bilangan Riil │ (exists)                            │
                    │  └──────┬───────┘                                      │
                    │         │                                              │
                    │    ┌────┴────┬──────────┐                              │
                    │    ▼         ▼          ▼                              │
                    │ ┌──────┐ ┌────────┐ ┌────────┐                        │
                    │ │Modulo│ │Aljabar │ │Logika  │ (exists)              │
                    │ │(exists)│ │Elementer│ │Proposi │                      │
                    │ └──┬───┘ └───┬────┘ └───┬────┘                        │
                    │    │         │           │                              │
                    │    ▼         ▼           ▼                              │
                    │ ┌──────┐ ┌────────┐ ┌────────┐                        │
                    │ │Prima │ │Fungsi &│ │Geometri│                        │
                    │ │(exists)│ │Grafik  │ │Euclid  │                      │
                    │ └──────┘ └───┬────┘ └────────┘                        │
                    │              │                                          │
                    │         ┌────┴────┬──────────┐                         │
                    │         ▼         ▼          ▼                         │
                    │   ┌─────────┐ ┌───────┐ ┌────────┐                   │
                    │   │  Limit  │ │Himpun.│ │Trig    │ (exists)          │
                    │   │& Kontin.│ │& Relasi│ │Satuan  │                  │
                    │   └────┬────┘ └───────┘ └────────┘                   │
                    │        │                                               │
                    │        ▼                                               │
                    │   ┌──────────┐  ┌──────────┐                          │
                    │   │Kalkulus  │  │Kalkulus  │ (exists)                │
                    │   │Diferensi.│  │Integral  │                          │
                    │   └──────────┘  └──────────┘                          │
                    │                                                         │
                    └─────────────────────────────────────────────────────────┘

                    ┌─────────────────────────────────────────────────────────┐
                    │                   SCIENCE TRACKS                       │
                    │                                                         │
                    │  ┌──────────────┐                                      │
                    │  │Metode Ilmiah │ (NEW)                                │
                    │  └──────┬───────┘                                      │
                    │    ┌────┼─────────────┐                                │
                    │    ▼    ▼             ▼                                │
                    │ ┌────┐ ┌──────┐ ┌────────┐                            │
                    │ │Sat.│ │Atom  │ │Sel &   │ (NEW)                     │
                    │ │SI  │ │(NEW) │ │Organel │                           │
                    │ └─┬──┘ └──────┘ └────────┘                            │
                    │   │                                                     │
                    │   ▼                                                     │
                    │ ┌──────────┐ (exists)                                  │
                    │ │Kinematika│────┬──────────┐                           │
                    │ └────┬─────┘   │          │                           │
                    │      ▼         ▼          ▼                           │
                    │ ┌────────┐ ┌────────┐ ┌────────┐                     │
                    │ │Dinamika│ │Gerb.   │ │Optika  │ (NEW)              │
                    │ │Newton  │ │Melingkar│ │        │                    │
                    │ └───┬────┘ └────────┘ └────────┘                     │
                    │     │                                                  │
                    │     ▼                                                  │
                    │ ┌────────┐                                             │
                    │ │Usaha & │ (exists)                                   │
                    │ │Energi  │────┬──────────┐                            │
                    │ └────────┘    │          │                            │
                    │               ▼          ▼                            │
                    │          ┌────────┐ ┌────────┐                       │
                    │          │Medan   │ │GHS &   │ (exists)             │
                    │          │Listrik │ │Gelombang│                     │
                    │          └───┬────┘ └────────┘                      │
                    │              │                                        │
                    │              ▼                                        │
                    │          ┌────────┐ (exists)                         │
                    │          │Rangkaian│                                  │
                    │          │DC      │                                   │
                    │          └────────┘                                   │
                    │                                                         │
                    └─────────────────────────────────────────────────────────┘
```

---

## Definition of Done per Modul

Setiap modul baru dianggap selesai jika:

1. ✅ `pnpm typecheck` lolos tanpa error
2. ✅ Semua file < 250 baris
3. ✅ Engine murni pure functions, zero side effects
4. ✅ Content punya minimal 3 levels dengan progressive difficulty
5. ✅ Setiap level punya real-world hook
6. ✅ Challenges menguji pemahaman konseptual, bukan trial-and-error
7. ✅ `xpReward` berasal dari `content.ts`, bukan hardcoded
8. ✅ Canvas interaktif dengan minimal 2 jenis input (slider + selection/click)
9. ✅ `example.mdx` ada dengan usage example
10. ✅ Registered di skill tree (`math-tree.ts` atau `science-tree.ts`)
11. ✅ `pnpm lint` lolos
12. ✅ Tidak ada `any` type

### Checklist Fase 0

- [x] Split `math-primes-coprime/module.ts` (1142 → 35 baris + Level files)
- [x] Split `math-real-numbers-line/module.ts` (969 → ~30 baris + Level files)
- [x] Split `arithmetic-modular-clock/module.ts` (1140 → 24 baris + Level files)
- [x] Split `math-euclid/module.ts` (1134 → 33 baris + Level files)
- [x] Barrel exports (`index.ts`) untuk semua modul yang di-split
- [x] CORS whitelist via env variable
- [x] Zod input validation di hints route
- [x] Wire `xpReward` di 4 Challenge.tsx files
- [x] Reduce AccessibilityBar (273 → 240 baris)
- [x] React component tests (TopicModuleView, Challenge, Dashboard)
- [x] Axe-core accessibility tests
- [x] Test infrastructure (vitest.config.ts, setup, test-utils)

---

## Effort Estimate

| Fase | Minggu | Modul Baru | Refactor | Status |
|---|---|---|---|---|
| 0: Foundation | 1-2 | 0 | 4 modules + security + xpReward + tests | ✅ SELESAI |
| 1: Prerequisites | 3-5 | 6 modules | 0 | Belum |
| 2: Enrichment | 6-8 | 0 | 15 modules content rewrite | Belum |
| 3: MVP Math | 9-12 | 8 modules | 0 | Belum |
| 4: MVP Science | 13-16 | 3 modules (+ 9 soft skills) | 0 | Belum |
| **TOTAL** | **16 minggu** | **17 modules** | **19 modules** | **Fase 0 done** |

> *Dengan 1 developer full-time, estimasi 4 bulan untuk MVP lengkap.*
> *Fase 0 selesai dalam 1 sesi (melebihi target 2 minggu — termasuk bonus testing infrastructure).*

---

## Changelog

### v2.0 (15 Sep 2026) — Fase 0 Complete

- **Split 4 monolithic modules** (melebihi target 2 modul):
  - `math-primes-coprime`: 1142 → 35 baris + `challenges.ts` + `Level1-6.ts`
  - `math-real-numbers-line`: 969 → ~30 baris + `Level1-5.ts`
  - `arithmetic-modular-clock`: 1140 → 24 baris + `Level1-6.ts`
  - `math-euclid`: 1134 → 33 baris + `Level1-6.ts`
- **Barrel exports** (`index.ts`) untuk semua modul yang di-split
- **Security fixes**: CORS whitelist + Zod input validation
- **xpReward wiring**: 4 Challenge.tsx files sekarang menggunakan `currentChallenge.xpReward || 50`
- **AccessibilityBar**: 273 → 240 baris (di bawah 250 limit)
- **Testing infrastructure**: vitest.config.ts, test setup, test-utils.tsx
- **React component tests**: TopicModuleView, Challenge, Dashboard
- **Axe-core accessibility tests**: 3 test cases
- **Total tests**: 103 → 125 (+22 tests)

### v1.0 (Original)

- Initial roadmap: 4 fase, 16 minggu, 17 modul baru
