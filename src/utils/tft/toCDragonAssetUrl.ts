export function toCDragonAssetUrl(path?: string | null): string | undefined {
  if (!path) return undefined;

  const normalized = path
    .replace("/lol-game-data/assets/", "")
    .replace(/^\/+/, "")
    .toLowerCase();

  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${normalized}`;
}