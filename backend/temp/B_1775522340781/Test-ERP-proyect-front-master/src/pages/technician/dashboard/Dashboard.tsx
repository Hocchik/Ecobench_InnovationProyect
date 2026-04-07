import { Container, Paper, Typography, Box } from '@mui/material';
import { useEffect } from 'react';
import { useTechDashboard } from './context/TechDashboardContext';
import TodayActivityCard from './components/TodayActivityCard';
import CurrentActivityCard from '../activities/components/CurrentActivityCard';
import { useAuth } from '../../../contexts/AuthContext';

const Dashboard = () => {
  const {
    todayActivities,
    currentActivity,
    refreshTodayActivities,
    refreshCurrentActivity,
    /* finishCurrentActivity, */
    handleStatusChange
  } = useTechDashboard();

  const { user } = useAuth();
  const userr = JSON.parse(localStorage.getItem("user") ?? "{}");
  const userId: string = user?.id ?? userr?.id ?? "";

  useEffect(() => {
    if (userId) {
      refreshTodayActivities(userId);
      refreshCurrentActivity(userId);
    } else {
      console.warn("⚠️ userId está vacío o indefinido");
    }
  }, [userId]);


  const now = new Date();
  const todayISO = now.toISOString().split('T')[0];

  const actividadProxima = todayActivities.find((a) => {
    const activityTime = new Date(`${todayISO}T${a.time}`);
    const rangoMinutos = 30;
    return (
      !currentActivity &&
      a.date === todayISO &&
      Math.abs((activityTime.getTime() - now.getTime()) / 60000) < rangoMinutos
    );
  });

  const actividadesRestantes = todayActivities.filter(
    (a) =>
      a.id_activity !== currentActivity?.id_activity &&
      a.id_activity !== actividadProxima?.id_activity
  );

  return (
    <Container sx={{ py: 3, px: { xs: 1, sm: 3 } }}>
      {/* Actividad activa */}
      {currentActivity ? (
        <Section title="🔧 Actividad en Curso">
          <CurrentActivityCard
            activity={currentActivity}
            onFinish={(file) =>
              handleStatusChange(currentActivity, 'Finalizado', file)
            }
            refresh={() => {
              console.log("Refresh id:"+userId)
              refreshTodayActivities(userId);
              refreshCurrentActivity(userId);
            }}
          />
        </Section>
      ) : actividadProxima ? (
        <Section title="⏰ Actividad Programada">
          <TodayActivityCard
            activity={actividadProxima}
            onStatusChange={handleStatusChange}
          />
        </Section>
      ) : null}

      {/* Lista del resto */}
      <Section title="📋 Otras Actividades Hoy">
        <Box>
          {actividadesRestantes.length > 0 ? (
            actividadesRestantes.map((activity) => (
              <TodayActivityCard
                key={activity.id_activity}
                activity={activity}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No hay más actividades programadas para hoy.
            </Typography>
          )}
        </Box>
      </Section>

      {/* Nota */}
      <Typography
        variant="caption"
        sx={{
          textAlign: 'center',
          display: 'block',
          mt: 2,
          color: '#476797'
        }}
      >
        Nota: Las actividades deben iniciarse en el momento programado y finalizarse con evidencia.
      </Typography>
    </Container>
  );
};

// 🎯 Componente auxiliar para secciones
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Paper elevation={0} sx={{ bgcolor: '#ffffff', p: 2, mb: 3, borderRadius: 2 }}>
    <Typography variant="h6" sx={{ color: '#000000', mb: 3 }}>
      {title}
    </Typography>
    {children}
  </Paper>
);

export default Dashboard;