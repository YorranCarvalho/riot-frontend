import type { TacticianMatch, TftQueueKey } from "../../types/tactican";
import type { TftAssets } from "../../utils/tft/tftAssets";
import { TftMatchCard } from "./TftMatchCard";

interface Props {
  matches: TacticianMatch[];
  queue: TftQueueKey;
  assets: TftAssets;
}

const StrategistMatches = ({ matches, queue, assets }: Props) => {
  const filteredMatches =
    queue === "all"
      ? matches
      : queue === "ranked"
        ? matches.filter((match) => match.queueId === 1100)
        : queue === "normal"
          ? matches.filter((match) => match.queueId === 1090)
          : queue === "hyper_roll"
            ? matches.filter((match) => match.queueId === 1130)
            : matches.filter((match) => match.queueId === 1160);

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
        Recent Matches
      </p>

      {!filteredMatches?.length ? (
        <p className="mt-4 text-white/65">
          Ainda não há partidas recentes para exibir nessa fila.
        </p>
      ) : (
        <div className="mt-5 space-y-5">
          {filteredMatches.map((match) => (
            <TftMatchCard
              key={match.matchId}
              match={match}
              assets={assets}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StrategistMatches;