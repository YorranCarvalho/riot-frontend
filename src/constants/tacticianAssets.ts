export function normalizeTftUnitKey(characterId: string) {
  return characterId.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function normalizeTftItemKey(itemName: string) {
  return itemName.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function normalizeTftTraitKey(traitName: string) {
  return traitName.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function prettyUnitName(characterId: string) {
  return characterId
    .replace(/^TFT\d+_/, "")
    .replace(/^tft\d+_/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^drmundo$/i, "Dr. Mundo")
    .replace(/^jarvaniv$/i, "Jarvan IV")
    .trim();
}

export function prettyTraitName(traitName: string) {
  return traitName
    .replace(/^TFT\d+_/, "")
    .replace(/^tft\d+_/, "")
    .replace(/Unique$/, "")
    .replace(/^Teamup_/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}