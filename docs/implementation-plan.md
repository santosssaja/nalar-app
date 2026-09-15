# Nalar: Rencana Implementasi Agentic Engineering

> Dokumen ini mendefinisikan **strategi eksekusi** untuk membangun platform Nalar dari docs → kode dengan bantuan AI agent, dipecah menjadi sprint-sprint yang dapat di-trigger satu per satu.

---

## Peta Kondisi Saat Ini

### ✅ Sudah Ada
- Next.js 16 + TypeScript + Tailwind CSS 4 + Mafs + KaTeX + React Flow
- Design System lengkap: token tema (Dark/Light/High-Contrast), typography, scaling, animasi
- Layout Shell responsif: `PageShell`, `TopBar`, `Sidebar`, `MobileNav`
- Komponen UI modular aksesibel: `Button`, `Slider`, `Card`, `Badge`, `ProgressBar`, `Tooltip`
- Maskot Nai (panda merah): SVG animasi 11 ekspresi, `NaiContext`, `NaiSpeechBubble`, balon suara
- Skill Tree graf navigasi interaktif (`@xyflow/react`): `SkillTree`, `TopicNode`, `PrereqEdge`, `SkillTreeFilters`, `SkillTreeMinimap`, `TopicDetailModal`, route `/explore`
- Data kurikulum lengkap: Matematika, Sains, Soft Skills (`src/lib/curriculum/`)
- 2 modul math aktif: `arithmetic-modular-clock`, `linear-algebra-determinant-2d`
- Context: `AccessibilityContext`, `GamificationContext`, `NaiContext`
- Lib: `math-engine/`, `audio/`, `storage.ts`, `curriculum/`
- Gamifikasi: Streak counter, XP counter, Badge collection modal

### ❌ Belum Ada
- Struktur level Duolingo-style (Topik → Level → Langkah)
- Sistem 4-hint progressive AI tutor
- Dashboard progres komprehensif
- Backend server (PostgreSQL, auth, sync)
- 25+ playground lainnya
- Modul sains & soft skills interaktif
- PWA / offline support

---

## Prinsip Agentic Engineering

```
┌──────────────────────────────────────────────────────────────┐
│                   SIKLUS AGENTIC                             │
│                                                              │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│   │ PLAN     │───►│ EXECUTE  │───►│ VERIFY   │──┐           │
│   │          │    │          │    │          │  │           │
│   │ Pecah    │    │ Agent    │    │ Typecheck│  │           │
│   │ tugas ke │    │ menulis  │    │ Lint     │  │           │
│   │ unit     │    │ kode     │    │ Test     │  │           │
│   │ terkecil │    │ modular  │    │ Visual   │  │           │
│   └──────────┘    └──────────┘    └──────────┘  │           │
│        ▲                                         │           │
│        └─────────────── ITERATE ─────────────────┘           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Aturan kunci:**
1. **Satu sprint = satu perintah `/goal`** — setiap sprint dapat dijalankan sebagai satu instruksi panjang
2. **Vertical slice** — setiap sprint menghasilkan fitur yang bisa dilihat/dipakai, bukan fondasi tak terlihat
3. **Verifikasi sebelum lanjut** — `pnpm typecheck && pnpm lint && pnpm test` di akhir setiap sprint
4. **Preserve integrity** — jangan merusak modul yang sudah berjalan
5. **Max 250 baris/file** — sesuai AGENTS.md, pecah jika lebih

---

## Fase 0: Fondasi Arsitektur *(Sprint 1–3)* ✅ **SELESAI**

### Sprint 1: Design System & Layout Shell ✅ *Selesai*
**Tujuan:** Kerangka visual platform yang konsisten — theme, typography, layout responsif.

**Tugas:**
```
1. src/app/globals.css [x]
   - Design token: warna, tipografi, spacing, radius
   - Dark/Light/High-contrast theme variables
   - Anti-FOUC script di layout.tsx <head>

2. src/components/layout/ [x]
   ├── Sidebar.tsx        — navigasi samping (Skill Tree mini)
   ├── TopBar.tsx         — header: logo, tema, profil, streak counter
   ├── MobileNav.tsx      — bottom navigation mobile
   └── PageShell.tsx      — wrapper layout responsif

3. src/components/ui/ [x]
   ├── Button.tsx         — varian: primary, secondary, ghost, danger, outline
   ├── Slider.tsx         — slider aksesibel (aria-label, keyboard)
   ├── Card.tsx           — kartu modul/topik
   ├── Badge.tsx          — tampilan lencana
   ├── ProgressBar.tsx    — bar progres animasi
   └── Tooltip.tsx        — tooltip aksesibel

4. Verifikasi: pnpm typecheck && pnpm lint [x] (Lolos bersih)
5. Screenshot / verifikasi dev server responsif [x]
```

---

### Sprint 2: Nai — Maskot Panda Merah ✅ *Selesai*
**Tujuan:** Komponen Nai yang hadir di seluruh halaman dengan ekspresi dinamis.

**Tugas:**
```
1. src/components/nai/ [x]
   ├── Nai.tsx             — komponen utama maskot (floating & movable)
   ├── NaiExpressions.tsx  — 11 ekspresi (SVG/CSS animasi)
   ├── NaiSpeechBubble.tsx — balon dialog dengan teks & audio
   ├── NaiContext.tsx      — context: ekspresi aktif, pesan, visibilitas
   └── nai-sprites.ts      — data sprite/pose per ekspresi

2. 11 Ekspresi Lengkap [x]:
   - happy, thinking, celebrating, encouraging
   - hinting, teaching, sleeping, proud
   - curious, neutral, highContrast

3. Integrasi [x]:
   - Tambahkan NaiProvider di layout.tsx
   - Nai muncul di sudut kanan bawah (floating)
   - Tombol minimize/hide & pengaturan
   - Teks alternatif untuk screen reader
   - Animasi preferensi reduced-motion & kontras tinggi

4. Verifikasi: pnpm typecheck & lint [x] (Lolos bersih)
```

---

### Sprint 3: Skill Tree & Halaman Peta Kurikulum ✅ *Selesai*
**Tujuan:** Skill Tree interaktif sebagai navigasi utama menggunakan React Flow.

**Tugas:**
```
1. src/lib/curriculum/ [x]
   ├── math-tree.ts        — data node & edge dari roadmap-math.md
   ├── science-tree.ts     — data node & edge dari roadmap-science.md
   ├── softskills-tree.ts  — data node & edge dari roadmap-softskills.md
   └── types.ts            — TopicNode, PrerequisiteEdge interfaces

2. src/components/skill-tree/ [x]
   ├── SkillTree.tsx       — wrapper React Flow
   ├── TopicNode.tsx       — custom node (status: locked/active/done)
   ├── PrereqEdge.tsx      — custom edge (animasi unlock)
   ├── SkillTreeFilters.tsx — filter: domain, fase, jenjang
   ├── SkillTreeMinimap.tsx — minimap navigasi
   └── TopicDetailModal.tsx — modal detail topik & prasyarat

3. src/app/explore/page.tsx [x] — halaman Skill Tree fullscreen

4. Fitur [x]:
   - Node berwarna per status (locked=abu, active=biru, done=hijau)
   - Klik node → modal detail & navigasi ke topik
   - Filter domain: Math / Fisika / Kimia / Bio / Soft Skills
   - Filter jenjang: Explorer / Navigator / Scholar
   - Zoom & pan, minimap
   - Nai: saran kontekstual awal eksplorasi

5. Verifikasi: pnpm typecheck && pnpm lint [x] (Lolos bersih)
```

**Perintah agent:**
> "Buat Skill Tree interaktif menggunakan @xyflow/react sesuai docs/roadmap-math.md Prerequisite Graph dan docs/idea.md §10. Data node/edge dari ketiga roadmap. Custom node dengan 3 status (locked/active/done), filter domain & jenjang, minimap. Halaman di /explore."

---

## Fase 1: Sistem Pembelajaran *(Sprint 4–6)* — ✅ Selesai

### Sprint 4: Arsitektur Level & Langkah (Duolingo × Brilliant) — ✅ Selesai
**Tujuan:** Struktur Topik → Level → Langkah yang bisa digunakan semua modul.

**Implementasi:**
- `src/types/level.ts`: Skema `Level`, `Step`, `StepType`, `ExplanationContent`, `PlaygroundConfig`, `ChallengeConfig`, `ValidationConfig`.
- `src/types/topic.ts`: Definisi `TopicModule` dengan dukungan multi-level.
- `src/components/learning/LevelMap.tsx`: Jalur visual stepping-stone Duolingo-style vertikal dengan status bintang tier, konektor, status aktif/terkunci.
- `src/components/learning/StepRenderer.tsx`: Orkestrator langkah dinamis dengan indikator progress bar dan navigasi bertahap.
- `src/components/learning/ExplanationStep.tsx`: Presentasi konsep oleh Nai dengan KaTeX dan Web Speech API.
- `src/components/learning/PlaygroundStep.tsx`: Eksplorasi kanvas interaktif tanpa penilaian.
- `src/components/learning/ChallengeStep.tsx`: Tantangan logika dengan evaluasi targetCondition, pelacak attempt, integrasi 4-hint, dan reward XP.
- `src/components/learning/ValidationStep.tsx`: Rangkuman pemahaman, KaTeX takeaway, selebrasi kembang api, dan unlock lencana.
- `src/components/learning/TopicModuleView.tsx` & `LevelPlayerClient.tsx`: Dual-mode (Jalur Level Duolingo vs Sandbox Penuh) serta penanganan serialisasi RSC.
- Routes: `/topics/[slug]` dan dynamic player `/topics/[slug]/[level]`.
- Modul Duolingo-style 3 tingkat: `arithmetic-modular-clock` dan `linear-algebra-determinant-2d`.

---

### Sprint 5: Sistem 4-Hint Progressive — ✅ Selesai
**Tujuan:** Nai memberikan hint bertingkat saat user menjawab salah atau meminta bantuan.

**Implementasi:**
- `src/lib/hints/types.ts`: Antarmuka `HintRequest` dan `HintResponse`.
- `src/lib/hints/hint-static.ts`: Generator Hint 1 (motivasi) & Hint 2 (pointer terarah) rule-based 0 token.
- `src/lib/hints/hint-mock.ts`: Fallback offline deterministik untuk Hint 3 & 4.
- `src/lib/hints/hint-ai.ts`: Klien fetch `/api/hints` dengan batas waktu 6s & graceful fallback ke mock lokal.
- `src/lib/hints/hint-engine.ts`: Dispatcher eskalasi bertingkat 1→2→3→4.
- `src/app/api/hints/route.ts`: API endpoint dengan dukungan Gemini Flash dan fallback lokal.
- `src/components/learning/HintPanel.tsx`: Panel UI petunjuk dengan indikator 4-dot progress, avatar ekspresi Nai, dan voice reader.
- `src/components/learning/CanvasAutoSolver.tsx`: Animasi interpolasi parameter kanvas halus via `requestAnimationFrame` untuk Hint 4.

---

### Sprint 6: Gamifikasi (XP, Badge, Streak, Dashboard) — ✅ Selesai
**Tujuan:** Sistem progres lengkap yang memotivasi belajar secara berkelanjutan.

**Implementasi:**
- `src/lib/gamification/xp-engine.ts`: Kalkulasi reward XP per tier (30, 60, 100 XP), rank title (Explorer, Navigator, Scholar, Master), dan deteksi level-up.
- `src/lib/gamification/badge-engine.ts`: Sistem evaluasi lencana (`first-step`, `modular-master`, `matrix-master`, `streak-3`, `polymath`).
- `src/lib/gamification/streak-engine.ts`: Penghitung streak harian dengan pelacakan tanggal aktivitas.
- `src/context/GamificationContext.tsx`: State manager terintegrasi `localStorage` dengan trigger event dan modal level-up.
- `src/components/gamification/XPBar.tsx`: Bar progres XP dan tingkat penjelajah.
- `src/components/gamification/StreakCounter.tsx`: Badge streak 🔥 interaktif.
- `src/components/gamification/BadgeCard.tsx`: Kartu lencana dengan status terkunci/terbuka.
- `src/components/gamification/LevelUpModal.tsx`: Modal pop-up animasi level-up dengan ekspresi meriah Nai.
- `src/components/gamification/ConfettiCelebration.tsx`: Konfeti kembang api/meriam saat level dan modul tuntas.
- `src/components/gamification/Dashboard.tsx` & `/dashboard`: Halaman profil progres personal dengan grid aktivitas harian dan ringkasan statistik belajar.
- Unit testing: 29 unit tests lulus di `number-theory`, `linear-algebra`, `hint-engine`, dan `gamification`.

---

## Fase 2: Konten MVP *(Sprint 7–10)*

### Sprint 7–8: 6 Playground Matematika MVP — ✅ Selesai
Semua 6 playground matematika MVP telah dibangun lengkap dengan sistem 3-level Duolingo-style, mode Sandbox, formula KaTeX reaktif, kontrol parameter dinamis, dan unit test matematika murni:

| # | Playground | Slug | Teknologi | Status |
|---|-----------|------|-----------|--------|
| 1 | Jam Modular | `arithmetic-modular-clock` | SVG | ✅ Selesai (3 level + sandbox) |
| 2 | Pengubinan Euclid | `math-euclid` | SVG | ✅ Selesai (3 level + sandbox) |
| 3 | Lingkaran Satuan Trigonometri | `math-trig-unit-circle` | Mafs | ✅ Selesai (3 level + sandbox) |
| 4 | Garis Singgung Kalkulus | `math-calculus-tangent` | Mafs | ✅ Selesai (3 level + sandbox) |
| 5 | Jumlah Riemann | `math-calculus-riemann` | Mafs | ✅ Selesai (3 level + sandbox) |
| 6 | Transformasi Matriks 2D | `linear-algebra-determinant-2d` | Mafs | ✅ Selesai (3 level + sandbox) |

**Implementasi Per Playground:**
- `src/lib/math-engine/`: Pure mathematical engine functions + unit tests (48 unit test suite lulus 100%).
- `src/modules/math/<slug>/`:
  - `content.ts`: Metadata pelajaran & skema tantangan logika.
  - `engine.ts`: Re-export & state definitions.
  - `Canvas.tsx`: Visualisasi interaktif kanvas 2D (Mafs / SVG) dengan atribut aksesibilitas ARIA.
  - `Controls.tsx`: Slider parameter dinamis, preset cepat, dan animasi halus.
  - `KaTeXFormula.tsx`: Formula matematika sinkron reaktif.
  - `Challenge.tsx`: Tantangan logika gamifikasi dengan sistem petunjuk Nai & reward XP.
  - `InteractiveLesson.tsx`: Dual-column sandbox layout view.
  - `module.ts`: Struktur 3-Level Duolingo-style (Explanation, Playground, Challenge, Validation).
  - `example.mdx` & `index.ts`: Dokumentasi MDX & barrel exports.
- `src/modules/registry.ts`: Pendaftaran modul dan alias rute navigasi.
- `src/app/topics/<slug>/page.tsx`: Halaman rute topik Next.js App Router dengan dukungan dual-mode.
- `src/lib/curriculum/math-tree.ts`: Status unlocked dan rute aktif di Skill Tree.

---

### Sprint 9–10: 7 Playground Sains MVP — ✅ Selesai
Semua 7 playground sains MVP telah dibangun lengkap dengan sistem 3-level bertingkat, mode Sandbox, formula KaTeX reaktif, kontrol parameter dinamis, dan unit test fisika murni:

| # | Playground | Slug | Teknologi | Status |
|---|-----------|------|-----------|--------|
| 1 | Kanon Proyektil | `physics-projectile-motion` | Canvas 2D / Kinematika | ✅ Selesai (3 level + sandbox) |
| 2 | Bidang Miring Newton | `physics-newton-incline` | Canvas 2D / Dinamika | ✅ Selesai (3 level + sandbox) |
| 3 | Roller Coaster Energi | `physics-roller-coaster` | Canvas 2D / Usaha & Energi | ✅ Selesai (3 level + sandbox) |
| 4 | GHS (Bandul & Pegas) | `physics-harmonic-oscillator` | Canvas 2D / Osilasi Harmonik | ✅ Selesai (3 level + sandbox) |
| 5 | Simulator Gelombang | `physics-wave-simulator` | Canvas 2D / Gelombang & Interferensi | ✅ Selesai (3 level + sandbox) |
| 6 | Medan Listrik | `physics-electric-field` | Canvas 2D / Hukum Coulomb & Vektor E | ✅ Selesai (3 level + sandbox) |
| 7 | Pembangun Rangkaian DC | `physics-dc-circuits` | Canvas 2D / Hukum Ohm & Kirchhoff | ✅ Selesai (3 level + sandbox) |

**Implementasi Per Playground Sains:**
- `src/lib/science-engine/`: Pure physics engine functions + unit tests (28 unit test suite sains lulus 100%, total 76 unit test).
  - `projectile.ts`: $x(t) = v_0 \cos\theta \cdot t$, $y(t) = v_0 \sin\theta \cdot t - \frac{1}{2}gt^2$, jangkauan & waktu terbang.
  - `newton-incline.ts`: $a = g(\sin\theta - \mu_k \cos\theta)$, gaya normal $N = mg\cos\theta$, batas gesek statis.
  - `roller-coaster.ts`: Kekekalan $E_m = E_k + E_p$, kelajuan loop minimum $v_{\text{top}} = \sqrt{gr}$, gaya sentripetal normal.
  - `harmonic-oscillator.ts`: Bandul $T = 2\pi\sqrt{L/g}$ dan pegas $T = 2\pi\sqrt{m/k}$, osilasi redaman $\gamma$.
  - `wave-simulator.ts`: Cepat rambat $v = \lambda f$, superposisi interferensi konstruktif & destruktif.
  - `electric-field.ts`: Hukum Coulomb $F = k\frac{|q_1 q_2|}{r^2}$, vektor kuat medan $\vec{E}$, dipol listrik, dan gaya pada muatan uji.
  - `dc-circuits.ts`: Hukum Ohm $V = IR$, hambatan seri/paralel/campuran, percabangan Kirchhoff, dan disipasi daya Joule $P = VI = I^2R$.
- `src/modules/science/<slug>/`:
  - `content.ts`: Metadata pelajaran & skema tantangan logika (3 misi per topik).
  - `engine.ts`: Re-export & penentuan interface state simulasi.
  - `Canvas.tsx`: Visualisasi interaktif kanvas 2D dengan atribut aksesibilitas ARIA & keyboard/pointer interaction.
  - `Controls.tsx`: Slider parameter dinamis, preset cepat, dan reset konfigurasi.
  - `KaTeXFormula.tsx`: Formula fisika sinkron reaktif yang berubah otomatis mengikuti slider.
  - `Challenge.tsx`: Tantangan logika gamifikasi dengan sistem petunjuk AI Tutor Nai & reward XP.
  - `InteractiveLesson.tsx`: Dual-column sandbox layout view dengan audio narasi Web Speech API.
  - `module.ts`: Struktur 3-Level bertingkat (Explanation, Playground, Challenge, Validation).
  - `example.mdx` & `index.ts`: Dokumentasi MDX & barrel exports.
- `src/modules/registry.ts`: Pendaftaran modul dan alias rute navigasi.
- `src/app/topics/<slug>/page.tsx`: Halaman rute topik Next.js App Router dengan dukungan dual-mode.
- `src/lib/curriculum/science-tree.ts`: Status unlocked dan rute aktif di Skill Tree & katalog `/explore`.

---

## Fase 3: Backend & Sinkronisasi *(Sprint 11–13)* — ✅ Selesai

### Sprint 11: Setup Backend (Hono + Drizzle + Vercel Serverless) — ✅ Selesai
Migrasi dari Python/FastAPI → Node.js Hono Serverless Architecture yang berjalan terpadu di Vercel:

1. **Hono Serverless & Drizzle Schema:**
   - `src/lib/server/db/schema.ts`: Drizzle ORM PostgreSQL schema (`users`, `progress`, `achievements`, `streaks`, `ai_hint_logs`, `sessions`).
   - `src/lib/server/db/storage.ts`: `StorageAdapter` interface dengan `MemoryStorageAdapter` seeded fallback + PostgreSQL connectivity, menjamin aplikasi tidak pernah crash di Vercel preview atau local dev tanpa database terpasang.
   - `src/lib/server/api/app.ts`: Master Hono application dengan CORS, router mounting, error handler, dan endpoint health check.
   - `src/lib/server/api/routes/`:
     - `auth.ts`: Guest session, register, login, me, dan logout.
     - `progress.ts`: GET progress, POST save level, batch sync.
     - `leaderboard.ts`: Leaderboard pembelajar teratas berdasarkan total XP dan streak.
     - `hints.ts`: Proxy AI tutor Gemini Flash dengan fallback pedagogis 4-tier.
     - `sync.ts`: Bidirectional synchronization dengan merge-additive conflict resolution.
   - `src/app/api/[[...route]]/route.ts`: Next.js App Router catch-all handler via `hono/vercel` untuk deployment serverless native di Vercel.
   - `backend/`: Node.js Hono service (`package.json`, `tsconfig.json`, `src/index.ts`) untuk kompatibilitas multi-service Vercel dan standalone runner port 8000.
   - `vercel.json`: Konfigurasi Vercel service Next.js dan backward-compatible API rewrite `/api/backend/:path*` -> `/api/:path*`.

---

### Sprint 12: Auth & Akun Opsional — ✅ Selesai
1. **Frontend Auth Layer:**
   - `src/context/AuthContext.tsx`: State manager autentikasi dengan dukungan penuh Mode Tamu (*Zero Gatekeeping*), login, register, dan migrasi otomatis progres lokal saat pembuatan akun baru.
   - `src/components/auth/LoginModal.tsx`: Modal interaktif ramah aksesibilitas dengan tab Masuk, Daftar Akun Baru, dan info Mode Tamu.
   - `src/components/auth/ProfileMenu.tsx`: Menu profil di header dengan indikator status sinkronisasi *real-time*, tombol sinkronisasi manual, ekspor/impor cadangan, dan aksi autentikasi.
   - `src/components/layout/TopBar.tsx`: Integrasi `ProfileMenu` di samping pengatur aksesibilitas.
   - `src/app/layout.tsx`: Penyematan `AuthProvider` dan `LoginModal` ke seluruh hierarki aplikasi.

---

### Sprint 13: Sinkronisasi Offline-First — ✅ Selesai
1. **Sync & Resilience Engine:**
   - `src/lib/sync/conflict-resolver.ts`: Logika *Last-write-wins + merge-additive* (XP selalu mengambil nilai maksimum monotonik, level dan lencana digabungkan tanpa kehilangan data).
   - `src/lib/sync/sync-engine.ts`: Background synchronization engine dengan detektor koneksi `online`/`offline` dan pub/sub status (`idle`, `syncing`, `synced`, `offline`, `error`).
   - `src/lib/sync/export-import.ts`: Fitur pencadangan dan pemulihan data JSON untuk pembelajar tamu (`nalar-backup-YYYY-MM-DD.json`).
   - Unit tests: 20 test files lulus 100% (107 unit tests), termasuk pengujian endpoint Hono, conflict resolver, dan validasi berkas cadangan.
   - Verifikasi Vercel: `pnpm build` menghasilkan static prerender + serverless API routes yang siap deploy tanpa error symlink.

---

## Fase 4: Polish & Ekspansi *(Sprint 14+)*

### Sprint 14: PWA & Mobile Optimization
### Sprint 15: Playground v1.1 (7 playground baru)
### Sprint 16: Modul Sains v1.1 (17 modul konten)
### Sprint 17: Soft Skills v1.1 (9 modul pertama)
### Sprint 18: Leaderboard & Profil Publik
### Sprint 19+: v2.0 content, advanced playgrounds

---

## Cara Menggunakan Rencana Ini

### Opsi 1: Sprint-by-Sprint Manual
Salin deskripsi sprint ke chat sebagai perintah:
```
"Kerjakan Sprint 1: Design System & Layout Shell.
Ikuti spesifikasi di docs/implementation-plan.md Sprint 1.
Pastikan pnpm typecheck && pnpm lint lolos."
```

### Opsi 2: `/goal` untuk Sprint Besar
Untuk sprint yang lebih besar (misal Sprint 7–8: 6 playground):
```
/goal Bangun 6 playground matematika MVP sesuai docs/playgrounds.md (#1-#6).
Setiap playground buat modul lengkap di src/modules/math/<slug>/
dengan content.ts, engine.ts, Canvas.tsx, Controls.tsx, Challenge.tsx.
Pastikan setiap playground punya 3 level dan setiap level punya 4 langkah.
Verifikasi: pnpm typecheck && pnpm test per playground.
```

### Opsi 3: Delegasi ke Sub-Agent
Untuk paralelisme, pecah pekerjaan:
- Agent A: mengerjakan playground (visual, kanvas)
- Agent B: mengerjakan backend (API, database)
- Agent utama: integrasi dan verifikasi

---

## Urutan Prioritas Eksekusi

```
Sprint  1 ████████████░░░░░░░░  Design System & Layout
Sprint  2 ████████░░░░░░░░░░░░  Maskot Nai
Sprint  3 ████████████░░░░░░░░  Skill Tree
Sprint  4 ████████████████░░░░  Level & Step System
Sprint  5 ████████████░░░░░░░░  4-Hint System
Sprint  6 ████████████░░░░░░░░  Gamifikasi
Sprint 7-8 ████████████████████  6 Playground Math MVP
Sprint 9-10 ████████████████████  7 Playground Sains MVP
Sprint 11 ████████████████░░░░  Backend Setup
Sprint 12 ████████░░░░░░░░░░░░  Auth
Sprint 13 ████████████░░░░░░░░  Sync

── MVP Launch Line ──────────────────────────

Sprint 14+ ░░░░░░░░░░░░░░░░░░░░  v1.1 & v2.0
```

> [!TIP]
> **Mulai dari Sprint 1.** Setelah selesai, lanjut ke Sprint 2, dan seterusnya. Setiap sprint dirancang agar hasilnya langsung terlihat dan bisa dites. Jangan loncat sprint kecuali dependensinya sudah terpenuhi.

---

## Estimasi Cakupan MVP

| Komponen | Estimasi File | Estimasi Baris Kode |
| :--- | :---: | :---: |
| Design System & Layout | ~15 file | ~2,000 |
| Nai (maskot) | ~6 file | ~1,200 |
| Skill Tree | ~8 file | ~1,500 |
| Level/Step System | ~10 file | ~2,500 |
| 4-Hint System | ~8 file | ~1,500 |
| Gamifikasi | ~10 file | ~2,000 |
| 13 Playground (Math+Sains) | ~100 file | ~15,000 |
| Backend (Hono+DB+Auth) | ~15 file | ~2,500 |
| Sync & PWA | ~5 file | ~800 |
| **Total MVP** | **~177 file** | **~29,000** |
