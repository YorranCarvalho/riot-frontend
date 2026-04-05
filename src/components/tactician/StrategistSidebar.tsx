import { getTacticianProfileIconUrl } from "../../constants/tactician";
import type { TacticianProfileResponse } from "../../types/tactican";

interface Props {
  data: TacticianProfileResponse;
}

const StrategistSidebar = ({ data }: Props) => {
  const iconId = data.profile?.profileIconId ?? 29;

  return (
    <aside className="self-start sticky top-6 rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0d162e] to-[#0a1124] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl blur-md bg-cyan-400/20" />
          <img
            src={getTacticianProfileIconUrl(iconId)}
            alt={`${data.account.gameName} icon`}
            className="relative h-28 w-28 rounded-3xl border border-white/10 object-cover"
          />
        </div>

        <h1 className="mt-5 text-2xl font-bold leading-tight">
          {data.account.gameName}
          <span className="text-cyan-300">#{data.account.tagLine}</span>
        </h1>

        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/40">
          TFT Strategist
        </p>

        <div className="my-5 h-px w-full bg-white/10" />

        <div className="grid w-full grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/5 bg-white/[0.04] p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-white/40">
              Level
            </p>
            <p className="mt-1 text-lg font-semibold">
              {data.profile?.summonerLevel ?? "-"}
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.04] p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-white/40">
              Region
            </p>
            <p className="mt-1 text-lg font-semibold">
              {data.profile?.region ?? "BR1"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default StrategistSidebar;