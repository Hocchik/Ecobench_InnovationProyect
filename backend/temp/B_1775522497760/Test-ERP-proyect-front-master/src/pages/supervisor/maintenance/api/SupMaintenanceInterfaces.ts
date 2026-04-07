export interface CreateMainCorrective {
  elevator_id: string;
  type_maintenance: string;
  technician_assigned_id: string;
  technician_selected_id: string;
  supervisor_id: string;
  scheduled_date: string;
  scheduled_time: string;
  details: string;
}

export interface MainCorrective {
  id_maintenance: string;
  month: string;
  building_client: string;
  type_maintenance: string;
  ascensor_type: string;
  scheduled_date: string;
  scheduled_real_date: string;
  scheduled_time: string;
  name_technician_assigned: string;
  name_technician_selected: string;
  name_technician_executor: string;
  name_supervisor: string;
  observations: string;
  completed_status: boolean;
  checked: boolean;
}

export interface UpdateMainCorrective {
  id_maintenance: string;
  type_maintenance: string;
  scheduled_date: string;
  scheduled_real_date: string;
  scheduled_time: string;
  technician_executor_id_employee: string;
  technician_selected_id_employee: string;
  supervisor_id_employee: string;
  details: string;
  completed_status: boolean;
  checked: boolean;
}

export interface CreateMainPreventive {
  elevator_id: string;
  period: string;
  technician_assigned_id: string;
  technician_selected_id: string;
  supervisor_id: string;
  scheduled_date: string;
  scheduled_time: string;
  details: string;
}

export interface MainPreventive {
  id_maintenance: string;
  month: string;
  building_client: string;
  period: string;
  ascensor_type: string;
  scheduled_date: string;
  scheduled_real_date: string;
  scheduled_time: string;
  name_technician_assigned: string;
  name_technician_selected: string;
  name_technician_executor: string;
  name_supervisor: string;
  observations: string;
  notice: boolean;
  completed_status: boolean;
  checked: boolean;
}

export interface UpdateMainPreventive {
  id_maintenance: string;
  period: string;
  scheduled_date: string;
  scheduled_real_date: string;
  scheduled_time: string;
  technician_executor_id_employee: string;
  technician_selected_id_employee: string;
  supervisor_id_employee: string;
  details: string;
  notice: boolean;
  completed_status: boolean;
  checked: boolean;
}