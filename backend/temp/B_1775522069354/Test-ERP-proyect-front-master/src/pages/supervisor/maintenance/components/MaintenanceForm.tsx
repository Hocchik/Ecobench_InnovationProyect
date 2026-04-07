import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { PreventiveMaintenance, CorrectiveMaintenance } from '../../data/maintenanceData';

interface MaintenanceFormProps {
  maintenance: PreventiveMaintenance | CorrectiveMaintenance;
  setMaintenance: (maintenance: PreventiveMaintenance | CorrectiveMaintenance) => void;
  isPreventive?: boolean;
}

export const MaintenanceForm = ({ maintenance, setMaintenance, isPreventive = true }: MaintenanceFormProps) => {
  const technicians = ['Técnico 1', 'Técnico 2', 'Técnico 3']; // Lista de técnicos
  const supervisors = ['Supervisor 1', 'Supervisor 2']; // Lista de supervisores

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={6}>
        <Typography variant="subtitle2" sx={{ mb: 2, color: '#476797' }}>
          Información del Mantenimiento
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Edificio"
            value={maintenance.building}
            onChange={(e) => setMaintenance({...maintenance, building: e.target.value})}
            fullWidth
            size="small"
          />
          <FormControl fullWidth size="small">
            <InputLabel>Tipo de Ascensor</InputLabel>
            <Select
              value={maintenance.ascensorType}
              onChange={(e) => setMaintenance({...maintenance, ascensorType: e.target.value})}
              label="Tipo de Ascensor"
            >
              <MenuItem value="PASAJEROS 1">PASAJEROS 1</MenuItem>
              <MenuItem value="PASAJEROS 2">PASAJEROS 2</MenuItem>
              <MenuItem value="MONTACARGA">MONTACARGA</MenuItem>
              <MenuItem value="DISCAPACITADOS">DISCAPACITADOS</MenuItem>
            </Select>
          </FormControl>
          {isPreventive ? (
            <FormControl fullWidth size="small">
              <InputLabel>Periodo</InputLabel>
              <Select
                value={(maintenance as PreventiveMaintenance).period}
                onChange={(e) => setMaintenance({...maintenance, period: e.target.value})}
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
              <InputLabel>Tipo</InputLabel>
              <Select
                value={(maintenance as CorrectiveMaintenance).type}
                onChange={(e) => setMaintenance({...maintenance, type: e.target.value})}
                label="Tipo"
              >
                <MenuItem value="Correctivo">Correctivo</MenuItem>
                <MenuItem value="Urgencia">Urgencia</MenuItem>
                <MenuItem value="Emergencia">Emergencia</MenuItem>
                <MenuItem value="Reparación">Reparación</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>
      </Grid>
      <Grid xs={12} md={6}>
        <Typography variant="subtitle2" sx={{ mb: 2, color: '#476797' }}>
          Programación
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Fecha Programada"
            type="date"
            value={maintenance.scheduledDate}
            onChange={(e) => setMaintenance({...maintenance, scheduledDate: e.target.value})}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hora Programada"
            type="time"
            value={maintenance.scheduledTime}
            onChange={(e) => setMaintenance({...maintenance, scheduledTime: e.target.value})}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          {isPreventive && (
            <FormControlLabel
              control={
                <Switch
                  checked={(maintenance as PreventiveMaintenance).notice}
                  onChange={(e) => setMaintenance({...maintenance, notice: e.target.checked})}
                />
              }
              label="Enviar aviso"
            />
          )}
        </Box>
      </Grid>
      <Grid xs={12}>
        <Typography variant="subtitle2" sx={{ mb: 2, color: '#476797' }}>
          Personal Asignado
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Técnico 1</InputLabel>
            <Select
              value={maintenance.technician1}
              onChange={(e) => setMaintenance({...maintenance, technician1: e.target.value})}
              label="Técnico 1"
            >
              {technicians.map((tech) => (
                <MenuItem key={tech} value={tech}>{tech}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Técnico 2</InputLabel>
            <Select
              value={maintenance.technician2}
              onChange={(e) => setMaintenance({...maintenance, technician2: e.target.value})}
              label="Técnico 2"
            >
              {technicians.map((tech) => (
                <MenuItem key={tech} value={tech}>{tech}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Supervisor</InputLabel>
            <Select
              value={maintenance.supervisor}
              onChange={(e) => setMaintenance({...maintenance, supervisor: e.target.value})}
              label="Supervisor"
            >
              {supervisors.map((sup) => (
                <MenuItem key={sup} value={sup}>{sup}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid xs={12}>
        <TextField
          label="Detalles"
          value={maintenance.details}
          onChange={(e) => setMaintenance({...maintenance, details: e.target.value})}
          fullWidth
          multiline
          rows={4}
          size="small"
        />
      </Grid>
    </Grid>
  );
};