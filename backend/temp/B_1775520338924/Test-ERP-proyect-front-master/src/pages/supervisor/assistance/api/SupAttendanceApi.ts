// SupAttendanceApi.ts

import axios from "axios";
import {
  DayAttendance,
  HistoryAttendanceTech,
  UpdateAttendance,
  CreateAttendance // 👈 asegúrate de importar esto
} from "./SupAttendanceInterfaces";

const BASE_URL = "http://localhost:8080/api/supervisor/attendance";

class SupAttendanceApi {
  // Obtener asistencias por fecha
  async getAttendancesByDate(date: string): Promise<DayAttendance[]> {
    const response = await axios.get(`${BASE_URL}/date/${date}`, {
      withCredentials: true
    });
    return response.data;
  }

  // Obtener historial por técnico, mes y año
  async getAttendanceHistory(
    technicianId: string,
    month: number,
    year: number
  ): Promise<HistoryAttendanceTech[]> {
    const response = await axios.get(
      `${BASE_URL}/history/${technicianId}/${month}/${year}`,
      { withCredentials: true }
    );
    return response.data;
  }

  // Obtener asistencias por técnico
  async getAttendancesByTechnician(technicianId: string): Promise<HistoryAttendanceTech[]> {
    const response = await axios.get(`${BASE_URL}/tech/${technicianId}`, {
      withCredentials: true
    });
    return response.data;
  }

  // Actualizar asistencia
  async updateAttendance(id: string, data: UpdateAttendance): Promise<string> {
    const response = await axios.put(`${BASE_URL}/${id}`, data, {
      withCredentials: true
    });
    return response.data;
  }

  // Crear nueva asistencia 👇
    async createAttendance(data: CreateAttendance): Promise<DayAttendance> {
    try {
        // Validación defensiva básica
        if (!data.id_technician || !data.date || !data.entry_time) {
        throw new Error("Faltan campos obligatorios para crear asistencia");
        }

        const response = await axios.post(`${BASE_URL}`, data, {
        withCredentials: true
        });

        return response.data; // Se espera que el backend devuelva el objeto Attendance creado
    } catch (error: any) {
        console.error("Error al crear asistencia:", error.response?.data || error.message);
        throw error;
    }
    }
}

export default new SupAttendanceApi();