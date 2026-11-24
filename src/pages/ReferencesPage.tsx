type ReferencesPageProps = {
  onBack: () => void;
};

const SOURCES = [
  {
    title: "Autismo: cuidado e organização da rede de atenção",
    organization: "Ministério da Saúde",
    description:
      "Informações gerais sobre o cuidado integral e a articulação entre saúde, educação e assistência social.",
    href: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/autismo",
  },
  {
    title: "Centros de Atenção Psicossocial (CAPS)",
    organization: "Ministério da Saúde",
    description:
      "Informações sobre os CAPS e o papel dos serviços comunitários na Rede de Atenção Psicossocial do SUS.",
    href: "https://www.gov.br/saude/pt-br/composicao/saes/desmad/raps/caps",
  },
  {
    title: "Lei nº 12.764, de 27 de dezembro de 2012",
    organization: "Presidência da República, Portal da Legislação",
    description:
      "Institui a Política Nacional de Proteção dos Direitos da Pessoa com Transtorno do Espectro Autista.",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12764.htm",
  },
  {
    title: "Lei nº 13.977, de 8 de janeiro de 2020",
    organization: "Presidência da República, Portal da Legislação",
    description:
      "Cria a Carteira de Identificação da Pessoa com Transtorno do Espectro Autista (Ciptea).",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l13977.htm",
  },
  {
    title: "Lei nº 13.146, de 6 de julho de 2015",
    organization: "Presidência da República, Portal da Legislação",
    description:
      "Lei Brasileira de Inclusão da Pessoa com Deficiência, referência para direitos de inclusão e acessibilidade.",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm",
  },
  {
    title: "Lei nº 14.626, de 19 de julho de 2023",
    organization: "Presidência da República, Portal da Legislação",
    description:
      "Atualiza regras de atendimento prioritário, incluindo pessoas com deficiência e pessoas com TEA.",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14626.htm",
  },
  {
    title: "Lei nº 9.656, de 3 de junho de 1998",
    organization: "Presidência da República, Portal da Legislação",
    description:
      "Estabelece regras para os planos e seguros privados de assistência à saúde.",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l9656.htm",
  },
  {
    title: "Lei nº 8.742, de 7 de dezembro de 1993",
    organization: "Presidência da República, Portal da Legislação",
    description:
      "Institui a Lei Orgânica da Assistência Social, que organiza benefícios e serviços da assistência social.",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l8742.htm",
  },
  {
    title: "Atualização do Rol de Procedimentos e Eventos em Saúde",
    organization: "Agência Nacional de Saúde Suplementar (ANS)",
    description:
      "Explica quais consultas, exames, cirurgias e tratamentos os planos devem cobrir, conforme a segmentação contratada.",
    href: "https://www.gov.br/ans/pt-br/acesso-a-informacao/participacao-da-sociedade/atualizacao-do-rol-de-procedimentos",
  },
  {
    title: "Notificação de Intermediação Preliminar (NIP)",
    organization: "Agência Nacional de Saúde Suplementar (ANS)",
    description:
      "Apresenta a mediação da ANS para reclamações de beneficiários, após contato com a operadora e registro do protocolo.",
    href: "https://www.gov.br/ans/pt-br/assuntos/consumidor/notificacao-de-intermediacao-preliminar-nip",
  },
  {
    title: "Canais de Atendimento ao Consumidor",
    organization: "Agência Nacional de Saúde Suplementar (ANS)",
    description:
      "Orientações para registrar dúvidas e reclamações sobre planos de saúde, incluindo os passos prévios com a operadora.",
    href: "https://www.gov.br/ans/pt-br/canais_atendimento/canais-de-atendimento-ao-consumidor-1",
  },
  {
    title: "Portal do Governo do Estado do Amapá",
    organization: "Governo do Estado do Amapá",
    description:
      "Portal institucional para confirmar orientações e procedimentos estaduais atualizados.",
    href: "https://www.amapa.gov.br/",
  },
  {
    title: "Assembleia Legislativa do Estado do Amapá",
    organization: "Assembleia Legislativa do Estado do Amapá",
    description:
      "Portal institucional para consulta de informações e legislação estadual do Amapá.",
    href: "https://al.ap.leg.br/",
  },
];

export function ReferencesPage({ onBack }: ReferencesPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 pb-24 sm:px-6">
      <button
        type="button"
        onClick={onBack}
        className="mb-8 min-h-12 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
      >
        Voltar
      </button>

      <article className="reading-surface space-y-8 rounded-2xl p-6 text-slate-800 shadow-sm sm:p-8">
        <header>
          <h1 className="text-2xl font-semibold text-slate-900">Fontes e referências</h1>
          <p className="mt-3 text-base leading-relaxed">
            Reunimos fontes públicas e oficiais que apoiam as informações de saúde, direitos,
            atendimento pelo SUS e serviços do Amapá apresentados neste guia.
          </p>
        </header>

        <ul className="space-y-5">
          {SOURCES.map((source) => (
            <li
              key={source.href}
              className="rounded-xl border border-slate-200 bg-white/70 p-4 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-700">{source.organization}</p>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block min-h-12 text-lg font-bold text-sky-800 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                {source.title}
              </a>
              <p className="text-base leading-relaxed text-slate-700">{source.description}</p>
            </li>
          ))}
        </ul>

        <p className="text-sm leading-relaxed text-slate-600">
          As leis e normas podem ser atualizadas, e a aplicação de um direito depende da situação
          concreta. Consulte o texto oficial e confirme procedimentos, horários e disponibilidade
          com o órgão responsável. Conteúdo informativo, não substitui orientação profissional ou
          jurídica.
        </p>
      </article>
    </div>
  );
}
