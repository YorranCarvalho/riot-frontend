import { useParams } from "react-router-dom";
import { useTactician } from "../../hook/useTactician";
import { useTftAssets } from "../../hook/useTftAssets";
import { getTacticianProfileIconUrl } from "../../constants/tactician";
import { TftMatchCard } from "../../components/tactician/TftMatchCard";

const Strategist = () => {
  const { name = "", tag = "" } = useParams<{
    name: string;
    tag: string;
  }>();

  const { data, loading, error } = useTactician(name, tag);
  const assets = useTftAssets();

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-darkblue text-white flex items-center justify-center px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">
            TFT Strategist
          </p>
          <h1 className="mt-3 text-3xl font-bold">Carregando perfil...</h1>
          <p className="mt-4 text-white/70">
            Buscando os dados do estrategista.
          </p>
        </div>
      </div>
    );
  }

  if (error === "TACTICIAN_NOT_FOUND") {
    return (
      <div className="min-h-screen bg-primary-darkblue text-white flex items-center justify-center px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">
            TFT Strategist
          </p>
          <h1 className="mt-3 text-3xl font-bold">
            {name}#{tag}
          </h1>
          <p className="mt-4 text-white/70">Estrategista não encontrado.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-darkblue text-white flex items-center justify-center px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">
            TFT Strategist
          </p>
          <h1 className="mt-3 text-3xl font-bold">
            {name}#{tag}
          </h1>
          <p className="mt-4 text-white/70">
            Erro ao buscar dados do estrategista.
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const iconId = data.profile?.profileIconId ?? 29;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(28,83,130,0.18),transparent_30%),linear-gradient(180deg,#06172b_0%,#071d33_100%)] text-white px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-[1550px]">
        <div className="overflow-hidden rounded-[36px] border border-cyan-300/10 bg-[rgba(255,255,255,0.025)] shadow-[0_30px_80px_rgba(0,0,0,0.40)] backdrop-blur-sm">
          <div className="grid items-start gap-6 xl:grid-cols-[320px_minmax(0,1fr)] p-4 md:p-6 xl:gap-8 xl:p-8">
            <aside className="self-start sticky top-6 rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0d162e] to-[#0a1124] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col items-center text-center">
                
                {/* Avatar */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl blur-md bg-cyan-400/20" />
                  <img
                    src={getTacticianProfileIconUrl(iconId)}
                    alt={`${data.account.gameName} icon`}
                    className="relative h-28 w-28 rounded-3xl border border-white/10 object-cover"
                  />
                </div>

                {/* Nome */}
                <h1 className="mt-5 text-2xl font-bold leading-tight">
                  {data.account.gameName}
                  <span className="text-cyan-300">#{data.account.tagLine}</span>
                </h1>

                {/* Subtitle */}
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/40">
                  TFT Strategist
                </p>

                {/* Divider */}
                <div className="my-5 h-px w-full bg-white/10" />

                {/* Info cards */}
                <div className="grid w-full grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/[0.04] p-3 text-center border border-white/5">
                    <p className="text-[10px] uppercase text-white/40 tracking-wider">
                      Level
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {data.profile?.summonerLevel ?? "-"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/[0.04] p-3 text-center border border-white/5">
                    <p className="text-[10px] uppercase text-white/40 tracking-wider">
                      Region
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {data.profile?.region ?? "BR1"}
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <section className="space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
                  Ranked Overview
                </p>

                <div className="mt-4 grid gap-4 md:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-white/60">Tier</p>
                    <p className="mt-2 text-2xl font-bold">{data.ranked?.tier ?? "-"}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-white/60">Rank</p>
                    <p className="mt-2 text-2xl font-bold">{data.ranked?.rank ?? "-"}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-white/60">LP</p>
                    <p className="mt-2 text-2xl font-bold">{data.ranked?.leaguePoints ?? 0}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-white/60">W/L</p>
                    <p className="mt-2 text-2xl font-bold">
                      {data.ranked?.wins ?? 0}/{data.ranked?.losses ?? 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
                  Recent Matches
                </p>

                {!data.recentMatches?.length ? (
                  <p className="mt-4 text-white/65">
                    Ainda não há partidas recentes para exibir.
                  </p>
                ) : (
                  <div className="mt-5 space-y-5">
                    {data.recentMatches.map((match) => (
                      <TftMatchCard
                        key={match.matchId}
                        match={match}
                        assets={assets}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Strategist;