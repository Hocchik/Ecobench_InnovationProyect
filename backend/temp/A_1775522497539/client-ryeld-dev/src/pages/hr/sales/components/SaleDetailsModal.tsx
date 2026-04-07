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
  Grid2 as Grid,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Receipt as ReceiptIcon,
  CalendarToday as CalendarIcon,
  Payment as PaymentIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Engineering as EngineeringIcon,
  Description as DescriptionIcon,
  AttachFile as AttachFileIcon
} from '@mui/icons-material';
import { SaleDetail, SaleStatus } from '../data/interfaces';

interface SaleDetailsModalProps {
  open: boolean;
  onClose: () => void;
  sale: SaleDetail | null;
  onMarkAsPaid?: (saleId: string) => void;
}

export function SaleDetailsModal({ 
  open, 
  onClose, 
  sale,
  onMarkAsPaid 
}: SaleDetailsModalProps) {
  if (!sale) return null;

  const getStatusColor = (status: SaleStatus) => {
    const colors = {
      'Pagado': { bg: '#E6FAF5', color: '#476797' },
      'Pendiente': { bg: '#FFF6E5', color: '#F59E0B' },
      'Por cobrar': { bg: '#E3F2FD', color: '#476797' },
      'Anulado': { bg: '#FEF2F2', color: '#EF4444' }
    };
    return colors[status];
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('es-PE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = () => {
    if (sale.status === 'Pagado' || sale.status === 'Anulado') return false;
    return new Date(sale.dueDate) < new Date();
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
          <ReceiptIcon sx={{ color: '#476797' }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559' }}>
              Detalles de Venta
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
        <Grid container spacing={3}>
          {/* Información Principal */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
                Información de la Venta
              </Typography>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <PersonIcon sx={{ color: '#476797', fontSize: 20 }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#476797' }}>
                        Cliente
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {sale.client}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <WorkIcon sx={{ color: '#476797', fontSize: 20 }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#476797' }}>
                        Concepto
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {sale.concept}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <ReceiptIcon sx={{ color: '#476797', fontSize: 20 }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#476797' }}>
                        Comprobante
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {sale.voucher} - {sale.voucherNumber}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <PaymentIcon sx={{ color: '#476797', fontSize: 20 }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#476797' }}>
                        Monto
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559' }}>
                        S/ {sale.amount.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <CalendarIcon sx={{ color: '#476797', fontSize: 20 }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#476797' }}>
                        Fecha de Vencimiento
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 500,
                          color: isOverdue() ? '#EF4444' : 'inherit'
                        }}
                      >
                        {formatDate(sale.dueDate)}
                        {isOverdue() && ' (Vencido)'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#476797' }}>
                        Estado
                      </Typography>
                      <Chip
                        label={sale.status}
                        sx={{
                          bgcolor: getStatusColor(sale.status).bg,
                          color: getStatusColor(sale.status).color,
                          fontWeight: 500,
                          mt: 0.5
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {sale.paymentDate && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
                    Información de Pago
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <CalendarIcon sx={{ color: '#476797', fontSize: 20 }} />
                        <Box>
                          <Typography variant="body2" sx={{ color: '#476797' }}>
                            Fecha de Pago
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {formatDate(sale.paymentDate)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    {sale.paymentMethod && (
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <PaymentIcon sx={{ color: '#476797', fontSize: 20 }} />
                          <Box>
                            <Typography variant="body2" sx={{ color: '#476797' }}>
                              Método de Pago
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {sale.paymentMethod}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    )}

                    {sale.operationNumber && (
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box>
                            <Typography variant="body2" sx={{ color: '#476797' }}>
                              N° Operación
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {sale.operationNumber}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    )}

                    {sale.bankAccount && (
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box>
                            <Typography variant="body2" sx={{ color: '#476797' }}>
                              Cuenta Bancaria
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {sale.bankAccount}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </>
              )}
            </Paper>

            {/* Descripción del Servicio */}
            <Paper sx={{ p: 3, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
                Descripción del Servicio
              </Typography>
              <Typography variant="body1" sx={{ color: '#476797', lineHeight: 1.6 }}>
                {sale.description}
              </Typography>
              
              {sale.notes && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1B2559', mb: 1 }}>
                    Notas Adicionales
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#476797' }}>
                    {sale.notes}
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>

          {/* Información Adicional */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Información del Cliente */}
            {(sale.clientPhone || sale.clientEmail || sale.clientAddress) && (
              <Paper sx={{ p: 3, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
                  Contacto del Cliente
                </Typography>
                
                {sale.clientPhone && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <PhoneIcon sx={{ color: '#476797', fontSize: 20 }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#476797' }}>
                        Teléfono
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {sale.clientPhone}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {sale.clientEmail && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <EmailIcon sx={{ color: '#476797', fontSize: 20 }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#476797' }}>
                        Email
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {sale.clientEmail}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {sale.clientAddress && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <LocationIcon sx={{ color: '#476797', fontSize: 20, mt: 0.5 }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#476797' }}>
                        Dirección
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {sale.clientAddress}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Paper>
            )}

            {/* Información Técnica */}
            <Paper sx={{ p: 3, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
                Información Técnica
              </Typography>
              
              {sale.technician && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <EngineeringIcon sx={{ color: '#476797', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Técnico Asignado
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {sale.technician}
                    </Typography>
                  </Box>
                </Box>
              )}

              {sale.servicePeriod && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <CalendarIcon sx={{ color: '#476797', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Período de Servicio
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {sale.servicePeriod}
                    </Typography>
                  </Box>
                </Box>
              )}

              {sale.equipmentDetails && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <DescriptionIcon sx={{ color: '#476797', fontSize: 20, mt: 0.5 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Equipos
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {sale.equipmentDetails}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Paper>

            {/* Información de Seguimiento */}
            <Paper sx={{ p: 3, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
                Seguimiento
              </Typography>
              
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <PersonIcon sx={{ color: '#476797', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Creado por"
                    secondary={`${sale.createdBy || 'Sistema'} • ${sale.createdAt ? formatDateTime(sale.createdAt) : 'N/A'}`}
                    primaryTypographyProps={{ variant: 'body2', color: '#476797' }}
                    secondaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                  />
                </ListItem>
                
                {sale.lastModified && sale.modifiedBy && (
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <PersonIcon sx={{ color: '#476797', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Última modificación"
                      secondary={`${sale.modifiedBy} • ${formatDateTime(sale.lastModified)}`}
                      primaryTypographyProps={{ variant: 'body2', color: '#476797' }}
                      secondaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                    />
                  </ListItem>
                )}

                {sale.paymentProof && (
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <AttachFileIcon sx={{ color: '#476797', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Comprobante de pago"
                      secondary={
                        <Button 
                          size="small" 
                          variant="outlined"
                          sx={{ mt: 0.5, fontSize: '0.75rem' }}
                        >
                          Ver archivo
                        </Button>
                      }
                      primaryTypographyProps={{ variant: 'body2', color: '#476797' }}
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
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
        
        {onMarkAsPaid && (sale.status === 'Pendiente' || sale.status === 'Por cobrar') && (
          <Button
            onClick={() => onMarkAsPaid(sale.id)}
            variant="contained"
            sx={{
              bgcolor: '#476797',
              '&:hover': { bgcolor: '#059669' }
            }}
          >
            Marcar como Pagado
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
