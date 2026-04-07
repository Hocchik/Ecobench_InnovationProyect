/**
 * Datos mock para el módulo Output de HR
 * Gestiona compras y servicios de la empresa
 */

import type { 
  Purchase, 
  Service, 
  CategorySummary, 
  ServiceTypeSummary, 
  ChartData, 
  OutputStats,
  Month 
} from './interfaces';

/** Datos mock de compras */
export const mockPurchases: Purchase[] = [
  {
    id: 'PUR-001',
    date: '2024-01-15',
    description: 'Pasajes aéreos para reunión ejecutiva en Lima',
    paymentType: 'Al contado',
    category: 'Pasaje',
    voucher: 'Factura',
    voucherNumber: 'F001-0001234',
    amount: 850.00,
    status: 'Pagado',
    supplier: 'Latam Airlines',
    notes: 'Viaje de 3 días para presentación de nuevos productos',
    createdBy: 'Ana García',
    createdAt: '2024-01-15T09:30:00',
    lastModified: '2024-01-15T09:30:00',
    modifiedBy: 'Ana García'
  },
  {
    id: 'PUR-002',
    date: '2024-01-18',
    description: 'Laptops para nuevos empleados del área técnica',
    paymentType: 'A crédito',
    category: 'Tecnología',
    voucher: 'Factura',
    voucherNumber: 'F001-0001245',
    amount: 4500.00,
    status: 'Pendiente',
    supplier: 'TechStore SAC',
    notes: '3 laptops HP EliteBook para el equipo de desarrollo',
    createdBy: 'Carlos Mendoza',
    createdAt: '2024-01-18T14:20:00',
    lastModified: '2024-01-20T10:15:00',
    modifiedBy: 'Ana García'
  },
  {
    id: 'PUR-003',
    date: '2024-01-22',
    description: 'Escritorios ejecutivos para oficina principal',
    paymentType: 'Al contado',
    category: 'Muebles',
    voucher: 'Boleta',
    voucherNumber: 'B001-0005678',
    amount: 2100.00,
    status: 'Pagado',
    supplier: 'Muebles Modernos EIRL',
    notes: 'Incluye sillas ergonómicas',
    createdBy: 'Luis Torres',
    createdAt: '2024-01-22T11:45:00',
    lastModified: '2024-01-22T11:45:00',
    modifiedBy: 'Luis Torres'
  },
  {
    id: 'PUR-004',
    date: '2024-01-25',
    description: 'Materiales de oficina para el primer trimestre',
    paymentType: 'Al contado',
    category: 'Oficina',
    voucher: 'Factura',
    voucherNumber: 'F001-0001267',
    amount: 680.50,
    status: 'Pagado',
    supplier: 'Librería Central',
    notes: 'Papel, tóner, carpetas y útiles varios',
    createdBy: 'María Rodriguez',
    createdAt: '2024-01-25T08:30:00',
    lastModified: '2024-01-25T08:30:00',
    modifiedBy: 'María Rodriguez'
  },
  {
    id: 'PUR-005',
    date: '2024-01-28',
    description: 'Mantenimiento preventivo de ascensores principales',
    paymentType: 'A crédito',
    category: 'Mantenimiento',
    voucher: 'Factura',
    voucherNumber: 'F001-0001289',
    amount: 1200.00,
    status: 'Pagado',
    supplier: 'MantenimientoTec SAC',
    notes: 'Revisión completa de 5 ascensores',
    createdBy: 'Jorge Silva',
    createdAt: '2024-01-28T16:00:00',
    lastModified: '2024-01-29T09:20:00',
    modifiedBy: 'Ana García'
  },
  {
    id: 'PUR-006',
    date: '2024-02-02',
    description: 'Almuerzo corporativo para presentación de resultados',
    paymentType: 'Al contado',
    category: 'Alimentación',
    voucher: 'Boleta',
    voucherNumber: 'B001-0005890',
    amount: 450.00,
    status: 'Pagado',
    supplier: 'Catering Premium',
    notes: 'Para 25 personas, incluye bebidas',
    createdBy: 'Ana García',
    createdAt: '2024-02-02T12:00:00',
    lastModified: '2024-02-02T12:00:00',
    modifiedBy: 'Ana García'
  },
  {
    id: 'PUR-007',
    date: '2024-02-05',
    description: 'Curso de capacitación en seguridad industrial',
    paymentType: 'A crédito',
    category: 'Capacitación',
    voucher: 'Factura',
    voucherNumber: 'F001-0001312',
    amount: 980.00,
    status: 'Pendiente',
    supplier: 'Instituto de Seguridad',
    notes: 'Para 8 técnicos, incluye certificación',
    createdBy: 'Carlos Mendoza',
    createdAt: '2024-02-05T10:15:00',
    lastModified: '2024-02-05T10:15:00',
    modifiedBy: 'Carlos Mendoza'
  },
  {
    id: 'PUR-008',
    date: '2024-02-08',
    description: 'Campaña publicitaria en redes sociales',
    paymentType: 'Al contado',
    category: 'Marketing',
    voucher: 'Recibo',
    voucherNumber: 'R001-0000145',
    amount: 750.00,
    status: 'Pagado',
    supplier: 'Agencia Digital Plus',
    notes: 'Campaña de 2 meses en Facebook e Instagram',
    createdBy: 'María Rodriguez',
    createdAt: '2024-02-08T14:30:00',
    lastModified: '2024-02-08T14:30:00',
    modifiedBy: 'María Rodriguez'
  }
];

/** Datos mock de servicios */
export const mockServices: Service[] = [
  {
    id: 'SER-001',
    date: '2024-01-15',
    description: 'Factura de energía eléctrica - Oficina Principal',
    amount: 1250.75,
    status: 'Pagado',
    serviceType: 'Luz',
    supplier: 'Luz del Sur',
    accountNumber: '123456789',
    dueDate: '2024-01-20',
    paymentProof: 'COM-001-2024',
    notes: 'Consumo de diciembre 2023',
    createdBy: 'Ana García',
    createdAt: '2024-01-15T08:00:00',
    lastModified: '2024-01-15T08:00:00',
    modifiedBy: 'Ana García'
  },
  {
    id: 'SER-002',
    date: '2024-01-18',
    description: 'Servicio de agua potable - Edificio corporativo',
    amount: 380.50,
    status: 'Pagado',
    serviceType: 'Agua',
    supplier: 'Sedapal',
    accountNumber: '987654321',
    dueDate: '2024-01-25',
    paymentProof: 'COM-002-2024',
    notes: 'Facturación bimestral',
    createdBy: 'Luis Torres',
    createdAt: '2024-01-18T09:30:00',
    lastModified: '2024-01-18T09:30:00',
    modifiedBy: 'Luis Torres'
  },
  {
    id: 'SER-003',
    date: '2024-01-20',
    description: 'Internet corporativo - Fibra óptica 500 Mbps',
    amount: 650.00,
    status: 'Pagado',
    serviceType: 'Internet',
    supplier: 'Movistar Empresas',
    accountNumber: '555123789',
    dueDate: '2024-01-28',
    paymentProof: 'COM-003-2024',
    notes: 'Plan empresarial con IP fija',
    createdBy: 'Carlos Mendoza',
    createdAt: '2024-01-20T11:15:00',
    lastModified: '2024-01-20T11:15:00',
    modifiedBy: 'Carlos Mendoza'
  },
  {
    id: 'SER-004',
    date: '2024-01-22',
    description: 'Servicio telefónico empresarial',
    amount: 220.00,
    status: 'Pagado',
    serviceType: 'Teléfono',
    supplier: 'Claro Empresas',
    accountNumber: '444987123',
    dueDate: '2024-01-30',
    paymentProof: 'COM-004-2024',
    notes: 'Incluye llamadas nacionales ilimitadas',
    createdBy: 'María Rodriguez',
    createdAt: '2024-01-22T13:45:00',
    lastModified: '2024-01-22T13:45:00',
    modifiedBy: 'María Rodriguez'
  },
  {
    id: 'SER-005',
    date: '2024-01-25',
    description: 'Suministro de gas natural - Cocina corporativa',
    amount: 180.25,
    status: 'Pendiente',
    serviceType: 'Gas',
    supplier: 'Cálidda',
    accountNumber: '333654987',
    dueDate: '2024-02-05',
    notes: 'Consumo del mes de enero',
    createdBy: 'Jorge Silva',
    createdAt: '2024-01-25T15:20:00',
    lastModified: '2024-01-25T15:20:00',
    modifiedBy: 'Jorge Silva'
  },
  {
    id: 'SER-006',
    date: '2024-01-28',
    description: 'Servicio de seguridad y vigilancia 24/7',
    amount: 2800.00,
    status: 'Pagado',
    serviceType: 'Seguridad',
    supplier: 'Prosegur',
    accountNumber: 'PRO-789456',
    dueDate: '2024-02-05',
    paymentProof: 'COM-005-2024',
    notes: 'Incluye 3 vigilantes y sistema de alarma',
    createdBy: 'Ana García',
    createdAt: '2024-01-28T16:30:00',
    lastModified: '2024-01-28T16:30:00',
    modifiedBy: 'Ana García'
  },
  {
    id: 'SER-007',
    date: '2024-02-01',
    description: 'Servicio de limpieza integral del edificio',
    amount: 1200.00,
    status: 'Pagado',
    serviceType: 'Limpieza',
    supplier: 'Limpieza Total SAC',
    accountNumber: 'LT-456123',
    dueDate: '2024-02-10',
    paymentProof: 'COM-006-2024',
    notes: 'Limpieza diaria de oficinas y áreas comunes',
    createdBy: 'Luis Torres',
    createdAt: '2024-02-01T08:00:00',
    lastModified: '2024-02-01T08:00:00',
    modifiedBy: 'Luis Torres'
  },
  {
    id: 'SER-008',
    date: '2024-02-05',
    description: 'Servicio de hosting y dominio web empresarial',
    amount: 150.00,
    status: 'Pendiente',
    serviceType: 'Otros',
    supplier: 'HostingPeru',
    accountNumber: 'HP-147258',
    dueDate: '2024-02-15',
    notes: 'Renovación anual del hosting',
    createdBy: 'Carlos Mendoza',
    createdAt: '2024-02-05T12:00:00',
    lastModified: '2024-02-05T12:00:00',
    modifiedBy: 'Carlos Mendoza'
  }
];

/** Estadísticas calculadas */
export const mockOutputStats: OutputStats = {
  totalPurchases: mockPurchases.length,
  totalServices: mockServices.length,
  totalPurchaseAmount: mockPurchases.reduce((sum, purchase) => sum + purchase.amount, 0),
  totalServiceAmount: mockServices.reduce((sum, service) => sum + service.amount, 0),
  totalAmount: mockPurchases.reduce((sum, purchase) => sum + purchase.amount, 0) + 
               mockServices.reduce((sum, service) => sum + service.amount, 0),
  pendingPurchases: mockPurchases.filter(p => p.status === 'Pendiente').length,
  pendingServices: mockServices.filter(s => s.status === 'Pendiente').length,
  thisMonthPurchases: mockPurchases.filter(p => p.date.startsWith('2024-02')).length,
  thisMonthServices: mockServices.filter(s => s.date.startsWith('2024-02')).length,
  thisMonthAmount: mockPurchases.filter(p => p.date.startsWith('2024-02')).reduce((sum, p) => sum + p.amount, 0) +
                   mockServices.filter(s => s.date.startsWith('2024-02')).reduce((sum, s) => sum + s.amount, 0)
};

/** Resumen por categorías de compra */
export const mockCategorySummary: CategorySummary[] = [
  { category: 'Tecnología', count: 1, amount: 4500.00, percentage: 41.2 },
  { category: 'Muebles', count: 1, amount: 2100.00, percentage: 19.2 },
  { category: 'Mantenimiento', count: 1, amount: 1200.00, percentage: 11.0 },
  { category: 'Capacitación', count: 1, amount: 980.00, percentage: 9.0 },
  { category: 'Pasaje', count: 1, amount: 850.00, percentage: 7.8 },
  { category: 'Marketing', count: 1, amount: 750.00, percentage: 6.9 },
  { category: 'Oficina', count: 1, amount: 680.50, percentage: 6.2 },
  { category: 'Alimentación', count: 1, amount: 450.00, percentage: 4.1 }
];

/** Resumen por tipos de servicio */
export const mockServiceTypeSummary: ServiceTypeSummary[] = [
  { serviceType: 'Seguridad', count: 1, amount: 2800.00, percentage: 40.3 },
  { serviceType: 'Luz', count: 1, amount: 1250.75, percentage: 18.0 },
  { serviceType: 'Limpieza', count: 1, amount: 1200.00, percentage: 17.3 },
  { serviceType: 'Internet', count: 1, amount: 650.00, percentage: 9.4 },
  { serviceType: 'Agua', count: 1, amount: 380.50, percentage: 5.5 },
  { serviceType: 'Teléfono', count: 1, amount: 220.00, percentage: 3.2 },
  { serviceType: 'Gas', count: 1, amount: 180.25, percentage: 2.6 },
  { serviceType: 'Otros', count: 1, amount: 150.00, percentage: 2.2 }
];

/** Datos para gráficos */
export const mockChartData: ChartData[] = [
  { month: 'Enero', purchases: 6, services: 7, totalAmount: 14832.75 },
  { month: 'Febrero', purchases: 2, services: 1, totalAmount: 1880.00 },
  { month: 'Marzo', purchases: 0, services: 0, totalAmount: 0 },
  { month: 'Abril', purchases: 0, services: 0, totalAmount: 0 },
  { month: 'Mayo', purchases: 0, services: 0, totalAmount: 0 },
  { month: 'Junio', purchases: 0, services: 0, totalAmount: 0 }
];

/** Opciones de meses */
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
  { id: 12, name: 'Diciembre' }
];

/** Función para obtener compras filtradas */
export const getFilteredPurchases = (filters: any) => {
  return mockPurchases.filter(purchase => {
    const matchesSearch = !filters.search || 
      purchase.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      purchase.supplier?.toLowerCase().includes(filters.search.toLowerCase()) ||
      purchase.voucherNumber.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesPaymentType = !filters.paymentType || purchase.paymentType === filters.paymentType;
    const matchesCategory = !filters.category || purchase.category === filters.category;
    const matchesStatus = !filters.status || purchase.status === filters.status;
    
    return matchesSearch && matchesPaymentType && matchesCategory && matchesStatus;
  });
};

/** Función para obtener servicios filtrados */
export const getFilteredServices = (filters: any) => {
  return mockServices.filter(service => {
    const matchesSearch = !filters.search || 
      service.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      service.supplier.toLowerCase().includes(filters.search.toLowerCase()) ||
      service.accountNumber?.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesServiceType = !filters.serviceType || service.serviceType === filters.serviceType;
    const matchesStatus = !filters.status || service.status === filters.status;
    
    return matchesSearch && matchesServiceType && matchesStatus;
  });
};
