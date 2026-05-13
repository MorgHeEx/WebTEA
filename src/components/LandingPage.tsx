type LandingPageProps = {
  onChooseSelf: () => void;
  onChooseLovedOne: () => void;
};

/**
 * Paleta sugerida (Tailwind) — pastéis, contraste confortável para leitura longa:
 * - Fundo / gradiente: from-sky-50 via-emerald-50/35 to-sky-50 (App), body bg-sky-50
 * - Trilha A (eu): border-sky-200, bg-sky-100/80, foco ring-sky-500, texto text-slate-900
 * - Trilha B (próximo): border-emerald-200, bg-emerald-50/90, foco ring-emerald-600
 * - Cartões de conteúdo: bg-white/90, border-slate-200/80, texto text-slate-700
 * - Hierarquia: títulos text-slate-900; rótulos suaves text-sky-800 / text-teal-800
 * - Foco global: outline-sky-600 (index.css :focus-visible)
 */
export function LandingPage({ onChooseSelf, onChooseLovedOne }: LandingPageProps) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-4 py-12 sm:px-6">
      <header className="text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-sky-800/80">
          Apoio ao diagnóstico de TEA
        </p>
        <h1 className="text-balance text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl md:text-4xl md:leading-tight">
          Você não está sozinho. Vamos entender isso juntos.
        </h1>
        <p
          id="landing-intro"
          className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-600 sm:text-xl sm:leading-relaxed"
        >
          Este espaço foi pensado para reduzir a ansiedade do primeiro momento e organizar
          os próximos passos com calma. Escolha o que mais se aproxima da sua situação —
          você pode voltar quando quiser.
        </p>
      </header>

      <div
        className="mt-12 flex flex-col gap-4 sm:mt-14 sm:flex-row sm:justify-center sm:gap-6"
        role="group"
        aria-label="Escolha sua trilha de conteúdo"
      >
        <button
          type="button"
          onClick={onChooseSelf}
          aria-describedby="landing-intro"
          className="min-h-[3.25rem] w-full rounded-2xl border-2 border-sky-200 bg-sky-100/80 px-6 py-5 text-left text-lg font-semibold leading-snug text-slate-900 shadow-sm transition-colors hover:border-sky-300 hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 focus-visible:ring-2 focus-visible:ring-sky-500 sm:max-w-sm sm:text-center"
        >
          Eu fui diagnosticado recentemente
        </button>
        <button
          type="button"
          onClick={onChooseLovedOne}
          aria-describedby="landing-intro"
          className="min-h-[3.25rem] w-full rounded-2xl border-2 border-emerald-200 bg-emerald-50/90 px-6 py-5 text-left text-lg font-semibold leading-snug text-slate-900 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-600 sm:max-w-sm sm:text-center"
        >
          Alguém próximo a mim foi diagnosticado
        </button>
      </div>

      <p className="mt-10 text-center text-sm leading-relaxed text-slate-500">
        Conteúdo informativo. Não substitui avaliação ou acompanhamento profissional.
      </p>
    </div>
  );
}
