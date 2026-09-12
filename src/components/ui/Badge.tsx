import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type BadgeVariant =
  | "default"
  | "math"
  | "physics"
  | "chemistry"
  | "biology"
  | "softskill"
  | "science"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "locked"
  | "active"
  | "completed";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-neutral-800 text-neutral-300 border-neutral-700",
  math: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  physics: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  chemistry: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  biology: "bg-teal-500/10 text-teal-300 border-teal-500/30",
  softskill: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  science: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  success: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  warning: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  danger: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  info: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  locked: "bg-neutral-800/80 text-neutral-400 border-neutral-700/80",
  active: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40 animate-pulse",
  completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
};

const sizeStyles = {
  sm: "text-[10px] px-2 py-0.5 gap-1",
  md: "text-xs px-2.5 py-1 gap-1.5",
};

export function Badge({
  className,
  variant = "default",
  size = "sm",
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center font-bold tracking-wide uppercase rounded-full border leading-none select-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
}
