import type { TftOverview, TftPerformanceBucket, TftQueueKey } from "../../types/tactican";
import type { TftAssets } from "../../utils/tft/tftAssets";
import { formatSecondsToClock, prettifyTftId } from "../../utils/tft/tftFormatters";
import { TftFavoriteCard } from "./TftFavoriteCard";
import { TftOverviewStatCard } from "./TftOverviewStatCard";
import { TftQueueTabs } from "./TftQueueTabs";
import { TftTopChampionsSection } from "./TftTopChampionsSection";
import { TftTopCompsSection } from "./TftTopCompsSection";
import { TftTopItemsSection } from "./TftTopItemsSection";


interface Props {
  overview: TftOverview | null | undefined;
  performance: TftPerformanceBucket | undefined;
  assets: TftAssets;
  queue: TftQueueKey;
  onChangeQueue: (queue: TftQueueKey) => void;
}

const StrategistPerformance = ({
  overview,
  performance,
  assets,
  queue,
  onChangeQueue,
}: Props) => {
  return (
    <>
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
            Performance Overview
          </p>

          <TftQueueTabs value={queue} onChange={onChangeQueue} />
        </div>

        {!overview ? (
          <p className="mt-4 text-white/65">Sem partidas nessa fila.</p>
        ) : (
          <>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              <TftOverviewStatCard
                title="Average Place"
                value={overview.avgPlacement}
                subtitle={`${overview.totalGames} games`}
              />

              <TftOverviewStatCard
                title="Top 4 Rate"
                value={`${overview.top4Rate}%`}
              />

              <TftOverviewStatCard
                title="Win Rate"
                value={`${overview.winRate}%`}
              />

              <TftOverviewStatCard
                title="Avg Match Time"
                value={formatSecondsToClock(overview.avgGameTimeSeconds)}
              />

              <TftOverviewStatCard title="Avg Level" value={overview.avgLevel} />

              <TftOverviewStatCard
                title="Estimated Damage"
                value={`${Math.round(overview.estimatedDamage / 1000)}K`}
                subtitle="estimated"
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              <TftOverviewStatCard
                title="Best Place"
                value={overview.bestPlacement ? `#${overview.bestPlacement}` : "-"}
              />

              <TftOverviewStatCard
                title="Worst Place"
                value={overview.worstPlacement ? `#${overview.worstPlacement}` : "-"}
              />

              <TftOverviewStatCard
                title="Avg Last Round"
                value={overview.avgLastRound}
              />

              <TftOverviewStatCard
                title="Avg Eliminations"
                value={overview.avgPlayersEliminated}
              />

              <TftOverviewStatCard
                title="Consistency"
                value={overview.consistencyScore ?? "-"}
                subtitle={
                  overview.placementSpread !== null
                    ? `Spread ${overview.placementSpread}`
                    : undefined
                }
              />

              <TftOverviewStatCard
                title="Last 5 Avg"
                value={overview.recentForm?.avgLast5 ?? "-"}
                subtitle={
                  overview.recentForm?.trend === "up"
                    ? "Trending up"
                    : overview.recentForm?.trend === "down"
                      ? "Trending down"
                      : "Stable trend"
                }
              />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <TftFavoriteCard
                title="Favorite Champion"
                image={
                  overview.favoriteChampionId
                    ? assets.champions?.[overview.favoriteChampionId]
                    : undefined
                }
                label={prettifyTftId(overview.favoriteChampionId)}
                subtitle={`${overview.favoriteChampionCount} appearances`}
              />

              <TftFavoriteCard
                title="Most Used Item"
                image={
                  overview.mostUsedItemId
                    ? assets.items?.[overview.mostUsedItemId]
                    : undefined
                }
                label={prettifyTftId(overview.mostUsedItemId)}
                subtitle={`${overview.mostUsedItemCount} uses`}
              />

              <TftFavoriteCard
                title="Most Used Trait"
                image={
                  overview.mostUsedTraitId
                    ? assets.traits?.[overview.mostUsedTraitId]
                    : undefined
                }
                label={prettifyTftId(overview.mostUsedTraitId)}
                subtitle={`${overview.mostUsedTraitCount} times active`}
              />
            </div>
          </>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <TftTopCompsSection
          comps={performance?.topComps ?? []}
          assets={assets}
        />

        <TftTopItemsSection
          items={performance?.topItems ?? []}
          assets={assets}
        />
      </div>

      <TftTopChampionsSection
        champions={performance?.topChampions ?? []}
        assets={assets}
      />
    </>
  );
};

export default StrategistPerformance;