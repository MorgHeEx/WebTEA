import { useState } from "react";
import {
  defaultTrackBProfile,
  isPresumedLegalGuardian,
  loadTrackBProfile,
  type LovedRelation,
  type TrackBProfileState,
  saveTrackBProfile,
  RELATION_LABELS,
} from "../../lib/trackBProfileStorage";

type TrackLovedOneGateProps = {
  onComplete: () => void;
};

const RELATION_ORDER: LovedRelation[] = [
  "mae",
  "pai",
  "ava",
  "avo",
  "irmao",
  "irma",
  "parceiro",
  "amigo",
  "colega",
  "outro",
];

export function TrackLovedOneGate({ onComplete }: TrackLovedOneGateProps) {
  const [profile, setProfile] = useState<TrackBProfileState>(() => loadTrackBProfile());

  const canContinue = profile.relation !== null && (profile.relation !== "outro" || profile.relationOther.trim());

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
    };
    saveTrackBProfile(next);
    setProfile(next);
    onComplete();
  }

  const showTreatment = isPresumedLegalGuardian(profile.relation);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-8 text-center">
        <p className="text-sm font-medium text-teal-800">Trilha: apoio a alguém próximo</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Antes de começar, um passo rápido
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-slate-600">
          Isso deixa a trilha mais próxima do seu papel de apoio. Os dados ficam só neste aparelho.
        </p>
      </header>

      <div className="space-y-8">
        <section
          className="rounded-2xl border border-emerald-200/80 bg-emerald-50/35 p-6 shadow-sm md:p-8"
          aria-labelledby="b-gate-rel-heading"
        >
          <h2 id="b-gate-rel-heading" className="text-lg font-semibold text-slate-900">
            Sua relação com a pessoa diagnosticada
          </h2>
          <p className="mt-2 text-sm text-slate-600">Escolha uma opção para continuar.</p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {RELATION_ORDER.map((rel) => (
              <button
                key={rel}
                type="button"
                onClick={() => setRelation(rel)}
                className={`min-h-[2.75rem] rounded-xl border-2 px-3 py-2.5 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:text-base ${
                  profile.relation === rel
                    ? "border-teal-500 bg-white shadow-sm"
                    : "border-emerald-200/90 bg-white/70 hover:border-emerald-300"
                }`}
              >
                {RELATION_LABELS[rel]}
              </button>
            ))}
          </div>

          {profile.relation === "outro" ? (
            <div className="mt-4">
              <label htmlFor="b-rel-other" className="text-sm font-medium text-slate-800">
                Descreva a relação
              </label>
              <input
                id="b-rel-other"
                type="text"
                value={profile.relationOther}
                onChange={(e) => patch({ relationOther: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Ex.: tia, padrasto…"
              />
            </div>
          ) : null}
        </section>

        {showTreatment ? (
          <section
            className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm md:p-8"
            aria-labelledby="b-gate-treat-heading"
          >
            <h2 id="b-gate-treat-heading" className="text-lg font-semibold text-slate-900">
              Orientações para quem responde legalmente
            </h2>
            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                checked={profile.treatmentGuidance}
                onChange={(e) => patch({ treatmentGuidance: e.target.checked })}
              />
              <span className="text-sm leading-snug text-slate-800">
                Quero orientações sobre como conduzir o tratamento e garantir os direitos do meu
                dependente
              </span>
            </label>
          </section>
        ) : null}

        <section
          className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm md:p-8"
          aria-labelledby="b-gate-opt-heading"
        >
          <h2 id="b-gate-opt-heading" className="text-lg font-semibold text-slate-900">
            Identificação (opcional)
          </h2>
          <p className="mt-2 rounded-lg bg-emerald-50/70 px-3 py-2 text-sm font-medium text-emerald-900">
            Você não precisa preencher isso para continuar.
          </p>
          <div className="mt-4">
            <label htmlFor="b-pref-name" className="text-sm font-medium text-slate-800">
              Como prefere ser chamado (apelido ou primeiro nome)
            </label>
            <input
              id="b-pref-name"
              type="text"
              autoComplete="nickname"
              value={profile.preferredName}
              onChange={(e) => patch({ preferredName: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </section>

        <div className="flex justify-center pb-6">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="min-h-[3rem] min-w-[12rem] rounded-2xl bg-teal-700 px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

export function resetTrackBGateForDev() {
  saveTrackBProfile(defaultTrackBProfile());
}
