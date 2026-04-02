interface Props {
  trends: {
    last10WinRate: number;
    last20WinRate: number;
    recentTrend: "up" | "stable" | "down";
    streak: {
      type: "win" | "loss" | "none";
      count: number;
    };
  };
}

export default function TrendsCard({ trends }: Props) {
  const trendLabel =
    trends.recentTrend === "up"
      ? "Subindo"
      : trends.recentTrend === "down"
      ? "Caindo"
      : "Estável";

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-6">
      <h3 className="mb-4 text-lg font-bold text-white">Recent Trends</h3>

      <div className="grid grid-cols-2 gap-4">
        <TrendBox label="Last 10 WR" value={`${trends.last10WinRate.toFixed(1)}%`} />
        <TrendBox label="Last 20 WR" value={`${trends.last20WinRate.toFixed(1)}%`} />
        <TrendBox label="Trend" value={trendLabel} />
        <TrendBox
          label="Streak"
          value={
            trends.streak.type === "none"
              ? "None"
              : `${trends.streak.count} ${trends.streak.type}`
          }
        />
      </div>
    </div>
  );
}

function TrendBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-4">
      <p className="text-xs text-secondary-text/60">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}