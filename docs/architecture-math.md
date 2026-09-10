## 1. Arsitektur Konsep & UX (*Learning Experience Design*)

Agar tidak menjadi sekadar repositori teks rumus, terapkan filosofi **"Intuisi Visual $\rightarrow$ Manipulasi Parameter $\rightarrow$ Formalisasi Matematis"**.

```
[1. Hook Fenomena/Visual]  --> Animasi interaktif tanpa rumus rumit
           │
[2. Interactive Sandbox]   --> Pengguna mengubah slider/vektor/koordinat langsung
           │
[3. Formalisasi Simbolik]  --> Rumus formal diturunkan dari pola yang baru saja dimanipulasi
           │
[4. Tantangan Mini (Quiz)] --> Masalah yang diselesaikan dengan menyetel parameter secara tepat

```

### Navigasi: Non-Linear Skill Tree (Peta Keterampilan)

* Tampilkan kurikulum dalam bentuk **Skill Tree / Directed Acyclic Graph (DAG)** interaktif (mirip pohon riset pada *game* strategi).
* Node materi saling terhubung dengan dependensi jelas (misalnya: membuka *Kalkulus Multivariabel* memerlukan *Kalkulus 1* dan *Aljabar Linear*).
* Setiap node memiliki indikator progres dan tingkat penguasaan (*intuition clear, proofs understood, challenges solved*).

---

## 2. Pustaka & Tech Stack yang Direkomendasikan

Untuk menghadirkan matematika dinamis di web modern, kombinasi stack berikut merupakan standar performa tinggi:

### A. Inti Aplikasi & Manajemen Konten

* **Framework:** Next.js (React). Cocok untuk perpaduan artikel edukasi berbasis teks (SEO-friendly) dan komponen visual dinamis.
* **Format Penulisan Konten:** **MDX** (`.mdx`). Memungkinkan penulisan materi dalam Markdown biasa, namun dapat menyematkan komponen visual React interaktif di tengah-tengah paragraf:
```mdx
Perhatikan bagaimana matriks mengubah ruang vektor berikut:
<MatrixTransform2D defaultMatrix={[[2, 1], [0, 1]]} />

```

* **Render Simbol Matematika:** **KaTeX** (jauh lebih cepat dalam rendering sisi klien maupun SSR dibanding MathJax konvensional).

### B. Visualisasi Matematika & Grafis Interaktif

Pilih *tool* berdasarkan dimensi dan kompleksitas visual materi:

| Kebutuhan Visual | Rekomendasi Pustaka | Penggunaan Ideal |
| --- | --- | --- |
| **Visualisasi Matematika 2D Khusus** | **Mafs** (React math visualizer) | Plot fungsi, grid transformasi matriks, medan vektor, Riemann sum, titik tangen kalkulus. Komponennya terinspirasi dari animasi 3Blue1Brown. |
| **Grafik Data & Jaringan (Graph Theory)** | **D3.js** atau **Cytoscape.js** | Visualisasi simpul dan sisi, traversal BFS/DFS, pohon biner, aliran jaringan (*network flow*). |
| **Ruang 3D & Manifold** | **Three.js** / **React Three Fiber (R3F)** | Permukaan multivariabel, koordinat bola/silinder, topologi pita Möbius, kelengkungan ruang, medan vektor 3D. |
| **Simulasi Partikel & Fisika Probabilitas** | **HTML5 Canvas / PixiJS** + **Matter.js** | Simulasi papan Galton (Plinko) untuk distribusi normal, estimasi Monte Carlo $\pi$, gas ideal. |
| **Komputasi Simbolik & Numerik** | **Math.js** atau **nerdamer** | Menghitung determinan, turunan simbolik, atau inversi matriks langsung di sisi peramban (*client-side*). |

---

## 3. Ide Interaktivitas Spesifik per Cabang Matematika

### A. Aljabar Linear (Kunci: Transformasi Ruang)

* **2D Matrix Transformer:** Pengguna menggeser vektor basis $\hat{i} = [1, 0]$ dan $\hat{j} = [0, 1]$ pada kisi koordinat. Saat ditarik, seluruh grid di latar belakang ikut berotasi, meregang (*scaling*), atau memotong (*shearing*).
* **Eigenvector Finder:** Menampilkan lingkaran vektor unit. Pengguna memutar vektor di sepanjang lingkaran hingga menemukan arah di mana vektor output sejajar dengan vektor input (vektor eigen) dan panjangnya berubah sebesar skalar tertentu (nilai eigen).
* **3D Dot & Cross Product:** Memanipulasi dua panah vektor di ruang 3D, menampilkan proyeksi bayangan (*dot product*) dan bidang jajaran genjang yang tegak lurus (*cross product*).

### B. Kalkulus & Analisis

* **Interactive Tangent & Secant (Turunan):** Dua titik $x$ dan $x + \Delta x$ pada kurva. Pengguna menggeser slider $\Delta x \to 0$, memperlihatkan garis sekan secara halus bertransisi menjadi garis singgung tangen.
* **Dynamic Riemann Sum (Integral):** Pengguna menggeser slider jumlah persegi panjang $N$ dari $3$ hingga $1000$. Area di bawah kurva diarsir secara *real-time*, memperlihatkan eror aproksimasi mengecil menuju nilai integral pasti.
* **Vector Field Flow (Persamaan Diferensial):** Medan vektor 2D di mana pengguna dapat melepas ribuan partikel kecil untuk melihat aliran (*streamlines*) dari sistem diferensial $\frac{dx}{dt}$ dan $\frac{dy}{dt}$.

### C. Matematika Diskrit & Struktur Data

* **Interactive Graph Playground:** Kanvas kosong di mana pengguna bisa mengklik untuk membuat simpul (*node*), menarik garis untuk sisi berbobot, lalu menekan tombol *Play* untuk melihat algoritma Dijkstra atau A* mewarnai jalur terpendek langkah demi langkah.
* **Modulo Clock (Aritmetika Modular):** Lingkaran jam dengan jumlah angka variabel ($n$). Menunjukkan perkalian modular secara visual (membentuk pola kardioid dan fraktal saat perkalian dinaikkan).

### D. Probabilitas & Statistika

* **Monte Carlo Experiment:** Tombol "Jatuhkan 10.000 Titik" ke dalam seperempat lingkaran di dalam persegi untuk menghitung rasio luas dan mengestimasi nilai $\pi$.
* **Central Limit Theorem Playground:** Pengguna menggambar sendiri distribusi probabilitas acak apa pun (bahkan yang aneh atau bimodal). Platform kemudian mengambil sampel berulang kali dan menampilkan bagaimana distribusi rata-rata sampel selalu membentuk lonceng Gaussian (*Bell Curve*).

---

## 4. Arsitektur Komponen Teknis (Pola Implementasi)

Untuk menjaga performa tetap mulus (60 FPS) tanpa membebani browser:

### Struktur Komponen Interaktif

Pisahkan antara state interaktif, kalkulasi matematis, dan layer grafis:

```
[Parent: MDX Page]
    │
    ▼
[Controller Component] ── State: parameter (x, y, scale, speed, step)
    │
    ├── [Control Panel]: UI Slider, Checkbox, Toggle KaTeX
    │
    └── [Viewport Canvas/WebGL]:
            ├── Menghitung koordinat baru via Math.js / WebGL shaders
            └── Render via Mafs / Three.js / Canvas 2D

```

### Praktik Performa Penting

1. **Web Workers untuk Komputasi Berat:** Jika ada simulasi numerik berat (seperti simulasi 100.000 partikel atau integral numerik berdimensi tinggi), jalankan kalkulasi di *Web Worker* terpisah agar UI thread peramban tidak *freeze*.
2. **Dekorasi State Terisolasi:** Jangan biarkan perubahan slider matematis memicu *re-render* seluruh halaman dokumen; batasi pembaruan DOM hanya pada canvas bersangkutan.
3. **Responsi Mobile:** Sediakan mode fallback sentuhan (gesture pinch-to-zoom dan drag) atau mode demonstrasi otomatis (animasi otomatis bergerak jika dibuka di layar ponsel kecil).

---

## 5. Rencana Tahapan Eksekusi (MVP)

1. **Fase 1: Proof of Concept (Satu Modul Inti)**
* Bangun 1 topik pembuktian visual yang sangat menarik, misalnya: *"Aljabar Linear: Memvisualisasikan Determinan sebagai Perubahan Luas Wilayah 2D"*.
* Gunakan Next.js + Tailwind CSS + **Mafs**.

2. **Fase 2: Sistem MDX & Komponen Dasar**
* Buat template visual yang dapat dipakai ulang (*reusable*): komponen slider numerik, panel fungsi matematika, dan kanvas koordinat interaktif.

3. **Fase 3: Kerangka Peta Keterampilan (*Skill Tree*)**
* Rancang visualisasi pohon relasi materi menggunakan D3.js atau library diagram node (seperti React Flow).

4. **Fase 4: Ekspansi Materi Bertahap**
* Rilis modul mengikuti alur: Fondasi Kalkulus $\rightarrow$ Aljabar Linear $\rightarrow$ Probabilitas $\rightarrow$ Topik Lanjutan.