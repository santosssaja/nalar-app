import React, { useId } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  formatValue?: (val: number) => string;
  onChange: (value: number) => void;
  helperText?: string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  formatValue,
  onChange,
  helperText,
  className,
  disabled,
  ...props
}: SliderProps) {
  const id = useId();
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = parseFloat(e.target.value);
    if (!isNaN(next)) {
      onChange(next);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const range = max - min;
    const largeStep = Math.max(step * 5, range / 10);

    if (e.key === "Home") {
      e.preventDefault();
      onChange(min);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(max);
    } else if (e.key === "PageUp") {
      e.preventDefault();
      onChange(Math.min(max, value + largeStep));
    } else if (e.key === "PageDown") {
      e.preventDefault();
      onChange(Math.max(min, value - largeStep));
    }
  };

  return (
    <div className={twMerge("w-full flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <label htmlFor={id} className="font-semibold text-neutral-200">
          {label}
        </label>
        <span
          className="font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20 text-xs"
          aria-live="polite"
        >
          {displayValue}
        </span>
      </div>

      <div className="relative flex items-center w-full py-1">
        <input
          id={id}
          type="range"
          role="slider"
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={displayValue}
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={clsx(
            "w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
            "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
          )}
          style={{
            background: `linear-gradient(to right, #6366f1 ${percentage}%, #27272a ${percentage}%)`,
          }}
          {...props}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
        <span>{min}{unit}</span>
        {helperText && <span className="text-neutral-500 font-sans">{helperText}</span>}
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}
