"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { calculateWave, calculateInterference, WaveDisplayMode } from "./engine";

export interface WaveCanvasProps {
  mode: WaveDisplayMode;
  amplitude: number;
  frequency: number;
  wavelength: number;
  phaseDeg: number;
  wave2Amplitude: number;
  wave2PhaseDeg: number;
  isSimulating: boolean;
}

export function Canvas({
  mode,
  amplitude,
  frequency,
  wavelength,
  phaseDeg,
  wave2Amplitude,
  wave2PhaseDeg,
  isSimulating,
}: WaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [time, setTime] = useState(0);

  const metrics1 = useMemo(
    () => calculateWave({ amplitude, frequency, wavelength, phaseDeg }),
    [amplitude, frequency, wavelength, phaseDeg]
  );

  const intMetrics = useMemo(
    () =>
      calculateInterference({
        wave1: { amplitude, frequency, wavelength, phaseDeg },
        wave2: { amplitude: wave2Amplitude, frequency, wavelength, phaseDeg: wave2PhaseDeg },
      }),
    [amplitude, frequency, wavelength, phaseDeg, wave2Amplitude, wave2PhaseDeg]
  );

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const midY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // 1. Equilibrium Axis Line (center)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(30, midY);
    ctx.lineTo(width - 30, midY);
    ctx.stroke();

    const scaleY = 110; // Pixels per meter of amplitude
    const meterToPx = 80; // Scale: 80 px per 1 meter of wavelength

    if (mode === "longitudinal") {
      // -------------------------------------------------------------
      // LONGITUDINAL SOUND WAVE (AIR COMPRESSION & RAREFACTION)
      // -------------------------------------------------------------
      const numColumns = 65;
      const colStep = (width - 80) / numColumns;
      const k = metrics1.waveNumber;
      const omega = metrics1.angularFrequency;

      for (let i = 0; i < numColumns; i++) {
        const xPosM = (i * colStep) / meterToPx;
        // Longitudinal displacement s(x, t) = A * cos(kx - wt)
        const disp = amplitude * Math.cos(k * xPosM - omega * time);
        const colX = 40 + i * colStep + disp * scaleY * 0.4;

        // Draw vertical band of particles
        const numDots = 8;
        ctx.fillStyle = "#38bdf8";
        for (let j = 0; j < numDots; j++) {
          const dotY = midY - 60 + (j * 120) / (numDots - 1);
          ctx.beginPath();
          ctx.arc(colX, dotY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.fillStyle = "#a3a3a3";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Mampatan (Rapat)", 180, midY + 90);
      ctx.fillText("Renggangan (Jarang)", 380, midY + 90);
    } else {
      // -------------------------------------------------------------
      // TRANSVERSAL WAVE (STRING PARTICLES & INTERFERENCE)
      // -------------------------------------------------------------
      const numPoints = 140;
      const startX = 40;
      const endX = width - 40;
      const stepPx = (endX - startX) / numPoints;

      if (mode === "interference") {
        // Wave 1 curve (cyan dashed)
        ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        for (let i = 0; i <= numPoints; i++) {
          const px = startX + i * stepPx;
          const xM = (px - startX) / meterToPx;
          const y1 = metrics1.displacementAt(xM, time);
          const py = midY - y1 * scaleY;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Wave 2 curve (amber dashed)
        ctx.strokeStyle = "rgba(245, 158, 11, 0.45)";
        ctx.beginPath();
        for (let i = 0; i <= numPoints; i++) {
          const px = startX + i * stepPx;
          const xM = (px - startX) / meterToPx;
          const y2 = intMetrics.metrics2.displacementAt(xM, time);
          const py = midY - y2 * scaleY;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Resultant Wave Curve (solid thick glowing line)
        ctx.strokeStyle = intMetrics.isDestructive ? "#a3a3a3" : "#818cf8";
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i <= numPoints; i++) {
          const px = startX + i * stepPx;
          const xM = (px - startX) / meterToPx;
          const yRes = intMetrics.resultantDisplacementAt(xM, time);
          const py = midY - yRes * scaleY;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      } else {
        // Single Traveling Wave with Beads
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i <= numPoints; i++) {
          const px = startX + i * stepPx;
          const xM = (px - startX) / meterToPx;
          const y = metrics1.displacementAt(xM, time);
          const py = midY - y * scaleY;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Draw particle beads along wave
        for (let i = 0; i <= numPoints; i += 5) {
          const px = startX + i * stepPx;
          const xM = (px - startX) / meterToPx;
          const y = metrics1.displacementAt(xM, time);
          const py = midY - y * scaleY;

          ctx.fillStyle = "#6366f1";
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
    }

    // -------------------------------------------------------------
    // HUD SPEEDOMETER & METRICS
    // -------------------------------------------------------------
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(16, 16, 230, 80);
    ctx.strokeStyle = "#262626";
    ctx.strokeRect(16, 16, 230, 80);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Cepat Rambat v: ${metrics1.waveSpeed} m/s`, 26, 36);
    ctx.fillText(`Panjang Gelombang λ: ${wavelength} m`, 26, 52);
    ctx.fillText(`Frekuensi f: ${frequency} Hz (T = ${metrics1.period} s)`, 26, 68);
    if (mode === "interference") {
      ctx.fillStyle = intMetrics.isDestructive ? "#f43f5e" : "#10b981";
      ctx.fillText(
        intMetrics.isDestructive ? "Fase: Destruktif (Meniadakan)" : "Fase: Konstruktif (Menguatkan)",
        26,
        84
      );
    }
  }, [mode, amplitude, frequency, wavelength, phaseDeg, wave2Amplitude, wave2PhaseDeg, time, metrics1, intMetrics]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl">
      <canvas
        ref={canvasRef}
        width={720}
        height={400}
        className="w-full h-auto block aspect-[9/5]"
        role="img"
        aria-label={`Visualisasi simulator gelombang mekanik mode ${mode} dengan frekuensi ${frequency} Hz dan panjang gelombang ${wavelength} meter.`}
      />
    </div>
  );
}
