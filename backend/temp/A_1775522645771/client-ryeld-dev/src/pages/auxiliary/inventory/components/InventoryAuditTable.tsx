import React, { useState } from 'react';
import { 
  Box, 
  Typography,
  Chip,
  Avatar,
  TextField,
  IconButton,
  Alert,
  AlertTitle,
  Tooltip
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { InventoryItemAudit } from '../data/interfaces';
import { StyledDataGrid } from '../../../manager/inventory/components/StyledDataGrid';

interface InventoryAuditTableProps {
  items: InventoryItemAudit[];
  onUpdatePhysicalCount: (id: number | string, physicalCount: number) => void;
  onVerifyItem: (id: number | string) => void;
}

export const InventoryAuditTable: React.FC<InventoryAuditTableProps> = ({ 
  items, 
  onUpdatePhysicalCount, 
  onVerifyItem 
}) => {
  const [editingItem, setEditingItem] = useState<number | string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  const getDifferenceChip = (diferencia?: number) => {
    if (diferencia === undefined) return null;
    
    if (diferencia === 0) {
      return (
        <Chip 
          label="Sin diferencias"
          size="small"
          icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
          sx={{ 
            backgroundColor: '#E6FAF5', 
            color: '#476797',
            fontWeight: 'medium',
            borderRadius: '4px',
            minWidth: '120px'
          }}
        />
      );
    } else if (diferencia > 0) {
      return (
        <Chip 
          label={`+${diferencia} (Sobrante)`}
          size="small"
          icon={<WarningIcon sx={{ fontSize: 16 }} />}
          sx={{ 
            backgroundColor: '#FFF6E5', 
            color: '#FFB547',
            fontWeight: 'medium',
            borderRadius: '4px',
            minWidth: '120px'
          }}
        />
      );
    } else {
      return (
        <Chip 
          label={`${diferencia} (Faltante)`}
          size="small"
          icon={<ErrorIcon sx={{ fontSize: 16 }} />}
          sx={{ 
            backgroundColor: '#FFE4E4', 
            color: '#FF4842',
            fontWeight: 'medium',
            borderRadius: '4px',
            minWidth: '120px'
          }}
        />
      );
    }
  };

  const handlePhysicalCountEdit = (id: number | string, value: string) => {
    const numericValue = parseInt(value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      onUpdatePhysicalCount(id, numericValue);
    }
    setEditingItem(null);
    setTempValue('');
  };

  const columns: GridColDef[] = [
    {
      field: 'nro',
      headerName: 'Nro',
      width: 60,
      sortable: false,
    },
    {
      field: 'imagen',
      headerName: 'Imagen',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Avatar
          src={params.value || '/imgs/default-product.png'}
          alt="Producto"
          variant="rounded"
          sx={{ width: 40, height: 40, border: '2px solid #FFE4E4' }}
        />
      ),
    },
    {
      field: 'nombre',
      headerName: 'Nombre artículo',
      flex: 2,
      minWidth: 250,
    },
    {
      field: 'codigo',
      headerName: 'Código',
      flex: 0.8,
      minWidth: 100,
    },
    {
      field: 'cantAlmacen',
      headerName: 'Cant. Sistema',
      flex: 0.8,
      minWidth: 110,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'cantFisica',
      headerName: 'Cant. Física',
      flex: 0.8,
      minWidth: 110,
      renderCell: (params) => {
        const isEditing = editingItem === params.row.id;
        
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isEditing ? (
              <TextField
                size="small"
                type="number"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={() => handlePhysicalCountEdit(params.row.id, tempValue)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handlePhysicalCountEdit(params.row.id, tempValue);
                  }
                }}
                autoFocus
                sx={{ 
                  width: '80px',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFF',
                    '& fieldset': {
                      borderColor: '#FF4842',
                    },
                  }
                }}
              />
            ) : (
              <Typography 
                variant="body2" 
                fontWeight="medium"
                onClick={() => {
                  setEditingItem(params.row.id);
                  setTempValue(params.value?.toString() || '');
                }}
                sx={{ 
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: params.value !== undefined ? '#FFE4E4' : '#F5F5F5',
                  color: params.value !== undefined ? '#FF4842' : '#637381',
                  '&:hover': {
                    backgroundColor: params.value !== undefined ? '#FFD6D6' : '#E5E5E5',
                  }
                }}
              >
                {params.value !== undefined ? params.value : 'Ingresar'}
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: 'diferencia',
      headerName: 'Diferencia',
      flex: 1,
      minWidth: 140,
      renderCell: (params) => getDifferenceChip(params.value),
    },
    {
      field: 'verificado',
      headerName: 'Verificado',
      flex: 0.6,
      minWidth: 100,
      renderCell: (params) => {
        const isVerified = params.value;
        const canVerify = params.row.cantFisica !== undefined;
        
        return (
          <Tooltip title={!canVerify ? 'Ingrese la cantidad física primero' : 'Marcar como verificado'}>
            <span>
              <IconButton
                size="small"
                onClick={() => canVerify && onVerifyItem(params.row.id)}
                disabled={!canVerify}
                sx={{
                  color: isVerified ? '#476797' : '#637381',
                  backgroundColor: isVerified ? '#E6FAF5' : 'transparent',
                  '&:hover': {
                    backgroundColor: isVerified ? '#D1F2E8' : canVerify ? '#F5F5F5' : 'transparent',
                  },
                  '&.Mui-disabled': {
                    color: '#E0E0E0'
                  }
                }}
              >
                <CheckCircleIcon />
              </IconButton>
            </span>
          </Tooltip>
        );
      },
    },
  ];

  const totalItems = items.length;
  const verifiedItems = items.filter(item => item.verificado).length;
  const itemsWithDifferences = items.filter(item => item.diferencia !== undefined && item.diferencia !== 0).length;

  return (
    <Box sx={{ width: '100%' }}>
      {/* Alert de información del cuadre */}
      <Alert 
        severity="warning" 
        sx={{ 
          mb: 3,
          backgroundColor: '#FFF6E5',
          border: '1px solid #FFD93D',
          '& .MuiAlert-icon': {
            color: '#F59E0B'
          }
        }}
      >
        <AlertTitle sx={{ fontWeight: 'bold' }}>Cuadre de Inventario en Proceso</AlertTitle>
        <Typography variant="body2">
          Progreso: {verifiedItems}/{totalItems} items verificados • 
          {itemsWithDifferences > 0 && ` ${itemsWithDifferences} items con diferencias`}
        </Typography>
      </Alert>

      {/* Tabla con estilo de auditoría */}
      <Box sx={{ height: '600px' }}>
        <StyledDataGrid
          rows={items}
          columns={columns}
          disableRowSelectionOnClick
          density="standard"
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          sx={{
            border: '2px solid #FF4842',
            borderRadius: '8px',
            backgroundColor: '#FFF8F8',
            '& .MuiDataGrid-main': {
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#FFE4E4',
                color: '#B91C1C',
                fontWeight: 'bold',
                borderBottom: '2px solid #FF4842',
              },
              '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-row': {
                backgroundColor: '#FFF8F8',
                '&:hover': {
                  backgroundColor: '#FFE4E4',
                },
                '&.Mui-selected': {
                  backgroundColor: '#FFD6D6',
                  '&:hover': {
                    backgroundColor: '#FFCCCC',
                  },
                },
              },
            },
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px'
              },
              '&::-webkit-scrollbar-track': {
                background: '#FFE4E4'
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#FF4842',
                borderRadius: '4px'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#DC2626'
              }
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '2px solid #FF4842',
              backgroundColor: '#FFE4E4',
              color: '#B91C1C'
            }
          }}
        />
      </Box>
    </Box>
  );
};
