import { GridColDef } from '@mui/x-data-grid';
import { Paper, Chip, IconButton } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { StyledDataGrid } from './StyledDataGrid';
import { InventoryItem } from '../types/inventoryTypes';

interface InventoryTableProps {
  items: InventoryItem[];
  onViewDetails: (item: InventoryItem) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Available':
      return { bg: '#E6FAF5', color: '#476797' };
    case 'Limited':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Out of Stock':
      return { bg: '#FFE4E4', color: '#D32F2F' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

export const InventoryTable = ({ items, onViewDetails }: InventoryTableProps) => {
  const columns: GridColDef[] = [
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
    },
    {
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
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 80,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => onViewDetails(params.row)}
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

  return (
    <Paper sx={{
      height: '86%',
      width: '100%',
      borderRadius: '20px',
      boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
      overflow: 'hidden',
      bgcolor: 'white'
    }}>
      <StyledDataGrid
        rows={items}
        columns={columns}
        sx={{
          border: 'none',
          '& .MuiDataGrid-main': {
            '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          },
          '& .MuiDataGrid-virtualScroller': {
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px'
            },
            '&::-webkit-scrollbar-track': {
              background: '#F4F7FE'
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#A3AED0',
              borderRadius: '4px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#476797'
            }
          }
        }}
      />
    </Paper>
  );
};

export default InventoryTable;