/**
 * Header del módulo de Clientes para HR
 * Incluye título, contador, búsqueda y botón para agregar
 */

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Stack
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon,
  People as PeopleIcon
} from '@mui/icons-material';

interface ClientsHeaderProps {
  totalClients: number;
  activeClients: number;
  onSearchChange?: (searchTerm: string) => void;
  onAddClient?: () => void;
}

export const ClientsHeader: React.FC<ClientsHeaderProps> = ({
  totalClients,
  activeClients,
  onSearchChange,
  onAddClient
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 3,
        mb: 3,
        p: 3,
        bgcolor: 'white',
        borderRadius: '20px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        border: '1px solid #E2E8F0'
      }}
    >
      {/* Título y estadísticas */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '20px',
            bgcolor: 'rgba(71, 103, 151, 0.1)',
            color: '#476797'
          }}
        >
          <PeopleIcon sx={{ fontSize: 24 }} />
        </Box>
        
        <Box>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              color: '#1B2559',
              mb: 0.5
            }}
          >
            Gestión de Clientes
          </Typography>
          
          <Stack direction="row" spacing={2}>
            <Chip
              label={`${totalClients} Total`}
              sx={{
                bgcolor: '#E6FAF5',
                color: '#476797',
                fontWeight: 600,
                fontSize: '0.875rem',
                '& .MuiChip-label': {
                  px: 1.5
                }
              }}
            />
            <Chip
              label={`${activeClients} Activos`}
              sx={{
                bgcolor: '#E3F2FD',
                color: '#1976D2',
                fontWeight: 600,
                fontSize: '0.875rem',
                '& .MuiChip-label': {
                  px: 1.5
                }
              }}
            />
          </Stack>
        </Box>
      </Box>

      {/* Controles de búsqueda y acciones */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        width: { xs: '100%', sm: 'auto' }
      }}>
        <TextField
          placeholder="Buscar cliente, contacto, distrito..."
          size="small"
          onChange={handleSearchChange}
          sx={{
            width: { xs: '100%', sm: '350px' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              bgcolor: '#F8F9FF',
              border: '1px solid #E2E8F0',
              '&:hover': {
                borderColor: '#CBD5E0'
              },
              '&.Mui-focused': {
                borderColor: '#476797',
                boxShadow: '0 0 0 3px rgba(71, 103, 151, 0.1)'
              }
            },
            '& .MuiInputBase-input': {
              fontSize: '0.875rem',
              color: '#2D3748',
              '&::placeholder': {
                color: '#A0AEC0',
                opacity: 1
              }
            }
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon 
                    fontSize="small" 
                    sx={{ color: '#A0AEC0' }} 
                  />
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
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            px: 3,
            py: 1,
            boxShadow: '0 4px 12px rgba(71, 103, 151, 0.3)',
            '&:hover': {
              bgcolor: '#3A5578',
              boxShadow: '0 6px 16px rgba(71, 103, 151, 0.4)',
              transform: 'translateY(-1px)'
            },
            '&:active': {
              transform: 'translateY(0)'
            },
            transition: 'all 0.2s ease-in-out',
            whiteSpace: 'nowrap'
          }}
        >
          Nuevo Cliente
        </Button>
      </Box>
    </Box>
  );
};
