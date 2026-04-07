import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, styled } from '@mui/material';
import { StyledDataGrid } from './StyledDataGrid';

interface InventoryGridProps {
  rows: any[];
  columns: GridColDef[];
}

export const InventoryTable = ({ rows, columns }: InventoryGridProps) => {
  return (
    <Paper sx={{
      height: '86%', // Mismo tamaño que el panel de Cargos Pendientes
      width: '100%',
      borderRadius: '20px',
      boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
      overflow: 'hidden',
      bgcolor: 'white'
    }}>
      <StyledDataGrid
        rows={rows}
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
}

export default InventoryTable;