import { useState } from "react";
import {
  loadTrackAProfile,
  type SupportLevel,
  type TrackAProfileState,
  saveTrackAProfile,
} from "../../lib/trackAProfileStorage";
import {
  loadTrackAAgeBand,
  saveTrackAAgeBand,
  type AgeBand,
} from "../../lib/trackAAgeStorage";

type TrackSelfGateProps = {
  onComplete: () => void;
};

export function TrackSelfGate({ onComplete }: TrackSelfGateProps) {
  const [profile, setProfile] = useState<TrackAProfileState>(() => loadTrackAProfile());
  const [ageBand, setAgeBand] = useState<AgeBand | null>(() => loadTrackAAgeBand());

  const canContinue = (profile.level === 1 || profile.level === 2) && ageBand !== null;

  function setLevel(level: SupportLevel) {
    setProfile((p) => {
      const next = { ...p, level };
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
      <header className="reading-surface mb-8 rounded-2xl p-5 text-center shadow-sm sm:p-6">
        <p className="text-sm font-bold text-[#9a3b20]">Trilha: para você</p>
        <h1 className="mt-1 text-2xl font-bold text-stone-800 sm:text-3xl">
          Antes de começar, um passo rápido
        </h1>
        <p className="mx-auto mt-3 max-w-[65ch] text-pretty text-lg leading-[1.7] text-stone-600">
          Isso ajuda a deixar a trilha mais próxima da sua realidade.
        </p>
      </header>

      <div className="space-y-8">
        <section
          className="rounded-2xl border border-orange-200/80 bg-orange-50/80 p-6 shadow-sm md:p-8"
          aria-labelledby="gate-level-heading"
        >
          <h2 id="gate-level-heading" className="text-xl font-bold text-stone-800">
            Nível de suporte
          </h2>
          <p className="mt-2 max-w-[65ch] text-base leading-[1.7] text-stone-600">
            Escolha a opção que mais se aproxima do que costuma aparecer no seu laudo ou na sua
            experiência cotidiana.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setLevel(1)}
              aria-pressed={profile.level === 1}
              className={`gate-option flex min-h-[68px] w-full items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b20] sm:text-lg ${
                profile.level === 1
                  ? "selected border-orange-700 bg-[#fffcf7] shadow-md"
                  : "border-orange-200 bg-[#fffcf7]/80 hover:border-orange-400"
              }`}
            >
              Nível 1: necessito de pouco suporte
              {profile.level === 1 ? <SelectionCheck /> : null}
            </button>
            <button
              type="button"
              onClick={() => setLevel(2)}
              aria-pressed={profile.level === 2}
              className={`gate-option flex min-h-[68px] w-full items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b20] sm:text-lg ${
                profile.level === 2
                  ? "selected border-orange-700 bg-[#fffcf7] shadow-md"
                  : "border-orange-200 bg-[#fffcf7]/80 hover:border-orange-400"
              }`}
            >
              Nível 2: necessito de suporte substancial
              {profile.level === 2 ? <SelectionCheck /> : null}
            </button>

            <div
              className="b-gate-disabled-card rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/80 p-4"
              aria-describedby="lvl3-hint"
            >
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Estamos preparando conteúdo específico para o nível 3"
                className="gate-disabled min-h-12 w-full cursor-not-allowed rounded-xl border border-stone-200 bg-stone-100/80 px-4 py-3 text-left text-base font-semibold text-stone-600"
              >
                Nível 3: em breve
              </button>
              <p className="mt-2 text-sm leading-relaxed text-stone-600" id="lvl3-hint">
                Estamos preparando conteúdo específico para o nível 3.
              </p>
            </div>
          </div>
        </section>

        <section
          className="rounded-2xl border border-orange-200/80 bg-orange-50/80 p-6 shadow-sm md:p-8"
          aria-labelledby="gate-age-heading"
        >
          <h2 id="gate-age-heading" className="text-xl font-bold text-stone-800">
            Faixa etária
          </h2>
          <p className="mt-2 text-base leading-[1.7] text-stone-600">
            Selecione a faixa que corresponde à sua idade. Isso pode ajudar a orientar conteúdos
            futuros.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {([
              ["under-18", "17 anos ou menos"],
              ["18-or-older", "18 anos ou mais"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={ageBand === value}
                onClick={() => {
                  setAgeBand(value);
                  saveTrackAAgeBand(value);
                }}
                className={`gate-option flex min-h-[68px] items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold leading-snug focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b20] sm:text-lg ${
                  ageBand === value
                    ? "selected border-orange-700 bg-[#fffcf7] shadow-md"
                    : "border-orange-200 bg-[#fffcf7]/80 hover:border-orange-400"
                }`}
              >
                {label}
                {ageBand === value ? <SelectionCheck /> : null}
              </button>
            ))}
          </div>
        </section>

        <section
          className="flex justify-center pb-6"
          aria-labelledby="gate-opt-heading"
        >
          <p id="gate-opt-heading" className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-900">
            Seus dados ficam apenas em seu dispositivo.
          </p>
        </section>

        <div className="flex justify-center pb-6">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="gate-continue min-h-12 min-w-[12rem] rounded-2xl bg-[#b4532a] px-8 py-3 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#923f21] disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f4528]"
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
