// lib/utils/scoring.ts

import {
  Tire,
  RoadCondition,
  RidingStyle,
  RecommendationPriority,
  RecommendationInput,
} from "../types/tire";

// ==========================================
// MATRIKS: Kondisi Jalan vs Pattern Ban
// Skor 0-100
// ==========================================
const ROAD_CONDITION_SCORE_MAP: Record<RoadCondition, Record<string, number>> = {
  smooth_asphalt: {
    sport: 95,
    touring: 90,
    scooter: 90,
    cub: 85,
    dual_sport: 50,
  },
  rough_asphalt: {
    touring: 95,
    sport: 70,
    scooter: 75,
    cub: 80,
    dual_sport: 85,
  },
  gravel: {
    dual_sport: 100,
    touring: 60,
    sport: 30,
    scooter: 25,
    cub: 40,
  },
  mixed: {
    touring: 90,
    dual_sport: 90,
    cub: 80,
    scooter: 65,
    sport: 55,
  },
};

// ==========================================
// MATRIKS: Gaya Berkendara vs Compound & Pattern
// ==========================================
const RIDING_STYLE_SCORE_MAP: Record<RidingStyle, { compound: Record<string, number>; pattern: Record<string, number> }> = {
  daily_commuter: {
    compound: { medium: 90, hard: 85, soft: 50 },
    pattern: { scooter: 90, cub: 90, touring: 85, sport: 70, dual_sport: 60 },
  },
  sport_aggressive: {
    compound: { soft: 100, medium: 75, hard: 40 },
    pattern: { sport: 100, touring: 50, scooter: 30, cub: 20, dual_sport: 25 },
  },
  touring_long: {
    compound: { hard: 100, medium: 80, soft: 45 },
    pattern: { touring: 100, sport: 60, scooter: 50, cub: 55, dual_sport: 70 },
  },
  off_road_light: {
    compound: { medium: 85, hard: 75, soft: 60 },
    pattern: { dual_sport: 100, touring: 50, sport: 30, scooter: 15, cub: 30 },
  },
};

// ==========================================
// BOBOT: Prioritas User menentukan bobot skor
// ==========================================
const PRIORITY_WEIGHTS: Record<RecommendationPriority, {
  roadCondition: number;
  ridingStyle: number;
  budget: number;
  durability: number;
  rating: number;
}> = {
  grip: {
    roadCondition: 0.20,
    ridingStyle: 0.35,
    budget: 0.10,
    durability: 0.05,
    rating: 0.30,
  },
  durability: {
    roadCondition: 0.15,
    ridingStyle: 0.15,
    budget: 0.10,
    durability: 0.40,
    rating: 0.20,
  },
  comfort: {
    roadCondition: 0.25,
    ridingStyle: 0.20,
    budget: 0.10,
    durability: 0.20,
    rating: 0.25,
  },
  price: {
    roadCondition: 0.15,
    ridingStyle: 0.15,
    budget: 0.45,
    durability: 0.10,
    rating: 0.15,
  },
};

// ==========================================
// FUNGSI SCORING PER KRITERIA
// ==========================================

export function scoreRoadCondition(tire: Tire, condition: RoadCondition): number {
  const patternScores = ROAD_CONDITION_SCORE_MAP[condition];
  const directMatch = tire.roadConditions.includes(condition);
  const directBonus = directMatch ? 10 : 0;
  const patternScore = patternScores[tire.pattern] ?? 50;
  return Math.min(100, patternScore + directBonus);
}

export function scoreRidingStyle(tire: Tire, style: RidingStyle): number {
  const config = RIDING_STYLE_SCORE_MAP[style];
  const compoundScore = config.compound[tire.compound] ?? 50;
  const patternScore = config.pattern[tire.pattern] ?? 50;
  // compound 40%, pattern 60%
  return Math.round(compoundScore * 0.4 + patternScore * 0.6);
}

export function scoreBudget(tire: Tire, min?: number, max?: number): number {
  if (!min && !max) return 80;

  const effectiveMin = min ?? 0;
  const effectiveMax = max ?? Infinity;

  if (tire.price < effectiveMin * 0.8) return 30;
  if (tire.price > effectiveMax) return 10;

  const midRange = (effectiveMin + effectiveMax) / 2;
  const range = effectiveMax - effectiveMin;

  if (range <= 0) return 80;

  const distance = Math.abs(tire.price - midRange);
  const normalizedDistance = distance / (range / 2);

  return Math.round(100 - (normalizedDistance * 40));
}

export function scorePriority(tire: Tire, priority: RecommendationPriority): number {
  switch (priority) {
    case "grip":
      return tire.compound === "soft" ? 95 : tire.compound === "medium" ? 70 : 40;
    case "durability":
      return tire.compound === "hard" ? 95 : tire.compound === "medium" ? 75 : 40;
    case "comfort":
      const comfortFromCompound = tire.compound === "medium" ? 90 : tire.compound === "hard" ? 70 : 50;
      const comfortFromPattern = tire.pattern === "touring" ? 100 : tire.pattern === "scooter" ? 85 : tire.pattern === "cub" ? 80 : 60;
      return Math.round(comfortFromCompound * 0.5 + comfortFromPattern * 0.5);
    case "price":
      return 70;
    default:
      return 70;
  }
}

export function scoreRating(tire: Tire): number {
  return Math.round((tire.rating / 5) * 100);
}

// ==========================================
// FUNGSI UTAMA: HITUNG TOTAL SKOR
// ==========================================

export function calculateTotalScore(
  tire: Tire,
  input: RecommendationInput
): {
  totalScore: number;
  breakdown: {
    roadConditionScore: number;
    ridingStyleScore: number;
    budgetScore: number;
    priorityScore: number;
    ratingScore: number;
  };
} {
  const roadScore = scoreRoadCondition(tire, input.roadCondition);
  const styleScore = scoreRidingStyle(tire, input.ridingStyle);
  const budgetScore = scoreBudget(tire, input.budgetMin, input.budgetMax);
  const prioScore = scorePriority(tire, input.priority);
  const ratingScore = scoreRating(tire);

  const weights = PRIORITY_WEIGHTS[input.priority];

  const totalScore = Math.round(
    roadScore * weights.roadCondition +
    styleScore * weights.ridingStyle +
    budgetScore * weights.budget +
    prioScore * weights.durability +
    ratingScore * weights.rating
  );

  return {
    totalScore: Math.min(100, Math.max(0, totalScore)),
    breakdown: {
      roadConditionScore: roadScore,
      ridingStyleScore: styleScore,
      budgetScore: budgetScore,
      priorityScore: prioScore,
      ratingScore: ratingScore,
    },
  };
}

// ==========================================
// GENERATE ALASAN DALAM BAHASA INDONESIA
// ==========================================

export function generateReason(
  tire: Tire,
  input: RecommendationInput,
  breakdown: ReturnType<typeof calculateTotalScore>["breakdown"]
): string {
  const reasons: string[] = [];

  if (breakdown.roadConditionScore >= 80) {
    reasons.push(`Cocok untuk jalan ${roadConditionLabel(input.roadCondition)}`);
  }

  if (breakdown.ridingStyleScore >= 80) {
    reasons.push(`Ideal untuk gaya berkendara ${ridingStyleLabel(input.ridingStyle)}`);
  }

  if (breakdown.budgetScore >= 80) {
    reasons.push(`Harga Rp${tire.price.toLocaleString("id-ID")} sesuai budget`);
  } else if (breakdown.budgetScore < 50 && input.budgetMax) {
    reasons.push(`Harga Rp${tire.price.toLocaleString("id-ID")} melebihi budget`);
  }

  switch (input.priority) {
    case "grip":
      if (tire.compound === "soft") reasons.push("Compound lunak memberikan grip maksimal");
      if (tire.pattern === "sport") reasons.push("Pattern sport untuk cengkraman cornering");
      break;
    case "durability":
      if (tire.compound === "hard") reasons.push("Compound keras untuk daya tahan maksimal");
      break;
    case "comfort":
      if (tire.pattern === "touring") reasons.push("Pattern touring untuk perjalanan nyaman");
      break;
    case "price":
      reasons.push("Nilai terbaik di kelasnya");
      break;
  }

  if (tire.rating >= 4.5) {
    reasons.push(`Rating tinggi ${tire.rating}/5 dari pengguna`);
  }

  return reasons.join(". ") + ".";
}

function roadConditionLabel(condition: RoadCondition): string {
  const labels: Record<RoadCondition, string> = {
    smooth_asphalt: "aspal halus",
    rough_asphalt: "aspal kasar/berlubang",
    gravel: "kerikil/tanah",
    mixed: "campuran",
  };
  return labels[condition];
}

function ridingStyleLabel(style: RidingStyle): string {
  const labels: Record<RidingStyle, string> = {
    daily_commuter: "harian/komuter",
    sport_aggressive: "sportif/agresif",
    touring_long: "touring jarak jauh",
    off_road_light: "off-road ringan",
  };
  return labels[style];
}