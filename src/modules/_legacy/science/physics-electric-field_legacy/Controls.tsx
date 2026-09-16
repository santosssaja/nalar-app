"use client";

import React from "react";
import { Slider } from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";

interface ControlsProps {
  q1: number;
  q2: number;
  distance: number;
  testCharge: number;
  testPosX: number;
  testPosY: number;
  showVectors: boolean;
  showPotential: boolean;
  onChange: (vars: {
    q1?: number;
    q2?: number;
    distance?: number;
    testCharge?: number;
    testPosX?: number;
    testPosY?: number;
    showVectors?: boolean;
    showPotential?: boolean;
  }) => void;
  onReset?: () => void;
}

export function Controls({
  q1,
  q2,
  distance,
  testCharge,
  testPosX,
  testPosY,
  showVectors,
  showPotential,
  onChange,
  onReset,
}: ControlsProps) {
  const handlePreset = (p: {
    q1: number;
    q2: number;
    distance: number;
    testCharge: number;
    testPosX: number;
    testPosY: number;
  }) => {
    onChange(p);
  };

  return (
    <div
      className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 space-y-4 text-neutral-200"
      aria-label="Panel Kontrol Parameter Medan Listrik"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
        <h3 className="text-sm font-semibold text-neutral-100">
          Parameter Muatan & Medan Listrik
        </h3>
        <div className="flex items-center gap-2">
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

      {/* Preset Buttons */}
      <div className="space-y-1.5">
        <span className="text-xs font-medium text-neutral-400">Konfigurasi Cepat:</span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handlePreset({ q1: 4, q2: -4, distance: 2.0, testCharge: 1, testPosX: 0, testPosY: 0.5 })
            }
            className="text-xs"
          >
            Dipol (+4 / -4 µC)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handlePreset({ q1: 4, q2: 4, distance: 2.0, testCharge: 1, testPosX: 0, testPosY: 0 })
            }
            className="text-xs"
          >
            Muatan Kembar (+4 / +4)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handlePreset({ q1: 6, q2: 2, distance: 2.0, testCharge: 1, testPosX: 0.35, testPosY: 0 })
            }
            className="text-xs"
          >
            Titik Seimbang (+6 / +2)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handlePreset({ q1: -3, q2: -3, distance: 1.5, testCharge: 1, testPosX: 0, testPosY: 1.0 })
            }
            className="text-xs"
          >
            Negatif Ganda (-3 / -3)
          </Button>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-3 pt-1">
        <Slider
          label={`Muatan q1: ${q1 > 0 ? "+" : ""}${q1} µC`}
          min={-8}
          max={8}
          step={1}
          value={q1}
          onChange={(val) => onChange({ q1: val })}
        />

        <Slider
          label={`Muatan q2: ${q2 > 0 ? "+" : ""}${q2} µC`}
          min={-8}
          max={8}
          step={1}
          value={q2}
          onChange={(val) => onChange({ q2: val })}
        />

        <Slider
          label={`Jarak Pemisah (r): ${distance.toFixed(2)} m`}
          min={0.8}
          max={3.5}
          step={0.1}
          value={distance}
          onChange={(val) => onChange({ distance: val })}
        />

        <div className="p-2.5 bg-neutral-950/60 rounded-lg border border-neutral-800/80 space-y-2.5">
          <div className="text-xs font-semibold text-amber-400">Muatan Uji Sensor:</div>
          <Slider
            label={`Muatan Uji qt: ${testCharge > 0 ? "+" : ""}${testCharge} µC`}
            min={-5}
            max={5}
            step={1}
            value={testCharge}
            onChange={(val) => onChange({ testCharge: val })}
          />
          <Slider
            label={`Posisi X Uji: ${testPosX.toFixed(2)} m`}
            min={-2.5}
            max={2.5}
            step={0.1}
            value={testPosX}
            onChange={(val) => onChange({ testPosX: val })}
          />
          <Slider
            label={`Posisi Y Uji: ${testPosY.toFixed(2)} m`}
            min={-1.8}
            max={1.8}
            step={0.1}
            value={testPosY}
            onChange={(val) => onChange({ testPosY: val })}
          />
        </div>

        {/* Display Toggles */}
        <div className="flex items-center gap-4 pt-1 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showVectors}
              onChange={(e) => onChange({ showVectors: e.target.checked })}
              className="rounded border-neutral-700 bg-neutral-950 text-indigo-500 focus:ring-0"
            />
            <span className="text-neutral-300">Vektor Medan (Grid)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showPotential}
              onChange={(e) => onChange({ showPotential: e.target.checked })}
              className="rounded border-neutral-700 bg-neutral-950 text-indigo-500 focus:ring-0"
            />
            <span className="text-neutral-300">Kontur Ekuipotensial</span>
          </label>
        </div>
      </div>
    </div>
  );
}
