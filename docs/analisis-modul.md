# Analisis Modul: Kesenjangan Ekspektasi vs Realita

> Peta lengkap modul yang ada, yang direncanakan, dan analisis mendalam kualitas konten serta pola penyampaian materi.
> **Terakhir diperbarui**: 15 Sep 2026

---

## Ringkasan Eksekutif

| Dimensi | Status | Verdict |
|---|---|---|
| **MVP Completeness** | 15/34 modul (44%) | Separuh learning path terputus |
| **Pedagogical Compliance** | 4/15 modul (27%) | 11 modul masih pakai pola legacy |
| **Content Depth** | 4 modul kaya, 11 modul dangkal | Gap kualitas sangat lebar |
| **Challenge Quality** | 60% slider-manipulation | Kurang pemahaman konseptual |
| **Cross-Module Links** | Hanya 4 modul punya | 11 modul isolated |
| **Step Types Used** | 8 tersedia, 4 dipakai rata-rata | 60% fitur pedagogis unused |

**Masalah utama bukan hanya "kurang modul" — tapi 11 dari 15 modul yang ada menggunakan arsitektur legacy yang secara struktural tidak bisa menyampaikan materi dengan optimal.**

---

## 1. Dua Arsitektur Konten: Kaya vs Dangkal

Codebase punya **dua arsitektur konten** yang sangat berbeda:

### Arsitektur Level-Based (Kaya) — 4 modul

```
Level1.ts ─┐
Level2.ts ─┤
Level3.ts ─┼→ module.ts → TopicModule { levels: [level1, ...] }
Level4.ts ─┤
Level5.ts ─┤
Level6.ts ─┘
```

**Setiap level punya 8 step types:**
```
provoke → predict → guided → formalize → check → sandbox → challenge → reflect
```

| Modul | Levels | Total Steps | Content Lines |
|---|---|---|---|
| math-primes-coprime | 6 | 48 | ~1,148 |
| math-real-numbers-line | 5 | 40 | ~950 |
| arithmetic-modular-clock | 6 | 48 | ~1,214 |
| math-euclid | 6 | 48 | ~1,203 |

**Rata-rata: ~1,129 baris konten pedagogis per modul.**

### Arsitektur TopicLesson (Dangkal) — 11 modul

```
content.ts → TopicLesson { challenges: [3 items] }
```

**Hanya punya 1 step type: `challenge`** — tidak ada provoke, predict, guided, formalize, check, sandbox, atau reflect.

| Modul | Challenges | Content Lines |
|---|---|---|
| math-calculus-riemann | 3 | 61 |
| math-calculus-tangent | 3 | 59 |
| math-trig-unit-circle | 3 | 60 |
| linear-algebra-determinant-2d | 3 | 65 |
| physics-wave-simulator | 3 | 80 |
| physics-dc-circuits | 3 | 95 |
| physics-electric-field | 3 | 89 |
| physics-harmonic-oscillator | 3 | 80 |
| physics-projectile-motion | 3 | 66 |
| physics-roller-coaster | 3 | 79 |
| physics-newton-incline | 3 | 86 |

**Rata-rata: ~75 baris konten per modul — 15x lebih tipis dari arsitektur Level-Based.**

---

## 2. Analisis Step Types: Fitur Pedagogis yang Unused

### 8 Step Types yang Tersedia

| Step | Screen | Tujuan Pedagogis | Siapa yang Pakai? |
|---|---|---|---|
| `provoke` | ProvokeScreen | Hook engagement — "kenapa ini penting?" | 4 modul only |
| `predict` | PredictScreen | Hipotesis sebelum melihat simulasi | 4 modul only |
| `guided` | GuidedScreen | Eksplorasi terstruktur dengan tabel observasi | 4 modul only |
| `formalize` | FormalizeScreen | Konstruksi rumus KaTeX (fill-in-the-blanks) | 4 modul only |
| `check` | CheckScreen | Verifikasi pemahaman sebelum tantangan | 4 modul only |
| `sandbox` | PlaygroundStep | Eksplorasi bebas tanpa target | 4 modul only |
| `challenge` | ChallengeStep | Aplikasi problem-solving | **15 modul** |
| `reflect` | ReflectScreen | Takeaways + koneksi ke modul lain | 4 modul only |

### Distribusi Step Types per Modul

```
Modul Level-Based (✅ optimal):
  provoke ████████████████ 6/6 levels
  predict ████████████████ 6/6 levels
  guided  ████████████████ 6/6 levels
  formalize ████████████████ 6/6 levels
  check   ████████████████ 6/6 levels
  sandbox ████████████████ 6/6 levels
  challenge ████████████████ 6/6 levels
  reflect ████████████████ 6/6 levels

Modul Legacy (❌ dangkal):
  provoke ░░░░░░░░░░░░░░░░ 0/3 levels
  predict ░░░░░░░░░░░░░░░░ 0/3 levels
  guided  ░░░░░░░░░░░░░░░░ 0/3 levels
  formalize ░░░░░░░░░░░░░░░░ 0/3 levels
  check   ░░░░░░░░░░░░░░░░ 0/3 levels
  sandbox ░░░░░░░░░░░░░░░░ 0/3 levels
  challenge ████████████████ 3/3 levels ← satu-satunya yang ada
  reflect ░░░░░░░░░░░░░░░░ 0/3 levels
```

**Dampak**: 11 modul legacy hanya bisa "langsung ke tantangan" tanpa membangun pemahaman terlebih dahulu. Siswa tidak perlu memprediksi, tidak perlu mengeksplorasi, tidak perlu memformalkan — langsung disuruh menyelesaikan masalah.

---

## 3. Analisis Mendalam per Modul

### 3.1 Math — Level-Based (Kaya)

#### math-primes-coprime — Score: 10/10

| Aspek | Detail |
|---|---|
| **Levels** | 6 (Atom Bilangan → Eratosthenes → Koprima → Euler → Fermat → Boss) |
| **Steps/Level** | 8 (provoke → predict → guided → formalize → check → sandbox → challenge → reflect) |
| **Real-World** | RSA cryptography, Enigma machine, blockchain |
| **Historical** | Eratosthenes, Fermat, Euler, RSA inventors |
| **Cross-Module** | → Modular Clock, → Euclid, → Cryptography |
| **Challenge Quality** | Mix: beberapa slider (N=17), beberapa konseptual (totient, Fermat) |
| **Improvement** | Kurangi slider challenges, tambah reasoning-based challenges |

#### math-real-numbers-line — Score: 9/10

| Aspek | Detail |
|---|---|
| **Levels** | 5 (Translasi → Skala → Pecahan → Irasional → Aljabar) |
| **Steps/Level** | 8 |
| **Real-World** | SAR search (jarak), distributif area |
| **Historical** | Pythagoras (√2 crisis), kontinuitas bilangan |
| **Cross-Module** | → Modular Clock |
| **Challenge Quality** | Mix: distance=9 (conceptual), scale k=-2 (geometric), √5 (slider) |
| **Improvement** | Tambah real-world contexts di skala dan pecahan |

#### arithmetic-modular-clock — Score: 9/10

| Aspek | Detail |
|---|---|
| **Levels** | 6 (Modulo 12 → Modulo N → Kardioid → Fibonacci → Generator → Boss) |
| **Steps/Level** | 8 |
| **Real-World** | Clock arithmetic, kardioid patterns, cryptography |
| **Historical** | Ancient modular systems, Mandelbrot set |
| **Cross-Module** | → Euclid, → Primes (coprime) |
| **Challenge Quality** | Mix: clock addition (conceptual), kardioid (slider), generator (GCD reasoning) |
| **Improvement** | Kardioid challenge terlalu slider-heavy |

#### math-euclid — Score: 8/10

| Aspek | Detail |
|---|---|
| **Levels** | 6 (Tile Concepts → Reduction → GCD/LCM → Bézout → Fibonacci → Boss) |
| **Steps/Level** | 8 |
| **Real-World** | Floor tiling, carpet cutting, rectangular packaging |
| **Historical** | Euclid's Elements, Fibonacci sequence |
| **Cross-Module** | → GCD, LCM, Bézout identity |
| **Challenge Quality** | mostly conceptual (tiling, GCD, Fibonacci coprime) |
| **Improvement** | Tambah real-world contexts lebih banyak |

---

### 3.2 Math — Legacy (Dangkal)

#### math-calculus-riemann — Score: 6/10

| Aspek | Detail |
|---|---|
| **Architecture** | TopicLesson — 3 challenges only |
| **content.ts** | 61 baris |
| **Challenges** | "Naikkan n hingga error < 3%", "Pilih metode midpoint", "Hitung error sin(x)" |
| **Real-World** | ❌ Tidak ada |
| **Historical** | ❌ Tidak ada (Riemann tidak disebut) |
| **Pedagogical Flow** | ❌ explanation → playground → challenge → validation (legacy) |
| **Missing Steps** | provoke, predict, guided, formalize, check, reflect |

**Masalah Inti**: Tidak ada konteks "kenapa Riemann sum penting?" — langsung ke "geser slider n". Siswa tidak tahu bahwa Riemann sum adalah fondasi kalkulus integral yang digunakan GPS, curah hujan, dan luas lahan.

**Improvement Required**:
- Tambah `provoke`: "Bagaimana GPS menghitung jarak tempuh? Setiap belokan adalah kurva."
- Tambah `predict`: "Jika n digandakan, error berubah berapa kali?"
- Tambah `formalize`: KaTeX rumus Riemann sum
- Tambah `reflect`: Koneksi ke Kalkulus Integral

#### math-calculus-tangent — Score: 6/10

| Aspek | Detail |
|---|---|
| **Architecture** | TopicLesson — 3 challenges only |
| **content.ts** | 59 baris |
| **Challenges** | "Hitung f'(a)=4", "Temukan horizontal tangent", "Atur Δx ≤ 0.05" |
| **Real-World** | ❌ Tidak ada |
| **Historical** | ❌ Tidak ada (Newton/Leibniz tidak disebut) |
| **Missing Steps** | provoke, predict, guided, formalize, check, reflect |

**Improvement Required**:
- Tambah `provoke`: "Kecepatan instan mobil di speedometer — itu adalah turunan."
- Tambah `predict`: "Jika grafik makin curam, turunannya makin...?"
- Tambah `reflect`: Koneksi ke Riemann Sum (integral adalah invers turunan)

#### math-trig-unit-circle — Score: 6/10

| Aspek | Detail |
|---|---|
| **Architecture** | TopicLesson — 3 challenges only |
| **content.ts** | 60 baris |
| **Challenges** | "sin=cos di 45°", "tan undefined", "sin=-0.5 di Q3" |
| **Real-World** | ❌ Tidak ada |
| **Historical** | ❌ Tidak ada (Hipparchus/Ptolemy tidak disebut) |
| **Missing Steps** | provoke, predict, guided, formalize, check, reflect |

**Improvement Required**:
- Tambah `provoke`: "Gelombang suara, cahaya, dan air — semuanya trigonometri."
- Tambah `predict`: "Jika sudut makin besar dari 0° ke 90°, sin naik atau turun?"
- Tambah `reflect`: Koneksi ke Wave Simulator

#### linear-algebra-determinant-2d — Score: 7/10

| Aspek | Detail |
|---|---|
| **Architecture** | TopicLesson — 3 challenges only |
| **content.ts** | 65 baris |
| **Challenges** | "Det=2 (area scaling)", "Det=0 (singular)", "Det<-1 (reflection)" |
| **Real-World** | ⚠️ Ada di challenge (area transformation) |
| **Historical** | ❌ Tidak ada |
| **Missing Steps** | provoke, predict, guided, formalize, check, reflect |
| **Catatan** | Challenge quality lebih baik dari modul lain — ada konsep singularity dan orientasi |

---

### 3.3 Science — Legacy (Dangkal)

**Semua 7 physics module punya masalah yang SAMA:**

| Modul | content.ts Lines | Challenges | Real-World | Historical | Missing Steps |
|---|---|---|---|---|---|
| physics-wave-simulator | 80 | 3 | ⚠️ ANC headphones | ⚠️ Young's double slit | 6/8 |
| physics-dc-circuits | 95 | 3 | ✅ Circuit design | ✅ Ohm, Kirchhoff | 6/8 |
| physics-electric-field | 89 | 3 | ❌ | ❌ | 6/8 |
| physics-harmonic-oscillator | 80 | 3 | ✅ Pendulum clocks | ✅ Hooke's law | 6/8 |
| physics-projectile-motion | 66 | 3 | ✅ Ballistics | ✅ Galileo | 6/8 |
| physics-roller-coaster | 79 | 3 | ✅ Loop engineering | ✅ Conservation | 6/8 |
| physics-newton-incline | 86 | 3 | ✅ Block sliding | ✅ Newton | 6/8 |

**Masalah Struktural**: Semua physics module menggunakan `content.ts` dengan hanya 3 `challenges` — tidak ada `provoke`, `predict`, `guided`, `formalize`, `check`, `sandbox`, atau `reflect`. Siswa langsung disuruh "atur slider sampai angka benar" tanpa konteks.

**Contoh Konkret — physics-electric-field**:

```
Current flow:
  explanation (text about Coulomb) → playground (slider) → challenge (set F=0.054N) → validation (badge)

Optimal flow:
  provoke: "Layar sentuh iPhone bekerja karena jari kamu mengubah medan listrik"
  predict: "Jika muatan digandakan, gaya berubah berapa kali?"
  guided: "Eksplorasi Coulomb force dengan tabel observasi F vs r"
  formalize: "F = kq₁q₂/r² — isi blank KaTeX"
  check: "Pilih pernyataan yang benar tentang medan listrik"
  sandbox: "Bebas eksplorasi — letakkan muatan di mana saja"
  challenge: "Buat konfigurasi dipole yang menghasilkan titik nol"
  reflect: "Medan listrik adalah fondasi: LED, kapasitor, processor"
```

---

## 4. Analisis Kualitas Challenge

### Distribusi Tipe Challenge

| Tipe | Jumlah | Persentase | Contoh |
|---|---|---|---|
| **Slider manipulation** | 27 | 60% | "Atur n ≥ 30", "Set F = 0.054N" |
| **Multi-choice reasoning** | 9 | 20% | "Pilih metode paling efisien" |
| **Multi-slider config** | 5 | 11% | "Atur A=3, B=4, C=2" |
| **Conceptual prediction** | 4 | 9% | "Prediksi jika n digandakan..." |

### Challenge Quality per Modul

| Modul | Challenge 1 | Challenge 2 | Challenge 3 | Quality |
|---|---|---|---|---|
| **primes-coprime** | ⚠️ Slider N=17 | ⚠️ Slider twin prime | ⚠️ Slider coprime | Low |
| **real-numbers-line** | ✅ Distance reasoning | ✅ Geometric scaling | ⚠️ Slider √5 | Medium |
| **modular-clock** | ✅ Clock reasoning | ⚠️ Slider kardioid | ✅ GCD coprime | Medium |
| **euclid** | ✅ Tiling reasoning | ✅ GCD choice | ✅ Fibonacci proof | High |
| **riemann** | ⚠️ Slider n | ✅ Method comparison | ✅ Multi-step error | Medium |
| **tangent** | ✅ Derivative calc | ✅ Critical point | ⚠️ Slider Δx | Medium |
| **trig** | ✅ Identity reasoning | ✅ Asymptote concept | ✅ Quadrant reasoning | High |
| **determinant** | ✅ Area scaling | ✅ Singularity | ✅ Orientation | High |
| **wave** | ⚠️ Slider f,λ | ✅ Phase reasoning | ✅ Superposition | Medium |
| **dc-circuits** | ✅ Ohm's law | ✅ Parallel reasoning | ✅ Multi-step | High |
| **electric-field** | ⚠️ Slider config | ✅ Vector cancellation | ✅ Field direction | Medium |
| **harmonic** | ✅ Period formula | ✅ Frequency calc | ✅ Energy formula | Medium |
| **projectile** | ✅ Optimization | ✅ sin(2θ) property | ✅ Multi-variable | High |
| **roller-coaster** | ✅ Critical condition | ✅ Energy conservation | ✅ Force analysis | High |
| **newton-incline** | ✅ Friction analysis | ✅ Ideal case | ✅ Kinematics chain | High |

**Insight**: Challenge quality di physics modules sebenarnya BAIK (kebanyakan conceptual) — masalahnya adalah TIDAK ADA scaffold sebelum challenge. Siswa langsung disuruh menyelesaikan masalah kompleks tanpa persiapan.

---

## 5. Masalah Struktural: Learning Path Terputus

### Skill Tree Gap

```
Math Track 3 (Fungsi & Kalkulus):
  [❌] Aljabar Elementer
  └─→ [❌] Fungsi & Grafik
       └─→ [❌] Limit & Kekontinuan
            └─→ [✅] Kalkulus Diferensial ← TERPUTUS!
                 └─→ [✅] Kalkulus Integral
```

**Dampak**: Siswa yang menyelesaikan `math-real-numbers-line` tidak bisa unlock `math-differential-calculus` karena 3 prerequisite belum ada. Learning path benar-benar terputus.

### Modul Tanpa Prerequisite Check

| Modul | Seharusnya Unlock | Actual |
|---|---|---|
| math-calculus-riemann | math-limits-continuity | ❌ Tidak di-enforce |
| math-calculus-tangent | math-limits-continuity | ❌ Tidak di-enforce |
| physics-dc-circuits | physics-electric-field | ❌ Tidak di-enforce |

---

## 6. Rekomendasi: Roadmap Perbaikan

### Prioritas 1: Upgrade 11 Modul Legacy ke Level-Based Architecture

**Target**: Konversi semua modul `TopicLesson` (3 challenges) ke `Level-Based` (6 levels × 8 steps).

| Modul | Current | Target | Estimasi |
|---|---|---|---|
| math-calculus-riemann | 61 baris, 3 challenges | ~950 baris, 5 levels × 8 steps | 2 hari |
| math-calculus-tangent | 59 baris, 3 challenges | ~950 baris, 5 levels × 8 steps | 2 hari |
| math-trig-unit-circle | 60 baris, 3 challenges | ~950 baris, 5 levels × 8 steps | 2 hari |
| linear-algebra-determinant-2d | 65 baris, 3 challenges | ~950 baris, 5 levels × 8 steps | 2 hari |
| physics-wave-simulator | 80 baris, 3 challenges | ~950 baris, 5 levels × 8 steps | 2 hari |
| physics-dc-circuits | 95 baris, 3 challenges | ~950 baris, 5 levels × 8 steps | 2 hari |
| physics-electric-field | 89 baris, 3 challenges | ~950 baris, 5 levels × 8 steps | 2 hari |
| physics-harmonic-oscillator | 80 baris, 3 challenges | ~950 baris, 5 levels × 8 steps | 2 hari |
| physics-projectile-motion | 66 baris, 3 challenges | ~950 baris, 5 levels × 8 steps | 2 hari |
| physics-roller-coaster | 79 baris, 3 challenges | ~950 baris, 5 levels × 8 steps | 2 hari |
| physics-newton-incline | 86 baris, 3 challenges | ~950 baris, 5 levels × 8 steps | 2 hari |

**Total**: ~22 hari untuk upgrade 11 modul.

### Prioritas 2: Improve Challenge Quality

**Template Challenge Baru**:

```typescript
// Level 1: Conceptual Prediction
{
  type: "challenge",
  challenge: {
    title: "Prediksi Konseptual",
    question: "Jika parameter X digandakan, apa yang terjadi pada Y? Jelaskan mengapa.",
    targetCondition: (vars) => /* reasoning-based check */,
    hintText: "Ingat rumus Y = f(X)...",
    xpReward: 30,
  }
}

// Level 2: Method Comparison
{
  type: "challenge",
  challenge: {
    title: "Perbandingan Metode",
    question: "Metode mana yang paling efisien untuk kasus ini? Mengapa?",
    targetCondition: (vars) => /* choice-based check */,
    xpReward: 40,
  }
}

// Level 3: Real-World Application
{
  type: "challenge",
  challenge: {
    title: "Aplikasi Dunia Nyata",
    question: "Gunakan konsep ini untuk menyelesaikan masalah berikut...",
    targetCondition: (vars) => /* multi-step check */,
    xpReward: 50,
  }
}
```

### Prioritas 3: Tambah Real-World Hooks

| Modul | Current Hook | Better Hook |
|---|---|---|
| Riemann Sum | "Bagaimana Mengukur Luas Lengkung?" | "Bagaimana GPS menghitung jarak tempuh? Setiap belokan adalah kurva — dan kurva itu diakumulasi dengan Riemann Sum." |
| Tangent | "Gradien Garis Singgung" | "Kecepatan instan mobil di speedometer — itu adalah turunan fungsi posisi terhadap waktu." |
| Trig Unit Circle | "Fungsi Trigonometri" | "Gelombang suara, cahaya, dan air — semuanya bisa dijelaskan dengan sin dan cos." |
| Determinant | "Determinan Matriks 2D" | "Matriks adalah mesin transformasi ruang. Determinan memberitahu kita apakah ruang itu terdistorsi, dibalik, atau hilang dimensi." |
| Wave Simulator | "Simulator Gelombang" | "ANC headphones membalik gelombang suara untuk menghilangkan kebisingan — dan itu fisika murni." |
| DC Circuits | "Rangkaian DC" | "Setiap rumah punya rangkaian seri dan paralel — lampu, stopkontak, MCB — semuanya mengikuti hukum Kirchhoff." |
| Electric Field | "Medan & Gaya Listrik" | "Layar sentuh iPhone kamu bekerja karena jari kamu mengubah medan listrik di setiap titik sentuh." |
| Harmonic Oscillator | "Osilasi Harmonik" | "Jam mekanik, ayunan, dan boneka goyang — semuanya mengikuti pola osilasi yang sama." |
| Projectile Motion | "Gerak Parabola" | "Tendangan penalti sepak bola adalah proyektil — sudut 45° memberikan jarak maksimum." |
| Roller Coaster | "Roller Coaster" | "Loop-the-loop roller coaster dirancang agar G-force tidak melebihi 4G — jika tidak, penumpang bisa pingsan." |
| Newton Incline | "Bidang Miring" | "Mobil di tanjakan — mengapa harus rem tangan? Karena gravitasi punya komponen sepanjang bidang." |

### Prioritas 4: Build Missing P0 Modules

| # | Modul | Prerequisite | Unlock |
|---|---|---|---|
| 1 | Aljabar Elementer | math-real-numbers-line | math-functions-graphs |
| 2 | Fungsi & Grafik | math-elementary-algebra | math-limits-continuity |
| 3 | Limit & Kekontinuan | math-functions-graphs | math-differential-calculus |
| 4 | Metode Ilmiah | (root) | sci-units-measurements |
| 5 | Besaran & Satuan | sci-scientific-method | sci-kinematics |
| 6 | Logika Proposisional | (root) | math-euclidean-geometry |

---

## 7. Definition of Done: Modul yang Diperbaiki

Setiap modul yang di-upgrade harus memenuhi:

1. ✅ Arsitektur Level-Based (bukan TopicLesson)
2. ✅ Minimal 5 levels dengan progressive difficulty
3. ✅ Setiap level punya 8 step types (provoke → reflect)
4. ✅ Minimal 1 challenge per level yang test conceptual understanding (bukan slider)
5. ✅ Real-world hook di provoke screen
6. ✅ Historical context di minimal 1 level
7. ✅ Cross-module connection di reflect screen
8. ✅ KaTeX formula di formalize screen
9. ✅ `xpReward` berasal dari content, bukan hardcoded
10. ✅ `pnpm typecheck` lolos

---

## Kesimpulan

Kesenjangan terbesar dalam Nalar bukan jumlah modul — tapi **kedalaman dan struktur penyampaian materi**. 11 dari 15 modul yang ada menggunakan arsitektur legacy yang secara struktural tidak bisa menyampaikan:

1. **Engagement** (provoke) — "kenapa ini penting?"
2. **Prediction** (predict) — "apa yang kamu pikir akan terjadi?"
3. **Guided Discovery** (guided) — "eksplorasi dengan scaffolding"
4. **Formalization** (formalize) — "tuangkan dalam rumus"
5. **Verification** (check) — "apakah kamu paham?"
6. **Reflection** (reflect) — "hubungkan dengan modul lain"

Tanpa langkah-langkah ini, siswa hanya "geser slider sampai angka benar" — tanpa pemahaman konseptual, tanpa konteks dunia nyata, tanpa koneksi antar modul.

> *"The goal is not to move sliders. The goal is to build mental models."*
