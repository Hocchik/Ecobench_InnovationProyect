import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import { ElevatorsData, UpdateElevator } from '../api/SupClientInterfaces';

interface ClientTechnicalInfoProps {
  elevators: ElevatorsData[];
  selectedIndex: number;
  onRefresh: () => void;
  onElevatorUpdate: (elevator: UpdateElevator) => Promise<void>;
  onElevatorDelete: (elevatorId: string) => Promise<void>;
  onSelectElevator: (index: number) => void;
}

const ClientTechnicalInfo = ({
  elevators,
  selectedIndex,
  onRefresh,
  onElevatorUpdate,
  onElevatorDelete,
  onSelectElevator,
}: ClientTechnicalInfoProps) => {
  const selectedElevator = elevators[selectedIndex] || null;
  const [isEditing, setIsEditing] = useState(false);
  const [editedElevator, setEditedElevator] = useState<ElevatorsData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSelectChange = (event: any) => {
    onSelectElevator(event.target.value);
    setIsEditing(false);
    setEditedElevator(null);
  };

  const handleEdit = () => {
    if (selectedElevator) {
      setEditedElevator({ ...selectedElevator });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedElevator(null);
  };

  const handleSave = async () => {
    if (!editedElevator) return;

    const payload: UpdateElevator = {
      id_elevator: editedElevator.id,
      elevator_type: editedElevator.elevator_type || '',
      brand: editedElevator.brand || '',
      model: editedElevator.model || '',
      control_system: editedElevator.control_system ?? false,
      machine_room: editedElevator.machine_room ?? false,
      floors: editedElevator.floors ?? 0,
      access_doors: editedElevator.access_doors ?? 0,
      access_mode: editedElevator.access_mode || '',
      maintenance_frequency: editedElevator.maintenance_frequency || '',
      characteristics: editedElevator.characteristics || '',
      observation: editedElevator.observation || '',
      status: editedElevator.status || '',
    };

    try {
      await onElevatorUpdate(payload);
      setSuccessMessage("Elevador actualizado correctamente");
      setIsEditing(false);
      setEditedElevator(null);
      onRefresh();
    } catch (error: any) {
      setErrorMessage(error?.message || "Error al actualizar el elevador");
    }
  };

  const handleDelete = async () => {
    if (!selectedElevator) return;
    try {
      await onElevatorDelete(selectedElevator.id);
      setSuccessMessage("Elevador eliminado correctamente");
      onRefresh();
    } catch (error: any) {
      setErrorMessage(error?.message || "Error al eliminar el elevador");
    }
  };

  const normalizeElevator = (e: ElevatorsData | null): ElevatorsData => ({
    id: e?.id || '',
    elevator_type: e?.elevator_type || '',
    brand: e?.brand || '',
    model: e?.model || '',
    control_system: e?.control_system ?? false,
    machine_room: e?.machine_room ?? false,
    floors: e?.floors ?? 0,
    access_doors: e?.access_doors ?? 0,
    access_mode: e?.access_mode || '',
    maintenance_frequency: e?.maintenance_frequency || '',
    characteristics: e?.characteristics || '',
    observation: e?.observation || '',
    status: e?.status || '',
  });

  const elevator = normalizeElevator(isEditing ? editedElevator : selectedElevator);

  return (
    <Box>
      {elevators.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2, color: '#999' }}>
          No hay elevadores registrados para este cliente.
        </Typography>
      ) : (
        <>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Seleccionar Elevador</InputLabel>
            <Select value={selectedIndex} label="Seleccionar Elevador" onChange={handleSelectChange}>
              {elevators.map((e, i) => (
                <MenuItem key={e.id} value={i}>
                  {`Ascensor ${i + 1} - ${e.brand || 'Sin marca'} ${e.model || ''}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ px: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#1B2559' }}>
              Información técnica del ascensor
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField label="Tipo" fullWidth value={elevator.elevator_type} onChange={e => setEditedElevator({ ...elevator, elevator_type: e.target.value })} disabled={!isEditing} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Marca" fullWidth value={elevator.brand} onChange={e => setEditedElevator({ ...elevator, brand: e.target.value })} disabled={!isEditing} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Modelo" fullWidth value={elevator.model} onChange={e => setEditedElevator({ ...elevator, model: e.target.value })} disabled={!isEditing} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Pisos" type="number" fullWidth value={elevator.floors} onChange={e => setEditedElevator({ ...elevator, floors: Number(e.target.value) })} disabled={!isEditing} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Puertas" type="number" fullWidth value={elevator.access_doors} onChange={e => setEditedElevator({ ...elevator, access_doors: Number(e.target.value) })} disabled={!isEditing} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Modo de acceso" fullWidth value={elevator.access_mode} onChange={e => setEditedElevator({ ...elevator, access_mode: e.target.value })} disabled={!isEditing} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Frecuencia de mantenimiento" fullWidth value={elevator.maintenance_frequency} onChange={e => setEditedElevator({ ...elevator, maintenance_frequency: e.target.value })} disabled={!isEditing} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Estado" fullWidth value={elevator.status} onChange={e => setEditedElevator({ ...elevator, status: e.target.value })} disabled={!isEditing} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Características" fullWidth multiline value={elevator.characteristics} onChange={e => setEditedElevator({ ...elevator, characteristics: e.target.value })} disabled={!isEditing} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Observación" fullWidth multiline value={elevator.observation} onChange={e => setEditedElevator({ ...elevator, observation: e.target.value })} disabled={!isEditing} />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Switch checked={elevator.control_system} onChange={e => setEditedElevator({ ...elevator, control_system: e.target.checked })} disabled={!isEditing} />} label="Sistema de control" />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Switch checked={elevator.machine_room} onChange={e => setEditedElevator({ ...elevator, machine_room: e.target.checked })} disabled={!isEditing} />} label="Cuarto de máquinas" />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', gap: 2 }}>
              {!isEditing ? (
                <>
                  <Button variant="contained" onClick={handleEdit}>Editar</Button>
                  <Button variant="outlined" color="error" onClick={handleDelete}>Eliminar</Button>
                </>
              ) : (
                <>
                  <Button variant="contained" onClick={handleSave}>Guardar</Button>
                  <Button variant="outlined" onClick={handleCancel}>Cancelar</Button>
                </>
              )}
            </Box>
          </Box>
        </>
      )}

      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage(null)}>
        <Alert severity="error" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar open={!!successMessage} autoHideDuration={4000} onClose={() => setSuccessMessage(null)}>
        <Alert severity="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClientTechnicalInfo;
