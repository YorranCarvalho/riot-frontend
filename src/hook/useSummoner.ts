import { useEffect, useState } from "react";
import axios from "axios";

type Match = {
  matchId: string;
  gameCreation: number;
  gameDuration: number;
  queueId: number;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  win: boolean;
  role: string;
  farm: number;
  goldEarned: number;
  damage: number;
  items: number[];
  summonerSpells: number[];
};

type SummonerProfile = {
  basic: {
    puuid: string;
    name: string;
    tag: string;
    profileIconId: number;
    level: number;
  };
  mastery: unknown[];
  stats: {
    wins: number;
    losses: number;
    averageKda: number;
    mostPlayedRole: string;
  };
  recentMatches: Match[];
};

export function useSummoner(name?: string, tag?: string) {
  const [data, setData] = useState<SummonerProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name || !tag) {
      setLoading(false);
      setData(null);
      return;
    }

    let cancelled = false;

    const fetchSummoner = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<SummonerProfile>(
          `http://localhost:3001/summoner/profile/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`
        );

        if (!cancelled) {
          setData(response.data);
        }
      } catch (err: unknown) {
        if (cancelled) return;

        setData(null);

        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError("SUMMONER_NOT_FOUND");
          } else {
            setError("GENERIC_ERROR");
          }
        } else {
          setError("GENERIC_ERROR");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchSummoner();

    return () => {
      cancelled = true;
    };
  }, [name, tag]);

  return { data, loading, error };
}