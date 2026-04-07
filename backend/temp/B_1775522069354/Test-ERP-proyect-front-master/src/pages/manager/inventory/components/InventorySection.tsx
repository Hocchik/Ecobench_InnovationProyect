import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Paper
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { InventoryTable } from './InventoryTable';
import { inventoryItems, inventoryColumns } from '../data/inventoryData';

export function InventorySection() {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: '10px',
        height: 'calc(50vh - 20px)',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
          Inventario Disponible
        </Typography>
        <Box>
          <TextField
            placeholder="Buscar por Código o Nombre..."
            size="small"
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': { borderRadius: '8px' },
              '& .MuiInputBase-input': { fontSize: '0.875rem' }
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ height: '100%' }}>
        <InventoryTable rows={inventoryItems} columns={inventoryColumns} />
      </Box>
    </Paper>
  );
}
