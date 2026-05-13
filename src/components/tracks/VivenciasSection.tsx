import { useMemo, useState } from "react";
import {
  loadVivenciaEntries,
  saveVivenciaEntries,
  newId,
  type VivenciaEntry,
} from "../../lib/localWallStorage";
import type { SupportLevel } from "../../lib/trackAProfileStorage";
import { buildVivenciaRelationBadge } from "../../utils/vivenciaRelationBadge";
import { formatRelativeTimePt } from "../../utils/relativeTimePt";

const MAX = 280;

type VivenciasSectionProps = {
  relationLabel: string;
  /** Nome vindo do questionário da Trilha B (ou fallback). */
  defaultAuthorName: string;
  dependentLevel: SupportLevel | null;
};

export function VivenciasSection({
  relationLabel,
  defaultAuthorName,
  dependentLevel,
}: VivenciasSectionProps) {
  const [entries, setEntries] = useState<VivenciaEntry[]>(() => loadVivenciaEntries());
  const [text, setText] = useState("");
  const [author, setAuthor] = useState(defaultAuthorName);
  const [nameFromProfile, setNameFromProfile] = useState(() => Boolean(defaultAuthorName.trim()));
  const [shareRelationBadge, setShareRelationBadge] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remaining = useMemo(() => MAX - text.length, [text.length]);

  const badgePreview = useMemo(() => {
    if (!shareRelationBadge) return null;
    return buildVivenciaRelationBadge(relationLabel, dependentLevel);
  }, [shareRelationBadge, relationLabel, dependentLevel]);

  function publish() {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Escreva algo antes de compartilhar.");
      return;
    }
    setError(null);
    const badgeText = shareRelationBadge ? buildVivenciaRelationBadge(relationLabel, dependentLevel) : undefined;
    const next: VivenciaEntry[] = [
      {
        id: newId(),
        text: trimmed.slice(0, MAX),
        author: author.trim() || undefined,
        relation: relationLabel,
        createdAt: Date.now(),
        badgeText,
      },
      ...entries,
    ];
    setEntries(next);
    saveVivenciaEntries(next);
    setText("");
    setAuthor(defaultAuthorName.trim() ? defaultAuthorName : "");
  }

  const def = defaultAuthorName.trim();
  const authorRing =
    nameFromProfile && def && author.trim() === def ? "border-emerald-300 ring-1 ring-emerald-100" : "border-slate-300";

  return (
    <div className="space-y-6">
      <p className="max-w-prose text-base leading-relaxed text-slate-700">
        Se alguém próximo a você foi diagnosticado, você sabe que essa jornada também é sua.
        Compartilhe o que aprendeu com quem está começando agora.
      </p>

      <p className="rounded-lg border border-teal-100 bg-teal-50/40 px-3 py-2 text-sm text-teal-900">
        Sua relação nesta trilha: <strong>{relationLabel}</strong>
      </p>

      <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/35 p-5 shadow-sm sm:p-6">
        <label htmlFor="viv-text" className="text-sm font-medium text-slate-800">
          Sua vivência
        </label>
        <textarea
          id="viv-text"
          value={text}
          maxLength={MAX}
          rows={4}
          onChange={(e) => setText(e.target.value)}
          className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
        <div className="mt-1 flex justify-end text-xs text-slate-500">
          <span aria-live="polite">{remaining} caracteres restantes</span>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="viv-author" className="text-sm font-medium text-slate-800">
              Primeiro nome ou apelido (opcional)
            </label>
            {nameFromProfile && def ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-900">
                Do questionário inicial
              </span>
            ) : null}
          </div>
          <input
            id="viv-author"
            type="text"
            value={author}
            maxLength={80}
            onChange={(e) => {
              setAuthor(e.target.value);
              if (def) setNameFromProfile(e.target.value.trim() === def);
            }}
            className={`mt-1 w-full rounded-xl border bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 ${authorRing}`}
          />
        </div>

        <label className="mt-4 flex cursor-pointer items-start gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            checked={shareRelationBadge}
            onChange={(e) => setShareRelationBadge(e.target.checked)}
          />
          <span>Compartilhar minha relação (como destaque no card)</span>
        </label>

        <div className="mt-5 rounded-xl border border-dashed border-teal-200 bg-white/90 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pré-visualização</p>
          {badgePreview ? (
            <p className="mt-2 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-900">
              {badgePreview}
            </p>
          ) : null}
          <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-slate-800">{text.trim() || "…"}</p>
          <p className="mt-3 text-xs text-slate-600">
            {(author.trim() || "Anônimo")} · {relationLabel} · agora
          </p>
        </div>

        {error ? (
          <p className="mt-3 text-sm text-rose-700" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          onClick={publish}
          className="mt-5 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
        >
          Compartilhar vivência
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Vivências publicadas
        </h3>
        {entries.length === 0 ? (
          <p className="text-sm text-slate-600">Ainda não há relatos. O primeiro passo pode ser o seu.</p>
        ) : (
          <ul className="space-y-3">
            {entries.map((e) => (
              <li
                key={e.id}
                className="rounded-2xl border border-teal-100/90 bg-teal-50/50 px-4 py-4 shadow-sm"
              >
                {e.badgeText ? (
                  <p className="mb-2 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-900">
                    {e.badgeText}
                  </p>
                ) : null}
                <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-800">{e.text}</p>
                <p className="mt-3 text-xs text-slate-600">
                  {(e.author && e.author.trim()) || "Anônimo"} · {e.relation} ·{" "}
                  {formatRelativeTimePt(e.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
