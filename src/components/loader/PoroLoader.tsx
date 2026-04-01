export default function PoroLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      <img
        src="/images/poro.gif" // seu gif aqui
        alt="Carregando..."
        className="w-28 h-28 object-contain"
      />

      <div className="text-center">
        <p className="text-lg font-semibold animate-pulse">
          Procurando invocador...
        </p>

        <p className="text-sm text-secondary-peach/70 mt-1">
          O poro foi explorar o Rift 🐾
        </p>
      </div>
    </div>
  );
}