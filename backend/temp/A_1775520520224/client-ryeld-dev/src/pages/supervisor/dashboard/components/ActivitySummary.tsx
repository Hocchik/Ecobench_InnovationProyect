import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { CompletedActivityNoti } from "../api/SupDashboardInterfaces";

interface ActivitySummaryModalProps {
  open: boolean;
  onClose: () => void;
  activity: CompletedActivityNoti;
}

const ActivitySummaryModal = ({
  open,
  onClose,
  activity,
}: ActivitySummaryModalProps) => {
  if (!activity) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          backgroundColor: "#F9FAFB",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: "#1B2559", pb: 1 }}>
        ✅ Resumen de Actividad Completada
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#4C5C7A" }}>
            {activity.title}
          </Typography>

          <Typography variant="body2" sx={{ color: "#A3AED0" }}>
            Orden: {activity.order_number}
          </Typography>
          <Typography variant="body2" sx={{ color: "#A3AED0" }}>
            Edificio: {activity.building_client}
          </Typography>
          <Typography variant="body2" sx={{ color: "#A3AED0" }}>
            Dirección: {activity.address}
          </Typography>
          <Typography variant="body2" sx={{ color: "#A3AED0" }}>
            Tipo: {activity.type_activity}
          </Typography>
          <Typography variant="body2" sx={{ color: "#A3AED0" }}>
            Fecha: {activity.date} ({activity.start_time} - {activity.end_time})
          </Typography>
          <Typography variant="body2" sx={{ color: "#A3AED0", mb: 1 }}>
            Técnico: {activity.executor}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Section title="🛠 Actividades Realizadas" items={activity.activities} />
        <Section title="🔧 Herramientas Utilizadas" items={activity.tools.map(t => `${t.name} (Cantidad: ${t.quantity})`)} />
        <Section title="🔩 Repuestos Utilizados" items={activity.required_parts.map(p => `${p.name} (Cantidad: ${p.quantity})`)} />
        <Section title="📦 Insumos Utilizados" items={activity.supplies.map(s => `${s.name} (Cantidad: ${s.quantity})`)} />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", pt: 2 }}>
        <Button onClick={onClose} color="primary" variant="contained" size="small">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Componente auxiliar para secciones
const Section = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "#1B2559" }}>
      {title}
    </Typography>
    <Box component="ul" sx={{ pl: 2, m: 0 }}>
      {items.map((item, idx) => (
        <Box
          key={idx}
          component="li"
          sx={{ fontSize: "0.875rem", color: "#4C5C7A", mb: 0.5 }}
        >
          {item}
        </Box>
      ))}
    </Box>
  </Box>
);

export default ActivitySummaryModal;