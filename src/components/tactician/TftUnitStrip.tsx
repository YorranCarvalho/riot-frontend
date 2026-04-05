import { prettyUnitName } from "../../constants/tacticianAssets";
import type { TacticianMatchUnit } from "../../types/tactican";
import type { TftAssets } from "../../utils/tft/tftAssets";
import { prettifyTftId } from "../../utils/tft/tftFormatters";

interface Props {
  units: TacticianMatchUnit[];
  assets: TftAssets;
  size?: "sm" | "md";
  limit?: number;
  showItems?: boolean;
}

export function TftUnitStrip({
  units,
  assets,
  size = "md",
  limit = 10,
  showItems = true,
}: Props) {
  const visibleUnits = units.slice(0, limit);

  const imageSize = size === "sm" ? "h-10 w-10" : "h-14 w-14";
  const starSize = size === "sm" ? "text-[10px]" : "text-xs";
  const itemImageSize = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";
  const unitWidth = size === "sm" ? "w-[48px]" : "w-[64px]";
  const itemGap = size === "sm" ? "gap-[2px]" : "gap-[3px]";
  const itemMarginTop = size === "sm" ? "mt-[3px]" : "mt-1";

  return (
    <div className="flex flex-wrap gap-2">
      {visibleUnits.map((unit, index) => {
        const championIcon = assets.champions?.[unit.characterId];
        const unitName = prettyUnitName(unit.characterId);
        const items = unit.itemNames?.slice(0, 3) ?? [];

        return (
          <div
            key={`${unit.characterId}-${index}`}
            className={`group flex ${unitWidth} flex-col items-center`}
            title={unitName}
          >
            {unit.tier ? (
              <div className={`mb-1 text-center leading-none text-amber-300 ${starSize}`}>
                {"★".repeat(Math.max(0, unit.tier))}
              </div>
            ) : (
              <div className="mb-1 h-[12px]" />
            )}

            <div className="rounded-xl border border-white/10 bg-[#0a1324] p-1 shadow-md">
              {championIcon ? (
                <img
                  src={championIcon}
                  alt={unitName}
                  className={`${imageSize} rounded-lg object-cover`}
                />
              ) : (
                <div
                  className={`${imageSize} flex items-center justify-center rounded-lg bg-white/[0.04] text-[10px] text-white/60`}
                >
                  ?
                </div>
              )}
            </div>

            {showItems ? (
              <div className={`${itemMarginTop} flex min-h-[18px] flex-wrap justify-center ${itemGap}`}>
                {items.map((itemId, itemIndex) => {
                  const itemIcon = assets.items?.[itemId];

                  return itemIcon ? (
                    <img
                      key={`${itemId}-${itemIndex}`}
                      src={itemIcon}
                      alt={prettifyTftId(itemId)}
                      title={prettifyTftId(itemId)}
                      className={`${itemImageSize} rounded-[4px] border border-white/10 bg-[#12233d] object-cover shadow-sm`}
                    />
                  ) : (
                    <div
                      key={`${itemId}-${itemIndex}`}
                      title={prettifyTftId(itemId)}
                      className={`${itemImageSize} rounded-[4px] border border-white/10 bg-white/[0.06]`}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}