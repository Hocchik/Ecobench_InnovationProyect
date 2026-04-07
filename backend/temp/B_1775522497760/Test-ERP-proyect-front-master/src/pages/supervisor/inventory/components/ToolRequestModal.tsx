import {
  Modal, Paper, Typography, Box, TextField, Button, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Autocomplete, Alert, Grid, Divider, FormControl, Select, MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { Close, Add, Delete } from '@mui/icons-material';
import { useState } from 'react';
import {
  ToolRequestPOST,
  ToolRequestItemPOST,
  InventoryItem,
  TechnicianPOST,
  ToolRequestStatus
} from '../api/SupInventoryInterfaces';
import { useDataApi } from '../../../../contexts/DataContext';
import { useSupInventory } from '../context/SupInventoryContext';

interface ToolRequestModalProps {
  open: boolean;
  onClose: () => void;
  inventoryItems: InventoryItem[];
  onSubmit: (request: ToolRequestPOST) => void;
  initialData?: ToolRequestPOST;
}

export default function ToolRequestModal({
  open, onClose, inventoryItems, onSubmit, initialData
}: ToolRequestModalProps) {
  const [technician, setTechnician] = useState<TechnicianPOST>(
    initialData?.technician ?? { id_employee: '', name_employee: '' }
  );
  const [reason, setReason] = useState(initialData?.reason ?? '');
  const [selectedItems, setSelectedItems] = useState<(ToolRequestItemPOST & { category?: string })[]>(
    initialData?.items ?? []
  );
  const [error, setError] = useState<string | null>(null);

  const { techs } = useDataApi();
  const { toolRequests } = useSupInventory();

  const getVisualAvailable = (id_item: string) => {
    const inventory = inventoryItems.find(i => i.id_item === id_item);
    const base = inventory?.total_quantity ?? 0;
    const requested = selectedItems
      .filter(item => item.id_item === id_item)
      .reduce((acc, curr) => acc + curr.request_quantity, 0);
    return base - requested;
  };

  const handleAddItem = () => {
    setSelectedItems([
      ...selectedItems,
      {
        category: '',
        id_item: '',
        code_item: '',
        name_item: '',
        request_quantity: 1
      }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (index: number, category: string) => {
    const newItems = [...selectedItems];
    newItems[index] = {
      category,
      id_item: '',
      code_item: '',
      name_item: '',
      request_quantity: 1
    };
    setSelectedItems(newItems);
  };

  const handleItemChange = (index: number, newValue: InventoryItem | null) => {
    if (!newValue) return;
    const newItems = [...selectedItems];
    newItems[index] = {
      ...newItems[index],
      id_item: newValue.id_item,
      code_item: newValue.code_item,
      name_item: newValue.name_item,
      request_quantity: 1
    };
    setSelectedItems(newItems);
  };

  const handleQuantityChange = (index: number, value: number) => {
    const item = selectedItems[index];
    const available = getVisualAvailable(item.id_item) + item.request_quantity;
    const newItems = [...selectedItems];
    newItems[index] = {
      ...item,
      request_quantity: Math.max(1, Math.min(value, available))
    };
    setSelectedItems(newItems);
  };

  const handleTechnicianChange = (event: SelectChangeEvent) => {
    const selected = techs.find((t) => t.id_technician === event.target.value);
    setTechnician({
      id_employee: selected?.id_technician ?? '',
      name_employee: selected?.name_technician ?? ''
    });
  };

  const getItemsByCategory = (category: string) =>
    inventoryItems.filter(item => item.category === category);

  const handleSubmit = () => {
    if (!technician.id_employee || !technician.name_employee) {
      setError('Por favor, seleccione un técnico');
      return;
    }
    if (!reason.trim()) {
      setError('Por favor, ingrese un motivo para el cargo');
      return;
    }
    if (selectedItems.length === 0) {
      setError('Por favor, agregue al menos un item');
      return;
    }
    const invalidItems = selectedItems.filter(
      (item) =>
        !item.category || !item.id_item || !item.code_item || !item.name_item || item.request_quantity < 1
    );
    if (invalidItems.length > 0) {
      setError('Por favor, complete la información de todos los items');
      return;
    }

    const request_number = initialData?.request_number ?? `CAS-${toolRequests.length + 1}`;
    const fallbackStatus: ToolRequestStatus =
      initialData?.status && Object.values(ToolRequestStatus).includes(initialData.status as ToolRequestStatus)
        ? initialData.status as ToolRequestStatus
        : ToolRequestStatus.Pending;

    const newRequest: ToolRequestPOST = {
      ...(initialData?.id_tool_request ? { id_tool_request: initialData.id_tool_request } : {}),
      request_number,
      technician: {
        id_employee: technician.id_employee,
        name_employee: technician.name_employee
      },
      reason,
      date: initialData?.date ?? new Date().toISOString().split('T')[0],
      status: fallbackStatus,
      items: selectedItems.map(item => ({
        id_item: item.id_item,
        code_item: item.code_item,
        name_item: item.name_item,
        request_quantity: item.request_quantity
      }))
    };

    console.log('Solicitud enviada:', newRequest);
    onSubmit(newRequest);

    if (!initialData) {
      setTechnician({ id_employee: '', name_employee: '' });
      setReason('');
      setSelectedItems([]);
      setError(null);
    }
  };

  return (
  <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Paper sx={{
      width: '90%',
      maxWidth: '900px',
      maxHeight: '90vh',
      overflow: 'auto',
      p: 4,
      borderRadius: '20px'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h6" sx={{ color: '#1B2559', fontWeight: 600 }}>
          {initialData ? 'Actualizar Cargo' : 'Nuevo Cargo'}
        </Typography>
        <IconButton onClick={onClose}><Close /></IconButton>
      </Box>

      <Divider sx={{ mb: 4 }} />
      {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1.5, color: '#476797', fontWeight: 'bold' }}>
            Técnico Responsable
          </Typography>
          <FormControl fullWidth>
            <Select
              value={technician.id_employee}
              onChange={handleTechnicianChange}
              displayEmpty
              size="small"
              sx={{
                borderRadius: '10px',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E0E3E7' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#476797' }
              }}
            >
              <MenuItem value="" disabled>
                <Typography color="text.secondary">Seleccione un técnico</Typography>
              </MenuItem>
              {techs.map((tech: any) => (
                <MenuItem key={tech.id_technician} value={tech.id_technician}>
                  <Typography>{tech.name_technician}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1.5, color: '#476797', fontWeight: 'bold' }}>
            Motivo del Cargo
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Describa el motivo del cargo"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                '& fieldset': { borderColor: '#E0E3E7' },
                '&:hover fieldset': { borderColor: '#476797' }
              }
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2.5, color: '#476797', fontWeight: 600 }}>
          Items Solicitados
        </Typography>
        <TableContainer sx={{ mb: 3, borderRadius: '10px', border: '1px solid #E0E3E7' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#476797' }}>Categoría</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#476797' }}>Item</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#476797' }}>Código</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#476797' }}>Cantidad Solicitada</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#476797' }}>Stock Disponible</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#476797' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedItems.map((item, index) => {
                const inventoryItem = inventoryItems.find(inv => inv.id_item === item.id_item);
                const baseAvailable = inventoryItem?.total_quantity ?? 0;
                const totalRequested = selectedItems
                  .filter((it, idx) => it.id_item === item.id_item && idx !== index)
                  .reduce((acc, curr) => acc + curr.request_quantity, 0);
                const visualAvailable = baseAvailable - totalRequested;

                return (
                  <TableRow key={index}>
                    <TableCell>
                      <FormControl fullWidth size="small">
                        <Select
                          value={item.category ?? ''}
                          onChange={(e) => handleCategoryChange(index, e.target.value)}
                          displayEmpty
                          sx={{ borderRadius: '8px' }}
                        >
                          <MenuItem value="" disabled>Seleccione categoría</MenuItem>
                          <MenuItem value="Consumibles">Consumibles</MenuItem>
                          <MenuItem value="Repuestos">Repuestos</MenuItem>
                          <MenuItem value="Herramientas">Herramientas</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Autocomplete
                        options={getItemsByCategory(item.category ?? '')}
                        getOptionLabel={(option) => option.name_item}
                        value={inventoryItems.find(opt => opt.id_item === item.id_item) || null}
                        onChange={(_, newValue) => handleItemChange(index, newValue)}
                        renderInput={(params) => (
                          <TextField {...params} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                        )}
                        sx={{ width: 250 }}
                        disabled={!item.category}
                      />
                    </TableCell>
                    <TableCell>{item.code_item}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={item.request_quantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                        inputProps={{
                          min: 1,
                          max: visualAvailable + item.request_quantity
                        }}
                        sx={{ width: 80, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                      />
                    </TableCell>
                    <TableCell>{Math.max(0, visualAvailable - item.request_quantity)}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleRemoveItem(index)}
                        color="error"
                        size="small"
                        sx={{ '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.04)' } }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          startIcon={<Add />}
          onClick={handleAddItem}
          variant="outlined"
          sx={{
            color: '#476797',
            borderColor: '#476797',
            borderRadius: '8px',
            '&:hover': {
              borderColor: '#476797',
              bgcolor: 'rgba(71, 103, 151, 0.04)'
            }
          }}
        >
          Agregar Item
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: '#476797',
            borderColor: '#476797',
            borderRadius: '8px',
            px: 3,
            '&:hover': {
              borderColor: '#476797',
              bgcolor: 'rgba(71, 103, 151, 0.04)'
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
            px: 3,
            '&:hover': { bgcolor: '#3A5478' }
          }}
        >
          {initialData ? 'Actualizar Cargo' : 'Generar Cargo'}
        </Button>
      </Box>
    </Paper>
  </Modal>
);
}