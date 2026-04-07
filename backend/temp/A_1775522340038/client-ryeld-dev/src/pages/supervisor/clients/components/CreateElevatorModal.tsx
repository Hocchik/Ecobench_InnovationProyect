import {
  Modal,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
} from '@mui/material';
import { CreateElevator } from '../api/SupClientInterfaces';
import { ClientTable } from '../api/SupClientInterfaces'; // Asegúrate de tener esta interfaz

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (elevator: CreateElevator) => void;
  clients: ClientTable[];
  elevatorData: CreateElevator;
  setElevatorData: (data: CreateElevator) => void;
}

function CreateElevatorModal({
  open,
  onClose,
  onCreate,
  clients,
  elevatorData,
  setElevatorData,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ width: 500, p: 3, mx: 'auto', mt: '10vh', borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Crear Nuevo Elevador</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={elevatorData.id_client}
                label="Cliente"
                onChange={e => setElevatorData({ ...elevatorData, id_client: e.target.value })}
              >
                {clients.map(client => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.name_client}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Tipo" fullWidth value={elevatorData.elevator_type} onChange={e => setElevatorData({ ...elevatorData, elevator_type: e.target.value })} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Marca" fullWidth value={elevatorData.brand} onChange={e => setElevatorData({ ...elevatorData, brand: e.target.value })} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Modelo" fullWidth value={elevatorData.model} onChange={e => setElevatorData({ ...elevatorData, model: e.target.value })} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Modo de acceso" fullWidth value={elevatorData.access_mode} onChange={e => setElevatorData({ ...elevatorData, access_mode: e.target.value })} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Frecuencia" fullWidth value={elevatorData.maintenance_frequency} onChange={e => setElevatorData({ ...elevatorData, maintenance_frequency: e.target.value })} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Pisos" type="number" fullWidth value={elevatorData.floors} onChange={e => setElevatorData({ ...elevatorData, floors: Number(e.target.value) })} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Puertas" type="number" fullWidth value={elevatorData.access_doors} onChange={e => setElevatorData({ ...elevatorData, access_doors: Number(e.target.value) })} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Características" fullWidth multiline value={elevatorData.characteristics} onChange={e => setElevatorData({ ...elevatorData, characteristics: e.target.value })} />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel control={<Switch checked={elevatorData.control_system} onChange={e => setElevatorData({ ...elevatorData, control_system: e.target.checked })} />} label="Sistema de control" />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel control={<Switch checked={elevatorData.machine_room} onChange={e => setElevatorData({ ...elevatorData, machine_room: e.target.checked })} />} label="Cuarto de máquinas" />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={() => onCreate(elevatorData)}>Guardar</Button>
        </Box>
      </Paper>
    </Modal>
  );
}

export default CreateElevatorModal;