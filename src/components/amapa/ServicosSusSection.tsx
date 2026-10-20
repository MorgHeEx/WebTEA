const SERVICES = [
  "Avaliação multiprofissional para diagnóstico de TEA",
  "Terapia ocupacional",
  "Fonoaudiologia",
  "Psicologia",
  "Consultas com neuropediatra e psiquiatra",
  "Exames para diagnóstico (BERA, eletroencefalograma, tomografia)",
  "Grupo terapêutico para pais e responsáveis (CER Macapá)",
  "Emissão de laudo médico com CID-10 (necessário para a Carteira TEA)",
];

export function ServicosSusSection() {
  return (
    <div className="space-y-4">
      <p className="max-w-prose">
        Estes serviços fazem parte da rede pública e não devem gerar cobrança na porta de entrada
        do SUS.
      </p>
      <ul className="list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-700">
        {SERVICES.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="max-w-prose text-sm leading-relaxed text-slate-600">
        O acesso pode exigir encaminhamento pela UBS (Unidade Básica de Saúde) mais próxima da sua
        residência. Leve o cartão SUS.
      </p>
    </div>
  );
}
