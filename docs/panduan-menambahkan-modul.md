# 🛠️ Panduan Lengkap: Cara Menambahkan Modul Baru di Nalar

Dokumen ini adalah panduan referensi teknis kanonikal bagi pengembang untuk membangun, menguji, dan mendaftarkan modul pembelajaran STEM interaktif (*standalone topic*) baru di platform **Nalar**. Panduan ini sepenuhnya selaras dengan spesifikasi modern pada [`docs/new-module.md`](new-module.md) dan mengadopsi arsitektur 11 Fase Pedagogi, 3 Mode Belajar, simulasi interaktif, serta render KaTeX reaktif.

---

## 📑 Daftar Isi
- [🛠️ Panduan Lengkap: Cara Menambahkan Modul Baru di Nalar](#️-panduan-lengkap-cara-menambahkan-modul-baru-di-nalar)
  - [📑 Daftar Isi](#-daftar-isi)
  - [1. Filosofi \& Prinsip Inti Pembelajaran](#1-filosofi--prinsip-inti-pembelajaran)
    - [Alur Pembelajaran Utama](#alur-pembelajaran-utama)
    - [4 Pilar Desain Nalar:](#4-pilar-desain-nalar)
  - [2. Arsitektur \& Struktur Berkas Modul](#2-arsitektur--struktur-berkas-modul)
  - [3. Alur Langkah Demi Langkah Pembuatan Modul (7 Tahap)](#3-alur-langkah-demi-langkah-pembuatan-modul-7-tahap)
    - [Tahap 1: Mesin Komputasi Murni \& Unit Test](#tahap-1-mesin-komputasi-murni--unit-test)
      - [1. Berkas Logika: `src/lib/math-engine/<topic>.ts` (atau `science-engine`)](#1-berkas-logika-srclibmath-enginetopicts-atau-science-engine)
      - [2. Berkas Unit Test: `src/lib/math-engine/<topic>.test.ts`](#2-berkas-unit-test-srclibmath-enginetopictestts)
    - [Tahap 2: Kanvas Visual Interaktif \& Panel Kontrol Slider](#tahap-2-kanvas-visual-interaktif--panel-kontrol-slider)
      - [1. Berkas State: `engine.ts`](#1-berkas-state-enginets)
      - [2. Berkas Kanvas: `Canvas.tsx`](#2-berkas-kanvas-canvastsx)
      - [3. Berkas Panel Kontrol: `Controls.tsx`](#3-berkas-panel-kontrol-controlstsx)
    - [Tahap 3: Integrasi Kanvas ke Playground Runner (`ModulePlaygroundEmbed.tsx`)](#tahap-3-integrasi-kanvas-ke-playground-runner-moduleplaygroundembedtsx)
    - [Tahap 4: Penyusunan Kontrak Pedagogi 11 Fase (`pedagogy.ts`)](#tahap-4-penyusunan-kontrak-pedagogi-11-fase-pedagogyts)
    - [Tahap 5: Pendaftaran ke Registry Global (`pedagogy-registry.ts`)](#tahap-5-pendaftaran-ke-registry-global-pedagogy-registryts)
    - [Tahap 6: Halaman Rute Next.js (`src/app/topics/<slug>/page.tsx`)](#tahap-6-halaman-rute-nextjs-srcapptopicsslugpagetsx)
    - [Tahap 7: Dokumentasi Interaktif MDX (`example.mdx`) \& Verifikasi](#tahap-7-dokumentasi-interaktif-mdx-examplemdx--verifikasi)
  - [4. Spesifikasi 11 Fase Pedagogi Nalar](#4-spesifikasi-11-fase-pedagogi-nalar)
  - [5. Invarian Arsitektur \& Guardrails (DOs \& DON'Ts)](#5-invarian-arsitektur--guardrails-dos--donts)
    - [🟢 Strict DOs](#-strict-dos)
    - [🔴 Strict DON'Ts](#-strict-donts)
  - [6. Checklist Definition of Done (DoD) \& Perintah Verifikasi](#6-checklist-definition-of-done-dod--perintah-verifikasi)
    - [Perintah Pengujian Terminal:](#perintah-pengujian-terminal)

---

## 1. Filosofi & Prinsip Inti Pembelajaran

Nalar bukan sekadar LMS konvensional (*teks → soal → nilai*). Nalar dirancang sebagai lingkungan eksplorasi intuitif tempat pengguna membangun pemahaman dari pengalaman visual langsung menuju kemahiran abstrak.

### Alur Pembelajaran Utama
$$\text{Realitas} \longrightarrow \text{Intuisi} \longrightarrow \text{Model} \longrightarrow \text{Formalisasi} \longrightarrow \text{Eksperimen} \longrightarrow \text{Latihan} \longrightarrow \text{Transfer} \longrightarrow \text{Mastery}$$

> **Prinsip Utama Desain:**  
> *"Every concept must be seen, manipulated, predicted, observed, explained, calculated, and transferred."*

### 4 Pilar Desain Nalar:
1. **Zero-Friction Onboarding**: Pengguna dapat langsung belajar tanpa registrasi atau login di awal alur. Seluruh progres belajar disimpan di `localStorage` (`nalar_progress_v1`).
2. **Topic-Based Modular System**: Kurikulum disusun berbasis graf pengetahuan terarah (*Prerequisite DAG*), bukan sekat kelas kaku (SD/SMP/SMA).
3. **Universal Accessibility (A11y)**: Tema gelap bawaan, mode kontras tinggi, navigasi papan ketik penuh, pembaca narasi suara native Web Speech API, dan layout bebas *overflow*.
4. **Token-Efficient Socratic AI**: Asistensi AI tutor (Nai) hanya dipanggil *on-demand* saat pengguna meminta petunjuk atau menemui kesulitan, menggunakan 4 tingkatan *scaffolding*.

---

## 2. Arsitektur & Struktur Berkas Modul

Setiap modul topik mengisolasi **logika matematika/sains murni**, **komponen kanvas rendering**, dan **data instruksional pedagogis**:

```text
src/
├── lib/
│   ├── curriculum/
│   │   ├── pedagogy-types.ts         # Kontrak tipe TypeScript (ComprehensiveLesson, 11 fase, 3 mode)
│   │   ├── prerequisite-engine.ts    # Mesin evaluasi keterbukaan topik DAG
│   │   └── data/
│   │       ├── topics.ts             # Katalog 26 topik & metadata silabus
│   │       └── connections.ts        # Jembatan konseptual Matematika ➔ Sains (KaTeX)
│   ├── math-engine/ (atau science-engine/)
│   │   ├── <topic-name>.ts           # Logika komputasi murni (pure functions)
│   │   └── <topic-name>.test.ts      # Pengujian unit Vitest (wajib lolos)
├── modules/
│   ├── <math|science>/
│   │   └── <topic-slug>/
│   │       ├── engine.ts             # Definisi state simulasi & re-export pure functions
│   │       ├── Canvas.tsx            # Kanvas grafis interaktif (SVG / Canvas)
│   │       ├── Controls.tsx          # Panel slider kontrol parameter ber-ARIA
│   │       ├── pedagogy.ts           # Data konten 11 fase pembelajaran (ComprehensiveLesson)
│   │       └── example.mdx           # Contoh penyematan modul dalam format MDX
│   └── pedagogy-registry.ts          # Registry terpusat getComprehensiveLesson(slug)
├── components/
│   ├── pedagogy/                     # Komponen orkestrasi 11 fase
│   │   ├── ComprehensiveLessonPlayer.tsx # Player utama (menerima string topicSlug)
│   │   ├── PedagogyHeader.tsx        # Mode switcher (Learn, Explore, Master) & audio
│   │   ├── PredictionCard.tsx        # Kartu prediksi pra-simulasi
│   │   ├── FourTierHintDrawer.tsx    # Drawer petunjuk 4 level bertahap
│   │   ├── VirtualLabNotebook.tsx    # Buku catatan praktikum virtual ilmiah
│   │   ├── TransferChallengeCard.tsx # Tantangan transfer skenario dunia nyata
│   │   ├── MasteryCheckView.tsx      # Matriks evaluasi kemahiran 5 dimensi
│   │   └── ContextualAiTutorDrawer.tsx # AI Tutor Sokratik kontekstual
│   ├── ui/
│   │   └── KaTeXView.tsx             # Renderer rumus matematika KaTeX
│   └── learning/
│       └── ModulePlaygroundEmbed.tsx # Dispatcher embedding simulasi kanvas
└── app/
    └── topics/
        ├── [slug]/page.tsx           # Rute dinamis pembungkus topik
        └── <topic-slug>/page.tsx     # Halaman statis topik mandiri
```

---

## 3. Alur Langkah Demi Langkah Pembuatan Modul (7 Tahap)

---

### Tahap 1: Mesin Komputasi Murni & Unit Test

Pisahkan semua perhitungan fisis/matematis ke dalam fungsi murni (*pure functions*) tanpa dependensi React atau DOM. Berikan proteksi defensif terhadap pembagian nol, `NaN`, dan tak hingga ($\pm\infty$).

#### 1. Berkas Logika: `src/lib/math-engine/<topic>.ts` (atau `science-engine`)
```typescript
/**
 * Logika murni untuk modul kalkulasi topik baru.
 */

export interface CalculationResult {
  outputValue: number;
  rateOfChange: number;
  isStable: boolean;
}

export function computeTopicPhysics(paramA: number, paramB: number): CalculationResult {
  // Defensive guard: cegah NaN dan nilai tak berhingga
  const safeA = Number.isFinite(paramA) ? paramA : 0;
  const safeB = Number.isFinite(paramB) ? paramB : 0;

  // Defensive guard: cegah pembagian nol
  if (Math.abs(safeB) < 1e-9) {
    return { outputValue: 0, rateOfChange: 0, isStable: false };
  }

  const outputValue = safeA / safeB;
  const rateOfChange = safeA * safeB;

  return {
    outputValue: Number.isFinite(outputValue) ? Number(outputValue.toFixed(4)) : 0,
    rateOfChange: Number.isFinite(rateOfChange) ? Number(rateOfChange.toFixed(4)) : 0,
    isStable: Math.abs(outputValue) <= 100,
  };
}
```

#### 2. Berkas Unit Test: `src/lib/math-engine/<topic>.test.ts`
```typescript
import { describe, it, expect } from "vitest";
import { computeTopicPhysics } from "./<topic>";

describe("<topic> calculation engine", () => {
  it("menghitung nilai dengan benar pada parameter normal", () => {
    const res = computeTopicPhysics(12, 3);
    expect(res.outputValue).toBe(4);
    expect(res.rateOfChange).toBe(36);
    expect(res.isStable).toBe(true);
  });

  it("menangani pembagian dengan nol secara defensif tanpa melempar exception", () => {
    const res = computeTopicPhysics(10, 0);
    expect(res.outputValue).toBe(0);
    expect(res.isStable).toBe(false);
  });

  it("menangani input NaN dan nilai tak terhingga secara aman", () => {
    const res = computeTopicPhysics(NaN, Infinity);
    expect(res.outputValue).toBe(0);
  });
});
```

---

### Tahap 2: Kanvas Visual Interaktif & Panel Kontrol Slider

Buat direktori baru di `src/modules/<math|science>/<topic-slug>/`.

#### 1. Berkas State: `engine.ts`
```typescript
import { computeTopicPhysics, CalculationResult } from "@/lib/math-engine/<topic>";

export interface TopicSimulationState {
  paramA: number;
  paramB: number;
  scaleFactor?: number;
}

export * from "@/lib/math-engine/<topic>";
```

#### 2. Berkas Kanvas: `Canvas.tsx`
Kanvas wajib responsif terhadap lebar kontainer, memiliki atribut ARIA lengkap, dan menggunakan warna-warna dark mode netral:
```tsx
"use client";

import React from "react";
import { TopicSimulationState, computeTopicPhysics } from "./engine";

interface CanvasProps {
  state: TopicSimulationState;
  onPointSelect?: (val: number) => void;
}

export function Canvas({ state }: CanvasProps) {
  const { paramA, paramB } = state;
  const result = computeTopicPhysics(paramA, paramB);

  const width = 600;
  const height = 240;

  return (
    <div
      role="region"
      aria-label="Kanvas Interaktif Simulasi Topik"
      className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 p-4 shadow-inner flex flex-col space-y-3"
    >
      {/* HUD Bar Status */}
      <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-2">
        <span className="font-mono text-sky-400">Parameter: A={paramA} | B={paramB}</span>
        <span className="font-mono text-indigo-300">Hasil: {result.outputValue}</span>
      </div>

      {/* SVG Responsif */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-48 select-none"
        aria-label="Simulasi Grafis Interaktif"
        role="img"
      >
        {/* Sumbu atau elemen visual */}
        <line x1="20" y1={height / 2} x2={width - 20} y2={height / 2} stroke="#525252" strokeWidth="2" />
        <circle
          cx={width / 2 + paramA * 15}
          cy={height / 2}
          r="14"
          fill="#38bdf8"
          className="transition-all duration-200"
        />
      </svg>
    </div>
  );
}
```

#### 3. Berkas Panel Kontrol: `Controls.tsx`
Kontrol slider wajib menyediakan atribut aksesibilitas (`aria-label`, `min`, `max`, `step`):
```tsx
"use client";

import React from "react";
import { TopicSimulationState } from "./engine";

interface ControlsProps {
  state: TopicSimulationState;
  onChange: (newState: TopicSimulationState) => void;
}

export function Controls({ state, onChange }: ControlsProps) {
  const update = (key: keyof TopicSimulationState, val: number) => {
    onChange({ ...state, [key]: val });
  };

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Slider A */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <label htmlFor="ctrl-param-a" className="text-sky-400 font-semibold">
              Parameter A: {state.paramA}
            </label>
            <span className="text-neutral-500 font-mono">[-10, 10]</span>
          </div>
          <input
            id="ctrl-param-a"
            type="range"
            min="-10"
            max="10"
            step="1"
            value={state.paramA}
            onChange={(e) => update("paramA", parseFloat(e.target.value))}
            className="w-full accent-sky-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Atur Parameter A"
          />
        </div>

        {/* Slider B */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <label htmlFor="ctrl-param-b" className="text-indigo-400 font-semibold">
              Parameter B: {state.paramB}
            </label>
            <span className="text-neutral-500 font-mono">[1, 10]</span>
          </div>
          <input
            id="ctrl-param-b"
            type="range"
            min="1"
            max="10"
            step="1"
            value={state.paramB}
            onChange={(e) => update("paramB", parseFloat(e.target.value))}
            className="w-full accent-indigo-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Atur Parameter B"
          />
        </div>
      </div>
    </div>
  );
}
```

---

### Tahap 3: Integrasi Kanvas ke Playground Runner (`ModulePlaygroundEmbed.tsx`)

Buka [src/components/learning/ModulePlaygroundEmbed.tsx](file:///d:/projects/nalar/src/components/learning/ModulePlaygroundEmbed.tsx), lalu daftarkan komponen kanvas topik baru pada percabangan `renderCanvasAndControls`:

1. Impor `Canvas` dan `Controls`:
   ```tsx
   import { Canvas as TopicCanvas } from "@/modules/<math|science>/<topic-slug>/Canvas";
   import { Controls as TopicControls } from "@/modules/<math|science>/<topic-slug>/Controls";
   ```
2. Tambahkan kasus `switch (slug)`:
   ```tsx
   case "<topic-slug>":
     return (
       <div className="space-y-4">
         <TopicCanvas
           state={{
             paramA: vars.paramA ?? 2,
             paramB: vars.paramB ?? 4,
           }}
         />
         {!compact && (
           <TopicControls
             state={{
               paramA: vars.paramA ?? 2,
               paramB: vars.paramB ?? 4,
             }}
             onChange={(s) => handleVarsChange(s as unknown as Record<string, number>)}
           />
         )}
       </div>
     );
   ```

---

### Tahap 4: Penyusunan Kontrak Pedagogi 11 Fase (`pedagogy.ts`)

Buat berkas `src/modules/<math|science>/<topic-slug>/pedagogy.ts`. Berkas ini mendefinisikan kurikulum lengkap yang mematuhi kontrak `ComprehensiveLesson` dari `@/lib/curriculum/pedagogy-types`.

```typescript
import { ComprehensiveLesson } from "@/lib/curriculum/pedagogy-types";

export const myTopicPedagogicalLesson: ComprehensiveLesson = {
  id: "<topic-slug>",
  slug: "<topic-slug>",
  title: "Judul Modul Lengkap",
  subject: "math", // atau "science"
  domain: "algebra", // sesuaikan domain
  summary: "Ringkasan konsep yang dipelajari dalam 1-2 kalimat padat.",
  audioNarrationText: "Teks narasi audio pembuka untuk assistive Web Speech API.",
  prerequisites: [], // id topik prasyarat
  learningObjectives: [
    "Tujuan pembelajaran konkret 1",
    "Tujuan pembelajaran konkret 2",
  ],

  // 1. Hook / Fenomena Nyata
  hook: {
    question: "Pertanyaan pemantik rasa ingin tahu yang bersumber dari dunia nyata?",
    phenomenonDescription: "Deskripsi fenomena nyata yang dapat diamati sebelum masuk ke rumus formal.",
    realWorldContext: "Konteks aplikasi sehari-hari (GPS, olahraga, teknologi, alam).",
  },

  // 2. Prediction
  prediction: {
    prompt: "Uji Hipotesis Awal",
    question: "Apa yang akan terjadi jika nilai parameter dilipatgandakan?",
    options: [
      { id: "p1", text: "Pilihan salah dengan penjelasan intuitif", isCorrect: false, explanation: "Penjelasan mengapa konsepsi ini keliru." },
      { id: "p2", text: "Pilihan benar dengan penalaran ilmiah", isCorrect: true, explanation: "Penjelasan ilmiah yang tepat." },
    ],
    whatActuallyHappened: "Hasil nyata yang diamati saat simulasi dijalankan.",
  },

  // 3. Explore
  explore: {
    prompt: "Eksplorasi Kanvas Interaktif",
    guidingQuestions: [
      "Amati apa yang terjadi pada kanvas saat Parameter A digeser.",
      "Bandingkan hasilnya saat Parameter B bernilai minimum versus maksimum.",
    ],
    initialVariables: { paramA: 3, paramB: 2 },
  },

  // 4. Discover
  discover: {
    prompt: "Penemuan Pola Keteraturan",
    patternSummary: "Hubungan konsisten antara parameter input dan reaksi sistem visual.",
    interactiveInsight: "Wawasan mendalam mengapa pola ini terjadi secara nalar.",
  },

  // 5. Formalize (KaTeX)
  formalize: {
    summary: "Bahasa Matematis & Formulasi Simbolik",
    definitions: [
      { term: "Istilah Penting", explanation: "Definisi konseptual istilah tanpa jargon berlebihan." },
    ],
    formulas: [
      {
        name: "Nama Hukum / Persamaan",
        latex: "y = \\frac{a}{b} \\cdot x", // Dirender otomatis via KaTeXView
        meaning: "Makna fisis dari rumus di atas.",
      },
    ],
    variablesTable: [
      { symbol: "a, b", meaning: "Parameter pengendali", unit: "satuan baku (SI)" },
    ],
  },

  // 6. Derivation / Reasoning (KaTeX)
  derivation: {
    title: "Penurunan Konsep Langkah Demi Langkah",
    steps: [
      {
        stepNumber: 1,
        explanation: "Titik tolak dari prinsip fundamental pertama.",
        latex: "f_0 = c_1",
      },
      {
        stepNumber: 2,
        explanation: "Substitusi matematis untuk menghasilkan bentuk umum.",
        latex: "f(x) = f_0 + k \\cdot x",
      },
    ],
  },

  // 7. Guided Practice (4-Tier Progressive Hints)
  guidedPractice: [
    {
      id: "gp-1",
      title: "Latihan Terbimbing Tingkat 1",
      question: "Atur kanvas agar nilai Parameter A menghasilkan output bernilai 6.",
      hints: {
        level1Attention: "Perhatikan nilai slider Parameter A pada panel kontrol.",
        level2Concept: "Hasil sebanding lurus dengan nilai Parameter A.",
        level3Strategy: "Gunakan hubungan A = Output / 2.",
        level4Scaffold: "Geser slider Parameter A tepat ke angka 3.",
      },
      targetCondition: (vars) => vars.paramA === 3,
      solutionExplanation: "Parameter A = 3 menghasilkan output yang tepat sesuai target.",
      xpReward: 30,
    },
  ],

  // 8. Independent Practice
  independentPractice: [
    {
      id: "ip-1",
      title: "Tantangan Mandiri Tanpa Bantuan",
      question: "Tentukan nilai Parameter B agar sistem berada dalam kesetimbangan.",
      targetCondition: (vars) => vars.paramB === 5,
      solutionExplanation: "Nilai B = 5 menyeimbangkan kedua sisi persamaan.",
      xpReward: 35,
    },
  ],

  // 9. Virtual Laboratory (Khusus Sains/Eksperimental)
  virtualLab: {
    experimentTitle: "Eksperimen Uji Hipotesis",
    hypothesisPrompt: "Apakah perbesaran nilai A akan mempercepat laju perubahan secara linier?",
    parameters: [
      { name: "paramA", label: "Variabel Bebas A", min: 1, max: 10, step: 1, defaultValue: 2 },
    ],
    dataCollectionFields: ["Parameter A", "Laju Perubahan", "Waktu"],
    analysisQuestions: [
      "Bagaimana korelasi antara Parameter A dengan nilai observasi?",
    ],
  },

  // 10. Transfer Challenge (Real-World)
  transferChallenge: {
    title: "Aplikasi Dunia Nyata",
    realWorldScenario: "Skenario kontekstual nyata yang membutuhkan transfer pemahaman konsep ini.",
    taskPrompt: "Tentukan parameter yang optimal untuk menyelesaikan masalah nyata di atas.",
    targetCondition: (vars) => vars.paramA === 4,
    solutionExplanation: "Penerapan model pada skenario nyata menghasilkan efisiensi maksimal.",
    reflectionPrompt: "Mengapa model sederhana ini tetap relevan saat dihadapkan pada friksi dunia nyata?",
    xpReward: 40,
  },

  // 11. Mastery Check (Matriks 5 Dimensi)
  masteryCheck: [
    {
      id: "mc-1",
      dimension: "conceptual",
      dimensionLabel: "Pemahaman Konseptual",
      question: "Pertanyaan konseptual yang menguji pemahaman mendalam tanpa hitungan rumit?",
      options: [
        { id: "o1", text: "Pilihan jawaban yang tepat", isCorrect: true, feedback: "Tepat sekali!" },
        { id: "o2", text: "Distraktor miskonsepsi umum", isCorrect: false, feedback: "Periksa kembali konsep dasar." },
      ],
    },
  ],

  // Jembatan Konsep Antar-Disiplin (Math <-> Science)
  crossDomainBridge: {
    connectedTopicId: "science-kinematics",
    connectedTopicTitle: "Kinematika",
    connectionNarrative: "Penjelasan keterkaitan konsep ini dengan pemodelan sains fisis.",
    badgeText: "Matematika ➔ Sains: Aplikasi Fisis",
  },
};
```

---

### Tahap 5: Pendaftaran ke Registry Global (`pedagogy-registry.ts`)

Buka [src/modules/pedagogy-registry.ts](file:///d:/projects/nalar/src/modules/pedagogy-registry.ts), impor objek lesson baru, lalu daftarkan ke kamus `COMPREHENSIVE_LESSONS`:

```typescript
import { myTopicPedagogicalLesson } from "./math/<topic-slug>/pedagogy";

export const COMPREHENSIVE_LESSONS: Record<string, ComprehensiveLesson> = {
  // Topik lainnya...
  "<topic-slug>": myTopicPedagogicalLesson,
};
```

---

### Tahap 6: Halaman Rute Next.js (`src/app/topics/<slug>/page.tsx`)

Buat berkas rute halaman topik di `src/app/topics/<topic-slug>/page.tsx`.

> [!IMPORTANT]
> **Aturan Batas Server/Client (RSC Boundary Serialization):**  
> Komponen halaman Server Component **TIDAK BOLEH** mengoper seluruh objek `lesson` (yang memuat fungsi JavaScript `targetCondition`) langsung sebagai prop ke Client Component!  
> **Oper selalu string `topicSlug="<topic-slug>"`** agar prop bersifat 100% serializable. `ComprehensiveLessonPlayer` akan menyelesaikan datanya secara otomatis di sisi client.

```tsx
import React from "react";
import type { Metadata } from "next";
import { ComprehensiveLessonPlayer } from "@/components/pedagogy/ComprehensiveLessonPlayer";

export const metadata: Metadata = {
  title: "Judul Modul | Nalar STEM",
  description: "Deskripsi singkat topik untuk SEO dan kartu media sosial.",
};

export default function MyTopicPage() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100">
      <ComprehensiveLessonPlayer topicSlug="<topic-slug>" />
    </main>
  );
}
```

---

### Tahap 7: Dokumentasi Interaktif MDX (`example.mdx`) & Verifikasi

Sertakan berkas `example.mdx` di dalam folder modul (`src/modules/<math|science>/<topic-slug>/example.mdx`) untuk mendemonstrasikan cara pemanggilan komponen kanvas:

```mdx
# Dokumentasi Penggunaan: <Nama Topik>

Komponen kanvas topik ini dapat disematkan ke dalam artikel edukasi berbasis MDX menggunakan kode berikut:

import { Canvas } from "./Canvas";
import { Controls } from "./Controls";

<div className="my-6 p-4 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
  <Canvas state={{ paramA: 3, paramB: 2 }} />
</div>

## Konsep yang Diajarkan
1. Pemahaman intuitif perubahan parameter A terhadap sistem.
2. Penurunan matematis hubungan keseimbangan.
```

---

## 4. Spesifikasi 11 Fase Pedagogi Nalar

Tiap modul kanonikal di Nalar wajib menyediakan data untuk 11 fase instruksional berikut:

| Fase | Nama Fase | Peran Pedagogis & Antarmuka |
| :--- | :--- | :--- |
| **A** | **Hook / Fenomena** | Memantik rasa ingin tahu melalui fenomena nyata tanpa rumus formal terlebih dahulu. |
| **B** | **Prediksi** | Menguji intuisi awal pengguna dengan kartu tebakan (*Predict vs What Actually Happened*). |
| **C** | **Eksplorasi** | Manipulasi langsung slider pada kanvas untuk menguji hipotesis (*Playground Canvas*). |
| **D** | **Penemuan Pola** | Merangkum keteraturan yang ditemukan pengguna sebelum masuk ke notasi formal. |
| **E** | **Formalisasi** | Menghubungkan intuisi visual ke persamaan matematika formal via KaTeX (`KaTeXView`). |
| **F** | **Penurunan Konsep** | Menjelaskan asal-usul logika rumus langkah demi langkah (bukan sekadar hafalan). |
| **G** | **Latihan Terbimbing** | Tantangan interaktif dengan **4-Level Progressive Hint** (Attention $\to$ Concept $\to$ Strategy $\to$ Scaffold). |
| **H** | **Latihan Mandiri** | Tantangan logika murni tanpa bantuan scaffolding untuk menguji kemandirian strategi. |
| **I** | **Lab Virtual** | Praktikum simulasi sains dengan Buku Catatan Laboratorium tersinkronisasi `localStorage`. |
| **J** | **Tantangan Transfer** | Masalah aplikatif baru di dunia nyata yang memerlukan generalisasi pemahaman konsep. |
| **K** | **Evaluasi Kemahiran** | Pengukuran komprehensif mengacu pada Matriks 5 Dimensi Kemahiran STEM. |

---

## 5. Invarian Arsitektur & Guardrails (DOs & DON'Ts)

### 🟢 Strict DOs
1. **Serialisasi RSC yang Aman**: Selalu kirim `topicSlug="<slug>"` (bertipe string) dari Server Component ke `ComprehensiveLessonPlayer`. Hindari pengiriman objek yang memiliki properti fungsi عبر Server/Client boundary.
2. **Kompilasi Rumus via KaTeXView**: Selalu gunakan komponen `<KaTeXView math={...} displayMode />` untuk setiap rumus LaTeX. Jangan mencetak string mentah (`{form.latex}`) atau tag `<code>`.
3. **Defensive Math Invariants**: Cegah pembagian nol (`b === 0`), `NaN`, dan `Infinity` di semua fungsi `math-engine/` dan `science-engine/`.
4. **Pembersihan Resource Siklus Hidup**: Selalu bersihkan `requestAnimationFrame`, interval, dan *event listener* pada *cleanup function* hook `useEffect`.
5. **Aksesibilitas Universal (A11y)**: Berikan atribut `aria-label`, `min`, `max`, `step` pada semua elemen `<input type="range">`.

### 🔴 Strict DON'Ts
1. **JANGAN membuat file monolitik raksasa (>250 baris)**: Pecah berkas menjadi `Canvas.tsx`, `Controls.tsx`, `engine.ts`, dan `pedagogy.ts`.
2. **JANGAN mengalokasikan objek baru di dalam loop render**: Hindari `new Vector()` atau pembuatan array baru di dalam siklus animasi kanvas untuk mencegah *garbage collector lag*.
3. **JANGAN menggunakan CSS inline acak**: Manfaatkan utilitas kelas Tailwind CSS secara konsisten (`bg-neutral-950`, `text-neutral-100`, `border-neutral-800`).
4. **JANGAN menggunakan tag `<Script>` di dalam `<head>` pada App Router**: Untuk skrip inisialisasi tema SSR, selalu gunakan hook `useServerInsertedHTML` melalui `ThemeScript` guna mencegah peringatan hidrasi React 19.

---

## 6. Checklist Definition of Done (DoD) & Perintah Verifikasi

Sebelum menyatakan penambahan modul selesai, pastikan seluruh kriteria berikut terpenuhi:

- [ ] Fungsi komputasi murni terisolasi di `src/lib/<math|science>-engine/<topic>.ts`.
- [ ] Unit test Vitest dibuat dan lulus 100% (`pnpm test`).
- [ ] Komponen `Canvas.tsx` dan `Controls.tsx` terdaftar di `ModulePlaygroundEmbed.tsx`.
- [ ] Berkas `pedagogy.ts` mematuhi skema `ComprehensiveLesson` dan terdaftar di `pedagogy-registry.ts`.
- [ ] Halaman rute `src/app/topics/<topic-slug>/page.tsx` mengoper `topicSlug` bertipe string ke `ComprehensiveLessonPlayer`.
- [ ] Seluruh formula matematika ter-render visual menggunakan KaTeX tanpa menampilkan teks kode LaTeX mentah.
- [ ] Tampilan teruji responsif pada layar desktop (1536×730) maupun ponsel (390×844) tanpa *horizontal overflow*.
- [ ] Berkas dokumentasi `example.mdx` disertakan di dalam folder modul.
- [ ] TypeScript lolos pengecekan tipe dengan 0 error (`pnpm typecheck`).
- [ ] Build produksi Next.js terkompilasi bersih tanpa *serialization error* (`pnpm build`).

### Perintah Pengujian Terminal:
```bash
# 1. Pengecekan tipe data TypeScript
pnpm typecheck

# 2. Menjalankan seluruh pengujian unit
pnpm test

# 3. Validasi kompilasi dan prerender statis Next.js
pnpm build

# 4. Menjalankan server pengembangan lokal
pnpm dev
```
