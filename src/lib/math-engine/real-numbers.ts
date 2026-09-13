/**
 * Real Numbers & Number Line Engine (Pure Mathematical Functions)
 * Adheres strictly to AGENTS.md: pure, defensive, unit-testable.
 */

export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface NumberLineState {
  point1: number;
  point2: number;
  zoomLevel: number;
  scaleFactor: number;
  sqrtN: number;
  distribA: number;
  distribB: number;
  distribC: number;
}

/**
 * Calculates absolute distance between two points on the 1D real number line.
 */
export function absoluteDistance(a: number, b: number): number {
  return Math.abs(b - a);
}

/**
 * Adds two real numbers (1D translation).
 */
export function translatePoint(initial: number, delta: number): number {
  return Number((initial + delta).toFixed(6));
}

/**
 * Dilates / scales a vector from an origin.
 */
export function scaleVector(origin: number, point: number, factor: number): number {
  const displacement = point - origin;
  return Number((origin + displacement * factor).toFixed(6));
}

/**
 * Finds the midpoint between two real numbers.
 */
export function findMidpoint(a: number, b: number): number {
  return Number(((a + b) / 2).toFixed(6));
}

/**
 * Calculates greatest common divisor for fraction reduction.
 */
function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x || 1;
}

/**
 * Simplifies a rational fraction p/q into lowest terms.
 */
export function simplifyFraction(p: number, q: number): Fraction {
  if (q === 0) {
    throw new Error("Denominator cannot be zero");
  }
  const sign = (p < 0) !== (q < 0) ? -1 : 1;
  const absP = Math.abs(Math.round(p));
  const absQ = Math.abs(Math.round(q));
  const d = gcd(absP, absQ);
  return {
    numerator: sign * (absP / d),
    denominator: absQ / d,
  };
}

/**
 * Computes bounding integer brackets for a non-negative integer square root:
 * returns [floor(sqrt(n)), ceil(sqrt(n))].
 */
export function approximateSquareRootBounds(n: number): [number, number] {
  if (n < 0) {
    throw new Error("Cannot take square root of negative real number");
  }
  const root = Math.sqrt(n);
  const floor = Math.floor(root);
  const ceil = Math.ceil(root);
  return [floor, ceil];
}

/**
 * Verifies the geometric distributive property: a * (b + c) === a*b + a*c.
 */
export function computeDistributiveAreas(
  a: number,
  b: number,
  c: number
): { areaTotal: number; area1: number; area2: number; isConsistent: boolean } {
  const area1 = Number((a * b).toFixed(6));
  const area2 = Number((a * c).toFixed(6));
  const areaTotal = Number((a * (b + c)).toFixed(6));
  const isConsistent = Math.abs(areaTotal - (area1 + area2)) < 1e-5;
  return { areaTotal, area1, area2, isConsistent };
}

/**
 * Generates visible tick marks and coordinates for a number line with viewport center and zoom.
 */
export function generateNumberLineTicks(
  center: number,
  zoom: number,
  viewportWidth = 800
): { value: number; label: string; isMajor: boolean }[] {
  const safeZoom = Math.max(0.1, Math.min(100, zoom));
  const step = safeZoom > 5 ? 0.1 : safeZoom < 0.5 ? 2 : 1;
  const range = (viewportWidth / (50 * safeZoom));
  const minVal = Math.floor((center - range) / step) * step;
  const maxVal = Math.ceil((center + range) / step) * step;

  const ticks: { value: number; label: string; isMajor: boolean }[] = [];
  for (let v = minVal; v <= maxVal + step / 2; v += step) {
    const rounded = Number(v.toFixed(4));
    const isMajor = Math.abs(rounded - Math.round(rounded)) < 1e-4;
    ticks.push({
      value: rounded,
      label: isMajor ? String(Math.round(rounded)) : rounded.toFixed(1),
      isMajor,
    });
  }
  return ticks;
}
