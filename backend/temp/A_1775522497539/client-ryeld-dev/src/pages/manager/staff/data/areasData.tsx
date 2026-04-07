import { GridColDef } from '@mui/x-data-grid';
import { IconButton, Chip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export const createAreasColumns = (
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
): GridColDef[] => [
  {
    field: 'name',
    headerName: 'Nombre del Área',
    flex: 1,
    minWidth: 200,
    filterable: true,
    renderCell: (params) => (
      <Chip
        label={params.value}
        variant="outlined"
        color="primary"
        sx={{
          fontWeight: 600,
          borderRadius: '8px',
        }}
      />
    ),
  },
  {
    field: 'description',
    headerName: 'Descripción',
    flex: 1,
    minWidth: 200,
    filterable: true,
  },
  {
    field: 'active',
    headerName: 'Estado',
    width: 120,
    filterable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Chip
        label={params.value ? 'Activa' : 'Inactiva'}
        color={params.value ? 'success' : 'error'}
        size="small"
        variant="outlined"
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
