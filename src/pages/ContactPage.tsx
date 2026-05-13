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
          <h2 className="text-xl font-semibold text-slate-900">Entre em contato</h2>
          <p className="mt-2 text-sm text-slate-600">Dúvidas, sugestões ou solicitações de remoção de conteúdo.</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="text-sky-800 underline underline-offset-2" href="mailto:jamilly@email.com">
                jamilly@email.com
              </a>
            </li>
            <li>
              <a className="text-sky-800 underline underline-offset-2" href="mailto:lua@email.com">
                lua@email.com
              </a>
            </li>
            <li>
              <a className="text-sky-800 underline underline-offset-2" href="mailto:miguel@email.com">
                miguel@email.com
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Solicitar remoção de comentário</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Se você publicou um comentário no Mural de Conselhos ou na seção de Vivências e deseja
            removê-lo, entre em contato pelo e-mail acima informando o conteúdo da mensagem e a data
            aproximada da publicação.
          </p>
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            <p>
              <span aria-hidden>⚠️</span> Esta funcionalidade está em desenvolvimento. Em breve será
              possível solicitar remoções diretamente pelo site.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
