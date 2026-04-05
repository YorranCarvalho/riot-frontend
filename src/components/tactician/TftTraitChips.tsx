import { prettyTraitName } from "../../constants/tacticianAssets";
import { getTraitStyleClasses } from "../../constants/tacticianFormat";
import type { TacticianMatchTrait } from "../../types/tactican";
import { normalizeTraitTooltip } from "../../utils/normalizers/normalizeTriatTooltip";
import type { TftAssets } from "../../utils/tft/tftAssets";

interface Props {
  traits: TacticianMatchTrait[];
  assets: TftAssets;
  limit?: number;
}

function formatBreakpoint(min?: number, max?: number) {
  if (min == null) return "?";
  if (max == null || max >= 999 || max >= 25000) return `${min}+`;
  if (min === max) return `${min}`;
  return `${min}`;
}

export function TftTraitChips({ traits, assets, limit = 6 }: Props) {
  const visibleTraits = traits.slice(0, limit);

  if (!visibleTraits.length) {
    return <span className="text-sm text-white/45">No active traits</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {visibleTraits.map((trait) => {
        const meta = assets.traitMeta?.[trait.name];
        const fallbackTitle = prettyTraitName(trait.name);
        const icon = meta?.icon || assets.traits?.[trait.name];

        const normalized = normalizeTraitTooltip(meta, trait, fallbackTitle);

        return (
          <div
            key={`${trait.name}-${trait.tierCurrent}-${trait.numUnits}`}
            className="group relative"
          >
            <div
              className={`flex cursor-help items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${getTraitStyleClasses(
                trait.style
              )}`}
            >
              {icon ? (
                <img
                  src={icon}
                  alt={normalized.title}
                  className="h-3.5 w-3.5 object-contain opacity-90"
                />
              ) : null}

              <span>
                {normalized.title}
                {trait.numUnits ? ` • ${trait.numUnits}` : ""}
              </span>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-80 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#08111f]/95 p-3 text-left opacity-0 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-md transition duration-150 group-hover:opacity-100">
              <div className="flex items-start gap-3">
                {icon ? (
                  <img
                    src={icon}
                    alt={normalized.title}
                    className="mt-0.5 h-8 w-8 shrink-0 rounded-lg border border-white/10 bg-white/[0.03] p-1"
                  />
                ) : null}

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">
                    {normalized.title}
                  </p>
                  <p className="mt-1 text-xs text-cyan-300/80">
                    Tier {trait.tierCurrent ?? "-"}
                    {trait.tierTotal ? ` / ${trait.tierTotal}` : ""}
                    {trait.numUnits ? ` • ${trait.numUnits} units` : ""}
                  </p>
                </div>

                <div
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getTraitStyleClasses(
                    trait.style
                  )}`}
                >
                  Style {trait.style ?? 0}
                </div>
              </div>

              <p className="mt-3 whitespace-pre-line text-xs leading-5 text-white/80">
                {normalized.description}
              </p>

              {normalized.rows.length ? (
                <div className="mt-3 space-y-1.5">
                  {normalized.rows.map((row, index) => {
                    const isActive =
                      trait.numUnits != null &&
                      row.minUnits != null &&
                      trait.numUnits >= row.minUnits &&
                      (row.maxUnits == null || trait.numUnits <= row.maxUnits);

                    return (
                      <div
                        key={`${trait.name}-row-${index}`}
                        className={`flex items-start gap-3 rounded-lg border px-2.5 py-2 text-xs transition ${
                          isActive
                            ? "border-yellow-400/40 bg-yellow-500/10 text-white"
                            : "border-white/10 bg-white/[0.03] text-white/75"
                        }`}
                      >
                        <div
                          className={`flex h-6 min-w-6 items-center justify-center rounded-md border px-1 text-[11px] font-bold ${
                            isActive
                              ? "border-yellow-400/50 bg-yellow-500/20 text-yellow-300"
                              : "border-white/10 bg-white/[0.04] text-white/65"
                          }`}
                        >
                          {formatBreakpoint(row.minUnits, row.maxUnits)}
                        </div>

                        <div className="min-w-0 flex-1 leading-5">
                          {row.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}