import { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { CreateMainPreventive, CreateMainCorrective } from '../api/SupMaintenanceInterfaces';
import {
  Techs,
  Supervisors,
  MaintenanceType,
  ElevatorsType
} from '../../../../api/interfaces/DataInterfaces';

interface MaintenanceAddModalProps {
  open: boolean;
  onClose: () => void;
  isPreventive: boolean;
  onSave: (maintenance: CreateMainPreventive | CreateMainCorrective) => void;
  technicians: Techs[];
  supervisors: Supervisors[];
  maintenanceTypes: MaintenanceType[];
  elevators: ElevatorsType[];
}

export const MaintenanceAddModal = ({
  open,
  onClose,
  isPreventive,
  onSave,
  technicians,
  supervisors,
  maintenanceTypes,
  elevators
}: MaintenanceAddModalProps) => {
  const [form, setForm] = useState<CreateMainPreventive | CreateMainCorrective>(
    isPreventive
      ? {
          elevator_id: '',
          period: 'Mensual',
          technician_assigned_id: '',
          technician_selected_id: '',
          supervisor_id: '',
          scheduled_date: new Date().toISOString().split('T')[0],
          scheduled_time: '09:00',
          details: ''
        }
      : {
          elevator_id: '',
          type_maintenance: '',
          technician_assigned_id: '',
          technician_selected_id: '',
          supervisor_id: '',
          scheduled_date: new Date().toISOString().split('T')[0],
          scheduled_time: '09:00',
          details: ''
        }
  );

  const handleClose = () => {
    setForm(
      isPreventive
        ? {
            elevator_id: '',
            period: 'Mensual',
            technician_assigned_id: '',
            technician_selected_id: '',
            supervisor_id: '',
            scheduled_date: new Date().toISOString().split('T')[0],
            scheduled_time: '09:00',
            details: ''
          }
        : {
            elevator_id: '',
            type_maintenance: '',
            technician_assigned_id: '',
            technician_selected_id: '',
            supervisor_id: '',
            scheduled_date: new Date().toISOString().split('T')[0],
            scheduled_time: '09:00',
            details: ''
          }
    );
    onClose();
  };

  const handleSave = () => {
    onSave(form);
    handleClose();
  };

  return (
  <Modal open={open} onClose={handleClose} aria-labelledby="add-maintenance-modal-title">
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      maxWidth: 800,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 24,
      p: 4
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" id="add-maintenance-modal-title" sx={{ color: 'black' }}>
          Nuevo Mantenimiento {isPreventive ? 'Preventivo' : 'Correctivo'}
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: '#476797' }}>
            Información del Mantenimiento
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Elevador</InputLabel>
              <Select
                value={form.elevator_id}
                onChange={(e) => setForm({ ...form, elevator_id: e.target.value })}
                label="Elevador"
              >
                {(elevators || []).map(elevator => (
                  <MenuItem key={elevator.elevator_id} value={elevator.elevator_id}>
                    {elevator.client_name_building + ' - ' + elevator.brand + ' (' + elevator.model + ')'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {isPreventive ? (
              <FormControl fullWidth size="small">
                <InputLabel>Periodo</InputLabel>
                <Select
                  value={(form as CreateMainPreventive).period}
                  onChange={(e) => setForm({ ...form, period: e.target.value })}
                  label="Periodo"
                >
                  <MenuItem value="Mensual">Mensual</MenuItem>
                  <MenuItem value="Trimestral">Trimestral</MenuItem>
                  <MenuItem value="Semestral">Semestral</MenuItem>
                  <MenuItem value="Anual">Anual</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <FormControl fullWidth size="small">
                <InputLabel>Tipo de Mantenimiento</InputLabel>
                <Select
                  value={(form as CreateMainCorrective).type_maintenance|| maintenanceTypes[0]?.maintenance_type || ''}
                  onChange={(e) => setForm({ ...form, type_maintenance: e.target.value })}
                  label="Tipo de Mantenimiento"
                >
                  {(maintenanceTypes || []).map(type => (
                    <MenuItem key={type.index} value={type.maintenance_type}>
                      {type.maintenance_type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <TextField
              label="Fecha Programada"
              type="date"
              value={form.scheduled_date}
              onChange={(e) => setForm({ ...form, scheduled_date: e.target.value })}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Hora Programada"
              type="time"
              value={form.scheduled_time}
              onChange={(e) => setForm({ ...form, scheduled_time: e.target.value })}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: '#476797' }}>
            Detalles Adicionales
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Técnico Asignado</InputLabel>
              <Select
                value={form.technician_assigned_id}
                onChange={(e) => setForm({ ...form, technician_assigned_id: e.target.value })}
                label="Técnico Asignado"
              >
                {(technicians || []).map(tech => (
                  <MenuItem key={tech.id_technician} value={tech.id_technician}>
                    {tech.name_technician}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Técnico Seleccionado</InputLabel>
              <Select
                value={form.technician_selected_id}
                onChange={(e) => setForm({ ...form, technician_selected_id: e.target.value })}
                label="Técnico Seleccionado"
              >
                {(technicians || []).map(tech => (
                  <MenuItem key={tech.id_technician} value={tech.id_technician}>
                    {tech.name_technician}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Supervisor</InputLabel>
              <Select
                value={form.supervisor_id}
                onChange={(e) => setForm({ ...form, supervisor_id: e.target.value })}
                label="Supervisor"
              >
                {(supervisors || []).map(sup => (
                  <MenuItem key={sup.id_supervisor} value={sup.id_supervisor}>
                    {sup.name_supervisor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label={isPreventive ? "Detalles" : "Observaciones"}
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              fullWidth
              size="small"
              multiline
              rows={4}
            />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
        <Button
          onClick={handleClose}
          sx={{
            color: '#476797',
            '&:hover': {
              bgcolor: 'rgba(71, 103, 151, 0.08)'
            }
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            bgcolor: '#476797',
            '&:hover': {
              bgcolor: '#3A5478'
            }
          }}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  </Modal>
);
}