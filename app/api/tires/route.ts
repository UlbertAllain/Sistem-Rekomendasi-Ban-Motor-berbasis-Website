// app/api/tires/route.tsx

import { NextRequest, NextResponse } from "next/server";
import { getAllTires, getTireById } from "@/lib/services/tireService";

// GET /api/tires → semua ban
// GET /api/tires?id=xxx → ban spesifik
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const tire = await getTireById(id);
      if (!tire) {
        return NextResponse.json({ success: false, error: "Ban tidak ditemukan" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: tire });
    }

    const tires = await getAllTires();
    return NextResponse.json({ success: true, data: tires, count: tires.length });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal mengambil data ban";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}