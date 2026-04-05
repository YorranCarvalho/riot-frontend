import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTactician } from "../../hook/useTactician";
import { useTftAssets } from "../../hook/useTftAssets";
import type { TftQueueKey } from "../../types/tft";
import StrategistSidebar from "../../components/tactician/StrategistSidebar";
import StrategistRankedOverview from "../../components/tactician/StrategistRankedOverview";
import StrategistPerformance from "../../components/tactician/StrategistPerformance";
import StrategistPlacement from "../../components/tactician/StrategistPlacement";
import StrategistInsights from "../../components/tactician/StrategistInsights";
import StrategistMatches from "../../components/tactician/StrategistMatches";
import TftLoader from "../../components/loader/TftLoader";
import TftError from "../../components/error/TftError";



const Strategist = () => {
  const { name = "", tag = "" } = useParams<{ name: string; tag: string }>();

  const { data, loading, error } = useTactician(name, tag);
  const assets = useTftAssets();
  const [queue, setQueue] = useState<TftQueueKey>("ranked");
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPageReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div
        className={`transition-all duration-500 ${
          pageReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <TftLoader />
      </div>
    );
  }
  
  if (!loading && error === "TACTICIAN_NOT_FOUND") {
    return (
      <div
        className={`transition-all duration-700 ${
          pageReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <TftError type="NOT_FOUND" name={name} tag={tag} />
      </div>
    );
  }

  if (!loading && error) {
    return (
      <div
        className={`transition-all duration-700 ${
          pageReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <TftError />
      </div>
    );
  }
  if (!data) return null;

  const performance = data.performance?.[queue];
  const overview = performance?.overview;

  return (
    <main className="min-h-screen bg-primary-darkblue text-white px-4 py-6">
      <div className="mx-auto max-w-[1550px]">
        <div className="grid gap-6 xl:grid-cols-[320px_1fr]">

          <StrategistSidebar data={data} />

          <section className="space-y-6">

            <StrategistRankedOverview ranked={data.ranked} />

            <StrategistPerformance
              overview={overview}
              performance={performance}
              assets={assets}
              queue={queue}
              onChangeQueue={setQueue}
            />

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <StrategistPlacement overview={overview} />
              <StrategistInsights overview={overview} queue={queue} />
            </div>

            <StrategistMatches
              matches={data.recentMatches}
              queue={queue}
              assets={assets}
            />

          </section>
        </div>
      </div>
    </main>
  );
};

export default Strategist;