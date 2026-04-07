import axios from "../../../../api/axios";

const BASE_URL = "/maintenances";

class MaintenanceSupervisorService {

    async getMaintenancePreventives(): Promise<any[]> {
        const response = await axios.get(BASE_URL+"/preventives");
        return response.data;
    }

    async getMaintenanceCorrectives(): Promise<any[]> {
        const response = await axios.get(BASE_URL+"/correctives");
        return response.data;
    }
    
    async createMaintenancePreventive(maintenancePreventive: any): Promise<any> {
        const response = await axios.post(BASE_URL+"/preventive", maintenancePreventive);
        return response.data;
    }

    async createMaintenanceCorrective(maintenanceCorrective: any): Promise<any> {
        const response = await axios.post(BASE_URL+"/corrective", maintenanceCorrective);
        return response.data;
    }

    async updateMaintenancePreventive(maintenancePreventive: any): Promise<any> {
        const response = await axios.put(BASE_URL+"/preventive", maintenancePreventive);
        return response.data;
    }

    async updateMaintenanceCorrective(maintenanceCorrective: any): Promise<any> {
        const response = await axios.put(BASE_URL+"/corrective", maintenanceCorrective);
        return response.data;
    }

    async deleteMaintenancePreventive(maintenancePreventiveId: number): Promise<any> {
        const response = await axios.delete(BASE_URL+"/preventive/"+maintenancePreventiveId);
        return response.data;
    }

    async deleteMaintenanceCorrective(maintenanceCorrectiveId: number): Promise<any> {
        const response = await axios.delete(BASE_URL+"/corrective/"+maintenanceCorrectiveId);
        return response.data;
    }

    async getBuildings(): Promise<any[]> {
        const response = await axios.get(BASE_URL+"/buildings");
        return response.data;
    }

}

export default new MaintenanceSupervisorService();