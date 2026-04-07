import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { expenses } from '../data/technicianData';

const TechnicianExpenses: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '20px',
        background: 'white',
        boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: '#1B2559', fontWeight: 600, mb: 3 }}
      >
        Gastos por técnico
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflow: 'auto',
          flex: 1,
          '&::-webkit-scrollbar': {
            width: '4px',
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: '4px',
          },
          '&:hover::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
        }}
      >
        {expenses.map((expense, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 2,
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#1B2559', fontWeight: 500 }}
                >
                  {expense.name}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: 'rgb(44, 44, 49)', fontWeight: 'bold' }}
                >
                  {expense.amount}
                </Typography>
              </Box>

              <Box>
                <button
                  style={{
                    backgroundColor: '#476797',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  Ver detalle
                </button>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
};

export default TechnicianExpenses;
