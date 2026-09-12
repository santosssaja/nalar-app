"use client";

import React, { useMemo } from "react";
import katex from "katex";

export interface KaTeXViewProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

export function KaTeXView({ math, displayMode = false, className = "" }: KaTeXViewProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode,
        throwOnError: false,
      });
    } catch {
      return math;
    }
  }, [math, displayMode]);

  return (
    <span
      className={`select-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
