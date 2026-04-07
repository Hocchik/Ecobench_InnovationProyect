import { Box, TextField, Typography } from '@mui/material';
import { ElevatorData } from "../data/interfaces/ClientInterfaces";

interface ClientMaintenanceInfoProps {
  elevator: ElevatorData;
  isEditing: boolean;
  editedElevator: ElevatorData;
  onElevatorChange: (updatedElevator: ElevatorData) => void;
}

const ClientMaintenanceInfo = ({
  elevator,
  isEditing,
  editedElevator,
  onElevatorChange
}: ClientMaintenanceInfoProps) => {

  const handleChange = (field: keyof ElevatorData, value: any) => {
    onElevatorChange({
      ...editedElevator,
      [field]: value
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {isEditing ? (
        <>
          <TextField
            label="Frecuencia de Mantenimiento"
            value={editedElevator.maintenance_frequency}
            onChange={(e) => handleChange('maintenance_frequency', e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Acceso"
            value={editedElevator.access}
            onChange={(e) => handleChange('access', e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Características"
            value={editedElevator.characteristics || ''}
            onChange={(e) => handleChange('characteristics', e.target.value)}
            fullWidth
            size="small"
            multiline
            rows={2}
          />
          <TextField
            label="Observaciones"
            value={editedElevator.observation || ''}
            onChange={(e) => handleChange('observation', e.target.value)}
            fullWidth
            size="small"
            multiline
            rows={2}
          />
        </>
      ) : (
        <>
          <Typography><strong>Frecuencia de Mantenimiento:</strong> {elevator.maintenance_frequency}</Typography>
          <Typography><strong>Acceso:</strong> {elevator.access}</Typography>
          {elevator.characteristics && (
            <Typography><strong>Características:</strong> {elevator.characteristics}</Typography>
          )}
          {elevator.observation && (
            <Typography><strong>Observaciones:</strong> {elevator.observation}</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default ClientMaintenanceInfo;