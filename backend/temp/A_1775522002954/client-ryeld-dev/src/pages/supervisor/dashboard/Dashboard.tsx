import { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import MaintenanceStats from "./components/MaintenanceStats";
import TechnicianStatus from "./components/TechnicianStatus";
import MonthlyActivities from "./components/MonthlyActivities";
import InboxTray from "./components/InboxTray";
import { useDashboard } from "./context/DashboardContext";

function Dashboard() {
  const {
    getNotifications,
    getMaintenanceStats,
    getTechnicians,
    getCalendarActivities,
    clearError,
  } = useDashboard();

  useEffect(() => {
    // 🔹 Cargar datos al montar el dashboard
    getNotifications();
    getMaintenanceStats();
    getTechnicians();
    getCalendarActivities();

    // 🔹 Limpiar errores previos si los hay
    return () => clearError();
  }, [
    getNotifications,
    getMaintenanceStats,
    getTechnicians,
    getCalendarActivities,
    clearError,
  ]);

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "4px",
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: "4px",
        },
        "&:hover::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
      }}
    >
      <Grid container spacing={3} sx={{ p: 1 }}>
        <Grid item xs={12} lg={8}>
          <MaintenanceStats />

          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TechnicianStatus />
              </Grid>

              <Grid item xs={12} md={6}>
                <MonthlyActivities />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} lg={4}>
          <InboxTray />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;