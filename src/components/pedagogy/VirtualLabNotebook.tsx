"use client";

import React, { useState } from "react";
import { VirtualLabSpec } from "@/lib/curriculum/pedagogy-types";
import { useLearner } from "@/context/LearnerContext";
import { FlaskConical, Save, CheckCircle2, Bookmark } from "lucide-react";

interface VirtualLabNotebookProps {
  topicId: string;
  labSpec: VirtualLabSpec;
  currentVariables: Record<string, number>;
  onVariableChange?: (key: string, val: number) => void;
}

export function VirtualLabNotebook({
  topicId,
  labSpec,
  currentVariables,
  onVariableChange,
}: VirtualLabNotebookProps) {
  const { learnerState, saveLabNotebookEntry } = useLearner();
  const existingNote = learnerState.labNotebook.find(
    (n: { topicId: string }) => n.topicId === topicId
  );

  const [hypothesis, setHypothesis] = useState(existingNote?.hypothesis || labSpec.hypothesisOptions[0] || "");
  const [observation, setObservation] = useState(existingNote?.observation || "");
  const [conclusion, setConclusion] = useState(existingNote?.conclusion || "");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    saveLabNotebookEntry({
      topicId,
      topicTitle: topicId,
      question: labSpec.question,
      hypothesis,
      variables: JSON.stringify(currentVariables),
      prediction: hypothesis,
      observation: observation || "Variabel telah diuji dan menghasilkan simulasi stabil.",
      data: JSON.stringify(currentVariables),
      conclusion: conclusion || labSpec.conclusionPrompt,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xl">
      {/* Notebook Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
              Laboratorium Virtual & Catatan Ilmiah
            </span>
            <h3 className="text-sm sm:text-base font-black text-white">
              Buku Catatan Sains (Lab Notebook)
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-600/30"
        >
          {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? "Tersimpan di Profil" : "Simpan Catatan"}</span>
        </button>
      </div>

      {/* 1. Pertanyaan Eksperimen */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase text-neutral-400 font-bold">
          1. Pertanyaan Ilmiah (Question)
        </label>
        <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-200 font-medium">
          {labSpec.question}
        </div>
      </div>

      {/* 2. Hipotesis Siswa */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase text-neutral-400 font-bold">
          2. Hipotesis Peneliti (Hypothesis)
        </label>
        <select
          value={hypothesis}
          onChange={(e) => setHypothesis(e.target.value)}
          className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition"
          aria-label="Pilih Hipotesis Eksperimen"
        >
          {labSpec.hypothesisOptions.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Variabel Eksperimen yang Sedang Aktif */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase text-neutral-400 font-bold">
          3. Manipulasi Variabel Eksperimen
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {labSpec.parameterConfigs.map((param) => {
            const currentVal = currentVariables[param.key] ?? param.defaultVal;
            return (
              <div key={param.key} className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">{param.label}</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {currentVal} {param.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={currentVal}
                  onChange={(e) => onVariableChange?.(param.key, parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
                  aria-label={param.label}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Observasi & Kesimpulan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase text-neutral-400 font-bold">
            4. Observasi Data Eksperimen
          </label>
          <textarea
            rows={3}
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder={labSpec.observationGuide}
            className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-emerald-500 transition resize-none"
            aria-label="Catatan Observasi"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase text-neutral-400 font-bold">
            5. Kesimpulan Penyelidikan
          </label>
          <textarea
            rows={3}
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
            placeholder={labSpec.conclusionPrompt}
            className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-emerald-500 transition resize-none"
            aria-label="Kesimpulan Eksperimen"
          />
        </div>
      </div>
    </div>
  );
}
