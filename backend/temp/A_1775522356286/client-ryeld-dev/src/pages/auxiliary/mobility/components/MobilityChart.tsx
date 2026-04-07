import React from 'react';
import { Box } from '@mui/material';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Tooltip,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { calculateMonthlyTotals } from '../data/mobilityData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export const MobilityChart: React.FC = () => {
  const monthlyData = calculateMonthlyTotals();
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#363740',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `S/ ${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#E2E8F0',
        },
        ticks: {
          callback: function(value: any) {
            return value;
          },
          color: '#718096',
          font: {
            size: 10,
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#718096',
          font: {
            size: 10,
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 4,
        backgroundColor: '#476797',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        hoverRadius: 6,
      }
    },
  };

  const data = {
    labels: monthlyData.map(item => item.month),
    datasets: [
      {
        label: 'Gastos por mes',
        data: monthlyData.map(item => item.amount),
        fill: true,
        backgroundColor: 'rgba(136, 132, 216, 0.2)',
        borderColor: '#476797',
        pointBackgroundColor: '#476797',
      },
    ],
  };

  return (
    <Box sx={{ 
      height: '100%', 
      width: '100%',
      display: 'flex',
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <Line options={options as any} data={data} />
    </Box>
  );
};
