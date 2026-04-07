import { useState, useEffect } from 'react';
import { BackendEmployeeResponse, BackendUserResponse, EmployeeWithUser, DetailedEmployeeTableRow } from '../types/employeeTypes';
import { employeesManagementServices } from '../api/services/employeesManagementServices';
import { usersServices } from '../api/services/usersServices';

export const useDetailedEmployees = () => {
  const [employees, setEmployees] = useState<EmployeeWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Merge employees with their user data
  const mergeEmployeesWithUsers = (
    employees: BackendEmployeeResponse[],
    users: BackendUserResponse[]
  ): EmployeeWithUser[] => {
    return employees.map(emp => {
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

  const transformToTableData = (employees: EmployeeWithUser[]): DetailedEmployeeTableRow[] => {
    return employees.map(emp => ({
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
      // User information
      hasUser: emp.hasUser,
      userId: emp.userId,
      userCode: emp.userCode,
      userStatus: emp.userStatus === 'ACTIVE',
    }));
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch employees and users in parallel, then merge
      const [employeesData, usersData] = await Promise.all([
        employeesManagementServices.getAllEmployees(),
        usersServices.getAllUsers(),
      ]);
      console.log('Employees loaded:', employeesData);
      console.log('Users loaded:', usersData);
      const merged = mergeEmployeesWithUsers(employeesData, usersData);
      setEmployees(merged);
    } catch (err) {
      console.error('Error fetching detailed employees:', err);
      setError('Error al cargar empleados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    tableData: transformToTableData(employees),
    refetchEmployees: fetchEmployees,
    clearError: () => setError(null)
  };
};
