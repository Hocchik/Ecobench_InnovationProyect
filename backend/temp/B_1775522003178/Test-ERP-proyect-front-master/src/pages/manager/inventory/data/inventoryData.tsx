import { GridColDef } from '@mui/x-data-grid';
import { IconButton, Chip } from '@mui/material';
import { Visibility } from '@mui/icons-material';

export interface InventoryItem {
  id: number;
  name: string;
  code: string;
  category: "Consumible" | "Repuesto";
  quantity: number;
  status: 'Available' | 'Limited' | 'Out of Stock';
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Available':
      return { bg: '#E6FAF5', color: '#05CD99' };
    case 'Limited':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Out of Stock':
      return { bg: '#FFE4E4', color: '#D32F2F' };
    case 'Pendiente':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Approved':
      return { bg: '#E6FAF5', color: '#05CD99' };
    case 'Pending':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Denied':
      return { bg: '#FFE5E5', color: '#FF4842' };
    default:
      return { bg: '#F5F5F5', color: '#666666' };
  }
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

export const inventoryColumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Nombre del Artículo',
    flex: 1,
    filterable: true
  },
  {
    field: 'code',
    headerName: 'Código',
    width: 120,
    filterable: true
  },
  {
    field: 'category',
    headerName: 'Categoría',
    width: 130,
    filterable: true
  },
  {
    field: 'quantity',
    headerName: 'Cantidad',
    width: 100,
    filterable: true
  },  {
    field: 'status',
    headerName: 'Estado',
    width: 130,
    renderCell: (params) => (
      <Chip
        label={params.value}
        sx={{
          bgcolor: getStatusColor(params.value).bg,
          color: getStatusColor(params.value).color,
          borderRadius: '8px',
          fontWeight: 500
        }}
      />
    ),
  },  {
    field: 'actions',
    headerName: 'Acciones',
    width: 80,
    sortable: false,
    filterable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: () => (
      <IconButton
        size="small"
        sx={{
          color: '#476797',
          '&:hover': {
            bgcolor: 'rgba(71, 103, 151, 0.08)',
            transform: 'scale(1.1)'
          },
          transition: 'all 0.2s'
        }}
      >
        <Visibility fontSize="small" />
      </IconButton>
    ),
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

// Datos para el gráfico de consumo
export const chartData = {
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  consumptionData: [80, 120, 180, 90, 160, 140, 100]
};

// Datos para las tarjetas de repuestos más vendidos
export interface TopItem {
  id: string;
  name: string;
  value: number;
  quantity: number;
}

export const topItems: TopItem[] = [
  { id: 'xxxxxxxxxx', name: 'Repuesto 1', value: 1000, quantity: 4 },
  { id: 'xxxxxxxxxx', name: 'Repuesto 2', value: 1000, quantity: 4 },
  { id: 'xxxxxxxxxx', name: 'Repuesto 3', value: 1000, quantity: 4 },
  { id: 'xxxxxxxxxx', name: 'Repuesto 4', value: 1000, quantity: 4 },
];

// Datos para las estadísticas de ventas
export const salesStats = {
  totalSales: 40000.00,
  percentageChange: -0.2,
  isIncrease: false
};