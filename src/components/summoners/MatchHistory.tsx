import { useState } from "react";
import { getChampionIconUrl, getItemIconUrl } from "../../constants/game";
import { getMatchDetails } from "../../services/matches";
import type { Match, MatchDetailsResponse } from "../../types/summoner";
import MatchDetailsPanel from "./MatchDetailPanel";
import { getSummonerSpellIconUrl } from "../../constants/summonerSpells";
import { formatMatchDateTime } from "../../constants/dateMatch";

interface Props {
  matches: Match[];
  puuid: string;
}

function formatDuration(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}m ${String(sec).padStart(2, "0")}s`;
}

export default function MatchHistory({ matches, puuid }: Props) {
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);
  const [loadingMatchId, setLoadingMatchId] = useState<string | null>(null);
  const [detailsCache, setDetailsCache] = useState<Record<string, MatchDetailsResponse>>({});

  async function handleToggleDetails(matchId: string) {
    if (expandedMatchId === matchId) {
      setExpandedMatchId(null);
      return;
    }

    setExpandedMatchId(matchId);

    if (detailsCache[matchId]) {
      return;
    }

    try {
      setLoadingMatchId(matchId);
      const details = await getMatchDetails(matchId, puuid);

      setDetailsCache((prev) => ({
        ...prev,
        [matchId]: details,
      }));
    } catch (error) {
      console.error("Erro ao buscar detalhes da partida:", error);
    } finally {
      setLoadingMatchId(null);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-primary-blue p-5 shadow-xl">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white">Histórico de partidas</h3>
          <p className="text-sm text-secondary-text/60">
            Últimas partidas encontradas para este invocador
          </p>
        </div>

        <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-secondary-text/70">
          {matches.length} partidas
        </span>
      </div>

      <div className="space-y-4">
        {matches.map((match) => {
          const isExpanded = expandedMatchId === match.matchId;
          const isLoading = loadingMatchId === match.matchId;
          const details = detailsCache[match.matchId];

          return (
            <div
              key={match.matchId}
              className={`rounded-2xl border p-4 transition ${
                match.win
                  ? "border-emerald-500/20 bg-emerald-500/10"
                  : "border-rose-500/20 bg-rose-500/10"
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={getChampionIconUrl(match.championName)}
                      alt={match.championName}
                      className="h-16 w-16 rounded-xl"
                    />

                    <div className="flex flex-col gap-1">
                      {match.summonerSpells?.map((spellId) => {
                        const icon = getSummonerSpellIconUrl(spellId);
                        if (!icon) return null;

                        return (
                          <img
                            key={`${match.matchId}-spell-${spellId}`}
                            src={icon}
                            alt={`Spell ${spellId}`}
                            className="h-7 w-7 rounded-md border border-white/10"
                          />
                        );
                      })}
                    </div>

                    <div className="min-w-0">
                      <p className="text-lg font-semibold text-white">
                        {match.championName}
                      </p>
                      <p className="text-sm text-white/60">
                        {match.win ? "Vitória" : "Derrota"} • {match.role} • {formatDuration(match.gameDuration)} • {formatMatchDateTime(match.gameCreation)}
                      </p>
                      <p className="mt-1 text-sm text-secondary-text/90">
                        {match.kills}/{match.deaths}/{match.assists} • KDA {match.kda}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="grid grid-cols-3 gap-4 text-sm lg:min-w-[260px]">
                      <div>
                        <p className="text-secondary-text/55">Farm</p>
                        <p className="font-semibold text-white">{match.farm}</p>
                      </div>
                      <div>
                        <p className="text-secondary-text/55">Dano</p>
                        <p className="font-semibold text-white">
                          {match.damage.toLocaleString("pt-BR")}
                        </p>
                      </div>
                      <div>
                        <p className="text-secondary-text/55">Ouro</p>
                        <p className="font-semibold text-white">
                          {match.goldEarned.toLocaleString("pt-BR")}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleDetails(match.matchId)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                      aria-label={isExpanded ? "Fechar detalhes da partida" : "Abrir detalhes da partida"}
                    >
                      <span
                        className={`text-lg transition-transform ${
                          isExpanded ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {match.items.map((itemId, index) =>
                    itemId ? (
                      <img
                        key={`${match.matchId}-${index}-${itemId}`}
                        src={getItemIconUrl(itemId)}
                        alt={`Item ${itemId}`}
                        className="h-10 w-10 rounded-md border border-white/10 bg-black/10"
                      />
                    ) : (
                      <div
                        key={`${match.matchId}-${index}-empty`}
                        className="h-10 w-10 rounded-md border border-white/10 bg-white/5"
                      />
                    )
                  )}
                </div>

                {isExpanded && isLoading && (
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/65">
                    Carregando detalhes da partida...
                  </div>
                )}

                {isExpanded && !isLoading && details && (
                  <MatchDetailsPanel details={details} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}