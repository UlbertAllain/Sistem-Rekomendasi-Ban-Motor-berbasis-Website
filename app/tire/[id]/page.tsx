"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface TireSize {
  width: number;
  profile: number;
  rim: number;
  label: string;
}

interface Tire {
  id: string;
  brand: string;
  model: string;
  fullName: string;
  sizes: TireSize[];
  tireType: string;
  compound: string;
  pattern: string;
  roadConditions: string[];
  price: number;
  rating: number;
  features: string[];
  description: string;
  stock: number;
}

interface CompatibleMotor {
  id: string;
  fullName: string;
  brand: string;
  category: string;
  engineCC: number;
}

const VECTOR_LABELS = ["Grip", "Daya Tahan", "Kenyamanan", "Cocok Jalan", "Harga", "Rating"];
const ROAD_LABELS: Record<string, string> = {
  smooth_asphalt: "Aspal Halus",
  rough_asphalt: "Aspal Kasar",
  gravel: "Kerikil/Tanah",
  mixed: "Campuran",
};

export default function TireDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [tire, setTire] = useState<Tire | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tireVector, setTireVector] = useState<number[]>([]);
  const [compatibleMotors, setCompatibleMotors] = useState<CompatibleMotor[]>([]);

  useEffect(() => {
    const fetchTire = async () => {
      try {
        const res = await fetch(`/api/tires?id=${id}`);
        const json = await res.json();

        if (!json.success) {
          setError(json.error);
          return;
        }

        setTire(json.data);

        // Hitung vektor fitur untuk semua kondisi jalan
        const roads = ["smooth_asphalt", "rough_asphalt", "gravel", "mixed"] as const;
        // Ambil vektor untuk smooth_asphalt sebagai default
        const { getTireVector } = await import("@/lib/utils/featureVector");
        const vec = getTireVector(json.data, "smooth_asphalt");
        setTireVector(vec);

        // Cari motor kompatibel
        const motoRes = await fetch("/api/motorcycles");
        const motoJson = await motoRes.json();
        if (motoJson.success) {
          const motors = motoJson.data as CompatibleMotor[];
          // Import getTiresBySizeFlexible gak bisa di client, jadi kita match manual
          const compatible = motors.filter((m: CompatibleMotor) => {
            // Cek lewat API filter ban
            return true; // Nanti kita filter di backend
          });
          setCompatibleMotors(motors.slice(0, 10)); // Sementara tampil 10 dulu
        }
      } catch {
        setError("Gagal memuat data ban");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTire();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-sm text-gray-400">Memuat data ban...</div>
      </div>
    );
  }

  if (error || !tire) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">😕</div>
          <p className="text-sm text-gray-500 mb-4">{error || "Ban tidak ditemukan"}</p>
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
            <span className="text-gray-600">{tire.fullName}</span>
          </div>

          {/* HEADER */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{tire.brand}</span>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 mt-1">{tire.fullName}</h1>
                <p className="text-sm text-gray-400 mt-1">{tire.model} · {tire.pattern} · {tire.compound} compound · {tire.tireType.replace("_", " ")}</p>
              </div>
              <div className="text-left md:text-right flex-shrink-0">
                <div className="text-2xl font-black text-gray-900">Rp{tire.price.toLocaleString("id-ID")}</div>
                <div className="text-xs text-gray-400">per biji</div>
                <div className="flex items-center gap-1 mt-1 justify-end">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm font-semibold text-gray-700">{tire.rating}</span>
                  <span className="text-xs text-gray-400">/ 5</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="flex gap-2 flex-wrap mt-4 pt-4 border-t border-gray-100">
              {tire.features.map((f) => (
                <span key={f} className="text-xs px-2.5 py-1 bg-amber-50 text-amber-700 rounded font-medium">{f}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* KOLOM KIRI */}
            <div className="lg:col-span-2 space-y-6">

              {/* Deskripsi */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h2 className="text-sm font-bold text-gray-900 mb-2">Deskripsi</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{tire.description}</p>
              </div>

              {/* Ukuran Tersedia */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h2 className="text-sm font-bold text-gray-900 mb-3">Ukuran Tersedia ({tire.sizes.length} ukuran)</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {tire.sizes.map((s) => (
                    <div key={s.label} className="bg-gray-50 border border-gray-100 rounded px-3 py-2 text-center">
                      <div className="text-sm font-mono font-bold text-gray-700">{s.label}</div>
                      <div className="text-xs text-gray-400">{s.width}/{s.profile}-R{s.rim}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kondisi Jalan */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h2 className="text-sm font-bold text-gray-900 mb-3">Kondisi Jalan yang Cocok</h2>
                <div className="flex gap-2 flex-wrap">
                  {tire.roadConditions.map((rc) => (
                    <span key={rc} className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-600 rounded-full font-medium">
                      {ROAD_LABELS[rc] || rc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info Tambahan */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h2 className="text-sm font-bold text-gray-900 mb-3">Informasi</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-400">Tipe</div>
                    <div className="text-sm font-semibold text-gray-700 mt-0.5">{tire.tireType.replace("_", " ")}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Compound</div>
                    <div className="text-sm font-semibold text-gray-700 mt-0.5 capitalize">{tire.compound}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Pattern</div>
                    <div className="text-sm font-semibold text-gray-700 mt-0.5 capitalize">{tire.pattern}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Stok</div>
                    <div className="text-sm font-semibold text-gray-700 mt-0.5">{tire.stock} unit</div>
                  </div>
                </div>
              </div>
            </div>

            {/* KOLOM KANAN: VEKTOR */}
            <div className="lg:col-span-1 space-y-6">

              {/* Vektor Fitur */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h2 className="text-sm font-bold text-gray-900 mb-1">Vektor Fitur</h2>
                <p className="text-xs text-gray-400 mb-4">Kondisi jalan: Aspal Halus</p>

                <div className="space-y-3">
                  {tireVector.map((val, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">{VECTOR_LABELS[i]}</span>
                        <span className="text-xs font-mono font-bold text-gray-700">{val.toFixed(2)}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full rounded-full bg-amber-500"
                          style={{ width: `${val * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                <h2 className="text-sm font-bold text-amber-700 mb-2">Tertarik dengan ban ini?</h2>
                <p className="text-xs text-amber-600 mb-3">Coba rekomendasikan ban ini untuk motormu dan lihat skor similarity-nya.</p>
                <Link
                  href="/recommend"
                  className="block w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg text-center transition-colors"
                >
                  Cek Rekomendasi →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}