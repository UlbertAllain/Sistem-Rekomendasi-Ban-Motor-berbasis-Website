"use client";

import { useState, useEffect, useMemo } from "react";
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

const ROAD_LABELS: Record<RoadCondition, string> = {
  smooth_asphalt: "Aspal Halus",
  rough_asphalt: "Aspal Kasar / Berlubang",
  gravel: "Kerikil / Tanah",
  mixed: "Campuran",
};

const SLIDERS = [
  { key: "grip", label: "Grip / Cengkeraman", description: "↑ Grip = ↑ Nyaman, ↓ Awet (Kompon empuk)" },
  { key: "durability", label: "Daya Tahan", description: "↑ Awet = ↓ Grip, ↓ Nyaman (Kompon keras)" },
  { key: "comfort", label: "Kenyamanan", description: "↑ Nyaman = ↑ Grip, ↓ Awet (Ban empuk)" },
  { key: "roadMatch", label: "Kesesuaian Jalan", description: "Seberapa penting ban cocok dengan jalan lo" },
  { key: "price", label: "Harga Terjangkau", description: "Seberapa penting ban harganya murah" },
  { key: "rating", label: "Rating Pengguna", description: "Seberapa penting ban punya rating bagus" },
];


export default function RecommendPage() {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [cbfResults, setCBFResults] = useState<CBFResult[]>([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedMotorcycle, setSelectedMotorcycle] = useState("");
  const [roadCondition, setRoadCondition] = useState<RoadCondition>("smooth_asphalt");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [sliders, setSliders] = useState({
    grip: 0.5, durability: 0.5, comfort: 0.5, roadMatch: 0.5, price: 0.5, rating: 0.5,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ==========================================
  // LOGIC PENGELOMPOKAN MOTOR (useMemo)
  // ==========================================
  const groupedMotorcycles = useMemo(() => {
    const groups: Record<string, Motorcycle[]> = {};
    
    motorcycles.forEach((moto) => {
      let groupName = "Lainnya";
      
      if (moto.category === "matic") {
        groupName = moto.engineCC >= 150 ? "Skutik Matic (Big/Sporty)" : "Skutik Matic (Standard)";
      } else if (moto.category === "cub") {
        groupName = "Bebek / Cub";
      } else if (moto.category === "sport" || moto.category === "naked") {
        groupName = moto.engineCC >= 250 ? "Kopling / Sport (250cc+)" : "Kopling / Sport (150cc)";
      } else if (moto.category === "dual_sport") {
        groupName = "Trail / Dual Sport";
      } else if (moto.category === "touring") {
        groupName = "Touring / Adventure";
      }

      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(moto);
    });

    // Sort motor dalam grup berdasarkan CC terkecil
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => a.engineCC - b.engineCC);
    });

    return groups;
  }, [motorcycles]);

  // ==========================================
  // LOGIC SEARCH & QUICK PICK
  // ==========================================
 

  const filteredMotorcycles = useMemo(() => {
    if (!searchTerm) return motorcycles;
    const lowerTerm = searchTerm.toLowerCase();
    return motorcycles.filter(
      (m) =>
        m.fullName.toLowerCase().includes(lowerTerm) ||
        m.brand.toLowerCase().includes(lowerTerm) ||
        m.engineCC.toString().includes(lowerTerm)
    );
  }, [motorcycles, searchTerm]);

  // Kelompokkan hasil filter
  const filteredGroups = useMemo(() => {
    const groups: Record<string, Motorcycle[]> = {};
    filteredMotorcycles.forEach((moto) => {
      let groupName = "Lainnya";
      if (moto.category === "matic") groupName = moto.engineCC >= 150 ? "Skutik Matic (Big/Sporty)" : "Skutik Matic (Standard)";
      else if (moto.category === "cub") groupName = "Bebek / Cub";
      else if (moto.category === "sport" || moto.category === "naked") groupName = moto.engineCC >= 250 ? "Kopling / Sport (250cc+)" : "Kopling / Sport (150cc)";
      else if (moto.category === "dual_sport") groupName = "Trail / Dual Sport";
      else if (moto.category === "touring") groupName = "Touring / Adventure";

      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(moto);
    });
    Object.keys(groups).forEach(key => groups[key].sort((a, b) => a.engineCC - b.engineCC));
    return groups;
  }, [filteredMotorcycles]);

  const loadMotorcycles = async () => {
    try {
      const res = await fetch("/api/motorcycles");
      const json = await res.json();
      if (json.success) setMotorcycles(json.data);
    } catch { /* silent */ }
  };

  const handleSliderChange = (key: string, uiValue: string) => {
    const apiValue = parseFloat(uiValue) / 100;
    const oldValue = sliders[key as keyof typeof sliders];
    const delta = apiValue - oldValue; // Hitung seberapa jauh slider digeser

    setSliders((prev) => {
      const next = { ...prev, [key]: apiValue };

      // ==========================================
      // LOGICA TRADE-OFF BAN (FISIKA BAN)
      // ==========================================
      if (key === "grip") {
        next.comfort = Math.min(1, Math.max(0, prev.comfort + delta));
        next.durability = Math.min(1, Math.max(0, prev.durability - delta));
      } else if (key === "comfort") {
        next.grip = Math.min(1, Math.max(0, prev.grip + delta));
        next.durability = Math.min(1, Math.max(0, prev.durability - delta));
      } else if (key === "durability") {
        next.grip = Math.min(1, Math.max(0, prev.grip - delta));
        next.comfort = Math.min(1, Math.max(0, prev.comfort - delta));
      }
      // ==========================================

      return next;
    });
  };

  const handleRecommend = async () => {
    setLoading(true);
    setError("");
    setCBFResults([]);
    setHasSearched(true);

    try {
      const body: Record<string, unknown> = {
        roadCondition,
        userProfile: sliders, // Kirim 0-1 ke backend
        top: 5,
      };

      if (selectedMotorcycle) body.motorcycleId = selectedMotorcycle;
      if (budgetMin) body.budgetMin = budgetMin;
      if (budgetMax) body.budgetMax = budgetMax;

      // Hanya memanggil API CBF
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!json.success) { setError(json.error); return; }
      
      setCBFResults(json.results);
      setSummary(json.summary);
    } catch { 
      setError("Gagal terhubung ke server"); 
    } finally { 
      setLoading(false); 
    }
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
          <span className="text-xs font-medium text-gray-400">Rekomendasi CBF</span>
        </div>
      </nav>

      <main className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900">Cari Ban Untuk Motormu</h1>
            <p className="text-sm text-gray-400 mt-1">Atur preferensi, sistem mencari ban paling mirip menggunakan CBF.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            {/* KOLOM KIRI: FILTER */}
            <div className="lg:col-span-1 space-y-5">
              
              {/* CUSTOM COMBOBOX MOTOR */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 relative">
                <label className={labelClass}>Pilih Motor</label>
                
                {/* INPUT SEARCH */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ketik nama motor..."
                    value={selectedMoto ? selectedMoto.fullName : searchTerm}
                    onChange={(e) => {
                      setSelectedMotorcycle(""); // Reset pilihan jika user ngetik ulang
                      setSearchTerm(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Delay agar onClick dropdown bisa kebaca
                    className={inputClass}
                  />
                  {selectedMoto && (
                    <button 
                      onClick={() => { setSelectedMotorcycle(""); setSearchTerm(""); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-sm font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

               
               

                {/* INFO UKURAN BAN (JIKA SUDAH PILIH) */}
                {selectedMoto && (
                  <div className="mt-2 flex gap-3 text-xs text-gray-400">
                    <span>Depan: {selectedMoto.frontTire.size.label}</span>
                    <span>Belakang: {selectedMoto.rearTire.size.label}</span>
                    <Link href={`/motorcycle/${selectedMoto.id}`} className="text-amber-600 hover:underline font-medium">Detail →</Link>
                  </div>
                )}

                {/* CUSTOM DROPDOWN LIST */}
                {isDropdownOpen && !selectedMoto && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-40 max-h-60 overflow-y-auto">
                    {Object.keys(filteredGroups).length === 0 ? (
                      <div className="p-3 text-xs text-gray-400 text-center">Motor tidak ditemukan</div>
                    ) : (
                      Object.entries(filteredGroups).map(([groupName, motos]) => (
                        <div key={groupName}>
                          <div className="px-3 py-1.5 text-xs font-bold text-gray-400 bg-gray-50 sticky top-0">{groupName}</div>
                          {motos.map((m) => (
                            <button
                              key={m.id}
                              onMouseDown={(e) => e.preventDefault()} // Cegah blur
                              onClick={() => {
                                setSelectedMotorcycle(m.id);
                                setSearchTerm("");
                                setIsDropdownOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-amber-50 flex justify-between items-center cursor-pointer"
                            >
                              <span className="font-medium text-gray-800">{m.fullName}</span>
                              <span className="text-xs text-gray-400">{m.engineCC}cc</span>
                            </button>
                          ))}
                        </div>
                      ))
                    )}
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
                {loading ? "Menghitung..." : "Dapatkan Rekomendasi"}
              </button>
            </div>

            {/* KOLOM KANAN: SLIDER PERSEN */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5">
              <div className="mb-5">
                <h2 className="text-base font-bold text-gray-900">Profil Preferensi Kamu</h2>
                <p className="text-xs text-gray-400 mt-0.5">0% = gak penting, 100% = sangat penting</p>
              </div>
              
              <div className="space-y-5">
                {/* GRUP FISIKA BAN (GRIP, DURABILITY, COMFORT) */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-2">
                  <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">⚖️ Trade-off Karakter Ban</h3>
                  <div className="space-y-5">
                    {SLIDERS.filter(s => ["grip", "durability", "comfort"].includes(s.key)).map((s) => {
                      const uiValue = Math.round(sliders[s.key as keyof typeof sliders] * 100);
                      return (
                        <div key={s.key}>
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <span className="text-sm font-semibold text-gray-700">{s.label}</span>
                              <span className="text-xs text-amber-600 ml-2">{s.description}</span>
                            </div>
                            <span className="text-sm font-mono font-bold text-amber-600 w-12 text-right">{uiValue}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={uiValue}
                            onChange={(e) => handleSliderChange(s.key, e.target.value)}
                            className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* SLIDER INDEPENDENT (ROADMATCH, PRICE, RATING) */}
                <div className="space-y-5">
                  {SLIDERS.filter(s => !["grip", "durability", "comfort"].includes(s.key)).map((s) => {
                    const uiValue = Math.round(sliders[s.key as keyof typeof sliders] * 100);
                    return (
                      <div key={s.key}>
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <span className="text-sm font-semibold text-gray-700">{s.label}</span>
                            <span className="text-xs text-gray-400 ml-2">{s.description}</span>
                          </div>
                          <span className="text-sm font-mono font-bold text-amber-600 w-12 text-right">{uiValue}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={uiValue}
                          onChange={(e) => handleSliderChange(s.key, e.target.value)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                        />
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-sm text-red-600">{error}</div>
          )}

          {/* SUMMARY */}
          {summary && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-700">{summary}</div>
          )}

          {/* EMPTY STATE */}
          {hasSearched && cbfResults.length === 0 && !error && (
            <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm text-gray-400">Tidak ditemukan ban yang sesuai dengan filter dan preferensi kamu.</p>
            </div>
          )}

          {/* HASIL CBF */}
          {cbfResults.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Hasil Rekomendasi ({cbfResults.length} ban)</h2>
              {cbfResults.map((r, idx) => {
                const pct = (r.similarityScore * 100).toFixed(1);
                return (
                  <div key={r.tire.id} className={`bg-white rounded-lg p-5 transition-all hover:shadow-md ${idx === 0 ? "border-2 border-amber-400" : "border border-gray-200"}`}>
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

        </div>
      </main>
    </div>
  );
}
