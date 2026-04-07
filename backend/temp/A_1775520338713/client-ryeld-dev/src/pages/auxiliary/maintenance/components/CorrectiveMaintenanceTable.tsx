import React from 'react';
import { 
  Box, 
  Button
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { CorrectiveMaintenance } from '../data/interfaces';
import { StyledDataGrid } from '../../../manager/inventory/components/StyledDataGrid';

interface CorrectiveMaintenanceTableProps {
  data: CorrectiveMaintenance[];
  onViewDetails: (id: number | string) => void;
}

export const CorrectiveMaintenanceTable: React.FC<CorrectiveMaintenanceTableProps> = ({ 
  data, 
  onViewDetails 
}) => {
  const columns: GridColDef[] = [
    {
      field: 'cliente',
      headerName: 'Cliente',
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      flex: 0.8,
      minWidth: 110,
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
      field: 'acciones',
      headerName: 'Acciones',
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <Button
          variant="text"
          onClick={() => onViewDetails(params.row.id)}
          sx={{
            color: '#476797',
            fontWeight: 'medium',
            fontSize: '12px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#EBF8FF',
            }
          }}
        >
          Ver más
        </Button>
      ),
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
