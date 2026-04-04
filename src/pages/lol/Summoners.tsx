import { useParams } from "react-router-dom";
import { useSummoner } from "../../hook/useSummoner";
import SummonerSearchBar from "../../components/summoners/SummonerSearchBar";
import SummonerNotFound from "../../components/summoners/SummonerNotFound";
import ProfileHeader from "../../components/summoners/ProfilerHeader";
import PoroLoader from "../../components/loader/PoroLoader";
import OverviewBanner from "../../components/summoners/OverviewBanner";
import ScoutTraits from "../../components/summoners/ScoutTraits";
import RankedHistoryCards from "../../components/summoners/StatsCards";
import SummonerRightPanel from "../../components/Tabs/SummonerRightPanel";
import { useEffect, useMemo, useState } from "react";
import type { ScoutTrait } from "../../types/summoner";
import ScoutScoreCard from "../../components/summoners/ScoutScoreCard";
import TrendsCard from "../../components/summoners/TrendsCard";
import WarningsCard from "../../components/summoners/WarningsCard";
import OverviewCard from "../../components/summoners/OverviewCard";

export default function Summoner() {
  const { name, tag } = useParams<{ name: string; tag: string }>();
  const { data, loading, error } = useSummoner(name, tag);
  const [derivedTraits, setDerivedTraits] = useState<ScoutTrait[]>([]);
  const [pageReady, setPageReady] = useState(false);
  console.log("summoner data", data);
  useEffect(() => {
    const timer = setTimeout(() => setPageReady(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const displayedTraits = useMemo(() => {
    return derivedTraits.length ? derivedTraits : data?.traits ?? [];
  }, [derivedTraits, data?.traits]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary-darkblue text-secondary-text">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-[-40px] h-[220px] w-[220px] rounded-full bg-primary-blood/10 blur-3xl" />
        <div className="absolute right-[-100px] top-[20%] h-[280px] w-[280px] rounded-full bg-primary-wine/15 blur-3xl" />
        <div className="absolute bottom-[-80px] left-[25%] h-[220px] w-[220px] rounded-full bg-secondary-peach/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:26px_26px]" />
      </div>

      <div className="relative mx-auto max-w-7xl p-6 space-y-6">
        <div
          className={`transition-all duration-700 ${
            pageReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <SummonerSearchBar defaultName={name} defaultTag={tag} />
        </div>

        {loading && (
          <div
            className={`transition-all duration-500 ${
              pageReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <PoroLoader />
          </div>
        )}

        {!loading && error === "SUMMONER_NOT_FOUND" && (
          <div
            className={`transition-all duration-700 ${
              pageReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <SummonerNotFound searchedName={name} searchedTag={tag} />
          </div>
        )}

        {!loading && error === "GENERIC_ERROR" && (
          <div
            className={`rounded-2xl border border-red-500/30 bg-red-950/20 p-6 text-red-200 transition-all duration-700 ${
              pageReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Ocorreu um erro ao buscar o invocador.
          </div>
        )}

        {!loading && !error && data && (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="space-y-6">
              <div
                className={`transition-all duration-700 ${
                  pageReady
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-[1px] ...">
                  <div className="rounded-3xl bg-transparent">
                    <ProfileHeader info={data.basic} />
                  </div>
                </div>
              </div>

              <div
                className={`transition-all duration-700 delay-100 ${
                  pageReady
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-[1px] shadow-[0_10px_35px_rgba(0,0,0,0.22)]">
                  <div className="rounded-3xl bg-transparent">
                    <ScoutTraits traits={displayedTraits} />
                  </div>
                </div>
              </div>

              <div
                className={`transition-all duration-700 delay-200 ${
                  pageReady
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-[1px] shadow-[0_10px_35px_rgba(0,0,0,0.22)]">
                  <div className="rounded-3xl bg-transparent">
                    <RankedHistoryCards ranked={data.ranked} />
                  </div>
                </div>
              </div>
            </aside>

            <main className="min-w-0 space-y-6">
              {data.overview && (
                <div
                  className={`transition-all duration-700 ${
                    pageReady
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                >
                  <ScoutScoreCard overview={data.overview} scores={data.scores} />
                </div>
              )}

              <div
                className={`transition-all duration-700 delay-100 ${
                  pageReady
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <OverviewBanner
                  info={data.basic}
                  stats={data.stats}
                  scores={data.scores}
                />
              </div>

              {(data.overview || data.trends) && (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  {data.overview && (
                    <div
                      className={`transition-all duration-700 delay-150 ${
                        pageReady
                          ? "translate-y-0 opacity-100"
                          : "translate-y-6 opacity-0"
                      }`}
                    >
                      <OverviewCard overview={data.overview} />
                    </div>
                  )}

                  {data.trends && (
                    <div
                      className={`transition-all duration-700 delay-200 ${
                        pageReady
                          ? "translate-y-0 opacity-100"
                          : "translate-y-6 opacity-0"
                      }`}
                    >
                      <TrendsCard trends={data.trends} />
                    </div>
                  )}
                </div>
              )}

              {!!data.warnings?.length && (
                <div
                  className={`transition-all duration-700 delay-250 ${
                    pageReady
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                >
                  <WarningsCard warnings={data.warnings} />
                </div>
              )}

              <div
                className={`transition-all duration-700 delay-300 ${
                  pageReady
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <SummonerRightPanel
                  key={`${name ?? ""}-${tag ?? ""}`}
                  name={name ?? ""}
                  tag={tag ?? ""}
                  puuid={data.basic.puuid}
                  championPool={data.championPool}
                  onDerivedTraitsChange={setDerivedTraits}
                />
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
}