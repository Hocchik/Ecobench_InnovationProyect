import { Box, Typography, Stack, Button } from '@mui/material';
import { DashboardActivity } from '../data/interfaces/dashboardinterfaces';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Props {
  activity: DashboardActivity;
  onStatusChange: (
    activity: DashboardActivity,
    newStatus: DashboardActivity['status'],
    file?: File
  ) => Promise<void>;
}

const TodayActivityCard = ({ activity, onStatusChange }: Props) => {
  const statusLabel = activity.status === 'En curso'
    ? '🟢 En curso'
    : activity.status === 'Finalizado'
    ? '✅ Finalizado'
    : '⏳ Pendiente';

  const typeColor = activity.type === 'Preventivo' ? '#A9F2A3' : '#F2BCA3';

  return (
    <Box
      sx={{
        borderRadius: 3,
        bgcolor: '#FFFFFF',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        p: 2.5,
        mb: 2.5,
        position: 'relative',
        overflow: 'hidden',
        borderLeft: `6px solid ${typeColor}`,
      }}
    >
      {/* Encabezado */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
          <WorkOutlineIcon sx={{ fontSize: 18, mr: 1, verticalAlign: 'middle' }} />
          {activity.company}
        </Typography>
        <Box
          sx={{
            bgcolor: typeColor,
            px: 2,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.8rem',
            fontWeight: 500,
            color: '#333'
          }}
        >
          {activity.type}
        </Box>
      </Stack>

      {/* Detalles */}
      <Stack spacing={1}>
        <Typography sx={{ fontSize: '0.95rem', color: '#444' }}>
          <LocationOnIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
          {activity.location}
        </Typography>
        <Typography sx={{ fontSize: '0.95rem', color: '#444' }}>
          <AccessTimeIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
          {activity.time}
        </Typography>
      </Stack>

      {/* Estado + Acciones */}
      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Typography
          sx={{
            fontSize: '0.85rem',
            fontWeight: 500,
            color: '#476797',
            mb: 1
          }}
        >
          {statusLabel}
        </Typography>

        {/* Botones según estado */}
        {activity.status === 'Pendiente' && (
          <Button
            variant="contained"
            size="small"
            onClick={() => onStatusChange(activity, 'En curso')}
          >
            Iniciar Actividad
          </Button>
        )}

        {activity.status === 'Finalizado' && (
          <Button
            variant="outlined"
            size="small"
            color="warning"
            onClick={() => onStatusChange(activity, 'Pendiente')}
          >
            Revertir a Pendiente
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TodayActivityCard;