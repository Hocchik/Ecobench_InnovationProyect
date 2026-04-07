import axios from "axios";
import { Attendance, DayAttendanceDTO, HistoryAttendaceTechDTO, Technician } from "../../../../api/types";

const BASE_URL = "http://localhost:8080/api/supervisor/attendance";

class AttendaceSupervisorService {
    
    async getAttendanceByDate(date: string): Promise<DayAttendanceDTO[]> {
        const response = await axios.get(`${BASE_URL}/date/${date}`, { withCredentials: true });
        return response.data;
    }

    async getAttendanceHistory(techId: number, month: number, year: number): Promise<HistoryAttendaceTechDTO[]> {
        try {
            const response = await axios.get(`${BASE_URL}/history`, {
                params: {
                    tech_id: techId,
                    month: month,
                    year: year
                },
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener el historial de asistencia:", error);
            return [];
        }
    }

    //Método para marcar una asistencia individual
    async markAttendance(attendances: Attendance[]): Promise<Attendance[]> {
        try {
            const response = await axios.post(`${BASE_URL}/mark`, attendances, { withCredentials: true })
            return response.data;
        } catch (error) {
            console.error("Error marcando asistencia:", error);
            throw error;
        }
    }

    async getTechnicians(): Promise<Technician[]> {
        const response = await axios.get(`${BASE_URL}/techs`,{ withCredentials: true });
        return response.data;
    }

    async getTechnicianswithoutSupervisor(): Promise<Technician[]> {
        const response = await axios.get(`${BASE_URL}/techs/without-supervisor`,{ withCredentials: true });
        return response.data;
    }

    async getSupervisors(): Promise<Technician[]> {
        const response = await axios.get(`${BASE_URL}/techs/supervisor`,{ withCredentials: true });
        return response.data;
    }

}
export default new AttendaceSupervisorService();