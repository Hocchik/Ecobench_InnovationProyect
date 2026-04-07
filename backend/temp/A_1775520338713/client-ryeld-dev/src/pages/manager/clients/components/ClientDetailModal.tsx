import React from 'react';
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
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Close as CloseIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon,
  Elevator as ElevatorIcon,
  Description as DescriptionIcon,
  GetApp as DownloadIcon
} from '@mui/icons-material';
import { useClientDetail } from '../hooks/useClientDetail';

interface ClientDetailModalProps {
  open: boolean;
  onClose: () => void;
  clientId: string | null;
}

const getStateColor = (state: string) => {
  switch (state.toLowerCase()) {
    case 'contratado':
      return { bg: '#E6FAF5', color: '#476797' };
    case 'primer contacto':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'visitado':
      return { bg: '#E3F2FD', color: '#1976D2' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const ClientDetailModal: React.FC<ClientDetailModalProps> = ({
  open,
  onClose,
  clientId
}) => {
  const { clientDetail, loading, error, refetchClientDetail } = useClientDetail(clientId);

  const handleElevatorDetails = () => {
    // TODO: Implementar lógica para ver detalles de ascensores
    console.log('Ver detalles de ascensores para el cliente:', clientId);
  };

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Alert 
            severity="error" 
            action={
              <Button onClick={refetchClientDetail}>
                Reintentar
              </Button>
            }
          >
            {error}
          </Alert>
        </DialogContent>
      </Dialog>
    );
  }

  if (!clientDetail) {
    return null;
  }

  const stateColors = getStateColor(clientDetail.state);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: { 
          borderRadius: '20px', 
          boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
          maxHeight: '90vh' 
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        bgcolor: '#F8F9FF',
        borderBottom: '1px solid #E2E8F0'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h5" fontWeight={600} color="#1B2559">
            {clientDetail.clientName}
          </Typography>
          <Chip
            label={clientDetail.state}
            sx={{
              backgroundColor: stateColors.bg,
              color: stateColors.color,
              fontWeight: 500,
              fontSize: '0.85rem'
            }}
          />
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#476797' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Información General */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BusinessIcon color="primary" />
                  Información General
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Sección
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {clientDetail.section}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
                    Número de Ascensores
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h4" color="primary" fontWeight={600}>
                      {clientDetail.elevatorCount}
                    </Typography>
                    <ElevatorIcon color="primary" />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Identificación */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon color="primary" />
                  Identificación
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Tipo
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {clientDetail.identification.isCompany ? 'Empresa' : 'Persona Natural'}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
                    {clientDetail.identification.isCompany ? 'RUC' : 'DNI'}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {clientDetail.identification.ruc || clientDetail.identification.dni}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
                    Identificación del Cliente
                  </Typography>
                  <Typography variant="body1">
                    {clientDetail.identification.clientIdentification}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Dirección */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon color="primary" />
                  Dirección
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Calle
                    </Typography>
                    <Typography variant="body1">{clientDetail.address.street}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Número
                    </Typography>
                    <Typography variant="body1">{clientDetail.address.number}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Distrito
                    </Typography>
                    <Typography variant="body1">{clientDetail.address.district}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Provincia
                    </Typography>
                    <Typography variant="body1">{clientDetail.address.province}</Typography>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, p: 2, bgcolor: '#F8FAFC', borderRadius: '8px' }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Dirección Completa
                  </Typography>
                  <Typography variant="body1">
                    {clientDetail.address.formattedAddress}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Personas a Cargo */}
          {clientDetail.personsCharge.length > 0 && (
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: '20px', border: '1px solid #E2E8F0' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon color="primary" />
                    Personas a Cargo
                  </Typography>
                  <List dense>
                    {clientDetail.personsCharge.map((person) => (
                      <ListItem key={person.id} sx={{ px: 0 }}>
                        <ListItemText
                          primary={person.name}
                          secondary={
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2">{person.phone}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2">{person.emailCopy}</Typography>
                              </Box>
                              <Typography variant="caption" color="text.secondary">
                                {person.contactType} • {person.typeMaintenanceContact}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Visitas Técnicas */}
          {clientDetail.technicalVisits.length > 0 && (
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: '20px', border: '1px solid #E2E8F0' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AssignmentIcon color="primary" />
                    Visitas Técnicas
                  </Typography>
                  {clientDetail.technicalVisits.map((visit) => (
                    <Paper key={visit.id} sx={{ p: 2, mb: 2, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                        <Typography variant="body2" fontWeight={500}>
                          {formatDate(visit.visitDate)}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {visit.visitDescription}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                        Empleados: {visit.visitingEmployees.map(emp => emp.fullName).join(', ')}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {visit.inspectionReportUrl && (
                          <Button
                            size="small"
                            startIcon={<DownloadIcon />}
                            onClick={() => handleDownload(visit.inspectionReportUrl)}
                            sx={{ fontSize: '0.75rem' }}
                          >
                            Reporte
                          </Button>
                        )}
                        {visit.solutionProposalUrl && (
                          <Button
                            size="small"
                            startIcon={<DownloadIcon />}
                            onClick={() => handleDownload(visit.solutionProposalUrl)}
                            sx={{ fontSize: '0.75rem' }}
                          >
                            Propuesta
                          </Button>
                        )}
                      </Box>
                    </Paper>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Contrato */}
          {clientDetail.contract && (
            <Grid item xs={12}>
              <Card sx={{ borderRadius: '20px', border: '1px solid #E2E8F0' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon color="primary" />
                    Contrato
                    <Chip
                      label={clientDetail.contract.isActive ? 'Activo' : 'Inactivo'}
                      color={clientDetail.contract.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Fecha de Firma
                      </Typography>
                      <Typography variant="body1">
                        {formatDate(clientDetail.contract.signingDate)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Fecha de Inicio
                      </Typography>
                      <Typography variant="body1">
                        {formatDate(clientDetail.contract.startDate)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Fecha de Fin
                      </Typography>
                      <Typography variant="body1">
                        {formatDate(clientDetail.contract.endDate)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Descripción
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {clientDetail.contract.description}
                    </Typography>
                    {clientDetail.contract.contractUrl && (
                      <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={() => handleDownload(clientDetail.contract!.contractUrl)}
                      >
                        Descargar Contrato
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: '#F8F9FF', borderTop: '1px solid #E2E8F0' }}>
        <Button
          variant="outlined"
          startIcon={<ElevatorIcon />}
          onClick={handleElevatorDetails}
          sx={{ 
            mr: 'auto',
            borderColor: '#476797',
            color: '#476797',
            borderRadius: '8px',
            '&:hover': {
              borderColor: '#3A5478',
              bgcolor: '#F8F9FF'
            }
          }}
        >
          Ver Detalles de Ascensores
        </Button>
        <Button 
          onClick={onClose} 
          variant="contained"
          sx={{
            bgcolor: '#476797',
            borderRadius: '8px',
            '&:hover': {
              bgcolor: '#3A5478'
            }
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
