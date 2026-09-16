"use client";

import React from "react";
import { Play, RotateCcw, Volume2, Sparkles, Sliders } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";

export interface InclineControlsProps {
  angleDeg: number;
  onAngleChange: (v: number) => void;
  mass: number;
  onMassChange: (v: number) => void;
  frictionCoeff: number;
  onFrictionChange: (v: number) => void;
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
  angleDeg,
  onAngleChange,
  mass,
  onMassChange,
  frictionCoeff,
  onFrictionChange,
  gravity,
  onGravityChange,
  isSimulating,
  onToggleSimulate,
  onReset,
  onSpeak,
}: InclineControlsProps) {
  return (
    <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5 text-neutral-200">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Parameter Bidang Miring
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

      {/* Angle Slider */}
      <div className="space-y-2">
        <Slider
          label="Sudut Kemiringan (θ)"
          value={angleDeg}
          min={0}
          max={75}
          step={1}
          unit="°"
          onChange={onAngleChange}
        />
        <div className="flex gap-1.5 pt-1">
          {[0, 15, 30, 45, 60].map((deg) => (
            <button
              key={deg}
              type="button"
              onClick={() => onAngleChange(deg)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition ${
                Math.round(angleDeg) === deg
                  ? "bg-indigo-600 text-white font-bold"
                  : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {deg}°
            </button>
          ))}
        </div>
      </div>

      {/* Mass Slider */}
      <div className="space-y-2">
        <Slider
          label="Massa Balok (m)"
          value={mass}
          min={1}
          max={20}
          step={1}
          unit=" kg"
          onChange={onMassChange}
        />
      </div>

      {/* Friction Slider */}
      <div className="space-y-2">
        <Slider
          label="Koefisien Gesek (μ)"
          value={frictionCoeff}
          min={0}
          max={1}
          step={0.05}
          formatValue={(val) => val.toFixed(2)}
          onChange={onFrictionChange}
        />
        <div className="flex gap-1.5 pt-1">
          {[
            { label: "0 (Licin)", val: 0 },
            { label: "0.2 (Kayu)", val: 0.2 },
            { label: "0.5 (Kasar)", val: 0.5 },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onFrictionChange(item.val)}
              className={`px-2 py-0.5 rounded text-[10px] transition ${
                Math.abs(frictionCoeff - item.val) < 0.03
                  ? "bg-amber-600 text-white font-bold"
                  : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gravity Selection */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-neutral-400">Percepatan Gravitasi (g):</span>
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
                  ? "bg-emerald-600 text-white shadow-sm"
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
          {isSimulating ? "Jeda Simulasi" : "Luncurkan Balok"}
        </Button>

        <Button
          variant="ghost"
          size="md"
          leftIcon={<RotateCcw className="w-4 h-4" />}
          onClick={onReset}
          aria-label="Reset posisi balok"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
