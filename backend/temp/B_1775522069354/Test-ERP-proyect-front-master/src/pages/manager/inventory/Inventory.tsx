import { InventorySection } from './components/InventorySection';
import { ConsumptionChart } from './components/ConsumptionChart';
import { SalesStatsCard } from './components/SalesStatsCard';
import { TopItemsCard } from './components/TopItemsCard';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

function ManagerInventory() {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} direction={"row"} justifyContent="space-between">
        <Grid size={{ xs: 12, lg: 9 }} direction={"column"}>
          {/*Bloque1*/}
          <Grid>
            <InventorySection />
          </Grid>
          {/*Bloque2*/}
          <Grid mt={2}>
            <ConsumptionChart />
          </Grid>
        </Grid>
        <Grid container size={{ xs: 12, lg: 3 }} direction="column" spacing={2}>
          {/* Bloque 3: Total Ventas Repuestos */}
          <Grid>
            <SalesStatsCard />
          </Grid>

          {/* Bloque 4: Repuestos con Mayor Salida */}
          <Grid>
            <TopItemsCard />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ManagerInventory;