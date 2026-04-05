import type { TacticianLobbyPlayer } from "../../types/tactican";
import type { TftAssets } from "../../utils/tft/tftAssets";
import { TftMatchLobbyRow } from "./TftMatchLobbyRow";

interface Props {
  lobby: TacticianLobbyPlayer[];
  assets: TftAssets;
}

export function TftMatchExpandedLobby({ lobby, assets }: Props) {
  if (!lobby?.length) {
    return <p className="text-sm text-white/55">No lobby details available.</p>;
  }

  return (
    <div className="space-y-3">
      {lobby.map((player) => (
        <TftMatchLobbyRow
          key={`${player.puuid}-${player.placement}`}
          player={player}
          assets={assets}
        />
      ))}
    </div>
  );
}