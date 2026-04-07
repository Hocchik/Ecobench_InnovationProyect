import React from 'react';
import { 
  Box, 
  Typography,
  Chip,
  Avatar
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { InventoryItem } from '../data/interfaces';
import { StyledDataGrid } from '../../../manager/inventory/components/StyledDataGrid';

interface CurrentInventoryTableProps {
  items: InventoryItem[];
}

export const CurrentInventoryTable: React.FC<CurrentInventoryTableProps> = ({ items }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'En stock':
        return (
          <Chip 
            label="En stock"
            size="small"
            sx={{ 
              backgroundColor: '#E6FAF5', 
              color: '#476797',
              fontWeight: 'medium',
              borderRadius: '4px',
              minWidth: '90px'
            }}
          />
        );
      case 'Sin stock':
        return (
          <Chip 
            label="Sin stock" 
            size="small"
            sx={{ 
              backgroundColor: '#FFE4E4', 
              color: '#FF4842',
              fontWeight: 'medium',
              borderRadius: '4px',
              minWidth: '90px'
            }}
          />
        );
      case 'Bajo stock':
        return (
          <Chip 
            label="Bajo stock" 
            size="small"
            sx={{ 
              backgroundColor: '#FFF6E5', 
              color: '#FFB547',
              fontWeight: 'medium',
              borderRadius: '4px',
              minWidth: '90px'
            }}
          />
        );
      default:
        return (
          <Chip 
            label={status} 
            size="small"
            sx={{ 
              backgroundColor: '#F5F5F5', 
              color: '#A3AED0',
              fontWeight: 'medium',
              borderRadius: '4px',
              minWidth: '90px'
            }}
          />
        );
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'nro',
      headerName: 'Nro',
      width: 60,
      sortable: false,
    },
    {
      field: 'imagen',
      headerName: 'Imagen',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Avatar
          src={params.value || '/imgs/default-product.png'}
          alt="Producto"
          variant="rounded"
          sx={{ width: 40, height: 40 }}
        />
      ),
    },
    {
      field: 'nombre',
      headerName: 'Nombre artículo',
      flex: 2,
      minWidth: 300,
    },
    {
      field: 'codigo',
      headerName: 'Código',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'categoria',
      headerName: 'Categoría',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'posicion',
      headerName: 'Posición',
      flex: 0.6,
      minWidth: 100,
    },
    {
      field: 'costoU',
      headerName: 'Costo U.',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          {formatCurrency(params.value as number)}
        </Typography>
      ),
    },
    {
      field: 'importancia',
      headerName: 'Importancia',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'cantAlmacen',
      headerName: 'Cant. Almacen',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'unidadMedida',
      headerName: 'Unidad de medida',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => getStatusChip(params.value as string),
    },
  ];

  return (
    <Box sx={{ width: '100%', height: '600px' }}>
      <StyledDataGrid
        rows={items}
        columns={columns}
        disableRowSelectionOnClick
        density="standard"
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
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
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '2px solid #E2E8F0',
            backgroundColor: '#F8F9FF'
          }
        }}
      />
    </Box>
  );
};
