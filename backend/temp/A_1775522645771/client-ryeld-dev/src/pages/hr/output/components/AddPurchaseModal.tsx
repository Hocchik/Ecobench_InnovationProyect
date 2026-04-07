/**
 * Modal para agregar nueva compra
 */

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid2 as Grid,
  Typography,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Alert
} from '@mui/material';
import {
  Close as CloseIcon,
  ShoppingCart as PurchaseIcon,
  AttachMoney as MoneyIcon,
  ReceiptLong as ReceiptIcon
} from '@mui/icons-material';

// Importar tipos e interfaces
import type { PaymentType, PurchaseCategory, VoucherType } from '../data/interfaces';

interface AddPurchaseModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

interface FormData {
  description: string;
  amount: string;
  category: PurchaseCategory;
  paymentType: PaymentType;
  voucher: VoucherType;
  voucherNumber: string;
  supplier: string;
  notes: string;
}

interface FormErrors {
  description?: string;
  amount?: string;
  voucherNumber?: string;
}

const AddPurchaseModal: React.FC<AddPurchaseModalProps> = ({
  open,
  onClose,
  onSuccess,
  onError
}) => {
  // Estados del formulario
  const [formData, setFormData] = useState<FormData>({
    description: '',
    amount: '',
    category: 'Oficina',
    paymentType: 'Al contado',
    voucher: 'Factura',
    voucherNumber: '',
    supplier: '',
    notes: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      description: '',
      amount: '',
      category: 'Oficina',
      paymentType: 'Al contado',
      voucher: 'Factura',
      voucherNumber: '',
      supplier: '',
      notes: ''
    });
    setErrors({});
  };

  // Manejar cambios en el formulario
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'El monto es requerido';
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = 'El monto debe ser un número válido mayor a 0';
      }
    }

    if (!formData.voucherNumber.trim()) {
      newErrors.voucherNumber = 'El número de comprobante es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulación de API call - aquí iría la llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      resetForm();
      onSuccess();
    } catch (err) {
      onError('Error al crear la compra. Por favor, intente nuevamente.');
      console.error('Error creating purchase:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar cierre del modal
  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 2,
          borderBottom: '1px solid #E2E8F0'
        }}>
          <Box display="flex" alignItems="center" gap={1}>
            <PurchaseIcon sx={{ color: '#3A5578' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559' }}>
              Nueva Compra
            </Typography>
          </Box>
          <IconButton 
            onClick={handleClose}
            disabled={isLoading}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {/* Descripción */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Descripción"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                placeholder="Describe el motivo de la compra..."
                multiline
                rows={2}
                required
                disabled={isLoading}
              />
            </Grid>

            {/* Categoría */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value as PurchaseCategory)}
                  label="Categoría"
                  disabled={isLoading}
                >
                  <MenuItem value="Pasaje">Pasaje</MenuItem>
                  <MenuItem value="Tecnología">Tecnología</MenuItem>
                  <MenuItem value="Muebles">Muebles</MenuItem>
                  <MenuItem value="Oficina">Oficina</MenuItem>
                  <MenuItem value="Mantenimiento">Mantenimiento</MenuItem>
                  <MenuItem value="Alimentación">Alimentación</MenuItem>
                  <MenuItem value="Capacitación">Capacitación</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Monto */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Monto"
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                error={!!errors.amount}
                helperText={errors.amount}
                placeholder="0.00"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MoneyIcon sx={{ color: 'text.secondary' }} />
                        S/
                      </InputAdornment>
                    ),
                  },
                  htmlInput: {
                    step: 0.01,
                    min: 0
                  },
                }}
                required
                disabled={isLoading}
              />
            </Grid>

            {/* Tipo de Pago */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Pago</InputLabel>
                <Select
                  value={formData.paymentType}
                  onChange={(e) => handleChange('paymentType', e.target.value as PaymentType)}
                  label="Tipo de Pago"
                  disabled={isLoading}
                >
                  <MenuItem value="Al contado">Al contado</MenuItem>
                  <MenuItem value="A crédito">A crédito</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Tipo de Comprobante */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Comprobante</InputLabel>
                <Select
                  value={formData.voucher}
                  onChange={(e) => handleChange('voucher', e.target.value as VoucherType)}
                  label="Tipo de Comprobante"
                  disabled={isLoading}
                >
                  <MenuItem value="Factura">Factura</MenuItem>
                  <MenuItem value="Boleta">Boleta</MenuItem>
                  <MenuItem value="Recibo">Recibo</MenuItem>
                  <MenuItem value="Nota de Crédito">Nota de Crédito</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Número de Comprobante */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Número de Comprobante"
                value={formData.voucherNumber}
                onChange={(e) => handleChange('voucherNumber', e.target.value)}
                error={!!errors.voucherNumber}
                helperText={errors.voucherNumber}
                placeholder="Ej: F001-12345"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <ReceiptIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  },
                }}
                required
                disabled={isLoading}
              />
            </Grid>

            {/* Proveedor */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Proveedor (opcional)"
                value={formData.supplier}
                onChange={(e) => handleChange('supplier', e.target.value)}
                placeholder="Nombre del proveedor"
                disabled={isLoading}
              />
            </Grid>

            {/* Notas */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Notas (opcional)"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Observaciones adicionales..."
                multiline
                rows={3}
                disabled={isLoading}
              />
            </Grid>
          </Grid>

          {/* Información adicional */}
          <Alert severity="info" sx={{ mt: 2 }}>
            La compra se creará con estado "Pendiente" y podrá ser marcada como pagada posteriormente.
          </Alert>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            disabled={isLoading}
            sx={{ minWidth: 100 }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{ 
              minWidth: 120,
              bgcolor: '#3A5578',
              '&:hover': {
                bgcolor: '#2E4460',
              }
            }}
          >
            {isLoading ? 'Creando...' : 'Crear Compra'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPurchaseModal;
