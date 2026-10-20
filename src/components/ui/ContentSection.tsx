import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { loadSectionOpen, saveSectionOpen } from "../../lib/sectionOpenStorage";

export type SectionLabelTone = "sky" | "teal";

type ContentSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  index: number;
  isViewed?: boolean;
  labelTone?: SectionLabelTone;
  /** Quando false, não usa accordion (ex.: hub final). Default true. */
  collapsible?: boolean;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`shrink-0 text-slate-500 transition-transform duration-300 ease-out motion-reduce:transition-none ${
        open ? "rotate-180" : "rotate-0"
      }`}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const ContentSection = forwardRef<HTMLElement, ContentSectionProps>(
  function ContentSection(
    {
      id,
      title,
      children,
      index,
      isViewed = false,
      labelTone = "sky",
      collapsible = true,
    },
    ref,
  ) {
    const panelId = useId();
    const panelRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(() => (collapsible ? loadSectionOpen(id) : true));

    const toggle = useCallback(() => {
      setOpen((prev) => {
        const next = !prev;
        saveSectionOpen(id, next);
        return next;
      });
    }, [id]);

    useEffect(() => {
      const el = panelRef.current;
      if (!el || !collapsible) return;
      if (open) el.removeAttribute("inert");
      else el.setAttribute("inert", "");
    }, [open, collapsible]);

    const labelClass = labelTone === "teal" ? "text-teal-800" : "text-sky-800";

    return (
      <section
        ref={ref}
        id={id}
        aria-labelledby={`${id}-heading`}
        className={`rounded-2xl border bg-white/90 shadow-sm ${
          isViewed
            ? "border-emerald-200/90 ring-1 ring-emerald-100"
            : "border-slate-200/80"
        }`}
      >
        {collapsible ? (
          <h2 id={`${id}-heading`} className="m-0 text-xl font-semibold tracking-tight md:text-2xl">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={toggle}
              className="flex w-full items-start gap-3 rounded-2xl px-6 py-5 text-left text-inherit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 md:px-8 md:py-6"
            >
              <span className="min-w-0 flex-1">
                <span className="mb-2 flex flex-wrap items-center gap-2">
                  <span className={`text-sm font-medium ${labelClass}`}>Seção {index}</span>
                  {isViewed ? (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-900">
                      Você já visitou esta parte
                    </span>
                  ) : null}
                </span>
                <span className="block text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                  {title}
                </span>
              </span>
              <Chevron open={open} />
            </button>
          </h2>
        ) : (
          <div className="px-6 pt-6 md:px-8 md:pt-8">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <p className={`text-sm font-medium ${labelClass}`}>Seção {index}</p>
              {isViewed ? (
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-900">
                  Você já visitou esta parte
                </span>
              ) : null}
            </div>
            <h2
              id={`${id}-heading`}
              className="mb-5 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl"
            >
              {title}
            </h2>
          </div>
        )}

        <div
          ref={panelRef}
          id={collapsible ? panelId : undefined}
          role={collapsible ? "region" : undefined}
          aria-labelledby={collapsible ? `${id}-heading` : undefined}
          aria-hidden={collapsible ? !open : undefined}
          className="overflow-hidden transition-[max-height] duration-300 ease-out motion-reduce:transition-none"
          style={collapsible ? { maxHeight: open ? "5000px" : "0px" } : undefined}
        >
          <div className="space-y-4 px-6 pb-6 text-base leading-relaxed text-slate-700 md:px-8 md:pb-8 md:text-lg [&_p]:max-w-prose">
            {children}
          </div>
        </div>
      </section>
    );
  },
);
