/**
 * Mean-Centered Cosine Similarity (Pearson Correlation)
 * 
 * Mengurangi setiap dimensi dengan rata-rata (di sini 0.5 karena skala 0-1)
 * Ini menyelesaikan masalah "Jebakan Netral" dan semantik Harga.
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error("Panjang vektor harus sama");
  }

  const center = 0.5; // Karena slider dan fitur kamu dinormalisasi ke 0-1

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    // Centering: mengurangi nilai dengan 0.5 agar 0 berarti negatif, 0.5 netral, 1 positif
    const a = vecA[i] - center;
    const b = vecB[i] - center;

    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  }

  if (normA === 0 || normB === 0) return 0;

  const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  
  // Karena bisa jadi negatif, kita batasi antara 0 sampai 1 untuk skor rekomendasi
  return (similarity + 1) / 2; 
}