import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeLoL() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
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
      `/summoner/${encodeURIComponent(trimmedName)}/${encodeURIComponent(trimmedTag)}`
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-primary-darkblue text-secondary-text">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-primary-blood/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-120px] right-[-80px] h-[300px] w-[300px] rounded-full bg-primary-wine/20 blur-3xl animate-pulse" />
        <div className="absolute left-1/2 top-1/3 h-[180px] w-[180px] -translate-x-1/2 rounded-full bg-secondary-peach/5 blur-3xl" />

        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          <section
            className={`space-y-6 transition-all duration-1000 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-secondary-peach/15 bg-primary-wine/60 px-4 py-2 shadow-md backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]">
              <img
                src="/images/zed-chibi.png"
                alt="RiftScout"
                className="h-10 w-10 object-contain animate-[float_3s_ease-in-out_infinite]"
              />
              <span className="text-lg font-bold tracking-wide">
                Rift<span className="text-primary-blood">Scout</span>
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-extrabold leading-tight md:text-5xl">
                Scout suas partidas com uma visualização de perfil mais limpa e
                inteligente.
              </h1>

              <p className="max-w-xl text-base leading-7 text-secondary-peach/75 md:text-lg">
                Pesquise qualquer invocador e visualize histórico de partidas,
                estatísticas recentes e desempenho de forma rápida, bonita e
                organizada.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-secondary-peach/80">
              {["Histórico recente", "KDA e role", "Visual clean"].map(
                (item, index) => (
                  <span
                    key={item}
                    className={`rounded-full border border-secondary-peach/15 bg-primary-wine/50 px-4 py-2 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary-blood/40 hover:bg-primary-wine/80 ${
                      loaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${250 + index * 120}ms` }}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </section>

          <section
            className={`flex justify-center lg:justify-end transition-all duration-1000 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            <form
              onSubmit={handleSubmit}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-primary-wine/20 bg-primary-blue p-6 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary-blood/10 blur-2xl" />

              <div className="relative mb-6">
                <h2 className="text-2xl font-bold">Search Summoner</h2>
                <p className="mt-2 text-sm text-secondary-peach/70">
                  Informe o nome e a tag para abrir o perfil do jogador.
                </p>
              </div>

              <div className="relative space-y-4">
                <div className="group">
                  <label
                    htmlFor="summoner-name"
                    className="mb-2 block text-sm font-medium text-secondary-peach/85"
                  >
                    Nome do invocador
                  </label>
                  <input
                    id="summoner-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome"
                    autoComplete="off"
                    className="w-full rounded-xl border border-primary-wine/20 bg-primary-darkblue px-4 py-3 text-secondary-text placeholder:text-secondary-muted outline-none transition-all duration-300 focus:-translate-y-[1px] focus:border-primary-blood focus:ring-2 focus:ring-primary-blood/20"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="summoner-tag"
                    className="mb-2 block text-sm font-medium text-secondary-peach/85"
                  >
                    Tag (Não precisa incluir #)
                  </label>
                  <input
                    id="summoner-tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Tag"
                    autoComplete="off"
                    className="w-full rounded-xl border border-primary-wine/20 bg-primary-darkblue px-4 py-3 text-secondary-text placeholder:text-secondary-muted uppercase outline-none transition-all duration-300 focus:-translate-y-[1px] focus:border-primary-blood focus:ring-2 focus:ring-primary-blood/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isDisabled}
                  className="w-full rounded-xl bg-primary-blood py-3 font-semibold text-secondary-peach transition-all duration-300 hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Buscar jogador
                </button>
              </div>

              <p className="relative mt-4 text-center text-xs text-secondary-peach/50">
                Exemplo: Faker + KR1
              </p>
            </form>
          </section>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-6px);
            }
          }
        `}
      </style>
    </main>
  );
}