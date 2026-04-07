import axios from "../../../../../api/axios.ts";
import { EMPLOYEES, AREAS, EMPLOYEE_UPDATE, ROLES_BY_AREA } from "../endpoints/employees";


export const getEmployees = () => axios.get(EMPLOYEES);
export const updateEmployee = (id: string, data: any) => {
  console.log('Enviando datos de actualización:', data);
  return axios.put(EMPLOYEE_UPDATE.replace("{employeeId}", id), data);
};
export const getAreas = () => axios.get(AREAS);
export const getRolesByArea = (areaId: string) => axios.get(ROLES_BY_AREA.replace("{areaId}", areaId));
export const createEmployee = (data: any) => {
  console.log('Enviando datos de creación:', data);
  return axios.post(EMPLOYEES, data);
};