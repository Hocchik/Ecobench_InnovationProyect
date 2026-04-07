import { Box, Button } from '@mui/material';
import { PictureAsPdf, TableView } from '@mui/icons-material';
import {
  ElevatorPartLocation,
  ElevatorTechHistory,
  EmergencyHistory,
  SparePartHistory
} from '../api/SupClientInterfaces';
import EmergencyHistorySection from './EmergencyHistorySection';
import SparePartHistorySection from './SparePartHistorySection';
import PartLocationSection from './PartLocationSection';
import ElevatorLocationDiagram from './ElevatorLocationDiagram';
import { useAuth } from '../../../../contexts/AuthContext';


interface Props {
  history: ElevatorTechHistory;

  onAddEmergency: (data: Omit<EmergencyHistory, 'id' | 'elevatorId'>) => Promise<void>;
  onEditEmergency: (data: EmergencyHistory) => Promise<void>;
  onDeleteEmergency: (id: string) => Promise<void>;

  onAddSparePart: (data: Omit<SparePartHistory, 'id' | 'elevatorId'>) => Promise<void>;
  onEditSparePart: (data: SparePartHistory) => Promise<void>;
  onDeleteSparePart: (id: string) => Promise<void>;

  onAddOrEditPartLocation: (
    location: 'CM' | 'DA' | 'PA',
    data: Omit<ElevatorPartLocation, 'id' | 'elevatorId'>
  ) => Promise<void>;
  onDeletePartLocation: (id: string) => Promise<void>;
}

const ElevatorTechHistoryView = ({
  history,
  onAddEmergency,
  onEditEmergency,
  onDeleteEmergency,
  onAddSparePart,
  onEditSparePart,
  onDeleteSparePart,
  onAddOrEditPartLocation,
  onDeletePartLocation,
}: Props) => {
  const handleExportPDF = () => {
    // Implementación futura
  };

  const handleExportExcel = () => {
    // Implementación futura
  };

  const { user } = useAuth();
  const employeeId = user?.employeeId ?? ''; // UUID del empleado logueado

  return (
    <Box>
      
      {/* Botones de exportación */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<PictureAsPdf />}
          onClick={handleExportPDF}
        >
          Exportar a PDF
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<TableView />}
          onClick={handleExportExcel}
        >
          Exportar a Excel
        </Button>
      </Box>

      <ElevatorLocationDiagram partLocations={history.part_locations || []} />


      {/* Sección de Emergencias */}
      <EmergencyHistorySection
        data={history.emergency_history || []}
        onAdd={onAddEmergency}
        onEdit={onEditEmergency}
        onDelete={onDeleteEmergency}
        employeeId={employeeId}
      />

      {/* Sección de Repuestos */}
      <SparePartHistorySection
        data={history.spare_part_history || []}
        onAdd={onAddSparePart}
        onEdit={onEditSparePart}
        onDelete={onDeleteSparePart}
        employeeId={employeeId}
      />

      {/* Sección de Partes por Ubicación */}
      <PartLocationSection
        data={history.part_locations || []}
        onAddOrEdit={onAddOrEditPartLocation}
        onDelete={onDeletePartLocation}
      />
    </Box>
  );
};

export default ElevatorTechHistoryView;