interface RankedData {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

interface Props {
  ranked: RankedData | null;
}

const StrategistRankedOverview = ({ ranked }: Props) => {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
        Ranked Overview
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-white/60">Tier</p>
          <p className="mt-2 text-2xl font-bold">
            {ranked?.tier ?? "Unavailable"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-white/60">Rank</p>
          <p className="mt-2 text-2xl font-bold">{ranked?.rank ?? "-"}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-white/60">LP</p>
          <p className="mt-2 text-2xl font-bold">
            {ranked ? ranked.leaguePoints : "-"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-white/60">W/L</p>
          <p className="mt-2 text-2xl font-bold">
            {ranked ? `${ranked.wins}/${ranked.losses}` : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrategistRankedOverview;