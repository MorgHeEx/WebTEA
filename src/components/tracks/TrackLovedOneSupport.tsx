import { useCallback, useState } from "react";
import { useDisplaySettings } from "../../hooks/useDisplaySettings";
import { useSectionInView } from "../../hooks/useSectionInView";
import { PhaseCard } from "../ui/PhaseCard";

/**
 * Conteúdo da seção "Ser rede de apoio" (Trilha B).
 */
export function TrackLovedOneSupport() {
  const { settings } = useDisplaySettings();
  const [revealed, setRevealed] = useState(() => [settings.reduceMotion, settings.reduceMotion, settings.reduceMotion]);
  const revealFirst = useCallback(() => setRevealed((state) => [true, state[1], state[2]]), []);
  const revealSecond = useCallback(() => setRevealed((state) => [state[0], true, state[2]]), []);
  const revealThird = useCallback(() => setRevealed((state) => [state[0], state[1], true]), []);
  const firstRef = useSectionInView(revealFirst, !settings.reduceMotion, { threshold: 0.1 });
  const secondRef = useSectionInView(revealSecond, !settings.reduceMotion, { threshold: 0.1 });
  const thirdRef = useSectionInView(revealThird, !settings.reduceMotion, { threshold: 0.1 });

  return (
    <div className="space-y-4">
      <section ref={firstRef} className="support-message" data-revealed={revealed[0]}>
        <p className="max-w-prose">
          Apoiar alguém recém-diagnosticado não exige respostas perfeitas. Exige presença
          respeitosa, escuta e ritmo compartilhado.
        </p>

        <PhaseCard title="O que costuma ajudar" tone="mint">
          <ul className="list-disc space-y-2 pl-5">
            <li>Perguntar como a pessoa quer ser apoiada, em vez de assumir.</li>
            <li>Validar o cansaço e a confusão sem tentar “consertar” na hora.</li>
            <li>Oferecer ajuda concreta e pequena, como acompanhar a uma consulta ou organizar documentos.</li>
            <li>Respeitar pausas, stimming e limites sensoriais sem julgamento.</li>
          </ul>
        </PhaseCard>
      </section>

      <section ref={secondRef} className="support-message" data-revealed={revealed[1]}>
        <PhaseCard title="O que costuma atrapalhar" tone="rose">
          <ul className="list-disc space-y-2 pl-5">
            <li>Negar ou minimizar o diagnóstico para “proteger” a pessoa.</li>
            <li>Comparar com outras pessoas ou com um ideal de “normalidade”.</li>
            <li>Tomar decisões grandes pela pessoa sem conversa.</li>
            <li>Exigir mascaramento social (“parece normal, então aguenta”).</li>
          </ul>
        </PhaseCard>
      </section>

      <section ref={thirdRef} className="support-message" data-revealed={revealed[2]}>
        <p className="max-w-prose">
          Cuidar de você também faz parte da rede: apoio esgotado vira pressão. Se precisar,
          busque um profissional para processar a notícia. Isso fortalece o vínculo, não
          enfraquece.
        </p>
      </section>
    </div>
  );
}
