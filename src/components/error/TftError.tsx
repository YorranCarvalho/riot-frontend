interface Props {
  type?: "NOT_FOUND" | "GENERIC";
  name?: string;
  tag?: string;
}

export default function TftError({ type = "GENERIC", name, tag }: Props) {
  return (
    <div className="w-full flex justify-center px-4 py-16">
      <div className="w-full max-w-2xl">

        <div className="rounded-3xl border border-white/10 bg-[#0d162e] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.35)] text-center">

          {/* Glow decor */}
          <div className="absolute inset-0 pointer-events-none opacity-20 blur-3xl bg-cyan-500/10 rounded-3xl" />

          {type === "NOT_FOUND" ? (
            <>
              <p className="text-xl font-semibold text-cyan-300">
                Tactician não encontrado
              </p>

              <p className="text-sm text-white/60 mt-2">
                Verifique o nome{" "}
                <span className="text-cyan-300 font-medium">
                  {name}#{tag}
                </span>{" "}
                e tente novamente.
              </p>
            </>
          ) : (
            <>
                {/* imagem */}
                <div className="mb-4 flex justify-center">
                    <img
                    src="/images/poro-triste.png"
                    alt="Erro"
                    className="h-20 w-20 object-contain opacity-90 drop-shadow-[0_0_12px_rgba(248,113,113,0.5)]"
                    />
                </div>

                <p className="text-xl font-semibold text-red-400">
                    Erro ao analisar estrategista
                </p>

                <p className="text-sm text-white/60 mt-2">
                    O tactician perdeu a estratégia
                </p>
            </>
          )}

          {/* botão opcional (recomendado) */}
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/20 text-cyan-300 text-sm transition"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </div>
  );
}