
import type { TftTopChampion } from "../../types/tft";
import type { TftAssets } from "../../utils/tft/tftAssets";
import { prettifyTftId } from "../../utils/tft/tftFormatters";

interface Props {
  champions: TftTopChampion[];
  assets: TftAssets;
}

export const TftTopChampionsSection = ({ champions, assets }: Props) => {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
        Most Played Champions
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {champions.length === 0 ? (
          <p className="text-white/60">Sem campeões suficientes nessa fila.</p>
        ) : (
          champions.map((champion) => (
            <div
              key={champion.championId}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b1628]/90 p-4"
            >
              <div className="flex items-center gap-3">
                {assets.champions?.[champion.championId] ? (
                  <img
                    src={assets.champions[champion.championId]}
                    alt={champion.championId}
                    className="h-12 w-12 rounded-xl border border-white/10 object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-xl border border-white/10 bg-white/[0.03]" />
                )}

                <div>
                  <p className="font-medium text-white">
                    {prettifyTftId(champion.championId)}
                  </p>
                  <p className="text-sm text-white/50">
                    {champion.games} games
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-emerald-300">
                  {champion.top4Rate}%
                </p>
                <p className="text-sm text-white/55">
                  Avg {champion.avgPlacement}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};