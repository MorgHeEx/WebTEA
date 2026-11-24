import { useCallback, useEffect, useMemo, useState } from "react";
import { useTrackProgress } from "../../hooks/useTrackProgress";
import { levelBadgeLabel, loadTrackAProfile } from "../../lib/trackAProfileStorage";
import { AtendimentoSusSection } from "../amapa/AtendimentoSusSection";
import { AmapaDireitosSection } from "../amapa/AmapaDireitosSection";
import { CarteiraTeaAmapaSection } from "../amapa/CarteiraTeaAmapaSection";
import { DireitoTerapiaSection } from "../amapa/DireitoTerapiaSection";
import { ServicosSusSection } from "../amapa/ServicosSusSection";
import { ContentSection } from "../ui/ContentSection";
import {
  InteractiveChecklist,
  type InteractiveChecklistItem,
} from "../ui/InteractiveChecklist";
import { PhaseCard } from "../ui/PhaseCard";
import { TrackProgressHeader } from "../ui/TrackProgressHeader";
import { TrackToc, type TocItem } from "../ui/TrackToc";
import {
  HubIcons,
  TrackExploreHub,
} from "./TrackExploreHub";
import { TrackSelfGate } from "./TrackSelfGate";

type TrackSelfProps = {
  onBack: () => void;
  onSwitchTrack: () => void;
  onContact: () => void;
  directAccess?: boolean;
  initialChapterId?: string;
  onChapterChange: (chapterId: string) => void;
};

const CHECKLIST_ID = "self-s2";
const SELF_CHAPTERS = [
  { id: "self-s1", label: "Validação emocional", title: "Validação emocional" },
  { id: "self-s2", label: "Primeiros passos práticos", title: "Primeiros passos práticos" },
  { id: "self-atendimento", label: "Onde buscar atendimento", title: "Onde buscar atendimento pelo SUS no Amapá" },
  { id: "self-sus", label: "Serviços do SUS", title: "Serviços gratuitos garantidos pelo SUS" },
  { id: "self-terapia", label: "Direito à terapia", title: "Direito à terapia" },
  { id: "self-direitos", label: "Seus direitos no Amapá", title: "Seus direitos no Amapá" },
  { id: "self-carteira", label: "Emitir Carteira TEA", title: "Emitir Carteira TEA" },
];

const selfSteps: InteractiveChecklistItem[] = [
  {
    title: "Guarde o laudo em local seguro (físico e digital).",
    hint: "Pasta em casa, nuvem com senha, e uma cópia no celular podem evitar perdas em momentos de cansaço.",
  },
  {
    title: "Evite decisões grandes nas primeiras semanas.",
    hint: "Emprego, término, mudança brusca de curso ou escola podem esperar um pouco. Sua mente está processando muita coisa.",
  },
  {
    title: "Primeiro profissional: neuropsicólogo ou psiquiatra com experiência em TEA em adultos.",
    hint: "Antes de agendar, confirme se o profissional tem especialidade no atendimento de crianças e adolescentes ou de adultos.",
  },
  {
    title: "Segundo profissional (opcional, mas recomendado): psicólogo com ACT ou DBT.",
    hint: "Essas abordagens podem ajudar com emoções intensas, culpa e planejamento de vida. Elas não prometem um “conserto rápido”.",
  },
  {
    title: "Terceiro (se fizer sentido): terapeuta ocupacional para mapeamento sensorial.",
    hint: "Ajuda a traduzir sensações e rotinas em ajustes concretos no dia a dia.",
  },
  {
    title: "Entre em comunidades antes de “só” ir a consultórios.",
    hint: "O pertencimento pode ajudar a aliviar a ansiedade. Busque comunidades online de autistas, especialmente grupos sobre diagnóstico tardio e neurodivergência.",
    bullets: [
      "Prefira espaços moderados e com regras claras de respeito.",
      "Se algo aumentar culpa ou comparação dolorosa, é permissível sair.",
    ],
  },
];

export function TrackSelf({
  onBack,
  onSwitchTrack,
  onContact,
  directAccess = false,
  initialChapterId,
  onChapterChange,
}: TrackSelfProps) {
  const [mainUnlocked, setMainUnlocked] = useState(
    () => directAccess || loadTrackAProfile().gateCompleted,
  );
  const [levelBadge, setLevelBadge] = useState<string | null>(() => {
    const p = loadTrackAProfile();
    return p.gateCompleted && p.level ? levelBadgeLabel(p.level) : null;
  });

  const handleGateDone = useCallback(() => {
    const p = loadTrackAProfile();
    setMainUnlocked(true);
    setLevelBadge(p.level ? levelBadgeLabel(p.level) : null);
    onChapterChange(SELF_CHAPTERS[0].id);
  }, [onChapterChange]);

  useEffect(() => {
    if (directAccess) setMainUnlocked(true);
  }, [directAccess]);

  if (!mainUnlocked) {
    return <TrackSelfGate onComplete={handleGateDone} />;
  }

  return (
    <TrackSelfMain
      onBack={onBack}
      onSwitchTrack={onSwitchTrack}
      onContact={onContact}
      levelBadge={levelBadge}
      initialChapterId={initialChapterId}
      onChapterChange={onChapterChange}
    />
  );
}

type TrackSelfMainProps = {
  onBack: () => void;
  onSwitchTrack: () => void;
  onContact: () => void;
  levelBadge: string | null;
  initialChapterId?: string;
  onChapterChange: (chapterId: string) => void;
};

function TrackSelfMain({
  onBack,
  onSwitchTrack,
  onContact,
  levelBadge,
  initialChapterId,
  onChapterChange,
}: TrackSelfMainProps) {
  const {
    markSectionViewed,
    setChecklistItem,
    isSectionViewed,
    viewedCount,
    totalSections,
    getChecklist,
  } = useTrackProgress("self");

  const [currentChapterId, setCurrentChapterId] = useState(
    () =>
      initialChapterId === "self-explore" ||
      SELF_CHAPTERS.some((chapter) => chapter.id === initialChapterId)
        ? initialChapterId!
        : SELF_CHAPTERS[0].id,
  );
  useEffect(() => {
    if (
      initialChapterId === "self-explore" ||
      SELF_CHAPTERS.some((chapter) => chapter.id === initialChapterId)
    ) {
      setCurrentChapterId(initialChapterId!);
    } else if (initialChapterId === undefined) {
      setCurrentChapterId(SELF_CHAPTERS[0].id);
    }
  }, [initialChapterId]);
  const checklist = getChecklist(CHECKLIST_ID);
  const currentChapterIndex = SELF_CHAPTERS.findIndex(
    (chapter) => chapter.id === currentChapterId,
  );
  const showingExplore = currentChapterId === "self-explore";
  const chapterNumber = showingExplore ? SELF_CHAPTERS.length : currentChapterIndex + 1;

  const tocItems: TocItem[] = useMemo(() => {
    return [
      ...SELF_CHAPTERS.map((chapter) => ({
        ...chapter,
        completed: isSectionViewed(chapter.id),
        current: chapter.id === currentChapterId,
      })),
      {
        id: "self-explore",
        label: "Explorar conteúdos",
        completed: false,
        current: showingExplore,
      },
    ];
  }, [currentChapterId, isSectionViewed, showingExplore]);

  const goToChapter = useCallback(
    (id: string, markCurrent = false) => {
      if (markCurrent && !showingExplore) markSectionViewed(currentChapterId);
      setCurrentChapterId(id);
      onChapterChange(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [currentChapterId, markSectionViewed, onChapterChange, showingExplore],
  );

  const hubCards = useMemo(
    () => [
      {
        id: "hub-at",
        title: "Onde buscar atendimento",
        description: "CAPSi, CER, CAPS III e TEAtendemos no Amapá",
        icon: HubIcons.map,
        onClick: () => goToChapter("self-atendimento"),
      },
      {
        id: "hub-dir",
        title: "Seus direitos no Amapá",
        description: "Direitos federais e estaduais que podem te proteger",
        icon: HubIcons.rights,
        onClick: () => goToChapter("self-direitos"),
      },
      {
        id: "hub-car",
        title: "Emitir Carteira TEA",
        description: "Passo a passo nas unidades do Super Fácil",
        icon: HubIcons.card,
        onClick: () => goToChapter("self-carteira"),
      },
      {
        id: "hub-swap",
        title: "Ver a outra trilha",
        description: "Conteúdo para quem apoia alguém próximo",
        icon: HubIcons.swap,
        onClick: onSwitchTrack,
      },
      {
        id: "hub-contact",
        title: "Fale conosco",
        description: "Créditos da equipe e canais de contato",
        icon: HubIcons.mail,
        onClick: onContact,
      },
      {
        id: "hub-sus",
        title: "Serviços do SUS",
        description: "O que está disponível na rede pública",
        icon: HubIcons.sus,
        onClick: () => goToChapter("self-sus"),
      },
    ],
    [goToChapter, onContact, onSwitchTrack],
  );

  return (
    <div className="mx-auto max-w-[calc(65ch+21rem)] px-4 py-10 sm:px-6">
      <TrackProgressHeader
        eyebrow="Trilha: para você"
        title={
          showingExplore
            ? "Explore os conteúdos"
            : SELF_CHAPTERS[currentChapterIndex]?.title ?? "Depois do diagnóstico"
        }
        viewedCount={viewedCount}
        totalSections={totalSections}
        onBack={onBack}
        variant="self"
        levelBadge={levelBadge}
        chapterNumber={chapterNumber}
        chapterCount={SELF_CHAPTERS.length}
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,65ch)_16rem] lg:justify-center lg:gap-8">
        <div className="track-main min-w-0 w-full">
          {showingExplore ? (
            <TrackExploreHub variant="self" cards={hubCards} />
          ) : null}
          {currentChapterId === "self-s1" && (
          <ContentSection
            id="self-s1"
            index={1}
            title="Validação emocional"
            isViewed={false}
            collapsible={false}
          >
            <p className="max-w-prose">
              É normal sentir confusão, alívio ou outras emoções misturadas. Não existe uma reação
              &quot;certa&quot;.
            </p>
            <p className="max-w-prose">
              O diagnóstico pode reorganizar pedaços da sua história. Respire no seu ritmo.
            </p>

            <div className="space-y-4 pt-2">
              <PhaseCard title="Se sua cabeça não para de buscar respostas" tone="amber">
                <p className="max-w-prose">
                  Quando algo muda a forma como você se enxerga, a mente costuma correr atrás de explicações. Isso é compreensível e não quer dizer que há algo errado com você.
                </p>
                <p className="max-w-prose">
                  Se a busca começou a atrapalhar seu sono, sua alimentação ou suas pausas, vale fazer uma pausa. As informações continuam aqui, e você pode voltar amanhã.
                </p>
                <p className="max-w-prose">
                  Uma ideia é escolher uma coisa por vez: ler só uma seção hoje e deixar o resto para outro dia.
                </p>
              </PhaseCard>

              <PhaseCard title="Se o alívio veio misturado com tristeza ou culpa" tone="rose">
                <p className="max-w-prose">
                  Para muita gente, o diagnóstico explica anos de esforço e de se sentir diferente sem saber por quê. Sentir alívio com isso é natural.
                </p>
                <p className="max-w-prose">
                  A culpa que vem junto pode ser um eco de muito tempo se cobrando além da conta. Ela não diz que você sentiu algo errado.
                </p>
                <p className="max-w-prose">
                  Você pode ficar aliviado(a) pela explicação e ainda lamentar o que foi difícil. Um sentimento não cancela o outro.
                </p>
              </PhaseCard>
            </div>
          </ContentSection>
          )}

          {currentChapterId === "self-s2" && (
          <ContentSection
            id="self-s2"
            index={2}
            title="Primeiros passos práticos"
            isViewed={false}
            collapsible={false}
          >
            <InteractiveChecklist
              intro="Esta lista reúne sugestões, não tarefas obrigatórias. Você não precisa fazer tudo nem seguir uma ordem. Escolha apenas o que fizer sentido para você agora, pule qualquer item sem culpa e volte quando quiser. Marcar um item é opcional e serve somente para acompanhar seu próprio caminho."
              items={selfSteps}
              checked={checklist}
              accent="sky"
              onToggle={(i, v) => setChecklistItem(CHECKLIST_ID, i, v)}
            />
          </ContentSection>
          )}

          {currentChapterId === "self-atendimento" && (
          <ContentSection
            id="self-atendimento"
            index={3}
            title="Onde buscar atendimento pelo SUS no Amapá"
            isViewed={false}
            collapsible={false}
          >
            <AtendimentoSusSection tone="sky" />
          </ContentSection>
          )}

          {currentChapterId === "self-sus" && (
          <ContentSection
            id="self-sus"
            index={4}
            title="Serviços gratuitos garantidos pelo SUS"
            isViewed={false}
            collapsible={false}
          >
            <ServicosSusSection />
          </ContentSection>
          )}

          {currentChapterId === "self-terapia" && (
          <ContentSection
            id="self-terapia"
            index={5}
            title="Direito à terapia"
            isViewed={false}
            collapsible={false}
          >
            <DireitoTerapiaSection />
          </ContentSection>
          )}

          {currentChapterId === "self-direitos" && (
          <ContentSection
            id="self-direitos"
            index={6}
            title="Seus direitos no Amapá"
            isViewed={false}
            collapsible={false}
          >
            <AmapaDireitosSection />
          </ContentSection>
          )}

          {currentChapterId === "self-carteira" && (
          <ContentSection
            id="self-carteira"
            index={7}
            title="Emitir Carteira TEA"
            isViewed={false}
            collapsible={false}
          >
            <CarteiraTeaAmapaSection
              getChecklist={getChecklist}
              setChecklistItem={setChecklistItem}
            />
          </ContentSection>
          )}

          {!showingExplore ? (
            <nav className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-amber-200/80 pt-5">
              <button
                type="button"
                disabled={currentChapterIndex === 0}
                onClick={() =>
                  goToChapter(SELF_CHAPTERS[currentChapterIndex - 1]?.id ?? SELF_CHAPTERS[0].id)
                }
                className="min-h-12 rounded-xl border border-stone-300 bg-white/80 px-5 py-3 font-semibold text-stone-700 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => {
                  if (currentChapterIndex === SELF_CHAPTERS.length - 1) {
                    goToChapter("self-explore", true);
                  } else {
                    goToChapter(SELF_CHAPTERS[currentChapterIndex + 1].id, true);
                  }
                }}
                className="chapter-next min-h-12 rounded-xl bg-[#b4532a] px-5 py-3 font-bold text-white shadow-sm hover:bg-[#923f21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-900"
              >
                {currentChapterIndex === SELF_CHAPTERS.length - 1
                  ? "Próximo: Lobby de exploração"
                  : `Próximo: ${SELF_CHAPTERS[currentChapterIndex + 1].title}`}
              </button>
            </nav>
          ) : (
            <button
              type="button"
              onClick={() => goToChapter(SELF_CHAPTERS[0].id)}
              className="mt-8 min-h-12 rounded-xl border border-stone-300 px-5 py-3 font-semibold text-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
            >
              Voltar ao Capítulo 1
            </button>
          )}
        </div>

        <TrackToc
          items={tocItems}
          variant="self"
          onSelect={(id) => goToChapter(id, false)}
        />
      </div>
    </div>
  );
}
