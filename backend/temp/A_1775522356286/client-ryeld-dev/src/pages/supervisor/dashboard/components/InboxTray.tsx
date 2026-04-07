import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import {
  Notification,
  ToolRequestNoti,
  CompletedActivityNoti,
} from "../api/SupDashboardInterfaces";
import ActivitySummaryModal from "./ActivitySummary";

const InboxTray = () => {
  const { notifications } = useDashboard();

  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [toolModalOpen, setToolModalOpen] = useState(false);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    if (notification.type_notification === "completed_activity") {
      setActivityModalOpen(true);
    } else if (notification.type_notification === "tool_request") {
      setToolModalOpen(true);
    }
  };

  const handleCloseActivityModal = () => {
    setActivityModalOpen(false);
    setSelectedNotification(null);
  };

  const handleCloseToolModal = () => {
    setToolModalOpen(false);
    setSelectedNotification(null);
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        background: "#F9FAFB",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: "#1B2559", fontWeight: 700, mb: 3 }}
      >
        Bandeja de Entrada
      </Typography>

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {notifications.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: "#A3AED0", py: 3 }}>
            No hay notificaciones pendientes
          </Typography>
        ) : (
          notifications.map((notification) => {
            const isToolRequest = notification.type_notification === "tool_request";
            /* const isCompletedActivity = notification.type_notification === "completed_activity"; */

            const details = notification.details as ToolRequestNoti | CompletedActivityNoti;

            return (
              <Box
                key={notification.id_notification}
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  p: 2.5,
                  mb: 2,
                  borderRadius: 2,
                  backgroundColor: "#FFFFFF",
                  borderLeft: `6px solid ${isToolRequest ? "#6C63FF" : "#00BFA6"}`,
                  boxShadow: "0px 1px 4px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1B2559", mb: 1 }}>
                  {isToolRequest
                    ? `🔧 Solicitud de Herramientas #${(details as ToolRequestNoti).request_number}`
                    : `✅ Actividad Completada: ${(details as CompletedActivityNoti).title}`}
                </Typography>

                {isToolRequest ? (
                  <>
                    <Typography variant="body2" sx={{ color: "#4C5C7A", mb: 0.5 }}>
                      Técnico: {(details as ToolRequestNoti).name_technician}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#A3AED0" }}>
                      Fecha: {(details as ToolRequestNoti).send_date}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="body2" sx={{ color: "#4C5C7A", mb: 0.5 }}>
                      Edificio: {notification.client_building}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#A3AED0" }}>
                      Fecha: {notification.send_date}
                    </Typography>
                  </>
                )}
              </Box>
            );
          })
        )}
      </Box>

      {/* Modal para actividad completada */}
      {selectedNotification?.type_notification === "completed_activity" && (
        <ActivitySummaryModal
          open={activityModalOpen}
          onClose={handleCloseActivityModal}
          activity={selectedNotification.details as CompletedActivityNoti}
        />
      )}

      {/* Modal para solicitud de herramientas */}
      {selectedNotification?.type_notification === "tool_request" && (
      <Dialog
        open={toolModalOpen}
        onClose={handleCloseToolModal}
        maxWidth="xs" // más compacto
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
          🧰 Solicitud de Herramientas
        </DialogTitle>

        <DialogContent dividers>
          {(() => {
            const details = selectedNotification.details as ToolRequestNoti;
            return (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#4C5C7A" }}>
                  Solicitud {details.request_number}
                </Typography>

                <Typography variant="body2" sx={{ color: "#A3AED0" }}>
                  Técnico: {details.name_technician}
                </Typography>

                <Typography variant="body2" sx={{ color: "#A3AED0" }}>
                  Fecha: {details.send_date}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1, color: "#1B2559" }}>
                  <strong>Motivo:</strong> {details.reason}
                </Typography>

                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                  Herramientas Solicitadas:
                </Typography>

                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {details.items.map((item) => (
                    <Box
                      key={item.id_tool}
                      component="li"
                      sx={{
                        fontSize: "0.875rem",
                        color: "#4C5C7A",
                        mb: 0.5,
                      }}
                    >
                      <strong>{item.name_tool}</strong> (Código: {item.code_tool})<br />
                      Cantidad: {item.requestedQuantity} — Disponibles: {item.availableQuantity}
                    </Box>
                  ))}
                </Box>
              </Box>
            );
          })()}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "flex-end", pt: 2 }}>
          <Button
            onClick={handleCloseToolModal}
            color="primary"
            variant="contained"
            size="small"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    )}
    </Paper>
  );
};

export default InboxTray;