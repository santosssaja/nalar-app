import { describe, it, expect } from "vitest";
import {
  calculateGcd,
  isCoprime,
  isPrime,
  primeFactorization,
  countDivisors,
  sieveOfEratosthenes,
  eulerTotient,
  modularPower,
  verifyFermatLittleTheorem,
} from "./primes-coprime";

describe("primes-coprime math engine", () => {
  it("calculates gcd correctly", () => {
    expect(calculateGcd(42, 30)).toBe(6);
    expect(calculateGcd(8, 9)).toBe(1);
    expect(calculateGcd(15, 25)).toBe(5);
  });

  it("checks coprimality correctly", () => {
    expect(isCoprime(8, 9)).toBe(true);
    expect(isCoprime(14, 15)).toBe(true);
    expect(isCoprime(15, 25)).toBe(false);
    expect(isCoprime(7, 13)).toBe(true);
  });

  it("identifies prime numbers accurately", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(17)).toBe(true);
    expect(isPrime(87)).toBe(false); // 3 x 29
    expect(isPrime(97)).toBe(true);
    expect(isPrime(1)).toBe(false);
    expect(isPrime(0)).toBe(false);
  });

  it("computes prime factorization according to fundamental theorem of arithmetic", () => {
    expect(primeFactorization(60)).toEqual([
      { prime: 2, exponent: 2 },
      { prime: 3, exponent: 1 },
      { prime: 5, exponent: 1 },
    ]);
    expect(primeFactorization(84)).toEqual([
      { prime: 2, exponent: 2 },
      { prime: 3, exponent: 1 },
      { prime: 7, exponent: 1 },
    ]);
    expect(primeFactorization(13)).toEqual([{ prime: 13, exponent: 1 }]);
  });

  it("counts divisors using prime factor exponents", () => {
    // 12 = 2^2 * 3^1 -> (2+1)*(1+1) = 6 divisors (1, 2, 3, 4, 6, 12)
    expect(countDivisors(12)).toBe(6);
    // 60 = 2^2 * 3^1 * 5^1 -> (3)*(2)*(2) = 12 divisors
    expect(countDivisors(60)).toBe(12);
  });

  it("generates correct primes using Sieve of Eratosthenes", () => {
    const { primes, isComposite } = sieveOfEratosthenes(30);
    expect(primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
    expect(isComposite[4]).toBe(true);
    expect(isComposite[9]).toBe(true);
    expect(isComposite[17]).toBe(false);
  });

  it("computes Euler Totient phi(n) correctly", () => {
    // phi(prime) = p - 1
    expect(eulerTotient(7)).toBe(6);
    expect(eulerTotient(13)).toBe(12);
    // phi(p * q) = (p - 1)(q - 1)
    expect(eulerTotient(15)).toBe(8); // 2 * 4
    expect(eulerTotient(77)).toBe(60); // 6 * 10
    expect(eulerTotient(10)).toBe(4); // 1, 3, 7, 9
  });

  it("computes modular exponentiation accurately", () => {
    expect(modularPower(3, 4, 10)).toBe(1); // 81 % 10 = 1
    expect(modularPower(2, 10, 1000)).toBe(24); // 1024 % 1000 = 24
  });

  it("verifies Fermat's Little Theorem a^(p-1) === 1 (mod p)", () => {
    const res1 = verifyFermatLittleTheorem(3, 7);
    expect(res1.holds).toBe(true);
    expect(res1.result).toBe(1);

    const res2 = verifyFermatLittleTheorem(5, 7);
    expect(res2.holds).toBe(true);
    expect(res2.result).toBe(1);

    // Composite modulus should not hold in general
    const res3 = verifyFermatLittleTheorem(2, 6);
    expect(res3.holds).toBe(false);
  });
});
