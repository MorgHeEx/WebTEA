import { useCallback, useEffect, useMemo, useState } from "react";
import { useTrackProgress } from "../../hooks/useTrackProgress";
import { loadTrackBProfile } from "../../lib/trackBProfileStorage";
import { AtendimentoSusSection } from "../amapa/AtendimentoSusSection";
import { ServicosSusSection } from "../amapa/ServicosSusSection";
import { ContentSection } from "../ui/ContentSection";
import {
  InteractiveChecklist,
  type InteractiveChecklistItem,
} from "../ui/InteractiveChecklist";
import { PhaseCard } from "../ui/PhaseCard";
import { TrackProgressHeader } from "../ui/TrackProgressHeader";
import { TrackToc, type TocItem } from "../ui/TrackToc";
import { HubIcons, TrackExploreHub } from "./TrackExploreHub";
import { TrackLovedOneGate } from "./TrackLovedOneGate";
import { TrackLovedOneResponsaveisExtra } from "./TrackLovedOneResponsaveisExtra";
import { TrackLovedOneSupport } from "./TrackLovedOneSupport";

type TrackLovedOneProps = {
  onBack: () => void;
  onSwitchTrack: () => void;
  onContact: () => void;
  directAccess?: boolean;
  initialChapterId?: string;
  onOpenSelfChapter?: (chapterId: string) => void;
  onChapterChange: (chapterId: string) => void;
};

const CHECKLIST_ID = "loved-steps";
const LOVED_CHAPTERS = [
  { id: "loved-denial", label: "Fase de negação", title: "Fase de negação" },
  { id: "loved-support", label: "Ser rede de apoio", title: "Ser rede de apoio" },
  { id: "loved-steps", label: "Primeiros passos", title: "Primeiros passos" },
  { id: "loved-atendimento", label: "Onde buscar atendimento", title: "Onde buscar atendimento pelo SUS no Amapá" },
  { id: "loved-sus", label: "Serviços do SUS", title: "Serviços gratuitos garantidos pelo SUS" },
  { id: "loved-ableism", label: "Evitar capacitismo", title: "Evitar capacitismo" },
];

const lovedSteps: InteractiveChecklistItem[] = [
  {
    title: "Leia sobre TEA em fontes confiáveis, e não apenas em grupos de WhatsApp.",
    hint: "Sugestões: livro “Neurotribes” (Steve Silberman) e o canal Papo de Autista (YouTube).",
  },
  {
    title: "Separe suas expectativas das necessidades reais da pessoa.",
    hint: "É natural que imaginar outro futuro cause dor. Ainda assim, o que importa agora são as necessidades da pessoa no presente.",
  },
  {
    title: "Converse sobre como ela quer ser apoiada.",
    hint: "Perguntas simples ajudam mais do que soluções prontas: “O que está pesado?” “Como posso facilitar hoje?”",
  },
  {
    title: "Profissionais que podem apoiar você: psicólogo para processar a notícia.",
    hint: "Cuidar de você não é egoísmo. É uma forma de manter um apoio possível e acolhedor.",
  },
  {
    title: "Profissionais para a pessoa diagnosticada: os mesmos da trilha “para você” + fonoaudiologia se houver dificuldades de comunicação social.",
    hint: "Neuropsicologia/psiquiatria com TEA em adultos (quando for o caso), ACT/DBT, terapia ocupacional se fizer sentido.",
  },
  {
    title: "Desconfie de “curas milagrosas” e de intervenções sem evidência sólida.",
    hint: "Evite promessas rápidas, protocolos biomedicalizantes sem respaldo e ABA punitiva ou que desrespeite o corpo e a comunicação da pessoa.",
  },
];

export function TrackLovedOne({
  onBack,
  onSwitchTrack,
  onContact,
  directAccess = false,
  initialChapterId,
  onOpenSelfChapter,
  onChapterChange,
}: TrackLovedOneProps) {
  const [unlocked, setUnlocked] = useState(
    () => directAccess || loadTrackBProfile().gateCompleted,
  );

  useEffect(() => {
    if (directAccess) setUnlocked(true);
  }, [directAccess]);

  if (!unlocked) {
    return (
      <TrackLovedOneGate
        onComplete={() => {
          setUnlocked(true);
          onChapterChange(LOVED_CHAPTERS[0].id);
        }}
      />
    );
  }

  return (
    <TrackLovedOneMain
      onBack={onBack}
      onSwitchTrack={onSwitchTrack}
      onContact={onContact}
      initialChapterId={initialChapterId}
      onOpenSelfChapter={onOpenSelfChapter}
      onChapterChange={onChapterChange}
    />
  );
}

function TrackLovedOneMain({
  onBack,
  onSwitchTrack,
  onContact,
  initialChapterId,
  onOpenSelfChapter,
  onChapterChange,
}: TrackLovedOneProps) {
  const bProfile = useMemo(() => loadTrackBProfile(), []);
  const showResponsavel = bProfile.treatmentGuidance;

  const {
    markSectionViewed,
    setChecklistItem,
    isSectionViewed,
    viewedCount,
    totalSections,
    getChecklist,
  } = useTrackProgress("loved");

  const chapters = useMemo(
    () =>
      showResponsavel
        ? [
            ...LOVED_CHAPTERS.slice(0, 5),
            { id: "loved-responsaveis", label: "Para responsáveis", title: "Orientações para responsáveis" },
            LOVED_CHAPTERS[5],
          ]
        : LOVED_CHAPTERS,
    [showResponsavel],
  );
  const [currentChapterId, setCurrentChapterId] = useState(() =>
    initialChapterId === "loved-explore" ||
    chapters.some((chapter) => chapter.id === initialChapterId)
      ? initialChapterId!
      : LOVED_CHAPTERS[0].id,
  );
  useEffect(() => {
    if (
      initialChapterId === "loved-explore" ||
      chapters.some((chapter) => chapter.id === initialChapterId)
    ) {
      setCurrentChapterId(initialChapterId!);
    } else if (initialChapterId === undefined) {
      setCurrentChapterId(chapters[0].id);
    }
  }, [chapters, initialChapterId]);
  const [extraChapterCompleted, setExtraChapterCompleted] = useState(false);
  const checklist = getChecklist(CHECKLIST_ID);
  const currentChapterIndex = chapters.findIndex((chapter) => chapter.id === currentChapterId);
  const showingExplore = currentChapterId === "loved-explore";
  const chapterNumber = showingExplore ? chapters.length : currentChapterIndex + 1;

  const tocItems: TocItem[] = useMemo(() => {
    return [
      ...chapters.map((chapter) => ({
        ...chapter,
        completed:
          chapter.id === "loved-responsaveis"
            ? extraChapterCompleted
            : isSectionViewed(chapter.id),
        current: chapter.id === currentChapterId,
      })),
      {
        id: "loved-explore",
        label: "Explorar conteúdos",
        completed: false,
        current: showingExplore,
      },
    ];
  }, [chapters, currentChapterId, extraChapterCompleted, isSectionViewed, showingExplore]);

  const goToChapter = useCallback(
    (id: string, markCurrent = false) => {
      if (markCurrent && !showingExplore) {
        if (currentChapterId === "loved-responsaveis") setExtraChapterCompleted(true);
        else markSectionViewed(currentChapterId);
      }
      setCurrentChapterId(id);
      onChapterChange(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [currentChapterId, markSectionViewed, onChapterChange, showingExplore],
  );

  const hubCards = useMemo(() => {
    const cards = [
      {
        id: "hub-at",
        title: "Onde buscar atendimento",
        description: "CAPSi, CER, CAPS III e TEAtendemos no Amapá",
        icon: HubIcons.map,
        onClick: () => goToChapter("loved-atendimento"),
      },
      {
        id: "hub-ableism",
        title: "Evitar capacitismo",
        description: "Exemplos concretos de apoio respeitoso",
        icon: HubIcons.heart,
        onClick: () => goToChapter("loved-ableism"),
      },
      {
        id: "hub-sus",
        title: "Serviços do SUS",
        description: "O que está disponível na rede pública",
        icon: HubIcons.sus,
        onClick: () => goToChapter("loved-sus"),
      },
      {
        id: "hub-swap",
        title: "Ver a outra trilha",
        description: "Conteúdo para quem recebeu o diagnóstico",
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
    ];
    cards.splice(
      1,
      0,
      {
        id: "hub-dir",
        title: "Seus direitos no Amapá",
        description: "Direitos da pessoa sob seus cuidados",
        icon: HubIcons.rights,
        onClick: () =>
          onOpenSelfChapter
            ? onOpenSelfChapter("self-direitos")
            : goToChapter("loved-responsaveis"),
      },
      {
        id: "hub-car",
        title: "Emitir Carteira TEA",
        description: "Cadastro em nome de quem está sob seus cuidados",
        icon: HubIcons.card,
        onClick: () =>
          onOpenSelfChapter
            ? onOpenSelfChapter("self-carteira")
            : goToChapter("loved-responsaveis"),
      },
    );
    return cards.slice(0, 6);
  }, [goToChapter, onContact, onOpenSelfChapter, onSwitchTrack]);

  return (
    <div className="mx-auto max-w-[calc(65ch+21rem)] px-4 py-10 sm:px-6">
      <TrackProgressHeader
        eyebrow="Trilha: apoio a alguém próximo"
        title={
          showingExplore
            ? "Explore os conteúdos"
            : chapters[currentChapterIndex]?.title ?? "Acolhendo quem você ama"
        }
        viewedCount={viewedCount}
        totalSections={totalSections}
        onBack={onBack}
        variant="loved"
        chapterNumber={chapterNumber}
        chapterCount={chapters.length}
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,65ch)_16rem] lg:justify-center lg:gap-8">
        <div className="track-main min-w-0 w-full">
          {showingExplore ? <TrackExploreHub variant="loved" cards={hubCards} /> : null}
          {currentChapterId === "loved-denial" && (
          <ContentSection
            id="loved-denial"
            index={1}
            title="Fase de negação"
            isViewed={false}
            labelTone="teal"
            collapsible={false}
          >
            <p className="max-w-prose">
              Às vezes a primeira reação não é acolhimento, e sim um “não, isso não pode ser verdade”. Isso também é humano.
            </p>

            <div className="space-y-4 pt-2">
              <PhaseCard title="Por que a negação aparece" tone="amber">
                <p className="max-w-prose">
                  Muita gente cresce ouvindo ideias erradas sobre autismo. O diagnóstico pode despertar medo de “rotular”, culpa (principalmente em pais e mães), vergonha social ou a sensação de perder o futuro que se imaginava.
                </p>
                <p className="max-w-prose">
                  Negação pode ser um jeito de ganhar tempo, só que, sem perceber, ela empurra a pessoa diagnosticada para se justificar sozinha.
                </p>
              </PhaseCard>

              <PhaseCard title="O que a negação pode custar para quem recebeu o diagnóstico" tone="rose">
                <p className="max-w-prose">
                  Quando o ambiente não reconhece o diagnóstico, a pessoa pode se sentir invisível,
                  “exagerada” ou culpada por precisar de ajustes.
                </p>
                <p className="max-w-prose">
                  Isso atrasa apoio real: terapias adequadas, escola/ trabalho mais seguros, e até
                  autocuidado básico.
                </p>
              </PhaseCard>

              <PhaseCard title="Como sair da negação sem se culpar" tone="mint">
                <p className="max-w-prose">
                  Mudança não precisa ser discurso perfeito. Pode ser um passo pequeno: ler uma fonte
                  confiável, ouvir a pessoa com atenção, marcar um profissional para você.
                </p>
                <p className="max-w-prose">
                  Errar antes não apaga a chance de acertar agora. Menos julgamento interno, mais
                  prática: o que eu posso fazer hoje que seja seguro e respeitoso?
                </p>
              </PhaseCard>
            </div>
          </ContentSection>
          )}

          {currentChapterId === "loved-support" && (
          <ContentSection
            id="loved-support"
            index={2}
            title="Ser rede de apoio"
            isViewed={false}
            labelTone="teal"
            collapsible={false}
          >
            <TrackLovedOneSupport />
          </ContentSection>
          )}

          {currentChapterId === "loved-steps" && (
          <ContentSection
            id="loved-steps"
            index={3}
            title="Primeiros passos"
            isViewed={false}
            labelTone="teal"
            collapsible={false}
          >
            <InteractiveChecklist
              intro="Este é um roteiro sugerido. Você pode seguir outra ordem. Marque no seu tempo; suas escolhas ficam guardadas neste aparelho."
              items={lovedSteps}
              checked={checklist}
              accent="emerald"
              onToggle={(i, v) => setChecklistItem(CHECKLIST_ID, i, v)}
            />
          </ContentSection>
          )}

          {currentChapterId === "loved-atendimento" && (
          <ContentSection
            id="loved-atendimento"
            index={4}
            title="Onde buscar atendimento pelo SUS no Amapá"
            isViewed={false}
            labelTone="teal"
            collapsible={false}
          >
            <AtendimentoSusSection tone="mint" />
          </ContentSection>
          )}

          {currentChapterId === "loved-sus" && (
          <ContentSection
            id="loved-sus"
            index={5}
            title="Serviços gratuitos garantidos pelo SUS"
            isViewed={false}
            labelTone="teal"
            collapsible={false}
          >
            <ServicosSusSection />
          </ContentSection>
          )}

          {currentChapterId === "loved-ableism" && (
          <ContentSection
            id="loved-ableism"
            index={showResponsavel ? 7 : 6}
            title="Evitar capacitismo"
            isViewed={false}
            labelTone="teal"
            collapsible={false}
          >
            <p className="max-w-prose">
              Capacitismo é tratar alguém como menos capaz por ser autista. Além de ofender, ele
              leva a pessoa a esconder quem é para se encaixar. Alguns exemplos comuns:
            </p>
            <ul className="list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-700">
              <li>
                <strong className="text-slate-900">Forçar contato visual.</strong> Frases como
                “olha nos meus olhos quando falo” podem causar desconforto intenso e atrapalhar a
                atenção ao que está sendo dito.
              </li>
              <li>
                <strong className="text-slate-900">Proibir o stimming.</strong> Stimming são
                movimentos ou sons repetitivos, como balançar as mãos, que costumam ajudar a
                regular emoções e sensações. Proibir sem combinar uma alternativa pode aumentar a
                ansiedade e as crises.
              </li>
              <li>
                <strong className="text-slate-900">
                  Comparar com “outras crianças” ou “pessoas normais”.
                </strong>{" "}
                A comparação usa uma régua que não serve para essa pessoa e a faz se sentir
                inadequada.
              </li>
              <li>
                <strong className="text-slate-900">Tratar sensibilidade sensorial como “frescura”.</strong>{" "}
                Luz, cheiro e som podem causar dor de verdade. Ajustar o ambiente é apoio, não
                exagero.
              </li>
              <li>
                <strong className="text-slate-900">
                  Trocar a exigência por curiosidade costuma abrir caminho.
                </strong>{" "}
                Em vez de “não faz drama”, experimente perguntar: “O que está te incomodando
                agora?”
              </li>
            </ul>
          </ContentSection>
          )}

          {showResponsavel && currentChapterId === "loved-responsaveis" ? (
            <TrackLovedOneResponsaveisExtra
              index={6}
              getChecklist={getChecklist}
              setChecklistItem={setChecklistItem}
            />
          ) : null}

          {!showingExplore ? (
            <nav className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-rose-200/80 pt-5">
              <button
                type="button"
                disabled={currentChapterIndex === 0}
                onClick={() =>
                  goToChapter(chapters[currentChapterIndex - 1]?.id ?? chapters[0].id)
                }
                className="min-h-12 rounded-xl border border-stone-300 bg-white/80 px-5 py-3 font-semibold text-stone-700 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => {
                  if (currentChapterIndex === chapters.length - 1) {
                    goToChapter("loved-explore", true);
                  } else {
                    goToChapter(chapters[currentChapterIndex + 1].id, true);
                  }
                }}
                className="chapter-next min-h-12 rounded-xl bg-[#9a3b52] px-5 py-3 font-bold text-white shadow-sm hover:bg-[#7e3043] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-900"
              >
                {currentChapterIndex === chapters.length - 1
                  ? "Próximo: Lobby de exploração"
                  : `Próximo: ${chapters[currentChapterIndex + 1].title}`}
              </button>
            </nav>
          ) : (
            <button
              type="button"
              onClick={() => goToChapter(chapters[0].id)}
              className="mt-8 min-h-12 rounded-xl border border-stone-300 px-5 py-3 font-semibold text-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
            >
              Voltar ao Capítulo 1
            </button>
          )}
        </div>

        <TrackToc
          items={tocItems}
          variant="loved"
          onSelect={(id) => goToChapter(id, false)}
        />
      </div>
    </div>
  );
}
