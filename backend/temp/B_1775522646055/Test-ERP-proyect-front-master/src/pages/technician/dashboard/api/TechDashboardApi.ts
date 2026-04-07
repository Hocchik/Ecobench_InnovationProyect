import { changeStatusActivity, DashboardActivity } from '../data/interfaces/dashboardinterfaces';
/* import { mockDashboardActivities } from '../data/GETDashboardActivities'; */
import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/technician/dashboard";
type UUID = string;

class TechDashboardApi {
  async getTodayActivities(id_employee: UUID): Promise<DashboardActivity[]> {
    /* console.log(id_employee) */
    const response = await axios.post(BASE_URL + "/todayactivities", id_employee, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
    /* console.log(mockDashboardActivities)
    return mockDashboardActivities; */
  }

  async getCurrentActivity(id_employee: UUID): Promise<DashboardActivity | null> {
    const response = await axios.post(BASE_URL + "/currentactivity", id_employee, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
    /* const inProgress = mockDashboardActivities.find(act => act.status === "En curso");
    return inProgress || null; */
  }

  async changeStatusActivity(id_activity: UUID, newStatus: DashboardActivity['status']): Promise<DashboardActivity | null>{
        const payload: changeStatusActivity = {
          id_activity,
          status: newStatus 
        };

        try {
          const response = await axios.put(`${BASE_URL}/changestatus`, payload);
          console.log(`✅ Actividad ${id_activity} actualizada a estado: ${newStatus}`);
          return response.data;
        } catch (error: any) {
          console.error(`❌ Error al actualizar actividad ${id_activity}:`, error.response?.data || error.message);
          throw error;
        }
      }

}

export default new TechDashboardApi();