"use client";

import React, { useState } from "react";
import { ProvokeConfig } from "@/types/level";
import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ModulePlaygroundEmbed } from "../ModulePlaygroundEmbed";

export interface ProvokeScreenProps {
  config: ProvokeConfig;
  onNext: () => void;
}

export function ProvokeScreen({ config, onNext }: ProvokeScreenProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const selectedOption = config.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-3 animate-fade-in overflow-y-auto md:overflow-hidden">
      {/* Top Header Badge */}
      <div className="shrink-0 flex items-center justify-between gap-2 px-3.5 py-2 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-black text-white truncate leading-tight">
              {config.hookTitle}
            </h2>
            <p className="text-[11px] text-neutral-400 truncate leading-tight">
              {config.hookText}
            </p>
          </div>
        </div>

        {selectedOptionId && (
          <Button
            variant="primary"
            size="sm"
            onClick={onNext}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="shrink-0 text-xs py-1.5 font-bold"
          >
            Lanjut Prediksi
          </Button>
        )}
      </div>

      {/* Main Split Layout: Left Hook Visual / Canvas, Right Question & Choice */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch overflow-y-auto md:overflow-hidden">
        {/* Left Visual Area */}
        <div className="lg:col-span-7 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-2.5 sm:p-3 shadow-lg flex items-center justify-center overflow-hidden">
          {config.interactiveComponentSlug ? (
            <div className="w-full h-full flex items-center justify-center">
              <ModulePlaygroundEmbed
                slug={config.interactiveComponentSlug}
                initialVariables={config.initialVariables}
                compact={true}
              />
            </div>
          ) : (
            <div className="text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-white max-w-sm">
                {config.question}
              </h3>
            </div>
          )}
        </div>

        {/* Right Interaction Panel */}
        <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between overflow-y-auto">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <MessageCircle className="w-4 h-4" />
              <span>Pertanyaan Pemantik</span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-neutral-200 leading-relaxed">
              {config.question}
            </p>

            <div className="space-y-2 pt-1">
              {config.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? "bg-amber-500/15 border-amber-500 text-white font-semibold shadow-sm"
                        : "bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>

            {selectedOption && (
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 animate-fade-in leading-relaxed space-y-1">
                <span className="font-bold text-amber-400">Respon Nai: </span>
                <span>{selectedOption.responseText}</span>
              </div>
            )}
          </div>

          <div className="pt-3">
            <Button
              variant="primary"
              size="md"
              disabled={!selectedOptionId}
              onClick={onNext}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full text-xs font-bold py-2"
            >
              {selectedOptionId ? "Lanjut ke Prediksi →" : "Pilih salah satu respon di atas"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
