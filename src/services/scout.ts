import axios from "axios";
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
  const response = await axios.get(
    `http://localhost:3001/scout/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`
  );

  return response.data;
}

export async function getSummonerMatches(
  name: string,
  tag: string,
  page = 1,
  limit = 10
) {
  const response = await axios.get<PaginatedMatchesResponse>(
    `http://localhost:3001/scout/${encodeURIComponent(name)}/${encodeURIComponent(tag)}/matches`,
    {
      params: { page, limit },
    }
  );

  return response.data;
}

export async function getMatchDetails(matchId: string, puuid: string) {
  const response = await axios.get<MatchDetailsResponse>(
    `http://localhost:3001/scout/match/${encodeURIComponent(matchId)}/${encodeURIComponent(puuid)}`
  );

  return response.data;
}