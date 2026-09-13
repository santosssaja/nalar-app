/**
 * Engine adapter for Primes & Coprimality Module.
 */
export {
  calculateGcd,
  isCoprime,
  isPrime,
  primeFactorization,
  countDivisors,
  sieveOfEratosthenes,
  eulerTotient,
  modularPower,
  verifyFermatLittleTheorem,
} from "@/lib/math-engine/primes-coprime";

export type {
  PrimeFactor,
  PrimesCoprimeState,
} from "@/lib/math-engine/primes-coprime";
