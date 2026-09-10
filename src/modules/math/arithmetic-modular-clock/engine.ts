/**
 * Engine Adapter for Modular Clock & Number Theory Lesson.
 */
import {
  safeModulo,
  calculateGCD,
  areCoprime,
  isPrimeNumber,
  generateClockNodes,
  generateModularChords,
  ClockNode,
  ChordConnection,
} from "@/lib/math-engine/number-theory";

export interface ModularClockState {
  n: number; // Modulus (number of clock ticks)
  multiplier: number; // Factor for (i * m) mod n
  activeNode: number | null; // Currently highlighted node
  hourA: number; // For clock addition demo (e.g. 9)
  hourB: number; // For clock addition demo (e.g. 7)
}

export function computeModularMetrics(state: ModularClockState) {
  const safeN = Math.max(2, Math.round(state.n));
  const safeM = Math.round(state.multiplier);
  const gcd = calculateGCD(safeM, safeN);
  const isGenerator = gcd === 1;
  const isNPrime = isPrimeNumber(safeN);
  const additionResult = safeModulo(state.hourA + state.hourB, safeN);

  return {
    safeN,
    safeM,
    gcd,
    isGenerator,
    isNPrime,
    additionResult,
  };
}

export {
  safeModulo,
  calculateGCD,
  areCoprime,
  isPrimeNumber,
  generateClockNodes,
  generateModularChords,
};
export type { ClockNode, ChordConnection };
