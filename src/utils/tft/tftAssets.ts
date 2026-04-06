import type { TftChampionEntry } from "../../types/tactican";

export type TftTraitMeta = {
  id: string;
  name: string;
  icon?: string;
  tooltip?: string;
  conditionalTraitSets?: {
    minUnits?: number;
    maxUnits?: number;
    styleId?: number;
    styleName?: string;
  }[];
};

export type TftChampionSpellMeta = {
  championId: string;
  abilityName?: string;
  abilityDescription?: string;
  abilityIcon?: string;
  mana?: number | null;
  maxMana?: number | null;
};

export interface TftAssets {
  champions: Record<string, string>;
  items: Record<string, string>;
  traits: Record<string, string>;
  traitMeta: Record<string, TftTraitMeta>;
  championMeta: Record<string, TftChampionEntry>;
  championSpellMeta: Record<string, TftChampionSpellMeta>;
  loading: boolean;
}