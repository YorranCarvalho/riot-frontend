import { useNavigate } from "react-router-dom";

interface Props {
  searchedName?: string;
  searchedTag?: string;
}

export default function SummonerNotFound({
  searchedName,
  searchedTag,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-primary-blue text-secondary-text p-8 rounded-2xl border border-primary-wine/30 text-center shadow-lg">
      <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-primary-blue text-6xl shadow-inner">
        <img
          src="/images/poro-not-found.png"
          alt="Poro"
          className="mx-auto mb-6 w-32 animate-[float_3s_ease-in-out_infinite]"
        />
      </div>

      <h2 className="text-3xl font-bold text-secondary-peach">
        Invocador não encontrado
      </h2>

      <p className="mt-3 text-secondary-peach/70 text-lg">
        Não encontramos{" "}
        <span className="font-semibold text-secondary-peach">
            {searchedName}#{searchedTag}
        </span>{" "}
        nos registros da Riot.
      </p>

      <p className="mt-4 text-secondary-peach/60 max-w-2xl mx-auto">
        O poro farejou toda a Fenda do Invocador, mas não encontrou esse jogador.
        Verifique se o nome e a tag estão corretos e tente novamente.
      </p>

      <div className="mt-8 flex justify-center">
        <div className="bg-primary-blue px-6 py-5 border border-primary-wine/20 rounded-2xl max-w-md">
          <p className="text-xl">૮ ˶ᵔ ᵕ ᵔ˶ ა</p>
          <p className="mt-2 text-sm text-white/70">
            “Tente conferir maiúsculas, acentos, espaços e principalmente a tag.”
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => navigate("/")}
          className="rounded-lg bg-primary-blood px-6 py-3 font-semibold text-white hover:opacity-90 transition"
        >
          Voltar para início
        </button>

        <button
          onClick={() => navigate(-1)}
          className="rounded-lg border border-secondary-peach/30 px-6 py-3 font-semibold text-secondary-peach hover:bg-white/5 transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}