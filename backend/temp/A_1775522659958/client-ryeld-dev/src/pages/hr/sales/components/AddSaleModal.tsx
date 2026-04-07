import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Grid2 as Grid,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Alert,
  Autocomplete,
  Chip
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Receipt as ReceiptIcon,
  Work as WorkIcon,
  Payment as PaymentIcon,
  CalendarToday as CalendarIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { SaleStatus } from '../data/interfaces';

interface AddSaleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (saleData: NewSaleData) => void;
}

export interface NewSaleData {
  client: string;
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;
  concept: string;
  description: string;
  amount: number;
  voucher: 'Factura' | 'Boleta' | 'Recibo';
  dueDate: string;
  status: SaleStatus;
  technician?: string;
  servicePeriod?: string;
  equipmentDetails?: string;
  notes?: string;
}

const voucherTypes = ['Factura', 'Boleta', 'Recibo'];

const serviceTypes = [
  'Mantenimiento preventivo',
  'Mantenimiento correctivo',
  'Instalación de ascensor',
  'Modernización de ascensor',
  'Reparación de emergencia',
  'Inspección técnica',
  'Certificación de seguridad',
  'Cambio de componentes',
  'Servicio de limpieza',
  'Consultoría técnica'
];

const clients = [
  'Corporación Inmobiliaria del Perú S.A.',
  'Edificio Residencial Los Olivos',
  'Centro Comercial MegaPlaza',
  'Hospital Nacional Dos de Mayo',
  'Hotel Marriott Lima',
  'Torre Empresarial Banco de Crédito',
  'Clínica Ricardo Palma',
  'Universidad San Marcos',
  'Centro Comercial Jockey Plaza',
  'Oficinas Prime Miraflores'
];

const technicians = [
  'Carlos Rodriguez',
  'Miguel Santos',
  'Ana García',
  'Pedro Morales',
  'Luis Fernández',
  'Roberto Díaz',
  'José Martinez',
  'Francisco López'
];

export function AddSaleModal({ 
  open, 
  onClose, 
  onSubmit 
}: AddSaleModalProps) {
  const [saleData, setSaleData] = useState<NewSaleData>({
    client: '',
    clientPhone: '',
    clientEmail: '',
    clientAddress: '',
    concept: '',
    description: '',
    amount: 0,
    voucher: 'Factura',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 días desde hoy
    status: 'Por cobrar',
    technician: '',
    servicePeriod: '',
    equipmentDetails: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!saleData.client.trim()) {
      newErrors.client = 'El cliente es requerido';
    }

    if (!saleData.concept.trim()) {
      newErrors.concept = 'El concepto es requerido';
    }

    if (!saleData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (saleData.amount <= 0) {
      newErrors.amount = 'El monto debe ser mayor a 0';
    }

    if (!saleData.dueDate) {
      newErrors.dueDate = 'La fecha de vencimiento es requerida';
    } else {
      const dueDate = new Date(saleData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dueDate < today) {
        newErrors.dueDate = 'La fecha de vencimiento no puede ser anterior a hoy';
      }
    }

    if (saleData.clientEmail && !isValidEmail(saleData.clientEmail)) {
      newErrors.clientEmail = 'El email no tiene un formato válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(saleData);
      onClose();
      // Reset form
      setSaleData({
        client: '',
        clientPhone: '',
        clientEmail: '',
        clientAddress: '',
        concept: '',
        description: '',
        amount: 0,
        voucher: 'Factura',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Por cobrar',
        technician: '',
        servicePeriod: '',
        equipmentDetails: '',
        notes: ''
      });
      setErrors({});
    }
  };

  const handleChange = (field: keyof NewSaleData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    setSaleData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNumberChange = (field: keyof NewSaleData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value) || 0;
    setSaleData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAutocompleteChange = (field: keyof NewSaleData) => (
    _event: any,
    newValue: string | null
  ) => {
    setSaleData(prev => ({
      ...prev,
      [field]: newValue || ''
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#F8FAFC',
        borderBottom: '1px solid #F1F5F9'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AddIcon sx={{ color: '#476797' }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559' }}>
              Nueva Venta
            </Typography>
            <Typography variant="body2" sx={{ color: '#476797' }}>
              Registrar nueva venta para facturación
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#476797' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Información del Cliente */}
          <Grid size={12}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
              Información del Cliente
            </Typography>
            <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Autocomplete
                    freeSolo
                    options={clients}
                    value={saleData.client}
                    onChange={handleAutocompleteChange('client')}
                    onInputChange={(_event, newInputValue) => {
                      setSaleData(prev => ({
                        ...prev,
                        client: newInputValue
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Cliente"
                        required
                        error={!!errors.client}
                        helperText={errors.client}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <PersonIcon sx={{ color: '#476797', mr: 1 }} />
                          )
                        }}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                          key={index}
                        />
                      ))
                    }
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Teléfono"
                    value={saleData.clientPhone}
                    onChange={handleChange('clientPhone')}
                    fullWidth
                    placeholder="999 999 999"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Email"
                    type="email"
                    value={saleData.clientEmail}
                    onChange={handleChange('clientEmail')}
                    fullWidth
                    error={!!errors.clientEmail}
                    helperText={errors.clientEmail}
                    placeholder="cliente@empresa.com"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Dirección"
                    value={saleData.clientAddress}
                    onChange={handleChange('clientAddress')}
                    fullWidth
                    placeholder="Dirección del cliente"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Información de la Venta */}
          <Grid size={12}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
              Información de la Venta
            </Typography>
            <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 8 }}>
                  <Autocomplete
                    freeSolo
                    options={serviceTypes}
                    value={saleData.concept}
                    onChange={handleAutocompleteChange('concept')}
                    onInputChange={(_event, newInputValue) => {
                      setSaleData(prev => ({
                        ...prev,
                        concept: newInputValue
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Concepto de la Venta"
                        required
                        error={!!errors.concept}
                        helperText={errors.concept}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <WorkIcon sx={{ color: '#476797', mr: 1 }} />
                          )
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo de Comprobante</InputLabel>
                    <Select
                      value={saleData.voucher}
                      onChange={handleChange('voucher')}
                      label="Tipo de Comprobante"
                      startAdornment={
                        <ReceiptIcon sx={{ color: '#476797', mr: 1 }} />
                      }
                    >
                      {voucherTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Descripción del Servicio"
                    value={saleData.description}
                    onChange={handleChange('description')}
                    fullWidth
                    required
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description}
                    placeholder="Describe detalladamente el servicio a realizar..."
                    slotProps={{
                      input: {
                        startAdornment: (
                          <DescriptionIcon sx={{ color: '#476797', mr: 1, mt: 1 }} />
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Monto (S/)"
                    type="number"
                    value={saleData.amount}
                    onChange={handleNumberChange('amount')}
                    fullWidth
                    required
                    error={!!errors.amount}
                    helperText={errors.amount}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <PaymentIcon sx={{ color: '#476797', mr: 1 }} />
                        ),
                      },
                      htmlInput: { min: 0, step: 0.01 },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Fecha de Vencimiento"
                    type="date"
                    value={saleData.dueDate}
                    onChange={handleChange('dueDate')}
                    fullWidth
                    required
                    error={!!errors.dueDate}
                    helperText={errors.dueDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <CalendarIcon sx={{ color: '#476797', mr: 1 }} />
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={saleData.status}
                      onChange={handleChange('status')}
                      label="Estado"
                    >
                      <MenuItem value="Por cobrar">Por cobrar</MenuItem>
                      <MenuItem value="Pendiente">Pendiente</MenuItem>
                      <MenuItem value="Pagado">Pagado</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Información Técnica */}
          <Grid size={12}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
              Información Técnica (Opcional)
            </Typography>
            <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Autocomplete
                    freeSolo
                    options={technicians}
                    value={saleData.technician}
                    onChange={handleAutocompleteChange('technician')}
                    onInputChange={(_event, newInputValue) => {
                      setSaleData(prev => ({
                        ...prev,
                        technician: newInputValue
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Técnico Asignado"
                        placeholder="Seleccionar técnico..."
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Período de Servicio"
                    value={saleData.servicePeriod}
                    onChange={handleChange('servicePeriod')}
                    fullWidth
                    placeholder="Ej: Enero 2024, Trimestre 1, etc."
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Detalles de Equipos"
                    value={saleData.equipmentDetails}
                    onChange={handleChange('equipmentDetails')}
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Describe los equipos involucrados en el servicio..."
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Notas Adicionales"
                    value={saleData.notes}
                    onChange={handleChange('notes')}
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Información adicional relevante..."
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Alert informativo */}
        <Alert 
          severity="info" 
          sx={{ 
            mt: 3,
            bgcolor: '#E3F2FD',
            border: '1px solid #BBDEFB',
            '& .MuiAlert-icon': {
              color: '#1976D2'
            }
          }}
        >
          <Typography variant="body2">
            <strong>Importante:</strong> Una vez creada la venta, se generará automáticamente un número de comprobante.
            Puedes marcar la venta como pagada posteriormente desde la tabla de ventas.
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: '#F8FAFC' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: '#476797',
            color: '#476797',
            '&:hover': {
              borderColor: '#475569',
              bgcolor: 'rgba(100, 116, 139, 0.04)'
            }
          }}
        >
          Cancelar
        </Button>
        
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: '#476797',
            '&:hover': { bgcolor: '#3A5478' }
          }}
        >
          Crear Venta
        </Button>
      </DialogActions>
    </Dialog>
  );
}
