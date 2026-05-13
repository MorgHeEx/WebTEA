import { useCallback, useMemo, useState } from "react";
import type { TrackId, TrackProgressState } from "../lib/trackProgressStorage";
import {
  isKnownSection,
  loadProgress,
  saveProgress,
  SECTION_IDS,
  totalSections,
} from "../lib/trackProgressStorage";

export function useTrackProgress(track: TrackId) {
  const [state, setState] = useState<TrackProgressState>(() => loadProgress(track));

  const persist = useCallback(
    (next: TrackProgressState) => {
      setState(next);
      saveProgress(track, next);
    },
    [track],
  );

  const markSectionViewed = useCallback(
    (sectionId: string) => {
      if (!isKnownSection(track, sectionId)) return;
      setState((prev) => {
        if (prev.viewedSections.includes(sectionId)) return prev;
        const next: TrackProgressState = {
          ...prev,
          viewedSections: [...prev.viewedSections, sectionId],
        };
        saveProgress(track, next);
        return next;
      });
    },
    [track],
  );

  const setChecklistItem = useCallback((checklistId: string, index: number, checked: boolean) => {
    setState((prev) => {
      const current = prev.checklists[checklistId];
      if (!current || index < 0 || index >= current.length) return prev;
      const row = current.map((v, i) => (i === index ? checked : v));
      const nextChecklists = { ...prev.checklists, [checklistId]: row };
      let viewed = prev.viewedSections;
      const allDone = row.every(Boolean);
      const sectionForChecklist =
        checklistId === "self-s2" ? "self-s2" : checklistId === "loved-steps" ? "loved-steps" : null;
      if (allDone && sectionForChecklist && !viewed.includes(sectionForChecklist)) {
        viewed = [...viewed, sectionForChecklist];
      }
      const next: TrackProgressState = {
        ...prev,
        checklists: nextChecklists,
        viewedSections: viewed,
      };
      saveProgress(track, next);
      return next;
    });
  }, [track]);

  const isSectionViewed = useCallback(
    (sectionId: string) => state.viewedSections.includes(sectionId),
    [state.viewedSections],
  );

  const viewedCount = useMemo(() => {
    const allowed = new Set<string>(SECTION_IDS[track]);
    return state.viewedSections.filter((id) => allowed.has(id)).length;
  }, [state.viewedSections, track]);

  const total = totalSections(track);

  const getChecklist = useCallback(
    (checklistId: string) => state.checklists[checklistId] ?? [],
    [state.checklists],
  );

  return {
    markSectionViewed,
    setChecklistItem,
    isSectionViewed,
    viewedCount,
    totalSections: total,
    getChecklist,
    reload: () => persist(loadProgress(track)),
  };
}
