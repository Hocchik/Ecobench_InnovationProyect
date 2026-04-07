/**
 * Interfaces para el componente Kardex
 * Sistema de seguimiento de movimientos de inventario
 * @module KardexInterfaces
 */

/**
 * Tipo de movimiento en el kardex
 */
export type MovementType = 'entrada' | 'salida';

/**
 * Estado del movimiento
 */
export type MovementStatus = 'completado' | 'pendiente' | 'en_progreso' | 'cancelado';

/**
 * Información básica del producto para el selector
 */
export interface ProductInfo {
  id: string | number;
  codigo: string;
  descripcion: string;
  categoria: string;
  unidad: string;
  saldoActual: number;
}

/**
 * Artículo dentro de un movimiento
 */
export interface KardexArticle {
  id: string | number;
  codigo: string;
  descripcion: string;
  categoria: string;
  cantidad: number;
  unidad: string;
  precioUnitario?: number;
  subtotal?: number;
}

/**
 * Información del técnico asignado
 */
export interface KardexTechnician {
  id: string | number;
  nombre: string;
  apellido: string;
  foto?: string;
  especialidad?: string;
  telefono?: string;
}

/**
 * Información del cliente
 */
export interface KardexClient {
  id: string | number;
  nombre: string;
  ruc?: string;
  direccion: string;
  distrito: string;
  telefono?: string;
  email?: string;
}

/**
 * Movimiento del Kardex (entrada o salida)
 */
export interface KardexMovement {
  id: string | number;
  tipo: MovementType;
  fecha: string; // ISO format
  hora: string;
  numeroDocumento: string; // CAS-001, CAE-002, COM-003
  estado: MovementStatus;
  
  // Detalles del movimiento
  articulos: KardexArticle[];
  totalArticulos: number;
  valorTotal?: number;
  
  // Personal y cliente
  tecnico: KardexTechnician;
  cliente?: KardexClient;
  
  // Información adicional
  motivo?: string;
  observaciones?: string;
  aprobadoPor?: string;
  almacen: string;
  
  // Documentos
  documentoUrl?: string;
  imagenes?: string[];
}

/**
 * Resumen de saldos para el Kardex
 */
export interface KardexBalance {
  articulo: {
    id: string | number;
    codigo: string;
    descripcion: string;
  };
  saldoInicial: number;
  totalEntradas: number;
  totalSalidas: number;
  saldoFinal: number;
  unidad: string;
  valorPromedio?: number;
}

/**
 * Filtros para el Kardex
 */
export interface KardexFilters {
  tipo?: MovementType;
  fechaInicio?: string;
  fechaFin?: string;
  tecnico?: string | number;
  cliente?: string | number;
  articulo?: string;
  estado?: MovementStatus;
  almacen?: string;
}

/**
 * Estadísticas del Kardex
 */
export interface KardexStats {
  totalMovimientos: number;
  totalEntradas: number;
  totalSalidas: number;
  valorTotalEntradas: number;
  valorTotalSalidas: number;
  articulosMasMovidos: Array<{
    articulo: string;
    cantidad: number;
  }>;
}
