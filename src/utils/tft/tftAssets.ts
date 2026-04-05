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

export interface TftAssets {
  champions: Record<string, string>;
  items: Record<string, string>;
  traits: Record<string, string>;
  traitMeta: Record<string, TftTraitMeta>;
  loading: boolean;
}