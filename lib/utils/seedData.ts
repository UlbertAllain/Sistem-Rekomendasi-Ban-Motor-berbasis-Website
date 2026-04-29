// lib/utils/seedData.ts

import { Tire } from "../types/tire";
import { Motorcycle } from "../types/motorcycle";
import { addTire } from "../services/tireService";
import { addMotorcycle } from "../services/motorcycleService";
import { adminDb } from "../firebase/admin";
import { SEED_TIRES_MORE } from "./seedDatamore";
import { SEED_MOTORCYCLES_MORE } from "./seedDataMoreMotorcycles";

// ==========================================
// DATA BAN MOTOR (18 ban)
// ==========================================
export const SEED_TIRES: Omit<Tire, "id" | "createdAt" | "updatedAt">[] = [
  // --- SPORT ---
  {
    brand: "IRC",
    model: "NR91",
    fullName: "IRC NR91",
    sizes: [
      { width: 80, profile: 80, rim: 17, label: "80/80-17" },
      { width: 90, profile: 80, rim: 17, label: "90/80-17" },
      { width: 100, profile: 80, rim: 17, label: "100/80-17" },
      { width: 110, profile: 70, rim: 17, label: "110/70-17" },
      { width: 120, profile: 70, rim: 17, label: "120/70-17" },
      { width: 130, profile: 70, rim: 17, label: "130/70-17" },
      { width: 140, profile: 70, rim: 17, label: "140/70-17" },
    ],
    tireType: "tubeless",
    compound: "medium",
    pattern: "sport",
    roadConditions: ["smooth_asphalt", "rough_asphalt"],
    price: 185000,
    rating: 4.2,
    features: ["Grip kering baik", "Handling stabil", "Harga terjangkau"],
    description: "Ban sport andalan IRC, populer di kalangan rider sport 150cc-250cc Indonesia.",
    stock: 150,
  },
  {
    brand: "Michelin",
    model: "Pilot Street",
    fullName: "Michelin Pilot Street",
    sizes: [
      { width: 90, profile: 80, rim: 17, label: "90/80-17" },
      { width: 100, profile: 80, rim: 17, label: "100/80-17" },
      { width: 110, profile: 70, rim: 17, label: "110/70-17" },
      { width: 120, profile: 70, rim: 17, label: "120/70-17" },
      { width: 130, profile: 70, rim: 17, label: "130/70-17" },
      { width: 140, profile: 70, rim: 17, label: "140/70-17" },
      { width: 150, profile: 60, rim: 17, label: "150/60-17" },
    ],
    tireType: "tubeless",
    compound: "soft",
    pattern: "sport",
    roadConditions: ["smooth_asphalt"],
    price: 420000,
    rating: 4.7,
    features: ["Grip maksimal", "Warm-up cepat", "Silica compound"],
    description: "Ban premium Michelin untuk sport bike, grip luar biasa di aspal kering.",
    stock: 80,
  },
  {
    brand: "Corsa",
    model: "R93",
    fullName: "Corsa R93",
    sizes: [
      { width: 80, profile: 80, rim: 17, label: "80/80-17" },
      { width: 90, profile: 80, rim: 17, label: "90/80-17" },
      { width: 100, profile: 80, rim: 17, label: "100/80-17" },
      { width: 110, profile: 70, rim: 17, label: "110/70-17" },
      { width: 130, profile: 70, rim: 17, label: "130/70-17" },
      { width: 140, profile: 70, rim: 17, label: "140/70-17" },
    ],
    tireType: "tubeless",
    compound: "soft",
    pattern: "sport",
    roadConditions: ["smooth_asphalt", "rough_asphalt"],
    price: 285000,
    rating: 4.3,
    features: ["Grip agresif", "Desain sporty", "Nilai tinggi"],
    description: "Ban sport Corsa dengan grip agresif, favorit rider yang suka cornering.",
    stock: 100,
  },

  // --- TOURING ---
  {
    brand: "Michelin",
    model: "City Grip 2",
    fullName: "Michelin City Grip 2",
    sizes: [
      { width: 80, profile: 90, rim: 14, label: "80/90-14" },
      { width: 90, profile: 80, rim: 14, label: "90/80-14" },
      { width: 90, profile: 90, rim: 14, label: "90/90-14" },
      { width: 100, profile: 80, rim: 14, label: "100/80-14" },
      { width: 110, profile: 70, rim: 14, label: "110/70-14" },
      { width: 120, profile: 70, rim: 14, label: "120/70-14" },
      { width: 70, profile: 90, rim: 17, label: "70/90-17" },
      { width: 80, profile: 90, rim: 17, label: "80/90-17" },
      { width: 90, profile: 90, rim: 17, label: "90/90-17" },
      { width: 100, profile: 80, rim: 17, label: "100/80-17" },
    ],
    tireType: "tubeless",
    compound: "medium",
    pattern: "touring",
    roadConditions: ["smooth_asphalt", "rough_asphalt", "mixed"],
    price: 350000,
    rating: 4.8,
    features: ["Daya tahan tinggi", "Grip basah excellent", "Nyaman"],
    description: "Ban touring premium Michelin, unggul di grip basah dan daya tahan.",
    stock: 120,
  },
  {
    brand: "IRC",
    model: "RX01",
    fullName: "IRC RX-01",
    sizes: [
      { width: 80, profile: 90, rim: 14, label: "80/90-14" },
      { width: 90, profile: 80, rim: 14, label: "90/80-14" },
      { width: 90, profile: 90, rim: 14, label: "90/90-14" },
      { width: 100, profile: 80, rim: 14, label: "100/80-14" },
      { width: 110, profile: 70, rim: 14, label: "110/70-14" },
      { width: 70, profile: 90, rim: 17, label: "70/90-17" },
      { width: 80, profile: 90, rim: 17, label: "80/90-17" },
      { width: 90, profile: 90, rim: 17, label: "90/90-17" },
    ],
    tireType: "tubeless",
    compound: "hard",
    pattern: "touring",
    roadConditions: ["smooth_asphalt", "rough_asphalt", "mixed"],
    price: 175000,
    rating: 4.4,
    features: ["Tahan lama", "Harga bersahabat", "All-round performer"],
    description: "Ban touring IRC yang tahan lama, cocok untuk harian dan touring.",
    stock: 200,
  },
  {
    brand: "Continental",
    model: "ContiGo",
    fullName: "Continental ContiGo",
    sizes: [
      { width: 80, profile: 80, rim: 17, label: "80/80-17" },
      { width: 90, profile: 80, rim: 17, label: "90/80-17" },
      { width: 100, profile: 80, rim: 17, label: "100/80-17" },
      { width: 110, profile: 70, rim: 17, label: "110/70-17" },
      { width: 120, profile: 70, rim: 17, label: "120/70-17" },
      { width: 130, profile: 70, rim: 17, label: "130/70-17" },
      { width: 140, profile: 70, rim: 17, label: "140/70-17" },
    ],
    tireType: "tubeless",
    compound: "medium",
    pattern: "touring",
    roadConditions: ["smooth_asphalt", "rough_asphalt"],
    price: 380000,
    rating: 4.5,
    features: ["Stabilitas tinggi", "Grip konsisten", "German engineering"],
    description: "Ban touring Continental dengan stabilitas dan grip konsisten.",
    stock: 60,
  },
  {
    brand: "Aspira",
    model: "Premio",
    fullName: "Aspira Premio",
    sizes: [
      { width: 80, profile: 90, rim: 14, label: "80/90-14" },
      { width: 90, profile: 80, rim: 14, label: "90/80-14" },
      { width: 90, profile: 90, rim: 14, label: "90/90-14" },
      { width: 100, profile: 80, rim: 14, label: "100/80-14" },
      { width: 100, profile: 90, rim: 12, label: "100/90-12" },
      { width: 110, profile: 90, rim: 12, label: "110/90-12" },
      { width: 110, profile: 70, rim: 14, label: "110/70-14" },
      { width: 70, profile: 90, rim: 17, label: "70/90-17" },
      { width: 80, profile: 90, rim: 17, label: "80/90-17" },
      { width: 90, profile: 90, rim: 17, label: "90/90-17" },
    ],
    tireType: "tubeless",
    compound: "medium",
    pattern: "touring",
    roadConditions: ["smooth_asphalt", "rough_asphalt", "mixed"],
    price: 195000,
    rating: 4.2,
    features: ["Premium lokal", "Grip basah baik", "Desain elegan"],
    description: "Ban premium buatan lokal Aspira, kualitas setara merek global.",
    stock: 180,
  },

  // --- SCOOTER / MATIC ---
  {
    brand: "IRC",
    model: "Duro",
    fullName: "IRC Duro",
    sizes: [
      { width: 80, profile: 90, rim: 14, label: "80/90-14" },
      { width: 90, profile: 80, rim: 14, label: "90/80-14" },
      { width: 90, profile: 90, rim: 14, label: "90/90-14" },
      { width: 100, profile: 80, rim: 14, label: "100/80-14" },
      { width: 100, profile: 90, rim: 12, label: "100/90-12" },
      { width: 110, profile: 90, rim: 12, label: "110/90-12" },
      { width: 110, profile: 70, rim: 14, label: "110/70-14" },
    ],
    tireType: "tubeless",
    compound: "hard",
    pattern: "scooter",
    roadConditions: ["smooth_asphalt", "rough_asphalt", "mixed"],
    price: 135000,
    rating: 4.1,
    features: ["Super tahan lama", "Anti slip", "Harga ekonomis"],
    description: "Ban matic paling tahan lama dari IRC, favorit pengemudi ojol dan harian.",
    stock: 300,
  },
  {
    brand: "FDR",
    model: "FX808",
    fullName: "FDR FX808",
    sizes: [
      { width: 80, profile: 90, rim: 14, label: "80/90-14" },
      { width: 90, profile: 80, rim: 14, label: "90/80-14" },
      { width: 90, profile: 90, rim: 14, label: "90/90-14" },
      { width: 100, profile: 80, rim: 14, label: "100/80-14" },
      { width: 100, profile: 90, rim: 12, label: "100/90-12" },
      { width: 110, profile: 90, rim: 12, label: "110/90-12" },
      { width: 110, profile: 70, rim: 14, label: "110/70-14" },
    ],
    tireType: "tubeless",
    compound: "hard",
    pattern: "scooter",
    roadConditions: ["smooth_asphalt", "rough_asphalt", "mixed"],
    price: 110000,
    rating: 3.9,
    features: ["Paling ekonomis", "Tahan lama", "Tersedia banyak ukuran"],
    description: "Ban matic FDR dengan harga paling terjangkau, pilihan praktis untuk harian.",
    stock: 500,
  },
  {
    brand: "Swallow",
    model: "SB118X",
    fullName: "Swallow SB118X",
    sizes: [
      { width: 80, profile: 90, rim: 14, label: "80/90-14" },
      { width: 90, profile: 80, rim: 14, label: "90/80-14" },
      { width: 90, profile: 90, rim: 14, label: "90/90-14" },
      { width: 100, profile: 80, rim: 14, label: "100/80-14" },
      { width: 100, profile: 90, rim: 12, label: "100/90-12" },
      { width: 110, profile: 90, rim: 12, label: "110/90-12" },
      { width: 110, profile: 70, rim: 14, label: "110/70-14" },
    ],
    tireType: "tubeless",
    compound: "medium",
    pattern: "scooter",
    roadConditions: ["smooth_asphalt", "rough_asphalt"],
    price: 155000,
    rating: 4.0,
    features: ["Kenyamanan baik", "Grip seimbang", "Desain modern"],
    description: "Ban matic Swallow dengan keseimbangan antara kenyamanan dan grip.",
    stock: 250,
  },

  // --- CUB / BEBEK ---
  {
    brand: "IRC",
    model: "NR91 Cub",
    fullName: "IRC NR91 (Cub)",
    sizes: [
      { width: 70, profile: 90, rim: 17, label: "70/90-17" },
      { width: 80, profile: 90, rim: 17, label: "80/90-17" },
      { width: 90, profile: 90, rim: 17, label: "90/90-17" },
      { width: 70, profile: 90, rim: 18, label: "70/90-18" },
      { width: 80, profile: 90, rim: 18, label: "80/90-18" },
    ],
    tireType: "tube_type",
    compound: "medium",
    pattern: "cub",
    roadConditions: ["smooth_asphalt", "rough_asphalt", "mixed"],
    price: 125000,
    rating: 4.0,
    features: ["Standar pabrik", "Grip seimbang", "Mudah dicari"],
    description: "Ban bebek standar yang dipakai banyak motor pabrikan.",
    stock: 400,
  },
  {
    brand: "FDR",
    model: "GP21",
    fullName: "FDR GP21",
    sizes: [
      { width: 70, profile: 90, rim: 17, label: "70/90-17" },
      { width: 80, profile: 90, rim: 17, label: "80/90-17" },
      { width: 90, profile: 90, rim: 17, label: "90/90-17" },
      { width: 70, profile: 90, rim: 18, label: "70/90-18" },
      { width: 80, profile: 90, rim: 18, label: "80/90-18" },
    ],
    tireType: "tube_type",
    compound: "medium",
    pattern: "cub",
    roadConditions: ["smooth_asphalt", "rough_asphalt", "mixed"],
    price: 95000,
    rating: 3.8,
    features: ["Harga sangat ekonomis", "Pola klasik", "Tersedia universal"],
    description: "Ban bebek FDR paling ekonomis, cocok untuk penggantian rutin.",
    stock: 600,
  },
  {
    brand: "Swallow",
    model: "SB112",
    fullName: "Swallow SB112",
    sizes: [
      { width: 70, profile: 90, rim: 17, label: "70/90-17" },
      { width: 80, profile: 90, rim: 17, label: "80/90-17" },
      { width: 90, profile: 90, rim: 17, label: "90/90-17" },
      { width: 70, profile: 90, rim: 18, label: "70/90-18" },
      { width: 80, profile: 90, rim: 18, label: "80/90-18" },
    ],
    tireType: "tube_type",
    compound: "medium",
    pattern: "cub",
    roadConditions: ["smooth_asphalt", "rough_asphalt"],
    price: 110000,
    rating: 4.1,
    features: ["Nyaman", "Daya tahan baik", "Low noise"],
    description: "Ban bebek Swallow yang nyaman dan relatif senyap.",
    stock: 350,
  },

  // --- DUAL SPORT ---
  {
    brand: "IRC",
    model: "GP-1",
    fullName: "IRC GP-1",
    sizes: [
      { width: 70, profile: 100, rim: 21, label: "70/100-21" },
      { width: 80, profile: 100, rim: 21, label: "80/100-21" },
      { width: 90, profile: 90, rim: 21, label: "90/90-21" },
      { width: 100, profile: 100, rim: 18, label: "100/100-18" },
      { width: 110, profile: 100, rim: 18, label: "110/100-18" },
      { width: 120, profile: 80, rim: 18, label: "120/80-18" },
    ],
    tireType: "tube_type",
    compound: "medium",
    pattern: "dual_sport",
    roadConditions: ["gravel", "mixed", "rough_asphalt"],
    price: 210000,
    rating: 4.3,
    features: ["Off-road capable", "On-road decent", "Block pattern agresif"],
    description: "Ban dual sport IRC, mampu di jalan tanah dan aspal.",
    stock: 80,
  },
  {
    brand: "Swallow",
    model: "SB112 DS",
    fullName: "Swallow SB112 Dual Sport",
    sizes: [
      { width: 70, profile: 100, rim: 21, label: "70/100-21" },
      { width: 80, profile: 100, rim: 21, label: "80/100-21" },
      { width: 100, profile: 100, rim: 18, label: "100/100-18" },
      { width: 110, profile: 100, rim: 18, label: "110/100-18" },
      { width: 120, profile: 80, rim: 18, label: "120/80-18" },
    ],
    tireType: "tube_type",
    compound: "hard",
    pattern: "dual_sport",
    roadConditions: ["gravel", "mixed", "rough_asphalt"],
    price: 195000,
    rating: 4.0,
    features: ["Tahan lama di tanah", "Block pattern dalam", "Harga kompetitif"],
    description: "Ban dual sport Swallow yang tahan lama untuk trabas ringan.",
    stock: 90,
  },
  {
    brand: "Mizzle",
    model: "MR50",
    fullName: "Mizzle MR50",
    sizes: [
      { width: 70, profile: 100, rim: 21, label: "70/100-21" },
      { width: 80, profile: 100, rim: 21, label: "80/100-21" },
      { width: 100, profile: 100, rim: 18, label: "100/100-18" },
      { width: 120, profile: 80, rim: 18, label: "120/80-18" },
    ],
    tireType: "tube_type",
    compound: "medium",
    pattern: "dual_sport",
    roadConditions: ["gravel", "mixed"],
    price: 165000,
    rating: 3.9,
    features: ["Trabas friendly", "Harga bersaing", "Pola serbaguna"],
    description: "Ban dual sport Mizzle untuk penggemar trabas budget terbatas.",
    stock: 100,
  },

  // --- PREMIUM ---
  {
    brand: "Bridgestone",
    model: "Battlax BT39",
    fullName: "Bridgestone Battlax BT39",
    sizes: [
      { width: 90, profile: 80, rim: 17, label: "90/80-17" },
      { width: 100, profile: 80, rim: 17, label: "100/80-17" },
      { width: 110, profile: 70, rim: 17, label: "110/70-17" },
      { width: 120, profile: 70, rim: 17, label: "120/70-17" },
      { width: 130, profile: 70, rim: 17, label: "130/70-17" },
      { width: 140, profile: 70, rim: 17, label: "140/70-17" },
      { width: 150, profile: 60, rim: 17, label: "150/60-17" },
    ],
    tireType: "tubeless",
    compound: "soft",
    pattern: "sport",
    roadConditions: ["smooth_asphalt"],
    price: 550000,
    rating: 4.8,
    features: ["Premium Jepang", "Grip extreme", "Race-proven"],
    description: "Ban sport premium Bridgestone, performa race-grade untuk street use.",
    stock: 30,
  },
];

// ==========================================
// DATA MOTOR (19 motor)
// ==========================================
export const SEED_MOTORCYCLES: Omit<Motorcycle, "id">[] = [
  // --- MATIC ---
  {
    brand: "Honda", model: "Beat", fullName: "Honda Beat 2024", year: 2024,
    category: "matic", engineCC: 110,
    frontTire: { size: { width: 80, profile: 90, rim: 14, label: "80/90-14" }, type: "tubeless" },
    rearTire: { size: { width: 90, profile: 90, rim: 14, label: "90/90-14" }, type: "tubeless" },
    weightKg: 94,
  },
  {
    brand: "Honda", model: "Vario 160", fullName: "Honda Vario 160 2024", year: 2024,
    category: "matic", engineCC: 160,
    frontTire: { size: { width: 90, profile: 80, rim: 14, label: "90/80-14" }, type: "tubeless" },
    rearTire: { size: { width: 100, profile: 80, rim: 14, label: "100/80-14" }, type: "tubeless" },
    weightKg: 112,
  },
  {
    brand: "Yamaha", model: "NMAX", fullName: "Yamaha NMAX 2024", year: 2024,
    category: "matic", engineCC: 155,
    frontTire: { size: { width: 80, profile: 90, rim: 14, label: "80/90-14" }, type: "tubeless" },
    rearTire: { size: { width: 110, profile: 70, rim: 14, label: "110/70-14" }, type: "tubeless" },
    weightKg: 131,
  },
  {
    brand: "Yamaha", model: "Aerox", fullName: "Yamaha Aerox 155 2024", year: 2024,
    category: "matic", engineCC: 155,
    frontTire: { size: { width: 90, profile: 80, rim: 14, label: "90/80-14" }, type: "tubeless" },
    rearTire: { size: { width: 110, profile: 70, rim: 14, label: "110/70-14" }, type: "tubeless" },
    weightKg: 126,
  },
  {
    brand: "Honda", model: "Scoopy", fullName: "Honda Scoopy 2024", year: 2024,
    category: "matic", engineCC: 110,
    frontTire: { size: { width: 100, profile: 90, rim: 12, label: "100/90-12" }, type: "tubeless" },
    rearTire: { size: { width: 110, profile: 90, rim: 12, label: "110/90-12" }, type: "tubeless" },
    weightKg: 99,
  },
  {
    brand: "Honda", model: "PCX", fullName: "Honda PCX 160 2024", year: 2024,
    category: "matic", engineCC: 160,
    frontTire: { size: { width: 100, profile: 80, rim: 14, label: "100/80-14" }, type: "tubeless" },
    rearTire: { size: { width: 120, profile: 70, rim: 14, label: "120/70-14" }, type: "tubeless" },
    weightKg: 131,
  },

  // --- CUB / BEBEK ---
  {
    brand: "Honda", model: "Supra X 125", fullName: "Honda Supra X 125 FI 2024", year: 2024,
    category: "cub", engineCC: 125,
    frontTire: { size: { width: 70, profile: 90, rim: 17, label: "70/90-17" }, type: "tube_type" },
    rearTire: { size: { width: 80, profile: 90, rim: 17, label: "80/90-17" }, type: "tube_type" },
    weightKg: 109,
  },
  {
    brand: "Honda", model: "Revo", fullName: "Honda Revo X 2024", year: 2024,
    category: "cub", engineCC: 110,
    frontTire: { size: { width: 70, profile: 90, rim: 17, label: "70/90-17" }, type: "tube_type" },
    rearTire: { size: { width: 80, profile: 90, rim: 17, label: "80/90-17" }, type: "tube_type" },
    weightKg: 104,
  },
  {
    brand: "Yamaha", model: "Jupiter Z1", fullName: "Yamaha Jupiter Z1 2024", year: 2024,
    category: "cub", engineCC: 115,
    frontTire: { size: { width: 70, profile: 90, rim: 17, label: "70/90-17" }, type: "tube_type" },
    rearTire: { size: { width: 80, profile: 90, rim: 17, label: "80/90-17" }, type: "tube_type" },
    weightKg: 101,
  },

  // --- SPORT ---
  {
    brand: "Honda", model: "CBR150R", fullName: "Honda CBR150R 2024", year: 2024,
    category: "sport", engineCC: 150,
    frontTire: { size: { width: 100, profile: 80, rim: 17, label: "100/80-17" }, type: "tubeless" },
    rearTire: { size: { width: 130, profile: 70, rim: 17, label: "130/70-17" }, type: "tubeless" },
    weightKg: 139,
  },
  {
    brand: "Honda", model: "CB150R", fullName: "Honda CB150R Streetfire 2024", year: 2024,
    category: "naked", engineCC: 150,
    frontTire: { size: { width: 100, profile: 80, rim: 17, label: "100/80-17" }, type: "tubeless" },
    rearTire: { size: { width: 130, profile: 70, rim: 17, label: "130/70-17" }, type: "tubeless" },
    weightKg: 137,
  },
  {
    brand: "Yamaha", model: "R15", fullName: "Yamaha R15 V4 2024", year: 2024,
    category: "sport", engineCC: 155,
    frontTire: { size: { width: 100, profile: 80, rim: 17, label: "100/80-17" }, type: "tubeless" },
    rearTire: { size: { width: 130, profile: 70, rim: 17, label: "130/70-17" }, type: "tubeless" },
    weightKg: 137,
  },
  {
    brand: "Yamaha", model: "MT-15", fullName: "Yamaha MT-15 2024", year: 2024,
    category: "naked", engineCC: 155,
    frontTire: { size: { width: 100, profile: 80, rim: 17, label: "100/80-17" }, type: "tubeless" },
    rearTire: { size: { width: 130, profile: 70, rim: 17, label: "130/70-17" }, type: "tubeless" },
    weightKg: 138,
  },

  // --- 250cc ---
  {
    brand: "Kawasaki", model: "Ninja 250", fullName: "Kawasaki Ninja 250 2024", year: 2024,
    category: "sport", engineCC: 250,
    frontTire: { size: { width: 110, profile: 70, rim: 17, label: "110/70-17" }, type: "tubeless" },
    rearTire: { size: { width: 140, profile: 70, rim: 17, label: "140/70-17" }, type: "tubeless" },
    weightKg: 164,
  },
  {
    brand: "Honda", model: "CBR250RR", fullName: "Honda CBR250RR 2024", year: 2024,
    category: "sport", engineCC: 250,
    frontTire: { size: { width: 110, profile: 70, rim: 17, label: "110/70-17" }, type: "tubeless" },
    rearTire: { size: { width: 140, profile: 70, rim: 17, label: "140/70-17" }, type: "tubeless" },
    weightKg: 165,
  },
  {
    brand: "Yamaha", model: "R25", fullName: "Yamaha R25 2024", year: 2024,
    category: "sport", engineCC: 250,
    frontTire: { size: { width: 110, profile: 70, rim: 17, label: "110/70-17" }, type: "tubeless" },
    rearTire: { size: { width: 140, profile: 70, rim: 17, label: "140/70-17" }, type: "tubeless" },
    weightKg: 166,
  },

  // --- DUAL SPORT ---
  {
    brand: "Honda", model: "CRF150L", fullName: "Honda CRF150L 2024", year: 2024,
    category: "dual_sport", engineCC: 150,
    frontTire: { size: { width: 80, profile: 100, rim: 21, label: "80/100-21" }, type: "tube_type" },
    rearTire: { size: { width: 100, profile: 100, rim: 18, label: "100/100-18" }, type: "tube_type" },
    weightKg: 122,
  },
  {
    brand: "Kawasaki", model: "KLX150", fullName: "Kawasaki KLX150 2024", year: 2024,
    category: "dual_sport", engineCC: 144,
    frontTire: { size: { width: 70, profile: 100, rim: 21, label: "70/100-21" }, type: "tube_type" },
    rearTire: { size: { width: 100, profile: 100, rim: 18, label: "100/100-18" }, type: "tube_type" },
    weightKg: 116,
  },

  // --- TOURING ---
  {
    brand: "Honda", model: "CB500X", fullName: "Honda CB500X 2024", year: 2024,
    category: "touring", engineCC: 471,
    frontTire: { size: { width: 120, profile: 70, rim: 17, label: "120/70-17" }, type: "tubeless" },
    rearTire: { size: { width: 160, profile: 60, rim: 17, label: "160/60-17" }, type: "tubeless" },
    weightKg: 191,
  },
];

// ==========================================
// FUNGSI SEED
// ==========================================

export async function seedTires(): Promise<{ success: boolean; count: number; errors: string[] }> {
  const errors: string[] = [];
  let count = 0;

  // Merge ban lama + ban baru
  const allTires = [...SEED_TIRES, ...SEED_TIRES_MORE];

  for (const tire of allTires) {
    try {
      await addTire(tire);
      count++;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      errors.push(`Gagal seed ${tire.fullName}: ${msg}`);
    }
  }

  return { success: errors.length === 0, count, errors };
}

export async function seedMotorcycles(): Promise<{ success: boolean; count: number; errors: string[] }> {
  const errors: string[] = [];
  let count = 0;

  // Merge motor lama + motor baru
  const allMotorcycles = [...SEED_MOTORCYCLES, ...SEED_MOTORCYCLES_MORE];

  for (const moto of allMotorcycles) {
    try {
      await addMotorcycle(moto);
      count++;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      errors.push(`Gagal seed ${moto.fullName}: ${msg}`);
    }
  }

  return { success: errors.length === 0, count, errors };
}

export async function seedAll(): Promise<void> {
  console.log("Seeding tires...");
  const tireResult = await seedTires();
  console.log(`Tires: ${tireResult.count} ok, ${tireResult.errors.length} gagal`);

  console.log("Seeding motorcycles...");
  const motoResult = await seedMotorcycles();
  console.log(`Motorcycles: ${motoResult.count} ok, ${motoResult.errors.length} gagal`);

  console.log("Seed complete!");
}

export async function clearAllData(): Promise<void> {
  const tireBatch = adminDb.batch();
  const tireSnapshot = await adminDb.collection("tires").get();
  tireSnapshot.docs.forEach((doc) => tireBatch.delete(doc.ref));
  await tireBatch.commit();
  console.log(`Deleted ${tireSnapshot.size} tires`);

  const motoBatch = adminDb.batch();
  const motoSnapshot = await adminDb.collection("motorcycles").get();
  motoSnapshot.docs.forEach((doc) => motoBatch.delete(doc.ref));
  await motoBatch.commit();
  console.log(`Deleted ${motoSnapshot.size} motorcycles`);
}