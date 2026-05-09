// // lib/services/recommendationService.ts

// import { RecommendationInput, RecommendationResult, TireSize, RidingStyle, RoadCondition, RecommendationPriority } from "../types/tire";
// import { getTiresBySizeFlexible } from "./tireService";
// import { getMotorcycleById } from "./motorcycleService";
// import { calculateTotalScore, generateReason } from "../utils/scoring";

// // ==========================================
// // KONVERSI DARI SLIDER CBF KE INPUT WSM
// // ==========================================

// /**
//  * Mapping dari vektor preferensi CBF ke input WSM
//  * Ini memungkinkan kedua metode menggunakan input yang sama
//  */
// export function cbfToWsmInput(
//   roadCondition: RoadCondition,
//   userProfile: { grip: number; durability: number; comfort: number; roadMatch: number; price: number; rating: number },
//   budgetMin?: number,
//   budgetMax?: number
// ): { ridingStyle: RidingStyle; priority: RecommendationPriority } {
//   // Tentukan riding style dari dimensi mana yang paling tinggi (grip vs comfort vs durability)
//   const gripScore = userProfile.grip;
//   const comfortScore = userProfile.comfort;
//   const durabilityScore = userProfile.durability;

//   let ridingStyle: RidingStyle = "daily_commuter";

//   if (gripScore > comfortScore && gripScore > durabilityScore) {
//     ridingStyle = "sport_aggressive";
//   } else if (durabilityScore > gripScore && durabilityScore > comfortScore) {
//     ridingStyle = "touring_long";
//   } else if (userProfile.roadMatch > 0.7 && (gripScore < 0.5 || comfortScore < 0.5)) {
//     ridingStyle = "off_road_light";
//   } else if (comfortScore >= gripScore && comfortScore >= durabilityScore) {
//     ridingStyle = "daily_commuter";
//   }

//   // Tentukan priority dari dimensi mana yang paling tinggi
//   let priority: RecommendationPriority = "durability";

//   const scores = [
//     { key: "grip" as RecommendationPriority, val: userProfile.grip },
//     { key: "durability" as RecommendationPriority, val: userProfile.durability },
//     { key: "comfort" as RecommendationPriority, val: userProfile.comfort },
//     { key: "price" as RecommendationPriority, val: userProfile.price },
//   ];

//   scores.sort((a, b) => b.val - a.val);
//   priority = scores[0].key;

//   return { ridingStyle, priority };
// }

// // ==========================================
// // WSM RECOMMENDATION (Metode Lama)
// // ==========================================

// export async function getRecommendationsWSM(
//   input: RecommendationInput,
//   topN: number = 5
// ): Promise<RecommendationResult[]> {
//   let frontSize: TireSize | undefined = input.frontSize;
//   let rearSize: TireSize | undefined = input.rearSize;

//   if (input.motorcycleId) {
//     const motorcycle = await getMotorcycleById(input.motorcycleId);
//     if (!motorcycle) {
//       throw new Error(`Motor dengan ID ${input.motorcycleId} tidak ditemukan`);
//     }
//     frontSize = motorcycle.frontTire.size;
//     rearSize = motorcycle.rearTire.size;
//   }

//   const compatibleTires = await getTiresBySizeFlexible(frontSize, rearSize);

//   if (compatibleTires.length === 0) {
//     return [];
//   }

//   // Hard filter budget
//   const filtered = compatibleTires.filter(({ tire }) => {
//     if (input.budgetMin && tire.price < input.budgetMin) return false;
//     if (input.budgetMax && tire.price > input.budgetMax) return false;
//     return true;
//   });

//   if (filtered.length === 0) {
//     return [];
//   }

//   const scored = filtered.map(({ tire, matchedFront, matchedRear }) => {
//     const { totalScore, breakdown } = calculateTotalScore(tire, input);
//     const reason = generateReason(tire, input, breakdown);

//     return {
//       tire,
//       matchedSize: {
//         front: matchedFront,
//         rear: matchedRear,
//       },
//       totalScore,
//       scoreBreakdown: breakdown,
//       reason,
//     } as RecommendationResult;
//   });

//   scored.sort((a, b) => b.totalScore - a.totalScore);

//   return scored.slice(0, topN);
// }

// export function generateSummaryWSM(
//   results: RecommendationResult[]
// ): string {
//   if (results.length === 0) {
//     return "Tidak ditemukan ban yang sesuai (WSM).";
//   }

//   const top = results[0];
//   const pct = top.totalScore;

//   if (results.length === 1) {
//     return `WSM: #1 ${top.tire.fullName} (${pct}/100)`;
//   }

//   const second = results[1];
//   return `WSM: #1 ${top.tire.fullName} (${pct}/100), #2 ${second.tire.fullName} (${second.totalScore}/100)`;
// }