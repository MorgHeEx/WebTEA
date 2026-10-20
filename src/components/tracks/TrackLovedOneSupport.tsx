import { PhaseCard } from "../ui/PhaseCard";

/**
 * Conteúdo da seção "Ser rede de apoio" (Trilha B).
 */
export function TrackLovedOneSupport() {
  return (
    <div className="space-y-4">
      <p className="max-w-prose">
        Apoiar alguém recém-diagnosticado não exige respostas perfeitas. Exige presença
        respeitosa, escuta e ritmo compartilhado.
      </p>

      <PhaseCard title="O que costuma ajudar" tone="mint">
        <ul className="list-disc space-y-2 pl-5">
          <li>Perguntar como a pessoa quer ser apoiada — em vez de assumir.</li>
          <li>Validar o cansaço e a confusão sem tentar “consertar” na hora.</li>
          <li>Oferecer ajuda concreta e pequena (acompanhar a uma consulta, organizar documentos).</li>
          <li>Respeitar pausas, stimming e limites sensoriais sem julgamento.</li>
        </ul>
      </PhaseCard>

      <PhaseCard title="O que costuma atrapalhar" tone="rose">
        <ul className="list-disc space-y-2 pl-5">
          <li>Negar ou minimizar o diagnóstico para “proteger” a pessoa.</li>
          <li>Comparar com outras pessoas ou com um ideal de “normalidade”.</li>
          <li>Tomar decisões grandes pela pessoa sem conversa.</li>
          <li>Exigir mascaramento social (“parece normal, então aguenta”).</li>
        </ul>
      </PhaseCard>

      <p className="max-w-prose">
        Cuidar de você também faz parte da rede: apoio esgotado vira pressão. Se precisar,
        busque um profissional para processar a notícia — isso fortalece o vínculo, não
        enfraquece.
      </p>
    </div>
  );
}
