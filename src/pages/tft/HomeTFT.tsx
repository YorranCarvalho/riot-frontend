import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeTFT() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(timer);
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
      `/strategist/${encodeURIComponent(trimmedName)}/${encodeURIComponent(trimmedTag)}`
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-primary-darkblue text-secondary-text">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-60px] top-[12%] h-[180px] w-[180px] rounded-full bg-cyan-400/10 blur-2xl" />
        <div className="absolute right-[-70px] top-[18%] h-[220px] w-[220px] rounded-full bg-primary-blood/10 blur-2xl" />
        <div className="absolute bottom-[-60px] left-[18%] h-[180px] w-[180px] rounded-full bg-secondary-peach/8 blur-2xl" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div
          className={`w-full transition-all duration-700 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
            <div className="grid min-h-[620px] lg:grid-cols-[1.1fr_0.9fr]">
              <section className="relative flex flex-col justify-between p-8 md:p-10">
                <div>
                  <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200">
                    <img
                      src="/images/tft.png"
                      alt="TFT Scout"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    Tactician Insight
                  </div>

                  <div className="mt-8 max-w-2xl">
                    <p className="mb-4 text-sm uppercase tracking-[0.28em] text-cyan-300/70">
                      Teamfight Tactics
                    </p>

                    <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
                      Explore o perfil do estrategista com um visual mais mágico,
                      leve e competitivo.
                    </h1>

                    <p className="mt-5 max-w-xl text-base leading-7 text-secondary-peach/75 md:text-lg">
                      Pesquise qualquer jogador para acessar a próxima etapa do
                      scout TFT com um layout mais temático e preparado para
                      composições, histórico e análise de desempenho.
                    </p>
                  </div>
                </div>
              </section>

              <section className="relative flex items-center p-6 md:p-8 lg:p-10">
                <div className="relative w-full overflow-hidden rounded-[28px] border border-cyan-300/15 bg-[#0d162e]/95 p-6 shadow-[0_12px_36px_rgba(0,0,0,0.35)]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_40%)]" />

                  <div className="relative">
                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
                      Search Strategist
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                      Find your next tactician
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-secondary-peach/70">
                      Digite o nome e a tag do jogador para abrir a página do
                      estrategista.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="relative mt-8 space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="strategist-name"
                          className="mb-2 block text-sm font-medium text-secondary-peach/85"
                        >
                          Nome do estrategista
                        </label>
                        <input
                          id="strategist-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ex: Milk"
                          autoComplete="off"
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-secondary-text placeholder:text-secondary-muted outline-none transition-all duration-200 focus:border-cyan-300/40 focus:bg-white/[0.06] focus:ring-2 focus:ring-cyan-300/15"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="strategist-tag"
                          className="mb-2 block text-sm font-medium text-secondary-peach/85"
                        >
                          Tag
                        </label>
                        <input
                          id="strategist-tag"
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                          placeholder="Ex: BR1"
                          autoComplete="off"
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 uppercase text-secondary-text placeholder:text-secondary-muted outline-none transition-all duration-200 focus:border-cyan-300/40 focus:bg-white/[0.06] focus:ring-2 focus:ring-cyan-300/15"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isDisabled}
                      className="group w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/15 px-5 py-3.5 font-semibold text-cyan-100 transition-all duration-200 hover:border-cyan-300/35 hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Search strategist
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </button>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}