import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Area, CreateAreaRequest, UpdateAreaRequest, AreaTableRow } from '../types/areaTypes';
import { Role, CreateRoleRequest, UpdateRoleRequest, RoleTableRow } from '../types/roleTypes';
import {
  BackendEmployeeResponse,
  BackendUserResponse,
  EmployeeWithUser,
  DetailedEmployeeTableRow,
} from '../types/employeeTypes';
import { areasServices } from '../api/services/areasServices';
import { rolesServices } from '../api/services/rolesServices';
import { employeesManagementServices } from '../api/services/employeesManagementServices';
import { usersServices } from '../api/services/usersServices';

// ========================
// Context type definitions
// ========================

interface StaffContextType {
  // --- Areas ---
  areas: Area[];
  areasTableData: AreaTableRow[];
  areasLoading: boolean;
  areasError: string | null;
  createArea: (data: CreateAreaRequest) => Promise<boolean>;
  updateArea: (id: string, data: UpdateAreaRequest) => Promise<boolean>;
  deleteArea: (id: string) => Promise<boolean>;
  getAreaById: (id: string) => Area | undefined;
  refetchAreas: () => Promise<void>;

  // --- Roles ---
  roles: Role[];
  rolesTableData: RoleTableRow[];
  rolesLoading: boolean;
  rolesError: string | null;
  createRole: (data: CreateRoleRequest) => Promise<boolean>;
  updateRole: (id: string, data: UpdateRoleRequest) => Promise<boolean>;
  deleteRole: (id: string) => Promise<boolean>;
  getRoleById: (id: string) => Role | undefined;
  fetchRolesByArea: (areaId: string) => Promise<void>;
  refetchRoles: () => Promise<void>;

  // --- Employees + Users (merged) ---
  employees: EmployeeWithUser[];
  employeesTableData: DetailedEmployeeTableRow[];
  employeesLoading: boolean;
  employeesError: string | null;
  refetchEmployees: () => Promise<void>;

  // --- Raw data for components that need it ---
  rawEmployees: BackendEmployeeResponse[];
  rawUsers: BackendUserResponse[];

  // --- Global loading ---
  initialLoading: boolean;
}

const StaffContext = createContext<StaffContextType | null>(null);

export const useStaffContext = () => {
  const ctx = useContext(StaffContext);
  if (!ctx) throw new Error('useStaffContext must be used within StaffProvider');
  return ctx;
};

// ========================
// Provider
// ========================

export const StaffProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- State ---
  const [areas, setAreas] = useState<Area[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [rawEmployees, setRawEmployees] = useState<BackendEmployeeResponse[]>([]);
  const [rawUsers, setRawUsers] = useState<BackendUserResponse[]>([]);

  const [areasLoading, setAreasLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [areasError, setAreasError] = useState<string | null>(null);
  const [rolesError, setRolesError] = useState<string | null>(null);
  const [employeesError, setEmployeesError] = useState<string | null>(null);

  // Guard against StrictMode double-fetch
  const fetchedRef = useRef(false);

  // ========================
  // Merge employees + users
  // ========================

  const mergeEmployeesWithUsers = (
    emps: BackendEmployeeResponse[],
    users: BackendUserResponse[]
  ): EmployeeWithUser[] => {
    return emps.map(emp => {
      const user = users.find(u => u.employeeId === emp.id);
      return {
        ...emp,
        hasUser: !!user,
        userId: user?.id,
        userCode: user?.code,
        userStatus: user?.status,
        userRoleName: user?.roleName,
        userRoleId: user?.roleId,
      };
    });
  };

  const transformToTableData = (emps: EmployeeWithUser[]): DetailedEmployeeTableRow[] => {
    return emps.map(emp => ({
      id: emp.id,
      fullName: emp.fullName,
      dni: emp.dni,
      personalEmail: emp.personalEmail,
      workEmail: emp.workEmail,
      phone: emp.phone,
      hireDate: emp.hireDate,
      status: emp.status === 'ACTIVE',
      areaName: emp.areaName,
      roleName: emp.role,
      hasUser: emp.hasUser,
      userId: emp.userId,
      userCode: emp.userCode,
      userStatus: emp.userStatus === 'ACTIVE',
    }));
  };

  // ========================
  // Fetch functions
  // ========================

  const fetchAreas = useCallback(async () => {
    setAreasLoading(true);
    setAreasError(null);
    try {
      const data = await areasServices.getAreas();
      setAreas(data);
    } catch {
      setAreasError('Error al cargar las áreas');
    } finally {
      setAreasLoading(false);
    }
  }, []);

  const fetchRoles = useCallback(async () => {
    setRolesLoading(true);
    setRolesError(null);
    try {
      const data = await rolesServices.getRoles();
      setRoles(data);
    } catch {
      setRolesError('Error al cargar los roles');
    } finally {
      setRolesLoading(false);
    }
  }, []);

  const fetchRolesByArea = useCallback(async (areaId: string) => {
    setRolesLoading(true);
    setRolesError(null);
    try {
      const data = await rolesServices.getRolesByArea(areaId);
      setRoles(data);
    } catch {
      setRolesError('Error al cargar los roles del área');
    } finally {
      setRolesLoading(false);
    }
  }, []);

  const fetchEmployeesAndUsers = useCallback(async () => {
    setEmployeesLoading(true);
    setEmployeesError(null);
    try {
      const [emps, users] = await Promise.all([
        employeesManagementServices.getAllEmployees(),
        usersServices.getAllUsers(),
      ]);
      setRawEmployees(emps);
      setRawUsers(users);
    } catch {
      setEmployeesError('Error al cargar empleados');
    } finally {
      setEmployeesLoading(false);
    }
  }, []);

  // ========================
  // Initial load — ONE parallel batch for everything
  // ========================

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const loadAll = async () => {
      setInitialLoading(true);
      try {
        const [areasData, rolesData, empsData, usersData] = await Promise.all([
          areasServices.getAreas(),
          rolesServices.getRoles(),
          employeesManagementServices.getAllEmployees(),
          usersServices.getAllUsers(),
        ]);
        setAreas(areasData);
        setRoles(rolesData);
        setRawEmployees(empsData);
        setRawUsers(usersData);
      } catch (err) {
        console.error('Error loading staff data:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadAll();
  }, []);

  // ========================
  // CRUD operations (update local state optimistically)
  // ========================

  // --- Areas CRUD ---
  const createArea = useCallback(async (data: CreateAreaRequest): Promise<boolean> => {
    try {
      const newArea = await areasServices.createArea(data);
      setAreas(prev => [...prev, newArea]);
      return true;
    } catch {
      setAreasError('Error al crear el área');
      return false;
    }
  }, []);

  const updateArea = useCallback(async (id: string, data: UpdateAreaRequest): Promise<boolean> => {
    try {
      const updated = await areasServices.updateArea(id, data);
      setAreas(prev => prev.map(a => (a.id === id ? updated : a)));
      return true;
    } catch {
      setAreasError('Error al actualizar el área');
      return false;
    }
  }, []);

  const deleteArea = useCallback(async (id: string): Promise<boolean> => {
    try {
      await areasServices.deleteArea(id);
      setAreas(prev => prev.filter(a => a.id !== id));
      return true;
    } catch {
      setAreasError('Error al eliminar el área');
      return false;
    }
  }, []);

  const getAreaById = useCallback((id: string) => areas.find(a => a.id === id), [areas]);

  // --- Roles CRUD ---
  const createRole = useCallback(async (data: CreateRoleRequest): Promise<boolean> => {
    try {
      const newRole = await rolesServices.createRole(data);
      setRoles(prev => [...prev, newRole]);
      return true;
    } catch {
      setRolesError('Error al crear el rol');
      return false;
    }
  }, []);

  const updateRole = useCallback(async (id: string, data: UpdateRoleRequest): Promise<boolean> => {
    try {
      const updated = await rolesServices.updateRole(id, data);
      setRoles(prev => prev.map(r => (r.id === id ? updated : r)));
      return true;
    } catch {
      setRolesError('Error al actualizar el rol');
      return false;
    }
  }, []);

  const deleteRole = useCallback(async (id: string): Promise<boolean> => {
    try {
      await rolesServices.deleteRole(id);
      setRoles(prev => prev.filter(r => r.id !== id));
      return true;
    } catch {
      setRolesError('Error al eliminar el rol');
      return false;
    }
  }, []);

  const getRoleById = useCallback((id: string) => roles.find(r => r.id === id), [roles]);

  // ========================
  // Derived data
  // ========================

  const employees = mergeEmployeesWithUsers(rawEmployees, rawUsers);
  const employeesTableData = transformToTableData(employees);

  const areasTableData: AreaTableRow[] = areas.map(a => ({
    id: a.id,
    name: a.name,
    description: a.description || '',
    active: a.active,
  }));

  const rolesTableData: RoleTableRow[] = roles.map(r => ({
    id: r.id,
    name: r.name,
    areaId: r.areaId,
    areaName: r.areaName || 'Área no encontrada',
  }));

  // ========================
  // Context value
  // ========================

  const value: StaffContextType = {
    areas,
    areasTableData,
    areasLoading,
    areasError,
    createArea,
    updateArea,
    deleteArea,
    getAreaById,
    refetchAreas: fetchAreas,

    roles,
    rolesTableData,
    rolesLoading,
    rolesError,
    createRole,
    updateRole,
    deleteRole,
    getRoleById,
    fetchRolesByArea,
    refetchRoles: fetchRoles,

    employees,
    employeesTableData,
    employeesLoading,
    employeesError,
    refetchEmployees: fetchEmployeesAndUsers,

    rawEmployees,
    rawUsers,

    initialLoading,
  };

  return <StaffContext.Provider value={value}>{children}</StaffContext.Provider>;
};
