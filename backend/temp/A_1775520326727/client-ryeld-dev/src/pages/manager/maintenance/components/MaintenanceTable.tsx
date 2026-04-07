import React from 'react';
import { Paper, Chip, IconButton, Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { Maintenance, MaintenanceStatus, MaintenanceType } from '../types/maintenanceTypes';

interface MaintenanceTableProps {
  maintenances: Maintenance[];
  onViewDetails: (maintenance: Maintenance) => void;
  onEdit: (maintenance: Maintenance) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

// Función para obtener colores según el estado
const getStatusColor = (status: MaintenanceStatus) => {
  switch (status) {
    case 'Completado':
      return { bg: '#E6FAF5', color: '#476797' };
    case 'En Progreso':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Programado':
      return { bg: '#E3F2FD', color: '#1976D2' };
    case 'Pendiente':
      return { bg: '#FFF3E0', color: '#F57C00' };
    case 'Cancelado':
      return { bg: '#FFE4E4', color: '#FF4842' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

// Función para obtener colores según el tipo
const getTypeColor = (type: MaintenanceType) => {
  switch (type) {
    case 'Preventivo':
      return { bg: '#E8F5E8', color: '#2E7D32' };
    case 'Correctivo':
      return { bg: '#E3F2FD', color: '#1565C0' };
    case 'Urgencia':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Emergencia':
      return { bg: '#FFE4E4', color: '#FF4842' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

// Función para obtener colores según la prioridad
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Alta':
      return { bg: '#FFE4E4', color: '#FF4842' };
    case 'Media':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Baja':
      return { bg: '#E8F5E8', color: '#2E7D32' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

const formatCurrency = (amount?: number) => {
  if (!amount) return '-';
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

export const MaintenanceTable: React.FC<MaintenanceTableProps> = ({
  maintenances,
  onViewDetails,
  onEdit,
  onDelete,
  loading = false
}) => {
  const columns: GridColDef[] = [
    {
      field: 'clientName',
      headerName: 'Cliente',
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" fontWeight="600" color="#1B2559">
            {params.value}
          </Typography>
          <Typography variant="caption" color="#476797">
            {params.row.building}
          </Typography>
        </Box>
      )
    },
    {
      field: 'ascensorType',
      headerName: 'Tipo Ascensor',
      width: 130,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'maintenanceType',
      headerName: 'Tipo',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => {
        const colors = getTypeColor(params.value);
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
      field: 'status',
      headerName: 'Estado',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => {
        const colors = getStatusColor(params.value);
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
      field: 'priority',
      headerName: 'Prioridad',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => {
        const colors = getPriorityColor(params.value);
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
      field: 'scheduledDate',
      headerName: 'Fecha Programada',
      width: 140,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: (value) => formatDate(value as string)
    },
    {
      field: 'technician1',
      headerName: 'Técnico Principal',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" fontWeight="500" color="#1B2559">
            {params.value}
          </Typography>
          {params.row.technician2 && (
            <Typography variant="caption" color="#476797">
              + {params.row.technician2}
            </Typography>
          )}
        </Box>
      )
    },
    {
      field: 'cost',
      headerName: 'Costo',
      width: 100,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" fontWeight="600" color="#1B2559">
          {formatCurrency(params.value)}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 140,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={() => onViewDetails(params.row)}
            sx={{
              color: '#476797',
              '&:hover': {
                bgcolor: 'rgba(71, 103, 151, 0.08)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s'
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onEdit(params.row)}
            sx={{
              color: '#FFB547',
              '&:hover': {
                bgcolor: 'rgba(255, 181, 71, 0.08)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s'
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(params.row.id)}
            sx={{
              color: '#FF4842',
              '&:hover': {
                bgcolor: 'rgba(255, 72, 66, 0.08)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s'
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Paper
      sx={{
        height: '100%',
        width: '100%',
        borderRadius: '20px',
        boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
        overflow: 'hidden',
        bgcolor: 'white'
      }}
    >
      <DataGrid
        rows={maintenances}
        columns={columns}
        loading={loading}
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
            borderBottom: '1px solid #E2E8F0',
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
  );
};
