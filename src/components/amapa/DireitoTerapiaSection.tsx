import { PhaseCard } from "../ui/PhaseCard";

export function DireitoTerapiaSection() {
  return (
    <div className="space-y-5">
      <p className="max-w-prose">
        Terapia não é favor. É direito. Abaixo, veja caminhos pelo plano de saúde e pelo SUS.
      </p>

      <PhaseCard title="Pelo plano de saúde" tone="sky">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Terapias sem limite anual de sessões conforme a Resolução ANS 539/2022
            <details className="mt-2 rounded-lg border border-sky-200 bg-white/70 px-3">
              <summary className="min-h-12 cursor-pointer py-3 text-sm font-semibold text-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                O que essa norma prevê na prática
              </summary>
              <p className="pb-3 text-sm leading-relaxed">
                A resolução determina cobertura de sessões indicadas pelo profissional para pessoas
                com transtornos globais do desenvolvimento, incluindo TEA, conforme o contrato e as
                regras da ANS. Se houver negativa, peça a justificativa por escrito.
              </p>
            </details>
          </li>
          <li>O plano não pode limitar número de sessões de TO, fono ou psicologia</li>
          <li>
            Consulte as regras de carência e cobertura aplicáveis ao seu contrato, conforme a Lei
            Federal 9.656/1998
            <details className="mt-2 rounded-lg border border-sky-200 bg-white/70 px-3">
              <summary className="min-h-12 cursor-pointer py-3 text-sm font-semibold text-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                O que essa lei garante na prática
              </summary>
              <p className="pb-3 text-sm leading-relaxed">
                A Lei dos Planos de Saúde define regras para os contratos e períodos de carência.
                O prazo depende do tipo de procedimento e da situação. Peça ao plano a regra
                aplicada por escrito e, se necessário, consulte a ANS ou orientação jurídica.
              </p>
            </details>
          </li>
          <li>
            Em caso de negativa, registrar reclamação na ANS:{" "}
            <a
              href="https://www.gov.br/ans/pt-br/canais_atendimento/canais-de-atendimento-ao-consumidor-1"
              className="inline-flex min-h-12 items-center font-medium text-sky-800 underline decoration-sky-300 underline-offset-2 hover:text-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Canais de atendimento da ANS
            </a>
          </li>
        </ul>
      </PhaseCard>

      <PhaseCard title="Pelo SUS" tone="mint">
        <ul className="list-disc space-y-2 pl-5">
          <li>Terapias disponíveis no CAPSi e CER sem custo</li>
          <li>Acesso via encaminhamento pela UBS ou demanda espontânea no CAPSi</li>
        </ul>
      </PhaseCard>
    </div>
  );
}
