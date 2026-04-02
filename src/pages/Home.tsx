import { type FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

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
    <main className="min-h-screen bg-primary-darkblue text-secondary-text">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-secondary-peach/15 bg-primary-wine/60 px-4 py-2 shadow-md">
              <img
                src="/images/zed-chibi.png"
                alt="RiftScout"
                className="h-10 w-10 object-contain"
              />
              <span className="text-lg font-bold tracking-wide">
                Rift<span className="text-primary-blood">Scout</span>
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-extrabold leading-tight md:text-5xl">
                Scout suas partidas com uma visualização de perfil mais limpa e inteligente.
              </h1>

              <p className="max-w-xl text-base leading-7 text-secondary-peach/75 md:text-lg">
                Pesquise qualquer invocador e visualize histórico de partidas,
                estatísticas recentes e desempenho de forma rápida, bonita e
                organizada.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-secondary-peach/80">
              <span className="rounded-full border border-secondary-peach/15 bg-primary-wine/50 px-4 py-2">
                Histórico recente
              </span>
              <span className="rounded-full border border-secondary-peach/15 bg-primary-wine/50 px-4 py-2">
                KDA e role
              </span>
              <span className="rounded-full border border-secondary-peach/15 bg-primary-wine/50 px-4 py-2">
                Visual clean
              </span>
            </div>
          </section>

          <section className="flex justify-center lg:justify-end">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md rounded-2xl border border-primary-wine/20 bg-primary-blue p-6 shadow-2xl backdrop-blur-sm"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Search Summoner</h2>
                <p className="mt-2 text-sm text-secondary-peach/70">
                  Informe o nome e a tag para abrir o perfil do jogador.
                </p>
              </div>

              <div className="space-y-4">
                <div>
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
                    className="w-full rounded-xl border border-primary-wine/20 bg-primary-darkblue px-4 py-3 text-secondary-text placeholder:text-secondary-muted outline-none transition focus:border-primary-blood focus:ring-2 focus:ring-primary-blood/20"
                  />
                </div>

                <div>
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
                    className="w-full rounded-xl border border-primary-wine/20 bg-primary-darkblue px-4 py-3 text-secondary-text placeholder:text-secondary-muted uppercase outline-none transition focus:border-primary-blood focus:ring-2 focus:ring-primary-blood/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isDisabled}
                  className="w-full rounded-xl bg-primary-blood py-3 font-semibold text-secondary-peach transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Buscar jogador
                </button>
              </div>

              <p className="mt-4 text-center text-xs text-secondary-peach/50">
                Exemplo: Faker + KR1
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}