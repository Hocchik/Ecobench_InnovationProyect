import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid2 as Grid
} from '@mui/material';
import { StatsCards } from './components/StatsCards';
import { ExpenseCategoryChart } from './components/ExpenseCategoryChart';
import { ClientAcquisitionChart } from './components/ClientAcquisitionChart';
import { 
  hrDashboardData, 
  availableYears, 
  availableMonths 
} from './data/dashboardData';

function HRDashboard() {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [selectedMonth, setSelectedMonth] = useState<number>(8); // Agosto

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(event.target.value as number);
  };

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setSelectedMonth(event.target.value as number);
  };

  return (
    <Container maxWidth={false} sx={{
      py: 3, 
      px: { xs: 2, sm: 3 }, 
      height: '100%', 
      overflow: 'auto',
      backgroundColor: '#F8FAFC',
      '&::-webkit-scrollbar': { 
        width: '4px', 
        backgroundColor: 'transparent' 
      },
      '&::-webkit-scrollbar-thumb': { 
        backgroundColor: 'rgba(0,0,0,0.1)', 
        borderRadius: '4px' 
      }
    }}>
      {/* Header */}
      <Box mb={3}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}>
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: '#1B2559', mb: 1 }}>
              Dashboard de Recursos Humanos
            </Typography>
            <Typography variant="body2" sx={{ color: '#476797' }}>
              Resumen financiero y análisis de captación de clientes
            </Typography>
          </Box>

          {/* Filtros */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Año</InputLabel>
              <Select
                value={selectedYear}
                label="Año"
                onChange={handleYearChange}
                sx={{ 
                  bgcolor: '#FFFFFF',
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#F1F5F9'
                  }
                }}
              >
                {availableYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Mes</InputLabel>
              <Select
                value={selectedMonth}
                label="Mes"
                onChange={handleMonthChange}
                sx={{ 
                  bgcolor: '#FFFFFF',
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#F1F5F9'
                  }
                }}
              >
                {availableMonths.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Tarjetas de Estadísticas */}
      <StatsCards stats={hrDashboardData.stats} />

      {/* Gráficos */}
      <Grid container spacing={3}>
        {/* Gráfico Circular - Salidas por Categoría */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <ExpenseCategoryChart data={hrDashboardData.salidasPorCategoria} />
        </Grid>

        {/* Gráfico Lineal - Captación de Clientes */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <ClientAcquisitionChart 
            data={hrDashboardData.captacionClientes}
            selectedYear={selectedYear}
          />
        </Grid>
      </Grid>

      {/* Información adicional */}
      <Box sx={{ 
        mt: 4, 
        p: 2, 
        bgcolor: '#FFFFFF', 
        borderRadius: '8px',
        border: '1px solid #F1F5F9'
      }}>
        <Typography variant="caption" sx={{ color: '#476797' }}>
          Última actualización: {new Date(hrDashboardData.lastUpdated).toLocaleString('es-PE')}
        </Typography>
      </Box>
    </Container>
  );
}

export default HRDashboard;