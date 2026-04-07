import { Container, Paper, Typography, Box, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { useTechTools } from './context/TechToolsContext';
import ToolCard from './components/ToolCard';
import ChargeCard from './components/ChargeCard';
import ToolRequestModal from './components/ToolRequestModal';

const Tools = () => {
  const { tools, charges } = useTechTools();
  const [showModal, setShowModal] = useState(false);

  return (
    <Container sx={{ py: 3, px: { xs: 1, sm: 3 } }}>
      {/* Herramientas en posesión */}
      <Paper elevation={0} sx={{ bgcolor: 'white', p: 2, mb: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ color: '#1B2559', fontWeight: 600, mb: 3 }}>
          Herramientas en Posesión
        </Typography>

        <Box>
          {tools.map((tool, idx) => (
            <ToolCard key={idx} tool={tool} />
          ))}
        </Box>

        <Button
          variant="contained"
          fullWidth
          endIcon={<KeyboardArrowDownIcon />}
          onClick={() => setShowModal(true)}
          sx={{
            mt: 3,
            bgcolor: '#476797',
            '&:hover': { bgcolor: '#3a547a' },
            borderRadius: '8px',
            py: 1.5,
            textTransform: 'none'
          }}
        >
          Solicitud de Cargo
        </Button>

        <ToolRequestModal open={showModal} onClose={() => setShowModal(false)} />
      </Paper>

      {/* Cargos solicitados */}
      <Paper elevation={0} sx={{ bgcolor: 'white', p: 2, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ color: '#1B2559', fontWeight: 600, mb: 3 }}>
          Cargos solicitados
        </Typography>

        <Box sx={{ mb: 4 }}>
          {charges.map((charge, idx) => (
            <ChargeCard key={idx} charge={charge} />
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default Tools;