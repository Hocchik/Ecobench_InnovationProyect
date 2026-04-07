import { Container, Box, Typography, Grid } from '@mui/material';
import CajaChicaCard from './components/CajaChicaCard';
import CargosSolicitados from './components/CargosSolicitados';
import ActividadSemanal from './components/ActividadSemanal';

function AuxiliaryDashboard() {
  return (
    <Container 
      maxWidth={false} 
      sx={{
        py: 3,
        px: { xs: 2, sm: 3 },
        height: '100%',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '4px',
          backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: '4px'
        },
        '&:hover::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.2)'
        }
      }}
    >
      <Box mb={3}>
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            fontWeight: 600, 
            color: '#1B2559',
            mb: 1
          }}
        >
          Panel de Control
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#476797',
          }}
        >
          Bienvenido(a) al panel de control del auxiliar administrativo
        </Typography>
      </Box>

      {/* Sección de Caja Chica */}
      <CajaChicaCard />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          {/* Sección de Cargos Solicitados */}
          <CargosSolicitados />
        </Grid>
        
        <Grid item xs={12} lg={8}>
          {/* Sección de Actividad Semanal */}
          <ActividadSemanal />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AuxiliaryDashboard;