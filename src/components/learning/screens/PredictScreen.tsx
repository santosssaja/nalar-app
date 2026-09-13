"use client";

import React, { useState } from "react";
import { PredictConfig } from "@/types/level";
import { HelpCircle, Play, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ModulePlaygroundEmbed } from "../ModulePlaygroundEmbed";

export interface PredictScreenProps {
  config: PredictConfig;
  onNext: () => void;
}

export function PredictScreen({ config, onNext }: PredictScreenProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);

  const selectedOption = config.options.find((o) => o.id === selectedOptionId);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setHasSimulated(true);
    }, 1000);
  };

  const activeVariables = hasSimulated
    ? config.simulationVariables || config.initialVariables
    : config.initialVariables;

  return (
    <div className="w-full h-full flex flex-col justify-between gap-3 animate-fade-in overflow-y-auto md:overflow-hidden">
      {/* Top Header */}
      <div className="shrink-0 flex items-center justify-between gap-2 px-3.5 py-2 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
            <HelpCircle className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-black text-white truncate leading-tight">
              {config.scenarioTitle}
            </h2>
            <p className="text-[11px] text-neutral-400 truncate leading-tight">
              {config.scenarioText}
            </p>
          </div>
        </div>

        {hasSimulated && (
          <Button
            variant="primary"
            size="sm"
            onClick={onNext}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="shrink-0 text-xs py-1.5 font-bold"
          >
            Lanjut Eksplorasi
          </Button>
        )}
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch overflow-y-auto md:overflow-hidden">
        {/* Left Visual Area */}
        <div className="lg:col-span-7 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-2.5 sm:p-3 shadow-lg flex flex-col items-center justify-center overflow-hidden relative">
          {config.interactiveComponentSlug ? (
            <div className="w-full h-full flex items-center justify-center">
              <ModulePlaygroundEmbed
                slug={config.interactiveComponentSlug}
                initialVariables={activeVariables}
                compact={true}
              />
            </div>
          ) : (
            <div className="text-center p-6 space-y-2">
              <span className="text-xs text-purple-400 font-mono font-bold">Simulasi Prediksi</span>
              <p className="text-sm text-neutral-300">{config.scenarioText}</p>
            </div>
          )}

          {isSimulating && (
            <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center z-20 animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 bg-neutral-900 px-4 py-2 rounded-full border border-amber-500/40 shadow-xl">
                <Play className="w-4 h-4 animate-spin text-amber-400" />
                <span>Menjalankan Simulasi...</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Prediction Form */}
        <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between overflow-y-auto">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Prediksi Hipotesismu</span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-neutral-100 leading-relaxed">
              {config.question}
            </p>

            <div className="space-y-2 pt-1">
              {config.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={hasSimulated}
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? "bg-purple-600/20 border-purple-500 text-white font-semibold shadow-sm"
                        : "bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>

            {hasSimulated && selectedOption && (
              <div
                className={`p-3 rounded-xl border text-xs leading-relaxed space-y-1 animate-fade-in ${
                  selectedOption.isCorrect
                    ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                    : "bg-amber-950/30 border-amber-500/40 text-amber-200"
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {selectedOption.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Prediksimu Tepat Sekali!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-400">Menarik! Amati Hasil Simulasi:</span>
                    </>
                  )}
                </div>
                <p>{selectedOption.feedback}</p>
              </div>
            )}
          </div>

          <div className="pt-3 space-y-2">
            {!hasSimulated ? (
              <Button
                variant="primary"
                size="md"
                disabled={!selectedOptionId || isSimulating}
                onClick={handleRunSimulation}
                leftIcon={<Play className="w-4 h-4 fill-current" />}
                className="w-full text-xs font-bold py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
              >
                {selectedOptionId ? (config.simulationLabel || "▶ Jalankan Simulasi & Buktikan!") : "Pilih tebakanmu dulu"}
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={onNext}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full text-xs font-bold py-2"
              >
                Lanjut ke Eksplorasi Terbimbing →
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
