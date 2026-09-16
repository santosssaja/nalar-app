# AGENTS.md

---

## 1. Project Overview & Mission

Platform web edukasi STEM (Sains dan Matematika) interaktif, visual, dan inklusif dengan tema **Pendidikan Berkualitas: menyediakan pendidikan yang inklusif, merata, dan berkualitas**. Fokus utama adalah menyederhanakan materi konsep rumit menjadi intuitif melalui simulasi kanvas langsung, dilengkapi fitur aksesibilitas ramah difabel (*low vision*, tunarungu, asistensi audio), serta tutor AI hemat token (*on-demand*).

---

## 2. Core Architectural Principles

* **Zero-Friction Onboarding**:
* Dilarang membuat *gatekeeping* berupa *login/register* wajib di awal alur pengguna.
* Seluruh data progres belajar, skor tantangan, lencana (*badges*), dan konfigurasi preferensi aksesibilitas wajib disimpan di `localStorage`.

* **Topic-Based Modular System**:

* Struktur kurikulum tidak dikotakkan secara kaku ke jenjang sekolah (SD/SMP/SMA), melainkan berbasis katalog topik mandiri (*standalone topics*).
* Tiap modul topik wajib memisahkan antara:

1. Data/konten statis (`content.ts` atau `.json`).
2. Logika kalkulasi/fisika/matematika murni (`engine.ts`).
3. Komponen visualisasi interaktif (`Canvas.tsx` / `Simulation.svelte`).
4. Antarmuka kuis/tantangan logika (`Challenge.tsx`).

* **Event-Driven & Token-Efficient AI**:
* Materi dasar berstatus *hardcoded* atau terkurasi statis, bukan hasil panggilan API dinamis di setiap *render*.
* Panggilan ke LLM (Gemini Flash / Groq) hanya terjadi saat ada aksi eksplisit pengguna:
* Klik tombol minta bantuan/petunjuk bertahap (*hint*).
* Pengguna gagal menjawab tantangan logika sebanyak 2 kali berturut-turut.

* Wajib menyediakan *mock service* lokal untuk pengujian tanpa menguras limit kuota API.

* **Accessibility-First (A11y)**:
* Dukungan tema gelap (*dark mode*) dan kontras tinggi untuk pengguna *low vision*.
* Pemanfaatan *native* Web Speech API (`window.speechSynthesis`) untuk membaca ringkasan materi atau perubahan nilai simulasi.
* Seluruh kontrol interaktif (tombol, *slider*, input nilai) wajib memiliki atribut ARIA lengkap dan navigasi *keyboard-accessible* (`Tab`, panah, `Enter`, `Space`).

* **Output Standard**:
* Write clean, modular, and self-documenting code.
* Avoid unnecessary commentary or boilerplate filler. Focus on functional correctness, modularity, and high rendering performance.
* When introducing a new interactive component, always provide an accompanying `.mdx` usage example.
* Pastikan struktur proyek tetap modular dan mudah ditelusuri

---

## 4. Coding Standards & Constraints

### A. Anti-AI Slop & Clean Code

* Dilarang membuat satu berkas komponen raksasa (*monolithic file* > 250 baris). Pecah menjadi sub-komponen terisolasi.
* Pisahkan rumus matematika murni ke fungsi independen (*pure functions*) agar mudah diuji secara unit (*unit-testable*).
* Hindari penggunaan *inline CSS* acak; gunakan utilitas Tailwind CSS secara konsisten.
* Jangan menambahkan pustaka (*dependencies*) eksternal pihak ketiga jika fitur tersebut dapat dibangun dengan JavaScript murni atau API bawaan peramban (misal: gunakan Web Speech API daripada pustaka audio berat).

### B. TypeScript & Type Safety

* `strict: true` pada konfigurasi TypeScript.
* Hindari penggunaan tipe `any`. Definisikan antarmuka eksplisit untuk semua *state* simulasi dan *payload* respons AI.
* Format skema modul wajib mematuhi kontrak berikut:

```typescript
export interface TopicLesson {
  id: string;
  slug: string;
  title: string;
  category: "math" | "science";
  summary: string;
  audioNarrationText: string;
  initialVariables: Record<string, number>;
  challenges: {
    question: string;
    targetCondition: (vars: Record<string, number>) => boolean;
    hintText: string;
  }[];
}

```

---

## 5. Agent Operational Protocol

Saat AI agent menerima instruksi penambahan atau modifikasi fitur, ikuti langkah berikut:

1. **Think & Outline**: Jelaskan berkas apa saja yang akan dibuat atau diubah sebelum melakukan eksekusi kode.
2. **Preserve Integrity**: Jangan merusak atau menghapus logika kanvas dan perhitungan matematika yang sudah berjalan stabil.
3. **Graceful Degradation**: Pastikan simulasi tetap berfungsi secara visual meskipun modul Web Speech API atau API AI asisten gagal dimuat (*offline/error safe*).
4. **Verification Step**: Periksa bahwa tidak ada *lint error*, *missing import*, atau inkonsistensi tipe data sebelum menyatakan tugas selesai.

---

## 6. Tech Stack & Library Roles

| Kebutuhan | Teknologi | Aturan Penggunaan |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) + TypeScript | Server Components secara default; pasang `'use client'` hanya pada kanvas interaktif dan pengontrol state. |
| **Styling** | Tailwind CSS | Dark mode native (`bg-neutral-950`, `text-neutral-100`). Jangan gunakan CSS inline kecuali untuk nilai dinamis yang dihitung saat runtime. |
| **Konten** | MDX (`@next/mdx`) | Artikel edukasi ditulis dalam format `.mdx` dengan komponen interaktif disematkan di dalam teks. |
| **Formula** | KaTeX | Render matematika inline (`$...$`) dan blok (`$$...$$`). Hindari MathJax karena alasan performa. |
| **Visual 2D** | Mafs | Utamakan untuk aljabar linear, plot fungsi kalkulus, dan sistem koordinat kartesius. |
| **Visual 3D** | Three.js / React Three Fiber (R3F) | Gunakan khusus untuk kalkulus multivariabel, ruang vektor 3D, dan topologi manifold. |
| **Diagram/Graph** | React Flow (@xyflow/react) | Khusus untuk visualisasi graf diskrit dan peta keterampilan (*Skill Tree*). |
| **Komputasi** | Math.js & Web Workers | Kalkulasi matriks berat atau simulasi numerik (>16 ms per frame) wajib didelegasikan ke *Web Worker*. |

---

## 7. Development Workflow & Commands

Agen wajib menjalankan verifikasi lokal sebelum menyatakan tugas selesai:

* Install dependensi: `pnpm install`
* Menjalankan dev server: `pnpm dev`
* Pengecekan tipe data TypeScript: `pnpm typecheck`
* Linting kode: `pnpm lint`
* Menjalankan unit test: `pnpm test`

---

## 8. Architectural Invariants & Guardrails (DOs & DON'Ts)

### Strict DOs:

1. **Isolasi State UI:** Pastikan perubahan nilai slider matematis hanya merender ulang kanvas target, bukan seluruh halaman MDX pembungkusnya.
2. **Pemisahan Logika & Render:** Pisahkan rumus/fungsi matematika murni ke dalam `lib/math-engine/`. Komponen React hanya bertugas menerima parameter dan menampilkan grafis.
3. **Pembersihan Resource (Cleanup):** Selalu bersihkan *event listeners*, animasi `requestAnimationFrame`, dan resource Three.js di dalam `useEffect` *cleanup function* untuk mencegah kebocoran memori.
4. **Pencegahan Error Matematis:** Berikan penanganan defensif terhadap nilai tak hingga ($\pm\infty$), pembagian dengan nol, dan nilai NaN (misal: saat memplot nilai diskontinu seperti $f(x) = \frac{1}{x}$).

### Strict DON'Ts:

1. **JANGAN** membuat objek baru (seperti `new Vector3()`) di dalam loop animasi atau hook `useFrame` Three.js (akan memicu *garbage collector freeze*).
2. **JANGAN** menyematkan CSS global atau styling eksternal ke dalam komponen modular; manfaatkan utilitas Tailwind yang sudah ada.

---

## 9. Definition of Done (DoD) untuk Tugas Agen

Sebuah fitur atau modul baru dianggap selesai jika memenuhi kriteria berikut:

1. Komponen terkompilasi bersih tanpa *warning* atau *type error* TypeScript (`pnpm typecheck` lolos).
2. Tampilan responsif pada resolusi desktop maupun layar seluler.
3. Rumus KaTeX dan visualisasi parameter sinkron (angka pada rumus berubah mengikuti posisi slider di kanvas).
4. Terdapat berkas `.mdx` contoh yang mendemonstrasikan cara pemanggilan komponen tersebut.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
