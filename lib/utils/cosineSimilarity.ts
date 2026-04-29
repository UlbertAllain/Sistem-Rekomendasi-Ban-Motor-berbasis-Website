// lib/utils/cosineSimilarity.ts

/**
 * Hitung Cosine Similarity antara dua vektor
 * Formula: (A · B) / (||A|| × ||B||)
 * Output: 0.0 - 1.0
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error("Panjang vektor harus sama");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  // Cegah pembagian dengan nol
  if (normA === 0 || normB === 0) return 0;

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}