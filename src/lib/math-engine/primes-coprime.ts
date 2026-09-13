/**
 * Prime Factorization & Coprimality Engine
 * Pure mathematical functions following AGENTS.md standards.
 */

export interface PrimeFactor {
  prime: number;
  exponent: number;
}

export interface PrimesCoprimeState {
  numberN: number;
  sieveLimit: number;
  coprimeA: number;
  coprimeB: number;
  fermatBase: number;
  fermatPrime: number;
}

/**
 * Calculates GCD using Euclidean algorithm.
 */
export function calculateGcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

/**
 * Checks if two numbers are coprime: gcd(a, b) === 1.
 */
export function isCoprime(a: number, b: number): boolean {
  if (a === 0 || b === 0) return false;
  return calculateGcd(a, b) === 1;
}

/**
 * Tests if an integer n is prime.
 */
export function isPrime(n: number): boolean {
  const num = Math.round(n);
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Decomposes an integer into unique prime factors (Fundamental Theorem of Arithmetic).
 */
export function primeFactorization(n: number): PrimeFactor[] {
  let num = Math.abs(Math.round(n));
  if (num <= 1) return [];

  const factors: PrimeFactor[] = [];
  let d = 2;
  while (d * d <= num) {
    if (num % d === 0) {
      let count = 0;
      while (num % d === 0) {
        count++;
        num = Math.floor(num / d);
      }
      factors.push({ prime: d, exponent: count });
    }
    d = d === 2 ? 3 : d + 2;
  }

  if (num > 1) {
    factors.push({ prime: num, exponent: 1 });
  }

  return factors;
}

/**
 * Counts the total number of positive divisors using prime factor exponents:
 * tau(n) = (a1 + 1)(a2 + 1)...(ak + 1).
 */
export function countDivisors(n: number): number {
  const factors = primeFactorization(n);
  if (factors.length === 0) return n === 1 ? 1 : 0;
  return factors.reduce((acc, f) => acc * (f.exponent + 1), 1);
}

/**
 * Executes Sieve of Eratosthenes up to maxNumber.
 * Returns array of primes, and boolean map of composites.
 */
export function sieveOfEratosthenes(maxNumber: number): {
  primes: number[];
  isComposite: boolean[];
} {
  const limit = Math.max(2, Math.min(1000, Math.round(maxNumber)));
  const isComposite = new Array(limit + 1).fill(false);
  isComposite[0] = true;
  isComposite[1] = true;

  for (let p = 2; p * p <= limit; p++) {
    if (!isComposite[p]) {
      for (let multiple = p * p; multiple <= limit; multiple += p) {
        isComposite[multiple] = true;
      }
    }
  }

  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (!isComposite[i]) {
      primes.push(i);
    }
  }

  return { primes, isComposite };
}

/**
 * Computes Euler's totient function phi(n):
 * phi(n) = n * Product(1 - 1/p) for each prime factor p dividing n.
 */
export function eulerTotient(n: number): number {
  const num = Math.abs(Math.round(n));
  if (num === 0) return 0;
  if (num === 1) return 1;

  const factors = primeFactorization(num);
  let result = num;
  for (const f of factors) {
    result = Math.floor((result * (f.prime - 1)) / f.prime);
  }
  return result;
}

/**
 * Computes modular exponentiation: (base^exp) % mod.
 */
export function modularPower(base: number, exp: number, mod: number): number {
  if (mod === 1) return 0;
  let res = 1;
  let b = ((base % mod) + mod) % mod;
  let e = exp;

  while (e > 0) {
    if (e % 2 === 1) {
      res = (res * b) % mod;
    }
    b = (b * b) % mod;
    e = Math.floor(e / 2);
  }
  return res;
}

/**
 * Verifies Fermat's Little Theorem: a^(p-1) === 1 (mod p) for prime p and gcd(a, p) === 1.
 */
export function verifyFermatLittleTheorem(
  base: number,
  prime: number
): {
  isValidPrime: boolean;
  isCoprime: boolean;
  result: number;
  holds: boolean;
} {
  const primeCheck = isPrime(prime);
  const coprimeCheck = isCoprime(base, prime);
  if (!primeCheck || !coprimeCheck) {
    return {
      isValidPrime: primeCheck,
      isCoprime: coprimeCheck,
      result: modularPower(base, prime - 1, prime),
      holds: false,
    };
  }

  const result = modularPower(base, prime - 1, prime);
  return {
    isValidPrime: true,
    isCoprime: true,
    result,
    holds: result === 1,
  };
}
