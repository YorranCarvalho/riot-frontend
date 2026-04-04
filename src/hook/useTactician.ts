import { useEffect, useState } from "react";
import axios from "axios";
import { getTacticianProfile } from "../services/tactician";
import type { TacticianProfileResponse } from "../types/tactican";

export function useTactician(name?: string, tag?: string) {
  const [data, setData] = useState<TacticianProfileResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name || !tag) {
      setLoading(false);
      setData(null);
      setError(null);
      return;
    }

    let cancelled = false;

    const fetchTactician = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getTacticianProfile(name, tag);

        if (!cancelled) {
          setData(response);
        }
      } catch (err: unknown) {
        if (cancelled) return;

        setData(null);

        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError("TACTICIAN_NOT_FOUND");
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

    fetchTactician();

    return () => {
      cancelled = true;
    };
  }, [name, tag]);

  return { data, loading, error };
}