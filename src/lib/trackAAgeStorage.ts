export type AgeBand = "under-18" | "18-or-older";

const KEY = "webtea-tracka-age-band-v1";

export function loadTrackAAgeBand(): AgeBand | null {
  try {
    const stored = localStorage.getItem(KEY);
    return stored === "under-18" || stored === "18-or-older" ? stored : null;
  } catch {
    return null;
  }
}

export function saveTrackAAgeBand(ageBand: AgeBand): void {
  try {
    localStorage.setItem(KEY, ageBand);
  } catch {
    /* ignore */
  }
}
