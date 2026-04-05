import type { TftOverview, TftQueueKey } from "../../types/tactican";


interface Props {
  overview: TftOverview | null | undefined;
  queue: TftQueueKey;
}

const StrategistInsights = ({ overview, queue }: Props) => {
  if (!overview) return null;

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
          Queue Insights
        </p>
        <span className="text-sm text-white/45">
          {queue.replace("_", " ")}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {overview.insights?.length ? (
          overview.insights.map((insight, index) => (
            <div
              key={`${insight}-${index}`}
              className="rounded-2xl border border-white/10 bg-[#0b1628]/90 p-4"
            >
              <p className="text-sm leading-6 text-white/80">{insight}</p>
            </div>
          ))
        ) : (
          <p className="text-white/60">No insights available for this queue.</p>
        )}
      </div>

      <div className="mt-5 grid gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
            Last 10 Avg
          </p>
          <p className="mt-2 text-xl font-bold text-white">
            {overview.recentForm?.avgLast10 ?? "-"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
            Trend
          </p>
          <p className="mt-2 text-xl font-bold text-white">
            {overview.recentForm?.trend === "up"
              ? "Improving"
              : overview.recentForm?.trend === "down"
                ? "Declining"
                : "Stable"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrategistInsights;