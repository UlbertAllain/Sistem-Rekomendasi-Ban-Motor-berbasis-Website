// lib/services/motorcycleService.ts

import { adminDb } from "../firebase/admin";
import { Motorcycle } from "../types/motorcycle";

const MOTORCYCLE_COLLECTION = "motorcycles";

export async function getAllMotorcycles(): Promise<Motorcycle[]> {
  // Diambil dulu tanpa orderBy biar gak perlu composite index
  const snapshot = await adminDb.collection(MOTORCYCLE_COLLECTION).get();
  
  const motorcycles = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Motorcycle[];

  // Urutkan di JavaScript aja
  motorcycles.sort((a, b) => {
    if (a.brand !== b.brand) {
      return a.brand.localeCompare(b.brand);
    }
    return a.model.localeCompare(b.model);
  });

  return motorcycles;
}

export async function getMotorcycleById(id: string): Promise<Motorcycle | null> {
  const doc = await adminDb.collection(MOTORCYCLE_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Motorcycle;
}

export async function addMotorcycle(
  motorcycle: Omit<Motorcycle, "id">
): Promise<string> {
  const docRef = await adminDb.collection(MOTORCYCLE_COLLECTION).add(motorcycle);
  return docRef.id;
}