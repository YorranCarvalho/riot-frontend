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
  csPerMin: number;
  goldEarned: number;
  goldPerMin: number;
  damage: number;
  damagePerMin: number;
  items: number[];
  summonerSpells: number[];
  performanceScore?: number;
  performanceLabel?: "Great" | "Good" | "Average" | "Poor";
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
  averageKda: number;
  avgCsPerMin?: number;
  avgDamagePerMin?: number;
  trend?: "up" | "stable" | "down";
};

export type ChampionPoolRaw = {
  championName: string;
  games?: number;
  wins?: number;
  losses?: number;
  winRate?: number;
  averageKda?: number;
  avgCsPerMin?: number;
  avgDamagePerMin?: number;
  trend?: "up" | "stable" | "down";
};

export type SummonerProfile = {
  basic: {
    puuid: string;
    name: string;
    tag: string;
    profileIconId: number;
    level: number;
  };

  mastery: Array<{
    championId: number;
    championLevel: number;
    championPoints: number;
  }>;

  stats: {
    wins: number;
    losses: number;
    averageKda: number;
    averageCsPerMin?: number;
    averageDamagePerMin?: number;
    averageGoldPerMin?: number;
    mostPlayedRole: string;
  };

  scores: PlayerScores & {
    scoutScore?: number;
    recentForm?: number;
    mechanics?: number;
    championPool?: number;
    roleConfidence?: number;
    riskControl?: number;
    advancedConsistencyScore?: number;
  };

  recentMatches: Match[];

  traits: ScoutTrait[];

  ranked: {
    soloDuo: RankedQueue;
    flex: RankedQueue;
  };

  championPool?: ChampionPoolRow[];

  overview?: {
    scoutScore: number;
    scoutTier: "Elite" | "Strong" | "Good" | "Average" | "Risky";
    verdict: string;
    primaryRole: string;
    sampleSize: number;
    tags: string[];
    strengths: string[];
    weaknesses: string[];
  };

  trends?: {
    last10WinRate: number;
    last20WinRate: number;
    recentTrend: "up" | "stable" | "down";
    streak: {
      type: "win" | "loss" | "none";
      count: number;
    };
  };

  averages?: {
    games: number;
    wins: number;
    losses: number;
    winRate: number;
    kills: number;
    deaths: number;
    assists: number;
    kda: number;
    csPerMin: number;
    damagePerMin: number;
    goldPerMin: number;
    visionPerMin: number;
    killParticipation: number;
    gameDurationAvg: number;
  };

  warnings?: string[];
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

export interface PlayerScores {
  performanceScore: number;
  kdaScore: number;
  csScore: number;
  damageScore: number;
  goldScore: number;
  visionScore: number;
  winRateScore: number;
  deathScore: number;
  consistencyScore: number;
}