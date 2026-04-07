import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { getSaleStatistics } from '../api/services/salesServices';
import { dataset as staticDataset, chartSetting } from '../data/chartData';

const IncomeExpenseChart: React.FC = () => {
  const [salesData, setSalesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState(staticDataset);

  // Mapeo de meses en español a abreviaciones
  const monthMapping: Record<string, string> = {
    enero: 'Ene',
    febrero: 'Feb',
    marzo: 'Mar',
    abril: 'Abr',
    mayo: 'May',
    junio: 'Jun',
    julio: 'Jul',
    agosto: 'Ago',
    septiembre: 'Sep',
    octubre: 'Oct',
    noviembre: 'Nov',
    diciembre: 'Dic'
  };

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await getSaleStatistics();
        const data = response.data;
        setSalesData(data);

        // Transformar datos para el gráfico manteniendo egresos estáticos
        const transformedData = Object.entries(data.monthlySales).map(([monthName, sales], index) => ({
          ingresos: Number(sales),
          egresos: staticDataset[index]?.egresos || 0,
          month: monthMapping[monthName] || monthName.substring(0, 3)
        }));

        setChartData(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching sales data:', err);
        setError('Error al cargar datos de ventas');
        // Mantener datos estáticos en caso de error
        setChartData(staticDataset);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // Función para formatear valores
  const valueFormatter = (value: number | null) => {
    return `S/. ${value?.toFixed(2) || '0.00'}`;
  };

  if (loading) {
    return (
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: 5,
          p: 3,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error && !salesData) {
    return (
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: 5,
          p: 3,
          height: '100%',
        }}
      >
        <Alert severity="error">
          {error}
        </Alert>
      </Box>
    );
  }

  const totalIngresos = salesData ? salesData.totalYearlySales : chartData.reduce((sum, item) => sum + item.ingresos, 0);
  const totalEgresos = chartData.reduce((sum, item) => sum + item.egresos, 0);

  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: 5,
        p: 3,
        height: '100%',
      }}
    >      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: 'normal', textAlign: 'center' }}
      >
        <Box component="span" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
          S/. {totalIngresos.toLocaleString('es-PE', { minimumFractionDigits: 2 })} Entrada
        </Box>
        {' & '}
        <Box component="span" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          S/. {totalEgresos.toLocaleString('es-PE', { minimumFractionDigits: 2 })} Salida
        </Box>
        {' en el año'} {salesData?.year || new Date().getFullYear()}
      </Typography>

      <BarChart
        dataset={chartData}
        xAxis={[{ dataKey: 'month', scaleType: 'band' }]}
        series={[
          {
            dataKey: 'egresos',
            label: 'Salida',
            color: '#1976d2',
            valueFormatter,
          },
          {
            dataKey: 'ingresos',
            label: 'Entrada',
            color: '#ff9800',
            valueFormatter,
          },
        ]}
        {...chartSetting}
      />
    </Box>
  );
};

export default IncomeExpenseChart;
