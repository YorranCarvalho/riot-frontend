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

function isRowActive(
  numUnits: number | undefined,
  minUnits?: number,
  maxUnits?: number
) {
  if (numUnits == null || minUnits == null) return false;
  const safeMax = maxUnits ?? Number.MAX_SAFE_INTEGER;
  return numUnits >= minUnits && numUnits <= safeMax;
}

function getStyleBadgeLabel(style?: number) {
  if (style === 6) return "Style 6";
  if (style === 5) return "Style 5";
  if (style === 4) return "Style 4";
  if (style === 3) return "Style 3";
  if (style === 2) return "Style 2";
  return `Style ${style ?? 0}`;
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
              className={`flex cursor-help items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium transition duration-150 ${getTraitStyleClasses(
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

            <div className="pointer-events-none absolute left-1/2 top-full z-40 mt-2 w-[320px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0a1020]/95 p-3 text-left opacity-0 shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur-md transition duration-150 group-hover:opacity-100">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  {icon ? (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <img
                        src={icon}
                        alt={normalized.title}
                        className="h-6 w-6 object-contain opacity-95"
                      />
                    </div>
                  ) : null}

                  <div className="min-w-0">
                    <p className="truncate text-[18px] font-semibold leading-none text-white">
                      {normalized.title}
                    </p>

                    <p className="mt-2 text-xs font-medium text-cyan-300/85">
                      Tier {trait.tierCurrent ?? "-"}
                      {trait.tierTotal ? ` / ${trait.tierTotal}` : ""}
                      {trait.numUnits ? ` • ${trait.numUnits} units` : ""}
                    </p>
                  </div>
                </div>

                <div
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getTraitStyleClasses(
                    trait.style
                  )}`}
                >
                  {getStyleBadgeLabel(trait.style)}
                </div>
              </div>

              {normalized.description ? (
                <p className="mt-4 whitespace-pre-line text-[13px] leading-6 text-white/80">
                  {normalized.description}
                </p>
              ) : null}

              {normalized.rows.length ? (
                <div className="mt-4 space-y-1.5">
                  {normalized.rows.map((row, index) => {
                    const active = isRowActive(
                      trait.numUnits,
                      row.minUnits,
                      row.maxUnits
                    );

                    return (
                      <div
                        key={`${trait.name}-row-${index}`}
                        className={`flex items-start gap-3 rounded-lg border px-2.5 py-2 transition ${
                          active
                            ? "border-yellow-400/35 bg-yellow-500/10"
                            : "border-white/8 bg-white/[0.03]"
                        }`}
                      >
                        <div
                          className={`flex h-7 min-w-7 shrink-0 items-center justify-center rounded-[4px] border text-[13px] font-bold ${
                            active
                              ? "border-yellow-400/50 bg-yellow-500/80 text-white"
                              : "border-white/10 bg-white/[0.04] text-white/75"
                          }`}
                        >
                          {formatBreakpoint(row.minUnits, row.maxUnits)}
                        </div>

                        <div
                          className={`min-w-0 flex-1 text-[14px] leading-5 ${
                            active ? "text-white" : "text-white/80"
                          }`}
                        >
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