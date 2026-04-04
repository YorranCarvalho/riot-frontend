export function prettifyTftId(value?: string | null) {
  if (!value) return "-";

  return value
    .replace(/^TFT\d+_/, "")
    .replace(/^TFT_Item_/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .trim();
}

export function formatSecondsToClock(seconds?: number | null) {
  if (!seconds) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}