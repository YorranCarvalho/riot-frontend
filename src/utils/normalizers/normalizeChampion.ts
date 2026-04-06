import type {
  NormalizedTftChampion,
  TftChampionEntry,
} from "../../types/tactican";
import { toCDragonAssetUrl } from "../tft/toCDragonAssetUrl";

function stripChampionDescription(text?: string | null) {
  if (!text) return "";

  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/@/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

type NormalizeChampionOptions = {
  iconOverride?: string;
  costOverride?: number;
  abilityIconOverride?: string;
  abilityNameOverride?: string;
  abilityDescriptionOverride?: string;
  manaStartOverride?: number;
  manaMaxOverride?: number;
};

export function normalizeChampion(
  champion: TftChampionEntry | null | undefined,
  options?: NormalizeChampionOptions
): NormalizedTftChampion | null {
  if (!champion) return null;

  const record = champion.character_record;
  const ability = champion.ability;

  const id =
    record?.character_id ??
    champion.name ??
    "unknown-champion";

  const name =
    record?.display_name?.trim() ||
    champion.name?.trim() ||
    "Unknown";

  const icon =
    options?.iconOverride ||
    record?.squareIconPath?.trim() ||
    "";

  const cost =
    options?.costOverride ??
    champion.cost ??
    0;

  const traits = (
    champion.traits?.map((trait) => trait.name).filter(Boolean) as string[] |
    undefined
  ) ??
    (
      record?.traits?.map((trait) => trait.name).filter(Boolean) as string[] |
      undefined
    ) ??
    [];

  const abilityName =
    options?.abilityNameOverride ||
    ability?.name?.trim() ||
    "Ability";

  const abilityDescription =
    options?.abilityDescriptionOverride ||
    stripChampionDescription(ability?.desc);

  const abilityIcon =
    options?.abilityIconOverride ||
    toCDragonAssetUrl(ability?.iconPath);

  const manaStart =
    options?.manaStartOverride ??
    ability?.mana ??
    0;

  const manaMax =
    options?.manaMaxOverride ??
    ability?.maxMana ??
    0;

  return {
    id,
    name,
    icon,
    cost,
    traits,
    abilityName,
    abilityDescription,
    abilityIcon,
    manaStart,
    manaMax,
  };
}