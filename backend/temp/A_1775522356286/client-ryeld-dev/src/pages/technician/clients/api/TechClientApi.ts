import axios from "../../../../api/axios";
import { Client } from "../data/interface/clientinterfaces";
/* import { mockClients } from "../data/GETClients"; */

const BASE_URL = "/technician/client";
type UUID = String;

class TechClientApi {
  async getClients(id_employee: UUID): Promise<Client[]> {
    const response = await axios.post(BASE_URL + "/allmyclients", id_employee, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
    /* return mockClients; // Simulación local */
  }
}

export default new TechClientApi();