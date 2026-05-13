export type TrackId = "self" | "loved";

export type TrackProgressState = {
  v: 1;
  viewedSections: string[];
  checklists: Record<string, boolean[]>;
};

const STORAGE_PREFIX = "webtea-progress-v1";

function keyFor(track: TrackId): string {
  return `${STORAGE_PREFIX}-${track}`;
}

export const DEFAULT_CHECKLIST_LENGTH: Record<TrackId, Record<string, number>> = {
  self: { "self-s2": 6, "amapa-tea-docs": 8 },
  loved: { "loved-steps": 6, "b-amapa-docs": 8 },
};

function defaultChecklists(track: TrackId): Record<string, boolean[]> {
  const out: Record<string, boolean[]> = {};
  for (const [id, len] of Object.entries(DEFAULT_CHECKLIST_LENGTH[track])) {
    out[id] = Array(len).fill(false);
  }
  return out;
}

function emptyState(track: TrackId): TrackProgressState {
  return {
    v: 1,
    viewedSections: [],
    checklists: defaultChecklists(track),
  };
}

export function loadProgress(track: TrackId): TrackProgressState {
  try {
    const raw = localStorage.getItem(keyFor(track));
    if (!raw) return emptyState(track);
    const parsed = JSON.parse(raw) as Partial<TrackProgressState>;
    if (parsed.v !== 1 || !Array.isArray(parsed.viewedSections)) {
      return emptyState(track);
    }
    const checklists = { ...defaultChecklists(track) };
    if (parsed.checklists && typeof parsed.checklists === "object") {
      for (const [id, arr] of Object.entries(parsed.checklists)) {
        if (!Array.isArray(arr)) continue;
        const targetLen = DEFAULT_CHECKLIST_LENGTH[track][id];
        if (targetLen === undefined) continue;
        checklists[id] = Array.from({ length: targetLen }, (_, i) => Boolean(arr[i]));
      }
    }
    return {
      v: 1,
      viewedSections: [...new Set(parsed.viewedSections.filter((x) => typeof x === "string"))],
      checklists,
    };
  } catch {
    return emptyState(track);
  }
}

export function saveProgress(track: TrackId, state: TrackProgressState): void {
  try {
    localStorage.setItem(keyFor(track), JSON.stringify(state));
  } catch {
    /* quota / private mode */
  }
}

export const SECTION_IDS = {
  self: ["self-s1", "self-s2", "self-s3", "self-s4"] as const,
  loved: ["loved-denial", "loved-steps", "loved-ableism", "loved-vivencias"] as const,
} as const;

export function totalSections(track: TrackId): number {
  return SECTION_IDS[track].length;
}

export function isKnownSection(track: TrackId, sectionId: string): boolean {
  return (SECTION_IDS[track] as readonly string[]).includes(sectionId);
}
