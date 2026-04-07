import { useState, useEffect } from 'react';
import { Role, RoleTableRow, CreateRoleRequest, UpdateRoleRequest } from '../types/roleTypes';
import { rolesServices } from '../api/services/rolesServices';

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener rol por ID
  const getRoleById = (roleId: string): Role | undefined => {
    return roles.find(role => role.id === roleId);
  };

  // Transformar datos para la tabla incluyendo nombre del área
  const transformToTableData = (roles: Role[]): RoleTableRow[] => {
    return roles.map(role => ({
      id: role.id,
      name: role.name,
      areaId: role.areaId,
      areaName: role.areaName || 'Área no encontrada',
    }));
  };

  // Obtener todos los roles
  const fetchRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await rolesServices.getRoles();
      setRoles(data);
    } catch (err) {
      setError('Error al cargar los roles');
      console.error('Error fetching roles:', err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener roles por área
  const fetchRolesByArea = async (areaId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await rolesServices.getRolesByArea(areaId);
      setRoles(data);
    } catch (err) {
      setError('Error al cargar los roles del área');
      console.error('Error fetching roles by area:', err);
    } finally {
      setLoading(false);
    }
  };

  // Crear rol
  const createRole = async (roleData: CreateRoleRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const newRole = await rolesServices.createRole(roleData);
      setRoles(prev => [...prev, newRole]);
      return true;
    } catch (err) {
      setError('Error al crear el rol');
      console.error('Error creating role:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar rol
  const updateRole = async (roleId: string, roleData: UpdateRoleRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedRole = await rolesServices.updateRole(roleId, roleData);
      setRoles(prev => prev.map(role => 
        role.id === roleId ? updatedRole : role
      ));
      return true;
    } catch (err) {
      setError('Error al actualizar el rol');
      console.error('Error updating role:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar rol
  const deleteRole = async (roleId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await rolesServices.deleteRole(roleId);
      setRoles(prev => prev.filter(role => role.id !== roleId));
      return true;
    } catch (err) {
      setError('Error al eliminar el rol');
      console.error('Error deleting role:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return {
    roles,
    loading,
    error,
    tableData: transformToTableData(roles),
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    fetchRolesByArea,
    refetch: fetchRoles
  };
};
