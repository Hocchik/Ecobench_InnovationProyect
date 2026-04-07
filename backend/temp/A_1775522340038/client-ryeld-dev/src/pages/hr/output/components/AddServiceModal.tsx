/**
 * Modal para agregar nuevo servicio
 * Incluye formulario completo con validaciones
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Alert
} from '@mui/material';
import {
  Close as CloseIcon,
  Build as ServiceIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

// Datos y tipos
import type { NewServiceData } from '../data/interfaces';
import { createService } from '../api';

interface AddServiceModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

interface FormData {
  description: string;
  amount: string;
  serviceType: 'Luz' | 'Agua' | 'Internet' | 'Teléfono' | 'Gas' | 'Seguridad' | 'Limpieza' | 'Otros';
  supplier: string;
  accountNumber: string;
  dueDate: string;
  notes: string;
}

interface FormErrors {
  description?: string;
  amount?: string;
  supplier?: string;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  open,
  onClose,
  onSuccess,
  onError
}) => {
  // Estados del formulario
  const [formData, setFormData] = useState<FormData>({
    description: '',
    amount: '',
    serviceType: 'Otros',
    supplier: '',
    accountNumber: '',
    dueDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      description: '',
      amount: '',
      serviceType: 'Otros',
      supplier: '',
      accountNumber: '',
      dueDate: '',
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

    if (!formData.supplier.trim()) {
      newErrors.supplier = 'El proveedor es requerido';
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
      const serviceData: NewServiceData = {
        description: formData.description.trim(),
        amount: parseFloat(formData.amount),
        serviceType: formData.serviceType,
        supplier: formData.supplier.trim(),
        accountNumber: formData.accountNumber.trim() || undefined,
        dueDate: formData.dueDate || undefined,
        notes: formData.notes.trim() || undefined
      };

      await createService(serviceData);
      resetForm();
      onSuccess();
    } catch (err) {
      onError('Error al crear el servicio. Por favor, intente nuevamente.');
      console.error('Error creating service:', err);
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
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: '#3A5578',
            color: 'white'
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <ServiceIcon sx={{ fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Nuevo Servicio
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small" sx={{ color: 'white' }}>
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
                placeholder="Ej: Factura de energía eléctrica - Oficina Principal"
                multiline
                rows={2}
                required
              />
            </Grid>

            {/* Tipo de Servicio */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Servicio</InputLabel>
                <Select
                  value={formData.serviceType}
                  onChange={(e) => handleChange('serviceType', e.target.value as typeof formData.serviceType)}
                  label="Tipo de Servicio"
                >
                  <MenuItem value="Luz">Luz</MenuItem>
                  <MenuItem value="Agua">Agua</MenuItem>
                  <MenuItem value="Internet">Internet</MenuItem>
                  <MenuItem value="Teléfono">Teléfono</MenuItem>
                  <MenuItem value="Gas">Gas</MenuItem>
                  <MenuItem value="Seguridad">Seguridad</MenuItem>
                  <MenuItem value="Limpieza">Limpieza</MenuItem>
                  <MenuItem value="Otros">Otros</MenuItem>
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
              />
            </Grid>

            {/* Proveedor */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Proveedor"
                value={formData.supplier}
                onChange={(e) => handleChange('supplier', e.target.value)}
                error={!!errors.supplier}
                helperText={errors.supplier}
                placeholder="Ej: Luz del Sur"
                required
              />
            </Grid>

            {/* Número de Cuenta */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Número de Cuenta (opcional)"
                value={formData.accountNumber}
                onChange={(e) => handleChange('accountNumber', e.target.value)}
                placeholder="Ej: 123456789"
              />
            </Grid>

            {/* Fecha de Vencimiento */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Fecha de Vencimiento (opcional)"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            {/* Espaciador */}
            <Grid size={{ xs: 12, sm: 6 }}></Grid>

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
              />
            </Grid>
          </Grid>

          {/* Información adicional */}
          <Alert severity="info" sx={{ mt: 2 }}>
            El servicio se creará con estado "Pendiente" y podrá ser marcado como pagado posteriormente.
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
            {isLoading ? 'Creando...' : 'Crear Servicio'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddServiceModal;
