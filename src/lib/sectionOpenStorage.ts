const STORAGE_KEY = "webtea-section-open-v1";

type OpenMap = Record<string, boolean>;

function loadMap(): OpenMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const out: OpenMap = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === "boolean") out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

function saveMap(map: OpenMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* quota / private mode */
  }
}

/** Default: seções abertas. */
export function loadSectionOpen(sectionId: string): boolean {
  const map = loadMap();
  if (sectionId in map) return map[sectionId]!;
  return true;
}

export function saveSectionOpen(sectionId: string, open: boolean): void {
  const map = loadMap();
  map[sectionId] = open;
  saveMap(map);
}
