import { NextResponse } from "next/server";
import { SEED_TIRES } from "@/lib/utils/seedData";
import { SEED_MOTORCYCLES } from "@/lib/utils/seedData";

export async function GET() {
  // 1. Proses Data Ban (Flatten array agar mudah dibaca Excel)
  const flatTires = SEED_TIRES.map((tire) => ({
    Merek: tire.brand,
    Model: tire.model,
    NamaLengkap: tire.fullName,
    Tipe: tire.tireType,
    Compound: tire.compound,
    Pattern: tire.pattern,
    UkuranTersedia: tire.sizes.map((s) => s.label).join("; "), // Digabung pakai titik koma
    KondisiJalan: tire.roadConditions.join("; "),
    Harga: tire.price,
    Rating: tire.rating,
    Fitur: tire.features.join("; "),
    Deskripsi: tire.description,
    Stok: tire.stock,
  }));

  // 2. Proses Data Motor
  const flatMotorcycles = SEED_MOTORCYCLES.map((moto) => ({
    Merek: moto.brand,
    Model: moto.model,
    NamaLengkap: moto.fullName,
    Tahun: moto.year,
    Kategori: moto.category,
    CC: moto.engineCC,
    UkuranBanDepan: moto.frontTire.size.label,
    TipeDepan: moto.frontTire.type,
    UkuranBanBelakang: moto.rearTire.size.label,
    TipeBelakang: moto.rearTire.type,
    BeratKg: moto.weightKg,
  }));

  // 3. Fungsi helper bikin CSV
  function generateCSV(data: Record<string, any>[]) {
    if (data.length === 0) return "";
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","), // Header row
      ...data.map((row) =>
        headers
          .map((header) => {
            let val = row[header];
            // Handle koma di dalam teks (dibungkus kutip)
            val = String(val).replace(/"/g, '""');
            return `"${val}"`;
          })
          .join(",")
      ),
    ];
    return csvRows.join("\n");
  }

  const csvTires = generateCSV(flatTires);
  const csvMotorcycles = generateCSV(flatMotorcycles);

  // Gabungin dua tabel dengan 2 baris kosong pemisah
  const finalCSV = csvTires + "\n\n\n" + csvMotorcycles;

  // 4. Return sebagai file CSV download
  return new NextResponse(finalCSV, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=Data_Rekomendasi_Ban.csv",
    },
  });
}