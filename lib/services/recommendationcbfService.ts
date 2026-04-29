// lib/services/recommendationCBFService.ts

import { RecommendationInputCBF, RecommendationResultCBF } from "../types/tire";
import { getTiresBySizeFlexible } from "./tireService";
import { getMotorcycleById } from "./motorcycleService";
import { getTireVector, getUserVector } from "../utils/featureVector";
import { cosineSimilarity } from "../utils/cosineSimilarity";

export async function getRecommendationsCBF(
  input: RecommendationInputCBF,
  topN: number = 5
): Promise<RecommendationResultCBF[]> {
  let frontSize = input.frontSize;
  let rearSize = input.rearSize;

  // 1. Resolve ukuran ban dari motor
  if (input.motorcycleId) {
    const motorcycle = await getMotorcycleById(input.motorcycleId);
    if (!motorcycle) {
      throw new Error(`Motor dengan ID ${input.motorcycleId} tidak ditemukan`);
    }
    frontSize = motorcycle.frontTire.size;
    rearSize = motorcycle.rearTire.size;
  }

  // 2. Filter ban yang ukurannya kompatibel (Hard Filter)
  const compatibleTires = await getTiresBySizeFlexible(frontSize, rearSize);

  if (compatibleTires.length === 0) {
    return [];
  }

  // 3. Hard filter budget (kalau ada)
  const filteredByBudget = compatibleTires.filter(({ tire }) => {
    if (input.budgetMin && tire.price < input.budgetMin) return false;
    if (input.budgetMax && tire.price > input.budgetMax) return false;
    return true;
  });

  if (filteredByBudget.length === 0) {
    return [];
  }

  // 4. Bangun vektor user
  const userVector = getUserVector(input.userProfile);

  // 5. Hitung similarity setiap ban
  const scored = filteredByBudget.map(({ tire, matchedFront, matchedRear }) => {
    const tireVector = getTireVector(tire, input.roadCondition);
    const similarity = cosineSimilarity(userVector, tireVector);

    return {
      tire,
      matchedSize: {
        front: matchedFront,
        rear: matchedRear,
      },
      similarityScore: Math.round(similarity * 10000) / 10000, // 4 desimal
      tireVector,
      reason: generateReasonCBF(tire, similarity, tireVector),
    } as RecommendationResultCBF;
  });

  // 6. Sort berdasarkan similarity tertinggi
  scored.sort((a, b) => b.similarityScore - a.similarityScore);

  // 7. Return top N
  return scored.slice(0, topN);
}

/**
 * Generate alasan berdasarkan dimensi yang paling match
 */
function generateReasonCBF(
  tire: any,
  similarity: number,
  tireVector: number[]
): string {
  const labels = ["Grip", "Daya Tahan", "Kenyamanan", "Kesesuaian Jalan", "Harga", "Rating"];
  
  // Cari dimensi dengan skor tertinggi di ban
  let maxIdx = 0;
  for (let i = 1; i < tireVector.length; i++) {
    if (tireVector[i] > tireVector[maxIdx]) maxIdx = i;
  }

  const reasons: string[] = [];
  
  if (similarity >= 0.9) {
    reasons.push(`Cocok sangat tinggi (similarity ${(similarity * 100).toFixed(1)}%)`);
  } else if (similarity >= 0.7) {
    reasons.push(`Cocok baik (similarity ${(similarity * 100).toFixed(1)}%)`);
  }

  reasons.push(`Keunggulan utama: ${labels[maxIdx]} (${(tireVector[maxIdx] * 100).toFixed(0)}%)`);
  
  if (tireVector[4] >= 0.8) {
    reasons.push(`Harga terjangkau (Rp${tire.price.toLocaleString("id-ID")})`);
  } else if (tireVector[4] <= 0.3) {
    reasons.push(`Harga premium (Rp${tire.price.toLocaleString("id-ID")})`);
  }

  if (tire.compound === "soft") reasons.push("Compound lunak untuk grip maksimal");
  if (tire.compound === "hard") reasons.push("Compound keras untuk daya tahan maksimal");

  return reasons.join(". ") + ".";
}

export function generateSummaryCBF(
  results: RecommendationResultCBF[]
): string {
  if (results.length === 0) {
    return "Tidak ditemukan ban yang sesuai dengan preferensi dan filter kamu.";
  }

  const top = results[0];
  const pct = (top.similarityScore * 100).toFixed(1);
  
  if (results.length === 1) {
    return `Rekomendasi terbaik: ${top.tire.fullName} dengan similarity ${pct}%.`;
  }

  const second = results[1];
  const pct2 = (second.similarityScore * 100).toFixed(1);

  return `Ditemukan ${results.length} ban. #1: ${top.tire.fullName} (${pct}%), #2: ${second.tire.fullName} (${pct2}%).`;
}