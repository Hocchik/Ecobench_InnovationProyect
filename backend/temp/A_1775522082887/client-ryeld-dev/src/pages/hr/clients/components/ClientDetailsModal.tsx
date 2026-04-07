/**
 * Modal de detalles del cliente
 * Muestra información completa del cliente seleccionado
 */

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Grid2 as Grid,
  IconButton,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import {
  Close as CloseIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Assignment as AssignmentIcon,
  Build as ServiceIcon,
  Emergency as EmergencyIcon,
  Description as NotesIcon
} from '@mui/icons-material';
import { Client } from '../data/clientsData';

interface ClientDetailsModalProps {
  open: boolean;
  onClose: () => void;
  client: Client | null;
  onEdit?: (client: Client) => void;
}

export const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({
  open,
  onClose,
  client,
  onEdit
}) => {
  if (!client) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return { bg: '#E6FAF5', color: '#476797' };
      case 'Pendiente':
        return { bg: '#FFF6E5', color: '#FFB547' };
      case 'Suspendido':
        return { bg: '#FFE6E6', color: '#FF4757' };
      case 'Inactivo':
        return { bg: '#F5F5F5', color: '#A3AED0' };
      default:
        return { bg: '#F5F5F5', color: '#A3AED0' };
    }
  };

  const getContractTypeColor = (type: string) => {
    switch (type) {
      case 'Mantenimiento':
        return { bg: '#E3F2FD', color: '#1976D2' };
      case 'Instalación':
        return { bg: '#F3E5F5', color: '#7B1FA2' };
      case 'Modernización':
        return { bg: '#E8F5E8', color: '#388E3C' };
      case 'Consultoría':
        return { bg: '#FFF8E1', color: '#F57C00' };
      default:
        return { bg: '#F5F5F5', color: '#A3AED0' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const InfoCard = ({ 
    icon, 
    title, 
    value, 
    subtitle 
  }: { 
    icon: React.ReactNode; 
    title: string; 
    value: string; 
    subtitle?: string; 
  }) => (
    <Card
      sx={{
        border: '1px solid #E2E8F0',
        borderRadius: '20px',
        '&:hover': {
          borderColor: '#CBD5E0',
          boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
        },
        transition: 'all 0.2s'
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box display="flex" alignItems="flex-start" gap={1.5}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '10px',
              bgcolor: 'rgba(71, 103, 151, 0.1)',
              color: '#476797',
              flexShrink: 0
            }}
          >
            {icon}
          </Box>
          <Box flex={1} minWidth={0}>
            <Typography
              variant="caption"
              sx={{
                color: '#A0AEC0',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#2D3748',
                fontWeight: 600,
                mt: 0.5,
                wordBreak: 'break-word'
              }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography
                variant="caption"
                sx={{ color: '#718096', mt: 0.5 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
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
          pb: 2,
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '20px',
              bgcolor: 'rgba(71, 103, 151, 0.1)',
              color: '#476797'
            }}
          >
            <BusinessIcon />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} color="#1B2559">
              Detalles del Cliente
            </Typography>
            <Typography variant="body2" color="#718096">
              {client.id}
            </Typography>
          </Box>
        </Box>
        
        <IconButton
          onClick={onClose}
          sx={{
            color: '#A0AEC0',
            '&:hover': {
              color: '#718096',
              bgcolor: '#F7FAFC'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Información principal */}
        <Box mb={3}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Typography variant="h5" fontWeight={700} color="#1B2559">
              {client.name}
            </Typography>
            <Chip
              label={client.status}
              sx={{
                bgcolor: getStatusColor(client.status).bg,
                color: getStatusColor(client.status).color,
                fontWeight: 600
              }}
            />
            <Chip
              label={client.contractType}
              sx={{
                bgcolor: getContractTypeColor(client.contractType).bg,
                color: getContractTypeColor(client.contractType).color,
                fontWeight: 600
              }}
            />
          </Stack>

          <Typography variant="body2" color="#718096" gutterBottom>
            Cliente registrado el {formatDate(client.registrationDate)}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Grid de información */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <InfoCard
              icon={<PersonIcon fontSize="small" />}
              title="Persona de Contacto"
              value={client.contactPerson}
            />
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <InfoCard
              icon={<PhoneIcon fontSize="small" />}
              title="Teléfono"
              value={client.phone}
            />
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <InfoCard
              icon={<EmailIcon fontSize="small" />}
              title="Correo Electrónico"
              value={client.email}
            />
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <InfoCard
              icon={<LocationIcon fontSize="small" />}
              title="Ubicación"
              value={`${client.address}`}
              subtitle={client.district}
            />
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <InfoCard
              icon={<AssignmentIcon fontSize="small" />}
              title="Cantidad de Ascensores"
              value={`${client.elevatorCount} ascensores`}
            />
          </Grid>
          
          {client.ruc && (
            <Grid size={{ xs: 12, md: 6 }}>
              <InfoCard
                icon={<BusinessIcon fontSize="small" />}
                title="RUC"
                value={client.ruc}
              />
            </Grid>
          )}
          
          {client.lastService && (
            <Grid size={{ xs: 12, md: 6 }}>
              <InfoCard
                icon={<ServiceIcon fontSize="small" />}
                title="Último Servicio"
                value={formatDate(client.lastService)}
              />
            </Grid>
          )}
          
          {client.emergencyContact && (
            <Grid size={{ xs: 12, md: 6 }}>
              <InfoCard
                icon={<EmergencyIcon fontSize="small" />}
                title="Contacto de Emergencia"
                value={client.emergencyContact}
              />
            </Grid>
          )}
          
          {client.notes && (
            <Grid size={{ xs: 12 }}>
              <InfoCard
                icon={<NotesIcon fontSize="small" />}
                title="Notas Adicionales"
                value={client.notes}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          borderTop: '1px solid #E2E8F0',
          gap: 2
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: '#E2E8F0',
            color: '#4A5568',
            '&:hover': {
              borderColor: '#CBD5E0',
              bgcolor: '#F7FAFC'
            }
          }}
        >
          Cerrar
        </Button>
        
        {onEdit && (
          <Button
            onClick={() => onEdit(client)}
            variant="contained"
            sx={{
              bgcolor: '#476797',
              '&:hover': {
                bgcolor: '#3A5578'
              }
            }}
          >
            Editar Cliente
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
