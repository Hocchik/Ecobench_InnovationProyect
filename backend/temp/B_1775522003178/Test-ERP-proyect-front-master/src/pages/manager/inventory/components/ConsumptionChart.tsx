import {
  Box,
  Typography,
  Paper
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { chartData } from '../data/inventoryData';

export function ConsumptionChart() {
  const { days, consumptionData } = chartData;

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: '10px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
        height: '100%',
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Gastos consumibles
      </Typography>
      <Box sx={{ height: '200%', width: '100%' }}>
        <LineChart
          xAxis={[
            {
              data: days,
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: consumptionData,
              area: true,
              color: '#8884d8',
              showMark: false,
              curve: 'natural',
              valueFormatter: (value) => `${value}`,
            },
          ]}
          sx={{
            '.MuiLineElement-root': {
              stroke: '#8884d8',
              strokeWidth: 2,
            },
            '.MuiAreaElement-root': {
              fill: 'url(#gradient)',
              opacity: 0.3,
            },
          }}
        />
      </Box>
    </Paper>
  );
}
