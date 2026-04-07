import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { SaleDetail, SaleStatus } from '../data/interfaces';

interface SaleDetailsModalProps {
  open: boolean;
  onClose: () => void;
  sale: SaleDetail | null;
  onStatusChange: (saleId: string, newStatus: SaleStatus, paymentProof?: File) => void;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const SaleDetailsModal: React.FC<SaleDetailsModalProps> = ({
  open,
  onClose,
  sale,
  onStatusChange
}) => {
  const [newStatus, setNewStatus] = useState<SaleStatus | ''>('');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  React.useEffect(() => {
    if (sale) {
      setNewStatus(sale.status);
      setPaymentProof(null);
      setFileName('');
      setPreviewUrl(null);
    }
  }, [sale]);

  const handleStatusChange = (event: SelectChangeEvent) => {
    setNewStatus(event.target.value as SaleStatus);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPaymentProof(file);
      setFileName(file.name);
      
      // Crear URL para la vista previa
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };
  
  // Limpiar las URLs de los objetos cuando el componente se desmonte
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSaveChanges = () => {
    if (sale && newStatus) {
      onStatusChange(sale.id, newStatus, paymentProof || undefined);
      onClose();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (!sale) return null;

  const canChangeStatus = sale.status !== 'Pagado';
  const requiresProof = newStatus === 'Pendiente';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          padding: '8px'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px'
      }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          Detalle de Venta
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: '0 24px 24px' }}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Paper sx={{ p: 3, borderRadius: '20px' }}>
              <Typography variant="h6" gutterBottom fontWeight="medium">
                Información de la venta
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid xs={12} md={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Cliente</Typography>
                    <Typography variant="body1" fontWeight="medium">{sale.client}</Typography>
                  </Box>
                </Grid>

                <Grid xs={12} md={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Concepto</Typography>
                    <Typography variant="body1">{sale.concept}</Typography>
                  </Box>
                </Grid>

                <Grid xs={12} md={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Comprobante</Typography>
                    <Typography variant="body1">{sale.voucher}</Typography>
                  </Box>
                </Grid>

                <Grid xs={12} md={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Número de comprobante</Typography>
                    <Typography variant="body1">{sale.voucherNumber}</Typography>
                  </Box>
                </Grid>

                <Grid xs={12} md={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Monto</Typography>
                    <Typography variant="body1" fontWeight="medium" color="primary.main">
                      {formatCurrency(sale.amount)}
                    </Typography>
                  </Box>
                </Grid>

                <Grid xs={12} md={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Estado</Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 
                          sale.status === 'Pagado' ? 'success.main' : 
                          sale.status === 'Pendiente' ? 'warning.main' : 
                          sale.status === 'Anulado' ? 'error.main' : 
                          'info.main',
                        fontWeight: 'medium' 
                      }}
                    >
                      {sale.status}
                    </Typography>
                  </Box>
                </Grid>

                <Grid xs={12} md={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Fecha de vencimiento</Typography>
                    <Typography variant="body1">{sale.dueDate}</Typography>
                  </Box>
                </Grid>

                <Grid xs={12} md={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Fecha de pago</Typography>
                    <Typography variant="body1">{sale.paymentDate || '-'}</Typography>
                  </Box>
                </Grid>

                <Grid xs={12}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Descripción</Typography>
                    <Typography variant="body1">{sale.description}</Typography>
                  </Box>
                </Grid>

                {sale.notes && (
                  <Grid xs={12}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Notas</Typography>
                      <Typography variant="body1">{sale.notes}</Typography>
                    </Box>
                  </Grid>
                )}

                {sale.status === 'Pagado' && (
                  <>
                    <Grid xs={12} md={6}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Método de pago</Typography>
                        <Typography variant="body1">{sale.paymentMethod}</Typography>
                      </Box>
                    </Grid>
                    
                    <Grid xs={12} md={6}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Cuenta bancaria</Typography>
                        <Typography variant="body1">{sale.bankAccount}</Typography>
                      </Box>
                    </Grid>
                    
                    <Grid xs={12} md={6}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Número de operación</Typography>
                        <Typography variant="body1">{sale.operationNumber}</Typography>
                      </Box>
                    </Grid>
                  </>
                )}

                {sale.paymentProof && (
                  <Grid xs={12}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>Comprobante de pago</Typography>
                      <Box 
                        component="img" 
                        src={`/imgs/payment_proofs/${sale.paymentProof}`} 
                        alt="Comprobante de pago"
                        sx={{ 
                          maxWidth: '100%', 
                          maxHeight: '200px',
                          objectFit: 'contain',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor: 'divider'
                        }}
                      />
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>

          {canChangeStatus && (
            <Grid xs={12}>
              <Paper sx={{ p: 3, borderRadius: '20px', mt: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Cambiar estado
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="status-select-label">Estado</InputLabel>
                        <Select
                          labelId="status-select-label"
                          id="status-select"
                          value={newStatus}
                          label="Estado"
                          onChange={handleStatusChange}
                        >
                          <MenuItem value="Pendiente">Pendiente</MenuItem>
                          <MenuItem value="Anulado">Anulado</MenuItem>
                          <MenuItem value="Por cobrar">Por cobrar</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    {requiresProof && (
                      <Grid xs={12} md={6}>
                        <Button
                          component="label"
                          variant="outlined"
                          startIcon={<CloudUploadIcon />}
                          fullWidth
                          sx={{ height: '40px' }}
                        >
                          {fileName || "Adjuntar comprobante"}
                          <VisuallyHiddenInput type="file" onChange={handleFileChange} accept="image/*" />
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                  
                  {requiresProof && previewUrl && (
                    <Box sx={{ mt: 3, p: 2, border: '1px dashed', borderColor: 'divider', borderRadius: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Vista previa del comprobante
                      </Typography>
                      <Box
                        component="img"
                        src={previewUrl}
                        alt="Vista previa del comprobante"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          objectFit: 'contain',
                          display: 'block',
                          mx: 'auto',
                          mt: 1,
                          borderRadius: 1,
                        }}
                      />
                    </Box>
                  )}
                  
                  {requiresProof && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                      * Para cambiar a estado "Pendiente" es necesario adjuntar una imagen como prueba del pago
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
            Cancelar
          </Button>
          {canChangeStatus && (
            <Button 
              variant="contained" 
              onClick={handleSaveChanges}
              disabled={requiresProof && !paymentProof}
            >
              Guardar cambios
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
