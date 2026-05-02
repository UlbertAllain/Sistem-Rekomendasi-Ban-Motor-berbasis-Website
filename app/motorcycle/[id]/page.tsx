"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Motorcycle {
  id: string;
  brand: string;
  model: string;
  fullName: string;
  year: number;
  category: string;
  engineCC: number;
  frontTire: { size: { label: string; width: number; profile: number; rim: number }; type: string };
  rearTire: { size: { label: string; width: number; profile: number; rim: number }; type: string };
  weightKg: number;
}

interface CompatibleTire {
  id: string;
  fullName: string;
  brand: string;
  pattern: string;
  compound: string;
  tireType: string;
  price: number;
  rating: number;
  matchedFront?: string;
  matchedRear?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  matic: "Matic / Skutik",
  cub: "Bebek / Cub",
  sport: "Sport",
  naked: "Naked",
  touring: "Touring",
  dual_sport: "Dual Sport",
  big_bike: "Big Bike",
};

export default function MotorcycleDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [tires, setTires] = useState<CompatibleTire[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<"rating" | "price-asc" | "price-desc">("rating");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch motor
        const motoRes = await fetch(`/api/motorcycles?id=${id}`);
        const motoJson = await motoRes.json();

        if (!motoJson.success) {
          setError(motoJson.error);
          return;
        }

        setMotorcycle(motoJson.data);

        // Fetch ban kompatibel
        const tiresRes = await fetch(`/api/motorcycle-tires?motorcycleId=${id}`);
        const tiresJson = await tiresRes.json();

        if (tiresJson.success) {
          setTires(tiresJson.tires);
        }
      } catch {
        setError("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const sortedTires = [...tires].sort((a, b) => {
    switch (sortBy) {
      case "rating": return b.rating - a.rating;
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      default: return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-sm text-gray-400">Memuat data motor...</div>
      </div>
    );
  }

  if (error || !motorcycle) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">😕</div>
          <p className="text-sm text-gray-500 mb-4">{error || "Motor tidak ditemukan"}</p>
          <Link href="/recommend" className="text-sm text-amber-600 font-semibold hover:underline">
            ← Kembali ke Rekomendasi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-amber-600 rounded-md flex items-center justify-center">
              <span className="text-white font-black text-xs">S</span>
            </div>
            <span className="font-bold text-sm text-gray-900">CariBanMu</span>
          </Link>
          <Link href="/recommend" className="text-xs font-medium text-amber-600 hover:underline">
            ← Kembali ke Rekomendasi
          </Link>
        </div>
      </nav>

      {/* MAIN */}
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">

          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
            <Link href="/" className="hover:text-gray-600">Beranda</Link>
            <span>/</span>
            <Link href="/recommend" className="hover:text-gray-600">Rekomendasi</Link>
            <span>/</span>
            <span className="text-gray-600">{motorcycle.fullName}</span>
          </div>

          {/* HEADER MOTOR */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{motorcycle.brand}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded">{CATEGORY_LABELS[motorcycle.category] || motorcycle.category}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900">{motorcycle.fullName}</h1>
                <p className="text-sm text-gray-400 mt-1">{motorcycle.model} · {motorcycle.year}</p>
              </div>
              <Link
                href={`/recommend?motorcycle=${motorcycle.id}`}
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Cari Ban Untuk Ini
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* KOLOM KIRI: SPESIFIKASI */}
            <div className="lg:col-span-1 space-y-5">

              {/* Spesifikasi Mesin */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h2 className="text-sm font-bold text-gray-900 mb-3">Spesifikasi</h2>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-400">Kapasitas Mesin</div>
                    <div className="text-sm font-semibold text-gray-700 mt-0.5">{motorcycle.engineCC} cc</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Kategori</div>
                    <div className="text-sm font-semibold text-gray-700 mt-0.5">{CATEGORY_LABELS[motorcycle.category] || motorcycle.category}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Tahun</div>
                    <div className="text-sm font-semibold text-gray-700 mt-0.5">{motorcycle.year}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Berat</div>
                    <div className="text-sm font-semibold text-gray-700 mt-0.5">{motorcycle.weightKg} kg</div>
                  </div>
                </div>
              </div>

              {/* Ukuran Ban */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h2 className="text-sm font-bold text-gray-900 mb-3">Ukuran Ban Bawaan</h2>
                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Depan</div>
                    <div className="text-lg font-black text-gray-900">{motorcycle.frontTire.size.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {motorcycle.frontTire.size.width}/{motorcycle.frontTire.size.profile}-R{motorcycle.frontTire.size.rim}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Tipe: {motorcycle.frontTire.type === "tubeless" ? "Tubeless" : "Tube Type"}
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                    <div className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Belakang</div>
                    <div className="text-lg font-black text-gray-900">{motorcycle.rearTire.size.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {motorcycle.rearTire.size.width}/{motorcycle.rearTire.size.profile}-R{motorcycle.rearTire.size.rim}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Tipe: {motorcycle.rearTire.type === "tubeless" ? "Tubeless" : "Tube Type"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KOLOM KANAN: BAN KOMPATIBEL */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-gray-900">Ban yang Cocok</h2>
                    <p className="text-xs text-gray-400 mt-0.5">{tires.length} ban tersedia untuk ukuran ini</p>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-gray-600 outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="rating">Rating Tertinggi</option>
                    <option value="price-asc">Harga Terendah</option>
                    <option value="price-desc">Harga Tertinggi</option>
                  </select>
                </div>

                {sortedTires.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-3xl mb-2">🔍</div>
                    <p className="text-sm text-gray-400">Tidak ada ban yang cocok dengan ukuran ini.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sortedTires.map((tire) => (
                      <div
                        key={tire.id}
                        className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {/* Info Ban */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/tire/${tire.id}`}
                            className="text-sm font-bold text-gray-900 hover:text-amber-600 transition-colors truncate block"
                          >
                            {tire.fullName}
                          </Link>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-gray-400">{tire.brand}</span>
                            <span className="text-xs text-gray-300">·</span>
                            <span className="text-xs text-gray-400 capitalize">{tire.pattern}</span>
                            <span className="text-xs text-gray-300">·</span>
                            <span className="text-xs text-gray-400 capitalize">{tire.compound}</span>
                            <span className="text-xs text-gray-300">·</span>
                            <span className="text-xs text-gray-400">{tire.tireType.replace("_", " ")}</span>
                          </div>
                          {/* Ukuran matched */}
                          <div className="flex gap-2 mt-1.5">
                            {tire.matchedFront && (
                              <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
                                D: {tire.matchedFront}
                              </span>
                            )}
                            {tire.matchedRear && (
                              <span className="text-xs px-2 py-0.5 bg-red-50 text-red-500 rounded">
                                B: {tire.matchedRear}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Harga & Rating */}
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-bold text-gray-900">Rp{tire.price.toLocaleString("id-ID")}</div>
                          <div className="flex items-center gap-0.5 justify-end mt-0.5">
                            <span className="text-yellow-500 text-xs">⭐</span>
                            <span className="text-xs font-semibold text-gray-600">{tire.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}