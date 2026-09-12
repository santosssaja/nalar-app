import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Eye,
  Volume2,
  LockOpen,
  Clock,
  Grid,
  Network,
  CheckCircle2,
} from "lucide-react";
import { Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex-1 w-full bg-neutral-950 text-neutral-100 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl px-4 pt-12 pb-12 text-center flex flex-col items-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Pendidikan Berkualitas: Inklusif, Merata, dan Berkualitas</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-4xl leading-tight">
          Pahami STEM Rumit Lewat{" "}
          <span className="bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Intuisi Visual & Kanvas
          </span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
          Alternatif terbuka dan gratis seperti Brilliant. Tanpa hambatan login di awal,
          dilengkapi visualisasi kanvas dinamis 60 FPS, maskot teman belajar Nai, dan aksesibilitas ramah difabel.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/explore">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Network className="w-4 h-4" />}
            >
              Buka Skill Tree
            </Button>
          </Link>

          <Link href="/topics/arithmetic-modular-clock">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Clock className="w-4 h-4 text-amber-400" />}
            >
              Aritmetika Jam
            </Button>
          </Link>

          <Link href="/topics/linear-algebra-determinant-2d">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Grid className="w-4 h-4 text-indigo-400" />}
            >
              Determinan Matriks 2D
            </Button>
          </Link>
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
          <Card isInteractive isHighlighted className="border-amber-500/30 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="math">Level 1 • Aritmetika</Badge>
                <span className="text-xs text-amber-400 font-mono font-bold">+120 XP</span>
              </div>
              <CardTitle>Aritmetika Jam: Modulo & Siklus Pola Bilangan</CardTitle>
              <CardDescription>
                Pahami bilangan bulat sebagai siklus rotasi jam dinding. Amati bagaimana perkalian modular melahirkan kurva kardioid dan generator siklis penuh.
              </CardDescription>
              <div className="flex items-center gap-3 text-xs text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 3 Teka-Teki Logika
                </span>
                <span>•</span>
                <span>Sisa Bagi, Kardioid & FPB</span>
              </div>
            </div>

            <CardFooter>
              <Link href="/topics/arithmetic-modular-clock" className="w-full">
                <Button variant="primary" size="md" className="w-full bg-amber-600 hover:bg-amber-500 border-amber-500/30 shadow-amber-600/20" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Eksplorasi Modulo Jam
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Card 2: Level 3 - Determinant 2D */}
          <Card isInteractive isHighlighted className="border-indigo-500/30 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="math">Level 3 • Aljabar Linear</Badge>
                <span className="text-xs text-indigo-400 font-mono font-bold">+120 XP</span>
              </div>
              <CardTitle>Determinan: Transformasi Luas Ruang 2D</CardTitle>
              <CardDescription>
                Tarik vektor basis pada koordinat spasial dan amati perubahan luas jajaran genjang. Temukan mengapa determinan nol membuat ruang mengempis tanpa invers.
              </CardDescription>
              <div className="flex items-center gap-3 text-xs text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 3 Teka-Teki Logika
                </span>
                <span>•</span>
                <span>Luas Spasial & Refleksi Cermin</span>
              </div>
            </div>

            <CardFooter>
              <Link href="/topics/linear-algebra-determinant-2d" className="w-full">
                <Button variant="primary" size="md" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Eksplorasi Determinan 2D
                </Button>
              </Link>
            </CardFooter>
          </Card>
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
          <Card className="p-5 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Ramah Low-Vision</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Dukungan tema gelap, kontras tinggi WCAG AAA, dan skala font tanpa merusak kanvas.
            </p>
          </Card>

          <Card className="p-5 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Asistensi Suara & Takarir</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Integrasi Web Speech API membaca konsep matematis, dengan takarir ramah tunarungu.
            </p>
          </Card>

          <Card className="p-5 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <LockOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Zero Gatekeeping</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Tanpa login paksa. XP, lencana, dan preferensi tersimpan aman di browser via localStorage.
            </p>
          </Card>

          <Card className="p-5 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Maskot Nai & AI Tutor</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Maskot panda merah Nai hadir membimbing dengan 11 ekspresi dinamis dan asistensi ramah.
            </p>
          </Card>
        </div>
      </section>

      {/* Skill Tree Showcase Banner */}
      <section id="katalog" className="w-full max-w-6xl px-4 py-12 border-t border-neutral-800/80 mb-12">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-indigo-950/60 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase">
              <Network className="w-4 h-4" />
              <span>Skill Tree Interaktif</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              Jelajahi Peta Prasyarat Matematika, Sains & Soft Skills
            </h3>
            <p className="text-sm text-neutral-300 max-w-xl">
              Lihat bagaimana setiap topik saling terhubung melalui graf relasi. Filter domain, cek status terkunci atau selesai, dan rencanakan petualangan belajarmu.
            </p>
          </div>

          <Link href="/explore" className="shrink-0">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Buka Peta Kurikulum
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
