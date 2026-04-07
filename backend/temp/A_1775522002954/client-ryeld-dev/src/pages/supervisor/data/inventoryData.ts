export interface InventoryItem {
  id: number;
  name: string;
  code: string;
  category: "Consumible" | "Repuesto";
  quantity: number;
  status: 'Available' | 'Limited' | 'Out of Stock';
}

export interface ToolRequest {
  id: string;
  requestNumber: string;  // Número de cargo (CAS)
  technician: string;
  date: string;
  reason: string;
  items: ToolRequestItem[];
  status: 'Pending' | 'Approved' | 'Denied';
}

export interface ToolRequestItem {
  itemId: string;
  code: string;
  name: string;
  requestedQuantity: number;
  availableQuantity: number;
  status: 'Available' | 'Limited' | 'Not Available';
}

export interface PossessionTool {
  id: number;
  name: string;
  code: string;
  category: string;
  quantity: number;
  availability: 'Sent' | 'Received';
  technician: string;
}

export const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    name: "Kit de Mantenimiento Preventivo",
    code: "KMP-001",
    category: "Consumible",
    quantity: 5,
    status: "Available"
  },
  {
    id: 2,
    name: "Sensor de Proximidad Industrial",
    code: "SPI-002",
    category: "Repuesto",
    quantity: 8,
    status: "Available"
  },
  {
    id: 3,
    name: "Cable de Control Especial",
    code: "CCE-003",
    category: "Repuesto",
    quantity: 2,
    status: "Limited"
  },
  {
    id: 4,
    name: "Kit de Herramientas Básicas",
    code: "KHB-004",
    category: "Consumible",
    quantity: 1,
    status: "Limited"
  },
  {
    id: 5,
    name: "Aceite Hidráulico Especial",
    code: "AHE-005",
    category: "Consumible",
    quantity: 0,
    status: "Out of Stock"
  }
];

export const toolRequests: ToolRequest[] = [
  {
    id: "TR001",
    requestNumber: "CAS-001",
    technician: "Erick Díaz Pacheco",
    date: "2024-02-20",
    reason: "Mantenimiento preventivo programado",
    items: [
      {
        itemId: "1",
        code: "KMP-001",
        name: "Kit de Mantenimiento Preventivo",
        requestedQuantity: 1,
        availableQuantity: 5,
        status: "Available"
      }
    ],
    status: "Approved"
  },
  {
    id: "TR002",
    requestNumber: "CAS-002",
    technician: "Carlos Rodríguez",
    date: "2024-02-19",
    reason: "Reparación de emergencia",
    items: [
      {
        itemId: "4",
        code: "KHB-004",
        name: "Kit de Herramientas Básicas",
        requestedQuantity: 1,
        availableQuantity: 1,
        status: "Limited"
      }
    ],
    status: "Pending"
  },
  {
    id: "TR003",
    requestNumber: "CAS-003",
    technician: "Luis Mendoza",
    date: "2024-02-18",
    reason: "Mantenimiento correctivo",
    items: [
      {
        itemId: "2",
        code: "SPI-002",
        name: "Sensor de Proximidad Industrial",
        requestedQuantity: 2,
        availableQuantity: 8,
        status: "Available"
      }
    ],
    status: "Denied"
  }
];

export const toolsInPossession: PossessionTool[] = [
  {
    id: 1,
    name: "Kit de Herramientas Especiales",
    code: "KHE-001",
    category: "Herramientas",
    quantity: 1,
    availability: "Sent",
    technician: "Carlos Rodríguez"
  },
  {
    id: 2,
    name: "Medidor de Tensión Digital",
    code: "MTD-002",
    category: "Electrónico",
    quantity: 1,
    availability: "Received",
    technician: "Luis Mendoza"
  },
  {
    id: 3,
    name: "Kit de Calibración",
    code: "KC-003",
    category: "Herramientas",
    quantity: 1,
    availability: "Sent",
    technician: "Erick Díaz"
  },
  {
    id: 4,
    name: "Analizador de Circuitos",
    code: "AC-004",
    category: "Electrónico",
    quantity: 1,
    availability: "Received",
    technician: "Miguel Torres"
  },
  {
    id: 5,
    name: "Kit de Seguridad Industrial",
    code: "KSI-005",
    category: "Seguridad",
    quantity: 1,
    availability: "Sent",
    technician: "Pedro Sánchez"
  }
];