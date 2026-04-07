import { GridColDef } from '@mui/x-data-grid';
import { IconButton, Chip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export const createRolesColumns = (
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
): GridColDef[] => [
  {
    field: 'name',
    headerName: 'Nombre del Rol',
    flex: 1,
    minWidth: 180,
    filterable: true,
    renderCell: (params) => (
      <Chip
        label={params.value}
        variant="outlined"
        color="secondary"
        sx={{
          fontWeight: 600,
          borderRadius: '8px',
        }}
      />
    ),
  },
  {
    field: 'areaName',
    headerName: 'Área',
    flex: 0.8,
    minWidth: 150,
    filterable: true,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          bgcolor: '#f5f5f5',
          color: '#A3AED0',
          fontWeight: 500,
        }}
      />
    ),
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 120,
    sortable: false,
    filterable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <div style={{ display: 'flex', gap: '4px' }}>
        <IconButton
          size="small"
          onClick={() => onEdit(params.row.id)}
          sx={{
            color: '#476797',
            '&:hover': {
              backgroundColor: '#e3f2fd',
            },
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => onDelete(params.row.id)}
          sx={{
            color: '#d32f2f',
            '&:hover': {
              backgroundColor: '#ffebee',
            },
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </div>
    ),
  },
];
