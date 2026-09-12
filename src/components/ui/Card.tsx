import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isInteractive?: boolean;
  isHighlighted?: boolean;
}

export function Card({
  className,
  isInteractive = false,
  isHighlighted = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "rounded-2xl sm:rounded-3xl bg-neutral-900/90 border border-neutral-800 p-5 sm:p-6 transition-all duration-200",
          isInteractive &&
            "cursor-pointer hover:border-neutral-700 hover:bg-neutral-900 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5 active:translate-y-0",
          isHighlighted &&
            "border-indigo-500/50 shadow-lg shadow-indigo-500/10 bg-gradient-to-br from-neutral-900 via-neutral-900 to-indigo-950/30",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge("space-y-1.5 mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={twMerge("text-lg sm:text-xl font-black text-white tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={twMerge("text-xs sm:text-sm text-neutral-400 leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge("space-y-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge("pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
}
