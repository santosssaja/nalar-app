# Alur Belajar Nalar — Fondasi Matematika 1A: Bilangan & Aritmetika
*(Guided Discovery Learning)*

> **Dokumen Perancangan Topik Berdasarkan [alur-belajar.md](alur-belajar.md)**  
> **Ruang Lingkup:** `docs/roadmap-math.md` Level 1 (Fondasi Nalar & Bahasa Simbolik) — Sub-bidang **1A · Bilangan & Aritmetika**.  
> **Filosofi Inti:** *Discovery first, formula last*. Rumus bukanlah awal pembelajaran, melainkan nama dan bahasa formal dari pola geometris/interaktif yang sudah ditemukan sendiri oleh pembelajar.

---

## Ringkasan 4 Modul Topik

| Modul | Slug / ID | Aha Moments Utama | Estimasi Layar | Status Engine |
|---|---|---|---|---|
| **1. Operasi Bilangan Riil & Garis Bilangan** | `math-real-numbers-line` | Operasi bilangan adalah gerak spasial (translasi & dilatasi); $(-a) \times (-b) = +ab$ adalah pembalikan arah dua kali; densitas pecahan tak hingga. | 52 layar | Rancang Baru |
| **2. Aritmetika Jam (Modulo)** | `arithmetic-modular-clock` | Garis bilangan yang digulung melingkar; sisa bagi menjaga operasi tambah & kali; pola kardioid fraktal dari perkalian modular. | 54 layar | Ada di Codebase (Upgrade ke 5L) |
| **3. Algoritma Euclid & FPB** | `math-euclid` | FPB adalah ubin bujur sangkar terbesar; memotong sisa tidak mengubah FPB; identitas Bézout $ax + by = \gcd(a,b)$. | 50 layar | Ada di Codebase (Upgrade ke 5L) |
| **4. Faktorisasi Prima & Koprima** | `math-primes-coprime` | Bilangan prima adalah angka yang tak bisa dibuat kisi persegi panjang; saringan ritmis Eratosthenes; DNA unik Teorema Dasar Aritmetika. | 52 layar | Rancang Baru |

---

# TOPIK 1: Operasi Bilangan Riil & Garis Bilangan
**Slug:** `math-real-numbers-line` | **Kategori:** `math` | **Total:** 52 Layar (5 Level + Boss Level)

### Gambaran Besar
Mengubah angka dari sekadar "simbol hafalan mati di atas kertas" menjadi **entitas geometris hidup**: posisi, perpindahan vektor 1D, faktor skala, dan kerapatan kontinu yang dapat diperbesar hingga tak hingga (*infinite zoom*).

---

### Level 1: Garis Bilangan & Operasi Translasi *(10 Layar)*
*Aha Moment: "Menjumlahkan dan mengurangkan hanyalah melangkah maju atau mundur di atas jalan raya bilangan!"*

* **Layar 1 [PROVOKE] — "Di Mana Rumah Angka?"**
  * *Visual:* Garis kosong tanpa angka. Ada titik rumah, pohon, dan sumur.
  * *Nai (Curious):* "Jika pohon berada di posisi 0, di mana kita meletakkan sumur yang berjarak 3 langkah ke kiri dan rumah 4 langkah ke kanan?"
  * *Interaksi:* Drag pin ke garis. Muncul tanda minus ($-3$) dan plus ($+4$).
  * *Insight:* Tanda negatif bukan sekadar 'kurang', melainkan arah yang berlawanan dari titik acuan (nol).

* **Layar 2 [PREDICT] — "Maju atau Mundur?"**
  * *Visual:* Karakter katak di angka $2$. Operasi yang diminta: $2 + (-5)$.
  * *Nai (Thinking):* "Jika tanda plus berarti maju searah wajah, dan tanda minus berarti membalikkan badan, di angka berapa katak akan mendarat?"
  * *Interaksi [MC]:* [A] $+7$ &nbsp; [B] $-3$ &nbsp; [C] $-7$
  * *Aksi:* Tombol [▶ Lompat!] menggerakkan animasi katak membuktikan tebakan.

* **Layar 3 [GUIDED] — "Vektor Perpindahan 1D"**
  * *Visual:* Garis bilangan interaktif. Slider titik awal $A$ ($-10 \dots 10$) dan panah perpindahan $\Delta x$ ($-10 \dots 10$).
  * *Nai (Happy):* "Geser $\Delta x$. Perhatikan bahwa menambah bilangan negatif selalu menggeser posisi ke arah kiri!"
  * *Interaksi:* User mengisi tabel translasi:
    * Posisi Awal $3$, geser $-7 \to$ Posisi Akhir [ `___` ] (User ketik: `-4`)
    * Posisi Awal $-5$, geser $+8 \to$ Posisi Akhir [ `___` ] (User ketik: `+3`)

* **Layar 4 [FORMALIZE] — "Formalisasi Penjumlahan Garis"**
  * *Nai:* "Lengkapi kesimpulan perpindahan berikut:"
  * *Interaksi [Fill-in]:* $a + (-b)$ menghasilkan gerakan ke arah [ `kiri / kanan` ] sejauh $b$ satuan, yang bernilai sama dengan operasi $a$ [ `+ / -` ] $b$.
  * *Hasil KaTeX:* $a + (-b) = a - b$.

* **Layar 5 [CHECK] — "Cek Nalar Cepat"**
  * *Interaksi [True/False]:* "Mengurangkan bilangan negatif, misal $5 - (-3)$, setara dengan melangkah MAJU ke kanan sejauh 3 langkah." $\to$ [Benar ✅] / [Salah].
  * *Penjelasan Visual:* Mengurangkan = membalik arah; tanda negatif = menghadap belakang. Mundur ke belakang = melangkah maju ke kanan!

* **Layar 6 [GUIDED] — "Jarak Antara Dua Titik (Nilai Mutlak)"**
  * *Visual:* Dua pointer di garis bilangan: $x_1 = -4$ dan $x_2 = 5$. Penggaris di atasnya mengukur panjang bentangan.
  * *Nai:* "Geser kedua titik. Apakah jarak fisik antara dua titik pernah bernilai negatif?"
  * *Interaksi:* Geser slider, amati bahwa jarak selalu positif $\Delta = |x_2 - x_1|$.

* **Layar 7 [FORMALIZE] — "Simbol Nilai Mutlak $|x|$"**
  * *Interaksi [Fill-in]:* Jarak angka $x$ dari titik nol dirumuskan sebagai [ `|x|` ]. Jika $x = -7$, maka jaraknya adalah [ `7` ].

* **Layar 8 [CHALLENGE] — "Bantu Tim SAR Menemukan Sinyal"**
  * *Kanvas:* Garis bilangan radar. Sinyal mercusuar di $x = -2$. Ada korban di jarak $|x - (-2)| = 6$.
  * *Tantangan:* Tentukan DUA kemungkinan posisi korban di garis bilangan!
  * *Input:* Titik 1 = [ `-8` ], Titik 2 = [ `+4` ]. Slider kanvas menyala hijau saat kedua titik tepat.

* **Layar 9 [CHALLENGE] — "Teka-Teki Selisih Terbalik"**
  * *Nai:* "Jika $a - b = -9$ dan $b = 4$, di manakah posisi $a$ di garis bilangan?"
  * *Input Angka:* $a =$ [ `-5` ]. Kanvas langsung menganimasikan garis loncatan dari $4$ mundur $9$ langkah.

* **Layar 10 [REFLECT] — "Refleksi Level 1: Bilangan Adalah Ruang"**
  * *Nai (Celebrating):* "Luar biasa! 🎉 Kamu membuktikan bahwa tanda tambah dan kurang adalah petunjuk arah di ruang 1 dimensi!"
  * *Badge:* 🎖️ *Penjelajah Garis Bilangan* (+25 XP).
  * *Koneksi:* Di Level 2, kita akan melipatgandakan dan membalik arah garis lewat PERKALIAN!

---

### Level 2: Skala, Perkalian, & Misteri $(-1) \times (-1)$ *(10 Layar)*
*Aha Moment: "Perkalian adalah zoom/peregangan, dan tanda minus adalah rotasi 180°!"*

* **Layar 1 [PROVOKE] — "Mengapa Negatif Kali Negatif Jadi Positif?"**
  * *Visual:* Kartun dua cermin yang saling berhadapan.
  * *Nai (Curious):* "Banyak orang menghafal 'minus kali minus sama dengan plus'. Tapi bisakah kamu melihat alasannya secara kasat mata?"
  * *Pilihan Pemantik:* [A] Karena aturan guru memang begitu &nbsp; [B] Karena membalik arah dua kali mengembalikan kita ke arah asal ✅

* **Layar 2 [PREDICT] — "Efek Pengali Skala"**
  * *Visual:* Vektor panah dari $0$ ke $3$. Slider pengali $k = 2$.
  * *Nai:* "Jika panjang panah dikalikan $-2$, apa yang terjadi pada panjang DAN arah panah?"
  * *Prediksi [MC]:* [A] Panjang tetap, arah ke kiri &nbsp; [B] Panjang jadi 6, arah ke kiri ✅ &nbsp; [C] Panjang jadi 6, arah tetap ke kanan

* **Layar 3 [GUIDED] — "Simulator Peregangan Garis (Dilatasi 1D)"**
  * *Visual:* Garis karet elastis. Slider pengali $k$ dari $-3$ sampai $+3$.
  * *Aksi:* Geser $k$ dari $+2 \to +1 \to 0 \to -1 \to -2$.
  * *Observasi:*
    * Saat $k = 1$: Garis tidak berubah.
    * Saat $k = 0$: Semua titik kolaps ke titik $0$.
    * Saat $k = -1$: Garis berputar $180^\circ$ (terbalik arah).
    * Saat $k = -2$: Garis terbalik arah DAN panjangnya melar 2 kali lipat!

* **Layar 4 [GUIDED] — "Perkalian Bertahap Dua Negatif"**
  * *Visual:* Titik awal di $+1$.
  * *Langkah 1:* Kalikan dengan $-3 \to$ Titik melompat membalik arah ke $-3$.
  * *Langkah 2:* Kalikan lagi hasilnya dengan $-2 \to$ Titik membalik arah LAGI ke kanan $\to$ mendarat di $+6$!
  * *Nai:* "Lihat kanvasnya! Dua kali pembalikan arah ($180^\circ + 180^\circ = 360^\circ$) pasti menghadap ke arah positif!"

* **Layar 5 [FORMALIZE] — "Merumuskan Tanda Perkalian"**
  * *Interaksi [Drag & Drop]:* Pasangkan aturan tanda operasi:
    * $(+) \times (-) \to$ [ `Arah Kiri (-)` ]
    * $(-) \times (-) \to$ [ `Arah Kanan (+)` ]
    * Nilai mutlak hasil kali $|a \cdot b| = |a| \cdot |b|$.

* **Layar 6 [CHECK] — "Cek Kilat Skalar"**
  * *Soal:* "Jika $x < 0$ dan $y < 0$, di kuadran/arah manakah posisi $-x \cdot y$ berada?"
  * *Pilihan:* [Positif] / [Negatif ✅] / [Nol]. *(Jebakan tanda: tiga minus beruntun)*.

* **Layar 7 [SANDBOX] — "Playground Transformasi Garis"**
  * *Kontrol:* Buat vektor awal $v$, terapkan rantai operasi $\times k_1, + c, \times k_2$.
  * *Eksplorasi:* Amati titik bergerak dinamis di garis bilangan.

* **Layar 8 [CHALLENGE] — "Kembalikan ke Nol"**
  * *Kanvas:* Posisi awal di $-12$. Kamu hanya punya tombol $[\times (-0.5)]$ dan $[+ 3]$.
  * *Tantangan:* Rancang urutan operasi agar titik tepat mendarat di $+6$ dalam maksimal 3 langkah!

* **Layar 9 [CHALLENGE] — "Mencari Pengali Misterius"**
  * *Kanvas:* Panah dari $-4$ berubah menjadi $+14$.
  * *Tantangan:* Jika operasi yang terjadi adalah $x \cdot k + 2 = 14$, tentukan nilai pengali $k$!
  * *Input Angka:* $k =$ [ `-3` ].

* **Layar 10 [REFLECT] — "Refleksi Level 2: Simetri Dua Arah"**
  * *Nai:* "Kamu tidak lagi menghafal rumus tanda! Negatif hanyalah operasi rotasi balik arah."
  * *Badge:* 🎖️ *Penjinak Bilangan Negatif* (+25 XP).

---

### Level 3: Pecahan, Desimal, & Kerapatan Tak Hingga *(10 Layar)*
*Aha Moment: "Di antara dua bilangan sekecil apa pun, selalu ada samudra bilangan tak hingga!"*

* **Layar 1 [PROVOKE] — "Apakah Garis Bilangan Punya Lubang?"**
  * *Visual:* Garis bilangan yang hanya menampilkan bilangan bulat $\dots, -2, -1, 0, 1, 2, \dots$
  * *Nai:* "Jika kita melompat dari 0 ke 1, apakah kita melompati kehampaan, atau ada dunia lain di sana?"

* **Layar 2 [GUIDED] — "Zoom Tak Hingga: Membelah Satuan"**
  * *Visual:* Garis bilangan dengan tombol [🔍 Zoom In 10×].
  * *Aksi:* Klik zoom di antara $0$ dan $1$. Rentang terbagi menjadi $0.1, 0.2, \dots, 0.9$.
  * *Zoom lagi di antara 0.3 dan 0.4:* Terbuka $0.31, 0.32, \dots, 0.39$.
  * *Nai:* "Berapa kali kita bisa melakukan pembagian ini sebelum garisnya kehabisan tempat?" $\to$ [Tak Terhingga!]

* **Layar 3 [GUIDED] — "Pecahan Sebagai Pembagian Batang Geometris"**
  * *Visual:* Batang panjang 1 satuan. Slider penyebut $q$ ($1 \dots 12$) dan pembilang $p$ ($0 \dots q$).
  * *Aksi:* Atur $p/q = 3/4$. Garis bilangan menampilkan posisi $0.75$.
  * *Nai:* "Lihat titik $2/4$ dan $1/2$. Mengapa posisinya persis berhimpit di garis bilangan?"
  * *Insight:* Pecahan senilai menempati titik koordinat spasial yang persis sama.

* **Layar 4 [FORMALIZE] — "Rasio & Bentuk Desimal"**
  * *Interaksi [Fill-in]:* Bilangan rasional $\mathbb{Q}$ adalah semua bilangan yang dapat dinyatakan dalam bentuk rasio [ `p / q` ] dengan $p, q$ bilangan bulat dan $q \neq$ [ `0` ].

* **Layar 5 [PREDICT] — "Siapa di Tengah-Tengah?"**
  * *Visual:* Dua titik: $A = 1/3 \approx 0.333$ dan $B = 1/2 = 0.500$.
  * *Nai:* "Bisakah kamu menemukan satu bilangan pecahan yang persis berada di antara $1/3$ dan $1/2$?"
  * *Pilihan:* [A] Tidak ada lagi &nbsp; [B] $5/12$ ✅ &nbsp; [C] $2/5$

* **Layar 6 [GUIDED] — "Metode Rata-Rata: Menemukan Titik Tengah"**
  * *Interaksi:* Geser slider titik uji $M$ hingga tepat membagi dua jarak $A$ dan $B$.
  * *Kalkulasi:* $M = \frac{A + B}{2} = \frac{1/3 + 1/2}{2} = \frac{5/6}{2} = \frac{5}{12}$.

* **Layar 7 [CHECK] — "Uji Kerapatan"**
  * *Pertanyaan:* "Berapa banyak bilangan rasional yang ada di antara $0.99$ dan $1.00$?"
  * *Pilihan:* [Nol] / [9 buah] / [Tak terhingga banyaknya ✅].

* **Layar 8 [CHALLENGE] — "Tembak Sasaran Pecahan"**
  * *Kanvas:* Target target berada di koordinat $x = 0.625$. Garis hanya memiliki pembagian per delapanan ($1/8$).
  * *Tantangan:* Tentukan pecahan senilai berpenyebut 8 yang tepat mengenai sasaran!
  * *Input:* Pembilang = [ `5` ], Penyebut = [ `8` ].

* **Layar 9 [CHALLENGE] — "Urutkan Balap Pecahan"**
  * *Interaksi [Drag Cards]:* Urutkan pecahan berikut dari kiri ke kanan di garis bilangan secepat mungkin:
    * Cards: $-2/3$, $-4/5$, $1/8$, $3/7$, $0$.
    * *Target:* $-4/5 < -2/3 < 0 < 1/8 < 3/7$.

* **Layar 10 [REFLECT] — "Refleksi Level 3: Kontinum Pecahan"**
  * *Nai:* "Sekarang garis bilanganmu sudah padat oleh pecahan! Tapi... apakah semua titik di garis sudah terisi penuh? Belum tentu!"
  * *Badge:* 🎖️ *Penyelam Skala Mikro* (+25 XP).

---

### Level 4: Penemuan Bilangan Irasional ($\sqrt{2}$ & Geometri) *(10 Layar)*
*Aha Moment: "Ada titik di garis bilangan yang mustahil ditulis sebagai pecahan: selamat datang di bilangan irasional!"*

* **Layar 1 [PROVOKE] — "Misteri Hipotenusa Bujur Sangkar"**
  * *Visual:* Bujur sangkar berukuran $1 \times 1$. Diagonalnya ditarik garis miring merah.
  * *Nai:* "Menurut Teorema Pythagoras, panjang garis miring ini kuadratnya adalah $1^2 + 1^2 = 2$. Berapa panjang pastinya?"

* **Layar 2 [PREDICT] — "Bisakah Dinyatakan Sebagai Pecahan?"**
  * *Nai:* "Apakah ada pecahan biasa $p/q$ yang jika dikuadratkan menghasilkan tepat $2.000000$?"
  * *Interaksi:* Coba tebak desimalnya:
    * $1.4^2 = 1.96$ (kurang)
    * $1.5^2 = 2.25$ (lebih)
    * $1.414^2 = 1.999396$ (hampir!)
  * *Prediksi:* [A] Pasti ada pecahan yang pas &nbsp; [B] Tidak akan pernah pas sampai kiamat ✅

* **Layar 3 [GUIDED] — "Jatuhkan Diagonal ke Garis Bilangan!"**
  * *Visual:* Bujur sangkar $1 \times 1$ ditaruh di atas garis bilangan dari titik $0$ ke $1$. Busur jangka berputar menjatuhkan diagonal ke garis bilangan.
  * *Aksi:* Putar engsel jangka interaktif. Ujung diagonal jatuh di sebuah titik nyata antara $1.41$ dan $1.42$.
  * *Nai (Happy):* "Titik ini NYATA ada di garis bilangan! Panjangnya ada, fisiknya ada, tapi angka desimalnya tidak pernah berhenti dan tidak pernah berulang!"

* **Layar 4 [FORMALIZE] — "Definisi Bilangan Irasional & Riil"**
  * *Interaksi [Fill-in]:* Bilangan yang tidak dapat dinyatakan dalam $p/q$ disebut bilangan [ `irasional` ].
  * Gabungan seluruh bilangan rasional dan irasional di garis kontinu disebut himpunan [ `Bilangan Riil (R)` ].

* **Layar 5 [CHECK] — "Klasifikasi Bilangan"**
  * *Interaksi [Sort Categories]:* Seret bilangan ke kantong yang tepat (Rasional vs Irasional):
    * $3/4 \to$ Rasional, $\sqrt{2} \to$ Irasional, $0.333\dots \to$ Rasional ($1/3$), $\pi \to$ Irasional, $\sqrt{9} \to$ Rasional ($3$).

* **Layar 6 [GUIDED] — "Akar Lain di Garis Bilangan"**
  * *Visual:* Spiral Theodorus (segitiga siku-siku bertingkat).
  * *Aksi:* Klik bertahap untuk merebahkan diagonal $\sqrt{3}, \sqrt{4}=2, \sqrt{5}$ ke garis bilangan.

* **Layar 7 [CHALLENGE] — "Mengapit Akar Tanpa Kalkulator"**
  * *Nai:* "Tanpa kalkulator, di antara dua bilangan bulat manakah posisi $\sqrt{45}$ berada?"
  * *Panduan:* Cari kuadrat sempurna terdekat: $6^2 = 36$ dan $7^2 = 49$.
  * *Input:* Antara [ `6` ] dan [ `7` ]. Slider garis bilangan memverifikasi presisinya ($\approx 6.708$).

* **Layar 8 [CHALLENGE] — "Bujur Sangkar Emas"**
  * *Tantangan Kanvas:* Konstruksi bujur sangkar di atas grid sehingga luasnya tepat bernilai $5$. Rebahkan sisinya ke garis bilangan untuk menemukan posisi $\sqrt{5}$!

* **Layar 9 [CHECK] — "Benar atau Salah: Sifat Irasional"**
  * *Pernyataan:* "Penjumlahan bilangan rasional dan bilangan irasional, misalnya $3 + \sqrt{2}$, selalu menghasilkan bilangan irasional." $\to$ [Benar ✅] / [Salah].

* **Layar 10 [REFLECT] — "Refleksi Level 4: Garis Bilangan yang Utuh"**
  * *Nai:* "Sekarang garis bilanganmu tidak berlubang lagi! Bilangan Riil telah menutup setiap titik kontinu di semesta 1D."
  * *Badge:* 🎖️ *Penakluk Irasional* (+25 XP).

---

### Level 5: Geometri Sifat Aljabar (Komutatif, Asosiatif, Distributif) *(6 Layar)*
*Aha Moment: "Hukum aljabar bukan aturan hafalan kertas, melainkan fakta bahwa memutar ubin persegi panjang tidak mengubah luasnya!"*

* **Layar 1 [PROVOKE] — "Mengapa $3 \times 5 = 5 \times 3$?"**
  * *Visual:* Kotak berisi 15 kelereng disusun $3 \times 5$.
  * *Nai:* "Mengapa perkalian selalu bolak-balik sama? Apakah itu kebetulan?"

* **Layar 2 [GUIDED] — "Rotasi Persegi Panjang (Komutatif Geometris)"**
  * *Visual:* Persegi panjang grid $a \times b$. Tombol [Putar 90°].
  * *Aksi:* Putar persegi panjang $3 \times 5$ menjadi $5 \times 3$.
  * *Nai:* "Apakah luasnya berubah saat diputar? Tentu tidak! Inilah bukti visual $a \cdot b = b \cdot a$."

* **Layar 3 [GUIDED] — "Membelah Kebun: Sifat Distributif"**
  * *Visual:* Kebun persegi panjang besar berukuran $a \times (b + c)$. Ada garis pagar geser yang memisahkan $b$ dan $c$.
  * *Aksi:* Geser pagar pemisah. Kebun terbelah menjadi dua petak: petak $a \times b$ dan petak $a \times c$.
  * *Formalisasi:* $a(b + c) = ab + ac$. Luas total selalu sama dengan jumlah luas petak-petaknya!

* **Layar 4 [SANDBOX] — "Playground Pembuktian Luas Aljabar"**
  * *Fitur:* Masukkan bentuk aljabar bebas seperti $(a+b)^2$ atau $(a+b)(c+d)$. Kanvas memvisualisasikan petak-petak luas 2D secara real-time.

* **Layar 5 [CHALLENGE] — "Hitung Cepat Mental dengan Distributif"**
  * *Soal:* "Hitung $19 \times 7$ tanpa coretan rumit!"
  * *Petunjuk Kanvas:* Pecah menjadi $(20 - 1) \times 7 = (20 \times 7) - (1 \times 7) = 140 - 7$.
  * *Input Angka:* [ `133` ].

* **Layar 6 [REFLECT] — "Refleksi Level 5 & Rangkuman Modul"**
  * *Nai:* "Kamu telah menguasai fondasi terdalam bilangan: dari melangkah di garis, memperbesar skala, menyelami desimal tak hingga, merangkul akar irasional, hingga membuktikan hukum aljabar secara visual!"
  * *Badge Modul:* 🏆 *Master Fondasi Bilangan Riil* (+50 XP).

---

### Boss Level: Ujian Modul Bilangan Riil *(6 Soal Campuran)*
1. **Soal 1 (Konseptual):** "Jika $a < 0$ dan $b > 0$, manakah dari ekspresi berikut yang posisinya PALING KANAN di garis bilangan?" $\to$ Pilihan: $a - b$, $a \cdot b$, $b - a$ ✅, $a / b$.
2. **Soal 2 (Kalkulasi Garis):** Titik $P$ di $-7$ digeser sejauh $-(-12)$ lalu dikalikan $-0.5$. Di manakah posisi akhir $P$? $\to$ Input: [ `-2.5` ].
3. **Soal 3 (Tantangan Kanvas):** Geser pointer batas pada garis bilangan untuk merepresentasikan interval nilai $x$ yang memenuhi pertidaksamaan $|x - 3| \le 5$. (Target: $-2 \le x \le 8$).
4. **Soal 4 (Debugging Kesalahan):** Diberikan langkah pembuktian palsu: $1 = \sqrt{1} = \sqrt{(-1)(-1)} = \sqrt{-1} \cdot \sqrt{-1} = i \cdot i = -1$. Klik baris langkah yang pertama kali melanggar sifat bilangan riil!
5. **Soal 5 (Aplikasi Pecahan):** Tiga pelari berada di lintasan $1$ km pada posisi $3/8$, $0.4$, dan $5/12$. Siapa yang posisinya paling dekat dengan garis finish? $\to$ Input: [ `5/12` ].
6. **Soal 6 (Desain Terbuka):** Rancang sebuah ekspresi aritmetika yang HANYA menggunakan angka $4, 4, 4, 4$ dan operasi $+,-,\times,/$ serta tanda kurung untuk menghasilkan angka $9$. (Contoh solusi: $4/4 + 4 + 4 = 9$).

---
---

# TOPIK 2: Aritmetika Jam (Modulo)
**Slug:** `arithmetic-modular-clock` | **Kategori:** `math` | **Total:** 54 Layar (5 Level + Boss Level)

### Gambaran Besar
Mengubah paradigma garis bilangan lurus tak hingga menjadi **geometri siklis melingkar**. Sisa bagi bukan lagi sekadar sisa yang dibuang, melainkan sistem aljabar tertutup yang mendasari kalender, ritme musik, dan kriptografi perbankan dunia.

---

### Level 1: Menggulung Garis Bilangan Menjadi Jam *(10 Layar)*
*Aha Moment: "Jika garis bilangan digulung pada silinder melingkar, angka 12 dan angka 0 berada di tempat yang sama!"*

* **Layar 1 [PROVOKE] — "Teka-Teki Jam Dinding"**
  * *Visual:* Jam analog 12 jam. Jarum menunjuk angka 9.
  * *Nai (Curious):* "Sekarang pukul 9 pagi. Obat ini harus diminum 5 jam lagi. Mengapa kita tidak mengatakan pukul 14 pada jam dinding biasa?"
  * *Pilihan:* [A] Karena setelah 12 hitungan kembali ke 1 ✅ &nbsp; [B] Karena jamnya rusak

* **Layar 2 [PREDICT] — "Di Mana Jarum Berhenti?"**
  * *Visual:* Lingkaran modulo berukuran $m = 7$ (hari dalam seminggu, angka $0 \dots 6$). Jarum di angka $5$.
  * *Nai:* "Jika kita melangkah maju 16 langkah searah jarum jam, di angka berapa jarum akan berhenti?"
  * *Prediksi [MC]:* [A] $0$ &nbsp; [B] $2$ ✅ &nbsp; [C] $5$ &nbsp; [D] $6$

* **Layar 3 [GUIDED] — "Menggulung Garis Lurus: Simulator Jam Modulo"**
  * *Visual:* Garis bilangan fleksibel di atas, lingkaran modulus di bawah.
  * *Aksi:* Geser slider angka input $N$ dari $0$ sampai $25$. Animasi menunjukkan garis bilangan melilit lingkaran $m = 5$.
  * *Tabel Observasi:*
    * $N = 5 \to$ sisa di jam: [ `0` ]
    * $N = 12 \to$ sisa di jam: [ `2` ]
    * $N = 23 \to$ sisa di jam: [ `3` ]
  * *Nai:* "Perhatikan! Angka jam hanyalah SISA BAGI dari $N$ dibagi ukuran lingkaran $m$!"

* **Layar 4 [FORMALIZE] — "Notasi Modulo & Kongruensi"**
  * *Nai:* "Matematikawan menulis sisa bagi ini dengan kata *modulo* (disingkat $\pmod m$):"
  * *Interaksi [Fill-in]:* $17 \pmod 5 = $ [ `2` ].
  * Jika dua bilangan menghasilkan sisa yang sama pada jam $m$, kita sebut kongruen: $a \equiv b \pmod m$.
  * *KaTeX:* $17 \equiv 12 \equiv 7 \equiv 2 \pmod 5$.

* **Layar 5 [CHECK] — "Cek Kilat Kongruensi"**
  * *Pertanyaan:* "Manakah dari bilangan berikut yang TIDAK kongruen dengan $3 \pmod 4$?"
  * *Pilihan:* $7$, $11$, $15$, $18$ ✅ ($18 \equiv 2 \pmod 4$), $23$.

* **Layar 6 [GUIDED] — "Melangkah Mundur: Modulo Bilangan Negatif"**
  * *Visual:* Jam modulo $12$. Tombol $[-1 \text{ langkah}]$ memutar jarum berlawanan arah.
  * *Nai:* "Jika pukul 2 ditarik mundur 5 jam, jam berapakah itu di jam dinding?"
  * *Interaksi:* Gerakkan jarum mundur dari $2$: $2 \to 1 \to 0(12) \to 11 \to 10 \to 9$.
  * *Insight:* $-3 \pmod{12} \equiv 9$. Negatif di modulo hanyalah melangkah berlawanan jarum jam!

* **Layar 7 [FORMALIZE] — "Rumus Modulo Negatif"**
  * *Interaksi [Fill-in]:* Untuk bilangan negatif $-k \pmod m$, tambahkan kelipatan $m$ hingga positif: $-5 \pmod 7 = -5 + 7 = $ [ `2` ].

* **Layar 8 [CHALLENGE] — "Kalender Abadi 7 Hari"**
  * *Soal:* "Hari ini adalah hari Selasa (hari ke-2). Hari apakah 100 hari dari sekarang?"
  * *Petunjuk Kanvas:* Hitung $(2 + 100) \pmod 7$.
  * *Input Angka:* $102 \pmod 7 = $ [ `4` ] $\to$ Hari Kamis!

* **Layar 9 [CHALLENGE] — "Temukan Modulus Rahasia"**
  * *Kanvas:* Jarum melompat dari posisi $14$ dan berhenti di angka $2$.
  * *Tantangan:* Modulus lingkaran manakah yang mungkin? Cari $m > 2$ sehingga $14 \equiv 2 \pmod m$.
  * *Pilihan Jawaban Valid:* $m = 3, 4, 6,$ atau $12$. (User memilih salah satu slider yang valid).

* **Layar 10 [REFLECT] — "Refleksi Level 1: Lingkaran Siklis"**
  * *Nai:* "Keren! 🎉 Kamu sudah menguasai cara kerja jam modulo. Di Level 2, kita akan menjumlahkan dan mengalikan angka di dalam dunia jam ini!"
  * *Badge:* 🎖️ *Penjaga Waktu Modular* (+25 XP).

---

### Level 2: Aritmetika Modular (Tambah, Kali, & Tabel Mod $m$) *(10 Layar)*
*Aha Moment: "Kamu bisa menyederhanakan angka SEBELUM menjumlahkan atau mengalikannya, hasilnya tetap sama persis!"*

* **Layar 1 [PROVOKE] — "Menghitung Angka Raksasa"**
  * *Nai:* "Berapa digit terakhir (satuan) dari $1234567 \times 7654321$? Apakah kamu harus mengalikan semuanya dengan kalkulator?"
  * *Pilihan:* [A] Harus hitung manual &nbsp; [B] Cukup kalikan digit terakhirnya ($7 \times 1 = 7$)! ✅

* **Layar 2 [PREDICT] — "Sisa Sebelum vs Sisa Sesudah"**
  * *Nai:* "Menurutmu, apakah $(14 + 18) \pmod 5$ menghasilkan jawaban yang sama dengan $(14 \pmod 5 + 18 \pmod 5) \pmod 5$?"
  * *Prediksi:* [Sama Pasti! ✅] / [Beda].

* **Layar 3 [GUIDED] — "Laboratorium Penjumlahan Modular"**
  * *Visual:* Dua roda gigi modular berputar.
  * *Eksperimen:*
    * Cara 1: $14 + 18 = 32 \to 32 \pmod 5 = 2$.
    * Cara 2: $14 \equiv 4$ dan $18 \equiv 3 \to 4 + 3 = 7 \to 7 \pmod 5 = 2$.
  * *Nai:* "Angka besar bisa kita 'perkecil' dulu sebelum dioperasikan! Ini rahasia komputasi super cepat komputer."

* **Layar 4 [GUIDED] — "Perkalian Modular & Tabel Cayley"**
  * *Visual:* Matriks grid tabel perkalian modulo $m = 5$.
  * *Aksi:* Klik sel baris $3$ dan kolom $4$. Nilai $3 \times 4 = 12 \equiv 2$.
  * *Amati:* Setiap baris berisi angka $0, 1, 2, 3, 4$ tepat satu kali tanpa duplikasi!

* **Layar 5 [FORMALIZE] — "Sifat Homomorfisma Aritmetika Modular"**
  * *Interaksi [Fill-in]:*
    * $(a + b) \pmod m \equiv (a \pmod m + b \pmod m) \pmod m$
    * $(a \cdot b) \pmod m \equiv (a \pmod m \cdot b \pmod m) \pmod m$

* **Layar 6 [CHECK] — "Kuis Efisiensi"**
  * *Soal:* Hitung sisa bagi $99 \times 101 \pmod{10}$.
  * *Langkah Cepat:* $99 \equiv -1$ dan $101 \equiv 1 \to (-1) \times 1 = -1 \equiv 9$.
  * *Input Angka:* [ `9` ].

* **Layar 7 [SANDBOX] — "Tabel Generator Modulo $m$"**
  * *Kontrol:* Ubah slider modulus $m$ ($2 \dots 12$). Amati pola visual warna-warni pada tabel perkalian dan penjumlahan.

* **Layar 8 [CHALLENGE] — "Digit Terakhir Pangkat"**
  * *Soal:* "Tentukan angka satuan (mod 10) dari $7^4$!"
  * *Langkah Interaktif:*
    * $7^1 = 7$
    * $7^2 = 49 \equiv 9$
    * $7^3 \equiv 9 \times 7 = 63 \equiv 3$
    * $7^4 \equiv 3 \times 7 = 21 \equiv$ [ `1` ].

* **Layar 9 [CHALLENGE] — "Tebak Sisa Pembagian Faktorial"**
  * *Soal:* Berapakah sisa bagi dari $(1 \times 2 \times 3 \times 4 \times 5 \times 6 \times 7) \pmod 5$?
  * *Nai:* "Jangan kalikan semua! Ada angka 5 di dalam perkalian itu!"
  * *Input:* [ `0` ].

* **Layar 10 [REFLECT] — "Refleksi Level 2: Aljabar yang Rapi"**
  * *Nai:* "Kamu sudah bisa mengendalikan angka-angka raksasa dengan aritmetika modular!"
  * *Badge:* 🎖️ *Manipulator Kongruensi* (+25 XP).

---

### Level 3: Pembagian & Invers Modular *(10 Layar)*
*Aha Moment: "Di dunia modulo, pembagian $a / b$ berarti mencari pasangan pengali rahasia yang menghasilkan 1!"*

* **Layar 1 [PROVOKE] — "Apakah $6 / 2$ Selalu $3$ di Modulo?"**
  * *Visual:* Tabel modulo 6.
  * *Nai (Curious):* "Jika $2 \times x \equiv 0 \pmod 6$, apakah $x$ harus nol? Coba periksa $2 \times 3 = 6 \equiv 0$!"
  * *Insight:* Di modulo 6, dua bilangan bukan nol bisa menghasilkan nol (*pembagi nol*). Pembagian biasa rusak di sini!

* **Layar 2 [PREDICT] — "Mencari Kebalikan Perkalian"**
  * *Nai:* "Dalam aritmetika biasa, kebalikan dari $3$ adalah $1/3$ karena $3 \times 1/3 = 1$. Di modulo 7, adakah bilangan bulat $x$ sehingga $3 \times x \equiv 1 \pmod 7$?"
  * *Prediksi:* [Pasti Ada! ✅] / [Mustahil].

* **Layar 3 [GUIDED] — "Berburu Invers Modular"**
  * *Visual:* Lingkaran mod 7 dengan pointer perkalian 3.
  * *Uji Coba:*
    * $3 \times 1 = 3$
    * $3 \times 2 = 6$
    * $3 \times 3 = 9 \equiv 2$
    * $3 \times 4 = 12 \equiv 5$
    * $3 \times 5 = 15 \equiv 1$! 🎉
  * *Nai:* "Ditemukan! Di modulo 7, kebalikan dari 3 adalah 5! Jadi membagi dengan 3 sama saja dengan mengalikan dengan 5!"

* **Layar 4 [FORMALIZE] — "Definisi Invers Modular $a^{-1}$"**
  * *Formalisasi KaTeX:* $a \cdot x \equiv 1 \pmod m \implies x = a^{-1} \pmod m$.
  * *Interaksi [Fill-in]:* Invers dari $2 \pmod 5$ adalah [ `3` ] (karena $2 \times 3 = 6 \equiv 1$).

* **Layar 5 [GUIDED] — "Kapan Invers GAGAL Ditemukan?"**
  * *Visual:* Lingkaran mod 6. Coba cari invers dari 2:
    * $2 \times 1 = 2$, $2 \times 2 = 4$, $2 \times 3 = 0$, $2 \times 4 = 2$, $2 \times 5 = 4$.
    * Angka 1 TIDAK PERNAH muncul!
  * *Nai:* "Invers $a \pmod m$ HANYA ADA jika $\gcd(a, m) = 1$ (keduanya saling prima/koprima)!"

* **Layar 6 [CHECK] — "Deteksi Kemungkinan Invers"**
  * *Soal:* "Manakah angka yang MEMILIKI invers di modulo 10?"
  * *Pilihan:* $2$, $4$, $5$, $7$ ✅ ($\gcd(7,10)=1$), $8$.

* **Layar 7 [SANDBOX] — "Kalkulator Invers Modular"**
  * *Interaksi:* Masukkan nilai $a$ dan $m$. Kanvas menampilkan langkah pencarian invers atau memberi tahu alasan kegagalan jika ada faktor persekutuan.

* **Layar 8 [CHALLENGE] — "Pecahkan Persamaan Linier Modular"**
  * *Soal:* Selesaikan persamaan $4x \equiv 3 \pmod 7$.
  * *Langkah:* Cari invers dari $4 \pmod 7 \to 4 \times 2 = 8 \equiv 1 \to$ Inversnya 2.
  * Kalikan kedua ruas dengan 2: $x \equiv 3 \times 2 = 6 \pmod 7$.
  * *Input Angka:* $x =$ [ `6` ].

* **Layar 9 [CHALLENGE] — "Buka Brankas Sandi"**
  * *Kanvas:* Brankas dengan dial modulo 11. Sandi memenuhi: $5x \equiv 2 \pmod{11}$.
  * *Tantangan:* Putar dial ke angka $x$ yang benar! (Target: $x = 7$, karena $5 \times 7 = 35 \equiv 2$).

* **Layar 10 [REFLECT] — "Refleksi Level 3: Pembagian Tanpa Pecahan"**
  * *Nai:* "Kamu baru saja belajar membagi tanpa pernah menyentuh pecahan desimal! Ini adalah dasar matematika komputasi."
  * *Badge:* 🎖️ *Pemecah Kode Invers* (+25 XP).

---

### Level 4: Geometri Fraktal Kardioid & Seni Pola Modulo *(8 Layar)*
*Aha Moment: "Tabel perkalian modulo di lingkaran menghasilkan pola geometri indah: bentuk hati kardioid dan fraktal!"*

* **Layar 1 [PROVOKE] — "Garis Lurus Menjadi Lengkungan Cahaya"**
  * *Visual:* Lingkaran dengan 200 titik di kelilingnya. Garis-garis lurus ditarik menghubungkan titik $n \to 2n$. Tiba-tiba muncul kurva lengkung mulus berbentuk hati (kardioid)!
  * *Nai (Enthusiastic):* "Semua garis ini lurus sempurna. Dari mana datangnya lengkungan halus seperti pantulan cahaya di cangkir kopi ini?"

* **Layar 2 [PREDICT] — "Ke Mana Tali Terhubung?"**
  * *Visual:* Lingkaran 10 titik ($0 \dots 9$). Pengali $k = 2$.
  * *Nai:* "Titik 4 dikalikan 2 akan dihubungkan ke titik 8. Titik 6 dikalikan 2 ($6 \times 2 = 12 \equiv 2$) akan terhubung ke titik mana?"
  * *Prediksi [MC]:* [A] Titik 12 &nbsp; [B] Titik 2 ✅ &nbsp; [C] Titik 4

* **Layar 3 [GUIDED] — "Eksplorasi Faktor Pengali $k$"**
  * *Visual:* Kanvas lingkaran modulo interaktif. Slider faktor pengali $k$ ($2 \dots 10$) dan jumlah titik $N$ ($10 \dots 360$).
  * *Aksi:*
    * Atur $k = 2 \to$ Terbentuk 1 cuping (Kardioid).
    * Atur $k = 3 \to$ Terbentuk 2 cuping (Nefroid).
    * Atur $k = 4 \to$ Terbentuk 3 cuping!
  * *Nai:* "Jumlah lekukan selalu tepat sama dengan $k - 1$!"

* **Layar 4 [FORMALIZE] — "Persamaan Amplop Kaustik Modular"**
  * *Formalisasi:* Garis penghubung titik $\theta$ ke $k\theta$ di lingkaran membentuk garis singgung pada kurva amplop epikoloid (*caustic envelope*).

* **Layar 5 [SANDBOX] — "Seni Geometri Modulo (Math Art Studio)"**
  * *Fitur:* Slider animasi kontinu $k$ ($1.00 \dots 20.00$), pemilih palet warna neon, dan tombol simpan gambar seni fraktal.

* **Layar 6 [CHALLENGE] — "Ciptakan Bintang Bunga Berkelopak 5"**
  * *Tantangan:* Tentukan nilai pengali $k$ agar terbentuk tepat 5 lekukan simetris pada kanvas!
  * *Input Angka:* $k =$ [ `6` ] (karena cuping = $k - 1 = 5$).

* **Layar 7 [CHECK] — "Analisis Siklus Titik Nol"**
  * *Pertanyaan:* "Mengapa titik 0 selalu menjadi simpul tempat bertemunya semua garis untuk pengali berapa pun?"
  * *Jawaban:* Karena $0 \times k = 0 \pmod N$ untuk semua $k$!

* **Layar 8 [REFLECT] — "Refleksi Level 4: Keindahan Matematika Murni"**
  * *Nai:* "Matematika bukan hanya hitungan angka kering, tetapi juga harmoni visual dan simetri alam semesta!"
  * *Badge:* 🎖️ *Seniman Kardioid Modular* (+25 XP).

---

### Level 5: Kriptografi & Aplikasi Dunia Nyata *(6 Layar)*
*Aha Moment: "Pesan rahasia dienkripsi dengan menggeser atau mengalikan huruf di jam modulo!"*

* **Layar 1 [PROVOKE] — "Sandi Kaisar Julius Caesar"**
  * *Visual:* Pesan rahasia teracak: `KHOOR ZRUOG`.
  * *Nai:* "Kaisar Romawi mengirim pesan dengan memutar alfabet 3 langkah ($A \to D, B \to E$). Bisakah kamu membaca pesan di atas?"
  * *Input Interaktif:* User memutar roda sandi mundur 3 langkah $\to$ Terbaca: `HELLO WORLD`!

* **Layar 2 [GUIDED] — "Matematika Sandi Caesar (Mod 26)"**
  * *Formalisasi:* Huruf $A \dots Z$ dipetakan ke $0 \dots 25$.
  * Enkripsi: $C = (P + k) \pmod{26}$.
  * Dekripsi: $P = (C - k) \pmod{26}$.
  * *Interaksi:* Geser slider kunci $k$ untuk mengacak dan mengembalikan teks secara real-time.

* **Layar 3 [GUIDED] — "Pengacakan Satu Arah: Pintu Gerbang Diffie-Hellman"**
  * *Visual:* Simulasi pertukaran kunci rahasia publik. Menghitung $g^x \pmod p$ sangat mudah dan cepat, tapi menebak nilai $x$ dari hasil modulo sangat sulit (*masalah logaritma diskrit*)!

* **Layar 4 [CHALLENGE] — "Pecahkan Pesan Mata-Mata"**
  * *Tantangan:* Diketahui pesan dienkripsi dengan sandi affine: $C \equiv (3P + 4) \pmod{26}$.
  * Dekripsikan satu huruf: Jika $C = 7$ (huruf H), huruf asli apakah $P$?
  * *Langkah:* $3P \equiv 7 - 4 = 3 \implies P = 1$ (huruf B).
  * *Input:* [ `B` ].

* **Layar 5 [CHALLENGE] — "Validasi Nomor Barcode (Digit Cek Modulo)"**
  * *Kasus Nyata:* Angka terakhir barcode ISBN atau e-KTP dihitung memakai modulo untuk mendeteksi salah ketik!
  * Hitung digit cek kontrol dari data yang diberikan menggunakan algoritma mod 10.

* **Layar 6 [REFLECT] — "Refleksi Akhir Modul Aritmetika Jam"**
  * *Nai:* "Selamat! 🎉 Dari jam dinding sederhana, kamu telah melangkah hingga ke jantung teknologi keamanan informasi modern!"
  * *Badge Modul:* 🏆 *Master Aritmetika Modular* (+50 XP).

---

### Boss Level: Ujian Modul Aritmetika Jam *(6 Soal Campuran)*
1. **Soal 1 (Kalender & Siklus):** Jika tanggal 1 Januari jatuh pada hari Jumat, hari apakah tanggal 1 Januari pada tahun kabisat berikutnya (setelah 366 hari)? $\to$ Hitung $(5 + 366) \pmod 7$.
2. **Soal 2 (Pangkat Besar):** Tentukan sisa pembagian dari $3^{100} \pmod 7$ menggunakan pola perulangan pangkat modular.
3. **Soal 3 (Kanvas Invers):** Putar dial lingkaran modulo 13 ke posisi bilangan yang merupakan invers perkalian dari $5 \pmod{13}$.
4. **Soal 4 (Debugging Sistem):** Diberikan klaim: "Persamaan $6x \equiv 9 \pmod{15}$ tidak memiliki solusi karena $\gcd(6,15) = 3 \neq 1$." Analisis mengapa klaim ini salah, dan temukan salah satu solusi validnya!
5. **Soal 5 (Visual Kardioid):** Di sebuah lingkaran dengan 60 titik, sebuah garis ditarik dari titik 17. Ke titik berapakah garis tersebut berakhir jika faktor pengali $k = 4$?
6. **Soal 6 (Desain Kripto):** Rancang sebuah pasangan kunci enkripsi perkalian $C \equiv k \cdot P \pmod{26}$ yang VALID dan DAPAT didekripsi secara unik. Buktikan bahwa nilai $k$ yang kamu pilih memiliki invers modular di mod 26!

---
---

# TOPIK 3: Algoritma Euclid & FPB
**Slug:** `math-euclid` | **Kategori:** `math` | **Total:** 50 Layar (5 Level + Boss Level)

### Gambaran Besar
Membongkar anggapan kuno bahwa mencari FPB harus selalu melalui pohon faktor yang lambat dan rentan salah hitung. Algoritma Euclid menyelesaikannya secara elegan lewat **geometri pemotongan ubin persegi**: memotong sisa persegi panjang secara rekursif hingga bersisa nol!

---

### Level 1: Geometri Pengubinan Lantai *(10 Layar)*
*Aha Moment: "FPB dari dua bilangan adalah ukuran ubin bujur sangkar terbesar yang bisa memasang lantai secara pas tanpa perlu memotong ubin!"*

* **Layar 1 [PROVOKE] — "Tukang Keramik yang Bingung"**
  * *Visual:* Ruangan berukuran $42 \text{ cm} \times 30 \text{ cm}$. Ada tumpukan ubin bujur sangkar berbagai ukuran ($2\times2, 3\times3, 5\times5, 6\times6, 10\times10$).
  * *Nai (Curious):* "Tukang ingin menutup seluruh lantai dengan ubin bujur sangkar tanpa memotong satu pun ubin. Berapa ukuran ubin TERBESAR yang bisa ia gunakan?"

* **Layar 2 [PREDICT] — "Uji Coba Ubin"**
  * *Interaksi:* Coba seret ubin $10 \times 10$ ke ruangan $42 \times 30$.
  * *Hasil:* Muat 4 ubin memanjang ($40 \text{ cm}$), tapi bersisa celah $2 \text{ cm}$ yang tidak bisa ditutup!
  * *Nai:* "Ubin harus membagi habis panjang DAN lebar sekaligus. Berapa tebakan ukuran ubin terbesarmu?"
  * *Prediksi [MC]:* [A] $3 \times 3$ &nbsp; [B] $6 \times 6$ ✅ &nbsp; [C] $15 \times 15$

* **Layar 3 [GUIDED] — "Simulator Pengubinan Euclid: Langkah Pertama"**
  * *Visual:* Persegi panjang $42 \times 30$.
  * *Aksi:* Klik tombol [Pasang Bujur Sangkar Terbesar].
  * *Animasi:* Pasang satu bujur sangkar raksasa $30 \times 30$.
  * *Nai:* "Bujur sangkar $30 \times 30$ menutup sebagian besar lantai. Sekarang, lantai yang belum tertutup berukuran berapa?"
  * *Interaksi:* Sisa lantai adalah $30 \times 12$ (karena $42 - 30 = 12$).

* **Layar 4 [GUIDED] — "Langkah Kedua: Memotong Sisa"**
  * *Visual:* Sekarang fokus ke sisa lantai $30 \times 12$.
  * *Aksi:* Pasang bujur sangkar terbesar pada sisa ini $\to$ Muat dua bujur sangkar $12 \times 12$ ($2 \times 12 = 24$).
  * *Sisa baru:* $30 - 24 = 6 \text{ cm}$. Daerah sisa sekarang $12 \times 6$.

* **Layar 5 [GUIDED] — "Langkah Terakhir: Sisa Nol!"**
  * *Visual:* Sisa daerah $12 \times 6$.
  * *Aksi:* Pasang bujur sangkar $6 \times 6 \to$ Tepat muat 2 ubin tanpa ada sisa sedikit pun ($12 - 2 \times 6 = 0$)!
  * *Nai (Celebrating):* "Eureka! Ukuran bujur sangkar terakhir yang menutup sempurna tanpa sisa adalah $6 \times 6$! Inilah FPB dari $42$ dan $30$!"

* **Layar 6 [FORMALIZE] — "Menuliskan Langkah Pembagian Euclid"**
  * *Nai:* "Mari kita tulis proses pengubinan tadi dalam baris matematika pembagian berulang:"
  * $42 = 1 \times 30 + 12$
  * $30 = 2 \times 12 + 6$
  * $12 = 2 \times 6 + 0$ &nbsp; $\implies \gcd(42, 30) = 6$.
  * *Interaksi [Fill-in]:* Sisa bukan nol terakhir selalu merupakan [ `FPB / GCD` ].

* **Layar 7 [CHECK] — "Cek Pemahaman Pengubinan"**
  * *Soal:* "Jika lantai berukuran $20 \times 15$, berapa ukuran bujur sangkar pertama yang dipotong, dan berapa ukuran sisa lantainya?"
  * *Pilihan:* Potong $15 \times 15$, sisa $15 \times 5$ ✅.

* **Layar 8 [CHALLENGE] — "Pengubinan Kilat $60 \times 24$"**
  * *Kanvas:* Lantai $60 \times 24$.
  * *Tantangan:* Klik pasang bujur sangkar tahap demi tahap dan temukan FPB-nya!
  * *Langkah:* $60 = 2 \times 24 + 12 \to 24 = 2 \times 12 + 0 \to \gcd = 12$.
  * *Input:* Ukuran ubin terbesar = [ `12` ].

* **Layar 9 [CHALLENGE] — "Tebak Sisi Awal dari Pengubinan"**
  * *Teka-Teki:* Pengubinan menghasilkan satu kotak $20 \times 20$, lalu dua kotak $10 \times 10$ tanpa sisa. Berapa ukuran lantai persegi panjang awalnya?
  * *Input:* Panjang = [ `40` ], Lebar = [ `20` ].

* **Layar 10 [REFLECT] — "Refleksi Level 1: FPB Adalah Geometri"**
  * *Nai:* "Sekarang kamu tahu bahwa FPB bukan cuma tabel angka, tapi ukuran ubin bujur sangkar geometris!"
  * *Badge:* 🎖️ *Arsitek Pengubinan Euclid* (+25 XP).

---

### Level 2: Logika Mengapa Algoritma Ini Selalu Bekerja *(10 Layar)*
*Aha Moment: "Jika sebuah bilangan membagi $A$ dan $B$, ia PASTI membagi selisihnya $(A - B)$ dan sisanya $(A \bmod B)$!"*

* **Layar 1 [PROVOKE] — "Misteri Pengurangan Penggaris"**
  * *Visual:* Dua balok kayu panjang $A = 35$ dan $B = 14$. Penggaris kecil pengukur panjang $d = 7$.
  * *Nai:* "Penggaris 7 cm bisa mengukur balok 35 cm (5 kali pas) dan balok 14 cm (2 kali pas). Jika balok 35 dipotong sepanjang 14 cm, apakah penggaris 7 cm masih bisa mengukur sisanya secara pas?"

* **Layar 2 [PREDICT] — "Apakah Faktor Bersama Hilang Saat Dipotong?"**
  * *Prediksi:* [A] Ya, bisa hilang &nbsp; [B] Pasti tetap bisa mengukur sisanya secara pas! ✅

* **Layar 3 [GUIDED] — "Visualisasi Pemotongan Balok"**
  * *Visual:* Balok $A$ dan $B$. Potong $B$ dari $A \to$ sisa $A - B = 21$.
  * *Aksi:* Geser penggaris satuan $d = 7$. Ia membagi $14$ (2 kali), membagi $21$ (3 kali), dan membagi $35$ (5 kali).
  * *Nai:* "Setiap faktor yang membagi $A$ dan $B$ dijamin 100% pasti membagi selisihnya $A - B$!"

* **Layar 4 [FORMALIZE] — "Teorema Reduksi Euclid"**
  * *Formalisasi KaTeX:* $\gcd(a, b) = \gcd(b, a - b) = \gcd(b, a \bmod b)$.
  * *Interaksi [Fill-in]:* Mencari $\gcd(105, 30)$ sama persis dengan mencari $\gcd(30, $ [ `15` ] $)$ karena $105 \pmod{30} = 15$.

* **Layar 5 [CHECK] — "Sederhanakan Soal Raksasa"**
  * *Soal:* $\gcd(1000003, 1000000) = ?$
  * *Nai:* "Jangan gunakan pohon faktor! Gunakan sifat pengurangan!"
  * *Langkah:* $\gcd(1000000, 1000003 - 1000000) = \gcd(1000000, 3)$. Karena $1+0+0+0+0+0+0 = 1$ tidak habis dibagi 3, maka $\gcd = 1$!
  * *Input Angka:* [ `1` ].

* **Layar 6 [GUIDED] — "Perbandingan Kecepatan: Euclid vs Pohon Faktor"**
  * *Visual:* Lomba hitung antara dua metode untuk angka $1071$ dan $462$.
  * Pohon faktor: harus mencoba membagi dengan 2, 3, 5, 7, 11, 13, 17... (sangat lama).
  * Euclid: Hanya 4 baris pembagian! ($1071 = 2 \times 462 + 147 \dots \gcd = 21$).

* **Layar 7 [SANDBOX] — "Arena Reduksi Euclid Interaktif"**
  * *Interaksi:* Masukkan dua bilangan sembarang (hingga 6 digit). Perhatikan bagaimana algoritma mereduksi angka raksasa menjadi kerdil hanya dalam beberapa langkah.

* **Layar 8 [CHALLENGE] — "Hitung FPB Cepat"**
  * *Soal:* Hitung $\gcd(252, 105)$ dengan Algoritma Euclid!
  * *Langkah 1:* $252 = 2 \times 105 + $ [ `42` ]
  * *Langkah 2:* $105 = 2 \times 42 + $ [ `21` ]
  * *Langkah 3:* $42 = 2 \times 21 + 0$
  * *Hasil Akhir FPB:* [ `21` ].

* **Layar 9 [CHECK] — "Sifat FPB Bilangan Berurutan"**
  * *Pertanyaan:* "Berapakah FPB dari dua bilangan bulat positif yang berurutan, yaitu $\gcd(n, n+1)$?"
  * *Pilihan:* [Selalu 1 ✅] / [Tergantung n] / [Selalu 2].
  * *Penjelasan:* $\gcd(n+1, n) = \gcd(n, (n+1)-n) = \gcd(n, 1) = 1$.

* **Layar 10 [REFLECT] — "Refleksi Level 2: Keanggunan Reduksi"**
  * *Nai:* "Kamu memahami *mengapa* Algoritma Euclid bekerja, bukan sekadar menghafal langkahnya!"
  * *Badge:* 🎖️ *Pakar Logika Euclid* (+25 XP).

---

### Level 3: Dari FPB ke KPK (Hubungan Erat Dua Saudara) *(8 Layar)*
*Aha Moment: "Hasil kali dua bilangan selalu sama dengan hasil kali FPB dan KPK-nya: $a \times b = \gcd(a,b) \times \operatorname{lcm}(a,b)$!"*

* **Layar 1 [PROVOKE] — "Kapan Dua Lampu Menyala Bersama?"**
  * *Visual:* Lampu hijau berkedip tiap 6 detik, lampu merah tiap 8 detik.
  * *Nai:* "Keduanya menyala bersama di detik 0. Kapan detik pertama mereka menyala bersamaan lagi?" $\to$ Detik ke-24 (KPK).

* **Layar 2 [PREDICT] — "Hubungan Perkalian FPB dan KPK"**
  * *Data:* Untuk angka $6$ dan $8$: $\gcd(6,8) = 2$, $\operatorname{lcm}(6,8) = 24$.
  * Kalikan keduanya: $\gcd \times \operatorname{lcm} = 2 \times 24 = 48$.
  * Sekarang kalikan kedua angka aslinya: $6 \times 8 = 48$!
  * *Nai:* "Apakah hasil kali ini SELALU sama untuk pasangan bilangan apa pun?"
  * *Prediksi:* [Pasti Selalu Sama! ✅] / [Cuma Kebetulan].

* **Layar 3 [GUIDED] — "Visualisasi Diagram Venn Faktor Balok"**
  * *Visual:* Balok faktor prima pembentuk $a$ dan $b$.
  * FPB mengambil irisan balok (bagian yang sama). KPK mengambil gabungan seluruh balok.
  * Irisan $\times$ Gabungan $=$ Perkalian seluruh balok asli!

* **Layar 4 [FORMALIZE] — "Rumus Sakti KPK Lewat Euclid"**
  * *Formalisasi KaTeX:* $\operatorname{lcm}(a, b) = \frac{a \cdot b}{\gcd(a, b)}$.
  * *Nai:* "Mencari KPK angka besar sekarang sangat gampang: cukup cari FPB-nya dulu dengan Euclid, lalu bagi hasil kalinya!"

* **Layar 5 [CHECK] — "Hitung Cepat KPK"**
  * *Soal:* Diketahui $\gcd(60, 45) = 15$. Berapakah $\operatorname{lcm}(60, 45)$?
  * *Perhitungan:* $(60 \times 45) / 15 = 60 \times 3 = 180$.
  * *Input Angka:* [ `180` ].

* **Layar 6 [CHALLENGE] — "Masalah Roda Gigi Berputar"**
  * *Kanvas:* Roda gigi $A$ (36 gigi) bertaut dengan roda gigi $B$ (14 gigi).
  * *Tantangan:* Berapa putaran penuh yang harus dilakukan roda gigi $A$ sampai tanda panah di kedua roda bertemu kembali di posisi semula?

* **Layar 7 [CHALLENGE] — "Mencari Angka Misterius"**
  * *Soal:* Dua bilangan memiliki FPB $= 6$ dan KPK $= 90$. Jika salah satu bilangan adalah $18$, berapakah bilangan yang satunya lagi?
  * *Langkah:* $18 \times b = 6 \times 90 \implies 18b = 540 \implies b = 30$.
  * *Input Angka:* [ `30` ].

* **Layar 8 [REFLECT] — "Refleksi Level 3: Dualitas Sempurna"**
  * *Nai:* "FPB dan KPK adalah dua sisi dari satu koin yang sama!"
  * *Badge:* 🎖️ *Penyeimbang FPB & KPK* (+25 XP).

---

### Level 4: Algoritma Euclid Diperluas & Identitas Bézout *(8 Layar)*
*Aha Moment: "FPB selalu bisa dibentuk dari kombinasi penjumlahan dan pengurangan kedua bilangan: $ax + by = \gcd(a,b)$!"*

* **Layar 1 [PROVOKE] — "Teka-Teki Dua Ember Air (Die Hard Puzzle)"**
  * *Visual:* Keran air tak terbatas, ember 5 liter, dan ember 3 liter tanpa skala garis.
  * *Nai (Curious):* "Bagaimana cara mengukur tepat 1 liter air hanya dengan mengisi, mengosongkan, dan memindahkan air di antara kedua ember ini?"

* **Layar 2 [GUIDED] — "Simulator Pemindahan Ember"**
  * *Aksi Interaktif:*
    * Isi penuh ember $3\text{L} \to$ Tuang ke ember $5\text{L}$ (Ember 5L terisi 3L).
    * Isi penuh ember $3\text{L}$ lagi $\to$ Tuang ke ember $5\text{L}$ hingga penuh (hanya muat 2L).
    * *Hasil:* Sisa air di ember 3L sekarang tepat $= 1$ Liter! 🎉
  * *Nai:* "Secara matematis, kamu baru saja melakukan operasi: $2 \times (3) - 1 \times (5) = 1$!"

* **Layar 3 [FORMALIZE] — "Identitas Bézout"**
  * *Formalisasi KaTeX:* Untuk setiap bilangan bulat $a$ dan $b$, selalu ada bilangan bulat $x$ dan $y$ sehingga:
    $$a \cdot x + b \cdot y = \gcd(a, b)$$
  * *Nai:* "Air 1 liter bisa diukur karena $\gcd(5, 3) = 1$. Jika embernya 4L dan 6L ($\gcd = 2$), kamu TIDAK AKAN PERNAH bisa mengukur 1 liter!"

* **Layar 4 [GUIDED] — "Menelusuri Balik Algoritma Euclid"**
  * *Visual:* Diagram alir pembalikan langkah pembagian Euclid untuk menemukan koefisien $x$ dan $y$.

* **Layar 5 [CHECK] — "Eksistensi Solusi Air"**
  * *Soal:* "Dengan ember 12 liter dan ember 9 liter, apakah mungkin mengukur tepat 4 liter air?"
  * *Analisis:* $\gcd(12, 9) = 3$. Karena 4 tidak habis dibagi 3, maka [Mustahil ✅] / [Mungkin].

* **Layar 6 [CHALLENGE] — "Tentukan Pasangan Bézout"**
  * *Soal:* Carilah bilangan bulat $x$ dan $y$ sehingga $7x + 5y = 1$.
  * *Input Interaktif:* $x =$ [ `3` ], $y =$ [ `-4` ] (karena $21 - 20 = 1$).

* **Layar 7 [SANDBOX] — "Kalkulator Persamaan Diophantine Linier"**
  * *Fitur:* Masukkan $a, b, c$. Simulator memeriksa apakah $c$ kelipatan $\gcd(a,b)$ dan menampilkan seluruh keluarga solusi bilangan bulat $(x, y)$.

* **Layar 8 [REFLECT] — "Refleksi Level 4: Menembus Persamaan Bilangan Bulat"**
  * *Nai:* "Identitas Bézout adalah jembatan emas yang menghubungkan aritmetika dasar dengan aljabar modern dan kriptografi RSA!"
  * *Badge:* 🎖️ *Pemegang Identitas Bézout* (+25 XP).

---

### Level 5: Kasus Terburuk Euclid & Fraktal Rasio Emas $\phi$ *(4 Layar)*
*Aha Moment: "Angka yang paling lambat dan paling sulit diselesaikan oleh Algoritma Euclid adalah deret dua bilangan Fibonacci berturutan!"*

* **Layar 1 [PROVOKE] — "Siapa Lawan Terberat Algoritma Euclid?"**
  * *Nai:* "Algoritma Euclid sangat cepat. Tapi pasangan bilangan manakah yang memaksa Euclid bekerja paling keras langkah demi langkah?"
  * *Penyelidikan:* Pasangan yang setiap hasil baginya selalu menghasilkan $1$ dan ubinnya selalu persegi tunggal: $1, 1, 2, 3, 5, 8, 13, 21, \dots$ (Bilangan Fibonacci!).

* **Layar 2 [GUIDED] — "Spiral Emas dari Pengubinan Terpanjang"**
  * *Visual:* Pengubinan Euclid pada bilangan Fibonacci bertetangga ($21 \times 13$).
  * *Animasi:* Bujur sangkar $13, 8, 5, 3, 2, 1, 1$ tersusun berputar membentuk spiral cangkang nautilus (Rasio Emas $\phi \approx 1.618$).

* **Layar 3 [CHALLENGE] — "Hitung Langkah Euclid Fibonacci"**
  * *Tantangan:* Hitung berapa langkah pembagian yang dibutuhkan untuk menghitung $\gcd(55, 34)$!
  * *Verifikasi Kanvas:* Setiap baris pembagian menghasilkan sisa bilangan Fibonacci sebelumnya.

* **Layar 4 [REFLECT] — "Refleksi Modul Euclid"**
  * *Nai:* "Dari ubin lantai rumah, melangkah ke pemotongan balok, menimbang ember air, hingga spiral emas Fibonacci: Algoritma Euclid adalah mahakarya pemikiran manusia tertua yang masih dipakai hingga hari ini!"
  * *Badge Modul:* 🏆 *Master Algoritma Euclid* (+50 XP).

---

### Boss Level: Ujian Modul Euclid & FPB *(6 Soal Campuran)*
1. **Soal 1 (Geometri Ubin):** Sebuah aula berukuran $78 \text{ meter} \times 48 \text{ meter}$ akan dipasangi karpet bujur sangkar identik seluas mungkin tanpa sisa. Berapa meter panjang sisi karpet tersebut, dan berapa total karpet yang dibutuhkan?
2. **Soal 2 (Kalkulasi Berantai):** Jalankan 3 langkah Algoritma Euclid untuk menghitung $\gcd(494, 130)$ dan sebutkan sisa bukan nol terakhirnya!
3. **Soal 3 (Kanvas Ember Bézout):** Atur simulasi dua tabung ukuran 11 liter dan 7 liter untuk menghasilkan tepat 3 liter cairan di tabung utama.
4. **Soal 4 (Debugging Logika):** Seorang siswa menulis: "Karena $\gcd(a, b) = 4$, maka $\gcd(a^2, b^2) = 8$." Tunjukkan di mana letak kesalahan nalar siswa tersebut dan tuliskan jawaban yang benar!
5. **Soal 5 (Aplikasi KPK):** Tiga satelit mengitari bumi dengan periode orbit masing-masing 40 menit, 60 menit, dan 90 menit. Jika pada pukul 12:00 ketiganya sejajar di atas khatulistiwa, pukul berapa mereka akan sejajar kembali untuk pertama kalinya?
6. **Soal 6 (Desain Terbuka):** Temukan DUA pasangan bilangan bulat positif $(a, b)$ berbeda yang keduanya memiliki $\gcd(a, b) = 14$ dan $\operatorname{lcm}(a, b) = 420$!

---
---

# TOPIK 4: Faktorisasi Prima & Koprima
**Slug:** `math-primes-coprime` | **Kategori:** `math` | **Total:** 52 Layar (5 Level + Boss Level)

### Gambaran Besar
Membongkar bilangan bulat hingga ke elemen penyusun dasarnya. Bilangan prima adalah **atom pembentuk semesta aritmetika**; dan relasi koprima (saling prima) adalah kunci terciptanya fungsi Euler $\phi(n)$ yang mengunci enkripsi data perbankan dunia.

---

### Level 1: Atom Bilangan (Kisi Balok Prima) *(10 Layar)*
*Aha Moment: "Bilangan prima adalah bilangan yang ubinnya HANYA bisa disusun menjadi 1 baris lurus panjang, mustahil dibuat menjadi persegi panjang lain!"*

* **Layar 1 [PROVOKE] — "Pabrik Cokelat Persegi Panjang"**
  * *Visual:* 12 potong kubus cokelat.
  * *Nai:* "Kamu bisa menata 12 cokelat ini menjadi persegi panjang $3 \times 4$, $2 \times 6$, atau $1 \times 12$. Bagaimana jika kamu hanya punya 7 potong cokelat?"
  * *Interaksi:* Coba seret 7 potong cokelat ke kisi 2 baris atau 3 baris. Selalu ada yang bolong! Satu-satunya cara adalah berbaris lurus $1 \times 7$.

* **Layar 2 [PREDICT] — "Angka Mana yang Kaku?"**
  * *Nai:* "Di antara angka-angka ini: $9, 11, 15, 21$, manakah angka yang 'kaku' (hanya punya 1 susunan baris lurus)?"
  * *Prediksi [MC]:* [A] $9$ ($3\times3$) &nbsp; [B] $11$ ✅ &nbsp; [C] $15$ ($3\times5$) &nbsp; [D] $21$ ($3\times7$)

* **Layar 3 [GUIDED] — "Laboratorium Susunan Kisi Faktor"**
  * *Visual:* Generator kisi persegi panjang interaktif. Slider angka $N$ ($2 \dots 30$).
  * *Aksi:* Geser $N$. Kanvas menampilkan semua kemungkinan bentuk persegi panjang yang bisa dibuat.
  * *Observasi:*
    * Angka komposit ($4, 6, 8, 9, 10, 12, \dots$): punya banyak bentuk persegi panjang berbeda.
    * Angka prima ($2, 3, 5, 7, 11, 13, 17, 19, 23, \dots$): HANYA BISA $1 \times N$.

* **Layar 4 [FORMALIZE] — "Definisi Bilangan Prima & Komposit"**
  * *Interaksi [Fill-in]:* Bilangan bulat $> 1$ yang hanya memiliki tepat 2 faktor positif (1 dan dirinya sendiri) disebut bilangan [ `prima` ]. Bilangan yang memiliki lebih dari 2 faktor disebut bilangan [ `komposit` ].
  * Angka $1$ tidak termasuk prima maupun komposit.

* **Layar 5 [CHECK] — "Misteri Angka 2"**
  * *Pertanyaan:* "Berapa banyak bilangan prima yang bernilai GENAP di seluruh semesta matematika?"
  * *Pilihan:* [Hanya satu, yaitu angka 2! ✅] / [Tak terhingga] / [Tidak ada].
  * *Nai:* "Angka 2 adalah bilangan prima paling unik: satu-satunya bilangan prima genap!"

* **Layar 6 [GUIDED] — "Pohon Penguraian: Membelah Bilangan Komposit"**
  * *Visual:* Lingkaran angka $60$. Klik untuk membelah:
    * $60 \to 6 \times 10$
    * $6 \to 2 \times 3$ (keduanya menyala hijau = prima, berhenti membelah!)
    * $10 \to 2 \times 5$ (keduanya menyala hijau = prima, berhenti!)
  * *Nai:* "Semua cabang akhirnya berhenti di bilangan prima: $60 = 2 \times 2 \times 3 \times 5$!"

* **Layar 7 [PREDICT] — "Jalan Lain, Ujung yang Sama?"**
  * *Nai:* "Bagaimana jika temanmu membelah 60 dengan cara lain: $60 \to 4 \times 15$? Apakah atom prima di ujung rantingnya akan berbeda?"
  * *Prediksi:* [Pasti Sama Persis! ✅] / [Bisa Berbeda].

* **Layar 8 [FORMALIZE] — "Teorema Dasar Aritmetika"**
  * *Formalisasi KaTeX:* Setiap bilangan bulat $> 1$ dapat dinyatakan sebagai perkalian bilangan-bilangan prima secara **UNIK** (tunggal), terlepas dari urutan faktornya:
    $$N = p_1^{a_1} p_2^{a_2} \dots p_k^{a_k}$$
  * *Nai:* "Inilah DNA matematika! Setiap bilangan punya sidik jari primanya masing-masing."

* **Layar 9 [CHALLENGE] — "Pohon Faktor Tercepat"**
  * *Kanvas:* Pecahkan angka $84$ menjadi ranting-ranting prima!
  * *Input Interaktif:* $84 = 2^{[ \ 2 \ ]} \times 3^{[ \ 1 \ ]} \times 7^{[ \ 1 \ ]}$.

* **Layar 10 [REFLECT] — "Refleksi Level 1: Atom Semesta Bilangan"**
  * *Nai:* "Sama seperti semua materi tersusun dari atom kimia di tabel periodik, semua bilangan bulat tersusun dari bilangan prima!"
  * *Badge:* 🎖️ *Penemu Atom Prima* (+25 XP).

---

### Level 2: Saringan Eratosthenes (Harmoni Ritmis Eliminasi) *(10 Layar)*
*Aha Moment: "Kita tidak perlu menguji keprimaan satu per satu: cukup eliminasi kelipatan secara ritmis berirama!"*

* **Layar 1 [PROVOKE] — "Mencari Jarum di Tumpukan Jerami"**
  * *Visual:* Tabel kotak angka dari $1$ sampai $100$.
  * *Nai:* "Bagaimana cara ilmuwan Yunani Kuno 2200 tahun lalu menemukan semua bilangan prima di bawah 100 tanpa kalkulator?"

* **Layar 2 [GUIDED] — "Saringan Eratosthenes: Gelombang Pertama (Kelipatan 2)"**
  * *Aksi:* Klik angka $2$ (tandai prima). Seketika semua kelipatan 2 ($4, 6, 8, 10, \dots$) tereliminasi dan berubah gelap. Setengah dari tabel langsung gugur!

* **Layar 3 [GUIDED] — "Gelombang Kedua (Kelipatan 3)"**
  * *Aksi:* Angka berikutnya yang belum gugur adalah $3$ (tandai prima).
  * Eliminasi semua kelipatan 3 ($6, 9, 12, 15, \dots$). Pola diagonal ritmis indah muncul di tabel!

* **Layar 4 [GUIDED] — "Gelombang Ketiga & Keempat (5 dan 7)"**
  * *Aksi:* Tandai $5 \to$ coret kelipatan 5. Tandai $7 \to$ coret kelipatan 7.
  * *Nai (Curious):* "Sekarang perhatikan angka berikutnya: $11$. Apakah kita perlu menyaring kelipatan 11 untuk angka di bawah 100?"

* **Layar 5 [FORMALIZE] — "Batas Akar Kuadrat $\sqrt{N}$"**
  * *Insight Geometris:* Kelipatan terkecil dari 11 yang belum dicoret adalah $11 \times 11 = 121 > 100$!
  * *Formalisasi:* Untuk menguji bilangan prima hingga $N$, kita HANYA perlu menyaring kelipatan prima sampai [ `\sqrt{N}` ]!
  * Karena $\sqrt{100} = 10$, cukup menyaring sampai prima 7. Semua angka tersisa dijamin 100% PRIMA!

* **Layar 6 [CHECK] — "Cek Batas Uji Prima"**
  * *Soal:* "Untuk memastikan apakah angka $173$ prima atau tidak, bilangan prima terbesar apa yang perlu kita coba bagi?"
  * *Langkah:* $\sqrt{173} \approx 13.15$. Prima pembagi yang perlu diuji: $2, 3, 5, 7, 11, 13$.
  * *Input Angka:* [ `13` ].

* **Layar 7 [SANDBOX] — "Saringan Eratosthenes 1 - 400"**
  * *Fitur:* Kanvas grid interaktif hingga 400 kotak. Tombol putar otomatis dengan irama musik generator ritme kelipatan.

* **Layar 8 [CHALLENGE] — "Temukan Penyusup Komposit"**
  * *Kanvas:* 5 angka ditampilkan: $53, 67, 79, 87, 97$. Satu di antaranya bukan prima!
  * *Deteksi Cepat:* Jumlah digit $87 = 8 + 7 = 15$ (kelipatan 3)! Maka $87 = 3 \times 29$.
  * *Klik:* Kotak [ `87` ].

* **Layar 9 [CHECK] — "Pola Prima Kembar (Twin Primes)"**
  * *Observasi:* Pasangan prima berselisih 2: $(3,5), (5,7), (11,13), (17,19), (29,31)$.
  * *Pertanyaan:* "Apakah ada pasangan prima kembar yang keduanya bilangan genap?" $\to$ [Tidak Mungkin ✅].

* **Layar 10 [REFLECT] — "Refleksi Level 2: Ritme Saringan"**
  * *Nai:* "Dengan saringan Eratosthenes, menemukan ratusan bilangan prima semudah mendengarkan irama kelipatan musik!"
  * *Badge:* 🎖️ *Penyaring Eratosthenes* (+25 XP).

---

### Level 3: Bilangan Koprima & Kisi Resonansi *(10 Layar)*
*Aha Moment: "Dua bilangan tidak harus prima untuk menjadi saling prima (koprima): cukup jika mereka tidak berbagi satu pun faktor bersama!"*

* **Layar 1 [PROVOKE] — "Dua Komposit yang Saling Asing"**
  * *Visual:* Angka $8$ ($2 \times 2 \times 2$) dan Angka $9$ ($3 \times 3$).
  * *Nai:* "Keduanya adalah bilangan komposit (bukan prima). Tapi bisakah kamu menemukan faktor pembagi bersama di antara keduanya selain angka 1?"

* **Layar 2 [PREDICT] — "Berapa FPB-nya?"**
  * *Nai:* "Jika diurai ke faktor prima: $8 = 2^3$ dan $9 = 3^2$. Berapakah $\gcd(8, 9)$?"
  * *Prediksi [MC]:* [A] $2$ &nbsp; [B] $3$ &nbsp; [C] $1$ ✅

* **Layar 3 [GUIDED] — "Visualisasi Kisi Resonansi Koprima"**
  * *Visual:* Grid 2D titik koordinat $(x, y)$. Garis pandang ditarik dari $(0,0)$ ke titik target.
  * *Eksperimen:*
    * Menatap titik $(4, 6)$: Garis terhalang oleh titik $(2, 3)$ karena $\gcd(4,6) = 2$.
    * Menatap titik $(8, 9)$: Garis pandang bebas tanpa penghalang karena $\gcd(8,9) = 1$!
  * *Nai:* "Titik koordinat yang terlihat langsung dari titik asal adalah titik yang koordinatnya saling koprima!"

* **Layar 4 [FORMALIZE] — "Definisi Bilangan Koprima (Relatively Prime)"**
  * *Formalisasi KaTeX:* Bilangan $a$ dan $b$ disebut **koprima** jika dan hanya jika:
    $$\gcd(a, b) = 1$$
  * *Interaksi [Fill-in]:* Dua bilangan prima yang berbeda selalu saling [ `koprima` ].

* **Layar 5 [CHECK] — "Deteksi Pasangan Koprima"**
  * *Soal:* "Manakah dari pasangan berikut yang BUKAN merupakan pasangan koprima?"
  * *Pilihan:* $(14, 15)$, $(21, 22)$, $(15, 25)$ ✅ ($\gcd=5$), $(9, 28)$.

* **Layar 6 [GUIDED] — "Koprima Sebagai Kunci Pecahan Tak Terreduksi"**
  * *Visual:* Pecahan $a/b$.
  * *Nai:* "Sebuah pecahan $a/b$ berada dalam bentuk paling sederhana jika dan hanya jika pembilang dan penyebutnya saling koprima!"

* **Layar 7 [SANDBOX] — "Hutan Titik Pandang Koprima (Orchard Problem)"**
  * *Fitur:* Visualisasi pola fraktal kisi pohon yang tampak dari pusat koordinat. Titik-titik koprima membentuk pola simetri yang memukau.

* **Layar 8 [CHALLENGE] — "Temukan Pasangan Koprima Rahasia"**
  * *Tantangan:* Diberikan angka $N = 30 = 2 \times 3 \times 5$. Temukan sebuah bilangan antara $10$ dan $20$ yang koprima dengan $30$!
  * *Analisis:* Bilangan tidak boleh kelipatan 2, 3, atau 5 $\to$ Bilangan $11, 13, 17, 19$.
  * *Input:* [ `11` ] (atau opsi valid lainnya).

* **Layar 9 [CHECK] — "Koprima & Modulo"**
  * *Pertanyaan:* "Ingatkah kamu syarat di Topik 2 agar sebuah bilangan memiliki invers di modulo $m$?"
  * *Jawaban:* Bilangan tersebut harus saling koprima dengan $m$ ($\gcd(a, m) = 1$).

* **Layar 10 [REFLECT] — "Refleksi Level 3: Harmoni Tanpa Faktor Bersama"**
  * *Nai:* "Koprima adalah konsep relasional: bukan tentang sifat angka itu sendiri, tetapi tentang hubungan harmonis antar dua angka!"
  * *Badge:* 🎖️ *Detektif Koprima* (+25 XP).

---

### Level 4: Fungsi Totient Euler $\phi(n)$ *(8 Layar)*
*Aha Moment: "Fungsi Euler $\phi(n)$ menghitung berapa banyak angka yang bersahabat (koprima) dengan $n$ sebelum mencapainya!"*

* **Layar 1 [PROVOKE] — "Berapa Banyak Sahabat Angka 10?"**
  * *Visual:* Deretan angka $1, 2, 3, 4, 5, 6, 7, 8, 9, 10$.
  * *Nai:* "Coret semua angka yang punya faktor sekutu dengan 10 (kelipatan 2 dan 5). Berapa angka yang tersisa?"
  * *Interaksi:* Angka tersisa: $1, 3, 7, 9 \to$ Tepat ada 4 angka!
  * Maka $\phi(10) = 4$.

* **Layar 2 [PREDICT] — "Bagaimana Jika Angkanya Prima?"**
  * *Visual:* Angka prima $p = 7$. Angka di bawahnya: $1, 2, 3, 4, 5, 6$.
  * *Nai:* "Berapa banyak angka di bawah 7 yang koprima dengan 7?"
  * *Prediksi [MC]:* [A] 6 angka (semuanya!) ✅ &nbsp; [B] 3 angka &nbsp; [C] 1 angka

* **Layar 3 [FORMALIZE] — "Totient Bilangan Prima $\phi(p)$"**
  * *Formalisasi:* Karena bilangan prima $p$ tidak memiliki faktor selain 1 dan $p$, maka SEMUA angka $1, 2, \dots, p-1$ di bawahnya pasti koprima dengan $p$!
  * *Rumus KaTeX:* $\phi(p) = p - 1$.
  * *Contoh:* $\phi(13) = 12$, $\phi(101) = 100$.

* **Layar 4 [GUIDED] — "Totient Perkalian Dua Prima $\phi(p \times q)$"**
  * *Visual:* Grid matriks persegi panjang ukuran $p \times q$ (misal $3 \times 5 = 15$).
  * *Aksi:* Coret baris kelipatan $p$ dan kolom kelipatan $q$.
  * *Hasil Pengamatan:* Kotak bersih yang tersisa selalu persis berukuran $(p-1) \times (q-1)$!
  * *Rumus Emas RSA:* $\phi(p \cdot q) = (p - 1)(q - 1)$.

* **Layar 5 [CHECK] — "Hitung Totient Cepat"**
  * *Soal:* Hitung nilai dari $\phi(77)$!
  * *Langkah:* $77 = 7 \times 11 \to \phi(77) = (7 - 1)(11 - 1) = 6 \times 10 = 60$.
  * *Input Angka:* [ `60` ].

* **Layar 6 [SANDBOX] — "Simulator Fungsi Euler $\phi(n)$"**
  * *Fitur:* Masukkan angka $n$ ($1 \dots 200$). Tampilkan visual diagram lingkaran potongan fraksi angka koprima dan grafik nilai $\phi(n)$.

* **Layar 7 [CHALLENGE] — "Mencari Angka Asal dari Totient"**
  * *Soal:* Sebuah bilangan adalah hasil kali dua bilangan prima berurutan $p$ dan $q$. Jika $\phi(p \cdot q) = 24$ dan salah satu primanya adalah $5$, berapakah nilai bilangan prima yang satunya?
  * *Langkah:* $(5 - 1)(q - 1) = 24 \implies 4(q - 1) = 24 \implies q - 1 = 6 \implies q = 7$.
  * *Input Angka:* $q =$ [ `7` ].

* **Layar 8 [REFLECT] — "Refleksi Level 4: Jantung Kriptografi Modern"**
  * *Nai:* "Rumus sederhana $\phi(p \cdot q) = (p-1)(q-1)$ yang baru saja kamu temukan adalah fondasi keamanan algoritma enkripsi RSA di seluruh dunia!"
  * *Badge:* 🎖️ *Arsitek Totient Euler* (+25 XP).

---

### Level 5: Teorema Kecil Fermat & Kriptografi RSA *(4 Layar)*
*Aha Moment: "Jika kamu memangkatkan angka koprima sebanyak $p-1$ kali di modulo $p$, hasilnya SELALU kembali ke 1!"*

* **Layar 1 [PROVOKE] — "Siklus Pangkat yang Ajaib"**
  * *Visual:* Uji coba di modulo prima $p = 7$.
  * Ambil angka sembarang, misal $a = 3$:
    * $3^6 = 729$
    * $729 \pmod 7 = 1$!
  * Coba angka lain, misal $a = 5$:
    * $5^6 = 15625$
    * $15625 \pmod 7 = 1$!
  * *Nai (Shocked):* "Mengapa angka berapa pun yang dipangkatkan 6 selalu menghasilkan sisa 1 di modulo 7?!"

* **Layar 2 [FORMALIZE] — "Teorema Kecil Fermat (Fermat's Little Theorem)"**
  * *Formalisasi KaTeX:* Jika $p$ bilangan prima dan $\gcd(a, p) = 1$, maka:
    $$a^{p-1} \equiv 1 \pmod p$$
  * *Nai:* "Pierre de Fermat menemukan keteraturan abadi ini pada tahun 1640. Keteraturan siklus inilah yang memungkinkan enkripsi data tanpa kunci bersama!"

* **Layar 3 [CHALLENGE] — "Sederhanakan Pangkat Raksasa"**
  * *Soal:* Tentukan sisa pembagian dari $2^{100} \pmod{13}$!
  * *Petunjuk:* Karena 13 prima, $2^{12} \equiv 1 \pmod{13}$.
  * $100 = 8 \times 12 + 4 \implies 2^{100} \equiv (2^{12})^8 \cdot 2^4 \equiv 1^8 \cdot 16 \equiv 16 \pmod{13} = 3$.
  * *Input Angka:* [ `3` ].

* **Layar 4 [REFLECT] — "Refleksi Akhir Modul Faktorisasi Prima"**
  * *Nai:* "Kamu telah menuntaskan perjalanan dari menyusun cokelat persegi panjang, menyaring prima dengan ritme musik, membidik titik koprima di kisi koordinat, hingga membuktikan Teorema Kecil Fermat!"
  * *Badge Modul:* 🏆 *Master Bilangan Prima & Kriptografi* (+50 XP).

---

### Boss Level: Ujian Modul Faktorisasi Prima & Koprima *(6 Soal Campuran)*
1. **Soal 1 (Teorema Dasar Aritmetika):** Faktorisasi prima dari bilangan $N$ adalah $2^3 \times 3^2 \times 5$. Berapa banyak total faktor pembagi positif dari bilangan $N$ tersebut? (Gunakan rumus $(a+1)(b+1)(c+1)$ yang ditemukan dari kombinatorika kisi).
2. **Soal 2 (Saringan & Pengujian):** Manakah dari bilangan berikut yang merupakan bilangan prima: $119, 127, 133, 143$? Buktikan dengan menguji faktor prima hingga $\sqrt{N}$!
3. **Soal 3 (Kanvas Kisi Koprima):** Pada bidang grid koordinat $6 \times 6$, klik semua titik $(x, y)$ pada garis $x = 6$ yang posisinya saling koprima dengan sumbu $x$!
4. **Soal 4 (Kalkulasi Totient):** Hitung nilai $\phi(360)$ menggunakan faktorisasi prima $360 = 2^3 \times 3^2 \times 5$ dan sifat multiplikatif fungsi Euler!
5. **Soal 5 (Aplikasi Teorema Fermat):** Selesaikan nilai $x$ terkecil positif dari $5^{42} \equiv x \pmod{43}$. (Petunjuk: 43 adalah bilangan prima!).
6. **Soal 6 (Desain Terbuka Kripto RSA Sederhana):** Pilih dua bilangan prima kecil $p$ dan $q$. Tentukan modulus publik $N = p \cdot q$ dan hitung $\phi(N)$. Lalu pilih satu kunci publik $e$ yang valid (koprima dengan $\phi(N)$)!

---

## Matriks Evaluasi & Keselarasan Pedagogis

| Kriteria Standar Alur Belajar | Modul 1 (Garis Bilangan) | Modul 2 (Aritmetika Jam) | Modul 3 (Algoritma Euclid) | Modul 4 (Prima & Koprima) |
|---|---|---|---|---|
| **Total Layar** | 52 Layar | 54 Layar | 50 Layar | 52 Layar |
| **Persentase Learning by Doing** | 82.7% (43 layar interaktif) | 83.3% (45 layar interaktif) | 84.0% (42 layar interaktif) | 82.7% (43 layar interaktif) |
| **Layar Pasif (Reflect)** | 6 layar (11.5%) | 6 layar (11.1%) | 6 layar (12.0%) | 6 layar (11.5%) |
| **Aha Moment per Level** | Terdefinisi (5 buah) | Terdefinisi (5 buah) | Terdefinisi (5 buah) | Terdefinisi (5 buah) |
| **Variasi Tipe Input** | 7 format input | 8 format input | 7 format input | 8 format input |
| **Soal Ujian Akhir (Boss)** | 6 soal campuran | 6 soal campuran | 6 soal campuran | 6 soal campuran |
| **Koneksi Lintas Topik** | Menuju Aljabar & Modulo | Menuju Kriptografi & Graf | Menuju Aljabar Bézout | Menuju RSA & Teori Grup |
