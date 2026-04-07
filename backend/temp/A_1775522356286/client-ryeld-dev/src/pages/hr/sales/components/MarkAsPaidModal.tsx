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
  Alert,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material';
import {
  Close as CloseIcon,
  Payment as PaymentIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { SaleDetail, PaymentMethod } from '../data/interfaces';

interface MarkAsPaidModalProps {
  open: boolean;
  onClose: () => void;
  sale: SaleDetail | null;
  onConfirm: (saleId: string, paymentData: PaymentData) => void;
}

export interface PaymentData {
  paymentDate: string;
  paymentMethod: PaymentMethod;
  operationNumber?: string;
  bankAccount?: string;
  notes?: string;
}

const paymentMethods: PaymentMethod[] = [
  'Efectivo',
  'Transferencia',
  'Cheque',
  'Tarjeta',
  'Deposito'
];

const bankAccounts = [
  'BCP - Cuenta Corriente - 191-1234567-0-89',
  'BBVA - Cuenta Corriente - 0011-0123-0100567890',
  'Scotiabank - Cuenta Corriente - 000-1234567',
  'Interbank - Cuenta Corriente - 898-3001234567',
  'BCP - Cuenta de Ahorros - 191-9876543-2-15'
];

export function MarkAsPaidModal({ 
  open, 
  onClose, 
  sale,
  onConfirm 
}: MarkAsPaidModalProps) {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'Efectivo',
    operationNumber: '',
    bankAccount: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!sale) return null;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!paymentData.paymentDate) {
      newErrors.paymentDate = 'La fecha de pago es requerida';
    }

    if (!paymentData.paymentMethod) {
      newErrors.paymentMethod = 'El método de pago es requerido';
    }

    if (['Transferencia', 'Deposito'].includes(paymentData.paymentMethod) && !paymentData.operationNumber) {
      newErrors.operationNumber = 'El número de operación es requerido para este método de pago';
    }

    if (['Transferencia', 'Deposito'].includes(paymentData.paymentMethod) && !paymentData.bankAccount) {
      newErrors.bankAccount = 'La cuenta bancaria es requerida para este método de pago';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onConfirm(sale.id, paymentData);
      onClose();
      // Reset form
      setPaymentData({
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'Efectivo',
        operationNumber: '',
        bankAccount: '',
        notes: ''
      });
      setErrors({});
    }
  };

  const handleChange = (field: keyof PaymentData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    setPaymentData(prev => ({
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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const requiresOperationNumber = [
    'Transferencia', 
    'Deposito'
  ].includes(paymentData.paymentMethod);

  const requiresBankAccount = [
    'Transferencia', 
    'Deposito'
  ].includes(paymentData.paymentMethod);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px'
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
          <PaymentIcon sx={{ color: '#476797' }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559' }}>
              Marcar como Pagado
            </Typography>
            <Typography variant="body2" sx={{ color: '#476797' }}>
              {sale.voucherNumber} - {sale.client}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#476797' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Información de la venta */}
        <Alert 
          severity="info" 
          sx={{ 
            mb: 3,
            bgcolor: '#E3F2FD',
            border: '1px solid #BBDEFB',
            '& .MuiAlert-icon': {
              color: '#1976D2'
            }
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            <strong>Monto a confirmar:</strong> S/ {sale.amount.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            <strong>Fecha de vencimiento:</strong> {formatDate(sale.dueDate)}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            <strong>Concepto:</strong> {sale.concept}
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Fecha de Pago"
              type="date"
              value={paymentData.paymentDate}
              onChange={handleChange('paymentDate')}
              fullWidth
              required
              error={!!errors.paymentDate}
              helperText={errors.paymentDate}
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

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth required error={!!errors.paymentMethod}>
              <InputLabel>Método de Pago</InputLabel>
              <Select
                value={paymentData.paymentMethod}
                onChange={handleChange('paymentMethod')}
                label="Método de Pago"
                startAdornment={
                  <PaymentIcon sx={{ color: '#476797', mr: 1 }} />
                }
              >
                {paymentMethods.map((method) => (
                  <MenuItem key={method} value={method}>
                    {method}
                  </MenuItem>
                ))}
              </Select>
              {errors.paymentMethod && (
                <Typography variant="caption" sx={{ color: 'error.main', mt: 0.5, ml: 1.5 }}>
                  {errors.paymentMethod}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {requiresOperationNumber && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Número de Operación"
                value={paymentData.operationNumber}
                onChange={handleChange('operationNumber')}
                fullWidth
                required
                error={!!errors.operationNumber}
                helperText={errors.operationNumber}
                placeholder="Ej: 0012345678"
              />
            </Grid>
          )}

          {requiresBankAccount && (
            <Grid size={{ xs: 12, sm: requiresOperationNumber ? 6 : 12 }}>
              <FormControl fullWidth required error={!!errors.bankAccount}>
                <InputLabel>Cuenta Bancaria</InputLabel>
                <Select
                  value={paymentData.bankAccount}
                  onChange={handleChange('bankAccount')}
                  label="Cuenta Bancaria"
                >
                  {bankAccounts.map((account) => (
                    <MenuItem key={account} value={account}>
                      {account}
                    </MenuItem>
                  ))}
                </Select>
                {errors.bankAccount && (
                  <Typography variant="caption" sx={{ color: 'error.main', mt: 0.5, ml: 1.5 }}>
                    {errors.bankAccount}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          )}

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Notas Adicionales"
              value={paymentData.notes}
              onChange={handleChange('notes')}
              fullWidth
              multiline
              rows={3}
              placeholder="Observaciones sobre el pago..."
              helperText="Opcional: Información adicional sobre el pago"
            />
          </Grid>
        </Grid>

        {/* Información adicional */}
        <Box sx={{ 
          mt: 3, 
          p: 2, 
          bgcolor: '#F8FAFC', 
          borderRadius: '8px',
          border: '1px solid #E2E8F0'
        }}>
          <Typography variant="body2" sx={{ color: '#476797', fontWeight: 500, mb: 1 }}>
            Importante:
          </Typography>
          <Typography variant="body2" sx={{ color: '#476797', mb: 1 }}>
            • Al confirmar, la venta será marcada como "Pagado" y no se podrá revertir
          </Typography>
          <Typography variant="body2" sx={{ color: '#476797', mb: 1 }}>
            • Asegúrese de que los datos del pago sean correctos
          </Typography>
          <Typography variant="body2" sx={{ color: '#476797' }}>
            • Se generará un registro de auditoría de esta acción
          </Typography>
        </Box>
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
            '&:hover': { bgcolor: '#059669' }
          }}
        >
          Confirmar Pago
        </Button>
      </DialogActions>
    </Dialog>
  );
}
