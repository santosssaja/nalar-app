"use client";

import React from "react";
import { Play, RotateCcw, Volume2, Sliders, Activity, Disc } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { OscillatorMode } from "./engine";

export interface OscillatorControlsProps {
  mode: OscillatorMode;
  onModeChange: (m: OscillatorMode) => void;
  length: number;
  onLengthChange: (v: number) => void;
  initialAngleDeg: number;
  onAngleChange: (v: number) => void;
  gravity: number;
  onGravityChange: (v: number) => void;
  springConstant: number;
  onSpringChange: (v: number) => void;
  mass: number;
  onMassChange: (v: number) => void;
  amplitude: number;
  onAmplitudeChange: (v: number) => void;
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
  mode,
  onModeChange,
  length,
  onLengthChange,
  initialAngleDeg,
  onAngleChange,
  gravity,
  onGravityChange,
  springConstant,
  onSpringChange,
  mass,
  onMassChange,
  amplitude,
  onAmplitudeChange,
  isSimulating,
  onToggleSimulate,
  onReset,
  onSpeak,
}: OscillatorControlsProps) {
  return (
    <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5 text-neutral-200">
      {/* Header & Mode Switcher */}
      <div className="space-y-3 border-b border-neutral-800 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Kontrol Osilator
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

        {/* Mode toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-950 border border-neutral-800 rounded-xl">
          <button
            type="button"
            onClick={() => onModeChange("pendulum")}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              mode === "pendulum"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>Bandul Sederhana</span>
          </button>

          <button
            type="button"
            onClick={() => onModeChange("spring")}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              mode === "spring"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Pegas-Massa</span>
          </button>
        </div>
      </div>

      {mode === "pendulum" ? (
        /* Pendulum Controls */
        <div className="space-y-4">
          <Slider
            label="Panjang Tali Bandul (L)"
            value={length}
            min={0.2}
            max={3.0}
            step={0.05}
            unit=" m"
            onChange={onLengthChange}
          />

          <Slider
            label="Simpangan Awal (θ₀)"
            value={initialAngleDeg}
            min={5}
            max={45}
            step={1}
            unit="°"
            onChange={onAngleChange}
          />

          {/* Gravity Selector */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-neutral-400">
              <span>Gravitasi (g):</span>
              <span className="font-mono font-bold text-emerald-400">{gravity} m/s²</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {PLANETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => onGravityChange(p.g)}
                  className={`py-1 rounded-lg text-xs font-semibold transition ${
                    gravity === p.g
                      ? "bg-emerald-600 text-white"
                      : "bg-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Spring Controls */
        <div className="space-y-4">
          <Slider
            label="Konstanta Pegas (k)"
            value={springConstant}
            min={10}
            max={200}
            step={5}
            unit=" N/m"
            onChange={onSpringChange}
          />

          <Slider
            label="Massa Beban (m)"
            value={mass}
            min={0.2}
            max={5.0}
            step={0.1}
            unit=" kg"
            onChange={onMassChange}
          />

          <Slider
            label="Amplitudo Simpangan (A)"
            value={amplitude}
            min={0.05}
            max={0.8}
            step={0.05}
            unit=" m"
            onChange={onAmplitudeChange}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-3 border-t border-neutral-800 flex items-center gap-2">
        <Button
          variant={isSimulating ? "secondary" : "primary"}
          size="md"
          className="flex-1"
          leftIcon={<Play className="w-4 h-4 fill-current" />}
          onClick={onToggleSimulate}
        >
          {isSimulating ? "Jeda Osilasi" : "Mulai Osilasi"}
        </Button>

        <Button
          variant="ghost"
          size="md"
          leftIcon={<RotateCcw className="w-4 h-4" />}
          onClick={onReset}
          aria-label="Reset osilasi"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
