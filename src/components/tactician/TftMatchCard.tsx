import {
  normalizeTftItemKey,
  normalizeTftTraitKey,
  normalizeTftUnitKey,
  prettyTraitName,
  prettyUnitName,
} from "../../constants/tacticianAssets";
import {
  formatGameLength,
  formatTftMatchDate,
} from "../../constants/tacticianFormat";
import type { TacticianMatch } from "../../types/tactican";

interface Props {
  match: TacticianMatch;
  assets: {
    champions: Record<string, string>;
    items: Record<string, string>;
    traits: Record<string, string>;
    loading?: boolean;
  };
}

function getPlacementStyle(placement?: number | null) {
  if (placement === 1) {
    return "border-amber-400/30 bg-amber-500/20 text-amber-300";
  }

  if ((placement ?? 9) <= 4) {
    return "border-emerald-400/30 bg-emerald-500/20 text-emerald-300";
  }

  return "border-rose-400/30 bg-rose-500/20 text-rose-300";
}

function starsFromTier(tier?: number | null) {
  return "★".repeat(Math.max(1, tier ?? 1));
}

export function TftMatchCard({ match, assets }: Props) {
  const { champions, items, traits } = assets;

  return (
    <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 md:p-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div
              className={`inline-flex rounded-2xl border px-4 py-2 text-sm font-semibold ${getPlacementStyle(
                match.placement
              )}`}
            >
              {match.placement ? `${match.placement}º lugar` : "-"}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/75 sm:grid-cols-3 lg:grid-cols-5">
              <p>
                <span className="text-white/50">Fila:</span>{" "}
                {match.queueLabel ?? "TFT"}
              </p>
              <p>
                <span className="text-white/50">Data:</span>{" "}
                {formatTftMatchDate(match.gameDatetime)}
              </p>
              <p>
                <span className="text-white/50">Duração:</span>{" "}
                {formatGameLength(match.gameLengthSeconds)}
              </p>
              <p>
                <span className="text-white/50">Level:</span> {match.level ?? "-"}
              </p>
              <p>
                <span className="text-white/50">Último round:</span>{" "}
                {match.lastRound ?? "-"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/70">
            Comp
          </p>

          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8">
            {match.units.map((unit) => {
              const unitKey = normalizeTftUnitKey(unit.characterId);
              const unitIcon = champions[unitKey] || "";

              return (
                <div
                  key={`${match.matchId}-${unit.characterId}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-2 py-3"
                  title={prettyUnitName(unit.characterId)}
                >
                  <div className="flex flex-col items-center text-center">
                    {unitIcon ? (
                      <img
                        src={unitIcon}
                        alt={prettyUnitName(unit.characterId)}
                        className="h-16 w-16 rounded-xl object-cover md:h-20 md:w-20"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xs text-white/60 md:h-16 md:w-16">
                        ?
                      </div>
                    )}

                    <p className="mt-2 max-w-[70px] truncate text-center text-[11px] font-medium text-white/85">
                      {prettyUnitName(unit.characterId)}
                    </p>

                    <div className="mt-2 flex min-h-[18px] flex-wrap justify-center gap-1">
                      {unit.itemNames?.slice(0, 3).map((itemName, index) => {
                        const itemIcon = items[normalizeTftItemKey(itemName)] || "";

                        return itemIcon ? (
                          <img
                            key={`${match.matchId}-${unit.characterId}-${itemName}-${index}`}
                            src={itemIcon}
                            alt={itemName}
                            title={itemName}
                            className="h-6 w-6 rounded-[4px] object-cover"
                          />
                        ) : (
                          <div
                            key={`${match.matchId}-${unit.characterId}-${itemName}-${index}`}
                            className="h-4 w-4 rounded-[4px] border border-white/10 bg-white/[0.04]"
                            title={itemName}
                          />
                        );
                      })}
                    </div>

                    <p className="mt-1 text-[15px] leading-none text-amber-300">
                      {starsFromTier(unit.tier)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/70">
            Sinergias
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {match.traits.map((trait) => {
              const traitIcon = traits[normalizeTftTraitKey(trait.name)];

              return (
                <div
                  key={`${match.matchId}-${trait.name}`}
                  className="flex items-center gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/10 px-3 py-2 text-xs text-cyan-100"
                  title={prettyTraitName(trait.name)}
                >
                  {traitIcon ? (
                    <img
                      src={traitIcon}
                      alt={prettyTraitName(trait.name)}
                      className="h-4 w-4 rounded-sm object-cover"
                    />
                  ) : null}

                  <span className="whitespace-nowrap">
                    {prettyTraitName(trait.name)} • {trait.numUnits}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}