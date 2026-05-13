import { useCallback, useEffect, useMemo, useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { SiteFooter } from "./components/SiteFooter";
import { TrackLovedOne } from "./components/tracks/TrackLovedOne";
import { TrackSelf } from "./components/tracks/TrackSelf";
import { ContactPage } from "./pages/ContactPage";
import type { UserTrack } from "./types/track";

function trackAnnouncement(track: UserTrack, path: string): string {
  if (path === "/contato") return "Página de contato.";
  if (track === "landing") return "Página inicial.";
  if (track === "self") return "Trilha A: eu fui diagnosticado recentemente.";
  return "Trilha B: alguém próximo a mim foi diagnosticado.";
}

function readPath(): string {
  const p = window.location.pathname;
  return p === "/contato" ? "/contato" : "/";
}

export default function App() {
  const [track, setTrack] = useState<UserTrack>("landing");
  const [path, setPath] = useState<string>(() => (typeof window !== "undefined" ? readPath() : "/"));

  useEffect(() => {
    const onPop = () => setPath(readPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const goContact = useCallback(() => {
    window.history.pushState({}, "", "/contato");
    setPath("/contato");
  }, []);

  const goHomePath = useCallback(() => {
    window.history.pushState({}, "", "/");
    setPath("/");
  }, []);

  useEffect(() => {
    document.getElementById("conteudo-principal")?.focus();
  }, [track, path]);

  const liveMsg = useMemo(() => trackAnnouncement(track, path), [track, path]);

  return (
    <div className="min-h-dvh bg-gradient-to-b from-sky-50 via-emerald-50/35 to-sky-50">
      <a
        href="#conteudo-principal"
        className="absolute left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-md transition-transform focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-sky-600"
      >
        Pular para o conteúdo principal
      </a>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMsg}
      </p>

      <main
        id="conteudo-principal"
        tabIndex={-1}
        className="min-h-dvh pb-16 outline-none"
      >
        {path === "/contato" ? (
          <ContactPage onBack={goHomePath} />
        ) : (
          <>
            {track === "landing" && (
              <LandingPage
                onChooseSelf={() => setTrack("self")}
                onChooseLovedOne={() => setTrack("lovedOne")}
              />
            )}
            {track === "self" && <TrackSelf onBack={() => setTrack("landing")} />}
            {track === "lovedOne" && <TrackLovedOne onBack={() => setTrack("landing")} />}
          </>
        )}
      </main>

      <SiteFooter onContact={goContact} />
    </div>
  );
}
