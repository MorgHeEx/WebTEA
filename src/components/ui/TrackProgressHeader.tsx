type TrackProgressHeaderProps = {
  eyebrow: string;
  title: string;
  viewedCount: number;
  totalSections: number;
  onBack: () => void;
  variant: "self" | "loved";
  chapterNumber: number;
  chapterCount: number;
  /** Ex.: badge de nível da Trilha A (após questionário). */
  levelBadge?: string | null;
};

export function TrackProgressHeader({
  eyebrow,
  title,
  viewedCount,
  totalSections,
  onBack,
  variant,
  chapterNumber,
  chapterCount,
  levelBadge = null,
}: TrackProgressHeaderProps) {
  const pct = totalSections > 0 ? Math.round((viewedCount / totalSections) * 100) : 0;
  const barFill =
    variant === "self"
      ? "bg-gradient-to-r from-sky-400 to-sky-500"
      : "bg-gradient-to-r from-emerald-400 to-teal-500";

  const backRing =
    variant === "self"
      ? "focus-visible:outline-sky-600"
      : "focus-visible:outline-emerald-700";

  return (
    <div className="mb-10 space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="reading-surface space-y-2 rounded-2xl p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className={`text-sm font-medium ${variant === "self" ? "text-sky-800" : "text-teal-800"}`}
            >
              {eyebrow}
            </p>
            {levelBadge ? (
              <span className="rounded-full border border-sky-200/90 bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-900">
                {levelBadge}
              </span>
            ) : null}
          </div>
          <h1 className="text-2xl font-bold text-stone-800 md:text-3xl">{title}</h1>
          <p className="text-base font-semibold text-stone-600">
            Capítulo {chapterNumber} de {chapterCount}
          </p>
          <ol
            className="flex items-center gap-2 pt-1"
            aria-label={`Capítulo ${chapterNumber} de ${chapterCount}`}
          >
            {Array.from({ length: chapterCount }, (_, index) => (
              <li
                key={index}
                aria-current={index + 1 === chapterNumber ? "step" : undefined}
                className={`h-3 w-3 rounded-full ${
                  index + 1 === chapterNumber
                    ? variant === "self"
                      ? "bg-orange-700 ring-2 ring-orange-200"
                      : "bg-rose-700 ring-2 ring-rose-200"
                    : index + 1 < chapterNumber
                      ? "bg-green-700"
                      : "bg-stone-300"
                }`}
              />
            ))}
          </ol>
        </div>
        <button
          type="button"
          onClick={onBack}
          className={`min-h-12 self-start rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${backRing}`}
        >
          Voltar ao início
        </button>
      </div>

      <div className="rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-sm">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
          <span>
            <span className="font-semibold text-slate-800">{viewedCount}</span> de{" "}
            <span className="font-semibold text-slate-800">{totalSections}</span> capítulos concluídos
          </span>
          <span className="text-slate-500">{pct}%</span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/90"
          role="progressbar"
          aria-valuenow={viewedCount}
          aria-valuemin={0}
          aria-valuemax={totalSections}
          aria-valuetext={`${viewedCount} de ${totalSections} seções visitadas`}
          aria-label="Progresso de leitura das seções"
        >
          <div
            className={`h-full rounded-full transition-[width] duration-300 ease-out motion-reduce:transition-none ${barFill}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
