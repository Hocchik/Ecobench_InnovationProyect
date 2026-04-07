import { Box, Typography, Stack, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Client } from '../data/interface/clientinterfaces';

interface Props {
  client: Client;
  onDetails: () => void;
}

const ClientCard = ({ client, onDetails }: Props) => {
  const locationColor = client.location === 'Lima' ? '#66D9E8' : '#FF6B6B';

  return (
    <Box
      sx={{
        border: '1px solid #E0E0E0',
        borderRadius: 3,
        mb: 2.5,
        bgcolor: '#FFFFFF',
        boxShadow: '0 2px 6px #0002',
        p: 2,
      }}
    >
      {/* Encabezado */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {client.name}
        </Typography>
        <Box
          sx={{
            bgcolor: locationColor,
            px: 2,
            py: 0.5,
            borderRadius: 1,
            color: '#fff',
            fontWeight: 500,
            fontSize: '0.85rem',
            boxShadow: '0 1px 3px #0002',
          }}
        >
          <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
          {client.location}
        </Box>
      </Stack>

      {/* Detalles */}
      <Stack spacing={1.2}>
        <Typography sx={{ fontSize: '0.95rem', color: '#1B2559' }}>
          📍 <strong>Dirección:</strong> {client.address}
        </Typography>
        <Typography sx={{ fontSize: '0.95rem', color: '#1B2559' }}>
          🛠️ <strong>Último mantenimiento:</strong> {client.lastMaintenance}
        </Typography>
      </Stack>

      {/* Botón de detalles */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="text"
          size="small"
          endIcon={<InfoOutlinedIcon />}
          onClick={onDetails}
          sx={{
            textTransform: 'none',
            color: '#476797',
            fontWeight: 600,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Ver detalles
        </Button>
      </Box>
    </Box>
  );
};

export default ClientCard;