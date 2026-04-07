type UUID = string;

//User login
export interface LoginResponse {
    id: UUID;
    code: string;
    employeeName: string;
    area: string;
    role: 'Supervisor' | 'Técnico' | 'Auxiliar' | 'RecursosHumanos' | 'Manager';
    token: string;
    roleRoute: string;
  }
  
  export interface LoginCredentials {
    code: string;
    password: string;
  }

//Cliente Supervisor
export interface Elevator {
    id: number;
    elevatorType: string;
    brand: string;
    model: string;
    maintenanceFrequency: string;
    controlSystem: string;
    machineRoom: boolean;
    floors: number;
    access: string;
    characteristics?: string;
    observation?: string;
  }
  
  export interface Client {
    id: string;
    name: string;
    address: string;
    section: 'RYELD' | 'SUMMA';
    elevators: Elevator[];
  }

  export interface ClientBasicDTO {
    id: string;
    name: string;
    address: string;
    section: string;
    elevatorCount: number;
  }
  
  export interface ElevatorDTO {
    id: number;
    elevatorType: string;
    brand: string;
    model: string;
    controlSystem: string;
    machineRoom: boolean;
    floors: number;
    access: string;
    maintenanceFrequency: string;
    characteristics?: string;
    observation?: string;
  }
  
  export interface ClientElevatorsDTO {
    elevators: ElevatorDTO[];
  }

// Mantenimientos:

/* Para el add MAINTENANCE BASE 
export interface AddMaintenancePreventive {
  id: string;
  clientId: string;
  date: string;
  startTime: string;
  endTime: string;
  technician1: string;
  technician2?: string;
  supervisor: string;
  maintenanceType: 'Preventivo' | 'Urgencia';
  AscensorType: AscensorType;
  operational: boolean;
  activitiesPerformed: string;
  observations?: string;
} */

/* Visualización modelo Preve y Corre

export interface PreventiveMaintenance {
  id: string;
  month: string;
  building: string;
  period: string;
  ascensorType: AscensorType; 
  scheduledDate: string;
  scheduledRealDate: string;
  scheduledTime: string;
  technician1?: string;
  technician2?: string;
  supervisor?: string;
  details?: string;
  status: 'pending' | 'completed' | 'in-progress';
  notice: boolean;
}

export interface CorrectiveMaintenance {
  id: string;
  month: string;
  building: string;
  type: 'Correctivo' |'Urgencia' | 'Emergencia' | 'Reparación';
  ascensorType: AscensorType; 
  scheduledDate: string;
  scheduledTime: string;
  scheduledRealDate: string;
  technician1?: string;
  technician2?: string;
  supervisor?: string;
  details?: string;
  status: 'pending' | 'completed' | 'in-progress';
}
 */


//Attendance Supervisor

export interface Technician {
  id: number;
  name: string;
}

export interface Attendance {
  id?: number;
  technician: Technician;
  date: string; // Formato YYYY-MM-DD
  entryTime: string; // Formato HH:mm:ss
  exitTime: string; // Formato HH:mm:ss
  status: boolean;
}


export interface DayAttendanceDTO {
  id: Number,
  technicianId: string,
  technicianName: string,
  entryTime: string,
  exitTime: string,
  status: boolean,
}


export interface HistoryAttendaceTechDTO {
  id: Number,
  technicianId: string,
  technicianName: string,
  date: string,
  entryTime: string,
  exitTime: string,
  hoursWorked: string,
  overtime: string,
}

//Dashboard
export interface CompletedActivity {
  id: string;
  title: string;
  company: string;
  location: { 
    id: string; 
    name: string; 
    code: string; 
    company: string 
  };
  type: 'preventive' | 'corrective' | 'repair';
  status: 'completed';
  date: Date;
  startTime: string;
  endTime: string;
  executor: string;
  activities: string[];
  tools: { name: string; quantity: number }[];
  requiredParts: any[];
  supplies: any[];
  orderNumber: string;
}

// Interfaz para notificaciones
export interface Notification {
  id: string;
  type: 'tool_request' | 'completed_activity';
  technician: string;
  company?: string;
  date: string;
  details?: ToolRequest | CompletedActivity;
}

//Inventario
export interface InventoryItem {
  id: number;
  code: string;
  name: string;
  category: "Consumibles" | "Repuestos";
  totalQuantity: number;
  status: "Available" | "Limited" | "OutOfStock";
}
export interface ToolItem {
  itemId: number;
  code: string;
  name: string;
  requestQuantity: number;
  availableQuantity: number;
  status: "Available" | "Limited" | "OutOfStock";
}

export interface ToolRequest {
  id: number;
  requestNumber: string;
  technician: string;
  date: string;
  reason: string;
  items: ToolItem[];
  status: "Pending" | "Approved" | "Denied";
}