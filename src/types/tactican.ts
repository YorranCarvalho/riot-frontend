export interface TacticianAccount {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface TacticianProfileData {
  summonerId?: string | null;
  accountId?: string | null;
  profileIconId?: number | null;
  summonerLevel?: number | null;
  region?: string | null;
}

export interface TacticianRanked {
  queueType?: string | null;
  tier?: string | null;
  rank?: string | null;
  leaguePoints?: number | null;
  wins?: number | null;
  losses?: number | null;
}

export interface TacticianTrait {
  name: string;
  numUnits: number;
  style: number;
  tierCurrent: number;
  tierTotal: number;
}

export interface TacticianUnit {
  characterId: string;
  itemNames: string[];
  tier?: number | null;
  rarity?: number | null;
  chosen?: string | null;
}

export interface TacticianMatch {
  matchId: string;
  queueId?: number | null;
  queueLabel?: string | null;
  gameDatetime?: number | null;
  gameLengthSeconds?: number | null;
  placement?: number | null;
  level?: number | null;
  lastRound?: number | null;
  playersEliminated?: number | null;
  timeEliminated?: number | null;
  augments?: string[];
  traits: TacticianTrait[];
  units: TacticianUnit[];
}

export interface TacticianProfileResponse {
  account: TacticianAccount;
  profile?: TacticianProfileData | null;
  ranked?: TacticianRanked | null;
  recentMatches?: TacticianMatch[];
  message?: string;
}