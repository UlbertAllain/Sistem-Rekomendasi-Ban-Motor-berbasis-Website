import { Tire, RoadCondition, UserProfile } from "../types/tire";

// ==========================================
// MATRIKS FITUR BAN (TIDAK BERUBAH)
// ==========================================

const COMPOUND_GRIP: Record<string, number> = { soft: 1.0, medium: 0.6, hard: 0.2 };
const PATTERN_GRIP: Record<string, number> = { sport: 1.0, touring: 0.5, scooter: 0.3, cub: 0.2, dual_sport: 0.4 };
const COMPOUND_DURABILITY: Record<string, number> = { soft: 0.2, medium: 0.6, hard: 1.0 };
const PATTERN_COMFORT: Record<string, number> = { sport: 0.3, touring: 1.0, scooter: 0.8, cub: 0.7, dual_sport: 0.4 };
const COMPOUND_COMFORT: Record<string, number> = { soft: 0.3, medium: 0.8, hard: 0.6 };

const ROAD_PATTERN_SCORE: Record<RoadCondition, Record<string, number>> = {
  smooth_asphalt: { sport: 1.0, touring: 0.9, scooter: 0.9, cub: 0.8, dual_sport: 0.2 }, // Dual sport jelek di aspal halus
  rough_asphalt: { touring: 1.0, sport: 0.6, scooter: 0.7, cub: 0.8, dual_sport: 0.6 },
  gravel: { dual_sport: 1.0, cub: 0.6, touring: 0.3, sport: 0.1, scooter: 0.1 }, // Dual sport raja di kerikil
  mixed: { touring: 0.9, dual_sport: 0.9, cub: 0.8, scooter: 0.6, sport: 0.5 },
};

/**
 * ✅ TIDAK BERUBAH - Konversi data ban menjadi vektor fitur
 * Output: [grip, durability, comfort, road_match, price_value, rating]
 */
export function getTireVector(tire: Tire, roadCondition: RoadCondition): number[] {
  const grip = (COMPOUND_GRIP[tire.compound] + PATTERN_GRIP[tire.pattern]) / 2;
  const durability = COMPOUND_DURABILITY[tire.compound];
  const comfort = (PATTERN_COMFORT[tire.pattern] + COMPOUND_COMFORT[tire.compound]) / 2;
  const roadMatch = ROAD_PATTERN_SCORE[roadCondition]?.[tire.pattern] ?? 0.5;
  
  // ✅ PERBAIKAN: Jelasin semantiknya - "price_value" = nilai untuk uang
  // Harga rendah = value tinggi, harga tinggi = value rendah
  const minPrice = 50000;
  const maxPrice = 600000;
  const normalizedPrice = (tire.price - minPrice) / (maxPrice - minPrice);
  const priceValue = 1 - Math.max(0, Math.min(1, normalizedPrice));
  
  const rating = tire.rating / 5;

  return [grip, durability, comfort, roadMatch, priceValue, rating];
}

/**
 * ✅ PERBAIKAN: Rename biar jelas semantiknya
 * Ini adalah BOBOT PRIORITAS, bukan "fitur user"
 */
export function getUserVector(userProfile: UserProfile): number[] {
  return [
    userProfile.grip,        // Seberapa penting grip untuk user
    userProfile.durability,  // Seberapa penting durability untuk user
    userProfile.comfort,     // Seberapa penting comfort untuk user
    userProfile.roadMatch,   // Seberapa penting kesesuaian jalan
    userProfile.price,       // Seberapa penting harga terjangkau
    userProfile.rating,      // Seberapa penting rating tinggi
  ];
}

/**
 * ✅ BARU: Alias untuk kejelasan di service
 */
export function getUserWeights(userProfile: UserProfile): number[] {
  return getUserVector(userProfile);
}

/**
 * ✅ BARU: Alias untuk kejelasan di service  
 */
export function getTireFeatures(tire: Tire, roadCondition: RoadCondition): number[] {
  return getTireVector(tire, roadCondition);
}