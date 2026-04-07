import axios from "axios";
import { Notification, CompletedActivity } from "../data/dashboardType";

const BASE_URL = "http://localhost:8080/api/supervisor/dashboard";

class DashboardSupervisorService {

    async getNotifications(): Promise<Notification[]> {
        const response = await axios.get(`${BASE_URL}/notifications`, { withCredentials: true });
        return response.data;
    }

    async getTodayCompletedActivities(): Promise<any[]> {
        const response = await axios.get(`${BASE_URL}/today-activities`, { withCredentials: true });
        return response.data;
    }

    async getMaintenanceStats(): Promise<any> {
        const response = await axios.get(`${BASE_URL}/maintenance-stats`, { withCredentials: true });
        return response.data;
    }

    async getTechnicianData(): Promise<any> {
        const response = await axios.get(`${BASE_URL}/technicians`, { withCredentials: true });
        return response.data;
    }
}
export default new DashboardSupervisorService();



