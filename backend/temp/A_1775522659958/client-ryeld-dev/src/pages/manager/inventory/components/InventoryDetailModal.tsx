import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Chip,
  Avatar
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { InventoryItem } from '../types/inventoryTypes';
import { getExitsByItemId, getEntriesByItemId } from '../data/enhancedInventoryData';

interface InventoryDetailModalProps {
  open: boolean;
  onClose: () => void;
  item: InventoryItem | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`inventory-tabpanel-${index}`}
      aria-labelledby={`inventory-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Available':
      return { bg: '#E6FAF5', color: '#476797' };
    case 'Limited':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Out of Stock':
      return { bg: '#FFE4E4', color: '#D32F2F' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

const getExitTypeColor = (type: string) => {
  switch (type) {
    case 'Gasto':
      return { bg: '#FFE4E4', color: '#FF4842' };
    case 'Prestamo':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Venta':
      return { bg: '#E6FAF5', color: '#476797' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

const getEntryTypeColor = (type: string) => {
  switch (type) {
    case 'Devolución de gasto':
      return { bg: '#E6FAF5', color: '#476797' };
    case 'Prestamo':
      return { bg: '#FFF6E5', color: '#FFB547' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

export const InventoryDetailModal: React.FC<InventoryDetailModalProps> = ({
  open,
  onClose,
  item
}) => {
  const [tabValue, setTabValue] = useState(0);

  if (!item) return null;

  const exits = getExitsByItemId(item.id);
  const entries = getEntriesByItemId(item.id);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Columnas para la tabla de salidas
  const exitColumns: GridColDef[] = [
    {
      field: 'cargoNumber',
      headerName: 'Nro de Cargo',
      width: 120
    },
    {
      field: 'physicalState',
      headerName: 'Estado Físico',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: params.value === 'Nuevo' ? '#E6FAF5' : '#FFF6E5',
            color: params.value === 'Nuevo' ? '#476797' : '#FFB547',
            fontWeight: 500
          }}
        />
      )
    },
    {
      field: 'technician',
      headerName: 'Persona a Cargo',
      width: 160
    },
    {
      field: 'building',
      headerName: 'Edificio',
      width: 160
    },
    {
      field: 'maintenanceType',
      headerName: 'Tipo de Mantenimiento',
      width: 160
    },
    {
      field: 'exitType',
      headerName: 'Tipo de Salida',
      width: 120,
      renderCell: (params) => {
        const colors = getExitTypeColor(params.value);
        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              bgcolor: colors.bg,
              color: colors.color,
              fontWeight: 500
            }}
          />
        );
      }
    },
    {
      field: 'date',
      headerName: 'Fecha',
      width: 110
    },
    {
      field: 'quantity',
      headerName: 'Cantidad',
      width: 80
    }
  ];

  // Columnas para la tabla de entradas
  const entryColumns: GridColDef[] = [
    {
      field: 'cargoNumber',
      headerName: 'Nro de Cargo',
      width: 120
    },
    {
      field: 'physicalState',
      headerName: 'Estado Físico',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: params.value === 'Nuevo' ? '#E6FAF5' : '#FFF6E5',
            color: params.value === 'Nuevo' ? '#476797' : '#FFB547',
            fontWeight: 500
          }}
        />
      )
    },
    {
      field: 'technician',
      headerName: 'Persona a Cargo',
      width: 160
    },
    {
      field: 'building',
      headerName: 'Edificio',
      width: 160
    },
    {
      field: 'entryType',
      headerName: 'Tipo de Entrada',
      width: 160,
      renderCell: (params) => {
        const colors = getEntryTypeColor(params.value);
        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              bgcolor: colors.bg,
              color: colors.color,
              fontWeight: 500
            }}
          />
        );
      }
    },
    {
      field: 'date',
      headerName: 'Fecha',
      width: 110
    },
    {
      field: 'quantity',
      headerName: 'Cantidad',
      width: 80
    }
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: '#F8F9FF',
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="#1B2559">
          Detalles del Artículo - {item.code}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Información general del item */}
        <Box sx={{ p: 3, borderBottom: '1px solid #E2E8F0' }}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {/* Imagen del producto */}
            <Box sx={{ flex: '0 0 200px' }}>
              <Paper
                sx={{
                  width: 200,
                  height: 150,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#F8F9FF',
                  borderRadius: '20px'
                }}
              >
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '20px'
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: '#476797',
                      fontSize: '2rem'
                    }}
                  >
                    {item.name.charAt(0)}
                  </Avatar>
                )}
              </Paper>
            </Box>

            {/* Información del producto */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" fontWeight="bold" color="#1B2559" mb={1}>
                {item.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={2}>
                {item.description}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Código</Typography>
                  <Typography variant="body2" fontWeight="bold">{item.code}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Categoría</Typography>
                  <Typography variant="body2" fontWeight="bold">{item.category}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Cantidad</Typography>
                  <Typography variant="body2" fontWeight="bold">{item.quantity}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Costo Unitario</Typography>
                  <Typography variant="body2" fontWeight="bold">S/ {item.unitCost?.toFixed(2)}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                  label={item.status}
                  sx={{
                    bgcolor: getStatusColor(item.status).bg,
                    color: getStatusColor(item.status).color,
                    fontWeight: 500
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  📍 {item.location}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Tabs para Salidas, Entradas y Historial */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ px: 3 }}>
            <Tab label={`Salidas (${exits.length})`} />
            <Tab label={`Entradas (${entries.length})`} />
            <Tab label="Resumen" />
          </Tabs>
        </Box>

        {/* Panel de Salidas */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 3, pb: 3 }}>
            <DataGrid
              rows={exits}
              columns={exitColumns}
              autoHeight
              disableRowSelectionOnClick
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
                  outline: 'none'
                }
              }}
            />
          </Box>
        </TabPanel>

        {/* Panel de Entradas */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3, pb: 3 }}>
            <DataGrid
              rows={entries}
              columns={entryColumns}
              autoHeight
              disableRowSelectionOnClick
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
                  outline: 'none'
                }
              }}
            />
          </Box>
        </TabPanel>

        {/* Panel de Resumen */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Paper sx={{ flex: 1, p: 2, borderRadius: '20px', bgcolor: '#F8F9FF' }}>
                <Typography variant="subtitle2" color="text.secondary">Total Salidas</Typography>
                <Typography variant="h4" fontWeight="bold" color="#FF4842">
                  {exits.reduce((sum, exit) => sum + exit.quantity, 0)}
                </Typography>
              </Paper>
              <Paper sx={{ flex: 1, p: 2, borderRadius: '20px', bgcolor: '#F0F9FF' }}>
                <Typography variant="subtitle2" color="text.secondary">Total Entradas</Typography>
                <Typography variant="h4" fontWeight="bold" color="#476797">
                  {entries.reduce((sum, entry) => sum + entry.quantity, 0)}
                </Typography>
              </Paper>
              <Paper sx={{ flex: 1, p: 2, borderRadius: '20px', bgcolor: '#FFF6E5' }}>
                <Typography variant="subtitle2" color="text.secondary">Valor Total Inventario</Typography>
                <Typography variant="h4" fontWeight="bold" color="#FFB547">
                  S/ {((item.unitCost || 0) * item.quantity).toFixed(2)}
                </Typography>
              </Paper>
            </Box>
          </Box>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};
