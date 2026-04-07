// import axios from "axios";
import { /* Clients, */ ElevatorsType, MaintenanceType, Supervisors, Techs } from "./interfaces/DataInterfaces";
import { testTechnicians, testSupervisors, testMaintenanceTypes, testElevatorTypes, testElevators, /* testClients */ } from "./data/GETData"; // Importa los datos de prueba

// const BASE_URL = "http://localhost:8080/api/data";

class DataApi {
    
    async getTechs(): Promise<Techs[]> {
        // MODO SIN BACKEND: Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 300));
        return testTechnicians;
        
        // MODO CON BACKEND: Descomentar este código
        /*
        const response = await axios.get(`${BASE_URL}/technicians`);
        return response.data;
        */
    }

    async getSupervisors(): Promise<Supervisors[]> {
        // MODO SIN BACKEND: Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 300));
        return testSupervisors;
        
        // MODO CON BACKEND: Descomentar este código
        /*
        const response = await axios.get(`${BASE_URL}/supervisors`);
        return response.data;
        */
    }

    async getMaintenanceTypes(): Promise<MaintenanceType[]> {
        // MODO SIN BACKEND: Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 300));
        return testMaintenanceTypes;
        
        // MODO CON BACKEND: Descomentar este código
        /*
        const response = await axios.get(`${BASE_URL}/maintenancetypes`);
        return response.data;
        */
    }

    async getElevatorTypes(): Promise<ElevatorsType[]> {
        // MODO SIN BACKEND: Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 300));
        return testElevatorTypes;
        
        // MODO CON BACKEND: Descomentar este código
        /*
        const response = await axios.get(`${BASE_URL}/elevatortypes`);
        return response.data;
        */
    }

    async getElevators(): Promise<ElevatorsType[]> {
        // MODO SIN BACKEND: Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 300));
        return testElevators;
        
        // MODO CON BACKEND: Descomentar este código
        /*
        const response = await axios.get(`${BASE_URL}/elevators`);
        return response.data;
        */
    }

    

    /* async getClients(): Promise<Clients[]> {
        const response = await axios.get(`${BASE_URL}/clients`);
        return response.data;
        return testClients; // Retorna un array de prueba
    } */

}

export default new DataApi();

