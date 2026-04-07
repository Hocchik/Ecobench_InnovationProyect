/**
 * Modal de confirmación para eliminar elementos
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
  Warning as WarningIcon
} from '@mui/icons-material';

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
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
          <WarningIcon sx={{ color: 'error.main', fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
        
        <Box 
          sx={{ 
            mt: 2, 
            p: 2, 
            bgcolor: 'error.50', 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'error.200'
          }}
        >
          <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 500 }}>
            ⚠️ Esta acción no se puede deshacer
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
          color="error"
          disabled={isLoading}
          sx={{ 
            minWidth: 100,
            background: 'linear-gradient(45deg, #f44336 30%, #d32f2f 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #d32f2f 30%, #b71c1c 90%)',
            }
          }}
        >
          {isLoading ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmModal;
