# Alur Belajar Nalar — *Guided Discovery Learning*

> **Prinsip utama:** Jangan pernah *menjelaskan* sesuatu yang bisa *ditemukan sendiri* oleh pengguna. Setiap layar harus meminta pengguna **melakukan sesuatu** — bukan membaca.

---

## Gambaran Besar

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SATU TOPIK (misal: Bidang Miring)                │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  LEVEL 1: Mengenal Gaya di Bidang Miring        (8–12 layar)    │   │
│   │  LEVEL 2: Gaya Gesek & Kesetimbangan            (8–12 layar)    │   │
│   │  LEVEL 3: Menghitung Percepatan di Bidang Miring(8–12 layar)    │   │
│   │  LEVEL 4: Sistem Katrol & Bidang Miring         (8–12 layar)    │   │
│   │  LEVEL 5: Tantangan Terbuka & Kasus Nyata       (6–8 layar)     │   │
│   │  BOSS LEVEL: Ujian Modul (semua konsep)         (5–8 soal)      │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   Total per topik: 40–60 layar interaktif                               │
│   Estimasi waktu: 2–4 jam (bisa dikerjakan dalam beberapa sesi)         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Sebelumnya:** 3 level × 4 langkah = **12 layar** → terlalu dangkal
**Sekarang:** 5 level + boss × 8–12 langkah = **40–60 layar** → kedalaman nyata

---

## Anatomi Satu Level: Siklus *Discover → Build → Apply*

Setiap level BUKAN hanya "teori → playground → soal → selebrasi". Setiap level adalah **serangkaian layar interaktif mikro** yang membimbing pengguna menemukan konsep sendiri:

### 8 Tipe Layar Interaktif

| # | Tipe Layar | Singkatan | Apa yang Dilakukan Pengguna | Learning by Doing? |
|---|-----------|-----------|----------------------------|-------------------|
| 1 | **Provokasi** | `PROVOKE` | Melihat fenomena mengejutkan → bertanya "mengapa?" | ✅ Menumbuhkan rasa ingin tahu |
| 2 | **Prediksi** | `PREDICT` | Menebak hasil sebelum simulasi dijalankan | ✅ Mengaktifkan prior knowledge |
| 3 | **Eksplorasi Terbimbing** | `GUIDED` | Menggeser slider dengan instruksi spesifik → menemukan pola | ✅ Discovery langsung |
| 4 | **Formalisasi** | `FORMALIZE` | Mengisi bagian kosong rumus berdasarkan pola yang ditemukan | ✅ Menyusun pemahaman |
| 5 | **Cek Pemahaman Cepat** | `CHECK` | Menjawab pertanyaan singkat (benar/salah, pilih gambar) | ✅ Verifikasi instan |
| 6 | **Playground Bebas** | `SANDBOX` | Bermain bebas dengan semua parameter terbuka | ✅ Eksplorasi mandiri |
| 7 | **Tantangan Kanvas** | `CHALLENGE` | Mengatur parameter kanvas untuk mencapai target spesifik | ✅ Problem solving |
| 8 | **Refleksi & Koneksi** | `REFLECT` | Nai merangkum + menghubungkan ke konsep lain | Pasif (tapi singkat) |

> [!IMPORTANT]
> Layar tipe `REFLECT` (pasif) **tidak boleh lebih dari 20%** dari total layar. Minimal 80% layar harus meminta pengguna *melakukan* sesuatu.

---

## Contoh Konkret: Topik "Bidang Miring Newton"

### Level 1: Mengenal Gaya di Bidang Miring *(10 layar)*

```
Layar 1 [PROVOKE] — "Mengapa Jalan Gunung Berkelok?"
┌─────────────────────────────────────────────────┐
│  🖼️ Foto jalan gunung berkelok-kelok             │
│                                                  │
│  Nai: "Perhatikan foto ini. Kenapa jalannya      │
│   tidak langsung lurus ke atas?"                 │
│                                                  │
│  [A] Supaya pemandangannya bagus                 │
│  [B] Supaya kendaraan tidak terlalu berat naik   │  ← user pilih
│  [C] Supaya jalannya lebih panjang               │
│                                                  │
│  (Tidak ada jawaban "salah" — semua direspon)    │
└─────────────────────────────────────────────────┘

Layar 2 [PREDICT] — "Apa yang Terjadi?"
┌─────────────────────────────────────────────────┐
│  Kanvas: Benda diam di atas bidang miring 10°   │
│                                                  │
│  Nai: "Kalau aku naikkan kemiringannya jadi 60°, │
│   menurutmu apa yang terjadi?"                   │
│                                                  │
│  [A] Benda tetap diam                            │
│  [B] Benda mulai meluncur                        │  ← user prediksi
│  [C] Benda melayang                              │
│                                                  │
│  [▶ Jalankan Simulasi] → lihat apakah tebakanmu  │
│   benar!                                         │
└─────────────────────────────────────────────────┘

Layar 3 [GUIDED] — "Temukan Sudut Kritis"
┌─────────────────────────────────────────────────┐
│  Kanvas: Bidang miring + benda                   │
│  Slider: Sudut θ (0° – 90°)                     │
│                                                  │
│  Nai: "Geser sudut perlahan dari 0° ke atas.     │
│   Pada sudut berapa benda MULAI bergerak?"       │
│                                                  │
│  Jawaban: θ = [___]°                             │
│                                                  │
│  💡 Pengguna menemukan sendiri bahwa ada          │
│     "sudut kritis" tanpa diberitahu rumusnya!    │
└─────────────────────────────────────────────────┘

Layar 4 [GUIDED] — "Apa yang Mendorong Benda Turun?"
┌─────────────────────────────────────────────────┐
│  Kanvas: Bidang miring, toggle tampilkan vektor  │
│  Checkbox: ☑ Tampilkan gaya berat (W)            │
│            ☐ Tampilkan komponen W∥               │
│            ☐ Tampilkan komponen W⊥               │
│                                                  │
│  Nai: "Centang kotak satu per satu.              │
│   Gaya mana yang SEARAH bidang miring?"          │
│                                                  │
│  [W∥ — Komponen paralel]  ← user klik            │
│  [W⊥ — Komponen tegak lurus]                     │
│  [W — Gaya berat total]                          │
│                                                  │
│  💡 User menemukan dekomposisi gaya lewat         │
│     melihat langsung, bukan diberi rumus dulu    │
└─────────────────────────────────────────────────┘

Layar 5 [GUIDED] — "Hubungan Sudut & Gaya Paralel"
┌─────────────────────────────────────────────────┐
│  Kanvas: Bidang miring + vektor W∥               │
│  Slider: Sudut θ (0° – 90°)                     │
│  Indikator: Panjang W∥ = ??? N                   │
│                                                  │
│  Nai: "Geser sudut dan perhatikan panjang W∥.    │
│   Isi tabel ini:"                                │
│                                                  │
│  | θ    | W∥ (N) |    ← user isi dari observasi  │
│  | 0°   | [___]  |    → 0                        │
│  | 30°  | [___]  |    → 24.5                     │
│  | 45°  | [___]  |    → 34.6                     │
│  | 90°  | [___]  |    → 49.0                     │
│                                                  │
│  Nai: "Lihat polanya? Angka ini berhubungan      │
│   dengan fungsi apa?" → [sin] [cos] [tan]        │
│                                                  │
│  💡 User menemukan W∥ = mg·sin(θ) SENDIRI        │
└─────────────────────────────────────────────────┘

Layar 6 [FORMALIZE] — "Rumuskan Temuanmu"
┌─────────────────────────────────────────────────┐
│  Nai: "Berdasarkan pola yang kamu temukan,       │
│   lengkapi rumus ini:"                           │
│                                                  │
│  W∥ = m × g × [____](θ)                         │
│                 ↑ pilih: sin / cos / tan          │
│                                                  │
│  W⊥ = m × g × [____](θ)                         │
│                 ↑ pilih: sin / cos / tan          │
│                                                  │
│  ✅ Benar! → Rumus KaTeX muncul lengkap:         │
│  $W_{\parallel} = mg\sin\theta$                  │
│  $W_{\perp} = mg\cos\theta$                      │
│                                                  │
│  💡 Rumus BUKAN diberikan di awal —               │
│     rumus adalah KESIMPULAN dari eksplorasi      │
└─────────────────────────────────────────────────┘

Layar 7 [CHECK] — "Cek Cepat"
┌─────────────────────────────────────────────────┐
│  Nai: "Mana yang benar?"                         │
│                                                  │
│  Jika θ bertambah...                             │
│  [A] W∥ bertambah, W⊥ berkurang  ✅              │
│  [B] W∥ berkurang, W⊥ bertambah                  │
│  [C] Keduanya bertambah                          │
│                                                  │
│  (Jawaban salah → Hint 1 → coba lagi)           │
└─────────────────────────────────────────────────┘

Layar 8 [CHALLENGE] — "Tantangan Pertama"
┌─────────────────────────────────────────────────┐
│  Kanvas: Bidang miring + benda + vektor          │
│  Slider: θ, m                                    │
│                                                  │
│  Nai: "Benda bermassa 5 kg.                      │
│   Atur sudut agar W∥ tepat = 24.5 N"            │
│                                                  │
│  Target: |W∥ - 24.5| < 0.5 N                    │
│  Status: W∥ = [realtime] N  → ✅ / ❌             │
│                                                  │
│  [Validasi Jawaban]                              │
│  (4-hint system aktif jika gagal)                │
└─────────────────────────────────────────────────┘

Layar 9 [CHALLENGE] — "Tantangan Kedua (variasi)"
┌─────────────────────────────────────────────────┐
│  Nai: "Sekarang terbalik! W∥ = 30 N, g = 9.8.   │
│   Berapa massa benda jika θ = 45°?"              │
│                                                  │
│  Input angka: m = [___] kg                       │
│  (Pengguna harus menghitung, bukan cuma geser)   │
│                                                  │
│  💡 Ini melatih arah sebaliknya: dari rumus       │
│     menghitung, bukan hanya menemukan pola       │
└─────────────────────────────────────────────────┘

Layar 10 [REFLECT] — "Apa yang Kita Pelajari"
┌─────────────────────────────────────────────────┐
│  Nai: "Level 1 selesai! 🎉 Kamu sudah bisa:"     │
│                                                  │
│  ✅ Memahami bahwa gaya berat terdekomposisi     │
│  ✅ Menemukan W∥ = mg sin(θ) dan W⊥ = mg cos(θ) │
│  ✅ Menghitung komponen gaya dari parameter       │
│                                                  │
│  🔗 "Di Level 2, kita akan menambahkan GESEK     │
│      yang melawan gerakan benda..."              │
│                                                  │
│  [🏆 +25 XP]  [🎖️ Badge: Gravitasi Terpecah]    │
│  [→ Lanjut ke Level 2]                           │
└─────────────────────────────────────────────────┘
```

**Total Level 1: 10 layar, ~8 di antaranya "learning by doing"**

---

### Level 2: Gaya Gesek & Kesetimbangan *(10 layar)*

```
Layar 1 [PROVOKE]   — "Mengapa Benda Tidak Selalu Meluncur?"
                       → Simulasi: sudut 20° tapi benda diam!
Layar 2 [PREDICT]   — "Apa yang menahan benda ini?"
                       → User menebak sebelum vektor gesek ditampilkan
Layar 3 [GUIDED]    — "Temukan Gaya Gesek"
                       → Toggle tampilkan gaya gesek, amati arahnya
Layar 4 [GUIDED]    — "Hubungan Gesek & Gaya Normal"
                       → Slider μ + tabel observasi → temukan f = μN
Layar 5 [FORMALIZE] — "Rumuskan: f = μ × ?"
                       → Isi bagian kosong: f = μ × [N / W / W∥]
Layar 6 [GUIDED]    — "Kapan Benda Mulai Bergerak?"
                       → Geser θ, temukan titik di mana W∥ > f_statis
                       → Menemukan: tan(θ_kritis) = μ
Layar 7 [CHECK]     — "Cek: μ = 0.5, θ kritis = ?"
Layar 8 [CHALLENGE] — "Atur μ agar benda DIAM di sudut 35°"
Layar 9 [CHALLENGE] — "Benda bermassa 8 kg di sudut 25°, μ = 0.3.
                       Hitung: Apakah benda bergerak atau diam?"
                       → User hitung ΣF, tentukan status
Layar 10 [REFLECT]  — Rangkuman + koneksi ke Level 3 (percepatan)
```

### Level 3: Menghitung Percepatan *(10 layar)*

```
Layar 1 [PROVOKE]   — "Dua benda massa berbeda: mana yang lebih cepat?"
                       → Simulasi: ternyata sama! (atau berbeda jika ada gesek)
Layar 2 [PREDICT]   — "Kalau sudut dinaikkan 2×, percepatan jadi 2× juga?"
                       → User prediksi, lalu cek
Layar 3 [GUIDED]    — "Hitung ΣF = W∥ - f"
                       → Slider + real-time KaTeX: ΣF = mg sin θ - μmg cos θ
Layar 4 [FORMALIZE] — "a = ΣF / ?"
                       → Isi: a = ΣF / m → sederhana jadi g(sin θ - μ cos θ)
Layar 5 [GUIDED]    — "Percepatan TIDAK bergantung pada massa!"
                       → Geser m, lihat a tidak berubah → insight!
Layar 6 [CHECK]     — "Benar/Salah: Benda lebih berat selalu lebih cepat?"
Layar 7 [SANDBOX]   — Playground penuh: semua slider terbuka, grafik a vs θ
Layar 8 [CHALLENGE] — "Atur θ dan μ agar a tepat = 2.5 m/s²"
Layar 9 [CHALLENGE] — "Hitung: θ = 40°, μ = 0.2, g = 9.8 → a = ?"
                       → Input angka, verifikasi
Layar 10 [REFLECT]  — Rangkuman semua rumus + koneksi ke kinematika
```

### Level 4: Sistem Katrol & Bidang Miring *(8 layar)*
```
Layar 1 [PROVOKE]   — "Bagaimana mengangkat benda berat dengan mudah?"
Layar 2 [GUIDED]    — Simulasi katrol + bidang miring, temukan keuntungan mekanis
Layar 3 [GUIDED]    — Dua benda terhubung tali: temukan tegangan tali
Layar 4 [FORMALIZE] — Persamaan Newton untuk sistem: m₁a = ... , m₂a = ...
Layar 5 [CHECK]     — "Massa mana yang lebih berat agar sistem bergerak?"
Layar 6 [SANDBOX]   — Playground sistem katrol: variasikan massa dan sudut
Layar 7 [CHALLENGE] — "Atur m₂ agar sistem bergerak naik" 
Layar 8 [REFLECT]   — Koneksi ke topik Usaha & Energi
```

### Level 5: Kasus Nyata & Tantangan Terbuka *(6 layar)*
```
Layar 1 [PROVOKE]   — "Desain ramp skateboard: sudut ideal?"
Layar 2 [SANDBOX]   — Playground penuh: desain lintasan dengan beberapa bidang miring
Layar 3 [CHALLENGE] — "Benda harus sampai bawah dalam < 3 detik, jarak 10m"
                       → Open-ended: banyak solusi valid
Layar 4 [CHALLENGE] — "Truk rem blong di tanjakan 12°, μ rem = 0.6.
                       Berapa jarak pengereman dari 60 km/h?"
                       → Koneksi ke kinematika (v² = v₀² - 2ad)
Layar 5 [CHALLENGE] — Multi-step: "Desain conveyor belt agar paket tidak selip"
Layar 6 [REFLECT]   — Refleksi keseluruhan modul + rekomendasi topik selanjutnya
```

### Boss Level: Ujian Modul *(6 soal campuran)*
```
Soal 1: Konseptual (pilihan) — "Apa yang terjadi pada W⊥ saat θ → 90°?"
Soal 2: Kalkulasi — "Hitung a untuk m=3kg, θ=50°, μ=0.15"
Soal 3: Kanvas — "Atur parameter agar benda tepat bergerak konstan (a=0)"
Soal 4: Debugging — "Gambar vektor ini salah, mana yang keliru?"
Soal 5: Aplikasi — "Benda di bidang miring ditarik tali horizontal. Hitung..."
Soal 6: Terbuka — "Desain ramp untuk kursi roda: harus aman (a < 0.5 m/s²)
                    dan tidak terlalu panjang (< 5 meter)"
```

---

## Perbandingan Kedalaman

| Aspek | Alur Lama (3×4) | Alur Baru (5×10 + Boss) |
|-------|-----------------|------------------------|
| **Total layar** | 12 | **50–60** |
| **Layar "learning by doing"** | ~4 (33%) | **~45 (80%+)** |
| **Tipe interaksi** | 4 tipe | **8 tipe** |
| **Estimasi waktu** | 15–20 menit | **2–4 jam** |
| **Konsep yang bisa ditemukan sendiri** | 1–2 | **8–12** |
| **Rumus yang diberikan di awal** | Semua | **Nol — semua ditemukan** |
| **Variasi soal** | 3 soal serupa | **10+ soal berbagai tipe** |
| **Koneksi lintas topik** | Tidak ada | **Ada di setiap refleksi** |

---

## Prinsip Desain Layar

### 1. Rumus TERAKHIR, Bukan Pertama
```
❌ SALAH:  "W∥ = mg sin θ. Sekarang cobalah geser slider."
✅ BENAR:  "Geser slider → isi tabel → temukan pola → baru rumus muncul"
```
Pengguna membangun pemahaman dari observasi, rumus hanya "memberi nama" pada pola yang sudah ditemukan.

### 2. Prediksi Sebelum Simulasi
```
❌ SALAH:  "Klik untuk melihat apa yang terjadi."
✅ BENAR:  "Menurutmu apa yang terjadi? [A/B/C] → Sekarang klik untuk cek."
```
Prediksi memaksa otak memproses konsep SEBELUM melihat jawaban. Benar atau salah, hasilnya tetap belajar.

### 3. Variasi Arah Pertanyaan
```
Arah maju:    θ = 30°, m = 5 kg → berapa W∥?
Arah mundur:  W∥ = 24.5 N, m = 5 kg → berapa θ?
Arah lateral: W∥ = W⊥ → pada sudut berapa? (→ 45°!)
Arah konsep:  "Apakah percepatan bergantung pada massa?"
Arah debug:   "Diagram ini salah. Temukan kesalahannya."
Arah desain:  "Buat ramp yang aman untuk kursi roda."
```

### 4. Scaffolding, Bukan Bongkahan
Jangan berikan satu blok penjelasan panjang. Pecah jadi langkah kecil:
```
❌ SALAH: Satu layar penuh teks 500 kata menjelaskan semua gaya
✅ BENAR: 5 layar kecil, masing-masing memperkenalkan 1 gaya lewat interaksi
```

### 5. Setiap Level Punya "Aha Moment"
Setiap level harus punya minimal 1 momen di mana pengguna terkejut/tercerahkan:

| Level | Aha Moment |
|-------|-----------|
| L1 | "Oh, gaya berat bisa dipecah jadi dua komponen!" |
| L2 | "Ternyata ada sudut kritis di mana benda mulai gerak!" |
| L3 | "Percepatan tidak bergantung massa?! Seperti Galileo!" |
| L4 | "Katrol bisa melipatgandakan gaya!" |
| L5 | "Rumus ini ternyata berguna di dunia nyata!" |

---

## Tipe Jawaban yang Didukung

Bukan hanya "geser slider", tapi berbagai format:

| Tipe Input | Contoh |
|-----------|--------|
| **Slider kanvas** | Atur θ agar W∥ = 24.5 N |
| **Input angka** | Hitung: a = ___ m/s² |
| **Pilihan (MC)** | Mana yang benar? [A] [B] [C] |
| **Benar/Salah** | "Massa memengaruhi percepatan" → ✅/❌ |
| **Isi bagian kosong** | W∥ = mg × [___](θ) |
| **Urutkan** | Urutkan dari terkuat ke terlemah: [drag cards] |
| **Klik diagram** | Klik vektor yang arahnya salah |
| **Tabel observasi** | Isi tabel dari hasil geser slider |
| **Desain terbuka** | Desain ramp dengan constraint tertentu |

---

## Mode Sandbox Tetap Ada

Mode sandbox **tidak hilang** — tetap tersedia sebagai alternatif bagi pengguna yang sudah paham dan ingin langsung bermain:

```
┌──────────────────────────────────────────┐
│  HALAMAN TOPIK                           │
│                                          │
│  ┌──────────────┐  ┌──────────────────┐  │
│  │ 🗺️ Jalur     │  │ 🧪 Sandbox      │  │
│  │ Belajar      │  │ (Eksplorasi     │  │
│  │ (Guided)     │  │  Bebas)         │  │
│  │              │  │                 │  │
│  │ L1 ● ──────  │  │ Semua slider,   │  │
│  │ L2 ◐ ──────  │  │ kanvas, rumus   │  │
│  │ L3 ○ ──────  │  │ terbuka tanpa   │  │
│  │ L4 ○ ──────  │  │ level lock      │  │
│  │ L5 ○ ──────  │  │                 │  │
│  │ 🏆 Boss      │  │ Cocok untuk:    │  │
│  │              │  │ - Review cepat  │  │
│  │ Cocok untuk: │  │ - Guru demo     │  │
│  │ - Pemula     │  │ - Yang sudah    │  │
│  │ - Belajar    │  │   paham         │  │
│  │   mendalam   │  │                 │  │
│  └──────────────┘  └──────────────────┘  │
└──────────────────────────────────────────┘
```

---

## Integrasi dengan Sistem 4-Hint

Hint aktif di layar tipe `CHECK`, `CHALLENGE`, dan `FORMALIZE`:

```
Layar GUIDED/PREDICT → tidak perlu hint (eksplorasi bebas, semua jawaban valid)
Layar CHECK          → Hint ringan saja (1-2), karena soal sederhana
Layar FORMALIZE      → Hint 1-3 (bantu merumuskan, tapi jangan kasih rumus langsung)
Layar CHALLENGE      → Full 4-hint system
Boss Level           → Full 4-hint system + penalti XP jika pakai hint 4
```

---

## Implementasi Teknis: Tipe Layar sebagai Config

```typescript
type ScreenType = 
  | "provoke"    // Fenomena mengejutkan, pilihan MC ringan
  | "predict"    // Prediksi sebelum simulasi
  | "guided"     // Eksplorasi terbimbing + instruksi spesifik
  | "formalize"  // Isi bagian kosong rumus
  | "check"      // Cek pemahaman cepat (MC, benar/salah)
  | "sandbox"    // Playground bebas (opsional per level)
  | "challenge"  // Tantangan kanvas/kalkulasi
  | "reflect";   // Rangkuman + koneksi (Nai bicara)

interface Screen {
  id: string;
  type: ScreenType;
  naiExpression: NaiExpression;
  naiDialogue: string;
  content: ScreenContent;         // konten spesifik per tipe
  hintConfig?: HintConfig;        // konfigurasi hint (null = tanpa hint)
  xpReward: number;               // 0 untuk non-graded screens
  canSkip: boolean;               // true untuk REFLECT, false untuk CHALLENGE
}

interface Level {
  index: number;
  title: string;
  tier: 1 | 2 | 3;
  screens: Screen[];              // 8-12 screens per level
  unlockCondition: "previous_level" | "none";
  ahaDescription: string;         // deskripsi "aha moment" level ini
}

interface TopicModule {
  slug: string;
  title: string;
  category: "math" | "physics" | "chemistry" | "biology";
  levels: Level[];                // 5-6 levels per topic
  bossLevel: BossLevel;          // ujian akhir modul
  sandboxConfig: PlaygroundConfig; // konfigurasi mode sandbox
  estimatedMinutes: number;       // estimasi waktu total
}
```

---

## Ringkasan Perubahan dari Alur Lama

| | Alur Lama | Alur Baru |
|---|----------|----------|
| **Struktur** | 3 level × 4 langkah tetap | 5 level × 8-12 layar fleksibel + boss |
| **Filosofi** | Teori dulu, praktek kemudian | **Discovery first, rumus terakhir** |
| **Tipe interaksi** | 4 (konsep, playground, tantangan, selebrasi) | **8 (provoke, predict, guided, formalize, check, sandbox, challenge, reflect)** |
| **Posisi rumus** | Disajikan di awal sebagai slide | **Ditemukan sendiri melalui eksplorasi** |
| **Kedalaman** | ~15 menit, permukaan | **2-4 jam, pemahaman mendalam** |
| **Variasi soal** | Hanya slider kanvas | **9 tipe input berbeda** |
| **Koneksi topik** | Tidak ada | **Setiap refleksi menyebut topik terkait** |
| **Boss level** | Tidak ada | **6 soal campuran semua tipe** |
| **Aha moment** | Kebetulan | **Didesain 1 per level** |