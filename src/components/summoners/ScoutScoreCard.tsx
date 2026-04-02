import type { ScoutScore } from "../../utils/scoutAnalysis";

interface Props {
  score: ScoutScore;
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-emerald-300";
  if (score >= 65) return "text-sky-300";
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

export default function ScoutScoreCard({ score }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-primary-blue p-5 shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">Scout Score</h3>
          <p className="text-sm text-secondary-text/60">
            Nota geral estimada com base nas partidas filtradas
          </p>
        </div>

        <div className={`text-4xl font-black ${getScoreColor(score.overall)}`}>
          {score.overall}
        </div>
      </div>

      <div className="space-y-4">
        {[
          { label: "Laning", value: score.laning },
          { label: "Fighting", value: score.fighting },
          { label: "Consistency", value: score.consistency },
          { label: "Versatility", value: score.versatility },
          { label: "Farming", value: score.farming },
        ].map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/75">{item.label}</span>
              <span className="font-semibold text-white">{item.value}</span>
            </div>
            <ScoreBar value={item.value} />
          </div>
        ))}
      </div>
    </div>
  );
}