import { useEffect, useState } from "react";
import type { TftAssets } from "../utils/tft/tftAssets";

type TftChampionEntry = {
  name?: string;
  character_record?: {
    character_id?: string;
    display_name?: string;
    squareIconPath?: string;
  };
};

type TftItemEntry = {
  name?: string;
  nameId?: string;
  squareIconPath?: string;
};

type TftTraitSetEntry = {
  min_units?: number;
  max_units?: number;
  style_id?: number;
  style_name?: string;
};

type TftTraitEntry = {
  display_name?: string;
  trait_id?: string;
  icon_path?: string;
  tooltip_text?: string;
  conditional_trait_sets?: TftTraitSetEntry[];
};

type AssetsState = TftAssets;

function buildChampionIconUrl(characterId?: string | null) {
  if (!characterId) return "";

  const normalized = characterId.toLowerCase();
  return `https://raw.communitydragon.org/pbe/game/assets/characters/${normalized}/hud/${normalized}_square.tft_set16.png`;
}

function buildItemIconUrl(path?: string | null) {
  if (!path) return "";

  return `https://raw.communitydragon.org/pbe/game${path
    .replace(/^\/lol-game-data\/assets/i, "")
    .toLowerCase()}`;
}

function buildTraitIconUrl(path?: string | null) {
  if (!path) return "";

  return `https://raw.communitydragon.org/pbe/game${path
    .replace(/^\/lol-game-data\/assets/i, "")
    .toLowerCase()}`;
}

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function addAlias(
  map: Record<string, string>,
  key: string | undefined,
  icon: string
) {
  if (!key) return;

  const original = key;
  const lower = key.toLowerCase();
  const normalized = normalizeKey(key);

  map[original] = icon;
  map[lower] = icon;
  map[normalized] = icon;

  map[original.replace(/^TFT\d+_/, "")] = icon;
  map[lower.replace(/^tft\d+_/, "")] = icon;
  map[normalized.replace(/^tft\d+/, "")] = icon;

  map[original.replace(/^TFT_Item_/, "")] = icon;
  map[lower.replace(/^tft_item_/, "")] = icon;
  map[normalized.replace(/^tftitem/, "")] = icon;
}

function addTraitMetaAlias<T>(
  map: Record<string, T>,
  key: string | undefined,
  value: T
) {
  if (!key) return;

  const original = key;
  const lower = key.toLowerCase();
  const normalized = normalizeKey(key);

  map[original] = value;
  map[lower] = value;
  map[normalized] = value;

  map[original.replace(/^TFT\d+_/, "")] = value;
  map[lower.replace(/^tft\d+_/, "")] = value;
  map[normalized.replace(/^tft\d+/, "")] = value;
}

function stripHtml(text?: string | null) {
  if (!text) return "";

  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .trim();
}

export function useTftAssets() {
  const [state, setState] = useState<AssetsState>({
    champions: {},
    items: {},
    traits: {},
    traitMeta: {},
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadAssets() {
      try {
        const [championsRes, itemsRes, traitsRes] = await Promise.all([
          fetch(
            "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/tftchampions.json"
          ),
          fetch(
            "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/tftitems.json"
          ),
          fetch(
            "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/tfttraits.json"
          ),
        ]);

        const championsJson: TftChampionEntry[] = await championsRes.json();
        const itemsJson: TftItemEntry[] = await itemsRes.json();
        const traitsJson: TftTraitEntry[] = await traitsRes.json();

        const champions: Record<string, string> = {};
        const items: Record<string, string> = {};
        const traits: Record<string, string> = {};
        const traitMeta: AssetsState["traitMeta"] = {};

        for (const champion of championsJson) {
          const characterId = champion.character_record?.character_id;
          const displayName = champion.character_record?.display_name;
          const icon = buildChampionIconUrl(characterId);

          if (!characterId || !icon) continue;

          addAlias(champions, characterId, icon);
          addAlias(champions, champion.name, icon);
          addAlias(champions, displayName, icon);
        }

        for (const item of itemsJson) {
          const icon = buildItemIconUrl(item.squareIconPath);

          if (!icon) continue;

          addAlias(items, item.nameId, icon);
          addAlias(items, item.name, icon);
        }

        for (const trait of traitsJson) {
          const icon = buildTraitIconUrl(trait.icon_path);

          if (icon) {
            addAlias(traits, trait.trait_id, icon);
            addAlias(traits, trait.display_name, icon);
          }

          const metaValue = {
            id: trait.trait_id ?? "",
            name: trait.display_name ?? trait.trait_id ?? "Unknown Trait",
            icon,
            tooltip: stripHtml(trait.tooltip_text),
            conditionalTraitSets: (trait.conditional_trait_sets ?? []).map(
              (entry) => ({
                minUnits: entry.min_units,
                maxUnits: entry.max_units,
                styleId: entry.style_id,
                styleName: entry.style_name,
              })
            ),
          };

          addTraitMetaAlias(traitMeta, trait.trait_id, metaValue);
          addTraitMetaAlias(traitMeta, trait.display_name, metaValue);
        }

        if (!cancelled) {
          setState({
            champions,
            items,
            traits,
            traitMeta,
            loading: false,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar assets TFT", error);

        if (!cancelled) {
          setState({
            champions: {},
            items: {},
            traits: {},
            traitMeta: {},
            loading: false,
          });
        }
      }
    }

    loadAssets();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}