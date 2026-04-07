import React from 'react';
import { 
  Box, 
  Typography,
  Button 
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { MobilityExpense } from '../data/interfaces';
import { StyledDataGrid } from '../../../manager/inventory/components/StyledDataGrid';
import * as XLSX from 'xlsx';

interface MobilityExpensesTableProps {
  expenses: MobilityExpense[];
}

export const MobilityExpensesTable: React.FC<MobilityExpensesTableProps> = ({ expenses }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  const exportToExcel = () => {
    // Preparar los datos para exportar
    const exportData = expenses.map(expense => ({
      'S/N': expense.id,
      'Fecha': expense.fecha,
      'Semana': expense.semana,
      'Concepto': expense.concepto,
      'Técnico': expense.tecnico,
      'Motivo': expense.motivo,
      'Origen': expense.origen,
      'Destino': expense.destino,
      'Monto': `S/ ${expense.monto.toFixed(2)}`,
    }));
    
    // Crear una hoja de trabajo y agregar los datos
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    
    // Crear un libro de trabajo y agregar la hoja
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Gastos Movilidad');
    
    // Generar el archivo y descargarlo
    XLSX.writeFile(workbook, `Gastos_Movilidad_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'S/N',
      width: 60,
      sortable: false,
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      flex: 0.7,
      minWidth: 110,
    },
    {
      field: 'semana',
      headerName: 'Semana',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'concepto',
      headerName: 'Concepto',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'tecnico',
      headerName: 'Técnico',
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: 'motivo',
      headerName: 'Motivo',
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'origen',
      headerName: 'Origen',
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'destino',
      headerName: 'Destino',
      flex: 1.5,
      minWidth: 180,
    },
    {
      field: 'monto',
      headerName: 'Monto',
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <Typography variant="body2">
          {formatCurrency(params.value as number)}
        </Typography>
      ),
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <Typography variant="body2" color="success.main" fontWeight="medium">
          {params.value || 'Approved'}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button 
          variant="text" 
          color="primary" 
          onClick={() => console.log('Ver más', params.row.id)}
        >
          View more
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', height: '500px' }}>
      <StyledDataGrid
        rows={expenses}
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button 
          variant="contained"
          color="primary"
          onClick={exportToExcel}
          sx={{ 
            borderRadius: '8px',
            px: 3
          }}
        >
          Exportar
        </Button>
      </Box>
    </Box>
  );
};
