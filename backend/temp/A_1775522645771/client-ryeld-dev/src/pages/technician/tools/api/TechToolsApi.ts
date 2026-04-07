import { ToolPosesion, ToolRequestGET, ToolRequestItemPOST, ToolRequestPOST } from '../data/interface/toolinterfaces';
/* import { mockTools, mockCharges } from '../data/GETTools'; */
import axios from '../../../../api/axios';

const BASE_URL = "/technician/tool";
type UUID = String;

class TechToolsApi {

  async getItems(): Promise<ToolRequestItemPOST[]> {
    const response = await axios.get(BASE_URL + "/items", {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  }

  async getTools(id_employee: UUID): Promise<ToolPosesion[]> {
    const response = await axios.post(BASE_URL + "/gettools", id_employee, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
    /* return mockTools; */
  }

  async getCharges(id_employee: UUID): Promise<ToolRequestGET[]> {
    const response = await axios.post(BASE_URL + "/getcharges", id_employee, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  }

  async sendToolRequest (request: ToolRequestPOST): Promise<{ success: boolean }>{
    console.log('🧰 Enviando solicitud de herramientas:');
    console.table(request);
    console.log(request);

    try {
      const response = await axios.post(
        `${BASE_URL}/sendtoolrequest`,
        request,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      alert(response.data); // Muestra el mensaje del backend

      return { success: true };
    } catch (error) {
      console.error('❌ Error al enviar la solicitud:', error);
      alert('Error al enviar la solicitud de herramientas');
      return { success: false };
    }

  }
}

export default new TechToolsApi();