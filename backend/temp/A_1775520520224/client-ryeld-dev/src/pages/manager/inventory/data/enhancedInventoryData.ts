import { InventoryItem, InventoryExit, InventoryEntry, TopSaleItem } from '../types/inventoryTypes';

// Tecnicos (mock data)
export const technicians = [
  'Erick Díaz Pacheco',
  'Carlos Rodríguez',
  'Ana Martínez López',
  'José García Herrera',
  'María González Silva',
  'Pedro Sánchez Torres'
];

// Clientes/Edificios (mock data)
export const buildings = [
  'Torre Empresarial Lima',
  'Centro Comercial Plaza Norte',
  'Residencial San Isidro',
  'Hospital Nacional',
  'Hotel Sheraton',
  'Oficinas Corporativas Miraflores',
  'Condominio Las Flores',
  'Mall del Sur'
];

// Items de inventario expandidos
export const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    name: "Kit de Mantenimiento Preventivo",
    code: "KMP-001",
    category: "Consumible",
    quantity: 15,
    status: "Available",
    location: "Almacén A - Estante 2A",
    description: "Kit completo para mantenimiento preventivo de ascensores",
    unitCost: 250.00,
    imageUrl: "/imgs/automatizacion1.jpg" // Usando imagen existente como placeholder
  },
  {
    id: 2,
    name: "Sensor de Proximidad Industrial",
    code: "SPI-002",
    category: "Repuesto",
    quantity: 8,
    status: "Available",
    location: "Almacén B - Estante 1B",
    description: "Sensor de proximidad para sistemas de seguridad",
    unitCost: 180.00,
    imageUrl: "/imgs/automatizacion1.jpg" // Usando imagen existente como placeholder
  },
  {
    id: 3,
    name: "Cable de Control Especial",
    code: "CCE-003",
    category: "Repuesto",
    quantity: 2,
    status: "Limited",
    location: "Almacén A - Estante 3C",
    description: "Cable especial para control de ascensores",
    unitCost: 450.00,
    imageUrl: "/imgs/automatizacion1.jpg" // Usando imagen existente como placeholder
  },
  {
    id: 4,
    name: "Kit de Herramientas Básicas",
    code: "KHB-004",
    category: "Consumible",
    quantity: 1,
    status: "Limited",
    location: "Almacén C - Gaveta 1",
    description: "Set básico de herramientas para mantenimiento",
    unitCost: 320.00,
    imageUrl: "/imgs/automatizacion1.jpg" // Usando imagen existente como placeholder
  },
  {
    id: 5,
    name: "Aceite Hidráulico Especial",
    code: "AHE-005",
    category: "Consumible",
    quantity: 0,
    status: "Out of Stock",
    location: "Almacén B - Estante 2D",
    description: "Aceite hidráulico de alta calidad para sistemas de elevación",
    unitCost: 85.00,
    imageUrl: "/imgs/automatizacion1.jpg" // Usando imagen existente como placeholder
  },
  {
    id: 6,
    name: "Motor de Tracción 1HP",
    code: "MT-006",
    category: "Repuesto",
    quantity: 3,
    status: "Available",
    location: "Almacén C - Zona Pesada",
    description: "Motor de tracción para ascensores residenciales",
    unitCost: 1200.00,
    imageUrl: "/imgs/automatizacion1.jpg" // Usando imagen existente como placeholder
  },
  {
    id: 7,
    name: "Pulsadores de Cabina",
    code: "PC-007",
    category: "Repuesto",
    quantity: 25,
    status: "Available",
    location: "Almacén A - Gaveta 3",
    description: "Pulsadores estándar para cabina de ascensor",
    unitCost: 45.00,
    imageUrl: "/imgs/automatizacion1.jpg" // Usando imagen existente como placeholder
  },
  {
    id: 8,
    name: "Sistema de Iluminación LED",
    code: "LED-008",
    category: "Repuesto",
    quantity: 12,
    status: "Available",
    location: "Almacén B - Estante 1A",
    description: "Sistema completo de iluminación LED para cabina",
    unitCost: 380.00,
    imageUrl: "/imgs/automatizacion1.jpg" // Usando imagen existente como placeholder
  }
];

// Salidas de inventario
export const inventoryExits: InventoryExit[] = [
  {
    id: "EXIT-001",
    cargoNumber: "CAS-333",
    physicalState: "Nuevo",
    technician: "Erick Díaz Pacheco",
    building: "Torre Empresarial Lima",
    maintenanceType: "Preventivo",
    exitType: "Gasto",
    date: "2024-12-15",
    quantity: 2,
    notes: "Mantenimiento programado mensual"
  },
  {
    id: "EXIT-002",
    cargoNumber: "CAS-334",
    physicalState: "Seminuevo",
    technician: "Carlos Rodríguez",
    building: "Centro Comercial Plaza Norte",
    maintenanceType: "Correctivo",
    exitType: "Prestamo",
    date: "2024-12-14",
    quantity: 1,
    notes: "Reparación de emergencia"
  },
  {
    id: "EXIT-003",
    cargoNumber: "CAS-335",
    physicalState: "Nuevo",
    technician: "Ana Martínez López",
    building: "Residencial San Isidro",
    maintenanceType: "Urgencia",
    exitType: "Venta",
    date: "2024-12-13",
    quantity: 3,
    notes: "Venta directa al cliente"
  }
];

// Entradas de inventario
export const inventoryEntries: InventoryEntry[] = [
  {
    id: "ENTRY-001",
    cargoNumber: "CAE-212",
    physicalState: "Seminuevo",
    technician: "José García Herrera",
    building: "Hospital Nacional",
    entryType: "Devolución de gasto",
    date: "2024-12-16",
    quantity: 1,
    notes: "Material no utilizado en mantenimiento"
  },
  {
    id: "ENTRY-002",
    cargoNumber: "CAE-213",
    physicalState: "Nuevo",
    technician: "María González Silva",
    building: "Hotel Sheraton",
    entryType: "Prestamo",
    date: "2024-12-15",
    quantity: 2,
    notes: "Devolución de material prestado"
  }
];

// Top items con mayor salida (actualizado)
export const topSaleItems: TopSaleItem[] = [
  {
    id: "KMP-001",
    name: "Kit de Mantenimiento Preventivo",
    value: 250.00,
    exitQuantity: 25,
    code: "KMP-001"
  },
  {
    id: "PC-007", 
    name: "Pulsadores de Cabina",
    value: 45.00,
    exitQuantity: 18,
    code: "PC-007"
  },
  {
    id: "LED-008",
    name: "Sistema de Iluminación LED", 
    value: 380.00,
    exitQuantity: 12,
    code: "LED-008"
  },
  {
    id: "SPI-002",
    name: "Sensor de Proximidad Industrial",
    value: 180.00,
    exitQuantity: 8,
    code: "SPI-002"
  }
];

// Función para obtener salidas por item
export const getExitsByItemId = (itemId: number): InventoryExit[] => {
  // Simular salidas específicas para un item
  return inventoryExits.filter((_, index) => index % 2 === itemId % 2);
};

// Función para obtener entradas por item
export const getEntriesByItemId = (itemId: number): InventoryEntry[] => {
  // Simular entradas específicas para un item
  return inventoryEntries.filter((_, index) => index % 3 === itemId % 3);
};
