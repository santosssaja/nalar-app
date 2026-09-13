"use client";

import React from "react";
import {
  PrimesCoprimeState,
  isPrime,
  primeFactorization,
  isCoprime,
  calculateGcd,
  eulerTotient,
} from "./engine";

interface KaTeXFormulaProps {
  state: PrimesCoprimeState;
}

export function KaTeXFormula({ state }: KaTeXFormulaProps) {
  const n = state.numberN || 12;
  const isPrimeN = isPrime(n);
  const factors = primeFactorization(n);
  const coprimeStatus = isCoprime(state.coprimeA, state.coprimeB);
  const gcdVal = calculateGcd(state.coprimeA, state.coprimeB);
  const phiVal = eulerTotient(n);

  const factorString =
    factors.length > 0
      ? factors.map((f) => (f.exponent > 1 ? `${f.prime}^${f.exponent}` : `${f.prime}`)).join(" × ")
      : `${n}`;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-2xl text-xs font-mono">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-neutral-500">N = {n}: </span>
          <span
            className={`font-bold px-2 py-0.5 rounded text-[11px] ${
              isPrimeN
                ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800"
                : "bg-purple-950/60 text-purple-300 border border-purple-800"
            }`}
          >
            {isPrimeN ? "PRIMA (Atom)" : `KOMPOSIT: ${n} = ${factorString}`}
          </span>
        </div>

        <div>
          <span className="text-neutral-500">Totient Euler: </span>
          <span className="text-amber-400 font-bold">φ({n}) = {phiVal}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">
          FPB({state.coprimeA}, {state.coprimeB}) = <span className="font-bold text-white">{gcdVal}</span>
        </span>
        <span
          className={`px-2 py-0.5 rounded font-bold ${
            coprimeStatus
              ? "bg-emerald-900/40 text-emerald-300 border border-emerald-700"
              : "bg-rose-900/40 text-rose-300 border border-rose-700"
          }`}
        >
          {coprimeStatus ? "KOPRIMA ✅" : "TIDAK KOPRIMA ❌"}
        </span>
      </div>
    </div>
  );
}
