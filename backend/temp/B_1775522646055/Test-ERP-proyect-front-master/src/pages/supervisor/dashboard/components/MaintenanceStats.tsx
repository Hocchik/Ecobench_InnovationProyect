import { Box, Grid, Paper, Typography } from "@mui/material";
import { useDashboard } from "../context/DashboardContext";

const MaintenanceStats = () => {
  const { maintenanceStats, loading } = useDashboard();

  const isLoading = loading.maintenanceStats || !maintenanceStats;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: "20px",
        background: "white",
        boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
        textAlign: isLoading ? "center" : "inherit",
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: "#1B2559", fontWeight: 600, mb: 2 }}
      >
        Mantenimientos
      </Typography>

      {isLoading ? (
        <Typography variant="body2" sx={{ color: "#476797" }}>
          Cargando datos...
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ color: "#476797", fontWeight: 600 }}
              >
                {maintenanceStats.scheduled}
              </Typography>
              <Typography variant="body2" sx={{ color: "#476797" }}>
                Programados
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ color: "#FFB547", fontWeight: 600 }}
              >
                {maintenanceStats.pending}
              </Typography>
              <Typography variant="body2" sx={{ color: "#FFB547" }}>
                Pendientes
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ color: "#05CD99", fontWeight: 600 }}
              >
                {maintenanceStats.completed}
              </Typography>
              <Typography variant="body2" sx={{ color: "#05CD99" }}>
                Completados
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default MaintenanceStats;