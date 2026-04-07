import axios from "axios";
import {
  InventoryItem,
  ToolRequestGET,
  ToolRequestPOST,
  ToolRequestPUT,
} from "../api/SupInventoryInterfaces";

type UUID = string;
const BASE_URL = "http://localhost:8080/api/supervisor/inventory";

class SupInventoryApi {
  // GET /inventory-items
  async getInventoryItems(): Promise<InventoryItem[]> {
    const response = await axios.get(`${BASE_URL}/items`);
    return response.data;
  }

  // GET /tool-requests
  async getAllRequests(): Promise<ToolRequestGET[]> {
    const response = await axios.get(`${BASE_URL}/allrequest`);
    return response.data;
  }

  // POST /tool-requests
  async createToolRequest(toolRequest: ToolRequestPOST): Promise<string> {
    const response = await axios.post(`${BASE_URL}/request`, toolRequest);
    return response.data; // El backend devuelve un string de confirmación
  }

  // PUT /tool-requests/{id}
  async updateToolRequest(toolRequest: ToolRequestPUT): Promise<ToolRequestPUT> {
    const response = await axios.put(`${BASE_URL}/request`, toolRequest);
    return response.data;
  }

  // DELETE /tool-requests/{id}
  async deleteRequest(idToolRequest: UUID): Promise<string> {
    console.log(idToolRequest)
    const response = await axios.delete(`${BASE_URL}/request/${idToolRequest}`);
    return response.data;
  }
}

export default new SupInventoryApi();