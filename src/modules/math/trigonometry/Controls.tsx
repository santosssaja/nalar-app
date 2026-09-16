"use client";

import React from "react";

interface ControlsProps {
  state: { angleDeg: number; radius: number };
  onChange: (newState: { angleDeg: number; radius: number }) => void;
}

export function Controls({ state, onChange }: ControlsProps) {
  const updateAngle = (val: number) => {
    onChange({ ...state, angleDeg: val });
  };

  const specialAngles = [0, 30, 45, 60, 90, 180, 270, 360];

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-4">
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <label htmlFor="ctrl-angle" className="text-purple-400 font-bold">
            Sudut Putaran θ: {state.angleDeg}° ({( (state.angleDeg * Math.PI) / 180 ).toFixed(2)} rad)
          </label>
          <span className="text-neutral-500 font-mono">[0°, 360°]</span>
        </div>
        <input
          id="ctrl-angle"
          type="range"
          min="0"
          max="360"
          step="5"
          value={state.angleDeg}
          onChange={(e) => updateAngle(parseFloat(e.target.value))}
          className="w-full accent-purple-400 cursor-pointer h-2 bg-neutral-800 rounded-lg appearance-none"
          aria-label="Sudut Putaran Derajat"
        />
      </div>

      {/* Special angle presets */}
      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-800 text-xs items-center">
        <span className="text-neutral-400 font-medium mr-1">Sudut Istimewa:</span>
        {specialAngles.map((ang) => (
          <button
            key={ang}
            type="button"
            onClick={() => updateAngle(ang)}
            className={`px-2 py-0.5 rounded-md font-mono transition text-xs ${
              state.angleDeg === ang
                ? "bg-purple-600 text-white font-bold"
                : "bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
            }`}
          >
            {ang}°
          </button>
        ))}
      </div>
    </div>
  );
}
