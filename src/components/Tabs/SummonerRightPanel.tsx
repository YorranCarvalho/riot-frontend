import { useMemo, useState } from "react";
import ChampionPool, { type ChampionPoolRow } from "../summoners/ChampionPool";
import MatchHistory from "../summoners/MatchHistory";
import type { Match } from "../../hook/useSummoner";

interface SummonerRightPanelProps {
  matches: Match[];
  championPool?: ChampionPoolRow[];
}

function buildChampionPoolFromMatches(matches: Match[]): ChampionPoolRow[] {
  const grouped = matches.reduce<Record<string, Match[]>>((acc, match) => {
    if (!acc[match.championName]) acc[match.championName] = [];
    acc[match.championName].push(match);
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([championName, games]) => {
      const totalGames = games.length;
      const wins = games.filter((game) => game.win).length;
      const losses = totalGames - wins;

      const totalKills = games.reduce((acc, game) => acc + game.kills, 0);
      const totalDeaths = games.reduce((acc, game) => acc + game.deaths, 0);
      const totalAssists = games.reduce((acc, game) => acc + game.assists, 0);
      const totalCs = games.reduce((acc, game) => acc + game.farm, 0);
      const totalGold = games.reduce((acc, game) => acc + game.goldEarned, 0);

      const avgKills = totalKills / totalGames;
      const avgDeaths = totalDeaths / totalGames;
      const avgAssists = totalAssists / totalGames;
      const avgCs = totalCs / totalGames;
      const avgGold = totalGold / totalGames;
      const kda = (totalKills + totalAssists) / Math.max(1, totalDeaths);
      const winRate = (wins / totalGames) * 100;

      return {
        championName,
        games: totalGames,
        wins,
        losses,
        winRate,
        avgKills,
        avgDeaths,
        avgAssists,
        kda,
        avgCs,
        avgGold,
      };
    })
    .sort((a, b) => b.games - a.games);
}

export default function SummonerRightPanel({
  matches,
  championPool,
}: SummonerRightPanelProps) {
  const [selectedTab, setSelectedTab] = useState<"match-history" | "champion-pool">("match-history");

  const championPoolData = useMemo(() => {
    if (championPool?.length) return championPool;
    return buildChampionPoolFromMatches(matches);
  }, [championPool, matches]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111122] p-3 shadow-xl">
      <div className="mb-4 flex flex-wrap gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2">
        <button
          type="button"
          onClick={() => setSelectedTab("match-history")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            selectedTab === "match-history"
              ? "bg-fuchsia-500/15 text-fuchsia-200"
              : "text-white/65 hover:bg-white/5 hover:text-white"
          }`}
        >
          Match History
        </button>

        <button
          type="button"
          onClick={() => setSelectedTab("champion-pool")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            selectedTab === "champion-pool"
              ? "bg-fuchsia-500/15 text-fuchsia-200"
              : "text-white/65 hover:bg-white/5 hover:text-white"
          }`}
        >
          Champion Pool
        </button>
      </div>

      {selectedTab === "match-history" ? (
        <MatchHistory matches={matches} />
      ) : (
        <ChampionPool champions={championPoolData} />
      )}
    </div>
  );
}