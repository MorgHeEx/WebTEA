type LandingPageProps = {
  onChooseSelf: () => void;
  onChooseLovedOne: () => void;
  onExploreAll: () => void;
};

export function LandingPage({
  onChooseSelf,
  onChooseLovedOne,
  onExploreAll,
}: LandingPageProps) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[65ch] flex-col justify-center px-4 py-12 sm:px-6">
      <header className="landing-panel rounded-3xl border border-amber-200/70 bg-[#fffcf7]/95 p-6 text-center shadow-lg sm:p-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#8f4528]">
          Apoio ao diagnóstico de TEA
        </p>
        <h1 className="text-balance text-3xl font-bold leading-tight text-stone-800 sm:text-4xl">
          Você não está sozinho. Vamos entender isso juntos.
        </h1>
        <p
          id="landing-intro"
          className="mx-auto mt-6 max-w-[65ch] text-pretty text-lg leading-[1.7] text-stone-600"
        >
          Este é um guia calmo para organizar os próximos passos após um diagnóstico de TEA.
          Escolha o caminho que faz mais sentido para você agora. Você pode voltar quando quiser.
        </p>
      </header>

      <div
        className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5"
        role="group"
        aria-label="Escolha uma trilha de conteúdo"
      >
        <button
          type="button"
          onClick={onChooseSelf}
          aria-describedby="landing-intro"
          className="track-choice-self min-h-20 rounded-2xl border-[3px] border-orange-500 bg-orange-200 px-5 py-5 text-left text-lg font-bold leading-snug text-stone-900 shadow-md transition-all hover:-translate-y-0.5 hover:border-orange-700 hover:bg-orange-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b20]"
        >
          Eu recebi o diagnóstico recentemente
        </button>
        <button
          type="button"
          onClick={onChooseLovedOne}
          aria-describedby="landing-intro"
          className="track-choice-loved min-h-20 rounded-2xl border-[3px] border-rose-500 bg-rose-200 px-5 py-5 text-left text-lg font-bold leading-snug text-stone-900 shadow-md transition-all hover:-translate-y-0.5 hover:border-rose-700 hover:bg-rose-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8d3348]"
        >
          Alguém próximo a mim foi diagnosticado
        </button>
      </div>

      <button
        type="button"
        onClick={onExploreAll}
        className="reading-surface mx-auto mt-4 min-h-12 rounded-lg px-3 py-2 text-center text-sm text-stone-600 underline decoration-stone-400 underline-offset-2 transition-colors hover:text-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52]"
      >
        Pular trilhas e ir direto para todos os conteúdos
      </button>

      <p className="landing-secondary-panel mt-4 rounded-xl border border-amber-200/70 bg-[#fffcf7]/90 px-4 py-3 text-center text-sm leading-relaxed text-stone-600 shadow-sm">
        Conteúdo informativo. Não substitui avaliação ou acompanhamento profissional.
      </p>
    </div>
  );
}
