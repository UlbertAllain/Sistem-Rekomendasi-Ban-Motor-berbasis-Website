// lib/types/recommendation.ts

import { RecommendationInputCBF, RecommendationResultCBF } from "./tire";

export type RecommendationResponse = {
  success: boolean;
  results: RecommendationResultCBF[];
  summary: string;
  timestamp: number;
};