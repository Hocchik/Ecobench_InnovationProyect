import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import { ToolRequestGET } from '../api/SupInventoryInterfaces';

interface PendingRequestProps {
  request: ToolRequestGET;
  onView?: (request: ToolRequestGET) => void;
}

export const PendingRequest = ({ request, onView }: PendingRequestProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        '&:hover': {
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.08)',
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ color: '#1B2559', fontWeight: 500 }}>
          {request.request_number}
        </Typography>
        <Chip
          label="Pendiente"
          size="small"
          sx={{
            bgcolor: '#FFF6E5',
            color: '#FFB547',
            borderRadius: '8px',
            fontWeight: 500
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          mb: 2,
          gap: 1,
        }}
      >
        <Box>
          <Typography variant="body2" sx={{ color: '#A3AED0', mb: 0.5 }}>
            Técnico
          </Typography>
          <Typography variant="body1" sx={{ color: '#1B2559', wordBreak: 'break-word' }}>
            {request.technician}
          </Typography>
        </Box>
        <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant="body2" sx={{ color: '#A3AED0', mb: 0.5 }}>
            Fecha
          </Typography>
          <Typography variant="body1" sx={{ color: '#1B2559' }}>
            {request.date}
          </Typography>
        </Box>
      </Box>

      <Button
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mt: 1, borderRadius: 2, fontWeight: 500 }}
        onClick={() => onView?.(request)}
      >
        Ver solicitud
      </Button>
    </Paper>
  );
};