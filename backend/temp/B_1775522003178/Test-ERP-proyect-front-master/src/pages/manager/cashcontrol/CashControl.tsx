
import { Container, Typography, Box, Stack } from '@mui/material';
import AuxiliaryCashSection from './components/AuxiliaryCashSection';
import TechniciansCashSection from './components/TechniciansCashSection';

function ManagerCashControl() {
  const handleAddAuxiliaryBalance = () => {
    // TODO: Implementar modal para añadir saldo a auxiliar
    console.log('Abrir modal para añadir saldo a auxiliar administrativo');
  };

  const handleExportAuxiliaryExcel = () => {
    // TODO: Implementar exportación a Excel de movimientos de auxiliar
    console.log('Exportar movimientos de auxiliar a Excel');
  };

  const handleAddTechnicianBalance = (technicianId: number) => {
    // TODO: Implementar modal para añadir saldo a técnico
    console.log(`Abrir modal para añadir saldo al técnico ID: ${technicianId}`);
  };

  const handleExportTechnicianExcel = (technicianId: number) => {
    // TODO: Implementar exportación a Excel de movimientos de técnico
    console.log(`Exportar movimientos del técnico ID: ${technicianId} a Excel`);
  };

  return (
    <Container sx={{
      py: 3,
      height: '100%',
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '4px',
        backgroundColor: 'transparent'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '4px'
      },
      '&:hover::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.2)'
      },
      paddingBottom: '10px'
    }}>
      <Box mb={2}>
        <Typography
          variant="h6"
          fontWeight="600"
          color="#333"
          gutterBottom
        >
          Control de Flujo de Caja
        </Typography>
      </Box>      <Stack spacing={4}>
        {/* Sección Auxiliar Administrativo */}
        <AuxiliaryCashSection
          onAddBalance={handleAddAuxiliaryBalance}
          onExportExcel={handleExportAuxiliaryExcel}
        />
        {/* Sección Técnicos */}
        <TechniciansCashSection
          onAddBalance={handleAddTechnicianBalance}
          onExportExcel={handleExportTechnicianExcel}
        />
      </Stack>
    </Container>
  );
}

export default ManagerCashControl;