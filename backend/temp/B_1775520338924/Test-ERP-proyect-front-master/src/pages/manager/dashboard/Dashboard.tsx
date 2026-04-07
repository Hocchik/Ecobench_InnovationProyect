import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { StatsCards, IncomeExpenseChart, TechnicianExpenses } from './components';

function ManagerDashboard() {
  return (
    <Box sx={{ height: '100%', p: 3 }}>
      <StatsCards />
      
      <Grid container spacing={3}>
        {/* Sección del gráfico */}
        <Grid size={{ xs: 12, sm: 8 }}>
          <IncomeExpenseChart />
        </Grid>

        {/* Sección de gastos por técnico */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <TechnicianExpenses />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ManagerDashboard;