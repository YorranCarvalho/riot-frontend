import { getProfileIconUrl } from "../../constants/game";

interface Props {
  info: {
    name: string;
    tag: string;
    profileIconId: number;
    level: number;
  };
  stats: {
    wins: number;
    losses: number;
    averageKda: number;
    mostPlayedRole: string;
  };
}

export default function OverviewBanner({ info, stats }: Props) {
  const totalGames = stats.wins + stats.losses;
  const winRate = totalGames > 0 ? ((stats.wins / totalGames) * 100).toFixed(1) : "0.0";

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-primary-blue shadow-xl">
      <div className="relative">
        <div className="h-44 w-full bg-[linear-gradient(135deg,#13293D_0%,#1c2244_45%,#531928_100%)]" />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex items-end p-6">
          <div className="flex items-end gap-5">
            <img
              src={getProfileIconUrl(info.profileIconId)}
              alt={info.name}
              className="h-24 w-24 rounded-2xl border-4 border-primary-blood shadow-lg"
            />

            <div>
              <h1 className="text-3xl font-extrabold text-white">
                {info.name}
                <span className="ml-2 text-secondary-text/70">#{info.tag}</span>
              </h1>

              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-white/10 px-3 py-1 text-secondary-text">
                  Level {info.level}
                </span>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-300">
                  {stats.wins}W
                </span>
                <span className="rounded-full bg-rose-500/15 px-3 py-1 text-rose-300">
                  {stats.losses}L
                </span>
                <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-yellow-300">
                  {winRate}% WR
                </span>
                <span className="rounded-full bg-sky-500/15 px-3 py-1 text-sky-300">
                  {stats.mostPlayedRole}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
        <div className="rounded-xl bg-black/15 p-4 border border-white/5">
          <p className="text-xs uppercase tracking-wide text-secondary-text/60">Partidas</p>
          <p className="mt-2 text-2xl font-bold text-white">{totalGames}</p>
        </div>

        <div className="rounded-xl bg-black/15 p-4 border border-white/5">
          <p className="text-xs uppercase tracking-wide text-secondary-text/60">Win Rate</p>
          <p className="mt-2 text-2xl font-bold text-emerald-300">{winRate}%</p>
        </div>

        <div className="rounded-xl bg-black/15 p-4 border border-white/5">
          <p className="text-xs uppercase tracking-wide text-secondary-text/60">KDA médio</p>
          <p className="mt-2 text-2xl font-bold text-yellow-300">{stats.averageKda}</p>
        </div>

        <div className="rounded-xl bg-black/15 p-4 border border-white/5">
          <p className="text-xs uppercase tracking-wide text-secondary-text/60">Main Role</p>
          <p className="mt-2 text-2xl font-bold text-sky-300">{stats.mostPlayedRole}</p>
        </div>
      </div>
    </div>
  );
}