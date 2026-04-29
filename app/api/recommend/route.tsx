// app/api/recommend/route.tsx

import { NextRequest, NextResponse } from "next/server";
import { getRecommendationsCBF, generateSummaryCBF } from "@/lib/services/recommendationcbfService";
import { RecommendationInputCBF } from "@/lib/types/tire";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = validateInput(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const input: RecommendationInputCBF = {
      motorcycleId: body.motorcycleId,
      frontSize: body.frontSize,
      rearSize: body.rearSize,
      roadCondition: body.roadCondition,
      userProfile: body.userProfile,
      budgetMin: body.budgetMin ? parseInt(body.budgetMin) : undefined,
      budgetMax: body.budgetMax ? parseInt(body.budgetMax) : undefined,
    };

    const url = new URL(request.url);
    const topN = parseInt(url.searchParams.get("top") ?? "5", 10);
    const effectiveTopN = Math.min(Math.max(topN, 1), 20);

    const results = await getRecommendationsCBF(input, effectiveTopN);
    const summary = generateSummaryCBF(results);

    return NextResponse.json({
      success: true,
      results,
      summary,
      timestamp: Date.now(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Terjadi kesalahan";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

function validateInput(body: Record<string, unknown>): { valid: boolean; error?: string } {
  const validRoad = ["smooth_asphalt", "rough_asphalt", "gravel", "mixed"];

  if (!body.roadCondition || !validRoad.includes(body.roadCondition as string)) {
    return { valid: false, error: "roadCondition tidak valid" };
  }

  if (!body.userProfile || typeof body.userProfile !== "object") {
    return { valid: false, error: "userProfile harus diisi (object dengan 6 dimensi)" };
  }

  const profile = body.userProfile as Record<string, unknown>;
  const dims = ["grip", "durability", "comfort", "roadMatch", "price", "rating"];

  for (const dim of dims) {
    if (typeof profile[dim] !== "number" || (profile[dim] as number) < 0 || (profile[dim] as number) > 1) {
      return { valid: false, error: `userProfile.${dim} harus angka antara 0-1` };
    }
  }

  if (!body.motorcycleId && !body.frontSize && !body.rearSize) {
    return { valid: false, error: "Harus menyertakan motorcycleId atau frontSize/rearSize" };
  }

  return { valid: true };
}