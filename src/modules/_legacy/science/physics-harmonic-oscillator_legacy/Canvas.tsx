"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { calculatePendulum, calculateSpring, OscillatorMode } from "./engine";

export interface OscillatorCanvasProps {
  mode: OscillatorMode;
  length: number;
  initialAngleDeg: number;
  gravity: number;
  springConstant: number;
  mass: number;
  amplitude: number;
  isSimulating: boolean;
}

export function Canvas({
  mode,
  length,
  initialAngleDeg,
  gravity,
  springConstant,
  mass,
  amplitude,
  isSimulating,
}: OscillatorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [time, setTime] = useState(0);

  const pMetrics = useMemo(
    () => calculatePendulum({ length, initialAngleDeg, gravity }),
    [length, initialAngleDeg, gravity]
  );

  const sMetrics = useMemo(
    () => calculateSpring({ springConstant, mass, amplitude }),
    [springConstant, mass, amplitude]
  );

  // Animation frame loop
  useEffect(() => {
    if (!isSimulating) return;

    let animId: number;
    let lastStamp: number | null = null;

    const step = (stamp: number) => {
      if (!lastStamp) lastStamp = stamp;
      const dt = (stamp - lastStamp) / 1000;
      lastStamp = stamp;

      setTime((prev) => prev + dt);
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isSimulating]);

  // Reset time when mode changes
  useEffect(() => {
    setTime(0);
  }, [mode]);

  // Render 2D Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Separator line between visualizer and wave tracker
    const splitX = 300;
    ctx.strokeStyle = "#262626";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(splitX, 0);
    ctx.lineTo(splitX, height);
    ctx.stroke();

    // -------------------------------------------------------------
    // LEFT PANE: PHYSICAL OSCILLATOR VISUALIZER
    // -------------------------------------------------------------
    const leftCenterX = splitX / 2;

    if (mode === "pendulum") {
      const pivotY = 50;
      const maxVisualLength = height - 120;
      const visualLength = Math.min(maxVisualLength, 80 + length * 50);
      const currentTheta = pMetrics.angleAtTime(time);

      const bobX = leftCenterX + visualLength * Math.sin(currentTheta);
      const bobY = pivotY + visualLength * Math.cos(currentTheta);

      // Pivot support beam
      ctx.fillStyle = "#525252";
      ctx.fillRect(leftCenterX - 40, pivotY - 8, 80, 8);

      // Arc path guide
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(leftCenterX, pivotY, visualLength, 0.5 * Math.PI - 0.7, 0.5 * Math.PI + 0.7);
      ctx.stroke();
      ctx.setLineDash([]);

      // Pendulum string
      ctx.strokeStyle = "#a3a3a3";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(leftCenterX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Pivot circle
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(leftCenterX, pivotY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Bob sphere
      ctx.fillStyle = "#6366f1";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(bobX, bobY, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Velocity arrow
      const vTan = -visualLength * pMetrics.angularVelocityAtTime(time) * 0.15;
      if (Math.abs(vTan) > 1) {
        const vAngle = currentTheta + Math.PI / 2;
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(bobX, bobY);
        ctx.lineTo(bobX + vTan * Math.cos(vAngle), bobY + vTan * Math.sin(vAngle));
        ctx.stroke();
      }
    } else {
      // Spring Oscillator
      const ceilingY = 45;
      const eqY = height / 2 + 10;
      const visualAmp = Math.min(100, amplitude * 120);
      const currentDisp = visualAmp * Math.cos(sMetrics.angularFrequency * time);
      const bobY = eqY + currentDisp;
      const bobSize = 34 + Math.min(16, mass * 3);

      // Ceiling mount
      ctx.fillStyle = "#525252";
      ctx.fillRect(leftCenterX - 45, ceilingY - 8, 90, 8);

      // Equilibrium line (dashed)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(30, eqY);
      ctx.lineTo(splitX - 30, eqY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Zigzag Spring Coils
      const numCoils = 14;
      const springHeight = bobY - ceilingY - bobSize / 2;
      const coilStep = springHeight / numCoils;
      const coilWidth = 24;

      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(leftCenterX, ceilingY);

      for (let i = 1; i < numCoils; i++) {
        const cx = leftCenterX + (i % 2 === 0 ? coilWidth : -coilWidth);
        const cy = ceilingY + i * coilStep;
        ctx.lineTo(cx, cy);
      }
      ctx.lineTo(leftCenterX, bobY - bobSize / 2);
      ctx.stroke();

      // Mass Block
      ctx.fillStyle = "#1e1b4b";
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.fillRect(leftCenterX - bobSize / 2, bobY - bobSize / 2, bobSize, bobSize);
      ctx.strokeRect(leftCenterX - bobSize / 2, bobY - bobSize / 2, bobSize, bobSize);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${mass} kg`, leftCenterX, bobY + 4);
    }

    // -------------------------------------------------------------
    // RIGHT PANE: ROLLING SINUSOIDAL WAVEFORM TRACKER
    // -------------------------------------------------------------
    const waveYCenter = height / 2;
    const waveW = width - splitX - 30;
    const waveStartX = splitX + 20;

    // Center equilibrium axis
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(waveStartX, waveYCenter);
    ctx.lineTo(waveStartX + waveW, waveYCenter);
    ctx.stroke();

    // Waveform curve: x(t) over 3 seconds history
    const waveScale = mode === "pendulum" ? 110 : Math.min(100, amplitude * 120);
    const omega = mode === "pendulum" ? pMetrics.angularFrequency : sMetrics.angularFrequency;

    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const samplePoints = 120;
    for (let i = 0; i <= samplePoints; i++) {
      const frac = i / samplePoints;
      const tSample = time - (1 - frac) * 3.5;
      const val = Math.cos(omega * tSample);
      const px = waveStartX + frac * waveW;
      const py = waveYCenter - val * waveScale;

      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Current position marker point
    const currentVal = Math.cos(omega * time);
    const currentMarkerX = waveStartX + waveW;
    const currentMarkerY = waveYCenter - currentVal * waveScale;

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(currentMarkerX, currentMarkerY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Connect marker to left bob
    ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(0, currentMarkerY);
    ctx.lineTo(width, currentMarkerY);
    ctx.stroke();
    ctx.setLineDash([]);

    // -------------------------------------------------------------
    // HUD READOUTS
    // -------------------------------------------------------------
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(splitX + 16, 16, 210, 64);
    ctx.strokeStyle = "#262626";
    ctx.strokeRect(splitX + 16, 16, 210, 64);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "left";
    const period = mode === "pendulum" ? pMetrics.period : sMetrics.period;
    const freq = mode === "pendulum" ? pMetrics.frequency : sMetrics.frequency;
    ctx.fillText(`Periode T: ${period} s`, splitX + 26, 36);
    ctx.fillText(`Frekuensi f: ${freq} Hz`, splitX + 26, 52);
    ctx.fillText(`Fase ωt: ${(omega * time).toFixed(1)} rad`, splitX + 26, 68);
  }, [mode, length, initialAngleDeg, gravity, springConstant, mass, amplitude, time, pMetrics, sMetrics]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl">
      <canvas
        ref={canvasRef}
        width={720}
        height={400}
        className="w-full h-auto block aspect-[9/5]"
        role="img"
        aria-label={`Visualisasi osilator harmonik sederhana mode ${mode} dengan grafik jejak gelombang posisi.`}
      />
    </div>
  );
}
