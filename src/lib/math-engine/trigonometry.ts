/**
 * Pure Math Engine: Trigonometri & Lingkaran Satuan
 * Memproses kalkulasi sudut, proyeksi lingkaran satuan, nilai eksak sudut istimewa,
 * dan sifat-sifat kuadran.
 */

export type AngleUnit = "degrees" | "radians";

export interface UnitCircleMetrics {
  angleDegrees: number;
  angleRadians: number;
  cos: number;
  sin: number;
  tan: number | null; // null jika tidak terdefinisi (90°, 270°)
  isTanUndefined: boolean;
  quadrant: 1 | 2 | 3 | 4;
  point: [number, number];
  exactLabel?: {
    deg: string;
    rad: string;
    sin: string;
    cos: string;
    tan: string;
  };
}

export function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function radToDeg(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function normalizeDegrees(degrees: number): number {
  let d = degrees % 360;
  if (d < 0) d += 360;
  return d;
}

export function getQuadrant(degrees: number): 1 | 2 | 3 | 4 {
  const d = normalizeDegrees(degrees);
  if (d >= 0 && d < 90) return 1;
  if (d >= 90 && d < 180) return 2;
  if (d >= 180 && d < 270) return 3;
  return 4;
}

// Sudut istimewa dan representasi eksak LaTeX
export const SPECIAL_ANGLES: Record<
  number,
  { rad: string; sin: string; cos: string; tan: string }
> = {
  0: { rad: "0", sin: "0", cos: "1", tan: "0" },
  30: { rad: "\\frac{\\pi}{6}", sin: "\\frac{1}{2}", cos: "\\frac{\\sqrt{3}}{2}", tan: "\\frac{1}{\\sqrt{3}}" },
  45: { rad: "\\frac{\\pi}{4}", sin: "\\frac{\\sqrt{2}}{2}", cos: "\\frac{\\sqrt{2}}{2}", tan: "1" },
  60: { rad: "\\frac{\\pi}{3}", sin: "\\frac{\\sqrt{3}}{2}", cos: "\\frac{1}{2}", tan: "\\sqrt{3}" },
  90: { rad: "\\frac{\\pi}{2}", sin: "1", cos: "0", tan: "\\text{tak terdefinisi}" },
  120: { rad: "\\frac{2\\pi}{3}", sin: "\\frac{\\sqrt{3}}{2}", cos: "-\\frac{1}{2}", tan: "-\\sqrt{3}" },
  135: { rad: "\\frac{3\\pi}{4}", sin: "\\frac{\\sqrt{2}}{2}", cos: "-\\frac{\\sqrt{2}}{2}", tan: "-1" },
  150: { rad: "\\frac{5\\pi}{6}", sin: "\\frac{1}{2}", cos: "-\\frac{\\sqrt{3}}{2}", tan: "-\\frac{1}{\\sqrt{3}}" },
  180: { rad: "\\pi", sin: "0", cos: "-1", tan: "0" },
  210: { rad: "\\frac{7\\pi}{6}", sin: "-\\frac{1}{2}", cos: "-\\frac{\\sqrt{3}}{2}", tan: "\\frac{1}{\\sqrt{3}}" },
  225: { rad: "\\frac{5\\pi}{4}", sin: "-\\frac{\\sqrt{2}}{2}", cos: "-\\frac{\\sqrt{2}}{2}", tan: "1" },
  240: { rad: "\\frac{4\\pi}{3}", sin: "-\\frac{\\sqrt{3}}{2}", cos: "-\\frac{1}{2}", tan: "\\sqrt{3}" },
  270: { rad: "\\frac{3\\pi}{2}", sin: "-1", cos: "0", tan: "\\text{tak terdefinisi}" },
  300: { rad: "\\frac{5\\pi}{3}", sin: "-\\frac{\\sqrt{3}}{2}", cos: "\\frac{1}{2}", tan: "-\\sqrt{3}" },
  315: { rad: "\\frac{7\\pi}{4}", sin: "-\\frac{\\sqrt{2}}{2}", cos: "\\frac{\\sqrt{2}}{2}", tan: "-1" },
  330: { rad: "\\frac{11\\pi}{6}", sin: "-\\frac{1}{2}", cos: "\\frac{\\sqrt{3}}{2}", tan: "-\\frac{1}{\\sqrt{3}}" },
  360: { rad: "2\\pi", sin: "0", cos: "1", tan: "0" },
};

export function computeUnitCircle(degrees: number): UnitCircleMetrics {
  const normDeg = normalizeDegrees(degrees);
  const roundedDeg = Math.round(normDeg);
  const isCloseToSpecial = Math.abs(normDeg - roundedDeg) < 0.05 && roundedDeg in SPECIAL_ANGLES;

  const rad = degToRad(normDeg);
  let cos = Math.cos(rad);
  let sin = Math.sin(rad);

  // Sanitasi float rounding untuk kuadran 0, 90, 180, 270, 360
  if (Math.abs(cos) < 1e-10) cos = 0;
  if (Math.abs(sin) < 1e-10) sin = 0;
  if (Math.abs(cos - 1) < 1e-10) cos = 1;
  if (Math.abs(cos + 1) < 1e-10) cos = -1;
  if (Math.abs(sin - 1) < 1e-10) sin = 1;
  if (Math.abs(sin + 1) < 1e-10) sin = -1;

  const isTanUndefined = Math.abs(cos) < 1e-6;
  const tan = isTanUndefined ? null : sin / cos;
  const quadrant = getQuadrant(normDeg);

  let exactLabel: UnitCircleMetrics["exactLabel"] = undefined;
  if (isCloseToSpecial) {
    const special = SPECIAL_ANGLES[roundedDeg];
    exactLabel = {
      deg: `${roundedDeg}^\\circ`,
      rad: special.rad,
      sin: special.sin,
      cos: special.cos,
      tan: special.tan,
    };
  }

  return {
    angleDegrees: normDeg,
    angleRadians: rad,
    cos,
    sin,
    tan,
    isTanUndefined,
    quadrant,
    point: [cos, sin],
    exactLabel,
  };
}

/**
 * Menghitung titik pada kurva gelombang sinus dan cosinus
 */
export function generateWavePoints(
  currentDegrees: number,
  resolution: number = 60
): { sinPoints: [number, number][]; cosPoints: [number, number][] } {
  const sinPoints: [number, number][] = [];
  const cosPoints: [number, number][] = [];

  for (let i = 0; i <= resolution; i++) {
    const t = (i / resolution) * 360;
    const rad = degToRad(t);
    sinPoints.push([t, Math.sin(rad)]);
    cosPoints.push([t, Math.cos(rad)]);
  }

  return { sinPoints, cosPoints };
}
