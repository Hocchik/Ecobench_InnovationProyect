import React from 'react';
import { 
  Box, 
  Typography
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { InventoryExit } from '../data/interfaces';
import { StyledDataGrid } from '../../../manager/inventory/components/StyledDataGrid';

interface InventoryExitsTableProps {
  exits: InventoryExit[];
}

export const InventoryExitsTable: React.FC<InventoryExitsTableProps> = ({ exits }) => {
  const columns: GridColDef[] = [
    {
      field: 'nombreArticulo',
      headerName: 'Nombre del Artículo',
      flex: 2,
      minWidth: 300,
    },
    {
      field: 'tecnico',
      headerName: 'Técnico',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'tipoSalida',
      headerName: 'Tipo de Salida',
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'tipoMantenimiento',
      headerName: 'Tipo de mantenimiento',
      flex: 1.2,
      minWidth: 180,
    },
    {
      field: 'nroCargo',
      headerName: 'Nro de Cargo',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">
            {params.value}
          </Typography>
          {params.value !== '...............' && (
            <Box 
              sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                backgroundColor: '#476797' 
              }} 
            />
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', height: '500px' }}>
      <StyledDataGrid
        rows={exits}
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
