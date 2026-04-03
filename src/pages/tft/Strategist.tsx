import { useParams } from "react-router-dom";

const Strategist = () => {
  const { name, tag } = useParams();

  return (
    <div className="min-h-screen bg-primary-darkblue text-white flex items-center justify-center px-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">
          TFT Strategist
        </p>
        <h1 className="mt-3 text-3xl font-bold">
          {name}#{tag}
        </h1>
        <p className="mt-4 text-white/70">
          Essa página ainda vai receber o backend do TFT.
        </p>
      </div>
    </div>
  );
};

export default Strategist;