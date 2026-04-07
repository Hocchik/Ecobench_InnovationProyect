import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useState } from 'react';
import { SparePartHistory } from '../api/SupClientInterfaces';

interface Props {
  data: SparePartHistory[];
  onAdd: (data: Omit<SparePartHistory, 'id' | 'elevatorId'>) => Promise<void>;
  onEdit: (item: SparePartHistory) => void;
  onDelete: (id: string) => void;
  employeeId: string;
}

const SparePartHistorySection = ({ data, onAdd, onEdit, onDelete, employeeId }: Props) => {
  const [openForm, setOpenForm] = useState(false);
  const [editingItem, setEditingItem] = useState<SparePartHistory | null>(null);
  const [formData, setFormData] = useState<Omit<SparePartHistory, 'id' | 'elevatorId'>>({
    part: '',
    location: '',
    failureDate: '',
    changeDate: '',
    failureCause: '',
    registeredBy: '',
    createdAt: '',
  });

  const handleOpenForm = (item?: SparePartHistory) => {
    if (item) {
      setFormData({
        part: item.part,
        location: item.location,
        failureDate: item.failureDate,
        changeDate: item.changeDate,
        failureCause: item.failureCause,
        registeredBy: item.registeredBy,
        createdAt: item.createdAt,
      });
      setEditingItem(item);
    } else {
      setFormData({
        part: '',
        location: '',
        failureDate: '',
        changeDate: '',
        failureCause: '',
        registeredBy: employeeId,
        createdAt: '',
      });
      setEditingItem(null);
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingItem(null);
  };

  const handleSubmit = async () => {
    const { part, location, failureDate, changeDate, failureCause } = formData;
    if (!part || !location || !failureDate || !changeDate || !failureCause) {
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
      console.error('Error al guardar repuesto:', error);
    }
  };

  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
        Historial de Repuestos Cambiados y Reparados
      </Typography>
      <Button variant="outlined" onClick={() => handleOpenForm()}>
        Agregar Repuesto
      </Button>

      {data.length ? (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Repuesto</TableCell>
                <TableCell>Ubicación</TableCell>
                <TableCell>Fecha de Avería</TableCell>
                <TableCell>Fecha de Cambio</TableCell>
                <TableCell>Causa de Avería</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.part}</TableCell>
                  <TableCell>{s.location}</TableCell>
                  <TableCell>{s.failureDate}</TableCell>
                  <TableCell>{s.changeDate}</TableCell>
                  <TableCell>{s.failureCause}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenForm(s)}><Edit /></IconButton>
                    <IconButton onClick={() => onDelete(s.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography color="text.secondary">No hay repuestos registrados.</Typography>
      )}

      {/* Modal de formulario */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? 'Editar Repuesto' : 'Agregar Repuesto'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Repuesto"
            value={formData.part}
            onChange={(e) => setFormData({ ...formData, part: e.target.value })}
            fullWidth
          />
          <TextField
            label="Ubicación"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            fullWidth
          />
          <TextField
            label="Fecha de Avería"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.failureDate}
            onChange={(e) => setFormData({ ...formData, failureDate: e.target.value })}
            fullWidth
          />
          <TextField
            label="Fecha de Cambio"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.changeDate}
            onChange={(e) => setFormData({ ...formData, changeDate: e.target.value })}
            fullWidth
          />
          <TextField
            label="Causa de Avería"
            value={formData.failureCause}
            onChange={(e) => setFormData({ ...formData, failureCause: e.target.value })}
            fullWidth
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

export default SparePartHistorySection;