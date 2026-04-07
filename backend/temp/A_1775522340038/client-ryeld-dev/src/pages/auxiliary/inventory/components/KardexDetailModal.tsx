import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  Chip,
  IconButton,
  Avatar,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  Close as CloseIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  AccessTime as AccessTimeIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Description as DescriptionIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { KardexMovement } from '../data/kardexInterfaces';

interface KardexDetailModalProps {
  open: boolean;
  onClose: () => void;
  movement: KardexMovement;
}

export const KardexDetailModal: React.FC<KardexDetailModalProps> = ({
  open,
  onClose,
  movement
}) => {
  const getMovementColor = (tipo: string) => {
    return tipo === 'entrada' 
      ? { bg: '#F0FDF4', color: '#476797', border: '#476797' }
      : { bg: '#FEF2F2', color: '#EF4444', border: '#EF4444' };
  };

  const getMovementIcon = (tipo: string) => {
    return tipo === 'entrada' ? (
      <TrendingUpIcon sx={{ fontSize: 32 }} />
    ) : (
      <TrendingDownIcon sx={{ fontSize: 32 }} />
    );
  };

  const colors = getMovementColor(movement.tipo);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
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
      {/* Header con gradiente */}
      <DialogTitle sx={{ 
        background: `linear-gradient(135deg, ${colors.color} 0%, ${colors.border} 100%)`,
        color: 'white',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 3
      }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ 
            bgcolor: 'rgba(255,255,255,0.2)', 
            width: 56, 
            height: 56,
            color: 'white'
          }}>
            {getMovementIcon(movement.tipo)}
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight={700}>
              {movement.numeroDocumento}
            </Typography>
            <Chip
              label={movement.tipo.toUpperCase()}
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600,
                mt: 0.5
              }}
              size="small"
            />
          </Box>
        </Stack>
        
        <IconButton 
          onClick={onClose} 
          sx={{ 
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, bgcolor: '#F8FAFC' }}>
        {/* Información General */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Fecha y Hora */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              p: 3, 
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              height: '100%'
            }}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarIcon sx={{ color: '#476797' }} />
                  <Typography variant="subtitle2" color="#476797" fontWeight={600}>
                    Fecha
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight={700} color="#1B2559">
                  {formatDate(movement.fecha)}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                  <AccessTimeIcon sx={{ color: '#476797' }} />
                  <Typography variant="subtitle2" color="#476797" fontWeight={600}>
                    Hora
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight={700} color="#1B2559">
                  {movement.hora}
                </Typography>
              </Stack>
            </Card>
          </Grid>

          {/* Estado y Almacén */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              p: 3, 
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              height: '100%'
            }}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ color: '#476797' }} />
                  <Typography variant="subtitle2" color="#476797" fontWeight={600}>
                    Estado
                  </Typography>
                </Box>
                <Chip
                  label={movement.estado.toUpperCase()}
                  sx={{
                    bgcolor: '#F0FDF4',
                    color: '#476797',
                    border: '1px solid #476797',
                    fontWeight: 700,
                    fontSize: '1rem',
                    height: 40,
                    width: 'fit-content'
                  }}
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                  <AssignmentIcon sx={{ color: '#F59E0B' }} />
                  <Typography variant="subtitle2" color="#476797" fontWeight={600}>
                    Almacén
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight={600} color="#1B2559">
                  {movement.almacen}
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        {/* Técnico Asignado */}
        <Card sx={{ 
          p: 3, 
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          mb: 3
        }}>
          <Typography variant="h6" fontWeight={700} color="#1B2559" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon color="primary" />
            Técnico Asignado
          </Typography>
          <Divider sx={{ my: 2 }} />
          
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar sx={{ 
              width: 64, 
              height: 64, 
              bgcolor: '#476797',
              fontSize: '1.5rem',
              fontWeight: 700
            }}>
              {movement.tecnico.nombre[0]}{movement.tecnico.apellido[0]}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={700} color="#1B2559">
                {movement.tecnico.nombre} {movement.tecnico.apellido}
              </Typography>
              <Typography variant="body2" color="#476797" sx={{ mb: 1 }}>
                {movement.tecnico.especialidad}
              </Typography>
              
              {movement.tecnico.telefono && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ fontSize: 18, color: '#476797' }} />
                  <Typography variant="body2" color="#476797">
                    {movement.tecnico.telefono}
                  </Typography>
                </Box>
              )}
            </Box>
          </Stack>
        </Card>

        {/* Cliente (si existe) */}
        {movement.cliente && (
          <Card sx={{ 
            p: 3, 
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            mb: 3
          }}>
            <Typography variant="h6" fontWeight={700} color="#1B2559" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BusinessIcon color="primary" />
              Cliente
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="#476797" gutterBottom fontWeight={600}>
                  Nombre
                </Typography>
                <Typography variant="body1" fontWeight={600} color="#1B2559">
                  {movement.cliente.nombre}
                </Typography>
              </Grid>
              
              {movement.cliente.ruc && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="#476797" gutterBottom fontWeight={600}>
                    RUC
                  </Typography>
                  <Typography variant="body1" fontWeight={600} color="#1B2559">
                    {movement.cliente.ruc}
                  </Typography>
                </Grid>
              )}
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="#476797" gutterBottom fontWeight={600}>
                  <LocationIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                  Dirección
                </Typography>
                <Typography variant="body1" color="#1B2559">
                  {movement.cliente.direccion}, {movement.cliente.distrito}
                </Typography>
              </Grid>
              
              {movement.cliente.telefono && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="#476797" gutterBottom fontWeight={600}>
                    <PhoneIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                    Teléfono
                  </Typography>
                  <Typography variant="body1" color="#1B2559">
                    {movement.cliente.telefono}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Card>
        )}

        {/* Detalle de Artículos */}
        <Card sx={{ 
          p: 3, 
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          mb: 3
        }}>
          <Typography variant="h6" fontWeight={700} color="#1B2559" gutterBottom>
            Detalle de Artículos
          </Typography>
          <Divider sx={{ my: 2 }} />
          
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '20px' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                  <TableCell sx={{ fontWeight: 700, color: '#476797' }}>Código</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#476797' }}>Descripción</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#476797' }}>Categoría</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#476797', textAlign: 'center' }}>Cantidad</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#476797', textAlign: 'right' }}>P. Unitario</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#476797', textAlign: 'right' }}>Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movement.articulos.map((articulo) => (
                  <TableRow key={articulo.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600} color="#1B2559">
                        {articulo.codigo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="#1B2559">
                        {articulo.descripcion}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={articulo.categoria} 
                        size="small"
                        sx={{
                          bgcolor: '#EFF6FF',
                          color: '#476797',
                          fontWeight: 600
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight={600} color="#1B2559">
                        {articulo.cantidad} {articulo.unidad}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="#476797">
                        {articulo.precioUnitario ? formatCurrency(articulo.precioUnitario) : '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={700} color={colors.color}>
                        {articulo.subtotal ? formatCurrency(articulo.subtotal) : '-'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
                
                {/* Total */}
                <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                  <TableCell colSpan={5}>
                    <Typography variant="h6" fontWeight={700} color="#1B2559" textAlign="right">
                      TOTAL
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" fontWeight={700} color={colors.color}>
                      {formatCurrency(movement.valorTotal || 0)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Información Adicional */}
        {(movement.motivo || movement.observaciones || movement.aprobadoPor) && (
          <Card sx={{ 
            p: 3, 
            borderRadius: '20px',
            border: '1px solid #E2E8F0'
          }}>
            <Typography variant="h6" fontWeight={700} color="#1B2559" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DescriptionIcon color="primary" />
              Información Adicional
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Stack spacing={2}>
              {movement.motivo && (
                <Box>
                  <Typography variant="subtitle2" color="#476797" gutterBottom fontWeight={600}>
                    Motivo
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <Typography variant="body2" color="#1B2559">
                      {movement.motivo}
                    </Typography>
                  </Paper>
                </Box>
              )}
              
              {movement.observaciones && (
                <Box>
                  <Typography variant="subtitle2" color="#476797" gutterBottom fontWeight={600}>
                    Observaciones
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <Typography variant="body2" color="#1B2559">
                      {movement.observaciones}
                    </Typography>
                  </Paper>
                </Box>
              )}
              
              {movement.aprobadoPor && (
                <Box>
                  <Typography variant="subtitle2" color="#476797" gutterBottom fontWeight={600}>
                    Aprobado por
                  </Typography>
                  <Typography variant="body1" fontWeight={600} color="#1B2559">
                    {movement.aprobadoPor}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Card>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: 'white', borderTop: '1px solid #E2E8F0' }}>
        {movement.documentoUrl && (
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{
              mr: 'auto',
              borderColor: colors.border,
              color: colors.color,
              '&:hover': {
                bgcolor: colors.bg,
                borderColor: colors.color
              }
            }}
          >
            Descargar Documento
          </Button>
        )}
        
        <Button 
          onClick={onClose} 
          variant="contained"
          sx={{
            bgcolor: '#476797',
            borderRadius: '20px',
            px: 4,
            py: 1.5,
            fontWeight: 600,
            '&:hover': { bgcolor: '#475569' }
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
