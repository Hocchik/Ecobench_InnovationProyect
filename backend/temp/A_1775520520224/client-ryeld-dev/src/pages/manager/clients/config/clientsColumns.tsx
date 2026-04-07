import { GridColDef } from '@mui/x-data-grid';
import { IconButton, Chip } from '@mui/material';
import { Visibility } from '@mui/icons-material';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'CONTRACTED':
      return { bg: '#E6FAF5', color: '#476797' };
    case 'FIRST_CONTACT':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'VISITED':
      return { bg: '#E3F2FD', color: '#1976D2' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'CONTRACTED':
      return 'Contratado';
    case 'FIRST_CONTACT':
      return 'Primer Contacto';
    case 'VISITED':
      return 'Visitado';
    default:
      return status;
  }
};

export const createClientsColumns = (onViewDetails: (clientId: string) => void): GridColDef[] => [
  {
    field: 'clientName',
    headerName: 'Nombre del Cliente',
    flex: 1,
    minWidth: 200,
    headerClassName: 'custom-header',
    cellClassName: 'custom-cell',
  },
  {
    field: 'formattedAddress',
    headerName: 'Dirección',
    flex: 1.5,
    minWidth: 250,
    headerClassName: 'custom-header',
    cellClassName: 'custom-cell',
  },
  {
    field: 'elevatorCount',
    headerName: 'N° Ascensores',
    width: 130,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'custom-header',
    cellClassName: 'custom-cell',
  },
  {
    field: 'personInCharge',
    headerName: 'Responsable',
    flex: 1,
    minWidth: 180,
    headerClassName: 'custom-header',
    cellClassName: 'custom-cell',
  },
  {
    field: 'state',
    headerName: 'Estado',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'custom-header',
    renderCell: (params) => {
      const colors = getStatusColor(params.row.status);
      const label = getStatusLabel(params.row.status);
      return (
        <Chip
          label={label}
          sx={{
            backgroundColor: colors.bg,
            color: colors.color,
            fontWeight: 500,
            fontSize: '0.75rem',
            height: '24px',
            '& .MuiChip-label': {
              px: 1,
            },
          }}
        />
      );
    },
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 100,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'custom-header',
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <IconButton
        onClick={() => onViewDetails(params.row.id)}
        sx={{
          color: '#4318FF',
          '&:hover': {
            backgroundColor: 'rgba(67, 24, 255, 0.1)',
          },
        }}
      >
        <Visibility />
      </IconButton>
    ),
  },
];
