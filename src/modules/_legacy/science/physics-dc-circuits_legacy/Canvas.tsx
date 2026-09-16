"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { calculateDCCircuit, CircuitTopology } from "./engine";

interface CanvasProps {
  voltage: number;
  r1: number;
  r2: number;
  r3: number;
  topology: CircuitTopology;
  isSwitchClosed: boolean;
}

export function Canvas({
  voltage,
  r1,
  r2,
  r3,
  topology,
  isSwitchClosed,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animOffsetRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Background
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, width, height);

    // Subtle grid
    ctx.strokeStyle = "#18181b";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const result = calculateDCCircuit({
      voltage,
      r1,
      r2,
      r3,
      topology,
      isSwitchClosed,
    });

    const isLive = isSwitchClosed && voltage > 0 && result.totalCurrent > 0;

    // Circuit coordinates
    const left = 90;
    const right = width - 90;
    const top = 90;
    const bottom = height - 90;

    // Main wire paths
    ctx.strokeStyle = isLive ? "#38bdf8" : "#475569";
    ctx.lineWidth = 3;

    // 1. Draw Wires based on topology
    ctx.beginPath();
    // Left vertical (battery side)
    ctx.moveTo(left, top);
    ctx.lineTo(left, height / 2 - 35);
    ctx.moveTo(left, height / 2 + 35);
    ctx.lineTo(left, bottom);

    // Bottom wire
    ctx.lineTo(right, bottom);

    if (topology === "series") {
      // Top wire with switch and two resistors
      ctx.moveTo(left, top);
      ctx.lineTo(left + 70, top); // to switch

      ctx.moveTo(left + 110, top);
      ctx.lineTo(260, top); // to R1

      ctx.moveTo(340, top);
      ctx.lineTo(430, top); // to R2

      ctx.moveTo(510, top);
      ctx.lineTo(right, top);
      ctx.lineTo(right, bottom);
    } else if (topology === "parallel") {
      // Main top wire to split
      ctx.moveTo(left, top);
      ctx.lineTo(left + 70, top); // to switch

      ctx.moveTo(left + 110, top);
      const splitX1 = 250;
      const splitX2 = right - 70;
      ctx.lineTo(splitX1, top);

      // Branch 1 (top)
      ctx.moveTo(splitX1, top);
      ctx.lineTo(splitX1, top - 35);
      ctx.lineTo(330, top - 35);
      ctx.moveTo(410, top - 35);
      ctx.lineTo(splitX2, top - 35);
      ctx.lineTo(splitX2, top);

      // Branch 2 (lower)
      ctx.moveTo(splitX1, top);
      ctx.lineTo(splitX1, top + 35);
      ctx.lineTo(330, top + 35);
      ctx.moveTo(410, top + 35);
      ctx.lineTo(splitX2, top + 35);
      ctx.lineTo(splitX2, top);

      ctx.moveTo(splitX2, top);
      ctx.lineTo(right, top);
      ctx.lineTo(right, bottom);
    } else {
      // Mixed: R1 in series, then splits to R2 and R3
      ctx.moveTo(left, top);
      ctx.lineTo(left + 70, top);
      ctx.moveTo(left + 110, top);
      ctx.lineTo(210, top); // to R1
      ctx.moveTo(280, top);
      const splitX1 = 340;
      const splitX2 = right - 50;
      ctx.lineTo(splitX1, top);

      // Branch 2
      ctx.moveTo(splitX1, top);
      ctx.lineTo(splitX1, top - 35);
      ctx.lineTo(410, top - 35);
      ctx.moveTo(480, top - 35);
      ctx.lineTo(splitX2, top - 35);
      ctx.lineTo(splitX2, top);

      // Branch 3
      ctx.moveTo(splitX1, top);
      ctx.lineTo(splitX1, top + 35);
      ctx.lineTo(410, top + 35);
      ctx.moveTo(480, top + 35);
      ctx.lineTo(splitX2, top + 35);
      ctx.lineTo(splitX2, top);

      ctx.moveTo(splitX2, top);
      ctx.lineTo(right, top);
      ctx.lineTo(right, bottom);
    }
    ctx.stroke();

    // 2. Draw Battery Symbol at (left, height / 2)
    const by = height / 2;
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(left - 24, by - 10);
    ctx.lineTo(left + 24, by - 10); // Positive plate
    ctx.stroke();

    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(left - 14, by + 10);
    ctx.lineTo(left + 14, by + 10); // Negative plate
    ctx.stroke();

    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("+", left - 32, by - 8);
    ctx.fillStyle = "#38bdf8";
    ctx.fillText("−", left - 32, by + 14);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${voltage} V`, left, by + 34);

    // 3. Draw Switch at (left + 90, top)
    const sx = left + 70;
    ctx.fillStyle = "#e2e8f0";
    ctx.beginPath();
    ctx.arc(sx, top, 4, 0, Math.PI * 2);
    ctx.arc(sx + 40, top, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = isSwitchClosed ? "#10b981" : "#f43f5e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sx, top);
    if (isSwitchClosed) {
      ctx.lineTo(sx + 40, top);
    } else {
      ctx.lineTo(sx + 35, top - 22);
    }
    ctx.stroke();

    // 4. Helper to draw glowing Resistor/Lamp
    const drawResistor = (x: number, y: number, r: (typeof result.resistors)[0]) => {
      const rw = 60;
      const rh = 24;

      // Glow when powered
      if (isLive && r.power > 0) {
        const glowRad = Math.min(45, 15 + Math.sqrt(r.power) * 5);
        const glow = ctx.createRadialGradient(x, y, 5, x, y, glowRad);
        glow.addColorStop(0, "rgba(251, 191, 36, 0.7)");
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, glowRad, 0, Math.PI * 2);
        ctx.fill();
      }

      // Body box
      ctx.fillStyle = "#1e293b";
      ctx.strokeStyle = isLive && r.power > 0 ? "#f59e0b" : "#64748b";
      ctx.lineWidth = 2;
      ctx.fillRect(x - rw / 2, y - rh / 2, rw, rh);
      ctx.strokeRect(x - rw / 2, y - rh / 2, rw, rh);

      // Label inside
      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${r.resistance} Ω`, x, y);

      // Measurement tag
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px sans-serif";
      ctx.fillText(`${r.voltageDrop}V | ${r.current}A`, x, y + 22);
    };

    // Render resistors based on topology
    if (topology === "series") {
      drawResistor(300, top, result.resistors[0]);
      drawResistor(470, top, result.resistors[1]);
    } else if (topology === "parallel") {
      drawResistor(370, top - 35, result.resistors[0]);
      drawResistor(370, top + 35, result.resistors[1]);
    } else {
      drawResistor(245, top, result.resistors[0]);
      drawResistor(445, top - 35, result.resistors[1]);
      if (result.resistors[2]) {
        drawResistor(445, top + 35, result.resistors[2]);
      }
    }

    // 5. Animated Electron dots
    if (isLive) {
      animOffsetRef.current = (animOffsetRef.current + result.totalCurrent * 0.8) % 30;
      ctx.fillStyle = "#fef08a";
      const dotCount = 14;
      for (let i = 0; i < dotCount; i++) {
        const frac = (i * 30 + animOffsetRef.current) / (dotCount * 30);
        const px = left + frac * (right - left);
        ctx.beginPath();
        ctx.arc(px, bottom, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 6. HUD Multimeter badge
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(width / 2 - 140, bottom - 42, 280, 32, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      `Req = ${result.equivalentResistance} Ω   |   Itot = ${result.totalCurrent} A   |   Ptot = ${result.totalPower} W`,
      width / 2,
      bottom - 22
    );
  }, [voltage, r1, r2, r3, topology, isSwitchClosed]);

  useEffect(() => {
    let active = true;
    const animate = () => {
      if (!active) return;
      draw();
      animFrameIdRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      active = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [draw]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={680}
        height={380}
        className="w-full max-w-full h-auto"
        aria-label="Skematik Rangkaian Listrik DC Interaktif"
      />
      <div className="w-full bg-neutral-900/80 px-3 py-1.5 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
        <span>💡 Baterai menyuplai arus; lampu resistor berpendar sesuai daya disipasi</span>
        <span className="text-amber-400 font-medium">Partikel kuning = Aliran muatan listrik</span>
      </div>
    </div>
  );
}
