import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton, Paper } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { styled } from '@mui/material';
import { ClientTable } from '../api/SupClientInterfaces'; // ✅ Import corregido

interface ClientsTableProps {
  clients: ClientTable[];
  onClientClick: (id_client: string) => void;
}

// Estilo personalizado para el DataGrid
const StyledDataGrid = styled(DataGrid)(() => ({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'white',
    borderBottom: '2px solid #E2E8F0',
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold',
      color: '#476797',
    },
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
  },
}));

const ClientsTable = ({ clients, onClientClick }: ClientsTableProps) => {
  const rows = clients.map((client) => ({
    id: client.id, // ✅ Usamos id como id para DataGrid
    name_client: client.name_client,
    address_client: client.address_client,
    section_client: client.section_client,
    elevators_client: client.elevators_client,
  }));

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
      filterable: true,
    },
    {
      field: 'name_client',
      headerName: 'Cliente',
      width: 250,
      filterable: true,
    },
    {
      field: 'address_client',
      headerName: 'Dirección',
      width: 400,
      filterable: true,
    },
    {
      field: 'section_client',
      headerName: 'Sección',
      width: 125,
      filterable: true,
    },
    {
      field: 'elevators_client',
      headerName: 'Cantidad',
      width: 130,
      filterable: true,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => onClientClick(params.row.id)}
          size="small"
          sx={{
            color: '#476797',
            '&:hover': { bgcolor: 'rgba(71, 103, 151, 0.08)' },
          }}
        >
          <Visibility fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });

  return (
    <Paper
      sx={{
        height: 'calc(100vh - 200px)',
        width: '100%',
        borderRadius: '20px',
        boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
      }}
    >
      <StyledDataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        sx={{
          border: 'none',
          '& .MuiDataGrid-main': {
            '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          },
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#F4F7FE',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#A3AED0',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#476797',
          },
        }}
      />
    </Paper>
  );
};

export default ClientsTable;