type SiteFooterProps = {
  onContact: () => void;
};

export function SiteFooter({ onContact }: SiteFooterProps) {
  return (
    <footer className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 flex items-end justify-end gap-4 px-4 py-2">
      <button
        type="button"
        onClick={onContact}
        className="pointer-events-auto text-[11px] font-medium text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
      >
        Fale conosco
      </button>
      <span className="pointer-events-none text-[10px] leading-none text-slate-300">v0.1.0-beta</span>
    </footer>
  );
}
