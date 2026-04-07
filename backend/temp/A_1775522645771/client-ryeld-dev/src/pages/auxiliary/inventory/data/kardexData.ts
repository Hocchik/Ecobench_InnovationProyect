/**
 * Datos de ejemplo para el Kardex
 * @module KardexData
 */

import { 
  KardexMovement, 
  KardexBalance, 
  KardexStats,
  ProductInfo
} from './kardexInterfaces';

/**
 * Lista de productos disponibles para el Kardex
 */
export const availableProducts: ProductInfo[] = [
  {
    id: 1,
    codigo: 'MOT-001',
    descripcion: 'Motor eléctrico 3HP',
    categoria: 'Motores',
    unidad: 'UND',
    saldoActual: 12
  },
  {
    id: 2,
    codigo: 'CAB-023',
    descripcion: 'Cable de acero 8mm x 50m',
    categoria: 'Cables',
    unidad: 'ROL',
    saldoActual: 23
  },
  {
    id: 3,
    codigo: 'BOT-005',
    descripcion: 'Botonera de piso 12 botones',
    categoria: 'Componentes',
    unidad: 'UND',
    saldoActual: 12
  },
  {
    id: 4,
    codigo: 'PUE-012',
    descripcion: 'Puerta automática corrediza',
    categoria: 'Puertas',
    unidad: 'UND',
    saldoActual: 4
  },
  {
    id: 5,
    codigo: 'SEN-008',
    descripcion: 'Sensor de puerta infrarrojo',
    categoria: 'Sensores',
    unidad: 'UND',
    saldoActual: 17
  },
  {
    id: 6,
    codigo: 'LUB-003',
    descripcion: 'Lubricante industrial 5L',
    categoria: 'Lubricantes',
    unidad: 'GAL',
    saldoActual: 8
  },
  {
    id: 7,
    codigo: 'INT-015',
    descripcion: 'Interruptor de seguridad final',
    categoria: 'Seguridad',
    unidad: 'UND',
    saldoActual: 15
  }
];

/**
 * Movimientos de ejemplo del Kardex
 */
export const kardexMovements: KardexMovement[] = [
  // SALIDAS
  {
    id: 1,
    tipo: 'salida',
    fecha: '2024-10-05',
    hora: '09:30',
    numeroDocumento: 'CAS-045',
    estado: 'completado',
    articulos: [
      {
        id: 1,
        codigo: 'MOT-001',
        descripcion: 'Motor eléctrico 3HP',
        categoria: 'Motores',
        cantidad: 1,
        unidad: 'UND',
        precioUnitario: 850.00,
        subtotal: 850.00
      },
      {
        id: 2,
        codigo: 'CAB-023',
        descripcion: 'Cable de acero 8mm x 50m',
        categoria: 'Cables',
        cantidad: 2,
        unidad: 'ROL',
        precioUnitario: 450.00,
        subtotal: 900.00
      }
    ],
    totalArticulos: 3,
    valorTotal: 1750.00,
    tecnico: {
      id: 1,
      nombre: 'Carlos',
      apellido: 'Mendoza',
      especialidad: 'Mantenimiento Preventivo',
      telefono: '987654321'
    },
    cliente: {
      id: 1,
      nombre: 'Edificio Torre Azul',
      ruc: '20123456789',
      direccion: 'Av. Javier Prado 1234',
      distrito: 'San Isidro',
      telefono: '014567890'
    },
    motivo: 'Mantenimiento preventivo programado',
    observaciones: 'Reemplazo de motor defectuoso y cambio de cables por desgaste',
    aprobadoPor: 'Ing. Roberto García',
    almacen: 'Almacén Central'
  },
  {
    id: 2,
    tipo: 'salida',
    fecha: '2024-10-04',
    hora: '14:15',
    numeroDocumento: 'CAS-044',
    estado: 'completado',
    articulos: [
      {
        id: 3,
        codigo: 'BOT-005',
        descripcion: 'Botonera de piso 12 botones',
        categoria: 'Componentes',
        cantidad: 1,
        unidad: 'UND',
        precioUnitario: 320.00,
        subtotal: 320.00
      }
    ],
    totalArticulos: 1,
    valorTotal: 320.00,
    tecnico: {
      id: 2,
      nombre: 'Luis',
      apellido: 'Ramírez',
      especialidad: 'Reparaciones',
      telefono: '998877665'
    },
    cliente: {
      id: 2,
      nombre: 'Centro Comercial Plaza Norte',
      ruc: '20987654321',
      direccion: 'Av. Alfredo Mendiola 3698',
      distrito: 'Independencia',
      telefono: '016547890'
    },
    motivo: 'Reparación correctiva - Botonera dañada',
    observaciones: 'Botonera con botones sin respuesta',
    aprobadoPor: 'Ing. María López',
    almacen: 'Almacén Central'
  },
  {
    id: 3,
    tipo: 'salida',
    fecha: '2024-10-03',
    hora: '10:45',
    numeroDocumento: 'CAS-043',
    estado: 'completado',
    articulos: [
      {
        id: 4,
        codigo: 'PUE-012',
        descripcion: 'Puerta automática corrediza',
        categoria: 'Puertas',
        cantidad: 1,
        unidad: 'UND',
        precioUnitario: 2500.00,
        subtotal: 2500.00
      },
      {
        id: 5,
        codigo: 'SEN-008',
        descripcion: 'Sensor de puerta infrarrojo',
        categoria: 'Sensores',
        cantidad: 2,
        unidad: 'UND',
        precioUnitario: 180.00,
        subtotal: 360.00
      }
    ],
    totalArticulos: 3,
    valorTotal: 2860.00,
    tecnico: {
      id: 3,
      nombre: 'Pedro',
      apellido: 'Sánchez',
      especialidad: 'Instalación',
      telefono: '912345678'
    },
    cliente: {
      id: 3,
      nombre: 'Hospital San Pablo',
      ruc: '20456789123',
      direccion: 'Av. El Polo 789',
      distrito: 'Surco',
      telefono: '014445566'
    },
    motivo: 'Instalación de nueva puerta',
    observaciones: 'Puerta anterior con falla mecánica irreparable',
    aprobadoPor: 'Ing. Roberto García',
    almacen: 'Almacén Central'
  },

  // ENTRADAS
  {
    id: 4,
    tipo: 'entrada',
    fecha: '2024-10-06',
    hora: '08:00',
    numeroDocumento: 'CAE-032',
    estado: 'completado',
    articulos: [
      {
        id: 6,
        codigo: 'MOT-001',
        descripcion: 'Motor eléctrico 3HP',
        categoria: 'Motores',
        cantidad: 5,
        unidad: 'UND',
        precioUnitario: 850.00,
        subtotal: 4250.00
      },
      {
        id: 7,
        codigo: 'CAB-023',
        descripcion: 'Cable de acero 8mm x 50m',
        categoria: 'Cables',
        cantidad: 10,
        unidad: 'ROL',
        precioUnitario: 450.00,
        subtotal: 4500.00
      }
    ],
    totalArticulos: 15,
    valorTotal: 8750.00,
    tecnico: {
      id: 4,
      nombre: 'José',
      apellido: 'Torres',
      especialidad: 'Almacenista',
      telefono: '923456789'
    },
    motivo: 'Reposición de stock - Compra regular',
    observaciones: 'Recepción de pedido quincenal',
    aprobadoPor: 'Ing. Roberto García',
    almacen: 'Almacén Central',
    documentoUrl: '/documentos/compra-032.pdf'
  },
  {
    id: 5,
    tipo: 'entrada',
    fecha: '2024-10-02',
    hora: '11:20',
    numeroDocumento: 'CAE-031',
    estado: 'completado',
    articulos: [
      {
        id: 8,
        codigo: 'BOT-005',
        descripcion: 'Botonera de piso 12 botones',
        categoria: 'Componentes',
        cantidad: 8,
        unidad: 'UND',
        precioUnitario: 320.00,
        subtotal: 2560.00
      },
      {
        id: 9,
        codigo: 'SEN-008',
        descripcion: 'Sensor de puerta infrarrojo',
        categoria: 'Sensores',
        cantidad: 15,
        unidad: 'UND',
        precioUnitario: 180.00,
        subtotal: 2700.00
      }
    ],
    totalArticulos: 23,
    valorTotal: 5260.00,
    tecnico: {
      id: 4,
      nombre: 'José',
      apellido: 'Torres',
      especialidad: 'Almacenista',
      telefono: '923456789'
    },
    motivo: 'Reposición de componentes electrónicos',
    observaciones: 'Stock bajo detectado en inventario mensual',
    aprobadoPor: 'Ing. María López',
    almacen: 'Almacén Central'
  },
  {
    id: 6,
    tipo: 'entrada',
    fecha: '2024-09-28',
    hora: '15:30',
    numeroDocumento: 'CAE-030',
    estado: 'completado',
    articulos: [
      {
        id: 10,
        codigo: 'PUE-012',
        descripcion: 'Puerta automática corrediza',
        categoria: 'Puertas',
        cantidad: 3,
        unidad: 'UND',
        precioUnitario: 2500.00,
        subtotal: 7500.00
      }
    ],
    totalArticulos: 3,
    valorTotal: 7500.00,
    tecnico: {
      id: 4,
      nombre: 'José',
      apellido: 'Torres',
      especialidad: 'Almacenista',
      telefono: '923456789'
    },
    motivo: 'Pedido especial para proyectos',
    observaciones: 'Puertas para proyectos de Hospital San Pablo y otros',
    aprobadoPor: 'Ing. Roberto García',
    almacen: 'Almacén Central'
  },

  // SALIDAS ADICIONALES
  {
    id: 7,
    tipo: 'salida',
    fecha: '2024-10-01',
    hora: '16:00',
    numeroDocumento: 'CAS-042',
    estado: 'completado',
    articulos: [
      {
        id: 11,
        codigo: 'LUB-003',
        descripcion: 'Lubricante industrial 5L',
        categoria: 'Lubricantes',
        cantidad: 4,
        unidad: 'GAL',
        precioUnitario: 65.00,
        subtotal: 260.00
      }
    ],
    totalArticulos: 4,
    valorTotal: 260.00,
    tecnico: {
      id: 1,
      nombre: 'Carlos',
      apellido: 'Mendoza',
      especialidad: 'Mantenimiento Preventivo',
      telefono: '987654321'
    },
    cliente: {
      id: 4,
      nombre: 'Residencial Los Pinos',
      ruc: '20741852963',
      direccion: 'Calle Los Eucaliptos 456',
      distrito: 'Miraflores',
      telefono: '012223344'
    },
    motivo: 'Mantenimiento preventivo - Lubricación',
    observaciones: 'Lubricación de mecanismos de 4 ascensores',
    aprobadoPor: 'Ing. María López',
    almacen: 'Almacén Central'
  },
  {
    id: 8,
    tipo: 'salida',
    fecha: '2024-09-30',
    hora: '13:45',
    numeroDocumento: 'CAS-041',
    estado: 'completado',
    articulos: [
      {
        id: 12,
        codigo: 'INT-015',
        descripcion: 'Interruptor de seguridad final',
        categoria: 'Seguridad',
        cantidad: 3,
        unidad: 'UND',
        precioUnitario: 95.00,
        subtotal: 285.00
      }
    ],
    totalArticulos: 3,
    valorTotal: 285.00,
    tecnico: {
      id: 2,
      nombre: 'Luis',
      apellido: 'Ramírez',
      especialidad: 'Reparaciones',
      telefono: '998877665'
    },
    cliente: {
      id: 5,
      nombre: 'Universidad San Martín',
      ruc: '20159753852',
      direccion: 'Av. Universitaria 1801',
      distrito: 'Los Olivos',
      telefono: '015556677'
    },
    motivo: 'Reparación de sistema de seguridad',
    observaciones: 'Reemplazo de interruptores defectuosos',
    aprobadoPor: 'Ing. Roberto García',
    almacen: 'Almacén Central'
  }
];

/**
 * Balance de artículos en el Kardex
 */
export const kardexBalances: KardexBalance[] = [
  {
    articulo: {
      id: 1,
      codigo: 'MOT-001',
      descripcion: 'Motor eléctrico 3HP'
    },
    saldoInicial: 8,
    totalEntradas: 5,
    totalSalidas: 1,
    saldoFinal: 12,
    unidad: 'UND',
    valorPromedio: 850.00
  },
  {
    articulo: {
      id: 2,
      codigo: 'CAB-023',
      descripcion: 'Cable de acero 8mm x 50m'
    },
    saldoInicial: 15,
    totalEntradas: 10,
    totalSalidas: 2,
    saldoFinal: 23,
    unidad: 'ROL',
    valorPromedio: 450.00
  },
  {
    articulo: {
      id: 3,
      codigo: 'BOT-005',
      descripcion: 'Botonera de piso 12 botones'
    },
    saldoInicial: 5,
    totalEntradas: 8,
    totalSalidas: 1,
    saldoFinal: 12,
    unidad: 'UND',
    valorPromedio: 320.00
  },
  {
    articulo: {
      id: 4,
      codigo: 'PUE-012',
      descripcion: 'Puerta automática corrediza'
    },
    saldoInicial: 2,
    totalEntradas: 3,
    totalSalidas: 1,
    saldoFinal: 4,
    unidad: 'UND',
    valorPromedio: 2500.00
  }
];

/**
 * Estadísticas del Kardex
 */
export const kardexStats: KardexStats = {
  totalMovimientos: 8,
  totalEntradas: 3,
  totalSalidas: 5,
  valorTotalEntradas: 21510.00,
  valorTotalSalidas: 5475.00,
  articulosMasMovidos: [
    { articulo: 'Cable de acero 8mm', cantidad: 12 },
    { articulo: 'Motor eléctrico 3HP', cantidad: 6 },
    { articulo: 'Sensor de puerta', cantidad: 17 }
  ]
};
