import { useState } from 'react';
import { 
  CreateEmployeeRequest, 
  UpdateEmployeeRequest, 
  EmployeeCreateResponse,
  CreateUserRequest,
  UserResponse,
  ChangeRoleRequest
} from '../types/employeeTypes';
import { employeesManagementServices } from '../api/services/employeesManagementServices';
import { usersServices } from '../api/services/usersServices';

export const useEmployeeManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Crear empleado
  const createEmployee = async (employeeData: CreateEmployeeRequest): Promise<EmployeeCreateResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await employeesManagementServices.createEmployee(employeeData);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al crear el empleado';
      setError(errorMessage);
      console.error('Error creating employee:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar empleado
  const updateEmployee = async (employeeId: string, employeeData: UpdateEmployeeRequest): Promise<EmployeeCreateResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await employeesManagementServices.updateEmployee(employeeId, employeeData);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar el empleado';
      setError(errorMessage);
      console.error('Error updating employee:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Desactivar empleado
  const deactivateEmployee = async (employeeId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await employeesManagementServices.deactivateEmployee(employeeId);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al desactivar el empleado';
      setError(errorMessage);
      console.error('Error deactivating employee:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Activar empleado
  const activateEmployee = async (employeeId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await employeesManagementServices.activateEmployee(employeeId);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al activar el empleado';
      setError(errorMessage);
      console.error('Error activating employee:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Crear usuario y asignar rol
  const createUser = async (userData: CreateUserRequest): Promise<UserResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await usersServices.createUser(userData);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al crear el usuario';
      setError(errorMessage);
      console.error('Error creating user:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Desactivar usuario
  const deactivateUser = async (userId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await usersServices.deactivateUser(userId);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al desactivar el usuario';
      setError(errorMessage);
      console.error('Error deactivating user:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Activar usuario
  const activateUser = async (userId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await usersServices.activateUser(userId);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al activar el usuario';
      setError(errorMessage);
      console.error('Error activating user:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Cambiar rol de usuario
  const changeUserRole = async (userId: string, roleData: ChangeRoleRequest): Promise<UserResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await usersServices.changeUserRole(userId, roleData);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cambiar el rol del usuario';
      setError(errorMessage);
      console.error('Error changing user role:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createEmployee,
    updateEmployee,
    deactivateEmployee,
    activateEmployee,
    createUser,
    deactivateUser,
    activateUser,
    changeUserRole,
    clearError: () => setError(null)
  };
};
