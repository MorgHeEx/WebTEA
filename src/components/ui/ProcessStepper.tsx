type Step = { title: string; detail?: string };

type ProcessStepperProps = {
  steps: Step[];
  accent?: "sky" | "emerald";
};

export function ProcessStepper({ steps, accent = "sky" }: ProcessStepperProps) {
  const bullet =
    accent === "emerald"
      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
      : "border-sky-500 bg-sky-50 text-sky-900";

  return (
    <ol className="space-y-4">
      {steps.map((step, index) => (
        <li key={index} className="flex gap-3">
          <span
            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${bullet}`}
            aria-hidden
          >
            {index + 1}
          </span>
          <div className="min-w-0">
            <p className="font-medium leading-snug text-slate-900">{step.title}</p>
            {step.detail ? (
              <p className="mt-1 max-w-prose text-sm leading-relaxed text-slate-600">{step.detail}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
