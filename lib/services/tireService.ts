// lib/services/tireService.ts
// @ts-nocheck
import { getAdminDb } from "../firebase/admin";
import { Tire, TireSize } from "../types/tire";

const TIRE_COLLECTION = "tires";

function getDb() {
  const db = getAdminDb();
  if (!db) throw new Error("Database belum dikonfigurasi");
  return db;
}

export async function getAllTires(): Promise<Tire[]> {
  const db = getDb();
  const snapshot = await db.collection(TIRE_COLLECTION).get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Tire[];
}

export async function getTiresBySizeFlexible(
  frontSize?: TireSize,
  rearSize?: TireSize
): Promise<{ tire: Tire; matchedFront?: TireSize; matchedRear?: TireSize }[]> {
  const db = getDb();
  const snapshot = await db.collection(TIRE_COLLECTION).get();
  const allTires = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Tire[];

  return allTires
    .map((tire) => {
      let matchedFront: TireSize | undefined;
      let matchedRear: TireSize | undefined;

      if (frontSize) {
        matchedFront = tire.sizes.find(
          (s) =>
            s.rim === frontSize.rim &&
            Math.abs(s.width - frontSize.width) <= 5 &&
            Math.abs(s.profile - frontSize.profile) <= 5
        );
      }

      if (rearSize) {
        matchedRear = tire.sizes.find(
          (s) =>
            s.rim === rearSize.rim &&
            Math.abs(s.width - rearSize.width) <= 5 &&
            Math.abs(s.profile - rearSize.profile) <= 5
        );
      }

      const frontOk = frontSize ? !!matchedFront : true;
      const rearOk = rearSize ? !!matchedRear : true;

      if (frontOk && rearOk) {
        return { tire, matchedFront, matchedRear };
      }
      return null;
    })
    .filter(Boolean) as { tire: Tire; matchedFront?: TireSize; matchedRear?: TireSize }[];
}

export async function getTireById(id: string): Promise<Tire | null> {
  const db = getDb();
  const doc = await db.collection(TIRE_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Tire;
}

export async function addTire(tire: Omit<Tire, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const db = getDb();
  const docRef = await db.collection(TIRE_COLLECTION).add({
    ...tire,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  return docRef.id;
}

export async function getTiresByType(type: "tubeless" | "tube_type"): Promise<Tire[]> {
  const db = getDb();
  const snapshot = await db.collection(TIRE_COLLECTION).where("tireType", "==", type).get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Tire[];
}

export async function getTiresByPattern(pattern: string): Promise<Tire[]> {
  const db = getDb();
  const snapshot = await db.collection(TIRE_COLLECTION).where("pattern", "==", pattern).get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Tire[];
}