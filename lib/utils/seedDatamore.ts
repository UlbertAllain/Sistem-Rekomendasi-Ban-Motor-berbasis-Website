// // lib/utils/seedDataMore.ts

// import { Tire } from "../types/tire";
// export const SEED_TIRES_MORE: Omit<Tire, "id" | "createdAt" | "updatedAt">[] = [
//   // ==========================================
//   // SCOOTER / MATIC - GRIP TINGGI / RACING (Smooth/Rough Asphalt)
//   // ==========================================
//   {
//     brand: "Swallow", model: "Projax", fullName: "Swallow Projax",
//     sizes: [
//       { width: 80, profile: 90, rim: 14, label: "80/90-14" }, { width: 90, profile: 80, rim: 14, label: "90/80-14" },
//       { width: 100, profile: 80, rim: 14, label: "100/80-14" }, { width: 110, profile: 70, rim: 14, label: "110/70-14" },
//       { width: 120, profile: 70, rim: 14, label: "120/70-14" }, { width: 100, profile: 90, rim: 12, label: "100/90-12" },
//       { width: 110, profile: 90, rim: 12, label: "110/90-12" }
//     ],
//     tireType: "tubeless", compound: "soft", pattern: "scooter",
//     roadConditions: ["smooth_asphalt", "rough_asphalt"], price: 215000, rating: 4.5,
//     features: ["Grip tajam", "V-pattern agresif", "Favorit balap liar"],
//     description: "Ban matic legendaris dari Swallow, terkenal banget gripnya tajam buat harian yang suka cornering.", stock: 250,
//   },
//   {
//     brand: "Corsa", model: "Dytran", fullName: "Corsa Dytran",
//     sizes: [
//       { width: 90, profile: 80, rim: 14, label: "90/80-14" }, { width: 100, profile: 80, rim: 14, label: "100/80-14" },
//       { width: 110, profile: 70, rim: 14, label: "110/70-14" }, { width: 110, profile: 90, rim: 12, label: "110/90-12" }
//     ],
//     tireType: "tubeless", compound: "soft", pattern: "scooter",
//     roadConditions: ["smooth_asphalt", "rough_asphalt"], price: 245000, rating: 4.6,
//     features: ["W-pattern agresif", "Grip basah baik", "Desain sporty"],
//     description: "Ban matic premium Corsa, fokus pada grip dan handling eksklusif untuk scooter.", stock: 120,
//   },
//   {
//     brand: "Pirelli", model: "Diablo Scooter", fullName: "Pirelli Diablo Scooter",
//     sizes: [
//       { width: 100, profile: 80, rim: 14, label: "100/80-14" }, { width: 110, profile: 70, rim: 14, label: "110/70-14" },
//       { width: 120, profile: 70, rim: 14, label: "120/70-14" }, { width: 130, profile: 70, rim: 14, label: "130/70-14" }
//     ],
//     tireType: "tubeless", compound: "soft", pattern: "scooter",
//     roadConditions: ["smooth_asphalt"], price: 550000, rating: 4.9,
//     features: ["Premium sport", "Grip maksimal basah/kering", "Teknologi MotoGP"],
//     description: "Ban matic premium Pirelli, mengadopsi teknologi balap untuk skutik kelas atas.", stock: 40,
//   },
//   {
//     brand: "Michelin", model: "Power Pure SC", fullName: "Michelin Power Pure SC",
//     sizes: [
//       { width: 110, profile: 70, rim: 14, label: "110/70-14" }, { width: 120, profile: 70, rim: 14, label: "120/70-14" },
//       { width: 130, profile: 70, rim: 14, label: "130/70-14" }
//     ],
//     tireType: "tubeless", compound: "soft", pattern: "scooter",
//     roadConditions: ["smooth_asphalt"], price: 510000, rating: 4.8,
//     features: ["2CT Dual Compound", "Ban ringan", "Grip ekstrem"],
//     description: "Ban scooter premium Michelin, menggunakan Dual Compound untuk grip maksimal di lekukan.", stock: 35,
//   },

//   // ==========================================
//   // SCOOTER / MATIC - AWET / EKONOMIS (Smooth/Mixed)
//   // ==========================================
//   {
//     brand: "IRC", model: "Skybe", fullName: "IRC Skybe",
//     sizes: [
//       { width: 80, profile: 90, rim: 14, label: "80/90-14" }, { width: 90, profile: 80, rim: 14, label: "90/80-14" },
//       { width: 100, profile: 80, rim: 14, label: "100/80-14" }, { width: 100, profile: 90, rim: 12, label: "100/90-12" }
//     ],
//     tireType: "tubeless", compound: "hard", pattern: "scooter",
//     roadConditions: ["smooth_asphalt", "rough_asphalt", "mixed"], price: 155000, rating: 4.1,
//     features: ["Ekonomis", "Tahan lama banget", "OEM bawaan pabrik"],
//     description: "Ban matic IRC yang fokus pada daya tahan, sering jadi bawaan standar pabrik Honda.", stock: 400,
//   },
//   {
//     brand: "FDR", model: "Hyperstreet", fullName: "FDR Hyperstreet",
//     sizes: [
//       { width: 90, profile: 80, rim: 14, label: "90/80-14" }, { width: 100, profile: 80, rim: 14, label: "100/80-14" },
//       { width: 110, profile: 70, rim: 14, label: "110/70-14" }, { width: 110, profile: 90, rim: 12, label: "110/90-12" }
//     ],
//     tireType: "tubeless", compound: "medium", pattern: "scooter",
//     roadConditions: ["smooth_asphalt", "rough_asphalt", "mixed"], price: 165000, rating: 4.2,
//     features: ["All-rounder", "Tidak berisik", "Cocok ojol"],
//     description: "Ban matic FDR andalan untuk harian, seimbang antara daya tahan dan kenyamanan.", stock: 350,
//   },
//   {
//     brand: "Aspira", model: "Eko", fullName: "Aspira Eko",
//     sizes: [
//       { width: 80, profile: 90, rim: 14, label: "80/90-14" }, { width: 90, profile: 80, rim: 14, label: "90/80-14" },
//       { width: 100, profile: 90, rim: 12, label: "100/90-12" }, { width: 110, profile: 90, rim: 12, label: "110/90-12" }
//     ],
//     tireType: "tubeless", compound: "hard", pattern: "scooter",
//     roadConditions: ["smooth_asphalt", "mixed"], price: 135000, rating: 3.9,
//     features: ["Harga sangat murah", "Awet", "Pilihan budget"],
//     description: "Ban lokal Aspira untuk budget terbatas, menawarkan daya tahan yang lumayan.", stock: 500,
//   },

//   // ==========================================
//   // SPORT 150cc - 250cc (Smooth / Rough Asphalt)
//   // ==========================================
//   {
//     brand: "Pirelli", model: "Angel City", fullName: "Pirelli Angel City",
//     sizes: [
//       { width: 90, profile: 80, rim: 17, label: "90/80-17" }, { width: 100, profile: 80, rim: 17, label: "100/80-17" },
//       { width: 110, profile: 70, rim: 17, label: "110/70-17" }, { width: 120, profile: 70, rim: 17, label: "120/70-17" },
//       { width: 130, profile: 70, rim: 17, label: "130/70-17" }, { width: 140, profile: 70, rim: 17, label: "140/70-17" }
//     ],
//     tireType: "tubeless", compound: "medium", pattern: "sport",
//     roadConditions: ["smooth_asphalt", "rough_asphalt", "mixed"], price: 470000, rating: 4.7,
//     features: ["Daya tahan 30% lebih lama", "Grip basah/kering solid", "Urban commuting"],
//     description: "Penerus Pirelli Angel, dirancang khusus untuk motor sport di jalanan kota Asia.", stock: 90,
//   },
//   {
//     brand: "Dunlop", model: "TT900 GP", fullName: "Dunlop TT900 GP",
//     sizes: [
//       { width: 90, profile: 80, rim: 17, label: "90/80-17" }, { width: 100, profile: 80, rim: 17, label: "100/80-17" },
//       { width: 110, profile: 70, rim: 17, label: "110/70-17" }, { width: 120, profile: 70, rim: 17, label: "120/70-17" },
//       { width: 130, profile: 70, rim: 17, label: "130/70-17" }, { width: 140, profile: 70, rim: 17, label: "140/70-17" }
//     ],
//     tireType: "tubeless", compound: "soft", pattern: "sport",
//     roadConditions: ["smooth_asphalt"], price: 345000, rating: 4.5,
//     features: ["Grip agresif", "Responsif", "Kompetitif di kelasnya"],
//     description: "Ban sport Dunlop dengan compound lunak, andalan untuk harian yang agresif atau trackday.", stock: 110,
//   },
//   {
//     brand: "Bridgestone", model: "Battlax S20", fullName: "Bridgestone Battlax S20",
//     sizes: [
//       { width: 110, profile: 70, rim: 17, label: "110/70-17" }, { width: 120, profile: 70, rim: 17, label: "120/70-17" },
//       { width: 140, profile: 70, rim: 17, label: "140/70-17" }, { width: 150, profile: 60, rim: 17, label: "150/60-17" }
//     ],
//     tireType: "tubeless", compound: "soft", pattern: "sport",
//     roadConditions: ["smooth_asphalt"], price: 520000, rating: 4.6,
//     features: ["Silicone compound", "Pemanasan cepat", "Handling ringan"],
//     description: "Ban sport premium Bridgestone, pemanasan cepat dan grip maksimal di segcu cuaca.", stock: 60,
//   },
//   {
//     brand: "Vredestein", model: "Centauro ST", fullName: "Vredestein Centauro ST",
//     sizes: [
//       { width: 100, profile: 80, rim: 17, label: "100/80-17" }, { width: 110, profile: 70, rim: 17, label: "110/70-17" },
//       { width: 120, profile: 70, rim: 17, label: "120/70-17" }, { width: 130, profile: 70, rim: 17, label: "130/70-17" }
//     ],
//     tireType: "tubeless", compound: "medium", pattern: "sport",
//     roadConditions: ["smooth_asphalt", "rough_asphalt"], price: 410000, rating: 4.4,
//     features: ["Ban Eropa", "Stabilitas tinggi", "Desain eksklusif"],
//     description: "Ban sport premium asal Eropa, stabilitas high-speed dan ketahanan yang sangat baik.", stock: 45,
//   },

//   // ==========================================
//   // TOURING / CRUISER / BIG BIKE (Mixed / Rough / Smooth)
//   // ==========================================
//   {
//     brand: "Metzeler", model: "Roadtec 01", fullName: "Metzeler Roadtec 01",
//     sizes: [
//       { width: 110, profile: 70, rim: 17, label: "110/70-17" }, { width: 120, profile: 70, rim: 17, label: "120/70-17" },
//       { width: 150, profile: 60, rim: 17, label: "150/60-17" }, { width: 160, profile: 60, rim: 17, label: "160/60-17" }
//     ],
//     tireType: "tubeless", compound: "medium", pattern: "touring",
//     roadConditions: ["smooth_asphalt", "rough_asphalt", "mixed"], price: 780000, rating: 4.8,
//     features: ["Touring premium", "Grip basah juara", "Kilometer awet"],
//     description: "Ban touring premium Metzeler, jadi standar pabrikan banyak motor big bike Eropa.", stock: 30,
//   },
//   {
//     brand: "Bridgestone", model: "Exedra", fullName: "Bridgestone Exedra",
//     sizes: [
//       { width: 90, profile: 90, rim: 17, label: "90/90-17" }, { width: 100, profile: 90, rim: 17, label: "100/90-17" },
//       { width: 130, profile: 70, rim: 17, label: "130/70-17" }, { width: 140, profile: 70, rim: 17, label: "140/70-17" }
//     ],
//     tireType: "tubeless", compound: "hard", pattern: "touring",
//     roadConditions: ["smooth_asphalt", "rough_asphalt"], price: 450000, rating: 4.5,
//     features: ["Khusus motor cruiser", "Dinding ban tebal", "Sangat awet"],
//     description: "Bridgestone Exedra dirancang khusus untuk motor cruiser/moge, nyaman dan tahan lama.", stock: 40,
//   },
//   {
//     brand: "Dunlop", model: "D404", fullName: "Dunlop D404",
//     sizes: [
//       { width: 100, profile: 90, rim: 17, label: "100/90-17" }, { width: 130, profile: 70, rim: 17, label: "130/70-17" }
//     ],
//     tireType: "tubeless", compound: "hard", pattern: "touring",
//     roadConditions: ["smooth_asphalt", "mixed"], price: 490000, rating: 4.4,
//     features: ["Cruiser classic", "Stabil", "Tahan beban berat"],
//     description: "Ban touring Dunlop untuk motor klasik dan cruiser, memberikan kenyamanan maksimal.", stock: 25,
//   },

//   // ==========================================
//   // CUB / BEBEK - CAMPURAN (Smooth / Rough / Mixed)
//   // ==========================================
//   {
//     brand: "Swallow", model: "K168", fullName: "Swallow K168",
//     sizes: [
//       { width: 70, profile: 90, rim: 17, label: "70/90-17" }, { width: 80, profile: 90, rim: 17, label: "80/90-17" },
//       { width: 90, profile: 90, rim: 17, label: "90/90-17" }
//     ],
//     tireType: "tube_type", compound: "medium", pattern: "cub",
//     roadConditions: ["smooth_asphalt", "rough_asphalt", "mixed"], price: 105000, rating: 4.2,
//     features: ["Grip segala medan", "Pola blok universal", "Murah"],
//     description: "Ban bebek Swallow legendaris yang bisa dipakai di aspal maupun jalan desa.", stock: 450,
//   },
//   {
//     brand: "IRC", model: "NR91 Gold", fullName: "IRC NR91 Gold",
//     sizes: [
//       { width: 70, profile: 90, rim: 17, label: "70/90-17" }, { width: 80, profile: 90, rim: 17, label: "80/90-17" },
//       { width: 90, profile: 90, rim: 17, label: "90/90-17" }
//     ],
//     tireType: "tube_type", compound: "medium", pattern: "cub",
//     roadConditions: ["smooth_asphalt", "rough_asphalt"], price: 130000, rating: 4.3,
//     features: ["OEM Yamaha", "Daya tahan 2 tahun", "Grip stabil"],
//     description: "Varian NR91 standar pabrikan, menawarkan keseimbangan sempurna untuk bebek harian.", stock: 300,
//   },
//   {
//     brand: "FDR", model: "Adrenalin", fullName: "FDR Adrenalin",
//     sizes: [
//       { width: 70, profile: 90, rim: 17, label: "70/90-17" }, { width: 80, profile: 90, rim: 17, label: "80/90-17" }
//     ],
//     tireType: "tube_type", compound: "soft", pattern: "cub",
//     roadConditions: ["smooth_asphalt"], price: 110000, rating: 4.0,
//     features: ["Compound lunak", "Akselerasi cepat", "Grip mepet"],
//     description: "Ban bebek FDR dengan compound lebih lunak untuk penggemar kecepatan di jalanan aspal.", stock: 200,
//   },

//   // ==========================================
//   // DUAL SPORT / ADVENTURE - KERIKIL & TANAH (Gravel / Mixed)
//   // ==========================================
//   {
//     brand: "Pirelli", model: "Scorpion Rally STR", fullName: "Pirelli Scorpion Rally STR",
//     sizes: [
//       { width: 80, profile: 100, rim: 21, label: "80/100-21" }, { width: 90, profile: 90, rim: 21, label: "90/90-21" },
//       { width: 100, profile: 100, rim: 18, label: "100/100-18" }, { width: 120, profile: 80, rim: 18, label: "120/80-18" },
//       { width: 130, profile: 80, rim: 17, label: "130/80-17" }, { width: 150, profile: 70, rim: 17, label: "150/70-17" }
//     ],
//     tireType: "tube_type", compound: "hard", pattern: "dual_sport",
//     roadConditions: ["gravel", "mixed", "rough_asphalt"], price: 620000, rating: 4.8,
//     features: ["Kerikil & Tanah juara", "Masih nyaman di aspal", "Desain Rally"],
//     description: "Ban ADV premium Pirelli, blok kokoh untuk kerikil/tanah tapi tetap aman di aspal tol.", stock: 50,
//   },
//   {
//     brand: "Metzeler", model: "Tourance Next", fullName: "Metzeler Tourance Next",
//     sizes: [
//       { width: 90, profile: 90, rim: 21, label: "90/90-21" }, { width: 110, profile: 80, rim: 18, label: "110/80-18" },
//       { width: 150, profile: 70, rim: 17, label: "150/70-17" }
//     ],
//     tireType: "tubeless", compound: "medium", pattern: "dual_sport",
//     roadConditions: ["mixed", "rough_asphalt", "smooth_asphalt"], price: 850000, rating: 4.9,
//     features: ["90% On-road / 10% Off-road", "Stabilitas touring", "Grip basah luar biasa"],
//     description: "Ban ADV Metzeler untuk touring jarak jauh, fokus di aspal tapi tetap mampu di tanah kering.", stock: 20,
//   },
//   {
//     brand: "Mizzle", model: "MR50 Pro", fullName: "Mizzle MR50 Pro",
//     sizes: [
//       { width: 70, profile: 100, rim: 21, label: "70/100-21" }, { width: 80, profile: 100, rim: 21, label: "80/100-21" },
//       { width: 100, profile: 100, rim: 18, label: "100/100-18" }, { width: 120, profile: 80, rim: 18, label: "120/80-18" }
//     ],
//     tireType: "tube_type", compound: "medium", pattern: "dual_sport",
//     roadConditions: ["gravel", "mixed"], price: 190000, rating: 4.1,
//     features: ["Harga bersahabat", "Blok rapat", "Cocok trabas weekend"],
//     description: "Ban dual sport Mizzle, pilihan ekonomis untuk motor trail yang sering nyelusup tanah.", stock: 150,
//   },
//   {
//     brand: "IRC", model: "GP-210", fullName: "IRC GP-210",
//     sizes: [
//       { width: 80, profile: 100, rim: 21, label: "80/100-21" }, { width: 90, profile: 90, rim: 21, label: "90/90-21" },
//       { width: 100, profile: 100, rim: 18, label: "100/100-18" }, { width: 110, profile: 100, rim: 18, label: "110/100-18" }
//     ],
//     tireType: "tube_type", compound: "medium", pattern: "dual_sport",
//     roadConditions: ["gravel", "mixed", "rough_asphalt"], price: 225000, rating: 4.4,
//     features: ["OEM Kawasaki/Suzuki Trail", "All condition", "Durable"],
//     description: "Ban trail standar pabrik, sangat bisa diandalkan untuk campuran aspal dan tanah.", stock: 100,
//   },

//   // ==========================================
//   // OFF-ROAD / MOTOCROSS MURNI (Gravel Only / Extreme)
//   // ==========================================
//   {
//     brand: "Dunlop", model: "Geomax MX33", fullName: "Dunlop Geomax MX33",
//     sizes: [
//       { width: 80, profile: 100, rim: 21, label: "80/100-21" }, { width: 90, profile: 100, rim: 21, label: "90/100-21" },
//       { width: 100, profile: 100, rim: 18, label: "100/100-18" }, { width: 110, profile: 100, rim: 18, label: "110/100-18" }
//     ],
//     tireType: "tube_type", compound: "soft", pattern: "dual_sport", // Pake dual_sport di vektormu biar masuk hitung
//     roadConditions: ["gravel"], price: 450000, rating: 4.7,
//     features: ["Motocross", "Tanah lunak/lumpur", "Blok super agresif"],
//     description: "Ban motocross Dunlop untuk lintasan tanah lunak dan lumpur, jangan dipakai di aspal!", stock: 40,
//   },
//   {
//     brand: "IRC", model: "M5B", fullName: "IRC M5B",
//     sizes: [
//       { width: 80, profile: 100, rim: 21, label: "80/100-21" }, { width: 100, profile: 100, rim: 18, label: "100/100-18" }
//     ],
//     tireType: "tube_type", compound: "soft", pattern: "dual_sport",
//     roadConditions: ["gravel"], price: 280000, rating: 4.5,
//     features: ["Enduro Indonesia", "Anti selip di lumpur", "Dinding ban kuat"],
//     description: "Ban enduro legendaris IRC, sangat populer di kalangan trail Indonesia.", stock: 75,
//   },
//   {
//     brand: "Pirelli", model: "Scorpion MX Soft", fullName: "Pirelli Scorpion MX Soft",
//     sizes: [
//       { width: 80, profile: 100, rim: 21, label: "80/100-21" }, { width: 100, profile: 100, rim: 18, label: "100/100-18" }
//     ],
//     tireType: "tube_type", compound: "soft", pattern: "dual_sport",
//     roadConditions: ["gravel"], price: 480000, rating: 4.6,
//     features: ["MX Racing", "Tanah pasir/lumpur", "Performa lomba"],
//     description: "Ban motocross Pirelli untuk kompetisi, memberikan traksi maksimal di tanah berpasir.", stock: 25,
//   }
// ];