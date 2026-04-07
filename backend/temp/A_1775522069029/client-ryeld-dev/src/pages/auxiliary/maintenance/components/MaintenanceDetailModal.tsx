import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  TextField,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MaintenanceDetail } from '../data/interfaces';

interface MaintenanceDetailModalProps {
  open: boolean;
  onClose: () => void;
  detail: MaintenanceDetail | null;
}

export const MaintenanceDetailModal: React.FC<MaintenanceDetailModalProps> = ({
  open,
  onClose,
  detail
}) => {
  if (!detail) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          maxHeight: '90vh'
        }
      }}
    >
      <Box sx={{ 
        p: 3,
        position: 'relative'
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={onClose}
              sx={{ 
                bgcolor: '#F4F7FE',
                width: 40,
                height: 40,
                '&:hover': { bgcolor: '#E2E8F0' }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold">
              Mantenimiento {detail.tipoMantenimiento} Alva Nro {detail.id}
            </Typography>
          </Box>
          
          <IconButton
            onClick={onClose}
            sx={{ 
              position: 'absolute',
              right: 16,
              top: 16,
              color: '#A3AED0'
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 0 }}>
          {/* Información del mantenimiento */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr',
              gap: 3,
              mb: 3
            }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Mes
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {detail.mes}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Edificio
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {detail.edificio}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Tipo de Mantenimiento
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {detail.tipoMantenimiento}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Tipo de Ascensor
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {detail.tipoAscensor}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Hora propuesta
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {detail.horaPropuesta}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Fecha Programación
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {detail.fechaProgramacion}
                </Typography>
              </Box>

              <Box sx={{ gridColumn: 'span 2' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Fecha Real Programación
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {detail.fechaRealProgramacion}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Sección de motivo */}
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Motivo
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              placeholder="Escribe el motivo del servicio"
              value={detail.motivo || ''}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#F8FAFC',
                },
              }}
            />
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};
