"use client";

import React, { useState, useMemo } from "react";
import {
  PrimesCoprimeState,
  isPrime,
  sieveOfEratosthenes,
  isCoprime,
  calculateGcd,
} from "./engine";

interface CanvasProps {
  state: PrimesCoprimeState;
  onNumberSelect?: (num: number) => void;
}

export function Canvas({ state, onNumberSelect }: CanvasProps) {
  const [viewMode, setViewMode] = useState<"blocks" | "sieve" | "coprime">("blocks");
  const n = Math.max(2, Math.min(60, Math.round(state.numberN || 12)));
  const isPrimeN = isPrime(n);

  // Sieve data up to 60
  const { primes, isComposite } = useMemo(() => sieveOfEratosthenes(60), []);

  // Compute 2D divisors for block arrangement
  const divisors = useMemo(() => {
    const divs: number[] = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) divs.push(i);
    }
    return divs;
  }, [n]);

  // Choose a divisor to visualize grid blocks (prefer pair closest to square, or 1 x n if prime)
  const bestDivisor = useMemo(() => {
    for (let i = Math.floor(Math.sqrt(n)); i >= 1; i--) {
      if (n % i === 0) return i;
    }
    return 1;
  }, [n]);

  const rows = bestDivisor;
  const cols = n / bestDivisor;

  // Coprimality line-of-sight metrics
  const cA = state.coprimeA || 8;
  const cB = state.coprimeB || 9;
  const coprimeStatus = isCoprime(cA, cB);
  const gcdVal = calculateGcd(cA, cB);

  return (
    <div
      role="region"
      aria-label="Kanvas Interaktif Faktorisasi Prima dan Koprima"
      className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl flex flex-col"
    >
      {/* HUD Header with Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-md text-xs">
        <div className="flex items-center gap-1.5 p-1 bg-neutral-800 rounded-xl border border-neutral-700">
          <button
            type="button"
            onClick={() => setViewMode("blocks")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              viewMode === "blocks"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Susunan Balok ({rows}×{cols})
          </button>
          <button
            type="button"
            onClick={() => setViewMode("sieve")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              viewMode === "sieve"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Saringan Eratosthenes (1-60)
          </button>
          <button
            type="button"
            onClick={() => setViewMode("coprime")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              viewMode === "coprime"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Garis Pandang Koprima ({cA}, {cB})
          </button>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">
            N = <span className="text-white font-bold">{n}</span>
          </span>
          <span
            className={`px-2 py-0.5 rounded font-bold ${
              isPrimeN
                ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800"
                : "bg-purple-950/60 text-purple-300 border border-purple-800"
            }`}
          >
            {isPrimeN ? "Atom Prima" : "Komposit"}
          </span>
        </div>
      </div>

      {/* Main Viewport Content */}
      <div className="relative w-full min-h-[360px] flex items-center justify-center bg-gradient-to-b from-neutral-950 to-neutral-900/40 p-4 select-none">
        {/* VIEW 1: Rectangular Block Arrangement */}
        {viewMode === "blocks" && (
          <div className="flex flex-col items-center justify-center gap-3 w-full h-full animate-fade-in">
            <div className="text-center space-y-1">
              <p className="text-xs text-neutral-400">
                {isPrimeN
                  ? "Bilangan prima HANYA memiliki satu bentuk susunan balok: 1 baris memanjang!"
                  : `Bilangan komposit ${n} dapat ditata menjadi kisi persegi panjang ${rows} baris × ${cols} kolom.`}
              </p>
            </div>

            {/* Grid Box Container */}
            <div
              className="grid gap-1.5 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-inner max-w-full overflow-auto"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: n }).map((_, idx) => (
                <div
                  key={`block-${idx}`}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold border transition-all ${
                    isPrimeN
                      ? "bg-emerald-600/30 border-emerald-500/60 text-emerald-300 shadow-sm"
                      : "bg-blue-600/30 border-blue-500/60 text-blue-300 shadow-sm"
                  }`}
                >
                  {idx + 1}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1 text-[11px] text-neutral-400 font-mono">
              <span>Faktor pembagi positif: </span>
              {divisors.map((d) => (
                <span
                  key={`div-${d}`}
                  className={`px-1.5 py-0.5 rounded ${
                    d === 1 || d === n
                      ? "bg-neutral-800 text-neutral-300"
                      : "bg-blue-900/40 text-blue-300 border border-blue-800"
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: Saringan Eratosthenes */}
        {viewMode === "sieve" && (
          <div className="flex flex-col items-center justify-center gap-2.5 w-full h-full animate-fade-in">
            <p className="text-xs text-neutral-400 text-center">
              Warna hijau = Bilangan Prima (Atom). Warna gelap = Kelipatan yang tereliminasi oleh saringan.
            </p>

            <div className="grid grid-cols-10 gap-1.5 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 max-w-full">
              {Array.from({ length: 60 }, (_, i) => i + 1).map((val) => {
                const isP = !isComposite[val] && val > 1;
                const isCurrent = val === n;

                return (
                  <button
                    key={`cell-${val}`}
                    type="button"
                    onClick={() => onNumberSelect?.(val)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                      isCurrent
                        ? "ring-2 ring-white scale-105 z-10"
                        : ""
                    } ${
                      isP
                        ? "bg-emerald-600/40 border-emerald-500 text-emerald-200 shadow-emerald-950/40 shadow-sm"
                        : val === 1
                        ? "bg-neutral-900 border-neutral-800 text-neutral-600"
                        : "bg-neutral-900/60 border-neutral-800 text-neutral-500"
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: Garis Pandang Koprima (Line-of-Sight) */}
        {viewMode === "coprime" && (
          <div className="flex flex-col items-center justify-center gap-3 w-full h-full animate-fade-in">
            <svg viewBox="0 0 360 260" className="w-full max-w-[420px] h-[220px]">
              {/* Grid Lines */}
              {Array.from({ length: 11 }).map((_, i) => (
                <line
                  key={`gx-${i}`}
                  x1={30 + i * 30}
                  y1={20}
                  x2={30 + i * 30}
                  y2={220}
                  stroke="#262626"
                  strokeWidth="0.5"
                />
              ))}
              {Array.from({ length: 8 }).map((_, j) => (
                <line
                  key={`gy-${j}`}
                  x1={30}
                  y1={20 + j * 28.5}
                  x2={330}
                  y2={20 + j * 28.5}
                  stroke="#262626"
                  strokeWidth="0.5"
                />
              ))}

              {/* Sight Ray from Origin (30, 220) to Target */}
              {(() => {
                const targetX = 30 + Math.min(10, cA) * 30;
                const targetY = 220 - Math.min(7, cB) * 28.5;
                const midX = (30 + targetX) / 2;
                const midY = (220 + targetY) / 2;

                return (
                  <g>
                    <line
                      x1={30}
                      y1={220}
                      x2={targetX}
                      y2={targetY}
                      stroke={coprimeStatus ? "#10b981" : "#f43f5e"}
                      strokeWidth="2.5"
                      strokeDasharray={coprimeStatus ? "none" : "4 2"}
                    />
                    {/* Origin Point */}
                    <circle cx={30} cy={220} r="5" fill="#38bdf8" />
                    <text x={26} y={238} className="fill-sky-400 font-mono text-[10px]">
                      (0,0)
                    </text>

                    {/* Target Point */}
                    <circle
                      cx={targetX}
                      cy={targetY}
                      r="6"
                      fill={coprimeStatus ? "#10b981" : "#f43f5e"}
                    />
                    <text
                      x={targetX + 8}
                      y={targetY - 6}
                      className={`font-mono text-xs font-bold ${
                        coprimeStatus ? "fill-emerald-300" : "fill-rose-300"
                      }`}
                    >
                      ({cA}, {cB})
                    </text>

                    {/* Obstacle Point if not coprime */}
                    {!coprimeStatus && gcdVal > 1 && (
                      <g>
                        <circle cx={midX} cy={midY} r="5" fill="#fbbf24" />
                        <text
                          x={midX + 8}
                          y={midY + 12}
                          className="fill-amber-300 font-mono text-[9px]"
                        >
                          Terhalang ({cA / gcdVal}, {cB / gcdVal})
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}
            </svg>

            <div className="text-center text-xs space-y-1">
              <p
                className={`font-bold ${
                  coprimeStatus ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {coprimeStatus
                  ? `Garis pandang dari (0,0) ke (${cA}, ${cB}) BEBAS HAMBATAN! Keduanya saling koprima (FPB = 1).`
                  : `Garis pandang terhalang oleh titik pembagi (${cA / gcdVal}, ${cB / gcdVal}) karena memiliki faktor sekutu ${gcdVal}!`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
