type UUID = string;

export interface MaintenanceStats {
    scheduled: number;
    pending: number;
    completed: number;
}

export interface TechnicianStatus {
    id_technician: UUID; // acomodar esto
    name_technician: string;
    status: string;
}