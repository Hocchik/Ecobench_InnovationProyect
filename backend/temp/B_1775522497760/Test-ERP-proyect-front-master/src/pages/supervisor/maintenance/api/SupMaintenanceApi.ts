import axios from "axios";
import {
  CreateMainCorrective,
  CreateMainPreventive,
  MainCorrective,
  MainPreventive,
  UpdateMainCorrective,
  UpdateMainPreventive
} from "../api/SupMaintenanceInterfaces"; // ← Ajustado al nuevo path

export type UUID = string;
const BASE_URL = "http://localhost:8080/api/supervisor/maintenance";

class SupMaintenanceApi {
  // Obtener mantenimientos preventivos
  async getMainPreventives(): Promise<MainPreventive[]> {
    const response = await axios.get(`${BASE_URL}/preventive`);
    return response.data;
  }

  // Obtener mantenimientos correctivos
  async getMainCorrectives(): Promise<MainCorrective[]> {
    const response = await axios.get(`${BASE_URL}/corrective`);
    return response.data;
  }

  // Crear mantenimiento preventivo
  async createMaintenancePreventive(data: CreateMainPreventive): Promise<boolean> {
    console.log(data)
    const response = await axios.post(`${BASE_URL}/preventive`, data);
    return response.status === 200 || response.status === 201;
  }

  // Crear mantenimiento correctivo
  async createMaintenanceCorrective(data: CreateMainCorrective): Promise<boolean> {
    const response = await axios.post(`${BASE_URL}/corrective`, data);
    return response.status === 200 || response.status === 201;
  }

  // Actualizar mantenimiento preventivo
  async updateMaintenancePreventive(data: UpdateMainPreventive): Promise<boolean> {
    /* console.log(data) */
    const response = await axios.put(`${BASE_URL}/preventive`, data);
    return response.status === 200;
  }

  // Actualizar mantenimiento correctivo
  async updateMaintenanceCorrective(data: UpdateMainCorrective): Promise<boolean> {
    const response = await axios.put(`${BASE_URL}/corrective`, data);
    return response.status === 200;
  }

  // Eliminar mantenimiento (preventivo o correctivo)
  async deleteMaintenance(type: "preventive" | "corrective", id: UUID): Promise<boolean> {
    const response = await axios.delete(`${BASE_URL}/${type}/${id}`);
    return response.status === 200;
  }
}

export default new SupMaintenanceApi();