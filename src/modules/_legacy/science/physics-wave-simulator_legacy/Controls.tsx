"use client";

import React from "react";
import { Play, RotateCcw, Volume2, Sliders, Waves, Radio, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { WaveDisplayMode } from "./engine";

export interface WaveControlsProps {
  mode: WaveDisplayMode;
  onModeChange: (m: WaveDisplayMode) => void;
  amplitude: number;
  onAmplitudeChange: (v: number) => void;
  frequency: number;
  onFrequencyChange: (v: number) => void;
  wavelength: number;
  onWavelengthChange: (v: number) => void;
  wave2Amplitude: number;
  onWave2AmplitudeChange: (v: number) => void;
  wave2PhaseDeg: number;
  onWave2PhaseChange: (v: number) => void;
  isSimulating: boolean;
  onToggleSimulate: () => void;
  onReset: () => void;
  onSpeak?: () => void;
}

export function Controls({
  mode,
  onModeChange,
  amplitude,
  onAmplitudeChange,
  frequency,
  onFrequencyChange,
  wavelength,
  onWavelengthChange,
  wave2Amplitude,
  onWave2AmplitudeChange,
  wave2PhaseDeg,
  onWave2PhaseChange,
  isSimulating,
  onToggleSimulate,
  onReset,
  onSpeak,
}: WaveControlsProps) {
  return (
    <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5 text-neutral-200">
      {/* Mode Selector */}
      <div className="space-y-3 border-b border-neutral-800 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Mode Gelombang
            </h4>
          </div>
          {onSpeak && (
            <button
              type="button"
              onClick={onSpeak}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition cursor-pointer"
              aria-label="Dengarkan narasi audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-950 border border-neutral-800 rounded-xl">
          <button
            type="button"
            onClick={() => onModeChange("single")}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              mode === "single"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>Tunggal</span>
          </button>

          <button
            type="button"
            onClick={() => onModeChange("interference")}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              mode === "interference"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Interferensi</span>
          </button>

          <button
            type="button"
            onClick={() => onModeChange("longitudinal")}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              mode === "longitudinal"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Suara</span>
          </button>
        </div>
      </div>

      {/* Primary Wave Parameters */}
      <div className="space-y-4">
        <Slider
          label={mode === "interference" ? "Amplitudo Gelombang 1 (A₁)" : "Amplitudo Gelombang (A)"}
          value={amplitude}
          min={0.1}
          max={1.0}
          step={0.05}
          unit=" m"
          onChange={onAmplitudeChange}
        />

        <Slider
          label="Frekuensi Sumber (f)"
          value={frequency}
          min={0.5}
          max={4.0}
          step={0.1}
          unit=" Hz"
          onChange={onFrequencyChange}
        />

        <Slider
          label="Panjang Gelombang (λ)"
          value={wavelength}
          min={1.0}
          max={8.0}
          step={0.5}
          unit=" m"
          onChange={onWavelengthChange}
        />
      </div>

      {/* Second Wave Controls for Interference */}
      {mode === "interference" && (
        <div className="pt-3 border-t border-neutral-800/80 space-y-4">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
            Gelombang Kedua (Superposisi):
          </span>

          <Slider
            label="Amplitudo Gelombang 2 (A₂)"
            value={wave2Amplitude}
            min={0.1}
            max={1.0}
            step={0.05}
            unit=" m"
            onChange={onWave2AmplitudeChange}
          />

          <div className="space-y-2">
            <Slider
              label="Beda Fase (Δφ)"
              value={wave2PhaseDeg}
              min={0}
              max={360}
              step={15}
              unit="°"
              onChange={onWave2PhaseChange}
            />
            <div className="flex gap-1.5 pt-1">
              {[
                { label: "0° (Konstruktif)", val: 0 },
                { label: "90°", val: 90 },
                { label: "180° (Destruktif)", val: 180 },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onWave2PhaseChange(item.val)}
                  className={`px-2 py-0.5 rounded text-[10px] transition ${
                    wave2PhaseDeg === item.val
                      ? "bg-indigo-600 text-white font-bold"
                      : "bg-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
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
          {isSimulating ? "Jeda Rambatan" : "Rambatkan Gelombang"}
        </Button>

        <Button
          variant="ghost"
          size="md"
          leftIcon={<RotateCcw className="w-4 h-4" />}
          onClick={onReset}
          aria-label="Reset gelombang"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
