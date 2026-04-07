import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { CaptacionClientes } from '../data/interfaces';

interface ClientAcquisitionChartProps {
  data: CaptacionClientes[];
  selectedYear: number;
}

export const ClientAcquisitionChart: React.FC<ClientAcquisitionChartProps> = ({ 
  data, 
  selectedYear 
}) => {
  const months = data.map(item => item.mes);
  const acercamientoData = data.map(item => item.acercamiento);
  const visitaData = data.map(item => item.visita);
  const contratadoData = data.map(item => item.contratado);

  return (
    <Paper sx={{ 
      p: 3, 
      borderRadius: '20px', 
      boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
      height: '100%'
    }}>
      <Box mb={3}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559', mb: 1 }}>
          Captación de Nuevos Clientes {selectedYear}
        </Typography>
        <Typography variant="body2" sx={{ color: '#476797' }}>
          Actividad de ventas por etapas del proceso comercial
        </Typography>
      </Box>

      <Box sx={{ width: '100%', height: 400 }}>
        <LineChart
          xAxis={[
            {
              scaleType: 'point',
              data: months,
              tickLabelStyle: {
                fontSize: 12,
                fill: '#476797'
              }
            }
          ]}
          yAxis={[
            {
              tickLabelStyle: {
                fontSize: 12,
                fill: '#476797'
              }
            }
          ]}
          series={[
            {
              data: acercamientoData,
              label: 'Acercamiento',
              color: '#476797',
              curve: 'catmullRom'
            },
            {
              data: visitaData,
              label: 'Visita',
              color: '#476797',
              curve: 'catmullRom'
            },
            {
              data: contratadoData,
              label: 'Contratado',
              color: '#F59E0B',
              curve: 'catmullRom'
            }
          ]}
          width={undefined}
          height={350}
          margin={{ left: 60, right: 60, top: 40, bottom: 60 }}
          grid={{ vertical: true, horizontal: true }}
          sx={{
            '& .MuiLineElement-root': {
              strokeWidth: 3
            },
            '& .MuiMarkElement-root': {
              strokeWidth: 2,
              r: 4
            },
            '& .MuiChartsGrid-line': {
              stroke: '#F1F5F9',
              strokeWidth: 1
            },
            '& .MuiChartsLegend-series': {
              fontSize: '14px',
              fontWeight: 500
            }
          }}
        />
      </Box>

      {/* Resumen numérico */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-around',
        mt: 3,
        pt: 3,
        borderTop: '1px solid #F1F5F9'
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#476797', fontWeight: 600 }}>
            {acercamientoData.reduce((a, b) => a + b, 0)}
          </Typography>
          <Typography variant="caption" sx={{ color: '#476797' }}>
            Total Acercamientos
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#476797', fontWeight: 600 }}>
            {visitaData.reduce((a, b) => a + b, 0)}
          </Typography>
          <Typography variant="caption" sx={{ color: '#476797' }}>
            Total Visitas
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#F59E0B', fontWeight: 600 }}>
            {contratadoData.reduce((a, b) => a + b, 0)}
          </Typography>
          <Typography variant="caption" sx={{ color: '#476797' }}>
            Total Contratados
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
