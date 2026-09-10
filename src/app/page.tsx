import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Eye,
  Volume2,
  LockOpen,
  Clock,
  Compass,
  CheckCircle2,
  Grid,
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 w-full bg-neutral-950 text-neutral-100 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl px-4 pt-12 pb-14 text-center flex flex-col items-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>SDG 4: Platform Edukasi STEM Terbuka & Inklusif</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-4xl leading-tight">
          Pahami Matematika Rumit Lewat{" "}
          <span className="bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Intuisi Visual Langsung
          </span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
          Alternatif terbuka dan gratis seperti Brilliant. Tanpa hambatan login di awal,
          dilengkapi visualisasi kanvas dinamis 60 FPS dan fitur aksesibilitas kelas satu ramah difabel.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link
            href="/topics/arithmetic-modular-clock"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-600/30 transition hover:scale-105"
          >
            <Clock className="w-4 h-4" />
            <span>Level 1: Aritmetika Jam (Modulo)</span>
          </Link>

          <Link
            href="/topics/linear-algebra-determinant-2d"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition hover:scale-105"
          >
            <Grid className="w-4 h-4" />
            <span>Level 3: Determinan Matriks 2D</span>
          </Link>

          <a
            href="#katalog"
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-bold text-xs sm:text-sm transition"
          >
            <Compass className="w-4 h-4 text-sky-400" />
            <span>Peta Jalan</span>
          </a>
        </div>
      </section>

      {/* Featured Lessons Grid */}
      <section className="w-full max-w-6xl px-4 mb-16 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Modul Interaktif Siap Eksplorasi
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Pilih Topik Pembelajaran Mandiri
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Level 1 - Modulo Clock */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/40 border border-amber-500/30 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  LEVEL 1 • ARITMETIKA & TEORI BILANGAN
                </span>
                <span className="text-xs text-amber-400 font-mono font-bold">+120 XP</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Aritmetika Jam: Modulo & Siklus Pola Bilangan
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Pahami bilangan bulat sebagai siklus rotasi jam. Amati bagaimana perkalian modular melahirkan kurva kardioid (pola bentuk hati/cangkir kopi) dan generator siklis penuh.
              </p>
              <div className="flex items-center gap-3 text-xs text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 3 Teka-Teki Logika
                </span>
                <span>•</span>
                <span>Sisa Bagi, Kardioid & FPB</span>
              </div>
            </div>

            <Link
              href="/topics/arithmetic-modular-clock"
              className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm text-center shadow-lg shadow-amber-600/20 transition hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Eksplorasi Modulo Jam</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Level 3 - Determinant 2D */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-indigo-950/40 border border-indigo-500/30 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  LEVEL 3 • ALJABAR LINEAR
                </span>
                <span className="text-xs text-indigo-400 font-mono font-bold">+120 XP</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Determinan: Transformasi Luas Ruang 2D
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Tarik vektor basis pada koordinat spasial dan amati perubahan luas jajaran genjang. Temukan mengapa determinan nol membuat ruang mengempis tanpa invers.
              </p>
              <div className="flex items-center gap-3 text-xs text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 3 Teka-Teki Logika
                </span>
                <span>•</span>
                <span>Luas Spasial & Refleksi Cermin</span>
              </div>
            </div>

            <Link
              href="/topics/linear-algebra-determinant-2d"
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm text-center shadow-lg shadow-indigo-600/20 transition hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Eksplorasi Determinan 2D</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Inclusivity Pillars */}
      <section className="w-full max-w-6xl px-4 py-12 border-t border-neutral-800/80">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            Prinsip Arsitektur Inklusif
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            Pendidikan STEM Tanpa Hambatan Fisik atau Finansial
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Ramah Low-Vision</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Dukungan native dark mode, tema kontras tinggi sekali klik, serta skala font dinamis tanpa merusak kanvas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Asistensi Suara & Takarir</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Integrasi Web Speech API untuk membaca konsep matematis, dilengkapi takarir teks visual ramah tunarungu.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <LockOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Zero Gatekeeping</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Tidak ada login paksa. XP, lencana, dan preferensi tersimpan aman di browser Anda melalui localStorage.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">AI Tutor On-Demand</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Asisten AI hanya aktif saat diminta petunjuk atau saat gagal 2x berturut-turut, hemat kuota dan responsif.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Roadmap Overview Section */}
      <section id="katalog" className="w-full max-w-6xl px-4 py-12 border-t border-neutral-800/80 mb-12">
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Peta Jalan Matematika (Skill Tree)
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            Struktur Materi Berbasis Topik Modular
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/topics/arithmetic-modular-clock"
            className="p-5 rounded-2xl bg-neutral-900/90 border border-amber-500/40 hover:border-amber-400 transition shadow-lg shadow-amber-500/10 space-y-2 block"
          >
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
              LEVEL 1 & 2 • AKTIF
            </span>
            <h3 className="font-bold text-sm text-white flex items-center justify-between">
              <span>Fondasi Nalar & Aritmetika Bilangan</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </h3>
            <p className="text-xs text-neutral-400">
              Aritmetika jam (modulo), pola kardioid, FPB Euclid, bilangan koprima, dan limit turunan.
            </p>
          </Link>

          <Link
            href="/topics/linear-algebra-determinant-2d"
            className="p-5 rounded-2xl bg-neutral-900/90 border border-indigo-500/40 hover:border-indigo-400 transition shadow-lg shadow-indigo-500/10 space-y-2 block"
          >
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
              LEVEL 3 • AKTIF
            </span>
            <h3 className="font-bold text-sm text-white flex items-center justify-between">
              <span>Aljabar Linear & Multivariabel</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            </h3>
            <p className="text-xs text-neutral-400">
              Ruang vektor, transformasi matriks, determinan spasial, nilai eigen, dan analisis medan gradien.
            </p>
          </Link>

          <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
              LEVEL 4 & 5 • TAHAP EKSPANSI
            </span>
            <h3 className="font-bold text-sm text-neutral-300">Matematika Terapan, AI & Kriptografi</h3>
            <p className="text-xs text-neutral-500">
              Optimasi gradien turun, eksperimen Monte Carlo, kurva eliptik ECC, dan teori chaos.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
