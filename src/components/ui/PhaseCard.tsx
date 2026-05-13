import type { ReactNode } from "react";

const tones = {
  sky: "border-sky-200/90 bg-sky-50/70",
  rose: "border-rose-200/90 bg-rose-50/65",
  amber: "border-amber-200/90 bg-amber-50/70",
  mint: "border-emerald-200/90 bg-emerald-50/55",
} as const;

export type PhaseTone = keyof typeof tones;

type PhaseCardProps = {
  title: string;
  tone: PhaseTone;
  children: ReactNode;
};

/**
 * Cartão de “fase” emocional — cor distinta do restante para dar respiro visual.
 */
export function PhaseCard({ title, tone, children }: PhaseCardProps) {
  return (
    <div
      className={`rounded-xl border-2 p-4 shadow-sm sm:p-5 ${tones[tone]}`}
      role="region"
      aria-label={title}
    >
      <h3 className="mb-3 text-base font-semibold text-slate-900 sm:text-lg">{title}</h3>
      <div className="space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base [&_p]:max-w-prose">
        {children}
      </div>
    </div>
  );
}
