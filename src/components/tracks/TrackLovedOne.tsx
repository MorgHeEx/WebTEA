import { useMemo, useState } from "react";
import { useTrackProgress } from "../../hooks/useTrackProgress";
import { useSectionInView } from "../../hooks/useSectionInView";
import { loadTrackAProfile } from "../../lib/trackAProfileStorage";
import {
  loadTrackBProfile,
  relationLabelFromState,
} from "../../lib/trackBProfileStorage";
import { ContentSection } from "../ui/ContentSection";
import {
  InteractiveChecklist,
  type InteractiveChecklistItem,
} from "../ui/InteractiveChecklist";
import { PhaseCard } from "../ui/PhaseCard";
import { TrackProgressHeader } from "../ui/TrackProgressHeader";
import { VivenciasSection } from "./VivenciasSection";
import { TrackLovedOneGate } from "./TrackLovedOneGate";
import { TrackLovedOneResponsaveisExtra } from "./TrackLovedOneResponsaveisExtra";

type TrackLovedOneProps = {
  onBack: () => void;
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

export function TrackLovedOne({ onBack }: TrackLovedOneProps) {
  const [unlocked, setUnlocked] = useState(() => loadTrackBProfile().gateCompleted);

  if (!unlocked) {
    return <TrackLovedOneGate onComplete={() => setUnlocked(true)} />;
  }

  return <TrackLovedOneMain onBack={onBack} />;
}

function TrackLovedOneMain({ onBack }: TrackLovedOneProps) {
  const bProfile = useMemo(() => loadTrackBProfile(), []);
  const aProfile = useMemo(() => loadTrackAProfile(), []);

  const relationLabel = relationLabelFromState(bProfile);
  const defaultAuthor =
    bProfile.preferredName.trim() || aProfile.preferredName.trim();
  const dependentLevel = aProfile.level;

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
  const refS = useSectionInView(() => markSectionViewed("loved-steps"), true);
  const refA = useSectionInView(() => markSectionViewed("loved-ableism"), true);
  const refV = useSectionInView(() => markSectionViewed("loved-vivencias"), true);

  const checklist = getChecklist(CHECKLIST_ID);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <TrackProgressHeader
        eyebrow="Trilha: apoio a alguém próximo"
        title="Acolhendo quem você ama"
        viewedCount={viewedCount}
        totalSections={totalSections}
        onBack={onBack}
        variant="loved"
      />

      <div className="space-y-8">
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
          ref={refS}
          id="loved-steps"
          index={2}
          title="Primeiros passos do familiar"
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
          ref={refA}
          id="loved-ableism"
          index={3}
          title="Capacitismo no dia a dia (exemplos concretos)"
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
          <TrackLovedOneResponsaveisExtra getChecklist={getChecklist} setChecklistItem={setChecklistItem} />
        ) : null}

        <ContentSection
          ref={refV}
          id="loved-vivencias"
          index={4}
          title="Vivências de quem também passou por isso"
          isViewed={isSectionViewed("loved-vivencias")}
          labelTone="teal"
        >
          <VivenciasSection
            relationLabel={relationLabel}
            defaultAuthorName={defaultAuthor}
            dependentLevel={dependentLevel}
          />
        </ContentSection>
      </div>
    </div>
  );
}
