"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { calculateInclineForces } from "./engine";

export interface InclineCanvasProps {
  angleDeg: number;
  mass: number;
  frictionCoeff: number;
  gravity: number;
  inclineLength: number;
  isSimulating: boolean;
  onSimulationEnd?: () => void;
}

export function Canvas({
  angleDeg,
  mass,
  frictionCoeff,
  gravity,
  inclineLength,
  isSimulating,
  onSimulationEnd,
}: InclineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Position progress on ramp from 0 (top) to 1 (bottom)
  const [progress, setProgress] = useState(0);

  const forces = useMemo(
    () =>
      calculateInclineForces({
        angleDeg,
        mass,
        frictionCoeff,
        gravity,
        inclineLength,
      }),
    [angleDeg, mass, frictionCoeff, gravity, inclineLength]
  );

  // Reset block position whenever parameters change or simulation stops
  useEffect(() => {
    if (!isSimulating) {
      setProgress(0);
    }
  }, [angleDeg, mass, frictionCoeff, gravity, isSimulating]);

  // Animation frame loop
  useEffect(() => {
    if (!isSimulating || !forces.isSliding || forces.acceleration <= 0) return;

    let animId: number;
    let startTime: number | null = null;
    const totalDurationMs = Math.max(0.6, forces.timeToBottom) * 1000;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      // s = 0.5 * a * t^2 -> progress = s / L = (t / T)^2
      const tNorm = Math.min(1, elapsed / totalDurationMs);
      const currentProg = tNorm * tNorm;

      setProgress(currentProg);

      if (tNorm < 1) {
        animId = requestAnimationFrame(step);
      } else {
        onSimulationEnd?.();
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isSimulating, forces, onSimulationEnd]);

  // Render to 2D Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Coordinate settings for ramp
    const originX = 60;
    const originY = height - 60;
    const rampBaseLength = width - 140;
    const rad = (angleDeg * Math.PI) / 180;
    const rampHeight = Math.min(height - 100, rampBaseLength * Math.tan(rad));
    const topX = originX;
    const topY = originY - rampHeight;
    const bottomX = originX + rampBaseLength;
    const bottomY = originY;

    // 1. Draw Grid Lines (subtle)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
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

    // 2. Draw Incline Triangle Wedge
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(topX, topY);
    ctx.lineTo(bottomX, bottomY);
    ctx.closePath();
    ctx.fillStyle = "rgba(99, 102, 241, 0.12)";
    ctx.fill();
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Base ground line
    ctx.beginPath();
    ctx.moveTo(20, originY);
    ctx.lineTo(width - 20, originY);
    ctx.strokeStyle = "#404040";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Angle arc at bottom corner
    if (angleDeg > 2) {
      ctx.beginPath();
      ctx.arc(bottomX, bottomY, 40, Math.PI, Math.PI + rad);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText(`θ = ${Math.round(angleDeg)}°`, bottomX - 70, bottomY - 12);
    }

    // 3. Block on the ramp
    const rampHypotenuse = Math.hypot(bottomX - topX, bottomY - topY);
    const boxSize = 36 + Math.min(18, mass);
    const currentDist = (rampHypotenuse - boxSize * 1.5) * progress + boxSize * 0.8;
    const cosRamp = (bottomX - topX) / rampHypotenuse;
    const sinRamp = (bottomY - topY) / rampHypotenuse;

    const boxCenterX = topX + currentDist * cosRamp;
    const boxCenterY = topY + currentDist * sinRamp;

    // Draw rotated box
    ctx.save();
    ctx.translate(boxCenterX, boxCenterY);
    ctx.rotate(rad);

    ctx.fillStyle = "#1e1b4b";
    ctx.strokeStyle = forces.isSliding ? "#38bdf8" : "#f59e0b";
    ctx.lineWidth = 2;
    ctx.fillRect(-boxSize / 2, -boxSize, boxSize, boxSize);
    ctx.strokeRect(-boxSize / 2, -boxSize, boxSize, boxSize);

    // Box label
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${mass} kg`, 0, -boxSize / 2 + 4);

    // 4. Force Vectors (drawn in rotated frame)
    const arrow = (x1: number, y1: number, x2: number, y2: number, color: string, label: string) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Arrow head
      const headLen = 7;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Text label
      ctx.fillStyle = color;
      ctx.font = "bold 10px monospace";
      ctx.fillText(label, x2 + 8 * Math.cos(angle), y2 + 8 * Math.sin(angle));
    };

    // Normal force N (perpendicular up: y is negative)
    const nLen = Math.min(80, Math.max(20, forces.normalForce * 0.4));
    arrow(0, -boxSize / 2, 0, -boxSize / 2 - nLen, "#10b981", `N=${forces.normalForce}N`);

    // Friction force f_k (along surface up: x is negative)
    if (forces.frictionForce > 0.5) {
      const fLen = Math.min(70, Math.max(15, forces.frictionForce * 0.5));
      arrow(-boxSize / 2, -boxSize / 2, -boxSize / 2 - fLen, -boxSize / 2, "#f59e0b", `f=${forces.frictionForce}N`);
    }

    // Parallel weight component W_par (along surface down: x is positive)
    if (forces.weightParallel > 0.5) {
      const wParLen = Math.min(75, Math.max(15, forces.weightParallel * 0.5));
      arrow(boxSize / 2, -boxSize / 2, boxSize / 2 + wParLen, -boxSize / 2, "#38bdf8", `W∥=${forces.weightParallel}N`);
    }

    // Weight W (in world coordinates straight down)
    ctx.restore();

    ctx.save();
    ctx.translate(boxCenterX, boxCenterY);
    const wLen = Math.min(85, Math.max(25, forces.weight * 0.4));
    arrow(0, -boxSize / 2, 0, -boxSize / 2 + wLen, "#f43f5e", `W=${forces.weight}N`);
    ctx.restore();

    // 5. HUD Status & Speedometer
    ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
    ctx.fillRect(16, 16, 210, 80);
    ctx.strokeStyle = "#262626";
    ctx.strokeRect(16, 16, 210, 80);

    ctx.fillStyle = "#a3a3a3";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Status: ${forces.isSliding ? "Meluncur Turun" : "Diam (Statis)"}`, 26, 36);
    ctx.fillText(`Percepatan a: ${forces.acceleration} m/s²`, 26, 54);
    ctx.fillText(
      `Kecepatan v: ${(forces.finalVelocity * Math.sqrt(progress)).toFixed(1)} / ${forces.finalVelocity} m/s`,
      26,
      72
    );
    ctx.fillText(`Waktu tempuh t: ${forces.timeToBottom === Infinity ? "∞" : `${forces.timeToBottom} s`}`, 26, 90);
  }, [angleDeg, mass, forces, progress]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl">
      <canvas
        ref={canvasRef}
        width={720}
        height={400}
        className="w-full h-auto block aspect-[9/5]"
        role="img"
        aria-label={`Visualisasi interaktif bidang miring sudut ${angleDeg} derajat dengan balok massa ${mass} kg.`}
      />
    </div>
  );
}
