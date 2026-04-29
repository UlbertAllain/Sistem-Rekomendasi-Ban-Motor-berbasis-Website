// lib/services/motorcycleService.ts
// @ts-nocheck
import { getAdminDb } from "../firebase/admin";
import { Motorcycle } from "../types/motorcycle";

const MOTORCYCLE_COLLECTION = "motorcycles";

function getDb() {
  const db = getAdminDb();
  if (!db) throw new Error("Database belum dikonfigurasi");
  return db;
}

export async function getAllMotorcycles(): Promise<Motorcycle[]> {
  const db = getDb();
  const snapshot = await db.collection(MOTORCYCLE_COLLECTION).orderBy("brand").get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Motorcycle[];
}

export async function getMotorcycleById(id: string): Promise<Motorcycle | null> {
  const db = getDb();
  const doc = await db.collection(MOTORCYCLE_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Motorcycle;
}

export async function addMotorcycle(
  motorcycle: Omit<Motorcycle, "id">
): Promise<string> {
  const db = getDb();
  const docRef = await db.collection(MOTORCYCLE_COLLECTION).add(motorcycle);
  return docRef.id;
}

export async function getMotorcyclesByBrand(brand: string): Promise<Motorcycle[]> {
  const db = getDb();
  const snapshot = await db.collection(MOTORCYCLE_COLLECTION).where("brand", "==", brand).get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Motorcycle[];
}

export async function getMotorcyclesByCategory(category: string): Promise<Motorcycle[]> {
  const db = getDb();
  const snapshot = await db.collection(MOTORCYCLE_COLLECTION).where("category", "==", category).get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Motorcycle[];
}