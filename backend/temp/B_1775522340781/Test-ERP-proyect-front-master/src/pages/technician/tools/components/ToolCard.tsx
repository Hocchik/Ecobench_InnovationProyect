import { Box, Typography, Stack, Chip } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { ToolPosesion } from '../data/interface/toolinterfaces';

interface Props {
  tool: ToolPosesion;
}

const ToolCard = ({ tool }: Props) => (
  <Box
    sx={{
      borderRadius: 2,
      bgcolor: '#FFFFFF',
      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
      p: 2,
      mb: 2,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}
  >
    {/* Descripción de herramienta */}
    <Stack spacing={0.5}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <ConstructionIcon sx={{ fontSize: 20, color: '#476797' }} />
        {tool.name_tool}
      </Typography>
    </Stack>

    {/* Cantidad */}
    <Chip
      icon={<Inventory2Icon />}
      label={`x${tool.quantity}`}
      color="primary"
      variant="outlined"
      sx={{ fontWeight: 500 }}
    />
  </Box>
);

export default ToolCard;