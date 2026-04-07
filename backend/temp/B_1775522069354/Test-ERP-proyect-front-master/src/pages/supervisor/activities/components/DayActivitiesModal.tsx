import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  Box,
  Typography,
  Chip
} from '@mui/material';
import { CalendarActivity, UpdateActivity } from '../api/SupActivityInterfaces';
import ActivityDetails from './ActivityDetails';
import { useState } from 'react';
import activityTypes from '../data/ActivityTypes';

interface DayActivitiesModalProps {
  open: boolean;
  date: Date | null;
  activities: CalendarActivity[];
  onClose: () => void;
  onActivityClick: (activity: CalendarActivity) => void;
  onEdit: (activity: UpdateActivity) => void;
  onUploadImage: (id_activity: string, file: File) => void;
}

const DayActivitiesModal = ({
  open,
  date,
  activities,
  onClose,
  onActivityClick,
  onEdit,
  onUploadImage
}: DayActivitiesModalProps) => {
  const [selectedActivity, setSelectedActivity] = useState<CalendarActivity | null>(null);

  const formatDate = (date: Date | null) => {
    if (!date) return 'Actividades del día';
    try {
      const validDate = new Date(date.getTime());
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      return validDate.toLocaleDateString('es-ES', options).replace(/^\w/, (c) => c.toUpperCase());
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return 'Actividades del día';
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: '12px',
            width: '100%',
            maxWidth: '500px'
          }
        }}
      >
        <DialogTitle
          sx={{
            color: '#1B2559',
            fontWeight: 600,
            p: 3,
            borderBottom: '1px solid #E2E8F0'
          }}
        >
          {formatDate(date)}
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <List sx={{ p: 0 }}>
            {activities.length === 0 ? (
              <Typography sx={{ textAlign: 'center', color: '#A3AED0', py: 3 }}>
                No hay actividades programadas para este día
              </Typography>
            ) : (
              activities.map((activity) => {
                const title = activity.title?.trim() || 'Sin título';
                const startTime = activity.start_time || 'Hora inicio no definida';
                const endTime = activity.end_time || 'Hora fin no definida';
                const maintenanceType = activity.maintenance_type || 'Desconocido';
                const chipColor = activityTypes[maintenanceType]?.color || '#A3AED0';
                const chipBorder = activityTypes[maintenanceType]?.border || '#A3AED0';

                return (
                  <ListItem
                    key={activity.id_activity}
                    sx={{
                      mb: 2,
                      mt: 2,
                      p: 2,
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: '#F8F9FF'
                      }
                    }}
                    onClick={() => {
                      setSelectedActivity(activity);
                      onActivityClick(activity);
                    }}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: '#1B2559', fontWeight: 500 }}>
                          {title}
                        </Typography>
                        <Chip
                          label={maintenanceType}
                          sx={{
                            bgcolor: chipColor,
                            color: 'white',
                            border: `1px solid ${chipBorder}`,
                            borderRadius: '8px',
                            height: '24px'
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ color: '#A3AED0' }}>
                        {startTime} - {endTime}
                      </Typography>
                    </Box>
                  </ListItem>
                );
              })
            )}
          </List>
        </DialogContent>

        <DialogActions sx={{ p: 3, borderTop: '1px solid #E2E8F0' }}>
          <Button
            onClick={onClose}
            sx={{
              color: '#476797',
              '&:hover': {
                bgcolor: 'rgba(71, 103, 151, 0.08)'
              }
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {selectedActivity && selectedActivity.id_activity && (
        <ActivityDetails
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onEdit={onEdit}
          onUploadImage={onUploadImage}
        />
      )}
    </>
  );
};

export default DayActivitiesModal;