export type SupportLevel = 1 | 2;

export type LovedRelation = "parentesResponsaveis" | "amigosOutros";

export type TrackBProfileState = {
  v: 1;
  gateCompleted: boolean;
  relation: LovedRelation | null;
  relationOther: string;
  treatmentGuidance: boolean;
  preferredName: string;
  level: SupportLevel | null;
};

const KEY = "webtea-trackb-profile-v1";

export function defaultTrackBProfile(): TrackBProfileState {
  return {
    v: 1,
    gateCompleted: false,
    relation: null,
    relationOther: "",
    treatmentGuidance: false,
    preferredName: "",
    level: null,
  };
}

export function loadTrackBProfile(): TrackBProfileState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultTrackBProfile();
    const p = JSON.parse(raw) as Omit<Partial<TrackBProfileState>, "relation"> & {
      relation?: unknown;
    };
    if (p.v !== 1) return defaultTrackBProfile();
    const rel = p.relation;
    const level = p.level === 1 || p.level === 2 ? p.level : null;
    const relation: LovedRelation | null =
      rel === "mae" ||
      rel === "pai" ||
      rel === "ava" ||
      rel === "avo" ||
      rel === "irmao" ||
      rel === "irma"
        ? "parentesResponsaveis"
        : rel === "parceiro" || rel === "amigo" || rel === "colega" || rel === "outro"
          ? "amigosOutros"
          : null;
    return {
      v: 1,
      gateCompleted: Boolean(p.gateCompleted),
      relation,
      relationOther: typeof p.relationOther === "string" ? p.relationOther : "",
      treatmentGuidance: Boolean(p.treatmentGuidance),
      preferredName: typeof p.preferredName === "string" ? p.preferredName : "",
      level,
    };
  } catch {
    return defaultTrackBProfile();
  }
}

export function saveTrackBProfile(state: TrackBProfileState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export const RELATION_LABELS: Record<LovedRelation, string> = {
  parentesResponsaveis: "Parentes e Responsáveis Legais",
  amigosOutros: "Amigos e Outros",
};

export function relationLabelFromState(p: TrackBProfileState): string {
  if (!p.relation) return "";
  return RELATION_LABELS[p.relation];
}

export function isPresumedLegalGuardian(relation: LovedRelation | null): boolean {
  return relation === "parentesResponsaveis";
}
