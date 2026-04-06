function extractSetNumber(characterId: string) {
  const match = characterId.toLowerCase().match(/^tft(\d+)_/);
  return match?.[1] ?? null;
}

export function buildChampionSplashCandidates(characterId?: string | null): string[] {
  if (!characterId) return [];

  const id = characterId.toLowerCase();
  const setNumber = extractSetNumber(id);
  const setSuffix = setNumber ? `.tft_set${setNumber}.png` : ".png";

  return [
    // caminhos TFT reais mais promissores
    `https://raw.communitydragon.org/latest/game/assets/characters/${id}/skins/base/images/${id}_splash_tile_0${setSuffix}`,
    `https://raw.communitydragon.org/latest/game/assets/characters/${id}/skins/base/images/${id}_splash_centered_0${setSuffix}`,
    `https://raw.communitydragon.org/latest/game/assets/characters/${id}/skins/base/images/${id}_splash_uncentered_0${setSuffix}`,

    `https://raw.communitydragon.org/latest/game/assets/characters/${id}/skins/skin0/images/${id}_splash_tile_0${setSuffix}`,
    `https://raw.communitydragon.org/latest/game/assets/characters/${id}/skins/skin0/images/${id}_splash_centered_0${setSuffix}`,
    `https://raw.communitydragon.org/latest/game/assets/characters/${id}/skins/skin0/images/${id}_splash_uncentered_0${setSuffix}`,

    // fallback plugins
    `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${id}/skins/base/images/${id}_splash_tile_0${setSuffix}`,
    `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${id}/skins/base/images/${id}_splash_centered_0${setSuffix}`,
    `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${id}/skins/base/images/${id}_splash_uncentered_0${setSuffix}`,

    `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${id}/skins/skin0/images/${id}_splash_tile_0${setSuffix}`,
    `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${id}/skins/skin0/images/${id}_splash_centered_0${setSuffix}`,
    `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${id}/skins/skin0/images/${id}_splash_uncentered_0${setSuffix}`,
  ];
}