// app/api/motorcycles/route.tsx

import { NextRequest, NextResponse } from "next/server";
import { getAllMotorcycles, getMotorcycleById } from "@/lib/services/motorcycleService";

// GET /api/motorcycles → semua motor
// GET /api/motorcycles?id=xxx → motor spesifik
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const motorcycle = await getMotorcycleById(id);
      if (!motorcycle) {
        return NextResponse.json({ success: false, error: "Motor tidak ditemukan" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: motorcycle });
    }

    const motorcycles = await getAllMotorcycles();
    return NextResponse.json({ success: true, data: motorcycles, count: motorcycles.length });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal mengambil data motor";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}