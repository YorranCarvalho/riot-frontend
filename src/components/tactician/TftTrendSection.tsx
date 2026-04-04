import type { TftTrendEntry } from "../../types/tft";

interface Props {
  trend: TftTrendEntry[];
}

export const TftTrendSection = ({ trend }: Props) => {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
          Recent Placement Trend
        </p>
        <span className="text-sm text-white/45">Last 10 games</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {trend.length === 0 ? (
          <p className="text-white/60">Sem partidas nessa fila.</p>
        ) : (
          trend.map((entry) => {
            const style = entry.isWin
              ? "bg-amber-400/20 text-amber-200 border-amber-300/30"
              : entry.isTop4
              ? "bg-emerald-400/15 text-emerald-200 border-emerald-300/30"
              : "bg-rose-400/15 text-rose-200 border-rose-300/30";

            return (
              <div
                key={entry.matchId}
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-lg font-bold ${style}`}
              >
                #{entry.placement}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};