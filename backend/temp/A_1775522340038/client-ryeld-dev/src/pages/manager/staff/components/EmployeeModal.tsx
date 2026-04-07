import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  Alert,
} from '@mui/material';
import { Close, Person, Email, Phone, LocationOn, CalendarToday } from '@mui/icons-material';
import { CreateEmployeeRequest, UpdateEmployeeRequest, EmployeeCreateResponse } from '../types/employeeTypes';

interface EmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEmployeeRequest | UpdateEmployeeRequest) => Promise<EmployeeCreateResponse | null>;
  employee?: EmployeeCreateResponse | null;
  mode: 'create' | 'edit';
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  open,
  onClose,
  onSubmit,
  employee,
  mode
}) => {
  const [formData, setFormData] = useState<CreateEmployeeRequest>({
    name: '',
    lastName: '',
    dni: '',
    phone: '',
    personalEmail: '',
    workEmail: '',
    address: '',
    birthDate: '',
    hireDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && employee) {
      setFormData({
        name: employee.fullName.split(' ')[0] || '',
        lastName: employee.fullName.split(' ').slice(1).join(' ') || '',
        dni: employee.dni,
        phone: employee.phone,
        personalEmail: employee.personalEmail,
        workEmail: employee.workEmail,
        address: employee.address,
        birthDate: employee.birthDate,
        hireDate: employee.hireDate,
      });
    } else {
      setFormData({
        name: '',
        lastName: '',
        dni: '',
        phone: '',
        personalEmail: '',
        workEmail: '',
        address: '',
        birthDate: '',
        hireDate: new Date().toISOString().split('T')[0], // Default to today
      });
    }
    setErrors({});
    setSuccess(false);
  }, [mode, employee, open]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }

    if (!formData.dni.trim()) {
      newErrors.dni = 'El DNI es requerido';
    } else if (!/^\d{8}$/.test(formData.dni)) {
      newErrors.dni = 'El DNI debe tener 8 dígitos';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'El teléfono debe tener 9 dígitos';
    }

    if (!formData.personalEmail.trim()) {
      newErrors.personalEmail = 'El email personal es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalEmail)) {
      newErrors.personalEmail = 'Email inválido';
    }

    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'El email de trabajo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      newErrors.workEmail = 'Email inválido';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es requerida';
    }

    if (!formData.hireDate) {
      newErrors.hireDate = 'La fecha de contratación es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await onSubmit(formData);
      if (result) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof CreateEmployeeRequest, value: string) => {
    setFormData((prev: CreateEmployeeRequest) => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors((prev: { [key: string]: string }) => ({ ...prev, [field as string]: '' }));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Person sx={{ color: '#476797' }} />
            <Typography variant="h6" fontWeight={600} color="#1B2559">
              {mode === 'create' ? 'Crear Nuevo Empleado' : 'Editar Empleado'}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: '8px' }}>
            {mode === 'create' ? 'Empleado creado exitosamente' : 'Empleado actualizado exitosamente'}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Información Personal */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight={600} color="#476797" sx={{ mb: 2 }}>
              Información Personal
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Apellidos"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="DNI"
              value={formData.dni}
              onChange={(e) => handleChange('dni', e.target.value)}
              error={!!errors.dni}
              helperText={errors.dni}
              fullWidth
              placeholder="12345678"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Teléfono"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
              placeholder="999999999"
              inputProps={{
                type: 'number',
                maxLength: 9,             // limita a 9 caracteres
                inputMode: 'numeric',     // teclado numérico en móviles
                pattern: '[0-9]*',        // opcional, para validación nativa
              }}
              slotProps={{
                input: {
                  startAdornment: <Phone sx={{ mr: 1, color: 'action.active' }} />,
                },
              }}
            />
          </Grid>

          {/* Información de Contacto */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight={600} color="primary.main" sx={{ mb: 2 }}>
              Información de Contacto
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Email Personal"
              type="email"
              value={formData.personalEmail}
              onChange={(e) => handleChange('personalEmail', e.target.value)}
              error={!!errors.personalEmail}
              helperText={errors.personalEmail}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Email de Trabajo"
              type="email"
              value={formData.workEmail}
              onChange={(e) => handleChange('workEmail', e.target.value)}
              error={!!errors.workEmail}
              helperText={errors.workEmail}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />,
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Dirección"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
              fullWidth
              multiline
              rows={2}
              slotProps={{
                input: {
                  startAdornment: <LocationOn sx={{ mr: 1, color: 'action.active', alignSelf: 'flex-start', mt: 1 }} />,
                },
              }}
            />
          </Grid>

          {/* Fechas */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight={600} color="primary.main" sx={{ mb: 2 }}>
              Fechas
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Fecha de Nacimiento"
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
              error={!!errors.birthDate}
              helperText={errors.birthDate}
              fullWidth
              InputLabelProps={{ shrink: true }}
              slotProps={{
                input: {
                  startAdornment: <CalendarToday sx={{ mr: 1, color: 'action.active' }} />,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Fecha de Contratación"
              type="date"
              value={formData.hireDate}
              onChange={(e) => handleChange('hireDate', e.target.value)}
              error={!!errors.hireDate}
              helperText={errors.hireDate}
              fullWidth
              InputLabelProps={{ shrink: true }}
              slotProps={{
                input: {
                  startAdornment: <CalendarToday sx={{ mr: 1, color: 'action.active' }} />,
                },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: '#476797',
            color: '#476797',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || success}
          sx={{
            bgcolor: '#476797',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              bgcolor: '#3A5478',
            },
          }}
        >
          {loading ? 'Guardando...' : mode === 'create' ? 'Crear Empleado' : 'Actualizar Empleado'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
