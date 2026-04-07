import { List, ListItem, Box, Typography, Chip } from "@mui/material";
import { CalendarActivity } from "../api/SupActivityInterfaces"; // Asegúrate de usar la fuente actual
import activityTypes from "../data/ActivityTypes";

interface ActivityListProps {
  activities: CalendarActivity[];
  onSelectActivity: (activity: CalendarActivity) => void;
}

const ActivityList = ({ activities, onSelectActivity }: ActivityListProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayActivities = activities.filter(({ date }) => {
    if (!date) return false;
    const activityDate = new Date(date);
    activityDate.setHours(0, 0, 0, 0);
    return activityDate.getTime() === today.getTime();
  });

  return (
    <List>
      {todayActivities.length === 0 ? (
        <Typography variant="body2" sx={{ color: "#A3AED0", px: 2 }}>
          No hay actividades programadas para hoy.
        </Typography>
      ) : (
        todayActivities.map((activity) => {
          const typeStyle = activityTypes[activity.maintenance_type] || {
            color: "#1B2559",
            border: "#E2E8F0",
          };

          return (
            <ListItem
              key={activity.id_activity}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  bgcolor: "#F8F9FF",
                },
              }}
              onClick={() => onSelectActivity(activity)}
            >
              <Box sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: "#1B2559", fontWeight: 500 }}>
                    {activity.title}
                  </Typography>
                  <Chip
                    label={activity.maintenance_type || "Desconocido"}
                    sx={{
                      bgcolor: typeStyle.color,
                      color: "white",
                      border: `1px solid ${typeStyle.border}`,
                      borderRadius: "8px",
                      height: "24px",
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: "#A3AED0" }}>
                  {activity.start_time} - {activity.end_time}
                </Typography>
              </Box>
            </ListItem>
          );
        })
      )}
    </List>
  );
};

export default ActivityList;