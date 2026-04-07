import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { InventoryStats } from '../data/interfaces';

interface InventoryStatsCardsProps {
  stats: InventoryStats;
}

export const InventoryStatsCards: React.FC<InventoryStatsCardsProps> = ({ stats }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const statsData = [
    {
      title: 'Total items',
      value: stats.totalItems,
      change: '2 más del último mes',
      trend: 'up',
      icon: <InventoryIcon sx={{ color: '#476797' }} />,
      bgColor: '#EBF8FF'
    },
    {
      title: 'Consumibles costo',
      value: formatCurrency(stats.consumiblesCosto),
      change: '2% más del último mes',
      trend: 'up',
      icon: <AttachMoneyIcon sx={{ color: '#F59E0B' }} />,
      bgColor: '#FEF3C7'
    },
    {
      title: 'Repuesto costo',
      value: formatCurrency(stats.repuestoCosto),
      change: '2.5% menos del último mes',
      trend: 'down',
      icon: <MonetizationOnIcon sx={{ color: '#8B5CF6' }} />,
      bgColor: '#F3E8FF'
    },
    {
      title: 'Items con bajo stock',
      value: stats.itemsBajoStock,
      change: '20 more than last week',
      trend: 'up',
      icon: <WarningIcon sx={{ color: '#F59E0B' }} />,
      bgColor: '#FEF3C7'
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {statsData.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper sx={{
            p: 3,
            borderRadius: '20px',
            boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
            height: '100%'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
              <Box sx={{
                bgcolor: stat.bgColor,
                borderRadius: '8px',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {stat.icon}
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {stat.trend === 'up' ? (
                <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16 }} />
              ) : (
                <TrendingDownIcon sx={{ color: 'error.main', fontSize: 16 }} />
              )}
              <Typography variant="caption" color={stat.trend === 'up' ? 'success.main' : 'error.main'}>
                {stat.change}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
