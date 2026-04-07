import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useTechMyExpenses } from './context/TechMyExpensesContext';
import { useState } from 'react';
import AddExpenseModal from './components/AddExpenseModal';
import { CreateTechnicianExpenseDTO } from './api/TechMyExpensesInterfaces';

const TechnicianMyExpenses = () => {
  const { expenses, loading, error, createExpense } = useTechMyExpenses();
  const [modalOpen, setModalOpen] = useState(false);

  // 🧠 Accesibilidad: bloquear fondo cuando el modal está abierto
  const inertRoot = document.getElementById('root');
  if (inertRoot) {
    modalOpen ? inertRoot.setAttribute('inert', '') : inertRoot.removeAttribute('inert');
  }

  // 📝 Enviar gasto
  const handleSubmit = async (dto: Omit<CreateTechnicianExpenseDTO, 'technicianId'>) => {
    setModalOpen(false);
    await createExpense(dto);
  };

  return (
    <Container sx={{ py: 3, px: { xs: 1, sm: 3 } }}>
      {/* 💰 Caja chica header */}
      <Paper elevation={0} sx={{ bgcolor: 'white', p: 2, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#000' }}>
              CAJA CHICA
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#666' }}>
              Monto actual:
            </Typography>
            <Typography variant="h5" sx={{ color: '#000', display: 'flex', alignItems: 'center', gap: 1 }}>
              s/. 100.00
              <AttachMoneyIcon sx={{ color: '#FFD700' }} />
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* 📋 Lista de gastos */}
      <Paper elevation={0} sx={{ bgcolor: 'white', p: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#000' }}>
            Últimos movimientos
          </Typography>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
            sx={{
              color: '#476797',
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'rgba(71, 103, 151, 0.04)'
              }
            }}
          >
            Agregar gasto
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box sx={{ mb: 4 }}>
            {expenses.map((expense) => (
              <Box
                key={expense.id}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  mb: 2,
                  p: 2,
                  position: 'relative',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <Typography sx={{ color: '#333', fontSize: '0.95rem', fontWeight: 500 }}>
                  {expense.type}
                </Typography>
                <Typography sx={{ color: '#666', fontSize: '0.85rem' }}>
                  {new Date(expense.date).toLocaleDateString()}
                </Typography>
                <Typography sx={{ color: '#D32F2F', fontSize: '1.1rem', fontWeight: 600 }}>
                  s/. {expense.amount.toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Paper>

      {/* ➕ Modal para agregar gasto */}
      <AddExpenseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default TechnicianMyExpenses;