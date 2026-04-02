type ScoutTrait = {
  key: string;
  label: string;
  color: "red" | "green" | "yellow" | "blue" | "purple" | "pink";
  description: string;
};

interface Props {
  traits: ScoutTrait[];
}

function getTraitClasses(color: ScoutTrait["color"]) {
  switch (color) {
    case "red":
      return "bg-red-500/20 text-red-300 border-red-400/20";
    case "green":
      return "bg-green-500/20 text-green-300 border-green-400/20";
    case "yellow":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-400/20";
    case "blue":
      return "bg-blue-500/20 text-blue-300 border-blue-400/20";
    case "purple":
      return "bg-purple-500/20 text-purple-300 border-purple-400/20";
    case "pink":
      return "bg-pink-500/20 text-pink-300 border-pink-400/20";
    default:
      return "bg-white/10 text-white border-white/10";
  }
}

export default function ScoutTraits({ traits }: Props) {
  if (!traits.length) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-primary-blue p-5 shadow-xl">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">Scout Traits</h3>
        <p className="text-sm text-secondary-text/60">
          Perfil calculado a partir das partidas recentes
        </p>
      </div>

      <div className="flex flex-wrap gap-2 overflow-visible">
        {traits.map((trait) => (
          <div key={trait.key} className="relative group">
            <span
              className={`cursor-default rounded-md border px-3 py-1 text-sm font-semibold transition-all ${getTraitClasses(
                trait.color
              )}`}
            >
              {trait.label}
            </span>

            <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-64 -translate-x-1/2 rounded-xl border border-white/10 bg-[#11162a] px-4 py-3 text-sm text-white opacity-0 shadow-2xl transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1">
              <p className="font-semibold text-secondary-peach">{trait.label}</p>
              <p className="mt-1 text-secondary-text/75">{trait.description}</p>

              <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-b border-white/10 bg-[#11162a]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}