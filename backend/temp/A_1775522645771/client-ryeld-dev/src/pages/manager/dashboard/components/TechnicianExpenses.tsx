import React, { useState } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { expenses, TechnicianExpense } from '../data/technicianData';
import ExpenseDetailsModal from './ExpenseDetailsModal';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(amount);
};

const TechnicianExpenses: React.FC = () => {
  const [selectedTechnician, setSelectedTechnician] = useState<TechnicianExpense | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (technician: TechnicianExpense) => {
    setSelectedTechnician(technician);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTechnician(null);
  };
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
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >              <Box sx={{ flexGrow: 1 }}>
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
                  {formatCurrency(expense.amount)}
                </Typography>
              </Box>

              <Box>
                <Button
                  variant="contained"
                  onClick={() => handleViewDetails(expense)}
                  sx={{
                    backgroundColor: '#476797',
                    color: '#fff',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 2,
                    py: 0.75,
                    fontSize: '0.875rem',
                    '&:hover': {
                      backgroundColor: '#3A5578',
                    }
                  }}
                >
                  Ver detalle                </Button>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <ExpenseDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        technician={selectedTechnician}
      />
    </Paper>
  );
};

export default TechnicianExpenses;
