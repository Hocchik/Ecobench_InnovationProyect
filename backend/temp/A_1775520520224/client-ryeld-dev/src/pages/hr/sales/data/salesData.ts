import { Month, Sale, SaleDetail, SalesStats, StatusSummary, ChartData, PaymentMethod, VoucherType } from './interfaces';

/** Meses disponibles */
export const months: Month[] = [
  { id: 1, name: 'Enero' },
  { id: 2, name: 'Febrero' },
  { id: 3, name: 'Marzo' },
  { id: 4, name: 'Abril' },
  { id: 5, name: 'Mayo' },
  { id: 6, name: 'Junio' },
  { id: 7, name: 'Julio' },
  { id: 8, name: 'Agosto' },
  { id: 9, name: 'Septiembre' },
  { id: 10, name: 'Octubre' },
  { id: 11, name: 'Noviembre' },
  { id: 12, name: 'Diciembre' },
];

/** Años disponibles */
export const availableYears: number[] = [2023, 2024, 2025, 2026];

/** Datos mock de ventas organizados por mes */
export const hrSalesData: Record<number, Sale[]> = {
  1: [ // Enero 2025
    {
      id: 'HR001',
      date: '06/01',
      client: 'RAMÓN CASTILLA S.A.',
      concept: 'MTTO. PREVENTIVO MENSUAL',
      voucher: 'Factura',
      amount: 3400.00,
      dueDate: '2025-01-20',
      paymentDate: '2025-01-16',
      voucherNumber: 'F001-0001',
      status: 'Pagado',
      paymentProof: 'comprobante_001.pdf',
      createdBy: 'María López (Auxiliar)',
      createdAt: '2025-01-06T09:30:00Z',
      lastModified: '2025-01-16T14:20:00Z',
      modifiedBy: 'Juan Pérez (HR)'
    },
    {
      id: 'HR002',
      date: '12/01',
      client: 'CLÍNICA SAN GABRIEL',
      concept: 'REPARACIÓN SISTEMA EMERGENCIA',
      voucher: 'Factura',
      amount: 2800.00,
      dueDate: '2025-01-27',
      paymentDate: null,
      voucherNumber: 'F001-0002',
      status: 'Pendiente',
      createdBy: 'Carlos Mendoza (Auxiliar)',
      createdAt: '2025-01-12T11:15:00Z',
      lastModified: '2025-01-12T11:15:00Z',
      modifiedBy: 'Carlos Mendoza (Auxiliar)'
    },
    {
      id: 'HR003',
      date: '18/01',
      client: 'HOTEL LIBERTADOR LIMA',
      concept: 'MODERNIZACIÓN CABINA',
      voucher: 'Factura',
      amount: 12500.00,
      dueDate: '2025-02-02',
      paymentDate: '2025-01-30',
      voucherNumber: 'F001-0003',
      status: 'Pagado',
      paymentProof: 'comprobante_003.pdf',
      createdBy: 'Ana García (Auxiliar)',
      createdAt: '2025-01-18T08:45:00Z',
      lastModified: '2025-01-30T16:10:00Z',
      modifiedBy: 'Juan Pérez (HR)'
    },
    {
      id: 'HR004',
      date: '25/01',
      client: 'EDIFICIO PANORAMA',
      concept: 'INSPECCIÓN ANUAL',
      voucher: 'Boleta',
      amount: 850.00,
      dueDate: '2025-02-10',
      paymentDate: null,
      voucherNumber: 'B001-0001',
      status: 'Por cobrar',
      createdBy: 'Patricia Morales (Auxiliar)',
      createdAt: '2025-01-25T13:20:00Z',
      lastModified: '2025-01-25T13:20:00Z',
      modifiedBy: 'Patricia Morales (Auxiliar)'
    }
  ],
  2: [ // Febrero 2025
    {
      id: 'HR005',
      date: '03/02',
      client: 'CENTRO COMERCIAL JOCKEY',
      concept: 'MTTO. CORRECTIVO URGENTE',
      voucher: 'Factura',
      amount: 4200.00,
      dueDate: '2025-02-18',
      paymentDate: '2025-02-15',
      voucherNumber: 'F001-0004',
      status: 'Pagado',
      paymentProof: 'comprobante_005.pdf',
      createdBy: 'Roberto Silva (Auxiliar)',
      createdAt: '2025-02-03T10:30:00Z',
      lastModified: '2025-02-15T12:45:00Z',
      modifiedBy: 'María López (HR)'
    },
    {
      id: 'HR006',
      date: '08/02',
      client: 'HOSPITAL NACIONAL',
      concept: 'INSTALACIÓN NUEVO ASCENSOR',
      voucher: 'Factura',
      amount: 25000.00,
      dueDate: '2025-02-23',
      paymentDate: null,
      voucherNumber: 'F001-0005',
      status: 'Pendiente',
      createdBy: 'Luis Herrera (Auxiliar)',
      createdAt: '2025-02-08T14:15:00Z',
      lastModified: '2025-02-08T14:15:00Z',
      modifiedBy: 'Luis Herrera (Auxiliar)'
    },
    {
      id: 'HR007',
      date: '14/02',
      client: 'OFICINAS PRIME TOWER',
      concept: 'CERTIFICACIÓN SEGURIDAD',
      voucher: 'Recibo',
      amount: 1200.00,
      dueDate: '2025-03-01',
      paymentDate: '2025-02-20',
      voucherNumber: 'R001-0001',
      status: 'Pagado',
      paymentProof: 'comprobante_007.pdf',
      createdBy: 'Carmen Díaz (Auxiliar)',
      createdAt: '2025-02-14T09:00:00Z',
      lastModified: '2025-02-20T11:30:00Z',
      modifiedBy: 'Juan Pérez (HR)'
    },
    {
      id: 'HR008',
      date: '20/02',
      client: 'RESIDENCIAL LAS PALMAS',
      concept: 'MANTENIMIENTO TRIMESTRAL',
      voucher: 'Factura',
      amount: 1800.00,
      dueDate: '2025-03-07',
      paymentDate: null,
      voucherNumber: 'F001-0006',
      status: 'Por cobrar',
      createdBy: 'José Rodríguez (Auxiliar)',
      createdAt: '2025-02-20T16:20:00Z',
      lastModified: '2025-02-20T16:20:00Z',
      modifiedBy: 'José Rodríguez (Auxiliar)'
    }
  ],
  3: [ // Marzo 2025
    {
      id: 'HR009',
      date: '05/03',
      client: 'BANCO DE CRÉDITO',
      concept: 'MODERNIZACIÓN SISTEMA',
      voucher: 'Factura',
      amount: 18500.00,
      dueDate: '2025-03-20',
      paymentDate: '2025-03-18',
      voucherNumber: 'F001-0007',
      status: 'Pagado',
      paymentProof: 'comprobante_009.pdf',
      createdBy: 'Alberto Vásquez (Auxiliar)',
      createdAt: '2025-03-05T08:30:00Z',
      lastModified: '2025-03-18T15:45:00Z',
      modifiedBy: 'María López (HR)'
    },
    {
      id: 'HR010',
      date: '12/03',
      client: 'UNIVERSIDAD CATÓLICA',
      concept: 'REPARACIÓN MOTOR',
      voucher: 'Boleta',
      amount: 3200.00,
      dueDate: '2025-03-27',
      paymentDate: null,
      voucherNumber: 'B001-0002',
      status: 'Pendiente',
      createdBy: 'Sandra Castro (Auxiliar)',
      createdAt: '2025-03-12T13:10:00Z',
      lastModified: '2025-03-12T13:10:00Z',
      modifiedBy: 'Sandra Castro (Auxiliar)'
    }
  ],
  8: [ // Agosto 2025 (mes actual)
    {
      id: 'HR011',
      date: '05/08',
      client: 'MALL AVENTURA PLAZA',
      concept: 'INSPECCIÓN MENSUAL',
      voucher: 'Factura',
      amount: 2400.00,
      dueDate: '2025-08-20',
      paymentDate: null,
      voucherNumber: 'F001-0008',
      status: 'Pendiente',
      createdBy: 'Fernando Castro (Auxiliar)',
      createdAt: '2025-08-05T10:20:00Z',
      lastModified: '2025-08-05T10:20:00Z',
      modifiedBy: 'Fernando Castro (Auxiliar)'
    },
    {
      id: 'HR012',
      date: '12/08',
      client: 'EDIFICIO CORPORATIVO',
      concept: 'MTTO. PREVENTIVO',
      voucher: 'Factura',
      amount: 3800.00,
      dueDate: '2025-08-27',
      paymentDate: '2025-08-25',
      voucherNumber: 'F001-0009',
      status: 'Pagado',
      paymentProof: 'comprobante_012.pdf',
      createdBy: 'Elena Díaz (Auxiliar)',
      createdAt: '2025-08-12T14:30:00Z',
      lastModified: '2025-08-25T09:15:00Z',
      modifiedBy: 'Juan Pérez (HR)'
    },
    {
      id: 'HR013',
      date: '18/08',
      client: 'CLÍNICA RICARDO PALMA',
      concept: 'MODERNIZACIÓN COMPLETA',
      voucher: 'Factura',
      amount: 22000.00,
      dueDate: '2025-09-02',
      paymentDate: null,
      voucherNumber: 'F001-0010',
      status: 'Por cobrar',
      createdBy: 'Carlos Mendoza (Auxiliar)',
      createdAt: '2025-08-18T11:45:00Z',
      lastModified: '2025-08-18T11:45:00Z',
      modifiedBy: 'Carlos Mendoza (Auxiliar)'
    }
  ]
};

/** Obtener todas las ventas de todos los meses */
export const getAllSales = (): Sale[] => {
  const allSales: Sale[] = [];
  Object.values(hrSalesData).forEach(monthSales => {
    allSales.push(...monthSales);
  });
  return allSales;
};

/** Detalles extendidos para cada venta */
export const getSaleDetail = (id: string): SaleDetail => {
  const allSales = getAllSales();
  const sale = allSales.find(s => s.id === id);
  
  if (!sale) {
    throw new Error(`Venta con ID ${id} no encontrada`);
  }

  // Datos extendidos específicos por venta
  const extendedDetails: Record<string, Partial<SaleDetail>> = {
    'HR001': {
      clientPhone: '+51 987 654 321',
      clientEmail: 'administracion@ramoncastilla.com.pe',
      clientAddress: 'Av. Ramón Castilla 456, San Isidro, Lima',
      servicePeriod: 'Enero 2025',
      technician: 'Carlos Mendoza',
      equipmentDetails: '2 Ascensores Otis - Modelo Gen2',
      paymentMethod: 'Transferencia',
      bankAccount: 'BCP 193-2458741-0-23',
      operationNumber: 'TXN001234567'
    },
    'HR002': {
      clientPhone: '+51 912 345 678',
      clientEmail: 'mantenimiento@sangabriel.com',
      clientAddress: 'Jr. Washington 1234, Cercado de Lima',
      servicePeriod: 'Enero 2025',
      technician: 'Ana García',
      equipmentDetails: '1 Ascensor Schindler - Sistema de emergencia'
    },
    'HR003': {
      clientPhone: '+51 998 765 432',
      clientEmail: 'operaciones@libertador.com.pe',
      clientAddress: 'Av. Libertador 2450, San Isidro, Lima',
      servicePeriod: 'Enero 2025',
      technician: 'Roberto Silva',
      equipmentDetails: '3 Ascensores Thyssen - Modernización cabinas',
      paymentMethod: 'Transferencia',
      bankAccount: 'BBVA 0011-0234-0100567890',
      operationNumber: 'TXN002345678'
    }
  };

  return {
    ...sale,
    description: getDescriptionByConcept(sale.concept),
    notes: `Servicio realizado según cronograma establecido. Cliente satisfecho con el trabajo.`,
    ...extendedDetails[id]
  };
};

/** Generar descripción basada en el concepto */
const getDescriptionByConcept = (concept: string): string => {
  const descriptions: Record<string, string> = {
    'MTTO. PREVENTIVO MENSUAL': 'Mantenimiento preventivo mensual que incluye lubricación de componentes, revisión de sistemas de seguridad, calibración de sensores y limpieza general.',
    'REPARACIÓN SISTEMA EMERGENCIA': 'Reparación del sistema de emergencia, incluyendo pruebas de funcionamiento del teléfono de emergencia y sistema de alarma.',
    'MODERNIZACIÓN CABINA': 'Modernización completa de cabinas, instalación de nuevos paneles de control y sistema de iluminación LED.',
    'INSPECCIÓN ANUAL': 'Inspección anual completa según normativas de seguridad, con emisión de certificado correspondiente.',
    'MTTO. CORRECTIVO URGENTE': 'Mantenimiento correctivo de emergencia para solucionar falla crítica en sistema de control.',
    'INSTALACIÓN NUEVO ASCENSOR': 'Instalación completa de nuevo ascensor, incluyendo obra civil, montaje e instalación eléctrica.',
    'CERTIFICACIÓN SEGURIDAD': 'Certificación de seguridad y funcionamiento según normas técnicas vigentes.',
    'MANTENIMIENTO TRIMESTRAL': 'Mantenimiento trimestral programado con revisión exhaustiva de todos los componentes.',
    'MODERNIZACIÓN SISTEMA': 'Modernización del sistema de control con tecnología de última generación.',
    'REPARACIÓN MOTOR': 'Reparación del motor principal, cambio de componentes desgastados y calibración.',
    'MODERNIZACIÓN COMPLETA': 'Modernización completa del ascensor incluyendo motor, sistema de control y cabina.'
  };
  
  return descriptions[concept] || 'Servicio técnico especializado en ascensores.';
};

/** Estadísticas calculadas */
export const salesStats: SalesStats = {
  totalSales: getAllSales().length,
  totalAmount: getAllSales().reduce((sum, sale) => sum + sale.amount, 0),
  paidAmount: getAllSales().filter(sale => sale.status === 'Pagado').reduce((sum, sale) => sum + sale.amount, 0),
  pendingAmount: getAllSales().filter(sale => sale.status === 'Pendiente' || sale.status === 'Por cobrar').reduce((sum, sale) => sum + sale.amount, 0),
  overdueSales: getAllSales().filter(sale => 
    (sale.status === 'Pendiente' || sale.status === 'Por cobrar') && 
    new Date(sale.dueDate) < new Date()
  ).length,
  pendingSales: getAllSales().filter(sale => sale.status === 'Pendiente' || sale.status === 'Por cobrar').length,
  thisMonthSales: (hrSalesData[8] || []).length,
  thisMonthAmount: (hrSalesData[8] || []).reduce((sum, sale) => sum + sale.amount, 0),
  averageSaleAmount: getAllSales().reduce((sum, sale) => sum + sale.amount, 0) / getAllSales().length
};

/** Resumen por estado */
export const statusSummary: StatusSummary[] = [
  {
    status: 'Pagado',
    count: getAllSales().filter(s => s.status === 'Pagado').length,
    amount: getAllSales().filter(s => s.status === 'Pagado').reduce((sum, s) => sum + s.amount, 0),
    percentage: (getAllSales().filter(s => s.status === 'Pagado').length / getAllSales().length) * 100
  },
  {
    status: 'Pendiente',
    count: getAllSales().filter(s => s.status === 'Pendiente').length,
    amount: getAllSales().filter(s => s.status === 'Pendiente').reduce((sum, s) => sum + s.amount, 0),
    percentage: (getAllSales().filter(s => s.status === 'Pendiente').length / getAllSales().length) * 100
  },
  {
    status: 'Por cobrar',
    count: getAllSales().filter(s => s.status === 'Por cobrar').length,
    amount: getAllSales().filter(s => s.status === 'Por cobrar').reduce((sum, s) => sum + s.amount, 0),
    percentage: (getAllSales().filter(s => s.status === 'Por cobrar').length / getAllSales().length) * 100
  },
  {
    status: 'Anulado',
    count: getAllSales().filter(s => s.status === 'Anulado').length,
    amount: getAllSales().filter(s => s.status === 'Anulado').reduce((sum, s) => sum + s.amount, 0),
    percentage: (getAllSales().filter(s => s.status === 'Anulado').length / getAllSales().length) * 100
  }
];

/** Datos para gráficos mensuales */
export const chartData: ChartData[] = months.map(month => {
  const monthSales = hrSalesData[month.id] || [];
  return {
    month: month.name,
    amount: monthSales.reduce((sum, sale) => sum + sale.amount, 0),
    sales: monthSales.length
  };
});

/** Métodos de pago disponibles */
export const paymentMethods: PaymentMethod[] = [
  'Efectivo',
  'Transferencia', 
  'Cheque',
  'Tarjeta',
  'Deposito'
];

/** Tipos de comprobante disponibles */
export const voucherTypes: VoucherType[] = [
  'Factura',
  'Boleta',
  'Recibo',
  'Nota de Crédito'
];

/** Última actualización de datos */
export const lastUpdated = "2025-08-19T14:30:00Z";

/** Obtener todos los detalles de ventas como SaleDetail[] */
export const getAllSalesWithDetails = (): SaleDetail[] => {
  const allSales = getAllSales();
  return allSales.map(sale => getSaleDetail(sale.id));
};
