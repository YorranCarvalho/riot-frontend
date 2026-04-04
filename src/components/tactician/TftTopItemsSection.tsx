
import type { TftTopItem } from "../../types/tft";
import type { TftAssets } from "../../utils/tft/tftAssets";
import { prettifyTftId } from "../../utils/tft/tftFormatters";

interface Props {
  items: TftTopItem[];
  assets: TftAssets;
}

export const TftTopItemsSection = ({ items, assets }: Props) => {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
        Top 3 Items
      </p>

      <div className="mt-5 space-y-3">
        {items.length === 0 ? (
          <p className="text-white/60">Sem itens suficientes nessa fila.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.itemId}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b1628]/90 p-4"
            >
              <div className="flex items-center gap-3">
                {assets.items?.[item.itemId] ? (
                  <img
                    src={assets.items[item.itemId]}
                    alt={item.itemId}
                    className="h-12 w-12 rounded-xl border border-white/10 object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-xl border border-white/10 bg-white/[0.03]" />
                )}

                <div>
                  <p className="font-medium text-white">
                    {prettifyTftId(item.itemId)}
                  </p>
                  <p className="text-sm text-white/50">{item.games} games</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-emerald-300">{item.top4Rate}% top 4</p>
                <p className="text-sm text-white/55">
                  Avg {item.avgPlacement}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};