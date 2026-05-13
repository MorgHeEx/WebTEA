import { forwardRef, type ReactNode } from "react";

export type SectionLabelTone = "sky" | "teal";

type ContentSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  index: number;
  isViewed?: boolean;
  labelTone?: SectionLabelTone;
};

export const ContentSection = forwardRef<HTMLElement, ContentSectionProps>(
  function ContentSection(
    { id, title, children, index, isViewed = false, labelTone = "sky" },
    ref,
  ) {
    const labelClass =
      labelTone === "teal"
        ? "text-teal-800"
        : "text-sky-800";

    return (
      <section
        ref={ref}
        id={id}
        aria-labelledby={`${id}-heading`}
        className={`rounded-2xl border bg-white/90 p-6 shadow-sm md:p-8 ${
          isViewed
            ? "border-emerald-200/90 ring-1 ring-emerald-100"
            : "border-slate-200/80"
        }`}
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
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
        <div className="space-y-4 text-base leading-relaxed text-slate-700 md:text-lg [&_p]:max-w-prose">
          {children}
        </div>
      </section>
    );
  },
);
