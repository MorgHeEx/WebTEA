type TrackProgressHeaderProps = {
  eyebrow: string;
  title: string;
  viewedCount: number;
  totalSections: number;
  onBack: () => void;
  variant: "self" | "loved";
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
        <div className="space-y-2">
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
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">{title}</h1>
        </div>
        <button
          type="button"
          onClick={onBack}
          className={`self-start rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${backRing}`}
        >
          Voltar ao início
        </button>
      </div>

      <div className="rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-sm">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
          <span>
            <span className="font-semibold text-slate-800">{viewedCount}</span> de{" "}
            <span className="font-semibold text-slate-800">{totalSections}</span> seções lidas
          </span>
          <span className="text-slate-500">{pct}%</span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/90"
          role="progressbar"
          aria-valuenow={viewedCount}
          aria-valuemin={0}
          aria-valuemax={totalSections}
          aria-valuetext={`${viewedCount} de ${totalSections} seções lidas`}
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
