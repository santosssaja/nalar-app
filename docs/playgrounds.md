# Nalar: Rencana Playground Interaktif STEM

Dokumen ini mendefinisikan spesifikasi teknis dan desain interaksi untuk setiap playground kanvas interaktif di platform **Nalar**. Setiap playground adalah modul simulasi mandiri yang memungkinkan pengguna memanipulasi parameter dan langsung mengamati perubahan visual serta rumus.

---

## Prinsip Desain Playground

```
[1. Hook Visual]         → Kanvas menampilkan fenomena menarik tanpa teks menakutkan
[2. Manipulasi Langsung] → Pengguna menggeser slider / menyeret objek
[3. Rumus Reaktif]       → KaTeX sinkron — angka di rumus berubah real-time
[4. Tantangan Logika]    → "Atur parameter agar mencapai kondisi X"
```

**Standar Teknis:**
- Target 60 FPS pada semua animasi kanvas
- Responsif: desktop (kanvas + panel samping) dan mobile (kanvas atas, panel bawah)
- Setiap slider/kontrol wajib memiliki `aria-label`, `min`, `max`, `step`
- Rumus KaTeX menampilkan nilai variabel *live* dari state kanvas
- Komponen kanvas maksimal 250 baris — pecah ke sub-komponen

---

## Daftar Playground

### Legenda

- 🟢 MVP | 🔵 v1.1 | 🟣 v2.0
- 📐 Matematika | ⚛️ Fisika | 🧪 Kimia | 🧬 Biologi
- Setiap playground mencantumkan: **Konsep**, **Interaksi**, **Visual**, **Rumus Reaktif**, **Tantangan**, dan **Teknologi**

---

## 🟢 Fase MVP

### 1. Jam Modular *(Modular Arithmetic Clock)* 📐

**Konsep:** Aritmetika modulo sebagai rotasi pada jam — memahami sisa bagi sebagai posisi angular.

**Interaksi:**
- Slider `modulus` ($n$): mengubah jumlah angka di lingkaran jam (2–36)
- Slider `multiplier` ($k$): menggambar garis dari $i$ ke $(i \times k) \mod n$ untuk semua $i$
- Toggle: tampilkan/sembunyikan garis penghubung, pola kardioid

**Visual:**
- Lingkaran jam dengan $n$ titik merata
- Garis-garis penghubung membentuk pola (kardioid saat $k=2$, nefroid saat $k=3$, dsb)
- Warna gradien pada garis berdasarkan panjang
- Animasi: $k$ berubah perlahan → pola bermorfosis halus

**Rumus Reaktif:**
```
i × k ≡ r (mod n)
Contoh: 7 × 3 ≡ 1 (mod 5)  ← angka berubah saat klik titik
```

**Tantangan:**
1. "Atur multiplier agar membentuk pola kardioid sempurna" → target: $k = 2$
2. "Temukan modulus di mana $7 \times k \equiv 1$" → konsep invers modular

**Teknologi:** SVG dinamis (lingkaran + garis), state lokal React

---

### 2. Pengubinan Euclid *(Euclidean Tiling)* 📐

**Konsep:** Algoritma Euclid divisualisasikan sebagai pengubinan persegi panjang dengan bujur sangkar terbesar secara berulang.

**Interaksi:**
- Slider `lebar` (1–100) dan `tinggi` (1–100) untuk dimensi persegi panjang
- Tombol "Langkah" → menjalankan satu iterasi pengubinan
- Tombol "Auto" → animasi penuh hingga selesai
- Klik pada bujur sangkar → highlight langkah tersebut

**Visual:**
- Persegi panjang yang diisi bujur sangkar terbesar di setiap langkah
- Warna berbeda per iterasi (palet gradien)
- Teks di setiap bujur sangkar menunjukkan ukurannya
- Panel samping: langkah-langkah pembagian tertulis

**Rumus Reaktif:**
```
GCD(a, b):
84 = 1 × 52 + 32     ← highlight baris aktif
52 = 1 × 32 + 20
32 = 1 × 20 + 12
20 = 1 × 12 + 8
12 = 1 × 8  + 4
8  = 2 × 4  + 0
GCD(84, 52) = 4
```

**Tantangan:**
1. "Temukan dua bilangan yang menghasilkan tepat 5 langkah pembagian"
2. "Berapa FPB(144, 89)?" → bilangan Fibonacci, rasio emas

**Teknologi:** SVG dinamis (rect + teks), animasi CSS transition

---

### 3. Lingkaran Satuan Trigonometri *(Unit Circle)* 📐

**Konsep:** Fungsi trigonometri sebagai proyeksi titik pada lingkaran satuan.

**Interaksi:**
- Seret titik di keliling lingkaran satuan (atau slider sudut $\theta$: 0°–360°)
- Toggle tampilan: $\sin$, $\cos$, $\tan$ secara individual
- Switch: radian / derajat
- Checkbox: tampilkan grafik gelombang di panel kanan

**Visual:**
- Lingkaran satuan pada grid kartesius
- Titik berjalan di keliling, garis proyeksi ke sumbu-x ($\cos$) dan sumbu-y ($\sin$)
- Garis tangen dari titik ke sumbu-x (visualisasi $\tan$)
- Panel kanan: grafik $\sin(\theta)$ dan $\cos(\theta)$ — titik vertikal sinkron dengan posisi di lingkaran
- Kuadran diberi warna berbeda (tanda +/- tiap fungsi)

**Rumus Reaktif:**
```
θ = 2.09 rad (120°)
sin(θ) = 0.866
cos(θ) = -0.500
tan(θ) = -1.732
```

**Tantangan:**
1. "Posisikan titik agar $\sin(\theta) = \cos(\theta)$" → target: $\theta = 45°$
2. "Temukan sudut di mana $\tan(\theta)$ tidak terdefinisi" → target: $\theta = 90°$

**Teknologi:** Mafs (bidang kartesius + parametric plot), state lokal

---

### 4. Garis Singgung Kalkulus *(Tangent Line Explorer)* 📐

**Konsep:** Turunan sebagai limit garis sekan menjadi garis singgung ($\Delta x \to 0$).

**Interaksi:**
- Dropdown pilih fungsi: $x^2$, $\sin(x)$, $e^x$, $\ln(x)$, $x^3 - 3x$
- Seret titik $a$ di sepanjang kurva
- Slider $\Delta x$ (0.01–3.0) → mengontrol jarak titik kedua garis sekan
- Tombol "Animasi $\Delta x \to 0$" → slider bergerak otomatis ke 0.01

**Visual:**
- Kurva fungsi $f(x)$ di grid kartesius
- Garis sekan (warna memudar) melalui $(a, f(a))$ dan $(a + \Delta x, f(a + \Delta x))$
- Garis tangen (warna solid terang) muncul saat $\Delta x$ kecil
- Kemiringan garis ditampilkan sebagai angka floating
- Panel bawah: grafik $f'(x)$ — titik vertikal sinkron

**Rumus Reaktif:**
```
f(x) = x²
Kemiringan sekan = [f(a+Δx) - f(a)] / Δx
                 = [(2.5)² - (2)²] / 0.5
                 = [6.25 - 4] / 0.5 = 4.50
f'(a) = 2a = 2(2) = 4.00    ← limit Δx→0
```

**Tantangan:**
1. "Temukan titik di $f(x) = x^3 - 3x$ di mana kemiringan = 0" → titik ekstrem
2. "Perkirakan $f'(1)$ untuk $f(x) = \sin(x)$ tanpa rumus turunan" → ≈ 0.54

**Teknologi:** Mafs (plot fungsi, garis, titik), animasi slider programatik

---

### 5. Jumlah Riemann *(Riemann Sum Accumulator)* 📐

**Konsep:** Integral tentu sebagai limit jumlah luas persegi panjang di bawah kurva.

**Interaksi:**
- Dropdown pilih fungsi: $x^2$, $\sin(x)$, $e^{-x^2}$, $\sqrt{x}$
- Slider $n$ (1–200): jumlah partisi persegi panjang
- Slider batas bawah $a$ dan batas atas $b$
- Pilih metode: kiri, kanan, titik tengah, trapesium
- Tombol "Animasi $n \to \infty$" → persegi panjang bertambah halus

**Visual:**
- Kurva fungsi pada grid kartesius
- $n$ persegi panjang (warna semi-transparan) di bawah/di atas kurva
- Luas total ditampilkan dan diperbarui real-time
- Warna persegi panjang: hijau (di bawah kurva = positif), merah (di atas kurva = negatif)
- Selisih dengan nilai integral pasti ditampilkan sebagai "error"

**Rumus Reaktif:**
```
∫₀² x² dx ≈ Σᵢ f(xᵢ*)·Δx
n = 8, Δx = 0.25
Jumlah Riemann (kiri) = 1.9375
Integral pasti        = 2.6667
Error                 = 27.3%
```

**Tantangan:**
1. "Berapa minimum $n$ agar error < 1%?" → pemahaman konvergensi
2. "Metode mana yang paling akurat untuk $n = 4$?" → titik tengah

**Teknologi:** Mafs (plot + polygon fill), state lokal

---

### 6. Transformasi Matriks 2D *(Matrix Playground)* 📐

**Konsep:** Matriks 2×2 sebagai transformasi ruang — determinan sebagai faktor pengali luas.

**Interaksi:**
- 4 input field untuk elemen matriks $\begin{bmatrix} a & b \\ c & d \end{bmatrix}$
- Seret ujung vektor basis $\hat{i}$ dan $\hat{j}$ langsung di kanvas
- Preset tombol: rotasi, refleksi, geser, skala, proyeksi
- Slider animasi: interpolasi dari matriks identitas ke matriks target (0% → 100%)
- Checkbox: tampilkan grid, tampilkan paralelogram unit

**Visual:**
- Grid kartesius yang ikut bertransformasi (garis melengkung menunjukkan distorsi)
- Vektor $\hat{i}$ (merah) dan $\hat{j}$ (biru) — berubah saat matriks diubah
- Paralelogram unit area berwarna (luas = $|\det|$)
- Warna area: positif (hijau) jika $\det > 0$, negatif (merah) jika $\det < 0$
- Objek contoh (huruf F atau gambar) ikut bertransformasi

**Rumus Reaktif:**
```
T = [1.50  0.00]    î' = (1.50, 0.50)
    [0.50  2.00]    ĵ' = (0.00, 2.00)

det(T) = (1.50)(2.00) - (0.00)(0.50) = 3.00
Luas paralelogram = |det(T)| = 3.00 × luas asli
Orientasi: dipertahankan (det > 0)
```

**Tantangan:**
1. "Buat matriks yang merotasi 90° berlawanan jarum jam" → $\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$
2. "Buat matriks dengan det = 0" → matriks singular, kolaps ke garis
3. "Refleksi terhadap garis $y = x$" → $\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$

**Teknologi:** Mafs (vektor, poligon, grid kustom), animasi interpolasi LERP

---

### 7. Kanon Proyektil *(Projectile Cannon)* ⚛️📐

**Konsep:** Gerak parabola — dekomposisi gerak horizontal (konstan) dan vertikal (dipercepat gravitasi).

**Interaksi:**
- Seret moncong kanon untuk mengatur sudut elevasi ($\theta$: 0°–90°)
- Slider kecepatan awal $v_0$ (1–50 m/s)
- Slider gravitasi $g$ (1–20 m/s², default 9.8) — bisa simulasi planet lain
- Slider ketinggian awal $h_0$ (0–20 m)
- Tombol "Tembak!" → animasi peluru
- Toggle: tampilkan jejak lintasan, vektor kecepatan, komponen $v_x$/$v_y$

**Visual:**
- Kanon di sisi kiri, latar lingkungan (opsional: bulan, mars via slider $g$)
- Jejak parabola peluru dengan titik-titik posisi per interval waktu
- Vektor kecepatan terdekomposisi: $v_x$ (horizontal, konstan) dan $v_y$ (vertikal, berubah)
- Target di jarak acak — indikator jarak tersisa
- Panel kanan: grafik $x(t)$, $y(t)$, $v_y(t)$ sinkron

**Rumus Reaktif:**
```
θ = 45°, v₀ = 20 m/s, g = 9.8 m/s²
vₓ = v₀ cos(θ) = 14.14 m/s
v_y = v₀ sin(θ) - gt = 14.14 - 9.8t
x(t) = vₓ · t = 14.14t
y(t) = v_y₀ · t - ½gt² = 14.14t - 4.9t²
Jangkauan R = v₀² sin(2θ) / g = 40.82 m
Tinggi maks H = v₀² sin²(θ) / 2g = 10.20 m
```

**Tantangan:**
1. "Atur sudut & kecepatan agar peluru mendarat tepat di target (50 m)"
2. "Sudut berapa yang menghasilkan jangkauan maksimum?" → 45°
3. "Dua sudut berbeda yang menghasilkan jangkauan sama" → sudut komplementer

**Teknologi:** Mafs (plot parametrik) atau Canvas 2D kustom, `requestAnimationFrame`

---

### 8. Bidang Miring Newton *(Inclined Plane Simulator)* ⚛️

**Konsep:** Hukum Newton II pada bidang miring — dekomposisi gaya gravitasi menjadi komponen paralel dan normal.

**Interaksi:**
- Slider sudut kemiringan $\theta$ (0°–60°)
- Slider massa benda $m$ (0.5–20 kg)
- Slider koefisien gesek $\mu$ (0–1.0)
- Toggle: gaya dorong/tarik tambahan (arah dan besar)
- Tombol "Lepaskan" → animasi benda meluncur/diam
- Checkbox: tampilkan/sembunyikan setiap komponen gaya

**Visual:**
- Bidang miring dengan benda balok di atasnya
- Diagram benda bebas (*free body diagram*) otomatis:
  - $\vec{W}$ (berat, ke bawah)
  - $\vec{N}$ (gaya normal, tegak lurus bidang)
  - $W_{\parallel}$ (komponen paralel bidang)
  - $W_{\perp}$ (komponen tegak lurus bidang)
  - $\vec{f}$ (gaya gesek, berlawanan arah gerak)
- Indikator: "DIAM" (gesek statis cukup) atau "BERGERAK" (meluncur)

**Rumus Reaktif:**
```
m = 5 kg, θ = 30°, μ = 0.20
W = mg = 49.0 N
W∥ = mg sin(θ) = 24.5 N
W⊥ = mg cos(θ) = 42.4 N
N = W⊥ = 42.4 N
f = μN = 8.49 N
Σ F = W∥ - f = 16.01 N
a = ΣF/m = 3.20 m/s²  → BERGERAK ↓
```

**Tantangan:**
1. "Atur $\mu$ minimum agar benda diam pada sudut 30°" → $\mu \geq \tan(30°) \approx 0.577$
2. "Pada sudut berapa benda mulai meluncur jika $\mu = 0.4$?" → $\theta = \arctan(0.4) \approx 21.8°$

**Teknologi:** Canvas 2D / SVG dinamis, animasi `requestAnimationFrame`

---

### 9. Roller Coaster Energi *(Energy Coaster)* ⚛️📐

**Konsep:** Kekekalan energi mekanik — transformasi energi kinetik ↔ potensial sepanjang lintasan.

**Interaksi:**
- Seret titik kontrol untuk membentuk lintasan roller coaster (kurva Bézier)
- Slider ketinggian awal (titik lepas)
- Slider massa kereta $m$
- Toggle gesek: aktif/nonaktif (jika aktif, slider $\mu$)
- Tombol "Lepaskan!" → animasi kereta berjalan di lintasan

**Visual:**
- Lintasan roller coaster dengan profil ketinggian
- Kereta bergerak di lintasan — kecepatan berubah berdasarkan ketinggian
- Bar chart energi (samping): $E_k$ (merah), $E_p$ (biru), $E_{total}$ (putih) — berubah sinkron dengan posisi kereta
- Jika gesek aktif: $E_{total}$ berkurang perlahan, bar $E_{panas}$ (oranye) bertambah
- Peringatan visual jika kereta tidak punya cukup energi untuk melewati bukit

**Rumus Reaktif:**
```
h = 12.0 m, v = 8.5 m/s, m = 2.0 kg
Ep = mgh = 2.0 × 9.8 × 12.0 = 235.2 J
Ek = ½mv² = ½ × 2.0 × 8.5² = 72.25 J
E_total = Ep + Ek = 307.45 J
v_maks (di dasar) = √(2gh₀) = √(2 × 9.8 × 15) = 17.15 m/s
```

**Tantangan:**
1. "Buat lintasan dengan 3 bukit di mana kereta berhasil melewati semuanya"
2. "Berapa ketinggian awal minimum agar kereta melewati loop setinggi 8m?"
3. "Aktifkan gesek — di titik mana kereta berhenti?"

**Teknologi:** Canvas 2D (path Bézier), animasi fisika berbasis energi, chart samping React

---

### 10. Simulator Gelombang *(Wave Lab)* ⚛️📐

**Konsep:** Gelombang mekanik — superposisi, interferensi, dan gelombang berdiri.

**Interaksi:**
- Slider gelombang 1: amplitudo $A_1$, frekuensi $f_1$, fase $\phi_1$
- Slider gelombang 2: amplitudo $A_2$, frekuensi $f_2$, fase $\phi_2$
- Toggle: tampilkan gelombang 1, gelombang 2, dan/atau superposisi
- Mode: "Gelombang berjalan", "Gelombang berdiri" (dua gelombang berlawanan arah)
- Kecepatan animasi: lambat / normal / cepat / jeda

**Visual:**
- Panel atas: gelombang 1 (biru) dan gelombang 2 (merah) terpisah
- Panel bawah: superposisi (ungu) = gelombang 1 + gelombang 2
- Interferensi konstruktif bercahaya terang, destruktif berwarna gelap
- Mode gelombang berdiri: node (titik diam) dan antinode (amplitudo maks) ditandai
- Partikel kecil bergerak naik-turun untuk menunjukkan gerak medium

**Rumus Reaktif:**
```
y₁(x,t) = A₁ sin(k₁x - ω₁t + φ₁)
         = 2.0 sin(3.14x - 6.28t + 0)
y₂(x,t) = A₂ sin(k₂x - ω₂t + φ₂)
         = 1.5 sin(3.14x - 6.28t + π)

Superposisi: y = y₁ + y₂
λ₁ = 2.00 m, f₁ = 1.00 Hz, v = λf = 2.00 m/s
```

**Tantangan:**
1. "Atur fase agar terjadi interferensi destruktif sempurna ($A_1 = A_2$, $\Delta\phi = \pi$)"
2. "Buat gelombang berdiri dengan tepat 3 node"
3. "Buat ketukan (*beat*) — dua frekuensi berdekatan" → efek Doppler audible

**Teknologi:** Canvas 2D / Mafs (plot fungsi animasi), `requestAnimationFrame`

---

### 11. Simulator Medan Listrik *(Electric Field Lab)* ⚛️

**Konsep:** Medan listrik dari muatan titik — garis medan, prinsip superposisi, dan potensial.

**Interaksi:**
- Klik kanvas → letakkan muatan positif (+) atau negatif (−)
- Seret muatan untuk memindahkan posisi
- Slider besar muatan per muatan ($q$: ±1 hingga ±10)
- Toggle: tampilkan garis medan, vektor medan, kontur potensial
- Seret "probe" (muatan uji) → lihat gaya yang dialami

**Visual:**
- Garis medan mengalir dari muatan positif ke negatif (animasi partikel mengalir)
- Kontur ekuipotensial (garis-garis level) dengan warna gradien
- Vektor medan di grid: panjang ∝ kekuatan, arah ∝ arah medan
- Muatan uji: panah gaya yang berubah real-time saat diseret
- Dipol: pola medan khas saat +q dan −q berdekatan

**Rumus Reaktif:**
```
Muatan: q₁ = +5 nC di (2, 0), q₂ = -3 nC di (-1, 0)
Titik uji P = (0, 2)

E₁ = kq₁/r₁² = 8.99×10⁹ × 5×10⁻⁹ / 8 = 5.62 N/C
E₂ = kq₂/r₂² = 8.99×10⁹ × 3×10⁻⁹ / 5 = 5.39 N/C
E_total = √(Eₓ² + E_y²) = 7.23 N/C, arah: 215°
V_P = kq₁/r₁ + kq₂/r₂ = 15.9 - 12.1 = 3.8 V
```

**Tantangan:**
1. "Letakkan dua muatan agar medan di titik P = (0, 0) bernilai nol"
2. "Buat konfigurasi quadrupol" → 4 muatan selang-seling
3. "Temukan titik di antara +3 dan +12 di mana medan = 0"

**Teknologi:** Canvas 2D (garis medan via field line integration), WebGL jika performa berat

---

### 12. Pembangun Rangkaian DC *(Circuit Builder)* ⚛️

**Konsep:** Hukum Ohm dan Kirchhoff — rangkaian seri, paralel, dan campuran.

**Interaksi:**
- Palette komponen: baterai, resistor, lampu, amperemeter, voltmeter, saklar
- Drag & drop komponen ke papan rangkaian grid
- Hubungkan dengan kabel (klik titik koneksi)
- Klik resistor → edit nilai hambatan ($\Omega$)
- Klik baterai → edit GGL dan hambatan dalam
- Saklar: klik untuk buka/tutup

**Visual:**
- Skema rangkaian bergaya diagram sirkuit standar
- Animasi elektron mengalir (titik-titik kecil bergerak di kabel) — kecepatan ∝ arus
- Lampu menyala (terang ∝ daya disipasi)
- Amperemeter/voltmeter menampilkan pembacaan real-time
- Warna kabel: gradien potensial (merah tinggi → biru rendah)

**Rumus Reaktif:**
```
Rangkaian Seri: R₁ = 10Ω, R₂ = 20Ω, V = 12V
R_total = R₁ + R₂ = 30 Ω
I = V / R_total = 12 / 30 = 0.40 A
V₁ = IR₁ = 4.0 V
V₂ = IR₂ = 8.0 V
P_total = IV = 4.8 W
```

**Tantangan:**
1. "Buat rangkaian agar lampu menyala dengan arus tepat 0.5 A"
2. "Rangkai 3 resistor agar hambatan total = 6Ω" (seri-paralel)
3. "Tambahkan voltmeter untuk mengukur tegangan di R₂"

**Teknologi:** React Flow (node-based graph) atau Canvas 2D kustom, solver rangkaian (Gaussian elimination)

---

### 13. Penjelajah Atom *(Atom Explorer)* 🧪

**Konsep:** Struktur atom — konfigurasi elektron dan tren tabel periodik.

**Interaksi:**
- Tabel periodik interaktif: klik elemen → model atom ditampilkan
- Slider nomor atom $Z$ (1–118) → atom berubah
- Toggle: model Bohr (orbit lingkaran) vs model orbital (awan probabilitas)
- Slider zoom: dari inti → kulit → orbital
- Toggle: tampilkan tren periodik (jari-jari, energi ionisasi, keelektronegatifan)

**Visual:**
- Mode Bohr: inti di pusat, lingkaran orbit dengan titik elektron berputar
- Mode orbital: awan probabilitas 3D (s: bola, p: dumbbell, d: clover)
- Warna kulit: K (merah), L (biru), M (hijau), dst
- Tabel periodik: elemen terpilih bercahaya, tren ditampilkan sebagai heat map gradien
- Panel samping: konfigurasi elektron tertulis ($1s^2 2s^2 2p^6 ...$)

**Rumus Reaktif:**
```
Karbon (C), Z = 6
Konfigurasi: 1s² 2s² 2p²
Elektron valensi: 4
Jari-jari atom: 77 pm
Energi ionisasi: 1086.5 kJ/mol
Keelektronegatifan: 2.55 (Pauling)
```

**Tantangan:**
1. "Elemen mana yang memiliki konfigurasi $[Ne] 3s^2 3p^4$?" → Sulfur
2. "Urutkan Li, Na, K berdasarkan jari-jari atom" → tren periodik kolom

**Teknologi:** Three.js / R3F (mode orbital 3D), SVG (mode Bohr 2D), data elemen dari JSON statis

---

## 🔵 Fase v1.1

### 14. Pembuktian Pythagoras Interaktif *(Pythagorean Proof)* 📐

**Konsep:** Pembuktian visual Teorema Pythagoras melalui penataan ulang luas bujur sangkar.

**Interaksi:**
- Seret titik sudut segitiga siku-siku untuk mengubah sisi $a$ dan $b$
- Animasi: bujur sangkar di sisi $a²$, $b²$, dan $c²$ muncul
- Tombol "Buktikan!" → potongan bujur sangkar $c²$ bergerak dan mengisi $a² + b²$
- Pilih metode pembuktian: penataan ulang, shearing, atau pembuktian aljabar

**Visual:**
- Segitiga siku-siku dengan bujur sangkar di setiap sisi
- Bujur sangkar berwarna berbeda: $a²$ (merah), $b²$ (biru), $c²$ (ungu)
- Animasi penataan ulang: potongan $c²$ berpindah dan pas mengisi gabungan $a² + b²$
- Luas masing-masing ditampilkan di dalam bujur sangkar

**Rumus Reaktif:**
```
a = 3.0, b = 4.0
c = √(a² + b²) = √(9 + 16) = √25 = 5.0
a² + b² = 9 + 16 = 25 = c²  ✓
```

**Tantangan:**
1. "Buat segitiga siku-siku dengan sisi bilangan bulat (Tripel Pythagoras)"
2. "Apakah segitiga dengan sisi 5, 12, 13 siku-siku?" → verifikasi visual

**Teknologi:** Mafs / SVG (poligon animasi), CSS transitions untuk animasi penataan

---

### 15. Bidang Arah ODE *(Slope Field Explorer)* 📐

**Konsep:** Bidang arah (slope fields) untuk persamaan diferensial — visualisasi solusi tanpa penyelesaian analitik.

**Interaksi:**
- Dropdown pilih ODE: $y' = x + y$, $y' = \sin(x)y$, $y' = y(1-y)$ (logistik), dsb
- Klik di mana saja pada kanvas → kurva solusi ditarik melewati titik tersebut
- Slider kepadatan titik garis arah
- Slider rentang $x$ dan $y$
- Input kustom: ketik ODE sendiri ($y' = ...$)

**Visual:**
- Grid garis-garis kecil (slope field) — kemiringan sesuai $y' = f(x, y)$ di setiap titik
- Kurva solusi (warna berbeda per klik) mengalir mengikuti arah garis
- Titik kesetimbangan ditandai (stabil = hijau, tidak stabil = merah)
- Isocline garis di mana $y'$ konstan (opsional overlay)

**Rumus Reaktif:**
```
dy/dx = y(1 - y)
Titik kesetimbangan: y = 0 (tidak stabil), y = 1 (stabil)
Solusi melewati (0, 0.2):
y(x) = 1 / (1 + 4e⁻ˣ)  ← kurva logistik
```

**Tantangan:**
1. "Temukan kondisi awal $y(0)$ agar $\lim_{x \to \infty} y(x) = 1$" → sembarang $y(0) > 0$
2. "Identifikasi titik kesetimbangan stabil untuk $y' = y^2 - 4$" → $y = -2$

**Teknologi:** Canvas 2D (grid garis), Euler's method numerik untuk kurva solusi

---

### 16. Papan Galton & CLT *(Galton Board)* 📐⚛️

**Konsep:** Demonstrasi Teorema Limit Pusat — distribusi binomial menuju normal.

**Interaksi:**
- Slider jumlah baris pin ($n$: 4–20)
- Slider jumlah bola ($N$: 10–5000)
- Slider probabilitas belok kanan ($p$: 0.0–1.0, default 0.5)
- Tombol "Jatuhkan Semua" → animasi semua bola jatuh
- Tombol "Jatuhkan 1" → satu bola jatuh perlahan
- Kecepatan animasi: lambat / cepat / instan

**Visual:**
- Papan segitiga dengan pin dan slot di bawah
- Bola jatuh dan memantul kiri/kanan secara acak
- Histogram slot terisi dari bawah — membentuk kurva lonceng
- Overlay: kurva distribusi normal $\mathcal{N}(\mu, \sigma^2)$ ditumpangkan di atas histogram
- Indikator: mean, standar deviasi, skewness

**Rumus Reaktif:**
```
n = 12 baris, p = 0.50, N = 1000 bola
μ = np = 6.00
σ = √(np(1-p)) = 1.73
P(X = 6) = C(12,6) × 0.5¹² = 0.2256
Distribusi ≈ N(6.00, 1.73²) saat n besar
```

**Tantangan:**
1. "Atur $p = 0.3$ — ke arah mana histogram miring?"
2. "Berapa $n$ minimum agar histogram terlihat seperti kurva normal?"

**Teknologi:** Canvas 2D (animasi bola fisika), SVG histogram, math engine untuk distribusi

---

### 17. Bandul & Pegas (GHS) *(Simple Harmonic Motion Lab)* ⚛️📐

**Konsep:** Gerak harmonik sederhana — hubungan osilasi, energi, dan fungsi sinusoidal.

**Interaksi:**
- Tab: bandul sederhana / pegas-massa
- Bandul: slider panjang tali $L$, slider amplitudo awal $\theta_0$, slider $g$
- Pegas: slider konstanta pegas $k$, slider massa $m$, slider simpangan awal $x_0$
- Slider redaman $b$ (0 = tanpa redaman)
- Tombol "Lepaskan" → animasi osilasi
- Checkbox: tampilkan grafik $x(t)$, $v(t)$, $a(t)$

**Visual:**
- Animasi bandul/pegas bergoyang
- Grafik $x(t) = A\cos(\omega t + \phi)$ sinkron di panel kanan
- Bar chart energi: $E_k$ (merah) dan $E_p$ (biru) bertukar-tukar
- Jika redaman aktif: amplitudo menyusut, selubung eksponensial ditampilkan
- Fasor berputar (opsional) menunjukkan hubungan gerak melingkar ↔ GHS

**Rumus Reaktif:**
```
Bandul: L = 1.5 m, g = 9.8 m/s², θ₀ = 15°
T = 2π√(L/g) = 2π√(1.5/9.8) = 2.46 s
f = 1/T = 0.41 Hz
ω = 2πf = 2.55 rad/s
θ(t) = 15° cos(2.55t)
```

**Tantangan:**
1. "Atur panjang tali agar periode = 2 detik" → $L \approx 0.993$ m
2. "Buktikan bahwa massa bandul tidak memengaruhi periode"
3. "Atur redaman agar osilasi berhenti dalam 10 ayunan"

**Teknologi:** Canvas 2D (animasi pendulum/spring), Mafs (grafik $x(t)$)

---

### 18. Ray Tracer Optik *(Optics Ray Tracer)* ⚛️

**Konsep:** Optika geometri — refleksi, refraksi (Hukum Snell), dan pembentukan bayangan oleh cermin/lensa.

**Interaksi:**
- Palette: sumber cahaya (titik/paralel), cermin (datar/cekung/cembung), lensa (konvergen/divergen), prisma
- Drag & drop elemen optik ke meja optik
- Seret posisi objek (anak panah)
- Slider jari-jari kelengkungan cermin/lensa
- Slider indeks bias (untuk prisma dan refraksi)

**Visual:**
- Sinar cahaya (garis) memantul/membelok saat melewati elemen optik
- Bayangan terbentuk: nyata (garis solid) vs maya (garis putus-putus)
- Sinar utama ditampilkan: paralel, fokal, pusat
- Prisma: dispersi cahaya putih → spektrum warna (pelangi)
- Panel info: posisi bayangan, pembesaran, sifat bayangan

**Rumus Reaktif:**
```
Lensa konvergen, f = 10 cm
Objek: s = 15 cm
1/f = 1/s + 1/s'
1/10 = 1/15 + 1/s'
s' = 30 cm (bayangan nyata)
M = -s'/s = -30/15 = -2.0× (terbalik, 2× lebih besar)
```

**Tantangan:**
1. "Posisikan objek agar bayangan berukuran sama dengan objek" → $s = 2f$
2. "Buat bayangan maya menggunakan lensa konvergen" → $s < f$
3. "Susun dua lensa agar pembesaran total = 4×"

**Teknologi:** Canvas 2D (ray casting geometris), SVG gradien untuk spektrum

---

### 19. Titrasi Asam-Basa *(Titration Lab)* 🧪

**Konsep:** Titrasi — hubungan volume titran, pH, dan titik ekuivalen.

**Interaksi:**
- Pilih asam: HCl (kuat), CH₃COOH (lemah), H₂SO₄ (diprotik)
- Pilih basa: NaOH (kuat), NH₃ (lemah)
- Slider volume asam awal dan konsentrasi
- Tombol tetes: tambah 0.5 mL basa per klik (atau slider volume)
- Pilih indikator: fenolftalein, metil oranye, bromtimol biru

**Visual:**
- Erlenmeyer berisi larutan — warna berubah sesuai indikator & pH
- Buret di atas meneteskan titran
- Kurva titrasi real-time ($pH$ vs volume titran)
- Titik ekuivalen ditandai di kurva
- Warna larutan berubah tajam saat melewati rentang pH indikator

**Rumus Reaktif:**
```
HCl 0.1 M (25 mL) + NaOH 0.1 M
Volume NaOH ditambahkan: 20.0 mL
mol HCl sisa = 0.0025 - 0.0020 = 0.0005 mol
[H⁺] = 0.0005 / 0.045 = 0.0111 M
pH = -log(0.0111) = 1.95
Titik ekuivalen: V = 25.0 mL, pH = 7.00
```

**Tantangan:**
1. "Tentukan konsentrasi asam tak diketahui dari kurva titrasi"
2. "Pilih indikator yang tepat untuk titrasi asam lemah + basa kuat" → fenolftalein
3. "Hitung volume NaOH 0.2 M untuk menetralkan 30 mL HCl 0.1 M"

**Teknologi:** Canvas 2D / SVG (peralatan lab), Mafs (kurva titrasi), math engine pH

---

### 20. Simulasi Ekosistem Lotka-Volterra *(Predator-Prey Sim)* 🧬📐

**Konsep:** Dinamika populasi predator-mangsa — model Lotka-Volterra dan kesetimbangan ekologis.

**Interaksi:**
- Slider populasi awal mangsa ($x_0$) dan predator ($y_0$)
- Slider parameter: laju reproduksi mangsa ($\alpha$), laju predasi ($\beta$), laju kematian predator ($\delta$), efisiensi konversi ($\gamma$)
- Tombol "Jalankan simulasi" → animasi makhluk bergerak di area
- Toggle: tampilkan grafik populasi vs waktu, tampilkan diagram fase ($x$ vs $y$)
- Slider kecepatan waktu

**Visual:**
- Area ekosistem (atas): titik hijau (mangsa) dan merah (predator) bergerak, memangsa, berkembang biak
- Grafik populasi (tengah): $x(t)$ dan $y(t)$ berosilasi dengan fase berbeda
- Diagram fase (bawah): lintasan tertutup pada bidang $x$-$y$
- Titik kesetimbangan ditandai

**Rumus Reaktif:**
```
dx/dt = αx - βxy = 1.0(80) - 0.02(80)(30) = 32.0
dy/dt = γxy - δy = 0.01(80)(30) - 0.5(30) = 9.0

Kesetimbangan: x* = δ/γ = 50, y* = α/β = 50
Populasi berosilasi dengan periode ≈ 8.3 satuan waktu
```

**Tantangan:**
1. "Atur parameter agar kedua populasi stabil (tidak berosilasi)" → titik kesetimbangan
2. "Apa yang terjadi jika laju reproduksi mangsa dilipatgandakan?"
3. "Temukan parameter yang menyebabkan kepunahan predator"

**Teknologi:** Canvas 2D (animasi agen), Mafs (grafik & diagram fase), Euler's method numerik

---

## 🟣 Fase v2.0

### 21. Pemetaan Konformal *(Conformal Map Explorer)* 📐

**Konsep:** Transformasi fungsi kompleks — bagaimana fungsi analitik mempertahankan sudut.

**Interaksi:**
- Dropdown fungsi: $z^2$, $e^z$, $1/z$, $\sin(z)$, $\frac{z-1}{z+1}$ (Möbius)
- Seret titik/grid di domain (bidang-$z$) → lihat bayangan di kodomain (bidang-$w$)
- Slider parameter untuk transformasi Möbius: $a, b, c, d$
- Toggle: tampilkan grid sumber, tampilkan lingkaran, tampilkan garis

**Visual:**
- Panel kiri: bidang-$z$ dengan grid kotak / lingkaran konsentris
- Panel kanan: bidang-$w$ — grid bertransformasi (kotak menjadi kurva, tetapi sudut tetap 90°)
- Warna grid dipertahankan untuk mencocokkan domain ↔ kodomain
- Animasi interpolasi: perlahan berubah dari identitas ke transformasi penuh

**Tantangan:**
1. "Fungsi mana yang memetakan lingkaran menjadi lingkaran?" → transformasi Möbius
2. "Temukan $f(z)$ yang memetakan setengah bidang atas ke cakram satuan"

**Teknologi:** Canvas 2D / WebGL (rendering grid transformasi), math engine bilangan kompleks

---

### 22. Lorenz Attractor 3D *(Chaos Explorer)* ⚛️📐

**Konsep:** Sensitivitas terhadap kondisi awal — atractor aneh dan teori chaos.

**Interaksi:**
- Slider parameter Lorenz: $\sigma$ (10), $\rho$ (28), $\beta$ (8/3)
- Slider kondisi awal: $x_0$, $y_0$, $z_0$
- Tombol "Tambah trajektori" → trajektori baru dengan kondisi awal sedikit berbeda ($\pm 0.001$)
- Rotasi 3D orbit/trackball
- Kecepatan animasi, toggle jejak

**Visual:**
- Lorenz attractor 3D — dua trajektori berdekatan yang perlahan menyimpang (*butterfly effect*)
- Jejak berwarna gradien berdasarkan waktu
- Panel samping: grafik $x(t)$ untuk setiap trajektori — awalnya identik, lalu menyimpang
- Indikator divergensi: jarak antara dua trajektori vs waktu (pertumbuhan eksponensial)

**Rumus Reaktif:**
```
dx/dt = σ(y - x) = 10(y - x)
dy/dt = x(ρ - z) - y = x(28 - z) - y
dz/dt = xy - βz = xy - (8/3)z

Eksponen Lyapunov ≈ 0.91 (chaos!)
Divergensi: |Δr(t)| ≈ |Δr₀| × e^(0.91t)
```

**Tantangan:**
1. "Atur $\rho < 1$ — apa yang terjadi?" → titik tetap stabil, tanpa chaos
2. "Temukan $\rho$ transisi menuju chaos" → ≈ 24.74

**Teknologi:** Three.js / R3F (garis 3D, orbit controls), RK4 integrator

---

### 23. Efek Fotolistrik *(Photoelectric Effect Lab)* ⚛️

**Konsep:** Efek kuantum — foton sebagai partikel cahaya yang membebaskan elektron dari logam.

**Interaksi:**
- Slider frekuensi cahaya $f$ (atau panjang gelombang $\lambda$) — warna berubah dari merah ke UV
- Slider intensitas cahaya (jumlah foton per detik)
- Dropdown logam: natrium, kalium, tembaga, platinum (fungsi kerja $\phi$ berbeda)
- Slider tegangan pembalik $V_{stop}$

**Visual:**
- Pelat logam diterangi cahaya berwarna
- Elektron terpancar (jika $hf > \phi$) — animasi partikel memercik keluar
- Jika $hf < \phi$: tidak ada elektron (walaupun intensitas tinggi!) — inti kuantum
- Grafik: $E_k$ elektron vs frekuensi — garis lurus dengan gradien = $h$
- Intensitas hanya mengubah jumlah elektron, bukan energi masing-masing

**Rumus Reaktif:**
```
Logam: Natrium (φ = 2.28 eV)
f = 7.0 × 10¹⁴ Hz
E_foton = hf = 6.626×10⁻³⁴ × 7.0×10¹⁴ = 2.90 eV
Ek_maks = hf - φ = 2.90 - 2.28 = 0.62 eV
V_stop = Ek_maks / e = 0.62 V
Frekuensi ambang: f₀ = φ/h = 5.51 × 10¹⁴ Hz
```

**Tantangan:**
1. "Temukan frekuensi ambang untuk tembaga ($\phi = 4.7$ eV)"
2. "Naikkan intensitas 10× — apakah energi elektron berubah?" → TIDAK (inti kuantum)
3. "Tentukan konstanta Planck dari grafik $E_k$ vs $f$" → gradien = $h$

**Teknologi:** Canvas 2D (animasi foton & elektron), Mafs (grafik Ek vs f)

---

### 24. Simulator Fourier *(Fourier Epicycles)* 📐⚛️

**Konsep:** Deret Fourier — fungsi periodik apa pun dapat diuraikan menjadi jumlahan sinusoidal (epicycles).

**Interaksi:**
- Pilih bentuk gelombang: kotak, segitiga, gigi gergaji, atau gambar tangan (*draw your own wave*)
- Slider jumlah harmonik $N$ (1–100) → semakin banyak, semakin akurat
- Toggle: tampilkan epicycles (lingkaran berputar), tampilkan spektrum frekuensi
- Mode gambar: gambar bentuk bebas → lingkaran Fourier mereproduksi gambar tersebut
- Kecepatan animasi

**Visual:**
- Kiri: rangkaian lingkaran berputar (epicycles) — ujung lingkaran terakhir menjejak kurva
- Kanan: gelombang hasil vs gelombang target (overlay)
- Bawah: spektrum frekuensi (batang amplitudo per harmonik)
- Animasi sangat memuaskan: tambah harmonik satu per satu → bentuk semakin mirip target

**Rumus Reaktif:**
```
Gelombang kotak, N = 5 harmonik:
f(t) ≈ (4/π)[sin(t) + sin(3t)/3 + sin(5t)/5 + sin(7t)/7 + sin(9t)/9]

Amplitudo harmonik ke-n: aₙ = 4/(nπ) untuk n ganjil
Fenomena Gibbs: overshoot ≈ 9% di diskontinuitas
```

**Tantangan:**
1. "Berapa harmonik minimum untuk membedakan kotak dari segitiga?"
2. "Gambar huruf namamu — lihat berapa harmonik yang diperlukan"
3. "Identifikasi mengapa gelombang kotak punya overshoot (Gibbs)"

**Teknologi:** Canvas 2D (animasi epicycle), FFT via math engine, input gesture drawing

---

### 25. Gradient Descent Visualizer *(Loss Surface Explorer)* 📐

**Konsep:** Optimasi — algoritma gradient descent mencari minimum fungsi.

**Interaksi:**
- Pilih fungsi: $f(x,y) = x^2 + y^2$ (mudah), Rosenbrock, Rastrigin (sulit, banyak minimum lokal)
- Klik posisi awal "bola" pada permukaan
- Slider laju pembelajaran $\alpha$ (0.001–1.0)
- Slider momentum $\beta$ (0–0.99)
- Dropdown algoritma: vanilla GD, momentum, Adam
- Tombol "Mulai" → animasi bola menggelinding ke minimum

**Visual:**
- Permukaan 3D (atau kontur 2D top-down) fungsi rugi
- "Bola" menggelinding di permukaan — jejak jalur optimasi
- Gradien ditampilkan sebagai panah di setiap langkah
- Konvergensi: panel samping menunjukkan $f(x,y)$ per iterasi (grafik menurun)
- Jika $\alpha$ terlalu besar: bola melompat-lompat (divergen, warna merah)
- Jika $\alpha$ terlalu kecil: bola bergerak sangat lambat

**Rumus Reaktif:**
```
f(x,y) = (1-x)² + 100(y-x²)²   (Rosenbrock)
Posisi: (x, y) = (-0.5, 0.8)
∂f/∂x = -2(1-x) - 400x(y-x²) = -231.0
∂f/∂y = 200(y-x²) = 210.0
α = 0.001
x_new = x - α·∂f/∂x = -0.5 + 0.231 = -0.269
y_new = y - α·∂f/∂y = 0.8 - 0.210 = 0.590
f_new = 2.60 (turun dari 56.25)
```

**Tantangan:**
1. "Temukan $\alpha$ agar konvergen dalam < 100 iterasi untuk $x^2 + y^2$"
2. "Gunakan Rastrigin — temukan minimum global, bukan lokal"
3. "Bandingkan vanilla GD vs momentum pada Rosenbrock — mana yang lebih cepat?"

**Teknologi:** Three.js / R3F (permukaan 3D), Mafs (kontur 2D), math engine gradien

---

### 26. Simulasi Dilatasi Waktu *(Time Dilation Sim)* ⚛️📐

**Konsep:** Relativitas khusus — waktu melambat pada kecepatan mendekati cahaya.

**Interaksi:**
- Slider kecepatan pesawat $v$ (0 – 0.99c)
- Dua jam: jam diam (pengamat) dan jam bergerak (pesawat)
- Toggle: tampilkan kontraksi panjang pesawat
- Slider usia astronot / pengamat → paradoks kembar
- Tombol "Kirim ke Proxima Centauri" → scenario perjalanan

**Visual:**
- Dua jam analog berdampingan: satu berdetak normal, satu melambat
- Pesawat bergerak: memendek secara visual (kontraksi Lorentz)
- Grafik $\gamma$ vs $v/c$ — faktor Lorentz meningkat tajam mendekati $c$
- Diagram ruang-waktu Minkowski (opsional): worldline pengamat vs pelancong

**Rumus Reaktif:**
```
v = 0.90c
γ = 1/√(1 - v²/c²) = 1/√(1 - 0.81) = 2.294

Pengamat: Δt = 10.0 tahun
Pelancong: Δt' = Δt/γ = 10.0/2.294 = 4.36 tahun

Panjang pesawat:
L₀ = 100 m → L = L₀/γ = 43.6 m
```

**Tantangan:**
1. "Berapa kecepatan agar 1 tahun pelancong = 10 tahun pengamat?" → $v \approx 0.995c$
2. "Hitung usia astronot saat kembali dari perjalanan 20 tahun-cahaya pada 0.8c"

**Teknologi:** Canvas 2D (jam animasi, pesawat), Mafs (grafik gamma), math engine Lorentz

---

### 27. Perambatan Gelombang 2D *(Wave Propagation 2D)* ⚛️📐

**Konsep:** PDE gelombang dan difusi panas — visualisasi solusi persamaan diferensial parsial.

**Interaksi:**
- Tab: gelombang air / difusi panas / gelombang EM
- Klik di permukaan → buat gangguan (sumber titik)
- Slider kecepatan gelombang / koefisien difusi
- Slider redaman
- Toggle dinding pantul / dinding menyerap
- Tambahkan penghalang (celah tunggal/ganda → difraksi)

**Visual:**
- Gelombang: riak air menyebar konsentris dari titik sumber, warna = ketinggian
- Difusi: panas menyebar dari titik panas, gradient warna (merah → biru)
- Celah ganda: pola interferensi terbentuk di sisi lain penghalang
- Kecepatan render tinggi: grid simulasi 200×200+ (WebGL jika perlu)

**Rumus Reaktif:**
```
Gelombang: ∂²u/∂t² = c²(∂²u/∂x² + ∂²u/∂y²)
c = 2.0 m/s, λ = 0.5 m, f = c/λ = 4.0 Hz

Difusi: ∂T/∂t = α(∂²T/∂x² + ∂²T/∂y²)
α = 0.01 m²/s, T_sumber = 100°C
```

**Tantangan:**
1. "Buat pola interferensi destruktif di titik P menggunakan dua sumber"
2. "Berapa lebar celah optimal untuk difraksi yang terlihat jelas?"

**Teknologi:** WebGL / GPU shader (performa grid besar), texture rendering

---

## Ringkasan Playground per Fase

| Fase | # | Playground | Domain |
| :---: | :---: | :--- | :---: |
| 🟢 | 1 | Jam Modular | 📐 |
| 🟢 | 2 | Pengubinan Euclid | 📐 |
| 🟢 | 3 | Lingkaran Satuan Trigonometri | 📐 |
| 🟢 | 4 | Garis Singgung Kalkulus | 📐 |
| 🟢 | 5 | Jumlah Riemann | 📐 |
| 🟢 | 6 | Transformasi Matriks 2D | 📐 |
| 🟢 | 7 | Kanon Proyektil | ⚛️📐 |
| 🟢 | 8 | Bidang Miring Newton | ⚛️ |
| 🟢 | 9 | Roller Coaster Energi | ⚛️📐 |
| 🟢 | 10 | Simulator Gelombang | ⚛️📐 |
| 🟢 | 11 | Simulator Medan Listrik | ⚛️ |
| 🟢 | 12 | Pembangun Rangkaian DC | ⚛️ |
| 🟢 | 13 | Penjelajah Atom | 🧪 |
| 🔵 | 14 | Pembuktian Pythagoras | 📐 |
| 🔵 | 15 | Bidang Arah ODE | 📐 |
| 🔵 | 16 | Papan Galton & CLT | 📐⚛️ |
| 🔵 | 17 | Bandul & Pegas (GHS) | ⚛️📐 |
| 🔵 | 18 | Ray Tracer Optik | ⚛️ |
| 🔵 | 19 | Titrasi Asam-Basa | 🧪 |
| 🔵 | 20 | Ekosistem Lotka-Volterra | 🧬📐 |
| 🟣 | 21 | Pemetaan Konformal | 📐 |
| 🟣 | 22 | Lorenz Attractor 3D | ⚛️📐 |
| 🟣 | 23 | Efek Fotolistrik | ⚛️ |
| 🟣 | 24 | Simulator Fourier | 📐⚛️ |
| 🟣 | 25 | Gradient Descent Visualizer | 📐 |
| 🟣 | 26 | Simulasi Dilatasi Waktu | ⚛️📐 |
| 🟣 | 27 | Perambatan Gelombang 2D | ⚛️📐 |

---

## Peta Teknologi per Playground

| Teknologi | Playground |
| :--- | :--- |
| **Mafs** | #3 Lingkaran Satuan, #4 Garis Singgung, #5 Riemann, #6 Matriks, #15 Slope Field, #17 GHS grafik |
| **SVG Dinamis** | #1 Jam Modular, #2 Euclid, #14 Pythagoras, #16 Galton histogram |
| **Canvas 2D** | #7 Proyektil, #8 Bidang Miring, #9 Roller Coaster, #10 Gelombang, #11 Medan Listrik, #17 GHS animasi, #18 Optik, #21 Konformal, #26 Dilatasi Waktu |
| **Three.js / R3F** | #13 Atom (orbital 3D), #22 Lorenz Attractor, #25 Gradient Descent permukaan |
| **WebGL / GPU** | #27 Gelombang 2D (shader grid besar) |
| **React Flow** | #12 Rangkaian DC (node-based), #20 Ekosistem (jaring makanan) |
| **Web Audio API** | #10 Gelombang (opsional: dengarkan superposisi), #24 Fourier (dengarkan harmonik) |
