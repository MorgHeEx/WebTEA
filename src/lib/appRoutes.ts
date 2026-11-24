import { SECTION_IDS, type TrackId } from "./trackProgressStorage";
import type { UserTrack } from "../types/track";

export type AppRoute = {
  path: "/" | "/contato" | "/referencias";
  track: UserTrack;
  chapterId?: string;
  directAccess: boolean;
  exploreOpen: boolean;
};

const ROOT_ROUTE: AppRoute = {
  path: "/",
  track: "landing",
  directAccess: false,
  exploreOpen: false,
};

export function parseAppRoute(pathname: string, hash: string): AppRoute {
  if (pathname === "/contato" || pathname === "/referencias") {
    return { ...ROOT_ROUTE, path: pathname };
  }

  const segments = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (segments.length === 1 && segments[0] === "contato") {
    return { ...ROOT_ROUTE, path: "/contato" };
  }
  if (segments.length === 1 && segments[0] === "referencias") {
    return { ...ROOT_ROUTE, path: "/referencias" };
  }
  if (segments.length === 1 && segments[0] === "conteudos") {
    return { ...ROOT_ROUTE, exploreOpen: true };
  }

  if (segments[0] !== "trilha" || segments.length < 2 || segments.length > 3) {
    return ROOT_ROUTE;
  }

  const trackId: TrackId | null =
    segments[1] === "para-voce" ? "self" : segments[1] === "apoio" ? "loved" : null;
  if (!trackId) return ROOT_ROUTE;
  const track: UserTrack = trackId === "self" ? "self" : "lovedOne";

  if (segments.length === 2) {
    return { ...ROOT_ROUTE, track };
  }

  const routeChapter = segments[2];
  const exploreChapter = trackId === "self" ? "self-explore" : "loved-explore";
  const knownChapters = SECTION_IDS[trackId] as readonly string[];
  const chapterId = routeChapter === "explorar" ? exploreChapter : routeChapter;
  if (chapterId !== exploreChapter && !knownChapters.includes(chapterId)) {
    return ROOT_ROUTE;
  }

  return {
    ...ROOT_ROUTE,
    track,
    chapterId,
    directAccess: true,
  };
}

export function serializeAppRoute(route: AppRoute): string {
  if (route.path === "/contato") return "/#/contato";
  if (route.path === "/referencias") return "/#/referencias";
  if (route.exploreOpen) return "/#/conteudos";
  if (route.track === "landing") return "/";

  const trackSegment = route.track === "self" ? "para-voce" : "apoio";
  const exploreChapter = route.track === "self" ? "self-explore" : "loved-explore";
  const chapterSegment =
    route.chapterId === exploreChapter ? "explorar" : route.chapterId;
  return `/#/trilha/${trackSegment}${chapterSegment ? `/${encodeURIComponent(chapterSegment)}` : ""}`;
}
