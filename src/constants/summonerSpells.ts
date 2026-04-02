export const SUMMONER_SPELL_ICONS: Record<number, string> = {
  1: "SummonerBoost",
  3: "SummonerExhaust",
  4: "SummonerFlash",
  6: "SummonerHaste",
  7: "SummonerHeal",
  11: "SummonerSmite",
  12: "SummonerTeleport",
  13: "SummonerMana",
  14: "SummonerDot",
  21: "SummonerBarrier",
  32: "SummonerSnowball",
};

export function getSummonerSpellIconUrl(spellId: number) {
  const spellName = SUMMONER_SPELL_ICONS[spellId];
  if (!spellName) return "";

  return `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/${spellName}.png`;
}