export type QueueDisplayType =
  | "Solo/Duo"
  | "Flex"
  | "ARAM"
  | "Normal"
  | "Other";

export function getQueueLabel(queueId: number): QueueDisplayType {
  switch (queueId) {
    case 420:
      return "Solo/Duo";
    case 440:
      return "Flex";
    case 450:
      return "ARAM";
    case 400:
    case 430:
    case 490:
      return "Normal";
    default:
      return "Other";
  }
}

export function getQueueBadgeClasses(queueId: number) {
  const label = getQueueLabel(queueId);

  switch (label) {
    case "Solo/Duo":
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-400/20";
    case "Flex":
      return "bg-sky-500/15 text-sky-300 border border-sky-400/20";
    case "ARAM":
      return "bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-400/20";
    case "Normal":
      return "bg-white/10 text-white/75 border border-white/10";
    default:
      return "bg-amber-500/15 text-amber-300 border border-amber-400/20";
  }
}