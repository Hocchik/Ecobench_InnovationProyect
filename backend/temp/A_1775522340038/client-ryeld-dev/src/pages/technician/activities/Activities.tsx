import { useEffect, useState } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import CalendarComponent from './components/CalendarComponent';
import ActivityDetailsModal from './components/ActivityDetailsModal';
import { getActivities, finishActivity } from './api/TechActivityApi';
import { ActivityGET } from './data/interface/activityinterfaces';
import { useMediaQuery } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';

const GestionActividades = () => {
  const [activities, setActivities] = useState<ActivityGET[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<ActivityGET | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const { user } = useAuth();
  const userId: string = user?.employeeId ?? "";

  useEffect(() => {
    getActivities(userId).then(setActivities);
  }, []);

  const events = activities.map((a) => ({
    id: a.id_activity,
    title: a.type,
    start: a.date,
    extendedProps: {
      hour: a.time,
      place: a.location,
      company: a.company,
      image_url: a.image_url
    },
    color: a.type === 'Preventivo' ? '#A9F2A3' : '#F2BCA3'
  }));

  const handleEventClick = (info: any) => {
    const found = activities.find(a => a.id_activity === info.event.id);
    if (found) {
      setSelectedActivity(found);
      setShowDetails(true);
    }
  };

  const handleEditEvidence = async (file: File, activityId: string) => {
    if (!file || !file.type.startsWith("image/")) {
      console.error("❌ Archivo inválido. Solo se permiten imágenes.");
      return;
    }
    await finishActivity(activityId, file);
    const updated = await getActivities(userId);
    setActivities(updated);
    setShowDetails(false);
  };

  return (
    <Container sx={{ py: 3, px: { xs: 1, sm: 3 } }}>
      <Paper elevation={0} sx={{ bgcolor: 'white', p: 2, mb: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ color: '#1B2559', fontWeight: 600, mb: 3 }}>
          Agenda de Actividades
        </Typography>
        <Box sx={{ minHeight: isMobile ? 300 : 400 }}>
          <CalendarComponent
            events={events}
            onEventClick={handleEventClick}
            initialView={isMobile ? 'listWeek' : 'dayGridMonth'}
            height={isMobile ? 400 : '100%'}
          />
        </Box>
      </Paper>

      <ActivityDetailsModal
        open={showDetails}
        onClose={() => setShowDetails(false)}
        activity={selectedActivity}
        onEditEvidence={handleEditEvidence}
      />
    </Container>
  );
};

export default GestionActividades;