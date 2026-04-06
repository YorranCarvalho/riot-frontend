import type {
  TacticianMatchUnit,
  TftChampionEntry,
} from "../../types/tactican";
import { normalizeChampion } from "../../utils/normalizers/normalizeChampion";
import type { TftAssets } from "../../utils/tft/tftAssets";
import { TftChampionArtwork } from "./TftChampionArtwork";

interface Props {
  champion: TftChampionEntry;
  unit: TacticianMatchUnit;
  assets: TftAssets;
}

function getCostColor(cost: number): string {
  if (cost === 1) return "bg-gray-200 text-black";
  if (cost === 2) return "bg-green-500 text-white";
  if (cost === 3) return "bg-blue-500 text-white";
  if (cost === 4) return "bg-purple-500 text-white";
  if (cost >= 5) return "bg-yellow-400 text-black";
  return "bg-white text-black";
}

function resolveItemIcon(itemId: string, assets: TftAssets): string | undefined {
  return assets.items[itemId] ?? assets.items[itemId.toLowerCase()];
}

function resolveTraitIcon(trait: string, assets: TftAssets): string | undefined {
  return assets.traits[trait] ?? assets.traits[trait.toLowerCase()];
}

function resolveChampionIcon(
  unit: TacticianMatchUnit,
  assets: TftAssets,
  fallback?: string
): string {
  return (
    assets.champions[unit.characterId] ??
    assets.champions[unit.characterId.toLowerCase()] ??
    fallback ??
    ""
  );
}

function resolveUnitCost(unit: TacticianMatchUnit, champion: TftChampionEntry): number {
  if (typeof champion.cost === "number" && champion.cost > 0) {
    return champion.cost;
  }

  if (typeof unit.rarity === "number") {
    return unit.rarity + 1;
  }

  return 0;
}

export function TftChampionTooltip({
  champion,
  unit,
  assets,
}: Props) {
  const iconOverride = resolveChampionIcon(unit, assets);
  const costOverride = resolveUnitCost(unit, champion);

  const spellMeta =
    assets.championSpellMeta[unit.characterId] ??
    assets.championSpellMeta[unit.characterId.toLowerCase()] ??
    assets.championSpellMeta[champion.character_record?.character_id ?? ""];

  const data = normalizeChampion(champion, {
    iconOverride,
    costOverride,
    abilityIconOverride: spellMeta?.abilityIcon,
    abilityNameOverride: spellMeta?.abilityName,
    abilityDescriptionOverride: spellMeta?.abilityDescription,
    manaStartOverride: spellMeta?.mana ?? undefined,
    manaMaxOverride: spellMeta?.maxMana ?? undefined,
  });

  if (!data) return null;

  const items = unit.itemNames?.slice(0, 3) ?? [];

  return (
    <div className="w-[320px] overflow-hidden rounded-xl border border-white/10 bg-[#1a1f3a]/95 shadow-xl backdrop-blur-md">
      <div className="relative">
        {data.icon ? (
          <div className="relative h-[200px] w-full overflow-hidden bg-[#0f1730]">
            <TftChampionArtwork
              characterId={champion.character_record?.character_id}
              fallbackSrc={
                assets.champions[unit.characterId] ??
                assets.champions[unit.characterId.toLowerCase()]
              }
              alt={data.name}
              className="h-full w-full object-cover object-top"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1f3a]/85 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="flex h-32 w-full items-center justify-center bg-[#0f1730] text-white/40">
            No image
          </div>
        )}

        <div
          className={`absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shadow-md ${getCostColor(
            data.cost
          )}`}
        >
          {data.cost}
        </div>

        <div className="absolute bottom-2 right-2 flex gap-1">
          {items.map((itemId, i) => {
            const icon = resolveItemIcon(itemId, assets);
            if (!icon) return null;

            return (
              <img
                key={`${itemId}-${i}`}
                src={icon}
                alt={itemId}
                className="h-6 w-6 rounded border border-yellow-400/40 object-cover"
              />
            );
          })}
        </div>
      </div>

      <div className="p-3">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-yellow-300">
          {data.traits.map((trait, i) => {
            const icon = resolveTraitIcon(trait, assets);

            return (
              <div key={`${trait}-${i}`} className="flex items-center gap-1">
                {icon ? (
                  <img
                    src={icon}
                    alt={trait}
                    className="h-4 w-4 object-contain"
                  />
                ) : null}
                <span>{trait}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl border border-cyan-400/15 bg-[#0c1530]/70 p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              {data.abilityIcon ? (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                  <img
                    src={data.abilityIcon}
                    alt={data.abilityName}
                    className="h-6 w-6 object-contain"
                  />
                </div>
              ) : null}

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {data.abilityName}
                </p>
              </div>
            </div>

            <p className="shrink-0 text-xs font-semibold text-cyan-300">
              {data.manaStart}/{data.manaMax}
            </p>
          </div>

          <p className="mt-3 whitespace-pre-line text-xs leading-5 text-white/80">
            {data.abilityDescription || "Sem descrição disponível"}
          </p>
        </div>

        <div className="mt-4 border-t border-white/10 pt-2 text-sm font-semibold text-white">
          {data.name}
        </div>
      </div>
    </div>
  );
}