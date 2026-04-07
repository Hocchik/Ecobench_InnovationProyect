import { GridColDef } from '@mui/x-data-grid';
import { IconButton, Chip } from '@mui/material';
import { Visibility } from '@mui/icons-material';

export interface Client {
  id: number;
  name: string;
  address: string;
  elevatorCount: number;
  status: 'Contratado' | 'Primer Contacto' | 'Visitado';
  responsiblePerson: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Contratado':
      return { bg: '#E6FAF5', color: '#05CD99' };
    case 'Primer Contacto':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Visitado':
      return { bg: '#E3F2FD', color: '#1976D2' };
    default:
      return { bg: '#F5F5F5', color: '#666666' };
  }
};

export const clientsData: Client[] = [
  {
    id: 1,
    name: "Torre Empresarial Plaza",
    address: "Av. Paseo de la República 3245, San Isidro",
    elevatorCount: 4,
    status: "Contratado",
    responsiblePerson: "Carlos Mendoza"
  },
  {
    id: 2,
    name: "Centro Comercial Mega Plaza",
    address: "Av. Alfredo Mendiola 3698, Independencia",
    elevatorCount: 8,
    status: "Contratado",
    responsiblePerson: "Ana García"
  },
  {
    id: 3,
    name: "Hospital Nacional Rebagliati",
    address: "Av. Sabogal 1, Jesús María",
    elevatorCount: 12,
    status: "Visitado",
    responsiblePerson: "Dr. Roberto Silva"
  },
  {
    id: 4,
    name: "Edificio Corporativo Lima",
    address: "Jirón de la Unión 1256, Cercado de Lima",
    elevatorCount: 3,
    status: "Primer Contacto",
    responsiblePerson: "María Fernández"
  },
  {
    id: 5,
    name: "Residencial Las Flores",
    address: "Av. La Marina 2355, San Miguel",
    elevatorCount: 6,
    status: "Contratado",
    responsiblePerson: "José Rodríguez"
  },
  {
    id: 6,
    name: "Universidad del Pacífico",
    address: "Salaverry 2020, Jesús María",
    elevatorCount: 5,
    status: "Visitado",
    responsiblePerson: "Ing. Patricia López"
  },
  {
    id: 7,
    name: "Hotel Marriott Lima",
    address: "Malecón de la Reserva 615, Miraflores",
    elevatorCount: 7,
    status: "Contratado",
    responsiblePerson: "Alberto Vásquez"
  },
  {
    id: 8,
    name: "Clínica San Felipe",
    address: "Av. Gregorio Escobedo 650, Jesús María",
    elevatorCount: 4,
    status: "Primer Contacto",
    responsiblePerson: "Dra. Carmen Ruiz"
  },
  {
    id: 9,
    name: "Torre de Oficinas Centrum",
    address: "Av. República de Colombia 791, San Isidro",
    elevatorCount: 6,
    status: "Visitado",
    responsiblePerson: "Luis Herrera"
  },
  {
    id: 10,
    name: "Condominio Los Álamos",
    address: "Av. Javier Prado Este 4200, Surco",
    elevatorCount: 8,
    status: "Primer Contacto",
    responsiblePerson: "Sandra Morales"
  },
  {
    id: 11,
    name: "Centro Financiero BCR",
    address: "Av. Centenario 156, Barranco",
    elevatorCount: 10,
    status: "Contratado",
    responsiblePerson: "Fernando Castro"
  },
  {
    id: 12,
    name: "Edificio Residencial Vista Mar",
    address: "Malecón Cisneros 1420, Miraflores",
    elevatorCount: 4,
    status: "Visitado",
    responsiblePerson: "Elena Díaz"
  }
];

export const clientsColumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Cliente',
    flex: 1,
    filterable: true,
    minWidth: 200
  },
  {
    field: 'address',
    headerName: 'Dirección',
    flex: 1.5,
    filterable: true,
    minWidth: 250
  },
  {
    field: 'elevatorCount',
    headerName: 'Cantidad de Ascensores',
    width: 180,
    filterable: true,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'status',
    headerName: 'Estado',
    width: 150,
    filterable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Chip
        label={params.value}
        sx={{
          bgcolor: getStatusColor(params.value).bg,
          color: getStatusColor(params.value).color,
          borderRadius: '8px',
          fontWeight: 500,
          fontSize: '0.75rem'
        }}
      />
    ),
  },
  {
    field: 'responsiblePerson',
    headerName: 'Personas a Cargo',
    width: 180,
    filterable: true,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'actions',
    headerName: 'Ver Detalles',
    width: 120,
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
          console.log('Abrir modal de detalles');
        }}
      >
        <Visibility fontSize="small" />
      </IconButton>
    ),
  }
];
