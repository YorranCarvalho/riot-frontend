import { useMemo, useState } from "react";
import type { TacticianMatch } from "../../types/tactican";
import { TftTraitChips } from "./TftTraitChips";
import { TftUnitStrip } from "./TftUnitStrip";
import { TftMatchExpandedLobby } from "./TftMatchExpandedLobby";
import { formatGameLength, formatTftMatchDate, getPlacementClasses } from "../../constants/tacticianFormat";
import type { TftAssets } from "../../utils/tft/tftAssets";

interface Props {
  match: TacticianMatch;
  assets: TftAssets;
}

export function TftMatchCard({ match, assets }: Props) {
  const [expanded, setExpanded] = useState(false);

  const headerBadgeClasses = useMemo(
    () => getPlacementClasses(match.placement),
    [match.placement]
  );

  return (
    <article className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1324]/90 shadow-[0_12px_50px_rgba(0,0,0,0.28)]">
      <div className="p-5 md:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex min-w-0 gap-4">
            <div
              className={`flex min-w-[84px] flex-col items-center justify-center rounded-2xl border px-3 py-4 ${headerBadgeClasses}`}
            >
              <span className="text-3xl font-black leading-none">
                {match.placement ?? "-"}
              </span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-wider">
                place
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-300/70">
                <span>{match.queueLabel}</span>
                <span className="text-white/20">•</span>
                <span>{formatTftMatchDate(match.gameDatetime)}</span>
                <span className="text-white/20">•</span>
                <span>{formatGameLength(match.gameLengthSeconds)}</span>
                <span className="text-white/20">•</span>
                <span>Patch {match.patch}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/65">
                <span>Level {match.level ?? "-"}</span>
                <span>Last round {match.lastRound ?? "-"}</span>
                <span>Eliminations {match.playersEliminated ?? 0}</span>
                <span>Damage {match.totalDamageToPlayers ?? 0}</span>
              </div>

              <div className="mt-4">
                <TftTraitChips traits={match.traits} limit={6} />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/35 hover:bg-cyan-400/15"
          >
            {expanded ? "Hide lobby" : "Show lobby"}
          </button>
        </div>

        <div className="mt-5">
          <TftUnitStrip units={match.units} assets={assets} />
        </div>
      </div>

      {expanded ? (
        <div className="border-t border-white/10 bg-[#08101f]/80 p-5 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/70">
              Match Lobby
            </p>
            <span className="text-sm text-white/45">
              {match.lobby?.length ?? 0} players
            </span>
          </div>

          <TftMatchExpandedLobby lobby={match.lobby} assets={assets} />
        </div>
      ) : null}
    </article>
  );
}