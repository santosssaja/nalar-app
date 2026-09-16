"use client";

import React, { useMemo } from "react";
import {
  ModularClockState,
  generateClockNodes,
  generateModularChords,
  computeModularMetrics,
} from "./engine";

interface CanvasProps {
  state: ModularClockState;
  onNodeClick: (index: number) => void;
}

const CLOCK_CENTER = { x: 190, y: 190 };
const CLOCK_RADIUS = 145;

export function Canvas({ state, onNodeClick }: CanvasProps) {
  const { safeN, safeM, gcd, isGenerator, additionResult } = useMemo(
    () => computeModularMetrics(state),
    [state]
  );

  const nodes = useMemo(
    () => generateClockNodes(safeN, CLOCK_RADIUS, CLOCK_CENTER),
    [safeN]
  );

  const chords = useMemo(
    () => generateModularChords(safeN, safeM, 0),
    [safeN, safeM]
  );

  const targetAdditionNode = nodes[additionResult % nodes.length];

  return (
    <div
      role="region"
      aria-label="Kanvas Visual Jam Modular dan Pola Benang Geometris"
      className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl flex flex-col"
    >
      {/* HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-md text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-bold text-neutral-200">Lingkaran Modulo Jam</span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-400">n = {safeN} titik, m = {safeM}x</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-neutral-800 font-mono text-neutral-300 border border-neutral-700">
            Hasil Jam: <span className="text-emerald-400 font-bold">{additionResult}</span>
          </span>
          <span
            className={`px-2 py-0.5 rounded font-semibold border ${
              isGenerator
                ? "bg-emerald-950/60 text-emerald-300 border-emerald-800"
                : "bg-amber-950/60 text-amber-300 border-amber-800"
            }`}
          >
            FPB({safeM}, {safeN}) = {gcd}
          </span>
        </div>
      </div>

      {/* SVG Canvas Viewport */}
      <div className="relative w-full h-[400px] flex items-center justify-center bg-gradient-to-b from-neutral-950 to-neutral-900/50 p-2 select-none">
        <svg
          viewBox="0 0 380 380"
          className="w-full h-full max-w-[380px] max-h-[380px]"
          role="img"
          aria-label={`Visualisasi jam modular dengan ${safeN} titik dan pengali ${safeM}`}
        >
          {/* Outer circle rim */}
          <circle
            cx={CLOCK_CENTER.x}
            cy={CLOCK_CENTER.y}
            r={CLOCK_RADIUS}
            fill="none"
            stroke="#27272a"
            strokeWidth="2"
            strokeDasharray={safeN > 30 ? "2 2" : "none"}
          />

          {/* Glowing chord lines connecting i -> (i * m) mod n */}
          <g opacity="0.65">
            {chords.map((chord, idx) => {
              const fromNode = nodes[chord.fromIndex];
              const toNode = nodes[chord.toIndex];
              if (!fromNode || !toNode) return null;

              const isHighlighted =
                state.activeNode !== null &&
                (chord.fromIndex === state.activeNode || chord.toIndex === state.activeNode);

              return (
                <line
                  key={`${idx}-${chord.fromIndex}-${chord.toIndex}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={
                    isHighlighted
                      ? "#facc15"
                      : isGenerator
                      ? "#6366f1"
                      : "#38bdf8"
                  }
                  strokeWidth={isHighlighted ? 2.5 : safeN > 40 ? 0.75 : 1.2}
                  strokeOpacity={isHighlighted ? 1 : safeN > 40 ? 0.35 : 0.6}
                  className="transition-all duration-300"
                />
              );
            })}
          </g>

          {/* Clock Hand pointing to additionResult */}
          {targetAdditionNode && (
            <g>
              <line
                x1={CLOCK_CENTER.x}
                y1={CLOCK_CENTER.y}
                x2={targetAdditionNode.x}
                y2={targetAdditionNode.y}
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <circle cx={CLOCK_CENTER.x} cy={CLOCK_CENTER.y} r="5" fill="#10b981" />
            </g>
          )}

          {/* Numbered node badges */}
          {nodes.map((node) => {
            const isTarget = node.index === additionResult;
            const isSelected = state.activeNode === node.index;
            const showText = safeN <= 32 || isTarget || node.index % 5 === 0;

            return (
              <g
                key={node.index}
                onClick={() => onNodeClick(node.index)}
                className="cursor-pointer group"
                tabIndex={0}
                role="button"
                aria-label={`Titik jam nomor ${node.index}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onNodeClick(node.index);
                }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isTarget ? 11 : isSelected ? 9 : safeN > 32 ? 4 : 7}
                  fill={
                    isTarget
                      ? "#10b981"
                      : isSelected
                      ? "#facc15"
                      : "#18181b"
                  }
                  stroke={
                    isTarget
                      ? "#34d399"
                      : isSelected
                      ? "#fde047"
                      : "#52525b"
                  }
                  strokeWidth={isTarget || isSelected ? 2 : 1}
                  className="transition-transform group-hover:scale-125"
                />

                {showText && (
                  <text
                    x={node.x}
                    y={node.y}
                    dy="3.5"
                    textAnchor="middle"
                    fontSize={safeN > 24 ? "9" : "11"}
                    fontWeight="bold"
                    fill={isTarget ? "#000000" : "#ffffff"}
                    className="pointer-events-none select-none font-mono"
                  >
                    {node.index}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/60 border-t border-neutral-800/80 text-xs text-neutral-400">
        <span>Klik pada sembarang titik jam untuk menyorot jalur benang perkaliannya.</span>
        <span className="font-mono text-[11px] text-neutral-500">Center (0 at 12:00)</span>
      </div>
    </div>
  );
}
