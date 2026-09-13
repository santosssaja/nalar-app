"use client";

import React, { useState } from "react";
import { GuidedConfig } from "@/types/level";
import { Compass, ArrowRight, CheckCircle2, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ModulePlaygroundEmbed } from "../ModulePlaygroundEmbed";

export interface GuidedScreenProps {
  config: GuidedConfig;
  onNext: () => void;
}

export function GuidedScreen({ config, onNext }: GuidedScreenProps) {
  const [activeVariables, setActiveVariables] = useState<Record<string, number>>(
    config.initialVariables || {}
  );
  const [selectedDiscoveryOption, setSelectedDiscoveryOption] = useState<string | null>(null);

  const discovery = config.discoveryQuestion;
  const isDiscoveryCorrect =
    discovery && selectedDiscoveryOption === discovery.correctOption;

  const canProceed = !discovery || isDiscoveryCorrect;

  return (
    <div className="w-full h-full flex flex-col justify-between gap-3 animate-fade-in overflow-y-auto md:overflow-hidden">
      {/* Top Header */}
      <div className="shrink-0 flex items-center justify-between gap-2 px-3.5 py-2 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-black text-white truncate leading-tight">
              {config.instructionTitle}
            </h2>
            <p className="text-[11px] text-neutral-400 truncate leading-tight">
              {config.instructionText}
            </p>
          </div>
        </div>

        {canProceed && (
          <Button
            variant="primary"
            size="sm"
            onClick={onNext}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="shrink-0 text-xs py-1.5 font-bold"
          >
            Rumuskan Temuan
          </Button>
        )}
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch overflow-y-auto md:overflow-hidden">
        {/* Left Visual Area with Canvas */}
        <div className="lg:col-span-7 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-2.5 sm:p-3 shadow-lg flex items-center justify-center overflow-hidden">
          <ModulePlaygroundEmbed
            slug={config.interactiveComponentSlug}
            initialVariables={activeVariables}
            onVariablesChange={setActiveVariables}
          />
        </div>

        {/* Right Guided Observations & Pattern Question */}
        <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between overflow-y-auto">
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <TableIcon className="w-4 h-4" />
              <span>Tabel Observasi & Pola</span>
            </div>

            {/* Observation Table if present */}
            {config.observationTable && (
              <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 font-mono text-[10px]">
                    <tr>
                      {config.observationTable.headers.map((h, i) => (
                        <th key={i} className="p-2 font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 font-mono text-neutral-300 text-[11px]">
                    {config.observationTable.rows.map((r, idx) => (
                      <tr key={idx} className="hover:bg-neutral-900/40 transition">
                        <td className="p-2 text-neutral-400">{r.parameter}</td>
                        <td className="p-2 text-emerald-400 font-bold">
                          {r.expectedValue} {r.unit || ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Discovery Question / Pattern Picker */}
            {discovery && (
              <div className="space-y-2.5 pt-1">
                <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                  {discovery.prompt}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {discovery.options.map((opt) => {
                    const isSelected = selectedDiscoveryOption === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedDiscoveryOption(opt)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                          isSelected
                            ? isDiscoveryCorrect
                              ? "bg-emerald-600/30 border-emerald-500 text-emerald-200"
                              : "bg-rose-600/30 border-rose-500 text-rose-200"
                            : "bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isDiscoveryCorrect && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 animate-fade-in flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{discovery.insight}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-3">
            <Button
              variant="primary"
              size="md"
              disabled={!canProceed}
              onClick={onNext}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full text-xs font-bold py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
            >
              {canProceed ? "Lanjut ke Formalisasi Rumus →" : "Temukan polanya terlebih dahulu"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
