import axios from "axios";
import {
  Notification,
  MaintenanceStats,
  TechStatusWork,
} from "./SupDashboardInterfaces";
import { CalendarActivity } from "../../activities/api/SupActivityInterfaces";

const BASE_URL = "http://localhost:8080/api/supervisor/dash";

class SupDashboardApi {
  async getNotifications(): Promise<Notification[]> {
    const response = await axios.get(`${BASE_URL}/notifications`, {
      withCredentials: true,
    });
    /* console.log(response.data) */
    return response.data;
  }

  async getMaintenanceStats(): Promise<MaintenanceStats> {
    const response = await axios.get(`${BASE_URL}/maintenancestats`, {
      withCredentials: true,
    });
    return response.data;
  }

  async getTechnicianData(): Promise<TechStatusWork[]> {
    const response = await axios.get(`${BASE_URL}/techstats`, {
      withCredentials: true,
    });
    return response.data;
  }

  async getCalendarActivities(): Promise<CalendarActivity[]> {
    const response = await axios.get(`http://localhost:8080/api/supervisor/activity/calendar`, {
      withCredentials: true,
    });
    /* console.log(response.data); */
    return response.data;
  }
}

export default new SupDashboardApi();
