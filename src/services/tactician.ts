import type { TacticianProfileResponse } from "../types/tactican";
import { api } from "./api";

export async function getTacticianProfile(name: string, tag: string) {
  const response = await api.get<TacticianProfileResponse>(
    `/tactician/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`
  );

  return response.data;
}