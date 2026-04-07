/**
 * Tabla de servicios para el módulo Output de HR
 * Muestra y gestiona todos los servicios de la empresa
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Chip,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Delete as DeleteIcon,
  MoreVert as MoreIcon,
  Payment as PaymentIcon,
  AccountCircle as AccountIcon
} from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

// Componentes
import DeleteConfirmModal from './DeleteConfirmModal';
import MarkAsPaidModal from './MarkAsPaidModal';

// Datos y tipos
import type { Service, ServiceFilters } from '../data/interfaces';
import { getServices, deleteService, markServiceAsPaid } from '../api';

// DataGrid estilizada
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  height: '500px',
  '& .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
    paddingY: '8px',
    '&:focus': {
      outline: 'none',
    },
  },
  '& .MuiDataGrid-row': {
    minHeight: '60px !important',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.action.selected,
      '&:hover': {
        backgroundColor: theme.palette.action.selected,
      },
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#F8F9FF',
    borderBottom: `2px solid ${theme.palette.divider}`,
    '& .MuiDataGrid-columnHeader': {
      fontWeight: 600,
      fontSize: '0.875rem',
      color: '#1B2559',
      '&:focus': {
        outline: 'none',
      },
    },
  },
  '& .MuiDataGrid-virtualScroller': {
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: `2px solid ${theme.palette.divider}`,
    backgroundColor: '#F8F9FF',
  },
  '& .MuiDataGrid-toolbarContainer': {
    padding: theme.spacing(1),
    backgroundColor: '#F8F9FF',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

interface ServicesTableProps {
  filters: ServiceFilters;
  onError: (message: string) => void;
}

const ServicesTable: React.FC<ServicesTableProps> = ({ filters, onError }) => {
  // Estados principales
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Estados de modales
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMarkAsPaidModalOpen, setIsMarkAsPaidModalOpen] = useState(false);

  // Estados del menú de acciones
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [contextMenuService, setContextMenuService] = useState<Service | null>(null);

  // Cargar servicios
  useEffect(() => {
    loadServices();
  }, [filters]);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const data = await getServices(filters);
      setServices(data);
    } catch (err) {
      onError('Error al cargar los servicios');
      console.error('Error loading services:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejo del menú contextual
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, service: Service) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setContextMenuService(service);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setContextMenuService(null);
  };

  // Acciones
  const handleDelete = (service: Service) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
    handleMenuClose();
  };

  const handleMarkAsPaid = (service: Service) => {
    setSelectedService(service);
    setIsMarkAsPaidModalOpen(true);
    handleMenuClose();
  };

  // Confirmar eliminación
  const confirmDelete = async () => {
    if (!selectedService) return;

    try {
      await deleteService(selectedService.id);
      await loadServices();
      setIsDeleteModalOpen(false);
      setSelectedService(null);
    } catch (err) {
      onError('Error al eliminar el servicio');
      console.error('Error deleting service:', err);
    }
  };

  // Confirmar marcar como pagado
  const confirmMarkAsPaid = async () => {
    if (!selectedService) return;

    try {
      await markServiceAsPaid(selectedService.id);
      await loadServices();
      setIsMarkAsPaidModalOpen(false);
      setSelectedService(null);
    } catch (err) {
      onError('Error al marcar como pagado');
      console.error('Error marking as paid:', err);
    }
  };

  // Definición de columnas
  const columns: GridColDef[] = useMemo(() => [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'date',
      headerName: 'Fecha',
      width: 120,
      renderCell: (params) => {
        const date = new Date(params.value);
        return (
          <Typography variant="body2">
            {date.toLocaleDateString('es-PE')}
          </Typography>
        );
      },
    },
    {
      field: 'description',
      headerName: 'Descripción',
      flex: 1,
      minWidth: 250,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography 
            variant="body2" 
            sx={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: 500
            }}
          >
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'serviceType',
      headerName: 'Tipo de Servicio',
      width: 140,
      renderCell: (params) => {
        const colors = {
          'Luz': '#FFC107',
          'Agua': '#2196F3',
          'Internet': '#9C27B0',
          'Teléfono': '#4CAF50',
          'Gas': '#FF5722',
          'Seguridad': '#F44336',
          'Limpieza': '#795548',
          'Otros': '#607D8B'
        };
        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              backgroundColor: colors[params.value as keyof typeof colors] || '#757575',
              color: 'white',
              fontWeight: 500,
              fontSize: '0.75rem'
            }}
          />
        );
      },
    },
    {
      field: 'supplier',
      headerName: 'Proveedor',
      width: 150,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={0.5}>
          <AccountIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'accountNumber',
      headerName: 'N° Cuenta',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
          {params.value || 'N/A'}
        </Typography>
      ),
    },
    {
      field: 'amount',
      headerName: 'Monto',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#f093fb' }}>
          S/ {params.value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
        </Typography>
      ),
    },
    {
      field: 'dueDate',
      headerName: 'Vencimiento',
      width: 130,
      renderCell: (params) => {
        if (!params.value) return <Typography variant="body2">N/A</Typography>;
        
        const dueDate = new Date(params.value);
        const today = new Date();
        const daysDiff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
        
        let color = 'text.primary';
        if (daysDiff < 0) color = 'error.main';
        else if (daysDiff <= 7) color = 'warning.main';
        else if (daysDiff <= 30) color = 'info.main';
        
        return (
          <Typography variant="body2" sx={{ color, fontWeight: daysDiff <= 7 ? 600 : 400 }}>
            {dueDate.toLocaleDateString('es-PE')}
          </Typography>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 110,
      renderCell: (params) => {
        const colors = {
          'Pagado': '#4CAF50',
          'Pendiente': '#FF9800',
          'Anulado': '#F44336'
        };
        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              backgroundColor: colors[params.value as keyof typeof colors],
              color: 'white',
              fontWeight: 500
            }}
          />
        );
      },
    },
    {
      field: 'paymentProof',
      headerName: 'Comprobante',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
          {params.value || 'N/A'}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 80,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Tooltip title="Más opciones">
          <IconButton
            size="small"
            onClick={(event) => handleMenuOpen(event, params.row)}
            sx={{ color: 'text.secondary' }}
          >
            <MoreIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ], []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (services.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No se encontraron servicios con los filtros aplicados.
      </Alert>
    );
  }

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <StyledDataGrid
        rows={services}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 }
          }
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection={false}
        disableRowSelectionOnClick={false}
        loading={isLoading}
        autoHeight={false}
        sx={{ 
          height: '100%'
        }}
        localeText={{
          noRowsLabel: 'No hay servicios disponibles',
          noResultsOverlayLabel: 'No se encontraron resultados',
          toolbarColumns: 'Columnas',
          toolbarFilters: 'Filtros',
          toolbarDensity: 'Densidad',
          toolbarExport: 'Exportar',
          footerRowSelected: (count) => 
            count !== 1
              ? `${count.toLocaleString()} filas seleccionadas`
              : `${count.toLocaleString()} fila seleccionada`,
          footerTotalRows: 'Total de filas:',
          footerTotalVisibleRows: (visibleCount, totalCount) =>
            `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
        }}
      />

      {/* Menú contextual */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { minWidth: 180 }
        }}
      >
        {contextMenuService?.status === 'Pendiente' && (
          <MenuItem onClick={() => contextMenuService && handleMarkAsPaid(contextMenuService)}>
            <ListItemIcon>
              <PaymentIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Marcar como pagado</ListItemText>
          </MenuItem>
        )}
        
        <MenuItem 
          onClick={() => contextMenuService && handleDelete(contextMenuService)}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>

      {/* Modales */}
      {selectedService && (
        <>
          <DeleteConfirmModal
            open={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedService(null);
            }}
            onConfirm={confirmDelete}
            title="¿Eliminar servicio?"
            message={`¿Está seguro de que desea eliminar el servicio "${selectedService.description}"? Esta acción no se puede deshacer.`}
          />

          <MarkAsPaidModal
            open={isMarkAsPaidModalOpen}
            onClose={() => {
              setIsMarkAsPaidModalOpen(false);
              setSelectedService(null);
            }}
            onConfirm={confirmMarkAsPaid}
            title="¿Marcar como pagado?"
            message={`¿Está seguro de que desea marcar como pagado el servicio "${selectedService.description}"?`}
            amount={selectedService.amount}
          />
        </>
      )}
    </Box>
  );
};

export default ServicesTable;
