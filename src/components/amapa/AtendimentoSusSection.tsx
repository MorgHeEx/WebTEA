import { PhaseCard } from "../ui/PhaseCard";

type Service = {
  title: string;
  lines: string[];
};

const SERVICES: Service[] = [
  {
    title: "CAPSi — Centro de Atenção Psicossocial Infantil",
    lines: [
      "Endereço: Rua Redenção, 432 – Pedrinhas (Complexo Macapá Criança)",
      "Público: Crianças e adolescentes com TEA e transtornos mentais graves",
      "Atendimento: Segunda a sexta, manhã e tarde",
      "Aceita demanda espontânea e encaminhamentos",
      "Contato: verificar com a unidade",
    ],
  },
  {
    title: "CAPS III – Casa Gentileza",
    lines: [
      "Endereço: Av. Marcílio Dias, 1395 – Jesus de Nazaré, Macapá",
      "Público: Adultos a partir de 18 anos com transtornos mentais graves",
      "Observação: Para adultos com TEA e comorbidades",
    ],
  },
  {
    title: "CER — Centro Especializado em Reabilitação de Macapá",
    lines: [
      "Público: Pessoas com TEA de todas as idades",
      "Serviços: Terapia ocupacional, fonoaudiologia, psicologia, neuropediatria, avaliação multiprofissional para laudo",
      "Contato para grupo terapêutico de pais/responsáveis: (96) 98802-8388",
    ],
  },
  {
    title: "Projeto TEAtendemos (Prefeitura de Macapá)",
    lines: [
      "O que é: Mutirões periódicos para emissão de laudos de TEA para quem está na fila de espera",
      "Como acessar: Pelo CAPSi ou CER — solicitar inclusão na fila",
      "Especialistas disponíveis: Neuropediatra, psiquiatra, terapeuta ocupacional, fonoaudiólogo, psicólogo, exames (BERA, tomografia, eletroencefalograma)",
    ],
  },
];

type AtendimentoSusSectionProps = {
  tone?: "sky" | "mint";
};

export function AtendimentoSusSection({ tone = "sky" }: AtendimentoSusSectionProps) {
  return (
    <div className="space-y-5">
      <p className="max-w-prose">
        Pontos de partida no SUS em Macapá. Confirme horários e disponibilidade antes de ir.
      </p>

      <ul className="space-y-4">
        {SERVICES.map((s) => (
          <li key={s.title}>
            <PhaseCard title={s.title} tone={tone === "mint" ? "mint" : "sky"}>
              <ul className="list-disc space-y-2 pl-5">
                {s.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </PhaseCard>
          </li>
        ))}
      </ul>

      <p className="text-sm leading-relaxed text-slate-500">
        As informações de contato e disponibilidade podem mudar. Confirme antes de se deslocar.
      </p>
    </div>
  );
}
