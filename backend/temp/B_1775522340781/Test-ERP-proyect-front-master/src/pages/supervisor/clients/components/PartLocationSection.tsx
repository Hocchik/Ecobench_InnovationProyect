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
  MenuItem,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useState } from 'react';
import { ElevatorPartLocation } from '../api/SupClientInterfaces';

const locationLabels: Record<'CM' | 'DA' | 'PA', string> = {
  CM: 'CUARTO DE MÁQUINAS (CM)',
  DA: 'DUCTO DEL ASCENSOR (DA)',
  PA: 'POZO DEL ASCENSOR (PA)',
};

interface Props {
  data: ElevatorPartLocation[];
  onAddOrEdit: (
    location: 'CM' | 'DA' | 'PA',
    data: Omit<ElevatorPartLocation, 'id' | 'elevatorId'>
  ) => Promise<void>;
  onDelete: (id: string) => void;
}

const PartLocationSection = ({ data, onAddOrEdit, onDelete }: Props) => {
  const [openForm, setOpenForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ElevatorPartLocation | null>(null);
  const [formData, setFormData] = useState<Omit<ElevatorPartLocation, 'id' | 'elevatorId'>>({
    location: 'CM',
    element: '',
    description: '',
  });

  const handleOpenForm = (item?: ElevatorPartLocation) => {
    if (item) {
      setFormData({
        location: item.location as 'CM' | 'DA' | 'PA',
        element: item.element,
        description: item.description,
      });
      setEditingItem(item);
    } else {
      setFormData({
        location: 'CM',
        element: '',
        description: '',
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
    const { location, element, description } = formData;
    if (!location || !element || !description) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      await onAddOrEdit(location as 'CM' | 'DA' | 'PA', formData);
      setOpenForm(false);
    } catch (error) {
      console.error('Error al guardar parte por ubicación:', error);
    }
  };

  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
        Historial de Partes por Ubicación
      </Typography>
      <Button variant="outlined" onClick={() => handleOpenForm()}>
        Agregar Parte por Ubicación
      </Button>

      {data.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Ubicación</TableCell>
                <TableCell>Elemento</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((pl) => {
                const locationKey = pl.location as 'CM' | 'DA' | 'PA';
                const label = locationLabels[locationKey] ?? pl.location;

                return (
                  <TableRow key={pl.id}>
                    <TableCell>{label}</TableCell>
                    <TableCell>{pl.element || <em>Sin elemento</em>}</TableCell>
                    <TableCell>{pl.description || <em>Sin descripción</em>}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenForm(pl)}><Edit /></IconButton>
                      <IconButton onClick={() => onDelete(pl.id)}><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography color="text.secondary">No hay partes registradas por ubicación.</Typography>
      )}

      {/* Modal de formulario */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? 'Editar Parte por Ubicación' : 'Agregar Parte por Ubicación'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            select
            label="Ubicación"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value as 'CM' | 'DA' | 'PA' })}
            fullWidth
          >
            {Object.entries(locationLabels).map(([key, label]) => (
              <MenuItem key={key} value={key}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Elemento"
            value={formData.element}
            onChange={(e) => setFormData({ ...formData, element: e.target.value })}
            fullWidth
          />
          <TextField
            label="Descripción"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

export default PartLocationSection;