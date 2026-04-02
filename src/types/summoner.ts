export type Match = {
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

export type ScoutTrait = {
  key: string;
  label: string;
  color: "red" | "green" | "yellow" | "blue" | "purple" | "pink";
  description: string;
};

export type RankedSeason = {
  season: string;
  tier: string;
  lp: number;
};

export type RankedQueue = {
  currentTier: string;
  currentLp: number;
  seasons: RankedSeason[];
};

export type ChampionPoolRow = {
  championName: string;
  games: number;
  wins: number;
  losses: number;
  winRate: number;
  avgKills: number;
  avgDeaths: number;
  avgAssists: number;
  kda: number;
  avgCs: number;
  avgGold: number;
  recentTrend?: ("W" | "L")[];
};

export type SummonerProfile = {
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
  traits: ScoutTrait[];
  ranked: {
    soloDuo: RankedQueue;
    flex: RankedQueue;
  };
  championPool?: ChampionPoolRow[];
};

export type ScoutScore = {
  overall: number;
  laning: number;
  fighting: number;
  consistency: number;
  versatility: number;
  farming: number;
};

export type ScoutInsight = {
  key: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
};

export type PlayerAnalysis = {
  filteredMatches: Match[];
  championPool: ChampionPoolRow[];
  scoutScore: ScoutScore;
  intelligence: ScoutInsight[];
  derivedTraits: ScoutTrait[];
};

export type MatchDetailParticipant = {
  puuid: string;
  summonerName: string;
  riotIdGameName?: string;
  riotIdTagline?: string;
  championName: string;
  teamId: number;
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
  champLevel: number;
};

export type MatchDetailTeam = {
  teamId: number;
  win: boolean;
  participants: MatchDetailParticipant[];
};

export type MatchDetailsResponse = {
  matchId: string;
  queueId: number;
  gameCreation: number;
  gameDuration: number;
  player: MatchDetailParticipant;
  blueTeam: MatchDetailTeam;
  redTeam: MatchDetailTeam;
};