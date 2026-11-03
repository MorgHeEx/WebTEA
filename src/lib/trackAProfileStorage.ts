export type SupportLevel = 1 | 2;

export type TrackAProfileState = {
  v: 1;
  gateCompleted: boolean;
  level: SupportLevel | null;
};

const KEY = "webtea-tracka-profile-v1";

export function defaultTrackAProfile(): TrackAProfileState {
  return {
    v: 1,
    gateCompleted: false,
    level: null,
  };
}

export function loadTrackAProfile(): TrackAProfileState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultTrackAProfile();
    const p = JSON.parse(raw) as Partial<TrackAProfileState>;
    if (p.v !== 1) return defaultTrackAProfile();
    const level = p.level === 1 || p.level === 2 ? p.level : null;
    return {
      v: 1,
      gateCompleted: Boolean(p.gateCompleted),
      level,
    };
  } catch {
    return defaultTrackAProfile();
  }
}

export function saveTrackAProfile(state: TrackAProfileState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function levelBadgeLabel(level: SupportLevel): string {
  return level === 1 ? "Nível 1 · pouco suporte" : "Nível 2 · suporte substancial";
}
