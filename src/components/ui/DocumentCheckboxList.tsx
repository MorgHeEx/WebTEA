type DocumentCheckboxListProps = {
  title: string;
  items: string[];
  offset: number;
  checked: boolean[];
  onToggle: (globalIndex: number, value: boolean) => void;
};

/**
 * Checklist simples (documentos) com persistência externa — índices globais no array checked.
 */
export function DocumentCheckboxList({
  title,
  items,
  offset,
  checked,
  onToggle,
}: DocumentCheckboxListProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <ul className="space-y-2">
        {items.map((label, i) => {
          const gi = offset + i;
          const isOn = Boolean(checked[gi]);
          return (
            <li key={gi} className="list-none">
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200/90 bg-white/90 px-3 py-2.5 hover:bg-slate-50/90">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  checked={isOn}
                  onChange={(e) => onToggle(gi, e.target.checked)}
                />
                <span className="text-sm leading-snug text-slate-800">{label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
