import { useEffect, useRef, useState } from "react";

export type TocItem = {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
};

type TrackTocProps = {
  items: TocItem[];
  variant: "self" | "loved";
  onSelect: (id: string) => void;
};

export function TrackToc({ items, variant, onSelect }: TrackTocProps) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const activeClasses =
    variant === "self"
      ? "border-orange-400 bg-orange-50 focus-visible:outline-orange-700"
      : "border-rose-400 bg-rose-50 focus-visible:outline-rose-700";
  const numberClasses = variant === "self" ? "bg-orange-700" : "bg-rose-700";

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) {
        wasOpen.current = false;
        triggerRef.current?.focus();
      }
      return;
    }
    wasOpen.current = true;
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function renderItems(closeAfterSelect = false) {
    return (
      <ol className="space-y-2">
        {items.map((item, index) => (
          <li key={item.id}>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => {
                onSelect(item.id);
                if (closeAfterSelect) setOpen(false);
              }}
              aria-current={item.current ? "step" : undefined}
              className={`flex min-h-12 w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                item.current
                  ? `chapter-toc-current ${activeClasses} text-stone-900`
                  : item.completed
                    ? "border-green-200 bg-green-50/70 text-green-900 focus-visible:outline-green-700"
                    : "border-stone-200 bg-white/70 text-stone-700 hover:bg-stone-50 focus-visible:outline-stone-700"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  item.completed
                    ? "bg-green-700 text-white"
                    : item.current
                      ? `${numberClasses} text-white`
                      : "bg-stone-200 text-stone-700"
                }`}
                aria-hidden="true"
              >
                {item.completed ? "✓" : index + 1}
              </span>
              <span className="min-w-0 flex-1">{item.label}</span>
              <span className="sr-only">
                {item.completed ? "Concluído" : item.current ? "Capítulo atual" : "Não lido"}
              </span>
            </button>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-4 min-h-12 rounded-xl border border-stone-300 bg-white/90 px-4 py-2 text-sm font-semibold text-stone-800 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-700 lg:hidden"
      >
        Capítulos
      </button>
      <nav
        aria-label="Capítulos"
        className="toc-panel sticky top-6 hidden max-h-[calc(100dvh-3rem)] w-64 shrink-0 overflow-y-auto rounded-2xl border border-amber-200/70 bg-[#fffcf7]/95 p-4 shadow-sm lg:block"
      >
        <p className="mb-3 text-sm font-bold text-stone-800">Capítulos</p>
        {renderItems()}
      </nav>
      {open ? (
        <div className="fixed inset-0 z-[100] lg:hidden" role="presentation">
          <button
            type="button"
            aria-label="Fechar sumário de capítulos"
            className="absolute inset-0 bg-stone-950/50"
            onClick={() => setOpen(false)}
          />
          <nav
            aria-label="Capítulos"
            className="absolute inset-y-0 right-0 flex w-[min(360px,90vw)] flex-col overflow-y-auto border-l border-amber-200/70 bg-[#fffcf7] p-5 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-stone-800">Capítulos</h2>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-12 min-w-12 rounded-lg text-2xl text-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-700"
                aria-label="Fechar capítulos"
              >
                ×
              </button>
            </div>
            {renderItems(true)}
          </nav>
        </div>
      ) : null}
    </>
  );
}
