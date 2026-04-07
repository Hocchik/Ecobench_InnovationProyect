import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { Paper, styled } from '@mui/material';

interface InventoryGridProps<T extends GridValidRowModel = GridValidRowModel> {
  rows: T[];
  columns: GridColDef[];
}


export const StyledDataGrid = styled(DataGrid)(({ /* theme */ }) => ({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'white',
    borderBottom: '2px solid #E2E8F0',
    '& .MuiDataGrid-columnHeader': {
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold',
        color: '#476797'
      }
    }
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid #E2E8F0',
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#F8F9FF',
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: '2px solid #E2E8F0',
  },
  '& .MuiDataGrid-virtualScroller': {
    backgroundColor: 'white',
  }
}));

export const InventoryGrid = <T extends GridValidRowModel>({ rows, columns }: InventoryGridProps<T>) => {
  return (
    <Paper
      sx={{
        height: 'calc(89vh - 250px)',
        width: '100%',
        borderRadius: '20px',
        boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
        overflow: 'hidden',
        bgcolor: 'white'
      }}
    >
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
};