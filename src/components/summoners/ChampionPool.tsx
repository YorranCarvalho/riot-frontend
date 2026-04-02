export type ChampionPoolRow = {
  championName: string;
  games: number;
  wins: number;
  losses: number;
  winRate: number;
  avgKills: number;
  avgDeaths: number;
  avgAssists: number;
  kda: number;
  avgCs: number;
  avgGold: number;
};

interface ChampionPoolProps {
  champions: ChampionPoolRow[];
}

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

export default function ChampionPool({ champions }: ChampionPoolProps) {
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

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-xs uppercase tracking-[0.12em] text-white/45">
              <th className="px-4 py-3">Champion</th>
              <th className="px-4 py-3">Partidas</th>
              <th className="px-4 py-3">Win Rate</th>
              <th className="px-4 py-3">KDA</th>
              <th className="px-4 py-3">CS Médio</th>
              <th className="px-4 py-3">Gold Médio</th>
            </tr>
          </thead>

          <tbody>
            {champions.map((champion) => (
              <tr
                key={champion.championName}
                className="rounded-2xl border border-white/10 bg-white/[0.03] transition hover:bg-white/[0.05]"
              >
                <td className="rounded-l-2xl px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={getChampionIcon(champion.championName)}
                      alt={champion.championName}
                      className="h-12 w-12 rounded-xl border border-white/10"
                    />
                    <div>
                      <p className="font-semibold text-white">{champion.championName}</p>
                      <p className="text-xs text-white/45">Season performance</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">{champion.games}</span>
                    <span className="text-xs text-white/45">
                      {champion.wins}W {champion.losses}L
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${getWinRateClass(
                      champion.winRate
                    )}`}
                  >
                    {champion.winRate.toFixed(0)}%
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">{champion.kda.toFixed(2)}:1</span>
                    <span className="text-xs text-white/45">
                      {champion.avgKills.toFixed(1)} / {champion.avgDeaths.toFixed(1)} / {champion.avgAssists.toFixed(1)}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4 text-white">
                  {champion.avgCs.toFixed(1)}
                </td>

                <td className="rounded-r-2xl px-4 py-4 text-white">
                  {formatGold(champion.avgGold)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {champions.length === 0 && (
          <div className="py-10 text-center text-white/50">
            Nenhum campeão encontrado.
          </div>
        )}
      </div>
    </div>
  );
}