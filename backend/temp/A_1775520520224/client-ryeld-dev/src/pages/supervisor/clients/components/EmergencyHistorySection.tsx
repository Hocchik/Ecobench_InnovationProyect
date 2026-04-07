import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useState } from 'react';
import { EmergencyHistory } from '../api/SupClientInterfaces';

interface Props {
  data: EmergencyHistory[];
  onAdd: (data: Omit<EmergencyHistory, 'id' | 'elevatorId'>) => Promise<void>;
  onEdit: (item: EmergencyHistory) => void;
  onDelete: (id: string) => void;
  employeeId: string; // ← nuevo prop
}

const EmergencyHistorySection = ({ data, onAdd, onEdit, onDelete, employeeId }: Props) => {
  const [openForm, setOpenForm] = useState(false);
  const [editingItem, setEditingItem] = useState<EmergencyHistory | null>(null);
  const [formData, setFormData] = useState<Omit<EmergencyHistory, 'id' | 'elevatorId'>>({
    date: '',
    description: '',
    location: '',
    cause: '',
    peopleTrapped: false,
    registeredBy: '',
    createdAt: '',
  });

  const handleOpenForm = (item?: EmergencyHistory) => {
    if (item) {
        setFormData({
        date: item.date,
        description: item.description,
        location: item.location,
        cause: item.cause,
        peopleTrapped: item.peopleTrapped,
        registeredBy: item.registeredBy,
        createdAt: item.createdAt,
        });
        setEditingItem(item);
    } else {
        setFormData({
        date: '',
        description: '',
        location: '',
        cause: '',
        peopleTrapped: false,
        registeredBy: employeeId,
        createdAt: '',
        });
        setEditingItem(null);
    }
    setOpenForm(true);
    };


  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSubmit = async () => {
    const { date, description, location, cause } = formData;
    if (!date || !description || !location || !cause) {
        alert('Todos los campos son obligatorios');
        return;
    }

    try {
        if (editingItem) {
        onEdit({ ...editingItem, ...formData });
        } else {
        await onAdd(formData);
        }
        setOpenForm(false);
    } catch (error) {
        console.error('Error al guardar emergencia:', error);
    }
    };


  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
        Historial de Urgencias y Emergencias
      </Typography>
      <Button variant="outlined" onClick={() => handleOpenForm()}>
        Agregar Emergencia
        </Button>

      {data.length ? (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Ubicación</TableCell>
                <TableCell>Causa</TableCell>
                <TableCell>Personas Atrapadas</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.date}</TableCell>
                  <TableCell>{e.description}</TableCell>
                  <TableCell>{e.location}</TableCell>
                  <TableCell>{e.cause}</TableCell>
                  <TableCell>
                    <Chip
                      label={e.peopleTrapped ? 'Sí' : 'No'}
                      color={e.peopleTrapped ? 'error' : 'success'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenForm(e)}><Edit /></IconButton>
                    <IconButton onClick={() => onDelete(e.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography color="text.secondary">No hay atenciones registradas.</Typography>
      )}

      {/* Modal de formulario */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogTitle>Agregar Emergencia</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            autoFocus
            label="Fecha"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            fullWidth
            />
          <TextField
            label="Descripción"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            fullWidth
          />
          <TextField
            label="Ubicación"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            fullWidth
          />
          <TextField
            label="Causa"
            value={formData.cause}
            onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.peopleTrapped}
                onChange={(e) => setFormData({ ...formData, peopleTrapped: e.target.checked })}
              />
            }
            label="¿Hubo personas atrapadas?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmergencyHistorySection;