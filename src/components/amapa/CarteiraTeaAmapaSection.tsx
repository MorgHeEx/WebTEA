import { DocumentCheckboxList } from "../ui/DocumentCheckboxList";
import { PhaseCard } from "../ui/PhaseCard";
import { ProcessStepper } from "../ui/ProcessStepper";

const DOCS_PERSON = [
  "RG (documento de identidade)",
  "CPF",
  "Comprovante de residência atualizado",
  "Laudo médico de profissional especializado com CID-10 correspondente",
  "Comprovante de tipagem sanguínea",
  "1 foto 3x4 atualizada com fundo branco",
];

const DOCS_RESP = ["RG do responsável", "CPF do responsável"];

const STEPS = [
  {
    title: "Compareça a uma unidade Super Fácil com toda a documentação.",
  },
  {
    title:
      'Na recepção, retire uma senha para "Primeira Via da Carteira TEA" e aguarde ser chamado.',
  },
  {
    title:
      "Quando chamado, o atendente coleta seus dados e escaneia os documentos no sistema.",
  },
  {
    title:
      "Após o cadastro ser criado, você será avisado por ligação ou mensagem para retornar à mesma unidade e retirar a carteira.",
  },
];

const OFFICIAL =
  "https://apdigital.portal.ap.gov.br/carta-de-servico/cadastro-da-pessoa-com-transtorno-do-espectro-do-autismo-tea130";

function ExternalLinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden>
      <path
        d="M14 3h7v7M10 14L21 3M21 3v6M21 3h-6M5 21h12a2 2 0 002-2V9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CarteiraTeaAmapaSectionProps = {
  getChecklist: (id: string) => boolean[];
  setChecklistItem: (id: string, index: number, checked: boolean) => void;
  checklistId?: string;
  /** Nota extra abaixo da documentação (ex.: responsável legal). */
  responsavelNote?: string;
};

export function CarteiraTeaAmapaSection({
  getChecklist,
  setChecklistItem,
  checklistId = "amapa-tea-docs",
  responsavelNote,
}: CarteiraTeaAmapaSectionProps) {
  const checked = getChecklist(checklistId);

  return (
    <div className="border-t border-slate-200/80 pt-8">
      <h3 className="text-lg font-semibold text-slate-900">Como emitir sua Carteira TEA no Amapá</h3>
      <p className="mt-1 text-sm font-medium text-teal-800">Gratuito. Feito nas unidades do Super Fácil.</p>
      <p className="mt-2 text-xs text-slate-500">Fluxo conforme portal oficial · última atualização: 14/05/2024</p>

      {responsavelNote ? (
        <p className="mt-3 max-w-prose rounded-lg border border-sky-200/80 bg-sky-50/50 px-3 py-2 text-sm text-slate-800">
          {responsavelNote}
        </p>
      ) : null}

      <div className="mt-6 space-y-6">
        <div>
          <p className="text-sm font-semibold text-slate-900">Documentos necessários</p>
          <p className="mt-1 max-w-prose text-sm text-slate-600">Marque o que já separou — salvamos neste aparelho.</p>
          <div className="mt-4 space-y-5">
            <DocumentCheckboxList
              title="Documentos da pessoa com TEA"
              items={DOCS_PERSON}
              offset={0}
              checked={checked}
              onToggle={(i, v) => setChecklistItem(checklistId, i, v)}
            />
            <DocumentCheckboxList
              title="Documentos do responsável legal (se aplicável)"
              items={DOCS_RESP}
              offset={DOCS_PERSON.length}
              checked={checked}
              onToggle={(i, v) => setChecklistItem(checklistId, i, v)}
            />
          </div>
        </div>

        <PhaseCard title="Importante sobre originais" tone="mint">
          <p className="max-w-prose text-sm leading-relaxed text-slate-800">
            Leve apenas os documentos originais — não é necessário tirar cópia. Tudo é digitalizado
            e enviado pelo sistema CADTEA para validação.
          </p>
        </PhaseCard>

        <div>
          <p className="text-sm font-semibold text-slate-900">Passo a passo do processo</p>
          <div className="mt-3">
            <ProcessStepper steps={STEPS} accent="sky" />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Unidades que emitem a carteira</p>
          <p className="mt-2 text-sm font-medium text-slate-800">Macapá</p>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
            <li>Super Fácil Centro: Rua Cândido Mendes, 448 – Centro</li>
            <li>Super Fácil Zona Sul: Rua Claudomiro de Moraes, s/n – Novo Buritizal</li>
            <li>Super Fácil Zona Norte: Rodovia 156, nº 891 – São Lázaro</li>
            <li>Super Fácil Beirol: Rua Jovino Dinoá, s/nº – Beirol</li>
            <li>Super Fácil Zona Oeste: Rodovia Duca Serra, Km 3, nº 887 – Cabralzinho</li>
          </ul>
          <p className="mt-4 text-sm font-medium text-slate-800">Outros municípios com endereço confirmado</p>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
            <li>
              Super Fácil Santana: Av. Pres. Mal. Humberto de Alencar Castelo Branco, 690 -
              Comercial, Santana - AP
            </li>
          </ul>
          <p className="mt-4 text-sm text-slate-700">
            <strong className="text-slate-900">Consulte a unidade local:</strong> Laranjal do Jari,
            Pedra Branca do Amapari, Porto Grande e demais municípios do interior.
          </p>
          <p className="mt-3 max-w-prose text-sm text-slate-600">
            Horário de funcionamento: <strong className="text-slate-800">8h às 13h</strong> (todas as
            unidades, com possibilidade de variação conforme calendário local).
          </p>
        </div>

        <div>
          <a
            href={OFFICIAL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full max-w-xl items-center justify-center gap-2 rounded-2xl border-2 border-blue-300 bg-blue-100 px-6 py-4 text-base font-semibold text-blue-800 shadow-sm transition-colors hover:bg-blue-200/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
          >
            <ExternalLinkIcon />
            Acessar página oficial do serviço →
          </a>
        </div>
      </div>
    </div>
  );
}
