/**
 * Modal de formulario para agregar/editar cliente
 * Incluye validación y manejo de formularios
 */

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid2 as Grid,
  IconButton,
  Alert,
  InputAdornment
} from '@mui/material';
import {
  Close as CloseIcon,
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Description as NotesIcon
} from '@mui/icons-material';
import { Client } from '../data/clientsData';

interface AddClientModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (client: Omit<Client, 'id'>) => void;
  editClient?: Client | null;
}

interface FormData {
  name: string;
  address: string;
  district: string;
  phone: string;
  email: string;
  contactPerson: string;
  elevatorCount: number;
  status: 'Activo' | 'Inactivo' | 'Pendiente' | 'Suspendido';
  contractType: 'Mantenimiento' | 'Instalación' | 'Modernización' | 'Consultoría';
  ruc: string;
  emergencyContact: string;
  notes: string;
}

interface ValidationErrors {
  name?: string;
  address?: string;
  district?: string;
  phone?: string;
  email?: string;
  contactPerson?: string;
  elevatorCount?: string;
  ruc?: string;
  emergencyContact?: string;
}

const initialFormData: FormData = {
  name: '',
  address: '',
  district: '',
  phone: '',
  email: '',
  contactPerson: '',
  elevatorCount: 1,
  status: 'Pendiente',
  contractType: 'Mantenimiento',
  ruc: '',
  emergencyContact: '',
  notes: ''
};

const districts = [
  'Ancón', 'Ate', 'Barranco', 'Breña', 'Carabayllo', 'Chaclacayo', 'Chorrillos',
  'Cieneguilla', 'Comas', 'El Agustino', 'Independencia', 'Jesús María',
  'La Molina', 'La Victoria', 'Lima', 'Lince', 'Los Olivos', 'Lurigancho',
  'Lurín', 'Magdalena del Mar', 'Miraflores', 'Pachacámac', 'Pucusana',
  'Pueblo Libre', 'Puente Piedra', 'Punta Hermosa', 'Punta Negra',
  'Rímac', 'San Bartolo', 'San Borja', 'San Isidro', 'San Juan de Lurigancho',
  'San Juan de Miraflores', 'San Luis', 'San Martín de Porres', 'San Miguel',
  'Santa Anita', 'Santa María del Mar', 'Santa Rosa', 'Santiago de Surco',
  'Surquillo', 'Villa El Salvador', 'Villa María del Triunfo'
];

export const AddClientModal: React.FC<AddClientModalProps> = ({
  open,
  onClose,
  onSave,
  editClient
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!editClient;

  useEffect(() => {
    if (editClient) {
      setFormData({
        name: editClient.name,
        address: editClient.address,
        district: editClient.district,
        phone: editClient.phone,
        email: editClient.email,
        contactPerson: editClient.contactPerson,
        elevatorCount: editClient.elevatorCount,
        status: editClient.status,
        contractType: editClient.contractType,
        ruc: editClient.ruc || '',
        emergencyContact: editClient.emergencyContact || '',
        notes: editClient.notes || ''
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [editClient, open]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del cliente es requerido';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    if (!formData.district) {
      newErrors.district = 'El distrito es requerido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Formato de teléfono inválido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de correo electrónico inválido';
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'La persona de contacto es requerida';
    }

    if (formData.elevatorCount < 1) {
      newErrors.elevatorCount = 'Debe haber al menos 1 ascensor';
    }

    if (formData.ruc && !/^\d{11}$/.test(formData.ruc)) {
      newErrors.ruc = 'El RUC debe tener 11 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = field === 'elevatorCount' ? parseInt(event.target.value) || 0 : event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field if it's a validatable field
    const validatableFields: (keyof ValidationErrors)[] = [
      'name', 'address', 'district', 'phone', 'email', 'contactPerson', 'elevatorCount', 'ruc', 'emergencyContact'
    ];
    if (validatableFields.includes(field as keyof ValidationErrors) && errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSelectChange = (field: keyof FormData) => (
    event: any
  ) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const clientData = {
        ...formData,
        registrationDate: editClient?.registrationDate || new Date().toISOString().split('T')[0],
        lastService: editClient?.lastService
      };
      
      await onSave(clientData);
      onClose();
    } catch (error) {
      console.error('Error saving client:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '20px',
              bgcolor: 'rgba(71, 103, 151, 0.1)',
              color: '#476797'
            }}
          >
            {isEditing ? <EditIcon /> : <PersonAddIcon />}
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} color="#1B2559">
              {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
            </Typography>
            <Typography variant="body2" color="#718096">
              {isEditing ? 'Modifica la información del cliente' : 'Completa los datos del nuevo cliente'}
            </Typography>
          </Box>
        </Box>
        
        <IconButton
          onClick={handleClose}
          sx={{
            color: '#A0AEC0',
            '&:hover': {
              color: '#718096',
              bgcolor: '#F7FAFC'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Información básica */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" fontWeight={600} color="#2D3748" gutterBottom>
              Información Básica
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              label="Nombre del Cliente"
              value={formData.name}
              onChange={handleInputChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                value={formData.status}
                onChange={handleSelectChange('status')}
                label="Estado"
              >
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="Pendiente">Pendiente</MenuItem>
                <MenuItem value="Suspendido">Suspendido</MenuItem>
                <MenuItem value="Inactivo">Inactivo</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              label="Dirección"
              value={formData.address}
              onChange={handleInputChange('address')}
              error={!!errors.address}
              helperText={errors.address}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth error={!!errors.district} required>
              <InputLabel>Distrito</InputLabel>
              <Select
                value={formData.district}
                onChange={handleSelectChange('district')}
                label="Distrito"
              >
                {districts.map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Información de contacto */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" fontWeight={600} color="#2D3748" gutterBottom sx={{ mt: 2 }}>
              Información de Contacto
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Persona de Contacto"
              value={formData.contactPerson}
              onChange={handleInputChange('contactPerson')}
              error={!!errors.contactPerson}
              helperText={errors.contactPerson}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Teléfono"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              error={!!errors.phone}
              helperText={errors.phone}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Contacto de Emergencia"
              value={formData.emergencyContact}
              onChange={handleInputChange('emergencyContact')}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          {/* Información del servicio */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" fontWeight={600} color="#2D3748" gutterBottom sx={{ mt: 2 }}>
              Información del Servicio
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Cantidad de Ascensores"
              type="number"
              value={formData.elevatorCount}
              onChange={handleInputChange('elevatorCount')}
              error={!!errors.elevatorCount}
              helperText={errors.elevatorCount}
              required
              slotProps={{ htmlInput: { min: 1 } }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Contrato</InputLabel>
              <Select
                value={formData.contractType}
                onChange={handleSelectChange('contractType')}
                label="Tipo de Contrato"
              >
                <MenuItem value="Mantenimiento">Mantenimiento</MenuItem>
                <MenuItem value="Instalación">Instalación</MenuItem>
                <MenuItem value="Modernización">Modernización</MenuItem>
                <MenuItem value="Consultoría">Consultoría</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="RUC (Opcional)"
              value={formData.ruc}
              onChange={handleInputChange('ruc')}
              error={!!errors.ruc}
              helperText={errors.ruc || 'Debe tener 11 dígitos'}
              slotProps={{ htmlInput: { maxLength: 11 } }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Notas Adicionales"
              multiline
              rows={3}
              value={formData.notes}
              onChange={handleInputChange('notes')}
              placeholder="Información adicional sobre el cliente..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                      <NotesIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid>

        {Object.keys(errors).length > 0 && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Por favor, corrige los errores en el formulario
          </Alert>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          borderTop: '1px solid #E2E8F0',
          gap: 2
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          disabled={isSubmitting}
          sx={{
            borderColor: '#E2E8F0',
            color: '#4A5568',
            '&:hover': {
              borderColor: '#CBD5E0',
              bgcolor: '#F7FAFC'
            }
          }}
        >
          Cancelar
        </Button>
        
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
          sx={{
            bgcolor: '#476797',
            '&:hover': {
              bgcolor: '#3A5578'
            }
          }}
        >
          {isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Cliente')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
