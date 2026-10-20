import { useActiveSection } from "../../hooks/useActiveSection";

export type TocItem = {
  id: string;
  label: string;
};

type TrackTocProps = {
  items: TocItem[];
  variant: "self" | "loved";
};

export function TrackToc({ items, variant }: TrackTocProps) {
  const ids = items.map((i) => i.id);
  const activeId = useActiveSection(ids);

  const activeClass =
    variant === "self"
      ? "border-sky-400 bg-sky-50 text-sky-900"
      : "border-teal-400 bg-teal-50 text-teal-900";

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      aria-label="Sumário da página"
      className="toc-panel sticky top-6 hidden max-h-[calc(100dvh-3rem)] w-[200px] shrink-0 overflow-y-auto rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm lg:block"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Nesta página
      </p>
      <ul className="space-y-1">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`w-full rounded-lg border-l-2 px-2.5 py-1.5 text-left text-sm leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                  active
                    ? activeClass
                    : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                aria-current={active ? "true" : undefined}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
