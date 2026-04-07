import { ClientsResponse, ClientDetail } from '../types/clientTypes';
import { MOCK_CLIENTS, MOCK_CLIENT_DETAIL } from '../data/mockClients';

export const MANAGER_CLIENTS_ENDPOINTS = {
  GET_CLIENTS: '/manager/clients',
  GET_CLIENT_DETAIL: (clientId: string) => `/manager/clients/${clientId}`
};

export const managerClientsService = {
  // Obtener todos los clientes
  getClients: async (): Promise<ClientsResponse> => {
    // const response = await axios.get(MANAGER_CLIENTS_ENDPOINTS.GET_CLIENTS);
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_CLIENTS);
      }, 500);
    });
  },

  // Obtener detalle de un cliente específico
  getClientDetail: async (clientId: string): Promise<ClientDetail> => {
    // const response = await axios.get(MANAGER_CLIENTS_ENDPOINTS.GET_CLIENT_DETAIL(clientId));
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        // En un caso real, buscaríamos el cliente por ID, pero para el mock devolvemos uno genérico
        // o podríamos tener un array de detalles si fuera necesario.
        const detail = { ...MOCK_CLIENT_DETAIL, id: clientId };
        resolve(detail);
      }, 500);
    });
  }
};
