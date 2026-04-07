import { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  TextField,
  Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Cancel, CheckCircle } from "@mui/icons-material";

import { useSupAttendance } from "../context/SupAttendanceContext";
import { useDataApi } from "../../../../contexts/DataContext";
import { UpdateAttendance, CreateAttendance } from "../api/SupAttendanceInterfaces";

interface TechnicianListProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const TechnicianList: React.FC<TechnicianListProps> = ({
  selectedDate,
  setSelectedDate
}) => {
  const {
    getAttendancesByDate,
    updateAttendance,
    createAttendance,
    dayAttendances,
    loading,
    error
  } = useSupAttendance();

  const { techs } = useDataApi();

  const [updatedAttendances, setUpdatedAttendances] = useState<
    (UpdateAttendance & { id: string; technicianId: string; name: string })[]
  >([]);

  useEffect(() => {
    getAttendancesByDate(selectedDate);
  }, [selectedDate, getAttendancesByDate]);

  useEffect(() => {
    const merged = techs.map((tech) => {
      const existing = dayAttendances.find(
        (att) => att.id_technician === tech.id_technician
      );

      return {
        id: existing?.id_attendance || "",
        technicianId: tech.id_technician,
        name: tech.name_technician,
        entry_time: existing?.entry_time || "",
        exit_time: existing?.exit_time ?? "",
        is_present: existing?.is_present ?? false
      };
    });

    setUpdatedAttendances(merged);
  }, [dayAttendances, techs]);

  const handleTimeChange = (
    technicianId: string,
    field: "entry_time" | "exit_time",
    value: string
  ) => {
    setUpdatedAttendances((prev) =>
      prev.map((att) =>
        att.technicianId === technicianId ? { ...att, [field]: value } : att
      )
    );
  };

  const handleToggleAttendance = (technicianId: string) => {
    setUpdatedAttendances((prev) =>
      prev.map((att) =>
        att.technicianId === technicianId
          ? { ...att, is_present: !att.is_present }
          : att
      )
    );
  };


  const isValidAttendanceId = (id: string): boolean => {
    return typeof id === "string" && id.trim() !== "" &&
      dayAttendances.some((att) => att.id_attendance === id);
  };


  const handleSaveAttendance = async () => {
    try {
      for (const att of updatedAttendances) {
        const hasEntry = att.entry_time.trim() !== "";
        if (!hasEntry) continue;

        const payload: CreateAttendance = {
          id_technician: att.technicianId,
          date: selectedDate,
          entry_time: att.entry_time,
          exit_time: att.exit_time || "",
          is_present: att.is_present
        };

        if (isValidAttendanceId(att.id)) {
          await updateAttendance(att.id, payload, selectedDate);
        } else {
          await createAttendance(payload);
        }
      }

      await getAttendancesByDate(selectedDate);
    } catch (error) {
      console.error("Error al guardar asistencia:", error);
    }
  };


  return (
    <Paper sx={{ p: 3, borderRadius: "20px", backgroundColor: "white", flex: 1 }}>
      <DatePicker
        label="Selecciona Fecha"
        value={(() => {
          const parts = selectedDate.split("-");
          return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), 1, 0, 0);
        })()}
        onChange={(date) => {
          if (date) {
            date.setHours(1, 0, 0, 0);
            const formattedDate =
              date.getFullYear() +
              "-" +
              String(date.getMonth() + 1).padStart(2, "0") +
              "-" +
              String(date.getDate()).padStart(2, "0");
            setSelectedDate(formattedDate);
          }
        }}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        size="small"
        onClick={handleSaveAttendance}
        sx={{ bgcolor: "#2196F3", "&:hover": { bgcolor: "#1976D2" }, mt: 2 }}
      >
        Guardar Asistencia
      </Button>

      {loading && <Typography>🔄 Cargando asistencia...</Typography>}
      {error && <Typography color="error">⚠️ {error}</Typography>}

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Técnico</TableCell>
              <TableCell>Asistencia</TableCell>
              <TableCell>Hora Entrada</TableCell>
              <TableCell>Hora Salida</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {updatedAttendances.map((att) => (
              <TableRow
                key={att.technicianId}
                sx={{
                  backgroundColor: !att.entry_time ? "#FFF3E0" : "inherit"
                }}
              >
                <TableCell>{att.name}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={att.is_present}
                    onChange={() => handleToggleAttendance(att.technicianId)}
                    icon={<Cancel sx={{ color: "#FF4842" }} />}
                    checkedIcon={<CheckCircle sx={{ color: "#4CAF50" }} />}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="time"
                    value={att.entry_time}
                    onChange={(e) =>
                      handleTimeChange(att.technicianId, "entry_time", e.target.value)
                    }
                    size="small"
                    required
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="time"
                    value={att.exit_time}
                    onChange={(e) =>
                      handleTimeChange(att.technicianId, "exit_time", e.target.value)
                    }
                    size="small"
                    placeholder="--:--"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TechnicianList;