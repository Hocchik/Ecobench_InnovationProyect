import axios from "axios";
import { /* Clients, */ ElevatorsType, MaintenanceType, Supervisors, Techs } from "./interfaces/DataInterfaces";
/* import { testTechnicians, testSupervisors, testMaintenanceTypes, testElevatorTypes, testClients } from "./data/GETData"; // Importa los datos de prueba
 */
const BASE_URL = "http://localhost:8080/api/data";

class DataApi {
    
    async getTechs(): Promise<Techs[]> {
        const response = await axios.get(`${BASE_URL}/technicians`);
        return response.data;
        /* return testTechnicians;  */// Retorna los datos de prueba
    }

    async getSupervisors(): Promise<Supervisors[]> {
        const response = await axios.get(`${BASE_URL}/supervisors`);
        return response.data;
        /* return testSupervisors; */ // Retorna los datos de prueba
    }

    async getMaintenanceTypes(): Promise<MaintenanceType[]> {
        const response = await axios.get(`${BASE_URL}/maintenancetypes`);
        return response.data;
        /* return testMaintenanceTypes; */ // Retorna tipos de mantenimiento de prueba
    }

    async getElevatorTypes(): Promise<ElevatorsType[]> {
        const response = await axios.get(`${BASE_URL}/elevatortypes`);
        return response.data;
        /* return testElevatorTypes; */
    }

    async getElevators(): Promise<ElevatorsType[]> {
        const response = await axios.get(`${BASE_URL}/elevators`);
        return response.data;
    }

    

    /* async getClients(): Promise<Clients[]> {
        const response = await axios.get(`${BASE_URL}/clients`);
        return response.data;
        return testClients; // Retorna un array de prueba
    } */

}

export default new DataApi();

