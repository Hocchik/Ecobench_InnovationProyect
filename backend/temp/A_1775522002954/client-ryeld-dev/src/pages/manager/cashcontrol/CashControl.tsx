import { Container, Typography, Box, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import AuxiliaryCashSection from './components/AuxiliaryCashSection';
import TechniciansCashSection from './components/TechniciansCashSection';
import { AddBalanceModal } from './components/AddBalanceModal';
import { AddBalanceData } from './types/cashControlTypes';
import { auxiliaryCashData, techniciansCashData, AuxiliaryCash, TechnicianCash, CashMovement } from './data/cashControlData';
import { CashControlStorage } from './data/cashControlStorage';

function ManagerCashControl() {
  const [isAuxiliaryModalOpen, setIsAuxiliaryModalOpen] = useState(false);
  const [selectedTechnicianId, setSelectedTechnicianId] = useState<number | null>(null);
  const [auxiliaryData, setAuxiliaryData] = useState<AuxiliaryCash>(auxiliaryCashData);
  const [techniciansData, setTechniciansData] = useState<TechnicianCash[]>(techniciansCashData);

  // Initialize data from localStorage on component mount
  useEffect(() => {
    // Initialize localStorage with default data if not exists
    CashControlStorage.initializeData(auxiliaryCashData, techniciansCashData);
    
    // Load data from localStorage
    const storedAuxiliary = CashControlStorage.getAuxiliaryCashData();
    const storedTechnicians = CashControlStorage.getTechniciansCashData();
    
    if (storedAuxiliary) {
      setAuxiliaryData(storedAuxiliary);
    }
    if (storedTechnicians) {
      setTechniciansData(storedTechnicians);
    }
  }, []);

  const handleAddAuxiliaryBalance = () => {
    setIsAuxiliaryModalOpen(true);
  };

  const handleAddTechnicianBalance = (technicianId: number) => {
    setSelectedTechnicianId(technicianId);
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleAuxiliaryBalanceSubmit = async (data: AddBalanceData) => {
    try {
      // Convert image to base64 if exists
      let evidenceImage: string | undefined;
      if (data.evidenceImage) {
        evidenceImage = await fileToBase64(data.evidenceImage);
      }

      // Create new movement
      const newMovement: CashMovement = {
        id: Math.max(...auxiliaryData.movements.map(m => m.id), 0) + 1,
        description: data.reason,
        type: 'Ingreso',
        date: data.date,
        total: data.amount,
        evidenceImage
      };

      // Update auxiliary data
      const updatedAuxiliaryData: AuxiliaryCash = {
        ...auxiliaryData,
        currentBalance: auxiliaryData.currentBalance + data.amount,
        movements: [newMovement, ...auxiliaryData.movements]
      };

      // Update state and localStorage
      setAuxiliaryData(updatedAuxiliaryData);
      CashControlStorage.saveAuxiliaryCashData(updatedAuxiliaryData);
      
      setIsAuxiliaryModalOpen(false);
    } catch (error) {
      console.error('Error adding auxiliary balance:', error);
    }
  };

  const handleTechnicianBalanceSubmit = async (data: AddBalanceData) => {
    if (!selectedTechnicianId) return;

    try {
      // Convert image to base64 if exists
      let evidenceImage: string | undefined;
      if (data.evidenceImage) {
        evidenceImage = await fileToBase64(data.evidenceImage);
      }

      // Find technician and create new movement
      const technicianIndex = techniciansData.findIndex(t => t.id === selectedTechnicianId);
      if (technicianIndex === -1) return;

      const technician = techniciansData[technicianIndex];
      const newMovement: CashMovement = {
        id: Math.max(...technician.movements.map(m => m.id), 0) + 1,
        description: data.reason,
        type: 'Ingreso',
        date: data.date,
        total: data.amount,
        evidenceImage
      };

      // Update technician data
      const updatedTechniciansData = [...techniciansData];
      updatedTechniciansData[technicianIndex] = {
        ...technician,
        currentBalance: technician.currentBalance + data.amount,
        movements: [newMovement, ...technician.movements]
      };

      // Update state and localStorage
      setTechniciansData(updatedTechniciansData);
      CashControlStorage.saveTechniciansCashData(updatedTechniciansData);
      
      setSelectedTechnicianId(null);
    } catch (error) {
      console.error('Error adding technician balance:', error);
    }
  };

  const handleExportAuxiliaryExcel = () => {
    // TODO: Implementar exportación a Excel de movimientos de auxiliar
    console.log('Exportar movimientos de auxiliar a Excel');
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
          variant="h5"
          fontWeight="600"
          color="#1B2559"
          gutterBottom
        >
          Control de Flujo de Caja
        </Typography>
      </Box>      <Stack spacing={4}>        {/* Sección Auxiliar Administrativo */}
        <AuxiliaryCashSection
          data={auxiliaryData}
          onAddBalance={handleAddAuxiliaryBalance}
          onExportExcel={handleExportAuxiliaryExcel}
        />
        {/* Sección Técnicos */}
        <TechniciansCashSection
          data={techniciansData}
          onAddBalance={handleAddTechnicianBalance}
          onExportExcel={handleExportTechnicianExcel}
        />
      </Stack>

      {/* Modal para agregar saldo al auxiliar administrativo */}
      <AddBalanceModal
        open={isAuxiliaryModalOpen}
        onClose={() => setIsAuxiliaryModalOpen(false)}
        onSubmit={handleAuxiliaryBalanceSubmit}
        title="Agregar Saldo - Auxiliar Administrativo"
      />

      {/* Modal para agregar saldo a técnico */}
      <AddBalanceModal
        open={selectedTechnicianId !== null}
        onClose={() => setSelectedTechnicianId(null)}
        onSubmit={handleTechnicianBalanceSubmit}
        title="Agregar Saldo - Técnico"
      />
    </Container>
  );
}

export default ManagerCashControl;