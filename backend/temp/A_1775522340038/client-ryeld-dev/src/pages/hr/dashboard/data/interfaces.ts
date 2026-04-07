/**
 * Interfaces para el Dashboard de Recursos Humanos
 */

/**
 * Estadísticas principales del dashboard HR
 */
export interface HRStats {
  /** Total de ventas del mes actual */
  totalVentasMes: number;
  /** Total de compras del mes actual */
  totalComprasMes: number;
  /** Total de pago AFP del mes actual */
  totalPagoAFP: number;
  /** Total de pago ESSALUD del mes actual */
  totalPagoESSALUD: number;
}

/**
 * Datos para el gráfico circular de salidas por categoría
 */
export interface SalidaCategoria {
  id: string;
  categoria: 'Boletas de pago' | 'Compras a crédito' | 'Servicios' | 'Compras al contado';
  valor: number;
  porcentaje: number;
  color: string;
}

/**
 * Datos para el gráfico lineal de captación de clientes
 */
export interface CaptacionClientes {
  mes: string;
  mesNumero: number;
  acercamiento: number;
  visita: number;
  contratado: number;
}

/**
 * Filtros disponibles para el dashboard
 */
export interface DashboardFilters {
  year: number;
  month: number;
}

/**
 * Datos completos del dashboard HR
 */
export interface HRDashboardData {
  stats: HRStats;
  salidasPorCategoria: SalidaCategoria[];
  captacionClientes: CaptacionClientes[];
  lastUpdated: string;
}
