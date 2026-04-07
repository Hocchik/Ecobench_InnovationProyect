import { Grid, Typography } from "@mui/material";
import { MainCorrective, MainPreventive } from "../api/SupMaintenanceInterfaces";

export const MaintenanceView = ({ maintenance }: { maintenance: MainPreventive | MainCorrective }) => {
  const isPreventive = "period" in maintenance;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography><strong>Edificio:</strong> {maintenance.building_client}</Typography>
        <Typography><strong>Tipo de Ascensor:</strong> {maintenance.ascensor_type}</Typography>
        <Typography><strong>Fecha Programada:</strong> {maintenance.scheduled_date}</Typography>
        <Typography><strong>Fecha Real:</strong> {maintenance.scheduled_real_date}</Typography>
        <Typography><strong>Hora Programada:</strong> {maintenance.scheduled_time}</Typography>
        {isPreventive ? (
          <Typography><strong>Periodo:</strong> {(maintenance as MainPreventive).period}</Typography>
        ) : (
          <Typography><strong>Tipo de Mantenimiento:</strong> {(maintenance as MainCorrective).type_maintenance}</Typography>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography><strong>Técnico Seleccionado:</strong> {maintenance.name_technician_selected || "No asignado"}</Typography>
        <Typography><strong>Técnico Ejecutor:</strong> {maintenance.name_technician_executor || "No asignado"}</Typography>
        <Typography><strong>Supervisor:</strong> {maintenance.name_supervisor || "No asignado"}</Typography>
        {isPreventive ? (
          <>
            <Typography><strong>Aviso:</strong> {(maintenance as MainPreventive).notice ? "Sí" : "No"}</Typography>
            <Typography><strong>Detalles:</strong> {(maintenance as MainPreventive).observations || "Sin detalles"}</Typography>
          </>
        ) : (
          <Typography><strong>Observaciones:</strong> {(maintenance as MainCorrective).observations || "Sin observaciones"}</Typography>
        )}
        <Typography><strong>Completado:</strong> {maintenance.completed_status ? "Sí" : "No"}</Typography>
        <Typography><strong>Revisado:</strong> {maintenance.checked ? "Sí" : "No"}</Typography>
      </Grid>
    </Grid>
  );
};