import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  AlertTitle
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import InventoryIcon from '@mui/icons-material/Inventory';

interface InventoryAuditDialogsProps {
  startDialogOpen: boolean;
  endDialogOpen: boolean;
  onStartConfirm: () => void;
  onEndConfirm: () => void;
  onStartCancel: () => void;
  onEndCancel: () => void;
  verifiedItems?: number;
  totalItems?: number;
  itemsWithDifferences?: number;
}

export const InventoryAuditDialogs: React.FC<InventoryAuditDialogsProps> = ({
  startDialogOpen,
  endDialogOpen,
  onStartConfirm,
  onEndConfirm,
  onStartCancel,
  onEndCancel,
  verifiedItems = 0,
  totalItems = 0,
  itemsWithDifferences = 0
}) => {
  return (
    <>
      {/* Diálogo de inicio de cuadre */}
      <Dialog
        open={startDialogOpen}
        onClose={onStartCancel}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            border: '2px solid #FFD93D'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2, 
          backgroundColor: '#FFF6E5',
          color: '#F59E0B',
          fontWeight: 'bold'
        }}>
          <InventoryIcon sx={{ fontSize: 32 }} />
          Iniciar Cuadre de Inventario
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Alert 
            severity="warning"
            sx={{ 
              mb: 3,
              backgroundColor: '#FFF6E5',
              border: '1px solid #FFD93D'
            }}
          >
            <AlertTitle sx={{ fontWeight: 'bold' }}>¡Atención!</AlertTitle>
            Está a punto de iniciar el proceso de cuadre de inventario.
          </Alert>

          <Typography variant="body1" sx={{ mb: 2 }}>
            Durante este proceso:
          </Typography>

          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              La interfaz cambiará a modo auditoría (fondo rojo)
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Deberá ingresar la cantidad física real de cada artículo
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              El sistema calculará automáticamente las diferencias
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Debe verificar cada artículo antes de finalizar
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            ¿Está seguro que desea iniciar el cuadre de inventario?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button 
            onClick={onStartCancel}
            variant="outlined"
            sx={{ 
              borderColor: '#E5E7EB',
              color: '#6B7280',
              '&:hover': {
                borderColor: '#D1D5DB',
                backgroundColor: '#F9FAFB'
              }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={onStartConfirm}
            variant="contained"
            sx={{ 
              backgroundColor: '#F59E0B',
              '&:hover': {
                backgroundColor: '#D97706'
              }
            }}
          >
            Iniciar Cuadre
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de finalización de cuadre */}
      <Dialog
        open={endDialogOpen}
        onClose={onEndCancel}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            border: '2px solid #FF4842'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2, 
          backgroundColor: '#FFE4E4',
          color: '#DC2626',
          fontWeight: 'bold'
        }}>
          <WarningIcon sx={{ fontSize: 32 }} />
          Finalizar Cuadre de Inventario
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Alert 
            severity="error"
            sx={{ 
              mb: 3,
              backgroundColor: '#FFE4E4',
              border: '1px solid #FF4842'
            }}
          >
            <AlertTitle sx={{ fontWeight: 'bold' }}>Confirmar Finalización</AlertTitle>
            Una vez finalizado, no podrá modificar los datos del cuadre.
          </Alert>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Resumen del Cuadre:
            </Typography>
            
            <Box sx={{ 
              backgroundColor: '#F8FAFC', 
              p: 2, 
              borderRadius: '8px',
              border: '1px solid #E2E8F0'
            }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Items verificados:</strong> {verifiedItems} de {totalItems}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Items con diferencias:</strong> {itemsWithDifferences}
              </Typography>
              <Typography variant="body2">
                <strong>Progreso:</strong> {totalItems > 0 ? Math.round((verifiedItems / totalItems) * 100) : 0}%
              </Typography>
            </Box>
          </Box>

          {verifiedItems < totalItems && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              <AlertTitle>Items sin verificar</AlertTitle>
              Aún hay {totalItems - verifiedItems} items sin verificar. ¿Está seguro que desea finalizar?
            </Alert>
          )}

          <Typography variant="body2" color="text.secondary">
            ¿Confirma que desea finalizar el cuadre de inventario?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button 
            onClick={onEndCancel}
            variant="outlined"
            sx={{ 
              borderColor: '#E5E7EB',
              color: '#6B7280',
              '&:hover': {
                borderColor: '#D1D5DB',
                backgroundColor: '#F9FAFB'
              }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={onEndConfirm}
            variant="contained"
            color="error"
            sx={{ 
              backgroundColor: '#DC2626',
              '&:hover': {
                backgroundColor: '#B91C1C'
              }
            }}
          >
            Finalizar Cuadre
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
