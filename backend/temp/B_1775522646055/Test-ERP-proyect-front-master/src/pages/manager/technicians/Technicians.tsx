
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { TechniciansStats } from './components/TechniciansStats';
import { TechniciansCards } from './components/TechniciansCards';
import { 
  getAllTechnicians,
  getTechniciansInLima,
  getTechniciansInProvince,
  getAvailableTechnicians
} from './data/techniciansData';

function ManagerTechnicians() {
  const allTechnicians = getAllTechnicians();
  const techniciansInLima = getTechniciansInLima();
  const techniciansInProvince = getTechniciansInProvince();
  const availableTechnicians = getAvailableTechnicians();
  return (
    <Box sx={{ p: 3}}>
      {/* Sección de Gráficos Estadísticos */}
      <TechniciansStats technicians={allTechnicians} />

      {/* Sección de Cards de Técnicos - Layout Horizontal */}
      <Grid container spacing={2} direction="row">
        {/* Técnicos en Campo (Lima) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TechniciansCards
            title="En Campo (Lima)"
            technicians={techniciansInLima}
            showProvince={false}
          />
        </Grid>

        {/* Técnicos en Campo (Provincia) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TechniciansCards
            title="En Campo (Provincia)"
            technicians={techniciansInProvince}
            showProvince={true}
          />
        </Grid>

        {/* Técnicos Disponibles */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TechniciansCards
            title="Disponibles"
            technicians={availableTechnicians}
            showProvince={false}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ManagerTechnicians