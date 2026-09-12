/**
 * Pure Math Engine: Jumlah Riemann & Kalkulus Integral
 * Menghitung partisi persegi panjang (kiri, kanan, titik tengah, trapesium),
 * luas akumulasi numerik, dan membandingkannya dengan integral analitik eksak.
 */

export type RiemannMethod = "left" | "right" | "midpoint" | "trapezoid";

export type RiemannFunctionKey = "x2" | "sin" | "parabola_inverted" | "linear";

export interface RiemannFunctionDef {
  key: RiemannFunctionKey;
  name: string;
  latex: string;
  integralLatex: string;
  evaluate: (x: number) => number;
  antiderivative: (x: number) => number;
  defaultA: number;
  defaultB: number;
}

export const RIEMANN_FUNCTIONS: Record<RiemannFunctionKey, RiemannFunctionDef> = {
  x2: {
    key: "x2",
    name: "Parabola: x²",
    latex: "f(x) = x^2",
    integralLatex: "\\int x^2 dx = \\frac{x^3}{3}",
    evaluate: (x: number) => x * x,
    antiderivative: (x: number) => (x * x * x) / 3,
    defaultA: 0,
    defaultB: 2,
  },
  sin: {
    key: "sin",
    name: "Gelombang: sin(x)",
    latex: "f(x) = \\sin(x)",
    integralLatex: "\\int \\sin(x) dx = -\\cos(x)",
    evaluate: (x: number) => Math.sin(x),
    antiderivative: (x: number) => -Math.cos(x),
    defaultA: 0,
    defaultB: Math.PI,
  },
  parabola_inverted: {
    key: "parabola_inverted",
    name: "Kubah Balik: 4 - x²",
    latex: "f(x) = 4 - x^2",
    integralLatex: "\\int (4 - x^2) dx = 4x - \\frac{x^3}{3}",
    evaluate: (x: number) => 4 - x * x,
    antiderivative: (x: number) => 4 * x - (x * x * x) / 3,
    defaultA: 0,
    defaultB: 2,
  },
  linear: {
    key: "linear",
    name: "Garis Miring: ½x + 1",
    latex: "f(x) = \\frac{1}{2}x + 1",
    integralLatex: "\\int (\\frac{1}{2}x + 1) dx = \\frac{1}{4}x^2 + x",
    evaluate: (x: number) => 0.5 * x + 1,
    antiderivative: (x: number) => 0.25 * x * x + x,
    defaultA: 0,
    defaultB: 4,
  },
};

export interface RiemannPartition {
  x0: number;
  x1: number;
  height: number;
  height2?: number; // for trapezoid
  area: number;
  vertices: [number, number][];
}

export interface RiemannMetrics {
  funcKey: RiemannFunctionKey;
  a: number;
  b: number;
  n: number;
  method: RiemannMethod;
  deltaX: number;
  partitions: RiemannPartition[];
  approxArea: number;
  exactArea: number;
  absError: number;
  relErrorPercent: number;
}

export function computeRiemannMetrics(
  funcKey: RiemannFunctionKey,
  a: number,
  b: number,
  n: number,
  method: RiemannMethod
): RiemannMetrics {
  const funcDef = RIEMANN_FUNCTIONS[funcKey] || RIEMANN_FUNCTIONS.x2;
  const safeN = Math.max(1, Math.min(100, Math.round(n)));
  const width = b - a;
  const deltaX = width / safeN;

  const partitions: RiemannPartition[] = [];
  let approxArea = 0;

  for (let i = 0; i < safeN; i++) {
    const x0 = a + i * deltaX;
    const x1 = a + (i + 1) * deltaX;

    if (method === "trapezoid") {
      const y0 = funcDef.evaluate(x0);
      const y1 = funcDef.evaluate(x1);
      const partArea = ((y0 + y1) / 2) * deltaX;
      approxArea += partArea;
      partitions.push({
        x0,
        x1,
        height: y0,
        height2: y1,
        area: partArea,
        vertices: [
          [x0, 0],
          [x1, 0],
          [x1, y1],
          [x0, y0],
        ],
      });
    } else {
      let sampleX = x0;
      if (method === "right") sampleX = x1;
      else if (method === "midpoint") sampleX = (x0 + x1) / 2;

      const h = funcDef.evaluate(sampleX);
      const partArea = h * deltaX;
      approxArea += partArea;
      partitions.push({
        x0,
        x1,
        height: h,
        area: partArea,
        vertices: [
          [x0, 0],
          [x1, 0],
          [x1, h],
          [x0, h],
        ],
      });
    }
  }

  const exactArea = funcDef.antiderivative(b) - funcDef.antiderivative(a);
  const absError = Math.abs(approxArea - exactArea);
  const relErrorPercent =
    Math.abs(exactArea) > 1e-6 ? (absError / Math.abs(exactArea)) * 100 : 0;

  return {
    funcKey,
    a,
    b,
    n: safeN,
    method,
    deltaX,
    partitions,
    approxArea,
    exactArea,
    absError,
    relErrorPercent,
  };
}
