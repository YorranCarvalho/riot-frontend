import { getChampionIconUrl, getItemIconUrl } from "../../constants/game";

type Match = {
  matchId: string;
  gameCreation: number;
  gameDuration: number;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  win: boolean;
  role: string;
  farm: number;
  goldEarned: number;
  damage: number;
  items: number[];
};

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
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white">Histórico de partidas</h3>

      {matches.map((match) => (
        <div
          key={match.matchId}
          className={`rounded-xl p-4 border ${
            match.win
              ? "bg-emerald-950/30 border-emerald-500/30"
              : "bg-rose-950/30 border-rose-500/30"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={getChampionIconUrl(match.championName)}
                alt={match.championName}
                className="w-16 h-16 rounded-lg"
              />

              <div>
                <p className="text-lg font-semibold text-white">
                  {match.championName}
                </p>
                <p className="text-sm text-white/60">
                  {match.win ? "Vitória" : "Derrota"} • {match.role} •{" "}
                  {formatDuration(match.gameDuration)}
                </p>
                <p className="text-sm text-white/80 mt-1">
                  {match.kills}/{match.deaths}/{match.assists} • KDA {match.kda}
                </p>
              </div>
            </div>

            <div className="text-sm text-white/70">
              <p>Farm: {match.farm}</p>
              <p>Dano: {match.damage.toLocaleString("pt-BR")}</p>
              <p>Ouro: {match.goldEarned.toLocaleString("pt-BR")}</p>
            </div>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            {match.items.map((itemId, index) =>
              itemId ? (
                <img
                  key={`${match.matchId}-${index}-${itemId}`}
                  src={getItemIconUrl(itemId)}
                  alt={`Item ${itemId}`}
                  className="w-10 h-10 rounded-md border border-white/10"
                />
              ) : (
                <div
                  key={`${match.matchId}-${index}-empty`}
                  className="w-10 h-10 rounded-md bg-white/5 border border-white/10"
                />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}