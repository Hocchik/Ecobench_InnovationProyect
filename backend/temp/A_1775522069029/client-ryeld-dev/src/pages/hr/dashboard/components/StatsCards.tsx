import React from 'react';
import { Box, Paper, Typography, Grid2 as Grid } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { HRStats } from '../data/interfaces';

interface StatsCardsProps {
  stats: HRStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const statsData = [
    {
      title: 'Total Ventas del Mes',
      value: stats.totalVentasMes,
      icon: TrendingUpIcon,
      color: '#476797',
      bgColor: '#EBF8FF'
    },
    {
      title: 'Total Compras del Mes',
      value: stats.totalComprasMes,
      icon: ShoppingCartIcon,
      color: '#476797',
      bgColor: '#F0FDF4'
    },
    {
      title: 'Total Pago AFP',
      value: stats.totalPagoAFP,
      icon: AccountBalanceIcon,
      color: '#F59E0B',
      bgColor: '#FFFBEB'
    },
    {
      title: 'Total Pago ESSALUD',
      value: stats.totalPagoESSALUD,
      icon: LocalHospitalIcon,
      color: '#EF4444',
      bgColor: '#FEF2F2'
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: '20px', 
              boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#476797', 
                      mb: 1,
                      fontWeight: 500
                    }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700, 
                      color: '#1B2559',
                      fontSize: { xs: '1.5rem', sm: '2rem' }
                    }}
                  >
                    {formatCurrency(stat.value)}
                  </Typography>
                </Box>
                <Box sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '20px',
                  backgroundColor: stat.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComponent sx={{ 
                    fontSize: 24, 
                    color: stat.color 
                  }} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};
