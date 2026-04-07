// ClientTable: resumen de clientes
export interface ClientTable {
  id: string; // UUID
  name_client: string;
  address_client: string;
  section_client: string;
  elevators_client: number;
}

// ElevatorsData: detalle técnico de cada ascensor
export interface ElevatorsData {
  id: string; // UUID
  elevator_type: string;
  brand: string;
  model: string;
  control_system: boolean;
  machine_room: boolean;
  floors: number;
  access_doors: number;
  access_mode: string;
  maintenance_frequency: string;
  characteristics: string;
  observation: string;
  status: string;
}

// ClientElevators: ascensores por cliente
export interface ClientElevators {
  id_client: string; // UUID
  elevators: ElevatorsData[];
}

// ClientMaintenanceHistory: historial de mantenimientos por ascensor
export interface ClientMaintenanceHistory {
  id_elevator: string; // UUID
  date: string;
  start_time: string;
  end_time: string;
  technician_assigned: string;
  technician_executor: string;
  name_supervisor: string;
  maintenance_type: string;
  activities: string[];
}

// PreventiveMaintenanceHistory: mantenimientos preventivos
export interface PreventiveMaintenanceHistory {
    id: string;
    date: string; // ISO date
}

export interface EmergencyHistory {
  id: string;
  elevatorId: string;
  date: string; // ISO date
  description: string;
  location: string;
  cause: string;
  peopleTrapped: boolean;
  registeredBy: string;
  createdAt: string; // ISO date
}
// SparePartHistory: historial de repuestos
export interface SparePartHistory {
  id: string;
  elevatorId: string;
  part: string;
  location: string;
  failureDate: string;
  changeDate: string;
  failureCause: string;
  registeredBy: string;
  createdAt: string;
}

// ElevatorPartLocation: partes del ascensor por ubicación
export interface ElevatorPartLocation {
  id: string;
  elevatorId: string;
  location: string;
  element: string;
  description: string;
}

// ElevatorTechHistory: historial técnico completo
export interface ElevatorTechHistory {
  id_elevator: string;
  emergency_history: EmergencyHistory[];
  preventive_maintenanceHistory: PreventiveMaintenanceHistory[];
  spare_part_history: SparePartHistory[];
  part_locations: ElevatorPartLocation[];
}



export interface CreateElevator {
  id_client: string;
  elevator_type: string;
  brand: string;
  model: string;
  control_system: boolean;
  machine_room: boolean;
  floors: number;
  access_doors: number;
  access_mode: string;
  maintenance_frequency: string;
  characteristics: string;
  // observation?: string;
  // status?: string;
}

export interface UpdateElevator {
  id_elevator: string;
  elevator_type: string;
  brand: string;
  model: string;
  control_system: boolean;
  machine_room: boolean;
  floors: number;
  access_doors: number;
  access_mode: string;
  maintenance_frequency: string;
  characteristics: string;
  observation: string;
  status: string;
}