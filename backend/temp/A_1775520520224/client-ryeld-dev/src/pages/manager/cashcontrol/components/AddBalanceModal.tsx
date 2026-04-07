import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Paper,
  Alert,
  InputAdornment
} from '@mui/material';
import { Close, CloudUpload, AttachMoney } from '@mui/icons-material';
import { AddBalanceModalProps, AddBalanceData } from '../types/cashControlTypes';

export const AddBalanceModal: React.FC<AddBalanceModalProps> = ({
  open,
  onClose,
  onSubmit,
  title
}) => {
  const [formData, setFormData] = useState<AddBalanceData>({
    amount: 0,
    reason: '',
    date: new Date().toISOString().split('T')[0], // Fecha de hoy por defecto
    evidenceImage: null
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (field: keyof AddBalanceData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'amount' ? parseFloat(event.target.value) || 0 : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error cuando el usuario comience a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          evidenceImage: 'Por favor selecciona un archivo de imagen válido'
        }));
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          evidenceImage: 'La imagen no debe superar los 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        evidenceImage: file
      }));

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Limpiar error
      setErrors(prev => ({
        ...prev,
        evidenceImage: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (formData.amount <= 0) {
      newErrors.amount = 'El monto debe ser mayor a 0';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'El motivo es obligatorio';
    }

    if (!formData.date) {
      newErrors.date = 'La fecha es obligatoria';
    }

    if (!formData.evidenceImage) {
      newErrors.evidenceImage = 'La imagen de evidencia es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      amount: 0,
      reason: '',
      date: new Date().toISOString().split('T')[0],
      evidenceImage: null
    });
    setErrors({});
    setImagePreview(null);
    onClose();
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      evidenceImage: null
    }));
    setImagePreview(null);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
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
          bgcolor: '#F8F9FF',
          borderBottom: '1px solid #E2E8F0',
          pb: 2
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="#1B2559">
          {title}
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Monto */}
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" mb={1} color="#1B2559">
              Monto a Agregar *
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={formData.amount || ''}
              onChange={handleInputChange('amount')}
              placeholder="0.00"
              error={!!errors.amount}
              helperText={errors.amount}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney sx={{ color: '#476797' }} />
                    </InputAdornment>
                  ),
                },
                htmlInput: { min: 0, step: 0.01 }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  bgcolor: 'white'
                }
              }}
            />
          </Box>

          {/* Motivo */}
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" mb={1} color="#1B2559">
              Motivo *
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={formData.reason}
              onChange={handleInputChange('reason')}
              placeholder="Describe el motivo del ingreso de saldo..."
              error={!!errors.reason}
              helperText={errors.reason}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  bgcolor: 'white'
                }
              }}
            />
          </Box>

          {/* Fecha */}
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" mb={1} color="#1B2559">
              Fecha *
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={formData.date}
              onChange={handleInputChange('date')}
              error={!!errors.date}
              helperText={errors.date}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  bgcolor: 'white'
                }
              }}
            />
          </Box>

          {/* Imagen de evidencia */}
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" mb={1} color="#1B2559">
              Imagen de Evidencia *
            </Typography>
            <Typography variant="caption" color="text.secondary" mb={2} display="block">
              Sube una imagen que evidencie la transferencia (máx. 5MB)
            </Typography>

            {!imagePreview ? (
              <Paper
                sx={{
                  border: `2px dashed ${errors.evidenceImage ? '#ff4444' : '#E2E8F0'}`,
                  borderRadius: '20px',
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#476797',
                    bgcolor: '#F8F9FF'
                  }
                }}
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <CloudUpload sx={{ fontSize: 48, color: '#476797', mb: 1 }} />
                <Typography variant="body2" fontWeight="bold" color="#476797" mb={0.5}>
                  Haz clic para subir una imagen
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  JPG, PNG, GIF (máx. 5MB)
                </Typography>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </Paper>
            ) : (
              <Paper
                sx={{
                  borderRadius: '20px',
                  p: 2,
                  border: '1px solid #E2E8F0'
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    style={{
                      width: '100%',
                      maxHeight: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  <IconButton
                    onClick={removeImage}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
                    }}
                    size="small"
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {formData.evidenceImage?.name}
                </Typography>
              </Paper>
            )}

            {errors.evidenceImage && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errors.evidenceImage}
              </Alert>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, gap: 1 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: '8px',
            color: '#476797',
            borderColor: '#476797',
            '&:hover': {
              borderColor: '#3A5478',
              bgcolor: '#F8F9FF'
            }
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            borderRadius: '8px',
            bgcolor: '#476797',
            color: 'white',
            px: 3,
            '&:hover': {
              bgcolor: '#3A5578'
            }
          }}
        >
          Agregar Saldo
        </Button>
      </DialogActions>
    </Dialog>
  );
};
