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

## Fase 1: Sistem Pembelajaran *(Sprint 4–6)*

### Sprint 4: Arsitektur Level & Langkah (Duolingo × Brilliant)
**Tujuan:** Struktur Topik → Level → Langkah yang bisa digunakan semua modul.

**Tugas:**
```
1. src/types/
   ├── topic.ts (update TopicLesson → TopicModule)
   └── level.ts (baru: Level, Step, StepType)

   interface TopicModule {
     id: string;
     slug: string;
     title: string;
     category: "math" | "physics" | "chemistry" | "biology" | "softskill";
     levels: Level[];
   }

   interface Level {
     index: number;
     title: string;
     tier: 1 | 2 | 3;  // ⭐ / ⭐⭐ / ⭐⭐⭐
     steps: Step[];
   }

   interface Step {
     type: "explanation" | "playground" | "challenge" | "validation";
     content: ExplanationContent | PlaygroundConfig | ChallengeConfig;
   }

2. src/components/learning/
   ├── LevelMap.tsx          — tampilan level path (Duolingo-style vertikal)
   ├── StepRenderer.tsx      — router: render step berdasarkan type
   ├── ExplanationStep.tsx   — Nai menjelaskan konsep (klik untuk lanjut)
   ├── PlaygroundStep.tsx    — wrapper playground tanpa penilaian
   ├── ChallengeStep.tsx     — soal + validasi + hint integration
   └── ValidationStep.tsx    — rumus KaTeX + rangkuman oleh Nai

3. src/app/topics/[slug]/page.tsx    — halaman topik (tampilkan LevelMap)
4. src/app/topics/[slug]/[level]/page.tsx — halaman level (render steps)

5. Verifikasi: navigasi Topik → Level → Step berfungsi end-to-end
```

---

### Sprint 5: Sistem 4-Hint Progressive
**Tujuan:** Nai memberikan hint bertingkat saat user menjawab salah.

**Tugas:**
```
1. src/lib/hints/
   ├── hint-engine.ts      — logika eskalasi hint 1→2→3→4
   ├── hint-static.ts      — template hint 1 & 2 (rule-based, 0 token)
   ├── hint-ai.ts          — panggilan LLM untuk hint 3 & 4
   ├── hint-mock.ts        — mock LLM untuk dev/demo
   └── types.ts            — HintRequest, HintResponse interfaces

2. src/components/learning/
   ├── HintPanel.tsx        — panel hint (Nai + teks + progres bar 1-4)
   └── CanvasAutoSolver.tsx — animasi kanvas bergerak ke jawaban (hint 4)

3. Integrasi dengan ChallengeStep.tsx:
   - Jawaban salah → increment hint level
   - Hint 1: Nai 🤗 "Belum tepat" (statis)
   - Hint 2: Nai 🤔 arahan ringan (statis, dari content.ts)
   - Hint 3: Nai 💡 penjelasan (LLM API / mock)
   - Hint 4: Nai 📖 jawaban + kanvas bergerak otomatis

4. src/lib/hints/hint-ai.ts:
   - Interface HintRequest (topicSlug, levelIndex, canvasSnapshot, dll)
   - POST ke /api/hints endpoint
   - Fallback ke mock jika API gagal (graceful degradation)

5. Verifikasi: test hint escalation, mock mode berfungsi tanpa API
```

---

### Sprint 6: Gamifikasi (XP, Badge, Streak, Dashboard)
**Tujuan:** Sistem progres lengkap yang memotivasi belajar.

**Tugas:**
```
1. src/lib/gamification/
   ├── xp-engine.ts        — kalkulasi XP per tier tantangan
   ├── badge-engine.ts     — deteksi & pemberian badge
   ├── streak-engine.ts    — penghitung streak harian
   └── types.ts            — UserProgress, Badge, StreakData

2. Update GamificationContext.tsx:
   - XP total, level (Explorer→Master), streak
   - Badge collection
   - Persist ke localStorage
   - Event: onChallengeComplete, onLevelComplete, onModuleComplete

3. src/components/gamification/
   ├── XPBar.tsx            — bar XP di topbar
   ├── LevelUpModal.tsx     — animasi level up + Nai selebrasi
   ├── BadgeCard.tsx        — kartu lencana
   ├── StreakCounter.tsx     — 🔥 counter di topbar
   ├── ConfettiCelebration.tsx — konfeti saat modul selesai
   └── Dashboard.tsx        — halaman dashboard progres personal

4. src/app/dashboard/page.tsx — halaman dashboard

5. Verifikasi: selesaikan tantangan → XP naik, badge muncul, streak terhitung
```

---

## Fase 2: Konten MVP *(Sprint 7–10)*

### Sprint 7–8: 6 Playground Matematika MVP
Bangun 6 playground math MVP satu per satu, setiap playground = 1 sub-sprint:

| # | Playground | Teknologi | Estimasi |
|---|-----------|-----------|----------|
| 1 | Jam Modular *(sudah ada, perlu upgrade ke level system)* | SVG | Kecil |
| 2 | Pengubinan Euclid | SVG | Sedang |
| 3 | Lingkaran Satuan Trigonometri | Mafs | Sedang |
| 4 | Garis Singgung Kalkulus | Mafs | Sedang |
| 5 | Jumlah Riemann | Mafs | Sedang |
| 6 | Transformasi Matriks 2D *(sudah ada, perlu upgrade)* | Mafs | Kecil |

**Per playground, tugas agent:**
```
Untuk setiap playground, buat:
1. src/modules/math/<slug>/
   ├── content.ts       — data TopicModule (levels, steps, challenges)
   ├── engine.ts         — pure math functions
   ├── Canvas.tsx        — visualisasi Mafs/SVG
   ├── Controls.tsx      — panel slider/input
   ├── Challenge.tsx     — tantangan per level
   ├── example.mdx       — contoh penggunaan
   └── index.ts          — barrel export
2. src/lib/math-engine/<topic>.ts — fungsi matematika murni + unit test
3. src/app/topics/<slug>/page.tsx — route halaman
4. Verifikasi: pnpm typecheck && pnpm test
```

---

### Sprint 9–10: 7 Playground Sains MVP
| # | Playground | Teknologi |
|---|-----------|-----------|
| 1 | Kanon Proyektil | Canvas 2D / Mafs |
| 2 | Bidang Miring Newton | Canvas 2D |
| 3 | Roller Coaster Energi | Canvas 2D |
| 4 | GHS (Bandul & Pegas) | Canvas 2D + Mafs |
| 5 | Simulator Gelombang | Canvas 2D |
| 6 | Medan Listrik | Canvas 2D |
| 7 | Pembangun Rangkaian DC | React Flow / Canvas 2D |

Sama seperti Sprint 7–8, tapi buat di `src/modules/science/<slug>/`.

---

## Fase 3: Backend & Sinkronisasi *(Sprint 11–13)*

### Sprint 11: Setup Backend (Hono + Drizzle + PostgreSQL)
```
Migrasi dari Python/FastAPI → Node.js:

1. backend/ (rewrite)
   ├── src/
   │   ├── index.ts          — Hono server entry
   │   ├── db/
   │   │   ├── schema.ts     — Drizzle schema (users, progress, achievements, streaks, ai_hint_logs)
   │   │   ├── migrate.ts    — migration runner
   │   │   └── connection.ts — PostgreSQL connection
   │   ├── routes/
   │   │   ├── auth.ts       — login/register (Lucia Auth)
   │   │   ├── progress.ts   — CRUD progress & sync
   │   │   ├── hints.ts      — proxy ke LLM API (hint 3 & 4)
   │   │   └── leaderboard.ts
   │   └── middleware/
   │       ├── auth.ts       — session validation
   │       └── rate-limit.ts — rate limiting hint API
   ├── drizzle.config.ts
   ├── package.json
   └── tsconfig.json
```

### Sprint 12: Auth & Akun Opsional
```
1. Frontend:
   - src/components/auth/LoginModal.tsx — magic link + Google/GitHub OAuth
   - src/components/auth/ProfileMenu.tsx — dropdown profil
   - Mode Tamu tetap berfungsi penuh tanpa login

2. Backend:
   - Lucia Auth integration
   - Session management (Redis)
   - Endpoint: POST /auth/login, POST /auth/logout, GET /auth/me
```

### Sprint 13: Sinkronisasi Offline-First
```
1. src/lib/sync/
   ├── sync-engine.ts     — background sync logic
   ├── conflict-resolver.ts — last-write-wins + merge-additive
   └── export-import.ts    — JSON export/import untuk tamu

2. Service Worker setup:
   - Cache materi statis (MDX, aset)
   - Background sync progress ke server
   - Offline indicator di UI

3. Migrasi Tamu → Akun:
   - Saat register, localStorage → server migration
```

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
