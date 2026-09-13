# 🛠️ Panduan Lengkap: Cara Menambahkan Modul Baru di Nalar

Dokumen ini adalah panduan referensi teknis bagi pengembang untuk membangun dan mendaftarkan modul pembelajaran interaktif baru (*standalone topic*) di platform **Nalar**, mengikuti standar pedagogi ***Guided Discovery Learning*** dan prinsip arsitektur yang tertuang dalam `AGENTS.md`.

---

## 📑 Daftar Isi
1. [Filosofi Desain Modul Nalar](#1-filosofi-desain-modul-nalar)
2. [Arsitektur & Struktur Berkas Modul](#2-arsitektur--struktur-berkas-modul)
3. [Alur Langkah Demi Langkah (7 Tahap)](#3-alur-langkah-demi-langkah-7-tahap)
   - [Tahap 1: Komputasi Murni & Unit Test](#tahap-1-komputasi-murni--unit-test)
   - [Tahap 2: Kanvas Visual, Kontrol & KaTeX](#tahap-2-kanvas-visual-kontrol--katex)
   - [Tahap 3: Penyusunan Konten Guided Discovery (`module.ts`)](#tahap-3-penyusunan-konten-guided-discovery-modulets)
   - [Tahap 4: Integrasi ke Playground Runner (`ModulePlaygroundEmbed.tsx`)](#tahap-4-integrasi-ke-playground-runner-moduleplaygroundembedtsx)
   - [Tahap 5: Pendaftaran ke Registry Global (`registry.ts`)](#tahap-5-pendaftaran-ke-registry-global-registryts)
   - [Tahap 6: Halaman Topik & Peta Level (`src/app/topics/[slug]/page.tsx`)](#tahap-6-halaman-topik--peta-level-srcapptopicsslugpagetsx)
   - [Tahap 7: Integrasi ke Pohon Keterampilan (*Skill Tree*)](#tahap-7-integrasi-ke-pohon-keterampilan-skill-tree)
4. [Spesifikasi 8 Tipe Layar *Guided Discovery*](#4-spesifikasi-8-tipe-layar-guided-discovery)
5. [Invarian Arsitektur & Aturan Ketat (DOs & DON'Ts)](#5-invarian-arsitektur--aturan-ketat-dos--donts)
6. [Contoh Berkas MDX (`example.mdx`)](#6-contoh-berkas-mdx-examplemdx)
7. [Checklist Definition of Done (DoD) & Perintah Verifikasi](#7-checklist-definition-of-done-dod--perintah-verifikasi)

---

## 1. Filosofi Desain Modul Nalar

Platform Nalar mengusung tema **Pendidikan Berkualitas (SDG 4)** yang inklusif, merata, dan intuitif. Setiap modul pembelajaran berpegang pada prinsip:

1. **Learning by Doing**: Jangan pernah *menjelaskan* apa yang bisa *ditemukan sendiri* oleh pengguna. 80%+ layar meminta pengguna memanipulasi parameter, mengamati reaksi visual, dan merumuskan kesimpulan.
2. **Zero-Friction Onboarding**: Tidak ada formulir login di awal. Semua progres (XP, lencana, tantangan selesai) disimpan di `localStorage`.
3. **Katalog Mandiri (*Topic-Based Modular*)**: Materi tidak disekat kaku berdasarkan jenjang kelas (SD/SMP/SMA), melainkan berbasis topik mandiri yang memiliki prasyarat eksplisit (*prerequisites*).
4. **Aksesibilitas Universal (A11y)**:
   - Dukungan tema gelap (*dark mode*) dan kontras tinggi (*high contrast*).
   - Kontrol keyboard lengkap (`Tab`, tombol panah, `Enter`, `Space`).
   - Narasi audio terintegrasi (*native* Web Speech API).
   - Tampilan adaptif pada layar desktop maupun ponsel pintar (*mobile-friendly*).

---

## 2. Arsitektur & Struktur Berkas Modul

Setiap modul topik memisahkan antara **logika matematika/sains murni**, **visualisasi kanvas**, dan **konten instruksional**.

```text
d:\projects\nalar\
├── src/
│   ├── lib/
│   │   ├── math-engine/ (atau science-engine/)
│   │   │   ├── <topic-name>.ts        # Fungsi kalkulasi murni (pure functions)
│   │   │   └── <topic-name>.test.ts   # Unit test Vitest (100% test coverage)
│   │   └── curriculum/
│   │       ├── math-tree.ts           # Pendaftaran simpul modul di Skill Tree
│   │       └── level-token.ts         # Enkripsi & resolusi token tingkat belajar
│   ├── modules/
│   │   └── <math|science>/
│   │       └── <topic-slug>/
│   │           ├── engine.ts          # Tipe state lokal & re-export kalkulasi
│   │           ├── Canvas.tsx         # Komponen grafis interaktif (SVG / Mafs / Canvas)
│   │           ├── Controls.tsx       # Slider kontrol parameter interaktif
│   │           ├── KaTeXFormula.tsx   # Rumus KaTeX reaktif yang sinkron dengan kanvas
│   │           ├── module.ts          # Kurikulum multi-tingkat (8 layar guided discovery)
│   │           └── example.mdx        # Contoh pemanggilan modul dalam dokumentasi MDX
│   ├── components/
│   │   └── learning/
│   │       └── ModulePlaygroundEmbed.tsx # Dispatcher embed (mode standar & compact)
│   └── app/
│       └── topics/
│           └── <topic-slug>/
│               └── page.tsx           # Halaman pengantar topik & LevelMap
```

---

## 3. Alur Langkah Demi Langkah (7 Tahap)

### Tahap 1: Komputasi Murni & Unit Test

Pisahkan semua rumus fisika/matematika ke dalam fungsi murni (*pure functions*) tanpa dependensi React/DOM.

#### 1. Berkas Logika: `src/lib/math-engine/<topic>.ts`
```typescript
/**
 * Logika murni untuk modul kalkulasi topik baru.
 */

export interface CalculationResult {
  value: number;
  isStable: boolean;
}

export function calculateTopicOutput(a: number, b: number): CalculationResult {
  // Defensive check: hindari NaN, pembagian nol, dan Infinity
  if (isNaN(a) || isNaN(b)) {
    return { value: 0, isStable: false };
  }
  if (Math.abs(b) < 1e-9) {
    return { value: 0, isStable: false };
  }

  const result = a / b;
  return {
    value: isFinite(result) ? Number(result.toFixed(4)) : 0,
    isStable: Math.abs(result) <= 10,
  };
}
```

#### 2. Berkas Pengujian: `src/lib/math-engine/<topic>.test.ts`
```typescript
import { describe, it, expect } from "vitest";
import { calculateTopicOutput } from "./<topic>";

describe("<topic> calculation engine", () => {
  it("menghitung nilai dengan benar pada input valid", () => {
    const res = calculateTopicOutput(10, 2);
    expect(res.value).toBe(5);
    expect(res.isStable).toBe(true);
  });

  it("menangani pembagian dengan nol secara defensif", () => {
    const res = calculateTopicOutput(5, 0);
    expect(res.value).toBe(0);
    expect(res.isStable).toBe(false);
  });
});
```

Jalankan pengujian untuk memastikan validitas:
```bash
pnpm test
```

---

### Tahap 2: Kanvas Visual, Kontrol & KaTeX

Buat direktori komponen di `src/modules/math/<topic-slug>/` (atau `src/modules/science/<topic-slug>/`).

#### 1. Berkas State: `engine.ts`
```typescript
export interface TopicState {
  paramA: number;
  paramB: number;
  zoomLevel?: number;
}

export * from "@/lib/math-engine/<topic>";
```

#### 2. Berkas Kanvas: `Canvas.tsx`
Pastikan kanvas memiliki `viewBox` yang responsif, atribut ARIA, dan skala tinggi yang fleksibel untuk tampilan mobile:
```tsx
"use client";

import React from "react";
import { TopicState } from "./engine";

interface CanvasProps {
  state: TopicState;
  onSelectNode?: (val: number) => void;
}

export function Canvas({ state, onSelectNode }: CanvasProps) {
  const width = 640;
  const height = 320;

  return (
    <div
      role="region"
      aria-label="Kanvas Interaktif Simulasi Topik"
      className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl flex flex-col"
    >
      {/* Header HUD Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-neutral-900/90 border-b border-neutral-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="font-bold text-neutral-200">Visualisasi Simulasi</span>
        </div>
        <div className="font-mono text-neutral-300">
          A = {state.paramA}, B = {state.paramB}
        </div>
      </div>

      {/* SVG Viewport Responsif */}
      <div className="relative w-full h-[180px] sm:h-[260px] md:h-[320px] flex items-center justify-center bg-neutral-950 select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Elemen grafis SVG interaktif */}
          <circle
            cx={width / 2 + state.paramA * 20}
            cy={height / 2}
            r={16}
            fill="#6366f1"
            className="transition-all duration-200"
          />
        </svg>
      </div>
    </div>
  );
}
```

#### 3. Berkas Kontrol Slider: `Controls.tsx`
Wajib memiliki atribut ARIA dan navigasi papan ketik:
```tsx
"use client";

import React from "react";
import { TopicState } from "./engine";
import { RotateCcw } from "lucide-react";

interface ControlsProps {
  state: TopicState;
  onChange: (updater: (prev: TopicState) => TopicState) => void;
  onReset: () => void;
}

export function Controls({ state, onChange, onReset }: ControlsProps) {
  return (
    <div className="space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-bold text-neutral-300 uppercase tracking-wider text-[11px]">
          Panel Kendali Parameter
        </span>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-neutral-400 hover:text-white transition"
          aria-label="Reset parameter kanvas"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Slider Parameter A */}
      <div className="space-y-1.5">
        <div className="flex justify-between font-medium">
          <label htmlFor="paramA-slider" className="text-neutral-300">
            Parameter A
          </label>
          <span className="font-mono text-indigo-400 font-bold">{state.paramA}</span>
        </div>
        <input
          id="paramA-slider"
          type="range"
          min={-10}
          max={10}
          step={1}
          value={state.paramA}
          onChange={(e) => {
            const val = Number(e.target.value);
            onChange((prev) => ({ ...prev, paramA: val }));
          }}
          className="w-full accent-indigo-500 cursor-pointer"
          aria-label="Atur nilai Parameter A"
        />
      </div>
    </div>
  );
}
```

#### 4. Berkas Rumus Reaktif: `KaTeXFormula.tsx`
```tsx
"use client";

import React from "react";
import { TopicState } from "./engine";
import { KaTeXView } from "@/components/ui/KaTeXView";

export function KaTeXFormula({ state }: { state: TopicState }) {
  const mathExpr = `A = ${state.paramA}, \\quad B = ${state.paramB} \\implies f(A, B) = ${state.paramA + state.paramB}`;

  return (
    <div className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-center shadow-md">
      <KaTeXView math={mathExpr} displayMode className="text-sm sm:text-base text-indigo-300" />
    </div>
  );
}
```

---

### Tahap 3: Penyusunan Konten Guided Discovery (`module.ts`)

Definisikan modul dalam `src/modules/math/<topic-slug>/module.ts`. Setiap tingkat (*Level*) wajib mematuhi 8 layar penemuan terpandu:

```typescript
import { TopicModule } from "@/types/topic";

export const myNewTopicModule: TopicModule = {
  id: "math-my-new-topic",
  slug: "math-my-new-topic",
  title: "Eksplorasi Konsep Baru",
  category: "math",
  domain: "Aljabar & Bilangan",
  description: "Temukan prinsip fundamental konsep baru melalui simulasi visual dan penalaran.",
  difficulty: "beginner",
  estimatedMinutes: 30,
  xpReward: 150,
  prerequisites: ["math-real-numbers-line"],
  interactiveComponentSlug: "math-my-new-topic",
  levels: [
    {
      index: 1,
      title: "Fenomena Awal & Intuisi",
      description: "Menemukan pola perubahan saat parameter digeser.",
      xpReward: 30,
      steps: [
        // Layar 1: Pemantik (PROVOKE)
        {
          id: "step-1-provoke",
          type: "provoke",
          title: "Pertanyaan Pemantik",
          audioNarrationText: "Mengapa saat nilai A dinaikkan, bentuk grafik bergeser ke arah berlawanan?",
          naiDialogue: "Perhatikan titik biru di kanvas. Mengapa ia melompat saat kita mengubah tanda?",
          naiExpression: "curious",
          provoke: {
            hookTitle: "Misteri Pergeseran Tanda",
            hookText: "Bayangkan kamu melangkah mundur di depan cermin.",
            question: "Apa yang terjadi saat sebuah nilai dikalikan dengan -1?",
            interactiveComponentSlug: "math-my-new-topic",
            initialVariables: { paramA: 3, paramB: 1 },
            options: [
              {
                id: "opt-1",
                text: "Arah berputar 180 derajat ke posisi sebaliknya",
                naiResponse: "Tepat sekali! Membalik arah adalah operasi rotasi geometri 180 derajat.",
              },
              {
                id: "opt-2",
                text: "Nilai lenyap menjadi nol",
                naiResponse: "Bukan nol! Nilai tetap memiliki besaran yang sama, hanya arahnya yang terbalik.",
              },
            ],
          },
        },

        // Layar 2: Prediksi (PREDICT)
        {
          id: "step-2-predict",
          type: "predict",
          title: "Uji Prediksi Hipotesis",
          audioNarrationText: "Buatlah prediksi sebelum menggeser kontrol simulasi.",
          naiDialogue: "Sebelum menjalankan simulasi, tebak dulu apa yang akan terjadi!",
          naiExpression: "thinking",
          predict: {
            scenarioTitle: "Eksperimen Dua Pengali Negatif",
            scenarioText: "Jika kita membalik arah dua kali berturut-turut, ke mana arah akhir titik?",
            interactiveComponentSlug: "math-my-new-topic",
            initialVariables: { paramA: 2, paramB: 1 },
            simulationVariables: { paramA: -4, paramB: 2 },
            options: [
              {
                id: "p-1",
                text: "Kembali menghadap ke arah positif semula (+)",
                isCorrect: true,
                explanation: "Benar! Rotasi 180 derajat dua kali menghasilkan 360 derajat (kembali ke asal).",
              },
              {
                id: "p-2",
                text: "Tetap menghadap ke kiri negatif (-)",
                isCorrect: false,
                explanation: "Kurang tepat. Coba perhatikan simulasi saat dijalankan.",
              },
            ],
          },
        },

        // Layar 3: Eksplorasi Terbimbing (GUIDED)
        {
          id: "step-3-guided",
          type: "guided",
          title: "Eksplorasi & Tabel Pola",
          audioNarrationText: "Geser slider dan amati perubahan pada tabel observasi.",
          naiDialogue: "Coba geser slider parameter A dan perhatikan apa yang dicatat pada tabel!",
          naiExpression: "teaching",
          guided: {
            instructionTitle: "Mengamati Pola Skala",
            instructionText: "Atur parameter A ke berbagai nilai untuk menemukan keteraturan perkalian.",
            interactiveComponentSlug: "math-my-new-topic",
            initialVariables: { paramA: 2, paramB: 3 },
            observationTable: {
              headers: ["Parameter A", "Parameter B", "Hasil f(A, B)"],
              rows: [
                { parameter: "A = 2, B = 3", expectedValue: "5" },
                { parameter: "A = -4, B = 4", expectedValue: "0" },
              ],
            },
            discoveryQuestion: {
              prompt: "Apa hubungan antara parameter A dan B pada kondisi seimbang?",
              options: [
                { id: "d-1", text: "Jumlah keduanya bernilai nol (saling meniadakan)", isCorrect: true },
                { id: "d-2", text: "Hasil kalinya selalu positif", isCorrect: false },
              ],
              correctOption: "d-1",
            },
          },
        },

        // Layar 4: Formalisasi Simbolik (FORMALIZE)
        {
          id: "step-4-formalize",
          type: "formalize",
          title: "Merumuskan Kaidah",
          audioNarrationText: "Lengkapi bagian yang kosong untuk merumuskan hukum matematika ini.",
          naiDialogue: "Hebat! Sekarang mari kita susun rumus formalnya bersama-sama.",
          naiExpression: "happy",
          formalize: {
            title: "Hukum Kesetimbangan Skalar",
            prompt: "Pilihlah bagian yang tepat untuk melengkapi persamaan formal berikut:",
            formulaTemplate: "A + [blank1] = 0 \\implies [blank2] = -A",
            blanks: [
              {
                id: "blank1",
                label: "Komponen Penyeimbang",
                options: ["(-A)", "(+A)", "(0)"],
                correctOption: "(-A)",
              },
              {
                id: "blank2",
                label: "Invers Aditif",
                options: ["B", "A", "1"],
                correctOption: "B",
              },
            ],
            resolvedFormulaKaTeX: "A + (-A) = 0 \\implies B = -A",
            explanation: "Setiap elemen bilangan riil A memiliki invers penjumlahan -A sehingga jumlahnya nol.",
          },
        },

        // Layar 5: Kuis Cepat (CHECK)
        {
          id: "step-5-check",
          type: "check",
          title: "Cek Pemahaman Cepat",
          audioNarrationText: "Jawablah pertanyaan cepat ini untuk memverifikasi pemahamanmu.",
          naiDialogue: "Satu pertanyaan kilat untuk memastikan pemahamanmu sudah kokoh!",
          naiExpression: "curious",
          check: {
            checkType: "true_false",
            question: "Invers penjumlahan dari -7 adalah +7?",
            trueFalseAnswer: true,
            explanation: "BENAR! -(-7) = +7 karena membalik arah negatif menghasilkan positif.",
          },
        },

        // Layar 6: Sandbox Bebas (SANDBOX)
        {
          id: "step-6-sandbox",
          type: "sandbox",
          title: "Laboratorium Eksperimen Bebas",
          audioNarrationText: "Eksplorasi seluruh parameter tanpa batas waktu atau penilaian.",
          naiDialogue: "Kini kendali penuh ada di tanganmu. Ujilah angka-angka ekstrim!",
          naiExpression: "happy",
          sandbox: {
            title: "Sandbox Eksplorasi Bebas",
            instructions: "Cobalah memasukkan nilai besar atau pecahan untuk melihat kestabilan sistem.",
            interactiveComponentSlug: "math-my-new-topic",
            initialVariables: { paramA: 5, paramB: -5 },
          },
        },

        // Layar 7: Tantangan Logika (CHALLENGE)
        {
          id: "step-7-challenge",
          type: "challenge",
          title: "Tantangan Logika",
          audioNarrationText: "Selesaikan misi ini dengan mengatur parameter kanvas ke kondisi target.",
          naiDialogue: "Buktikan kemampuanmu! Capai target yang ditentukan pada kanvas.",
          naiExpression: "teaching",
          challenge: {
            id: "challenge-lvl1",
            title: "Mencapai Titik Nol Mutlak",
            question: "Atur parameter A = 6 dan temukan nilai parameter B agar hasilnya seimbang tepat di nol!",
            targetCondition: (vars) => vars.paramA === 6 && vars.paramB === -6,
            solutionVariables: { paramA: 6, paramB: -6 },
            solutionExplanation: "Karena A = 6, maka penyeimbangnya haruslah B = -6 sehingga 6 + (-6) = 0.",
            xpReward: 40,
            hint2Static: "Pikirkan invers dari bilangan positif 6.",
          },
        },

        // Layar 8: Rangkuman & Selebrasi (REFLECT)
        {
          id: "step-8-reflect",
          type: "reflect",
          title: "Refleksi & Tingkat Selesai",
          audioNarrationText: "Selamat! Kamu telah menyelesaikan tingkat ini dengan penalaran mandiri.",
          naiDialogue: "Luar biasa! Kamu berhasil menemukan prinsip ini tanpa menghafal!",
          naiExpression: "celebrating",
          reflect: {
            title: "Tingkat 1 Tuntas: Invers & Penyeimbang",
            takeaways: [
              "Setiap bilangan memiliki pasangan invers penjumlahan yang menjadikannya nol.",
              "Operasi tanda minus secara geometris adalah pembalikan arah sebesar 180 derajat.",
            ],
            connectionText: "Pada tingkat berikutnya, kita akan mempelajari bagaimana konsep ini berkembang ke perkalian dan dilatasi!",
            xpReward: 30,
            nextLevelTitle: "Tingkat 2",
          },
        },
      ],
    },
  ],
};
```

---

### Tahap 4: Integrasi ke Playground Runner (`ModulePlaygroundEmbed.tsx`)

Buka `src/components/learning/ModulePlaygroundEmbed.tsx` dan tambahkan penanganan untuk slug modul baru:

1. **Import komponen**:
   ```tsx
   import { Canvas as MyCanvas } from "@/modules/math/math-my-new-topic/Canvas";
   import { Controls as MyControls } from "@/modules/math/math-my-new-topic/Controls";
   import { KaTeXFormula as MyKaTeX } from "@/modules/math/math-my-new-topic/KaTeXFormula";
   import { TopicState as MyState } from "@/modules/math/math-my-new-topic/engine";
   ```

2. **Daftarkan State**:
   ```tsx
   const [myState, setMyState] = useState<MyState>({
     paramA: initialVariables.paramA ?? 1,
     paramB: initialVariables.paramB ?? 1,
   });
   ```

3. **Sinkronisasi Variabel Eksternal (Hint / AutoSolver)**:
   ```tsx
   useEffect(() => {
     if (!externalVariables) return;
     if (slug === "math-my-new-topic") {
       setMyState((prev) => ({
         ...prev,
         paramA: externalVariables.paramA ?? prev.paramA,
         paramB: externalVariables.paramB ?? prev.paramB,
       }));
     }
   }, [externalVariables, slug]);
   ```

4. **Kirim Perubahan Variabel ke Runner**:
   ```tsx
   useEffect(() => {
     if (slug === "math-my-new-topic" && onVariablesChange) {
       onVariablesChange({
         paramA: myState.paramA,
         paramB: myState.paramB,
       });
     }
   }, [myState, slug, onVariablesChange]);
   ```

5. **Render Cabang Mode Compact & Standar**:
   ```tsx
   if (slug === "math-my-new-topic") {
     if (compact) {
       return (
         <div className="w-full flex flex-col gap-2">
           <MyKaTeX state={myState} />
           <div className="w-full bg-neutral-900/90 border border-neutral-800 rounded-2xl p-2 shadow-lg flex items-center justify-center min-h-[160px] max-h-[220px] md:max-h-[300px]">
             <MyCanvas state={myState} />
           </div>
         </div>
       );
     }
     return (
       <div className="w-full flex flex-col gap-2.5">
         <MyKaTeX state={myState} />
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
           <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 shadow-lg flex items-center justify-center min-h-[240px] md:min-h-[320px]">
             <MyCanvas state={myState} />
           </div>
           <div className="lg:col-span-5 flex flex-col gap-3">
             {challengeSidebar && <div>{challengeSidebar}</div>}
             <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-lg max-h-[440px] overflow-y-auto">
               <MyControls
                 state={myState}
                 onChange={setMyState}
                 onReset={() => setMyState({ paramA: 1, paramB: 1 })}
               />
             </div>
           </div>
         </div>
       </div>
     );
   }
   ```

---

### Tahap 5: Pendaftaran ke Registry Global (`registry.ts`)

Buka `src/modules/registry.ts`, impor objek modul, lalu daftarkan ke `TOPIC_MODULES_REGISTRY`:

```typescript
import { myNewTopicModule } from "./math/math-my-new-topic/module";

export const TOPIC_MODULES_REGISTRY: Record<string, TopicModule> = {
  // Modul lainnya...
  "math-my-new-topic": myNewTopicModule,
};
```

---

### Tahap 6: Halaman Topik & Peta Level (`src/app/topics/[slug]/page.tsx`)

Buat berkas rute beranda topik di `src/app/topics/math-my-new-topic/page.tsx`:

```tsx
import React from "react";
import { notFound } from "next/navigation";
import { getTopicModule } from "@/modules/registry";
import { LevelMap } from "@/components/learning/LevelMap";

export const metadata = {
  title: "Eksplorasi Konsep Baru | Nalar",
  description: "Pelajari konsep baru melalui visualisasi kanvas interaktif dan tantangan penalaran.",
};

export default function TopicPage() {
  const moduleData = getTopicModule("math-my-new-topic");
  if (!moduleData) notFound();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          {moduleData.domain}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{moduleData.title}</h1>
        <p className="text-sm text-neutral-400 max-w-2xl">{moduleData.description}</p>
      </div>

      {/* Peta Level & Status Tingkat yang Terbuka */}
      <LevelMap
        topicSlug="math-my-new-topic"
        topicTitle={moduleData.title}
        levels={moduleData.levels}
      />
    </div>
  );
}
```

> [!TIP]
> Navigasi tingkat (seperti `http://localhost:3000/topics/math-my-new-topic/tk-xxxxxx`) ditangani secara otomatis oleh runner dinamis di `src/app/topics/[slug]/[level]/page.tsx`.

---

### Tahap 7: Integrasi ke Pohon Keterampilan (*Skill Tree*)

Buka `src/lib/curriculum/math-tree.ts` (atau `science-tree.ts`), lalu tambahkan simpul topik baru dengan relasi prasyaratnya:

```typescript
{
  id: "math-my-new-topic",
  slug: "math-my-new-topic",
  title: "Eksplorasi Konsep Baru",
  domain: "math",
  difficulty: "beginner",
  summary: "Simulasi interaktif konsep baru.",
  prerequisites: ["math-real-numbers-line"],
  position: { x: 200, y: 350 },
}
```

---

## 4. Spesifikasi 8 Tipe Layar *Guided Discovery*

Setiap langkah dalam modul menggunakan salah satu dari kontrak berikut:

| Tipe (`type`) | Properti Wajib | Fungsi Pedagogi |
| :--- | :--- | :--- |
| `provoke` | `provoke: ProvokeConfig` | Memberikan fenomena kontraintuitif dan pertanyaan pemantik awal. Menggunakan `compact={true}`. |
| `predict` | `predict: PredictConfig` | Meminta pengguna berhipotesis sebelum tombol simulasi ditekan. Menggunakan `compact={true}`. |
| `guided` | `guided: GuidedConfig` | Eksplorasi terarah dengan tabel observasi parameter dan slider manual. |
| `formalize` | `formalize: FormalizeConfig` | Menyusun simbol matematika formal dengan melengkapi isian rumpang (`KaTeXView`). |
| `check` | `check: CheckConfig` | Verifikasi kilat konsep (format Benar/Salah atau Pilihan Ganda). |
| `sandbox` | `sandbox: PlaygroundConfig` | Memberikan ruang bebas bereksperimen dengan parameter ekstrim tanpa batasan target. |
| `challenge`| `challenge: ChallengeConfig` | Misi logika dengan fungsi `targetCondition(vars): boolean` dan 4 lapis petunjuk AI bertahap. |
| `reflect` | `reflect: ReflectConfig` | Ringkasan temuan kunci, perayaan kembang api (*confetti*), hadiah XP, dan jembatan ke materi berikutnya. |

---

## 5. Invarian Arsitektur & Aturan Ketat (DOs & DON'Ts)

### 🟢 Strict DOs
1. **Pemisahan Rumus**: Selalu letakkan rumus di `src/lib/math-engine/` atau `src/lib/science-engine/`. Komponen React hanya bertugas menerima parameter dan merender tampilan.
2. **Defensive Math**: Wajib mengantisipasi $\frac{1}{0}$, $\pm\infty$, dan `NaN`. Gunakan nilai fallback yang aman.
3. **Pembersihan Resource**: Pastikan `cancelAnimationFrame`, `clearTimeout`, dan listener dibersihkan pada fungsi *cleanup* `useEffect`.
4. **Layout Responsif Mobile**: Gunakan kelas pembungkus `overflow-y-auto md:overflow-hidden` agar pengguna ponsel dapat menggulir halaman secara alami tanpa memicu *horizontal scrollbar*.
5. **Aksesibilitas Slider**: Berikan atribut `aria-label`, `min`, `max`, dan `step` pada setiap elemen input slider.

### 🔴 Strict DON'Ts
1. **JANGAN membuat file monolitik >250 baris**: Pecah berkas menjadi `Canvas.tsx`, `Controls.tsx`, `KaTeXFormula.tsx`, dan `module.ts`.
2. **JANGAN mengalokasikan objek baru dalam loop render 60 FPS**: Hindari `new Vector()` atau pembuatan array baru berulang di dalam siklus animasi kanvas untuk mencegah *garbage collector freeze*.
3. **JANGAN menggunakan CSS inline acak**: Gunakan kelas utilitas Tailwind CSS (`bg-neutral-950`, `text-neutral-100`, `border-neutral-800`).
4. **JANGAN memanggil API LLM secara otomatis pada setiap render**: Panggilan AI tutor Nai hanya terjadi saat aksi pengguna (klik tombol petunjuk atau gagal menjawab tantangan logika 2 kali berturut-turut).

---

## 6. Contoh Berkas MDX (`example.mdx`)

Setiap modul baru wajib menyertakan berkas `example.mdx` di dalam foldernya sebagai contoh dokumentasi penggunaan komponen:

```mdx
# Dokumentasi Penggunaan Komponen: Eksplorasi Konsep Baru

Komponen ini dapat disematkan ke dalam artikel edukasi berbasis MDX menggunakan kode berikut:

import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { KaTeXFormula } from "./KaTeXFormula";

<div className="my-6 p-4 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
  <KaTeXFormula state={{ paramA: 3, paramB: 2 }} />
  <Canvas state={{ paramA: 3, paramB: 2 }} />
</div>

## Konsep yang Diajarkan
1. Invers penjumlahan dan simetri titik nol.
2. Perilaku geometris saat nilai parameter bernilai negatif.
```

---

## 7. Checklist Definition of Done (DoD) & Perintah Verifikasi

Sebelum menyatakan penambahan modul selesai, pastikan Anda telah memverifikasi hal berikut:

- [ ] Logika matematika murni memiliki unit test dengan 100% kasus uji lolos (`pnpm test`).
- [ ] TypeScript terkompilasi bersih tanpa *type error* (`pnpm typecheck`).
- [ ] Modul terdaftar di `TOPIC_MODULES_REGISTRY` dan `ModulePlaygroundEmbed.tsx`.
- [ ] Mode `compact` berfungsi dengan baik pada layar *Provoke* dan *Predict*.
- [ ] Rumus matematika di layar *Formalize* dirender dengan KaTeX secara visual (bukan teks LaTeX mentah).
- [ ] Tata letak diuji pada viewport desktop (1536×730) dan mobile (390×844) tanpa *horizontal overflow*.
- [ ] Berkas contoh `example.mdx` telah disertakan di direktori modul.

### Perintah Pengujian Lokal:
```bash
# 1. Pengecekan tipe data TypeScript
pnpm typecheck

# 2. Menjalankan semua unit test
pnpm test

# 3. Menjalankan server dev lokal
pnpm dev
```
