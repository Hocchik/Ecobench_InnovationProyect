/**
 * Interfaces para el módulo de empleados de HR
 * Basado en la estructura del módulo staff del manager
 */

/** Información básica del empleado */
export interface Employee {
  id: number;
  name: string;
  personalEmail: string | null;
  workEmail: string | null;
  phoneNumber: string;
  areaId: number;
  areaName: string;
  roleId: number;
  roleName: string;
  active: boolean;
  /** Información adicional para HR */
  salary?: number;
  hireDate: string;
  birthDate?: string;
  document?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

/** Información del área de trabajo */
export interface Area {
  id: number;
  name: string;
}

/** Información del rol/posición */
export interface Role {
  id: number;
  name: string;
  areaId: number;
}

/** Historial de pagos de un empleado */
export interface PaymentHistory {
  id: number;
  employeeId: number;
  month: number;
  year: number;
  amount: number;
  paymentDate: string;
  paymentType: 'salary' | 'bonus' | 'overtime' | 'commission';
  description?: string;
  fileName?: string;
  fileUrl?: string;
  status: 'pending' | 'paid' | 'overdue';
}

/** Documentos del empleado */
export interface EmployeeDocument {
  id: number;
  employeeId: number;
  documentType: 'contract' | 'payslip' | 'cv' | 'certificate' | 'other';
  fileName: string;
  fileUrl: string;
  uploadDate: string;
  uploadedBy: string;
  description?: string;
}

/** Datos para subir archivo de pago */
export interface PaymentUpload {
  employeeId: number;
  month: number;
  year: number;
  amount: number;
  paymentType: 'salary' | 'bonus' | 'overtime' | 'commission';
  description?: string;
  file: File;
}

/** Datos para subir contrato */
export interface ContractUpload {
  employeeId: number;
  file: File;
  description?: string;
}

/** Filtros para la tabla de empleados */
export interface EmployeeFilters {
  search: string;
  area?: number;
  role?: number;
  status?: 'active' | 'inactive' | 'all';
}

/** Estadísticas de empleados */
export interface EmployeeStats {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  averageSalary: number;
  totalPayroll: number;
  pendingPayments: number;
}

/** Meses disponibles para filtros */
export interface MonthOption {
  value: number;
  label: string;
}
