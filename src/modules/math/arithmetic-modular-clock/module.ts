import { TopicModule } from "@/types/topic";

export const modularClockModule: TopicModule = {
  id: "math-nt-01",
  slug: "arithmetic-modular-clock",
  title: "Aritmetika Jam (Modulo) & Siklus Bilangan",
  category: "math",
  summary:
    "Bayangkan bilangan yang bergerak melingkar seperti jarum jam dinding. Aritmetika modular mengajarkan kita bahwa bilangan tidak harus selalu bertambah tanpa batas, melainkan berulang dalam siklus teratur yang melahirkan pola geometri kardioid dan fraktal menakjubkan.",
  audioNarrationText:
    "Selamat datang di modul Aritmetika Jam dan Teori Bilangan Elementer. Di sini kamu akan memahami operasi modulo secara intuitif layaknya waktu pada jam dinding.",
  initialVariables: {
    n: 12,
    multiplier: 2,
    hourA: 9,
    hourB: 7,
  },
  levels: [
    {
      id: "clock-level-1",
      index: 1,
      tier: 1,
      title: "Konsep Dasar Modulo & Sisa Bagi",
      description: "Memahami bilangan bulat sebagai perputaran siklis pada jam dinding.",
      steps: [
        {
          id: "c1-step-1",
          type: "explanation",
          title: "Analogi Jam Dinding",
          explanation: {
            title: "Mengapa Jam Berputar Kembali ke 1?",
            conceptText:
              "Dalam kehidupan sehari-hari, kita tidak pernah mengatakan 'pukul 16 malam'. Kita secara alami tahu bahwa jam dinding berputar kembali setelah menyentuh angka 12. Inilah esensi modulo.",
            analogyText:
              "Jika sekarang pukul 9 dan kita menunggu 7 jam, 9 + 7 = 16. Karena satu putaran jam bernilai 12, jarum menunjuk angka 16 - 12 = 4.",
            keyFormulas: ["16 \\equiv 4 \\pmod{12}", "a \\equiv r \\pmod n \\iff n \\mid (a - r)"],
            audioNarrationText:
              "Konsep modulo mengukur sisa pembagian bilangan bulat. Ketika jarum jam melewati angka 12, sisa putaran itulah yang menjadi penunjuk waktu.",
          },
        },
        {
          id: "c1-step-2",
          type: "playground",
          title: "Putar Jam & Amati Sisa Bagi",
          playground: {
            title: "Simulasi Jam Dinding Interaktif",
            instructions: "Geser nilai jam A dan jam B untuk mengamati posisi jarum jam dan sisa bagi mod 12.",
            interactiveComponentSlug: "arithmetic-modular-clock",
            initialVariables: { n: 12, hourA: 9, hourB: 7, multiplier: 2 },
          },
        },
        {
          id: "c1-step-3",
          type: "challenge",
          title: "Misi: Jam Menunjuk Angka Berapa?",
          challenge: {
            id: "challenge-clock-addition",
            title: "Penjumlahan Modular Jam 12",
            question:
              "Atur jam A = 9 dan jam B = 7 pada jam modulo 12. Berapakah sisa bagi posisi jarum jam (Target: hasil = 4)?",
            targetCondition: (vars) => {
              const n = vars.n || 12;
              const res = (((vars.hourA || 0) + (vars.hourB || 0)) % n + n) % n;
              return n === 12 && res === 4;
            },
            hint1Static: "Hitung total jam terlebih dahulu: 9 + 7 = 16.",
            hint2Static: "Kurangkan 16 dengan 12 (kelipatan lingkaran jam). Berapa sisanya?",
            solutionVariables: { n: 12, hourA: 9, hourB: 7 },
            solutionExplanation: "9 + 7 = 16. Dalam modulo 12: 16 = 1 x 12 + 4, sehingga sisa bagi adalah 4.",
            xpReward: 30,
          },
        },
        {
          id: "c1-step-4",
          type: "validation",
          title: "Rangkuman Konsep Level 1",
          validation: {
            title: "Selamat! Kamu Menguasai Fondasi Modulo",
            summaryText:
              "Modulo bukan sekadar pembagian, melainkan cara memetakan garis bilangan tak hingga ke dalam lingkaran berhingga.",
            keyTakeaway: "Operasi modulo selalu menghasilkan bilangan bulat antara 0 hingga n - 1.",
            formulaKaTeX: "a \\pmod n = r \\quad (0 \\le r < n)",
            badgeToUnlock: "first-step",
          },
        },
      ],
    },
    {
      id: "clock-level-2",
      index: 2,
      tier: 2,
      title: "Aritmetika Modular & Siklus Kalender",
      description: "Penerapan operasi modular pada sistem hari kalender dan bilangan bulat negatif.",
      steps: [
        {
          id: "c2-step-1",
          type: "explanation",
          title: "Siklus 7 Hari Kalender",
          explanation: {
            title: "Hari Apa 100 Hari dari Sekarang?",
            conceptText:
              "Kalender bekerja dalam siklus modulo 7 (Senin=0, Selasa=1, ..., Minggu=6). Kita dapat menghitung hari masa depan cukup dengan mencari sisa bagi 7.",
            analogyText: "100 hari = 14 pekan penuh (98 hari) + 2 hari sisa. Jadi 2 hari setelah Senin adalah Rabu!",
            keyFormulas: ["100 \\equiv 2 \\pmod 7"],
            audioNarrationText:
              "Dengan modulo 7, kita tidak perlu menghitung tanggal satu per satu. Cukup ambil sisa bagi kelipatan 7.",
          },
        },
        {
          id: "c2-step-2",
          type: "playground",
          title: "Eksplorasi Jam Siklus Berubah",
          playground: {
            title: "Ubah Ukuran Jam (Modulus n)",
            instructions: "Ubah ukuran jam n menjadi 7 (sistem hari) atau ukuran lainnya pada panel kontrol.",
            interactiveComponentSlug: "arithmetic-modular-clock",
            initialVariables: { n: 7, hourA: 100, hourB: 0, multiplier: 1 },
          },
        },
        {
          id: "c2-step-3",
          type: "challenge",
          title: "Misi: Jam Negatif (Mundur Waktu)",
          challenge: {
            id: "challenge-clock-negative",
            title: "Menghitung Jam Mundur",
            question:
              "Jika saat ini pukul 3 pagi, jam berapa 5 jam yang lalu pada jam 12? (Target: 3 - 5 = -2 ≡ 10 mod 12)",
            targetCondition: (vars) => {
              const n = vars.n || 12;
              const res = (((vars.hourA || 0) + (vars.hourB || 0)) % n + n) % n;
              return n === 12 && res === 10;
            },
            hint1Static: "Bergerak mundur pada jam sama dengan mengurangkan nilai jam.",
            hint2Static: "3 - 5 = -2. Tambahkan satu putaran jam (+12) agar nilainya positif: -2 + 12 = 10.",
            solutionVariables: { n: 12, hourA: 3, hourB: -5 },
            solutionExplanation: "-2 ≡ 10 (mod 12) karena jarum mundur 2 jam dari angka 12 berhenti di angka 10.",
            xpReward: 40,
          },
        },
        {
          id: "c2-step-4",
          type: "validation",
          title: "Rangkuman Konsep Level 2",
          validation: {
            title: "Aritmetika Modular Terkuasai!",
            summaryText: "Bilangan negatif pada modulo dapat dipositifkan dengan menambahkan kelipatan modulus n.",
            keyTakeaway: "-a ≡ n - (a mod n) (mod n). Jam berputar mundur tetap memiliki posisi pasti.",
            formulaKaTeX: "-2 \\equiv 10 \\pmod{12}",
          },
        },
      ],
    },
    {
      id: "clock-level-3",
      index: 3,
      tier: 3,
      title: "Pola Geometri Kardioid & Sifat Koprima",
      description: "Menghubungkan tali perkalian modular dan menemukan kurva kaustik fraktal.",
      steps: [
        {
          id: "c3-step-1",
          type: "explanation",
          title: "Kelahiran Kurva Kardioid",
          explanation: {
            title: "Tali Perkalian Modular yang Melahirkan Bentuk Hati",
            conceptText:
              "Saat setiap titik i pada lingkaran dihubungkan ke (i x m) mod n, garis-garis tersebut membungkus kurva kaustik cahaya berbentuk hati (kardioid) saat m = 2.",
            analogyText:
              "Pola ini sama persis dengan pantulan cahaya matahari pada dinding bagian dalam cangkir kopi!",
            keyFormulas: ["i \\to (i \\times m) \\pmod n", "m = 2 \\implies \\text{Kardioid}"],
            audioNarrationText:
              "Ketika kamu meningkatkan pengali m menjadi dua, tali-tali busur berpotongan membentuk kurva kardioid yang simetris.",
          },
        },
        {
          id: "c3-step-2",
          type: "playground",
          title: "Playground Kardioid & Fraktal",
          playground: {
            title: "Simulasi Tali Geometri Lingkaran",
            instructions: "Tingkatkan titik n menjadi 60 atau lebih dan geser pengali m ke angka 2, 3, atau 4.",
            interactiveComponentSlug: "arithmetic-modular-clock",
            initialVariables: { n: 60, multiplier: 2, hourA: 0, hourB: 0 },
          },
        },
        {
          id: "c3-step-3",
          type: "challenge",
          title: "Misi: Membentuk Pola Kardioid Sempurna",
          challenge: {
            id: "challenge-cardioid-creation",
            title: "Pola Kardioid Multiplier 2",
            question: "Atur jumlah titik jam n minimal 30 dan nilai pengali multiplier = 2 untuk melihat kurva kardioid.",
            targetCondition: (vars) => {
              return (vars.n || 0) >= 30 && vars.multiplier === 2;
            },
            hint1Static: "Perhatikan slider titik n dan multiplier m di panel kontrol.",
            hint2Static: "Tarik slider titik n ke kanan (>= 30) dan pastikan pengali bernilai tepat 2.",
            solutionVariables: { n: 60, multiplier: 2 },
            solutionExplanation: "Pengali m = 2 membungkus kurva kardioid 1 daun pada batas keliling lingkaran.",
            xpReward: 50,
          },
        },
        {
          id: "c3-step-4",
          type: "validation",
          title: "Modul Selesai: Lencana Modulo Master!",
          validation: {
            title: "Pencapaian Luar Biasa!",
            summaryText:
              "Kamu telah menyelesaikan seluruh tingkat pembelajaran Aritmetika Jam dari fondasi hingga geometri kardioid tingkat lanjut.",
            keyTakeaway: "Matematika diskrit dan geometri analitik menyatu indah dalam lingkaran modular.",
            formulaKaTeX: "\\gcd(m, n) = 1 \\implies \\text{Generator Penuh}",
            badgeToUnlock: "perseverance",
          },
        },
      ],
    },
  ],
};
