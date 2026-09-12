import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
  showValueLabel?: boolean;
  variant?: "indigo" | "emerald" | "amber" | "gradient";
  size?: "sm" | "md" | "lg";
}

const variantGradients = {
  indigo: "bg-gradient-to-r from-indigo-500 to-indigo-400",
  emerald: "bg-gradient-to-r from-emerald-500 to-teal-400",
  amber: "bg-gradient-to-r from-amber-500 to-yellow-400",
  gradient: "bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-400",
};

const heightSizes = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValueLabel = false,
  variant = "gradient",
  size = "md",
  className,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={twMerge("w-full space-y-1.5", className)} {...props}>
      {(label || showValueLabel) && (
        <div className="flex items-center justify-between text-xs text-neutral-300 font-medium">
          {label && <span>{label}</span>}
          {showValueLabel && (
            <span className="font-mono text-neutral-400 font-bold ml-auto">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || "Progres pembelajaran"}
        className={clsx(
          "w-full bg-neutral-800 rounded-full overflow-hidden p-0.5 border border-neutral-700/50",
          heightSizes[size]
        )}
      >
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-500 ease-out shadow-sm",
            variantGradients[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
