import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import { Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { actividadSemanalData, weeklyActivityData } from '../data/dashboardData';

const ActividadSemanal: React.FC = () => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const currentWeek = weeklyActivityData.weeks[currentWeekIndex];

  // Funciones para navegación semanal
  const handlePrevWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < weeklyActivityData.weeks.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  const chartSetting = {
    height: 300,
    sx: {
      '& .MuiChartsAxis-tickLabel': {
        transform: 'rotate(-45deg)',
        textAnchor: 'end',
        dominantBaseline: 'central',
        fontSize: 12,
      },
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '20px',
        border: '1px solid #F1F5F9',
        mb: 3,
        boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559' }}>
          Actividad semanal - Caja Chica
        </Typography>
        
        {/* Control de navegación semanal */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            size="small" 
            onClick={handlePrevWeek}
            disabled={currentWeekIndex === 0}
            sx={{ color: '#476797' }}
          >
            <KeyboardArrowLeft />
          </IconButton>
          
          <Typography variant="body2" sx={{ mx: 1, color: '#476797' }}>
            {currentWeek.label}
          </Typography>
          
          <IconButton 
            size="small" 
            onClick={handleNextWeek}
            disabled={currentWeekIndex === weeklyActivityData.weeks.length - 1}
            sx={{ color: '#476797' }}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>

      {/* Gráfico de barras */}
      <Box sx={{ height: 350, mb: 4 }}>
        <BarChart
          dataset={actividadSemanalData.dailyData}
          xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
          series={[{ 
            dataKey: 'value', 
            label: 'Salida', 
            color: '#FFB547',
            valueFormatter: (value) => `S/ ${value!.toFixed(2)}`,
            highlightScope: { highlight: 'item', fade: 'global' },
          }]}
          hideLegend
          axisHighlight={{
            x: 'none',
            y: 'none'
          }}
          {...chartSetting}
        />
      </Box>

      {/* Gráficos circulares */}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Gastos por tipo */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#476797' }}>
                Gastos por tipo
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data: actividadSemanalData.gastosPorTipo,
                    innerRadius: 60,
                    outerRadius: 100,
                    paddingAngle: 2,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 270,
                    arcLabel: (item) => `${item.value}%`,
                    arcLabelMinAngle: 45,
                    highlightScope: { highlight: 'item', fade: 'global' },
                    valueFormatter: (value) => `${value}%`,
                  },
                ]}
                width={250}
                height={200}
                hideLegend
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1, flexWrap: 'wrap' }}>
              {actividadSemanalData.gastosPorTipo.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: item.color
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#476797' }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Top 4 ventas repuestos */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#476797' }}>
                Top 4 ventas repuestos
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data: actividadSemanalData.ventasRepuestos,
                    innerRadius: 60,
                    outerRadius: 100,
                    paddingAngle: 2,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 270,
                    arcLabel: (item) => `${item.value}%`,
                    arcLabelMinAngle: 45,
                    highlightScope: { highlight: 'item', fade: 'global' },
                    valueFormatter: (value) => `${value}%`,
                  },
                ]}
                width={250}
                height={200}
                hideLegend
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1, flexWrap: 'wrap' }}>
              {actividadSemanalData.ventasRepuestos.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: item.color
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#476797' }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ActividadSemanal;
