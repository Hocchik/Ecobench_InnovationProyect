import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

//Este Componente es el que se encarga de estilizar el DataGrid de MUI
//Además se está repitiendo tmb en el componente de Supervisor
//Por lo que se puede crear un componente común para ambos
export const StyledDataGrid = styled(DataGrid)(() => ({
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