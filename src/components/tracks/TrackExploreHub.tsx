import type { ReactNode } from "react";

type HubCard = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
};

type TrackExploreHubProps = {
  variant: "self" | "loved";
  cards: HubCard[];
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function makeAnchorCard(
  id: string,
  title: string,
  description: string,
  icon: ReactNode,
  targetId: string,
): HubCard {
  return {
    id,
    title,
    description,
    icon,
    onClick: () => scrollToId(targetId),
  };
}

export function TrackExploreHub({ variant, cards }: TrackExploreHubProps) {
  const accent =
    variant === "self"
      ? "border-sky-200 hover:border-sky-300 hover:bg-sky-50/60 focus-visible:outline-sky-600"
      : "border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50/50 focus-visible:outline-emerald-700";

  return (
    <div className="space-y-5">
      <p className="max-w-prose text-slate-600">
        Você percorreu as seções desta trilha. Escolha o próximo passo no seu ritmo.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={card.onClick}
            className={`flex min-h-[7.5rem] flex-col items-start gap-2 rounded-2xl border-2 bg-white/95 p-4 text-left shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${accent}`}
          >
            <span className="text-slate-500" aria-hidden>
              {card.icon}
            </span>
            <span className="text-base font-semibold text-slate-900">{card.title}</span>
            <span className="text-sm leading-snug text-slate-600">{card.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export const HubIcons = {
  map: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18l-5 2V6l5-2 6 2 5-2v14l-5 2-6-2z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  ),
  rights: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  ),
  card: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  ),
  swap: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 7h11l-3-3M17 17H6l3 3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  mail: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  ),
  heart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  ),
  sus: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12h16M12 4v16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  ),
};
