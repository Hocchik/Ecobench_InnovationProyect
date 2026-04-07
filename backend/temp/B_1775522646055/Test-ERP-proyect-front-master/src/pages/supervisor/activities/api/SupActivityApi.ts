import axios from "axios";
import { CalendarActivity, UpdateActivity } from "./SupActivityInterfaces";

export type UUID = string;
const BASE_URL = "http://localhost:8080/api/supervisor/activity";

class SupActivityApi {
  // Obtener actividades del calendario
  async getCalendarActivities(): Promise<CalendarActivity[]> {
    const response = await axios.get(`${BASE_URL}/calendar`);
    console.log(response.data);
    return response.data;
  }

  // Actualizar actividad
  async updateActivity(activity: UpdateActivity): Promise<string> {
    const response = await axios.put(`${BASE_URL}/update`, activity);
    return response.data;
    }


  // Registrar imagen de actividad
  async registerActivityImage(id_activity: UUID, file: File): Promise<string> {
    const formData = new FormData();
    formData.append("id_activity", id_activity);
    formData.append("file", file);

    const response = await axios.put(`${BASE_URL}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
}

export default new SupActivityApi();