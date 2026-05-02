"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type RoadCondition = "smooth_asphalt" | "rough_asphalt" | "gravel" | "mixed";

interface Motorcycle {
  id: string;
  fullName: string;
  brand: string;
  category: string;
  engineCC: number;
  frontTire: { size: { label: string } };
  rearTire: { size: { label: string } };
}

interface CBFResult {
  tire: {
    id: string;
    fullName: string;
    brand: string;
    model: string;
    compound: string;
    pattern: string;
    tireType: string;
    price: number;
    rating: number;
    features: string[];
  };
  matchedSize: { front?: { label: string }; rear?: { label: string } };
  similarityScore: number;
  tireVector: number[];
  reason: string;
}

interface WSMResult {
  tire: {
    id: string;
    fullName: string;
    brand: string;
    compound: string;
    pattern: string;
    price: number;
    rating: number;
  };
  totalScore: number;
  scoreBreakdown: {
    roadConditionScore: number;
    ridingStyleScore: number;
    budgetScore: number;
    priorityScore: number;
    ratingScore: number;
  };
  reason: string;
}

interface CompareAnalysis {
  rankCorrelation: number;
  topMatch: boolean;
  cbfUniqueTop: string | null;
  wsmUniqueTop: string | null;
  avgRankDifference: number;
  description: string;
}

const ROAD_LABELS: Record<RoadCondition, string> = {
  smooth_asphalt: "Aspal Halus",
  rough_asphalt: "Aspal Kasar / Berlubang",
  gravel: "Kerikil / Tanah",
  mixed: "Campuran",
};

const SLIDERS = [
  { key: "grip", label: "Grip / Cengkeraman", description: "Seberapa penting ban ngegrab aspal" },
  { key: "durability", label: "Daya Tahan", description: "Seberapa penting ban awet dan tahan lama" },
  { key: "comfort", label: "Kenyamanan", description: "Seberapa penting riding nyaman tanpa getaran" },
  { key: "roadMatch", label: "Kesesuaian Jalan", description: "Seberapa penting ban cocok dengan jalan lo" },
  { key: "price", label: "Harga Terjangkau", description: "Seberapa penting ban harganya murah" },
  { key: "rating", label: "Rating Pengguna", description: "Seberapa penting ban punya rating bagus" },
];

const VECTOR_LABELS = ["Grip", "Daya Tahan", "Kenyamanan", "Cocok Jalan", "Harga", "Rating"];

type ViewMode = "cbf" | "compare";

export default function RecommendPage() {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [cbfResults, setCBFResults] = useState<CBFResult[]>([]);
  const [wsmResults, setWSMResults] = useState<WSMResult[]>([]);
  const [analysis, setAnalysis] = useState<CompareAnalysis | null>(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("cbf");

  const [selectedMotorcycle, setSelectedMotorcycle] = useState("");
  const [roadCondition, setRoadCondition] = useState<RoadCondition>("smooth_asphalt");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [sliders, setSliders] = useState({
    grip: 0.5,
    durability: 0.5,
    comfort: 0.5,
    roadMatch: 0.5,
    price: 0.5,
    rating: 0.5,
  });

  const loadMotorcycles = async () => {
    try {
      const res = await fetch("/api/motorcycles");
      const json = await res.json();
      if (json.success) setMotorcycles(json.data);
    } catch { /* silent */ }
  };

  const handleSliderChange = (key: string, value: string) => {
    setSliders((prev) => ({ ...prev, [key]: parseFloat(value) }));
  };

  const handleRecommend = async () => {
    setLoading(true);
    setError("");
    setCBFResults([]);
    setWSMResults([]);
    setAnalysis(null);
    setHasSearched(true);

    try {
      const body: Record<string, unknown> = {
        roadCondition,
        userProfile: sliders,
        top: 5,
      };

      if (selectedMotorcycle) body.motorcycleId = selectedMotorcycle;
      if (budgetMin) body.budgetMin = budgetMin;
      if (budgetMax) body.budgetMax = budgetMax;

      // Mode biasa: hanya CBF
      if (viewMode === "cbf") {
        const res = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (!json.success) { setError(json.error); return; }
        setCBFResults(json.results);
        setSummary(json.summary);
      }

      // Mode compare: CBF + WSM sekaligus
      if (viewMode === "compare") {
        const res = await fetch("/api/compare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (!json.success) { setError(json.error); return; }
        setCBFResults(json.cbf.results);
        setWSMResults(json.wsm.results);
        setAnalysis(json.analysis);
        setSummary(json.cbf.summary);
      }
    } catch { setError("Gagal terhubung ke server"); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadMotorcycles(); }, []);

  const selectedMoto = motorcycles.find((m) => m.id === selectedMotorcycle);
  const inputClass = "w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500";
  const labelClass = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider";

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
          <span className="text-xs font-medium text-gray-400">Rekomendasi</span>
        </div>
      </nav>

      <main className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900">Cari Ban Untuk Motormu</h1>
            <p className="text-sm text-gray-400 mt-1">Atur preferensi, sistem mencari ban paling mirip.</p>
          </div>

          {/* VIEW MODE TOGGLE */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setViewMode("cbf")}
              className={`text-xs font-semibold px-4 py-2 rounded-lg border transition-colors ${
                viewMode === "cbf"
                  ? "bg-amber-600 text-white border-amber-600"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
              }`}
            >
              CBF Only
            </button>
            <button
              onClick={() => setViewMode("compare")}
              className={`text-xs font-semibold px-4 py-2 rounded-lg border transition-colors ${
                viewMode === "compare"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
              }`}
            >
              CBF vs WSM (Bandingkan)
            </button>
          </div>

          {viewMode === "compare" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-5 text-xs text-blue-700">
              <strong>Mode Perbandingan:</strong> Kedua metode akan dijalankan dengan input yang sama. CBF menerima vektor preferensi langsung dari slider, WSM mengonversi slider menjadi riding style + priority. Hasil ditampilkan side-by-side untuk analisis.
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            {/* KOLOM KIRI: FILTER */}
            <div className="lg:col-span-1 space-y-5">
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <label className={labelClass}>Pilih Motor</label>
                <select value={selectedMotorcycle} onChange={(e) => setSelectedMotorcycle(e.target.value)} className={inputClass}>
                  <option value="">-- Pilih motor --</option>
                  {motorcycles.map((m) => (
                    <option key={m.id} value={m.id}>{m.fullName} ({m.engineCC}cc)</option>
                  ))}
                </select>
                {selectedMoto && (
                  <div className="mt-2 flex gap-3 text-xs text-gray-400">
                    <span>Depan: {selectedMoto.frontTire.size.label}</span>
                    <span>Belakang: {selectedMoto.rearTire.size.label}</span>
                    <Link href={`/motorcycle/${selectedMoto.id}`} className="text-amber-600 hover:underline font-medium">Detail →</Link>
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <label className={labelClass}>Kondisi Jalan</label>
                <select value={roadCondition} onChange={(e) => setRoadCondition(e.target.value as RoadCondition)} className={inputClass}>
                  {Object.entries(ROAD_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <label className={labelClass}>Budget (Rp)</label>
                <div className="flex gap-3">
                  <input type="number" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} placeholder="Min" className={inputClass} />
                  <input type="number" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} placeholder="Max" className={inputClass} />
                </div>
              </div>

              <button
                onClick={handleRecommend}
                disabled={loading}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? "Menghitung..." : viewMode === "compare" ? "Bandingkan Kedua Metode" : "Dapatkan Rekomendasi"}
              </button>
            </div>

            {/* KOLOM KANAN: SLIDER */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5">
              <div className="mb-5">
                <h2 className="text-base font-bold text-gray-900">Profil Preferensi Kamu</h2>
                <p className="text-xs text-gray-400 mt-0.5">0 = gak penting, 1 = sangat penting</p>
              </div>
              <div className="space-y-5">
                {SLIDERS.map((s) => (
                  <div key={s.key}>
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-sm font-semibold text-gray-700">{s.label}</span>
                        <span className="text-xs text-gray-400 ml-2">{s.description}</span>
                      </div>
                      <span className="text-sm font-mono font-bold text-amber-600">{sliders[s.key as keyof typeof sliders].toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={sliders[s.key as keyof typeof sliders]}
                      onChange={(e) => handleSliderChange(s.key, e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-sm text-red-600">{error}</div>
          )}

          {/* ANALISIS PERBANDINGAN */}
          {analysis && viewMode === "compare" && (
            <div className="bg-white border-2 border-blue-200 rounded-lg p-5 mb-6">
              <h2 className="text-base font-bold text-gray-900 mb-3">📊 Analisis Perbandingan</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-black text-blue-600">{(analysis.rankCorrelation * 100).toFixed(0)}%</div>
                  <div className="text-xs text-gray-400 mt-1">Kesamaan Peringkat</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-black">{analysis.topMatch ? "✅" : "❌"}</div>
                  <div className="text-xs text-gray-400 mt-1">Rank #1 Sama</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-black text-gray-900">{analysis.avgRankDifference.toFixed(1)}</div>
                  <div className="text-xs text-gray-400 mt-1">Avg Rank Diff</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-black text-gray-900">{cbfResults.length}/{wsmResults.length}</div>
                  <div className="text-xs text-gray-400 mt-1">Jumlah Hasil</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{analysis.description}</p>
              {!analysis.topMatch && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs text-amber-700">
                  <strong>Perbedaan menarik:</strong> CBF memilih <strong>{analysis.cbfUniqueTop}</strong> sebagai #1, sedangkan WSM memilih <strong>{analysis.wsmUniqueTop}</strong>. Ini menunjukkan bahwa pendekatan kemiripan vektor (CBF) dan pendekatan pembobotan (WSM) dapat menghasilkan rekomendasi yang berbeda meskipun input dasarnya sama.
                </div>
              )}
            </div>
          )}

          {/* SUMMARY */}
          {summary && !analysis && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-700">{summary}</div>
          )}

          {/* EMPTY STATE */}
          {hasSearched && cbfResults.length === 0 && !error && (
            <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm text-gray-400">Tidak ditemukan ban yang sesuai.</p>
            </div>
          )}

          {/* === HASIL CBF ONLY === */}
          {viewMode === "cbf" && cbfResults.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Hasil CBF ({cbfResults.length} ban)</h2>
              {cbfResults.map((r, idx) => {
                const pct = (r.similarityScore * 100).toFixed(1);
                return (
                  <div key={r.tire.id} className={`bg-white rounded-lg p-5 ${idx === 0 ? "border-2 border-amber-400" : "border border-gray-200"}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className={`text-xs font-bold uppercase ${idx === 0 ? "text-amber-600" : "text-gray-400"}`}>
                          {idx === 0 ? "★ Paling Mirip" : `#${idx + 1}`}
                        </span>
                        <Link href={`/tire/${r.tire.id}`} className="text-lg font-bold text-gray-900 mt-0.5 hover:text-amber-600 transition-colors block">
                          {r.tire.fullName}
                        </Link>
                        <p className="text-xs text-gray-400 mt-0.5">{r.tire.brand} · {r.tire.pattern} · {r.tire.compound}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-black ${idx === 0 ? "text-amber-600" : "text-gray-900"}`}>{pct}%</div>
                        <div className="text-xs text-gray-400">similarity</div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap mb-3">
                      <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-700 rounded">Rp{r.tire.price.toLocaleString("id-ID")}</span>
                      {r.matchedSize.front && <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-500 rounded">D: {r.matchedSize.front.label}</span>}
                      {r.matchedSize.rear && <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-500 rounded">B: {r.matchedSize.rear.label}</span>}
                      <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-500 rounded">⭐ {r.tire.rating}/5</span>
                    </div>
                    <p className="text-sm text-gray-600">💡 {r.reason}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* === HASIL COMPARE: SIDE BY SIDE === */}
          {viewMode === "compare" && (cbfResults.length > 0 || wsmResults.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* KOLOM CBF */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                  <h2 className="text-sm font-bold text-gray-900">CBF (Cosine Similarity)</h2>
                  <span className="text-xs text-gray-400">— {cbfResults.length} ban</span>
                </div>
                <div className="space-y-3">
                  {cbfResults.map((r, idx) => (
                    <div key={r.tire.id} className={`bg-white rounded-lg p-4 ${idx === 0 ? "border-2 border-amber-400" : "border border-gray-200"}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-amber-600">#{idx + 1}</span>
                          <Link href={`/tire/${r.tire.id}`} className="text-sm font-bold text-gray-900 hover:text-amber-600 transition-colors block truncate">
                            {r.tire.fullName}
                          </Link>
                        </div>
                        <div className="text-lg font-black text-amber-600 flex-shrink-0 ml-2">
                          {(r.similarityScore * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">{r.tire.brand} · {r.tire.pattern} · {r.tire.compound}</div>
                    </div>
                  ))}
                  {cbfResults.length === 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-sm text-gray-400">Tidak ada hasil</div>
                  )}
                </div>
              </div>

              {/* KOLOM WSM */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <h2 className="text-sm font-bold text-gray-900">WSM (Weighted Sum)</h2>
                  <span className="text-xs text-gray-400">— {wsmResults.length} ban</span>
                </div>
                <div className="space-y-3">
                  {wsmResults.map((r, idx) => (
                    <div key={r.tire.id} className={`bg-white rounded-lg p-4 ${idx === 0 ? "border-2 border-blue-400" : "border border-gray-200"}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-blue-600">#{idx + 1}</span>
                          <Link href={`/tire/${r.tire.id}`} className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors block truncate">
                            {r.tire.fullName}
                          </Link>
                        </div>
                        <div className="text-lg font-black text-blue-600 flex-shrink-0 ml-2">
                          {r.totalScore}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">{r.tire.brand} · {r.tire.pattern} · {r.tire.compound}</div>
                    </div>
                  ))}
                  {wsmResults.length === 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-sm text-gray-400">Tidak ada hasil</div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}