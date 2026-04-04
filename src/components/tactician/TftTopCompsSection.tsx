
import type { TftTopComp } from "../../types/tft";
import type { TftAssets } from "../../utils/tft/tftAssets";
import { prettifyTftId } from "../../utils/tft/tftFormatters";

interface Props {
  comps: TftTopComp[];
  assets: TftAssets;
}

export const TftTopCompsSection = ({ comps, assets }: Props) => {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
        Top 3 Comps
      </p>

      <div className="mt-5 space-y-4">
        {comps.length === 0 ? (
          <p className="text-white/60">Sem comps suficientes nessa fila.</p>
        ) : (
          comps.map((comp) => (
            <div
              key={comp.key}
              className="rounded-2xl border border-white/10 bg-[#0b1628]/90 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    {comp.traitIds.map((traitId) => (
                      <div
                        key={traitId}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5"
                      >
                        {assets.traits?.[traitId] ? (
                          <img
                            src={assets.traits[traitId]}
                            alt={traitId}
                            className="h-5 w-5 rounded object-cover"
                          />
                        ) : null}
                        <span className="text-xs text-white/75">
                          {prettifyTftId(traitId)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {comp.unitIds.slice(0, 8).map((unitId) => (
                      <div key={unitId} title={prettifyTftId(unitId)}>
                        {assets.champions?.[unitId] ? (
                          <img
                            src={assets.champions[unitId]}
                            alt={unitId}
                            className="h-10 w-10 rounded-full border border-cyan-300/20 object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full border border-white/10 bg-white/[0.03]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid min-w-[220px] grid-cols-3 gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/45">
                      Games
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {comp.games}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/45">
                      Top 4
                    </p>
                    <p className="mt-1 text-lg font-semibold text-emerald-300">
                      {comp.top4Rate}%
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/45">
                      Avg Place
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {comp.avgPlacement}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};