/**
 * Pure Mathematical Engine for Number Theory & Modular Arithmetic.
 * Decoupled from UI components, deterministic and fully unit-testable.
 */

/**
 * Computes safe mathematical modulo: a mod n.
 * Handles negative numbers correctly: -1 mod 12 = 11.
 * Defensively handles division by zero or NaN.
 */
export function safeModulo(a: number, n: number): number {
  if (!Number.isFinite(a) || !Number.isFinite(n) || n === 0) {
    return 0;
  }
  const intA = Math.round(a);
  const intN = Math.abs(Math.round(n));
  if (intN === 0) return 0;
  return ((intA % intN) + intN) % intN;
}

/**
 * Computes Greatest Common Divisor (GCD) using the Euclidean Algorithm.
 */
export function calculateGCD(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));

  if (!Number.isFinite(x) || !Number.isFinite(y)) return 1;

  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

/**
 * Checks if two numbers are coprime (gcd(a, b) === 1).
 */
export function areCoprime(a: number, b: number): boolean {
  return calculateGCD(a, b) === 1;
}

/**
 * Checks if a positive integer is prime.
 */
export function isPrimeNumber(n: number): boolean {
  const num = Math.round(n);
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

export interface ClockNode {
  index: number;
  x: number;
  y: number;
  angle: number;
}

/**
 * Generates Cartesian coordinate positions for n evenly spaced nodes around a clock circle.
 * 0 is placed at 12 o'clock, proceeding clockwise.
 */
export function generateClockNodes(
  n: number,
  radius: number,
  center: { x: number; y: number }
): ClockNode[] {
  const safeN = Math.max(2, Math.min(Math.round(n), 120));
  const nodes: ClockNode[] = [];

  for (let i = 0; i < safeN; i++) {
    // 12 o'clock corresponds to -PI/2 in standard radians
    const angle = (2 * Math.PI * i) / safeN - Math.PI / 2;
    nodes.push({
      index: i,
      x: Number((center.x + radius * Math.cos(angle)).toFixed(3)),
      y: Number((center.y + radius * Math.sin(angle)).toFixed(3)),
      angle,
    });
  }

  return nodes;
}

export interface ChordConnection {
  fromIndex: number;
  toIndex: number;
}

/**
 * Generates chord connections for modular multiplication:
 * Each node i connects to (i * multiplier + offset) mod n.
 */
export function generateModularChords(
  n: number,
  multiplier: number,
  offset = 0
): ChordConnection[] {
  const safeN = Math.max(2, Math.min(Math.round(n), 120));
  const chords: ChordConnection[] = [];

  for (let i = 0; i < safeN; i++) {
    const target = safeModulo(i * multiplier + offset, safeN);
    chords.push({
      fromIndex: i,
      toIndex: target,
    });
  }

  return chords;
}

/**
 * Computes modular multiplicative inverse of a mod m:
 * Finds x such that (a * x) mod m === 1. Returns null if gcd(a, m) !== 1.
 */
export function findModularInverse(a: number, m: number): number | null {
  const safeA = safeModulo(a, m);
  const safeM = Math.abs(Math.round(m));
  if (safeM <= 1 || calculateGCD(safeA, safeM) !== 1) {
    return null;
  }

  // Extended Euclidean Algorithm
  let m0 = safeM;
  let y = 0, x = 1;

  if (safeM === 1) return 0;
  let currentA = safeA;

  while (currentA > 1) {
    const q = Math.floor(currentA / m0);
    let t = m0;
    m0 = currentA % m0;
    currentA = t;
    t = y;
    y = x - q * y;
    x = t;
  }

  if (x < 0) x += safeM;
  return x;
}
