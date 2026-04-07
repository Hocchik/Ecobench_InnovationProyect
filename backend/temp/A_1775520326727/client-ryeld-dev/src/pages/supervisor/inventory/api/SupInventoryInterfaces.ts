export enum InventoryStatus {
  Available = 'Available',
  Limited = 'Limited',
  OutOfStock = 'OutOfStock',
}

export enum ToolRequestStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Denied = 'Denied',
}

export interface Approver {
  id_employee: string; // UUID
  name_employee: string;
}

export interface TechnicianPOST {
  id_employee: string; // UUID
  name_employee: string;
}

export interface InventoryItem {
  id_item: string; // UUID
  code_item: string;
  name_item: string;
  position_item: string;
  category: 'Consumibles' | 'Repuestos' | 'Herramientas';
  total_quantity: number;
  status: InventoryStatus;
}

export interface ToolItemGET {
  id_item: string; // UUID
  code_item: string;
  name_item: string;
  request_quantity: number;
  available_quantity: number;
  status: InventoryStatus;
}

export interface ToolRequestItemPOST {
  id_item: string; // UUID
  code_item: string;
  name_item: string;
  request_quantity: number;
}

export interface ToolRequestGET {
  id_tool_request: string; // UUID
  request_number: string;
  technician: string;
  date: string; // ISO format recommended
  reason: string;
  items: ToolItemGET[];
  approved_by?: Approver;
  status: string; // You might want to map this to ToolRequestStatus if consistent
}

export interface ToolRequestPOST {
  id_tool_request?: string; // UUID
  request_number: string;
  technician: TechnicianPOST;
  reason: string;
  date: string;
  status: ToolRequestStatus;
  items: ToolRequestItemPOST[];
  approved_by?: Approver;
  approved_date?: string;
  comments?: string;
}

export interface ToolRequestPUT {
  idToolRequest: string; // UUID
  status: ToolRequestStatus;
}