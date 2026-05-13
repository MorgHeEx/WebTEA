/**
 * Extrai um número inteiro de idade a partir de texto livre (ex.: "27", "27 anos").
 */
export function parseAgeYears(raw: string): number | null {
  const m = raw.trim().match(/(\d{1,3})/);
  if (!m) return null;
  const n = Number(m[1]);
  if (!Number.isFinite(n) || n < 1 || n > 130) return null;
  return n;
}

/**
 * Estima anos desde o diagnóstico a partir de texto livre (ex.: "5 anos", "6 meses", "1 ano e 3 meses").
 */
export function parseYearsSinceDiagnosis(raw: string): number | null {
  const s = raw.trim().toLowerCase();
  if (!s) return null;

  let years = 0;
  let months = 0;

  const yMatch = s.match(/(\d+)\s*(?:ano|anos)/);
  if (yMatch) years += Number(yMatch[1]);

  const mMatch = s.match(/(\d+)\s*(?:mês|meses)/);
  if (mMatch) months += Number(mMatch[1]);

  if (!yMatch && !mMatch) {
    const onlyNum = s.match(/^(\d{1,2})$/);
    if (onlyNum) {
      const n = Number(onlyNum[1]);
      if (n >= 1 && n <= 80) return n;
    }
    return null;
  }

  const totalYears = years + months / 12;
  if (totalYears <= 0) return null;
  return totalYears;
}

export type DiagnosisDisplayParts = {
  ageOnly?: string;
  sinceOnly?: string;
  combined?: string;
};

/**
 * Monta textos para exibição no mural conforme combinações de idade / tempo desde diagnóstico.
 */
export function buildDiagnosisDisplayLines(
  ageYears: number | null,
  sinceYears: number | null,
): DiagnosisDisplayParts {
  const parts: DiagnosisDisplayParts = {};

  if (ageYears !== null) {
    parts.ageOnly = `${ageYears} anos`;
  }

  if (sinceYears !== null) {
    if (sinceYears < 1) {
      const m = Math.max(1, Math.round(sinceYears * 12));
      parts.sinceOnly = m === 1 ? "diagnosticado há cerca de 1 mês" : `diagnosticado há ${m} meses`;
    } else {
      const y = Math.max(1, Math.floor(sinceYears));
      parts.sinceOnly = y === 1 ? "diagnosticado há 1 ano" : `diagnosticado há ${y} anos`;
    }
  }

  if (ageYears !== null && sinceYears !== null) {
    const atDiag = Math.round(ageYears - sinceYears);
    if (atDiag > 0 && atDiag < ageYears) {
      parts.combined = `${ageYears} anos — diagnosticado aos ${atDiag} anos`;
    }
  }

  return parts;
}
