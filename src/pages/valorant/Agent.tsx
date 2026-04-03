import { useParams } from "react-router-dom";

const Agent = () => {
  const { name, tag } = useParams();

  return (
    <div className="min-h-screen bg-[#0a0a10] text-white flex items-center justify-center px-6">
      <div className="border border-white/10 bg-white/[0.03] p-8 shadow-2xl text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-red-300/70">
          Valorant Agent
        </p>
        <h1 className="mt-3 text-3xl font-bold">
          {name}#{tag}
        </h1>
        <p className="mt-4 text-white/65">
          Essa página vai receber o backend do Valorant.
        </p>
      </div>
    </div>
  );
};

export default Agent;