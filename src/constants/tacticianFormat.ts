export function formatTftMatchDate(timestamp?: number | null) {
  if (!timestamp) return "-";

  return new Date(timestamp).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatGameLength(seconds?: number | null) {
  if (!seconds || seconds <= 0) return "-";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function getPlacementLabel(placement?: number | null) {
  if (!placement) return "-";
  return `${placement}${placement === 1 ? "st" : placement === 2 ? "nd" : placement === 3 ? "rd" : "th"}`;
}

export function getPlacementClasses(placement?: number | null) {
  if (placement === 1) {
    return "border-amber-300/40 bg-amber-400/15 text-amber-200";
  }

  if (placement && placement <= 4) {
    return "border-emerald-300/30 bg-emerald-400/10 text-emerald-200";
  }

  return "border-rose-300/25 bg-rose-400/10 text-rose-200";
}

export function getTraitStyleClasses(style?: number | null) {
  if (style === 4) return "border-amber-300/35 bg-amber-400/10 text-amber-100";
  if (style === 3) return "border-fuchsia-300/35 bg-fuchsia-400/10 text-fuchsia-100";
  if (style === 2) return "border-cyan-300/35 bg-cyan-400/10 text-cyan-100";
  return "border-white/10 bg-white/[0.05] text-white/75";
}