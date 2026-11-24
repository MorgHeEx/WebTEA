import { PhaseCard } from "../ui/PhaseCard";

function RightCard({ title, law }: { title: string; law: string }) {
  return (
    <li className="rounded-xl border border-slate-200/90 bg-gradient-to-br from-white to-sky-50/40 px-4 py-3 shadow-sm">
      <p className="font-medium text-slate-900">{title}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-sky-800/90">{law}</p>
      <details className="mt-3 border-t border-slate-200 pt-2">
        <summary className="min-h-12 cursor-pointer py-3 text-sm font-semibold text-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
          O que essa lei garante na prática
        </summary>
        <p className="pb-2 text-sm leading-relaxed text-slate-700">
          {law === "Lei Federal 12.764/2012"
            ? "A Lei Berenice Piana reconhece a pessoa autista como pessoa com deficiência para efeitos legais e institui direitos a cuidado integral. Na escola regular, prevê acompanhante especializado quando houver necessidade comprovada."
            : law === "Lei Federal Romeo Mion 13.977/2020"
              ? "A Lei Romeo Mion criou a Carteira de Identificação da Pessoa com Transtorno do Espectro Autista (Ciptea), que ajuda a identificar a pessoa e facilitar a prioridade de atendimento."
              : `Esta norma serve de referência para solicitar ${title.toLowerCase()}. A aplicação pode depender de critérios, documentos e procedimentos do órgão responsável. Confirme como pedir antes de tomar decisões.`}
        </p>
      </details>
    </li>
  );
}

function RightCardEmerald({ title, law }: { title: string; law: string }) {
  return (
    <li className="rounded-xl border border-emerald-200/80 bg-gradient-to-br from-white to-emerald-50/35 px-4 py-3 shadow-sm">
      <p className="font-medium text-slate-900">{title}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-teal-800/90">{law}</p>
      <details className="mt-3 border-t border-emerald-200 pt-2">
        <summary className="min-h-12 cursor-pointer py-3 text-sm font-semibold text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">
          O que essa lei garante na prática
        </summary>
        <p className="pb-2 text-sm leading-relaxed text-slate-700">
          Esta norma estadual serve de referência para solicitar {title.toLowerCase()} no Amapá.
          A aplicação pode depender de critérios, documentos e procedimentos do órgão responsável.
          Confirme como pedir antes de tomar decisões.
        </p>
      </details>
    </li>
  );
}

const FEDERAL: { title: string; law: string }[] = [
  { title: "Atendimento preferencial em qualquer fila", law: "Lei Federal 14.626/2023" },
  { title: "Direito a estudar em escola pública ou privada", law: "Lei Federal 13.146/2015" },
  { title: "Professor auxiliar garantido", law: "Lei Federal 12.764/2012" },
  { title: "Carteira de Identificação da Pessoa com TEA (Ciptea)", law: "Lei Federal Romeo Mion 13.977/2020" },
  { title: "Cobertura de terapias segundo regras do plano e da ANS", law: "Lei Federal 9.656/1998 e Resolução ANS 539/2022" },
  { title: "Terapias ilimitadas pelo plano de saúde", law: "Resolução ANS 539/2022" },
  { title: "Acesso ao BPC/LOAS no INSS", law: "Lei 8.742/1993" },
  { title: "Isenção ou redução na conta de energia elétrica", law: "Resolução ANEEL 1.000/2021" },
  { title: "Isenção de IPI na compra de veículo", law: "Lei Federal 8.989/1995" },
  { title: "Desconto de 80% em passagem aérea para acompanhante", law: "Resolução ANAC 280/2013" },
];

const ESTADUAL: { title: string; law: string }[] = [
  { title: "Isenção de IPVA", law: "Decreto Estadual 1.641/2015" },
  { title: "Meia entrada em eventos, cinema e shows", law: "Lei Estadual 2.109/2016" },
  { title: "Sessões de cinema adaptadas ao menos uma vez por mês", law: "Lei Estadual 2.479/2020" },
  {
    title: "Redução de carga horária para servidor público que seja tutor de autista",
    law: "Lei Estadual 1.967/2015",
  },
  {
    title:
      "Proteção legal como pessoa com condição oculta. Cordão Girassol disponível no Super Fácil",
    law: "Lei Estadual 3.240/2025",
  },
];

type AmapaDireitosSectionProps = {
  title?: string;
  intro?: string;
};

export function AmapaDireitosSection({
  title,
  intro = "Um mapa enxuto do que costuma existir por lei. Confirme os detalhes com profissionais e órgãos oficiais.",
}: AmapaDireitosSectionProps) {
  return (
    <div className="space-y-8">
      <div>
        {title ? <h3 className="text-lg font-semibold text-slate-900">{title}</h3> : null}
        <p className={`max-w-prose text-sm leading-relaxed text-slate-600 ${title ? "mt-2" : ""}`}>
          {intro}
        </p>

        <p className="mt-4 text-sm font-semibold text-slate-800">Direitos federais aplicáveis</p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {FEDERAL.map((r) => (
            <RightCard key={r.law} title={r.title} law={r.law} />
          ))}
        </ul>

        <p className="mt-6 text-sm font-semibold text-slate-800">Direitos estaduais (Amapá)</p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {ESTADUAL.map((r) => (
            <RightCardEmerald key={r.law} title={r.title} law={r.law} />
          ))}
        </ul>
      </div>

      <PhaseCard title="Apoio e denúncia" tone="sky">
        <p className="max-w-prose text-sm leading-relaxed text-slate-700">
          <strong className="text-slate-900">AMA-AP:</strong> Associação de Pais e Amigos Autistas
          do Amapá.
        </p>
        <p className="max-w-prose text-sm leading-relaxed text-slate-700">
          Instagram{" "}
          <a
            href="https://www.instagram.com/amaaptea/"
            className="font-medium text-sky-800 underline decoration-sky-300 underline-offset-2 hover:text-sky-950"
            target="_blank"
            rel="noopener noreferrer"
          >
            @amaaptea
          </a>
          <br />
          Av. Jose Maria Gonçalves Leão, 398, Fazendinha, Macapá.
        </p>
        <p className="max-w-prose text-sm leading-relaxed text-slate-700">
          <strong className="text-slate-900">Ministério Público do Amapá</strong> em caso de
          violação de direitos:{" "}
          <a
            href="https://www.mpap.mp.br"
            className="font-medium text-sky-800 underline decoration-sky-300 underline-offset-2 hover:text-sky-950"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.mpap.mp.br
          </a>{" "}
          · <span className="whitespace-nowrap">(96) 3198-1900</span>
        </p>
      </PhaseCard>
    </div>
  );
}
