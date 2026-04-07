import { GridColDef } from '@mui/x-data-grid';
import { IconButton, Chip } from '@mui/material';
import { Visibility } from '@mui/icons-material';

export interface Staff {
  id: number;
  firstName: string;
  lastName: string;
  personalEmail: string;
  phone: string;
  area: 'Operativa' | 'Administrativa' | 'Gerencial';
  role: 'Supervisor' | 'Técnico' | 'Recursos Humanos' | 'Auxiliar' | 'Gerente';
}

const getAreaColor = (area: string) => {
  switch (area) {
    case 'Operativa':
      return { bg: '#E6FAF5', color: '#05CD99' };
    case 'Administrativa':
      return { bg: '#E3F2FD', color: '#1976D2' };
    case 'Gerencial':
      return { bg: '#FFF6E5', color: '#FFB547' };
    default:
      return { bg: '#F5F5F5', color: '#666666' };
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Gerente':
      return { bg: '#FFF3E0', color: '#F57C00' };
    case 'Supervisor':
      return { bg: '#E8F5E8', color: '#2E7D32' };
    case 'Técnico':
      return { bg: '#E3F2FD', color: '#1565C0' };
    case 'Recursos Humanos':
      return { bg: '#F3E5F5', color: '#7B1FA2' };
    case 'Auxiliar':
      return { bg: '#FFF8E1', color: '#F9A825' };
    default:
      return { bg: '#F5F5F5', color: '#666666' };
  }
};

export const staffData: Staff[] = [
  {
    id: 1,
    firstName: "Carlos",
    lastName: "Mendoza Ruiz",
    personalEmail: "carlos.mendoza@gmail.com",
    phone: "+51 987 654 321",
    area: "Operativa",
    role: "Supervisor"
  },
  {
    id: 2,
    firstName: "Ana",
    lastName: "García López",
    personalEmail: "ana.garcia@hotmail.com",
    phone: "+51 912 345 678",
    area: "Operativa",
    role: "Técnico"
  },
  {
    id: 3,
    firstName: "Roberto",
    lastName: "Silva Herrera",
    personalEmail: "roberto.silva@outlook.com",
    phone: "+51 998 765 432",
    area: "Operativa",
    role: "Técnico"
  },
  {
    id: 4,
    firstName: "María",
    lastName: "Fernández Castro",
    personalEmail: "maria.fernandez@gmail.com",
    phone: "+51 987 123 456",
    area: "Administrativa",
    role: "Recursos Humanos"
  },
  {
    id: 5,
    firstName: "José",
    lastName: "Rodríguez Vega",
    personalEmail: "jose.rodriguez@yahoo.com",
    phone: "+51 956 789 123",
    area: "Operativa",
    role: "Técnico"
  },
  {
    id: 6,
    firstName: "Patricia",
    lastName: "López Morales",
    personalEmail: "patricia.lopez@gmail.com",
    phone: "+51 934 567 890",
    area: "Administrativa",
    role: "Auxiliar"
  },
  {
    id: 7,
    firstName: "Alberto",
    lastName: "Vásquez Díaz",
    personalEmail: "alberto.vasquez@hotmail.com",
    phone: "+51 923 456 789",
    area: "Gerencial",
    role: "Gerente"
  },
  {
    id: 8,
    firstName: "Carmen",
    lastName: "Ruiz Paredes",
    personalEmail: "carmen.ruiz@outlook.com",
    phone: "+51 945 678 901",
    area: "Operativa",
    role: "Técnico"
  },
  {
    id: 9,
    firstName: "Luis",
    lastName: "Herrera Campos",
    personalEmail: "luis.herrera@gmail.com",
    phone: "+51 967 890 123",
    area: "Operativa",
    role: "Supervisor"
  },
  {
    id: 10,
    firstName: "Sandra",
    lastName: "Morales Torres",
    personalEmail: "sandra.morales@yahoo.com",
    phone: "+51 978 901 234",
    area: "Administrativa",
    role: "Auxiliar"
  },
  {
    id: 11,
    firstName: "Fernando",
    lastName: "Castro Jiménez",
    personalEmail: "fernando.castro@gmail.com",
    phone: "+51 989 012 345",
    area: "Operativa",
    role: "Técnico"
  },
  {
    id: 12,
    firstName: "Elena",
    lastName: "Díaz Vargas",
    personalEmail: "elena.diaz@hotmail.com",
    phone: "+51 956 123 456",
    area: "Administrativa",
    role: "Recursos Humanos"
  }
];

export const staffColumns: GridColDef[] = [
  {
    field: 'firstName',
    headerName: 'Nombres',
    flex: 0.8,
    filterable: true,
    minWidth: 120
  },
  {
    field: 'lastName',
    headerName: 'Apellidos',
    flex: 1,
    filterable: true,
    minWidth: 150
  },
  {
    field: 'personalEmail',
    headerName: 'Correo Personal',
    flex: 1.2,
    filterable: true,
    minWidth: 200
  },
  {
    field: 'phone',
    headerName: 'Teléfono de Contacto',
    width: 160,
    filterable: true,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'area',
    headerName: 'Área',
    width: 130,
    filterable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Chip
        label={params.value}
        sx={{
          bgcolor: getAreaColor(params.value).bg,
          color: getAreaColor(params.value).color,
          borderRadius: '8px',
          fontWeight: 500,
          fontSize: '0.75rem'
        }}
      />
    ),
  },
  {
    field: 'role',
    headerName: 'Rol',
    width: 140,
    filterable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Chip
        label={params.value}
        sx={{
          bgcolor: getRoleColor(params.value).bg,
          color: getRoleColor(params.value).color,
          borderRadius: '8px',
          fontWeight: 500,
          fontSize: '0.75rem'
        }}
      />
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
          // TODO: Implementar modal de detalles
          console.log('Abrir modal de detalles del empleado');
        }}
      >
        <Visibility fontSize="small" />
      </IconButton>
    ),
  }
];
