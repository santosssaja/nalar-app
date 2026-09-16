"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { calculateRollerCoaster } from "./engine";

export interface RollerCoasterCanvasProps {
  initialHeight: number;
  loopRadius: number;
  mass: number;
  gravity: number;
  isSimulating: boolean;
  onSimulationEnd?: () => void;
}

export function Canvas({
  initialHeight,
  loopRadius,
  mass,
  gravity,
  isSimulating,
  onSimulationEnd,
}: RollerCoasterCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);

  const metrics = useMemo(
    () =>
      calculateRollerCoaster({
        initialHeight,
        loopRadius,
        mass,
        gravity,
      }),
    [initialHeight, loopRadius, mass, gravity]
  );

  useEffect(() => {
    if (!isSimulating) {
      setProgress(0);
    }
  }, [initialHeight, loopRadius, mass, gravity, isSimulating]);

  // Animation Loop
  useEffect(() => {
    if (!isSimulating) return;

    let animId: number;
    let lastTime: number | null = null;
    const durationMs = 5500; // 5.5 seconds for complete ride

    const step = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;
      const tNorm = elapsed / durationMs;

      if (tNorm <= 1) {
        setProgress(tNorm);
        animId = requestAnimationFrame(step);
      } else {
        setProgress(1);
        onSimulationEnd?.();
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isSimulating, onSimulationEnd]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const groundY = height - 50;

    ctx.clearRect(0, 0, width, height);

    // Scaling factors
    const maxTrackHeightM = 55;
    const pxPerMeter = (height - 120) / maxTrackHeightM;

    // Geometric landmarks
    const startX = 50;
    const startY = groundY - initialHeight * pxPerMeter;

    const valley1X = 220;
    const valley1Y = groundY;

    const loopCenterX = 350;
    const loopRadiusPx = loopRadius * pxPerMeter;
    const loopCenterY = groundY - loopRadiusPx;

    const valley2X = 480;
    const valley2Y = groundY;

    const hill2X = 580;
    const hill2Y = groundY - Math.min(initialHeight * 0.6, 25) * pxPerMeter;

    const endX = width - 40;
    const endY = groundY - 10;

    // 1. Grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    for (let y = groundY; y >= 60; y -= 10 * pxPerMeter) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 2. Track Structure Support Pylons
    ctx.strokeStyle = "rgba(115, 115, 115, 0.3)";
    ctx.lineWidth = 2;
    [startX, 130, valley1X, loopCenterX, valley2X, hill2X, endX].forEach((px) => {
      ctx.beginPath();
      ctx.moveTo(px, groundY);
      ctx.lineTo(px, groundY - 150);
      ctx.stroke();
    });

    // 3. Ground Level
    ctx.beginPath();
    ctx.moveTo(20, groundY);
    ctx.lineTo(width - 20, groundY);
    ctx.strokeStyle = "#404040";
    ctx.lineWidth = 3;
    ctx.stroke();

    // 4. Roller Coaster Track Rails
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 4;
    ctx.beginPath();

    // Section A: First Drop
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(startX + 70, startY, valley1X - 60, valley1Y, valley1X, valley1Y);

    // Section B: Into the Loop
    ctx.lineTo(loopCenterX, groundY);
    ctx.stroke();

    // Section C: Circular Loop (drawn as arc)
    ctx.beginPath();
    ctx.arc(loopCenterX, loopCenterY, loopRadiusPx, 0.5 * Math.PI, 2.5 * Math.PI, false);
    ctx.strokeStyle = metrics.canCompleteLoop ? "#10b981" : "#f43f5e";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Section D: Out of Loop to Hill 2 and End
    ctx.beginPath();
    ctx.moveTo(loopCenterX, groundY);
    ctx.lineTo(valley2X, valley2Y);
    ctx.bezierCurveTo(valley2X + 40, valley2Y, hill2X - 40, hill2Y, hill2X, hill2Y);
    ctx.bezierCurveTo(hill2X + 40, hill2Y, endX - 30, endY, endX, endY);
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 4;
    ctx.stroke();

    // 5. Calculate Cart Position & Angle along path
    let cartX = startX;
    let cartY = startY;
    let currentHeightM = initialHeight;

    if (progress <= 0.3) {
      // Phase 1: Hill 1 drop (t from 0 to 0.3)
      const u = progress / 0.3;
      cartX = startX + (valley1X - startX) * u;
      cartY = startY + (valley1Y - startY) * (u * u);
      currentHeightM = Math.max(0, initialHeight * (1 - u * u));
    } else if (progress <= 0.65) {
      // Phase 2: Inside the Loop (t from 0.3 to 0.65)
      const u = (progress - 0.3) / 0.35;
      const angle = 0.5 * Math.PI + u * 2 * Math.PI;
      cartX = loopCenterX + loopRadiusPx * Math.cos(angle);
      cartY = loopCenterY + loopRadiusPx * Math.sin(angle);
      currentHeightM = Math.max(0, (groundY - cartY) / pxPerMeter);
    } else {
      // Phase 3: Out to hill 2 and finish (t from 0.65 to 1.0)
      const u = (progress - 0.65) / 0.35;
      cartX = loopCenterX + (endX - loopCenterX) * u;
      const hill2Profile = Math.sin(u * Math.PI);
      cartY = groundY - hill2Profile * (groundY - hill2Y);
      currentHeightM = Math.max(0, (groundY - cartY) / pxPerMeter);
    }

    // Check if cart falls off loop
    const isFallingOff = !metrics.canCompleteLoop && progress > 0.42 && progress < 0.55;

    // 6. Draw Coaster Cart
    ctx.save();
    ctx.translate(cartX, cartY);
    ctx.fillStyle = isFallingOff ? "#f43f5e" : "#38bdf8";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.fillRect(-12, -14, 24, 12);
    ctx.strokeRect(-12, -14, 24, 12);

    // Wheels
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(-8, -2, 3, 0, Math.PI * 2);
    ctx.arc(8, -2, 3, 0, Math.PI * 2);
    ctx.fill();

    if (isFallingOff) {
      ctx.fillStyle = "#f43f5e";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("JATUH!", 16, -10);
    }
    ctx.restore();

    // 7. Dynamic Energy Bar Chart HUD
    const { ep, ek, speed } = metrics.energyAtHeight(currentHeightM);
    const hudW = 220;
    const hudH = 110;
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(16, 16, hudW, hudH);
    ctx.strokeStyle = "#262626";
    ctx.strokeRect(16, 16, hudW, hudH);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText(`Kelajuan v: ${speed.toFixed(1)} m/s`, 26, 36);
    ctx.fillText(`Ketinggian h: ${currentHeightM.toFixed(1)} m`, 26, 52);

    // Energy Bars
    const barW = 190;
    const barH = 10;
    const totalE = metrics.totalEnergy || 1;
    const epFrac = Math.min(1, Math.max(0, ep / totalE));
    const ekFrac = Math.min(1, Math.max(0, ek / totalE));

    // Ep bar (blue)
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(26, 62, barW * epFrac, barH);
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.strokeRect(26, 62, barW, barH);

    // Ek bar (green)
    ctx.fillStyle = "#10b981";
    ctx.fillRect(26, 78, barW * ekFrac, barH);
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.strokeRect(26, 78, barW, barH);

    ctx.font = "9px monospace";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText(`EP: ${(ep / 1000).toFixed(1)} kJ`, 26, 102);
    ctx.fillStyle = "#10b981";
    ctx.fillText(`EK: ${(ek / 1000).toFixed(1)} kJ`, 110, 102);
  }, [initialHeight, loopRadius, metrics, progress]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl">
      <canvas
        ref={canvasRef}
        width={720}
        height={400}
        className="w-full h-auto block aspect-[9/5]"
        role="img"
        aria-label={`Visualisasi interaktif roller coaster ketinggian bukit ${initialHeight} meter dan radius loop ${loopRadius} meter.`}
      />
    </div>
  );
}
