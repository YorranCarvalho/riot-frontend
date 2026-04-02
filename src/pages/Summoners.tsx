import { useParams } from "react-router-dom";
import { useSummoner } from "../hook/useSummoner";
import SummonerSearchBar from "../components/summoners/SummonerSearchBar";
import SummonerNotFound from "../components/summoners/SummonerNotFound";
import ProfileHeader from "../components/summoners/ProfilerHeader";
import PoroLoader from "../components/loader/PoroLoader";
import OverviewBanner from "../components/summoners/OverviewBanner";
import ScoutTraits from "../components/summoners/ScoutTraits";
import RankedHistoryCards from "../components/summoners/StatsCards";
import SummonerRightPanel from "../components/Tabs/SummonerRightPanel";
import { useMemo, useState } from "react";
import type { ScoutTrait } from "../types/summoner";

export default function Summoner() {
  const { name, tag } = useParams<{ name: string; tag: string }>();
  const { data, loading, error } = useSummoner(name, tag);
  const [derivedTraits, setDerivedTraits] = useState<ScoutTrait[]>([]);

  const displayedTraits = useMemo(() => {
    return derivedTraits.length ? derivedTraits : data?.traits ?? [];
  }, [derivedTraits, data?.traits]);

  return (
    <div className="min-h-screen bg-primary-darkblue text-secondary-text">
      <div className="mx-auto max-w-7xl p-6 space-y-6">
        <SummonerSearchBar defaultName={name} defaultTag={tag} />

        {loading && <PoroLoader />}

        {!loading && error === "SUMMONER_NOT_FOUND" && (
          <SummonerNotFound searchedName={name} searchedTag={tag} />
        )}

        {!loading && error === "GENERIC_ERROR" && (
          <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6 text-red-200">
            Ocorreu um erro ao buscar o invocador.
          </div>
        )}

        {!loading && !error && data && (
          <div className="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-6">
            <aside className="space-y-6">
              <ProfileHeader info={data.basic} />
              <ScoutTraits traits={displayedTraits} />
              <RankedHistoryCards ranked={data.ranked} />
            </aside>

            <main className="space-y-6 min-w-0">
              <OverviewBanner info={data.basic} stats={data.stats} />

              <SummonerRightPanel
                matches={data.recentMatches}
                puuid={data.basic.puuid}
                championPool={data.championPool}
                onDerivedTraitsChange={setDerivedTraits}
              />
            </main>
          </div>
        )}
      </div>
    </div>
  );
}