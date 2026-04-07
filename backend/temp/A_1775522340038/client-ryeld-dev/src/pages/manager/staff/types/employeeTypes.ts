
// ========================
// Backend Response Types (match backend DTOs exactly)
// ========================

// Matches backend EmployeeResponse record
export interface BackendEmployeeResponse {
  id: string;
  dni: string;
  name: string;
  lastName: string;
  fullName: string;
  birthDate: string;
  hireDate: string;
  phone: string;
  personalEmail: string;
  workEmail: string;
  address: string;
  emergencyContact: string;
  profilePicture: string | null;
  status: string;           // "ACTIVE", "INACTIVE", etc.
  statusDisplay: string;
  areaId: string | null;
  areaName: string | null;
  role: string | null;       // role name string
  roleDisplay: string | null;
  yearsOfService: number;
}

// Matches backend UserResponse record
export interface BackendUserResponse {
  id: string;
  employeeId: string;
  code: string;
  roleName: string;
  roleId: string;
  status: string;           // "ACTIVE", "INACTIVE", etc.
  mustChangePassword: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

// Matches backend UserCreatedResponse record (from auto-create endpoint)
export interface BackendUserCreatedResponse {
  id: string;
  employeeId: string;
  code: string;
  roleName: string;
  roleId: string;
  status: string;
  mustChangePassword: boolean;
  plainPassword: string;
  createdAt: string;
}

// ========================
// Frontend Derived Types
// ========================

// Employee enriched with user data (merged client-side)
export interface EmployeeWithUser extends BackendEmployeeResponse {
  hasUser: boolean;
  userId?: string;
  userCode?: string;
  userStatus?: string;
  userRoleName?: string;
  userRoleId?: string;
}

// Table row for detailed employee management
export interface DetailedEmployeeTableRow {
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
  // User information
  hasUser: boolean;
  userId?: string;
  userCode?: string;
  userStatus?: boolean;
}

// ========================
// Request Types (match backend DTOs)
// ========================

// Matches backend CreateEmployeeRequest record
export interface CreateEmployeeRequest {
  name: string;
  lastName: string;
  dni: string;
  phone: string;
  personalEmail: string;
  workEmail: string;
  address: string;
  birthDate: string;
  hireDate: string;
  emergencyContact?: string;
  areaId?: string;
  role?: string;
}

// Matches backend UpdateEmployeeRequest record
export interface UpdateEmployeeRequest {
  name?: string;
  lastName?: string;
  dni?: string;
  phone?: string;
  personalEmail?: string;
  workEmail?: string;
  address?: string;
  birthDate?: string;
  hireDate?: string;
  emergencyContact?: string;
  profilePicture?: string;
  areaId?: string;
  role?: string;
  status?: string;
}

// For user creation (auto-generated credentials)
export interface CreateUserRequest {
  employeeId: string;
  roleId: string;
}

// Response from user auto-creation (displayed once)
export interface UserResponse {
  userId: string;
  employeeId: string;
  roleId: string;
  code: string;
  status: boolean;
  plainPassword: string;
  createdAt: string;
}

export interface ChangeRoleRequest {
  roleId: string;
}

// For employee creation form result
export interface EmployeeCreateResponse {
  employeeId: string;
  fullName: string;
  dni: string;
  phone: string;
  personalEmail: string;
  workEmail: string;
  address: string;
  birthDate: string;
  hireDate: string;
  status: string;
  profilePicture: string | null;
}

// ========================
// Legacy types kept for compatibility with useEmployees hook
// ========================

export interface EmployeeApiResponse {
  employeeId: string;
  fullName: string;
  name: string;
  lastName: string;
  dni: string;
  phone: string;
  personalEmail: string;
  workEmail: string;
  address: string;
  birthDate: string;
  hireDate: string;
  status: string;
  areaId: string | null;
  areaName: string | null;
  role: string | null;
  roleDisplay: string | null;
  yearsOfService: number;
}

export interface Employee {
  id: string;
  name: string;
  personalEmail: string | null;
  workEmail: string | null;
  phone: string;
  areaId: string | null;
  areaName: string | null;
  roleName: string | null;
  fullName: string;
  lastName: string;
  dni: string;
  address: string;
  birthDate: string;
  hireDate: string;
}

export interface EmployeeFormData {
  name: string;
  lastName: string;
  personalEmail: string;
  phone: string;
  workEmail: string;
  address: string;
  birthDate: string;
  hireDate: string;
  emergencyContact?: string;
  areaId?: string;
  role?: string;
}

export interface StaffTableRow {
  id: string;
  firstName: string;
  personalEmail: string;
  phone: string;
  area: string;
  role: string;
}
