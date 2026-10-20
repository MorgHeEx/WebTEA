import { useEffect, useId, useRef } from "react";
import type { DisplaySettings, FontFamilyId, FontSizeId, ThemeId } from "../../lib/displaySettingsStorage";

type DisplaySettingsPanelProps = {
  open: boolean;
  onClose: () => void;
  settings: DisplaySettings;
  onUpdate: (patch: Partial<Omit<DisplaySettings, "v">>) => void;
  onResetAll: () => void;
};

const THEMES: { id: ThemeId; label: string; hint: string }[] = [
  { id: "default", label: "🌸 Padrão", hint: "Azul claro e verde menta" },
  { id: "dark", label: "🌙 Escuro", hint: "Fundo escuro, textos claros" },
  { id: "light", label: "☀️ Claro Neutro", hint: "Branco puro, minimalista" },
  { id: "contrast", label: "⚡ Alto Contraste", hint: "Preto, branco e amarelo" },
];

const FONT_SIZES: { id: FontSizeId; label: string }[] = [
  { id: "sm", label: "Pequeno" },
  { id: "md", label: "Padrão" },
  { id: "lg", label: "Grande" },
  { id: "xl", label: "Muito grande" },
];

const FONTS: { id: FontFamilyId; label: string; hint: string }[] = [
  { id: "nunito", label: "Padrão (Nunito)", hint: "Fonte atual do site" },
  {
    id: "atkinson",
    label: "Legibilidade (Atkinson Hyperlegible)",
    hint: "Projetada para baixa visão",
  },
  {
    id: "opendyslexic",
    label: "Dislexia (OpenDyslexic)",
    hint: "Projetada para pessoas com dislexia",
  },
];

function GearIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M19.4 15a1.7 1.7 0 00.34 1.86l.06.06a2 2 0 11-2.83 2.83l-.06-.06A1.7 1.7 0 0015 19.4a1.7 1.7 0 00-1 .6 1.7 1.7 0 00-.33 1.05V21a2 2 0 11-4 0v-.09A1.7 1.7 0 008.6 19.4a1.7 1.7 0 00-1.86.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.7 1.7 0 004.6 15a1.7 1.7 0 00-.6-1 1.7 1.7 0 00-1.05-.33H3a2 2 0 110-4h.09A1.7 1.7 0 004.6 8.6a1.7 1.7 0 00-.34-1.86l-.06-.06a2 2 0 112.83-2.83l.06.06A1.7 1.7 0 008.6 4.6a1.7 1.7 0 001-.6 1.7 1.7 0 00.33-1.05V3a2 2 0 114 0v.09a1.7 1.7 0 001 1.51 1.7 1.7 0 001.86-.34l.06-.06a2 2 0 112.83 2.83l-.06.06A1.7 1.7 0 0019.4 8.6a1.7 1.7 0 00.6 1 1.7 1.7 0 001.05.33H21a2 2 0 110 4h-.09a1.7 1.7 0 00-1.51 1z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-3 py-2">
      <div className="min-w-0">
        <label htmlFor={id} className="text-sm font-medium text-slate-800">
          {label}
        </label>
        {description ? (
          <p className="mt-0.5 text-xs text-slate-500">{description}</p>
        ) : null}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
          checked ? "bg-sky-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export function DisplaySettingsTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Abrir configurações de exibição"
      className="settings-trigger fixed right-4 top-4 z-[90] flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-md hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
    >
      <GearIcon />
    </button>
  );
}

export function DisplaySettingsPanel({
  open,
  onClose,
  settings,
  onUpdate,
  onResetAll,
}: DisplaySettingsPanelProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95]" role="presentation">
      <button
        type="button"
        aria-label="Fechar configurações"
        className="absolute inset-0 bg-slate-900/40"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="settings-panel absolute right-0 top-0 flex h-dvh w-[min(300px,100vw)] flex-col border-l border-slate-200 bg-white shadow-xl animate-slide-in-right"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 id={titleId} className="text-base font-semibold text-slate-900">
            Configurações de exibição
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar painel"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            <span aria-hidden className="text-xl leading-none">
              ×
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 text-slate-800">
          <section className="pb-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Aparência</h3>
            <div className="grid gap-2" role="radiogroup" aria-label="Tema">
              {THEMES.map((t) => {
                const selected = settings.theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onUpdate({ theme: t.id })}
                    className={`rounded-xl border px-3 py-2.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                      selected
                        ? "border-sky-400 bg-sky-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <span className="block text-sm font-medium">{t.label}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{t.hint}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <hr className="border-slate-200" />

          <section className="py-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Tamanho do texto</h3>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Tamanho da fonte">
              {FONT_SIZES.map((f) => {
                const selected = settings.fontSize === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onUpdate({ fontSize: f.id })}
                    className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                      selected
                        ? "border-sky-400 bg-sky-50 text-sky-900"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            <p className="mb-2 mt-4 text-xs font-medium text-slate-700">Espaçamento entre linhas</p>
            <div className="flex gap-2" role="group" aria-label="Espaçamento entre linhas">
              {(
                [
                  { id: "normal" as const, label: "Padrão" },
                  { id: "relaxed" as const, label: "Espaçado" },
                ] as const
              ).map((opt) => {
                const selected = settings.lineSpacing === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onUpdate({ lineSpacing: opt.id })}
                    className={`flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                      selected
                        ? "border-sky-400 bg-sky-50 text-sky-900"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </section>

          <hr className="border-slate-200" />

          <section className="py-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Tipo de letra</h3>
            <div className="grid gap-2" role="radiogroup" aria-label="Fonte">
              {FONTS.map((f) => {
                const selected = settings.fontFamily === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onUpdate({ fontFamily: f.id })}
                    className={`rounded-xl border px-3 py-2.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                      selected
                        ? "border-sky-400 bg-sky-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <span className="block text-sm font-medium">{f.label}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{f.hint}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <hr className="border-slate-200" />

          <section className="py-4">
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Preferências de exibição</h3>
            <Toggle
              label="Reduzir animações"
              description="Desativa transitions e animations"
              checked={settings.reduceMotion}
              onChange={(reduceMotion) => onUpdate({ reduceMotion })}
            />
            <Toggle
              label="Destacar links"
              description="Sublinha e destaca todos os links"
              checked={settings.highlightLinks}
              onChange={(highlightLinks) => onUpdate({ highlightLinks })}
            />
            <Toggle
              label="Espaçamento extra"
              description="Aumenta o espaço entre seções"
              checked={settings.extraSpacing}
              onChange={(extraSpacing) => onUpdate({ extraSpacing })}
            />
            <Toggle
              label="Modo foco"
              description="Esconde sumário e elementos secundários"
              checked={settings.focusMode}
              onChange={(focusMode) => onUpdate({ focusMode })}
            />
          </section>

          <hr className="border-slate-200" />

          <section className="py-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Zoom</h3>
            <label className="mb-2 flex items-center justify-between text-xs text-slate-600">
              <span>Escala da página</span>
              <span className="font-medium text-slate-800">{settings.zoom}%</span>
            </label>
            <input
              type="range"
              min={80}
              max={150}
              step={5}
              value={settings.zoom}
              onChange={(e) => onUpdate({ zoom: Number(e.target.value) })}
              className="w-full accent-sky-600"
              aria-valuetext={`${settings.zoom} por cento`}
            />
            <button
              type="button"
              onClick={() => onUpdate({ zoom: 100 })}
              className="mt-2 text-xs font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              Restaurar padrão
            </button>
          </section>
        </div>

        <div className="border-t border-slate-200 px-4 py-3">
          <button
            type="button"
            onClick={onResetAll}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Restaurar tudo
          </button>
          <p className="mt-2 text-center text-[11px] leading-snug text-slate-500">
            Suas preferências ficam salvas neste dispositivo
          </p>
        </div>
      </aside>
    </div>
  );
}
