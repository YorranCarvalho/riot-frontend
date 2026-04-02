interface Props {
  overview?: {
    scoutScore: number;
    scoutTier: "Elite" | "Strong" | "Good" | "Average" | "Risky";
    verdict: string;
    tags: string[];
  };
  scores?: {
    mechanics?: number;
    consistency?: number;
    championPool?: number;
    roleConfidence?: number;
    riskControl?: number;
  };
}

function getScoreColor(score: number) {
  if (score >= 85) return "text-emerald-300";
  if (score >= 75) return "text-sky-300";
  if (score >= 65) return "text-indigo-300";
  if (score >= 50) return "text-amber-300";
  return "text-rose-300";
}

function ScoreBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-white/10">
      <div
        className="h-2 rounded-full bg-fuchsia-400 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function ScoreItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/75">{label}</span>
        <span className="font-semibold text-white">{value}</span>
      </div>
      <ScoreBar value={value} />
    </div>
  );
}

export default function ScoutScoreCard({ overview, scores }: Props) {
  if (!overview) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-primary-blue p-5 shadow-xl">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm text-secondary-text/60">Scout Score</p>

          <div className="mt-2 flex items-end gap-3">
            <div className={`text-5xl font-black ${getScoreColor(overview.scoutScore)}`}>
              {overview.scoutScore}
            </div>
            <div className="rounded-xl bg-white/10 px-3 py-1 text-sm font-semibold text-white">
              {overview.scoutTier}
            </div>
          </div>

          <p className="mt-2 text-sm text-secondary-text/70">{overview.verdict}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {overview.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-fuchsia-500/15 px-3 py-1 text-xs font-medium text-fuchsia-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid w-full max-w-[420px] grid-cols-1 gap-4 md:grid-cols-2">
          <ScoreItem label="Mechanics" value={scores?.mechanics ?? 0} />
          <ScoreItem label="Consistency" value={scores?.consistency ?? 0} />
          <ScoreItem label="Champion Pool" value={scores?.championPool ?? 0} />
          <ScoreItem label="Role Confidence" value={scores?.roleConfidence ?? 0} />
        </div>
      </div>
    </div>
  );
}