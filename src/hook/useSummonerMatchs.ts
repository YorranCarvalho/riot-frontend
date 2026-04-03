import { useEffect, useState } from "react";
import axios from "axios";
import { getSummonerMatches, type PaginatedMatchesResponse } from "../services/scout";

export function useSummonerMatches(
  name?: string,
  tag?: string,
  page = 1,
  limit = 10
) {
  const [data, setData] = useState<PaginatedMatchesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name || !tag) {
      setData(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchMatches = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getSummonerMatches(name, tag, page, limit);

        if (!cancelled) {
          setData(response);
        }
      } catch (err: unknown) {
        if (cancelled) return;

        setData(null);

        if (axios.isAxiosError(err)) {
          setError(err.response?.status === 404 ? "SUMMONER_NOT_FOUND" : "GENERIC_ERROR");
        } else {
          setError("GENERIC_ERROR");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchMatches();

    return () => {
      cancelled = true;
    };
  }, [name, tag, page, limit]);

  return { data, loading, error };
}