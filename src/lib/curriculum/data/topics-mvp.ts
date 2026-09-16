import { CanonicalTopic } from "../types";

/**
 * MVP vertical slice topics (6 flagship). Split from topics.ts to keep files <250 lines.
 * Defined per docs/new-module.md Section 2.
 */
export const MVP_TOPICS: CanonicalTopic[] = [
  // ══════════════════════════════════════════════════════════════════
  // MVP VERTICAL SLICE (6 FLAGSHIP TOPICS - docs/new-module.md Section 2)
  // ══════════════════════════════════════════════════════════════════

  // 1. Math MVP 1
  {
    id: "math-real-numbers",
    slug: "math-real-numbers",
    title: "Operasi Bilangan Riil & Garis Bilangan",
    subject: "math",
    domain: "arithmetic",
    level: 1,
    stage: "explorer",
    phase: "mvp",
    summary:
      "Membangun intuisi spasial kontinum garis bilangan, bilangan bulat, pecahan, desimal, rasio, serta hukum asosiatif dan distributif secara geometris.",
    description:
      "Bilangan bukan sekadar angka mati yang dihafal. Di Nalar, kita memvisualisasikan bilangan riil sebagai garis kontinum dinamis dengan zoom tak hingga, melihat penjumlahan sebagai translasi vektor arah, dan perkalian sebagai dilatasi skala spasial.",
    audioNarrationText:
      "Selamat datang di modul Operasi Bilangan Riil. Di sini kamu akan menjelajahi garis bilangan tak hingga, mengamati translasi arah, dan menemukan bahwa operasi matematika memiliki bentuk geometris yang nyata.",
    prerequisites: [],
    unlocks: ["math-elementary-algebra", "science-si-units", "arithmetic-modular-clock", "math-euclid"],
    learningObjectives: [
      "Memahami garis bilangan riil sebagai ruang kontinu satu dimensi",
      "Menginterpretasikan penjumlahan dan pengurangan sebagai translasi vektor",
      "Memahami perkalian dan pembagian sebagai dilatasi skala",
      "Menemukan hukum distributif melalui luas persegi panjang geometris",
    ],
    concepts: ["Garis Bilangan", "Translasi Vektor", "Dilatasi Skala", "Kerapatan Rasional", "Hukum Distributif"],
    sections: [
      { id: "sec-hook", title: "Fenomena Spasial Bilangan", type: "hook", summary: "Bagaimana meletakkan bilangan irasional persis di atas garis?" },
      { id: "sec-explore", title: "Eksplorasi Garis Kontinum", type: "explore", summary: "Geser titik, amati vektor translasi dan perbesaran skala real-time." },
      { id: "sec-formalize", title: "Formalisasi Operasi Bilangan", type: "formalize", summary: "Aksioma lapangan dan hukum distributif geometris." },
      { id: "sec-practice", title: "Latihan Interaktif", type: "practice", summary: "Tantangan logika menentukan posisi pecahan dan perbandingan nilai mutlak." },
    ],
    xpReward: 100,
    isAvailable: true,
    route: "/topics/math-real-numbers",
    position: { x: 120, y: 120 },
  },

  // 2. Math MVP 2
  {
    id: "math-elementary-algebra",
    slug: "math-elementary-algebra",
    title: "Aljabar Elementer",
    subject: "math",
    domain: "algebra",
    level: 1,
    stage: "explorer",
    phase: "mvp",
    summary:
      "Memahami variabel sebagai kuantitas dinamis tak diketahui, timbangan kesetaraan, manipulasi pertidaksamaan, dan sistem persamaan linear dua variabel.",
    description:
      "Aljabar bukan sekadar memindahkan ruas rumus. Aljabar adalah seni menjaga kesetimbangan timbangan logika. Setiap operasi di satu sisi harus diimbangi di sisi lain secara simetris.",
    audioNarrationText:
      "Aljabar elementer mengubah cara berpikir dari menghitung angka menjadi memanipulasi hubungan kesetaraan. Rasakan timbangan kesetimbangan logika yang tidak boleh miring.",
    prerequisites: ["math-real-numbers"],
    unlocks: ["math-functions-graphs", "math-trig-unit-circle", "linear-algebra-determinant-2d"],
    learningObjectives: [
      "Memodelkan variabel sebagai beban tersembunyi pada timbangan setimbang",
      "Memahami sifat invariant kesetaraan melalui operasi serentak kedua ruas",
      "Menyelesaikan sistem persamaan linear dua variabel secara geometris (perpotongan garis)",
      "Menganalisis daerah pertidaksamaan pada bidang kartesius",
    ],
    concepts: ["Variabel Dinamis", "Timbangan Kesetaraan", "Sistem Persamaan Linear", "Titik Potong Garis"],
    sections: [
      { id: "sec-hook", title: "Teka-teki Timbangan", type: "hook", summary: "Berapa massa kotak misterius jika 3 kotak + 5 kg setimbang dengan 20 kg?" },
      { id: "sec-explore", title: "Simulator Timbangan Logika", type: "explore", summary: "Manipulasi kedua ruas timbangan dan temukan nilai variabel secara intuitif." },
      { id: "sec-formalize", title: "Notasi Aljabar & Kesetaraan", type: "formalize", summary: "Operasi kesetaraan linear dan metode eliminasi Gauss-Jordan." },
      { id: "sec-practice", title: "Tantangan Kesetimbangan", type: "practice", summary: "Selesaikan persamaan dua variabel dengan visualisasi grafik simultan." },
    ],
    xpReward: 110,
    isAvailable: true,
    route: "/topics/math-elementary-algebra",
    position: { x: 380, y: 120 },
  },

  // 3. Math MVP 3
  {
    id: "math-functions-graphs",
    slug: "math-functions-graphs",
    title: "Fungsi & Grafik",
    subject: "math",
    domain: "calculus",
    level: 1,
    stage: "explorer",
    phase: "mvp",
    summary:
      "Konsep fungsi sebagai mesin pemetaan input-output, transformasi grafik (translasi, refleksi, dilatasi), serta jenis fungsi polinomial dan rasional.",
    description:
      "Fungsi adalah jantung pemodelan matematis. Dari laju mobil hingga penyebaran sinyal, fungsi menghubungkan sebab (domain) dengan akibat (kodomain), divisualisasikan lewat kurva bidang kartesius reaktif.",
    audioNarrationText:
      "Fungsi menghubungkan dunia matematika dengan fenomena alam. Amati bagaimana mengubah parameter fungsi langsung menggeser dan melengkungkan grafik di depan matamu.",
    prerequisites: ["math-elementary-algebra"],
    unlocks: ["math-limits-continuity", "science-kinematics"],
    learningObjectives: [
      "Memvisualisasikan fungsi sebagai mesin input-output satu nilai pasti",
      "Memahami domain, range, dan kontinuitas pemetaan",
      "Menguasai transformasi grafik f(x - c) + d, af(x), dan f(ax) secara visual",
      "Menghubungkan kemiringan garis sekan dengan laju perubahan rata-rata",
    ],
    concepts: ["Mesin Pemetaan", "Domain & Range", "Transformasi Grafik", "Laju Perubahan"],
    sections: [
      { id: "sec-hook", title: "Dari Tabel ke Kurva", type: "hook", summary: "Bagaimana meramalkan nilai di antara titik data eksperimen?" },
      { id: "sec-explore", title: "Transformator Kurva Interaktif", type: "explore", summary: "Ubah parameter a, b, c dan saksikan pergeseran kurva seketika." },
      { id: "sec-formalize", title: "Notasi Matematis Fungsi", type: "formalize", summary: "Definisi formal f: X -> Y dan aljabar komposisi fungsi." },
      { id: "sec-practice", title: "Mencocokkan Grafik Target", type: "practice", summary: "Tantangan memodifikasi slider kurva hingga melewati titik-titik target." },
    ],
    xpReward: 120,
    isAvailable: true,
    route: "/topics/math-functions-graphs",
    position: { x: 640, y: 120 },
  },

  // 4. Math MVP 4
  {
    id: "math-trig-unit-circle",
    slug: "math-trig-unit-circle",
    title: "Trigonometri & Lingkaran Satuan",
    subject: "math",
    domain: "geometry",
    level: 1,
    stage: "navigator",
    phase: "mvp",
    summary:
      "Rasio trigonometri sin, cos, tan, lingkaran satuan berjejari 1, proyeksi koordinat polar, grafik fungsi periodik, dan identitas Pythagoras.",
    description:
      "Trigonometri bukan sekadar hafalan sudut istimewa segitiga siku-siku. Dengan lingkaran satuan, sinus dan kosinus adalah proyeksi horizontal dan vertikal dari titik yang berputar di keliling lingkaran.",
    audioNarrationText:
      "Putar titik pada lingkaran satuan dan perhatikan proyeksi bayangannya pada sumbu X dan sumbu Y. Dari rotasi inilah gelombang sinus dan kosinus tercipta.",
    prerequisites: ["math-elementary-algebra"],
    unlocks: ["science-kinematics", "physics-wave-simulator", "physics-harmonic-oscillator"],
    learningObjectives: [
      "Mendefinisikan sinus dan kosinus sebagai koordinat (cos θ, sin θ) pada lingkaran satuan",
      "Memahami radian sebagai rasio panjang busur terhadap jari-jari",
      "Membuktikan identitas Pythagoras sin²θ + cos²θ = 1 secara visual",
      "Menguraikan vektor 2D ke dalam komponen ortogonal horizontal dan vertikal",
    ],
    concepts: ["Lingkaran Satuan", "Koordinat Polar", "Radian", "Proyeksi Ortogonal", "Fungsi Periodik"],
    sections: [
      { id: "sec-hook", title: "Roda Berputar & Gelombang", type: "hook", summary: "Mengapa gerakan melingkar roda menghasilkan lintasan gelombang naik-turun?" },
      { id: "sec-explore", title: "Kanvas Lingkaran Satuan", type: "explore", summary: "Putar jarum sudut, lihat proyeksi garis sin (vertikal) dan cos (horizontal)." },
      { id: "sec-formalize", title: "Identitas Trigonometri Fundamental", type: "formalize", summary: "Kaitan rumus Pythagoras dan rasio tangen." },
      { id: "sec-practice", title: "Tantangan Proyeksi Sudut", type: "practice", summary: "Tebak sudut θ untuk memposisikan komponen horizontal dan vertikal yang diminta." },
    ],
    xpReward: 130,
    isAvailable: true,
    route: "/topics/math-trig-unit-circle",
    position: { x: 640, y: 300 },
  },

  // 5. Science MVP 1
  {
    id: "science-si-units",
    slug: "science-si-units",
    title: "Besaran, Satuan SI & Analisis Dimensi",
    subject: "science",
    domain: "physics",
    level: 1,
    stage: "explorer",
    phase: "mvp",
    summary:
      "Besaran pokok dan turunan sistem internasional (SI), konversi satuan, angka penting, notasi ilmiah, serta teknik analisis dimensi untuk memvalidasi rumus fisika.",
    description:
      "Sains bermula dari pengukuran yang terukur dan objektif. Analisis dimensi adalah alat sakti ilmuwan: sebelum melakukan eksperimen mahal, kita bisa menguji apakah sebuah rumus fisika masuk akal hanya dari dimensinya.",
    audioNarrationText:
      "Sebelum mempelajari gerak dan gaya, kita membutuhkan bahasa standar pengukuran. Pelajari bagaimana dimensi massa, panjang, dan waktu menyusun seluruh rumus sains fisis.",
    prerequisites: ["math-real-numbers"],
    unlocks: ["science-kinematics"],
    learningObjectives: [
      "Membedakan 7 besaran pokok SI dengan besaran turunan",
      "Menerapkan analisis dimensi [M], [L], [T] untuk menguji validitas rumus",
      "Mengonversi satuan dengan prinsip faktor konversi satu (unit factor)",
      "Menghitung ketidakpastian pengukuran dan angka penting",
    ],
    concepts: ["Besaran Pokok & Turunan", "Analisis Dimensi", "Notasi Ilmiah", "Faktor Konversi"],
    sections: [
      { id: "sec-hook", title: "Misteri Pesawat Luar Angkasa Mars", type: "hook", summary: "Kisah nyata wahana Mars Climate Orbiter yang hancur akibat salah satuan." },
      { id: "sec-explore", title: "Timbangan & Penggaris Virtual", type: "explore", summary: "Uji coba pengukuran alat ukur presisi dengan batas ketelitian berbeda." },
      { id: "sec-formalize", title: "Aljabar Dimensi", type: "formalize", summary: "Aturan homogenitas dimensi dan penentuan konstanta fisis tak dikenal." },
      { id: "sec-practice", title: "Detektif Rumus", type: "practice", summary: "Temukan rumus mana yang secara dimensi cacat dan mustahil terjadi di alam." },
    ],
    xpReward: 100,
    isAvailable: true,
    route: "/topics/science-si-units",
    position: { x: 380, y: 300 },
  },

  // 6. Science MVP 2 (FLAGSHIP MVP)
  {
    id: "science-kinematics",
    slug: "science-kinematics",
    title: "Kinematika",
    subject: "science",
    domain: "physics",
    level: 1,
    stage: "explorer",
    phase: "mvp",
    isMvpFlagship: true,
    summary:
      "Flagship MVP Nalar: Studi gerak objek (posisi, kecepatan, percepatan) tanpa mempertimbangkan penyebabnya. GLB, GLBB, jatuh bebas, dan gerak parabola 2D dengan sinkronisasi visual 4 grafik.",
    description:
      "Kinematika adalah mahakarya integrasi sains dan matematika di Nalar. Di modul ini, kamu memanipulasi posisi awal, kecepatan awal, percepatan, dan sudut peluncuran, lalu melihat animasi gerak fisis secara sinkron dengan 3 kurva grafis: posisi-waktu x(t), kecepatan-waktu v(t), dan percepatan-waktu a(t).",
    audioNarrationText:
      "Selamat datang di modul Flagship Kinematika. Di sini kamu menghubungkan fungsi grafik matematika dan trigonometri lingkaran satuan untuk memprediksi lintasan bola di dunia nyata.",
    prerequisites: ["science-si-units", "math-functions-graphs", "math-trig-unit-circle"],
    unlocks: ["physics-newton-incline", "physics-projectile-motion", "sci-dynamics-newton"],
    learningObjectives: [
      "Membedakan konsep skalar (jarak, kelajuan) dan vektor (posisi, perpindahan, kecepatan)",
      "Menganalisis hubungan turunan matematis v = dx/dt dan a = dv/dt secara grafik",
      "Memprediksi bentuk grafik GLBB parabola x(t) dari percepatan konstan a",
      "Menguraikan gerak parabola 2D menjadi GLB horizontal dan GLBB vertikal",
      "Menyelesaikan tantangan transfer penembakan sasaran bergerak",
    ],
    concepts: [
      "Perpindahan vs Jarak",
      "Kecepatan Sesaat & Rata-rata",
      "Percepatan Konstan (GLBB)",
      "Persamaan Gerak Kinematik",
      "Gerak Parabola 2D",
    ],
    sections: [
      { id: "sec-hook", title: "Prediksi Posisi Mobil Balap", type: "hook", summary: "Mobil bergerak dari keadaan diam dengan percepatan tetap. Di mana posisinya setelah 5 detik?" },
      { id: "sec-prediction", title: "Tebakan Kurva v-t", type: "prediction", summary: "Jika percepatan diperbesar 2x lipat, bagaimana kecuraman garis grafik v-t berubah?" },
      { id: "sec-explore", title: "Simulator Kinematika Multi-Grafik", type: "explore", summary: "Manipulasi v₀, a, dan θ secara interaktif; saksikan animasi proyektil dan 3 grafik sinkron." },
      { id: "sec-discover", title: "Menemukan Pola Luas Daerah v-t", type: "discover", summary: "Saksikan bagaimana luas di bawah kurva grafik v-t sama persis dengan perpindahan total s." },
      { id: "sec-formalize", title: "Persamaan Gerak Kinematika Klasik", type: "formalize", summary: "Persamaan kinematik GLBB: v = v₀ + at, s = v₀t + 0.5at², v² = v₀² + 2as." },
      { id: "sec-practice", title: "Latihan Terbimbing (Guided)", type: "practice", summary: "Hitung waktu tempuh puncak dan jangkauan maksimum dengan panduan 4 level hint." },
      { id: "sec-lab", title: "Laboratorium Virtual Meriam", type: "lab", summary: "Uji hipotesis sudut optimal 45° di laboratorium virtual kanon." },
      { id: "sec-transfer", title: "Transfer Challenge Dunia Nyata", type: "transfer", summary: "Sasaran penyelamatan udara: lempar paket dari pesawat bergerak agar tepat mendarat di pulau." },
    ],
    xpReward: 200,
    isAvailable: true,
    route: "/topics/science-kinematics",
    position: { x: 920, y: 220 },
  },

];
