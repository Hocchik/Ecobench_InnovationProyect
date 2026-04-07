import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { 
  Close, 
  Person,
  Key,
  Badge,
  Email,
  CheckCircle,
  Cancel
} from '@mui/icons-material';

interface UserDetailsModalProps {
  open: boolean;
  onClose: () => void;
  employeeName: string;
  workEmail: string;
  userCode?: string;
  userStatus?: string;
  roleName?: string;
  areaName?: string | null;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  open,
  onClose,
  employeeName,
  workEmail,
  userCode,
  userStatus,
  roleName,
  areaName
}) => {
  if (!userCode) return null;

  const isActive = userStatus === 'ACTIVE';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Person sx={{ color: '#476797' }} />
            <Typography variant="h6" fontWeight={600} color="#1B2559">
              Detalles del Usuario
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Información del empleado */}
        <Card elevation={0} sx={{ mb: 3, bgcolor: '#F8F9FF', border: '1px solid #E2E8F0', borderRadius: '20px' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Badge sx={{ color: '#476797' }} />
              <Typography variant="h6" fontWeight={600} color="#1B2559">
                {employeeName}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Email sx={{ color: '#A3AED0', fontSize: 16 }} />
              <Typography color="text.secondary">{workEmail}</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Credenciales de acceso */}
        <Card 
          elevation={0} 
          sx={{ 
            mb: 3,
            border: '1px solid #E2E8F0', 
            borderRadius: '20px',
            bgcolor: '#F8F9FF',
            boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Key sx={{ color: '#476797' }} />
              <Typography variant="h6" fontWeight={600} color="#476797">
                Credenciales de Acceso
              </Typography>
              {isActive ? (
                <Chip
                  icon={<CheckCircle />}
                  label="Activo"
                  sx={{ 
                    backgroundColor: '#e8f5e8',
                    color: '#476797',
                    '& .MuiChip-icon': { color: '#476797' }
                  }}
                  size="small"
                />
              ) : (
                <Chip
                  icon={<Cancel />}
                  label="Inactivo"
                  sx={{ 
                    backgroundColor: '#ffebee',
                    color: '#d32f2f',
                    '& .MuiChip-icon': { color: '#d32f2f' }
                  }}
                  size="small"
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography color="text.secondary">Código de Usuario:</Typography>
                <Chip
                  label={userCode}
                  sx={{ 
                    fontFamily: 'monospace', 
                    fontWeight: 'bold',
                    backgroundColor: '#e3f2fd',
                    color: '#1565c0'
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Rol asignado */}
        {roleName && (
          <Card elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '20px' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <CheckCircle sx={{ color: '#476797' }} />
                <Typography variant="h6" fontWeight={600} color="#476797">
                  Rol Asignado
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography color="text.secondary">Rol:</Typography>
                  <Chip
                    label={roleName}
                    sx={{
                      backgroundColor: '#e0e7ff',
                      color: '#476797',
                      border: '1px solid #c7d2fe'
                    }}
                  />
                </Box>

                {areaName && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography color="text.secondary">Área:</Typography>
                    <Typography fontWeight={600}>
                      {areaName}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: '#476797',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              bgcolor: '#3A5478',
            },
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
