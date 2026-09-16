import { KnowledgeGraphEdge } from "../types";

/**
 * Knowledge graph edges (prerequisite + cross-domain bridges). Split from topics.ts.
 */
export const KNOWLEDGE_GRAPH_EDGES: KnowledgeGraphEdge[] = [
  // ── Math Foundation Chain (MVP) ──
  { id: "e-real-to-alg", source: "math-real-numbers", target: "math-elementary-algebra" },
  { id: "e-alg-to-func", source: "math-elementary-algebra", target: "math-functions-graphs" },
  { id: "e-alg-to-trig", source: "math-elementary-algebra", target: "math-trig-unit-circle" },

  // ── Science Foundation Chain (MVP) ──
  { id: "e-real-to-units", source: "math-real-numbers", target: "science-si-units", isCrossDomain: true, label: "Kontinum Angka & Skala" },
  { id: "e-units-to-kinematics", source: "science-si-units", target: "science-kinematics" },

  // ── CROSS-DOMAIN BRIDGES (Math -> Science Kinematics MVP) ──
  { id: "e-func-to-kinematics", source: "math-functions-graphs", target: "science-kinematics", isCrossDomain: true, label: "Grafik & Kurva Gerak" },
  { id: "e-trig-to-kinematics", source: "math-trig-unit-circle", target: "science-kinematics", isCrossDomain: true, label: "Dekomposisi Proyektil 2D" },

  // ── Math Secondary Tracks ──
  { id: "e-real-to-clock", source: "math-real-numbers", target: "arithmetic-modular-clock" },
  { id: "e-real-to-euclid", source: "math-real-numbers", target: "math-euclid" },
  { id: "e-clock-to-prime", source: "arithmetic-modular-clock", target: "math-prime-factorization" },
  { id: "e-euclid-to-prime", source: "math-euclid", target: "math-prime-factorization" },

  { id: "e-alg-to-det", source: "math-elementary-algebra", target: "linear-algebra-determinant-2d" },
  { id: "e-det-to-vectors", source: "linear-algebra-determinant-2d", target: "math-vector-spaces" },

  { id: "e-func-to-limits", source: "math-functions-graphs", target: "math-limits-continuity" },
  { id: "e-limits-to-diff", source: "math-limits-continuity", target: "math-differential-calculus" },
  { id: "e-diff-to-integ", source: "math-differential-calculus", target: "math-integral-calculus" },

  // ── Science Secondary Tracks ──
  { id: "e-kinematics-to-dynamics", source: "science-kinematics", target: "sci-dynamics-newton" },
  { id: "e-dynamics-to-energy", source: "sci-dynamics-newton", target: "sci-work-energy" },
  { id: "e-energy-to-oscillator", source: "sci-work-energy", target: "physics-harmonic-oscillator" },
  { id: "e-trig-to-oscillator", source: "math-trig-unit-circle", target: "physics-harmonic-oscillator", isCrossDomain: true, label: "Sinusoidal GHS" },
  { id: "e-oscillator-to-wave", source: "physics-harmonic-oscillator", target: "physics-wave-simulator" },
];
