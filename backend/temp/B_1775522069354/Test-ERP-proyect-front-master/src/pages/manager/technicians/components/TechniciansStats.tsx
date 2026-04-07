import { Box, Typography, Paper } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { Technician, getMaintenanceChartData } from '../data/techniciansData';

interface TechniciansStatsProps {
  technicians: Technician[];
}

export function TechniciansStats({ technicians }: TechniciansStatsProps) {
  // Leyenda general para todos los gráficos
  const legendItems = [
    { label: 'Preventivos', color: '#05CD99' },
    { label: 'Reparaciones', color: '#1976D2' },
    { label: 'Correctivos', color: '#FFB547' },
    { label: 'Emergencias', color: '#FF4842' }
  ];

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '20px',
        boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
        bgcolor: 'white',
        mb: 3
      }}
    >      {/* Título y Leyenda en la misma línea */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        mb: 2 
      }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#476797' }}>
          Estadísticas de Mantenimiento por Técnico
        </Typography>
        
        {/* Leyenda General */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {legendItems.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: item.color
                }}
              />
              <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': {
            height: '6px'
          },
          '&::-webkit-scrollbar-track': {
            background: '#F4F7FE'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#A3AED0',
            borderRadius: '3px'
          }
        }}
      >
        {technicians.map((technician) => {
          const chartData = getMaintenanceChartData(technician.maintenanceStats);
          const total = technician.maintenanceStats.preventivos + 
                       technician.maintenanceStats.reparaciones + 
                       technician.maintenanceStats.correctivos + 
                       technician.maintenanceStats.emergencias;

          return (            <Box
              key={technician.id}
              sx={{
                minWidth: 200,
                flexShrink: 0,
                textAlign: 'center',
                p: 2,
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                bgcolor: '#F8F9FF'
              }}
            >
              <Typography 
                variant="subtitle2" 
                fontWeight="600" 
                sx={{ mb: 1, color: '#476797', fontSize: '0.875rem' }}
              >
                {technician.name}
              </Typography>
              
              <Typography 
                variant="caption" 
                sx={{ mb: 2, color: '#666', fontSize: '0.75rem', display: 'block' }}
              >
                Total: {total} mantenimientos
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[
                    {
                      data: chartData,
                      innerRadius: 20,
                      outerRadius: 50,
                      paddingAngle: 2,
                      cornerRadius: 2
                    }
                  ]}
                  width={120}
                  height={120}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
