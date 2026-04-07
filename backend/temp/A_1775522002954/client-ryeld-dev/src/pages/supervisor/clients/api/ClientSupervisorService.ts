/* import axios from "axios";
import { Client, ClientBasicDTO, ClientElevatorsDTO, Elevator } from "../data/clientsType";

const BASE_URL = "http://localhost:8080/api/supervisor";

class ClientSupervisorService {
    

    async getClientsData(): Promise<any[]> {
        const response = await axios.get(BASE_URL+"/clients/data");
        return response.data;
    }

    async getClients(): Promise<ClientBasicDTO[]> {
        const response = await axios.get(`${BASE_URL}/clients`, { withCredentials: true });
        return response.data;
    }

    async getClientElevators(clientId: string): Promise<ClientElevatorsDTO> {
        const response = await axios.get(`${BASE_URL}/elevators/${clientId}`, { withCredentials: true });
        return response.data;
    }

    async createElevator(clientId: string, elevatordata: Elevator): Promise<Elevator> {
        const response = await axios.post(`${BASE_URL}/clients/${clientId}/elevators`, elevatordata, { withCredentials: true });
        return response.data;
    }

    async updateElevator(elevatorId: number, elevatordata: Elevator): Promise<Elevator> { 
        const response = await axios.put(`${BASE_URL}/elevators/${elevatorId}`, elevatordata, { withCredentials: true }); 
        
        return response.data; 
    }

}

export default new ClientSupervisorService(); */