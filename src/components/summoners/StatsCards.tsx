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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-[#1b1b2f] rounded-xl p-4 border border-white/10">
        <p className="text-sm text-white/60">Vitórias</p>
        <strong className="text-2xl text-green-400">{stats.wins}</strong>
      </div>

      <div className="bg-[#1b1b2f] rounded-xl p-4 border border-white/10">
        <p className="text-sm text-white/60">Derrotas</p>
        <strong className="text-2xl text-red-400">{stats.losses}</strong>
      </div>

      <div className="bg-[#1b1b2f] rounded-xl p-4 border border-white/10">
        <p className="text-sm text-white/60">KDA médio</p>
        <strong className="text-2xl text-yellow-300">{stats.averageKda}</strong>
      </div>

      <div className="bg-[#1b1b2f] rounded-xl p-4 border border-white/10">
        <p className="text-sm text-white/60">Role mais jogada</p>
        <strong className="text-2xl text-blue-300">{stats.mostPlayedRole}</strong>
      </div>
    </div>
  );
}