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
      autoDismissMs: 4000,
    });
  }, [say]);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-2 animate-fade-in overflow-y-auto md:overflow-hidden">
      {/* Compact Header & Instructions */}
      <div className="shrink-0 flex items-center justify-between gap-3 px-3.5 py-1.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <Gamepad2 className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-black text-white truncate leading-tight">
              {config.title}
            </h2>
            <p className="text-[11px] text-neutral-400 truncate leading-tight">
              {config.instructions}
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onNext}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="shrink-0 text-xs py-1.5 font-bold"
        >
          Hadapi Tantangan
        </Button>
      </div>

      {/* Interactive Canvas Playground */}
      <div className="flex-1 min-h-0 w-full overflow-y-auto md:overflow-hidden">
        <ModulePlaygroundEmbed
          slug={config.interactiveComponentSlug}
          initialVariables={config.initialVariables}
        />
      </div>
    </div>
  );
}
