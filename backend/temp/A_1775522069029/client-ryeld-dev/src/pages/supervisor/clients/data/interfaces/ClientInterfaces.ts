type UUID = string;

//Clients and Elevator Data
export interface ClientTable {
    id_client: UUID;
    name_client: string;
    address_client: string;
    section_client: string;
    elevators_client: number;
}
export interface ClientElevators {
    id_client: UUID;
    elevators: ElevatorData[];
}
export interface ElevatorData {
    id_elevator: UUID;
    elevator_type: string;
    brand: string;
    model: string;
    control_system: string;
    machine_room: boolean;
    floors: number;
    access: string;
    maintenance_frequency: string;
    characteristics: string;
    observation: string;
}

//Client History
export interface ClientMaintenanceHistory {
  id_activity: string;
  id_client: string;
  id_elevator: string;
  
  date: string;
  start_time: string;
  end_time: string;
  technician_assigned: string;
  technician_executor: string;
  name_supervisor: string;
  maintenance_type: string;
  activities: string[];
}



//ElevatorHistory
export interface ElevatorTechHistory {
    id_elevator: UUID;
    emergencyHistory: EmergencyHistory[];
    preventiveMaintenanceHistory: PreventiveMaintenanceHistory[];
    sparePartHistory: SparePartHistory[];
    partLocations: ElevatorPartLocation[];
}
export interface EmergencyHistory {
    date: string;
    description: string;
    location: string;
    cause: string;
    peopleTrapped: boolean;
}
export interface PreventiveMaintenanceHistory {
    date: string;
}
export interface SparePartHistory {
    part: string;
    location: string;
    failureDate: string;
    changeDate: string;
    failureCause: string;
}
export interface ElevatorPartLocation {
    location: string; // Ej: "CM", "DA", "PA"
    involvedElements: string[];
}


//Create and Update

export interface CreateElevatorForClient{
    elevator_type: string;
    brand: string;
    model: string;
    control_system: string;
    machine_room: boolean;
    floors: number;
    access: string;
    maintenance_frequency: string;
    characteristics: string;
    observation: string;
    id_client: UUID;
}

export interface UpdateElevatorOfClient{
    id_elevator: UUID;
    elevator_type: string;
    brand: string;
    model: string;
    control_system: string;
    machine_room: boolean;
    floors: number;
    access: string;
    maintenance_frequency: string;
    characteristics: string;
    observation: string;
}