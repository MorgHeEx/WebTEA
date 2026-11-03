type ContactPageProps = {
  onBack: () => void;
};

export function ContactPage({ onBack }: ContactPageProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 pb-24 sm:px-6">
      <button
        type="button"
        onClick={onBack}
        className="mb-8 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
      >
        Voltar
      </button>

      <article className="space-y-10 text-slate-800">
        <section>
          <h1 className="text-2xl font-semibold text-slate-900">Sobre este projeto</h1>
          <p className="mt-3 text-base leading-relaxed">
            Este site foi desenvolvido como projeto acadêmico com o objetivo de apoiar pessoas
            recém-diagnosticadas com TEA e seus familiares no estado do Amapá.
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-700">Desenvolvido por:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
            <li>Jamilly Maria</li>
            <li>Luã Otávio</li>
            <li>Miguel Lucas</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Equipe de Desenvolvimento</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <strong>Luã:</strong>{" "}
              <a className="text-sky-800 underline underline-offset-2" href="mailto:luaotaviops@gmail.com">
                luaotaviops@gmail.com
              </a>
            </li>
            <li>
              <strong>Miguel:</strong>{" "}
              <a className="text-sky-800 underline underline-offset-2" href="mailto:miguelsmoraes@hotmail.com">
                miguelsmoraes@hotmail.com
              </a>
            </li>
            <li>
              <strong>Jamilly:</strong>{" "}
              <a className="text-sky-800 underline underline-offset-2" href="mailto:jamilly.jaroca@gmail.com">
                jamilly.jaroca@gmail.com
              </a>
            </li>
          </ul>
        </section>
        
      </article>
    </div>
  );
}
