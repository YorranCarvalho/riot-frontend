import { getChampionIconUrl, getItemIconUrl } from "../../constants/game";
import type { Match } from "../../types/summoner";

interface Props {
  matches: Match[];
}

function formatDuration(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}m ${String(sec).padStart(2, "0")}s`;
}

export default function MatchHistory({ matches }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-primary-blue p-5 shadow-xl">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white">Histórico de partidas</h3>
          <p className="text-sm text-secondary-text/60">
            Últimas partidas encontradas para este invocador
          </p>
        </div>

        <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-secondary-text/70">
          {matches.length} partidas
        </span>
      </div>

      <div className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.matchId}
            className={`rounded-2xl border p-4 transition ${
              match.win
                ? "border-emerald-500/20 bg-emerald-500/10"
                : "border-rose-500/20 bg-rose-500/10"
            }`}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={getChampionIconUrl(match.championName)}
                  alt={match.championName}
                  className="h-16 w-16 rounded-xl"
                />

                <div className="min-w-0">
                  <p className="text-lg font-semibold text-white">
                    {match.championName}
                  </p>
                  <p className="text-sm text-secondary-text/65">
                    {match.win ? "Vitória" : "Derrota"} • {match.role} •{" "}
                    {formatDuration(match.gameDuration)}
                  </p>
                  <p className="mt-1 text-sm text-secondary-text/90">
                    {match.kills}/{match.deaths}/{match.assists} • KDA {match.kda}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm lg:min-w-[260px]">
                <div>
                  <p className="text-secondary-text/55">Farm</p>
                  <p className="font-semibold text-white">{match.farm}</p>
                </div>
                <div>
                  <p className="text-secondary-text/55">Dano</p>
                  <p className="font-semibold text-white">
                    {match.damage.toLocaleString("pt-BR")}
                  </p>
                </div>
                <div>
                  <p className="text-secondary-text/55">Ouro</p>
                  <p className="font-semibold text-white">
                    {match.goldEarned.toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {match.items.map((itemId, index) =>
                itemId ? (
                  <img
                    key={`${match.matchId}-${index}-${itemId}`}
                    src={getItemIconUrl(itemId)}
                    alt={`Item ${itemId}`}
                    className="h-10 w-10 rounded-md border border-white/10 bg-black/10"
                  />
                ) : (
                  <div
                    key={`${match.matchId}-${index}-empty`}
                    className="h-10 w-10 rounded-md border border-white/10 bg-white/5"
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}