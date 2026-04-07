import {
  Modal,
  Paper,
  Typography,
  Box,
  IconButton,
  Divider
} from '@mui/material';
import { Close, InfoOutlined } from '@mui/icons-material';
import { Client } from '../data/interface/clientinterfaces';

interface Props {
  open: boolean;
  onClose: () => void;
  client: Client | null;
}

const ClientDetailsModal = ({ open, onClose, client }: Props) => {
  if (!client) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          px: 1,
          py: 2,
        }}
      >
        <Paper
          sx={{
            p: 3,
            width: '100%',
            maxWidth: 420,
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            bgcolor: '#fff',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxSizing: 'border-box',
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
              <InfoOutlined sx={{ fontSize: 22, color: '#476797' }} />
              Detalle de Cliente
            </Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Datos */}
          <DetailRow label="Nombre" value={client.name} />
          <DetailRow label="Dirección" value={client.address} />
          <DetailRow label="Ubicación" value={client.location} />
          <DetailRow label="Último mantenimiento" value={client.lastMaintenance} />
        </Paper>
      </Box>
    </Modal>
  );
};

// Componente auxiliar para cada fila
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ mb: 1.5 }}>
    <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: '#1B2559' }}>
      {label}:
    </Typography>
    <Typography sx={{ fontWeight: 400, fontSize: '0.95rem', color: '#A3AED0', pl: 1 }}>
      {value}
    </Typography>
  </Box>
);

export default ClientDetailsModal;