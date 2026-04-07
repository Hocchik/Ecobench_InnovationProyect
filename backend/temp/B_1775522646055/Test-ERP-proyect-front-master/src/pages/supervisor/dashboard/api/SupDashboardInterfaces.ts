export interface ActivityItemNoti {
  name: string;
  quantity: number;
}

export interface CompletedActivityNoti extends NotificationDetails {
  id: string; // UUID
  title: string;
  order_number: string;
  building_client: string;
  address: string; // reemplaza location
  type_activity: string;
  date: string;
  start_time: string;
  end_time: string;
  executor: string;
  activities: string[];
  tools: ActivityItemNoti[];
  required_parts: ActivityItemNoti[];
  supplies: ActivityItemNoti[];
}

export interface MaintenanceStats {
  scheduled: number; // status Scheduled
  pending: number;   // status false
  completed: number; // status true
}

export interface Notification {
  id_notification: string; // UUID
  type_notification: 'tool_request' | 'completed_activity';
  technician: string;
  client_building: string;
  send_date: string;
  details: ToolRequestNoti | CompletedActivityNoti;
}

export interface NotificationDetails {}

export interface TechStatusWork {
  id_technician: string; // UUID
  name_technician: string;
  status: 'En actividad' | 'Fuera de Lima' | 'Disponible';
}

export interface ToolItemNoti {
  id_tool: string; // UUID
  code_tool: string;
  name_tool: string;
  requestedQuantity: number;
  availableQuantity: number;
}

export interface ToolRequestNoti extends NotificationDetails {
  id: string; // UUID
  request_number: string;
  name_technician: string;
  send_date: string;
  reason: string;
  items: ToolItemNoti[];
  status: 'Pending' | 'Approved' | 'Denied';
}