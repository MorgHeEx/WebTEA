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
  { id: "default", label: "Claro", hint: "Tons suaves de pêssego e creme" },
  { id: "dark", label: "Escuro", hint: "Cacau quente e textos claros" },
  { id: "light", label: "Claro neutro", hint: "Cores frias e fundo branco sem animação" },
  { id: "contrast", label: "Alto contraste", hint: "Preto, branco e amarelo" },
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
    label: "Fonte OpenDyslexic",
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
    <div className="flex min-h-12 items-center justify-between gap-3 py-2">
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
        className={`toggle-track relative min-h-12 min-w-12 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52] ${
          checked ? "bg-sky-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`toggle-thumb absolute left-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export function DisplaySettingsTrigger({
  onOpen,
  disabled = false,
}: {
  onOpen: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={disabled}
      aria-label="Abrir configurações de exibição"
      className="settings-trigger fixed right-4 top-4 z-[90] flex min-h-12 min-w-12 items-center justify-center rounded-xl border border-amber-200/80 bg-[#fffcf7] text-stone-700 shadow-md hover:bg-amber-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52]"
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
        className="settings-panel absolute right-0 top-0 flex h-dvh w-[min(360px,100vw)] flex-col border-l border-amber-200/70 bg-[#fffcf7] shadow-xl animate-slide-in-right"
      >
        <div className="flex items-center justify-between border-b border-stone-300 px-4 py-3">
          <h2 id={titleId} className="text-lg font-bold text-stone-800">
            Configurações de exibição
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar painel"
            className="flex min-h-12 min-w-12 items-center justify-center rounded-lg text-stone-600 hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52]"
          >
            <span aria-hidden className="text-xl leading-none">
              ×
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 text-stone-800">
          <section className="pb-4">
            <h3 className="mb-3 text-base font-bold text-stone-800">Tema</h3>
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
                    className={`settings-option min-h-12 rounded-xl border px-3 py-2.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52] ${
                      selected
                        ? "selected border-amber-700 bg-amber-100 text-stone-900"
                        : "border-stone-300 bg-[#fffcf7] hover:bg-amber-50"
                    }`}
                  >
                    <span className="block text-base font-bold">{t.label}</span>
                    <span className="mt-0.5 block text-sm text-stone-600">{t.hint}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <hr className="border-stone-300" />

          <section className="py-4">
            <h3 className="mb-3 text-base font-bold text-stone-800">Tamanho da fonte</h3>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Tamanho da fonte">
              {FONT_SIZES.map((f) => {
                const selected = settings.fontSize === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onUpdate({ fontSize: f.id })}
                    className={`settings-option min-h-12 rounded-lg border px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52] ${
                      selected
                        ? "selected border-amber-700 bg-amber-100 text-stone-900"
                        : "border-stone-300 text-stone-700 hover:bg-amber-50"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            <p className="mb-2 mt-4 text-base font-semibold text-stone-700">Espaçamento entre linhas</p>
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
                    className={`settings-option flex min-h-12 flex-1 items-center justify-center rounded-lg border px-2 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52] ${
                      selected
                        ? "selected border-amber-700 bg-amber-100 text-stone-900"
                        : "border-stone-300 text-stone-700 hover:bg-amber-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </section>

          <hr className="border-stone-300" />

          <section className="py-4">
            <h3 className="mb-3 text-base font-bold text-stone-800">Tipo de letra</h3>
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
                    className={`settings-option min-h-12 rounded-xl border px-3 py-2.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52] ${
                      selected
                        ? "selected border-amber-700 bg-amber-100"
                        : "border-stone-300 bg-[#fffcf7] hover:bg-amber-50"
                    }`}
                  >
                    <span className="block text-base font-bold">{f.label}</span>
                    <span className="mt-0.5 block text-sm text-stone-600">{f.hint}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <hr className="border-stone-300" />

          <section className="py-4">
            <h3 className="mb-2 text-base font-bold text-stone-800">Preferências de exibição</h3>
            <Toggle
              label="Reduzir animações"
              description="Também pausa o fundo animado"
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
              label="Modo foco"
              description="Esconde o sumário, o rodapé e o fundo decorativo"
              checked={settings.focusMode}
              onChange={(focusMode) => onUpdate({ focusMode })}
            />
          </section>

          <hr className="border-stone-300" />

          <section className="py-4">
            <h3 className="mb-3 text-base font-bold text-stone-800">Zoom</h3>
            <label className="mb-2 flex items-center justify-between text-sm text-stone-600">
              <span>Escala da página</span>
              <span className="font-bold text-stone-800">{settings.zoom}%</span>
            </label>
            <input
              type="range"
              min={80}
              max={150}
              step={5}
              value={settings.zoom}
              onChange={(e) => onUpdate({ zoom: Number(e.target.value) })}
              className="zoom-slider min-h-12 w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52]"
              aria-label="Escala da página"
              aria-valuetext={`${settings.zoom} por cento`}
            />
            <button
              type="button"
              onClick={() => onUpdate({ zoom: 100 })}
              className="mt-2 min-h-12 rounded-lg px-2 text-sm font-semibold text-[#8f4528] underline underline-offset-2 hover:text-[#6f321c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52]"
            >
              Restaurar padrão
            </button>
          </section>
        </div>

        <div className="border-t border-stone-300 px-4 py-3">
          <button
            type="button"
            onClick={onResetAll}
            className="min-h-12 w-full rounded-xl border border-stone-300 bg-[#fffcf7] px-3 py-2.5 text-sm font-semibold text-stone-800 hover:bg-amber-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52]"
          >
            Restaurar tudo
          </button>
          <p className="mt-2 text-center text-sm leading-snug text-stone-600">
            Suas preferências ficam salvas neste dispositivo
          </p>
        </div>
      </aside>
    </div>
  );
}
