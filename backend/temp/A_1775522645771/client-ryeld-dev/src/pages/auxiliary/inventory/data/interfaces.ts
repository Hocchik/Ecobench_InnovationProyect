export interface InventoryItem {
  id: number | string;
  nro: string;
  imagen?: string;
  nombre: string;
  codigo: string;
  categoria: string;
  posicion: string;
  costoU: number;
  importancia: string;
  cantAlmacen: number;
  unidadMedida: string;
  status: 'En stock' | 'Sin stock' | 'Bajo stock';
}

export interface InventoryItemAudit extends InventoryItem {
  cantFisica?: number;
  diferencia?: number;
  verificado?: boolean;
}

export interface InventoryExit {
  id: number | string;
  nombreArticulo: string;
  tecnico: string;
  tipoSalida: string;
  tipoMantenimiento: string;
  nroCargo: string;
}

export interface InventoryEntry {
  id: number | string;
  nombreArticulo: string;
  tecnico: string;
  tipoEntrada: string;
  tipoMantenimiento: string;
  nroCargo: string;
}

export interface InventoryPurchase {
  id: number | string;
  nombreArticulo: string;
  personaCargo: string;
  motivo: string;
  estadoFisico: string;
  nroCargo: string;
}

export interface Month {
  id: number;
  name: string;
}

export interface InventoryStats {
  totalItems: number;
  consumiblesCosto: number;
  repuestoCosto: number;
  itemsBajoStock: number;
}
