import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';

interface MaintenanceHeaderProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
  onAddNew: () => void;
}

export const MaintenanceHeader: React.FC<MaintenanceHeaderProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  onAddNew
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Título y total */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={2}
      >        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="#1B2559">
            Gestión de Mantenimientos
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddNew}
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
          Nuevo Mantenimiento
        </Button>
      </Box>

      {/* Filtros y búsqueda */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2, 
          flexWrap: 'wrap',
          bgcolor: '#F8F9FF',
          p: 2,
          borderRadius: '20px',
          border: '1px solid #E2E8F0'
        }}
      >
        {/* Campo de búsqueda */}        <TextField
          placeholder="Buscar por cliente, edificio o técnico..."
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
          sx={{
            flex: 1,
            minWidth: '300px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: 'white'
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

        {/* Filtro por estado */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Estado</InputLabel>
          <Select
            value={statusFilter}
            label="Estado"
            onChange={(e) => onStatusFilterChange(e.target.value)}
            sx={{
              borderRadius: '8px',
              backgroundColor: 'white'
            }}
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="Programado">Programado</MenuItem>
            <MenuItem value="En Progreso">En Progreso</MenuItem>
            <MenuItem value="Completado">Completado</MenuItem>
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="Cancelado">Cancelado</MenuItem>
          </Select>
        </FormControl>

        {/* Filtro por tipo */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Tipo</InputLabel>
          <Select
            value={typeFilter}
            label="Tipo"
            onChange={(e) => onTypeFilterChange(e.target.value)}
            sx={{
              borderRadius: '8px',
              backgroundColor: 'white'
            }}
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="Preventivo">Preventivo</MenuItem>
            <MenuItem value="Correctivo">Correctivo</MenuItem>
            <MenuItem value="Urgencia">Urgencia</MenuItem>
            <MenuItem value="Emergencia">Emergencia</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
