import { Paper } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { StyledDataGrid } from '../../inventory/components/StyledDataGrid';
import { Client } from '../data/clientsData';

interface ClientsTableProps {
  clients: Client[];
  columns: GridColDef[];
}

export function ClientsTable({ clients, columns }: ClientsTableProps) {
  return (
    <Paper sx={{
      height: '100%',
      width: '100%',
      borderRadius: '20px',
      boxShadow: '0px 3.5px 5.5px rgba(77, 76, 76, 0.02)',
      overflow: 'hidden',
      bgcolor: 'white'
    }}>
      <StyledDataGrid
        rows={clients}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 }
          }
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
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
    </Paper>
  );
}
