import { useState } from "react";
import {
  loadTrackAProfile,
  type SupportLevel,
  type TrackAProfileState,
  saveTrackAProfile,
} from "../../lib/trackAProfileStorage";

type TrackSelfGateProps = {
  onComplete: () => void;
};

export function TrackSelfGate({ onComplete }: TrackSelfGateProps) {
  const [profile, setProfile] = useState<TrackAProfileState>(() => loadTrackAProfile());

  const canContinue = profile.level === 1 || profile.level === 2;

  function setLevel(level: SupportLevel) {
    setProfile((p) => {
      const next = { ...p, level };
      saveTrackAProfile(next);
      return next;
    });
  }

  function patchOptional(patch: Partial<Pick<TrackAProfileState, "preferredName" | "age" | "sinceDiagnosis">>) {
    setProfile((p) => {
      const next = { ...p, ...patch };
      saveTrackAProfile(next);
      return next;
    });
  }

  function handleContinue() {
    if (!canContinue) return;
    const next: TrackAProfileState = {
      ...profile,
      gateCompleted: true,
      level: profile.level as SupportLevel,
    };
    saveTrackAProfile(next);
    setProfile(next);
    onComplete();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-8 text-center">
        <p className="text-sm font-medium text-sky-800">Trilha: para você</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Antes de começar, um passo rápido
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-slate-600">
          Isso ajuda a deixar a trilha mais próxima da sua realidade. Você pode mudar depois se
          quiser — os dados ficam só neste aparelho.
        </p>
      </header>

      <div className="space-y-8">
        <section
          className="rounded-2xl border border-sky-200/80 bg-sky-50/50 p-6 shadow-sm md:p-8"
          aria-labelledby="gate-level-heading"
        >
          <h2 id="gate-level-heading" className="text-lg font-semibold text-slate-900">
            Nível de suporte (obrigatório para continuar)
          </h2>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-600">
            Escolha a opção que mais se aproxima do que costuma aparecer no seu laudo ou na sua
            experiência cotidiana.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setLevel(1)}
              className={`min-h-[3.25rem] w-full rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:text-lg ${
                profile.level === 1
                  ? "border-sky-500 bg-white shadow-md"
                  : "border-sky-200 bg-white/80 hover:border-sky-300"
              }`}
            >
              Nível 1 – Necessito de pouco suporte
            </button>
            <button
              type="button"
              onClick={() => setLevel(2)}
              className={`min-h-[3.25rem] w-full rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:text-lg ${
                profile.level === 2
                  ? "border-sky-500 bg-white shadow-md"
                  : "border-sky-200 bg-white/80 hover:border-sky-300"
              }`}
            >
              Nível 2 – Necessito de suporte substancial
            </button>

            <div
              className="rounded-2xl border-2 border-dashed border-slate-300/90 bg-slate-50/80 p-4"
              aria-describedby="lvl3-hint"
            >
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Estamos preparando conteúdo específico para o nível 3"
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-3 text-left text-base font-semibold text-slate-500"
              >
                Nível 3 – Em breve
              </button>
              <p className="mt-2 text-xs leading-relaxed text-slate-500" id="lvl3-hint">
                Estamos preparando conteúdo específico para o nível 3.
              </p>
            </div>
          </div>
        </section>

        <section
          className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm md:p-8"
          aria-labelledby="gate-opt-heading"
        >
          <h2 id="gate-opt-heading" className="text-lg font-semibold text-slate-900">
            Identificação pessoal
          </h2>
          <p className="mt-2 rounded-lg bg-emerald-50/70 px-3 py-2 text-sm font-medium text-emerald-900">
            Você não precisa preencher isso para continuar.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="pref-name" className="text-sm font-medium text-slate-800">
                Nome (como prefere ser chamado)
              </label>
              <input
                id="pref-name"
                type="text"
                autoComplete="nickname"
                value={profile.preferredName}
                onChange={(e) => patchOptional({ preferredName: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>
            <div>
              <label htmlFor="pref-age" className="text-sm font-medium text-slate-800">
                Idade
              </label>
              <input
                id="pref-age"
                type="text"
                inputMode="numeric"
                value={profile.age}
                onChange={(e) => patchOptional({ age: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>
            <div>
              <label htmlFor="pref-since" className="text-sm font-medium text-slate-800">
                Há quanto tempo foi diagnosticado (em meses ou anos)
              </label>
              <input
                id="pref-since"
                type="text"
                value={profile.sinceDiagnosis}
                onChange={(e) => patchOptional({ sinceDiagnosis: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Ex.: 3 meses, 2 anos…"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-center pb-6">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="min-h-[3rem] min-w-[12rem] rounded-2xl bg-sky-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
