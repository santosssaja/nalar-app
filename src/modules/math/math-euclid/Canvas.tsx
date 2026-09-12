"use client";

import React, { useMemo } from "react";
import { computeEuclideanTiles, EuclideanTile } from "./engine";

export interface EuclideanCanvasProps {
  width: number;
  height: number;
  selectedStepIndex?: number | null;
  onTileHover?: (stepIndex: number | null) => void;
}

const TILE_PALETTES = [
  { fill: "#6366f1", stroke: "#818cf8", text: "#ffffff", labelBg: "rgba(30, 27, 75, 0.85)" },
  { fill: "#0ea5e9", stroke: "#38bdf8", text: "#ffffff", labelBg: "rgba(12, 74, 110, 0.85)" },
  { fill: "#10b981", stroke: "#34d399", text: "#ffffff", labelBg: "rgba(6, 78, 59, 0.85)" },
  { fill: "#f59e0b", stroke: "#fbbf24", text: "#18181b", labelBg: "rgba(254, 243, 199, 0.95)" },
  { fill: "#ec4899", stroke: "#f472b6", text: "#ffffff", labelBg: "rgba(131, 24, 67, 0.85)" },
  { fill: "#8b5cf6", stroke: "#a78bfa", text: "#ffffff", labelBg: "rgba(76, 29, 149, 0.85)" },
];

export function Canvas({
  width,
  height,
  selectedStepIndex = null,
  onTileHover,
}: EuclideanCanvasProps) {
  const tilingResult = useMemo(
    () => computeEuclideanTiles(width, height),
    [width, height]
  );

  const { gcd, totalSquares, tiles } = tilingResult;

  // SVG coordinate system mapping
  const padding = 16;
  const viewBoxW = width + padding * 2;
  const viewBoxH = height + padding * 2;

  return (
    <div
      role="region"
      aria-label="Kanvas Interaktif Pengubinan Persegi Panjang Algoritma Euclid"
      className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl flex flex-col"
    >
      {/* HUD Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-md text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="font-bold text-neutral-200">Pengubinan Persegi Panjang</span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-400">
            Dimensi: {width} × {height}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-neutral-800 font-mono font-bold text-neutral-200 border border-neutral-700">
            FPB: <span className="text-emerald-400">{gcd}</span>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-neutral-800 font-mono text-neutral-300 border border-neutral-700">
            Ubin: <span className="text-amber-300">{totalSquares}</span>
          </span>
        </div>
      </div>

      {/* SVG Viewport */}
      <div className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center p-4 bg-neutral-950/60 select-none">
        <svg
          viewBox={`-${padding} -${padding} ${viewBoxW} ${viewBoxH}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full max-h-[380px] drop-shadow-2xl transition-all duration-300"
          aria-label={`Visualisasi pengubinan ${width} kali ${height}, terdiri dari ${totalSquares} bujur sangkar, FPB ${gcd}`}
        >
          <defs>
            <filter id="tile-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Background boundary of outer rectangle */}
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="#18181b"
            stroke="#3f3f46"
            strokeWidth={1.5}
            rx={2}
          />

          {/* Render each Euclidean square tile */}
          {tiles.map((tile: EuclideanTile) => {
            const palette = TILE_PALETTES[tile.colorIndex];
            const isHighlighted =
              selectedStepIndex !== null && selectedStepIndex === tile.stepIndex;
            const isTerminalTile = tile.size === gcd;

            const fontSize = Math.max(2.5, Math.min(tile.size * 0.28, 14));
            const showText = tile.size > 8;

            return (
              <g
                key={tile.id}
                onMouseEnter={() => onTileHover?.(tile.stepIndex)}
                onMouseLeave={() => onTileHover?.(null)}
                className="cursor-pointer transition-opacity duration-150"
                style={{
                  opacity:
                    selectedStepIndex !== null && !isHighlighted ? 0.45 : 1,
                }}
              >
                <rect
                  x={tile.x}
                  y={tile.y}
                  width={tile.size}
                  height={tile.size}
                  fill={palette.fill}
                  fillOpacity={isHighlighted ? 0.95 : 0.8}
                  stroke={isHighlighted ? "#ffffff" : palette.stroke}
                  strokeWidth={isHighlighted ? 2.5 : 1.2}
                  rx={1.5}
                  filter="url(#tile-shadow)"
                />

                {/* Size label inside square */}
                {showText && (
                  <>
                    <rect
                      x={tile.x + tile.size / 2 - fontSize * 1.6}
                      y={tile.y + tile.size / 2 - fontSize * 0.75}
                      width={fontSize * 3.2}
                      height={fontSize * 1.5}
                      fill={palette.labelBg}
                      rx={fontSize * 0.3}
                    />
                    <text
                      x={tile.x + tile.size / 2}
                      y={tile.y + tile.size / 2}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={palette.text}
                      fontSize={fontSize}
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {tile.size}×{tile.size}
                    </text>
                  </>
                )}

                {/* Badge for smallest square (GCD) */}
                {isTerminalTile && tile.size > 14 && (
                  <circle
                    cx={tile.x + tile.size - 5}
                    cy={tile.y + 5}
                    r={3}
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth={1}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
