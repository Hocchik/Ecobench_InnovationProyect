/**
 * Datos e interfaces para el módulo de Clientes de HR
 * Gestiona la información de clientes y sus configuraciones
 */

import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

/** Interface para datos del cliente */
export interface Client {
  id: string;
  name: string;
  address: string;
  district: string;
  phone: string;
  email: string;
  contactPerson: string;
  elevatorCount: number;
  status: 'Activo' | 'Inactivo' | 'Pendiente' | 'Suspendido';
  contractType: 'Mantenimiento' | 'Instalación' | 'Modernización' | 'Consultoría';
  registrationDate: string;
  lastService?: string;
  notes?: string;
  emergencyContact?: string;
  ruc?: string;
}

/** Función para obtener colores del estado */
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Activo':
      return { bg: '#E6FAF5', color: '#476797' };
    case 'Pendiente':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Suspendido':
      return { bg: '#FFE6E6', color: '#FF4757' };
    case 'Inactivo':
      return { bg: '#F5F5F5', color: '#A3AED0' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

/** Función para obtener colores del tipo de contrato */
const getContractTypeColor = (type: string) => {
  switch (type) {
    case 'Mantenimiento':
      return { bg: '#E3F2FD', color: '#1976D2' };
    case 'Instalación':
      return { bg: '#F3E5F5', color: '#7B1FA2' };
    case 'Modernización':
      return { bg: '#E8F5E8', color: '#388E3C' };
    case 'Consultoría':
      return { bg: '#FFF8E1', color: '#F57C00' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

/** Datos mock de clientes */
export const clientsData: Client[] = [
  {
    id: 'CL001',
    name: 'Torre Empresarial Plaza',
    address: 'Av. Paseo de la República 3245',
    district: 'San Isidro',
    phone: '+51 1 234-5678',
    email: 'administracion@torreplaza.com',
    contactPerson: 'Carlos Mendoza',
    elevatorCount: 4,
    status: 'Activo',
    contractType: 'Mantenimiento',
    registrationDate: '2023-01-15',
    lastService: '2024-08-20',
    ruc: '20123456789',
    emergencyContact: '+51 987 654 321',
    notes: 'Cliente principal con contrato anual'
  },
  {
    id: 'CL002',
    name: 'Centro Comercial Mega Plaza',
    address: 'Av. Alfredo Mendiola 3698',
    district: 'Independencia',
    phone: '+51 1 345-6789',
    email: 'mantenimiento@megaplaza.pe',
    contactPerson: 'Ana García',
    elevatorCount: 8,
    status: 'Activo',
    contractType: 'Mantenimiento',
    registrationDate: '2022-11-10',
    lastService: '2024-08-18',
    ruc: '20234567890',
    emergencyContact: '+51 987 123 456'
  },
  {
    id: 'CL003',
    name: 'Hospital Nacional Rebagliati',
    address: 'Av. Sabogal 1',
    district: 'Jesús María',
    phone: '+51 1 456-7890',
    email: 'infraestructura@rebagliati.gob.pe',
    contactPerson: 'Dr. Roberto Silva',
    elevatorCount: 12,
    status: 'Activo',
    contractType: 'Modernización',
    registrationDate: '2023-03-20',
    lastService: '2024-08-22',
    ruc: '20345678901',
    emergencyContact: '+51 999 888 777',
    notes: 'Proyecto de modernización en curso'
  },
  {
    id: 'CL004',
    name: 'Edificio Corporativo Lima',
    address: 'Jirón de la Unión 1256',
    district: 'Cercado de Lima',
    phone: '+51 1 567-8901',
    email: 'admin@corpedificio.com',
    contactPerson: 'María Fernández',
    elevatorCount: 3,
    status: 'Pendiente',
    contractType: 'Instalación',
    registrationDate: '2024-07-15',
    ruc: '20456789012',
    emergencyContact: '+51 955 444 333'
  },
  {
    id: 'CL005',
    name: 'Residencial Las Flores',
    address: 'Av. La Marina 2355',
    district: 'San Miguel',
    phone: '+51 1 678-9012',
    email: 'administracion@lasflores.com',
    contactPerson: 'José Rodríguez',
    elevatorCount: 6,
    status: 'Activo',
    contractType: 'Mantenimiento',
    registrationDate: '2023-05-08',
    lastService: '2024-08-15',
    ruc: '20567890123',
    emergencyContact: '+51 966 555 444'
  },
  {
    id: 'CL006',
    name: 'Universidad del Pacífico',
    address: 'Salaverry 2020',
    district: 'Jesús María',
    phone: '+51 1 789-0123',
    email: 'infraestructura@up.edu.pe',
    contactPerson: 'Ing. Patricia López',
    elevatorCount: 5,
    status: 'Activo',
    contractType: 'Consultoría',
    registrationDate: '2023-02-12',
    lastService: '2024-08-10',
    ruc: '20678901234',
    emergencyContact: '+51 977 666 555'
  },
  {
    id: 'CL007',
    name: 'Hotel Marriott Lima',
    address: 'Malecón de la Reserva 615',
    district: 'Miraflores',
    phone: '+51 1 890-1234',
    email: 'mantenimiento@marriottlima.com',
    contactPerson: 'Alberto Vásquez',
    elevatorCount: 7,
    status: 'Suspendido',
    contractType: 'Mantenimiento',
    registrationDate: '2022-09-25',
    lastService: '2024-06-30',
    ruc: '20789012345',
    emergencyContact: '+51 988 777 666',
    notes: 'Contrato suspendido temporalmente por renovaciones'
  },
  {
    id: 'CL008',
    name: 'Clínica San Felipe',
    address: 'Av. Gregorio Escobedo 650',
    district: 'Jesús María',
    phone: '+51 1 901-2345',
    email: 'administracion@sanfelipe.com',
    contactPerson: 'Dra. Carmen Ruiz',
    elevatorCount: 4,
    status: 'Activo',
    contractType: 'Mantenimiento',
    registrationDate: '2023-06-18',
    lastService: '2024-08-25',
    ruc: '20890123456',
    emergencyContact: '+51 999 888 777'
  }
];

/** Configuración de columnas para la tabla */
export const clientsColumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Cliente',
    flex: 1,
    minWidth: 200,
    filterable: true,
    renderCell: (params) => (
      <div style={{ 
        fontWeight: 600, 
        color: '#2D3748',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {params.value}
      </div>
    )
  },
  {
    field: 'contactPerson',
    headerName: 'Contacto',
    width: 160,
    filterable: true,
    renderCell: (params) => (
      <div style={{ 
        color: '#4A5568',
        fontSize: '0.875rem'
      }}>
        {params.value}
      </div>
    )
  },
  {
    field: 'district',
    headerName: 'Distrito',
    width: 130,
    filterable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          bgcolor: '#F7FAFC',
          color: '#4A5568',
          border: '1px solid #E2E8F0',
          fontSize: '0.75rem',
          fontWeight: 500
        }}
      />
    )
  },
  {
    field: 'elevatorCount',
    headerName: 'Ascensores',
    width: 100,
    filterable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <div style={{ 
        fontWeight: 600,
        color: '#2B6CB0',
        fontSize: '0.875rem'
      }}>
        {params.value}
      </div>
    )
  },
  {
    field: 'status',
    headerName: 'Estado',
    width: 120,
    filterable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          bgcolor: getStatusColor(params.value).bg,
          color: getStatusColor(params.value).color,
          borderRadius: '20px',
          fontWeight: 600,
          fontSize: '0.75rem',
          minWidth: '80px'
        }}
      />
    )
  },
  {
    field: 'contractType',
    headerName: 'Tipo de Contrato',
    width: 140,
    filterable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          bgcolor: getContractTypeColor(params.value).bg,
          color: getContractTypeColor(params.value).color,
          borderRadius: '8px',
          fontWeight: 500,
          fontSize: '0.75rem'
        }}
      />
    )
  },
  {
    field: 'lastService',
    headerName: 'Último Servicio',
    width: 130,
    filterable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      if (!params.value) {
        return (
          <span style={{ 
            color: '#A0AEC0',
            fontSize: '0.75rem',
            fontStyle: 'italic'
          }}>
            Sin servicio
          </span>
        );
      }
      
      const date = new Date(params.value);
      return (
        <div style={{ 
          color: '#4A5568',
          fontSize: '0.75rem'
        }}>
          {date.toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })}
        </div>
      );
    }
  }
];
