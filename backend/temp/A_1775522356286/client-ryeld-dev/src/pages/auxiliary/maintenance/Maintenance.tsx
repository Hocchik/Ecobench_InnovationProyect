import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid';
import DownloadIcon from '@mui/icons-material/Download';
import { PreventiveMaintenanceTable } from './components/PreventiveMaintenanceTable';
import { CorrectiveMaintenanceTable } from './components/CorrectiveMaintenanceTable';
import { MaintenanceDetailModal } from './components/MaintenanceDetailModal';
import { 
  months,
  preventiveMaintenanceData,
  correctiveMaintenanceData,
  maintenanceDetails
} from './data/maintenanceData';
import { PreventiveMaintenance, CorrectiveMaintenance, MaintenanceDetail } from './data/interfaces';

function AuxiliaryMaintenance() {
  const [selectedMonth, setSelectedMonth] = useState<number>(1); // Enero por defecto
  const [preventiveData, setPreventiveData] = useState<PreventiveMaintenance[]>(preventiveMaintenanceData);
  const [correctiveData] = useState<CorrectiveMaintenance[]>(correctiveMaintenanceData);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedDetail, setSelectedDetail] = useState<MaintenanceDetail | null>(null);

  const handleMonthChange = (event: SelectChangeEvent) => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleUpdateAviso = (id: number | string, newStatus: 'Pending' | 'Avisado') => {
    setPreventiveData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, aviso: newStatus } : item
      )
    );
  };

  const handleViewDetails = (id: number | string) => {
    const detail = maintenanceDetails[id.toString()];
    if (detail) {
      setSelectedDetail(detail);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDetail(null);
  };

  return (
    <Box sx={{ height: '100vh', overflowY: 'auto', p: { xs: 1, sm: 2 }, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl" sx={{ minHeight: '100%' }}>
        {/* Controles superiores */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Mantenimiento
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Mes</InputLabel>
              <Select
                value={selectedMonth.toString()}
                label="Mes"
                onChange={handleMonthChange}
                sx={{ bgcolor: '#FEF3C7', borderRadius: '8px' }}
              >
                {months.map((month) => (
                  <MenuItem key={month.id} value={month.id.toString()}>
                    {month.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{ 
                bgcolor: '#476797', 
                borderRadius: '8px',
                '&:hover': { bgcolor: '#475569' }
              }}
            >
              Exportar
            </Button>
          </Box>
        </Box>

        {/* Contenido principal */}
        <Grid container spacing={3}>
          {/* Mantenimientos Preventivos */}
          <Grid item xs={12}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: '20px',
              boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
              mb: 3
            }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 3 
              }}>
                <Typography variant="h6" fontWeight="bold">
                  Mantenimientos Preventivos
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  bgcolor: '#F4F7FE',
                  px: 2,
                  py: 1,
                  borderRadius: '8px'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    Buscar por Edificio...
                  </Typography>
                </Box>
              </Box>

              <PreventiveMaintenanceTable 
                data={preventiveData}
                onUpdateAviso={handleUpdateAviso}
              />
            </Paper>
          </Grid>

          {/* Mantenimientos Correctivos, Reparación y Modernización */}
          <Grid item xs={12}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: '20px',
              boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
            }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 3 
              }}>
                <Typography variant="h6" fontWeight="bold">
                  Mantenimientos Correctivos, Reparación y Modernización
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  bgcolor: '#F4F7FE',
                  px: 2,
                  py: 1,
                  borderRadius: '8px'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    Buscar por Edificio...
                  </Typography>
                </Box>
              </Box>

              <CorrectiveMaintenanceTable 
                data={correctiveData}
                onViewDetails={handleViewDetails}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Modal de detalles */}
        <MaintenanceDetailModal
          open={modalOpen}
          onClose={handleCloseModal}
          detail={selectedDetail}
        />
      </Container>
    </Box>
  );
}

export default AuxiliaryMaintenance;