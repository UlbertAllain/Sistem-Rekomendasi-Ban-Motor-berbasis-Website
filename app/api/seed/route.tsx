// app/api/seed/route.tsx

import { NextRequest, NextResponse } from "next/server";
import { seedAll, clearAllData } from "@/lib/utils/seedData";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action");

  // Hanya boleh dijalankan di development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Seed endpoint hanya tersedia di development" },
      { status: 403 }
    );
  }

  try {
    switch (action) {
      case "seed":
        await seedAll();
        return NextResponse.json({ success: true, message: "Seed complete" });

      case "clear":
        await clearAllData();
        return NextResponse.json({ success: true, message: "All data cleared" });

      case "reset":
        await clearAllData();
        await seedAll();
        return NextResponse.json({ success: true, message: "Data reset complete" });

      default:
        return NextResponse.json({
          message: "Seed API",
          usage: "/api/seed?action=seed|clear|reset",
        });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Seed gagal";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}