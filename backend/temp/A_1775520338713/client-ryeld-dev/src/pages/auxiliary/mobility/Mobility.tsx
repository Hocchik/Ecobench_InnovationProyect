import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton, 
  Paper, 
  TextField, 
  InputAdornment,
  Grid
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { MobilityExpensesTable } from './components/MobilityExpensesTable.tsx';
import { MobilityChart } from './components/MobilityChart.tsx';
import { months, mockMobilityData } from './data/mobilityData.ts';
import { MobilityExpense } from './data/interfaces';

function AuxiliaryMobility() {
  const [currentMonth, setCurrentMonth] = useState<number>(1); // Enero por defecto
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [comparePercentage, setComparePercentage] = useState<number>(0);
  const [filteredExpenses, setFilteredExpenses] = useState(mockMobilityData[1] || []);

  const handlePrevMonth = () => {
    const newMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    setCurrentMonth(newMonth);
  };

  useEffect(() => {
    // Cargar los datos del mes seleccionado
    const monthData = mockMobilityData[currentMonth] || [];
    
    // Calcular total del mes actual
    const total = monthData.reduce((sum: number, expense: MobilityExpense) => {
      return typeof expense.monto === 'number' ? sum + expense.monto : sum;
    }, 0);
    
    setTotalAmount(total);
    
    // Simular porcentaje de cambio con respecto al mes anterior (dato de ejemplo)
    setComparePercentage(currentMonth === 1 ? -2 : (Math.random() * 10) - 5);
    
    // Filtrar los gastos según la búsqueda
    filterExpenses(monthData);
  }, [currentMonth]);

  useEffect(() => {
    // Actualizar la lista filtrada cuando cambie la búsqueda
    filterExpenses(mockMobilityData[currentMonth] || []);
  }, [searchQuery, currentMonth]);

  const filterExpenses = (expenses: MobilityExpense[]) => {
    if (!searchQuery.trim()) {
      setFilteredExpenses(expenses);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = expenses.filter((expense: MobilityExpense) => 
      expense.tecnico?.toLowerCase().includes(query) ||
      expense.motivo?.toLowerCase().includes(query) ||
      expense.concepto?.toLowerCase().includes(query) ||
      expense.origen?.toLowerCase().includes(query) ||
      expense.destino?.toLowerCase().includes(query)
    );
    
    setFilteredExpenses(filtered);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Box sx={{ height: '100%', p: { xs: 1, sm: 2 } }}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Grid container spacing={2}>
          {/* Selector de mes y total */}
          <Grid item xs={12} md={5} lg={4}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: '20px',
              height: '100%',
              boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={handlePrevMonth} sx={{ bgcolor: '#F4F7FE', width: 40, height: 40 }}>
                  <ChevronLeftIcon />
                </IconButton>
                <Typography variant="h5" fontWeight="bold" sx={{ flexGrow: 1, textAlign: 'center' }}>
                  {months.find((m: any) => m.id === currentMonth)?.name}
                </Typography>
                <IconButton onClick={handleNextMonth} sx={{ bgcolor: '#F4F7FE', width: 40, height: 40 }}>
                  <ChevronRightIcon />
                </IconButton>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
                Total del mes
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ mr: 1 }}>
                  {formatCurrency(totalAmount)}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: comparePercentage < 0 ? 'success.main' : 'error.main'
                }}>
                  {comparePercentage < 0 ? (
                    <ArrowDropDownIcon color="inherit" />
                  ) : (
                    <ArrowDropDownIcon sx={{ transform: 'rotate(180deg)' }} color="inherit" />
                  )}
                  <Typography variant="body2" color="inherit">
                    {Math.abs(comparePercentage).toFixed(0)}% más del mes anterior
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Gráfico */}
          <Grid item xs={12} md={7} lg={8}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: '20px',
              height: '100%',
              boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
            }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Gastos Movilidad {new Date().getFullYear()}
              </Typography>
              <Box sx={{ height: 'calc(100% - 40px)', width: '100%' }}>
                <MobilityChart />
              </Box>
            </Paper>
          </Grid>

          {/* Tabla de gastos */}
          <Grid item xs={12}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: '20px',
              boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Gastos movilidad
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Buscar por técnico, motivo, concepto ..."
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ width: { xs: '100%', sm: '350px' }, bgcolor: '#F4F7FE', borderRadius: '8px' }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: '8px' }
                    },
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <MobilityExpensesTable expenses={filteredExpenses} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AuxiliaryMobility;