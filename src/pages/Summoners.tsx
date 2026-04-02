import { useParams } from "react-router-dom";
import { useSummoner } from "../hook/useSummoner";
import MatchHistory from "../components/summoners/MatchHistory";
import StatsCards from "../components/summoners/StatsCards";
import SummonerSearchBar from "../components/summoners/SummonerSearchBar";
import SummonerNotFound from "../components/summoners/SummonerNotFound";
import ProfileHeader from "../components/summoners/ProfilerHeader";
import PoroLoader from "../components/loader/PoroLoader";
import OverviewBanner from "../components/summoners/OverviewBanner";
import ScoutTraits from "../components/summoners/ScoutTraits";

export default function Summoner() {
  const { name, tag } = useParams<{ name: string; tag: string }>();
  const { data, loading, error } = useSummoner(name, tag);

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
              <ScoutTraits traits={data.traits} />
              <StatsCards stats={data.stats} />
            </aside>

            <main className="space-y-6 min-w-0">
              <OverviewBanner info={data.basic} stats={data.stats} />
              <MatchHistory matches={data.recentMatches} />
            </main>
          </div>
        )}
      </div>
    </div>
  );
}