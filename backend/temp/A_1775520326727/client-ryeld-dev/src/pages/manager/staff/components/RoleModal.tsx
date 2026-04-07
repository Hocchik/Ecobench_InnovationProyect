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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Role, CreateRoleRequest, UpdateRoleRequest } from '../types/roleTypes';
import { Area } from '../types/areaTypes';

interface RoleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateRoleRequest | UpdateRoleRequest) => Promise<boolean>;
  role?: Role | null;
  areas: Area[];
  mode: 'create' | 'edit';
}

export const RoleModal: React.FC<RoleModalProps> = ({
  open,
  onClose,
  onSubmit,
  role,
  areas,
  mode
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    areaId: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (mode === 'edit' && role) {
      setFormData({
        name: role.name,
        description: role.description || '',
        areaId: role.areaId,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        areaId: '',
      });
    }
    setErrors({});
  }, [mode, role, open]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del rol es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.areaId) {
      newErrors.areaId = 'Debe seleccionar un área';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const success = await onSubmit({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        areaId: formData.areaId,
      });

      if (success) {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
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
          <Typography variant="h6" fontWeight={600} color="#1B2559">
            {mode === 'create' ? 'Crear Nuevo Rol' : 'Editar Rol'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Nombre del Rol"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            placeholder="Ej: Técnico, Supervisor, Coordinador"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />

          <TextField
            label="Descripción"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
            multiline
            rows={2}
            placeholder="Descripción del rol (opcional)"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />

          <FormControl 
            fullWidth 
            error={!!errors.areaId}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          >
            <InputLabel>Área</InputLabel>
            <Select
              value={formData.areaId}
              onChange={(e) => handleChange('areaId', e.target.value)}
              label="Área"
            >
              {areas.map((area) => (
                <MenuItem key={area.id} value={area.id}>
                  {area.name}
                </MenuItem>
              ))}
            </Select>
            {errors.areaId && (
              <FormHelperText>{errors.areaId}</FormHelperText>
            )}
          </FormControl>
        </Box>
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
          disabled={loading || areas.length === 0}
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
          {loading ? 'Guardando...' : mode === 'create' ? 'Crear Rol' : 'Actualizar Rol'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
