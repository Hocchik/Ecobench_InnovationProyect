import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

interface InventoryHeaderProps {
  onNewRequest: () => void;
}

export const InventoryHeader = ({ onNewRequest }: InventoryHeaderProps) => {
  return (
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h5" sx={{ color: '#1B2559', fontWeight: 600 }}>
        Inventario
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onNewRequest}
          sx={{
            borderRadius: '8px',
            bgcolor: '#476797',
            '&:hover': {
              bgcolor: '#3A5478'
            }
          }}
        >
          NUEVO CARGO
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderRadius: '8px',
            color: '#476797',
            borderColor: '#476797'
          }}
        >
          EXPORTAR
        </Button>
      </Box>
    </Box>
  );
};