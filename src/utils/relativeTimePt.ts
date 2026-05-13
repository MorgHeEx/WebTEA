export function formatRelativeTimePt(isoOrMs: number | string): string {
  const t = typeof isoOrMs === "string" ? new Date(isoOrMs).getTime() : isoOrMs;
  const diff = Date.now() - t;
  if (!Number.isFinite(diff) || diff < 0) return "agora há pouco";

  const sec = Math.floor(diff / 1000);
  if (sec < 45) return "agora há pouco";

  const min = Math.floor(sec / 60);
  if (min < 60) return min === 1 ? "há 1 minuto" : `há ${min} minutos`;

  const h = Math.floor(min / 60);
  if (h < 24) return h === 1 ? "há 1 hora" : `há ${h} horas`;

  const d = Math.floor(h / 24);
  if (d < 7) return d === 1 ? "há 1 dia" : `há ${d} dias`;

  const w = Math.floor(d / 7);
  if (w < 5) return w === 1 ? "há 1 semana" : `há ${w} semanas`;

  const mo = Math.floor(d / 30);
  if (mo < 12) return mo <= 1 ? "há cerca de 1 mês" : `há ${mo} meses`;

  const y = Math.floor(d / 365);
  return y <= 1 ? "há cerca de 1 ano" : `há ${y} anos`;
}
