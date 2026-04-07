import { useState } from 'react';
import {
  Box,
  Typography,
  Snackbar,
  Alert,
  Button,
} from '@mui/material';

// Contextos
import { useSupClient } from './context/SupClientContext';
import { useElevatorTechHistoryContext } from './context/ElevatorTechHistoryContext';

// Interfaces
import {
  ClientMaintenanceHistory,
  CreateElevator,
  UpdateElevator,
} from './api/SupClientInterfaces';

// Componentes
import ClientsTable from './components/ClientsTable';
import ClientDetailsModal from './components/ClientDetailsModal';
import CreateElevatorModal from './components/CreateElevatorModal';
import { Add } from '@mui/icons-material';

function Clients() {
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [clientMaintenanceHistory, setClientMaintenanceHistory] = useState<ClientMaintenanceHistory[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [newElevatorData, setNewElevatorData] = useState<CreateElevator>({
    id_client: '',
    elevator_type: '',
    brand: '',
    model: '',
    control_system: false,
    machine_room: false,
    floors: 1,
    access_doors: 1,
    access_mode: '',
    maintenance_frequency: '',
    characteristics: '',
  });

  // Contexto de cliente
  const {
    clients,
    clientElevators,
    fetchClientElevators,
    fetchClientMaintenanceHistory,
    createElevator,
    updateElevator,
    deleteElevator,
  } = useSupClient();

  // Contexto técnico
  const {
    elevatorTechHistory,
    fetchElevatorTechHistory,
  } = useElevatorTechHistoryContext();

  const handleClientClick = async (id_client: string) => {
    setSelectedClientId(id_client);
    await fetchClientElevators(id_client);
    setModalOpen(true);
    setTabIndex(0);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleElevatorSelect = async (elevatorId: string) => {
    await fetchElevatorTechHistory(elevatorId);
    const history = await fetchClientMaintenanceHistory(elevatorId);
    setClientMaintenanceHistory(history);
    setTabIndex(0);
  };

  const handleTabChange = (_: any, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleCreateElevator = async (elevator: CreateElevator) => {
    const result = await createElevator(elevator);
    if (result.startsWith("Error")) {
      setErrorMessage(result);
      return;
    }
    setSuccessMessage("Elevador creado correctamente");
    setCreateModalOpen(false);
    await fetchClientElevators(elevator.id_client);
  };

  const handleUpdateElevator = async (elevator: UpdateElevator) => {
    const result = await updateElevator(elevator);
    if (result.startsWith("Error")) {
      setErrorMessage(result);
      return;
    }
    setSuccessMessage("Elevador actualizado correctamente");
    await fetchClientElevators(selectedClientId);
  };

  const handleDeleteElevator = async (elevatorId: string) => {
    const result = await deleteElevator(elevatorId);
    if (result.startsWith("Error")) {
      setErrorMessage(result);
      return;
    }
    setSuccessMessage("Elevador eliminado correctamente");
    await fetchClientElevators(selectedClientId);
  };

  return (
    <Box sx={{ height: '100%', p: 3 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: '#1B2559', fontWeight: 600 }}>
          Clientes
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setCreateModalOpen(true)}
          sx={{
            borderRadius: '8px',
            bgcolor: '#476797',
            '&:hover': {
              bgcolor: '#3A5478'
            }
          }}
        >
          Nuevo Elevador
        </Button>
      </Box>

      <ClientsTable
        clients={clients}
        onClientClick={handleClientClick}
      />

      <ClientDetailsModal
        open={modalOpen}
        elevators={clientElevators?.elevators || []}
        clientId={selectedClientId}
        onClose={handleCloseModal}
        onElevatorSelect={handleElevatorSelect}
        tabIndex={tabIndex}
        onTabChange={handleTabChange}
        elevatorTechHistory={elevatorTechHistory}
        clientMaintenanceHistory={clientMaintenanceHistory}
        onElevatorUpdate={handleUpdateElevator}
        onElevatorDelete={handleDeleteElevator}
      />

      <CreateElevatorModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateElevator} 
        clients={clients}
        elevatorData={newElevatorData}
        setElevatorData={setNewElevatorData}
      />

      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage(null)}>
        <Alert severity="error" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar open={!!successMessage} autoHideDuration={4000} onClose={() => setSuccessMessage(null)}>
        <Alert severity="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Clients;