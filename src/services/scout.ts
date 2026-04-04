import { api } from "./api";
import type { Match, MatchDetailsResponse } from "../types/summoner";

export type PaginatedMatchesResponse = {
  items: Match[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export async function getSummonerProfile(name: string, tag: string) {
  const response = await api.get(
    `/scout/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`
  );

  return response.data;
}

export async function getSummonerMatches(
  name: string,
  tag: string,
  page = 1,
  limit = 10
) {
  const response = await api.get<PaginatedMatchesResponse>(
    `/scout/${encodeURIComponent(name)}/${encodeURIComponent(tag)}/matches`,
    {
      params: { page, limit },
    }
  );

  return response.data;
}

export async function getMatchDetails(matchId: string, puuid: string) {
  const response = await api.get<MatchDetailsResponse>(
    `/scout/match/${encodeURIComponent(matchId)}/${encodeURIComponent(puuid)}`
  );

  return response.data;
}