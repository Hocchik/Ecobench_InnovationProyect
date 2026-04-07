import { Box, Typography, Stack, Button, Chip } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { ToolRequestGET } from '../data/interface/toolinterfaces';

interface Props {
  charge: ToolRequestGET;
  onDetails?: () => void;
}

const getStatusColor = (status: ToolRequestGET['status']) => {
  switch (status) {
    case 'Approved':
      return 'success';
    case 'Denied':
      return 'error';
    case 'Pending':
    default:
      return 'warning';
  }
};

const ChargeCard = ({ charge, onDetails }: Props) => {
  return (
    <Box
      sx={{
        borderRadius: 3,
        bgcolor: '#FFFFFF',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        p: 2.5,
        mb: 2.5,
      }}
    >
      {/* Encabezado */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
        <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssignmentIcon fontSize="small" />
          {charge.request_number}
        </Typography>
        <Chip label={charge.status} color={getStatusColor(charge.status)} size="small" />
      </Stack>

      {/* Información general */}
      <Stack spacing={1.2} sx={{ color: '#1B2559', fontSize: '0.95rem' }}>
      <Typography>
        <AccessTimeIcon sx={{ fontSize: 18, mr: 1, verticalAlign: 'middle' }} />
        Fecha: {charge.date}
      </Typography>

      <Box>
        <Typography sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Inventory2Icon sx={{ fontSize: 18, mr: 1, verticalAlign: 'middle' }} />
          Ítems solicitados:
        </Typography>
        <Stack spacing={0.5} sx={{ pl: 3 }}>
          {charge.items?.map((item, index) => (
            <Typography key={index} sx={{ fontSize: '0.9rem' }}>
              • {item.name_item} — {item.request_quantity} unidad{item.request_quantity > 1 ? 'es' : ''}
            </Typography>
          ))}
        </Stack>
      </Box>

      <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
        Motivo: {charge.reason || 'No especificado'}
      </Typography>
    </Stack>


      {/* Acción */}
      {onDetails && (
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Button variant="text" size="small" onClick={onDetails} sx={{ textTransform: 'none', fontWeight: 500, color: '#476797' }}>
            Ver detalles
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ChargeCard;