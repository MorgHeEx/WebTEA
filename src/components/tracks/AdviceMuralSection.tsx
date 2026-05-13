import { useMemo, useState } from "react";
import {
  loadAdviceEntries,
  saveAdviceEntries,
  newId,
  type AdviceEntry,
} from "../../lib/localWallStorage";
import { loadTrackAProfile } from "../../lib/trackAProfileStorage";
import {
  buildDiagnosisDisplayLines,
  parseAgeYears,
  parseYearsSinceDiagnosis,
} from "../../utils/profileMeta";
import { formatRelativeTimePt } from "../../utils/relativeTimePt";

const MAX = 280;

function CheckMini() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-400 bg-emerald-50 text-emerald-700" aria-hidden>
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
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

export function AdviceMuralSection() {
  const profile = useMemo(() => loadTrackAProfile(), []);
  const prefName = profile.preferredName.trim();
  const [entries, setEntries] = useState<AdviceEntry[]>(() => loadAdviceEntries());
  const [text, setText] = useState("");
  const [author, setAuthor] = useState(prefName);
  const [nameFromProfile, setNameFromProfile] = useState(Boolean(prefName));
  const [error, setError] = useState<string | null>(null);

  const [shareLevel, setShareLevel] = useState(false);
  const [shareAge, setShareAge] = useState(false);
  const [shareSince, setShareSince] = useState(false);

  const remaining = useMemo(() => MAX - text.length, [text.length]);

  const metaPreview = useMemo(() => {
    const lines: string[] = [];
    if (shareLevel && profile.level) {
      lines.push(profile.level === 1 ? "Nível 1" : "Nível 2");
    }
    const ageY = parseAgeYears(profile.age);
    const sinceY = parseYearsSinceDiagnosis(profile.sinceDiagnosis);
    const parts = buildDiagnosisDisplayLines(ageY, sinceY);

    if (shareAge && !shareSince && parts.ageOnly) lines.push(parts.ageOnly);
    if (!shareAge && shareSince && parts.sinceOnly) lines.push(parts.sinceOnly);
    if (shareAge && shareSince) {
      if (parts.combined) lines.push(parts.combined);
      else {
        if (parts.ageOnly) lines.push(parts.ageOnly);
        if (parts.sinceOnly) lines.push(parts.sinceOnly);
      }
    }
    return lines;
  }, [shareLevel, shareAge, shareSince, profile.level, profile.age, profile.sinceDiagnosis]);

  function buildMetaForPublish(): string[] {
    return metaPreview;
  }

  function publish() {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Escreva um conselho antes de publicar.");
      return;
    }
    setError(null);
    const metaLines = buildMetaForPublish();
    const next: AdviceEntry[] = [
      {
        id: newId(),
        text: trimmed.slice(0, MAX),
        author: author.trim() || undefined,
        createdAt: Date.now(),
        metaLines: metaLines.length ? metaLines : undefined,
      },
      ...entries,
    ];
    setEntries(next);
    saveAdviceEntries(next);
    setText("");
    if (!nameFromProfile) setAuthor("");
  }

  const authorInputClass =
    nameFromProfile && author.trim() === prefName && prefName
      ? "border-emerald-300 ring-1 ring-emerald-100"
      : "border-slate-300";

  return (
    <div className="space-y-6">
      <p className="max-w-prose text-base leading-relaxed text-slate-700">
        Que conselho você queria ter recebido quando foi diagnosticado? Compartilhe com quem está
        começando essa jornada agora.
      </p>

      <div className="rounded-2xl border border-sky-200/80 bg-sky-50/40 p-5 shadow-sm sm:p-6">
        <label htmlFor="advice-text" className="text-sm font-medium text-slate-800">
          Seu conselho
        </label>
        <textarea
          id="advice-text"
          value={text}
          maxLength={MAX}
          rows={4}
          onChange={(e) => setText(e.target.value)}
          className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="Escreva com carinho — este espaço é só leitura pública, sem curtidas."
        />
        <div className="mt-1 flex justify-end text-xs text-slate-500">
          <span aria-live="polite">{remaining} caracteres restantes</span>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="advice-author" className="text-sm font-medium text-slate-800">
              Primeiro nome ou apelido (opcional)
            </label>
            {nameFromProfile && prefName ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-900">
                <CheckMini />
                Preenchido do início da trilha
              </span>
            ) : null}
          </div>
          <input
            id="advice-author"
            type="text"
            value={author}
            maxLength={80}
            onChange={(e) => {
              setAuthor(e.target.value);
              if (prefName) setNameFromProfile(e.target.value.trim() === prefName);
            }}
            className={`mt-1 w-full rounded-xl border bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200 ${authorInputClass}`}
          />
        </div>

        <details className="mt-5 rounded-xl border border-slate-200/90 bg-white/80 px-3 py-2">
          <summary className="cursor-pointer select-none text-sm font-semibold text-slate-800">
            Compartilhar mais sobre mim (opcional)
          </summary>
          <div className="mt-3 space-y-3 border-t border-slate-100 pt-3">
            <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                checked={shareLevel}
                disabled={!profile.level}
                onChange={(e) => setShareLevel(e.target.checked)}
              />
              <span>
                Compartilhar meu nível de suporte
                {!profile.level ? (
                  <span className="block text-xs text-slate-500">(disponível após escolher nível no início da trilha)</span>
                ) : null}
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                checked={shareAge}
                disabled={!profile.age.trim()}
                onChange={(e) => setShareAge(e.target.checked)}
              />
              <span>
                Compartilhar minha idade
                {!profile.age.trim() ? (
                  <span className="block text-xs text-slate-500">(preencha idade no início da trilha)</span>
                ) : null}
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                checked={shareSince}
                disabled={!profile.sinceDiagnosis.trim()}
                onChange={(e) => setShareSince(e.target.checked)}
              />
              <span>
                Compartilhar quando fui diagnosticado
                {!profile.sinceDiagnosis.trim() ? (
                  <span className="block text-xs text-slate-500">(preencha no início da trilha)</span>
                ) : null}
              </span>
            </label>
          </div>
        </details>

        <div className="mt-5 rounded-xl border border-dashed border-sky-200 bg-white/90 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pré-visualização</p>
          <p className="mt-2 whitespace-pre-wrap text-base leading-relaxed text-slate-800">{text.trim() || "…"}</p>
          <p className="mt-3 text-xs text-slate-500">
            {(author.trim() || "Anônimo")} · agora
          </p>
          {metaPreview.length ? (
            <ul className="mt-2 space-y-1 text-xs text-slate-600">
              {metaPreview.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
        </div>

        {error ? (
          <p className="mt-3 text-sm text-rose-700" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          onClick={publish}
          className="mt-5 rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
        >
          Publicar conselho
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Conselhos publicados
        </h3>
        {entries.length === 0 ? (
          <p className="text-sm text-slate-600">Ainda não há conselhos por aqui. Seja o primeiro.</p>
        ) : (
          <ul className="space-y-3">
            {entries.map((e) => (
              <li
                key={e.id}
                className="rounded-2xl border border-sky-100/90 bg-sky-50/60 px-4 py-4 shadow-sm"
              >
                <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-800">{e.text}</p>
                <p className="mt-3 text-xs text-slate-500">
                  {(e.author && e.author.trim()) || "Anônimo"} · {formatRelativeTimePt(e.createdAt)}
                </p>
                {e.metaLines && e.metaLines.length ? (
                  <ul className="mt-2 space-y-0.5 text-xs text-slate-600">
                    {e.metaLines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
