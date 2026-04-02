import type { Match } from "../../types/summoner";

interface Props {
  matches: Match[];
}

type RoleStats = {
  role: string;
  games: number;
  wins: number;
  losses: number;
  winRate: number;
  avgKda: number;
};

function buildRoleStats(matches: Match[]): RoleStats[] {
  const grouped = matches.reduce<Record<string, Match[]>>((acc, match) => {
    const role = match.role || "UNKNOWN";
    if (!acc[role]) acc[role] = [];
    acc[role].push(match);
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([role, games]) => {
      const totalGames = games.length;
      const wins = games.filter((game) => game.win).length;
      const losses = totalGames - wins;
      const avgKda =
        games.reduce((acc, game) => acc + game.kda, 0) / totalGames;

      return {
        role,
        games: totalGames,
        wins,
        losses,
        winRate: (wins / totalGames) * 100,
        avgKda,
      };
    })
    .sort((a, b) => b.games - a.games);
}

function getRoleLabel(role: string) {
  switch (role) {
    case "TOP":
      return "Top";
    case "JUNGLE":
      return "Jungle";
    case "MIDDLE":
      return "Mid";
    case "BOTTOM":
      return "ADC";
    case "UTILITY":
      return "Support";
    default:
      return "Unknown";
  }
}

function getWinRateClass(winRate: number) {
  if (winRate >= 60) return "text-emerald-300";
  if (winRate >= 50) return "text-sky-300";
  if (winRate >= 40) return "text-amber-300";
  return "text-rose-300";
}

export default function RoleAnalysisCard({ matches }: Props) {
  const roles = buildRoleStats(matches);

  return (
    <div className="rounded-2xl border border-white/10 bg-primary-blue p-5 shadow-xl">
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-white">Role Analysis</h3>
        <p className="text-sm text-secondary-text/60">
          Desempenho por função nas partidas filtradas
        </p>
      </div>

      <div className="space-y-3">
        {roles.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-white/60">
            Sem dados de role suficientes.
          </div>
        )}

        {roles.map((role) => (
          <div
            key={role.role}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{getRoleLabel(role.role)}</p>
                <p className="text-xs text-white/45">
                  {role.games} jogos • {role.wins}W {role.losses}L
                </p>
              </div>

              <div className="text-right">
                <p className={`font-bold ${getWinRateClass(role.winRate)}`}>
                  {role.winRate.toFixed(0)}%
                </p>
                <p className="text-xs text-white/45">WR</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-fuchsia-400"
                  style={{ width: `${Math.min(role.winRate, 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-white/65">KDA médio</span>
                <span className="font-semibold text-white">{role.avgKda.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}