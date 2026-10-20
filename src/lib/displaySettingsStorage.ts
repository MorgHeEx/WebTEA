export type ThemeId = "default" | "dark" | "light" | "contrast";
export type FontSizeId = "sm" | "md" | "lg" | "xl";
export type FontFamilyId = "nunito" | "atkinson" | "opendyslexic";
export type LineSpacingId = "normal" | "relaxed";

export type DisplaySettings = {
  v: 1;
  theme: ThemeId;
  fontSize: FontSizeId;
  lineSpacing: LineSpacingId;
  fontFamily: FontFamilyId;
  reduceMotion: boolean;
  highlightLinks: boolean;
  extraSpacing: boolean;
  focusMode: boolean;
  zoom: number;
};

export const DISPLAY_SETTINGS_KEY = "webtea-display-settings-v1";

export const FONT_SIZE_PX: Record<FontSizeId, number> = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
};

export const DEFAULT_DISPLAY_SETTINGS: DisplaySettings = {
  v: 1,
  theme: "default",
  fontSize: "md",
  lineSpacing: "normal",
  fontFamily: "nunito",
  reduceMotion: false,
  highlightLinks: false,
  extraSpacing: false,
  focusMode: false,
  zoom: 100,
};

function clampZoom(n: number): number {
  if (!Number.isFinite(n)) return 100;
  return Math.min(150, Math.max(80, Math.round(n)));
}

export function loadDisplaySettings(): DisplaySettings {
  try {
    const raw = localStorage.getItem(DISPLAY_SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_DISPLAY_SETTINGS };
    const parsed = JSON.parse(raw) as Partial<DisplaySettings>;
    if (parsed.v !== 1) return { ...DEFAULT_DISPLAY_SETTINGS };
    return {
      v: 1,
      theme:
        parsed.theme === "dark" ||
        parsed.theme === "light" ||
        parsed.theme === "contrast" ||
        parsed.theme === "default"
          ? parsed.theme
          : "default",
      fontSize:
        parsed.fontSize === "sm" ||
        parsed.fontSize === "md" ||
        parsed.fontSize === "lg" ||
        parsed.fontSize === "xl"
          ? parsed.fontSize
          : "md",
      lineSpacing: parsed.lineSpacing === "relaxed" ? "relaxed" : "normal",
      fontFamily:
        parsed.fontFamily === "atkinson" || parsed.fontFamily === "opendyslexic"
          ? parsed.fontFamily
          : "nunito",
      reduceMotion: Boolean(parsed.reduceMotion),
      highlightLinks: Boolean(parsed.highlightLinks),
      extraSpacing: Boolean(parsed.extraSpacing),
      focusMode: Boolean(parsed.focusMode),
      zoom: clampZoom(typeof parsed.zoom === "number" ? parsed.zoom : 100),
    };
  } catch {
    return { ...DEFAULT_DISPLAY_SETTINGS };
  }
}

export function saveDisplaySettings(settings: DisplaySettings): void {
  try {
    localStorage.setItem(DISPLAY_SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    /* ignore */
  }
}

export function clearDisplaySettings(): void {
  try {
    localStorage.removeItem(DISPLAY_SETTINGS_KEY);
  } catch {
    /* ignore */
  }
}

const FONT_LINKS: Record<Exclude<FontFamilyId, "nunito">, { id: string; href: string }> = {
  atkinson: {
    id: "webtea-font-atkinson",
    href: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  },
  opendyslexic: {
    id: "webtea-font-opendyslexic",
    href: "https://fonts.cdnfonts.com/css/opendyslexic",
  },
};

export function ensureFontLoaded(family: FontFamilyId): void {
  if (family === "nunito" || typeof document === "undefined") return;
  const meta = FONT_LINKS[family];
  if (document.getElementById(meta.id)) return;
  const link = document.createElement("link");
  link.id = meta.id;
  link.rel = "stylesheet";
  link.href = meta.href;
  document.head.appendChild(link);
}

const FONT_CSS: Record<FontFamilyId, string> = {
  nunito: '"Nunito", system-ui, sans-serif',
  atkinson: '"Atkinson Hyperlegible", system-ui, sans-serif',
  opendyslexic: '"OpenDyslexic", "Open Dyslexic", system-ui, sans-serif',
};

export function applyDisplaySettings(settings: DisplaySettings): void {
  const root = document.documentElement;
  ensureFontLoaded(settings.fontFamily);

  root.style.setProperty("--base-font-size", `${FONT_SIZE_PX[settings.fontSize]}px`);
  root.style.setProperty(
    "--line-height",
    settings.lineSpacing === "relaxed" ? "2" : "1.6",
  );
  root.style.setProperty("--font-family", FONT_CSS[settings.fontFamily]);
  root.style.setProperty("--page-zoom", String(settings.zoom / 100));

  root.dataset.theme = settings.theme;
  root.dataset.reduceMotion = settings.reduceMotion ? "true" : "false";
  root.dataset.highlightLinks = settings.highlightLinks ? "true" : "false";
  root.dataset.extraSpacing = settings.extraSpacing ? "true" : "false";
  root.dataset.focusMode = settings.focusMode ? "true" : "false";
}
