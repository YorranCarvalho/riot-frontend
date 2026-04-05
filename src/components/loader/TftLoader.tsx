export default function TftLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">

      {/* Avatar estilo tactician */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
        
        <img
          src="/images/poro.gif" // pode trocar depois
          alt="Carregando..."
          className="relative w-24 h-24 object-contain drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]"
        />
      </div>

      {/* Texto */}
      <div className="text-center">
        <p className="text-lg font-semibold text-cyan-300 animate-pulse">
          Analisando estratégia...
        </p>

        <p className="text-sm text-cyan-100/60 mt-1">
          O tactician está montando as comps 🧠
        </p>
      </div>

      {/* barra animada */}
      <div className="w-40 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full w-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 animate-[loading_1.2s_infinite]" />
      </div>

      {/* animação */}
      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}
      </style>
    </div>
  );
}