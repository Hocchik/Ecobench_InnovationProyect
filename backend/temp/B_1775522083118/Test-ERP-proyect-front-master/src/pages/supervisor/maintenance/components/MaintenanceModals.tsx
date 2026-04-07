import {
  Box,
  Modal,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Close, Edit, Delete } from "@mui/icons-material";
import {
  MainCorrective,
  MainPreventive,
  UpdateMainCorrective,
  UpdateMainPreventive,
} from "../api/SupMaintenanceInterfaces";
import {
  Techs,
  Supervisors,
  MaintenanceType,
} from "../../../../api/interfaces/DataInterfaces";
import { UUID } from "../api/SupMaintenanceApi";
import { MaintenanceView } from "./MaintenanceView";
import { MaintenanceEdit } from "./MaintenanceEdit";
import { MaintenanceActions } from "./MaintenanceActions";

interface MaintenanceModalProps {
  open: boolean;
  onClose: () => void;
  maintenance: MainPreventive | MainCorrective | null;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  editedMaintenance: UpdateMainPreventive | UpdateMainCorrective | null;
  setEditedMaintenance: (maintenance: UpdateMainPreventive | UpdateMainCorrective | null) => void;
  onSave: (form: UpdateMainPreventive | UpdateMainCorrective) => void;
  onDelete: (type: "preventive" | "corrective", id: UUID) => void;
  technicians: Techs[];
  supervisors: Supervisors[];
  maintenanceTypes: MaintenanceType[];
}

export const MaintenanceModal = ({
  open,
  onClose,
  maintenance,
  isEditing,
  setIsEditing,
  editedMaintenance,
  setEditedMaintenance,
  onSave,
  onDelete,
  technicians,
  supervisors,
  maintenanceTypes,
}: MaintenanceModalProps) => {
  const isPreventive = maintenance && "period" in maintenance;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="maintenance-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "98vw", sm: 600, md: 800 },
          maxHeight: "95vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: { xs: 2, sm: 4 },
          color: "black",
          "& .MuiTypography-root": { color: "black" },
          "& .MuiInputLabel-root": { color: "black" },
          "& .MuiOutlinedInput-input": { color: "black" },
          "& .MuiSelect-select": { color: "black" },
          "& .MuiMenuItem-root": { color: "black" },
        }}
      >
        {/* Encabezado */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" id="maintenance-modal-title" sx={{ fontWeight: 700 }}>
            {isPreventive ? "Mantenimiento Preventivo" : "Mantenimiento Correctivo"}
          </Typography>
          <Box>
            {!isEditing && maintenance && (
              <>
                <IconButton
                  color="error"
                  onClick={() => {
                    onDelete(isPreventive ? "preventive" : "corrective", maintenance.id_maintenance);
                    onClose(); // Cierra el modal después de eliminar
                  }}
                  sx={{ mr: 1 }}
                >
                  <Delete />
                </IconButton>

                <IconButton onClick={() => setIsEditing(true)} sx={{ mr: 1 }}>
                  <Edit />
                </IconButton>
              </>
            )}
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Visualización */}
        {maintenance && !isEditing && <MaintenanceView maintenance={maintenance} />}

        {/* Edición */}
        {isEditing && editedMaintenance && (
          <MaintenanceEdit
            editedMaintenance={editedMaintenance}
            setEditedMaintenance={setEditedMaintenance}
            technicians={technicians}
            supervisors={supervisors}
            maintenanceTypes={maintenanceTypes}
            isPreventive={!!(maintenance && "period" in maintenance)}
          />
        )}

        {/* Acciones */}
        {isEditing && maintenance && (
          <MaintenanceActions
            maintenance={maintenance}
            setIsEditing={setIsEditing}
            setEditedMaintenance={setEditedMaintenance}
            editedMaintenance={editedMaintenance}
            onSave={onSave}
          />
        )}
      </Box>
    </Modal>
  );
};

export default MaintenanceModal;