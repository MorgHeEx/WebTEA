export type InteractiveChecklistItem = {
  title: string;
  hint?: string;
  bullets?: string[];
};

type InteractiveChecklistProps = {
  intro?: string;
  items: InteractiveChecklistItem[];
  checked: boolean[];
  onToggle: (index: number, next: boolean) => void;
  accent?: "sky" | "emerald";
};

function CheckIcon({ done }: { done: boolean }) {
  return (
    <span
      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
        done
          ? "border-emerald-500 bg-emerald-500 text-white"
          : "border-slate-300 bg-white text-transparent"
      }`}
      aria-hidden
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={done ? "opacity-100" : "opacity-0"}>
        <path
          d="M3.5 8.5L6.5 11.5L12.5 4.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Checklist com estado persistente (controlado pelo pai / localStorage).
 */
export function InteractiveChecklist({
  intro,
  items,
  checked,
  onToggle,
  accent = "sky",
}: InteractiveChecklistProps) {
  const ring =
    accent === "emerald"
      ? "focus-visible:outline-emerald-700 focus-visible:ring-emerald-600"
      : "focus-visible:outline-sky-600 focus-visible:ring-sky-500";

  return (
    <div className="space-y-4">
      {intro ? (
        <p className="max-w-prose text-base leading-relaxed text-slate-700">{intro}</p>
      ) : null}
      <p className="text-sm font-medium text-slate-600">Ordem sugerida — marque no seu ritmo.</p>
      <ol className="space-y-3">
        {items.map((item, index) => {
          const isDone = Boolean(checked[index]);
          return (
            <li key={index} className="list-none">
              <button
                type="button"
                onClick={() => onToggle(index, !isDone)}
                aria-pressed={isDone}
                className={`flex w-full gap-3 rounded-xl border border-slate-200/90 bg-white/95 p-4 text-left shadow-sm transition-colors hover:border-slate-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-2 ${ring} ${
                  isDone ? "border-emerald-200/80 bg-emerald-50/30" : ""
                }`}
              >
                <CheckIcon done={isDone} />
                <span className="flex min-w-0 flex-1 flex-col gap-2">
                  <span className="flex flex-wrap items-baseline gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                      {index + 1}
                    </span>
                    <span className="font-medium text-slate-900">{item.title}</span>
                  </span>
                  {item.hint ? (
                    <span className="block max-w-prose text-sm leading-relaxed text-slate-600">
                      {item.hint}
                    </span>
                  ) : null}
                  {item.bullets && item.bullets.length > 0 ? (
                    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
                      {item.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
