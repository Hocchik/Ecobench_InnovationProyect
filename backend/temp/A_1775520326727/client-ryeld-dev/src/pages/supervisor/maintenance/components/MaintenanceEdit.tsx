import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  UpdateMainPreventive,
  UpdateMainCorrective,
} from "../api/SupMaintenanceInterfaces";
import {
  Techs,
  Supervisors,
  MaintenanceType,
} from "../../../../api/interfaces/DataInterfaces";

interface Props {
  editedMaintenance: UpdateMainPreventive | UpdateMainCorrective;
  setEditedMaintenance: (m: UpdateMainPreventive | UpdateMainCorrective) => void;
  technicians: Techs[];
  supervisors: Supervisors[];
  maintenanceTypes: MaintenanceType[];
  isPreventive: boolean;
}

export const MaintenanceEdit = ({
  editedMaintenance,
  setEditedMaintenance,
  technicians,
  supervisors,
  maintenanceTypes,
  isPreventive,
}: Props) => {
  return (
    <Grid container spacing={2}>
      {/* Columna 1: Información General */}
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: "#476797" }}>
          Información General
        </Typography>

        <TextField
          label="Fecha Programada"
          type="date"
          value={editedMaintenance.scheduled_date}
          onChange={(e) =>
            setEditedMaintenance({
              ...editedMaintenance,
              scheduled_date: e.target.value,
            })
          }
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Fecha Real"
          type="date"
          value={editedMaintenance.scheduled_real_date}
          onChange={(e) =>
            setEditedMaintenance({
              ...editedMaintenance,
              scheduled_real_date: e.target.value,
            })
          }
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Hora Programada"
          type="time"
          value={editedMaintenance.scheduled_time}
          onChange={(e) =>
            setEditedMaintenance({
              ...editedMaintenance,
              scheduled_time: e.target.value,
            })
          }
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        {isPreventive ? (
          <TextField
            label="Periodo"
            value={(editedMaintenance as UpdateMainPreventive).period}
            onChange={(e) =>
              setEditedMaintenance({
                ...(editedMaintenance as UpdateMainPreventive),
                period: e.target.value,
              })
            }
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />
        ) : (
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Tipo de Mantenimiento</InputLabel>
            <Select
              value={(editedMaintenance as UpdateMainCorrective).type_maintenance}
              onChange={(e) =>
                setEditedMaintenance({
                  ...(editedMaintenance as UpdateMainCorrective),
                  type_maintenance: e.target.value,
                })
              }
              label="Tipo de Mantenimiento"
            >
              {maintenanceTypes.map((type) => (
                <MenuItem key={type.index} value={type.maintenance_type}>
                  {type.maintenance_type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Grid>

      {/* Columna 2: Personal y Estado */}
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: "#476797" }}>
          Personal y Estado
        </Typography>

        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>Técnico Seleccionado</InputLabel>
          <Select
            value={editedMaintenance.technician_selected_id_employee}
            onChange={(e) =>
              setEditedMaintenance({
                ...editedMaintenance,
                technician_selected_id_employee: e.target.value,
              })
            }
            label="Técnico Seleccionado"
          >
            {technicians.map((tech) => (
              <MenuItem key={tech.id_technician} value={tech.id_technician}>
                {tech.name_technician}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>Técnico Ejecutor</InputLabel>
          <Select
            value={editedMaintenance.technician_executor_id_employee}
            onChange={(e) =>
              setEditedMaintenance({
                ...editedMaintenance,
                technician_executor_id_employee: e.target.value,
              })
            }
            label="Técnico Ejecutor"
          >
            {technicians.map((tech) => (
              <MenuItem key={tech.id_technician} value={tech.id_technician}>
                {tech.name_technician}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>Supervisor</InputLabel>
          <Select
            value={editedMaintenance.supervisor_id_employee}
            onChange={(e) =>
              setEditedMaintenance({
                ...editedMaintenance,
                supervisor_id_employee: e.target.value,
              })
            }
            label="Supervisor"
          >
            {supervisors.map((sup) => (
              <MenuItem key={sup.id_supervisor} value={sup.id_supervisor}>
                {sup.name_supervisor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {isPreventive ? (
          <>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Aviso</InputLabel>
              <Select
                value={(editedMaintenance as UpdateMainPreventive).notice ? "Sí" : "No"}
                onChange={(e) =>
                  setEditedMaintenance({
                    ...(editedMaintenance as UpdateMainPreventive),
                    notice: e.target.value === "Sí",
                  })
                }
                label="Aviso"
              >
                <MenuItem value="Sí">Sí</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Detalles"
              value={(editedMaintenance as UpdateMainPreventive).details}
              onChange={(e) =>
                setEditedMaintenance({
                  ...(editedMaintenance as UpdateMainPreventive),
                  details: e.target.value,
                })
              }
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              multiline
              rows={3}
            />
          </>
        ) : (
          <TextField
            label="Observaciones"
            value={(editedMaintenance as UpdateMainCorrective).details}
            onChange={(e) =>
              setEditedMaintenance({
                ...(editedMaintenance as UpdateMainCorrective),
                details: e.target.value,
              })
            }
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            multiline
            rows={3}
          />
        )}

        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>Completado</InputLabel>
          <Select
            value={editedMaintenance.completed_status ? "Sí" : "No"}
            onChange={(e) =>
              setEditedMaintenance({
                ...editedMaintenance,
                completed_status: e.target.value === "Sí",
              })
            }
            label="Completado"
          >
            <MenuItem value="Sí">Sí</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Revisado</InputLabel>
          <Select
            value={editedMaintenance.checked ? "Sí" : "No"}
            onChange={(e) =>
              setEditedMaintenance({
                ...editedMaintenance,
                checked: e.target.value === "Sí",
              })
            }
            label="Revisado"
          >
            <MenuItem value="Sí">Sí</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};