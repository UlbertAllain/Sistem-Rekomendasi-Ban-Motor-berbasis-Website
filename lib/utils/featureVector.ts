// lib/utils/featureVector.ts

import { Tire, RoadCondition, UserProfile } from "../types/tire";

// ==========================================
// MATRIKS FITUR BAN
// Nilai 0-1 berdasarkan knowledge domain
// ==========================================

const COMPOUND_GRIP: Record<string, number> = { soft: 1.0, medium: 0.6, hard: 0.2 };
const PATTERN_GRIP: Record<string, number> = { sport: 1.0, touring: 0.5, scooter: 0.3, cub: 0.2, dual_sport: 0.4 };

const COMPOUND_DURABILITY: Record<string, number> = { soft: 0.2, medium: 0.6, hard: 1.0 };

const PATTERN_COMFORT: Record<string, number> = { sport: 0.3, touring: 1.0, scooter: 0.8, cub: 0.7, dual_sport: 0.4 };
const COMPOUND_COMFORT: Record<string, number> = { soft: 0.3, medium: 0.8, hard: 0.6 };

// Matriks kesesuaian pola ban terhadap kondisi jalan
const ROAD_PATTERN_SCORE: Record<RoadCondition, Record<string, number>> = {
  smooth_asphalt: { sport: 1.0, touring: 0.9, scooter: 0.9, cub: 0.8, dual_sport: 0.4 },
  rough_asphalt: { touring: 1.0, sport: 0.6, scooter: 0.7, cub: 0.8, dual_sport: 0.8 },
  gravel: { dual_sport: 1.0, touring: 0.5, sport: 0.2, scooter: 0.2, cub: 0.3 },
  mixed: { touring: 0.9, dual_sport: 0.9, cub: 0.8, scooter: 0.6, sport: 0.5 },
};

/**
 * Konversi data ban menjadi vektor fitur 6 dimensi
 * Output: [grip, durability, comfort, road_match, price_inverse, rating]
 * Range: 0.0 - 1.0
 */
export function getTireVector(tire: Tire, roadCondition: RoadCondition): number[] {
  // 1. Grip: rata-rata compound + pattern
  const grip = (COMPOUND_GRIP[tire.compound] + PATTERN_GRIP[tire.pattern]) / 2;

  // 2. Durability: berdasarkan compound
  const durability = COMPOUND_DURABILITY[tire.compound];

  // 3. Comfort: rata-rata pattern + compound
  const comfort = (PATTERN_COMFORT[tire.pattern] + COMPOUND_COMFORT[tire.compound]) / 2;

  // 4. Road Match: kesesuaian pattern dengan kondisi jalan user
  const roadMatch = ROAD_PATTERN_SCORE[roadCondition]?.[tire.pattern] ?? 0.5;

  // 5. Price Inverse: harga dibalik & dinormalisasi (murah = mendekati 1)
  const minPrice = 50000;
  const maxPrice = 600000;
  const normalizedPrice = (tire.price - minPrice) / (maxPrice - minPrice);
  const priceInverse = 1 - Math.max(0, Math.min(1, normalizedPrice));

  // 6. Rating: dinormalisasi 0-1
  const rating = tire.rating / 5;

  return [grip, durability, comfort, roadMatch, priceInverse, rating];
}

/**
 * Konversi input user menjadi vektor preferensi 6 dimensi
 * Output: [grip_pref, durability_pref, comfort_pref, road_pref, price_pref, rating_pref]
 * Range: 0.0 - 1.0 (langsung dari slider)
 */
export function getUserVector(userProfile: UserProfile): number[] {
  return [
    userProfile.grip,
    userProfile.durability,
    userProfile.comfort,
    userProfile.roadMatch,
    userProfile.price,
    userProfile.rating,
  ];
}