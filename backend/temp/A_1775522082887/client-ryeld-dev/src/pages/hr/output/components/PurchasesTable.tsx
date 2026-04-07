/**
 * Tabla de compras para el módulo Output de HR
 * Muestra y gestiona todas las compras de la empresa
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
  Visibility as ViewIcon,
  MoreVert as MoreIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';
import { DataGrid, type GridColDef, type GridRowParams } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

// Componentes
import PurchaseDetailsModal from './PurchaseDetailsModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import MarkAsPaidModal from './MarkAsPaidModal';

// Datos y tipos
import type { Purchase, PurchaseFilters } from '../data/interfaces';
import { getPurchases, deletePurchase, markPurchaseAsPaid } from '../api';

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

interface PurchasesTableProps {
  filters: PurchaseFilters;
  onError: (message: string) => void;
}

const PurchasesTable: React.FC<PurchasesTableProps> = ({ filters, onError }) => {
  // Estados principales
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

  // Estados de modales
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMarkAsPaidModalOpen, setIsMarkAsPaidModalOpen] = useState(false);

  // Estados del menú de acciones
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [contextMenuPurchase, setContextMenuPurchase] = useState<Purchase | null>(null);

  // Cargar compras
  useEffect(() => {
    loadPurchases();
  }, [filters]);

  const loadPurchases = async () => {
    try {
      setIsLoading(true);
      const data = await getPurchases(filters);
      setPurchases(data);
    } catch (err) {
      onError('Error al cargar las compras');
      console.error('Error loading purchases:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejo del menú contextual
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, purchase: Purchase) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setContextMenuPurchase(purchase);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setContextMenuPurchase(null);
  };

  // Acciones
  const handleView = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsDetailsModalOpen(true);
    handleMenuClose();
  };

  const handleDelete = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsDeleteModalOpen(true);
    handleMenuClose();
  };

  const handleMarkAsPaid = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsMarkAsPaidModalOpen(true);
    handleMenuClose();
  };

  // Confirmar eliminación
  const confirmDelete = async () => {
    if (!selectedPurchase) return;

    try {
      await deletePurchase(selectedPurchase.id);
      await loadPurchases();
      setIsDeleteModalOpen(false);
      setSelectedPurchase(null);
    } catch (err) {
      onError('Error al eliminar la compra');
      console.error('Error deleting purchase:', err);
    }
  };

  // Confirmar marcar como pagado
  const confirmMarkAsPaid = async () => {
    if (!selectedPurchase) return;

    try {
      await markPurchaseAsPaid(selectedPurchase.id);
      await loadPurchases();
      setIsMarkAsPaidModalOpen(false);
      setSelectedPurchase(null);
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
      field: 'category',
      headerName: 'Categoría',
      width: 130,
      renderCell: (params) => {
        const colors = {
          'Pasaje': { bg: '#E8F4FD', color: '#1976D2' },
          'Tecnología': { bg: '#F3E5F5', color: '#7B1FA2' },
          'Muebles': { bg: '#FFF3E0', color: '#F57C00' },
          'Oficina': { bg: '#E8F5E8', color: '#388E3C' },
          'Mantenimiento': { bg: '#FFEBEE', color: '#D32F2F' },
          'Alimentación': { bg: '#FFF8E1', color: '#F9A825' },
          'Capacitación': { bg: '#E3F2FD', color: '#1565C0' },
          'Marketing': { bg: '#FCE4EC', color: '#C2185B' }
        };
        const categoryColor = colors[params.value as keyof typeof colors] || { bg: '#F5F5F5', color: '#757575' };
        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              backgroundColor: categoryColor.bg,
              color: categoryColor.color,
              fontWeight: 500,
              fontSize: '0.75rem',
              border: 'none'
            }}
          />
        );
      },
    },
    {
      field: 'paymentType',
      headerName: 'Tipo de Pago',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
          sx={{
            borderColor: params.value === 'Al contado' ? '#4CAF50' : '#FF9800',
            color: params.value === 'Al contado' ? '#4CAF50' : '#FF9800',
            fontWeight: 500
          }}
        />
      ),
    },
    {
      field: 'voucher',
      headerName: 'Comprobante',
      width: 120,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={0.5}>
          <ReceiptIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'voucherNumber',
      headerName: 'N° Comprobante',
      width: 140,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'amount',
      headerName: 'Monto',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#476797' }}>
          S/ {params.value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
        </Typography>
      ),
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
      field: 'supplier',
      headerName: 'Proveedor',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2">
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

  // Manejo de clic en fila
  const handleRowClick = (params: GridRowParams) => {
    handleView(params.row);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (purchases.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No se encontraron compras con los filtros aplicados.
      </Alert>
    );
  }

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <StyledDataGrid
        rows={purchases}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 }
          }
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection={false}
        disableRowSelectionOnClick={false}
        onRowClick={handleRowClick}
        loading={isLoading}
        autoHeight={false}
        sx={{ 
          height: '100%',
          '& .MuiDataGrid-row': {
            cursor: 'pointer'
          }
        }}
        localeText={{
          noRowsLabel: 'No hay compras disponibles',
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
        <MenuItem onClick={() => contextMenuPurchase && handleView(contextMenuPurchase)}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ver detalles</ListItemText>
        </MenuItem>
        
        {contextMenuPurchase?.status === 'Pendiente' && (
          <MenuItem onClick={() => contextMenuPurchase && handleMarkAsPaid(contextMenuPurchase)}>
            <ListItemIcon>
              <PaymentIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Marcar como pagado</ListItemText>
          </MenuItem>
        )}
        
        <MenuItem 
          onClick={() => contextMenuPurchase && handleDelete(contextMenuPurchase)}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>

      {/* Modales */}
      {selectedPurchase && (
        <>
          <PurchaseDetailsModal
            open={isDetailsModalOpen}
            onClose={() => {
              setIsDetailsModalOpen(false);
              setSelectedPurchase(null);
            }}
            purchase={selectedPurchase}
          />

          <DeleteConfirmModal
            open={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedPurchase(null);
            }}
            onConfirm={confirmDelete}
            title="¿Eliminar compra?"
            message={`¿Está seguro de que desea eliminar la compra "${selectedPurchase.description}"? Esta acción no se puede deshacer.`}
          />

          <MarkAsPaidModal
            open={isMarkAsPaidModalOpen}
            onClose={() => {
              setIsMarkAsPaidModalOpen(false);
              setSelectedPurchase(null);
            }}
            onConfirm={confirmMarkAsPaid}
            title="¿Marcar como pagado?"
            message={`¿Está seguro de que desea marcar como pagada la compra "${selectedPurchase.description}"?`}
            amount={selectedPurchase.amount}
          />
        </>
      )}
    </Box>
  );
};

export default PurchasesTable;
