"use client";

import React, { useRef, useEffect, useCallback } from "react";
import {
  calculateCoulombForce,
  calculateElectricFieldAtPoint,
  calculateElectricPotential,
  calculateTestChargeForce,
  generateFieldGrid,
  PointCharge,
} from "./engine";

interface CanvasProps {
  q1: number;
  q2: number;
  distance: number;
  testCharge: number;
  testPosX: number;
  testPosY: number;
  showVectors: boolean;
  showPotential: boolean;
  onPositionChange?: (pos: { testPosX: number; testPosY: number }) => void;
}

export function Canvas({
  q1,
  q2,
  distance,
  testCharge,
  testPosX,
  testPosY,
  showVectors,
  showPotential,
  onPositionChange,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);

  // Coordinate transforms: world bounds (-3 to +3 m in X, -2 to +2 m in Y)
  const toCanvasX = (wx: number, width: number) => width / 2 + (wx / 3.0) * (width / 2);
  const toCanvasY = (wy: number, height: number) => height / 2 - (wy / 2.0) * (height / 2);
  const toWorldX = (cx: number, width: number) => ((cx - width / 2) / (width / 2)) * 3.0;
  const toWorldY = (cy: number, height: number) => -((cy - height / 2) / (height / 2)) * 2.0;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, width, height);

    // 1. Grid
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    for (let gx = -3; gx <= 3; gx += 0.5) {
      const cx = toCanvasX(gx, width);
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();
    }
    for (let gy = -2; gy <= 2; gy += 0.5) {
      const cy = toCanvasY(gy, height);
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    const charges: PointCharge[] = [
      { id: "q1", q: q1, x: -distance / 2, y: 0 },
      { id: "q2", q: q2, x: distance / 2, y: 0 },
    ];

    // 2. Equipotential rings (approximate circular contours near charges)
    if (showPotential) {
      charges.forEach((c) => {
        if (c.q === 0) return;
        const cx = toCanvasX(c.x, width);
        const cy = toCanvasY(c.y, height);
        [20, 45, 75, 115].forEach((r) => {
          ctx.strokeStyle = c.q > 0 ? "rgba(239, 68, 68, 0.15)" : "rgba(59, 130, 246, 0.15)";
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        });
      });
    }

    // 3. Electric field vector grid
    if (showVectors) {
      const grid = generateFieldGrid(charges, {
        minX: -2.7,
        maxX: 2.7,
        minY: -1.7,
        maxY: 1.7,
        cols: 13,
        rows: 9,
      });

      grid.forEach((pt) => {
        const cx = toCanvasX(pt.x, width);
        const cy = toCanvasY(pt.y, height);
        const magNormalized = Math.min(1, pt.magnitude / 15000);
        const len = 7 + magNormalized * 10;

        ctx.strokeStyle = `rgba(165, 180, 252, ${0.15 + magNormalized * 0.55})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(cx - (pt.dirX * len) / 2, cy + (pt.dirY * len) / 2);
        ctx.lineTo(cx + (pt.dirX * len) / 2, cy - (pt.dirY * len) / 2);
        ctx.stroke();

        // Arrow head
        const tipX = cx + (pt.dirX * len) / 2;
        const tipY = cy - (pt.dirY * len) / 2;
        const angle = Math.atan2(-pt.dirY, pt.dirX);
        ctx.fillStyle = `rgba(165, 180, 252, ${0.25 + magNormalized * 0.6})`;
        ctx.beginPath();
        ctx.arc(tipX, tipY, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 4. Main charges q1 & q2
    charges.forEach((c, idx) => {
      const cx = toCanvasX(c.x, width);
      const cy = toCanvasY(c.y, height);
      const isPos = c.q > 0;
      const isZero = c.q === 0;

      // Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 6, cx, cy, 32);
      glowGrad.addColorStop(0, isPos ? "rgba(239, 68, 68, 0.8)" : isZero ? "rgba(100, 116, 139, 0.4)" : "rgba(59, 130, 246, 0.8)");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fill();

      // Solid core
      ctx.fillStyle = isPos ? "#ef4444" : isZero ? "#64748b" : "#3b82f6";
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Sign symbol
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(isPos ? "+" : isZero ? "0" : "−", cx, cy);

      // Label below
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "11px sans-serif";
      ctx.fillText(`q${idx + 1} = ${c.q > 0 ? "+" : ""}${c.q} µC`, cx, cy + 24);
    });

    // 5. Test Charge particle
    const tcx = toCanvasX(testPosX, width);
    const tcy = toCanvasY(testPosY, height);

    // Test charge body
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(tcx, tcy, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#fef08a";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 9px sans-serif";
    ctx.fillText("qt", tcx, tcy);

    // Force vector on test charge
    const fieldAtTest = calculateElectricFieldAtPoint(charges, { x: testPosX, y: testPosY });
    const forceAtTest = calculateTestChargeForce(fieldAtTest, testCharge);

    if (forceAtTest.forceMagnitude > 1e-6) {
      const forceAngle = Math.atan2(-forceAtTest.forceY, forceAtTest.forceX);
      const arrowLen = Math.min(50, Math.max(15, (forceAtTest.forceMagnitude * 1000) * 1.5));
      const arrowTipX = tcx + Math.cos(forceAngle) * arrowLen;
      const arrowTipY = tcy + Math.sin(forceAngle) * arrowLen;

      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(tcx, tcy);
      ctx.lineTo(arrowTipX, arrowTipY);
      ctx.stroke();

      // Arrowhead
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(arrowTipX, arrowTipY, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#34d399";
      ctx.font = "bold 10px sans-serif";
      ctx.fillText(`F = ${(forceAtTest.forceMagnitude * 1000).toFixed(1)} mN`, arrowTipX + 12, arrowTipY);
    }
  }, [q1, q2, distance, testCharge, testPosX, testPosY, showVectors, showPotential]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Pointer interactions for dragging test charge
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const tcx = toCanvasX(testPosX, canvas.width);
    const tcy = toCanvasY(testPosY, canvas.height);
    const dist = Math.hypot(x * scaleX - tcx, y * scaleY - tcy);

    if (dist < 28 || e.shiftKey) {
      isDraggingRef.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !onPositionChange) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const cy = (e.clientY - rect.top) * (canvas.height / rect.height);
    const wx = Math.max(-2.6, Math.min(2.6, toWorldX(cx, canvas.width)));
    const wy = Math.max(-1.8, Math.min(1.8, toWorldY(cy, canvas.height)));
    onPositionChange({ testPosX: Number(wx.toFixed(2)), testPosY: Number(wy.toFixed(2)) });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe noop
      }
    }
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={680}
        height={420}
        className="w-full max-w-full h-auto cursor-crosshair touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        aria-label="Kanvas Medan Listrik Interaktif. Seret atau klik untuk memindahkan muatan uji."
      />
      <div className="w-full bg-neutral-900/80 px-3 py-1.5 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
        <span>💡 Seret titik kuning (muatan uji qt) untuk menjelajahi medan listrik</span>
        <span className="text-emerald-400 font-medium">Panah hijau = Vektor gaya F</span>
      </div>
    </div>
  );
}
