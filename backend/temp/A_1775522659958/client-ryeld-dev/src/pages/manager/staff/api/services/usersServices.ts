import axios from '../../../../../api/axios';
import { 
  USERS,
  USERS_AUTO,
  USER_DEACTIVATE, 
  USER_ACTIVATE,
  USER_CHANGE_ROLE 
} from '../endpoints/employees';
import { 
  CreateUserRequest, 
  UserResponse, 
  ChangeRoleRequest 
} from '../../types/employeeTypes';

export const usersServices = {
  // Obtener todos los usuarios
  getAllUsers: async () => {
    const response = await axios.get(USERS);
    return response.data;
  },

  // Crear usuario con credenciales auto-generadas
  createUser: async (userData: CreateUserRequest): Promise<UserResponse> => {
    const response = await axios.post(USERS_AUTO, userData);
    // Map backend UserCreatedResponse to frontend UserResponse
    const data = response.data;
    return {
      userId: data.id,
      employeeId: data.employeeId,
      roleId: data.roleId,
      code: data.code,
      status: data.status === 'ACTIVE',
      plainPassword: data.plainPassword,
      createdAt: data.createdAt,
    };
  },

  // Desactivar acceso de usuario
  deactivateUser: async (userId: string): Promise<void> => {
    const endpoint = USER_DEACTIVATE.replace('{userId}', userId);
    await axios.post(endpoint);
  },

  // Activar acceso de usuario
  activateUser: async (userId: string): Promise<void> => {
    const endpoint = USER_ACTIVATE.replace('{userId}', userId);
    await axios.post(endpoint);
  },

  // Cambiar rol de usuario
  changeUserRole: async (userId: string, roleData: ChangeRoleRequest): Promise<any> => {
    const endpoint = USER_CHANGE_ROLE.replace('{userId}', userId);
    // Backend expects roleId as query param: PUT /users/{id}/role?roleId=UUID
    const response = await axios.put(endpoint, null, {
      params: { roleId: roleData.roleId }
    });
    return response.data;
  }
};
