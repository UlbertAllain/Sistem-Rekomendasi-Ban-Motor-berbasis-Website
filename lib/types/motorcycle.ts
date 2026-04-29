// lib/types/motorcycle.ts

import { TireSize, TireType } from "./tire";

export type MotorcycleCategory = 
  | "matic" 
  | "cub" 
  | "sport" 
  | "naked" 
  | "touring" 
  | "dual_sport"
  | "big_bike";

export interface Motorcycle {
  id: string;
  brand: string;           // "Honda", "Yamaha", "Kawasaki", dll
  model: string;           // "Beat", "NMAX", "CBR150R", dll
  fullName: string;        // "Honda Beat 2024"
  year: number;
  category: MotorcycleCategory;
  engineCC: number;
  frontTire: {
    size: TireSize;
    type: TireType;
  };
  rearTire: {
    size: TireSize;
    type: TireType;
  };
  weightKg: number;
  imageUrl?: string;
}