import { useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { EventClickArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";

import { useSupActivity } from "./context/SupActivityContext";
import CalendarComponent from "./components/CalendarComponent";
import ActivityList from "./components/ActivityList";
import ActivityDetails from "./components/ActivityDetails";
import DayActivitiesModal from "./components/DayActivitiesModal";

import { CalendarActivity, UpdateActivity } from "./api/SupActivityInterfaces";

const Activities = () => {
  const [selectedActivity, setSelectedActivity] = useState<CalendarActivity | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDayActivitiesOpen, setIsDayActivitiesOpen] = useState(false);
  const [isActivityDetailsOpen, setIsActivityDetailsOpen] = useState(false);
  const [dayActivities, setDayActivities] = useState<CalendarActivity[]>([]);

  const { activities, updateActivity, registerActivityImage } = useSupActivity();

  const openActivityDetails = (activity: CalendarActivity) => {
    setSelectedActivity(activity);
    setIsActivityDetailsOpen(true);
  };

  const closeActivityDetails = () => {
    setSelectedActivity(null);
    setIsActivityDetailsOpen(false);
  };

  const handleEditActivity = async (updated: UpdateActivity) => {
    try {
      await updateActivity(updated);
      closeActivityDetails();
    } catch (error) {
      console.error("Error al actualizar actividad:", error);
    }
  };

  const handleUploadImage = async (id_activity: string, file: File) => {
    try {
      await registerActivityImage(id_activity, file);
    } catch (error) {
      console.error("Error al subir imagen:", error);
    }
  };

  const handleDateSelect = (clickInfo: DateClickArg) => {
    const selected = clickInfo.date;
    const filtered = activities.filter(({ date }) => {
      if (!date) return false;
      const activityDate = new Date(date);
      return (
        activityDate.getFullYear() === selected.getFullYear() &&
        activityDate.getMonth() === selected.getMonth() &&
        activityDate.getDate() === selected.getDate()
      );
    });

    setSelectedDate(selected);
    setDayActivities(filtered);
    setIsDayActivitiesOpen(true);
  };

  const handleDayActivityClick = (activity: CalendarActivity) => {
    setIsDayActivitiesOpen(false);
    openActivityDetails(activity);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const found = activities.find(a => a.id_activity === clickInfo.event.id);
    if (found) openActivityDetails(found);
  };

  return (
    <Box sx={{ p: 3, height: "100%", overflow: "auto" }}>
      <Grid container spacing={3} sx={{ minHeight: 0 }}>
        {/* 📅 Calendario */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              borderRadius: "20px",
              height: "640px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <CalendarComponent
              events={activities.map(activity => ({
                id: activity.id_activity,
                title: `${activity.section} - ${activity.title}`,
                start: new Date(activity.date),
                end: new Date(activity.date),
                backgroundColor: "white",
                borderColor: "#4CAF50",
                textColor: "#1B2559",
              }))}
              onDateClick={handleDateSelect}
              onEventClick={handleEventClick}
              onEventDrop={() => {}}
            />
          </Paper>
        </Grid>

        {/* 📋 Lista lateral */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: "white",
              boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
            }}
          >
            <Typography variant="h5" sx={{ color: "#1B2559", fontWeight: 600, mb: 3 }}>
              Actividades de Hoy
            </Typography>
            <ActivityList activities={activities} onSelectActivity={openActivityDetails} />
          </Paper>
        </Grid>
      </Grid>

      {/* 🧩 Detalles de actividad */}
      {selectedActivity && isActivityDetailsOpen && (
        <ActivityDetails
          activity={selectedActivity}
          onClose={closeActivityDetails}
          onEdit={handleEditActivity}
          onUploadImage={handleUploadImage} // ✅ nuevo prop
        />
      )}

      {/* 🧩 Modal de actividades por día */}
      {isDayActivitiesOpen && selectedDate && (
        <DayActivitiesModal
          open={isDayActivitiesOpen}
          date={selectedDate}
          activities={dayActivities}
          onClose={() => setIsDayActivitiesOpen(false)}
          onActivityClick={handleDayActivityClick}
          onEdit={handleEditActivity}
          onUploadImage={handleUploadImage} // ✅ nuevo prop
        />
      )}
    </Box>
  );
};

export default Activities;