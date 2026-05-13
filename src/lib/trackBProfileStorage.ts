export type LovedRelation =
  | "mae"
  | "pai"
  | "ava"
  | "avo"
  | "irmao"
  | "irma"
  | "parceiro"
  | "amigo"
  | "colega"
  | "outro";

export type TrackBProfileState = {
  v: 1;
  gateCompleted: boolean;
  relation: LovedRelation | null;
  relationOther: string;
  treatmentGuidance: boolean;
  preferredName: string;
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
  };
}

export function loadTrackBProfile(): TrackBProfileState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultTrackBProfile();
    const p = JSON.parse(raw) as Partial<TrackBProfileState>;
    if (p.v !== 1) return defaultTrackBProfile();
    const rel = p.relation;
    const relation: LovedRelation | null =
      rel === "mae" ||
      rel === "pai" ||
      rel === "ava" ||
      rel === "avo" ||
      rel === "irmao" ||
      rel === "irma" ||
      rel === "parceiro" ||
      rel === "amigo" ||
      rel === "colega" ||
      rel === "outro"
        ? rel
        : null;
    return {
      v: 1,
      gateCompleted: Boolean(p.gateCompleted),
      relation,
      relationOther: typeof p.relationOther === "string" ? p.relationOther : "",
      treatmentGuidance: Boolean(p.treatmentGuidance),
      preferredName: typeof p.preferredName === "string" ? p.preferredName : "",
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
  mae: "Mãe",
  pai: "Pai",
  ava: "Avó",
  avo: "Avô",
  irmao: "Irmão",
  irma: "Irmã",
  parceiro: "Parceiro(a)",
  amigo: "Amigo(a)",
  colega: "Colega",
  outro: "Outro",
};

export function relationLabelFromState(p: TrackBProfileState): string {
  if (!p.relation) return "";
  if (p.relation === "outro") return p.relationOther.trim() || "Outro";
  return RELATION_LABELS[p.relation];
}

export function isPresumedLegalGuardian(relation: LovedRelation | null): boolean {
  return relation === "mae" || relation === "pai" || relation === "ava" || relation === "avo";
}
