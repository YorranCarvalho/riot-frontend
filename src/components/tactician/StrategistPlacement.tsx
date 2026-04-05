import type { TftOverview } from "../../types/tactican";

interface Props {
  overview: TftOverview | null | undefined;
}

const StrategistPlacement = ({ overview }: Props) => {
  if (!overview) return null;

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
          Placement Distribution
        </p>
        <span className="text-sm text-white/45">
          {overview.totalGames} games
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {([1, 2, 3, 4, 5, 6, 7, 8] as const).map((place) => {
          const count = overview.placementDistribution?.[place] ?? 0;
          const width = overview.totalGames
            ? (count / overview.totalGames) * 100
            : 0;

          const colorClass =
            place === 1
              ? "from-amber-300/80 to-yellow-500/80"
              : place <= 4
                ? "from-emerald-300/70 to-cyan-400/70"
                : "from-rose-400/70 to-pink-500/70";

          return (
            <div
              key={place}
              className="grid grid-cols-[56px_minmax(0,1fr)_48px] items-center gap-3"
            >
              <div className="text-sm font-semibold text-white/80">
                #{place}
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/[0.05]">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
                  style={{ width: `${width}%` }}
                />
              </div>

              <div className="text-right text-sm text-white/65">
                {count}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
            Avg Top 4 Placement
          </p>
          <p className="mt-2 text-xl font-bold text-white">
            {overview.avgTop4Placement ?? "-"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
            Avg Bottom 4 Placement
          </p>
          <p className="mt-2 text-xl font-bold text-white">
            {overview.avgBottom4Placement ?? "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrategistPlacement;