// app/api/test-firebase/route.tsx

import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

export async function GET() {
  try {
    // Coba baca koleksi kosong dari Firestore
    const snapshot = await adminDb.collection("tires").limit(1).get();
    
    return NextResponse.json({
      success: true,
      message: "Koneksi Firebase Admin berhasil!",
      project: process.env.FIREBASE_ADMIN_PROJECT_ID,
      tiresCount: snapshot.size,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({
      success: false,
      message: "Gagal konek ke Firebase",
      error: message,
    }, { status: 500 });
  }
}