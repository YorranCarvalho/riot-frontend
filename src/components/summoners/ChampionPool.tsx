import { useMemo, useState } from "react";
import type { ChampionPoolRow } from "../../types/summoner";

interface ChampionPoolProps {
  champions: ChampionPoolRow[];
}

type SortKey =
  | "championName"
  | "games"
  | "winRate"
  | "kda"
  | "avgCs"
  | "avgGold";

type SortDirection = "asc" | "desc";

function getChampionIcon(championName: string) {
  return `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${championName}.png`;
}

function formatGold(value: number) {
  return new Intl.NumberFormat("pt-BR").format(Math.round(value));
}

function getWinRateClass(winRate: number) {
  if (winRate >= 60) return "bg-emerald-500/15 text-emerald-300 border-emerald-500/20";
  if (winRate >= 50) return "bg-sky-500/15 text-sky-300 border-sky-500/20";
  if (winRate >= 40) return "bg-amber-500/15 text-amber-300 border-amber-500/20";
  return "bg-rose-500/15 text-rose-300 border-rose-500/20";
}

function SortArrow({
  active,
  direction,
}: {
  active: boolean;
  direction: SortDirection;
}) {
  return (
    <span className={`ml-1 inline-block text-[10px] ${active ? "text-fuchsia-300" : "text-white/25"}`}>
      {direction === "asc" ? "▲" : "▼"}
    </span>
  );
}

export default function ChampionPool({ champions }: ChampionPoolProps) {
  const [sortKey, setSortKey] = useState<SortKey>("games");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sortedChampions = useMemo(() => {
    const items = [...champions];

    items.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const result = aValue.localeCompare(bValue);
        return sortDirection === "asc" ? result : -result;
      }

      const result = Number(aValue) - Number(bValue);
      return sortDirection === "asc" ? result : -result;
    });

    return items;
  }, [champions, sortKey, sortDirection]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection(key === "championName" ? "asc" : "desc");
  }

  function renderHeader(label: string, key: SortKey) {
    const active = sortKey === key;

    return (
      <button
        type="button"
        onClick={() => handleSort(key)}
        className="inline-flex items-center font-medium transition hover:text-white"
      >
        {label}
        <SortArrow active={active} direction={active ? sortDirection : "desc"} />
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-primary-blue p-5 shadow-xl">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white">Champion Pool</h3>
          <p className="text-sm text-secondary-text/60">
            Campeões mais jogados nesta amostra de partidas
          </p>
        </div>

        <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-secondary-text/70">
          {champions.length} campeões
        </span>
      </div>

      <div className="w-full overflow-hidden">
        <table className="w-full table-fixed border-separate border-spacing-y-2">
          <colgroup>
            <col className="w-[23%]" />
            <col className="w-[12%]" />
            <col className="w-[13%]" />
            <col className="w-[17%]" />
            <col className="w-[10%]" />
            <col className="w-[12%]" />
            <col className="w-[13%]" />
          </colgroup>

          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.12em] text-white/45">
              <th className="px-2 py-3">{renderHeader("Champion", "championName")}</th>
              <th className="px-2 py-3 text-center">{renderHeader("Partidas", "games")}</th>
              <th className="px-2 py-3 text-center">{renderHeader("Win Rate", "winRate")}</th>
              <th className="px-2 py-3 text-center">{renderHeader("KDA", "kda")}</th>
              <th className="px-2 py-3 text-center">{renderHeader("CS", "avgCs")}</th>
              <th className="px-2 py-3 text-center">{renderHeader("Gold", "avgGold")}</th>
              <th className="px-2 py-3 text-center">Trend</th>
            </tr>
          </thead>

          <tbody>
            {sortedChampions.map((champion) => (
              <tr
                key={champion.championName}
                className="rounded-2xl border border-white/10 bg-white/[0.03] transition hover:bg-white/[0.05]"
              >
                <td className="rounded-l-2xl px-2 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={getChampionIcon(champion.championName)}
                      alt={champion.championName}
                      className="h-11 w-11 shrink-0 rounded-xl border border-white/10"
                    />

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">
                        {champion.championName}
                      </p>
                      <p className="truncate text-xs text-white/45">
                        Season performance
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-2 py-4 align-middle text-center">
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">{champion.games}</span>
                    <span className="text-xs text-white/45">
                      {champion.wins}W {champion.losses}L
                    </span>
                  </div>
                </td>

                <td className="px-2 py-4 align-middle text-center">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-sm font-semibold ${getWinRateClass(
                      champion.winRate
                    )}`}
                  >
                    {champion.winRate.toFixed(0)}%
                  </span>
                </td>

                <td className="px-2 py-4 align-middle text-center">
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">
                      {champion.kda.toFixed(2)}:1
                    </span>
                    <span className="truncate text-xs text-white/45">
                      {champion.avgKills.toFixed(1)} / {champion.avgDeaths.toFixed(1)} / {champion.avgAssists.toFixed(1)}
                    </span>
                  </div>
                </td>

                <td className="px-2 py-4 align-middle text-center text-white">
                  {champion.avgCs.toFixed(1)}
                </td>

                <td className="px-2 py-4 align-middle text-center text-white">
                  {formatGold(champion.avgGold)}
                </td>

                <td className="rounded-r-2xl px-2 py-4 align-middle">
                  <div className="flex justify-center gap-1.5">
                    {(champion.recentTrend ?? []).slice(0, 5).map((result, index) => (
                      <span
                        key={`${champion.championName}-${index}-${result}`}
                        title={result === "W" ? "Vitória" : "Derrota"}
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                          result === "W" ? "bg-emerald-400" : "bg-rose-400"
                        }`}
                      />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedChampions.length === 0 && (
          <div className="py-10 text-center text-white/50">
            Nenhum campeão encontrado.
          </div>
        )}
      </div>
    </div>
  );
}