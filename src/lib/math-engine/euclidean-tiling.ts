/**
 * Pure mathematical engine for Euclidean Tiling and Euclidean Algorithm.
 * Implements division steps, greatest common divisor, and geometric square tiling.
 */

export interface EuclideanDivisionStep {
  stepNumber: number;
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
  isTerminal: boolean;
}

export interface EuclideanTile {
  id: string;
  x: number;
  y: number;
  size: number;
  stepIndex: number;
  colorIndex: number;
}

export interface EuclideanTilingResult {
  width: number;
  height: number;
  gcd: number;
  totalSquares: number;
  steps: EuclideanDivisionStep[];
  tiles: EuclideanTile[];
}

/**
 * Computes the sequence of division steps in the Euclidean algorithm.
 */
export function computeEuclideanDivisionSteps(
  a: number,
  b: number
): EuclideanDivisionStep[] {
  let x = Math.max(1, Math.round(Math.abs(a)));
  let y = Math.max(1, Math.round(Math.abs(b)));

  if (x < y) {
    const temp = x;
    x = y;
    y = temp;
  }

  const steps: EuclideanDivisionStep[] = [];
  let stepNum = 1;

  while (y > 0) {
    const quotient = Math.floor(x / y);
    const remainder = x % y;
    const isTerminal = remainder === 0;

    steps.push({
      stepNumber: stepNum++,
      dividend: x,
      divisor: y,
      quotient,
      remainder,
      isTerminal,
    });

    x = y;
    y = remainder;
  }

  return steps;
}

/**
 * Computes the geometric square tiling of a rectangle of dimensions a x b.
 */
export function computeEuclideanTiles(
  a: number,
  b: number
): EuclideanTilingResult {
  const safeA = Math.max(1, Math.min(200, Math.round(Math.abs(a))));
  const safeB = Math.max(1, Math.min(200, Math.round(Math.abs(b))));

  const steps = computeEuclideanDivisionSteps(safeA, safeB);
  const gcd = steps.length > 0 ? steps[steps.length - 1].divisor : 1;

  const tiles: EuclideanTile[] = [];
  let curX = 0;
  let curY = 0;
  let curW = safeA;
  let curH = safeB;
  let stepIndex = 0;

  while (curW > 0 && curH > 0) {
    if (curW >= curH) {
      // Tile horizontally with squares of size curH
      const squareSize = curH;
      const count = Math.floor(curW / squareSize);
      for (let i = 0; i < count; i++) {
        tiles.push({
          id: `tile-${stepIndex}-${i}`,
          x: curX + i * squareSize,
          y: curY,
          size: squareSize,
          stepIndex,
          colorIndex: stepIndex % 6,
        });
      }
      curX += count * squareSize;
      curW -= count * squareSize;
    } else {
      // Tile vertically with squares of size curW
      const squareSize = curW;
      const count = Math.floor(curH / squareSize);
      for (let i = 0; i < count; i++) {
        tiles.push({
          id: `tile-${stepIndex}-${i}`,
          x: curX,
          y: curY + i * squareSize,
          size: squareSize,
          stepIndex,
          colorIndex: stepIndex % 6,
        });
      }
      curY += count * squareSize;
      curH -= count * squareSize;
    }
    stepIndex++;
  }

  return {
    width: safeA,
    height: safeB,
    gcd,
    totalSquares: tiles.length,
    steps,
    tiles,
  };
}

/**
 * Computes the Least Common Multiple (LCM) of two numbers via GCD duality:
 * lcm(a, b) = (|a * b|) / gcd(a, b).
 */
export function computeLCM(a: number, b: number): number {
  const safeA = Math.abs(Math.round(a));
  const safeB = Math.abs(Math.round(b));
  if (safeA === 0 || safeB === 0) return 0;
  const steps = computeEuclideanDivisionSteps(safeA, safeB);
  const gcd = steps.length > 0 ? steps[steps.length - 1].divisor : 1;
  return (safeA * safeB) / gcd;
}

/**
 * Extended Euclidean Algorithm to find Bézout coefficients:
 * Returns { gcd, x, y } such that a*x + b*y = gcd(a, b).
 */
export function extendedEuclidBezout(
  a: number,
  b: number
): { gcd: number; x: number; y: number } {
  let oldR = Math.round(a);
  let r = Math.round(b);
  let oldS = 1;
  let s = 0;
  let oldT = 0;
  let t = 1;

  while (r !== 0) {
    const q = Math.floor(oldR / r);
    let temp = oldR - q * r;
    oldR = r;
    r = temp;

    temp = oldS - q * s;
    oldS = s;
    s = temp;

    temp = oldT - q * t;
    oldT = t;
    t = temp;
  }

  return {
    gcd: oldR,
    x: oldS,
    y: oldT,
  };
}
