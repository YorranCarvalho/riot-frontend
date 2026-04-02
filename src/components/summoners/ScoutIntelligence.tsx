import type { ScoutInsight } from "../../utils/scoutAnalysis";

interface Props {
  insights: ScoutInsight[];
}

function getSeverityClass(severity: ScoutInsight["severity"]) {
  if (severity === "high") {
    return "border-rose-500/20 bg-rose-500/10";
  }

  if (severity === "medium") {
    return "border-amber-500/20 bg-amber-500/10";
  }

  return "border-sky-500/20 bg-sky-500/10";
}

export default function ScoutIntelligence({ insights }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-primary-blue p-5 shadow-xl">
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-white">Scout Intelligence</h3>
        <p className="text-sm text-secondary-text/60">
          Leitura automática do perfil do jogador
        </p>
      </div>

      <div className="space-y-3">
        {insights.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-white/60">
            Ainda não há dados suficientes para gerar insights.
          </div>
        )}

        {insights.map((insight) => (
          <div
            key={insight.key}
            className={`rounded-xl border p-4 ${getSeverityClass(insight.severity)}`}
          >
            <p className="font-semibold text-white">{insight.title}</p>
            <p className="mt-1 text-sm text-white/70">{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}