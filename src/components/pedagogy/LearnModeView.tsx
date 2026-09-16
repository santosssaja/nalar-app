"use client";

import { ComprehensiveLesson } from "@/lib/curriculum/pedagogy-types";
import { PredictionCard } from "./PredictionCard";
import { FourTierHintDrawer } from "./FourTierHintDrawer";
import { VirtualLabNotebook } from "./VirtualLabNotebook";
import { TransferChallengeCard } from "./TransferChallengeCard";
import { MasteryCheckView } from "./MasteryCheckView";
import { ModulePlaygroundEmbed } from "@/components/learning/ModulePlaygroundEmbed";
import { KaTeXView } from "@/components/ui/KaTeXView";
import { Sparkles, Binary } from "lucide-react";

export interface LearnModeViewProps {
  lesson: ComprehensiveLesson;
  simVars: Record<string, number>;
  onSimVarsChange: (updated: Record<string, number>) => void;
  onClaimXp: (amount: number, challengeId?: string) => void;
  onHintUnlocked: (level: number) => void;
}

export function LearnModeView({
  lesson,
  simVars,
  onSimVarsChange,
  onClaimXp,
  onHintUnlocked,
}: LearnModeViewProps) {
  const handleClaimXp = (amount: number, challengeId = "challenge") => {
    onClaimXp(amount, challengeId);
  };

  const handleSimVarsChange = (updated: Record<string, number>) => {
    onSimVarsChange(updated);
  };

  return (
    <div className="space-y-8">
      {/* Phase A: Hook / Phenomenon */}
          <section className="p-6 rounded-3xl bg-gradient-to-r from-neutral-900 to-indigo-950/40 border border-neutral-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase font-bold tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Fase 1: Fenomena Nyata &amp; Rasa Ingin Tahu (Hook)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {lesson.hook.question}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
              {lesson.hook.phenomenonDescription}
            </p>
            <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 text-xs text-neutral-400">
              <b className="text-neutral-200">Relevansi Dunia Nyata:</b> {lesson.hook.realWorldContext}
            </div>
          </section>

          {/* Phase B: Prediction */}
          <PredictionCard
            prediction={lesson.prediction}
            onPredictionSubmitted={() => handleClaimXp(20, `pred-${lesson.id}`)}
          />

          {/* Phase C: Explore (Interactive Simulation) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold tracking-wider">
                  Fase 3: Eksplorasi Langsung
                </span>
                <h3 className="text-lg font-black text-white">{lesson.explore.prompt}</h3>
              </div>
              <span className="text-xs text-neutral-400 font-mono">Manipulasi &amp; Amati</span>
            </div>

            <ModulePlaygroundEmbed
              slug={lesson.slug}
              initialVariables={simVars}
              onVariablesChange={handleSimVarsChange}
            />

            {/* Guiding exploration prompts */}
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-neutral-300 block">Panduan Pengamatan:</span>
              <ul className="list-disc list-inside space-y-1 text-xs text-neutral-400">
                {lesson.explore.guidingQuestions.map((gq, i) => (
                  <li key={i}>{gq}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Phase D: Discover */}
          <section className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">
              Fase 4: Penemuan Pola (Discover)
            </span>
            <h3 className="text-base sm:text-lg font-black text-white">{lesson.discover.prompt}</h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {lesson.discover.patternSummary}
            </p>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 font-medium">
              💡 <b>Wawasan Utama:</b> {lesson.discover.interactiveInsight}
            </div>
          </section>

          {/* Phase E: Formalize */}
          <section className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold tracking-wider">
                  Fase 5: Formalisasi Simbol &amp; Persamaan
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">{lesson.formalize.summary}</h3>
              </div>
              <Binary className="w-5 h-5 text-indigo-400" />
            </div>

            {/* Formulas Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.formalize.formulas.map((form, idx) => (
                <div key={idx} className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-2">
                  <span className="text-xs font-bold text-sky-400">{form.name}</span>
                  <div className="p-3 bg-neutral-900 rounded-xl text-center border border-neutral-800 flex items-center justify-center min-h-[48px] overflow-x-auto text-indigo-200">
                    <KaTeXView math={form.latex} displayMode />
                  </div>
                  <p className="text-[11px] text-neutral-400">{form.meaning}</p>
                </div>
              ))}
            </div>

            {/* Variables Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-neutral-800 rounded-xl overflow-hidden">
                <thead className="bg-neutral-800 text-neutral-300">
                  <tr>
                    <th className="p-2.5 font-mono">Simbol</th>
                    <th className="p-2.5">Makna Fisik / Matematis</th>
                    <th className="p-2.5 font-mono">Satuan Baku</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 text-neutral-300">
                  {lesson.formalize.variablesTable.map((v, i) => (
                    <tr key={i} className="hover:bg-neutral-800/40">
                      <td className="p-2.5 font-mono font-bold text-sky-400">{v.symbol}</td>
                      <td className="p-2.5">{v.meaning}</td>
                      <td className="p-2.5 font-mono text-neutral-400">{v.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Phase F: Derivation / Reasoning (if provided) */}
          {lesson.derivation && (
            <section className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
              <span className="text-[10px] font-mono uppercase text-purple-400 font-bold tracking-wider">
                Fase 6: Penurunan Konsep &amp; Penalaran (Derivation)
              </span>
              <h3 className="text-base sm:text-lg font-black text-white">{lesson.derivation.title}</h3>
              <div className="space-y-3">
                {lesson.derivation.steps.map((st) => (
                  <div key={st.stepNumber} className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[10px]">
                        {st.stepNumber}
                      </span>
                      <p className="text-neutral-200 font-medium">{st.explanation}</p>
                    </div>
                    {st.latex && (
                      <div className="p-2.5 bg-neutral-900 rounded-lg text-center border border-neutral-800 flex items-center justify-center overflow-x-auto text-purple-200">
                        <KaTeXView math={st.latex} displayMode />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Phase G: Guided Practice with 4-level hint */}
          <section className="space-y-4">
            <span className="text-[10px] font-mono uppercase text-sky-400 font-bold tracking-wider">
              Fase 7: Latihan Terbimbing (Scaffolded Practice)
            </span>
            {lesson.guidedPractice.map((gp) => (
              <div key={gp.id} className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white">{gp.title}</h4>
                  <span className="text-xs font-mono text-amber-400 font-bold">+{gp.xpReward} XP</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{gp.question}</p>
                <FourTierHintDrawer
                  hints={gp.hints}
                  onHintUnlocked={(lvl) => onHintUnlocked(lvl)}
                />
              </div>
            ))}
          </section>

          {/* Phase H: Virtual Laboratory & Lab Notebook (if available) */}
          {lesson.virtualLab && (
            <VirtualLabNotebook
              topicId={lesson.id}
              labSpec={lesson.virtualLab}
              currentVariables={simVars}
              onVariableChange={(k, v) => handleSimVarsChange({ [k]: v })}
            />
          )}

          {/* Phase I: Transfer Challenge */}
          <TransferChallengeCard
            transferSpec={lesson.transferChallenge}
            currentVariables={simVars}
            onComplete={(xp) => handleClaimXp(xp, `transfer-${lesson.id}`)}
          />

          {/* Phase J: Mastery Check */}
          <MasteryCheckView
            topicId={lesson.id}
            items={lesson.masteryCheck}
            onComplete={() => handleClaimXp(50, `mastery-${lesson.id}`)}
          />
    </div>
  );
}
