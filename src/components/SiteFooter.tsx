type SiteFooterProps = {
  onContact: () => void;
  onReferences: () => void;
};

export function SiteFooter({ onContact, onReferences }: SiteFooterProps) {
  return (
    <footer className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 flex items-end justify-end gap-4 px-4 py-2">
      <div className="reading-surface pointer-events-auto flex items-center gap-2 rounded-full px-2 py-1 shadow-sm">
        <button
          type="button"
          onClick={onContact}
          className="pointer-events-auto min-h-12 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52]"
        >
          Fale conosco
        </button>
        <button
          type="button"
          onClick={onReferences}
          className="pointer-events-auto min-h-12 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3b52]"
        >
          Fontes
        </button>
        <span className="pointer-events-none text-xs leading-none text-stone-500">v1.1.0</span>
      </div>
    </footer>
  );
}
