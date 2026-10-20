import { AmapaDireitosSection } from "../amapa/AmapaDireitosSection";
import { CarteiraTeaAmapaSection } from "../amapa/CarteiraTeaAmapaSection";
import { ContentSection } from "../ui/ContentSection";
import { PhaseCard } from "../ui/PhaseCard";

type Props = {
  getChecklist: (id: string) => boolean[];
  setChecklistItem: (id: string, index: number, checked: boolean) => void;
};

export function TrackLovedOneResponsaveisExtra({ getChecklist, setChecklistItem }: Props) {
  return (
    <ContentSection
      id="loved-responsaveis"
      index={7}
      title="Orientações para responsáveis"
      labelTone="teal"
    >
      <p className="max-w-prose text-sm leading-relaxed text-slate-600">
        Conteúdo extra porque você indicou ser responsável pelo cuidado.
      </p>

      <div className="space-y-8 pt-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">1. Profissionais para buscar</h3>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-700">
            Estes passos são os mesmos sugeridos na trilha da pessoa diagnosticada — aqui adaptados
            para o cuidado do seu dependente.
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-700 md:text-base">
            <li>
              <strong className="text-slate-900">Primeiro:</strong> neuropsicólogo ou psiquiatra com
              experiência em TEA em crianças ou adultos (conforme a idade do seu dependente). Antes
              de marcar, pergunte se há familiaridade com diagnóstico tardio quando for o caso.
            </li>
            <li>
              <strong className="text-slate-900">Segundo (recomendado):</strong> psicólogo com ACT ou
              DBT pode ajudar a família e a pessoa a lidar com emoções intensas e rotina.
            </li>
            <li>
              <strong className="text-slate-900">Terceiro (se fizer sentido):</strong> terapeuta
              ocupacional para mapeamento sensorial e ajustes no dia a dia do seu dependente.
            </li>
            <li>
              <strong className="text-slate-900">Comunidades:</strong> o pertencimento ajuda a
              regular ansiedade — busque grupos focados em neurodivergência e respeito à pessoa
              autista, sempre com moderação e segurança emocional.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">2. Direitos do dependente</h3>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-700">
            Conhecer os direitos da pessoa sob seus cuidados é parte essencial do apoio.
          </p>
          <div className="mt-4">
            <AmapaDireitosSection
              title="Direitos no Amapá (pessoa sob seus cuidados)"
              intro="Resumo para orientar buscas por apoio formal — confirme sempre com profissionais e órgãos oficiais."
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">3. Emissão da Carteira TEA</h3>
          <PhaseCard title="Cadastro em nome do dependente" tone="mint">
            <p className="max-w-prose text-sm leading-relaxed text-slate-800">
              O responsável legal pode realizar o cadastro em nome do dependente, seguindo a mesma
              documentação e fluxo abaixo.
            </p>
          </PhaseCard>
          <div className="mt-4">
            <CarteiraTeaAmapaSection
              getChecklist={getChecklist}
              setChecklistItem={setChecklistItem}
              checklistId="b-amapa-docs"
            />
          </div>
        </div>
      </div>
    </ContentSection>
  );
}
