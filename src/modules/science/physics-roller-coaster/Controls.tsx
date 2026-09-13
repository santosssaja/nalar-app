"use client";

import React from "react";
import { Play, RotateCcw, Volume2, Sliders } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";

export interface RollerCoasterControlsProps {
  initialHeight: number;
  onHeightChange: (v: number) => void;
  loopRadius: number;
  onRadiusChange: (v: number) => void;
  mass: number;
  onMassChange: (v: number) => void;
  gravity: number;
  onGravityChange: (v: number) => void;
  isSimulating: boolean;
  onToggleSimulate: () => void;
  onReset: () => void;
  onSpeak?: () => void;
}

const PLANETS = [
  { name: "Bumi", g: 9.8 },
  { name: "Bulan", g: 1.6 },
  { name: "Mars", g: 3.7 },
  { name: "Jupiter", g: 24.8 },
];

export function Controls({
  initialHeight,
  onHeightChange,
  loopRadius,
  onRadiusChange,
  mass,
  onMassChange,
  gravity,
  onGravityChange,
  isSimulating,
  onToggleSimulate,
  onReset,
  onSpeak,
}: RollerCoasterControlsProps) {
  return (
    <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5 text-neutral-200">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Parameter Lintasan Coaster
          </h4>
        </div>
        {onSpeak && (
          <button
            type="button"
            onClick={onSpeak}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
            aria-label="Dengarkan narasi audio"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Initial Height Slider */}
      <div className="space-y-2">
        <Slider
          label="Ketinggian Bukit Awal (h₀)"
          value={initialHeight}
          min={10}
          max={50}
          step={1}
          unit=" m"
          onChange={onHeightChange}
        />
        <div className="flex gap-1.5 pt-1">
          {[15, 20, 25, 30, 40].map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => onHeightChange(h)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition ${
                initialHeight === h
                  ? "bg-emerald-600 text-white font-bold"
                  : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {h}m
            </button>
          ))}
        </div>
      </div>

      {/* Loop Radius Slider */}
      <div className="space-y-2">
        <Slider
          label="Jari-jari Loop Vertikal (R)"
          value={loopRadius}
          min={5}
          max={15}
          step={1}
          unit=" m"
          onChange={onRadiusChange}
        />
        <div className="flex gap-1.5 pt-1">
          {[6, 8, 10, 12, 14].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onRadiusChange(r)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition ${
                loopRadius === r
                  ? "bg-indigo-600 text-white font-bold"
                  : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              R={r}m
            </button>
          ))}
        </div>
      </div>

      {/* Cart Mass Slider */}
      <div className="space-y-2">
        <Slider
          label="Massa Kereta (m)"
          value={mass}
          min={200}
          max={1000}
          step={50}
          unit=" kg"
          onChange={onMassChange}
        />
      </div>

      {/* Gravity Selection */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-neutral-400">Gravitasi Lingkungan (g):</span>
          <span className="font-mono font-bold text-amber-400">{gravity} m/s²</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {PLANETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => onGravityChange(p.g)}
              className={`py-1 rounded-lg text-xs font-semibold transition ${
                gravity === p.g
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Simulation Action Buttons */}
      <div className="pt-3 border-t border-neutral-800 flex items-center gap-2">
        <Button
          variant={isSimulating ? "secondary" : "primary"}
          size="md"
          className="flex-1"
          leftIcon={<Play className="w-4 h-4 fill-current" />}
          onClick={onToggleSimulate}
        >
          {isSimulating ? "Jeda Kereta" : "Luncurkan Kereta"}
        </Button>

        <Button
          variant="ghost"
          size="md"
          leftIcon={<RotateCcw className="w-4 h-4" />}
          onClick={onReset}
          aria-label="Reset posisi kereta"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
