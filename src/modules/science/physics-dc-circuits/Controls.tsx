"use client";

import React from "react";
import { Slider } from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";
import { CircuitTopology } from "./engine";

interface ControlsProps {
  voltage: number;
  r1: number;
  r2: number;
  r3: number;
  topology: CircuitTopology;
  isSwitchClosed: boolean;
  onChange: (vars: {
    voltage?: number;
    r1?: number;
    r2?: number;
    r3?: number;
    topology?: CircuitTopology;
    isSwitchClosed?: boolean;
  }) => void;
  onReset?: () => void;
}

export function Controls({
  voltage,
  r1,
  r2,
  r3,
  topology,
  isSwitchClosed,
  onChange,
  onReset,
}: ControlsProps) {
  const handlePreset = (p: {
    voltage: number;
    r1: number;
    r2: number;
    r3?: number;
    topology: CircuitTopology;
  }) => {
    onChange({ ...p, isSwitchClosed: true });
  };

  return (
    <div
      className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 space-y-4 text-neutral-200"
      aria-label="Panel Kontrol Parameter Sirkuit DC"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
        <h3 className="text-sm font-semibold text-neutral-100">
          Parameter Rangkaian & Sakelar
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange({ isSwitchClosed: !isSwitchClosed })}
            className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors ${
              isSwitchClosed
                ? "bg-emerald-950/60 border-emerald-700/80 text-emerald-300"
                : "bg-rose-950/60 border-rose-700/80 text-rose-300"
            }`}
          >
            {isSwitchClosed ? "Sakelar ON (Tertutup)" : "Sakelar OFF (Terbuka)"}
          </button>
          {onReset && (
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="text-xs text-neutral-400 hover:text-neutral-200"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Topology Tabs */}
      <div className="space-y-1.5">
        <span className="text-xs font-medium text-neutral-400">Susunan Sirkuit (Topologi):</span>
        <div className="grid grid-cols-3 gap-2">
          {(["series", "parallel", "mixed"] as CircuitTopology[]).map((top) => (
            <Button
              key={top}
              variant={topology === top ? "primary" : "outline"}
              size="sm"
              onClick={() => onChange({ topology: top })}
              className="text-xs capitalize"
            >
              {top === "series" ? "Seri" : top === "parallel" ? "Paralel" : "Campuran"}
            </Button>
          ))}
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-1.5">
        <span className="text-xs font-medium text-neutral-400">Konfigurasi Cepat:</span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreset({ voltage: 12, r1: 4, r2: 8, topology: "series" })}
            className="text-xs"
          >
            Seri (12V, 4Ω + 8Ω)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreset({ voltage: 12, r1: 6, r2: 6, topology: "parallel" })}
            className="text-xs"
          >
            Paralel (12V, 6Ω // 6Ω)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreset({ voltage: 12, r1: 2, r2: 6, r3: 3, topology: "mixed" })}
            className="text-xs"
          >
            Campuran (12V, 2Ω + 6//3Ω)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreset({ voltage: 24, r1: 12, r2: 12, topology: "series" })}
            className="text-xs"
          >
            Tegangan Tinggi (24V)
          </Button>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-3 pt-1">
        <Slider
          label={`Tegangan Baterai (V): ${voltage} Volt`}
          min={0}
          max={24}
          step={1}
          value={voltage}
          onChange={(val) => onChange({ voltage: val })}
        />

        <Slider
          label={`Hambatan R1: ${r1} Ω`}
          min={1}
          max={20}
          step={1}
          value={r1}
          onChange={(val) => onChange({ r1: val })}
        />

        <Slider
          label={`Hambatan R2: ${r2} Ω`}
          min={1}
          max={20}
          step={1}
          value={r2}
          onChange={(val) => onChange({ r2: val })}
        />

        {topology === "mixed" && (
          <Slider
            label={`Hambatan R3 (Paralel dengan R2): ${r3} Ω`}
            min={1}
            max={20}
            step={1}
            value={r3}
            onChange={(val) => onChange({ r3: val })}
          />
        )}
      </div>
    </div>
  );
}
