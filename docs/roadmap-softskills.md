# Nalar: Roadmap Soft Skills STEM *(Side Plan)*

> [!NOTE]
> Jalur ini adalah **pelengkap opsional** di samping kurikulum utama Matematika dan Sains. Materi soft skills disajikan sebagai modul mandiri yang dapat diakses kapan saja, tanpa prasyarat kaku dari jalur utama. Fokus: keterampilan berpikir, literasi data, etika, dan strategi belajar yang relevan bagi pelajar STEM.

**Legenda Fase:**
- 🔵 **v1.1** — Gelombang pertama soft skills setelah MVP STEM stabil.
- 🟣 **v2.0** — Ekspansi topik lanjut.
- 🔘 **Opsional** — Pengayaan, tidak masuk alur utama.

---

## Gambaran Arsitektur

```
                    [Soft Skills STEM]
     ┌──────────┬──────────┬──────────┬──────────┐
  [A Berpikir  [B Literasi [C Komputasi [D Komunikasi
   Kritis]      Data]       & Abstraksi] Ilmiah]
     │          │           │            │
     └──────┬───┴───────────┴──────┬─────┘
            │                      │
     [E Etika & Tanggung      [F Strategi Belajar
      Jawab STEM]              & Metakognisi]
```

> [!IMPORTANT]
> Soft skills **tidak menggantikan** jalur Matematika/Sains, melainkan memperkuat daya serap dan penerapan materi STEM di dunia nyata. Modul-modul ini bersifat lintas-topik dan dapat disisipkan di antara materi utama.

---

## A · Berpikir Kritis & Penalaran

Melatih kemampuan mengevaluasi argumen, mengenali kekeliruan logika, dan membuat keputusan berbasis bukti.

### A1 · Logika Argumen & Kekeliruan *(Logical Fallacies)*

* 🔵 **Anatomi Argumen**
  * Premis, kesimpulan, dan struktur argumen deduktif vs induktif.
  * Argumen valid vs *sound* — perbedaan krusial.
  * Silogisme dan rantai penalaran.
  * *Format:* Skenario interaktif — evaluasi argumen, tandai premis & kesimpulan, tentukan validitas.
  * [🔗 Matematika: Logika Proposisional, Kuantor & Pembuktian]

* 🔵 **Katalog Kekeliruan Logika *(Fallacy Spotter)***
  * Ad hominem, strawman, false dichotomy, appeal to authority, slippery slope, circular reasoning, hasty generalization, dll.
  * *Format:* Kuis gamifikasi — baca kutipan/argumen → identifikasi jenis kekeliruan → poin XP.
  * *Visualisasi:* Kartu kekeliruan (gaya koleksi/kartu permainan), pohon taksonomi kekeliruan interaktif.

* 🟣 **Bias Kognitif dalam Sains**
  * Confirmation bias, anchoring, availability heuristic, Dunning-Kruger effect.
  * Bagaimana bias memengaruhi interpretasi data eksperimen.
  * *Format:* Studi kasus interaktif — pengguna diberikan dataset ambigu, lihat bagaimana interpretasi berubah berdasarkan framing.
  * [🔗 Sains: Metode Ilmiah, Statistika Inferensial]

### A2 · Pemecahan Masalah & Dekomposisi

* 🔵 **Teknik Dekomposisi Masalah**
  * Memecah masalah besar menjadi sub-masalah independen.
  * Strategi: analogi, kasus khusus, bekerja mundur, diagram.
  * Perbedaan *well-defined* vs *ill-defined problems*.
  * *Format:* Puzzle bertingkat — masalah kompleks yang harus dipecah langkah demi langkah, setiap sub-solusi membuka langkah berikutnya.
  * [🔗 Matematika: semua level — prinsip lintas-topik]

* 🟣 **Estimasi & Masalah Fermi**
  * "Berapa jumlah tuner piano di Jakarta?" — berpikir kuantitatif tanpa data pasti.
  * Orde besaran (*order of magnitude*), perkiraan berbatas atas/bawah.
  * Penerapan: validasi kewarasan (*sanity check*) terhadap hasil perhitungan.
  * *Format:* Tantangan Fermi mingguan — pengguna memasukkan estimasi → dibandingkan dengan estimasi rasional terstruktur.
  * [🔗 Matematika: Operasi Bilangan Riil, Fungsi & Grafik (skala logaritmik)]
  * [🔗 Sains: Besaran & Satuan, Metode Ilmiah]

---

## B · Literasi Data & Visualisasi

Membaca, menginterpretasi, dan mengkritisi data serta grafik — keterampilan vital di era informasi.

### B1 · Membaca & Menginterpretasi Grafik

* 🔵 **Anatomi Grafik: Sumbu, Skala & Konteks**
  * Jenis grafik: garis, batang, sebar (*scatter*), pie, histogram, box plot.
  * Menafsirkan sumbu, satuan, label, dan legenda.
  * Perbedaan skala linear vs logaritmik dan dampaknya pada persepsi.
  * *Format:* Kuis visual — "Apa yang salah dengan grafik ini?" (grafik menyesatkan dari media nyata).
  * [🔗 Matematika: Fungsi & Grafik, Statistika Deskriptif]

* 🔵 **Korelasi vs Kausalitas**
  * Korelasi positif, negatif, dan nol — scatter plot interaktif.
  * "Correlation does not imply causation" — variabel perancu (*confounding*).
  * Contoh terkenal: konsumsi es krim vs kasus tenggelam.
  * *Format:* Simulator scatter plot — seret titik data, hitung $r$, evaluasi apakah kausal.
  * [🔗 Matematika: Regresi & Analisis Data, Teori Peluang]

### B2 · Literasi Statistik di Media

* 🟣 **Membedah Klaim Statistik di Berita**
  * "90% dokter merekomendasikan..." — ukuran sampel, bias seleksi, *cherry-picking*.
  * Visualisasi: perbedaan risiko absolut vs relatif (misal: "risiko naik 50%" dari 2/juta ke 3/juta).
  * Konteks: *base rate neglect*, Simpson's paradox.
  * *Format:* Studi kasus berita nyata → pengguna mengevaluasi klaim → cek jawaban dengan penjelasan statistik.
  * [🔗 Matematika: Statistika Inferensial, Teori Peluang]

* 🟣 **Visualisasi Data yang Menyesatkan *(Misleading Charts)***
  * Sumbu terpotong, skala tidak proporsional, cherry-picking rentang waktu.
  * 3D pie chart yang mendistorsi proporsi.
  * *Format:* "Fix the chart" — pengguna memperbaiki grafik menyesatkan (ubah sumbu, skala, rentang) → lihat dampak pada narasi.
  * *Visualisasi:* Before/after interaktif — slider "tingkat manipulasi" dari jujur ke menyesatkan.

---

## C · Berpikir Komputasional & Abstraksi

Pola pikir yang mendasari pemrograman dan pemodelan — bukan tentang bahasa koding tertentu, melainkan cara berpikir.

### C1 · Fondasi Berpikir Komputasional

* 🔵 **Pengenalan Pola *(Pattern Recognition)***
  * Menemukan keteraturan dalam barisan angka, visual, dan data.
  * Generalisasi pola menjadi aturan/rumus.
  * *Format:* Puzzle visual — lanjutkan pola, temukan aturan, prediksi elemen ke-$n$.
  * [🔗 Matematika: Barisan & Deret, Aljabar Elementer]

* 🔵 **Abstraksi & Pemodelan**
  * Menyaring detail tidak relevan, mempertahankan esensi masalah.
  * Membuat model sederhana dari sistem kompleks (misal: model populasi, model bola jatuh).
  * Kapan model "cukup baik" vs kapan perlu detail lebih.
  * *Format:* Tantangan pemodelan — diberikan fenomena dunia nyata, buat model paling sederhana yang masih akurat.
  * [🔗 Sains: Metode Ilmiah, semua simulasi playground]

* 🟣 **Algoritma & Pseudocode Visual**
  * Konsep algoritma: urutan langkah terdefinisi, input/output, loop, percabangan.
  * Notasi pseudocode dan flowchart — tanpa bahasa pemrograman spesifik.
  * Efisiensi: mengapa urutan langkah penting (bubble sort vs merge sort secara visual).
  * *Format:* Flowchart builder interaktif — susun blok langkah, jalankan, lihat hasil.
  * *Visualisasi:* Animasi sorting (batang bertukar posisi), pathfinding di maze.
  * [🔗 Matematika: Teori Graf (BFS/DFS), Logika Proposisional]

### C2 · Simulasi & Pemodelan Sistem

* 🟣 **Berpikir dalam Sistem *(Systems Thinking)***
  * Feedback loop positif dan negatif.
  * Stok & aliran (*stocks and flows*), titik tuas (*leverage points*).
  * Efek samping tak terduga (*unintended consequences*).
  * *Format:* Diagram kausal interaktif — hubungkan variabel, tandai polaritas (+/−), prediksi perilaku sistem.
  * [🔗 Sains: Ekosistem, Siklus Biogeokimia, Dinamika Populasi]
  * [🔗 Matematika: ODE, Dinamika Sistem & Chaos]

* 🔘 **Simulasi Monte Carlo Terapan** *(opsional)*
  * Menggunakan keacakan untuk mengestimasi solusi yang sulit dihitung analitik.
  * Contoh: estimasi $\pi$, pricing opsi keuangan, analisis risiko.
  * *Format:* Playground simulasi — atur parameter, jalankan ribuan simulasi, lihat distribusi hasil.
  * [🔗 Matematika: Teori Peluang, Statistika, Kalkulus Integral]

---

## D · Komunikasi Ilmiah

Menyampaikan temuan, argumen, dan data secara jelas, jujur, dan persuasif.

### D1 · Menulis & Menyajikan Data

* 🔵 **Menulis Laporan Ilmiah *(Scientific Writing 101)***
  * Struktur: judul, abstrak, pendahuluan, metode, hasil, pembahasan, kesimpulan.
  * Bahasa objektif vs subjektif, gaya pasif vs aktif.
  * Kutipan dan daftar pustaka — mengapa penting.
  * *Format:* Template interaktif — isi kerangka laporan langkah demi langkah, contoh baik vs buruk berdampingan.

* 🟣 **Visualisasi Data Efektif *(Storytelling with Data)***
  * Memilih jenis grafik yang tepat untuk data yang tepat.
  * Prinsip: rasio data-tinta (*data-ink ratio*), hierarki visual, anotasi bermakna.
  * Anti-pola: efek "chartjunk", 3D yang tidak perlu, warna berlebihan.
  * *Format:* "Redesign this chart" — diberikan grafik buruk → pengguna memperbaiki elemen demi elemen.
  * [🔗 Matematika: Statistika Deskriptif, Regresi]

### D2 · Peer Review & Diskusi Ilmiah

* 🔘 **Seni Peer Review** *(opsional)*
  * Memberikan umpan balik konstruktif vs destruktif.
  * Checklist evaluasi: metodologi, bukti, reprodusibilitas, kejelasan.
  * Merespons kritik dengan perbaikan, bukan ego.
  * *Format:* Simulasi peer review — baca "paper" fiksi → tulis review → bandingkan dengan review contoh.

* 🔘 **Presentasi Ilmiah** *(opsional)*
  * Desain slide efektif: satu pesan per slide, visual > teks.
  * "Elevator pitch" sains — jelaskan riset dalam 60 detik.
  * *Format:* Checklist presentasi interaktif, contoh slide baik vs buruk.

---

## E · Etika & Tanggung Jawab STEM

Memahami implikasi moral, sosial, dan lingkungan dari perkembangan sains dan teknologi.

### E1 · Etika Sains & Riset

* 🟣 **Integritas Penelitian**
  * Fabrikasi, falsifikasi, dan plagiarisme — "FFP" tiga dosa besar.
  * Reprodusibilitas krisis (*replication crisis*) dalam sains modern.
  * Konflik kepentingan dan pendanaan riset.
  * *Format:* Studi kasus historis interaktif (kasus Hwang Woo-suk, Andrew Wakefield) → pengguna mengidentifikasi pelanggaran etik.
  * [🔗 Sains: Metode Ilmiah]

* 🔘 **Bioetika** *(opsional)*
  * Kloning, penyuntingan gen (CRISPR), uji coba pada manusia.
  * *Informed consent*, komite etik, dan prinsip *do no harm*.
  * Dilema trolley versi biomedis — pilihan tanpa jawaban mudah.
  * *Format:* Skenario dilema interaktif — pilih keputusan → lihat konsekuensi dari berbagai perspektif.
  * [🔗 Sains: Rekayasa Genetika & CRISPR, DNA]

### E2 · Etika Teknologi & AI

* 🟣 **Etika Kecerdasan Buatan**
  * Bias dalam dataset dan model ML — dampak diskriminatif.
  * Transparansi: *black box* vs *explainable AI*.
  * Deepfake, otomatisasi kerja, dan pengawasan massa.
  * *Format:* Studi kasus — "AI menolak pinjaman bank untuk kelompok tertentu" → telusuri penyebab, usulkan solusi.
  * [🔗 Matematika: Optimasi & ML, Statistika Inferensial]

* 🔘 **Privasi Data & Keamanan Digital** *(opsional)*
  * Jejak digital, metadata, dan pelacakan daring.
  * Enkripsi, hashing, dan mengapa privasi penting.
  * GDPR dan regulasi data — hak pengguna.
  * *Format:* Simulator "berapa banyak yang bisa diketahui tentang kamu dari metadata" → eye-opening interactive.
  * [🔗 Matematika: Kriptografi Modern]

### E3 · Tanggung Jawab Lingkungan

* 🟣 **Sains Perubahan Iklim *(Climate Literacy)***
  * Konsensus ilmiah vs skeptisisme — membaca bukti.
  * Jejak karbon personal dan kolektif.
  * Solusi berbasis sains: energi terbarukan, penangkapan karbon.
  * *Format:* Kalkulator jejak karbon interaktif + simulator kebijakan iklim (slider: pajak karbon, energi terbarukan, reforestasi → dampak suhu global).
  * [🔗 Sains: Siklus Biogeokimia, Energi Berkelanjutan, Termodinamika]

---

## F · Strategi Belajar & Metakognisi

Belajar *cara belajar* — keterampilan meta yang meningkatkan efektivitas seluruh jalur kurikulum.

### F1 · Mindset & Motivasi

* 🔵 **Growth Mindset dalam STEM**
  * Fixed vs growth mindset (Carol Dweck) — otak sebagai otot yang bisa dilatih.
  * Neuroplastisitas: belajar membentuk koneksi saraf baru.
  * Mengelola frustrasi: "belum bisa" vs "tidak bisa".
  * *Format:* Refleksi interaktif + tantangan mingguan: coba sesuatu yang sulit, catat progres.
  * [🔗 Sains: Sel & Organel (neuron, sinapsis)]

* 🔘 **Mengatasi Kecemasan Matematika *(Math Anxiety)*** *(opsional)*
  * Kenali pemicu: tekanan waktu, perbandingan sosial, pengalaman negatif.
  * Strategi: bernafas, mulai dari yang diketahui, visualisasi (itulah tujuan Nalar!).
  * Matematikawan terkenal yang pernah gagal — normalisasi kesulitan.
  * *Format:* Assessment kecemasan + panduan personal + "safe space" playground tanpa skor.

### F2 · Teknik Belajar Berbasis Bukti

* 🔵 **Pengulangan Berjarak *(Spaced Repetition)***
  * Kurva lupa Ebbinghaus dan interval optimal review.
  * Efek spasi (*spacing effect*) vs belajar maraton (*cramming*).
  * *Format:* Sistem review otomatis terintegrasi — platform merekomendasikan kapan harus mengulang materi berdasarkan performa tantangan sebelumnya.
  * *Visualisasi:* Kurva lupa interaktif — slider interval → lihat retensi memori.
  * [🔗 Matematika: Fungsi & Grafik (peluruhan eksponensial)]

* 🔵 **Recall Aktif & Teknik Feynman**
  * Active recall > passive re-reading — uji diri sendiri sebelum membaca ulang.
  * Teknik Feynman: jelaskan konsep dengan bahasa sederhana, identifikasi gap, perbaiki.
  * Elaborative interrogation: "mengapa ini benar?" untuk setiap fakta.
  * *Format:* "Jelaskan ke anak 10 tahun" — pengguna menulis penjelasan sederhana → AI mengevaluasi kejelasan.

* 🟣 **Interleaving & Variasi Latihan**
  * Latihan blok (topik A, A, A, B, B, B) vs interleaving (A, B, A, C, B, A).
  * Mengapa interleaving terasa lebih sulit tapi menghasilkan retensi lebih baik.
  * *Format:* Mode latihan platform: "Blok" vs "Campuran" — pengguna mencoba keduanya → bandingkan skor 1 minggu kemudian.
  * [🔗 Seluruh modul: prinsip lintas-topik]

### F3 · Manajemen Pembelajaran

* 🔘 **Manajemen Waktu & Teknik Pomodoro** *(opsional)*
  * Time blocking, Pomodoro (25 menit fokus + 5 menit istirahat).
  * Parkinson's law: "pekerjaan mengembang mengisi waktu yang tersedia".
  * *Format:* Timer Pomodoro bawaan platform, integrasi dengan sesi belajar.

* 🔘 **Pemetaan Pengetahuan *(Knowledge Mapping)*** *(opsional)*
  * Mind mapping, concept mapping, dan peta pengetahuan personal.
  * Menghubungkan topik lintas disiplin (matematika ↔ fisika ↔ kimia).
  * *Format:* Peta pengetahuan visual personal — platform otomatis menghubungkan topik yang telah dipelajari.
  * [🔗 Matematika: Teori Graf (visualisasi koneksi)]

---

## Integrasi dengan Kurikulum Utama

Modul soft skills tidak berdiri sendiri — mereka terhubung dan memperkuat materi STEM utama:

```
┌────────────────────────────────────────────────────────────────┐
│                    KURIKULUM UTAMA                             │
│  ┌──────────────┐       ┌──────────────────┐                   │
│  │  Matematika  │◄─────►│     Sains        │                   │
│  │  (35 modul)  │       │  (45 modul)      │                   │
│  └──────┬───────┘       └────────┬─────────┘                   │
│         │        ▲      ▲        │                             │
│         │        │      │        │                             │
│         ▼        │      │        ▼                             │
│  ┌──────────────────────────────────────────┐                  │
│  │         SOFT SKILLS (Side Plan)          │                  │
│  │  A. Berpikir Kritis    D. Komunikasi     │                  │
│  │  B. Literasi Data      E. Etika STEM     │                  │
│  │  C. Komputasional     F. Strategi Belajar│                  │
│  └──────────────────────────────────────────┘                  │
└────────────────────────────────────────────────────────────────┘
```

### Titik Integrasi Spesifik

| Momen di Kurikulum Utama | Soft Skill yang Disisipkan |
| :--- | :--- |
| Pertama kali membuka platform | F1: Growth Mindset, F2: Spaced Repetition (orientasi cara belajar) |
| Setelah menyelesaikan tantangan pertama | A2: Dekomposisi Masalah (refleksi proses berpikir) |
| Level 2 Sains: Metode Ilmiah | D1: Menulis Laporan Ilmiah |
| Level 3 Matematika: Statistika | B1: Membaca Grafik, B2: Klaim Statistik di Berita |
| Cabang B Sains: Bioteknologi | E1: Bioetika |
| Cabang B Matematika: Optimasi & ML | E2: Etika AI |
| Cabang Sains: Perubahan Iklim | E3: Tanggung Jawab Lingkungan |
| Gagal tantangan 2× berturut-turut | F1: Growth Mindset (dorongan motivasi kontekstual) |

---

## Ringkasan Modul Soft Skills

| Kategori | Modul | Fase |
| :--- | :--- | :---: |
| **A. Berpikir Kritis** | Anatomi Argumen | 🔵 |
| | Katalog Kekeliruan Logika | 🔵 |
| | Bias Kognitif dalam Sains | 🟣 |
| | Teknik Dekomposisi Masalah | 🔵 |
| | Estimasi & Masalah Fermi | 🟣 |
| **B. Literasi Data** | Anatomi Grafik | 🔵 |
| | Korelasi vs Kausalitas | 🔵 |
| | Klaim Statistik di Berita | 🟣 |
| | Visualisasi Data Menyesatkan | 🟣 |
| **C. Komputasional** | Pengenalan Pola | 🔵 |
| | Abstraksi & Pemodelan | 🔵 |
| | Algoritma & Pseudocode Visual | 🟣 |
| | Berpikir dalam Sistem | 🟣 |
| | Simulasi Monte Carlo Terapan | 🔘 |
| **D. Komunikasi** | Menulis Laporan Ilmiah | 🔵 |
| | Visualisasi Data Efektif | 🟣 |
| | Seni Peer Review | 🔘 |
| | Presentasi Ilmiah | 🔘 |
| **E. Etika STEM** | Integritas Penelitian | 🟣 |
| | Bioetika | 🔘 |
| | Etika Kecerdasan Buatan | 🟣 |
| | Privasi Data & Keamanan | 🔘 |
| | Sains Perubahan Iklim | 🟣 |
| **F. Strategi Belajar** | Growth Mindset | 🔵 |
| | Kecemasan Matematika | 🔘 |
| | Spaced Repetition | 🔵 |
| | Recall Aktif & Feynman | 🔵 |
| | Interleaving & Variasi | 🟣 |
| | Manajemen Waktu | 🔘 |
| | Pemetaan Pengetahuan | 🔘 |

**Total: 27 modul** — 9 🔵 v1.1 | 10 🟣 v2.0 | 8 🔘 Opsional
