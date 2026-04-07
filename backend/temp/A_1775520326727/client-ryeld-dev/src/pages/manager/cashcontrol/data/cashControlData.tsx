import { GridColDef } from '@mui/x-data-grid';
import { IconButton, Chip } from '@mui/material';
import { Visibility } from '@mui/icons-material';

export interface CashMovement {
  id: number;
  description: string;
  type: 'Ingreso' | 'Egreso' | 'Transferencia';
  date: string;
  total: number;
  evidenceImage?: string; // URL o base64 string de la imagen
}

export interface AuxiliaryCash {
  id: number;
  name: string;
  assignedBalance: number;
  currentBalance: number;
  movements: CashMovement[];
}

export interface TechnicianCash {
  id: number;
  name: string;
  assignedBalance: number;
  currentBalance: number;
  movements: CashMovement[];
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Ingreso':
      return { bg: '#E6FAF5', color: '#476797' };
    case 'Egreso':
      return { bg: '#FFEBEE', color: '#F44336' };
    case 'Transferencia':
      return { bg: '#E3F2FD', color: '#1976D2' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

// Datos de ejemplo para la auxiliar administrativa
export const auxiliaryCashData: AuxiliaryCash = {
  id: 1,
  name: "María Fernández Castro",
  assignedBalance: 5000.00,
  currentBalance: 3250.50,
  movements: [
    {
      id: 1,
      description: "Compra de materiales de oficina",
      type: "Egreso",
      date: "2024-01-15",
      total: -150.00
    },
    {
      id: 2,
      description: "Recarga de saldo inicial",
      type: "Ingreso",
      date: "2024-01-10",
      total: 5000.00
    },
    {
      id: 3,
      description: "Pago de servicios básicos",
      type: "Egreso",
      date: "2024-01-12",
      total: -320.50
    },
    {
      id: 4,
      description: "Transferencia a técnico de campo",
      type: "Transferencia",
      date: "2024-01-14",
      total: -1279.00
    },
    {
      id: 5,
      description: "Compra de repuestos menores",
      type: "Egreso",
      date: "2024-01-16",
      total: -89.75
    }
  ]
};

// Datos de ejemplo para técnicos
export const techniciansCashData: TechnicianCash[] = [
  {
    id: 1,
    name: "Carlos Mendoza Ruiz",
    assignedBalance: 800.00,
    currentBalance: 425.30,
    movements: [
      {
        id: 1,
        description: "Asignación inicial de caja chica",
        type: "Ingreso",
        date: "2024-01-10",
        total: 800.00
      },
      {
        id: 2,
        description: "Compra de herramientas menores",
        type: "Egreso",
        date: "2024-01-11",
        total: -45.50
      },
      {
        id: 3,
        description: "Gastos de movilidad",
        type: "Egreso",
        date: "2024-01-12",
        total: -78.20
      },
      {
        id: 4,
        description: "Compra de repuestos de emergencia",
        type: "Egreso",
        date: "2024-01-14",
        total: -251.00
      }
    ]
  },
  {
    id: 2,
    name: "Ana García López",
    assignedBalance: 600.00,
    currentBalance: 298.75,
    movements: [
      {
        id: 1,
        description: "Asignación inicial de caja chica",
        type: "Ingreso",
        date: "2024-01-08",
        total: 600.00
      },
      {
        id: 2,
        description: "Gastos de alimentación en campo",
        type: "Egreso",
        date: "2024-01-09",
        total: -35.25
      },
      {
        id: 3,
        description: "Compra de materiales básicos",
        type: "Egreso",
        date: "2024-01-13",
        total: -186.00
      },
      {
        id: 4,
        description: "Gastos de transporte",
        type: "Egreso",
        date: "2024-01-15",
        total: -80.00
      }
    ]
  },
  {
    id: 3,
    name: "Roberto Silva Herrera",
    assignedBalance: 750.00,
    currentBalance: 567.80,
    movements: [
      {
        id: 1,
        description: "Asignación inicial de caja chica",
        type: "Ingreso",
        date: "2024-01-12",
        total: 750.00
      },
      {
        id: 2,
        description: "Compra de lubricantes",
        type: "Egreso",
        date: "2024-01-13",
        total: -125.20
      },
      {
        id: 3,
        description: "Gastos varios de mantenimiento",
        type: "Egreso",
        date: "2024-01-16",
        total: -57.00
      }
    ]
  }
];

export const cashMovementColumns: GridColDef[] = [
  {
    field: 'description',
    headerName: 'Descripción',
    flex: 1.5,
    filterable: true,
    minWidth: 200
  },
  {
    field: 'type',
    headerName: 'Tipo',
    width: 130,
    filterable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Chip
        label={params.value}
        sx={{
          bgcolor: getTypeColor(params.value).bg,
          color: getTypeColor(params.value).color,
          borderRadius: '8px',
          fontWeight: 500,
          fontSize: '0.75rem'
        }}
      />
    ),
  },  {
    field: 'date',
    headerName: 'Fecha',
    width: 120,
    filterable: true,
    align: 'center',
    headerAlign: 'center',
    valueFormatter: (value: string) => {
      const date = new Date(value);
      return date.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  },{
    field: 'total',
    headerName: 'Total',
    width: 120,
    filterable: false,
    align: 'center',
    headerAlign: 'center',
    valueFormatter: (value: number) => {
      return `S/ ${value.toFixed(2)}`;
    },
    renderCell: (params) => (
      <span style={{ 
        color: params.value >= 0 ? '#476797' : '#F44336',
        fontWeight: 600
      }}>
        S/ {params.value.toFixed(2)}
      </span>
    ),
  },
  {
    field: 'actions',
    headerName: 'Ver Más',
    width: 100,
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
        onClick={() => {
          // TODO: Implementar modal de detalles del movimiento
          console.log('Abrir modal de detalles del movimiento');
        }}
      >
        <Visibility fontSize="small" />
      </IconButton>
    ),
  }
];
