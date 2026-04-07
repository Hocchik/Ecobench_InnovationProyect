import { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";

import TechnicianList from "./components/TechnicianList";
import AttendanceHistory from "./components/AttendanceHistory";
// import TechnicianStats from "./components/TechnicianStats";

import { useSupAttendance } from "./context/SupAttendanceContext";

function Attendance() {
  const [selectedTechnician, setSelectedTechnician] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().getMonth().toString()
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const date = new Date();
    date.setHours(1, 0, 0, 0); // Evitar desplazamientos inesperados
    return date.toISOString().split("T")[0];
  });

  const { getAttendancesByDate, getAttendanceHistory } = useSupAttendance();

  useEffect(() => {
    getAttendancesByDate(selectedDate);
  }, [selectedDate, getAttendancesByDate]);

  useEffect(() => {
    if (selectedTechnician) {
      getAttendanceHistory(
        selectedTechnician,
        Number(selectedMonth),
        Number(selectedYear)
      );
    }
  }, [selectedTechnician, selectedMonth, selectedYear, getAttendanceHistory]);

  return (
    <Box sx={{ height: "100vh", p: 3, backgroundColor: "#F8F9FF" }}>
      <Grid container spacing={3} sx={{ height: "100%" }}>
        {/* 🔹 Panel de asistencia por fecha */}
        <Grid item xs={12} md={5}>
          <Typography variant="h5" sx={{ color: "#1B2559", fontWeight: 600, mb: 2 }}>
            Asistencia
          </Typography>
          <TechnicianList
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Grid>

        {/* 🔹 Panel de historial por técnico */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" sx={{ color: "#1B2559", fontWeight: 600, mb: 2 }}>
            Historial de Asistencia
          </Typography>
          <AttendanceHistory
            selectedTechnician={selectedTechnician}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            setSelectedTechnician={setSelectedTechnician}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
          />
        </Grid>

        {/* 🔹 Panel de estadísticas (opcional) */}
        {/* <Grid item xs={12} sx={{ mt: 3 }}>
          <TechnicianStats
            selectedTechnician={selectedTechnician}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </Grid> */}
      </Grid>
    </Box>
  );
}

export default Attendance;