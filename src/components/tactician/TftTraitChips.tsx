
import { prettyTraitName } from "../../constants/tacticianAssets";
import { getTraitStyleClasses } from "../../constants/tacticianFormat";
import type { TacticianMatchTrait } from "../../types/tactican";

interface Props {
  traits: TacticianMatchTrait[];
  limit?: number;
}

export function TftTraitChips({ traits, limit = 6 }: Props) {
  const visibleTraits = traits.slice(0, limit);

  if (!visibleTraits.length) {
    return <span className="text-sm text-white/45">No active traits</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {visibleTraits.map((trait) => (
        <div
          key={`${trait.name}-${trait.tierCurrent}-${trait.numUnits}`}
          className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getTraitStyleClasses(trait.style)}`}
        >
          {prettyTraitName(trait.name)}
          {trait.numUnits ? ` • ${trait.numUnits}` : ""}
        </div>
      ))}
    </div>
  );
}