export interface InventoryItem {
  id: number;
  name: string;
  code: string;
  category: string;
  quantity: number;
  status: 'Available' | 'Limited' | 'Out of Stock';
  location: string;
  description: string;
  unitCost: number;
  imageUrl?: string;
}

export interface InventoryExit {
  id: string;
  cargoNumber: string;
  physicalState: string;
  technician: string;
  building: string;
  maintenanceType: string;
  exitType: string;
  date: string;
  quantity: number;
  notes?: string;
}

export interface InventoryEntry {
  id: string;
  cargoNumber: string;
  physicalState: string;
  technician: string;
  building: string;
  entryType: string;
  date: string;
  quantity: number;
  notes?: string;
}

export interface TopSaleItem {
  id: string;
  name: string;
  code: string;
  value: number;
  exitQuantity: number;
}
