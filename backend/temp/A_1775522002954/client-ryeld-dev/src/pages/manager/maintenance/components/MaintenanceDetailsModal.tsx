import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Grid,
  Chip,
  Paper
} from '@mui/material';
import { Close, Person, Build, Schedule, LocationOn, AttachMoney } from '@mui/icons-material';
import { Maintenance } from '../types/maintenanceTypes';

interface MaintenanceDetailsModalProps {
  open: boolean;
  onClose: () => void;
  maintenance: Maintenance | null;
  onEdit?: (maintenance: Maintenance) => void;
}

const formatCurrency = (amount?: number) => {
  if (!amount) return '-';
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatTime = (timeString: string) => {
  return timeString;
};

// Función para obtener colores según el estado
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completado':
      return { bg: '#E6FAF5', color: '#476797' };
    case 'En Progreso':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Programado':
      return { bg: '#E3F2FD', color: '#1976D2' };
    case 'Pendiente':
      return { bg: '#FFF3E0', color: '#F57C00' };
    case 'Cancelado':
      return { bg: '#FFE4E4', color: '#FF4842' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

// Función para obtener colores según el tipo
const getTypeColor = (type: string) => {
  switch (type) {
    case 'Preventivo':
      return { bg: '#E8F5E8', color: '#2E7D32' };
    case 'Correctivo':
      return { bg: '#E3F2FD', color: '#1565C0' };
    case 'Urgencia':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Emergencia':
      return { bg: '#FFE4E4', color: '#FF4842' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Alta':
      return { bg: '#FFE4E4', color: '#FF4842' };
    case 'Media':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Baja':
      return { bg: '#E8F5E8', color: '#2E7D32' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

export const MaintenanceDetailsModal: React.FC<MaintenanceDetailsModalProps> = ({
  open,
  onClose,
  maintenance,
  onEdit
}) => {
  if (!maintenance) return null;

  const statusColors = getStatusColor(maintenance.status);
  const typeColors = getTypeColor(maintenance.maintenanceType);
  const priorityColors = getPriorityColor(maintenance.priority);

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
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="600" color="#1B2559">
            Detalles del Mantenimiento
          </Typography>
          <Typography variant="subtitle2" color="#476797">
            ID: {maintenance.id}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Grid container spacing={3}>
          {/* Información básica */}
          <Grid xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: '20px',
                bgcolor: '#F8F9FF',
                border: '1px solid #E2E8F0',
                height: '100%'
              }}
            >
              <Typography variant="h6" fontWeight="600" color="#1B2559" mb={2}>
                <Build sx={{ mr: 1, verticalAlign: 'middle' }} />
                Información del Servicio
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box>
                  <Typography variant="caption" color="#476797">Cliente</Typography>
                  <Typography variant="body1" fontWeight="500">{maintenance.clientName}</Typography>
                </Box>
                
                <Box>
                  <Typography variant="caption" color="#476797">Edificio</Typography>
                  <Typography variant="body1" fontWeight="500">{maintenance.building}</Typography>
                </Box>
                
                <Box>
                  <Typography variant="caption" color="#476797">Ubicación</Typography>
                  <Typography variant="body1" fontWeight="500">
                    <LocationOn sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                    {maintenance.location}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="caption" color="#476797">Tipo de Ascensor</Typography>
                  <Typography variant="body1" fontWeight="500">{maintenance.ascensorType}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Estado y clasificación */}
          <Grid xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: '20px',
                bgcolor: '#F8F9FF',
                border: '1px solid #E2E8F0',
                height: '100%'
              }}
            >
              <Typography variant="h6" fontWeight="600" color="#1B2559" mb={2}>
                Estado y Clasificación
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={maintenance.status}
                    sx={{
                      bgcolor: statusColors.bg,
                      color: statusColors.color,
                      fontWeight: 600
                    }}
                  />
                  <Chip
                    label={maintenance.maintenanceType}
                    sx={{
                      bgcolor: typeColors.bg,
                      color: typeColors.color,
                      fontWeight: 600
                    }}
                  />
                  <Chip
                    label={`Prioridad: ${maintenance.priority}`}
                    sx={{
                      bgcolor: priorityColors.bg,
                      color: priorityColors.color,
                      fontWeight: 600
                    }}
                  />
                </Box>
                
                {maintenance.cost && (
                  <Box>
                    <Typography variant="caption" color="#476797">Costo</Typography>
                    <Typography variant="h5" fontWeight="600" color="#476797">
                      <AttachMoney sx={{ fontSize: 20, mr: 0.5, verticalAlign: 'middle' }} />
                      {formatCurrency(maintenance.cost)}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Fechas y horarios */}
          <Grid xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: '20px',
                bgcolor: '#F8F9FF',
                border: '1px solid #E2E8F0'
              }}
            >
              <Typography variant="h6" fontWeight="600" color="#1B2559" mb={2}>
                <Schedule sx={{ mr: 1, verticalAlign: 'middle' }} />
                Programación
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box>
                  <Typography variant="caption" color="#476797">Fecha Programada</Typography>
                  <Typography variant="body1" fontWeight="500">{formatDate(maintenance.scheduledDate)}</Typography>
                </Box>
                
                {maintenance.completedDate && (
                  <Box>
                    <Typography variant="caption" color="#476797">Fecha Completada</Typography>
                    <Typography variant="body1" fontWeight="500">{formatDate(maintenance.completedDate)}</Typography>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" color="#476797">Hora Inicio</Typography>
                    <Typography variant="body1" fontWeight="500">{formatTime(maintenance.startTime)}</Typography>
                  </Box>
                  {maintenance.endTime && (
                    <Box>
                      <Typography variant="caption" color="#476797">Hora Fin</Typography>
                      <Typography variant="body1" fontWeight="500">{formatTime(maintenance.endTime)}</Typography>
                    </Box>
                  )}
                </Box>
                
                {maintenance.nextMaintenanceDate && (
                  <Box>
                    <Typography variant="caption" color="#476797">Próximo Mantenimiento</Typography>
                    <Typography variant="body1" fontWeight="500">{formatDate(maintenance.nextMaintenanceDate)}</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Personal asignado */}
          <Grid xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: '20px',
                bgcolor: '#F8F9FF',
                border: '1px solid #E2E8F0'
              }}
            >
              <Typography variant="h6" fontWeight="600" color="#1B2559" mb={2}>
                <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                Personal Asignado
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box>
                  <Typography variant="caption" color="#476797">Supervisor</Typography>
                  <Typography variant="body1" fontWeight="500">{maintenance.supervisor}</Typography>
                </Box>
                
                <Box>
                  <Typography variant="caption" color="#476797">Técnico Principal</Typography>
                  <Typography variant="body1" fontWeight="500">{maintenance.technician1}</Typography>
                </Box>
                
                {maintenance.technician2 && (
                  <Box>
                    <Typography variant="caption" color="#476797">Técnico Auxiliar</Typography>
                    <Typography variant="body1" fontWeight="500">{maintenance.technician2}</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Actividades realizadas */}
          {maintenance.activitiesPerformed && (
            <Grid xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: '20px',
                  bgcolor: '#F8F9FF',
                  border: '1px solid #E2E8F0'
                }}
              >
                <Typography variant="h6" fontWeight="600" color="#1B2559" mb={2}>
                  Actividades Realizadas
                </Typography>
                <Typography variant="body1" color="#334155" sx={{ lineHeight: 1.6 }}>
                  {maintenance.activitiesPerformed}
                </Typography>
              </Paper>
            </Grid>
          )}

          {/* Observaciones */}
          {maintenance.observations && (
            <Grid xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: '20px',
                  bgcolor: '#FFF8E1',
                  border: '1px solid #FFE082'
                }}
              >
                <Typography variant="h6" fontWeight="600" color="#1B2559" mb={2}>
                  Observaciones
                </Typography>
                <Typography variant="body1" color="#334155" sx={{ lineHeight: 1.6 }}>
                  {maintenance.observations}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid #E2E8F0' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: '#D1D5DB',
            color: '#6B7280',
            '&:hover': {
              borderColor: '#9CA3AF',
              bgcolor: '#F9FAFB'
            }
          }}
        >
          Cerrar
        </Button>
        {onEdit && (
          <Button
            onClick={() => onEdit(maintenance)}
            variant="contained"
            sx={{
              bgcolor: '#476797',
              '&:hover': {
                bgcolor: '#3A5578'
              }
            }}
          >
            Editar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
