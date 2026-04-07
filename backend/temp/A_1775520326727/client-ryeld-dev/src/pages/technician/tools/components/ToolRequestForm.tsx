import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useState } from 'react';
import {
  ToolRequestItemPOST,
  TechnicianPOST,
  ToolRequestPOST
} from '../data/interface/toolinterfaces';
import { useTechTools } from '../context/TechToolsContext';
/* import { availableItems } from '../data/mockTools'; // Simula tu lista de ítems */
import { useAuth } from '../../../../contexts/AuthContext';

const ToolRequestForm = () => {
  const { createToolRequest } = useTechTools();
  const [reason, setReason] = useState('');
  const [items, setItems] = useState<ToolRequestItemPOST[]>([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const {itemsInventory} = useTechTools();

  const { user } = useAuth();
    const name_employee = user?.employeeName ?? "";
    const id_employeed = user?.employeeId ?? "";

  const technician: TechnicianPOST = {
    id_employee: id_employeed,
    name_employee: name_employee
  };

  const handleAddItem = () => {
    const selected = itemsInventory.find((item) => item.id_item === selectedItemId);
    if (selected && quantity) {
      setItems((prev) => [
        ...prev,
        {
          ...selected,
          request_quantity: Number(quantity)
        }
      ]);
      setSelectedItemId('');
      setQuantity('');
    }
  };

  const handleSubmit = async () => {
    const request: ToolRequestPOST = {
      request_number: '',
      technician,
      reason,
      date: new Date().toLocaleDateString('en-CA', {timeZone: 'America/Lima'}),
      status: 'Pending',
      items
    };
    await createToolRequest(request);
    setReason('');
    setItems([]);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Crear Solicitud de Herramientas
      </Typography>

      <TextField
        label="Motivo"
        fullWidth
        multiline
        rows={3}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Selector de herramienta */}
      <FormControl fullWidth sx={{ mb: 1 }}>
        <InputLabel>Herramienta o repuesto</InputLabel>
        <Select
          value={selectedItemId}
          label="Herramienta o repuesto"
          onChange={(e) => setSelectedItemId(e.target.value)}
        >
          {itemsInventory.map((item) => (
            <MenuItem key={item.id_item} value={item.id_item}>
              {item.code_item} - {item.name_item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Cantidad"
        type="number"
        fullWidth
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="outlined"
        fullWidth
        onClick={handleAddItem}
        disabled={!selectedItemId || !quantity}
        sx={{ mb: 3 }}
      >
        Agregar Ítem
      </Button>

      {/* Vista previa de ítems agregados */}
      {items.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Ítems seleccionados:
          </Typography>
          {items.map((item, idx) => (
            <Typography key={idx} sx={{ fontSize: '0.95rem' }}>
              • {item.name_item} ({item.code_item}) - {item.request_quantity} unidades
            </Typography>
          ))}
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={!reason || items.length === 0}
        sx={{ borderRadius: 2 }}
      >
        Enviar solicitud
      </Button>
    </Box>
  );
};

export default ToolRequestForm;