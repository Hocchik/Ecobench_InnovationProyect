import { HRStats, SalidaCategoria, CaptacionClientes, HRDashboardData } from './interfaces';

/**
 * Estadísticas principales del dashboard HR
 */
export const hrStats: HRStats = {
  totalVentasMes: 125750.50,
  totalComprasMes: 68420.30,
  totalPagoAFP: 12850.75,
  totalPagoESSALUD: 8960.25
};

/**
 * Datos para el gráfico circular de salidas por categoría
 */
export const salidasPorCategoria: SalidaCategoria[] = [
  {
    id: 'boletas',
    categoria: 'Boletas de pago',
    valor: 45680.50,
    porcentaje: 35.2,
    color: '#476797'
  },
  {
    id: 'compras-credito',
    categoria: 'Compras a crédito',
    valor: 38420.75,
    porcentaje: 29.6,
    color: '#476797'
  },
  {
    id: 'servicios',
    categoria: 'Servicios',
    valor: 28950.30,
    porcentaje: 22.3,
    color: '#F59E0B'
  },
  {
    id: 'compras-contado',
    categoria: 'Compras al contado',
    valor: 16780.45,
    porcentaje: 12.9,
    color: '#EF4444'
  }
];

/**
 * Datos para el gráfico lineal de captación de clientes por año
 */
export const captacionClientes: CaptacionClientes[] = [
  {
    mes: 'Enero',
    mesNumero: 1,
    acercamiento: 45,
    visita: 28,
    contratado: 12
  },
  {
    mes: 'Febrero',
    mesNumero: 2,
    acercamiento: 52,
    visita: 31,
    contratado: 15
  },
  {
    mes: 'Marzo',
    mesNumero: 3,
    acercamiento: 38,
    visita: 25,
    contratado: 9
  },
  {
    mes: 'Abril',
    mesNumero: 4,
    acercamiento: 61,
    visita: 42,
    contratado: 18
  },
  {
    mes: 'Mayo',
    mesNumero: 5,
    acercamiento: 48,
    visita: 33,
    contratado: 14
  },
  {
    mes: 'Junio',
    mesNumero: 6,
    acercamiento: 55,
    visita: 39,
    contratado: 16
  },
  {
    mes: 'Julio',
    mesNumero: 7,
    acercamiento: 42,
    visita: 29,
    contratado: 11
  },
  {
    mes: 'Agosto',
    mesNumero: 8,
    acercamiento: 59,
    visita: 44,
    contratado: 19
  },
  {
    mes: 'Septiembre',
    mesNumero: 9,
    acercamiento: 47,
    visita: 32,
    contratado: 13
  },
  {
    mes: 'Octubre',
    mesNumero: 10,
    acercamiento: 53,
    visita: 37,
    contratado: 15
  },
  {
    mes: 'Noviembre',
    mesNumero: 11,
    acercamiento: 49,
    visita: 34,
    contratado: 14
  },
  {
    mes: 'Diciembre',
    mesNumero: 12,
    acercamiento: 56,
    visita: 41,
    contratado: 17
  }
];

/**
 * Datos completos del dashboard HR
 */
export const hrDashboardData: HRDashboardData = {
  stats: hrStats,
  salidasPorCategoria: salidasPorCategoria,
  captacionClientes: captacionClientes,
  lastUpdated: new Date().toISOString()
};

/**
 * Opciones de años disponibles
 */
export const availableYears = [2023, 2024, 2025];

/**
 * Opciones de meses disponibles
 */
export const availableMonths = [
  { value: 1, label: 'Enero' },
  { value: 2, label: 'Febrero' },
  { value: 3, label: 'Marzo' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Mayo' },
  { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Septiembre' },
  { value: 10, label: 'Octubre' },
  { value: 11, label: 'Noviembre' },
  { value: 12, label: 'Diciembre' }
];
