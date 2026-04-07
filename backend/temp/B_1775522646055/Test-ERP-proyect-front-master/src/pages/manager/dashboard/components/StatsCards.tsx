import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { stats } from '../data/statsData';
import { getSaleComparisonCurrentMonth } from '../api/services/salesServices';

const StatsCards: React.FC = () => {
  const [monthlyComparisonData, setMonthlyComparisonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyComparison = async () => {
      try {
        const response = await getSaleComparisonCurrentMonth();
        setMonthlyComparisonData(response.data);
      } catch (error) {
        console.error('Error fetching monthly comparison:', error);
        // Mantener datos mock en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyComparison();
  }, []);

  // Función para generar los stats con datos dinámicos para la primera tarjeta
  const getStatsData = () => {
    const baseStats = [...stats];
    
    if (monthlyComparisonData) {
      // Actualizar solo la primera tarjeta con datos reales
      baseStats[0] = {
        ...baseStats[0],
        title: `Ventas ${monthlyComparisonData.currentMonth}`,
        amount: `S/. ${monthlyComparisonData.currentMonthSales.toLocaleString('es-PE', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        })}`,
        change: `${monthlyComparisonData.isIncrease ? '↑' : '↓'} ${monthlyComparisonData.growthPercentage.toFixed(1)}%`,
        changeType: monthlyComparisonData.isIncrease ? 'up' : 'down'
      };
    }
    
    return baseStats;
  };
  const displayStats = getStatsData();return (
    <>
      {/* Mobile view - Horizontal scroll */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          overflowX: 'auto',
          gap: 2,
          pb: 1,
        }}
      >
        {displayStats.map((stat, index) => (
          <Paper
            key={index}
            sx={{
              minWidth: 250,
              flexShrink: 0,
              p: 2,
              borderRadius: 3,
              position: 'relative',
            }}
          >
            {loading && index === 0 ? (
              <>
                <Skeleton variant="circular" width={20} height={20} sx={{ position: 'absolute', top: 12, right: 12 }} />
                <Skeleton variant="text" width="60%" height={28} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="40%" height={16} />
              </>
            ) : (
              <>
                <Box sx={{ position: 'absolute', top: 12, right: 12 }}>{stat.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {stat.amount}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {stat.title}
                </Typography>
                {stat.label && (
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {stat.label}
                  </Typography>
                )}
                <Box
                  sx={{
                    mt: 1,
                    display: 'flex',
                    alignItems: 'center',
                    color: stat.changeType === 'up' ? 'success.main' : 'error.main',
                    fontSize: '0.8rem',
                  }}
                >
                  {stat.change} 
                  <span style={{ marginLeft: 4 }}>
                    {index === 0 && monthlyComparisonData 
                      ? `vs ${monthlyComparisonData.previousMonth}`
                      : 'than last quarter'
                    }
                  </span>
                </Box>
              </>
            )}
          </Paper>
        ))}
      </Box>

      {/* Desktop view - Grid layout */}
      <Grid container spacing={2} sx={{ display: { xs: 'none', md: 'flex' }, p: 1 }}>
        {displayStats.map((stat, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                position: 'relative',
                height: '100%',
              }}
            >
              {loading && index === 0 ? (
                <>
                  <Skeleton variant="circular" width={20} height={20} sx={{ position: 'absolute', top: 12, right: 12 }} />
                  <Skeleton variant="text" width="60%" height={28} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="40%" height={16} />
                </>
              ) : (
                <>
                  <Box sx={{ position: 'absolute', top: 12, right: 12 }}>{stat.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {stat.amount}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  {stat.label && (
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  )}
                  <Box
                    sx={{
                      mt: 1,
                      display: 'flex',
                      alignItems: 'center',
                      color: stat.changeType === 'up' ? 'success.main' : 'error.main',
                      fontSize: '0.8rem',
                    }}
                  >
                    {stat.change} 
                    <span style={{ marginLeft: 4 }}>
                      {index === 0 && monthlyComparisonData 
                        ? `vs ${monthlyComparisonData.previousMonth}`
                        : 'than last quarter'
                      }
                    </span>
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default StatsCards;
