/**
 * Modal de confirmación para marcar como pagado
 * Reutilizable para compras y servicios
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
  IconButton
} from '@mui/material';
import {
  Close as CloseIcon,
  Payment as PaymentIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';

interface MarkAsPaidModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  amount: number;
  isLoading?: boolean;
}

const MarkAsPaidModal: React.FC<MarkAsPaidModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  amount,
  isLoading = false
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
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
          borderColor: 'divider'
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <PaymentIcon sx={{ color: 'success.main', fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {message}
        </Typography>
        
        <Box 
          sx={{ 
            p: 3, 
            bgcolor: 'success.50', 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'success.200',
            textAlign: 'center'
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={1}>
            <MoneyIcon sx={{ color: 'success.main' }} />
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'success.main' }}>
              S/ {amount.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
            </Typography>
          </Box>
          <Typography variant="body2" color="success.main">
            Monto a confirmar como pagado
          </Typography>
        </Box>
        
        <Box 
          sx={{ 
            mt: 2, 
            p: 2, 
            bgcolor: 'info.50', 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'info.200'
          }}
        >
          <Typography variant="body2" sx={{ color: 'info.main', fontWeight: 500 }}>
            ℹ️ El estado cambiará a "Pagado" y se registrará la fecha de pago
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={isLoading}
          sx={{ minWidth: 100 }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="success"
          disabled={isLoading}
          startIcon={<PaymentIcon />}
          sx={{ 
            minWidth: 120,
            background: 'linear-gradient(45deg, #4caf50 30%, #2e7d32 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #2e7d32 30%, #1b5e20 90%)',
            }
          }}
        >
          {isLoading ? 'Procesando...' : 'Marcar Pagado'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MarkAsPaidModal;
