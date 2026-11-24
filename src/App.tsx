import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LandingPage } from "./components/LandingPage";
import {
  DisplaySettingsPanel,
  DisplaySettingsTrigger,
} from "./components/settings/DisplaySettingsPanel";
import { SiteFooter } from "./components/SiteFooter";
import {
  HubIcons,
  TrackExploreHub,
} from "./components/tracks/TrackExploreHub";
import { TrackLovedOne } from "./components/tracks/TrackLovedOne";
import { TrackSelf } from "./components/tracks/TrackSelf";
import { useDisplaySettings } from "./hooks/useDisplaySettings";
import { loadProgress, resetProgress, saveProgress, SECTION_IDS } from "./lib/trackProgressStorage";
import { loadTrackAProfile, saveTrackAProfile } from "./lib/trackAProfileStorage";
import {
  loadTrackBProfile,
  saveTrackBProfile,
} from "./lib/trackBProfileStorage";
import { AppRoute, parseAppRoute, serializeAppRoute } from "./lib/appRoutes";
import { loadTrackAAgeBand, saveTrackAAgeBand } from "./lib/trackAAgeStorage";
import { ContactPage } from "./pages/ContactPage";
import { ReferencesPage } from "./pages/ReferencesPage";
import type { UserTrack } from "./types/track";

function trackAnnouncement(track: UserTrack, path: string): string {
  if (path === "/contato") return "Página de contato.";
  if (path === "/referencias") return "Página de fontes e referências.";
  if (track === "landing") return "Página inicial.";
  if (track === "self") return "Trilha A: eu fui diagnosticado recentemente.";
  return "Trilha B: alguém próximo a mim foi diagnosticado.";
}

function readAppRoute(): AppRoute {
  return parseAppRoute(window.location.pathname, window.location.hash);
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    typeof window !== "undefined" ? readAppRoute() : parseAppRoute("/", ""),
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [debugOpen, setDebugOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const lobbyHeadingRef = useRef<HTMLHeadingElement>(null);
  const mapButtonRef = useRef<HTMLButtonElement>(null);
  const wasExploreOpen = useRef(false);
  const previousExploreRoute = useRef<AppRoute | null>(null);
  const debugSequence = useRef("");
  const { settings, update, resetAll } = useDisplaySettings();
  const { path, track, chapterId: initialChapterId, directAccess, exploreOpen } = route;

  useEffect(() => {
    const onPop = () => setRoute(readAppRoute());
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, []);

  const navigate = useCallback((nextRoute: AppRoute, replace = false) => {
    const method = replace ? "replaceState" : "pushState";
    window.history[method]({}, "", serializeAppRoute(nextRoute));
    setRoute(nextRoute);
  }, []);

  const goContact = useCallback(() => {
    navigate({
      path: "/contato",
      track: "landing",
      directAccess: false,
      exploreOpen: false,
    });
  }, [navigate]);

  const goReferences = useCallback(() => {
    navigate({
      path: "/referencias",
      track: "landing",
      directAccess: false,
      exploreOpen: false,
    });
  }, [navigate]);

  const openExplore = useCallback(() => {
    previousExploreRoute.current = route.exploreOpen ? null : route;
    wasExploreOpen.current = true;
    navigate({ ...route, path: "/", exploreOpen: true });
  }, [navigate, route]);

  const goHomePath = useCallback(() => {
    navigate({ path: "/", track: "landing", directAccess: false, exploreOpen: false });
  }, [navigate]);

  const closeExplore = useCallback(() => {
    const previous = previousExploreRoute.current ?? {
      path: "/",
      track: "landing" as const,
      directAccess: false,
      exploreOpen: false,
    };
    previousExploreRoute.current = null;
    navigate(previous, true);
  }, [navigate]);

  useEffect(() => {
    if (exploreOpen) {
      wasExploreOpen.current = true;
      return;
    }
    if (wasExploreOpen.current) {
      wasExploreOpen.current = false;
      mapButtonRef.current?.focus();
      return;
    }
    document.getElementById("conteudo-principal")?.focus();
  }, [track, path, exploreOpen, route.chapterId]);

  useEffect(() => {
    if (!exploreOpen) return;
    lobbyHeadingRef.current?.focus();

    function trapLobbyFocus(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeExplore();
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = document.getElementById("lobby-dialog");
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), a[href], [tabindex="0"]',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", trapLobbyFocus);
    return () => document.removeEventListener("keydown", trapLobbyFocus);
  }, [closeExplore, exploreOpen]);

  useEffect(() => {
    if (!debugOpen) return;
    const dialog = document.getElementById("debug-dialog");
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], [tabindex="0"]',
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDebugOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [debugOpen]);

  useEffect(() => {
    const updateScrollState = () => setShowBackToTop(window.scrollY > 320);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    function handleDebugSequence(event: KeyboardEvent) {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest('input, textarea, select, [contenteditable="true"], [role="textbox"]')
      ) {
        debugSequence.current = "";
        return;
      }

      if (event.key.length !== 1 || event.ctrlKey || event.altKey || event.metaKey) return;
      debugSequence.current = `${debugSequence.current}${event.key.toLowerCase()}`.slice(-12);
      if (debugSequence.current.endsWith("webtea-debug")) {
        debugSequence.current = "";
        setDebugOpen(true);
      }
    }

    window.addEventListener("keydown", handleDebugSequence);
    return () => window.removeEventListener("keydown", handleDebugSequence);
  }, []);

  const liveMsg = useMemo(
    () => (exploreOpen ? "Explore os conteúdos disponíveis." : trackAnnouncement(track, path)),
    [exploreOpen, track, path],
  );

  const startTrack = (nextTrack: Exclude<UserTrack, "landing">) => {
    previousExploreRoute.current = null;
    navigate({
      path: "/",
      track: nextTrack,
      directAccess: false,
      exploreOpen: false,
    });
  };

  const openDirectChapter = (
    nextTrack: Exclude<UserTrack, "landing">,
    nextChapterId: string,
  ) => {
    previousExploreRoute.current = null;
    navigate({
      path: "/",
      track: nextTrack,
      chapterId: nextChapterId,
      directAccess: true,
      exploreOpen: false,
    });
  };

  const completeTrackForDebug = (trackId: "self" | "loved") => {
    const current = loadProgress(trackId);
    const checklists = Object.fromEntries(
      Object.entries(current.checklists).map(([id, items]) => [
        id,
        items.map(() => true),
      ]),
    );
    saveProgress(trackId, {
      ...current,
      viewedSections: [...SECTION_IDS[trackId]],
      checklists,
    });
    if (trackId === "self") {
      const profile = loadTrackAProfile();
      saveTrackAProfile({ ...profile, gateCompleted: true, level: profile.level ?? 1 });
      if (!loadTrackAAgeBand()) saveTrackAAgeBand("18-or-older");
    } else {
      const profile = loadTrackBProfile();
      saveTrackBProfile({
        ...profile,
        gateCompleted: true,
        relation: profile.relation ?? "parentesResponsaveis",
        level: profile.level ?? 1,
      });
    }
    window.location.reload();
  };

  const resetTrackProgressForDebug = () => {
    if (!window.confirm("Isso apagará o progresso e os checklists das duas trilhas. Continuar?")) {
      return;
    }
    resetProgress("self");
    resetProgress("loved");
    window.location.reload();
  };

  const clearLocalDataForDebug = () => {
    if (!window.confirm("Isso apagará todas as preferências e dados salvos localmente. Continuar?")) {
      return;
    }
    localStorage.clear();
    window.location.assign(window.location.pathname);
  };

  const lobby = (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <button
        type="button"
        onClick={closeExplore}
        className="reading-surface mb-6 min-h-12 rounded-lg px-3 py-2 font-semibold text-stone-700 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52]"
      >
        Voltar
      </button>
      <h1
        ref={lobbyHeadingRef}
        id="lobby-title"
        tabIndex={-1}
        className="reading-surface mb-4 w-fit max-w-full rounded-xl px-4 py-3 text-3xl font-bold text-stone-800 shadow-sm focus:outline-none"
      >
        Mapa de conteúdos
      </h1>
      <TrackExploreHub
        variant="self"
        intro="Acesse diretamente o tema que procura. Você também pode percorrer os capítulos em sequência."
        cards={[
          {
            id: "explore-atendimento",
            title: "Onde buscar atendimento",
            description: "Encontre serviços de saúde e pontos de apoio no Amapá.",
            icon: HubIcons.map,
            onClick: () => openDirectChapter("self", "self-atendimento"),
          },
          {
            id: "explore-rights",
            title: "Seus direitos no Amapá",
            description: "Consulte direitos federais e estaduais relacionados ao TEA.",
            icon: HubIcons.rights,
            onClick: () => openDirectChapter("self", "self-direitos"),
          },
          {
            id: "explore-card",
            title: "Emitir Carteira TEA",
            description: "Veja os passos e documentos para solicitar a carteira.",
            icon: HubIcons.card,
            onClick: () => openDirectChapter("self", "self-carteira"),
          },
          {
            id: "explore-sus",
            title: "Serviços do SUS",
            description: "Conheça os serviços públicos disponíveis.",
            icon: HubIcons.sus,
            onClick: () => openDirectChapter("self", "self-sus"),
          },
          {
            id: "explore-switch",
            title: "Ver a outra trilha",
            description: "Acesse orientações para você ou para apoiar alguém próximo.",
            icon: HubIcons.swap,
            onClick: () =>
              openDirectChapter(
                track === "lovedOne" ? "self" : "lovedOne",
                track === "lovedOne" ? "self-s1" : "loved-denial",
              ),
          },
          {
            id: "explore-contact",
            title: "Fale conosco",
            description: "Acesse os canais de contato da equipe.",
            icon: HubIcons.mail,
            onClick: goContact,
          },
          {
            id: "explore-references",
            title: "Fontes e referências",
            description: "Consulte as fontes oficiais utilizadas neste guia.",
            icon: HubIcons.rights,
            onClick: goReferences,
          },
        ]}
      />
    </div>
  );

  return (
    <div className="app-shell min-h-dvh">
      <div className="puzzle-tile-layer" aria-hidden="true" />
      <a
        href="#conteudo-principal"
        className="absolute left-4 top-4 z-[100] flex min-h-12 -translate-y-24 items-center rounded-lg bg-[#fffcf7] px-4 py-2 text-sm font-semibold text-stone-900 shadow-md transition-transform focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#9a3b52]"
      >
        Pular para o conteúdo principal
      </a>
      <button
        ref={mapButtonRef}
        type="button"
        onClick={openExplore}
        tabIndex={exploreOpen || debugOpen ? -1 : 0}
        aria-hidden={exploreOpen || debugOpen || undefined}
        aria-label="Abrir mapa de conteúdos"
        className="fixed left-4 top-4 z-[90] flex min-h-12 items-center justify-center gap-2 rounded-xl border border-amber-200/80 bg-[#fffcf7]/95 px-3 text-stone-700 shadow-md hover:bg-amber-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52]"
      >
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M9 3v15m6-12v15" stroke="currentColor" strokeWidth="1.8" />
        </svg>
        <span className="text-sm font-semibold">Mapa de conteúdos</span>
      </button>

      <DisplaySettingsTrigger
        onOpen={() => setSettingsOpen(true)}
        disabled={exploreOpen || debugOpen}
      />
      <DisplaySettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdate={update}
        onResetAll={resetAll}
      />

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMsg}
      </p>

      <div className="zoom-root">
        <main
          id="conteudo-principal"
          tabIndex={-1}
          aria-hidden={exploreOpen || debugOpen || undefined}
          className="min-h-dvh pb-16 outline-none"
        >
          {path === "/contato" ? (
            <ContactPage onBack={goHomePath} />
          ) : path === "/referencias" ? (
            <ReferencesPage onBack={goHomePath} />
          ) : (
            <>
              {track === "landing" && !exploreOpen && (
                <LandingPage
                  onChooseSelf={() => startTrack("self")}
                  onChooseLovedOne={() => startTrack("lovedOne")}
                  onExploreAll={openExplore}
                />
              )}
              {track === "self" && (
                <TrackSelf
                  key={track}
                  onBack={goHomePath}
                  onSwitchTrack={() => startTrack("lovedOne")}
                  onContact={goContact}
                  directAccess={directAccess}
                  initialChapterId={initialChapterId}
                  onChapterChange={(nextChapterId) =>
                    openDirectChapter("self", nextChapterId)
                  }
                />
              )}
              {track === "lovedOne" && (
                <TrackLovedOne
                  key={track}
                  onBack={goHomePath}
                  onSwitchTrack={() => startTrack("self")}
                  onContact={goContact}
                  directAccess={directAccess}
                  initialChapterId={initialChapterId}
                  onChapterChange={(nextChapterId) =>
                    openDirectChapter("lovedOne", nextChapterId)
                  }
                  onOpenSelfChapter={(chapterId) =>
                    openDirectChapter("self", chapterId)
                  }
                />
              )}
            </>
          )}
        </main>

        {exploreOpen ? (
          <div
            id="lobby-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lobby-title"
            className="fixed inset-0 z-[100] overflow-y-auto bg-[var(--app-bg-from)]"
          >
            {lobby}
          </div>
        ) : !debugOpen ? (
          <SiteFooter onContact={goContact} onReferences={goReferences} />
        ) : null}
      </div>

      {showBackToTop && !exploreOpen && !debugOpen ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
          className="fixed bottom-20 right-4 z-[80] flex min-h-12 min-w-12 items-center justify-center rounded-xl border border-amber-200/80 bg-[#fffcf7]/95 text-stone-700 shadow-md hover:bg-amber-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52]"
        >
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="m6 14 6-6 6 6M12 8v12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : null}

      {debugOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-stone-950/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDebugOpen(false);
          }}
        >
          <section
            id="debug-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="debug-title"
            className="reading-surface w-full max-w-lg space-y-4 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="debug-title" className="text-xl font-bold text-stone-900">
                  Ferramentas de debug
                </h2>
                <p className="mt-1 text-sm text-stone-600">Menu local de desenvolvimento</p>
              </div>
              <button
                type="button"
                onClick={() => setDebugOpen(false)}
                className="min-h-12 min-w-12 rounded-lg text-2xl text-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label="Fechar ferramentas de debug"
              >
                ×
              </button>
            </div>
            <button
              type="button"
              onClick={resetTrackProgressForDebug}
              className="w-full min-h-12 rounded-xl border border-stone-300 px-4 py-3 text-left font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Resetar progresso das trilhas
            </button>
            <button
              type="button"
              onClick={clearLocalDataForDebug}
              className="w-full min-h-12 rounded-xl border border-stone-300 px-4 py-3 text-left font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Limpar dados locais
            </button>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => completeTrackForDebug("self")}
                className="min-h-12 rounded-xl border border-orange-400 px-4 py-3 text-left font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Concluir Trilha A
              </button>
              <button
                type="button"
                onClick={() => completeTrackForDebug("loved")}
                className="min-h-12 rounded-xl border border-rose-400 px-4 py-3 text-left font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Concluir Trilha B
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
