// app/api/compare/route.tsx

import { NextRequest, NextResponse } from "next/server";
import { getRecommendationsCBF, generateSummaryCBF } from "@/lib/services/recommendationcbfService";
import { getRecommendationsWSM, generateSummaryWSM, cbfToWsmInput } from "@/lib/services/recommendationService";
import { RoadCondition, UserProfile } from "@/lib/types/tire";

interface CompareRequest {
  motorcycleId?: string;
  frontSize?: { width: number; profile: number; rim: number; label: string };
  rearSize?: { width: number; profile: number; rim: number; label: string };
  roadCondition: RoadCondition;
  userProfile: UserProfile;
  budgetMin?: number;
  budgetMax?: number;
  top?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: CompareRequest = await request.json();

    // Validasi
    if (!body.roadCondition) {
      return NextResponse.json({ success: false, error: "roadCondition wajib" }, { status: 400 });
    }
    if (!body.userProfile || typeof body.userProfile !== "object") {
      return NextResponse.json({ success: false, error: "userProfile wajib" }, { status: 400 });
    }

    const topN = Math.min(Math.max(body.top ?? 5, 1), 20);

    // ==========================================
    // 1. JALANKAN CBF
    // ==========================================
    const cbfInput = {
      motorcycleId: body.motorcycleId,
      frontSize: body.frontSize,
      rearSize: body.rearSize,
      roadCondition: body.roadCondition,
      userProfile: body.userProfile,
      budgetMin: body.budgetMin ? parseInt(String(body.budgetMin)) : undefined,
      budgetMax: body.budgetMax ? parseInt(String(body.budgetMax)) : undefined,
    };

    const cbfResults = await getRecommendationsCBF(cbfInput, topN);
    const cbfSummary = generateSummaryCBF(cbfResults);

    // ==========================================
    // 2. JALANKAN WSM (dengan input yang dikonversi)
    // ==========================================
    const { ridingStyle, priority } = cbfToWsmInput(
      body.roadCondition,
      body.userProfile,
      body.budgetMin ? parseInt(String(body.budgetMin)) : undefined,
      body.budgetMax ? parseInt(String(body.budgetMax)) : undefined
    );

    const wsmInput = {
      motorcycleId: body.motorcycleId,
      frontSize: body.frontSize,
      rearSize: body.rearSize,
      roadCondition: body.roadCondition,
      ridingStyle,
      priority,
      budgetMin: body.budgetMin ? parseInt(String(body.budgetMin)) : undefined,
      budgetMax: body.budgetMax ? parseInt(String(body.budgetMax)) : undefined,
    };

    const wsmResults = await getRecommendationsWSM(wsmInput, topN);
    const wsmSummary = generateSummaryWSM(wsmResults);

    // ==========================================
    // 3. ANALISIS PERBANDINGAN
    // ==========================================
    const analysis = generateAnalysis(cbfResults, wsmResults);

    return NextResponse.json({
      success: true,
      method: "cbf",
      cbf: {
        results: cbfResults,
        summary: cbfSummary,
        inputDescription: `Slider: grip=${body.userProfile.grip}, durability=${body.userProfile.durability}, comfort=${body.userProfile.comfort}, road=${body.userProfile.roadMatch}, price=${body.userProfile.price}, rating=${body.userProfile.rating}`,
      },
      methodWsm: "wsm",
      wsm: {
        results: wsmResults,
        summary: wsmSummary,
        inputDescription: `Riding style: ${ridingStyle}, Priority: ${priority} (dikonversi dari slider CBF)`,
      },
      analysis,
      timestamp: Date.now(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal membandingkan";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

/**
 * Analisis perbandingan antara hasil CBF dan WSM
 */
function generateAnalysis(
  cbfResults: any[],
  wsmResults: any[]
): {
  rankCorrelation: number;
  topMatch: boolean;
  cbfUniqueTop: string | null;
  wsmUniqueTop: string | null;
  avgRankDifference: number;
  description: string;
} {
  if (cbfResults.length === 0 || wsmResults.length === 0) {
    return {
      rankCorrelation: 0,
      topMatch: false,
      cbfUniqueTop: null,
      wsmUniqueTop: null,
      avgRankDifference: 0,
      description: "Tidak bisa dianalisis karena salah satu metode tidak menghasilkan rekomendasi.",
    };
  }

  // Cek apakah #1 sama
  const topMatch = cbfResults[0].tire.id === wsmResults[0].tire.id;

  // Cari ban yang jadi #1 di CBF tapi bukan #1 di WSM
  const cbfTopId = cbfResults[0].tire.id;
  const wsmTopId = wsmResults[0].tire.id;
  const cbfUniqueTop = topMatch ? null : cbfResults[0].tire.fullName;
  const wsmUniqueTop = topMatch ? null : wsmResults[0].tire.fullName;

  // Hitung perbedaan rata-rata peringkat
  const cbfIds = cbfResults.map((r: any) => r.tire.id);
  const wsmIds = wsmResults.map((r: any) => r.tire.id);
  const allIds = [...new Set([...cbfIds, ...wsmIds])];

  let totalDiff = 0;
  let count = 0;

  for (const id of allIds) {
    const cbfRank = cbfIds.indexOf(id);
    const wsmRank = wsmIds.indexOf(id);
    if (cbfRank !== -1 && wsmRank !== -1) {
      totalDiff += Math.abs(cbfRank - wsmRank);
      count++;
    }
  }

  const avgRankDifference = count > 0 ? totalDiff / count : 0;

  // Hitung korelasi sederhana (berdasarkan overlap peringkat)
  const minLen = Math.min(cbfIds.length, wsmIds.length);
  let matches = 0;
  for (let i = 0; i < minLen; i++) {
    if (cbfIds[i] === wsmIds[i]) matches++;
  }
  const rankCorrelation = minLen > 0 ? matches / minLen : 0;

  // Deskripsi
  let description = "";

  if (rankCorrelation >= 0.8) {
    description = `Kedua metode menghasilkan peringkat yang sangat mirip (${(rankCorrelation * 100).toFixed(0)}% match di top ${minLen}). `;
  } else if (rankCorrelation >= 0.5) {
    description = `Kedua metode memiliki kesamaan moderat (${(rankCorrelation * 100).toFixed(0)}% match di top ${minLen}). `;
  } else {
    description = `Kedua metode menghasilkan peringkat yang cukup berbeda (${(rankCorrelation * 100).toFixed(0)}% match di top ${minLen}). `;
  }

  if (topMatch) {
    description += "Ban teratas identik di kedua metode. ";
  } else {
    description += `CBF memilih "${cbfUniqueTop}" sebagai #1, sedangkan WSM memilih "${wsmUniqueTop}". `;
  }

  description += `Rata-rata perbedaan peringkat: ${avgRankDifference.toFixed(1)} posisi.`;

  return {
    rankCorrelation: Math.round(rankCorrelation * 100) / 100,
    topMatch,
    cbfUniqueTop,
    wsmUniqueTop,
    avgRankDifference: Math.round(avgRankDifference * 100) / 100,
    description,
  };
}