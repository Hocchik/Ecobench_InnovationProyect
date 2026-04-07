// Datos para la caja chica
export const cajaChicaData = {
  montoActual: 8665.00,
  ultimosMovimientos: [
    { 
      id: 1, 
      tipo: 'Egreso', 
      concepto: 'Hospedaje', 
      monto: 100.00, 
      fecha: '2025-07-22' 
    },
    { 
      id: 2, 
      tipo: 'Egreso', 
      concepto: 'Pasaje', 
      monto: 20.00, 
      fecha: '2025-07-23' 
    },
    { 
      id: 3, 
      tipo: 'Egreso', 
      concepto: 'Comida', 
      monto: 15.00, 
      fecha: '2025-07-24' 
    },
    { 
      id: 4, 
      tipo: 'Ingreso', 
      concepto: 'Ingreso', 
      monto: 8800.00, 
      fecha: '2025-07-25' 
    },
  ]
};

// Datos para cargos solicitados
export const cargosSolicitadosData = [
  {
    id_tool_request: "CR001",
    request_number: "Cargo #1254",
    technician: "Erick Díaz Pacheco",
    date: "25/07/2025",
    reason: "Mantenimiento preventivo",
    items: [],
    status: "Pendiente"
  },
  {
    id_tool_request: "CR002",
    request_number: "Cargo #1255",
    technician: "Erick Díaz Pacheco",
    date: "25/07/2025",
    reason: "Reparación de equipo",
    items: [],
    status: "Pendiente"
  },
  {
    id_tool_request: "CR003",
    request_number: "Cargo #1256",
    technician: "Erick Díaz Pacheco",
    date: "25/07/2025",
    reason: "Solicitud de herramientas",
    items: [],
    status: "Pendiente"
  }
];

// Datos para el gráfico de actividad semanal
export const actividadSemanalData = {
  currentWeek: '17/02 - 23/02',
  dailyData: [
    { day: 'Lun', value: 450 },
    { day: 'Mar', value: 320 },
    { day: 'Mier', value: 300 },
    { day: 'Jue', value: 450 },
    { day: 'Vie', value: 150 },
    { day: 'Sab', value: 350 },
    { day: 'Dom', value: 380 }
  ],
  gastosPorTipo: [
    { id: 0, value: 40, label: 'Hospedaje', color: '#475AD7' },
    { id: 1, value: 35, label: 'Pasaje', color: '#4318FF' },
    { id: 2, value: 25, label: 'Comida', color: '#FF2D6C' }
  ],
  ventasRepuestos: [
    { id: 0, value: 30, label: 'Cables', color: '#476797' },
    { id: 1, value: 25, label: 'Tornillos', color: '#FFB547' },
    { id: 2, value: 15, label: 'Lubricantes', color: '#1976D2' },
    { id: 3, value: 30, label: 'Herramientas', color: '#FF4842' }
  ]
};

// Datos para la vista semanal y mensual
export const weeklyActivityData = {
  weeks: [
    { id: 1, label: '17/02 - 23/02' },
    { id: 2, label: '24/02 - 01/03' },
    { id: 3, label: '02/03 - 08/03' },
    { id: 4, label: '09/03 - 15/03' }
  ],
  currentWeekId: 1
};
