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
  TextField,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale';
import { SaleFormData } from '../data/interfaces';

interface AddSaleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (formData: SaleFormData) => void;
}

export const AddSaleModal: React.FC<AddSaleModalProps> = ({
  open,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<SaleFormData>({
    client: '',
    concept: '',
    voucher: 'RECIBO',
    amount: 0,
    dueDate: '',
    description: '',
    notes: ''
  });
  
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFormData({
      client: '',
      concept: '',
      voucher: 'RECIBO',
      amount: 0,
      dueDate: '',
      description: '',
      notes: ''
    });
    setDueDate(null);
    setErrors({});
  };

  React.useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  React.useEffect(() => {
    if (dueDate) {
      const formattedDate = `${dueDate.getDate()}-${getMonthName(dueDate.getMonth())}-${dueDate.getFullYear().toString().substr(2)}`;
      setFormData(prev => ({ ...prev, dueDate: formattedDate }));
    }
  }, [dueDate]);

  const getMonthName = (monthIndex: number) => {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return monthNames[monthIndex];
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData({ ...formData, [name]: value });
      
      // Clear error when field is changed
      if (errors[name]) {
        setErrors({ ...errors, [name]: '' });
      }
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    if (name) {
      setFormData({ ...formData, [name]: value });
      
      // Clear error when field is changed
      if (errors[name]) {
        setErrors({ ...errors, [name]: '' });
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.client.trim()) newErrors.client = 'El cliente es requerido';
    if (!formData.concept.trim()) newErrors.concept = 'El concepto es requerido';
    if (!formData.voucher.trim()) newErrors.voucher = 'El tipo de comprobante es requerido';
    if (formData.amount <= 0) newErrors.amount = 'El monto debe ser mayor a 0';
    if (!formData.dueDate.trim()) newErrors.dueDate = 'La fecha de vencimiento es requerida';
    if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      onClose();
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
          Nueva Venta
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: '0 24px 24px' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                label="Cliente"
                name="client"
                value={formData.client}
                onChange={handleTextFieldChange}
                fullWidth
                error={!!errors.client}
                helperText={errors.client}
                margin="normal"
                size="small"
              />
            </Grid>

            <Grid xs={12} md={6}>
              <FormControl fullWidth margin="normal" size="small">
                <InputLabel id="voucher-label">Tipo de comprobante</InputLabel>
                <Select
                  labelId="voucher-label"
                  name="voucher"
                  value={formData.voucher}
                  onChange={handleSelectChange}
                  label="Tipo de comprobante"
                  error={!!errors.voucher}
                >
                  <MenuItem value="RECIBO">RECIBO</MenuItem>
                  <MenuItem value="FACTURA">FACTURA</MenuItem>
                  <MenuItem value="BOLETA">BOLETA</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <TextField
                label="Concepto"
                name="concept"
                value={formData.concept}
                onChange={handleTextFieldChange}
                fullWidth
                error={!!errors.concept}
                helperText={errors.concept}
                margin="normal"
                size="small"
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                label="Monto"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleTextFieldChange}
                fullWidth
                error={!!errors.amount}
                helperText={errors.amount}
                margin="normal"
                size="small"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">S/</InputAdornment>,
                  },
                }}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                <DatePicker
                  label="Fecha de vencimiento"
                  value={dueDate}
                  onChange={setDueDate}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                      size: 'small',
                      error: !!errors.dueDate,
                      helperText: errors.dueDate
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid xs={12}>
              <TextField
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleTextFieldChange}
                multiline
                rows={3}
                fullWidth
                error={!!errors.description}
                helperText={errors.description}
                margin="normal"
                size="small"
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                label="Notas adicionales (opcional)"
                name="notes"
                value={formData.notes}
                onChange={handleTextFieldChange}
                multiline
                rows={2}
                fullWidth
                margin="normal"
                size="small"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              Guardar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
