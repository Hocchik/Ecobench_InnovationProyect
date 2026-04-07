import { Box, Chip, Paper, Typography } from "@mui/material";
import { useDashboard } from "../context/DashboardContext";

const TechnicianStatus = () => {
  const { technicians, loading } = useDashboard();

  const isLoading = loading.technicians || technicians.length === 0;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "20px",
        background: "white",
        boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: "#1B2559", fontWeight: 600, mb: 3 }}
      >
        Estado de los Técnicos
      </Typography>

      {isLoading ? (
        <Typography variant="body2" sx={{ color: "#476797" }}>
          Cargando técnicos...
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {technicians.map((tech) => (
            <Paper
              key={tech.id_technician}
              elevation={0}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
              }}
            >
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#1B2559", fontWeight: 500 }}
                >
                  {tech.name_technician}
                </Typography>
                <Typography variant="body2" sx={{ color: "#A3AED0" }}>
                  Técnico
                </Typography>
              </Box>
              <Chip
                label={tech.status}
                sx={{
                  bgcolor:
                    tech.status === "Disponible" ? "#E6FAF5" : "#FFF6E5",
                  color: tech.status === "Disponible" ? "#476797" : "#FFB547",
                  borderRadius: "8px",
                  height: "24px",
                }}
              />
            </Paper>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default TechnicianStatus;