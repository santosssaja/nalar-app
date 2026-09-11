# 📐 Nalar: Arsitektur Teknis Modul Matematika Interaktif

Dokumen ini mendefinisikan standar arsitektur teknis, pola komponen, serta panduan rekayasa perangkat lunak untuk modul pembelajaran matematika pada platform **Nalar**.

---

## 1. Filosofi Desain Pengalaman Belajar (*Learning Experience Design*)

Agar platform tidak menjadi sekadar repositori teks rumus, setiap modul wajib mematuhi rantai pedagogi:

```
[1. Hook Fenomena / Analogi]
         │ (Visualisasi intuitif tanpa rumus menakutkan)
         ▼
[2. Manipulasi Parameter Langsung]
         │ (Pengguna menggeser slider / menyeret titik di kanvas)
         ▼
[3. Formalisasi Simbolik Reaktif]
         │ (Rumus KaTeX sinkron seketika dengan angka di kanvas)
         ▼
[4. Tantangan Logika Interaktif]
           (Masalah diselesaikan dengan menyetel kanvas ke kondisi target)
```

---

## 2. Struktur Modul & Pemisahan Kepentingan (*Separation of Concerns*)

Setiap modul topik diorganisasikan secara modular dalam direktori `src/modules/math/<topic-slug>/`:

```text
src/modules/math/<topic-slug>/
├── types.ts              # Antarmuka TypeScript spesifik modul (State, Variables)
├── content.ts            # Teks narasi, analogi konsep, deskripsi audio, data tantangan
├── Canvas.tsx            # Komponen visualisasi interaktif (Mafs / SVG dinamis)
├── Controls.tsx          # Panel slider dan pengatur parameter
├── Challenge.tsx         # Antarmuka kuis dan validasi kondisi target
├── example.mdx           # Dokumentasi dan contoh penggunaan komponen dalam artikel MDX
└── index.ts              # Barrel export untuk kemudahan integrasi
```

### Logika Matematika Murni (*Math Engine*)
Semua rumus dan komputasi murni **wajib dipisahkan** ke dalam `src/lib/math-engine/<topic>.ts` sebagai *pure functions* tanpa ketergantungan DOM atau React, agar dapat diuji secara unit (*unit-testable*):

- `src/lib/math-engine/linear-algebra.ts` (determinan 2D, transformasi matriks, validasi numerik).
- `src/lib/math-engine/number-theory.ts` (aritmetika jam modulo, coprime, faktorisasi prima, titik lingkaran polar).

---

## 3. Pustaka & Peran Teknologi Visual

| Kebutuhan Visual | Pustaka Terpilih | Penggunaan dalam Modul |
| :--- | :--- | :--- |
| **Bidang Kartesius & Aljabar Linear 2D** | **Mafs** (React math visualizer) | Transformasi matriks, vektor basis $\hat{i}$ dan $\hat{j}$, garis singgung kurva, poligon paralelogram. |
| **Diagram Geometri & Aritmetika Jam** | **SVG Dinamis** | Lingkaran modulo jam, busur kardioid, fraktal perkalian modular. |
| **Graf & Struktur Pohon Keterampilan** | **@xyflow/react** (React Flow) | Peta kurikulum non-linear (*Skill Tree*) dan simpul materi terhubung. |
| **Render Formula Matematika** | **KaTeX** | Simbol matematika cepat sisi klien dan SSR (`$formula$` dan `$$formula$$`). |
| **Perhitungan Numerik Berat** | **Math.js & Web Workers** | Perhitungan inversi matriks besar atau simulasi berulang (>16 ms per frame). |

---

## 4. Invarian Arsitektur & Aturan Ketat (*Engineering Guardrails*)

### A. Isolasi Render (*Isolated UI State*)
- Perubahan parameter slider di dalam kanvas **hanya boleh merender ulang kanvas target**, bukan seluruh tata letak halaman pembungkus.
- Gunakan *state* lokal di tingkat modul atau pengontrol terisolasi untuk menghindari *re-render* yang tidak perlu pada elemen teks statis.

### B. Pertahanan Numerik (*Defensive Math Calculations*)
- Berikan penanganan defensif terhadap nilai tak hingga ($\pm\infty$), pembagian dengan nol, dan nilai `NaN`:
  ```typescript
  // Contoh penanganan aman pada kalkulasi kemiringan / rasio
  export function safeRatio(numerator: number, denominator: number, fallback = 0): number {
    if (Math.abs(denominator) < 1e-9 || isNaN(denominator)) return fallback;
    const result = numerator / denominator;
    return isFinite(result) ? result : fallback;
  }
  ```

### C. Alokasi Memori & Siklus Hidup Kanvas
- **Dilarang** membuat objek baru di dalam loop animasi atau hook per-frame untuk mencegah *garbage collector freeze*.
- Selalu bersihkan *event listener* dan timer pada *cleanup function* di dalam `useEffect`.

### D. Aksesibilitas Terpadu Kanvas
- Setiap slider dan kontrol interaktif wajib memiliki:
  - `aria-label` yang deskriptif.
  - Nilai minimum (`min`), maksimum (`max`), dan langkah (`step`).
  - Dukungan navigasi keyboard penuh (panah kiri/kanan, Home/End).
  - Teks deskripsi alternatif untuk pembaca layar (*screen reader*).

---

## 5. Panduan Praktis: Menambahkan Modul Topik Baru

Ikuti langkah-langkah berikut saat mengembangkan materi matematika baru:

### Langkah 1: Definisikan Rumus Murni & Buat Unit Test
Buat fungsi independen di `src/lib/math-engine/<new-topic>.ts`:
```typescript
export function calculateTopicValue(paramA: number, paramB: number): number {
  // Pure math logic
  return paramA * paramB;
}
```
Tambahkan tes unit di `src/lib/math-engine/<new-topic>.test.ts` dan pastikan `npm test` lolos.

### Langkah 2: Buat Konten & Spesifikasi Tantangan
Buat `src/modules/math/<new-topic>/content.ts`:
```typescript
import { TopicLesson } from "@/types/topic";

export const topicData: TopicLesson = {
  id: "new-topic-id",
  slug: "new-topic-slug",
  title: "Judul Topik Baru",
  category: "math",
  summary: "Ringkasan konsep dalam 2-3 kalimat...",
  audioNarrationText: "Teks narasi untuk Web Speech API...",
  initialVariables: { x: 1, y: 1 },
  challenges: [
    {
      question: "Atur parameter agar nilai mencapai target X",
      targetCondition: (vars) => vars.x === 5,
      hintText: "Coba tingkatkan variabel x..."
    }
  ]
};
```

### Langkah 3: Bangun Komponen Visual (Canvas & Controls)
- Implementasikan `Canvas.tsx` menggunakan **Mafs** atau **SVG dinamis**.
- Pastikan ukuran berkas komponen tidak melebihi **250 baris kode** (pecah menjadi sub-komponen jika diperlukan sesuai `AGENTS.md`).

### Langkah 4: Rangkai pada Halaman Rute
Buat halaman di `src/app/topics/<new-topic-slug>/page.tsx` dengan memanfaatkan `AccessibilityContext` dan `GamificationContext`.

### Langkah 5: Sediakan Berkas Contoh MDX
Sertakan `example.mdx` di folder modul untuk memperlihatkan bagaimana komponen interaktif dapat disematkan di dalam artikel edukasi berbasis teks.
