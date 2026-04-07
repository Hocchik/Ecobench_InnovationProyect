import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Paper,
  Chip
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TechnicianExpense } from '../data/technicianData';

interface ExpenseDetailsModalProps {
  open: boolean;
  onClose: () => void;
  technician: TechnicianExpense | null;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Movilidad':
      return { bg: '#E6FAF5', color: '#476797' };
    case 'Comida':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Hospedaje':
      return { bg: '#E3F2FD', color: '#1976D2' };
    case 'Viaticos':
      return { bg: '#F3E5F5', color: '#7B1FA2' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const ExpenseDetailsModal: React.FC<ExpenseDetailsModalProps> = ({
  open,
  onClose,
  technician
}) => {
  if (!technician) return null;
  const columns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Fecha',
      width: 120,
      valueFormatter: (value) => formatDate(value as string),
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'category',
      headerName: 'Categoría',
      width: 140,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const colors = getCategoryColor(params.value);
        return (
          <Chip
            label={params.value}
            sx={{
              bgcolor: colors.bg,
              color: colors.color,
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: '0.75rem'
            }}
          />
        );
      }
    },
    {
      field: 'description',
      headerName: 'Descripción',
      flex: 1,
      minWidth: 250
    },
    {
      field: 'amount',
      headerName: 'Monto',
      width: 120,
      align: 'right',
      headerAlign: 'right',
      valueFormatter: (value) => formatCurrency(value as number),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: '#1B2559'
          }}
        >
          {formatCurrency(params.value)}
        </Typography>
      )
    }
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="600" color="#1B2559">
            Detalle de Gastos
          </Typography>
          <Typography variant="subtitle2" color="#476797">
            {technician.name}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        {/* Resumen total */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: '20px',
            bgcolor: '#F8F9FF',
            border: '1px solid #E2E8F0'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="600" color="#1B2559">
              Total de Gastos
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="#476797">
              {formatCurrency(technician.amount)}
            </Typography>
          </Box>
        </Paper>

        {/* Tabla de detalles */}
        <Paper
          elevation={0}
          sx={{
            height: 400,
            borderRadius: '20px',
            boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
            overflow: 'hidden',
            border: '1px solid #E2E8F0'
          }}
        >
          <DataGrid
            rows={technician.details}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 }
              }
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            sx={{
              border: 'none',
              '& .MuiDataGrid-main': {
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: '#F8F9FF',
                  color: '#1B2559',
                  fontWeight: 600,
                  borderBottom: '2px solid #E2E8F0'
                },
                '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #F1F5F9',
                color: '#334155'
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#F8F9FF'
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
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid #E2E8F0' }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: '#476797',
            '&:hover': {
              bgcolor: '#3A5578'
            },
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseDetailsModal;
