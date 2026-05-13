const ADVICE_KEY = "webtea-mural-advice-v1";
const VIVENCIAS_KEY = "webtea-vivencias-v1";

export type AdviceEntry = {
  id: string;
  text: string;
  author?: string;
  createdAt: number;
  /** Linhas extras exibidas abaixo do nome (nível, idade, diagnóstico). */
  metaLines?: string[];
};

export type VivenciaEntry = {
  id: string;
  text: string;
  author?: string;
  relation: string;
  createdAt: number;
  /** Texto opcional exibido como destaque (ex.: relação + nível). */
  badgeText?: string;
};

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadAdviceEntries(): AdviceEntry[] {
  const list = safeParse<unknown[]>(localStorage.getItem(ADVICE_KEY), []);
  if (!Array.isArray(list)) return [];
  return list
    .map((row) => {
      if (!row || typeof row !== "object") return null;
      const o = row as Record<string, unknown>;
      if (typeof o.id !== "string" || typeof o.text !== "string" || typeof o.createdAt !== "number")
        return null;
      const metaLines = Array.isArray(o.metaLines)
        ? o.metaLines.filter((x): x is string => typeof x === "string").map((x) => x.slice(0, 200))
        : undefined;
      return {
        id: o.id,
        text: o.text.slice(0, 400),
        author: typeof o.author === "string" ? o.author.slice(0, 80) : undefined,
        createdAt: o.createdAt,
        metaLines: metaLines && metaLines.length ? metaLines : undefined,
      } satisfies AdviceEntry;
    })
    .filter(Boolean) as AdviceEntry[];
}

export function saveAdviceEntries(entries: AdviceEntry[]): void {
  try {
    localStorage.setItem(ADVICE_KEY, JSON.stringify(entries));
  } catch {
    /* ignore */
  }
}

export function loadVivenciaEntries(): VivenciaEntry[] {
  const list = safeParse<unknown[]>(localStorage.getItem(VIVENCIAS_KEY), []);
  if (!Array.isArray(list)) return [];
  return list
    .map((row) => {
      if (!row || typeof row !== "object") return null;
      const o = row as Record<string, unknown>;
      if (typeof o.id !== "string" || typeof o.text !== "string" || typeof o.createdAt !== "number")
        return null;
      return {
        id: o.id,
        text: o.text.slice(0, 400),
        author: typeof o.author === "string" ? o.author.slice(0, 80) : undefined,
        relation: typeof o.relation === "string" ? o.relation.slice(0, 40) : "",
        createdAt: o.createdAt,
        badgeText: typeof o.badgeText === "string" ? o.badgeText.slice(0, 120) : undefined,
      } satisfies VivenciaEntry;
    })
    .filter(Boolean) as VivenciaEntry[];
}

export function saveVivenciaEntries(entries: VivenciaEntry[]): void {
  try {
    localStorage.setItem(VIVENCIAS_KEY, JSON.stringify(entries));
  } catch {
    /* ignore */
  }
}

export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
