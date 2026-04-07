import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Maintenance, MaintenanceFormData, AscensorType, MaintenanceType, MaintenanceStatus } from '../types/maintenanceTypes';

interface MaintenanceFormModalProps {
  open: boolean;
  onSubmit: (formData: MaintenanceFormData) => void;
  onCancel: () => void;
  maintenance?: Maintenance | null;
}

const ascensorTypes: AscensorType[] = ['PASAJEROS', 'MONTACARGA', 'PASAESCALERAS', 'MONTAVEHICULO', 'DISCAPACITADO'];
const maintenanceTypes: MaintenanceType[] = ['Preventivo', 'Correctivo', 'Urgencia', 'Emergencia'];
const statusOptions: MaintenanceStatus[] = ['Programado', 'En Progreso', 'Completado', 'Cancelado', 'Pendiente'];
const priorityOptions = ['Alta', 'Media', 'Baja'];

const technicians = [
  'Alfonso Espinal',
  'Alex Cáceres',
  'Dany Diaz'
];

const supervisors = [
  'Edgar Cárdenas'
];

export const MaintenanceFormModal: React.FC<MaintenanceFormModalProps> = ({
  open,
  onSubmit,
  onCancel,
  maintenance = null
}) => {
  const [formData, setFormData] = useState<MaintenanceFormData>({
    clientName: '',
    building: '',
    ascensorType: 'PASAJEROS',
    maintenanceType: 'Preventivo',
    status: 'Programado',
    scheduledDate: '',
    completedDate: '',
    technician1: '',
    technician2: '',
    supervisor: '',
    startTime: '',
    endTime: '',
    activitiesPerformed: '',
    observations: '',
    cost: 0,
    priority: 'Media',
    location: '',
    nextMaintenanceDate: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const isEdit = maintenance !== null;

  useEffect(() => {
    if (maintenance) {
      setFormData({
        clientName: maintenance.clientName,
        building: maintenance.building,
        ascensorType: maintenance.ascensorType,
        maintenanceType: maintenance.maintenanceType,
        status: maintenance.status,
        scheduledDate: maintenance.scheduledDate,
        completedDate: maintenance.completedDate || '',
        technician1: maintenance.technician1,
        technician2: maintenance.technician2 || '',
        supervisor: maintenance.supervisor,
        startTime: maintenance.startTime,
        endTime: maintenance.endTime || '',
        activitiesPerformed: maintenance.activitiesPerformed || '',
        observations: maintenance.observations || '',
        cost: maintenance.cost || 0,
        priority: maintenance.priority,
        location: maintenance.location,
        nextMaintenanceDate: maintenance.nextMaintenanceDate || ''
      });
    } else {
      // Reset form for new maintenance
      setFormData({
        clientName: '',
        building: '',
        ascensorType: 'PASAJEROS',
        maintenanceType: 'Preventivo',
        status: 'Programado',
        scheduledDate: '',
        completedDate: '',
        technician1: '',
        technician2: '',
        supervisor: '',
        startTime: '',
        endTime: '',
        activitiesPerformed: '',
        observations: '',
        cost: 0,
        priority: 'Media',
        location: '',
        nextMaintenanceDate: ''
      });
    }
    setErrors({});
  }, [maintenance, isEdit, open]);

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.clientName.trim()) newErrors.clientName = 'El nombre del cliente es requerido';
    if (!formData.building.trim()) newErrors.building = 'El edificio es requerido';
    if (!formData.scheduledDate) newErrors.scheduledDate = 'La fecha programada es requerida';
    if (!formData.technician1) newErrors.technician1 = 'El técnico principal es requerido';
    if (!formData.supervisor) newErrors.supervisor = 'El supervisor es requerido';
    if (!formData.startTime) newErrors.startTime = 'La hora de inicio es requerida';
    if (!formData.location.trim()) newErrors.location = 'La ubicación es requerida';

    if (formData.status === 'Completado' && !formData.completedDate) {
      newErrors.completedDate = 'La fecha de completado es requerida para mantenimientos completados';
    }

    if (formData.status === 'Completado' && !formData.endTime) {
      newErrors.endTime = 'La hora de fin es requerida para mantenimientos completados';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      onCancel();
    }
  };

  const handleInputChange = (field: keyof MaintenanceFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
          maxHeight: '90vh'
        }
      }}
    >      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 4,
          pb: 2,
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        <Typography variant="h6" fontWeight="600" color="#1B2559">
          {isEdit ? 'Editar Mantenimiento' : 'Nuevo Mantenimiento'}
        </Typography>
        <IconButton onClick={onCancel} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 4, pb: 3, px: 4 }}>
        <Grid container spacing={3}>
          {/* Información del cliente */}
          <Grid xs={12}>
            <Typography variant="h6" fontWeight="600" color="#1B2559" mb={2}>
              Información del Cliente
            </Typography>
          </Grid>

          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre del Cliente"
              value={formData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
              error={!!errors.clientName}
              helperText={errors.clientName}
              required
            />
          </Grid>

          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label="Edificio"
              value={formData.building}
              onChange={(e) => handleInputChange('building', e.target.value)}
              error={!!errors.building}
              helperText={errors.building}
              required
            />
          </Grid>

          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label="Ubicación"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              error={!!errors.location}
              helperText={errors.location}
              placeholder="ej: Piso 1-15, Sótano, etc."
              required
            />
          </Grid>

          <Grid xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Ascensor</InputLabel>
              <Select
                value={formData.ascensorType}
                label="Tipo de Ascensor"
                onChange={(e) => handleInputChange('ascensorType', e.target.value)}
              >
                {ascensorTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Información del mantenimiento */}
          <Grid xs={12}>
            <Typography variant="h6" fontWeight="600" color="#1B2559" mb={2} mt={2}>
              Información del Mantenimiento
            </Typography>
          </Grid>

          <Grid xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Mantenimiento</InputLabel>
              <Select
                value={formData.maintenanceType}
                label="Tipo de Mantenimiento"
                onChange={(e) => handleInputChange('maintenanceType', e.target.value)}
              >
                {maintenanceTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                value={formData.status}
                label="Estado"
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                {statusOptions.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Prioridad</InputLabel>
              <Select
                value={formData.priority}
                label="Prioridad"
                onChange={(e) => handleInputChange('priority', e.target.value)}
              >
                {priorityOptions.map(priority => (
                  <MenuItem key={priority} value={priority}>{priority}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Fechas y horarios */}
          <Grid xs={12}>
            <Typography variant="h6" fontWeight="600" color="#1B2559" mb={2} mt={2}>
              Programación
            </Typography>
          </Grid>

          <Grid xs={12} md={4}>
            <TextField
              fullWidth
              label="Fecha Programada"
              type="date"
              value={formData.scheduledDate}
              onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
              error={!!errors.scheduledDate}
              helperText={errors.scheduledDate}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid xs={12} md={4}>
            <TextField
              fullWidth
              label="Hora de Inicio"
              type="time"
              value={formData.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
              error={!!errors.startTime}
              helperText={errors.startTime}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid xs={12} md={4}>
            <TextField
              fullWidth
              label="Hora de Fin"
              type="time"
              value={formData.endTime}
              onChange={(e) => handleInputChange('endTime', e.target.value)}
              error={!!errors.endTime}
              helperText={errors.endTime}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {formData.status === 'Completado' && (
            <>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Fecha de Completado"
                  type="date"
                  value={formData.completedDate}
                  onChange={(e) => handleInputChange('completedDate', e.target.value)}
                  error={!!errors.completedDate}
                  helperText={errors.completedDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Próximo Mantenimiento"
                  type="date"
                  value={formData.nextMaintenanceDate}
                  onChange={(e) => handleInputChange('nextMaintenanceDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </>
          )}

          {/* Personal asignado */}
          <Grid xs={12}>
            <Typography variant="h6" fontWeight="600" color="#1B2559" mb={2} mt={2}>
              Personal Asignado
            </Typography>
          </Grid>

          <Grid xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Supervisor</InputLabel>
              <Select
                value={formData.supervisor}
                label="Supervisor"
                onChange={(e) => handleInputChange('supervisor', e.target.value)}
                error={!!errors.supervisor}
              >
                {supervisors.map(supervisor => (
                  <MenuItem key={supervisor} value={supervisor}>{supervisor}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Técnico Principal</InputLabel>
              <Select
                value={formData.technician1}
                label="Técnico Principal"
                onChange={(e) => handleInputChange('technician1', e.target.value)}
                error={!!errors.technician1}
              >
                {technicians.map(technician => (
                  <MenuItem key={technician} value={technician}>{technician}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Técnico Auxiliar (Opcional)</InputLabel>
              <Select
                value={formData.technician2}
                label="Técnico Auxiliar (Opcional)"
                onChange={(e) => handleInputChange('technician2', e.target.value)}
              >
                <MenuItem value="">Ninguno</MenuItem>
                {technicians.filter(t => t !== formData.technician1).map(technician => (
                  <MenuItem key={technician} value={technician}>{technician}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Costo */}
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label="Costo (S/)"
              type="number"
              value={formData.cost}
              onChange={(e) => handleInputChange('cost', Number(e.target.value))}
              slotProps={{
                htmlInput: { min: 0, step: 0.01 }
              }}
            />
          </Grid>

          {/* Actividades y observaciones */}
          <Grid xs={12}>
            <Typography variant="h6" fontWeight="600" color="#1B2559" mb={2} mt={2}>
              Detalles del Trabajo
            </Typography>
          </Grid>

          <Grid xs={12}>
            <TextField
              fullWidth
              label="Actividades Realizadas"
              multiline
              rows={4}
              value={formData.activitiesPerformed}
              onChange={(e) => handleInputChange('activitiesPerformed', e.target.value)}
              placeholder="Describe las actividades realizadas durante el mantenimiento..."
            />
          </Grid>

          <Grid xs={12}>
            <TextField
              fullWidth
              label="Observaciones"
              multiline
              rows={3}
              value={formData.observations}
              onChange={(e) => handleInputChange('observations', e.target.value)}
              placeholder="Observaciones adicionales, recomendaciones, etc..."
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 4, borderTop: '1px solid #E2E8F0', gap: 2 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            borderColor: '#476797',
            color: '#476797',
            borderRadius: '8px',
            '&:hover': {
              borderColor: '#3A5478',
              bgcolor: '#F8F9FF'
            }
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: '#476797',
            borderRadius: '8px',
            '&:hover': {
              bgcolor: '#3A5478'
            }
          }}
        >
          {isEdit ? 'Actualizar' : 'Crear'} Mantenimiento
        </Button>
      </DialogActions>
    </Dialog>
  );
};
