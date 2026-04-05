import type { TacticianLobbyPlayer } from "../../types/tactican";
import { TftTraitChips } from "./TftTraitChips";
import { TftUnitStrip } from "./TftUnitStrip";
import { getPlacementClasses } from "../../constants/tacticianFormat";
import type { TftAssets } from "../../utils/tft/tftAssets";

interface Props {
  player: TacticianLobbyPlayer;
  assets: TftAssets;
}

export function TftMatchLobbyRow({ player, assets }: Props) {
  const playerName = player.riotIdGameName
    ? `${player.riotIdGameName}${player.riotIdTagLine ? ` #${player.riotIdTagLine}` : ""}`
    : "Unknown player";

  return (
    <div
      className={`rounded-2xl border p-4 ${
        player.isCurrentPlayer
          ? "border-cyan-300/35 bg-cyan-400/[0.08] shadow-[0_0_0_1px_rgba(103,232,249,0.12)]"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 xl:w-[280px]">
          <div className="flex items-center gap-3">
            <div
              className={`rounded-xl border px-3 py-2 text-sm font-bold ${getPlacementClasses(player.placement)}`}
            >
              #{player.placement ?? "-"}
            </div>

            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">
                {playerName}
              </div>
              <div className="mt-1 text-xs text-white/50">
                Level {player.level ?? "-"} • Last round {player.lastRound ?? "-"} • Eliminations{" "}
                {player.playersEliminated ?? 0}
              </div>
            </div>

            {player.isCurrentPlayer ? (
              <div className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
                You
              </div>
            ) : null}
          </div>

          <div className="mt-3">
            <TftTraitChips traits={player.traits} assets={assets} limit={6} />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <TftUnitStrip units={player.units} assets={assets} size="sm" />
        </div>
      </div>
    </div>
  );
}