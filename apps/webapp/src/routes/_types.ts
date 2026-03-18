export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Vehicle {
  id: string;
  nickname?: string;
  brand: string;
  model: string;
  licensePlate?: string;
}

export interface RefuelingLog {
  id: string;
  createdAt: string;
  station?: string;
  fuelType: string;
  fuelLiters: number | string;
  odometer: number | string;
  pricePerLiter: number | string;
  transaction: {
    amount: number | string;
    date: string;
  };
}

export interface VehicleMaintenanceLog {
  id: string;
  createdAt: string;
  type: string;
  description?: string;
  odometer?: number | string;
  provider?: string;
  transaction: {
    amount: number | string;
    date: string;
    category?: {
      name: string;
    } | null;
  };
}

export interface VehicleStats {
  avgConsumption: number;
  avgCost: number;
  autonomy: number;
}

export interface VehicleExpenseStats {
  totalFuel: number;
  totalMaintenance: number;
  total: number;
}
