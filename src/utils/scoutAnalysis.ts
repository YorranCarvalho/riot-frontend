import type { Match, ChampionPoolRow, ScoutTrait } from "../types/summoner";


export type QueueFilter =
  | "all"
  | "soloDuo"
  | "flex"
  | "aram"
  | "normal";
export type RoleFilter =
  | "all"
  | "TOP"
  | "JUNGLE"
  | "MIDDLE"
  | "BOTTOM"
  | "UTILITY"
  | "UNKNOWN";

export type RangeFilter = 10 | 20 | 30;

export type ScoutInsight = {
  key: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
};

export type ScoutScore = {
  overall: number;
  laning: number;
  fighting: number;
  consistency: number;
  versatility: number;
  farming: number;
};

export type PlayerAnalysis = {
  filteredMatches: Match[];
  championPool: ChampionPoolRow[];
  scoutScore: ScoutScore;
  intelligence: ScoutInsight[];
  derivedTraits: ScoutTrait[];
};

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function isRankedQueue(queueId: number) {
  return [420, 440, 700].includes(queueId);
}

export function isNormalQueue(queueId: number) {
  return [400, 430, 450, 490].includes(queueId);
}

export function filterMatches(
  matches: Match[],
  range: RangeFilter,
  queue: QueueFilter,
  role: RoleFilter
) {
  let result = [...matches];

  result = filterByQueueType(result, queue);

  if (role !== "all") {
    result = result.filter((match) => match.role === role);
  }

  return result.slice(0, range);
}

export function filterByQueueType(matches: Match[], queue: QueueFilter) {
  switch (queue) {
    case "soloDuo":
      return matches.filter((match) => match.queueId === 420);
    case "flex":
      return matches.filter((match) => match.queueId === 440);
    case "aram":
      return matches.filter((match) => match.queueId === 450);
    case "normal":
      return matches.filter((match) =>
        [400, 430, 490].includes(match.queueId)
      );
    default:
      return matches;
  }
}

export function buildChampionPoolFromMatches(matches: Match[]): ChampionPoolRow[] {
  const grouped = matches.reduce<Record<string, Match[]>>((acc, match) => {
    if (!acc[match.championName]) acc[match.championName] = [];
    acc[match.championName].push(match);
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([championName, games]) => {
      const totalGames = games.length;
      const wins = games.filter((game) => game.win).length;
      const losses = totalGames - wins;

      const totalKills = games.reduce((acc, game) => acc + game.kills, 0);
      const totalDeaths = games.reduce((acc, game) => acc + game.deaths, 0);

      const averageKda = (totalKills + games.reduce((acc, game) => acc + game.assists, 0)) /
        Math.max(1, totalDeaths);

      const avgCsPerMin =
        games.reduce((acc, game) => acc + game.csPerMin, 0) / totalGames;

      const avgDamagePerMin =
        games.reduce((acc, game) => acc + game.damagePerMin, 0) / totalGames;

      const winRate = (wins / totalGames) * 100;

      let trend: "up" | "stable" | "down" = "stable";
      const recentGames = games.slice(0, Math.ceil(totalGames / 2));
      const olderGames = games.slice(Math.ceil(totalGames / 2));

      const recentWr = recentGames.length
        ? (recentGames.filter((game) => game.win).length / recentGames.length) * 100
        : 0;

      const olderWr = olderGames.length
        ? (olderGames.filter((game) => game.win).length / olderGames.length) * 100
        : 0;

      if (recentWr - olderWr >= 10) trend = "up";
      if (olderWr - recentWr >= 10) trend = "down";

      return {
        championName,
        games: totalGames,
        wins,
        losses,
        winRate,
        averageKda,
        avgCsPerMin,
        avgDamagePerMin,
        trend,
      };
    })
    .sort((a, b) => b.games - a.games);
}

export function calculateScoutScore(
  matches: Match[],
  championPool: ChampionPoolRow[]
): ScoutScore {
  if (!matches.length) {
    return {
      overall: 0,
      laning: 0,
      fighting: 0,
      consistency: 0,
      versatility: 0,
      farming: 0,
    };
  }

  const wins = matches.filter((m) => m.win).length;
  const winRate = (wins / matches.length) * 100;

  const avgKda =
    matches.reduce((acc, match) => acc + match.kda, 0) / matches.length;

  const avgFarm =
    matches.reduce((acc, match) => acc + match.farm, 0) / matches.length;

  const deathsAvg =
    matches.reduce((acc, match) => acc + match.deaths, 0) / matches.length;

  const championDiversity = championPool.length;

  const fighting = clamp(winRate * 0.45 + avgKda * 12);
  const farming = clamp(avgFarm * 0.4);
  const versatility = clamp(championDiversity * 12);
  const consistency = clamp(100 - deathsAvg * 8);
  const laning = clamp(avgFarm * 0.35 + avgKda * 8);

  const overall = clamp(
    fighting * 0.28 +
      farming * 0.18 +
      versatility * 0.14 +
      consistency * 0.22 +
      laning * 0.18
  );

  return {
    overall: Math.round(overall),
    laning: Math.round(laning),
    fighting: Math.round(fighting),
    consistency: Math.round(consistency),
    versatility: Math.round(versatility),
    farming: Math.round(farming),
  };
}

export function buildScoutIntelligence(
  matches: Match[],
  championPool: ChampionPoolRow[]
): ScoutInsight[] {
  const insights: ScoutInsight[] = [];

  if (!matches.length) return insights;

  const wins = matches.filter((match) => match.win);
  const losses = matches.filter((match) => !match.win);

  const avgDeaths =
    matches.reduce((acc, match) => acc + match.deaths, 0) / matches.length;

  const avgFarm =
    matches.reduce((acc, match) => acc + match.farm, 0) / matches.length;

  const avgKda =
    matches.reduce((acc, match) => acc + match.kda, 0) / matches.length;

  const avgKdaWins =
    wins.length > 0
      ? wins.reduce((acc, match) => acc + match.kda, 0) / wins.length
      : 0;

  const avgKdaLosses =
    losses.length > 0
      ? losses.reduce((acc, match) => acc + match.kda, 0) / losses.length
      : 0;

  const kdaGap = avgKdaWins - avgKdaLosses;

  const topChampionGames = championPool[0]?.games ?? 0;
  const championDependency = topChampionGames / matches.length;

  const roleCount = matches.reduce<Record<string, number>>((acc, match) => {
    acc[match.role] = (acc[match.role] || 0) + 1;
    return acc;
  }, {});

  const mainRole = Object.entries(roleCount).sort((a, b) => b[1] - a[1])[0]?.[0];

  const mainRoleMatches = mainRole
    ? matches.filter((match) => match.role === mainRole)
    : [];

  const offRoleMatches = mainRole
    ? matches.filter((match) => match.role !== mainRole)
    : [];

  const mainRoleWinRate =
    mainRoleMatches.length > 0
      ? (mainRoleMatches.filter((match) => match.win).length / mainRoleMatches.length) * 100
      : 0;

  const offRoleWinRate =
    offRoleMatches.length > 0
      ? (offRoleMatches.filter((match) => match.win).length / offRoleMatches.length) * 100
      : 0;

  if (championDependency >= 0.5) {
    insights.push({
      key: "comfort-specialist",
      title: "Comfort Specialist",
      description: "Grande parte das partidas está concentrada em poucos campeões.",
      severity: "medium",
    });
  }

  if (avgDeaths >= 7) {
    insights.push({
      key: "high-risk",
      title: "High Risk Profile",
      description: "Média alta de mortes indica perfil agressivo e propenso a overextend.",
      severity: "high",
    });
  }

  if (avgFarm >= 180) {
    insights.push({
      key: "farm-consistency",
      title: "Strong Farming",
      description: "Apresenta boa consistência de farm nas partidas analisadas.",
      severity: "low",
    });
  }

  if (avgKda >= 4) {
    insights.push({
      key: "efficient-fighter",
      title: "Efficient Fighter",
      description: "Participa bem das lutas com boa eficiência de abates e assistências.",
      severity: "low",
    });
  }

  if (championPool.length <= 2 && matches.length >= 8) {
    insights.push({
      key: "narrow-pool",
      title: "Narrow Champion Pool",
      description: "Pool restrito pode facilitar target ban e leitura de draft.",
      severity: "medium",
    });
  }

  if (wins.length >= 2 && losses.length >= 2 && kdaGap >= 2.5) {
    insights.push({
      key: "snowball-dependent",
      title: "Snowball Dependent",
      description: "A performance cai bastante nas derrotas, indicando dependência maior de vantagem inicial.",
      severity: "high",
    });
  }

  if (mainRoleMatches.length >= 4 && offRoleMatches.length >= 3 && mainRoleWinRate - offRoleWinRate >= 20) {
    insights.push({
      key: "role-dependent",
      title: "Role Dependent",
      description: "O rendimento fora da role principal é consideravelmente menor.",
      severity: "medium",
    });
  }

  if (avgKda < 2.2 && avgDeaths >= 6) {
    insights.push({
      key: "unstable-fights",
      title: "Unstable Fighting",
      description: "Entradas em luta com baixa consistência estão punindo o desempenho geral.",
      severity: "high",
    });
  }

  return insights;
}

export function buildDerivedTraits(
  matches: Match[],
  championPool: ChampionPoolRow[]
): ScoutTrait[] {
  const traits: ScoutTrait[] = [];

  if (!matches.length) return traits;

  const avgDeaths =
    matches.reduce((acc, match) => acc + match.deaths, 0) / matches.length;

  const avgKda =
    matches.reduce((acc, match) => acc + match.kda, 0) / matches.length;

  const topChampionGames = championPool[0]?.games ?? 0;
  const dependency = topChampionGames / matches.length;

  if (dependency >= 0.5) {
    traits.push({
      key: "comfort",
      label: "Comfort Specialist",
      color: "purple",
      description: "Rende melhor quando está em picks de conforto.",
    });
  }

  if (avgDeaths >= 7 && avgKda >= 3) {
    traits.push({
      key: "aggressive",
      label: "High Risk / High Reward",
      color: "red",
      description: "Joga agressivamente, gera impacto mas se expõe bastante.",
    });
  }

  if (avgKda >= 4 && avgDeaths <= 4) {
    traits.push({
      key: "clean",
      label: "Clean Executor",
      color: "green",
      description: "Consegue impactar lutas com boa eficiência e poucas mortes.",
    });
  }

  if (championPool.length >= 5) {
    traits.push({
      key: "versatile",
      label: "Versatile Pool",
      color: "blue",
      description: "Consegue distribuir performance em vários campeões.",
    });
  }

  return traits;
}

export function buildScoutAnalysis(
  matches: Match[],
  externalChampionPool?: ChampionPoolRow[]
): PlayerAnalysis {
  const championPool =
    externalChampionPool?.length
      ? externalChampionPool
      : buildChampionPoolFromMatches(matches);

  const scoutScore = calculateScoutScore(matches, championPool);
  const intelligence = buildScoutIntelligence(matches, championPool);
  const derivedTraits = buildDerivedTraits(matches, championPool);

  return {
    filteredMatches: matches,
    championPool,
    scoutScore,
    intelligence,
    derivedTraits,
  };
}