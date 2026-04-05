type TraitConstant = {
  name: string;
  value: number;
};

type ConditionalTraitSet = {
  constants?: TraitConstant[];
  minUnits?: number;
  maxUnits?: number;
  style_idx?: number;
  style_name?: string;
};

type InnateTraitSet = {
  constants?: TraitConstant[];
};

type TraitMetaLike = {
  name?: string;
  display_name?: string;
  trait_id?: string;
  tooltip?: string;
  tooltip_text?: string;
  innate_trait_sets?: InnateTraitSet[];
  conditional_trait_sets?: ConditionalTraitSet[];
};

type MatchTraitLike = {
  name: string;
  numUnits?: number;
  tierCurrent?: number;
  tierTotal?: number;
  style?: number;
};

export type NormalizedTraitRow = {
  minUnits?: number;
  maxUnits?: number;
  label: string;
  styleName?: string;
  styleId?: number;
};

export type NormalizedTraitTooltip = {
  title: string;
  description: string;
  rows: NormalizedTraitRow[];
};

type ParsedTooltipBlock = {
  description: string;
  rows: string[];
  rules: string[];
};

type ResolvedValue =
  | { kind: "value"; value: string }
  | { kind: "missing" };

const ICON_LABELS: Record<string, string> = {
  scaleHealth: "HP",
  scaleArmor: "Armor",
  scaleMR: "MR",
  scaleDA: "DA",
  scaleDR: "Durability",
  scaleAS: "AS",
  scaleAP: "AP",
  scaleAD: "AD",
  scaleMana: "Mana",
  scaleCrit: "Crit",
  scaleCritMult: "Crit Dmg",
  scaleSV: "Omnivamp",
  scaleSouls: "Souls",
};

const PERCENT_STAT_LABELS = new Set([
  "DA",
  "Durability",
  "AS",
  "Crit",
  "Crit Dmg",
  "Omnivamp",
  "AD/AP",
  "Armor/MR",
]);

const FLAT_STAT_LABELS = new Set([
  "HP",
  "Armor",
  "MR",
  "AP",
  "AD",
  "Mana",
  "Souls",
]);

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function cleanupSpaces(value: string) {
  return value
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\s*;\s*/g, "; ")
    .replace(/\s*\|\s*/g, " | ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "";
  if (Math.abs(value - Math.round(value)) < 0.001) return String(Math.round(value));
  return value.toFixed(1).replace(/\.0$/, "");
}

function getActiveSet(
  sets: ConditionalTraitSet[] = [],
  numUnits = 0
): ConditionalTraitSet | undefined {
  return sets.find((set) => {
    const min = set.minUnits ?? 0;
    const max = set.maxUnits ?? Number.MAX_SAFE_INTEGER;
    return numUnits >= min && numUnits <= max;
  });
}

function mergeConstants(
  innateSets: InnateTraitSet[] = [],
  activeSet?: ConditionalTraitSet
) {
  const map = new Map<string, number>();

  for (const set of innateSets) {
    for (const constant of set.constants ?? []) {
      map.set(constant.name, Number(constant.value));
    }
  }

  for (const constant of activeSet?.constants ?? []) {
    map.set(constant.name, Number(constant.value));
  }

  return map;
}

function parseTooltipBlocks(rawTooltip: string): ParsedTooltipBlock {
  const decoded = decodeHtml(rawTooltip);

  const rows: string[] = [];
  const rules: string[] = [];

  decoded.replace(/<(?:row|expandRow)>([\s\S]*?)<\/(?:row|expandRow)>/gi, (_, content) => {
    rows.push(content);
    return "";
  });

  decoded.replace(/<rules>([\s\S]*?)<\/rules>/gi, (_, content) => {
    rules.push(content);
    return "";
  });

  const description = decoded
    .replace(/<(?:row|expandRow)>([\s\S]*?)<\/(?:row|expandRow)>/gi, "")
    .replace(/<rules>([\s\S]*?)<\/rules>/gi, "");

  return {
    description,
    rows,
    rules,
  };
}

function normalizeMarkup(raw: string) {
  return raw
    .replace(/<magicDamage>(.*?)<\/magicDamage>/gi, "$1")
    .replace(/<spellPassive>(.*?)<\/spellPassive>/gi, "$1")
    .replace(/<spellActive[^>]*>(.*?)<\/spellActive>/gi, "$1")
    .replace(/<TFTGuildActive[^>]*>(.*?)<\/TFTGuildActive>/gi, "$1")
    .replace(/<ShowIf[^>]*>(.*?)<\/ShowIf[^>]*>/gi, "$1")
    .replace(/<ShowIfCustom\.[^>]*>(.*?)<\/ShowIfCustom\.[^>]*>/gi, "$1")
    .replace(/<TFTTracker>(.*?)<\/TFTTracker>/gi, "$1")
    .replace(/<TFTBonus>(.*?)<\/TFTBonus>/gi, "$1")
    .replace(/<i>(.*?)<\/i>/gi, "$1")
    .replace(/<\/?br\s*\/?>/gi, "\n")
    .replace(/<\/?[^>]+>/g, "");
}

function tokenizeIcons(raw: string) {
  return raw.replace(/%i:([a-zA-Z0-9_]+)%/g, (_, token: string) => {
    const label = ICON_LABELS[token];
    return label ? `[[ICON:${label}]]` : "";
  });
}

function resolveExpression(expr: string, constants: Map<string, number>): ResolvedValue {
  const sanitized = expr
    .replace(/\s+/g, "")
    .replace(/[A-Za-z_][A-Za-z0-9_.:]*/g, (token) => {
      if (constants.has(token)) return String(constants.get(token));
      return "__MISSING__";
    });

  if (sanitized.includes("__MISSING__")) {
    return { kind: "missing" };
  }

  if (!/^[0-9+\-*/().]+$/.test(sanitized)) {
    return { kind: "missing" };
  }

  try {
    // eslint-disable-next-line no-new-func
    const result = Function(`return (${sanitized})`)();
    if (typeof result !== "number" || Number.isNaN(result)) {
      return { kind: "missing" };
    }

    return { kind: "value", value: formatNumber(result) };
  } catch {
    return { kind: "missing" };
  }
}

function replaceExpressions(raw: string, constants: Map<string, number>) {
  return raw.replace(/@([^@]+)@/g, (_, expr: string) => {
    const resolved = resolveExpression(expr, constants);
    return resolved.kind === "value" ? resolved.value : "[[MISSING]]";
  });
}

function finalizeIcons(raw: string) {
  return raw
    .replace(/\[\[ICON:([^\]]+)\]\]/g, " $1 ")
    .replace(/\[\[MISSING\]\]/g, "");
}

function cleanupDynamicGarbage(raw: string) {
  return raw
    .replace(/TFTUnitProperty\.[^\s<]+/g, "")
    .replace(/\(\s*\)/g, "")
    .replace(/\[\[MISSING\]\]/g, "");
}

function normalizeText(raw: string) {
  return cleanupSpaces(
    cleanupDynamicGarbage(
      finalizeIcons(raw)
    )
  );
}

function pairStatNames(text: string) {
  return text
    .replace(/\bAD\s+AP\b/g, "AD/AP")
    .replace(/\bAP\s+AD\b/g, "AP/AD")
    .replace(/\bArmor\s+MR\b/g, "Armor/MR")
    .replace(/\bMR\s+Armor\b/g, "MR/Armor");
}

function extractNumericStatPairs(text: string) {
  const normalized = pairStatNames(text);

  const regex =
    /(\d+(?:\.\d+)?)\s*(x|%)?\s*(Souls|HP|Armor\/MR|Armor|MR|AD\/AP|AP\/AD|DA|Durability|AS|Crit Dmg|Crit|Omnivamp|Mana|AD|AP)\b/gi;

  const results: Array<{
    value: string;
    suffix: string;
    stat: string;
  }> = [];

  let match: RegExpExecArray | null = null;

  while ((match = regex.exec(normalized))) {
    const value = match[1];
    const suffix = match[2] ?? "";
    const stat = match[3];

    results.push({ value, suffix, stat });
  }

  return results;
}

function semanticFormatPairs(text: string) {
  const pairs = extractNumericStatPairs(text);
  if (!pairs.length) return "";

  const formatted = pairs.map(({ value, suffix, stat }) => {
    if (suffix === "x" && stat === "Souls") {
      return `${value}x Souls`;
    }

    if (suffix === "%") {
      return `${value}% ${stat}`;
    }

    if (PERCENT_STAT_LABELS.has(stat)) {
      return `${value}% ${stat}`;
    }

    if (FLAT_STAT_LABELS.has(stat)) {
      return `${value} ${stat}`;
    }

    return `${value} ${stat}`;
  });

  const deduped = [...new Set(formatted)];
  return deduped.join(", ");
}

function looksSemanticEnough(text: string) {
  if (!text) return false;

  const lowered = text.toLowerCase();

  return (
    /\d/.test(text) &&
    (
      lowered.includes("souls") ||
      lowered.includes("hp") ||
      lowered.includes("armor") ||
      lowered.includes("mr") ||
      lowered.includes("mana") ||
      lowered.includes("durability") ||
      lowered.includes("crit") ||
      lowered.includes("omnivamp") ||
      /\bad\/ap\b/i.test(text) ||
      /\bda\b/i.test(text) ||
      /\bas\b/i.test(text)
    )
  );
}

function humanizeRowLabel(rowText: string, set?: ConditionalTraitSet) {
  let cleaned = rowText.trim();

  if (set?.minUnits != null) {
    cleaned = cleaned.replace(/\(@MinUnits@\)|@MinUnits@/g, String(set.minUnits));
  }

  cleaned = normalizeText(cleaned)
    .replace(/^,\s*/, "")
    .replace(/,\s*$/, "")
    .replace(/^;\s*/, "")
    .replace(/;\s*$/, "");

  const semantic = semanticFormatPairs(cleaned);

  if (looksSemanticEnough(semantic)) {
    return cleanupSpaces(semantic);
  }

  return cleanupSpaces(pairStatNames(cleaned));
}

function isGarbageRow(value: string) {
  const text = cleanupSpaces(value);

  if (!text) return true;

  const useless = [
    /^Souls Collected:\s*$/i,
    /^Current Bonus:\s*$/i,
    /^Rounds remaining:\s*$/i,
    /^0x\s+Souls?$/i,
    /^0%\s+(AD|AP|DA|AS|HP|Armor|MR|AD\/AP|Armor\/MR)(\/(AD|AP|DA|AS|HP|Armor|MR))*$/i,
    /^0x\s+Souls?,\s*0%\s+(AD|AP|DA|AS|HP|Armor|MR|AD\/AP|Armor\/MR)(\/(AD|AP|DA|AS|HP|Armor|MR))*$/i,
  ];

  return useless.some((pattern) => pattern.test(text));
}

function buildSemanticFallbackFromConstants(
  constants: Map<string, number>
) {
  const orderedCandidates = [
    { key: "SoulMult", label: "Souls", mode: "multiplier" as const },
    { key: "ADAP", label: "AD/AP", mode: "percent_decimal" as const },
    { key: "BonusArmor", label: "Armor/MR", mode: "flat" as const },
    { key: "BaseDR", label: "Durability", mode: "percent_decimal" as const },
    { key: "IncreasedDR", label: "Durability", mode: "percent_decimal" as const },
    { key: "DamageAmp", label: "DA", mode: "percent_decimal" as const },
    { key: "BaseDamageAmp", label: "DA", mode: "percent_decimal" as const },
    { key: "CritChance", label: "Crit", mode: "percent_decimal" as const },
    { key: "CritDamage", label: "Crit Dmg", mode: "percent_decimal" as const },
    { key: "CRIT_PERCENT", label: "Crit", mode: "percent_decimal" as const },
    { key: "CRIT_DAMAGE", label: "Crit Dmg", mode: "percent_decimal" as const },
    { key: "BonusPercentHealth", label: "HP", mode: "percent_decimal" as const },
    { key: "ShieldPercentAmount", label: "HP", mode: "percent_decimal" as const },
    { key: "PercentHealthShield", label: "HP", mode: "percent_decimal" as const },
    { key: "AttackSpeed", label: "AS", mode: "percent_decimal" as const },
    { key: "AttackSpeedPercent", label: "AS", mode: "percent_decimal" as const },
    { key: "APBonus", label: "AP", mode: "flat" as const },
    { key: "BaseAP", label: "AP", mode: "flat" as const },
    { key: "Mana", label: "Mana", mode: "flat" as const },
    { key: "HealthBonus", label: "HP", mode: "flat" as const },
    { key: "HPAmt", label: "HP", mode: "flat" as const },
  ];

  const parts: string[] = [];

  for (const candidate of orderedCandidates) {
    if (!constants.has(candidate.key)) continue;

    const rawValue = Number(constants.get(candidate.key));
    if (!Number.isFinite(rawValue) || rawValue === 0) continue;

    if (candidate.mode === "multiplier") {
      parts.push(`${formatNumber(rawValue)}x ${candidate.label}`);
      continue;
    }

    if (candidate.mode === "percent_decimal") {
      parts.push(`${formatNumber(rawValue * 100)}% ${candidate.label}`);
      continue;
    }

    parts.push(`${formatNumber(rawValue)} ${candidate.label}`);
  }

  return [...new Set(parts)].join(", ");
}

function fallbackBuildRowLabel(
  rowText: string,
  set: ConditionalTraitSet,
  meta: TraitMetaLike
) {
  const constants = mergeConstants(meta.innate_trait_sets, set);

  const sourceNormalized = normalizeText(pairStatNames(rowText));
  const semanticFromSource = semanticFormatPairs(sourceNormalized);

  if (looksSemanticEnough(semanticFromSource) && !isGarbageRow(semanticFromSource)) {
    return semanticFromSource;
  }

  const semanticFromConstants = buildSemanticFallbackFromConstants(constants);
  if (semanticFromConstants && !isGarbageRow(semanticFromConstants)) {
    return semanticFromConstants;
  }

  const entries = Array.from(constants.entries())
    .filter(([, value]) => Number.isFinite(value) && value !== 0)
    .map(([name, value]) => `${name}: ${formatNumber(value)}`);

  return entries.join(" • ");
}

function buildRows(meta: TraitMetaLike): NormalizedTraitRow[] {
  const parsed = parseTooltipBlocks(meta.tooltip_text || meta.tooltip || "");
  const sourceRows = parsed.rows;
  const sets = meta.conditional_trait_sets ?? [];

  return sets
    .map((set, index) => {
      const source = sourceRows[index] ?? sourceRows[sourceRows.length - 1] ?? "";
      const constants = mergeConstants(meta.innate_trait_sets, set);

      const resolved = replaceExpressions(
        tokenizeIcons(normalizeMarkup(source)),
        constants
      );

      let label = humanizeRowLabel(resolved, set);

      if (isGarbageRow(label) || !looksSemanticEnough(label)) {
        label = fallbackBuildRowLabel(source, set, meta);
      }

      return {
        minUnits: set.minUnits,
        maxUnits: set.maxUnits,
        styleId: set.style_idx,
        styleName: set.style_name,
        label: cleanupSpaces(label),
      };
    })
    .filter((row) => row.label && !isGarbageRow(row.label));
}

function buildDescription(meta: TraitMetaLike, activeSet?: ConditionalTraitSet) {
  const parsed = parseTooltipBlocks(meta.tooltip_text || meta.tooltip || "");
  const constants = mergeConstants(meta.innate_trait_sets, activeSet);

  const resolved = replaceExpressions(
    tokenizeIcons(normalizeMarkup(parsed.description)),
    constants
  );

  const rulesResolved = parsed.rules
    .map((rule) =>
      normalizeText(
        replaceExpressions(
          tokenizeIcons(normalizeMarkup(rule)),
          constants
        )
      )
    )
    .filter(Boolean);

  let description = cleanupSpaces(
    pairStatNames(
      normalizeText(
        resolved
          .replace(/\(@MinUnits@\)|@MinUnits@/g, "")
          .replace(/Souls Collected:\s*$/gim, "")
          .replace(/Current Bonus:\s*$/gim, "")
      )
    )
  );

  if (rulesResolved.length) {
    const usefulRules = rulesResolved.filter((rule) => !/^\s*$/.test(rule));
    if (usefulRules.length) {
      description = cleanupSpaces(
        `${description}\n\n${usefulRules.join("\n")}`
      );
    }
  }

  return description || "Sem descrição disponível para esta trait.";
}

export function normalizeTraitTooltip(
  meta: TraitMetaLike | undefined,
  trait: MatchTraitLike,
  fallbackTitle: string
): NormalizedTraitTooltip {
  const title = meta?.display_name || meta?.name || fallbackTitle;
  const rawTooltip = meta?.tooltip_text || meta?.tooltip || "";

  if (!rawTooltip || !meta) {
    return {
      title,
      description: "Sem descrição disponível para esta trait.",
      rows: [],
    };
  }

  const activeSet = getActiveSet(meta.conditional_trait_sets, trait.numUnits ?? 0);

  return {
    title,
    description: buildDescription(meta, activeSet),
    rows: buildRows(meta),
  };
}