import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const games = [
  {
    title: "League of Legends",
    subtitle: "Scout de partidas, champion pool e análise de desempenho",
    image: "/images/lol.jpg",
    path: "/lol",
  },
  {
    title: "Teamfight Tactics",
    subtitle: "Acompanhe composições, histórico e evolução no TFT",
    image: "/images/tft.png",
    path: "/tft",
  },
  {
    title: "Valorant",
    subtitle: "Visualize estatísticas, partidas e performance competitiva",
    image: "/images/valorant.jpg",
    path: "/valorant",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1020] text-white px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div
          className={`mb-10 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Game Scout
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/70 max-w-2xl">
            Escolha o jogo para acessar análises, estatísticas e ferramentas de
            scout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <button
              key={game.title}
              onClick={() => navigate(game.path)}
              className={`group relative isolate rounded-3xl border border-white/10 bg-white/5 text-left shadow-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:border-white/20 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 180}ms`,
              }}
            >
              <div className="relative h-[420px] w-full overflow-hidden rounded-3xl">
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="absolute inset-0 h-full w-full rounded-3xl object-cover transform-gpu will-change-transform transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
                <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)]" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                    {game.title}
                  </h2>

                  <p className="mt-3 text-sm text-white/75 leading-relaxed">
                    {game.subtitle}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-all duration-300 group-hover:gap-4">
                    Acessar
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;