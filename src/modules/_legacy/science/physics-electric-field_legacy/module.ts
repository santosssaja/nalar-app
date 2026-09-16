import { TopicModule } from "@/types/topic";
import { calculateCoulombForce, calculateElectricFieldAtPoint } from "./engine";

export const electricFieldModule: TopicModule = {
  id: "physics-electric-field",
  slug: "physics-electric-field",
  title: "Medan Listrik & Hukum Coulomb",
  category: "physics",
  summary:
    "Memahami interaksi elektrostatik antara muatan titik, visualisasi arah vektor medan E, garis gaya, dan pengaruh gaya pada muatan uji.",
  audioNarrationText:
    "Selamat datang di modul Medan Listrik. Kamu akan mengeksplorasi interaksi elektrostatik, Hukum Coulomb, dan konfigurasi dipol listrik.",
  initialVariables: {
    q1: 3,
    q2: -3,
    distance: 2.0,
    testCharge: 1,
    testPosX: 0,
    testPosY: 0.5,
  },
  levels: [
    {
      id: "efield-level-1",
      index: 1,
      tier: 1,
      title: "Hukum Coulomb & Gaya Elektrostatik",
      description: "Memahami hubungan kuadrat terbalik dan jenis interaksi tarik-menolak muatan.",
      steps: [
        {
          id: "ef1-step-1",
          type: "explanation",
          title: "Interaksi Fundamental Muatan Titik",
          explanation: {
            title: "Hukum Coulomb",
            conceptText:
              "Muatan sejenis saling tolak-menolak, sedangkan muatan berlawanan jenis tarik-menarik dengan gaya yang sebanding dengan perkalian besar muatan dan berbanding terbalik dengan kuadrat jaraknya.",
            analogyText:
              "Bayangkan magnet dengan kutub sejenis dan berlawanan, namun gaya elektrostatik bekerja pada muatan listrik skala atomik hingga makroskopis.",
            keyFormulas: [
              "F = k \\frac{|q_1 q_2|}{r^2}",
              "k = \\frac{1}{4\\pi\\varepsilon_0} \\approx 8.99 \\times 10^9 \\text{ N}\\cdot\\text{m}^2/\\text{C}^2",
            ],
            audioNarrationText:
              "Gaya Coulomb sebanding dengan besar muatan dan berbanding terbalik dengan kuadrat jaraknya.",
          },
        },
        {
          id: "ef1-step-2",
          type: "playground",
          title: "Eksplorasi Gaya Elektrostatik",
          playground: {
            title: "Laboratorium Muatan Titik",
            instructions: "Ubah besar muatan q1, q2 dan jarak pemisah r untuk melihat perubahan nilai gaya Coulomb.",
            interactiveComponentSlug: "physics-electric-field",
            initialVariables: { q1: 3, q2: -3, distance: 2.0 },
          },
        },
        {
          id: "ef1-step-3",
          type: "challenge",
          title: "Misi: Atur Gaya Coulomb Tepat 0.054 N",
          challenge: {
            id: "challenge-efield-1",
            title: "Target Gaya Elektrostatik",
            question: "Atur muatan q1 dan q2 serta jarak pemisah agar Gaya Coulomb tepat bernilai 0.054 N (±0.005 N).",
            targetCondition: (vars: Record<string, number>) => {
              const res = calculateCoulombForce(vars.q1 ?? 3, vars.q2 ?? -3, vars.distance ?? 2);
              return Math.abs(res.forceN - 0.054) <= 0.005;
            },
            hint1Static: "Gunakan F = k * |q1 * q2| / r^2.",
            hint2Static: "Jika q1 = 2 µC dan q2 = 3 µC berjarak r = 1.0 m, F = 8.99 * 6 * 10^-3 / 1 = 0.054 N.",
            solutionVariables: { q1: 2, q2: 3, distance: 1.0 },
            solutionExplanation: "Dengan q1 = 2 µC, q2 = 3 µC, dan r = 1 m, diperoleh F = 8.99e9 * 6e-12 / 1 = 0.0539 N ≈ 0.054 N.",
            xpReward: 35,
          },
        },
        {
          id: "ef1-step-4",
          type: "validation",
          title: "Refleksi Hukum Coulomb",
          validation: {
            title: "Prinsip Kekekalan & Simetri",
            summaryText: "Kedua muatan selalu mengalami gaya yang sama besar dan berlawanan arah sesuai Hukum III Newton.",
            keyTakeaway: "Gaya elektrostatik adalah gaya jarak jauh dengan peluruhan kuadrat terbalik (1/r²).",
            formulaKaTeX: "F_{12} = -F_{21} = k \\frac{|q_1 q_2|}{r^2}",
            badgeToUnlock: "coulomb-master",
          },
        },
      ],
    },
    {
      id: "efield-level-2",
      index: 2,
      tier: 2,
      title: "Vektor Kuat Medan Listrik & Superposisi",
      description: "Memetakan arah dan intensitas medan listrik E dari kumpulan muatan.",
      steps: [
        {
          id: "ef2-step-1",
          type: "explanation",
          title: "Konsep Medan Vektor",
          explanation: {
            title: "Kuat Medan Listrik E",
            conceptText:
              "Medan listrik di suatu titik adalah gaya per satuan muatan positif yang dirasakan di titik tersebut. Garis medan keluar dari muatan positif dan masuk ke muatan negatif.",
            analogyText:
              "Medan listrik bagaikan peta kemiringan topografi; muatan positif adalah bukit, dan muatan negatif adalah lembah curam.",
            keyFormulas: [
              "\\vec{E} = \\frac{\\vec{F}}{q_t} = \\sum \\frac{k q_i}{r_i^2}\\hat{r}_i",
              "\\vec{F}_{\\text{uji}} = q_t \\vec{E}",
            ],
            audioNarrationText:
              "Medan listrik merepresentasikan gaya elektrostatik yang akan dialami oleh satu coulomb muatan uji.",
          },
        },
        {
          id: "ef2-step-2",
          type: "playground",
          title: "Menjelajahi Garis & Vektor Medan",
          playground: {
            title: "Simulasi Vektor Medan E",
            instructions: "Aktifkan 'Vektor Medan' dan seret muatan uji kuning untuk merasakan kekuatan dan arah medan.",
            interactiveComponentSlug: "physics-electric-field",
            initialVariables: { q1: 4, q2: 4, distance: 2.0 },
          },
        },
        {
          id: "ef2-step-3",
          type: "challenge",
          title: "Misi: Temukan Titik Nol Medan Listrik",
          challenge: {
            id: "challenge-efield-2",
            title: "Titik Keseimbangan Elektrostatik",
            question: "Setel muatan q1 = q2 = +4 µC dan letakkan muatan uji pada titik di mana kuat medan mendekati nol (E < 100 N/C).",
            targetCondition: (vars: Record<string, number>) => {
              const q1 = vars.q1 ?? 0;
              const q2 = vars.q2 ?? 0;
              if (Math.abs(q1 - 4) > 0.5 || Math.abs(q2 - 4) > 0.5) return false;
              const dist = vars.distance ?? 2;
              const charges = [
                { id: "q1", q: q1, x: -dist / 2, y: 0 },
                { id: "q2", q: q2, x: dist / 2, y: 0 },
              ];
              const field = calculateElectricFieldAtPoint(charges, { x: vars.testPosX ?? 1, y: vars.testPosY ?? 1 });
              return field.magnitude < 100;
            },
            hint1Static: "Karena kedua muatan sama besar dan bertanda sama, titik simetri berada tepat di tengah-tengah.",
            hint2Static: "Posisikan muatan uji pada x = 0 dan y = 0.",
            solutionVariables: { q1: 4, q2: 4, testPosX: 0, testPosY: 0 },
            solutionExplanation: "Di titik tengah (0, 0), medan dari q1 mendorong ke kanan dan medan dari q2 mendorong ke kiri dengan besar identik, sehingga resultan medan nol.",
            xpReward: 45,
          },
        },
        {
          id: "ef2-step-4",
          type: "validation",
          title: "Refleksi Superposisi Vektor",
          validation: {
            title: "Prinsip Superposisi Linear",
            summaryText: "Medan total di sembarang titik adalah penjumlahan vektor dari medan masing-masing muatan secara independen.",
            keyTakeaway: "Titik netral selalu ada di antara dua muatan sejenis.",
            formulaKaTeX: "\\vec{E}_{\\text{net}} = \\vec{E}_1 + \\vec{E}_2 = \\mathbf{0}",
            badgeToUnlock: "field-navigator",
          },
        },
      ],
    },
    {
      id: "efield-level-3",
      index: 3,
      tier: 3,
      title: "Dipol Listrik & Potensial Elektrostatik",
      description: "Menganalisis sistem dua muatan berlawanan dan energi potensial listrik.",
      steps: [
        {
          id: "ef3-step-1",
          type: "explanation",
          title: "Dipol Listrik & Energi Potensial",
          explanation: {
            title: "Dipol Listrik & Potensial V",
            conceptText:
              "Dipol listrik tersusun dari dua muatan sama besar berlawanan tanda (+q dan -q) yang terpisah jarak d. Garis medan mengalir teratur dari kutub positif menuju kutub negatif.",
            analogyText:
              "Molekul air (H2O) adalah dipol alami yang menjadi kunci mengapa air dapat melarutkan berbagai zat kimia.",
            keyFormulas: [
              "\\vec{p} = q \\vec{d}",
              "V = \\sum \\frac{k q_i}{r_i}",
              "W = -q_t \\Delta V",
            ],
            audioNarrationText:
              "Dipol listrik memiliki momen dipol p = q dikali d dan menghasilkan medan karakteristik melengkung.",
          },
        },
        {
          id: "ef3-step-2",
          type: "playground",
          title: "Eksplorasi Dipol dan Kontur Potensial",
          playground: {
            title: "Eksperimen Dipol Listrik",
            instructions: "Gunakan preset Dipol (+4, -4 µC) dan amati aliran garis medan dari kutub positif ke kutub negatif.",
            interactiveComponentSlug: "physics-electric-field",
            initialVariables: { q1: 4, q2: -4, distance: 2.0 },
          },
        },
        {
          id: "ef3-step-3",
          type: "challenge",
          title: "Misi: Susun Dipol Sempurna",
          challenge: {
            id: "challenge-efield-3",
            title: "Medan Horisontal Dipol",
            question: "Atur q1 = +5 µC, q2 = -5 µC, dan posisikan muatan uji sehingga gaya yang dialami dominan mengarah ke sumbu +X (Fx > 5000 N/C).",
            targetCondition: (vars: Record<string, number>) => {
              const q1 = vars.q1 ?? 0;
              const q2 = vars.q2 ?? 0;
              if (Math.abs(q1 - 5) > 0.5 || Math.abs(q2 - (-5)) > 0.5) return false;
              const dist = vars.distance ?? 2;
              const charges = [
                { id: "q1", q: q1, x: -dist / 2, y: 0 },
                { id: "q2", q: q2, x: dist / 2, y: 0 },
              ];
              const field = calculateElectricFieldAtPoint(charges, { x: vars.testPosX ?? 0, y: vars.testPosY ?? 0 });
              return field.ex > 5000 && Math.abs(field.ey) < 1500;
            },
            hint1Static: "Posisikan muatan uji di antara kedua muatan (sepanjang garis sumbu x).",
            hint2Static: "Di antara muatan + dan -, vektor medan keduanya saling menguatkan mengarah ke kanan (+X).",
            solutionVariables: { q1: 5, q2: -5, testPosX: 0, testPosY: 0 },
            solutionExplanation: "Di antara dipol, medan dari muatan positif menjauhi +x_left (ke kanan) dan medan ke muatan negatif menuju +x_right (ke kanan), menghasilkan resultan horizontal kuat ke arah +X.",
            xpReward: 50,
          },
        },
        {
          id: "ef3-step-4",
          type: "validation",
          title: "Refleksi Dipol Listrik",
          validation: {
            title: "Aplikasi Fundamental Dipol",
            summaryText: "Dipol listrik mendasari polarisasi dielektrik, transmisi gelombang radio antena dipol, dan sifat ikatan molekuler biokimia.",
            keyTakeaway: "Kuat medan dipol pada jarak jauh meluruh sebanding dengan 1/r³.",
            formulaKaTeX: "E_{\\text{dipol}} \\propto \\frac{p}{r^3}",
            badgeToUnlock: "electrostatic-master",
          },
        },
      ],
    },
  ],
};
