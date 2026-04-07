import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { EventInput } from "@fullcalendar/core";
import { AccessTime as TimeIcon } from "@mui/icons-material";
import { useDashboard } from "../context/DashboardContext";
import { CalendarActivity } from "../../activities/api/SupActivityInterfaces";

const MonthlyActivities = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayActivities, setSelectedDayActivities] = useState<
    CalendarActivity[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { calendarActivities, loading } = useDashboard();

  const handleDateClick = (arg: any) => {
    const clickedDate = new Date(arg.date);

    const activitiesForDay = calendarActivities.filter((activity) => {
      const activityDate = new Date(activity.date);
      return (
        activityDate.getDate() === clickedDate.getDate() &&
        activityDate.getMonth() === clickedDate.getMonth() &&
        activityDate.getFullYear() === clickedDate.getFullYear()
      );
    });

    setSelectedDate(clickedDate);
    setSelectedDayActivities(activitiesForDay);
    setIsModalOpen(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "preventive":
        return "#4CAF50";
      case "corrective":
        return "#FF5722";
      case "repair":
        return "#2196F3";
      default:
        return "#757575";
    }
  };

  const calendarEvents: EventInput[] = calendarActivities.map((activity) => {
    const [startHours, startMinutes] = activity.start_time.split(":");
    const [endHours, endMinutes] = activity.end_time.split(":");

    const startDate = new Date(activity.date);
    startDate.setHours(parseInt(startHours), parseInt(startMinutes), 0);

    const endDate = new Date(activity.date);
    endDate.setHours(parseInt(endHours), parseInt(endMinutes), 0);

    return {
      id: activity.id_activity,
      title: `${activity.client_building} - ${activity.title}`,
      start: startDate,
      end: endDate,
      backgroundColor: "white",
      borderColor: getTypeColor(activity.maintenance_type),
      textColor: "#1B2559",
      classNames: [`status-${activity.status}`, `type-${activity.maintenance_type}`],
      extendedProps: {
        type: activity.maintenance_type,
        status: activity.status,
        company: activity.client_building,
      },
    };
  });

  return (
    <>
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
          Actividades del Mes
        </Typography>

        {loading.calendar ? (
          <Typography variant="body2" sx={{ color: "#476797" }}>
            Cargando calendario...
          </Typography>
        ) : (
          <Paper
            sx={{
              borderRadius: "20px",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              "& .fc": {
                "--fc-border-color": "#E2E8F0",
                "--fc-button-text-color": "#476797",
                "--fc-button-bg-color": "transparent",
                "--fc-button-border-color": "#E2E8F0",
                "--fc-button-hover-bg-color": "rgba(71, 103, 151, 0.08)",
                "--fc-button-hover-border-color": "#476797",
                "--fc-button-active-bg-color": "#476797",
                "--fc-button-active-border-color": "#476797",
                "--fc-today-bg-color": "rgba(71, 103, 151, 0.08)",
              },
              "& .fc .fc-toolbar-title": {
                fontSize: "1rem",
                color: "#1B2559",
                fontWeight: 600,
              },
              "& .fc .fc-button": {
                textTransform: "capitalize",
                borderRadius: "8px",
                padding: "4px 8px",
              },
              "& .fc-theme-standard td, & .fc-theme-standard th": {
                borderColor: "#E2E8F0",
              },
              "& .fc-daygrid-day-number": {
                color: "#1B2559",
                fontSize: "0.875rem",
              },
              "& .fc-daygrid-event": {
                borderRadius: "4px",
                padding: "2px 4px",
                fontSize: "0.75rem",
              },
            }}
          >
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              locale={esLocale}
              events={calendarEvents}
              headerToolbar={{
                left: "prev",
                center: "title",
                right: "next",
              }}
              height="100%"
              dayMaxEvents={2}
              moreLinkContent={(args) => `+${args.num} más`}
              dateClick={handleDateClick}
              selectable={true}
            />
          </Paper>
        )}
      </Paper>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            maxWidth: "500px",
            width: "100%",
          },
        }}
      >
        <DialogTitle
          sx={{
            p: 3,
            color: "#1B2559",
            borderBottom: "1px solid #E2E8F0",
            fontWeight: 600,
          }}
        >
          Actividades del{" "}
          {selectedDate?.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedDayActivities.length > 0 ? (
            <List>
              {selectedDayActivities.map((activity, index) => (
                <ListItem
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: "1px solid #E2E8F0",
                    borderRadius: "12px",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "#1B2559", fontWeight: 500 }}
                      >
                        {activity.title}
                      </Typography>
                      <Chip
                        label={
                          activity.maintenance_type === "preventive"
                            ? "Preventivo"
                            : "Correctivo"
                        }
                        sx={{
                          bgcolor: "white",
                          color: getTypeColor(activity.maintenance_type),
                          border: `1px solid ${getTypeColor(activity.maintenance_type)}`,
                          borderRadius: "8px",
                          height: "24px",
                        }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <TimeIcon sx={{ color: "#A3AED0", fontSize: "1rem" }} />
                      <Typography variant="body2" sx={{ color: "#A3AED0" }}>
                        {activity.start_time} - {activity.end_time}
                      </Typography>
                      <Chip
                        label={activity.status ? "Finalizado" : "Pendiente"}
                        sx={{
                          ml: 2,
                          bgcolor: "white",
                          color: activity.status ? "#4CAF50" : "#2196F3",
                          border: `1px solid ${activity.status ? "#4CAF50" : "#2196F3"}`,
                          borderRadius: "8px",
                          height: "24px",
                        }}
                      />
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography sx={{ textAlign: "center", color: "#A3AED0", py: 3 }}>
              No hay actividades programadas para este día
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: "1px solid #E2E8F0" }}>
          <Button
            onClick={() => setIsModalOpen(false)}
            sx={{
              color: "#476797",
              "&:hover": {
                bgcolor: "rgba(71, 103, 151, 0.08)",
              },
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MonthlyActivities;
