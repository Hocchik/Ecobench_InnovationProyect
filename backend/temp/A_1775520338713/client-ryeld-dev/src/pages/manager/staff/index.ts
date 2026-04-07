// Components
export { AreasTable } from './components/AreasTable';
export { RolesTable } from './components/RolesTable';
export { AreaModal } from './components/AreaModal';
export { RoleModal } from './components/RoleModal';
export { EmployeeModal } from './components/EmployeeModal';
export { UserAssignmentModal } from './components/UserAssignmentModal';
export { EmployeesManagementTable } from './components/EmployeesManagementTable';

// Types - Areas
export type { Area, CreateAreaRequest, UpdateAreaRequest, AreaTableRow } from './types/areaTypes';

// Types - Roles
export type { Role, CreateRoleRequest, UpdateRoleRequest, RoleTableRow } from './types/roleTypes';

// Types - Employees & Users
export type { 
  CreateEmployeeRequest, 
  UpdateEmployeeRequest, 
  EmployeeCreateResponse,
  CreateUserRequest,
  UserResponse,
  ChangeRoleRequest
} from './types/employeeTypes';

// Hooks
export { useAreas } from './hooks/useAreas';
export { useRoles } from './hooks/useRoles';
export { useEmployeeManagement } from './hooks/useEmployeeManagement';

// Services
export { areasServices } from './api/services/areasServices';
export { rolesServices } from './api/services/rolesServices';
export { employeesManagementServices } from './api/services/employeesManagementServices';
export { usersServices } from './api/services/usersServices';
