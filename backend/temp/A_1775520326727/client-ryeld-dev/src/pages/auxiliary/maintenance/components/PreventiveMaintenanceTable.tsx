import React from 'react';
import { 
  Box, 
  Button
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { PreventiveMaintenance } from '../data/interfaces';
import { StyledDataGrid } from '../../../manager/inventory/components/StyledDataGrid';

interface PreventiveMaintenanceTableProps {
  data: PreventiveMaintenance[];
  onUpdateAviso: (id: number | string, newStatus: 'Pending' | 'Avisado') => void;
}

export const PreventiveMaintenanceTable: React.FC<PreventiveMaintenanceTableProps> = ({ 
  data, 
  onUpdateAviso 
}) => {
  const getAvisoChip = (aviso: string, id: number | string) => {
    const isPending = aviso === 'Pending';
    
    return (
      <Button
        variant="text"
        onClick={() => onUpdateAviso(id, isPending ? 'Avisado' : 'Pending')}
        sx={{
          padding: '4px 12px',
          borderRadius: '4px',
          backgroundColor: isPending ? '#FFF6E5' : '#E6FAF5',
          color: isPending ? '#F59E0B' : '#476797',
          fontWeight: 'medium',
          fontSize: '12px',
          minWidth: '80px',
          '&:hover': {
            backgroundColor: isPending ? '#FEF3C7' : '#D1F2E8',
          }
        }}
      >
        {isPending ? 'Pending' : 'Avisado'}
      </Button>
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'cliente',
      headerName: 'Cliente',
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'contacto',
      headerName: 'Contacto',
      flex: 1,
      minWidth: 130,
    },
    {
      field: 'tipoAscensor',
      headerName: 'Tipo de Ascensor',
      flex: 1,
      minWidth: 140,
    },
    {
      field: 'horaPropuesta',
      headerName: 'Hora propuesta',
      flex: 1,
      minWidth: 130,
    },
    {
      field: 'fechaProgramacion',
      headerName: 'Fecha Programación',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'fechaProgramacionReal',
      headerName: 'Fecha Programación real',
      flex: 1,
      minWidth: 170,
    },
    {
      field: 'aviso',
      headerName: 'Aviso',
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => getAvisoChip(params.value as string, params.row.id),
    },
  ];

  return (
    <Box sx={{ width: '100%', height: '400px' }}>
      <StyledDataGrid
        rows={data}
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
