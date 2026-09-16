import { ComprehensiveLesson } from "@/lib/curriculum/pedagogy-types";

/** Kinematics lesson formalize + derivation. */
export const kinematicsFormalize: Pick<ComprehensiveLesson, "formalize" | "derivation"> = {
  // E. Formalize
  formalize: {
    summary: "Persamaan Baku Gerak Lurus Berubah Beraturan (GLBB) & Gerak Parabola",
    definitions: [
      { term: "Perpindahan (Δx)", explanation: "Perubahan posisi vektor dari titik awal ke titik akhir: Δx = x - x₀." },
      { term: "Kecepatan Sesaat (v)", explanation: "Turunan pertama posisi terhadap waktu: v(t) = dx/dt." },
      { term: "Percepatan Konstan (a)", explanation: "Laju perubahan kecepatan terhadap waktu yang bernilai tetap." },
    ],
    formulas: [
      { name: "Kecepatan Akhir GLBB", latex: "v(t) = v_0 + a t", meaning: "Kecepatan bertambah seiring waktu sebanding dengan percepatan." },
      { name: "Posisi Akhir GLBB", latex: "x(t) = x_0 + v_0 t + \\frac{1}{2} a t^2", meaning: "Suku kuadratik merefleksikan pertambahan luas segitiga di bawah grafik v-t." },
      { name: "Relasi Bebas Waktu", latex: "v^2 = v_0^2 + 2a(x - x_0)", meaning: "Menghubungkan kecepatan langsung dengan jarak tempuh tanpa variabel waktu." },
      { name: "Jangkauan Parabola", latex: "R = \\frac{v_0^2 \\sin(2\\theta)}{g}", meaning: "Jarak tembak terjauh di atas tanah datar." },
    ],
    variablesTable: [
      { symbol: "v₀", meaning: "Kecepatan awal", unit: "m/s" },
      { symbol: "a", meaning: "Percepatan linear", unit: "m/s²" },
      { symbol: "t", meaning: "Waktu tempuh", unit: "sekon (s)" },
      { symbol: "θ", meaning: "Sudut elevasi peluncuran", unit: "derajat (°)" },
      { symbol: "g", meaning: "Percepatan gravitasi", unit: "m/s²" },
    ],
  },

  // F. Derivation / Reasoning
  derivation: {
    title: "Mengapa Muncul Faktor 1/2 pada Persamaan Posisi?",
    steps: [
      {
        stepNumber: 1,
        explanation: "Pada grafik kecepatan v terhadap waktu t, grafik membentuk garis lurus dari (0, v₀) ke (t, v₀ + at).",
        latex: "v(t) = v_0 + at",
      },
      {
        stepNumber: 2,
        explanation: "Perpindahan adalah luas total di bawah kurva v(t), yang dapat dipecah menjadi luas persegi panjang alas ditambah luas segitiga atas.",
        latex: "L_{\\text{persegi}} = v_0 \\cdot t",
      },
      {
        stepNumber: 3,
        explanation: "Luas segitiga atas memiliki alas t dan tinggi (at). Luas segitiga = 1/2 × alas × tinggi.",
        latex: "L_{\\text{segitiga}} = \\frac{1}{2} \\cdot t \\cdot (at) = \\frac{1}{2} a t^2",
      },
      {
        stepNumber: 4,
        explanation: "Menjumlahkan kedua luas menghasilkan rumus posisi GLBB secara utuh dan intuitif.",
        latex: "x(t) = x_0 + v_0 t + \\frac{1}{2} a t^2",
      },
    ],
  },
};
