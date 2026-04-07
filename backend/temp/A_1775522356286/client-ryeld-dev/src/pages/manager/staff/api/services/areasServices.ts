import axios from '../../../../../api/axios';
import { AREAS, AREA_BY_ID } from '../endpoints/employees';
import { Area, CreateAreaRequest, UpdateAreaRequest } from '../../types/areaTypes';

export const areasServices = {
  // Obtener todas las áreas
  getAreas: async (): Promise<Area[]> => {
    const response = await axios.get(AREAS);
    return response.data;
  },

  // Crear nueva área
  createArea: async (areaData: CreateAreaRequest): Promise<Area> => {
    const response = await axios.post(AREAS, areaData);
    return response.data;
  },

  // Actualizar área
  updateArea: async (areaId: string, areaData: UpdateAreaRequest): Promise<Area> => {
    const endpoint = AREA_BY_ID.replace('{areaId}', areaId);
    const response = await axios.put(endpoint, areaData);
    return response.data;
  },

  // Eliminar área (usando deactivate en el backend)
  deleteArea: async (areaId: string): Promise<void> => {
    const endpoint = AREA_BY_ID.replace('{areaId}', areaId);
    await axios.delete(endpoint);
  }
};
