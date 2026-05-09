// app/api/motorcycle-tires/route.tsx

import { NextRequest, NextResponse } from "next/server";
import { getMotorcycleById } from "@/lib/services/motorcycleService";
import { getTiresBySizeFlexible } from "@/lib/services/tireService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const motorcycleId = searchParams.get("motorcycleId");

    if (!motorcycleId) {
      return NextResponse.json({ success: false, error: "motorcycleId wajib diisi" }, { status: 400 });
    }

    const motorcycle = await getMotorcycleById(motorcycleId);
    if (!motorcycle) {
      return NextResponse.json({ success: false, error: "Motor tidak ditemukan" }, { status: 404 });
    }

    const compatibleTires = await getTiresBySizeFlexible(
      motorcycle.frontTire.size,
      motorcycle.rearTire.size
    );

    const tires = compatibleTires.map(({ tire, matchedFront, matchedRear }) => ({
      id: tire.id,
      fullName: tire.fullName,
      brand: tire.brand,
      pattern: tire.pattern,
      compound: tire.compound,
      tireType: tire.tireType,
      price: tire.price,
      rating: tire.rating,
      matchedFront: matchedFront?.label,
      matchedRear: matchedRear?.label,
    }));

    tires.sort((a, b) => b.rating - a.rating || a.price - b.price);

    return NextResponse.json({
      success: true,
      motorcycle: {
        id: motorcycle.id,
        fullName: motorcycle.fullName,
        frontTire: motorcycle.frontTire.size.label,
        rearTire: motorcycle.rearTire.size.label,
      },
      tires,
      count: tires.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal mengambil data";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}