import { useMemo, useState } from "react";
import { useTrackProgress } from "../../hooks/useTrackProgress";
import { useSectionInView } from "../../hooks/useSectionInView";
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
import {
  HubIcons,
  makeAnchorCard,
  TrackExploreHub,
} from "./TrackExploreHub";
import { TrackLovedOneGate } from "./TrackLovedOneGate";
import { TrackLovedOneResponsaveisExtra } from "./TrackLovedOneResponsaveisExtra";
import { TrackLovedOneSupport } from "./TrackLovedOneSupport";

type TrackLovedOneProps = {
  onBack: () => void;
  onSwitchTrack: () => void;
  onContact: () => void;
};

const CHECKLIST_ID = "loved-steps";

const lovedSteps: InteractiveChecklistItem[] = [
  {
    title: "Leia sobre TEA por fontes confiáveis — não só por grupos de WhatsApp.",
    hint: "Sugestões: livro “Neurotribes” (Steve Silberman) e o canal Papo de Autista (YouTube).",
  },
  {
    title: "Separe suas expectativas das necessidades reais da pessoa.",
    hint: "O que você imaginou para o futuro pode doer — e ainda assim a prioridade agora é o que sustenta a pessoa no presente.",
  },
  {
    title: "Converse sobre como ela quer ser apoiada.",
    hint: "Perguntas simples ajudam mais do que soluções prontas: “O que está pesado?” “Como posso facilitar hoje?”",
  },
  {
    title: "Profissionais para você (familiar): psicólogo para processar a notícia.",
    hint: "Cuidar de você não é egoísmo — é o que mantém apoio estável em vez de apoio esgotado.",
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

export function TrackLovedOne({ onBack, onSwitchTrack, onContact }: TrackLovedOneProps) {
  const [unlocked, setUnlocked] = useState(() => loadTrackBProfile().gateCompleted);

  if (!unlocked) {
    return <TrackLovedOneGate onComplete={() => setUnlocked(true)} />;
  }

  return (
    <TrackLovedOneMain
      onBack={onBack}
      onSwitchTrack={onSwitchTrack}
      onContact={onContact}
    />
  );
}

function TrackLovedOneMain({ onBack, onSwitchTrack, onContact }: TrackLovedOneProps) {
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

  const refD = useSectionInView(() => markSectionViewed("loved-denial"), true);
  const refSup = useSectionInView(() => markSectionViewed("loved-support"), true);
  const refS = useSectionInView(() => markSectionViewed("loved-steps"), true);
  const refAt = useSectionInView(() => markSectionViewed("loved-atendimento"), true);
  const refSus = useSectionInView(() => markSectionViewed("loved-sus"), true);
  const refA = useSectionInView(() => markSectionViewed("loved-ableism"), true);

  const checklist = getChecklist(CHECKLIST_ID);
  const allRead = viewedCount >= totalSections && totalSections > 0;

  const tocItems: TocItem[] = useMemo(() => {
    const items: TocItem[] = [
      { id: "loved-denial", label: "Fase de negação" },
      { id: "loved-support", label: "Ser rede de apoio" },
      { id: "loved-steps", label: "Primeiros passos" },
      { id: "loved-atendimento", label: "Onde buscar atendimento" },
      { id: "loved-ableism", label: "Evitar capacitismo" },
    ];
    if (showResponsavel) {
      items.push({ id: "loved-responsaveis", label: "Para responsáveis" });
    }
    if (allRead) items.push({ id: "loved-explore", label: "O que mais explorar" });
    return items;
  }, [allRead, showResponsavel]);

  const hubCards = useMemo(() => {
    const cards = [
      makeAnchorCard(
        "hub-at",
        "Onde buscar atendimento",
        "CAPSi, CER, CAPS III e TEAtendemos no Amapá",
        HubIcons.map,
        "loved-atendimento",
      ),
      makeAnchorCard(
        "hub-ableism",
        "Evitar capacitismo",
        "Exemplos concretos do dia a dia",
        HubIcons.heart,
        "loved-ableism",
      ),
      makeAnchorCard(
        "hub-sus",
        "Serviços do SUS",
        "O que é gratuito na rede pública",
        HubIcons.sus,
        "loved-sus",
      ),
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
    if (showResponsavel) {
      cards.splice(
        1,
        0,
        makeAnchorCard(
          "hub-dir",
          "Seus direitos",
          "Direitos da pessoa sob seus cuidados",
          HubIcons.rights,
          "loved-responsaveis",
        ),
        makeAnchorCard(
          "hub-car",
          "Emitir Carteira TEA",
          "Cadastro em nome do dependente",
          HubIcons.card,
          "loved-responsaveis",
        ),
      );
    }
    return cards.slice(0, 6);
  }, [onContact, onSwitchTrack, showResponsavel]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <TrackProgressHeader
        eyebrow="Trilha: apoio a alguém próximo"
        title="Acolhendo quem você ama"
        viewedCount={viewedCount}
        totalSections={totalSections}
        onBack={onBack}
        variant="loved"
      />

      <div className="flex items-start gap-8">
        <div className="track-main min-w-0 flex-1 space-y-8">
          <ContentSection
            ref={refD}
            id="loved-denial"
            index={1}
            title="Fase de negação"
            isViewed={isSectionViewed("loved-denial")}
            labelTone="teal"
          >
            <p className="max-w-prose">
              Às vezes a primeira reação não é carinho — é um não cabe na boca. Isso também é humano.
            </p>

            <div className="space-y-4 pt-2">
              <PhaseCard title="Por que a negação aparece" tone="amber">
                <p className="max-w-prose">
                  Muita gente cresce ouvindo ideias erradas sobre autismo. Diagnóstico pode mexer com
                  medo de “rotular”, culpa de genitor, vergonha social ou sensação de perda do futuro
                  imaginado.
                </p>
                <p className="max-w-prose">
                  Negação pode ser um jeito de ganhar tempo — só que, sem perceber, ela empurra a
                  pessoa diagnosticada para se justificar sozinha.
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

          <ContentSection
            ref={refSup}
            id="loved-support"
            index={2}
            title="Ser rede de apoio"
            isViewed={isSectionViewed("loved-support")}
            labelTone="teal"
          >
            <TrackLovedOneSupport />
          </ContentSection>

          <ContentSection
            ref={refS}
            id="loved-steps"
            index={3}
            title="Primeiros passos"
            isViewed={isSectionViewed("loved-steps")}
            labelTone="teal"
          >
            <InteractiveChecklist
              intro="Um roteiro possível — a ordem é sugestão. Marque no seu tempo; salvamos automaticamente neste aparelho."
              items={lovedSteps}
              checked={checklist}
              accent="emerald"
              onToggle={(i, v) => setChecklistItem(CHECKLIST_ID, i, v)}
            />
          </ContentSection>

          <ContentSection
            ref={refAt}
            id="loved-atendimento"
            index={4}
            title="Onde buscar atendimento pelo SUS no Amapá"
            isViewed={isSectionViewed("loved-atendimento")}
            labelTone="teal"
          >
            <AtendimentoSusSection tone="mint" />
          </ContentSection>

          <ContentSection
            ref={refSus}
            id="loved-sus"
            index={5}
            title="Serviços gratuitos garantidos pelo SUS"
            isViewed={isSectionViewed("loved-sus")}
            labelTone="teal"
          >
            <ServicosSusSection />
          </ContentSection>

          <ContentSection
            ref={refA}
            id="loved-ableism"
            index={6}
            title="Evitar capacitismo"
            isViewed={isSectionViewed("loved-ableism")}
            labelTone="teal"
          >
            <p className="max-w-prose">
              Capacitismo não só “ofende” — ele empurra a pessoa a se apagar. Alguns exemplos comuns:
            </p>
            <ul className="list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-700">
              <li>
                <strong className="text-slate-900">Forçar contato visual.</strong> Frases como
                &quot;olha nos meus olhos quando falo&quot; podem causar dor e tirar foco do que está
                sendo dito.
              </li>
              <li>
                <strong className="text-slate-900">Proibir stimming.</strong> Movimentos repetitivos
                costumam regular o sistema nervoso — proibir sem combinar alternativa pode aumentar
                crises.
              </li>
              <li>
                <strong className="text-slate-900">Comparar com “outras crianças/adultos normais”.</strong>{" "}
                Comparação usa uma régua falsa e isola quem já está vulnerável.
              </li>
              <li>
                <strong className="text-slate-900">Tratar sensibilidade sensorial como “frescura”.</strong>{" "}
                Luz, cheiro e som podem ser dolorosos de verdade — ajustar o ambiente é apoio, não
                mimimi.
              </li>
            </ul>
            <p className="max-w-prose pt-1">
              Trocar exigência por curiosidade costuma abrir caminho: “O que está incômodo agora?” em
              vez de “não faz drama”.
            </p>
          </ContentSection>

          {showResponsavel ? (
            <TrackLovedOneResponsaveisExtra
              getChecklist={getChecklist}
              setChecklistItem={setChecklistItem}
            />
          ) : null}

          {allRead ? (
            <ContentSection
              id="loved-explore"
              index={showResponsavel ? 8 : 7}
              title="O que mais você pode explorar"
              collapsible={false}
              labelTone="teal"
            >
              <TrackExploreHub variant="loved" cards={hubCards} />
            </ContentSection>
          ) : null}
        </div>

        <TrackToc items={tocItems} variant="loved" />
      </div>
    </div>
  );
}
