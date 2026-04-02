interface Props {
  overview: {
    strengths: string[];
    weaknesses: string[];
  };
}

export default function OverviewCard({ overview }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-6">
      <h3 className="mb-4 text-lg font-bold text-white">Scout Overview</h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold text-emerald-400">Strengths</p>
          <div className="space-y-2">
            {overview.strengths?.length ? (
              overview.strengths.map((item) => (
                <div
                  key={item}
                  className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100"
                >
                  • {item}
                </div>
              ))
            ) : (
              <p className="text-sm text-secondary-text/60">Nenhum destaque.</p>
            )}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-red-400">Weaknesses</p>
          <div className="space-y-2">
            {overview.weaknesses?.length ? (
              overview.weaknesses.map((item) => (
                <div
                  key={item}
                  className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-100"
                >
                  • {item}
                </div>
              ))
            ) : (
              <p className="text-sm text-secondary-text/60">Sem fraquezas relevantes.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}