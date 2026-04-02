interface RankedSeason {
  season: string;
  tier: string;
  lp: number;
}

interface RankedQueue {
  currentTier: string;
  currentLp: number;
  seasons: RankedSeason[];
}

interface Props {
  ranked: {
    soloDuo: RankedQueue;
    flex: RankedQueue;
  };
}

const getTierColor = (tier: string) => {
  if (tier.includes("Iron")) return "text-gray-400";
  if (tier.includes("Bronze")) return "text-amber-700";
  if (tier.includes("Silver")) return "text-gray-300";
  if (tier.includes("Gold")) return "text-yellow-400";
  if (tier.includes("Platinum")) return "text-cyan-400";
  if (tier.includes("Diamond")) return "text-blue-400";
  return "text-white";
};

export default function RankedHistoryCards({ ranked }: Props) {
  const renderQueue = (title: string, queue: RankedQueue) => {
    return (
      <div className="rounded-2xl border border-white/10 bg-primary-blue p-4 shadow-xl">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-white">{title}</h3>

          <span className="text-xs text-secondary-text/60">
            {queue.currentTier === "RANK_UNAVAILABLE"
              ? "Rank indisponível"
              : queue.currentTier !== "UNRANKED"
              ? `${queue.currentTier} • ${queue.currentLp} LP`
              : "Unranked"}
          </span>
        </div>

        <div className="space-y-2">
          {queue.seasons.slice(0, 6).map((season) => (
            <div
              key={season.season}
              className="flex justify-between items-center text-sm bg-black/20 rounded-lg px-3 py-2"
            >
              <span className="text-secondary-text/70">
                {season.season}
              </span>

              <span
                className={`text-xs ${
                  queue.currentTier === "RANK_UNAVAILABLE"
                    ? "text-secondary-text/60"
                    : queue.currentTier !== "UNRANKED"
                    ? getTierColor(queue.currentTier)
                    : "text-secondary-text/60"
                }`}
              >
                {queue.currentTier === "RANK_UNAVAILABLE"
                  ? "Rank indisponível"
                  : queue.currentTier !== "UNRANKED"
                  ? `${queue.currentTier} • ${queue.currentLp} LP`
                  : "Unranked"}
              </span>

              <span className="text-secondary-text/60 text-xs">
                {season.lp} LP
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {renderQueue("Ranked Solo/Duo", ranked.soloDuo)}
      {renderQueue("Ranked Flex", ranked.flex)}
    </div>
  );
}