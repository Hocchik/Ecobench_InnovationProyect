import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  Card,
  CardContent,
  Chip,
  Divider,
} from '@mui/material';
import { 
  Close, 
  PersonAdd, 
  Key, 
  Assignment,
  Person,
  Email,
  Badge 
} from '@mui/icons-material';
import { 
  CreateUserRequest, 
  UserResponse, 
  EmployeeCreateResponse 
} from '../types/employeeTypes';
import { Role } from '../types/roleTypes';

interface UserAssignmentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserRequest) => Promise<UserResponse | null>;
  employee: EmployeeCreateResponse;
  roles: Role[];
}

export const UserAssignmentModal: React.FC<UserAssignmentModalProps> = ({
  open,
  onClose,
  onSubmit,
  employee,
  roles
}) => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    employeeId: '',
    roleId: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [userCreated, setUserCreated] = useState<UserResponse | null>(null);

  useEffect(() => {
    if (employee) {
      setFormData({
        employeeId: employee.employeeId,
        roleId: '',
      });
    }
    setErrors({});
    setUserCreated(null);
  }, [employee, open]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.roleId) {
      newErrors.roleId = 'Debe seleccionar un rol';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await onSubmit(formData);
      if (result) {
        setUserCreated(result);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof CreateUserRequest, value: string) => {
    setFormData((prev: CreateUserRequest) => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors((prev: { [key: string]: string }) => ({ ...prev, [field as string]: '' }));
    }
  };

  const selectedRole = roles.find(role => role.id === formData.roleId);

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
            <PersonAdd sx={{ color: '#476797' }} />
            <Typography variant="h6" fontWeight={600} color="#1B2559">
              Asignar Usuario y Rol
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {userCreated ? (
          <Box>
            <Alert severity="success" sx={{ mb: 3, borderRadius: '8px' }}>
              ¡Usuario creado exitosamente!
            </Alert>

            <Card 
              elevation={0} 
              sx={{ 
                border: '2px solid #4caf50', 
                borderRadius: '20px',
                bgcolor: '#f1f8e9' 
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Key sx={{ color: 'success.main' }} />
                  <Typography variant="h6" fontWeight={600} color="success.main">
                    Credenciales de Acceso
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography color="text.secondary">Código de Usuario:</Typography>
                    <Chip
                      label={userCreated.code}
                      color="primary"
                      sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography color="text.secondary">Contraseña Temporal:</Typography>
                    <Chip
                      label={userCreated.plainPassword}
                      color="secondary"
                      sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}
                    />
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  <Typography variant="body2" color="warning.main" sx={{ textAlign: 'center' }}>
                    ⚠️ Guarda estas credenciales. La contraseña solo se muestra una vez.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <Box>
            {/* Información del empleado */}
            <Card elevation={0} sx={{ mb: 3, bgcolor: '#F8F9FF', border: '1px solid #E2E8F0', borderRadius: '20px' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Person sx={{ color: '#476797' }} />
                  <Typography variant="h6" fontWeight={600} color="#1B2559">
                    Información del Empleado
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Badge sx={{ color: 'action.active', fontSize: 16 }} />
                    <Typography>{employee.fullName}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Email sx={{ color: 'action.active', fontSize: 16 }} />
                    <Typography color="text.secondary">{employee.workEmail}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Selección de rol */}
            <FormControl 
              fullWidth 
              error={!!errors.roleId}
              sx={{ mb: 2 }}
            >
              <InputLabel>Seleccionar Rol</InputLabel>
              <Select
                value={formData.roleId}
                onChange={(e) => handleChange('roleId', e.target.value)}
                label="Seleccionar Rol"
                startAdornment={<Assignment sx={{ mr: 1, color: 'action.active' }} />}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography fontWeight={600}>{role.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Área: {role.areaName}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              {errors.roleId && (
                <FormHelperText>{errors.roleId}</FormHelperText>
              )}
            </FormControl>

            {selectedRole && (
              <Alert severity="info" sx={{ borderRadius: '8px' }}>
                Se creará un usuario con rol de <strong>{selectedRole.name}</strong>
              </Alert>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        {userCreated ? (
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
        ) : (
          <>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                borderColor: '#476797',
                color: '#476797',
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading || roles.length === 0}
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
              {loading ? 'Creando Usuario...' : 'Crear Usuario'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
