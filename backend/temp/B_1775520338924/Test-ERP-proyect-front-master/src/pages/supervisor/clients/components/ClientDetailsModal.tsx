import { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Modal, IconButton,
  Tabs, Tab, Snackbar, Alert
} from '@mui/material';
import { Close, Engineering, History, Assignment } from '@mui/icons-material';
import {
  ClientMaintenanceHistory as ClientMaintenanceHistoryType,
  ElevatorsData,
  ElevatorTechHistory,
  UpdateElevator,
  ElevatorPartLocation
} from '../api/SupClientInterfaces';
import ClientTechnicalInfo from './ClientTechnicalInfo';
import ClientMaintenanceHistoryTable from './ClientMaintenanceHistory';
import ElevatorTechHistoryView from './ElevatorTechHistoryView';
import { useElevatorTechHistoryContext } from '../context/ElevatorTechHistoryContext';
import { useSupClient } from '../context/SupClientContext';

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface ClientDetailsModalProps {
  open: boolean;
  elevators: ElevatorsData[];
  clientId: string;
  onElevatorUpdate: (updatedElevator: UpdateElevator) => Promise<void>;
  onElevatorDelete: (elevatorId: string) => Promise<void>;
  onElevatorSelect: (elevatorId: string) => void;
  onClose: () => void;
  tabIndex: number;
  onTabChange: (_: any, newValue: number) => void;
  elevatorTechHistory: ElevatorTechHistory | null;
  clientMaintenanceHistory: ClientMaintenanceHistoryType[];
}

const ClientDetailsModal = ({
  open,
  elevators,
  clientId,
  onElevatorUpdate,
  onElevatorDelete,
  onElevatorSelect,
  onClose,
  tabIndex,
  onTabChange,
  elevatorTechHistory,
  clientMaintenanceHistory
}: ClientDetailsModalProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedElevator, setSelectedElevator] = useState<ElevatorsData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    createEmergency,
    updateEmergency,
    deleteEmergency,
    createSparePart,
    updateSparePart,
    deleteSparePart,
    createPartLocation,
    updatePartLocation,
    deletePartLocation,
  } = useElevatorTechHistoryContext();

  const { fetchClientElevators } = useSupClient();

  useEffect(() => {
    if (elevators.length > 0) {
      setSelectedIndex(0);
      setSelectedElevator(elevators[0]);
      onElevatorSelect(elevators[0].id);
    } else {
      setSelectedIndex(0);
      setSelectedElevator(null);
    }
  }, [elevators]);

  const handleElevatorSelect = (index: number) => {
    const elevator = elevators[index];
    setSelectedIndex(index);
    setSelectedElevator(elevator);
    onElevatorSelect(elevator.id);
  };

  const handleClose = () => {
    setSelectedElevator(null);
    onClose();
  };

  const elevatorId = selectedElevator?.id ?? '';

  const handleAddOrEditPartLocation = (
    location: 'CM' | 'DA' | 'PA',
    data: Omit<ElevatorPartLocation, 'id' | 'elevatorId'>
  ): Promise<void> => {
    const existing = elevatorTechHistory?.part_locations?.find(p => p.location === location);
    if (existing) {
      return updatePartLocation(existing.id, { ...existing, ...data });
    } else {
      return createPartLocation(elevatorId, data);
    }
  };


  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Paper sx={{
        width: '90%',
        maxWidth: '900px',
        maxHeight: '90vh',
        overflow: 'auto',
        borderRadius: '20px',
        p: 3,
        position: 'relative'
      }}>
        {!elevators.length ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>Cargando...</Box>
        ) : (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#1B2559', fontWeight: 600 }}>
                  Detalles del Ascensor
                </Typography>
                <IconButton onClick={handleClose}><Close /></IconButton>
              </Box>
              <Tabs value={tabIndex} onChange={onTabChange}>
                <Tab icon={<Engineering />} label="Información Técnica" />
                <Tab icon={<History />} label="Historial de Mantenimientos" />
                <Tab icon={<Assignment />} label="Historial Técnico" />
              </Tabs>
            </Box>

            <TabPanel value={tabIndex} index={0}>
              {selectedElevator && (
                <ClientTechnicalInfo
                  elevators={elevators}
                  selectedIndex={selectedIndex}
                  onRefresh={() => fetchClientElevators(clientId)}
                  onElevatorUpdate={onElevatorUpdate}
                  onElevatorDelete={onElevatorDelete}
                  onSelectElevator={handleElevatorSelect}
                />
              )}
            </TabPanel>

            <TabPanel value={tabIndex} index={1}>
              <ClientMaintenanceHistoryTable
                elevatorId={elevatorId}
                maintenanceData={clientMaintenanceHistory}
              />
            </TabPanel>

            <TabPanel value={tabIndex} index={2}>
              {elevatorTechHistory ? (
                <ElevatorTechHistoryView
                  history={elevatorTechHistory}
                  onAddEmergency={(data) => createEmergency(elevatorId, data)}
                  onEditEmergency={(data) => updateEmergency(data.id, data)}
                  onDeleteEmergency={(id) => deleteEmergency(id, elevatorId)}
                  onAddSparePart={(data) => createSparePart(elevatorId, data)}
                  onEditSparePart={(data) => updateSparePart(data.id, data)}
                  onDeleteSparePart={(id) => deleteSparePart(id, elevatorId)}
                  onAddOrEditPartLocation={handleAddOrEditPartLocation}
                  onDeletePartLocation={(id) => deletePartLocation(id, elevatorId)}
                />
              ) : (
                <Box sx={{ p: 2 }}>No hay historial técnico para este ascensor.</Box>
              )}
            </TabPanel>
          </>
        )}

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
      </Paper>
    </Modal>
  );
};

export default ClientDetailsModal;