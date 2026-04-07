import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  Button,
  Chip,
  IconButton
} from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Sale } from '../data/interfaces';
import { StyledDataGrid } from '../../../manager/inventory/components/StyledDataGrid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { months } from '../data/salesData';

interface SalesTableProps {
  sales: Sale[];
  currentMonth: number;
  onViewDetails: (sale: Sale) => void;
  onMonthChange: (month: number) => void;
  onAddSale: () => void;
  loading?: boolean;
}

export const SalesTable: React.FC<SalesTableProps> = ({
  sales,
  currentMonth,
  onViewDetails,
  onMonthChange,
  onAddSale,
  loading = false
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handlePrevMonth = () => {
    const newMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    onMonthChange(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    onMonthChange(newMonth);
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'Pagado':
        return (
          <Chip 
            label="Pagado"
            size="small"
            sx={{ 
              backgroundColor: '#E6FAF5', 
              color: '#476797',
              fontWeight: 'medium',
              borderRadius: '4px',
              minWidth: '90px'
            }}
            icon={<span style={{ marginRight: '-4px', fontSize: '14px' }}>✓</span>} 
          />
        );
      case 'Pendiente':
        return (
          <Chip 
            label="Pendiente" 
            size="small"
            sx={{ 
              backgroundColor: '#FFF6E5', 
              color: '#FFB547',
              fontWeight: 'medium',
              borderRadius: '4px',
              minWidth: '90px'
            }}
            icon={<span style={{ marginRight: '-4px', fontSize: '14px' }}>⏳</span>} 
          />
        );
      case 'Anulado':
        return (
          <Chip 
            label="Anulado" 
            size="small"
            sx={{ 
              backgroundColor: '#FFE4E4', 
              color: '#FF4842',
              fontWeight: 'medium',
              borderRadius: '4px',
              minWidth: '90px'
            }}
            icon={<span style={{ marginRight: '-4px', fontSize: '14px' }}>✕</span>} 
          />
        );
      case 'Por cobrar':
        return (
          <Chip 
            label="Por cobrar" 
            size="small"
            sx={{ 
              backgroundColor: '#E3F2FD', 
              color: '#1976D2',
              fontWeight: 'medium',
              borderRadius: '4px',
              minWidth: '90px'
            }}
            icon={<span style={{ marginRight: '-4px', fontSize: '14px' }}>$</span>} 
          />
        );
      default:
        return (
          <Chip 
            label={status} 
            size="small"
            sx={{ 
              backgroundColor: '#F5F5F5', 
              color: '#A3AED0',
              fontWeight: 'medium',
              borderRadius: '4px',
              minWidth: '90px'
            }}
          />
        );
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Fecha',
      flex: 0.5,
      minWidth: 80,
    },
    {
      field: 'client',
      headerName: 'Cliente',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'concept',
      headerName: 'Concepto',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'voucher',
      headerName: 'Comprobante',
      flex: 0.8,
      minWidth: 130,
    },
    {
      field: 'amount',
      headerName: 'Monto',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">
          {formatCurrency(params.value as number)}
        </Typography>
      ),
    },
    {
      field: 'dueDate',
      headerName: 'Fecha Vencimiento',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'paymentDate',
      headerName: 'Fecha Pago',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">
          {params.value || '-'}
        </Typography>
      ),
    },
    {
      field: 'voucherNumber',
      headerName: 'Nro. Comprobante',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'status',
      headerName: 'Estado',
      flex: 0.8,
      minWidth: 140,
      renderCell: (params: GridRenderCellParams) => getStatusChip(params.value as string),
    },
    {
      field: 'actions',
      headerName: 'Acción',
      sortable: false,
      flex: 0.7,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Button 
          variant="text" 
          color="primary" 
          onClick={() => onViewDetails(params.row)}
        >
          Ver más
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
          Historial de Pagos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onAddSale}
          sx={{ borderRadius: '8px' }}
        >
          Agregar venta
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={handlePrevMonth} size="small">
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="body1" fontWeight="medium">
            {months.find(m => m.id === currentMonth)?.name}
          </Typography>
          <IconButton onClick={handleNextMonth} size="small">
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%', height: 'calc(100% - 140px)', minHeight: '400px' }}>
        <StyledDataGrid
          rows={sales}
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
      
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button 
          variant="contained"
          color="primary"
          sx={{ 
            borderRadius: '8px',
            px: 3
          }}
        >
          Exportar
        </Button>
      </Box>
    </Paper>
  );
};
