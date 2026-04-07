import { DataGrid } from '@mui/x-data-grid';
import { Paper, styled } from '@mui/material';

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
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
}));

export const StyledGridPaper = ({ children }: { children: React.ReactNode }) => (
  <Paper sx={{
    height: 'calc(100vh - 250px)',
    width: '100%',
    borderRadius: '20px',
    boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
    overflow: 'hidden'
  }}>
    {children}
  </Paper>
);