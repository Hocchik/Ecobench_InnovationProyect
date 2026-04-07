/**
 * Interfaces para el módulo Output de HR
 * Gestiona compras y servicios de la empresa
 */

/** Tipos de pago disponibles */
export type PaymentType = 'Al contado' | 'A crédito';

/** Categorías de compras */
export type PurchaseCategory = 'Pasaje' | 'Tecnología' | 'Muebles' | 'Oficina' | 'Mantenimiento' | 'Alimentación' | 'Capacitación' | 'Marketing';

/** Tipos de comprobante */
export type VoucherType = 'Factura' | 'Boleta' | 'Recibo' | 'Nota de Crédito';

/** Estados de compra/servicio */
export type OutputStatus = 'Pagado' | 'Pendiente' | 'Anulado';

/** Información básica de compra */
export interface Purchase {
  id: string;
  date: string;
  description: string;
  paymentType: PaymentType;
  category: PurchaseCategory;
  voucher: VoucherType;
  voucherNumber: string;
  amount: number;
  status: OutputStatus;
  supplier?: string;
  notes?: string;
  attachments?: string[];
  createdBy?: string;
  createdAt?: string;
  lastModified?: string;
  modifiedBy?: string;
}

/** Información básica de servicio */
export interface Service {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: OutputStatus;
  serviceType: 'Luz' | 'Agua' | 'Internet' | 'Teléfono' | 'Gas' | 'Seguridad' | 'Limpieza' | 'Otros';
  supplier: string;
  accountNumber?: string;
  dueDate?: string;
  paymentProof?: string;
  notes?: string;
  createdBy?: string;
  createdAt?: string;
  lastModified?: string;
  modifiedBy?: string;
}

/** Datos para crear nueva compra */
export interface NewPurchaseData {
  description: string;
  paymentType: PaymentType;
  category: PurchaseCategory;
  voucher: VoucherType;
  amount: number;
  supplier?: string;
  notes?: string;
}

/** Datos para crear nuevo servicio */
export interface NewServiceData {
  description: string;
  amount: number;
  serviceType: 'Luz' | 'Agua' | 'Internet' | 'Teléfono' | 'Gas' | 'Seguridad' | 'Limpieza' | 'Otros';
  supplier: string;
  accountNumber?: string;
  dueDate?: string;
  notes?: string;
}

/** Filtros para compras */
export interface PurchaseFilters {
  search: string;
  paymentType?: PaymentType;
  category?: PurchaseCategory;
  status?: OutputStatus;
  dateFrom?: string;
  dateTo?: string;
}

/** Filtros para servicios */
export interface ServiceFilters {
  search: string;
  serviceType?: string;
  status?: OutputStatus;
  dateFrom?: string;
  dateTo?: string;
}

/** Estadísticas de output */
export interface OutputStats {
  totalPurchases: number;
  totalServices: number;
  totalPurchaseAmount: number;
  totalServiceAmount: number;
  totalAmount: number;
  pendingPurchases: number;
  pendingServices: number;
  thisMonthPurchases: number;
  thisMonthServices: number;
  thisMonthAmount: number;
}

/** Resumen por categoría */
export interface CategorySummary {
  category: PurchaseCategory;
  count: number;
  amount: number;
  percentage: number;
}

/** Resumen por tipo de servicio */
export interface ServiceTypeSummary {
  serviceType: string;
  count: number;
  amount: number;
  percentage: number;
}

/** Datos para gráficos */
export interface ChartData {
  month: string;
  purchases: number;
  services: number;
  totalAmount: number;
}

/** Configuración de exportación */
export interface ExportConfig {
  format: 'excel' | 'pdf';
  type: 'purchases' | 'services' | 'both';
  filters: PurchaseFilters | ServiceFilters;
  includeDetails: boolean;
}

/** Opciones de mes */
export interface Month {
  id: number;
  name: string;
}
