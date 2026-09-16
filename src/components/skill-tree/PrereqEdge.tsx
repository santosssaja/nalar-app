"use client";

import React from "react";
import { BaseEdge, EdgeProps, getBezierPath } from "@xyflow/react";

export function PrereqEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isCrossDomain = Boolean(data?.isCrossDomain);

  if (isCrossDomain) {
    return (
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: "#38bdf8",
          strokeWidth: 2.5,
          strokeDasharray: "6,4",
          opacity: 0.9,
          ...style,
        }}
      />
    );
  }

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      markerEnd={markerEnd}
      style={{
        stroke: "#6366f1",
        strokeWidth: 2,
        opacity: 0.75,
        ...style,
      }}
    />
  );
}
