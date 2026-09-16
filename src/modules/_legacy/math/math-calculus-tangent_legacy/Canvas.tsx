"use client";

import React, { useMemo, useCallback } from "react";
import {
  Mafs,
  Coordinates,
  Plot,
  Line,
  Point,
  MovablePoint,
  Theme,
} from "mafs";
import {
  TangentCanvasState,
  CALCULUS_FUNCTIONS,
  computeTangentMetrics,
  evaluateLinePoints,
} from "./engine";

interface CanvasProps {
  state: TangentCanvasState;
  onPointAMove: (a: number) => void;
}

export function Canvas({ state, onPointAMove }: CanvasProps) {
  const funcDef = CALCULUS_FUNCTIONS[state.funcKey] || CALCULUS_FUNCTIONS.x2;

  const metrics = useMemo(
    () => computeTangentMetrics(state.funcKey, state.a, state.deltaX),
    [state.funcKey, state.a, state.deltaX]
  );

  const { a, b, fa, fb, secantSlope, tangentSlope, error, isConverged } = metrics;

  // Compute endpoints for infinite-looking secant and tangent lines
  const secantLinePts = useMemo(
    () => evaluateLinePoints(secantSlope, a, fa, -4.5, 4.5),
    [secantSlope, a, fa]
  );

  const tangentLinePts = useMemo(
    () => evaluateLinePoints(tangentSlope, a, fa, -4.5, 4.5),
    [tangentSlope, a, fa]
  );

  const handlePointMove = useCallback(
    ([x]: [number, number]) => {
      const clampedX = Math.max(-3.0, Math.min(3.0, x));
      onPointAMove(Math.round(clampedX * 10) / 10);
    },
    [onPointAMove]
  );

  return (
    <div
      role="region"
      aria-label="Kanvas Interaktif Garis Singgung Kalkulus"
      className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl flex flex-col"
    >
      {/* HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-md text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-bold text-neutral-200">{funcDef.name}</span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-400">Tarik titik merah atau kurangi Δx</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-md bg-neutral-800 text-blue-300 font-bold border border-neutral-700">
            m_sekan: {secantSlope.toFixed(2)}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-amber-950/60 text-amber-300 border border-amber-800 font-bold">
            f&apos;(a): {tangentSlope.toFixed(2)}
          </span>
          <span
            className={`px-2 py-1 rounded-md font-semibold border ${
              isConverged
                ? "bg-emerald-950/60 text-emerald-300 border-emerald-800"
                : "bg-neutral-800/80 text-neutral-400 border-neutral-700"
            }`}
          >
            {isConverged ? "✓ Konvergen!" : `Error: ${error.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Mafs Math Canvas Viewport */}
      <div className="relative w-full h-[400px] bg-neutral-950 flex items-center justify-center select-none">
        <Mafs
          viewBox={{ x: [-3.5, 3.5], y: [-3.5, 4.5] }}
          preserveAspectRatio={false}
          pan={false}
          zoom={false}
          height={400}
        >
          <Coordinates.Cartesian subdivisions={2} />

          {/* Function Curve f(x) */}
          <Plot.OfX
            y={funcDef.evaluate}
            color={Theme.indigo}
            weight={3}
          />

          {/* Secant Delta-X and Delta-Y Triangle */}
          {state.showSecant && Math.abs(state.deltaX) > 0.1 && (
            <>
              {/* Horizontal run (Delta x) */}
              <Line.Segment
                point1={[a, fa]}
                point2={[b, fa]}
                color={Theme.foreground}
                weight={1}
                style="dashed"
              />
              {/* Vertical rise (Delta y) */}
              <Line.Segment
                point1={[b, fa]}
                point2={[b, fb]}
                color={Theme.blue}
                weight={2}
              />
            </>
          )}

          {/* Secant Line (through P and Q) */}
          {state.showSecant && (
            <Line.Segment
              point1={secantLinePts[0]}
              point2={secantLinePts[1]}
              color={Theme.blue}
              weight={1.8}
              style="dashed"
            />
          )}

          {/* Tangent Line (through P with slope f'(a)) */}
          {state.showTangent && (
            <Line.Segment
              point1={tangentLinePts[0]}
              point2={tangentLinePts[1]}
              color={Theme.orange}
              weight={3}
            />
          )}

          {/* Second Point Q(a + deltaX, f(a + deltaX)) */}
          {state.showSecant && Math.abs(state.deltaX) > 0.05 && (
            <Point x={b} y={fb} color={Theme.blue} />
          )}

          {/* Interactive Movable Point P(a, f(a)) */}
          <MovablePoint
            point={[a, fa]}
            onMove={handlePointMove}
            color={Theme.red}
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
          <span className="w-3 h-1 bg-blue-500 rounded-full" />
          <span>Garis Sekan (Δx = {state.deltaX.toFixed(2)})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-amber-500 rounded-full" />
          <span>Garis Singgung (Limit Δx → 0)</span>
        </div>
      </div>
    </div>
  );
}
