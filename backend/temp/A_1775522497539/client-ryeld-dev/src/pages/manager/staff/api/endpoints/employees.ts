
// Employees endpoints
export const EMPLOYEES =  "/employees";
export const EMPLOYEES_ACTIVE =  "/employees/active";
export const EMPLOYEES_CREATE =  "/employees";
export const EMPLOYEE_BY_ID =  "/employees/{employeeId}";
export const EMPLOYEE_DEACTIVATE =  "/employees/{employeeId}/deactivate";
export const EMPLOYEE_ACTIVATE =  "/employees/{employeeId}/activate";
export const EMPLOYEE_UPDATE =  "/employees/{employeeId}";

// Areas endpoints
export const AREAS =  "/areas";
export const AREAS_ACTIVE =  "/areas/active";
export const AREA_BY_ID =  "/areas/{areaId}";

// Roles endpoints
export const ROLES =  "/roles";
export const ROLES_BY_AREA =  "/roles/area/{areaId}";
export const ROLE_BY_ID =  "/roles/{roleId}";

// Users endpoints
export const USERS =  "/users";
export const USERS_AUTO =  "/users/auto";
export const USER_BY_ID =  "/users/{userId}";
export const USER_DEACTIVATE =  "/users/{userId}/deactivate";
export const USER_ACTIVATE =  "/users/{userId}/activate";
export const USER_CHANGE_ROLE =  "/users/{userId}/role";