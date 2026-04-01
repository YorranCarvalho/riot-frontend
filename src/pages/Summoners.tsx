import { useParams } from "react-router-dom";
import { useSummoner } from "../hook/useSummoner";
import MatchHistory from "../components/summoners/MatchHistory";
import StatsCards from "../components/summoners/StatsCards";
import SummonerSearchBar from "../components/summoners/SummonerSearchBar";
import SummonerNotFound from "../components/summoners/SummonerNotFound";
import ProfileHeader from "../components/summoners/ProfilerHeader";
import PoroLoader from "../components/loader/PoroLoader";

export default function Summoner() {
  const { name, tag } = useParams<{ name: string; tag: string }>();
  const { data, loading, error } = useSummoner(name, tag);

  return (
    <div className="p-6 space-y-6">
      <SummonerSearchBar defaultName={name} defaultTag={tag} />

      {loading && <PoroLoader />}

      {!loading && error === "SUMMONER_NOT_FOUND" && (
        <SummonerNotFound searchedName={name} searchedTag={tag} />
      )}

      {!loading && error === "GENERIC_ERROR" && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-6 text-red-200">
          Ocorreu um erro ao buscar o invocador.
        </div>
      )}

      {!loading && !error && data && (
        <>
          <ProfileHeader info={data.basic} />
          <StatsCards stats={data.stats} />
          <MatchHistory matches={data.recentMatches} />
        </>
      )}
    </div>
  );
}