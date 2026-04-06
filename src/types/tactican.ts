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

export interface TacticianMatchCompanion {
  contentId: string | null;
  itemId: number | null;
  skinId: number | null;
  species: string | null;
}

export interface TacticianLobbyPlayer {
  puuid: string;
  riotIdGameName: string | null;
  riotIdTagLine: string | null;
  placement: number | null;
  level: number | null;
  lastRound: number | null;
  playersEliminated: number | null;
  timeEliminated: number | null;
  totalDamageToPlayers: number | null;
  augments: string[];
  traits: TacticianMatchTrait[];
  units: TacticianMatchUnit[];
  companion: TacticianMatchCompanion | null;
  isCurrentPlayer: boolean;
}

export interface TacticianMatch {
  matchId: string;
  queueId: number | null;
  queueLabel: string;
  gameDatetime: number | null;
  gameLengthSeconds: number | null;
  patch: string;
  placement: number | null;
  level: number | null;
  lastRound: number | null;
  playersEliminated: number | null;
  timeEliminated: number | null;
  totalDamageToPlayers: number | null;
  augments: string[];
  traits: TacticianMatchTrait[];
  units: TacticianMatchUnit[];
  companion: TacticianMatchCompanion | null;
  lobby: TacticianLobbyPlayer[];
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

  bestPlacement: number | null;
  worstPlacement: number | null;
  placementSpread: number | null;
  avgTop4Placement: number | null;
  avgBottom4Placement: number | null;
  consistencyScore: number | null;

  placementDistribution: Record<number, number>;
  recentForm: {
    avgLast5: number;
    avgLast10: number;
    trend: "up" | "down" | "stable";
  };

  insights: string[];
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

export interface TftChampionTraitRef {
  name?: string;
  id?: string;
}

export interface TftChampionAbilityVariables {
  name?: string;
  value?: number[];
}

export interface TftChampionAbility {
  name?: string;
  desc?: string;
  iconPath?: string;
  mana?: number | null;
  maxMana?: number | null;
  variables?: TftChampionAbilityVariables[];
}

export interface TftChampionCharacterRecord {
  path?: string;
  character_id?: string;
  rarity?: number | null;
  display_name?: string;
  squareIconPath?: string;
  traits?: TftChampionTraitRef[];
}

export interface TftChampionEntry {
  name?: string;
  cost?: number | null;
  traits?: TftChampionTraitRef[];
  ability?: TftChampionAbility;
  character_record?: TftChampionCharacterRecord;
}

export interface NormalizedTftChampion {
  id: string;
  name: string;
  icon: string;
  cost: number;
  traits: string[];
  abilityName: string;
  abilityDescription: string;
  abilityIcon?: string;
  manaStart: number;
  manaMax: number;
}