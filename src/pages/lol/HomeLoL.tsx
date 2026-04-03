import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeLoL() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const isDisabled = useMemo(() => {
    return !name.trim() || !tag.trim();
  }, [name, tag]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedTag = tag.trim();

    if (!trimmedName || !trimmedTag) return;

    navigate(
      `/summoner/${encodeURIComponent(trimmedName)}/${encodeURIComponent(trimmedTag)}`
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b1020] text-white">
      {/* BACKGROUND ARCANO */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:28px_28px]" />

        <div className="absolute left-[-120px] top-[-60px] w-[320px] h-[320px] bg-yellow-400/10 blur-3xl" />
        <div className="absolute right-[-120px] top-[20%] w-[300px] h-[300px] bg-blue-500/15 blur-3xl" />
        <div className="absolute bottom-[-100px] left-[30%] w-[260px] h-[260px] bg-indigo-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">

          {/* LEFT */}
          <section
            className={`transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center gap-3 border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">
              <img
                src="/images/zed-chibi.png"
                className="h-10 w-10 animate-[float_3s_ease-in-out_infinite]"
              />
              Rift Scout
            </div>

            <div className="mt-8 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Explore o desempenho do invocador com visão estratégica.
              </h1>

              <p className="mt-5 text-white/65 text-base leading-7">
                Analise histórico de partidas, desempenho recente e padrões de jogo com uma leitura clara e inteligente do Rift.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Match History", "Champion Pool", "KDA Analysis"].map(
                (item, i) => (
                  <span
                    key={item}
                    className={`px-4 py-2 text-sm border border-yellow-400/15 bg-yellow-400/5 text-yellow-200 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-400/10 ${
                      loaded
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${120 + i * 80}ms` }}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </section>

          {/* RIGHT */}
          <section
            className={`transition-all duration-700 delay-150 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="relative border border-yellow-400/20 bg-[#121735] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              {/* brilho topo */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,transparent,rgba(255,215,0,0.08),transparent)]" />

              <p className="text-xs uppercase tracking-[0.25em] text-yellow-300/60">
                Summoner Lookup
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Scan the Rift
              </h2>

              <p className="mt-3 text-white/60 text-sm">
                Insira o nome e a tag do invocador para iniciar a análise.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <label className="block mb-2 text-sm text-white/80">
                    Summoner Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Faker"
                    className="w-full border border-white/10 bg-[#0e132b] px-4 py-3 text-white outline-none focus:border-yellow-400/40 focus:ring-2 focus:ring-yellow-400/10"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-white/80">
                    Tag
                  </label>
                  <input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Ex: KR1"
                    className="w-full border border-white/10 bg-[#0e132b] px-4 py-3 text-white uppercase outline-none focus:border-yellow-400/40 focus:ring-2 focus:ring-yellow-400/10"
                  />
                </div>

                <button
                  disabled={isDisabled}
                  className="w-full bg-yellow-400/20 border border-yellow-400/30 py-3 font-semibold text-yellow-200 transition-all hover:bg-yellow-400/30 disabled:opacity-50"
                >
                  Search Summoner
                </button>
              </div>

              <p className="mt-5 text-xs text-center text-white/40">
                Exemplo: Faker + KR1
              </p>
            </form>
          </section>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
        `}
      </style>
    </main>
  );
}