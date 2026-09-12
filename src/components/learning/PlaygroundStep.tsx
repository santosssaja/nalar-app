"use client";

import React, { useEffect } from "react";
import { PlaygroundConfig } from "@/types/level";
import { ModulePlaygroundEmbed } from "./ModulePlaygroundEmbed";
import { Button } from "@/components/ui/Button";
import { Gamepad2, ArrowRight } from "lucide-react";
import { useNai } from "@/components/nai/NaiContext";

export interface PlaygroundStepProps {
  config: PlaygroundConfig;
  onNext: () => void;
}

export function PlaygroundStep({ config, onNext }: PlaygroundStepProps) {
  const { say } = useNai();

  useEffect(() => {
    say("Silakan putar atau geser parameter kanvas untuk melihat bagaimana grafis bereaksi secara langsung!", {
      expression: "curious",
    });
  }, [say]);

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Header and Instructions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Gamepad2 className="w-4 h-4" />
            <span>Zona Eksplorasi Mandiri</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">{config.title}</h2>
          <p className="text-xs sm:text-sm text-neutral-300">{config.instructions}</p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={onNext}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="shrink-0"
        >
          Siap Hadapi Tantangan
        </Button>
      </div>

      {/* Interactive Canvas Playground */}
      <div className="w-full">
        <ModulePlaygroundEmbed
          slug={config.interactiveComponentSlug}
          initialVariables={config.initialVariables}
        />
      </div>
    </div>
  );
}
