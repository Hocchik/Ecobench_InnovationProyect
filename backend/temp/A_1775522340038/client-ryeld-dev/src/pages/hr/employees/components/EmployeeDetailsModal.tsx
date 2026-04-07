import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  Grid2 as Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab
} from '@mui/material';
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  ContactEmergency as EmergencyIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  Description as DocumentIcon,
  AccountBalance as SalaryIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { Employee, EmployeeDocument } from '../data/interfaces';

interface EmployeeDetailsModalProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
  documents: EmployeeDocument[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function EmployeeDetailsModal({ 
  open, 
  onClose, 
  employee, 
  documents 
}: EmployeeDetailsModalProps) {
  const [tabValue, setTabValue] = useState(0);

  if (!employee) return null;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (active: boolean) => {
    return active
      ? { bg: '#E6FAF5', color: '#476797' }
      : { bg: '#FEF2F2', color: '#EF4444' };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'contract': return '📄';
      case 'payslip': return '💰';
      case 'cv': return '📋';
      case 'certificate': return '🏆';
      default: return '📎';
    }
  };

  const getDocumentTypeName = (type: string) => {
    const types: Record<string, string> = {
      'contract': 'Contrato',
      'payslip': 'Boleta de Pago',
      'cv': 'Curriculum Vitae',
      'certificate': 'Certificado',
      'other': 'Otro'
    };
    return types[type] || 'Documento';
  };

  const employeeDocuments = documents.filter(doc => doc.employeeId === employee.id);

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
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#F8FAFC',
        borderBottom: '1px solid #F1F5F9'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PersonIcon sx={{ color: '#476797' }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559' }}>
              {employee.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#476797' }}>
              {employee.roleName} - {employee.areaName}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#476797' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Información Personal" />
          <Tab label="Información Laboral" />
          <Tab label="Documentos" />
        </Tabs>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {/* Tab 1: Información Personal */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: '8px' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
                  Datos Personales
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <PersonIcon sx={{ color: '#476797', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Documento de Identidad
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {employee.document || 'No registrado'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <CalendarIcon sx={{ color: '#476797', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Fecha de Nacimiento
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {employee.birthDate ? formatDate(employee.birthDate) : 'No registrada'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationIcon sx={{ color: '#476797', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Dirección
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {employee.address || 'No registrada'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: '8px' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
                  Contacto
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <EmailIcon sx={{ color: '#476797', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Email Personal
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {employee.personalEmail || 'No registrado'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <PhoneIcon sx={{ color: '#476797', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Teléfono
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {employee.phoneNumber}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
                  Contacto de Emergencia
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <EmergencyIcon sx={{ color: '#476797', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Contacto
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {employee.emergencyContact || 'No registrado'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PhoneIcon sx={{ color: '#476797', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Teléfono
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {employee.emergencyPhone || 'No registrado'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 2: Información Laboral */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: '8px' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
                  Información de Puesto
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <WorkIcon sx={{ color: '#476797', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Área
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {employee.areaName}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <PersonIcon sx={{ color: '#476797', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Rol/Posición
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {employee.roleName}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <CalendarIcon sx={{ color: '#476797', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Fecha de Ingreso
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formatDate(employee.hireDate)}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Estado
                    </Typography>
                    <Chip
                      label={employee.active ? 'Activo' : 'Inactivo'}
                      size="small"
                      sx={{
                        bgcolor: getStatusColor(employee.active).bg,
                        color: getStatusColor(employee.active).color,
                        fontWeight: 500
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: '8px' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
                  Información Corporativa
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <EmailIcon sx={{ color: '#476797', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Email Corporativo
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {employee.workEmail || 'No asignado'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SalaryIcon sx={{ color: '#476797', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#476797' }}>
                      Salario
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {employee.salary ? `S/ ${employee.salary.toLocaleString('es-PE')}` : 'No registrado'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 3: Documentos */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
            Documentos del Empleado
          </Typography>
          
          {employeeDocuments.length > 0 ? (
            <List>
              {employeeDocuments.map((doc) => (
                <ListItem key={doc.id} sx={{ 
                  border: '1px solid #F1F5F9', 
                  borderRadius: '8px', 
                  mb: 1,
                  bgcolor: '#FFFFFF'
                }}>
                  <ListItemIcon>
                    <Typography sx={{ fontSize: '1.5rem' }}>
                      {getDocumentIcon(doc.documentType)}
                    </Typography>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {doc.fileName}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ color: '#476797' }}>
                          {getDocumentTypeName(doc.documentType)} • 
                          Subido el {formatDate(doc.uploadDate)} por {doc.uploadedBy}
                        </Typography>
                        {doc.description && (
                          <Typography variant="body2" sx={{ color: '#476797', mt: 0.5 }}>
                            {doc.description}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: '#476797',
                      color: '#476797',
                      '&:hover': {
                        borderColor: '#3A5478',
                        bgcolor: 'rgba(59, 130, 246, 0.04)'
                      }
                    }}
                  >
                    Ver
                  </Button>
                </ListItem>
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
              <DocumentIcon sx={{ fontSize: 48, color: '#94A3B8', mb: 2 }} />
              <Typography variant="body1" sx={{ color: '#476797' }}>
                No hay documentos registrados para este empleado
              </Typography>
            </Box>
          )}
        </TabPanel>
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
