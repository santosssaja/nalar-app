import React, { useState, useId } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface TooltipProps {
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactElement;
  className?: string;
}

export function Tooltip({
  content,
  position = "top",
  children,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const id = useId();

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {React.cloneElement(children, {
        "aria-describedby": isVisible ? id : undefined,
      } as React.HTMLAttributes<HTMLElement>)}

      {isVisible && (
        <div
          id={id}
          role="tooltip"
          className={twMerge(
            clsx(
              "absolute z-[100] whitespace-nowrap rounded-lg bg-neutral-900/95 border border-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-100 shadow-2xl backdrop-blur-md animate-fade-in pointer-events-none select-none",
              positionClasses[position],
              className
            )
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
