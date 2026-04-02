interface Props {
  stats: {
    wins: number;
    losses: number;
    averageKda: number;
    mostPlayedRole: string;
  };
}

export default function StatsCards({ stats }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-primary-blue p-5 shadow-xl">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">Quick Stats</h3>
        <p className="text-sm text-secondary-text/60">Resumo recente do jogador</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/5 bg-black/15 p-4">
          <p className="text-xs uppercase tracking-wide text-secondary-text/60">Vitórias</p>
          <strong className="mt-2 block text-2xl text-emerald-400">{stats.wins}</strong>
        </div>

        <div className="rounded-xl border border-white/5 bg-black/15 p-4">
          <p className="text-xs uppercase tracking-wide text-secondary-text/60">Derrotas</p>
          <strong className="mt-2 block text-2xl text-rose-400">{stats.losses}</strong>
        </div>

        <div className="rounded-xl border border-white/5 bg-black/15 p-4">
          <p className="text-xs uppercase tracking-wide text-secondary-text/60">KDA médio</p>
          <strong className="mt-2 block text-2xl text-yellow-300">{stats.averageKda}</strong>
        </div>

        <div className="rounded-xl border border-white/5 bg-black/15 p-4">
          <p className="text-xs uppercase tracking-wide text-secondary-text/60">Role</p>
          <strong className="mt-2 block text-2xl text-sky-300">{stats.mostPlayedRole}</strong>
        </div>
      </div>
    </div>
  );
}