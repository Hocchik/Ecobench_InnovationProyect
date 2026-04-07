import { InventoryItem, InventoryExit, InventoryEntry, InventoryPurchase, Month, InventoryStats } from './interfaces';

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

// Datos del inventario actual
export const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    nro: '01',
    imagen: '/imgs/tarjeta-electronica.jpg',
    nombre: 'TARJETA ELECTRONICA PARA ASCENSOR PULSADOR SCHINDLER / ID 591876',
    codigo: 'RA001',
    categoria: 'REPUESTO',
    posicion: 'La',
    costoU: 1200.00,
    importancia: 'URGENTE',
    cantAlmacen: 9,
    unidadMedida: 'Unidades',
    status: 'En stock'
  },
  {
    id: 2,
    nro: '02',
    imagen: '/imgs/guia-cabina.jpg',
    nombre: 'GUIADOR DE CABINA PARA ASCENSOR OTIS / ID 591877',
    codigo: 'RA002',
    categoria: 'REPUESTO',
    posicion: 'Lb',
    costoU: 950.00,
    importancia: 'ALTA',
    cantAlmacen: 5,
    unidadMedida: 'Unidades',
    status: 'Bajo stock'
  },
  {
    id: 3,
    nro: '03',
    imagen: '/imgs/sensor-optico.jpg',
    nombre: 'SENSOR OPTICO PARA ASCENSOR THYSSENKRUPP / ID 591878',
    codigo: 'RA003',
    categoria: 'REPUESTO',
    posicion: 'Lc',
    costoU: 800.00,
    importancia: 'MEDIA',
    cantAlmacen: 2,
    unidadMedida: 'Unidades',
    status: 'Bajo stock'
  },
  {
    id: 4,
    nro: '04',
    imagen: '/imgs/botonera.jpg',
    nombre: 'BOTONERA DE PISO PARA ASCENSOR MITSUBISHI / ID 591879',
    codigo: 'RA004',
    categoria: 'REPUESTO',
    posicion: 'Ld',
    costoU: 1500.00,
    importancia: 'URGENTE',
    cantAlmacen: 0,
    unidadMedida: 'Unidades',
    status: 'Sin stock'
  },
  {
    id: 5,
    nro: '05',
    imagen: '/imgs/placa-control.jpg',
    nombre: 'PLACA DE CONTROL PARA ASCENSOR SCHINDLER / ID 591880',
    codigo: 'RA005',
    categoria: 'REPUESTO',
    posicion: 'Le',
    costoU: 2200.00,
    importancia: 'ALTA',
    cantAlmacen: 7,
    unidadMedida: 'Unidades',
    status: 'En stock'
  }
];

// Datos de salidas de inventario
export const inventoryExits: InventoryExit[] = [
  {
    id: 1,
    nombreArticulo: 'BLOCK AUXILIAR PARA CONTACTOR ABB "NC"',
    tecnico: 'Ing. Luis Guido',
    tipoSalida: 'VENTA',
    tipoMantenimiento: 'MANT. CORRECTIVO',
    nroCargo: 'CAS-356'
  },
  {
    id: 2,
    nombreArticulo: 'Management Circular for HR Staffs',
    tecnico: 'Admin, HR',
    tipoSalida: '1',
    tipoMantenimiento: 'Received ✓',
    nroCargo: '...............'
  },
  {
    id: 3,
    nombreArticulo: 'Circular for Time Maintainance in the Office',
    tecnico: 'Management',
    tipoSalida: '2',
    tipoMantenimiento: 'Received ✓',
    nroCargo: '...............'
  },
  {
    id: 4,
    nombreArticulo: 'HR Circular for Operations Department Staff',
    tecnico: 'Admin, HR',
    tipoSalida: '1',
    tipoMantenimiento: 'Sent ↗',
    nroCargo: '...............'
  },
  {
    id: 5,
    nombreArticulo: 'HR Circular for Operations Department Staff',
    tecnico: 'Admin, HR',
    tipoSalida: '2',
    tipoMantenimiento: 'Sent ↗',
    nroCargo: '...............'
  }
];

// Datos de entradas de inventario
export const inventoryEntries: InventoryEntry[] = [
  {
    id: 1,
    nombreArticulo: 'SENSOR OPTICO TIPO "U" THYSSENKRUPP',
    tecnico: 'Ing. Luis Guido',
    tipoEntrada: 'PRÉSTAMO',
    tipoMantenimiento: 'MANT. CORRECTIVO',
    nroCargo: 'CAE-138'
  },
  {
    id: 2,
    nombreArticulo: 'Management Circular for HR Staffs',
    tecnico: 'Admin, HR',
    tipoEntrada: '1',
    tipoMantenimiento: 'Received ✓',
    nroCargo: '...............'
  },
  {
    id: 3,
    nombreArticulo: 'Circular for Time Maintainance in the Office',
    tecnico: 'Management',
    tipoEntrada: '2',
    tipoMantenimiento: 'Received ✓',
    nroCargo: '...............'
  },
  {
    id: 4,
    nombreArticulo: 'HR Circular for Operations Department Staff',
    tecnico: 'Admin, HR',
    tipoEntrada: '1',
    tipoMantenimiento: 'Sent ↗',
    nroCargo: '...............'
  },
  {
    id: 5,
    nombreArticulo: 'HR Circular for Operations Department Staff',
    tecnico: 'Admin, HR',
    tipoEntrada: '2',
    tipoMantenimiento: 'Sent ↗',
    nroCargo: '...............'
  }
];

// Datos de compras de inventario
export const inventoryPurchases: InventoryPurchase[] = [
  {
    id: 1,
    nombreArticulo: 'GUIADORES DE CABINA DE ASCENSOR 9mm (kit)',
    personaCargo: 'Ing. Luis Guido',
    motivo: 'COMPRAS',
    estadoFisico: 'NUEVO',
    nroCargo: 'COM-84'
  },
  {
    id: 2,
    nombreArticulo: 'Management Circular for HR Staffs',
    personaCargo: 'Admin, HR',
    motivo: '1',
    estadoFisico: 'Received ✓',
    nroCargo: '...............'
  },
  {
    id: 3,
    nombreArticulo: 'Circular for Time Maintainance in the Office',
    personaCargo: 'Management',
    motivo: '2',
    estadoFisico: 'Received ✓',
    nroCargo: '...............'
  },
  {
    id: 4,
    nombreArticulo: 'HR Circular for Operations Department Staff',
    personaCargo: 'Admin, HR',
    motivo: '1',
    estadoFisico: 'Sent ↗',
    nroCargo: '...............'
  },
  {
    id: 5,
    nombreArticulo: 'HR Circular for Operations Department Staff',
    personaCargo: 'Admin, HR',
    motivo: '2',
    estadoFisico: 'Sent ↗',
    nroCargo: '...............'
  }
];

// Estadísticas del inventario
export const inventoryStats: InventoryStats = {
  totalItems: 341,
  consumiblesCosto: 20000.00,
  repuestoCosto: 200000.00,
  itemsBajoStock: 10
};
