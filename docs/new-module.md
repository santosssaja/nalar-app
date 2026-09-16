Saya ingin membangun MVP produk bernama **Nalar**, sebuah platform pembelajaran interaktif untuk STEM, dengan fokus awal pada **Matematika dan Sains**.

Saya melampirkan dua file yang harus digunakan sebagai **referensi kurikulum utama dan sumber kebenaran (canonical reference)**:

1. `roadmap-math.md` — roadmap kurikulum Matematika Nalar.
2. `roadmap-science.md` — roadmap kurikulum Sains Nalar.

Jangan mengganti, menyederhanakan secara sembarangan, atau membuat struktur kurikulum baru yang bertentangan dengan kedua file tersebut. Pertahankan istilah, hubungan prerequisite, struktur level, dan hubungan antar-konsep yang sudah ada. Gunakan general knowledge hanya untuk mengimplementasikan konsep yang memang sudah terdapat dalam roadmap.

## 1. Tujuan Produk

Nalar bukan LMS biasa yang hanya berisi:

> materi → teks → soal → nilai

Nalar harus terasa seperti **lingkungan belajar interaktif** tempat pengguna membangun pemahaman dari intuisi sampai kemampuan menerapkan konsep.

Prinsip utama pembelajaran:

**Realitas → Intuisi → Model → Formalisasi → Eksperimen → Latihan → Transfer → Mastery**

Setiap konsep idealnya dapat:

* dilihat
* dimanipulasi
* diprediksi
* diamati
* dijelaskan
* dihitung
* diterapkan pada situasi baru

Prinsip desain utama:

> **Every concept must be seen, manipulated, explained, calculated, and transferred.**

---

# 2. Scope MVP

Jangan implementasikan seluruh roadmap Matematika dan Sains.

MVP harus berupa **vertical slice yang benar-benar polished**, sehingga satu pengguna bisa merasakan keseluruhan pengalaman belajar Nalar dari awal sampai mastery.

Gunakan jalur awal berikut:

### Mathematics

1. Operasi Bilangan Riil & Garis Bilangan
2. Aljabar Elementer
3. Fungsi & Grafik
4. Trigonometri & Lingkaran Satuan

### Science

5. Besaran, Satuan SI & Analisis Dimensi
6. Kinematika

**Kinematika harus menjadi flagship learning experience MVP**, karena konsep ini memungkinkan integrasi Matematika dan Sains serta simulasi yang kaya.

Node lain dari roadmap boleh ditampilkan sebagai:

* locked
* coming soon
* planned

Tujuannya agar pengguna dapat melihat gambaran bahwa Nalar merupakan sebuah knowledge graph yang jauh lebih besar, tetapi implementasi mendalam hanya dilakukan pada vertical slice MVP.

---

# 3. Filosofi Curriculum

Roadmap Matematika dan Sains bukan sekadar daftar chapter.

Perlakukan roadmap sebagai **knowledge graph / prerequisite DAG**.

Setiap topic memiliki:

* id
* title
* subject
* level/phase
* prerequisite
* learning objectives
* concepts
* activities
* mastery state
* relationship dengan konsep lain

Contohnya:

Matematika:

Operasi Bilangan
→ Aljabar
→ Fungsi & Grafik
→ Trigonometri

Lalu:

Matematika
→ Besaran & Satuan
→ Kinematika

Sehingga pengguna dapat memahami bahwa matematika bukan materi terpisah dari sains, melainkan menjadi alat untuk membangun model sains.

---

# 4. Learning Experience

Setiap lesson menggunakan struktur konseptual berikut.

## A. Hook / Phenomenon

Mulai dari masalah, fenomena, atau pertanyaan.

Jangan langsung memberikan definisi.

Contoh Kinematika:

> "Sebuah mobil bergerak dari keadaan diam. Bagaimana kita mengetahui posisinya setelah 5 detik?"

Tujuan tahap ini adalah membangun rasa ingin tahu.

---

## B. Prediction

Sebelum melihat jawaban, pengguna diminta memprediksi.

Contoh:

> "Jika kecepatan awal diperbesar 2×, menurutmu bagaimana bentuk grafik posisi terhadap waktu?"

Pengguna harus membuat prediction terlebih dahulu.

---

## C. Explore

Berikan simulasi atau visualisasi yang bisa dimanipulasi.

Pengguna dapat mengubah parameter dan langsung melihat efeknya.

Jangan membuat simulasi hanya sebagai dekorasi.

Gunakan pola:

**Predict → Manipulate → Observe → Explain → Compare → Conclude**

---

## D. Discover

Setelah eksplorasi, bantu pengguna menemukan pola.

Jangan langsung mengatakan:

> v = v₀ + at

Berikan konteks sehingga pengguna memahami mengapa hubungan tersebut muncul.

---

## E. Formalize

Setelah intuisi terbentuk, barulah masuk ke bahasa formal:

* definisi
* simbol
* persamaan
* grafik
* notasi
* satuan

Gunakan equation rendering yang bagus.

---

## F. Derivation / Reasoning

Jika memungkinkan, jangan sekadar memberikan formula.

Tunjukkan bagaimana formula diperoleh.

Contohnya pada GLBB:

hubungan antara percepatan → perubahan kecepatan → posisi.

Tujuannya agar pengguna memahami asal-usul persamaan, bukan menghafalnya.

---

## G. Guided Practice

Berikan latihan dengan bantuan bertahap.

Jenis aktivitas:

* prediction
* multiple choice konseptual
* manipulasi grafik
* input angka
* drag-and-drop
* interpretasi visual
* penyelesaian persamaan

---

## H. Independent Practice

Setelah latihan terbimbing, berikan masalah tanpa scaffolding.

Pengguna harus memilih strategi sendiri.

---

## I. Virtual Laboratory

Untuk materi sains, buat simulasi seperti laboratorium virtual.

Strukturnya:

1. pertanyaan eksperimen
2. hipotesis
3. parameter
4. eksperimen
5. observasi
6. data
7. analisis
8. kesimpulan

Simulasi harus membuat pengguna merasa sedang melakukan eksperimen, bukan sekadar memainkan slider.

---

## J. Transfer Challenge

Ini bagian penting.

Jangan akhiri lesson setelah pengguna bisa mengerjakan soal yang mirip dengan contoh.

Berikan masalah baru yang membutuhkan transfer konsep.

Contoh:

Setelah mempelajari GLBB, pengguna diberi situasi dunia nyata dan harus menentukan:

* variabel
* model
* persamaan
* parameter
* prediksi
* interpretasi hasil

---

## K. Mastery Check

Akhiri lesson dengan evaluasi yang mengukur beberapa dimensi:

* conceptual understanding
* procedural fluency
* mathematical reasoning
* problem solving
* transfer

Jangan hanya menggunakan pilihan ganda.

---

# 5. Math Learning Design

Untuk Matematika gunakan pola:

**Visual → Pattern → Intuition → Symbol → Procedure → Reasoning → Application**

Contohnya pada fungsi:

pengguna terlebih dahulu melihat hubungan input-output.

Kemudian melihat pola perubahan.

Setelah itu diperkenalkan notasi:

f(x)

Kemudian grafik.

Kemudian operasi pada fungsi.

Kemudian interpretasi dan penerapannya.

Matematika harus terasa sebagai sesuatu yang dapat **dilihat dan dimainkan**, bukan sekadar simbol di halaman.

---

# 6. Science Learning Design

Untuk Sains gunakan pola:

**Phenomenon → Question → Hypothesis → Experiment → Observation → Data → Model → Mathematics → Application**

Pengguna harus memahami bahwa persamaan sains adalah model untuk menjelaskan fenomena.

Contoh Kinematika:

fenomena gerak
→ observasi
→ posisi terhadap waktu
→ velocity
→ acceleration
→ grafik
→ persamaan matematika
→ prediksi gerak.

---

# 7. MVP Kinematika

Kinematika adalah flagship experience.

Implementasikan minimal:

### Konsep

* posisi
* jarak
* perpindahan
* waktu
* kecepatan
* percepatan
* GLB
* GLBB
* jatuh bebas
* gerak parabola

### Visualisasi

Sediakan simulasi objek bergerak.

Parameter minimal:

* initial position
* initial velocity
* acceleration
* time
* projectile angle
* projectile speed

Tampilkan secara sinkron:

1. animasi objek
2. position-time graph
3. velocity-time graph
4. acceleration-time graph

Ketika parameter diubah, semua visualisasi harus berubah secara real-time.

---

# 8. Prediction-Based Simulation

Sebelum menjalankan simulasi, pengguna harus diberi pertanyaan prediksi.

Contoh:

> "Jika percepatan dibuat dua kali lipat, bagaimana perubahan grafik velocity-time?"

Kemudian pengguna menjalankan simulasi.

Setelah itu tampilkan:

**Your prediction**

vs.

**What actually happened**

Kemudian minta pengguna menjelaskan perbedaannya.

Ini harus menjadi pola penting dalam desain simulasi Nalar.

---

# 9. Hint System

Setiap problem memiliki sistem hint bertahap.

Gunakan empat level:

### Hint 1

Mengarahkan perhatian.

Contoh:

> "Coba perhatikan informasi apa yang diberikan oleh soal."

### Hint 2

Mengarahkan ke konsep.

> "Perubahan kecepatan terhadap waktu berkaitan dengan konsep apa?"

### Hint 3

Memberikan strategi.

> "Gunakan hubungan a = Δv / Δt."

### Hint 4

Hampir menyelesaikan soal.

Kemudian pengguna tetap harus melakukan langkah terakhir.

Jangan langsung memberikan jawaban.

---

# 10. AI Tutor

MVP harus memiliki AI Tutor shell yang kontekstual.

AI Tutor bukan chatbot generik yang berada di sidebar.

Tutor harus mengetahui konteks pengguna:

* current topic
* current lesson
* mastery
* kesalahan sebelumnya
* hint yang sudah digunakan
* aktivitas yang sedang dilakukan

Tutor seharusnya membantu pengguna menemukan jawaban sendiri.

Untuk MVP, tidak wajib menggunakan LLM sungguhan apabila terlalu kompleks.

Boleh menggunakan:

* predefined contextual responses
* rule-based tutor
* state-based responses

Yang penting arsitektur dibuat agar nantinya dapat diganti dengan LLM sungguhan.

---

# 11. Learner Model

Simpan state pengguna.

Minimal:

* topic mastery
* concept mastery
* attempt history
* mistakes
* hints used
* completed activities
* last activity
* recommended next activity

Mastery jangan hanya berupa satu angka.

Gunakan beberapa dimensi:

```text
Conceptual Understanding
Procedural Fluency
Reasoning
Problem Solving
Transfer
```

---

# 12. Learning Modes

Pertimbangkan tiga mode:

### Explore

Pengguna bebas bermain dengan konsep.

### Learn

Pengguna mengikuti learning path yang terstruktur.

### Master

Pengguna menguji apakah benar-benar menguasai konsep.

MVP minimal harus mengimplementasikan konsep mode tersebut, meskipun tidak semuanya membutuhkan UI terpisah.

---

# 13. Curriculum / Skill Tree

Buat halaman Skill Tree.

Tampilan harus memperlihatkan prerequisite graph.

Setiap node menampilkan:

* nama topic
* subject
* level
* status
* mastery
* prerequisite
* locked/unlocked

Visualisasi graph dapat menggunakan React Flow atau teknologi serupa.

Contoh:

```text
Bilangan Riil
      ↓
Aljabar
      ↓
Fungsi
      ↓
Trigonometri
      ↓
Kinematika
```

Namun struktur sebenarnya harus mengikuti prerequisite yang terdapat pada file roadmap.

---

# 14. Dashboard

Dashboard pengguna harus menampilkan:

### Continue Learning

Lesson terakhir.

### Recommended Next

Aktivitas yang paling relevan berdasarkan prerequisite/mastery.

### Mastery

Progress pengguna dalam bentuk visual.

### Experiments

Eksperimen yang tersedia.

### Knowledge Connections

Hubungan antar konsep.

Dashboard jangan terasa seperti dashboard LMS administratif.

Harus terasa seperti **learning environment**.

---

# 15. Connection Between Math and Science

Salah satu identitas utama Nalar adalah menghubungkan matematika dengan sains.

Berikan connection card seperti:

> Mathematics: Functions & Graphs
> ↓
> Science: Kinematics

Kemudian jelaskan bahwa grafik matematika digunakan untuk merepresentasikan perubahan posisi, kecepatan, dan percepatan.

Gunakan pendekatan serupa untuk hubungan konsep lain yang memang didukung oleh roadmap.

---

# 16. Retrieval & Review

Jangan membuat pengguna selesai belajar lalu langsung melupakan konsep.

Tambahkan sistem review sederhana:

* retrieval questions
* interleaved practice
* revisit previous concepts
* mixed problems

Contoh:

Setelah belajar kinematika, pengguna dapat menerima satu pertanyaan tentang fungsi/grafik karena konsep tersebut merupakan prerequisite matematika.

---

# 17. Lab Notebook

Untuk eksperimen sains, pengguna memiliki notebook sederhana.

Isi:

```text
Question
Hypothesis
Variables
Prediction
Observation
Data
Conclusion
```

Notebook ini dapat tersimpan sebagai bagian dari learner state.

---

# 18. Data Architecture

Buat content architecture yang data-driven.

Jangan hardcode seluruh lesson langsung di komponen React.

Gunakan struktur konseptual seperti:

```ts
Subject
Topic
Prerequisite
Lesson
LessonSection
Activity
Simulation
Question
Hint
Attempt
MasteryState
Connection
```

Contoh topic:

```ts
{
  id: "science-kinematics",
  title: "Kinematika",
  subject: "science",
  prerequisites: [
    "science-si-units",
    "math-functions-graphs",
    "math-trigonometry"
  ],
  objectives: [],
  sections: [],
  simulation: {},
  assessments: []
}
```

Struktur actual content harus disesuaikan dengan roadmap yang diberikan.

---

# 19. UI / UX

Desain Nalar harus terasa:

* modern
* calm
* premium
* scientific
* interactive
* clean
* focused

Jangan membuatnya terlihat seperti aplikasi anak-anak.

Hindari:

* gamifikasi berlebihan
* terlalu banyak badge
* confetti berlebihan
* progress bar di mana-mana
* desain seperti LMS kampus
* UI generik hasil template.

Nalar harus lebih dekat dengan:

**interactive scientific notebook + modern learning platform + visual knowledge graph**

daripada LMS tradisional.

---

# 20. Accessibility

Pastikan:

* typography mudah dibaca
* equation rendering jelas
* kontras baik
* keyboard navigation
* responsive desktop/mobile
* visualisasi tidak hanya mengandalkan warna
* feedback kesalahan mudah dipahami

---

# 21. MVP Technical Architecture

Gunakan arsitektur yang mudah dikembangkan.

Komponen utama:

```text
Nalar
│
├── Knowledge Graph
│
├── Learner Model
│
├── Learning Engine
│
├── Lesson System
│
├── Simulation Engine
│
├── Assessment Engine
│
├── AI Tutor
│
└── Progress / Mastery
```

Alur:

```text
Knowledge Graph
       ↓
Learning Engine
       ↓
Lesson / Simulation
       ↓
Assessment
       ↓
Learner Model
       ↓
Recommendation
       ↓
Next Activity
```

---

# 22. MVP Success Criteria

MVP dianggap berhasil jika pengguna dapat:

1. Membuka Nalar dan langsung memahami apa produk ini.
2. Melihat roadmap/skill tree Matematika dan Sains.
3. Melihat hubungan prerequisite antar konsep.
4. Memulai learning path.
5. Mempelajari konsep melalui kombinasi visual, teks, interaksi, dan latihan.
6. Melakukan prediction sebelum simulasi.
7. Memanipulasi simulasi.
8. Melihat perubahan visualisasi dan grafik secara real-time.
9. Mengerjakan latihan dengan sistem hint bertahap.
10. Mendapatkan contextual AI tutor.
11. Menyelesaikan transfer challenge.
12. Mendapatkan mastery state.
13. Melihat hubungan antara konsep Matematika dan Sains.
14. Melanjutkan pembelajaran berdasarkan prerequisite dan mastery.

---

# 23. Prioritas Implementasi

Prioritaskan kualitas pengalaman, bukan jumlah fitur.

Urutan implementasi:

### Phase 1 — Foundation

* app shell
* navigation
* dashboard
* curriculum data model
* skill tree
* prerequisite system

### Phase 2 — Learning System

* lesson renderer
* sections
* activities
* questions
* hints
* mastery

### Phase 3 — Interactive Math

* number line
* algebra interaction
* function graph
* trigonometry/unit circle

### Phase 4 — Science

* SI units
* dimensional analysis
* kinematics

### Phase 5 — Flagship Simulation

Bangun kinematics simulator dengan kualitas tinggi.

### Phase 6 — AI Tutor

Tambahkan contextual tutor architecture.

### Phase 7 — Review

Tambahkan retrieval practice dan recommended learning.

---

# 24. Important Development Rule

Jangan mencoba membangun seluruh roadmap.

Bangun sedikit tetapi benar-benar terasa seperti produk nyata.

Lebih baik:

> 6 topic dengan pengalaman belajar sangat bagus

daripada:

> 100 topic yang hanya berisi text + multiple choice.

Roadmap digunakan untuk memastikan MVP memiliki fondasi yang benar dan dapat berkembang menjadi platform penuh.

---

# 25. Final Product Vision

Bayangkan seseorang membuka Nalar dan tidak merasa sedang membaca buku pelajaran.

Mereka merasa sedang:

* mengeksplorasi konsep
* melakukan eksperimen
* menemukan pola
* membangun model
* bermain dengan variabel
* memahami matematika
* menghubungkan matematika dengan dunia nyata
* memecahkan masalah
* dan secara bertahap membangun peta pengetahuan mereka sendiri.

**Nalar harus mengajarkan cara berpikir, bukan hanya memberikan informasi.**

Gunakan kedua file roadmap yang disediakan sebagai sumber utama untuk menentukan isi dan struktur kurikulum. Bangun MVP sebagai fondasi produk yang nantinya dapat diperluas ke seluruh roadmap Matematika dan Sains.
