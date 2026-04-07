import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
  Typography
} from "@mui/material";
import { CreateTechnicianExpenseDTO } from "../api/TechMyExpensesInterfaces";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const expenseTypes = [
  "Almuerzo",
  "Cena",
  "Desayuno",
  "Pasaje",
  "Taxi",
  "Transporte público",
  "Peaje",
  "Estacionamiento",
  "Hospedaje",
  "Recarga móvil",
  "Papelería",
  "Otros"
];

const AddExpenseModal = ({
  open,
  onClose,
  onSubmit
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (dto: Omit<CreateTechnicianExpenseDTO, 'technicianId'>) => void;
}) => {
  const today = new Date().toISOString().split('T')[0];

  const [type, setType] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [date, setDate] = useState(today);

  const [typeTouched, setTypeTouched] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);
  const [dateTouched, setDateTouched] = useState(false);

  const isValid =
    type.trim() !== '' &&
    typeof amount === 'number' &&
    amount > 0 &&
    date.trim() !== '';

  const handleSubmit = () => {
    if (!isValid) return;

    const dto = { type, amount: Number(amount), date };
    console.log('📦 DTO enviado desde modal:', dto);

    onSubmit(dto);
    onClose();
    setType('');
    setAmount('');
    setDate(today);
    setTypeTouched(false);
    setAmountTouched(false);
    setDateTouched(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="add-expense-title"
      aria-modal="true"
      role="dialog"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="add-expense-title">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AddCircleOutlineIcon sx={{ color: '#476797' }} />
          <Typography variant="h6" sx={{ color: '#1B2559' }}>
            Registrar nuevo gasto
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ px: 3, py: 2 }}>
        {/* Tipo de gasto */}
        <FormControl
          fullWidth
          margin="normal"
          error={typeTouched && !type}
        >
          <InputLabel id="type-label">Tipo de gasto</InputLabel>
          <Select
            labelId="type-label"
            value={type}
            label="Tipo de gasto"
            onChange={(e) => setType(e.target.value)}
            onBlur={() => setTypeTouched(true)}
          >
            {expenseTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {typeTouched && !type && (
            <FormHelperText>Selecciona un tipo válido</FormHelperText>
          )}
        </FormControl>

        {/* Monto */}
        <TextField
          label="Monto (S/.)"
          type="number"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value === '' ? '' : parseFloat(e.target.value))
          }
          onBlur={() => setAmountTouched(true)}
          slotProps={{ htmlInput: { min: 0.01, step: 0.01 } }}
          error={amountTouched && (typeof amount !== 'number' || amount <= 0)}
          helperText={
            amountTouched && (typeof amount !== 'number' || amount <= 0)
              ? 'Ingresa un monto mayor a cero'
              : ''
          }
        />

        {/* Fecha */}
        <TextField
          label="Fecha"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={() => setDateTouched(true)}
          error={dateTouched && !date}
          helperText={dateTouched && !date ? 'Selecciona una fecha válida' : ''}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            color: '#A3AED0',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isValid}
          sx={{
            textTransform: 'none',
            bgcolor: '#476797',
            '&:hover': { bgcolor: '#3b5a7a' }
          }}
        >
          Guardar gasto
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseModal;