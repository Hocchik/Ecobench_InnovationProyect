export interface ActivityPartsDTO {
  description: string;
  quantity: number;
}

export interface ActivitySuppliesDTO {
  description: string;
  quantity: number;
}

export interface ActivityToolsDTO {
  name: string;
  quantity: number;
}

export interface ClientLocation {
  id_client: string; // UUID
  building_client: string;
  address: string;
  access_doors: number;
  floor_doors: number;
}

export interface CalendarActivity {
  id_activity: string; // UUID
  order_number: string;
  title: string;
  section: string; // RYELD o SUMMA
  client_location: ClientLocation;
  date: string;
  start_time: string | null;
  end_time: string | null;
  maintenance_type: string;
  status: boolean;
  client_building: string;
  technician_assigned: string;
  technician_executor: string;
  executor_position: string;
  coordinador: string;
  supervisor: string;
  client_name: string;
  activities: string[];
  tools: ActivityToolsDTO[];
  supplies: ActivitySuppliesDTO[];
  required_parts: ActivityPartsDTO[];
  comments: string;
  elevator_condition: string;
  image_url: string;
}

export interface UpdateActivity {
  id_activity: string; // UUID
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  status: boolean;
  technician_executor: string;
  activities: string[];
  tools: ActivityToolsDTO[];
  supplies: ActivitySuppliesDTO[];
  required_parts: ActivityPartsDTO[];
  comments: string;
  image_url: string;
}