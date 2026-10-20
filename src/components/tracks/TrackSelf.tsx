import { useCallback, useMemo, useState } from "react";
import { useTrackProgress } from "../../hooks/useTrackProgress";
import { useSectionInView } from "../../hooks/useSectionInView";
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
  makeAnchorCard,
  TrackExploreHub,
} from "./TrackExploreHub";
import { TrackSelfGate } from "./TrackSelfGate";

type TrackSelfProps = {
  onBack: () => void;
  onSwitchTrack: () => void;
  onContact: () => void;
};

const CHECKLIST_ID = "self-s2";

const selfSteps: InteractiveChecklistItem[] = [
  {
    title: "Guarde o laudo em local seguro (físico e digital).",
    hint: "Pasta em casa, nuvem com senha, e uma cópia no celular podem evitar perdas em momentos de cansaço.",
  },
  {
    title: "Evite decisões grandes nas primeiras semanas.",
    hint: "Emprego, término, mudança brusca de curso ou escola podem esperar um pouco — seu sistema nervoso está processando muita coisa.",
  },
  {
    title: "Primeiro profissional: neuropsicólogo ou psiquiatra com experiência em TEA em adultos.",
    hint: "Antes de marcar, pergunte com calma se a pessoa atende autistas adultos e se tem familiaridade com diagnóstico tardio.",
  },
  {
    title: "Segundo profissional (opcional, mas recomendado): psicólogo com ACT ou DBT.",
    hint: "Essas abordagens costumam ajudar com emoções intensas, culpa e planejamento de vida — sem prometer “conserto rápido”.",
  },
  {
    title: "Terceiro (se fizer sentido): terapeuta ocupacional para mapeamento sensorial.",
    hint: "Ajuda a traduzir sensações e rotinas em ajustes concretos no dia a dia.",
  },
  {
    title: "Entre em comunidades antes de “só” ir a consultórios.",
    hint: "O pertencimento regula ansiedade. Busque comunidades online de autistas — grupos focados em diagnóstico tardio e neurodivergência.",
    bullets: [
      "Prefira espaços moderados e com regras claras de respeito.",
      "Se algo aumentar culpa ou comparação dolorosa, é permissível sair.",
    ],
  },
];

export function TrackSelf({ onBack, onSwitchTrack, onContact }: TrackSelfProps) {
  const [mainUnlocked, setMainUnlocked] = useState(() => loadTrackAProfile().gateCompleted);
  const [levelBadge, setLevelBadge] = useState<string | null>(() => {
    const p = loadTrackAProfile();
    return p.gateCompleted && p.level ? levelBadgeLabel(p.level) : null;
  });

  const handleGateDone = useCallback(() => {
    const p = loadTrackAProfile();
    setMainUnlocked(true);
    setLevelBadge(p.level ? levelBadgeLabel(p.level) : null);
  }, []);

  if (!mainUnlocked) {
    return <TrackSelfGate onComplete={handleGateDone} />;
  }

  return (
    <TrackSelfMain
      onBack={onBack}
      onSwitchTrack={onSwitchTrack}
      onContact={onContact}
      levelBadge={levelBadge}
    />
  );
}

type TrackSelfMainProps = {
  onBack: () => void;
  onSwitchTrack: () => void;
  onContact: () => void;
  levelBadge: string | null;
};

function TrackSelfMain({
  onBack,
  onSwitchTrack,
  onContact,
  levelBadge,
}: TrackSelfMainProps) {
  const {
    markSectionViewed,
    setChecklistItem,
    isSectionViewed,
    viewedCount,
    totalSections,
    getChecklist,
  } = useTrackProgress("self");

  const refS1 = useSectionInView(() => markSectionViewed("self-s1"), true);
  const refS2 = useSectionInView(() => markSectionViewed("self-s2"), true);
  const refAt = useSectionInView(() => markSectionViewed("self-atendimento"), true);
  const refSus = useSectionInView(() => markSectionViewed("self-sus"), true);
  const refTer = useSectionInView(() => markSectionViewed("self-terapia"), true);
  const refDir = useSectionInView(() => markSectionViewed("self-direitos"), true);
  const refCar = useSectionInView(() => markSectionViewed("self-carteira"), true);

  const checklist = getChecklist(CHECKLIST_ID);
  const allRead = viewedCount >= totalSections && totalSections > 0;

  const tocItems: TocItem[] = useMemo(() => {
    const items: TocItem[] = [
      { id: "self-s1", label: "Validação emocional" },
      { id: "self-s2", label: "Primeiros passos práticos" },
      { id: "self-atendimento", label: "Onde buscar atendimento" },
      { id: "self-terapia", label: "Direito à terapia" },
      { id: "self-direitos", label: "Seus direitos no Amapá" },
      { id: "self-carteira", label: "Emitir Carteira TEA" },
    ];
    if (allRead) items.push({ id: "self-explore", label: "O que mais explorar" });
    return items;
  }, [allRead]);

  const hubCards = useMemo(
    () => [
      makeAnchorCard(
        "hub-at",
        "Onde buscar atendimento",
        "CAPSi, CER, CAPS III e TEAtendemos no Amapá",
        HubIcons.map,
        "self-atendimento",
      ),
      makeAnchorCard(
        "hub-dir",
        "Seus direitos",
        "Direitos federais e estaduais que podem te proteger",
        HubIcons.rights,
        "self-direitos",
      ),
      makeAnchorCard(
        "hub-car",
        "Emitir Carteira TEA",
        "Passo a passo no Super Fácil",
        HubIcons.card,
        "self-carteira",
      ),
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
      makeAnchorCard(
        "hub-sus",
        "Serviços do SUS",
        "O que é gratuito na rede pública",
        HubIcons.sus,
        "self-sus",
      ),
    ],
    [onContact, onSwitchTrack],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <TrackProgressHeader
        eyebrow="Trilha: para você"
        title="Depois do diagnóstico"
        viewedCount={viewedCount}
        totalSections={totalSections}
        onBack={onBack}
        variant="self"
        levelBadge={levelBadge}
      />

      <div className="flex items-start gap-8">
        <div className="track-main min-w-0 flex-1 space-y-8">
          <ContentSection
            ref={refS1}
            id="self-s1"
            index={1}
            title="Validação emocional"
            isViewed={isSectionViewed("self-s1")}
          >
            <p className="max-w-prose">
              É normal sentir confusão ou alívio — ou outras emoções misturadas. Não existe reação
              &quot;certa&quot;.
            </p>
            <p className="max-w-prose">
              O diagnóstico pode reorganizar pedaços da sua história. Respire no seu ritmo.
            </p>

            <div className="space-y-4 pt-2">
              <PhaseCard title="Se você entrou em “modo análise”" tone="amber">
                <p className="max-w-prose">
                  Pesquisar sem parar pode ser um jeito de buscar segurança. Faz sentido querer
                  entender tudo de uma vez.
                </p>
                <p className="max-w-prose">
                  Se isso está tirando sono, comida ou pausas, tente um combinado gentil: um bloco
                  curto de leitura e depois uma pausa sensorial (água, banho, ar livre, tela para
                  baixo).
                </p>
                <p className="max-w-prose">
                  Você não está “exagerando”. Seu corpo pode estar pedindo freio, não mais
                  informação.
                </p>
              </PhaseCard>

              <PhaseCard title="Se você sentiu alívio — e culpa por sentir alívio" tone="rose">
                <p className="max-w-prose">
                  Alívio costuma aparecer quando algo finalmente tem nome. Isso não apaga
                  dificuldades, só deixa menos solitário carregar tudo sem explicação.
                </p>
                <p className="max-w-prose">
                  Culpa por aliviar não é “prova” de que você é egoísta. Muitas vezes é um hábito
                  antigo de se diminuir.
                </p>
                <p className="max-w-prose">
                  Você pode honrar o alívio e, ao mesmo tempo, sentir tristeza — tudo pode caber
                  aqui.
                </p>
              </PhaseCard>
            </div>
          </ContentSection>

          <ContentSection
            ref={refS2}
            id="self-s2"
            index={2}
            title="Primeiros passos práticos"
            isViewed={isSectionViewed("self-s2")}
          >
            <InteractiveChecklist
              intro="Um caminho possível, sem pressa de fazer tudo junto. Marque o que já fez — seu progresso fica salvo neste aparelho."
              items={selfSteps}
              checked={checklist}
              accent="sky"
              onToggle={(i, v) => setChecklistItem(CHECKLIST_ID, i, v)}
            />
          </ContentSection>

          <ContentSection
            ref={refAt}
            id="self-atendimento"
            index={3}
            title="Onde buscar atendimento pelo SUS no Amapá"
            isViewed={isSectionViewed("self-atendimento")}
          >
            <AtendimentoSusSection tone="sky" />
          </ContentSection>

          <ContentSection
            ref={refSus}
            id="self-sus"
            index={4}
            title="Serviços gratuitos garantidos pelo SUS"
            isViewed={isSectionViewed("self-sus")}
          >
            <ServicosSusSection />
          </ContentSection>

          <ContentSection
            ref={refTer}
            id="self-terapia"
            index={5}
            title="Direito à terapia"
            isViewed={isSectionViewed("self-terapia")}
          >
            <DireitoTerapiaSection />
          </ContentSection>

          <ContentSection
            ref={refDir}
            id="self-direitos"
            index={6}
            title="Seus direitos no Amapá"
            isViewed={isSectionViewed("self-direitos")}
          >
            <AmapaDireitosSection />
          </ContentSection>

          <ContentSection
            ref={refCar}
            id="self-carteira"
            index={7}
            title="Emitir Carteira TEA"
            isViewed={isSectionViewed("self-carteira")}
          >
            <CarteiraTeaAmapaSection
              getChecklist={getChecklist}
              setChecklistItem={setChecklistItem}
            />
          </ContentSection>

          {allRead ? (
            <ContentSection
              id="self-explore"
              index={8}
              title="O que mais você pode explorar"
              collapsible={false}
            >
              <TrackExploreHub variant="self" cards={hubCards} />
            </ContentSection>
          ) : null}
        </div>

        <TrackToc items={tocItems} variant="self" />
      </div>
    </div>
  );
}
