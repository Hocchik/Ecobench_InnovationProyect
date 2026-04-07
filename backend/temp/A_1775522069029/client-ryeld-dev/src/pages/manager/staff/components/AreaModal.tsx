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
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Area, CreateAreaRequest, UpdateAreaRequest } from '../types/areaTypes';

interface AreaModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAreaRequest | UpdateAreaRequest) => Promise<boolean>;
  area?: Area | null;
  mode: 'create' | 'edit';
}

export const AreaModal: React.FC<AreaModalProps> = ({
  open,
  onClose,
  onSubmit,
  area,
  mode
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (mode === 'edit' && area) {
      setFormData({
        name: area.name,
        description: area.description || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
      });
    }
    setErrors({});
  }, [mode, area, open]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del área es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
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
            {mode === 'create' ? 'Crear Nueva Área' : 'Editar Área'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Nombre del Área"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            placeholder="Ej: Operaciones, Ventas, Recursos Humanos"
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
            rows={3}
            placeholder="Descripción del área (opcional)"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />
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
          disabled={loading}
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
          {loading ? 'Guardando...' : mode === 'create' ? 'Crear Área' : 'Actualizar Área'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
