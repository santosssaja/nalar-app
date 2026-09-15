# ⚙️ Nalar Backend (Hono + Drizzle ORM)

Backend API berbasis Node.js, Hono, dan Drizzle ORM untuk platform pembelajaran STEM **Nalar**, mendukung tema *"Pendidikan Berkualitas: menyediakan pendidikan yang inklusif, merata, dan berkualitas."*

Backend ini dirancang dengan prinsip:
1. **Serverless-First & Vercel Native**: Berjalan sebagai serverless functions di Vercel atau standalone Node.js server.
2. **Offline-First & Zero Gatekeeping**: Mendukung mode tamu tanpa login dan sinkronisasi dua arah (*merge-additive*).
3. **Token-Efficient AI**: Proxy LLM Gemini Flash hemat token dengan 4-tier pedagogical fallback.

---

## 📂 Struktur Direktori

```text
backend/
├── src/
│   ├── index.ts          — Hono master server entrypoint
│   ├── db/
│   │   ├── schema.ts     — Drizzle ORM PostgreSQL schema (users, progress, achievements, streaks, ai_hint_logs, sessions)
│   │   ├── connection.ts — Koneksi database PostgreSQL
│   │   ├── migrate.ts    — Runner migrasi skema Drizzle
│   │   └── storage.ts    — StorageAdapter dengan in-memory fallback
│   ├── routes/
│   │   ├── auth.ts       — Autentikasi akun, sesi tamu, login, register, me, logout
│   │   ├── progress.ts   — CRUD progress belajar & batch sync
│   │   ├── hints.ts      — Proxy petunjuk bertingkat AI Tutor Nai
│   │   ├── leaderboard.ts — Peringkat pembelajar teratas berdasarkan total XP & streak
│   │   └── sync.ts       — Sinkronisasi dua arah dengan resolusi konflik
│   └── middleware/
│       ├── auth.ts       — Validasi sesi & user context
│       └── rate-limit.ts — Pembatasan laju permintaan untuk API petunjuk AI
├── drizzle.config.ts     — Konfigurasi Drizzle Kit
├── package.json          — Dependensi Hono & Node.js
└── tsconfig.json         — Konfigurasi TypeScript
```

---

## 🚀 Panduan Menjalankan

### Mode Pengembangan (Standalone Port 8000)
```bash
cd backend
pnpm install
pnpm dev
```

### Build & Produksi
```bash
pnpm build
pnpm start
```
