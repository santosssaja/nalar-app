### 1. Nama & Visi Produk

* **Fokus Subtema**: **SDG 4 — Pendidikan Berkualitas** (Mewujudkan pendidikan STEM yang inklusif, terjangkau, dan mudah dipahami).

* **Visi**: Membangun platform web pembelajaran Sains dan Matematika interaktif, visual, dan ramah aksesibilitas (*difabel-friendly*) yang dapat diakses secara gratis sebagai alternatif terbuka untuk platform seperti *Brilliant*.

* **Urgensi Masalah**: Banyak pelajar merasa materi sains dan matematika rumit serta membosankan karena minimnya visualisasi konkret, keterbatasan akses ke platform premium berbayar, dan jarangnya media belajar sains yang ramah bagi pengguna difabel.

---

### 2. Struktur Pembelajaran Berbasis Topik

Alih-alih membatasi materi ke dalam jenjang kaku sekolah (SD, SMP, SMA) atau sistem *leveling* yang rumit, konten dikelompokkan **berdasarkan topik materi (*topic-based modular*)** agar fleksibel dipelajari oleh siapa pun:

* **Katalog Topik**:
* Pengguna bebas memilih topik yang ingin dipelajari sesuai kebutuhan (misal: *Aljabar & Pola Geometri*, *Logika Matematika*, *Fisika Gerak & Gravitasi*, *Optik & Cahaya*).

* **Alur Pembelajaran Tiap Topik**:

1. **Konsep Dasar & Analogi**: Pengenalan konsep abstrak menggunakan bahasa yang lugas dan analogi intuitif.
2. **Kanvas & Simulasi Interaktif (*Playground*)**: Ruang eksperimen langsung (berbasis canvas/interaktif) di mana pengguna dapat menggeser parameter angka/variabel dan melihat visualisasi efek perubahannya secara *real-time*.
3. **Latihan Interaktif (*Mini-Challenge* / Puzzle)**: Pengujian pemahaman melalui teka-teki logika visual, bukan sekadar soal pilihan ganda hafalan.

---

### 3. Fitur Unggulan Aksesibilitas & Gamifikasi

Fitur ramah difabel dijadikan sebagai salah satu **fitur keunggulan utama** pada platform:

* **Mode Aksesibilitas Terpadu**:

* **Optimasi Penglihatan (*Low Vision Friendly*)**: Antarmuka dengan dukungan kontras tinggi, palet warna gelap yang nyaman di mata, serta tipografi yang jelas dan dapat diubah ukurannya. Namun ada juga tema terang dan sesuai preferensi pengguna.
* **Navigasi Bersuara (*Audio-Assisted*)**: Bantuan pembacaan narasi konsep (*text-to-speech*) dan deskripsi suara untuk setiap elemen perubahan di kanvas simulasi.
* **Panduan Visual Ramah Tunarungu**: Penyampaian instruksi interaktif yang mengandalkan diagram visual berurutan dan takarir (*subtitle*) tanpa ketergantungan pada isyarat audio.
* **Sistem Progres & Gamifikasi**:
* Evaluasi pemahaman yang dilengkapi dengan perolehan *XP*, lencana capaian (*badges*), serta visualisasi peta penguasaan materi untuk menjaga motivasi belajar pengguna.

---

### 4. Pemanfaatan AI Tutor yang Hemat Kuota

Untuk mencegah kendala limit token API gratisan, arsitektur AI dirancang berbasis kejadian (*event-driven* / *on-demand*):

* **Materi Inti Terkurasi (*Pre-rendered / Curated*)**: Silabus, formula, dan logika kanvas visual dibuat paten di awal (*hardcoded*) menggunakan model AI berkinerja tinggi saat tahap pengembangan, sehingga platform tidak perlu memanggil LLM secara berulang untuk menampilkan materi dasar.

* **AI Asisten On-Demand**:
* AI tidak berjalan secara pasif-aktif terus-menerus.

* AI tutor hanya terpicu saat pengguna menekan tombol bantuan tanya jawab (*Q&A*) atau saat pengguna gagal menyelesaikan tantangan interaktif beberapa kali berturut-turut untuk memberikan petunjuk (*hints*) bertahap dan tinjauan (*review*) kesalahan konsep di akhir sesi. Konteks halaman yang dimanipulasi juga harus disampaikan ke AI agar bisa memberikan jawaban yang relevan serta history chat disimpan per materi yang sedang dipelajari.

---

### 5. Pengalaman Pengguna & Teknis

* **Akses Cepat (*Zero-Friction Onboarding*)**: Pengguna tidak dipaksa melakukan registrasi/masuk (*login*) di awal; seluruh interaksi dan progres latihan disimpan sementara di penyimpanan lokal peramban (*local storage*). Akun dan sinkronisasi awan (*cloud*) hanya digunakan jika pengguna ingin menyimpan progres lintas perangkat.

* **Performa Web**: Fokus pada antarmuka yang bersih, cepat, responsif, dan bebas hambatan (*no-lag*), sehingga pengalaman interaksi simulasi visual tetap lancar di berbagai perangkat.