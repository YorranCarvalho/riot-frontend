import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTactician } from "../../hook/useTactician";
import { useTftAssets } from "../../hook/useTftAssets";
import { getTacticianProfileIconUrl } from "../../constants/tactician";
import { TftMatchCard } from "../../components/tactician/TftMatchCard";
import { TftQueueTabs } from "../../components/tactician/TftQueueTabs";
import { TftOverviewStatCard } from "../../components/tactician/TftOverviewStatCard";
import { TftFavoriteCard } from "../../components/tactician/TftFavoriteCard";
import { TftTopCompsSection } from "../../components/tactician/TftTopCompsSection";
import { TftTopItemsSection } from "../../components/tactician/TftTopItemsSection";
import { TftTopChampionsSection } from "../../components/tactician/TftTopChampionsSection";
import { TftTrendSection } from "../../components/tactician/TftTrendSection";
import { formatSecondsToClock, prettifyTftId } from "../../utils/tft/tftFormatters";
import type { TftQueueKey } from "../../types/tft";

const Strategist = () => {
  const { name = "", tag = "" } = useParams<{
    name: string;
    tag: string;
  }>();

  const { data, loading, error } = useTactician(name, tag);
  const assets = useTftAssets();
  const [selectedQueue, setSelectedQueue] = useState<TftQueueKey>("ranked");

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-darkblue text-white flex items-center justify-center px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">
            TFT Strategist
          </p>
          <h1 className="mt-3 text-3xl font-bold">Carregando perfil...</h1>
          <p className="mt-4 text-white/70">
            Buscando os dados do estrategista.
          </p>
        </div>
      </div>
    );
  }

  if (error === "TACTICIAN_NOT_FOUND") {
    return (
      <div className="min-h-screen bg-primary-darkblue text-white flex items-center justify-center px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">
            TFT Strategist
          </p>
          <h1 className="mt-3 text-3xl font-bold">
            {name}#{tag}
          </h1>
          <p className="mt-4 text-white/70">Estrategista não encontrado.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-darkblue text-white flex items-center justify-center px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">
            TFT Strategist
          </p>
          <h1 className="mt-3 text-3xl font-bold">
            {name}#{tag}
          </h1>
          <p className="mt-4 text-white/70">
            Erro ao buscar dados do estrategista.
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const iconId = data.profile?.profileIconId ?? 29;
  const currentPerformance = data.performance?.[selectedQueue];
  const overview = currentPerformance?.overview;

  const matches = data.recentMatches ?? [];

  const filteredMatches =
    selectedQueue === "all"
      ? matches
      : selectedQueue === "ranked"
        ? matches.filter((match) => match.queueId === 1100)
        : selectedQueue === "normal"
          ? matches.filter((match) => match.queueId === 1090)
          : selectedQueue === "hyper_roll"
            ? matches.filter((match) => match.queueId === 1130)
            : matches.filter((match) => match.queueId === 1160);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(28,83,130,0.18),transparent_30%),linear-gradient(180deg,#06172b_0%,#071d33_100%)] text-white px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-[1550px]">
        <div className="overflow-hidden rounded-[36px] border border-cyan-300/10 bg-[rgba(255,255,255,0.025)] shadow-[0_30px_80px_rgba(0,0,0,0.40)] backdrop-blur-sm">
          <div className="grid items-start gap-6 p-4 md:p-6 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-8 xl:p-8">
            <aside className="self-start sticky top-6 rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0d162e] to-[#0a1124] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl blur-md bg-cyan-400/20" />
                  <img
                    src={getTacticianProfileIconUrl(iconId)}
                    alt={`${data.account.gameName} icon`}
                    className="relative h-28 w-28 rounded-3xl border border-white/10 object-cover"
                  />
                </div>

                <h1 className="mt-5 text-2xl font-bold leading-tight">
                  {data.account.gameName}
                  <span className="text-cyan-300">#{data.account.tagLine}</span>
                </h1>

                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/40">
                  TFT Strategist
                </p>

                <div className="my-5 h-px w-full bg-white/10" />

                <div className="grid w-full grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/5 bg-white/[0.04] p-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-white/40">
                      Level
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {data.profile?.summonerLevel ?? "-"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.04] p-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-white/40">
                      Region
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {data.profile?.region ?? "BR1"}
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <section className="space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
                  Ranked Overview
                </p>

                <div className="mt-4 grid gap-4 md:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-white/60">Tier</p>
                    <p className="mt-2 text-2xl font-bold">
                      {data.ranked?.tier ?? "Unavailable"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-white/60">Rank</p>
                    <p className="mt-2 text-2xl font-bold">
                      {data.ranked?.rank ?? "-"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-white/60">LP</p>
                    <p className="mt-2 text-2xl font-bold">
                      {data.ranked ? data.ranked.leaguePoints : "-"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-white/60">W/L</p>
                    <p className="mt-2 text-2xl font-bold">
                      {data.ranked ? `${data.ranked.wins}/${data.ranked.losses}` : "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
                    Performance Overview
                  </p>

                  <TftQueueTabs
                    value={selectedQueue}
                    onChange={setSelectedQueue}
                  />
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

                      <TftOverviewStatCard
                        title="Avg Level"
                        value={overview.avgLevel}
                      />

                      <TftOverviewStatCard
                        title="Estimated Damage"
                        value={`${Math.round(overview.estimatedDamage / 1000)}K`}
                        subtitle="estimated"
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
                  comps={currentPerformance?.topComps ?? []}
                  assets={assets}
                />

                <TftTopItemsSection
                  items={currentPerformance?.topItems ?? []}
                  assets={assets}
                />
              </div>

              <TftTopChampionsSection
                champions={currentPerformance?.topChampions ?? []}
                assets={assets}
              />

              <TftTrendSection trend={currentPerformance?.trend ?? []} />

              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
                  Recent Matches
                </p>

                {!filteredMatches?.length ? (
                  <p className="mt-4 text-white/65">
                    Ainda não há partidas recentes para exibir nessa fila.
                  </p>
                ) : (
                  <div className="mt-5 space-y-5">
                    {filteredMatches.map((match) => (
                      <TftMatchCard
                        key={match.matchId}
                        match={match}
                        assets={assets}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Strategist;