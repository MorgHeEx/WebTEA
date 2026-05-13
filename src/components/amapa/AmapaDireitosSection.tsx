import { PhaseCard } from "../ui/PhaseCard";

function RightCard({ title, law }: { title: string; law: string }) {
  return (
    <li className="rounded-xl border border-slate-200/90 bg-gradient-to-br from-white to-sky-50/40 px-4 py-3 shadow-sm">
      <p className="font-medium text-slate-900">{title}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-sky-800/90">{law}</p>
    </li>
  );
}

function RightCardEmerald({ title, law }: { title: string; law: string }) {
  return (
    <li className="rounded-xl border border-emerald-200/80 bg-gradient-to-br from-white to-emerald-50/35 px-4 py-3 shadow-sm">
      <p className="font-medium text-slate-900">{title}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-teal-800/90">{law}</p>
    </li>
  );
}

const FEDERAL: { title: string; law: string }[] = [
  { title: "Atendimento preferencial em qualquer fila", law: "Lei Federal 14.626/2023" },
  { title: "Direito a estudar em escola pública ou privada", law: "Lei Federal 1.874/2015" },
  { title: "Professor auxiliar garantido", law: "Lei Federal 12.764/2012" },
  { title: "Plano de saúde não pode exigir carência por TEA", law: "Lei Federal 4.788/2020" },
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
      "Proteção legal como pessoa com condição oculta — Cordão Girassol disponível no Super Fácil",
    law: "Lei Estadual 3.240/2025",
  },
];

type AmapaDireitosSectionProps = {
  title?: string;
  intro?: string;
};

export function AmapaDireitosSection({
  title = "Seus direitos no Amapá",
  intro = "Um mapa enxuto do que costuma existir por lei — confirme detalhes com profissionais e órgãos oficiais.",
}: AmapaDireitosSectionProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-600">{intro}</p>

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
          <strong className="text-slate-900">AMA-AP</strong> — Associação de Pais e Amigos Autistas
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
          Av. Jose Maria Gonçalves Leão, 398 – Fazendinha, Macapá.
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
