import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Chip
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';

interface ClientsHeaderProps {
  totalClients: number;
  onSearchChange?: (searchTerm: string) => void;
  onAddClient?: () => void;
}

export function ClientsHeader({
  totalClients,
  onSearchChange,
  onAddClient
}: ClientsHeaderProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        mb: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Gestión de Clientes
        </Typography>
        <Chip
          label={`Total: ${totalClients}`}
          sx={{
            bgcolor: '#E6FAF5',
            color: '#05CD99',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          placeholder="Buscar cliente..."
          size="small"
          onChange={handleSearchChange}
          sx={{
            width: { xs: '100%', sm: '300px' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: '#F8F9FF'
            },
            '& .MuiInputBase-input': {
              fontSize: '0.875rem'
            }
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: '#476797' }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddClient}
          sx={{
            bgcolor: '#476797',
            color: 'white',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              bgcolor: '#3A5578',
            },
            whiteSpace: 'nowrap'
          }}
        >
          Agregar Cliente
        </Button>
      </Box>
    </Box>
  );
}
