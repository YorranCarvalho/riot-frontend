interface Props {
  warnings: string[];
}

export default function WarningsCard({ warnings }: Props) {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
      <h3 className="mb-3 text-sm font-semibold text-yellow-300">Warnings</h3>

      <div className="space-y-2">
        {warnings.map((warning) => (
          <div key={warning} className="text-sm text-yellow-100">
            ⚠ {warning}
          </div>
        ))}
      </div>
    </div>
  );
}