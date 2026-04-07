/**
 * Modal para mostrar detalles de una compra
 * Vista completa con opción de editar y marcar como pagado
 */

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
  Chip,
  Divider,
  Grid2 as Grid,
  Paper
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Payment as PaymentIcon,
  ShoppingCart as PurchaseIcon,
  Receipt as ReceiptIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Notes as NotesIcon
} from '@mui/icons-material';

// Datos y tipos
import type { Purchase } from '../data/interfaces';

interface PurchaseDetailsModalProps {
  open: boolean;
  onClose: () => void;
  purchase: Purchase;
}

const PurchaseDetailsModal: React.FC<PurchaseDetailsModalProps> = ({
  open,
  onClose,
  purchase
}) => {
  // Formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Formatear fecha y hora
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Colores para categorías
  const categoryColors = {
    'Pasaje': '#2196F3',
    'Tecnología': '#9C27B0',
    'Muebles': '#FF9800',
    'Oficina': '#4CAF50',
    'Mantenimiento': '#F44336',
    'Alimentación': '#FF5722',
    'Capacitación': '#3F51B5',
    'Marketing': '#E91E63'
  };

  // Colores para estados
  const statusColors = {
    'Pagado': '#4CAF50',
    'Pendiente': '#FF9800',
    'Anulado': '#F44336'
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
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
          borderBottom: '1px solid',
          borderColor: 'divider',
          background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
          color: 'white'
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <PurchaseIcon sx={{ fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Detalles de Compra
          </Typography>
          <Chip 
            label={purchase.id} 
            size="small" 
            sx={{ 
              ml: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontFamily: 'monospace',
              fontWeight: 600
            }} 
          />
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {/* Información Principal */}
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Información Principal
              </Typography>
              
              <Box display="flex" alignItems="flex-start" gap={1} mb={2}>
                <NotesIcon sx={{ color: 'text.secondary', mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Descripción
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {purchase.description}
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CalendarIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Fecha
                      </Typography>
                      <Typography variant="body2">
                        {formatDate(purchase.date)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <MoneyIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Monto
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        S/ {purchase.amount.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Clasificación */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Clasificación
              </Typography>
              
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Categoría
                </Typography>
                <Chip
                  label={purchase.category}
                  sx={{
                    backgroundColor: categoryColors[purchase.category],
                    color: 'white',
                    fontWeight: 500
                  }}
                />
              </Box>

              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Tipo de Pago
                </Typography>
                <Chip
                  label={purchase.paymentType}
                  variant="outlined"
                  sx={{
                    borderColor: purchase.paymentType === 'Al contado' ? '#4CAF50' : '#FF9800',
                    color: purchase.paymentType === 'Al contado' ? '#4CAF50' : '#FF9800',
                    fontWeight: 500
                  }}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Estado
                </Typography>
                <Chip
                  label={purchase.status}
                  sx={{
                    backgroundColor: statusColors[purchase.status],
                    color: 'white',
                    fontWeight: 500
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Comprobante */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Comprobante
              </Typography>
              
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <ReceiptIcon sx={{ color: 'text.secondary' }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tipo
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {purchase.voucher}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Número
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                  {purchase.voucherNumber}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Proveedor */}
          {purchase.supplier && (
            <Grid size={{ xs: 12 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Proveedor
                </Typography>
                
                <Box display="flex" alignItems="center" gap={1}>
                  <PersonIcon sx={{ color: 'text.secondary' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {purchase.supplier}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          )}

          {/* Notas */}
          {purchase.notes && (
            <Grid size={{ xs: 12 }}>
              <Paper sx={{ p: 3, bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'info.main' }}>
                  Notas
                </Typography>
                <Typography variant="body1" color="info.main">
                  {purchase.notes}
                </Typography>
              </Paper>
            </Grid>
          )}

          {/* Información de Auditoría */}
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Información de Auditoría
            </Typography>
            
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Creado por:</strong> {purchase.createdBy || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Fecha de creación:</strong> {purchase.createdAt ? formatDateTime(purchase.createdAt) : 'N/A'}
                </Typography>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Modificado por:</strong> {purchase.modifiedBy || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Última modificación:</strong> {purchase.lastModified ? formatDateTime(purchase.lastModified) : 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ minWidth: 100 }}
        >
          Cerrar
        </Button>
        
        {purchase.status === 'Pendiente' && (
          <Button
            variant="contained"
            color="success"
            startIcon={<PaymentIcon />}
            sx={{ 
              minWidth: 140,
              background: 'linear-gradient(45deg, #4caf50 30%, #2e7d32 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #2e7d32 30%, #1b5e20 90%)',
              }
            }}
          >
            Marcar Pagado
          </Button>
        )}
        
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          sx={{ 
            minWidth: 100,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2 30%, #1BA8D3 90%)',
            }
          }}
        >
          Editar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseDetailsModal;
