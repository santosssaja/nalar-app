"use client";

import React, { useMemo } from "react";
import {
  ProjectileCanvasState,
  computeProjectileMetrics,
  computeInstantaneousState,
} from "./engine";

interface CanvasProps {
  state: ProjectileCanvasState;
}

export function Canvas({ state }: CanvasProps) {
  const metrics = useMemo(
    () =>
      computeProjectileMetrics({
        angleDegrees: state.angleDegrees,
        v0: state.v0,
        g: state.g,
        h0: state.h0,
      }),
    [state.angleDegrees, state.v0, state.g, state.h0]
  );

  const inst = useMemo(
    () =>
      computeInstantaneousState(
        {
          angleDegrees: state.angleDegrees,
          v0: state.v0,
          g: state.g,
          h0: state.h0,
        },
        state.animationTime
      ),
    [state.angleDegrees, state.v0, state.g, state.h0, state.animationTime]
  );

  // Scale physics meters to canvas SVG pixels (viewBox 0 0 800 400)
  // Origin at (60, 340)
  const originX = 60;
  const originY = 340;
  const scale = 9.5; // 1 meter = 9.5 pixels

  const ballX = originX + inst.x * scale;
  const ballY = originY - inst.y * scale;

  const targetX = originX + state.targetDistance * scale;

  // Generate SVG path for trajectory trail
  const pathD = useMemo(() => {
    return metrics.trajectoryPoints.reduce((acc, [x, y], idx) => {
      const px = originX + x * scale;
      const py = originY - y * scale;
      return idx === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
    }, "");
  }, [metrics.trajectoryPoints, scale]);

  // Cannon barrel endpoints
  const barrelLength = 36;
  const barrelEndX = originX + barrelLength * Math.cos(metrics.angleRadians);
  const barrelEndY = originY - barrelLength * Math.sin(metrics.angleRadians);

  return (
    <div
      role="region"
      aria-label="Kanvas Simulasi Gerak Parabola Kanon Proyektil"
      className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl flex flex-col"
    >
      {/* HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-md text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
          <span className="font-bold text-neutral-200">Kanon Proyektil 2D</span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-400">g = {state.g.toFixed(1)} m/s²</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-md bg-neutral-800 text-cyan-300 font-bold border border-neutral-700">
            Jangkauan R: {metrics.range.toFixed(2)} m
          </span>
          <span className="px-2.5 py-1 rounded-md bg-neutral-800 text-amber-300 font-bold border border-neutral-700">
            Tinggi H: {metrics.maxHeight.toFixed(2)} m
          </span>
          <span className="px-2 py-1 rounded-md bg-purple-950/60 text-purple-300 border border-purple-800 font-semibold">
            t_total: {metrics.flightTime.toFixed(2)} s
          </span>
        </div>
      </div>

      {/* SVG Canvas Viewport */}
      <div className="relative w-full h-[400px] bg-neutral-950 flex items-center justify-center select-none overflow-hidden">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Grid lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={originY - i * 40}
              x2="800"
              y2={originY - i * 40}
              stroke="#262626"
              strokeWidth="0.8"
              strokeDasharray="4 4"
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={originX + i * 50}
              y1="0"
              x2={originX + i * 50}
              y2="340"
              stroke="#262626"
              strokeWidth="0.8"
              strokeDasharray="4 4"
            />
          ))}

          {/* Ground surface */}
          <rect x="0" y={originY} width="800" height="60" fill="url(#groundGrad)" />
          <line x1="0" y1={originY} x2="800" y2={originY} stroke="#3b82f6" strokeWidth="2" />

          {/* Target Bullseye */}
          <g transform={`translate(${targetX}, ${originY})`}>
            <ellipse cx="0" cy="0" rx="14" ry="4" fill="#ef4444" opacity="0.6" />
            <ellipse cx="0" cy="0" rx="7" ry="2" fill="#ffffff" />
            <line x1="0" y1="0" x2="0" y2="-24" stroke="#ef4444" strokeWidth="2" />
            <polygon points="0,-24 12,-18 0,-12" fill="#ef4444" />
            <text x="0" y="16" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">
              TARGET ({state.targetDistance.toFixed(0)}m)
            </text>
          </g>

          {/* Parabolic Trajectory Trail */}
          {state.showTrail && (
            <path
              d={pathD}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
              strokeDasharray="5 4"
              opacity="0.8"
            />
          )}

          {/* Cannon Base & Barrel */}
          <circle cx={originX} cy={originY} r="16" fill="#475569" stroke="#334155" strokeWidth="2" />
          <line
            x1={originX}
            y1={originY}
            x2={barrelEndX}
            y2={barrelEndY}
            stroke="#94a3b8"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Projectile Ball */}
          <circle
            cx={ballX}
            cy={ballY}
            r="7"
            fill="#f59e0b"
            stroke="#fbbf24"
            strokeWidth="2"
            className="filter drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
          />

          {/* Velocity Vector Arrows */}
          {state.showVectors && !inst.isGrounded && (
            <g>
              {/* Horizontal Velocity Vx */}
              <line
                x1={ballX}
                y1={ballY}
                x2={ballX + inst.vx * 1.5}
                y2={ballY}
                stroke="#38bdf8"
                strokeWidth="2"
                markerEnd="url(#arrow)"
              />
              {/* Vertical Velocity Vy */}
              <line
                x1={ballX}
                y1={ballY}
                x2={ballX}
                y2={ballY - inst.vy * 1.5}
                stroke="#a855f7"
                strokeWidth="2"
                markerEnd="url(#arrow)"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Footer Status */}
      <div className="flex flex-wrap items-center justify-around gap-2 px-4 py-2 bg-neutral-900/90 border-t border-neutral-800 text-xs text-neutral-300">
        <div className="flex items-center gap-1.5 font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span>v_x: {inst.vx.toFixed(1)} m/s (tetap)</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
          <span>v_y: {inst.vy.toFixed(1)} m/s</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span>Kecepatan |v|: {inst.speed.toFixed(1)} m/s</span>
        </div>
      </div>
    </div>
  );
}
