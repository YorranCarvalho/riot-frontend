export type TftQueueKey =
  | "all"
  | "ranked"
  | "normal"
  | "hyper_roll"
  | "double_up";

export interface TacticianMatchTrait {
  name: string;
  numUnits: number;
  style: number;
  tierCurrent: number;
  tierTotal: number;
}

export interface TacticianMatchUnit {
  characterId: string;
  itemNames: string[];
  tier: number | null;
  rarity: number | null;
  chosen: string | null;
}

export interface TacticianMatch {
  matchId: string;
  queueId: number | null;
  queueLabel: string;
  gameDatetime: number | null;
  gameLengthSeconds: number | null;
  placement: number | null;
  level: number | null;
  lastRound: number | null;
  playersEliminated: number | null;
  timeEliminated: number | null;
  augments: string[];
  traits: TacticianMatchTrait[];
  units: TacticianMatchUnit[];
}

export interface TftOverview {
  totalGames: number;
  avgPlacement: number;
  top4Rate: number;
  winRate: number;
  avgGameTimeSeconds: number;
  avgLevel: number;
  avgLastRound: number;
  avgPlayersEliminated: number;
  estimatedDamage: number;
  favoriteChampionId: string | null;
  favoriteChampionCount: number;
  mostUsedItemId: string | null;
  mostUsedItemCount: number;
  mostUsedTraitId: string | null;
  mostUsedTraitCount: number;
}

export interface TftTopComp {
  key: string;
  games: number;
  avgPlacement: number;
  top4Rate: number;
  winRate: number;
  traitIds: string[];
  unitIds: string[];
}

export interface TftTopItem {
  itemId: string;
  games: number;
  top4Rate: number;
  avgPlacement: number;
}

export interface TftTopChampion {
  championId: string;
  games: number;
  top4Rate: number;
  avgPlacement: number;
}

export interface TftTrendEntry {
  matchId: string;
  placement: number;
  isTop4: boolean;
  isWin: boolean;
}

export interface TftPerformanceBucket {
  overview: TftOverview | null;
  topComps: TftTopComp[];
  topItems: TftTopItem[];
  topChampions: TftTopChampion[];
  trend: TftTrendEntry[];
}

export interface TacticianProfileResponse {
  account: {
    puuid: string;
    gameName: string;
    tagLine: string;
  };
  profile: {
    summonerId: string | null;
    accountId: string | null;
    profileIconId: number | null;
    summonerLevel: number | null;
    region: string;
  };
  ranked: {
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
  } | null;
  recentMatches: TacticianMatch[];
  performance: Record<TftQueueKey, TftPerformanceBucket>;
}