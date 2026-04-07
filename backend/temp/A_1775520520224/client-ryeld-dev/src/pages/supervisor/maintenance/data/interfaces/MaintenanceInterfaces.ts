
type UUID = string;

// Intefaces GET
export interface MainPreventive{
    id_maintenance: UUID; //Hay que ver el tipado pasado aqui para adaptar
    month: String;
    building_client: String;
    period: String;
    ascensor_type: String;
    scheduled_date: String;
    scheduled_real_date: String;
    scheduled_time: String;
    name_technician_assigned: String; //Technician1
    name_technician_selected: String; //Technician2
    name_technician_executor: String; //Tecnico que realizo el mantenimiento en la actividad
    name_supervisor: String; //Supervisor
    details: String;
    /* reason_maintenance: String; */
    notice: Boolean;
    completed_status: Boolean; // Pending(False) - Completed(True)
    checked: Boolean; // El supervisor al momento de revisar el mantenimiento cuando se realiza debe cambiar el estado a true
}

export interface MainCorrective{
    id_maintenance: UUID; //Hay que ver el tipado pasado aqui para adaptar
    month: String;
    building_client: String;
    type_maintenance: String; // Corrective, Repair, etc.
    ascensor_type: String;
    scheduled_date: String;
    scheduled_real_date: String;
    scheduled_time: String;
    name_technician_assigned: String; //Technician1
    name_technician_selected: String; //Technician2
    name_technician_executor: String; //Tecnico que realizo el mantenimiento en la actividad
    name_supervisor: String; //Supervisor
    observations: String;
    completed_status: Boolean; // Pending(False) - Completed(True)
    checked: Boolean; // El supervisor al momento de revisar el mantenimiento cuando se realiza debe cambiar el estado a true
}

// Interfaces POST
export interface CreateMainPreventive {
    /* client_id: UUID; */
    elevator_id: UUID;
    /* month: string; */
    period: string;
    technician_assigned_id: UUID; 
    technician_selected_id?: UUID; 
    /* technician_executor_id?: UUID; */
    supervisor_id: UUID;
    scheduled_date: string;
    scheduled_time: string;
    details: string; // For preventive maintenance
}

export interface CreateMainCorrective {
    /* client_id: UUID; */
    elevator_id: UUID;
    /* month: string; */
    type_maintenance: string; // Corrective, Repair, etc.
    technician_assigned_id: UUID;
    technician_selected_id?: UUID;
    supervisor_id: UUID;
    scheduled_date: string;
    scheduled_time: string;
    observations: string; // For corrective maintenance
}

// Interfaces PUT
export interface UpdateMainPreventive {
    id_maintenance: UUID;
    /* month: string; */
    /* id_elevator: UUID; // ID del ascensor */
    period: string;
    /* ascensor_type: string; */
    scheduled_date: string;
    scheduled_real_date: string;
    scheduled_time: string;
    technician_selected_id_employee?: UUID; // ID del técnico seleccionado (opcional)
    technician_executor_id_employee?: UUID; // ID del técnico ejecutor (opcional)
    supervisor_id_employee: UUID;            // ID del supervisor
    details: string; // Detalles del mantenimiento preventivo
    notice: boolean; // Notificación de mantenimiento
    completed_status: boolean; // Estado de completado
    checked: boolean; // Estado de revisión por parte del supervisor
}

export interface UpdateMainCorrective {
    id_maintenance: UUID;
    /* month: string;
    id_client: UUID; */ // ID del cliente/edificio
    type_maintenance: string; // Corrective, Repair, etc.
    /* ascensor_type: string; */
    scheduled_date: string;
    scheduled_real_date: string;
    scheduled_time: string;
    technician_selected_id_employee?: UUID; // ID del técnico seleccionado (opcional)
    technician_executor_id_employee?: UUID; // ID del técnico ejecutor (opcional)
    supervisor_id_employee: UUID;            // ID del supervisor
    observations: string; // Observaciones del mantenimiento correctivo
    completed_status: boolean; // Estado de completado
    checked: boolean; // Estado de revisión por parte del supervisor
}

