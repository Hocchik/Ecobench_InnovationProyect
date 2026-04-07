import axios from "axios";
import {
  ClientTable,
  ClientElevators,
  ClientMaintenanceHistory,
  ElevatorTechHistory,
  /* ElevatorsData, */
  EmergencyHistory,
  SparePartHistory,
  ElevatorPartLocation,
  CreateElevator,
  UpdateElevator,
  /* PreventiveMaintenanceHistory, */
} from "./SupClientInterfaces";

type UUID = string;

const BASE_URL = "http://localhost:8080/api/supervisor/client";
const BASE_URL2 = "http://localhost:8080/api/supervisor/elevator-history";

class SupClientApi {
  // --- Clientes ---
  async getClients(): Promise<ClientTable[]> {
    const response = await axios.get(`${BASE_URL}`, { withCredentials: true });
    return response.data;
  }

  async getClientElevators(clientId: UUID): Promise<ClientElevators> {
    const response = await axios.post(`${BASE_URL}/elevators`, clientId, {
      headers: { "Content-Type": "application/json" },
    });

    const data = response.data;

    if (!Array.isArray(data)) {
      throw new Error("Formato inesperado en la respuesta de elevadores");
    }

    const clientData = data.find((entry: ClientElevators) => entry.id_client === clientId);

    return clientData ?? { id_client: clientId, elevators: [] };
  }

  async getClientMainHistory(elevatorId: UUID): Promise<ClientMaintenanceHistory[]> {
    const response = await axios.post(`${BASE_URL}/elevatorhistory`, elevatorId, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }

  async getElevatorTechHistory(elevatorId: UUID): Promise<ElevatorTechHistory> {
    const response = await axios.post(`${BASE_URL}/elevatortechhistory`, elevatorId, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data[0]; // El backend devuelve un array con un solo objeto
  }

  async createElevator(elevator: CreateElevator): Promise<string> {
    const response = await axios.post(`${BASE_URL}/elevator`, elevator, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }

  async updateElevator(elevator: UpdateElevator): Promise<string> {
    const response = await axios.put(`${BASE_URL}/elevator`, elevator, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }

  async deleteElevator(id: string): Promise<string> {
    const response = await axios.delete(`${BASE_URL}/elevator/${id}`);
    return response.data;
  }




  // --- Emergencias ---
  async createEmergencyEvent(elevatorId: UUID, emergency: Omit<EmergencyHistory, "id" | "elevatorId">) {
    console.log(emergency)
    const response = await axios.post(`${BASE_URL2}/${elevatorId}/emergency`, emergency);
    return response.data as EmergencyHistory;
  }

  async updateEmergencyEvent(emergencyId: UUID, emergency: EmergencyHistory) {
    const response = await axios.put(`${BASE_URL2}/emergency/${emergencyId}`, emergency);
    return response.data as EmergencyHistory;
  }

  async deleteEmergencyEvent(emergencyId: UUID) {
    const response = await axios.delete(`${BASE_URL2}/emergency/${emergencyId}`);
    return response.status === 200;
  }

  // --- Repuestos ---
  async createSparePartChange(elevatorId: UUID, spare: Omit<SparePartHistory, "id" | "elevatorId">) {
    const response = await axios.post(`${BASE_URL2}/${elevatorId}/spare-part`, spare);
    return response.data as SparePartHistory;
  }

  async updateSparePartChange(spareId: UUID, spare: SparePartHistory) {
    const response = await axios.put(`${BASE_URL2}/spare-part/${spareId}`, spare);
    return response.data as SparePartHistory;
  }

  async deleteSparePartChange(spareId: UUID) {
    const response = await axios.delete(`${BASE_URL2}/spare-part/${spareId}`);
    return response.status === 200;
  }

  // --- Partes por Ubicación ---
  async createPartLocation(elevatorId: UUID, part: Omit<ElevatorPartLocation, "id" | "elevatorId">) {
    const response = await axios.post(`${BASE_URL2}/${elevatorId}/part-location`, part);
    return response.data as ElevatorPartLocation;
  }

  async updatePartLocation(partId: UUID, part: ElevatorPartLocation) {
    const response = await axios.put(`${BASE_URL2}/part-location/${partId}`, part);
    return response.data as ElevatorPartLocation;
  }

  async deletePartLocation(partId: UUID) {
    const response = await axios.delete(`${BASE_URL2}/part-location/${partId}`);
    return response.status === 200;
  }

}

export default new SupClientApi();