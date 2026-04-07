import axios from '../../../../../api/axios';
import { 
  EMPLOYEES_CREATE, 
  EMPLOYEE_BY_ID, 
  EMPLOYEE_DEACTIVATE,
  EMPLOYEE_ACTIVATE,
  EMPLOYEES,
  EMPLOYEE_UPDATE
} from '../endpoints/employees';
import { 
  CreateEmployeeRequest, 
  UpdateEmployeeRequest, 
  EmployeeCreateResponse,
  BackendEmployeeResponse
} from '../../types/employeeTypes';

export const employeesManagementServices = {
  // Obtener todos los empleados
  getAllEmployees: async (): Promise<BackendEmployeeResponse[]> => {
    const response = await axios.get(EMPLOYEES);
    return response.data;
  },

  // Obtener un empleado por ID
  getEmployeeById: async (employeeId: string): Promise<BackendEmployeeResponse> => {
    const endpoint = EMPLOYEE_BY_ID.replace('{employeeId}', employeeId);
    const response = await axios.get(endpoint);
    return response.data;
  },

  // Crear nuevo empleado
  createEmployee: async (employeeData: CreateEmployeeRequest): Promise<EmployeeCreateResponse> => {
    const response = await axios.post(EMPLOYEES_CREATE, employeeData);
    // Map backend EmployeeResponse to EmployeeCreateResponse
    const data = response.data;
    return {
      employeeId: data.id,
      fullName: data.fullName,
      dni: data.dni,
      phone: data.phone,
      personalEmail: data.personalEmail,
      workEmail: data.workEmail,
      address: data.address,
      birthDate: data.birthDate,
      hireDate: data.hireDate,
      status: data.status,
      profilePicture: data.profilePicture,
    };
  },

  // Actualizar empleado
  updateEmployee: async (employeeId: string, employeeData: UpdateEmployeeRequest): Promise<EmployeeCreateResponse> => {
    const endpoint = EMPLOYEE_UPDATE.replace('{employeeId}', employeeId);
    const response = await axios.put(endpoint, employeeData);
    const data = response.data;
    return {
      employeeId: data.id,
      fullName: data.fullName,
      dni: data.dni,
      phone: data.phone,
      personalEmail: data.personalEmail,
      workEmail: data.workEmail,
      address: data.address,
      birthDate: data.birthDate,
      hireDate: data.hireDate,
      status: data.status,
      profilePicture: data.profilePicture,
    };
  },

  // Desactivar empleado
  deactivateEmployee: async (employeeId: string): Promise<void> => {
    const endpoint = EMPLOYEE_DEACTIVATE.replace('{employeeId}', employeeId);
    await axios.patch(endpoint);
  },

  // Activar empleado
  activateEmployee: async (employeeId: string): Promise<void> => {
    const endpoint = EMPLOYEE_ACTIVATE.replace('{employeeId}', employeeId);
    await axios.patch(endpoint);
  }
};
