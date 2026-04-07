import {
  Modal,
  Paper,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ToolRequestForm from './ToolRequestForm';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ToolRequestModal = ({ open, onClose }: Props) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', px: 2 }}>
      <Paper
        sx={{
          width: '100%',
          maxWidth: 500,
          p: 3,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          position: 'relative'
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            🛠️ Solicitud de Herramientas
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Contenido del formulario */}
        <ToolRequestForm />
      </Paper>
    </Box>
  </Modal>
);

export default ToolRequestModal;