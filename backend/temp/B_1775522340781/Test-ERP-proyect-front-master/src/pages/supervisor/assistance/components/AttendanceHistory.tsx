import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from "@mui/material";

import { useSupAttendance } from "../context/SupAttendanceContext";
import { useDataApi } from "../../../../contexts/DataContext";
import { HistoryAttendanceTech } from "../api/SupAttendanceInterfaces";

interface AttendanceHistoryProps {
  selectedTechnician: string;
  selectedMonth: string;
  selectedYear: string;
  setSelectedTechnician: (technicianId: string) => void;
  setSelectedMonth: (month: string) => void;
  setSelectedYear: (year: string) => void;
}

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({
  selectedTechnician,
  selectedMonth,
  selectedYear,
  setSelectedTechnician,
  setSelectedMonth,
  setSelectedYear
}) => {
  const { getAttendanceHistory, technicianHistory, loading, error } = useSupAttendance();
  const { techs } = useDataApi();
  const [hasSearched, setHasSearched] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (selectedTechnician && selectedMonth && selectedYear) {
      setHasSearched(true);
      getAttendanceHistory(
        selectedTechnician,
        Number(selectedMonth),
        Number(selectedYear)
      );
    }
  }, [selectedTechnician, selectedMonth, selectedYear, getAttendanceHistory]);

  return (
    <Paper sx={{ p: 3, borderRadius: "20px", backgroundColor: "white", flex: 1 }}>
      {/* 🔹 Filtros de búsqueda */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Técnico</InputLabel>
          <Select
            value={selectedTechnician}
            onChange={(e) => setSelectedTechnician(e.target.value)}
            label="Técnico"
          >
            <MenuItem value="">Selecciona un Técnico</MenuItem>
            {techs?.map((tech) => (
              <MenuItem key={tech.id_technician} value={String(tech.id_technician)}>
                {tech.name_technician}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Mes</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            label="Mes"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i + 1} value={String(i + 1)}>
                {new Date(currentYear, i, 1).toLocaleString("es", {
                  month: "long",
                  timeZone: "UTC"
                })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Año</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Año"
          >
            {Array.from({ length: 5 }, (_, i) => {
              const year = currentYear - i;
              return (
                <MenuItem key={year} value={String(year)}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      {/* 🔹 Estado de carga y errores */}
      {loading && <Typography>🔄 Cargando historial...</Typography>}
      {error && <Typography color="error">⚠️ {error}</Typography>}

      {/* 🔹 Tabla de historial */}
      <TableContainer>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Día</TableCell>
              <TableCell>Entrada</TableCell>
              <TableCell>Salida</TableCell>
              <TableCell>Horas Trabajadas</TableCell>
              <TableCell>Horas Extra</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hasSearched && technicianHistory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="textSecondary">
                    📭 No hay registros disponibles para este técnico
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              technicianHistory.map((record: HistoryAttendanceTech) => (
                <TableRow key={record.id_attendance}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    {new Date(record.date).toLocaleDateString("es", {
                      weekday: "long"
                    })}
                  </TableCell>
                  <TableCell>{record.entry_time}</TableCell>
                  <TableCell>{record.exit_time}</TableCell>
                  <TableCell>{record.hours_worked}</TableCell>
                  <TableCell>{record.overtime}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AttendanceHistory;