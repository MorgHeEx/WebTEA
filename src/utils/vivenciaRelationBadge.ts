import type { SupportLevel } from "../lib/trackAProfileStorage";

export function buildVivenciaRelationBadge(
  relationLabel: string,
  level: SupportLevel | null | undefined,
): string {
  const trimmed = relationLabel.trim();
  const base = trimmed || "Familiar";
  if (level === 1 || level === 2) {
    return `${base} de pessoa nível ${level}`;
  }
  return `${base} de pessoa com autismo`;
}
