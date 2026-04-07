import { useState, useEffect } from 'react';
import { BackendEmployeeResponse } from '../types/employeeTypes';
import { employeesManagementServices } from '../api/services/employeesManagementServices';

interface SimpleEmployeeTableRow {
  id: string;
  fullName: string;
  dni: string;
  personalEmail: string;
  workEmail: string;
  phone: string;
  hireDate: string;
  status: boolean;
  areaName: string | null;
  roleName: string | null;
}

export const useSimpleEmployees = () => {
  const [employees, setEmployees] = useState<BackendEmployeeResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transformToTableData = (employees: BackendEmployeeResponse[]): SimpleEmployeeTableRow[] => {
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
    }));
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeesManagementServices.getAllEmployees();
      console.log('Simple employees loaded:', data);
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching simple employees:', err);
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
