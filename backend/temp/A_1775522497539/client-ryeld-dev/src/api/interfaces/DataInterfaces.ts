export type UUID = string;

export interface Techs {
    id_technician: UUID;
    name_technician: string;
}

export interface Supervisors {
    id_supervisor: UUID;
    name_supervisor: string;
}

export interface MaintenanceType {
    index: number;
    maintenance_type: string;
}
export interface ElevatorsType {
    index: number;
    elevator_type: string;
    elevator_id?: string;
    brand?: string;
    model?: string;
    client_name_building?: string;
}

export interface Clients {
    id_client: UUID;
    building_client: string;
    elevator_number: number;
    brand: string;
}
