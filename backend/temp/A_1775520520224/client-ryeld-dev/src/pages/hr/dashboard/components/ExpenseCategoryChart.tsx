import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { SalidaCategoria } from '../data/interfaces';

interface ExpenseCategoryChartProps {
  data: SalidaCategoria[];
}

export const ExpenseCategoryChart: React.FC<ExpenseCategoryChartProps> = ({ data }) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const chartData = data.map(item => ({
    id: item.id,
    value: item.valor,
    label: item.categoria,
    color: item.color
  }));

  return (
    <Paper sx={{ 
      p: 3, 
      borderRadius: '20px', 
      boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
      height: '100%'
    }}>
      <Box mb={3}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559', mb: 1 }}>
          Salidas por Categoría
        </Typography>
        <Typography variant="body2" sx={{ color: '#476797' }}>
          Distribución de gastos del mes actual
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: 3
      }}>
        {/* Gráfico Circular */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          minHeight: 300
        }}>
          <PieChart
            series={[
              {
                data: chartData,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                innerRadius: 40,
                outerRadius: 120,
                paddingAngle: 2,
                cornerRadius: 4
              }
            ]}
            width={300}
            height={300}
            margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
          />
        </Box>

        {/* Leyenda */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minWidth: 200
        }}>
          {data.map((item) => (
            <Box 
              key={item.id}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 2,
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #F1F5F9'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: item.color
                }} />
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1B2559' }}>
                  {item.categoria}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1B2559' }}>
                  {formatCurrency(item.valor)}
                </Typography>
                <Typography variant="caption" sx={{ color: '#476797' }}>
                  {item.porcentaje}%
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};
