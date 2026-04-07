// Role types - matches backend RoleResponse
export interface Role {
  id: string;
  name: string;
  description: string;
  areaId: string;
  areaName: string;
}

export interface CreateRoleRequest {
  name: string;
  areaId: string;
  description?: string;
}

export interface UpdateRoleRequest {
  name: string;
  areaId: string;
  description?: string;
}

export interface RoleTableRow {
  id: string;
  name: string;
  areaId: string;
  areaName: string;
}
