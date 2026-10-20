import { PhaseCard } from "../ui/PhaseCard";

export function DireitoTerapiaSection() {
  return (
    <div className="space-y-5">
      <p className="max-w-prose">
        Terapia não é favor — é direito. Abaixo, caminhos pelo plano de saúde e pelo SUS.
      </p>

      <PhaseCard title="Pelo plano de saúde" tone="sky">
        <ul className="list-disc space-y-2 pl-5">
          <li>Terapias ilimitadas garantidas pela Resolução ANS 539/2022</li>
          <li>O plano não pode limitar número de sessões de TO, fono ou psicologia</li>
          <li>O plano não pode exigir carência por TEA (Lei federal 4788/2020)</li>
          <li>
            Em caso de negativa, registrar reclamação na ANS:{" "}
            <a
              href="https://www.ans.gov.br"
              className="font-medium text-sky-800 underline decoration-sky-300 underline-offset-2 hover:text-sky-950"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.ans.gov.br
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
