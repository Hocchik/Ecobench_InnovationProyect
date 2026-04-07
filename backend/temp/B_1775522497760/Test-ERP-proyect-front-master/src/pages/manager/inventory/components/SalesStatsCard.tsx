import {
  Box,
  Typography,
  Paper
} from '@mui/material';
import { salesStats } from '../data/inventoryData';

export function SalesStatsCard() {
  const { totalSales, percentageChange, isIncrease } = salesStats;

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '10px',
        height: 'calc(20vh - 20px)',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body1" mb={1}>
        Total ventas repuestos
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold" mr={1}>
          s/. {totalSales.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          alignItems: 'center',
          color: isIncrease ? 'success.main' : 'error.main',
          typography: 'body2',
        }}
      >
        <Box component="span" sx={{ display: 'inline-block', mr: 1 }}>
          {isIncrease ? '⬆' : '⬇'}
        </Box>
        {Math.abs(percentageChange)}% {isIncrease ? 'higher' : 'lower'} than last quarter
      </Box>
    </Paper>
  );
}
