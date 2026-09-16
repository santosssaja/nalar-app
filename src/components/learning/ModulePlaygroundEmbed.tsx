"use client";

import React, { useState, useEffect } from "react";
import { Canvas as RealCanvas } from "@/modules/math/real-numbers/Canvas";
import { Controls as RealControls } from "@/modules/math/real-numbers/Controls";
import { Canvas as AlgebraCanvas } from "@/modules/math/elementary-algebra/Canvas";
import { Controls as AlgebraControls } from "@/modules/math/elementary-algebra/Controls";
import { Canvas as FuncCanvas } from "@/modules/math/functions-graphs/Canvas";
import { Controls as FuncControls } from "@/modules/math/functions-graphs/Controls";
import { Canvas as TrigCanvas } from "@/modules/math/trigonometry/Canvas";
import { Controls as TrigControls } from "@/modules/math/trigonometry/Controls";
import { Canvas as SiCanvas } from "@/modules/science/si-units/Canvas";
import { Controls as SiControls } from "@/modules/science/si-units/Controls";
import { Canvas as KinematicsCanvas } from "@/modules/science/kinematics/Canvas";
import { Controls as KinematicsControls } from "@/modules/science/kinematics/Controls";

export interface ModulePlaygroundEmbedProps {
  slug: string;
  initialVariables?: Record<string, number>;
  onVariablesChange?: (vars: Record<string, number>) => void;
  externalVariables?: Record<string, number> | null;
  challengeSidebar?: React.ReactNode;
  compact?: boolean;
}

export function ModulePlaygroundEmbed({
  slug,
  initialVariables = {},
  onVariablesChange,
  externalVariables,
  challengeSidebar,
  compact = false,
}: ModulePlaygroundEmbedProps) {
  const [vars, setVars] = useState<Record<string, number>>(initialVariables);

  useEffect(() => {
    if (externalVariables) {
      setVars((prev) => ({ ...prev, ...externalVariables }));
    }
  }, [externalVariables]);

  const handleVarsChange = (newVars: Record<string, number>) => {
    setVars(newVars);
    onVariablesChange?.(newVars);
  };

  const renderCanvasAndControls = () => {
    switch (slug) {
      case "math-real-numbers":
      case "math-real-numbers-line":
        return (
          <div className="space-y-4">
            <RealCanvas
              state={{
                point1: vars.point1 ?? 3,
                point2: vars.point2 ?? -4,
                scaleFactor: vars.scaleFactor ?? 1,
                zoomLevel: vars.zoomLevel ?? 1,
              }}
            />
            {!compact && (
              <RealControls
                state={{
                  point1: vars.point1 ?? 3,
                  point2: vars.point2 ?? -4,
                  scaleFactor: vars.scaleFactor ?? 1,
                  zoomLevel: vars.zoomLevel ?? 1,
                }}
                onChange={(s) => handleVarsChange(s as unknown as Record<string, number>)}
              />
            )}
          </div>
        );

      case "math-elementary-algebra":
        return (
          <div className="space-y-4">
            <AlgebraCanvas
              state={{
                a: vars.a ?? 2,
                b: vars.b ?? 4,
                c: vars.c ?? 10,
                x: vars.x ?? 3,
              }}
            />
            {!compact && (
              <AlgebraControls
                state={{
                  a: vars.a ?? 2,
                  b: vars.b ?? 4,
                  c: vars.c ?? 10,
                  x: vars.x ?? 3,
                }}
                onChange={(s) => handleVarsChange(s as unknown as Record<string, number>)}
              />
            )}
          </div>
        );

      case "math-functions-graphs":
        return (
          <div className="space-y-4">
            <FuncCanvas
              state={{
                a: vars.a ?? 1,
                h: vars.h ?? 0,
                k: vars.k ?? 0,
                xInput: vars.xInput ?? 2,
              }}
            />
            {!compact && (
              <FuncControls
                state={{
                  a: vars.a ?? 1,
                  h: vars.h ?? 0,
                  k: vars.k ?? 0,
                  xInput: vars.xInput ?? 2,
                }}
                onChange={(s) => handleVarsChange(s as unknown as Record<string, number>)}
              />
            )}
          </div>
        );

      case "math-trig-unit-circle":
      case "math-trigonometry":
        return (
          <div className="space-y-4">
            <TrigCanvas
              state={{
                angleDeg: vars.angleDeg ?? 45,
                radius: vars.radius ?? 1,
              }}
            />
            {!compact && (
              <TrigControls
                state={{
                  angleDeg: vars.angleDeg ?? 45,
                  radius: vars.radius ?? 1,
                }}
                onChange={(s) => handleVarsChange(s as unknown as Record<string, number>)}
              />
            )}
          </div>
        );

      case "science-si-units":
      case "sci-units-measurements":
        return (
          <div className="space-y-4">
            <SiCanvas
              state={{
                lengthMeters: vars.lengthMeters ?? 1500,
                timeSeconds: vars.timeSeconds ?? 60,
                targetUnitCode: vars.targetUnitCode ?? 1,
              }}
            />
            {!compact && (
              <SiControls
                state={{
                  lengthMeters: vars.lengthMeters ?? 1500,
                  timeSeconds: vars.timeSeconds ?? 60,
                  targetUnitCode: vars.targetUnitCode ?? 1,
                }}
                onChange={(s) => handleVarsChange(s as unknown as Record<string, number>)}
              />
            )}
          </div>
        );

      case "science-kinematics":
      case "physics-projectile-motion":
      default:
        return (
          <div className="space-y-4">
            <KinematicsCanvas
              state={{
                x0: vars.x0 ?? 0,
                y0: vars.y0 ?? 0,
                v0: vars.v0 ?? 20,
                angleDeg: vars.angleDeg ?? 45,
                g: vars.g ?? 9.8,
                a: vars.a ?? 2,
                t: vars.t ?? 0,
              }}
            />
            {!compact && (
              <KinematicsControls
                state={{
                  x0: vars.x0 ?? 0,
                  y0: vars.y0 ?? 0,
                  v0: vars.v0 ?? 20,
                  angleDeg: vars.angleDeg ?? 45,
                  g: vars.g ?? 9.8,
                  a: vars.a ?? 2,
                  t: vars.t ?? 0,
                }}
                onChange={(s) => handleVarsChange(s as unknown as Record<string, number>)}
              />
            )}
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        <div className={challengeSidebar ? "lg:col-span-8" : "lg:col-span-12"}>
          {renderCanvasAndControls()}
        </div>
        {challengeSidebar && (
          <div className="lg:col-span-4 flex flex-col gap-3">
            {challengeSidebar}
          </div>
        )}
      </div>
    </div>
  );
}
