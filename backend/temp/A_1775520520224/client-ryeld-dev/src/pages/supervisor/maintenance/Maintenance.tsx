import { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { MaintenanceTable } from "./components/MaintenanceTable";
import { MaintenanceModal } from "./components/MaintenanceModals";
import { MaintenanceAddModal } from "./components/MaintenanceAddModal";
import { MaintenanceTabs } from "./components/MaintenanceTabs";
import { MaintenanceHeader } from "./components/MaintenanceHeader";
import { useMaintenanceSupervisor } from "./context/SupMaintenanceContext";
import {
  CreateMainCorrective,
  CreateMainPreventive,
  MainCorrective,
  MainPreventive,
  UpdateMainCorrective,
  UpdateMainPreventive
} from "./api/SupMaintenanceInterfaces";
import { useDataApi } from "../../../contexts/DataContext";

function Maintenance() {
  const [selectedMaintenance, setSelectedMaintenance] = useState<MainPreventive | MainCorrective | null>(null);
  const [editedMaintenance, setEditedMaintenance] = useState<UpdateMainPreventive | UpdateMainCorrective | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchField, setSearchField] = useState("building");
  const [searchValue, setSearchValue] = useState("");
  const [deleteErrorModalOpen, setDeleteErrorModalOpen] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const {
    preventives,
    correctives,
    createMaintenancePreventive,
    createMaintenanceCorrective,
    updateMaintenancePreventive,
    updateMaintenanceCorrective,
    deleteMaintenance,
    reload
  } = useMaintenanceSupervisor();

  const { techs, supervisors, maintenanceTypes, /* elevatorTypes, */ elevators } = useDataApi(); // ← sin clients

  useEffect(() => {
    reload(); // Carga inicial desde el contexto
  }, []);

  const handleMaintenanceClick = (maintenance: MainPreventive | MainCorrective) => {
  setSelectedMaintenance(maintenance); // ← se usa para mostrar todo

  const isPreventive = "period" in maintenance;

  if (isPreventive) {
    const form: UpdateMainPreventive = {
      id_maintenance: maintenance.id_maintenance,
      period: maintenance.period,
      scheduled_date: maintenance.scheduled_date,
      scheduled_real_date: maintenance.scheduled_real_date,
      scheduled_time: maintenance.scheduled_time,
      technician_selected_id_employee:
        techs.find(t => t.name_technician === maintenance.name_technician_selected)?.id_technician || "",
      technician_executor_id_employee:
        techs.find(t => t.name_technician === maintenance.name_technician_executor)?.id_technician || "",
      supervisor_id_employee:
        supervisors.find(s => s.name_supervisor === maintenance.name_supervisor)?.id_supervisor || "",
      details: maintenance.observations,
      notice: maintenance.notice,
      completed_status: maintenance.completed_status,
      checked: maintenance.checked
    };
    setEditedMaintenance(form);
  } else {
    const form: UpdateMainCorrective = {
      id_maintenance: maintenance.id_maintenance,
      type_maintenance: maintenance.type_maintenance,
      scheduled_date: maintenance.scheduled_date,
      scheduled_real_date: maintenance.scheduled_real_date,
      scheduled_time: maintenance.scheduled_time,
      technician_selected_id_employee:
        techs.find(t => t.name_technician === maintenance.name_technician_selected)?.id_technician || "",
      technician_executor_id_employee:
        techs.find(t => t.name_technician === maintenance.name_technician_executor)?.id_technician || "",
      supervisor_id_employee:
        supervisors.find(s => s.name_supervisor === maintenance.name_supervisor)?.id_supervisor || "",
      details: maintenance.observations,
      completed_status: maintenance.completed_status,
      checked: maintenance.checked
    };
    setEditedMaintenance(form);
  }

  setModalOpen(true);
};

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setSearchValue("");
    setSearchField("building");
  };

  const handleUpdateMaintenance = async (form: UpdateMainPreventive | UpdateMainCorrective) => {
    console.log(form)
    try {
      const ok =
        tabValue === 0
          ? await updateMaintenancePreventive(form as UpdateMainPreventive)
          : await updateMaintenanceCorrective(form as UpdateMainCorrective);

      if (ok) {
        reload();
        setModalOpen(false);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error al actualizar mantenimiento:", error);
    }
  };

  const handleAddMaintenance = async (form: CreateMainPreventive | CreateMainCorrective) => {
    try {
      const ok =
        tabValue === 0
          ? await createMaintenancePreventive(form as CreateMainPreventive)
          : await createMaintenanceCorrective(form as CreateMainCorrective);

      if (ok) {
        reload();
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error al agregar mantenimiento:", error);
    }
  };

  const handleDeleteMaintenance = async (type: "preventive" | "corrective", id: string) => {
    try {
      const ok = await deleteMaintenance(type, id);
      if (ok) {
        reload();
      }
    } catch (error: any) {
      if (error.response?.status === 409 || error.response?.status === 400) {
        setDeleteErrorMessage(error.response.data || "No se puede eliminar el mantenimiento porque tiene actividades asociadas.");
        setDeleteErrorModalOpen(true);
      } else {
        console.error("Error inesperado al eliminar:", error);
      }
    }
  };


  const filteredMaintenances = (tabValue === 0 ? preventives : correctives).filter(maintenance => {
    if (!searchValue) return true;
    const searchLower = searchValue.toLowerCase();
    switch (searchField) {
      case "building":
        return maintenance.building_client.toLowerCase().includes(searchLower);
      case "month":
        return maintenance.month.toLowerCase().includes(searchLower);
      case "scheduledDate":
        return maintenance.scheduled_date.includes(searchValue);
      case "ascensorType":
        return maintenance.ascensor_type.toLowerCase().includes(searchLower);
      case "period":
        return "period" in maintenance && maintenance.period.toLowerCase().includes(searchLower);
      default:
        return false;
    }
  });

  return (
    <Box sx={{ height: "100%", p: 3 }}>
      <MaintenanceHeader
        searchField={searchField}
        searchValue={searchValue}
        tabValue={tabValue}
        setSearchField={setSearchField}
        setSearchValue={setSearchValue}
        setIsAddModalOpen={setIsAddModalOpen}
      />

      <MaintenanceTabs value={tabValue} onChange={handleTabChange} />

      <MaintenanceTable tabValue={tabValue} maintenances={filteredMaintenances} onView={handleMaintenanceClick} />

      <MaintenanceModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditing(false);
        }}
        maintenance={selectedMaintenance}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editedMaintenance={editedMaintenance}
        setEditedMaintenance={setEditedMaintenance}
        onSave={handleUpdateMaintenance}
        onDelete={handleDeleteMaintenance}
        technicians={techs || []}
        supervisors={supervisors || []}
        maintenanceTypes={maintenanceTypes || []}
        /* elevatorTypes={elevators || []} */
        /* elevators={elevators || []} */ // ← nuevo prop
      />

      <MaintenanceAddModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        isPreventive={tabValue === 0}
        onSave={handleAddMaintenance}
        technicians={techs || []}
        supervisors={supervisors || []}
        maintenanceTypes={maintenanceTypes || []}
        elevators={elevators || []} // ← nuevo prop
      />

      <Dialog open={deleteErrorModalOpen} onClose={() => setDeleteErrorModalOpen(false)}>
      <DialogTitle>Eliminación no permitida</DialogTitle>
      <DialogContent>
        <Typography>{deleteErrorMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDeleteErrorModalOpen(false)}>Cerrar</Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
}

export default Maintenance;