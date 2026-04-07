import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  TextField, 
  InputAdornment,
  Button
} from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { Client } from '../data/interfaces';
import { StyledDataGrid } from '../../../manager/inventory/components/StyledDataGrid';

interface ClientsTableProps {
  clients: Client[];
  onViewDetails: (client: Client) => void;
  loading?: boolean;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({
  clients,
  onViewDetails,
  loading = false
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredClients, setFilteredClients] = React.useState<Client[]>(clients);

  React.useEffect(() => {
    const filtered = clients.filter(client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(filtered);
  }, [clients, searchTerm]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Cliente',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'address',
      headerName: 'Dirección',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'elevators',
      headerName: 'Cantidad de Ascensores',
      flex: 1,
      minWidth: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'people',
      headerName: 'Personas a cargo',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const people = params.value as any[];
        if (people && people.length > 0) {
          const person = people[0];
          return (
            <Typography variant="body2">
              {person.name} {person.position && `(${person.position})`} {person.inCharge && 'encargada'}
            </Typography>
          );
        }
        return params.row.status === 'Sent' ? 'Sent' : 'Received';
      },
    },
    {
      field: 'actions',
      headerName: 'Action',
      sortable: false,
      flex: 0.5,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Button 
          variant="text" 
          color="primary" 
          onClick={() => onViewDetails(params.row)}
        >
          View more
        </Button>
      ),
    },
  ];

  return (
    <Paper sx={{ 
      p: 2, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: '20px',
      boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
      overflow: 'hidden',
      bgcolor: 'white'
    }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
        <Typography variant="h5" fontWeight="bold">
          Clientes
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {filteredClients.length} clientes activos
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
        <Box width={{ xs: '100%', sm: 'auto' }} flex={{ sm: 1 }} maxWidth="400px">
          <TextField
            fullWidth
            placeholder="Buscar cliente"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">
            Mostrando
          </Typography>
          <Box
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              minWidth: 30,
              textAlign: 'center',
            }}
          >
            {filteredClients.length}
          </Box>
          <Typography variant="body2">
            items
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%', height: 'calc(100% - 140px)', minHeight: '400px' }}>
        <StyledDataGrid
          rows={filteredClients}
          columns={columns}
          disableRowSelectionOnClick
          loading={loading}
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
    </Paper>
  );
};
