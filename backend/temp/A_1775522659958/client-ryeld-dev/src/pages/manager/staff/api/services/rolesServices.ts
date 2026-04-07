import axios from '../../../../../api/axios';
import { ROLES, ROLES_BY_AREA, ROLE_BY_ID } from '../endpoints/employees';
import { Role, CreateRoleRequest, UpdateRoleRequest } from '../../types/roleTypes';

export const rolesServices = {
  // Obtener todos los roles
  getRoles: async (): Promise<Role[]> => {
    const response = await axios.get(ROLES);
    return response.data;
  },

  // Obtener roles por área
  getRolesByArea: async (areaId: string): Promise<Role[]> => {
    const endpoint = ROLES_BY_AREA.replace('{areaId}', areaId);
    const response = await axios.get(endpoint);
    return response.data;
  },

  // Crear nuevo rol
  createRole: async (roleData: CreateRoleRequest): Promise<Role> => {
    const response = await axios.post(ROLES, roleData);
    return response.data;
  },

  // Actualizar rol
  updateRole: async (roleId: string, roleData: UpdateRoleRequest): Promise<Role> => {
    const endpoint = ROLE_BY_ID.replace('{roleId}', roleId);
    const response = await axios.put(endpoint, roleData);
    return response.data;
  },

  // Eliminar rol
  deleteRole: async (roleId: string): Promise<void> => {
    const endpoint = ROLE_BY_ID.replace('{roleId}', roleId);
    await axios.delete(endpoint);
  }
};
