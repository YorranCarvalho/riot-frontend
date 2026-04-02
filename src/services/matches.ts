import axios from "axios";
import type { MatchDetailsResponse } from "../types/summoner";

export async function getMatchDetails(matchId: string, puuid: string) {
  const response = await axios.get<MatchDetailsResponse>(
    `http://localhost:3001/scout/match/${encodeURIComponent(matchId)}/${encodeURIComponent(puuid)}`
  );

  return response.data;
}