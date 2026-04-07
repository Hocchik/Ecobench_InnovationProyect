import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Typography, 
  Box, 
  Button,
  Paper,
  Avatar,
  Radio,
  RadioGroup
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DetailedClient } from '../data/interfaces';
import AddIcon from '@mui/icons-material/Add';

interface ClientDetailsProps {
  open: boolean;
  onClose: () => void;
  client: DetailedClient | null;
}

export const ClientDetails: React.FC<ClientDetailsProps> = ({ open, onClose, client }) => {
  const [selectedPersons, setSelectedPersons] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (client) {
      const initial: Record<string, string> = {};
      client.people.forEach(person => {
        if (person.inCharge) {
          initial[person.type] = person.id;
        }
      });
      setSelectedPersons(initial);
    }
  }, [client]);

  const handlePersonChange = (type: string, personId: string) => {
    setSelectedPersons(prev => ({
      ...prev,
      [type]: personId
    }));
  };

  if (!client) {
    return null;
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: { 
          borderRadius: 2,
          height: { xs: '100%', sm: 'auto' },
          maxHeight: { xs: '100%', sm: '90vh' }
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Detalles del Cliente</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mr: 1 }}
        >
          Exportar
        </Button>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 2 }}>
        <Grid container spacing={3}>
          {/* Información del cliente */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" color="text.secondary">Cliente</Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body1" fontWeight="medium">{client.name}</Typography>
                </Grid>

                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" color="text.secondary">Dirección</Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body1">{client.address}</Typography>
                </Grid>

                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" color="text.secondary">RUC/DNI</Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body1">{client.ruc || '----------'}</Typography>
                </Grid>

                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" color="text.secondary">Número de Ascensores</Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body1">{client.elevators}</Typography>
                </Grid>

                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" color="text.secondary">Periodo</Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body1">{client.period || '----------'}</Typography>
                </Grid>

                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" color="text.secondary">Paradas</Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body1">{client.floors || '----------'}</Typography>
                </Grid>

                <Grid size={{ xs: 4 }}>
                  <Typography variant="subtitle2" color="text.secondary">Cuarto de Máquina</Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body1">{client.machineRoom}</Typography>
                </Grid>
              </Grid>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button variant="text" color="primary" endIcon={<ArrowBackIcon sx={{ transform: 'rotate(180deg)' }} />}>
                  Ver pagos
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          {/* Personas a cargo */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Personas a cargo</Typography>
                <Button 
                  startIcon={<AddIcon />} 
                  variant="outlined" 
                  color="primary"
                  size="small"
                >
                  Añadir persona
                </Button>
              </Box>

              <RadioGroup 
                value={selectedPersons['MANTENIMIENTO'] || ''} 
                onChange={(e) => handlePersonChange('MANTENIMIENTO', e.target.value)}
              >
                {client.people.map((person) => (
                  <Box 
                    key={person.id} 
                    sx={{ 
                      mb: 2, 
                      p: 2, 
                      border: '1px solid', 
                      borderColor: 'divider',
                      borderRadius: 2
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: 'primary.light' }}>{person.name.charAt(0)}</Avatar>
                        <Box>
                          <Typography variant="subtitle1">
                            {person.name} {person.position && `(${person.position})`}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Box 
                              sx={{ 
                                px: 1.5, 
                                py: 0.5, 
                                bgcolor: 'success.light', 
                                color: 'success.dark',
                                borderRadius: 3,
                                fontSize: '0.75rem',
                                fontWeight: 'medium'
                              }}
                            >
                              Mantenimiento
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Radio value={person.id} />
                    </Box>
                    <Box mt={1}>
                      <Typography variant="body2" display="flex" alignItems="center" gap={0.5}>
                        <span>📱</span> {person.phone}
                      </Typography>
                      <Typography variant="body2" display="flex" alignItems="center" gap={0.5}>
                        <span>✉️</span> {person.email}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </RadioGroup>
            </Paper>
          </Grid>
          
          {/* Ascensores */}
          {client.elevatorDetails.map((elevator) => (
            <Grid size={{ xs: 12 }} key={elevator.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" mb={2}>
                  Ascensor {elevator.number} (Detalles)
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">Tipo de Ascensor</Typography>
                    <Typography variant="body1">{elevator.elevatorType || '----------'}</Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">Marca</Typography>
                    <Typography variant="body1">{elevator.brand || '----------'}</Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">Modelo</Typography>
                    <Typography variant="body1">{elevator.model || '----------'}</Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">Tema de Control</Typography>
                    <Typography variant="body1">{elevator.controlSystem || '----------'}</Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">Número de Paradas</Typography>
                    <Typography variant="body1">{elevator.floors || '----------'}</Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">Frecuencia de Mantenimiento</Typography>
                    <Typography variant="body1">{elevator.maintenanceFrequency || '----------'}</Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">Características</Typography>
                    <Typography variant="body1">{elevator.characteristics || '----------'}</Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">Observación</Typography>
                    <Typography variant="body1">{elevator.observation || '----------'}</Typography>
                  </Grid>

                  {elevator.pending && (
                    <Grid size={{ xs: 12 }}>
                      <Box mt={1}>
                        <Typography variant="subtitle2" color="error.main">PENDIENTES</Typography>
                        <Typography variant="body1" color="error.main">{elevator.pending}</Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
