import { Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

interface MaintenanceHeaderProps {
  searchField: string;
  searchValue: string;
  tabValue: number;
  setSearchField: (value: string) => void;
  setSearchValue: (value: string) => void;
  setIsAddModalOpen: (value: boolean) => void;
}

export const MaintenanceHeader = ({
  searchField,
  searchValue,
  tabValue,
  setSearchField,
  setSearchValue,
  setIsAddModalOpen
}: MaintenanceHeaderProps) => {
  return (
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h5" sx={{ color: '#1B2559', fontWeight: 600 }}>
        Mantenimientos
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Campo de búsqueda</InputLabel>
            <Select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              label="Campo de búsqueda"
            >
              <MenuItem value="building">Edificio</MenuItem>
              <MenuItem value="month">Mes</MenuItem>
              <MenuItem value="scheduledDate">Fecha Programada</MenuItem>
              <MenuItem value="ascensorType">Tipo de Ascensor</MenuItem>
              {tabValue === 0 && <MenuItem value="period">Periodo</MenuItem>}
              {tabValue === 1 && <MenuItem value="type">Tipo de Mantenimiento</MenuItem>}
            </Select>
          </FormControl>
          <TextField
            placeholder="Buscar..."
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{
              minWidth: 200,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px'
              }
            }}
          />
        </Box>
        <Button
          variant="outlined"
          sx={{
            borderRadius: '8px',
            color: '#476797',
            borderColor: '#476797'
          }}
        >
          Exportar
        </Button>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsAddModalOpen(true)}
          sx={{
            borderRadius: '8px',
            bgcolor: '#476797',
            '&:hover': {
              bgcolor: '#3A5478'
            }
          }}
        >
          Agregar Mantenimiento
        </Button>
      </Box>
    </Box>
  );
};