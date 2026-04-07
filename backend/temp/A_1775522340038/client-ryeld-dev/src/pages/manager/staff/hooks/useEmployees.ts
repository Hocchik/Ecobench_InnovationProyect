
import { useState, useEffect, useCallback } from 'react';
import { Employee, StaffTableRow, EmployeeFormData, EmployeeApiResponse } from '../types/employeeTypes';
import { Area } from '../types/areaTypes';
import { Role } from '../types/roleTypes';
import { getEmployees, getAreas, getRolesByArea, updateEmployee, createEmployee } from '../api/services/employeesServices';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para mapear la respuesta de la API a la estructura interna
  const mapApiResponseToEmployee = (apiEmployee: EmployeeApiResponse): Employee => {
    return {
      id: apiEmployee.employeeId,
      name: apiEmployee.name,
      fullName: apiEmployee.fullName,
      lastName: apiEmployee.lastName,
      dni: apiEmployee.dni,
      personalEmail: apiEmployee.personalEmail,
      workEmail: apiEmployee.workEmail,
      phone: apiEmployee.phone,
      address: apiEmployee.address,
      birthDate: apiEmployee.birthDate,
      hireDate: apiEmployee.hireDate,
      areaId: apiEmployee.areaId,
      areaName: apiEmployee.areaName,
      roleName: apiEmployee.role,
    };
  };

  // Transformar empleados de la API al formato de la tabla
  const transformToTableData = (employees: Employee[]): StaffTableRow[] => {
    return employees.map(emp => ({
      id: emp.id,
      firstName: emp.fullName,
      personalEmail: emp.personalEmail || '',
      phone: emp.phone,
      area: emp.areaName || '',
      role: emp.roleName || '',
    }));
  };
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getEmployees();
      console.log('Empleados cargados desde API:', response.data);
      
      // Mapear la respuesta de la API a la estructura interna
      const mappedEmployees = response.data.map((apiEmployee: EmployeeApiResponse) => 
        mapApiResponseToEmployee(apiEmployee)
      );
      
      setEmployees(mappedEmployees);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Error al cargar empleados');
    } finally {
      setLoading(false);
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await getAreas();
      setAreas(response.data);
    } catch (err) {
      console.error('Error fetching areas:', err);
    }
  };
  const fetchRolesByArea = useCallback(async (areaId: string) => {
    try {
      const response = await getRolesByArea(areaId);
      setRoles(response.data);
    } catch (err) {
      console.error('Error fetching roles:', err);
    }
  }, []);
    const updateEmployeeData = useCallback(async (id: string, data: EmployeeFormData) => {
    try {
      console.log('Actualizando empleado:', id, data);
      await updateEmployee(id, data);
      // Refrescar la lista después de actualizar
      console.log('Refrescando lista de empleados...');
      await fetchEmployees();
      return { success: true };
    } catch (err) {
      console.error('Error updating employee:', err);
      return { success: false, error: 'Error al actualizar empleado' };
    }
  }, []);
  const createEmployeeData = useCallback(async (data: EmployeeFormData) => {
    try {
      console.log('Creando empleado desde hook:', data);
      await createEmployee(data);
      // Refrescar la lista después de crear
      console.log('Refrescando lista después de crear empleado...');
      await fetchEmployees();
      return { success: true };
    } catch (err) {
      console.error('Error creating employee:', err);
      return { success: false, error: 'Error al crear empleado' };
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
    fetchAreas();
  }, []);
  return {
    employees,
    areas,
    roles,
    loading,
    error,
    tableData: transformToTableData(employees),
    fetchRolesByArea,
    updateEmployeeData,
    createEmployeeData,
    refetchEmployees: fetchEmployees
  };
};
