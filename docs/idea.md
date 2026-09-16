# 💡 Nalar: Konsep & Visi Produk

> **Tema Utama**: *"Pendidikan Berkualitas: menyediakan pendidikan yang inklusif, merata, dan berkualitas."*

---

## 1. Identitas & Visi Produk

* **Nama Platform**: **Nalar** (Platform Pembelajaran STEM Interaktif, Visual, dan Inklusif)
* **Visi**: Membangun platform web pembelajaran Sains dan Matematika interaktif, visual, dan ramah aksesibilitas (*difabel-friendly*) yang dapat diakses secara gratis tanpa hambatan *login*, sebagai alternatif terbuka untuk platform komersial seperti *Brilliant*.
* **Urgensi Masalah**: 
  1. **Tingkat Abstraksi Tinggi**: Banyak pelajar merasa materi STEM (khususnya matematika lanjut) membosankan dan sulit dipahami karena diajarkan hanya melalui deretan rumus simbolik tanpa visualisasi intuitif.
  2. **Tembok Berbayar & Pendaftaran (*Gatekeeping*)**: Platform edukasi interaktif berkualitas umumnya berbayar mahal dan mewajibkan pendaftaran akun di awal, memperlebar jurang ketimpangan akses belajar.
  3. **Minimnya Aksesibilitas bagi Difabel**: Media pembelajaran sains jarang sekali memperhatikan kebutuhan pengguna dengan gangguan penglihatan (*low vision*), tunarungu, atau mereka yang mengandalkan navigasi papan ketik (*keyboard-only*).

---

## 2. Perbandingan Paradigma

| Aspek | Pembelajaran Konvensional | Platform Komersial (Brilliant dsb.) | **Nalar (Platform Kami)** |
| :--- | :--- | :--- | :--- |
| **Akses Awal** | Registrasi & verifikasi email | Wajib akun + langganan berbayar | **Instan (Zero-Friction), 100% Gratis** |
| **Penyimpanan Data** | Database server terpusat | Cloud berbayar | **Hybrid: localStorage (offline) + Server (sinkronisasi)** |
| **Pendekatan Materi** | Menghafal rumus simbolik | Kuis pilihan berganda interaktif | **Manipulasi Parameter Kanvas** |
| **Adaptasi Jenjang** | Kurikulum kaku per kelas | Satu jalur linear | **Skill Tree adaptif, multi-jenjang** |
| **Aksesibilitas** | Hampir tidak ada | Terbatas pada kontras standar | **A11y-First (Dark, Light, High-Contrast, TTS, Subtitles, Keyboard)** |
| **Ketergantungan AI** | Tidak ada | Chatbot pasif berbayar | **On-Demand & Event-Driven (Hemat Token)** |

---

## 3. Target Pengguna & Adaptasi Jenjang

Nalar melayani **berbagai usia dan tingkat pemahaman**, bukan satu segmen tunggal. Materi disesuaikan secara otomatis berdasarkan profil pengguna:

### Persona Pengguna

| Persona | Usia | Kebutuhan Utama | Contoh Modul |
| :--- | :--- | :--- | :--- |
| **Adik Explorer** | 9–12 tahun | Pengenalan konsep melalui analogi visual, tanpa rumus berat | Aritmetika Jam, Geometri Euclid, Sel & Organel |
| **Pelajar Navigator** | 13–16 tahun | Pendalaman materi SMP/SMA, persiapan ujian, tantangan logika | Aljabar, Trigonometri, Kinematika, Dinamika, Stoikiometri |
| **Mahasiswa Pioneer** | 17–22 tahun | Materi *undergraduate*, fondasi riset, lintas disiplin | Aljabar Linear, Kalkulus Multivariabel, ODE, Mekanika Kuantum |
| **Autodidak Lifelong** | 23+ tahun | Eksplorasi minat, karir *upskill*, pemahaman sains terkini | Optimasi & ML, Relativitas, Kriptografi, Etika AI |
| **Pendidik Mentor** | Semua usia | Alat bantu mengajar interaktif, referensi visual | Semua playground sebagai alat peraga digital |

### Mekanisme Adaptasi Jenjang

Alih-alih memisahkan konten ke jalur "SD / SMP / SMA", Nalar menggunakan **pendekatan berlapis dalam satu modul**:

1. **Tingkat Narasi Adaptif:**
   * **Sederhana** — analogi sehari-hari, tanpa notasi formal (cocok usia 9–12)
   * **Standar** — notasi matematika dasar, penjelasan langkah demi langkah (13–16)
   * **Lanjut** — pembuktian formal, kasus batas, koneksi lintas topik (17+)

2. **Tantangan Bertingkat:** Setiap playground memiliki 3 tier tantangan:
   * ⭐ *Eksplorasi* — pertanyaan terbimbing ("coba geser slider ini")
   * ⭐⭐ *Penerapan* — "atur parameter agar mencapai kondisi X"
   * ⭐⭐⭐ *Pendalaman* — masalah terbuka, koneksi lintas topik, pembuktian

3. **Skill Tree Menyesuaikan Jenjang:** Saat pengguna memilih profil usia/jenjang di awal (opsional, tanpa login), peta Skill Tree menyorot jalur rekomendasi dan menyembunyikan node yang terlalu lanjut — tanpa mengunci akses.

---

## 4. Nai — Teman Belajar AI *(Maskot Platform)*

Seluruh pengalaman belajar di Nalar ditemani oleh **Nai** (kependekan dari "Nalar AI") — karakter animasi **panda merah** yang ceria, ekspresif, dan hadir di setiap halaman sebagai AI tutor personal.

### Identitas Karakter

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   🐾 NAI — Nalar AI                                     │
│                                                          │
│   Spesies  : Panda Merah (Ailurus fulgens)               │
│   Peran    : Teman belajar, tutor AI, pemandu playground │
│   Sifat    : Ceria, sabar, suportif, sedikit jahil       │
│   Suara    : Web Speech API (bahasa Indonesia)           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Ekspresi & Tindakan Dinamis

Nai memiliki **ekspresi animasi** yang berubah berdasarkan konteks dan aksi pengguna:

| Konteks | Ekspresi Nai | Tindakan |
| :--- | :--- | :--- |
| Pertama kali buka materi | 😊 Antusias, mata berbinar | Melambai, menunjuk ke penjelasan konsep |
| Pengguna menggeser slider | 🤔 Penasaran, kepala miring | Ikut melirik ke arah kanvas |
| Jawaban benar | 🎉 Girang, melompat | Tepuk tangan, efek bintang |
| Jawaban salah (pertama) | 🤗 Menyemangati | Mengangguk, "Coba lagi!" |
| Jawaban salah (berulang) | 🧐 Berpikir | Menunjuk ke hint, menggaruk kepala |
| Memberikan hint | 💡 Ide! | Menunjukkan lampu bola, gesture menjelaskan |
| Memberikan jawaban (hint 4) | 📖 Guru sabar | Membuka buku, menunjuk langkah demi langkah |
| Modul selesai | 🥳 Selebrasi | Menari, lencana muncul di tangan Nai |
| Streak tercapai | 🔥 Bangga | Membawa bendera streak, efek konfeti |
| Idle lama | 😴 Mengantuk | Menguap, "Masih di sini? Yuk lanjut!" |
| High-contrast mode | 🐾 Siluet adaptif | Outline tebal, kontras tinggi |

### Posisi Nai di Halaman

- **Halaman utama / Skill Tree**: Nai berdiri di samping, memberikan saran modul berikutnya
- **Saat penjelasan materi**: Nai muncul di samping teks, menunjuk konsep kunci
- **Saat playground**: Nai mengecil ke sudut bawah, bereaksi terhadap interaksi kanvas
- **Saat tantangan**: Nai muncul saat diminta (tombol "Tanya Nai") atau otomatis saat gagal
- **Mobile**: Nai menjadi floating avatar kecil yang bisa di-tap untuk berinteraksi

> [!NOTE]
> Nai **tidak mengganggu** — pengguna dapat meminimalkan/menyembunyikan Nai kapan saja melalui pengaturan. Prinsip aksesibilitas tetap diutamakan: animasi dapat dimatikan, teks alternatif tersedia untuk pembaca layar.

---

## 5. Struktur Pembelajaran: Duolingo × Brilliant

Nalar menggabungkan dua paradigma terbaik:
- **Navigasi & progresi level** ala **Duolingo** — setiap topik terbagi menjadi level yang harus diselesaikan bertahap, dengan progres visual yang memuaskan.
- **Cara belajar** ala **Brilliant** — di dalam setiap level, pengguna tidak langsung dihadapkan soal, melainkan dibimbing Nai melalui penjelasan konsep interaktif terlebih dahulu.

### Struktur Hierarki: Topik → Level → Langkah

```
📐 Topik: Aritmetika Jam (Modulo)
│
├── Level 1: Konsep Dasar Modulo          ⭐ Eksplorasi
│   ├── Langkah 1: 📖 Penjelasan oleh Nai (analogi jam dinding)
│   ├── Langkah 2: 🎮 Playground interaktif (putar jam, lihat sisa bagi)
│   ├── Langkah 3: 📝 Soal terbimbing ("Jam menunjuk angka berapa?")
│   └── Langkah 4: ✅ Kuis validasi + rumus KaTeX reaktif
│
├── Level 2: Aritmetika Modular           ⭐⭐ Penerapan
│   ├── Langkah 1: 📖 Nai menjelaskan penjumlahan & perkalian mod n
│   ├── Langkah 2: 🎮 Tabel operasi modular interaktif
│   ├── Langkah 3: 📝 Studi kasus ("Hari apa 100 hari dari Senin?")
│   └── Langkah 4: ✅ Tantangan manipulatif
│
├── Level 3: Pola & Fraktal Modular       ⭐⭐⭐ Pendalaman
│   ├── Langkah 1: 📖 Nai menjelaskan pola kardioid
│   ├── Langkah 2: 🎮 Playground fraktal perkalian modular
│   ├── Langkah 3: 📝 "Multiplier berapa menghasilkan pola bintang?"
│   └── Langkah 4: ✅ Tantangan terbuka
│
└── 🏆 Modul Selesai → Lencana + XP + Nai selebrasi
```

### Alur Belajar Detail per Langkah

```
┌─────────┐    ┌──────────────┐    ┌─────────────┐    ┌───────────────┐    ┌───────────┐
│ Pilih   │───►│ Nai Jelaskan │───►│ Playground  │───►│ Studi Kasus / │───►│ Validasi  │
│ Level   │    │ Konsep       │    │ Interaktif  │    │ Soal          │    │ & Lanjut  │
└─────────┘    └──────────────┘    └─────────────┘    └───────┬───────┘    └───────────┘
                                                             │
                                                      Jawaban Salah?
                                                             │
                                                    ┌────────▼────────┐
                                                    │  Sistem 4 Hint  │
                                                    │  (lihat §8)     │
                                                    └─────────────────┘
```

**Langkah 1 — Penjelasan Konsep oleh Nai (Brilliant-style):**
Sebelum menyentuh soal, Nai menyajikan konsep inti melalui:
- Analogi sehari-hari ("Bayangkan jam dinding...")
- Visualisasi statis yang perlahan menjadi interaktif
- Teks naratif singkat + rumus KaTeX yang diperkenalkan bertahap
- Pengguna **mengklik untuk melanjutkan** (bukan auto-scroll) — memastikan ritme belajar terkendali

**Langkah 2 — Playground Interaktif:**
Area eksperimen bebas di mana pengguna memanipulasi parameter tanpa penilaian. Nai bereaksi terhadap interaksi ("Coba geser ke kanan — lihat apa yang terjadi!").

**Langkah 3 — Studi Kasus / Soal:**
Soal manipulatif yang diselesaikan dengan menyetel parameter kanvas ke kondisi target. Bukan pilihan ganda A/B/C/D. Jika salah, sistem hint 4-tingkat aktif (lihat §8).

**Langkah 4 — Validasi & Formalisasi:**
Rumus formal KaTeX ditampilkan berdampingan dengan solusi — nilai variabel dalam rumus mengikuti jawaban yang benar. Nai merangkum poin penting.

### Progresi Level (Duolingo-style)

- Setiap topik memiliki **3–5 level** yang di-unlock secara berurutan
- Level ditampilkan sebagai **node berseri** di Skill Tree (vertikal, seperti path Duolingo)
- Progres ditandai visual: ○ Belum → ◐ Sedang → ● Selesai
- Pengguna dapat **melihat** level terkunci (preview konten), tetapi tidak bisa mengerjakan tantangan sebelum level sebelumnya selesai
- Opsi "Test Out": pengguna yang sudah paham dapat langsung mengerjakan kuis akhir untuk melewati level

---

## 5. Cakupan Kurikulum

Nalar mencakup **tiga jalur kurikulum utama** dan satu jalur pelengkap:

### 📐 Matematika — 35 Modul
Dari fondasi aritmetika hingga cabang matematika murni dan terapan modern.

```
Level 1 (Fondasi)              → 4 ranting: Bilangan, Aljabar, Geometri, Logika
Level 2 (Perubahan & Struktur) → 3 ranting: Kalkulus, Diskrit, Bilangan Kompleks
Level 3 (Tiga Pilar)           → 3 ranting: Aljabar Linear, Kalkulus Lanjut, Statistika
Cabang A (Murni)               → Analisis, Aljabar Abstrak, Topologi, Geometri Diferensial
Cabang B (Terapan)             → Fourier, Laplace, Numerik, Optimasi/ML, Chaos, Kriptografi
```
> Detail lengkap: `docs/roadmap-math.md`

### ⚛️🧪🧬 Sains — 45 Modul
Fisika, Kimia, dan Biologi terintegrasi dengan cross-link ke modul matematika.

```
Level 1 (Fondasi)              → 4 ranting: Metode, Mekanika, Materi/Atom, Kehidupan/Sel
Level 2 (Interaksi & Energi)   → 4 ranting: Gelombang, Listrik/Magnet, Reaksi Kimia, Genetika
Level 3 (Sistem Universal)     → 4 ranting: Termodinamika, EM Lanjut, Kimia Lanjut, Ekologi
Cabang A (Fisika Modern)       → Relativitas, Kuantum, Nuklir, Astrofisika
Cabang B (Sains Terapan)       → Elektronika, Bioteknologi, Material, Energi Hijau
```
> Detail lengkap: `docs/roadmap-science.md`

### 🧠 Soft Skills STEM — 27 Modul *(Side Plan)*
Keterampilan berpikir kritis, literasi data, etika, dan strategi belajar.

```
A. Berpikir Kritis    → Kekeliruan logika, bias kognitif, masalah Fermi
B. Literasi Data       → Membaca grafik, korelasi vs kausalitas, klaim menyesatkan
C. Komputasional       → Pengenalan pola, abstraksi, systems thinking
D. Komunikasi Ilmiah   → Menulis laporan, visualisasi data efektif
E. Etika STEM          → Integritas riset, etika AI, perubahan iklim
F. Strategi Belajar    → Growth mindset, spaced repetition, teknik Feynman
```
> Detail lengkap: `docs/roadmap-softskills.md`

### Total Cakupan

| Jalur | Modul | MVP 🟢 | v1.1 🔵 | v2.0 🟣 | Opsional 🔘 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Matematika | 35 | 10 | 12 | 11 | 2 |
| Sains | 45 | 10 | 17 | 14 | 4 |
| Soft Skills | 27 | — | 9 | 10 | 8 |
| **Total** | **107** | **20** | **38** | **35** | **14** |

---

## 6. Playground Interaktif — Jantung Platform

Playground adalah **unit simulasi kanvas mandiri** yang menjadi inti pengalaman belajar Nalar. Setiap playground adalah modul visual interaktif di mana pengguna belajar melalui manipulasi langsung, bukan membaca teks pasif.

### Anatomi Sebuah Playground

```
┌─────────────────────────────────────────────────────────────┐
│  PLAYGROUND: Transformasi Matriks 2D                        │
├───────────────────────────────┬──────────────────────────────┤
│                               │  Panel Kontrol               │
│    ┌─ ─ ─ ─ ─ ─ ─ ─ ─┐      │  ┌────────────────────────┐  │
│    │  Kanvas Mafs       │      │  │ Matriks:               │  │
│    │  Grid bertransfor- │      │  │  [1.5  0.0]            │  │
│    │  masi secara       │      │  │  [0.5  2.0]            │  │
│    │  real-time          │      │  │ Preset: [Rotasi] [Ref] │  │
│    │  ← seret î dan ĵ  │      │  │ Animasi: ■■■■□□ 67%    │  │
│    └─ ─ ─ ─ ─ ─ ─ ─ ─┘      │  └────────────────────────┘  │
│                               │  ┌────────────────────────┐  │
│                               │  │ Rumus KaTeX Reaktif:    │  │
│                               │  │ det(T) = 3.00           │  │
│                               │  │ Luas = |det| × asli     │  │
│                               │  └────────────────────────┘  │
├───────────────────────────────┴──────────────────────────────┤
│  ⭐ Tantangan: "Buat matriks yang merotasi 90° CCW"         │
│  [Petunjuk]  [Cek Jawaban]  [Tantangan Berikutnya →]        │
└─────────────────────────────────────────────────────────────┘
```

### Standar Playground
- **Performa**: Target mulus, animasi halus
- **Responsif**: Desktop (kanvas + panel samping) → Mobile (kanvas atas, panel bawah)
- **Aksesibel**: Setiap slider/kontrol wajib `aria-label`, navigasi keyboard penuh
- **Reaktif**: Rumus KaTeX menampilkan nilai *live* yang sinkron dengan state kanvas
- **Modular**: Maksimal 250 baris per komponen — pecah ke sub-komponen

### Distribusi Playground

| Fase | 📐 Math | ⚛️ Fisika | 🧪 Kimia | 🧬 Bio | Total |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 🟢 MVP | 6 | 6 | 1 | — | **13** |
| 🔵 v1.1 | 3 | 2 | 1 | 1 | **7** |
| 🟣 v2.0 | 3 | 3 | — | 1 | **7** |
| **Total** | **12** | **11** | **2** | **2** | **27** |

> Detail spesifikasi per playground: `docs/playgrounds.md`

---

## 7. Pilar Aksesibilitas Terpadu (Inklusivitas Penuh)

Fitur ramah difabel dirancang sebagai keunggulan inti arsitektur, bukan fitur tempelan:

### A. Ramah Penglihatan Rendah (*Low Vision Friendly*)
- **Tiga Pilihan Tema**:
  - **Dark Mode**: Tema gelap bawaan yang nyaman untuk sesi belajar panjang (`bg-neutral-950`).
  - **Light Mode**: Tema terang bersih dengan keterbacaan tinggi.
  - **High-Contrast Mode**: Rasio kontras tinggi dengan garis tepi tebal dan kontras ekstrem sesuai pedoman WCAG 2.1 AAA.
- **Arsitektur Anti-FOUC**: Script sinkron pada `<head>` mencegah efek kedip layar saat halaman dimuat ulang (*refresh*).
- **Skala Huruf Fleksibel**: Pilihan ukuran teks (Normal $100\%$, Besar $115\%$, Ekstra Besar $130\%$).

### B. Asistensi Audio (*Audio-Assisted Learning*)
- **Web Speech API Asli**: Pemanfaatan `window.speechSynthesis` dengan modul bahasa Indonesia alami untuk membacakan rangkuman materi dan instruksi simulasi tanpa beban pustaka eksternal.
- **Deskripsi Perubahan Nilai**: Asistensi vokal ketika nilai parameter penting mengalami perubahan signifikan.

### C. Panduan Visual untuk Tunarungu (*Deaf-Friendly*)
- **Takarir Langsung (*Live Subtitles*)**: Penampil takarir visual mengambang yang menampilkan teks narasi saat audio diaktifkan.
- **Indikator Status Visual**: Umpan balik keberhasilan tantangan disajikan melalui animasi, perubahan warna, dan selebrasi visual tanpa bergantung pada bunyi alarm.

### D. Aksesibilitas Papan Ketik (*Keyboard Navigation*)
- Seluruh kontrol interaktif memiliki atribut ARIA lengkap dan dapat dijangkau menggunakan tombol `Tab`, `Panah`, `Space`, dan `Enter`.
- Dialog panduan tombol pintasan dapat dibuka kapan saja dengan menekan tombol `?`.

---

## 9. Arsitektur AI Tutor: Nai & Sistem 4-Hint

Nai bukan sekadar maskot dekoratif — dia adalah **AI tutor aktif** yang membimbing pengguna melalui materi dan memberikan bantuan bertahap saat menghadapi kesulitan.

### Prinsip Utama

1. **Materi Inti Berstatus Statis (*Curated & Pre-rendered*)**: Penjelasan konsep, rumus, dan visualisasi kanvas dibuat paten di kode sumber, bukan dihasilkan LLM di setiap kunjungan. Nai "membacakan" materi terkurasi ini.
2. **LLM Hanya untuk Hint 3 & Hint 4**: Panggilan API AI (Gemini Flash / Groq) hanya terjadi pada eskalasi hint tingkat 3 dan 4, bukan di setiap interaksi. Ini menjaga penggunaan token minimal.
3. **Mode Simulasi Mandiri (*Local Mock Engine*)**: Secara default, hint 1 & 2 bersifat rule-based (tanpa API). Untuk lingkungan dev/demo, hint 3 & 4 juga disediakan versi lokal.

### Sistem 4-Tingkat Hint *(Progressive Scaffolding)*

Saat pengguna menjawab soal dengan salah, Nai **tidak langsung memberikan jawaban**. Bantuan diberikan secara bertahap agar pengguna tetap berusaha menemukan jawabannya sendiri:

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Hint 1   │───►│ Hint 2   │───►│ Hint 3   │───►│ Hint 4   │
│ Dorongan │    │ Arahan   │    │ Petunjuk │    │ Jawaban  │
│          │    │ Ringan   │    │ Jelas    │    │ Lengkap  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
  Lokal/Statis   Lokal/Statis   LLM (API)       LLM (API)
  Token: 0       Token: 0       Token: ~200     Token: ~500
```

| Tingkat | Pemicu | Apa yang Nai Lakukan | Ekspresi Nai | Sumber |
| :---: | :--- | :--- | :--- | :--- |
| **Hint 1** | Jawaban salah ke-1 | Nai hanya memberi tahu bahwa jawaban **belum benar**, tanpa petunjuk apa pun. *"Hmm, belum tepat. Coba pikirkan lagi!"* | 🤗 Menyemangati | Rule-based (statis) |
| **Hint 2** | Jawaban salah ke-2 | Nai memberikan **arahan ringan** agar pengguna memikirkan ulang, tetapi belum menjelaskan cara menyelesaikan. *"Perhatikan lagi nilai di slider kedua — ada hubungannya..."* | 🤔 Berpikir | Rule-based (statis) |
| **Hint 3** | Jawaban salah ke-3 | Nai memberikan **penjelasan konsep dan petunjuk langkah** yang relevan untuk menyelesaikan soal. Mengirim snapshot state kanvas ke LLM untuk jawaban kontekstual. | 💡 Ide! | **LLM API** |
| **Hint 4** | Jawaban salah ke-4 | Nai memberikan **penjelasan lengkap dan jawaban yang benar**, sekaligus **menggerakkan parameter kanvas ke posisi jawaban** secara otomatis sehingga pengguna melihat solusinya secara visual. | 📖 Guru sabar | **LLM API** |

### Alur Hint dalam Praktik

```
User menjawab soal
     │
     ├── ✅ Benar → Nai 🎉 "Hebat!" → XP + Lanjut
     │
     └── ❌ Salah
          │
          ├── Hint 1: Nai 🤗 "Belum tepat, coba lagi!"
          │   └── ❌ Salah lagi
          │
          ├── Hint 2: Nai 🤔 "Coba perhatikan slider X..."
          │   └── ❌ Salah lagi
          │
          ├── Hint 3: Nai 💡 (API) "Konsep yang kamu butuhkan adalah...
          │         Di sini, kamu perlu mengatur agar..."
          │   └── ❌ Salah lagi
          │
          └── Hint 4: Nai 📖 (API) "Jawabannya adalah..."
                ↓
              Kanvas bergerak otomatis ke posisi jawaban
              Rumus KaTeX menampilkan solusi lengkap
              Nai: "Tidak apa-apa! Yang penting kamu paham prosesnya."
                ↓
              Lanjut ke langkah/level berikutnya
```

### Konteks yang Dikirim ke LLM (Hint 3 & 4)

Untuk memastikan jawaban AI sangat kontekstual, setiap panggilan menyertakan:

```typescript
interface HintRequest {
  topicSlug: string;           // e.g. "modular-arithmetic"
  levelIndex: number;          // level ke berapa dalam topik
  challengeQuestion: string;   // teks soal
  userAttempts: {
    attemptNumber: number;
    userAnswer: unknown;       // jawaban yang diberikan user
    canvasSnapshot: Record<string, number>;  // state semua variabel kanvas
  }[];
  hintLevel: 3 | 4;           // tingkat hint yang diminta
  userAge?: string;            // jenjang usia (untuk adaptasi bahasa)
}
```

### Efisiensi Token

| Skenario | Hint 1 | Hint 2 | Hint 3 | Hint 4 | Total Token |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Benar di percobaan ke-1 | — | — | — | — | **0** |
| Benar setelah Hint 1 | 0 | — | — | — | **0** |
| Benar setelah Hint 2 | 0 | 0 | — | — | **0** |
| Butuh Hint 3 | 0 | 0 | ~200 | — | **~200** |
| Butuh Hint 4 (kasus terburuk) | 0 | 0 | ~200 | ~500 | **~700** |

> Rata-rata pengguna yang aktif belajar diperkirakan hanya membutuhkan Hint 3+ pada **~15–20%** tantangan, menjaga biaya API sangat rendah.

---

## 10. Gamifikasi & Motivasi Belajar

### Skill Tree — Peta Navigasi Utama

Peta Skill Tree berbasis **graf berarah** (React Flow) menjadi antarmuka navigasi utama platform, bukan menu daftar konvensional:

```
                    ┌─────────┐
              ┌────►│Kalkulus │────────┐
┌──────────┐  │     │Diferensi│        ▼
│ Fungsi & ├──┤     └─────────┘   ┌──────────┐
│ Grafik   │  │                   │Kalkulus  │
└──────────┘  │     ┌─────────┐   │Integral  │
              └────►│Limit &  ├──►└──────────┘
                    │Kontinu  │
                    └─────────┘

  ● Selesai    ◐ Sedang dikerjakan    ○ Terkunci (prasyarat belum)
```

- **Node** = modul topik, warna menunjukkan status (selesai/aktif/terkunci)
- **Edge** = relasi prasyarat (sesuai Prerequisite Graph di roadmap)
- **Zoom** = dari *bird's eye* (semua level) ke detail (sub-topik)
- **Filter** = berdasarkan domain (Math/Fisika/Kimia/Bio), fase, atau jenjang usia

### Sistem Progres & Penghargaan

* **XP & Level Pengguna:**
  * Setiap tantangan selesai menghasilkan XP (⭐ = 10 XP, ⭐⭐ = 25 XP, ⭐⭐⭐ = 50 XP)
  * Level pengguna naik berdasarkan akumulasi XP:
    * **Explorer** (0–500 XP) → **Navigator** (500–2000) → **Scholar** (2000–5000) → **Master** (5000+)
  * Level ditampilkan di profil dan Skill Tree

* **Lencana (*Badges*):**
  * Lencana per modul (selesaikan semua tantangan)
  * Lencana spesial: "First Steps" (tantangan pertama), "Polymath" (3 domain berbeda), "Night Owl" (belajar setelah jam 10 malam)
  * Lencana streak: 7 hari, 30 hari, 100 hari berturut-turut

* **Streak & Konsistensi:**
  * Penghitung hari berturut-turut belajar (minimal 1 tantangan per hari)
  * Pengingat halus (bukan spam) jika streak hampir putus
  * Kalender aktivitas visual ala GitHub contribution graph

* **Efek Visual Selebrasi:**
  * Konfeti saat menyelesaikan modul
  * Animasi "level up" saat XP mencapai threshold
  * *Sound effect* opsional (dimatikan by default untuk aksesibilitas)

### Dashboard Progres Personal

```
┌─────────────────────────────────────────────────┐
│  📊 Dashboard Belajar                           │
├─────────────────────────────────────────────────┤
│  Level: Scholar (3,250 XP)    Streak: 🔥 14 hari│
│  ████████████████░░░░ 68% menuju Master         │
├──────────────────┬──────────────────────────────┤
│  Modul Selesai   │  Aktivitas Mingguan          │
│  📐 Math: 12/35  │  ▁▃▅▇▅▃▁ (grafik bar)       │
│  ⚛️ Sains: 8/45  │  Total minggu ini: 4.2 jam   │
│  🧠 Soft: 3/27   │  Rata-rata: 36 min/hari      │
├──────────────────┴──────────────────────────────┤
│  🏆 Lencana Terbaru: [Kinematika Master] [🔥7]  │
│  📌 Rekomendasi: Kalkulus Diferensial (95% siap)│
└─────────────────────────────────────────────────┘
```

---

## 11. Arsitektur Data: Server, Database & Sinkronisasi

### Prinsip Utama: *Offline-First, Sync-Optional*

Platform tetap berfungsi penuh **tanpa koneksi internet dan tanpa akun**, namun menyediakan fitur sinkronisasi dan persistensi server bagi pengguna yang memilih membuat akun:

```
┌─────────────────────────────────────────────────────────────┐
│  LAPISAN DATA                                               │
│                                                             │
│  ┌─────────────────┐         ┌────────────────────────────┐ │
│  │  KLIEN (Browser) │◄──────►│  SERVER (Opsional)         │ │
│  │                  │  Sync   │                            │ │
│  │  localStorage    │         │  PostgreSQL / SQLite       │ │
│  │  ┌────────────┐ │         │  ┌──────────────────────┐  │ │
│  │  │ Progres    │ │  ◄───►  │  │ users                │  │ │
│  │  │ XP & Badge │ │         │  │ progress             │  │ │
│  │  │ Preferensi │ │         │  │ achievements         │  │ │
│  │  │ Streak     │ │         │  │ preferences          │  │ │
│  │  └────────────┘ │         │  │ ai_hint_logs         │  │ │
│  │                  │         │  └──────────────────────┘  │ │
│  │  IndexedDB       │         │                            │ │
│  │  ┌────────────┐ │         │  Redis (session/cache)     │ │
│  │  │ Cache MDX  │ │         │                            │ │
│  │  │ AI Hints   │ │         │  S3/R2 (asset media)       │ │
│  │  └────────────┘ │         │                            │ │
│  └─────────────────┘         └────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Mode Operasi

| Mode | Akun | Koneksi | Fitur |
| :--- | :--- | :--- | :--- |
| **Tamu (*Guest*)** | Tidak ada | Tidak perlu | Semua materi & playground, progres di `localStorage`, ekspor/impor JSON manual |
| **Akun Lokal** | Opsional | Saat login saja | Sinkronisasi progres lintas perangkat, backup otomatis, streak persisten |
| **Akun Penuh** | Ya | Berkala | + Leaderboard, profil publik, riwayat AI hint, kontribusi komunitas |

### Skema Database (Server-Side)

```
users
├── id (UUID)
├── display_name
├── email (opsional, untuk recovery)
├── created_at
├── preferences (JSON: tema, font_size, narasi, jenjang)
└── auth_provider (email | google | github)

progress
├── user_id → users.id
├── topic_slug (e.g. "modular-arithmetic")
├── challenge_tier (1 | 2 | 3)
├── completed_at
├── attempts (jumlah percobaan)
├── best_score
└── canvas_snapshot (JSON: state variabel saat selesai)

achievements
├── user_id → users.id
├── badge_slug (e.g. "streak-30", "polymath")
├── earned_at
└── metadata (JSON)

streaks
├── user_id → users.id
├── current_streak (hari)
├── longest_streak (hari)
├── last_activity_date
└── streak_history (JSON: array tanggal)

ai_hint_logs
├── user_id → users.id (nullable untuk tamu)
├── topic_slug
├── prompt_context (JSON: snapshot variabel kanvas)
├── response_text
├── token_count
├── created_at
└── was_helpful (boolean, umpan balik pengguna)
```

### Strategi Sinkronisasi

1. **Offline-First dengan Konflik Resolution:**
   * Semua operasi tulis pertama kali ke `localStorage` / IndexedDB (instan, tanpa latensi)
   * Background sync ke server saat koneksi tersedia (Service Worker)
   * Konflik diselesaikan dengan strategi *last-write-wins* berdasarkan timestamp, kecuali untuk XP/streak yang menggunakan *merge-additive* (skor tertinggi menang)

2. **Ekspor/Impor Manual (Mode Tamu):**
   * Tombol "Ekspor Progres" → unduh file `.json` berisi semua data lokal
   * Tombol "Impor Progres" → unggah file JSON dari perangkat lain
   * Format JSON terstandarisasi agar portabel

3. **Migrasi Tamu → Akun:**
   * Saat tamu memutuskan membuat akun, seluruh data `localStorage` otomatis dimigrasi ke server
   * Tidak ada data yang hilang dalam transisi

### Tech Stack Backend

| Komponen | Teknologi | Alasan |
| :--- | :--- | :--- |
| **Runtime** | Node.js (Hono / Fastify) | Ringan, cepat, ekosistem TS |
| **Database** | PostgreSQL (produksi) / SQLite (dev) | Relational, JSON support, battle-tested |
| **ORM** | Drizzle ORM | Type-safe, ringan, migrasi mudah |
| **Cache** | Redis | Session management, rate limiting AI calls |
| **Auth** | Lucia Auth / Auth.js | Passwordless (magic link) + OAuth (Google/GitHub) |
| **Storage** | Cloudflare R2 / S3 | Asset media (gambar, audio narasi) |
| **Hosting** | Vercel (frontend) + Railway/Fly.io (backend) | Free tier memadai untuk MVP |
| **Sync** | Service Worker + Background Sync API | Offline-first, zero-friction |