"use client";

import React, { useMemo } from "react";
import {
  Mafs,
  Coordinates,
  Plot,
  Polygon,
  Line,
  Theme,
} from "mafs";
import {
  RiemannCanvasState,
  RIEMANN_FUNCTIONS,
  computeRiemannMetrics,
} from "./engine";

interface CanvasProps {
  state: RiemannCanvasState;
}

export function Canvas({ state }: CanvasProps) {
  const funcDef = RIEMANN_FUNCTIONS[state.funcKey] || RIEMANN_FUNCTIONS.x2;

  const metrics = useMemo(
    () =>
      computeRiemannMetrics(
        state.funcKey,
        state.a,
        state.b,
        state.n,
        state.method
      ),
    [state.funcKey, state.a, state.b, state.n, state.method]
  );

  const { partitions, approxArea, exactArea, relErrorPercent, deltaX } = metrics;

  return (
    <div
      role="region"
      aria-label="Kanvas Interaktif Partisi Jumlah Riemann"
      className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl flex flex-col"
    >
      {/* HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-md text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-neutral-200">{funcDef.name}</span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-400">
            n = {metrics.n} partisi (Δx = {deltaX.toFixed(3)})
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-md bg-neutral-800 text-emerald-300 font-bold border border-neutral-700">
            Σ Luas: {approxArea.toFixed(3)}
          </span>
          <span className="px-2 py-1 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
            Eksak: {exactArea.toFixed(3)}
          </span>
          <span
            className={`px-2 py-1 rounded-md font-semibold border ${
              relErrorPercent < 2
                ? "bg-emerald-950/60 text-emerald-300 border-emerald-800"
                : "bg-amber-950/60 text-amber-300 border-amber-800"
            }`}
          >
            Galat: {relErrorPercent.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Mafs Math Canvas Viewport */}
      <div className="relative w-full h-[400px] bg-neutral-950 flex items-center justify-center select-none">
        <Mafs
          viewBox={{ x: [-0.5, 4.5], y: [-1.2, 5.0] }}
          preserveAspectRatio={false}
          pan={false}
          zoom={false}
          height={400}
        >
          <Coordinates.Cartesian subdivisions={2} />

          {/* Riemann Rectangle Partitions */}
          {partitions.map((p, idx) => {
            const isPositive = p.height >= 0;
            return (
              <Polygon
                key={idx}
                points={p.vertices}
                color={isPositive ? Theme.green : Theme.red}
                fillOpacity={0.25}
                weight={1}
              />
            );
          })}

          {/* Function Curve f(x) */}
          <Plot.OfX
            y={funcDef.evaluate}
            color={Theme.indigo}
            weight={3}
          />

          {/* Integration Boundary a */}
          <Line.Segment
            point1={[state.a, -1.0]}
            point2={[state.a, 4.5]}
            color={Theme.foreground}
            weight={1.2}
            style="dashed"
          />

          {/* Integration Boundary b */}
          <Line.Segment
            point1={[state.b, -1.0]}
            point2={[state.b, 4.5]}
            color={Theme.foreground}
            weight={1.2}
            style="dashed"
          />
        </Mafs>
      </div>

      {/* Canvas Footer Legend */}
      <div className="flex flex-wrap items-center justify-around gap-2 px-4 py-2 bg-neutral-900/90 border-t border-neutral-800 text-xs text-neutral-300">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-indigo-500 rounded-full" />
          <span>Kurva {funcDef.latex}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-emerald-500 rounded-full" />
          <span>Persegi Panjang Partisi (Metode: {state.method})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-neutral-400 rounded-full" />
          <span>Batas Integrasi: [{state.a.toFixed(1)}, {state.b.toFixed(1)}]</span>
        </div>
      </div>
    </div>
  );
}
