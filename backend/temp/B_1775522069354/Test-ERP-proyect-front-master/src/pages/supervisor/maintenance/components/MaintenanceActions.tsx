import { Box, Button } from "@mui/material";
import { Save } from "@mui/icons-material";
import {
  MainCorrective,
  MainPreventive,
  UpdateMainCorrective,
  UpdateMainPreventive,
} from "../api/SupMaintenanceInterfaces";

interface ActionProps {
  maintenance: MainPreventive | MainCorrective;
  setIsEditing: (v: boolean) => void;
  setEditedMaintenance: (m: UpdateMainPreventive | UpdateMainCorrective) => void;
  editedMaintenance: UpdateMainPreventive | UpdateMainCorrective | null;
  onSave: (m: UpdateMainPreventive | UpdateMainCorrective) => void;
}

export const MaintenanceActions = ({
  maintenance,
  setIsEditing,
  setEditedMaintenance,
  editedMaintenance,
  onSave,
}: ActionProps) => {
  const isPreventive = "period" in maintenance;

  const handleCancel = () => {
    setIsEditing(false);

    const base = {
      id_maintenance: maintenance.id_maintenance,
      scheduled_date: maintenance.scheduled_date,
      scheduled_real_date: maintenance.scheduled_real_date,
      scheduled_time: maintenance.scheduled_time,
      technician_selected_id_employee: maintenance.name_technician_selected || "",
      technician_executor_id_employee: maintenance.name_technician_executor || "",
      supervisor_id_employee: maintenance.name_supervisor || "",
      completed_status: maintenance.completed_status,
      checked: maintenance.checked,
      details: maintenance.observations || "",
    };

    const editable = isPreventive
      ? {
          ...base,
          period: maintenance.period,
          notice: maintenance.notice,
        } as UpdateMainPreventive
      : {
          ...base,
          type_maintenance: maintenance.type_maintenance,
        } as UpdateMainCorrective;

    setEditedMaintenance(editable);
  };

  return (
    <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
      <Button variant="outlined" onClick={handleCancel}>
        Cancelar
      </Button>
      <Button
        variant="contained"
        startIcon={<Save />}
        onClick={() => {
          if (editedMaintenance) onSave(editedMaintenance);
        }}
      >
        Guardar Cambios
      </Button>
    </Box>
  );
};