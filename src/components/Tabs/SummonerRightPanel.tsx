import { useEffect, useMemo, useState } from "react";
import ChampionPool from "../summoners/ChampionPool";
import MatchHistory from "../summoners/MatchHistory";
import ScoutIntelligence from "../summoners/ScoutIntelligence";
import {
  buildScoutAnalysis,
  filterMatches,
  type QueueFilter,
  type RoleFilter,
} from "../../utils/scoutAnalysis";
import type { ChampionPoolRow, ScoutTrait } from "../../types/summoner";
import RoleAnalysisCard from "../summoners/RoleAnalysisCard";
import PoroLoader from "../loader/PoroLoader";
import { useSummonerMatches } from "../../hook/useSummonerMatchs";

interface SummonerRightPanelProps {
  name: string;
  tag: string;
  puuid: string;
  championPool?: ChampionPoolRow[];
  onDerivedTraitsChange?: (traits: ScoutTrait[]) => void;
}

export default function SummonerRightPanel({
  name,
  tag,
  puuid,
  championPool,
  onDerivedTraitsChange,
}: SummonerRightPanelProps) {
  const [selectedTab, setSelectedTab] = useState<"match-history" | "champion-pool">("match-history");
  const [queueFilter, setQueueFilter] = useState<QueueFilter>("all");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: matchesResponse, loading: matchesLoading } = useSummonerMatches(
    name,
    tag,
    page,
    limit
  );

  const matches = matchesResponse?.items ?? [];

  const filteredMatches = useMemo(() => {
    return filterMatches(matches, 10, queueFilter, roleFilter);
  }, [matches, queueFilter, roleFilter]);

  const analysis = useMemo(() => {
    return buildScoutAnalysis(filteredMatches, championPool);
  }, [filteredMatches, championPool]);

  useEffect(() => {
    onDerivedTraitsChange?.(analysis.derivedTraits);
  }, [analysis.derivedTraits, onDerivedTraitsChange]);

  return (
    <div className="space-y-6">
      <ScoutIntelligence insights={analysis.intelligence} />
      <RoleAnalysisCard matches={filteredMatches} />

      <div className="rounded-2xl border border-white/10 bg-[#111122] p-3 shadow-xl">
        <div className="mb-4 flex flex-wrap gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
            className="rounded-lg border border-white/10 bg-[#19192b] px-3 py-2 text-sm text-white outline-none focus:border-fuchsia-500/40 focus:ring-0"
          >
            <option value="all" className="bg-[#19192b] text-white">Todas as roles</option>
            <option value="TOP" className="bg-[#19192b] text-white">Top</option>
            <option value="JUNGLE" className="bg-[#19192b] text-white">Jungle</option>
            <option value="MIDDLE" className="bg-[#19192b] text-white">Mid</option>
            <option value="BOTTOM" className="bg-[#19192b] text-white">ADC</option>
            <option value="UTILITY" className="bg-[#19192b] text-white">Support</option>
            <option value="UNKNOWN" className="bg-[#19192b] text-white">Unknown</option>
          </select>

          <select
            value={queueFilter}
            onChange={(e) => setQueueFilter(e.target.value as QueueFilter)}
            className="rounded-lg border border-white/10 bg-[#19192b] px-3 py-2 text-sm text-white outline-none focus:border-fuchsia-500/40 focus:ring-0"
          >
            <option value="all">Todas as queues</option>
            <option value="soloDuo">Solo/Duo</option>
            <option value="flex">Flex</option>
            <option value="aram">ARAM</option>
            <option value="normal">Normal</option>
          </select>
        </div>

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
          matchesLoading ? (
            <PoroLoader />
          ) : (
            <MatchHistory
              matches={filteredMatches}
              puuid={puuid}
              page={matchesResponse?.pagination.page ?? 1}
              totalPages={matchesResponse?.pagination.totalPages ?? 1}
              hasNextPage={matchesResponse?.pagination.hasNextPage ?? false}
              hasPreviousPage={matchesResponse?.pagination.hasPreviousPage ?? false}
              onNextPage={() => setPage((prev) => prev + 1)}
              onPreviousPage={() => setPage((prev) => Math.max(1, prev - 1))}
            />
          )
        ) : (
          <ChampionPool
            champions={analysis.championPool.map((champion) => {
              const recentTrend = matches
                .filter((match) => match.championName === champion.championName)
                .slice(0, 5)
                .map((match) => (match.win ? "W" : "L"));

              return {
                ...champion,
                recentTrend,
              };
            })}
          />
        )}
      </div>
    </div>
  );
}