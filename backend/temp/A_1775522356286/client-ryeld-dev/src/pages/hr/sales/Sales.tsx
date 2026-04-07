import { Box, Typography } from '@mui/material';
import { SalesTable } from './components/SalesTable';

export default function Sales() {
  return (
    <Box sx={{ 
      height: 'calc(100vh - 180px)', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <Box sx={{ mb: 3, flexShrink: 0 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            color: '#1B2559',
            mb: 1
          }}
        >
          Gestión de Ventas
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#476797',
            fontSize: '1.1rem'
          }}
        >
          Administra las ventas, facturación y control de pagos
        </Typography>
      </Box>

      <Box sx={{ flex: 1, minHeight: 0 }}>
        <SalesTable />
      </Box>
    </Box>
  );
}
