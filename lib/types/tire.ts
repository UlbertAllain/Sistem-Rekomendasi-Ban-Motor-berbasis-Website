// lib/types/tire.ts

export type TireCompound = "soft" | "medium" | "hard";
export type TirePattern = "sport" | "touring" | "dual_sport" | "scooter" | "cub";
export type TireType = "tubeless" | "tube_type";
export type RoadCondition = "smooth_asphalt" | "rough_asphalt" | "gravel" | "mixed";

// Ukuran ban: format standar misal "90/90-14"
export interface TireSize {
  width: number;      // 90
  profile: number;    // 90
  rim: number;        // 14
  label: string;      // "90/90-14"
}

export interface Tire {
  id: string;
  brand: string;           // "IRC", "FDR", "Michelin", dll
  model: string;           // "NR91", "FX808", dll
  fullName: string;        // "IRC NR91"
  sizes: TireSize[];       // Ban ini tersedia di ukuran apa saja
  tireType: TireType;
  compound: TireCompound;
  pattern: TirePattern;
  roadConditions: RoadCondition[];  // Kondisi jalan yang cocok
  price: number;           // Harga per biji dalam Rupiah
  rating: number;          // 1-5
  features: string[];      // ["Tahan lama", "Grip basah baik", dll]
  description: string;
  imageUrl?: string;
  weightGrams?: number;
  stock: number;
  createdAt: number;
  updatedAt: number;
}

// Input dari user untuk rekomendasi WSM
export interface RecommendationInput {
  motorcycleId?: string;       // Kalau pilih motor spesifik
  frontSize?: TireSize;        // Kalau input manual ukuran
  rearSize?: TireSize;         // Kalau input manual ukuran
  roadCondition: RoadCondition;
  ridingStyle: RidingStyle;
  budgetMin?: number;
  budgetMax?: number;
  priority: RecommendationPriority;
}

export type RidingStyle = 
  | "daily_commuter"    // Harian, santai
  | "sport_aggressive"  // Agresif, cornering
  | "touring_long"      // Touring jarak jauh
  | "off_road_light";   // Light off-road

export type RecommendationPriority = 
  | "grip"          // Prioritas grip
  | "durability"    // Prioritas daya tahan
  | "comfort"       // Prioritas kenyamanan
  | "price";        // Prioritas harga murah

// Output rekomendasi WSM
export interface RecommendationResult {
  tire: Tire;
  matchedSize: {
    front?: TireSize;
    rear?: TireSize;
  };
  totalScore: number;       // 0-100
  scoreBreakdown: {
    roadConditionScore: number;
    ridingStyleScore: number;
    budgetScore: number;
    priorityScore: number;
    ratingScore: number;
  };
  reason: string;           // Penjelasan kenapa ban ini direkomendasikan


}

// Tambahkan ini di bawah file lib/types/tire.ts

// ==========================================
// PROFIL PENGGUNA (Untuk CBF)
// ==========================================
export interface UserProfile {
  grip: number;       // 0-1
  durability: number; // 0-1
  comfort: number;    // 0-1
  roadMatch: number;  // 0-1
  price: number;      // 0-1
  rating: number;     // 0-1
}

// Override input lama, sekarang pakai UserProfile
export interface RecommendationInputCBF {
  motorcycleId?: string;
  frontSize?: TireSize;
  rearSize?: TireSize;
  roadCondition: RoadCondition;
  userProfile: UserProfile;
  budgetMin?: number;
  budgetMax?: number;
}

// Override hasil, sekarang pakai similarity
export interface RecommendationResultCBF {
  tire: Tire;
  matchedSize: {
    front?: TireSize;
    rear?: TireSize;
  };
  similarityScore: number; // 0-1 (hasil cosine similarity)
  tireVector: number[];    // buat analisis
  reason: string;
}