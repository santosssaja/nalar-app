import { ConceptConnection } from "../types";

/**
 * Cross-domain concept bridges connecting Mathematics and Science.
 * As defined in docs/new-module.md Section 15:
 * "Salah satu identitas utama Nalar adalah menghubungkan matematika dengan sains."
 */
export const CONCEPT_CONNECTIONS: ConceptConnection[] = [
  {
    id: "conn-functions-to-kinematics",
    mathTopicId: "math-functions-graphs",
    mathTopicTitle: "Fungsi & Grafik",
    scienceTopicId: "science-kinematics",
    scienceTopicTitle: "Kinematika",
    title: "Grafik Matematis Sebagai Model Gerak Fisis",
    description:
      "Grafik posisi-waktu s(t), kecepatan-waktu v(t), dan percepatan-waktu a(t) merupakan manifestasi langsung konsep gradien, laju perubahan f'(t), dan luas akumulasi daerah kurva dalam matematika.",
    formulaTeX: "v(t) = \\frac{ds}{dt} = f'(t), \\quad s(t) = \\int v(t)\\,dt",
    badgeText: "Matematika ➔ Sains (Fungsi & Gerak)",
  },
  {
    id: "conn-trigonometry-to-kinematics",
    mathTopicId: "math-trig-unit-circle",
    mathTopicTitle: "Trigonometri & Lingkaran Satuan",
    scienceTopicId: "science-kinematics",
    scienceTopicTitle: "Kinematika (Gerak Parabola)",
    title: "Dekomposisi Vektor Kecepatan Proyektil",
    description:
      "Proyeksi sinus dan kosinus pada lingkaran satuan menjadi fondasi esensial untuk menguraikan kecepatan awal proyektil (v₀) menjadi gerak lurus beraturan horizontal (v₀ cos θ) dan gerak lurus berubah beraturan vertikal (v₀ sin θ - gt).",
    formulaTeX: "v_x = v_0\\cos\\theta, \\quad v_y = v_0\\sin\\theta - gt",
    badgeText: "Matematika ➔ Sains (Vektor Proyektil)",
  },
  {
    id: "conn-real-numbers-to-si-units",
    mathTopicId: "math-real-numbers",
    mathTopicTitle: "Operasi Bilangan Riil & Garis Bilangan",
    scienceTopicId: "science-si-units",
    scienceTopicTitle: "Besaran, Satuan SI & Analisis Dimensi",
    title: "Kontinum Garis Bilangan Pada Skala Pengukuran Fisis",
    description:
      "Kontinum bilangan riil, rasio, notasi ilmiah, dan faktor penskalaan geometris menjadi bahasa formal untuk mengukur besaran fisis dunia nyata mulai dari skala subatomik (10⁻¹⁵ m) hingga skala kosmik (10²⁶ m).",
    formulaTeX: "[x] = L, \\quad [v] = L\\cdot T^{-1}, \\quad [a] = L\\cdot T^{-2}",
    badgeText: "Matematika ➔ Sains (Kontinum Pengukuran)",
  },
  {
    id: "conn-algebra-to-kinematics",
    mathTopicId: "math-elementary-algebra",
    mathTopicTitle: "Aljabar Elementer",
    scienceTopicId: "science-kinematics",
    scienceTopicTitle: "Kinematika",
    title: "Manipulasi Simbolik Persamaan GLBB",
    description:
      "Substitusi kesetaraan aljabar dua variabel memungkinkan pembuktian matematis persamaan Torricelli tanpa melibatkan variabel waktu t: v² = v₀² + 2as.",
    formulaTeX: "t = \\frac{v - v_0}{a} \\implies v^2 = v_0^2 + 2as",
    badgeText: "Matematika ➔ Sains (Deduksi Aljabar)",
  },
];
