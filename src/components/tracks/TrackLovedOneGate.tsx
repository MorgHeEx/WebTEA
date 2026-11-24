import { useState } from "react";
import {
  defaultTrackBProfile,
  isPresumedLegalGuardian,
  loadTrackBProfile,
  type LovedRelation,
  type SupportLevel,
  type TrackBProfileState,
  saveTrackBProfile,
  RELATION_LABELS,
} from "../../lib/trackBProfileStorage";

type TrackLovedOneGateProps = {
  onComplete: () => void;
};

const RELATION_ORDER: LovedRelation[] = ["parentesResponsaveis", "amigosOutros"];

export function TrackLovedOneGate({ onComplete }: TrackLovedOneGateProps) {
  const [profile, setProfile] = useState<TrackBProfileState>(() => loadTrackBProfile());

  const canContinue = profile.level !== null && profile.relation !== null;

  function setLevel(level: SupportLevel) {
    setProfile((p) => {
      const next = { ...p, level };
      saveTrackBProfile(next);
      return next;
    });
  }

  function setRelation(rel: LovedRelation) {
    setProfile((p) => {
      const next: TrackBProfileState = {
        ...p,
        relation: rel,
        treatmentGuidance: isPresumedLegalGuardian(rel) ? p.treatmentGuidance : false,
      };
      saveTrackBProfile(next);
      return next;
    });
  }

  function patch(patch: Partial<TrackBProfileState>) {
    setProfile((p) => {
      const next = { ...p, ...patch };
      saveTrackBProfile(next);
      return next;
    });
  }

  function handleContinue() {
    if (!canContinue) return;
    const next: TrackBProfileState = {
      ...profile,
      gateCompleted: true,
      relation: profile.relation as LovedRelation,
      level: profile.level as SupportLevel,
    };
    saveTrackBProfile(next);
    setProfile(next);
    onComplete();
  }

  const showTreatment = isPresumedLegalGuardian(profile.relation);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="reading-surface mb-8 rounded-2xl p-5 text-center shadow-sm sm:p-6">
        <p className="text-sm font-bold text-[#8d3348]">Trilha: apoio a alguém próximo</p>
        <h1 className="mt-1 text-2xl font-bold text-stone-800 sm:text-3xl">
          Antes de começar, um passo rápido
        </h1>
        <p className="mx-auto mt-3 max-w-[65ch] text-pretty text-lg leading-[1.7] text-stone-600">
          Isso deixa a trilha mais próxima do seu papel de apoio. Os dados ficam só neste aparelho.
        </p>
      </header>

      <div className="space-y-8">
        <section
          className="rounded-2xl border border-rose-200/80 bg-rose-50/75 p-6 shadow-sm md:p-8"
          aria-labelledby="b-gate-level-heading"
        >
          <h2 id="b-gate-level-heading" className="text-xl font-bold text-stone-800">
            Nível de suporte
          </h2>
          <p className="mt-2 max-w-[65ch] text-base leading-[1.7] text-stone-600">
            Escolha a opção que mais se aproxima do suporte que você costuma precisar ao acolher
            alguém próximo.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setLevel(1)}
              aria-pressed={profile.level === 1}
              className={`b-gate-option flex min-h-[68px] w-full items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8d3348] sm:text-lg ${
                profile.level === 1
                  ? "selected border-rose-700 bg-[#fffcf7] shadow-md"
                  : "border-rose-200 bg-[#fffcf7]/80 hover:border-rose-400"
              }`}
            >
              Nível 1: pouco suporte
              {profile.level === 1 ? <SelectionCheck /> : null}
            </button>
            <button
              type="button"
              onClick={() => setLevel(2)}
              aria-pressed={profile.level === 2}
              className={`b-gate-option flex min-h-[68px] w-full items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8d3348] sm:text-lg ${
                profile.level === 2
                  ? "selected border-rose-700 bg-[#fffcf7] shadow-md"
                  : "border-rose-200 bg-[#fffcf7]/80 hover:border-rose-400"
              }`}
            >
              Nível 2: suporte substancial
              {profile.level === 2 ? <SelectionCheck /> : null}
            </button>

            <div
              className="b-gate-disabled-card rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/80 p-4"
              aria-describedby="b-lvl3-hint"
            >
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Estamos preparando conteúdo específico para o nível 3"
                className="b-gate-disabled min-h-12 w-full cursor-not-allowed rounded-xl border border-stone-200 bg-stone-100/80 px-4 py-3 text-left text-base font-semibold text-stone-600"
              >
                Nível 3: em breve
              </button>
              <p className="mt-2 text-sm leading-relaxed text-stone-600" id="b-lvl3-hint">
                Estamos preparando conteúdo específico para o nível 3.
              </p>
            </div>
          </div>
        </section>

        <section
          className="rounded-2xl border border-rose-200/80 bg-rose-50/75 p-6 shadow-sm md:p-8"
          aria-labelledby="b-gate-rel-heading"
        >
          <h2 id="b-gate-rel-heading" className="text-xl font-bold text-stone-800">
            Sua relação com a pessoa diagnosticada
          </h2>
          <p className="mt-2 text-base text-stone-600">Escolha uma opção para continuar.</p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {RELATION_ORDER.map((rel) => (
              <button
                key={rel}
                type="button"
                onClick={() => setRelation(rel)}
                aria-pressed={profile.relation === rel}
                className={`b-gate-option flex min-h-[68px] items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8d3348] ${
                  profile.relation === rel
                    ? "selected border-rose-700 bg-[#fffcf7] shadow-sm"
                    : "border-rose-200 bg-[#fffcf7]/70 hover:border-rose-400"
                }`}
              >
                {RELATION_LABELS[rel]}
                {profile.relation === rel ? <SelectionCheck /> : null}
              </button>
            ))}
          </div>
        </section>

        {showTreatment ? (
          <section
            className="rounded-2xl border border-amber-200/80 bg-[#fffcf7]/95 p-6 shadow-sm md:p-8"
            aria-labelledby="b-gate-treat-heading"
          >
            <h2 id="b-gate-treat-heading" className="text-xl font-bold text-stone-800">
              Orientações para quem é responsável
            </h2>
            <label className="b-gate-checkbox mt-4 flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-stone-200 bg-stone-50/60 px-3 py-3">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 shrink-0 rounded border-stone-300 text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8d3348] focus:ring-rose-600"
                checked={profile.treatmentGuidance}
                onChange={(e) => patch({ treatmentGuidance: e.target.checked })}
              />
              <span className="text-base leading-snug text-stone-800">
                Quero orientações sobre como conduzir o tratamento e garantir os direitos do meu
                dependente
              </span>
            </label>
          </section>
        ) : null}


        <div className="flex justify-center pb-6">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="b-gate-continue min-h-12 min-w-[12rem] rounded-2xl bg-[#9a3b52] px-8 py-3 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#7e3043] disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8d3348]"
          >
            Iniciar Capítulo 1
          </button>
        </div>
      </div>
    </div>
  );
}

function SelectionCheck() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7 shrink-0 text-green-700"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function resetTrackBGateForDev() {
  saveTrackBProfile(defaultTrackBProfile());
}
