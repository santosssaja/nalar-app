/**
 * Pure Math Engine: Garis Singgung Kalkulus & Turunan (Calculus Tangent Explorer)
 * Menghitung kemiringan garis sekan, turunan eksak f'(a), garis singgung, dan limit Δx -> 0.
 */

export type CalculusFunctionKey =
  | "x2"
  | "x3_minus_3x"
  | "sin"
  | "parabola_neg"
  | "cubic_fraction";

export interface CalculusFunctionDef {
  key: CalculusFunctionKey;
  name: string;
  latex: string;
  derivativeLatex: string;
  evaluate: (x: number) => number;
  derivative: (x: number) => number;
  recommendedRange: { aMin: number; aMax: number; defaultA: number };
}

export const CALCULUS_FUNCTIONS: Record<CalculusFunctionKey, CalculusFunctionDef> = {
  x2: {
    key: "x2",
    name: "Parabola: x²",
    latex: "f(x) = x^2",
    derivativeLatex: "f'(x) = 2x",
    evaluate: (x: number) => x * x,
    derivative: (x: number) => 2 * x,
    recommendedRange: { aMin: -2.5, aMax: 2.5, defaultA: 1.0 },
  },
  x3_minus_3x: {
    key: "x3_minus_3x",
    name: "Kubik Bergelombang: x³ - 3x",
    latex: "f(x) = x^3 - 3x",
    derivativeLatex: "f'(x) = 3x^2 - 3",
    evaluate: (x: number) => x * x * x - 3 * x,
    derivative: (x: number) => 3 * x * x - 3,
    recommendedRange: { aMin: -2.2, aMax: 2.2, defaultA: 0.0 },
  },
  sin: {
    key: "sin",
    name: "Gelombang Sinus: sin(x)",
    latex: "f(x) = \\sin(x)",
    derivativeLatex: "f'(x) = \\cos(x)",
    evaluate: (x: number) => Math.sin(x),
    derivative: (x: number) => Math.cos(x),
    recommendedRange: { aMin: -Math.PI, aMax: Math.PI, defaultA: 0.0 },
  },
  parabola_neg: {
    key: "parabola_neg",
    name: "Kubah Balik: 4 - x²",
    latex: "f(x) = 4 - x^2",
    derivativeLatex: "f'(x) = -2x",
    evaluate: (x: number) => 4 - x * x,
    derivative: (x: number) => -2 * x,
    recommendedRange: { aMin: -2.5, aMax: 2.5, defaultA: 1.0 },
  },
  cubic_fraction: {
    key: "cubic_fraction",
    name: "Kubik Sepertiga: ⅓x³ - x",
    latex: "f(x) = \\frac{1}{3}x^3 - x",
    derivativeLatex: "f'(x) = x^2 - 1",
    evaluate: (x: number) => (1 / 3) * x * x * x - x,
    derivative: (x: number) => x * x - 1,
    recommendedRange: { aMin: -2.5, aMax: 2.5, defaultA: 1.0 },
  },
};

export interface TangentMetrics {
  funcKey: CalculusFunctionKey;
  a: number;
  deltaX: number;
  b: number; // a + deltaX
  fa: number;
  fb: number;
  secantSlope: number;
  tangentSlope: number;
  error: number; // |secantSlope - tangentSlope|
  isConverged: boolean; // error < 0.05
}

export function computeTangentMetrics(
  funcKey: CalculusFunctionKey,
  a: number,
  deltaX: number
): TangentMetrics {
  const funcDef = CALCULUS_FUNCTIONS[funcKey] || CALCULUS_FUNCTIONS.x2;
  const safeDeltaX = Math.abs(deltaX) < 1e-5 ? (deltaX >= 0 ? 1e-5 : -1e-5) : deltaX;

  const b = a + safeDeltaX;
  const fa = funcDef.evaluate(a);
  const fb = funcDef.evaluate(b);

  const secantSlope = (fb - fa) / safeDeltaX;
  const tangentSlope = funcDef.derivative(a);
  const error = Math.abs(secantSlope - tangentSlope);

  return {
    funcKey,
    a,
    deltaX: safeDeltaX,
    b,
    fa,
    fb,
    secantSlope,
    tangentSlope,
    error,
    isConverged: error < 0.05,
  };
}

/**
 * Menghitung titik garis linear y = m*(x - x0) + y0 pada rentang x
 */
export function evaluateLinePoints(
  m: number,
  x0: number,
  y0: number,
  xMin: number = -4,
  xMax: number = 4
): [number, number][] {
  return [
    [xMin, m * (xMin - x0) + y0],
    [xMax, m * (xMax - x0) + y0],
  ];
}
