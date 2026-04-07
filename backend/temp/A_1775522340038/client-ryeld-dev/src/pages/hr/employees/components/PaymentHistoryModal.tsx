import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid2 as Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  TextField,
  SelectChangeEvent
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  AttachFile as AttachFileIcon,
  Payment as PaymentIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { Employee, PaymentHistory, MonthOption } from '../data/interfaces';

interface PaymentHistoryModalProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
  payments: PaymentHistory[];
  monthOptions: MonthOption[];
  availableYears: number[];
}

export function PaymentHistoryModal({ 
  open, 
  onClose, 
  employee, 
  payments, 
  monthOptions,
  availableYears 
}: PaymentHistoryModalProps) {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    amount: '',
    paymentType: 'salary' as 'salary' | 'bonus' | 'overtime' | 'commission',
    description: '',
    file: null as File | null
  });

  if (!employee) return null;

  const employeePayments = payments
    .filter(payment => payment.employeeId === employee.id)
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      paid: { bg: '#E6FAF5', color: '#476797' },
      pending: { bg: '#FFF6E5', color: '#F59E0B' },
      overdue: { bg: '#FEF2F2', color: '#EF4444' }
    };
    return colors[status as keyof typeof colors] || { bg: '#F5F5F5', color: '#476797' };
  };

  const getPaymentTypeColor = (type: string) => {
    const colors = {
      salary: { bg: '#E3F2FD', color: '#476797' },
      bonus: { bg: '#E6FAF5', color: '#476797' },
      overtime: { bg: '#FFF6E5', color: '#F59E0B' },
      commission: { bg: '#F3E5F5', color: '#8B5CF6' }
    };
    return colors[type as keyof typeof colors] || { bg: '#F5F5F5', color: '#476797' };
  };

  const getPaymentTypeName = (type: string) => {
    const types = {
      salary: 'Salario',
      bonus: 'Bono',
      overtime: 'Horas Extra',
      commission: 'Comisión'
    };
    return types[type as keyof typeof types] || type;
  };

  const getStatusName = (status: string) => {
    const statuses = {
      paid: 'Pagado',
      pending: 'Pendiente',
      overdue: 'Vencido'
    };
    return statuses[status as keyof typeof statuses] || status;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PE');
  };

  const getMonthName = (month: number) => {
    return monthOptions.find(m => m.value === month)?.label || month.toString();
  };

  const handleUploadChange = (field: string, value: any) => {
    setUploadData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setUploadData(prev => ({ ...prev, file }));
  };

  const handleUploadSubmit = () => {
    // TODO: Implementar subida de archivo
    console.log('Subir pago:', uploadData);
    setShowUploadForm(false);
    setUploadData({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      amount: '',
      paymentType: 'salary',
      description: '',
      file: null
    });
  };

  const totalPaid = employeePayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = employeePayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

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
          <PaymentIcon sx={{ color: '#476797' }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559' }}>
              Historial de Pagos
            </Typography>
            <Typography variant="body2" sx={{ color: '#476797' }}>
              {employee.name} - {employee.roleName}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#476797' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Estadísticas de Pagos */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#E6FAF5' }}>
              <Typography variant="h6" sx={{ color: '#476797', fontWeight: 600 }}>
                S/ {totalPaid.toLocaleString('es-PE')}
              </Typography>
              <Typography variant="body2" sx={{ color: '#476797' }}>
                Total Pagado
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#FFF6E5' }}>
              <Typography variant="h6" sx={{ color: '#F59E0B', fontWeight: 600 }}>
                S/ {pendingAmount.toLocaleString('es-PE')}
              </Typography>
              <Typography variant="body2" sx={{ color: '#476797' }}>
                Pendiente
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#E3F2FD' }}>
              <Typography variant="h6" sx={{ color: '#476797', fontWeight: 600 }}>
                {employeePayments.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#476797' }}>
                Total Registros
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Botón para agregar pago */}
        <Box sx={{ mb: 3, textAlign: 'right' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowUploadForm(!showUploadForm)}
            sx={{
              bgcolor: '#476797',
              '&:hover': { bgcolor: '#059669' }
            }}
          >
            Subir Comprobante de Pago
          </Button>
        </Box>

        {/* Formulario de Subida */}
        {showUploadForm && (
          <Paper sx={{ p: 3, mb: 3, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
              Subir Comprobante de Pago
            </Typography>
            
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Mes</InputLabel>
                  <Select
                    value={uploadData.month}
                    label="Mes"
                    onChange={(e: SelectChangeEvent<number>) => 
                      handleUploadChange('month', e.target.value as number)
                    }
                  >
                    {monthOptions.map((month) => (
                      <MenuItem key={month.value} value={month.value}>
                        {month.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Año</InputLabel>
                  <Select
                    value={uploadData.year}
                    label="Año"
                    onChange={(e: SelectChangeEvent<number>) => 
                      handleUploadChange('year', e.target.value as number)
                    }
                  >
                    {availableYears.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Monto"
                  type="number"
                  value={uploadData.amount}
                  onChange={(e) => handleUploadChange('amount', e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: <Typography sx={{ mr: 1 }}>S/</Typography>,
                    },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    value={uploadData.paymentType}
                    label="Tipo"
                    onChange={(e: SelectChangeEvent<string>) => 
                      handleUploadChange('paymentType', e.target.value)
                    }
                  >
                    <MenuItem value="salary">Salario</MenuItem>
                    <MenuItem value="bonus">Bono</MenuItem>
                    <MenuItem value="overtime">Horas Extra</MenuItem>
                    <MenuItem value="commission">Comisión</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Descripción (opcional)"
                  value={uploadData.description}
                  onChange={(e) => handleUploadChange('description', e.target.value)}
                  multiline
                  rows={2}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  sx={{ height: '100%' }}
                >
                  {uploadData.file ? uploadData.file.name : 'Seleccionar Archivo'}
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>

              <Grid size={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => setShowUploadForm(false)}
                    sx={{
                      borderColor: '#476797',
                      color: '#476797'
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleUploadSubmit}
                    disabled={!uploadData.amount || !uploadData.file}
                    sx={{
                      bgcolor: '#476797',
                      '&:hover': { bgcolor: '#059669' }
                    }}
                  >
                    Subir Comprobante
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Lista de Pagos */}
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
          Historial de Pagos ({employeePayments.length})
        </Typography>

        {employeePayments.length > 0 ? (
          <List>
            {employeePayments.map((payment, index) => (
              <Box key={payment.id}>
                <ListItem sx={{ 
                  border: '1px solid #F1F5F9', 
                  borderRadius: '8px', 
                  mb: 1,
                  bgcolor: '#FFFFFF',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' }
                }}>
                  <ListItemIcon>
                    <PaymentIcon sx={{ color: '#476797' }} />
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {getMonthName(payment.month)} {payment.year}
                        </Typography>
                        <Chip
                          label={getPaymentTypeName(payment.paymentType)}
                          size="small"
                          sx={{
                            bgcolor: getPaymentTypeColor(payment.paymentType).bg,
                            color: getPaymentTypeColor(payment.paymentType).color,
                            fontWeight: 500
                          }}
                        />
                        <Chip
                          label={getStatusName(payment.status)}
                          size="small"
                          sx={{
                            bgcolor: getPaymentStatusColor(payment.status).bg,
                            color: getPaymentStatusColor(payment.status).color,
                            fontWeight: 500
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" sx={{ color: '#476797' }}>
                          Monto: S/ {payment.amount.toLocaleString('es-PE')} • 
                          Fecha: {formatDate(payment.paymentDate)}
                        </Typography>
                        {payment.description && (
                          <Typography variant="body2" sx={{ color: '#476797', mt: 0.5 }}>
                            {payment.description}
                          </Typography>
                        )}
                      </Box>
                    }
                  />

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: { xs: 1, sm: 0 } }}>
                    {payment.fileName && (
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<AttachFileIcon />}
                        sx={{
                          borderColor: '#476797',
                          color: '#476797',
                          '&:hover': {
                            borderColor: '#3A5478',
                            bgcolor: 'rgba(59, 130, 246, 0.04)'
                          }
                        }}
                      >
                        Ver Archivo
                      </Button>
                    )}
                  </Box>
                </ListItem>
                {index < employeePayments.length - 1 && <Divider sx={{ my: 1 }} />}
              </Box>
            ))}
          </List>
        ) : (
          <Box sx={{ 
            textAlign: 'center', 
            py: 4,
            bgcolor: '#F8FAFC',
            borderRadius: '8px',
            border: '1px dashed #E2E8F0'
          }}>
            <PaymentIcon sx={{ fontSize: 48, color: '#94A3B8', mb: 2 }} />
            <Typography variant="body1" sx={{ color: '#476797' }}>
              No hay registros de pagos para este empleado
            </Typography>
          </Box>
        )}
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
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
