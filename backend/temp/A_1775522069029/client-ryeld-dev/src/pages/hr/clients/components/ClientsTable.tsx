/**
 * Tabla de clientes para el módulo HR
 * Muestra la lista de clientes con funcionalidades de filtrado y acciones
 */

import React, { useState } from 'react';
import {
  Paper,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Typography
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Client, clientsColumns } from '../data/clientsData';

// Styled DataGrid con estilos personalizados
const StyledDataGrid = styled(DataGrid)(() => ({
  border: 'none',
  '& .MuiDataGrid-main': {
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: '#F8F9FF',
      color: '#4A5568',
      fontWeight: 600,
      fontSize: '0.875rem',
      border: 'none',
      '&:focus, &:focus-within': {
        outline: 'none'
      }
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 600
    },
    '& .MuiDataGrid-row': {
      border: 'none',
      '&:hover': {
        backgroundColor: 'rgba(71, 103, 151, 0.04)',
        cursor: 'pointer'
      },
      '&.Mui-selected': {
        backgroundColor: 'rgba(71, 103, 151, 0.08)',
        '&:hover': {
          backgroundColor: 'rgba(71, 103, 151, 0.12)'
        }
      }
    },
    '& .MuiDataGrid-cell': {
      border: 'none',
      color: '#2D3748',
      fontSize: '0.875rem',
      '&:focus, &:focus-within': {
        outline: 'none'
      }
    }
  },
  '& .MuiDataGrid-virtualScroller': {
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#F7FAFC'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#CBD5E0',
      borderRadius: '4px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#A0AEC0'
    }
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: '1px solid #E2E8F0',
    backgroundColor: '#F8F9FF',
    color: '#4A5568'
  }
}));

interface ClientsTableProps {
  clients: Client[];
  isLoading?: boolean;
  onViewClient?: (client: Client) => void;
  onEditClient?: (client: Client) => void;
  onDeleteClient?: (client: Client) => void;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({
  clients,
  isLoading = false,
  onViewClient,
  onEditClient,
  onDeleteClient
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, client: Client) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedClient(client);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClient(null);
  };

  const handleRowClick = (params: GridRowParams) => {
    onViewClient?.(params.row as Client);
  };

  const handleView = () => {
    if (selectedClient) {
      onViewClient?.(selectedClient);
    }
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedClient) {
      onEditClient?.(selectedClient);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedClient) {
      onDeleteClient?.(selectedClient);
    }
    handleMenuClose();
  };

  // Configuración de columnas con columna de acciones
  const columnsWithActions: GridColDef[] = [
    ...clientsColumns,
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 80,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={(event) => handleMenuOpen(event, params.row as Client)}
          sx={{
            color: '#A0AEC0',
            '&:hover': {
              color: '#476797',
              bgcolor: 'rgba(71, 103, 151, 0.08)'
            },
            transition: 'all 0.2s'
          }}
        >
          <MoreIcon fontSize="small" />
        </IconButton>
      )
    }
  ];

  if (isLoading) {
    return (
      <Paper
        sx={{
          height: 400,
          width: '100%',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'white'
        }}
      >
        <Box textAlign="center">
          <CircularProgress size={40} sx={{ color: '#476797', mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Cargando clientes...
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <>
      <Paper
        sx={{
          height: 600,
          width: '100%',
          borderRadius: '20px',
          overflow: 'hidden',
          bgcolor: 'white',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
          border: '1px solid #E2E8F0'
        }}
      >
        <StyledDataGrid
          rows={clients}
          columns={columnsWithActions}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 }
            }
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          checkboxSelection={false}
          disableRowSelectionOnClick={false}
          onRowClick={handleRowClick}
          loading={isLoading}
          autoHeight={false}
          sx={{ height: '100%' }}
          localeText={{
            noRowsLabel: 'No hay clientes disponibles',
            noResultsOverlayLabel: 'No se encontraron resultados',
            toolbarColumns: 'Columnas',
            toolbarFilters: 'Filtros',
            toolbarDensity: 'Densidad',
            toolbarExport: 'Exportar'
          }}
        />
      </Paper>

      {/* Menú contextual */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{
          sx: {
            borderRadius: '20px',
            boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
            border: '1px solid #E2E8F0',
            minWidth: 160
          }
        }}
      >
        <MenuItem onClick={handleView}>
          <ListItemIcon>
            <ViewIcon fontSize="small" sx={{ color: '#4A5568' }} />
          </ListItemIcon>
          <ListItemText
            primary="Ver detalles"
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          />
        </MenuItem>
        
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" sx={{ color: '#4A5568' }} />
          </ListItemIcon>
          <ListItemText
            primary="Editar"
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          />
        </MenuItem>
        
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: '#E53E3E' }} />
          </ListItemIcon>
          <ListItemText
            primary="Eliminar"
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#E53E3E'
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};
