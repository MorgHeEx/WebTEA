import { PhaseCard } from "../ui/PhaseCard";

type Service = {
  title: string;
  lines: (string | { text: string; href: string })[];
};

const SERVICES: Service[] = [
  {
    title: "Centro de Atenção Psicossocial Infantil Juvenil (CAPSi de Macapá)",
    lines: [
      {
        text: "Endereço: Rua Redenção, 432 – Jardim Marco Zero (Complexo Macapá Criança)",
        href:"https://maps.app.goo.gl/iEDNRPRwRMfZ3mqp7",
      },
      "Público: crianças e adolescentes de 6 a 17 anos de idade com transtorno mentais graves e persistentes, incluindo TEA",
      "Atendimento: de segunda a sexta-feira em dois turnos (manhã e tarde), atende demandas espontâneas e encaminhadas de outros serviços",
    ],
  },
  {
    title: "CAPS II Esperança - Centro de Atenção Psicossocial (Zona Norte - Macapá)",
    lines: [
      {
        text: "Endereço: R. Rio Branco, 686 - Infraero, Macapá - AP, 68908-048",
        href:"https://maps.app.goo.gl/2Xpa3zFrVi1duob48",
      },
      "Público: pessoas maiores de 18 anos",
      "Atendimento: de segunda a sexta-feira, das 8h às 18h)",
    ],
  },
  {
    title: "Centro de Atenção Psicossocial (CAPS III Casa Gentileza, Macapá)",
    lines: [
      {
        text:"Endereço: Av. Marcílio Dias, 1395 – Jesus de Nazaré, Macapá",
        href:"https://maps.app.goo.gl/C6R7Ccxg9or6bb1T7",
      },
      "Público: pessoas a partir de 18 anos de idade com transtornos mentais graves e persistentes. Especificamente os transtornos mentais maiores/psicóticos. Ex: esquizofrenia e transtorno afetivo bipolar",
      "Atendimento: de segunda a sexta-feira, das 8h às 18h",
    ],
  },
  {
    title: "CAPS - Centro de Atenção Psico Social (Mazagão)",
    lines: [
      {
        text:"Endereço: Av. Pedro Aires Aleluia, 100 - Mazagão, AP, 68940-000",
        href:"https://maps.app.goo.gl/7u4mjxJsCLAaCUZn8",
      },
      "Atendimento: de segunda a sexta-feira, das 8h às 18h",
    ],
  },
  {
    title: "Centro de Atenção Psicossocial Tipo 1 (CAPS I de Oiapoque)",
    lines: [
      {
        text:"R. Djalma Limeira, 581 - Oiapoque, AP, 68980-000",
        href:"https://maps.app.goo.gl/gwD4cjnBsfHULtmc7",
      },
      "Público-alvo: pessoas a partir de 12 anos de idade que apresentam prioritariamente intenso sofrimento psíquico decorrente de transtornos mentais graves e persistentes, incluindo aqueles relacionados ao uso de substâncias psicoativas, e outras situações clínicas que impossibilitem estabelecer laços sociais e realizar projetos de vida",
      "Atendimento: de segunda a sexta-feira em dois turnos (manhã e tarde), atende demandas espontâneas e encaminhadas de outros serviços",
    ],
  },
  {
    title: "Centro de Atenção Psicossocial Tipo 1 (CAPS 1 de Laranjal do Jari)",
    lines: [
      "Endereço: Rua Vitória Régia, 2500, Laranjal do Jari-AP",
      "Público-alvo: pessoas a partir de 18 anos de idade que apresentam prioritariamente intenso sofrimento psíquico decorrente de transtornos mentais graves e persistentes, incluindo aqueles relacionados ao uso de substâncias psicoativas, e outras situações clínicas que impossibilitem estabelecer laços sociais e realizar projetos de vida",
      "Atendimento: de segunda a sexta-feira em dois turnos (manhã e tarde), atende demandas espontâneas e encaminhadas de outros serviços",
    ],
  },
  {
    title: "Centro de Atenção Psicossocial Infantojuvenil (CAPS IJ / Espaço JAPIIM de Santana)",
    lines: [
      {
        text: "R. Pres. Arthur Costa e Silva, 1434 - Remédios, Santana - AP, 68925-099",
        href: "https://maps.app.goo.gl/Zy2fJLdW75a3bqRu6",
      },
      "Público-alvo: crianças e adolescentes de 6 a 17 anos de idade com transtornos mentais graves e persistentes e com necessidades decorrentes do uso de álcool e outras drogas",
      "Atendimento: de segunda a sexta-feira em dois turnos (manhã e tarde), atende demandas espontâneas e encaminhadas de outros serviços",
    ],
  },
  {
    title: "Centro de Atenção Psicossocial Tipo 1 (CAPS I Renovar - Porto Grande)",
    lines: [
      {
        text: "Endereço: Av. Soldado Valdinei Pereira, s/n, bairro Nova Esperança, Porto Grande-AP, 68997-000 (Entre Centro Especializado de Reabilitação e UBS Nova Esperança)",
        href: "https://maps.app.goo.gl/eKJERmCxjesVAbbQ6",
      },
      "Público-alvo: pessoas a partir de 18 anos de idade que apresentam prioritariamente intenso sofrimento psíquico decorrente de transtornos mentais graves e persistentes, incluindo aqueles relacionados ao uso de substâncias psicoativas, e outras situações clínicas que impossibilitem estabelecer laços sociais e realizar projetos de vida",
      "Atendimento: de segunda a sexta-feira em dois turnos (manhã e tarde), atende demandas espontâneas e encaminhadas de outros serviços",
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
        Pontos de partida no SUS no Amapá. Confirme horários e disponibilidade antes de ir.
      </p>

      <ul className="space-y-4">
        {SERVICES.map((s) => (
          <li key={s.title}>
            <PhaseCard title={s.title} tone={tone === "mint" ? "mint" : "sky"}>
              <ul className="list-disc space-y-2 pl-5">
                {s.lines.map((line) => (
                  <li key={typeof line === "string" ? line : line.text}>
                    {typeof line === "string" ? (
                      line
                    ) : (
                      <a
                        href={line.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-800 underline underline-offset-2 hover:text-sky-900"
                      >
                        {line.text}
                      </a>
                    )}
                  </li>
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
