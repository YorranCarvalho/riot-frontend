import { getChampionIconUrl, getItemIconUrl } from "../../constants/game";
import type { MatchDetailsResponse } from "../../types/summoner";

interface Props {
  details: MatchDetailsResponse;
}

function getRoleLabel(role: string) {
  switch (role) {
    case "TOP":
      return "Top";
    case "JUNGLE":
      return "Jungle";
    case "MIDDLE":
      return "Mid";
    case "BOTTOM":
      return "ADC";
    case "UTILITY":
      return "Support";
    default:
      return role || "Unknown";
  }
}

function StatBlock({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
      <p className="text-[11px] uppercase tracking-[0.1em] text-white/45">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function TeamPlayerCard({
  player,
}: {
  player: MatchDetailsResponse["blueTeam"]["participants"][number];
}) {
  const displayName = player.riotIdGameName || player.summonerName;

  return (
    <div className="rounded-xl border border-white/10 bg-black/10 p-3">
      <div className="flex items-start gap-3">
        <img
          src={getChampionIconUrl(player.championName)}
          alt={player.championName}
          className="h-12 w-12 shrink-0 rounded-xl border border-white/10"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {displayName}
          </p>

          <p className="mt-1 text-xs text-white/55">
            {player.championName} • {getRoleLabel(player.role)} • Lv. {player.champLevel}
          </p>

          <p className="mt-2 text-sm font-medium text-white">
            {player.kills}/{player.deaths}/{player.assists}
          </p>

          <p className="text-xs text-white/55">
            KDA {player.kda.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <StatBlock label="Farm" value={player.farm} />
        <StatBlock label="Dano" value={player.damage.toLocaleString("pt-BR")} />
        <StatBlock label="Gold" value={player.goldEarned.toLocaleString("pt-BR")} />
        <StatBlock label="Role" value={getRoleLabel(player.role)} />
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {player.items.map((itemId, index) =>
          itemId ? (
            <img
              key={`${player.puuid}-${index}-${itemId}`}
              src={getItemIconUrl(itemId)}
              alt={`Item ${itemId}`}
              className="h-8 w-8 rounded-md border border-white/10 bg-black/20"
            />
          ) : (
            <div
              key={`${player.puuid}-${index}-empty`}
              className="h-8 w-8 rounded-md border border-white/10 bg-white/5"
            />
          )
        )}
      </div>
    </div>
  );
}

function TeamBlock({
  title,
  teamClassName,
  participants,
}: {
  title: string;
  teamClassName: string;
  participants: MatchDetailsResponse["blueTeam"]["participants"];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className={`text-sm font-bold uppercase tracking-[0.12em] ${teamClassName}`}>
          {title}
        </h4>

        <span className="shrink-0 text-xs text-white/45">
          {participants.length} jogadores
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {participants.map((player) => (
          <TeamPlayerCard
            key={`${player.teamId}-${player.puuid}`}
            player={player}
          />
        ))}
      </div>
    </div>
  );
}

export default function MatchDetailsPanel({ details }: Props) {
  const { player, blueTeam, redTeam } = details;

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-[#151529] p-4">
      <div className="mb-5 flex flex-col gap-4 border-b border-white/10 pb-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <img
            src={getChampionIconUrl(player.championName)}
            alt={player.championName}
            className="h-16 w-16 shrink-0 rounded-2xl border border-white/10"
          />

          <div className="min-w-0">
            <p className="text-lg font-bold text-white">{player.championName}</p>

            <p className="text-sm text-white/60">
              {player.win ? "Vitória" : "Derrota"} • {player.kills}/{player.deaths}/{player.assists} • KDA {player.kda.toFixed(2)}
            </p>

            <p className="text-sm text-white/45">
              {player.farm} farm • {player.goldEarned.toLocaleString("pt-BR")} gold • {player.damage.toLocaleString("pt-BR")} dano
            </p>
          </div>
        </div>

        <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 xl:w-auto">
          <p className="text-xs uppercase tracking-[0.12em] text-white/45">
            Match ID
          </p>
          <p className="break-all text-sm font-medium text-white">
            {details.matchId}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
        <TeamBlock
          title={blueTeam.win ? "Blue Team • Win" : "Blue Team • Loss"}
          teamClassName={blueTeam.win ? "text-emerald-300" : "text-sky-300"}
          participants={blueTeam.participants}
        />

        <TeamBlock
          title={redTeam.win ? "Red Team • Win" : "Red Team • Loss"}
          teamClassName={redTeam.win ? "text-emerald-300" : "text-rose-300"}
          participants={redTeam.participants}
        />
      </div>
    </div>
  );
}