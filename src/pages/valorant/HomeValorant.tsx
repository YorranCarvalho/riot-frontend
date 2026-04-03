import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeValorant() {
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
      `/agent/${encodeURIComponent(trimmedName)}/${encodeURIComponent(trimmedTag)}`
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a10] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(115deg,white_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(60deg,white_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="absolute left-[-80px] top-[8%] h-[220px] w-[220px] bg-red-500/15 blur-3xl" />
        <div className="absolute right-[-70px] top-[18%] h-[260px] w-[260px] bg-pink-500/10 blur-3xl" />
        <div className="absolute bottom-[-80px] left-[30%] h-[220px] w-[220px] bg-rose-400/10 blur-3xl" />

        <div className="absolute left-0 top-[14%] h-px w-full bg-gradient-to-r from-transparent via-red-400/20 to-transparent" />
        <div className="absolute left-0 top-[75%] h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section
            className={`transition-all duration-700 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-3 border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-red-200">
              <span className="h-2 w-2 bg-red-400" />
              Protocol Scout
            </div>

            <div className="mt-8 max-w-2xl">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-red-300/70">
                Tactical Performance
              </p>

              <h1 className="text-4xl font-extrabold leading-tight md:text-5xl xl:text-6xl">
                Busque qualquer player com uma interface mais agressiva e precisa.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/65 md:text-lg">
                Pesquise nome e tag para abrir o perfil competitivo do jogador
                com foco em desempenho, histórico e leitura de partida.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Match History", "KD e ACS", "Agents", "Competitive View"].map(
                (item, index) => (
                  <span
                    key={item}
                    className={`border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/30 hover:bg-red-500/10 ${
                      loaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-3 opacity-0"
                    }`}
                    style={{ transitionDelay: `${120 + index * 70}ms` }}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </section>

          <section
            className={`transition-all duration-700 delay-150 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div className="group relative overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,0,90,0.08),transparent)] opacity-70" />
              <div className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 border-r border-t border-red-400/30" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 border-b border-l border-red-400/20" />

              <div className="relative p-7 md:p-8">
                <p className="text-xs uppercase tracking-[0.28em] text-red-300/65">
                  Search Player
                </p>

                <h2 className="mt-3 text-3xl font-bold">Lock and scan target</h2>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  Informe o nome e a tag do jogador para abrir o perfil do agent.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="valorant-name"
                        className="mb-2 block text-sm font-medium text-white/80"
                      >
                        Nome do player
                      </label>
                      <input
                        id="valorant-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: TenZ"
                        autoComplete="off"
                        className="w-full border border-white/10 bg-[#11131c] px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:border-red-400/40 focus:bg-[#151824] focus:ring-2 focus:ring-red-400/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="valorant-tag"
                        className="mb-2 block text-sm font-medium text-white/80"
                      >
                        Tag
                      </label>
                      <input
                        id="valorant-tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        placeholder="Ex: NA1"
                        autoComplete="off"
                        className="w-full border border-white/10 bg-[#11131c] px-4 py-3 uppercase text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:border-red-400/40 focus:bg-[#151824] focus:ring-2 focus:ring-red-400/10"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isDisabled}
                    className="group/btn flex w-full items-center justify-between border border-red-400/25 bg-red-500/10 px-5 py-3.5 font-semibold uppercase tracking-[0.14em] text-red-200 transition-all duration-200 hover:bg-red-500/15 hover:border-red-400/40 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span>Search player</span>
                    <span className="transition-transform duration-200 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </button>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-red-300/60">
                        Example
                      </p>
                      <p className="mt-2 text-sm text-white/75">aspas + BR1</p>
                    </div>

                    <div className="border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-red-300/60">
                        Status
                      </p>
                      <p className="mt-2 text-sm text-white/75">
                        Backend Valorant em preparação
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}