/**
 * Interfaces para el módulo de ventas de HR
 * Basado en la estructura del módulo de ventas del auxiliar con funcionalidades extendidas
 */

/** Estados de venta disponibles */
export type SaleStatus = 'Pagado' | 'Pendiente' | 'Anulado' | 'Por cobrar';

/** Métodos de pago disponibles */
export type PaymentMethod = 'Efectivo' | 'Transferencia' | 'Cheque' | 'Tarjeta' | 'Deposito';

/** Tipos de comprobante */
export type VoucherType = 'Factura' | 'Boleta' | 'Recibo' | 'Nota de Crédito';

/** Información básica de venta */
export interface Sale {
  id: string;
  date: string;
  client: string;
  concept: string;
  voucher: VoucherType;
  amount: number;
  dueDate: string;
  paymentDate: string | null;
  voucherNumber: string;
  status: SaleStatus;
  paymentProof?: string;
  /** Campos adicionales para HR */
  createdBy?: string;
  createdAt?: string;
  lastModified?: string;
  modifiedBy?: string;
}

/** Detalles extendidos de venta para HR */
export interface SaleDetail extends Sale {
  description: string;
  paymentMethod?: PaymentMethod;
  notes?: string;
  bankAccount?: string;
  operationNumber?: string;
  /** Información adicional para HR */
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;
  servicePeriod?: string;
  technician?: string;
  equipmentDetails?: string;
  invoiceFile?: string;
  paymentProofFile?: string;
}

/** Datos para crear nueva venta */
export interface SaleFormData {
  client: string;
  concept: string;
  voucher: VoucherType;
  amount: number;
  dueDate: string;
  description: string;
  notes?: string;
  /** Campos adicionales para formulario HR */
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;
  servicePeriod?: string;
  technician?: string;
  equipmentDetails?: string;
}

/** Datos para marcar como pagado */
export interface PaymentData {
  saleId: string;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  operationNumber?: string;
  bankAccount?: string;
  notes?: string;
  paymentProofFile?: File;
}

/** Filtros para la tabla de ventas */
export interface SaleFilters {
  search: string;
  status?: SaleStatus;
  month?: number;
  year?: number;
  dateFrom?: string;
  dateTo?: string;
  paymentMethod?: PaymentMethod;
}

/** Estadísticas de ventas */
export interface SalesStats {
  totalSales: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  overdueSales: number;
  pendingSales: number;
  thisMonthSales: number;
  thisMonthAmount: number;
  averageSaleAmount: number;
}

/** Opción de mes */
export interface Month {
  id: number;
  name: string;
}

/** Resumen por estado */
export interface StatusSummary {
  status: SaleStatus;
  count: number;
  amount: number;
  percentage: number;
}

/** Datos para gráficos */
export interface ChartData {
  month: string;
  amount: number;
  sales: number;
}

/** Configuración de exportación */
export interface ExportConfig {
  format: 'excel' | 'pdf';
  filters: SaleFilters;
  includeDetails: boolean;
}
