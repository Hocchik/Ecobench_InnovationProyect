import { v4 as uuidv4 } from 'uuid';
import { ClientTable, ClientElevators, ElevatorTechHistory, ClientMaintenanceHistory } from './interfaces/ClientInterfaces';

// Clientes de prueba
export const testClients: ClientTable[] = [
  {
    id_client: "a1b2c3d4-0001-0000-0000-000000000001",
    name_client: "Cliente S.A.",
    address_client: "Av. Principal 123",
    section_client: "Mantenimiento",
    elevators_client: 2,
  },
  {
    id_client: "a1b2c3d4-0002-0000-0000-000000000002",
    name_client: "Cliente B",
    address_client: "Calle Falsa 456",
    section_client: "Mantenimiento",
    elevators_client: 1,
  },
  {
    id_client: "a1b2c3d4-0003-0000-0000-000000000003",
    name_client: "Cliente C",
    address_client: "Av. Los Pinos 789",
    section_client: "Correctivo",
    elevators_client: 1,
  },
  {
    id_client: "a1b2c3d4-0004-0000-0000-000000000004",
    name_client: "Cliente D",
    address_client: "Av. Surco 321",
    section_client: "Correctivo",
    elevators_client: 1,
  },
];

// Genera los UUID una sola vez para mantener la relación
const elev1 = uuidv4();
const elev2 = uuidv4();
const elev3 = uuidv4();
const elev4 = uuidv4();
const elev5 = uuidv4();

export const testClientElevators: ClientElevators[] = [
  {
    id_client: "a1b2c3d4-0001-0000-0000-000000000001",
    elevators: [
      {
        id_elevator: elev1,
        elevator_type: "Hidráulico",
        brand: "Otis",
        model: "Hydra200",
        control_system: "Electrónico",
        machine_room: true,
        floors: 8,
        access: "Frontal",
        maintenance_frequency: "Trimestral",
        characteristics: "Capacidad 8 personas, velocidad 1m/s",
        observation: "Sin observaciones",
      },
      {
        id_elevator: elev2,
        elevator_type: "Eléctrico",
        brand: "Schindler",
        model: "300P",
        control_system: "Electromecánico",
        machine_room: false,
        floors: 8,
        access: "Frontal",
        maintenance_frequency: "Trimestral",
        characteristics: "Capacidad 10 personas, velocidad 1.2m/s",
        observation: "Requiere revisión de sensores",
      },
    ],
  },
  {
    id_client: "a1b2c3d4-0002-0000-0000-000000000002",
    elevators: [
      {
        id_elevator: elev3,
        elevator_type: "Eléctrico",
        brand: "Thyssen",
        model: "TKE-Compact",
        control_system: "Electrónico",
        machine_room: false,
        floors: 6,
        access: "Frontal",
        maintenance_frequency: "Trimestral",
        characteristics: "Capacidad 6 personas, velocidad 1m/s",
        observation: "Sin observaciones",
      },
    ],
  },
  {
    id_client: "a1b2c3d4-0003-0000-0000-000000000003",
    elevators: [
      {
        id_elevator: elev4,
        elevator_type: "Eléctrico",
        brand: "LG",
        model: "LG-Plus",
        control_system: "Electrónico",
        machine_room: true,
        floors: 10,
        access: "Frontal",
        maintenance_frequency: "Semestral",
        characteristics: "Capacidad 8 personas, velocidad 1m/s",
        observation: "Cambio de tarjeta electrónica reciente",
      },
    ],
  },
  {
    id_client: "a1b2c3d4-0004-0000-0000-000000000004",
    elevators: [
      {
        id_elevator: elev5,
        elevator_type: "Hidráulico",
        brand: "Mitsubishi",
        model: "HydroLift",
        control_system: "Electromecánico",
        machine_room: true,
        floors: 5,
        access: "Frontal",
        maintenance_frequency: "Trimestral",
        characteristics: "Capacidad 5 personas, velocidad 0.8m/s",
        observation: "Freno ajustado recientemente",
      },
    ],
  },
];

// Ahora usa esos mismos IDs para el historial técnico:
export const testElevatorTechHistory: ElevatorTechHistory[] = [
  {
    id_elevator: elev1,
    emergencyHistory: [
      {
        date: "2025-05-10",
        description: "Parada inesperada entre pisos",
        location: "Piso 4",
        cause: "Fallo de sensor",
        peopleTrapped: false,
      }
    ],
    preventiveMaintenanceHistory: [
      { date: "2025-06-20" }
    ],
    sparePartHistory: [
      {
        part: "Fusible",
        location: "Tablero principal",
        failureDate: "2025-06-19",
        changeDate: "2025-06-20",
        failureCause: "Sobrecarga eléctrica"
      }
    ],
    partLocations: [
      {
        location: "CM",
        involvedElements: [
          "TABLERO de control",
          "MOTOR de tracción de cabina",
          "POLEA de limitador de velocidad"
        ]
      },
      {
        location: "DA",
        involvedElements: [
          "RIELES de cabina (bracket y pernos de sujeción)",
          "RIELES de contrapeso (bracket y pernos de sujeción)",
          "CABINA (guías de cabina, Luminarias, botoneras, Display, alarma de emergencia, Puerta automática, variador de puerta automática, módulo de control modo mantenimiento, Sensores de cambio de velocidad y nivelación, sensores antefinales)",
          "CABLEADO de ducto (Adosado al ducto)",
          "PUERTAS de piso (06 unidades mecánicas): Contacto eléctrico de presencia, Contacto eléctrico de chapa de seguridad",
          "PUERTA de cabina (01 unidad automática): Amortiguador, contacto eléctrico, cadena, patín retráctil",
          "CABLE viajero (Cable aéreo)",
          "BOTONERAS exteriores para llamado de ascensor"
        ]
      },
      {
        location: "PA",
        involvedElements: [
          "RIELES de cabina",
          "RIELES de contrapeso",
          "POLEA TENSORA del limitador de velocidad",
          "AMORTIGUADOR de cabina",
          "AMORTIGUADOR de contrapeso"
        ]
      }
    ]
  },
  // --- elev2 ---
  {
    id_elevator: elev2,
    emergencyHistory: [],
    preventiveMaintenanceHistory: [
      { date: "2025-07-10" }
    ],
    sparePartHistory: [],
    partLocations: [
      {
        location: "CM",
        involvedElements: [
          "TABLERO de control",
          "MOTOR de tracción de cabina",
          "POLEA de limitador de velocidad"
        ]
      },
      {
        location: "DA",
        involvedElements: [
          "RIELES de cabina (bracket y pernos de sujeción)",
          "RIELES de contrapeso (bracket y pernos de sujeción)",
          "CABINA (guías de cabina, Luminarias, botoneras, Display, alarma de emergencia, Puerta automática, variador de puerta automática, módulo de control modo mantenimiento, Sensores de cambio de velocidad y nivelación, sensores antefinales)",
          "CABLEADO de ducto (Adosado al ducto)",
          "PUERTAS de piso (06 unidades mecánicas): Contacto eléctrico de presencia, Contacto eléctrico de chapa de seguridad",
          "PUERTA de cabina (01 unidad automática): Amortiguador, contacto eléctrico, cadena, patín retráctil",
          "CABLE viajero (Cable aéreo)",
          "BOTONERAS exteriores para llamado de ascensor"
        ]
      },
      {
        location: "PA",
        involvedElements: [
          "RIELES de cabina",
          "RIELES de contrapeso",
          "POLEA TENSORA del limitador de velocidad",
          "AMORTIGUADOR de cabina",
          "AMORTIGUADOR de contrapeso"
        ]
      }
    ]
  },
  // --- elev3 ---
  {
    id_elevator: elev3,
    emergencyHistory: [],
    preventiveMaintenanceHistory: [
      { date: "2025-07-10" }
    ],
    sparePartHistory: [],
    partLocations: [
      {
        location: "CM",
        involvedElements: [
          "TABLERO de control",
          "MOTOR de tracción de cabina",
          "POLEA de limitador de velocidad"
        ]
      },
      {
        location: "DA",
        involvedElements: [
          "RIELES de cabina (bracket y pernos de sujeción)",
          "RIELES de contrapeso (bracket y pernos de sujeción)",
          "CABINA (guías de cabina, Luminarias, botoneras, Display, alarma de emergencia, Puerta automática, variador de puerta automática, módulo de control modo mantenimiento, Sensores de cambio de velocidad y nivelación, sensores antefinales)",
          "CABLEADO de ducto (Adosado al ducto)",
          "PUERTAS de piso (06 unidades mecánicas): Contacto eléctrico de presencia, Contacto eléctrico de chapa de seguridad",
          "PUERTA de cabina (01 unidad automática): Amortiguador, contacto eléctrico, cadena, patín retráctil",
          "CABLE viajero (Cable aéreo)",
          "BOTONERAS exteriores para llamado de ascensor"
        ]
      },
      {
        location: "PA",
        involvedElements: [
          "RIELES de cabina",
          "RIELES de contrapeso",
          "POLEA TENSORA del limitador de velocidad",
          "AMORTIGUADOR de cabina",
          "AMORTIGUADOR de contrapeso"
        ]
      }
    ]
  },
  // --- elev4 ---
  {
    id_elevator: elev4,
    emergencyHistory: [
      {
        date: "2025-06-18",
        description: "Fallo de tarjeta electrónica",
        location: "Tablero de control",
        cause: "Sobrecarga",
        peopleTrapped: false,
      }
    ],
    preventiveMaintenanceHistory: [],
    sparePartHistory: [
      {
        part: "Tarjeta electrónica",
        location: "Tablero de control",
        failureDate: "2025-06-18",
        changeDate: "2025-06-19",
        failureCause: "Sobrecarga",
      }
    ],
    partLocations: [
      {
        location: "CM",
        involvedElements: [
          "TABLERO de control",
          "MOTOR de tracción de cabina",
          "POLEA de limitador de velocidad"
        ]
      },
      {
        location: "DA",
        involvedElements: [
          "RIELES de cabina (bracket y pernos de sujeción)",
          "RIELES de contrapeso (bracket y pernos de sujeción)",
          "CABINA (guías de cabina, Luminarias, botoneras, Display, alarma de emergencia, Puerta automática, variador de puerta automática, módulo de control modo mantenimiento, Sensores de cambio de velocidad y nivelación, sensores antefinales)",
          "CABLEADO de ducto (Adosado al ducto)",
          "PUERTAS de piso (06 unidades mecánicas): Contacto eléctrico de presencia, Contacto eléctrico de chapa de seguridad",
          "PUERTA de cabina (01 unidad automática): Amortiguador, contacto eléctrico, cadena, patín retráctil",
          "CABLE viajero (Cable aéreo)",
          "BOTONERAS exteriores para llamado de ascensor"
        ]
      },
      {
        location: "PA",
        involvedElements: [
          "RIELES de cabina",
          "RIELES de contrapeso",
          "POLEA TENSORA del limitador de velocidad",
          "AMORTIGUADOR de cabina",
          "AMORTIGUADOR de contrapeso"
        ]
      }
    ]
  },
  // --- elev5 ---
  {
    id_elevator: elev5,
    emergencyHistory: [],
    preventiveMaintenanceHistory: [],
    sparePartHistory: [],
    partLocations: [
      {
        location: "CM",
        involvedElements: [
          "TABLERO de control",
          "MOTOR de tracción de cabina",
          "POLEA de limitador de velocidad"
        ]
      },
      {
        location: "DA",
        involvedElements: [
          "RIELES de cabina (bracket y pernos de sujeción)",
          "RIELES de contrapeso (bracket y pernos de sujeción)",
          "CABINA (guías de cabina, Luminarias, botoneras, Display, alarma de emergencia, Puerta automática, variador de puerta automática, módulo de control modo mantenimiento, Sensores de cambio de velocidad y nivelación, sensores antefinales)",
          "CABLEADO de ducto (Adosado al ducto)",
          "PUERTAS de piso (06 unidades mecánicas): Contacto eléctrico de presencia, Contacto eléctrico de chapa de seguridad",
          "PUERTA de cabina (01 unidad automática): Amortiguador, contacto eléctrico, cadena, patín retráctil",
          "CABLE viajero (Cable aéreo)",
          "BOTONERAS exteriores para llamado de ascensor"
        ]
      },
      {
        location: "PA",
        involvedElements: [
          "RIELES de cabina",
          "RIELES de contrapeso",
          "POLEA TENSORA del limitador de velocidad",
          "AMORTIGUADOR de cabina",
          "AMORTIGUADOR de contrapeso"
        ]
      }
    ]
  }
];

export const testElevatorMaintenanceHistory: ClientMaintenanceHistory[] = [
  {
    id_activity: "act-001",
    id_client: "a1b2c3d4-0001-0000-0000-000000000001",
    id_elevator: elev1,
    date: "2025-06-20",
    start_time: "09:00",
    end_time: "10:30",
    technician_assigned: "Juan Pérez",
    technician_executor: "Carlos Ruiz",
    name_supervisor: "Ana Torres",
    maintenance_type: "Preventivo",
    activities: [
      "Revisión general",
      "Lubricación de piezas",
      "Chequeo de sensores"
    ]
  },
  {
    id_activity: "act-002",
    id_client: "a1b2c3d4-0001-0000-0000-000000000001",
    id_elevator: elev2,
    date: "2025-07-10",
    start_time: "11:00",
    end_time: "12:00",
    technician_assigned: "Luis Gómez",
    technician_executor: "Pedro Díaz",
    name_supervisor: "Ana Torres",
    maintenance_type: "Preventivo",
    activities: [
      "Chequeo de puertas",
      "Prueba de frenos"
    ]
  },
  {
    id_activity: "act-003",
    id_client: "a1b2c3d4-0002-0000-0000-000000000002",
    id_elevator: elev3,
    date: "2025-07-15",
    start_time: "08:30",
    end_time: "09:30",
    technician_assigned: "María López",
    technician_executor: "José Martínez",
    name_supervisor: "Ricardo Silva",
    maintenance_type: "Correctivo",
    activities: [
      "Cambio de fusible",
      "Ajuste de tablero"
    ]
  }
  // ...agrega más si lo necesitas
];