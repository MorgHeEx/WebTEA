import { useCallback, useEffect, useState } from "react";
import {
  applyDisplaySettings,
  clearDisplaySettings,
  DEFAULT_DISPLAY_SETTINGS,
  loadDisplaySettings,
  saveDisplaySettings,
  type DisplaySettings,
} from "../lib/displaySettingsStorage";

export function useDisplaySettings() {
  const [settings, setSettings] = useState<DisplaySettings>(() => loadDisplaySettings());

  useEffect(() => {
    applyDisplaySettings(settings);
  }, [settings]);

  const update = useCallback((patch: Partial<Omit<DisplaySettings, "v">>) => {
    setSettings((prev) => {
      const next: DisplaySettings = { ...prev, ...patch, v: 1 };
      saveDisplaySettings(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    clearDisplaySettings();
    setSettings({ ...DEFAULT_DISPLAY_SETTINGS });
  }, []);

  return { settings, update, resetAll };
}
